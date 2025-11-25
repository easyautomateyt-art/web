import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
// Load local .env in development (no effect if env vars provided by host)
import 'dotenv/config';
import rateLimit from 'express-rate-limit';

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
  // parse JSON bodies for API endpoints
  app.use(express.json({ limit: '256kb' }));
  const distPath = path.join(__dirname, 'dist');

  // Diagnostics: report dist status and listing to help debugging in production
  try {
    console.log('Diagnostics: __dirname =', __dirname);
    console.log('Diagnostics: distPath =', distPath);
    const distExists = fs.existsSync(distPath);
    console.log('Diagnostics: dist exists =', distExists);
    if (distExists) {
      try {
        const list = fs.readdirSync(distPath).slice(0, 200);
        console.log('Diagnostics: dist entries (first 200):', list.join(', '));
      } catch (e) {
        console.error('Diagnostics: listing dist failed:', e && e.message ? e.message : e);
      }
    }
  } catch (dErr) {
    console.error('Diagnostics error:', dErr && dErr.message ? dErr.message : dErr);
  }

  // Middleware to log requests and whether requested asset exists in dist
  app.use((req, res, next) => {
    try {
      const urlPath = req.path || req.url || '/';
      const fileCandidate = path.join(distPath, urlPath.replace(/^\//, ''));
      const exists = fs.existsSync(fileCandidate);
      console.log(`REQ ${req.method} ${urlPath} -> fileExists=${exists} candidate=${fileCandidate}`);
    } catch (e) {
      console.error('Request diagnostics error:', e && e.message ? e.message : e);
    }
    next();
  });

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
      console.log('/api/contact received:', { name, email: email ? '[REDACTED]' : undefined, accept });

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

  app.use(express.static(distPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });

  app.listen(port, () => {
    console.log(`Server listening on ${port}`);
  });
}

startServer();
