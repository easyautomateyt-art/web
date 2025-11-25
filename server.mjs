import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
// Load local .env in development (no effect if env vars provided by host)
import 'dotenv/config';

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

  // Simple contact API endpoint — sends email using SMTP configured via env
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, message, accept } = req.body || {};
      console.log('/api/contact received:', { name, email: email ? '[REDACTED]' : undefined, accept });

      if (!accept) {
        return res.status(400).json({ ok: false, error: 'privacy_required' });
      }
      if (!email || !message) {
        return res.status(400).json({ ok: false, error: 'missing_fields' });
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
