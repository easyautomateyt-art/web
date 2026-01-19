import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
// Load local .env in development (no effect if env vars provided by host)
import 'dotenv/config';
import rateLimit from 'express-rate-limit';
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV !== 'production' ? {
    target: 'pino-pretty'
  } : undefined
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 80;

async function startServer() {
  let express;
  try {
    const mod = await import('express');
    // express may be default or named export depending on packaging
    express = mod.default || mod;
  } catch (e) {
    console.error('Failed to import express:', e && e.message ? e.message : e);
    try {
      const cwd = process.cwd();
      console.error('cwd:', cwd);
      const nmPath = path.join(cwd, 'node_modules');
      console.error('node_modules exists:', fs.existsSync(nmPath));
      if (fs.existsSync(nmPath)) {
        const list = fs.readdirSync(nmPath).slice(0, 100);
        console.error('node_modules entries (first 100):', list.join(', '));
      }
      const pkgPath = path.join(cwd, 'package.json');
      if (fs.existsSync(pkgPath)) {
        console.error('package.json content:\n', fs.readFileSync(pkgPath, 'utf8'));
      }
    } catch (err2) {
      console.error('Error during diagnostics:', err2);
    }
    // exit so Procfile logs show the failure clearly
    process.exit(1);
  }

  const app = express();

  // Trust the first proxy (Easypanel/Docker load balancer) to fix rate limiter IP detection
  app.set('trust proxy', 1);

  // Health check endpoint - defined first to avoid being blocked by other routes
  app.get('/healthz', (req, res) => {
    res.status(200).send('OK');
  });

  // parse JSON bodies for API endpoints
  app.use(express.json({ limit: '256kb' }));
  const distPath = path.join(__dirname, 'dist');

  // Rate limiter for contact submissions (configurable via env)
  const contactLimiter = rateLimit({
    windowMs: process.env.CONTACT_RATE_WINDOW_MS ? Number(process.env.CONTACT_RATE_WINDOW_MS) : 60 * 60 * 1000, // 1 hour
    max: process.env.CONTACT_RATE_MAX ? Number(process.env.CONTACT_RATE_MAX) : 5, // limit each IP to 5 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: { ok: false, error: 'rate_limited' },
  });

  // Simple server-side validation helper
  const isValidEmail = (email) => {
    if (!email || typeof email !== 'string') return false;
    // simple RFC-like regexp (not perfect but enough for basic validation)
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Simple contact API endpoint — sends email using SMTP configured via env
  app.post('/api/contact', contactLimiter, async (req, res) => {
    try {
      const { name, email, message, accept } = req.body || {};
      logger.info({ name, email: email ? '[REDACTED]' : undefined, accept }, '/api/contact received');

      // Basic validations
      if (!accept) {
        return res.status(400).json({ ok: false, error: 'privacy_required' });
      }
      if (!email || !message) {
        return res.status(400).json({ ok: false, error: 'missing_fields' });
      }
      if (!isValidEmail(email)) {
        return res.status(400).json({ ok: false, error: 'invalid_email' });
      }
      if (typeof name === 'string' && name.length > 200) {
        return res.status(400).json({ ok: false, error: 'name_too_long' });
      }
      if (typeof message !== 'string' || message.length < 3 || message.length > 5000) {
        return res.status(400).json({ ok: false, error: 'invalid_message_length' });
      }

      // lazy-load nodemailer so startup still fails earlier if dependency missing
      let nodemailerMod;
      try {
        nodemailerMod = await import('nodemailer');
      } catch (e) {
        console.error('nodemailer import failed:', e && e.message ? e.message : e);
        return res.status(500).json({ ok: false, error: 'mailer_unavailable' });
      }

      const nodemailer = nodemailerMod.default || nodemailerMod;

      // Build transporter from environment variables
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined,
        secure: process.env.SMTP_SECURE === 'true',
        auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        } : undefined,
      });

      const to = process.env.TO_EMAIL || 'admin@onereserve.es';

      const mailOptions = {
        from: process.env.FROM_EMAIL || process.env.SMTP_USER || 'no-reply@onereserve.es',
        to,
        subject: `Contacto web — ${name || 'Usuario'}`,
        text: `Nombre: ${name || '-'}\nEmail: ${email}\n\nMensaje:\n${message}`,
        html: `<p><strong>Nombre:</strong> ${name || '-'}</p><p><strong>Email:</strong> ${email}</p><hr/><p>${message}</p>`,
      };

      // send mail
      const info = await transporter.sendMail(mailOptions);
      console.log('Contact email sent:', info && info.messageId ? info.messageId : info);

      return res.json({ ok: true });
    } catch (err) {
      console.error('Error in /api/contact:', err);
      return res.status(500).json({ ok: false, error: 'server_error' });
    }
  });

  // Verify SMTP credentials without sending an email
  app.post('/api/contact/verify', async (req, res) => {
    try {
      let nodemailerMod;
      try {
        nodemailerMod = await import('nodemailer');
      } catch (e) {
        console.error('nodemailer import failed:', e && e.message ? e.message : e);
        return res.status(500).json({ ok: false, error: 'mailer_unavailable' });
      }

      const nodemailer = nodemailerMod.default || nodemailerMod;

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined,
        secure: process.env.SMTP_SECURE === 'true',
        auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        } : undefined,
      });

      await transporter.verify();
      return res.json({ ok: true, message: 'SMTP verified' });
    } catch (err) {
      console.error('Error verifying SMTP:', err);
      return res.status(500).json({ ok: false, error: 'verify_failed' });
    }
  });

  app.use(express.static(distPath, {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        // Never cache index.html to ensure users get the latest asset links
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      } else if (filePath.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg)$/)) {
        // Cache static assets heavily as they are hashed
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    }
  }));

  app.get('*', (req, res) => {
    // Also prevent caching for the fallback index.html
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.sendFile(path.join(distPath, 'index.html'));
  });

  const host = process.env.HOST || '0.0.0.0';
  const server = app.listen(port, host, () => {
    console.log(`Server listening on ${host}:${port}`);
    try {
      console.log('Process info: pid=', process.pid, 'ppid=', process.ppid);
      console.log('Env snapshot: PORT=', process.env.PORT, 'HOST=', process.env.HOST, 'NODE_ENV=', process.env.NODE_ENV);
      const mem = process.memoryUsage();
      console.log('Memory usage (rss/heapUsed/heapTotal):', mem.rss, mem.heapUsed, mem.heapTotal);
    } catch (e) {
      console.error('Error logging process info:', e && e.message ? e.message : e);
    }
  });

  // Graceful logging on termination and error handling
  process.on('SIGTERM', () => {
    console.warn('Received SIGTERM, shutting down gracefully...');
    try { server.close(() => console.log('HTTP server closed')); } catch (e) { console.error(e); }
    process.exit(0);
  });

  process.on('SIGINT', () => {
    console.warn('Received SIGINT, shutting down...');
    try { server.close(() => console.log('HTTP server closed')); } catch (e) { console.error(e); }
    process.exit(0);
  });

  process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err && err.stack ? err.stack : err);
  });

  process.on('unhandledRejection', (reason) => {
    console.error('Unhandled rejection:', reason);
  });
}

startServer();
