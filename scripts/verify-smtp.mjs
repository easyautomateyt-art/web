import 'dotenv/config';
import nodemailer from 'nodemailer';

async function verify() {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined,
      secure: process.env.SMTP_SECURE === 'true',
      auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      } : undefined,
    });

    console.log('Verifying SMTP connection using:');
    console.log('SMTP_HOST=', process.env.SMTP_HOST);
    console.log('SMTP_PORT=', process.env.SMTP_PORT);
    console.log('SMTP_SECURE=', process.env.SMTP_SECURE);
    console.log('SMTP_USER=', process.env.SMTP_USER ? '[SET]' : '[NOT SET]');

    await transporter.verify();
    console.log('SMTP verification succeeded — credentials and connection OK.');
    process.exit(0);
  } catch (err) {
    console.error('SMTP verification failed:', err && err.message ? err.message : err);
    process.exit(2);
  }
}

verify();
