Local testing and Git push instructions for the contact flow

1) Purpose
- This file explains how to run the server locally using your SMTP credentials, how to verify SMTP without sending a message, and how to push changes to GitHub.

2) Add your local `.env` (development only)
- Copy the example and fill in secrets (DO NOT commit `.env`):

  cp .env.example .env
  # Then edit .env and set SMTP_PASS to your real password

3) Install dependencies and build
- In PowerShell (project root):
```powershell
npm install
npm run build
```

4) Start the server locally
- The `server.mjs` loads `.env` in development (via `dotenv`). Start the server:
```powershell
npm start
```
- The server listens on `PORT` from environment or default `80`.

5) Verify SMTP credentials (no email sent)
- Using PowerShell `Invoke-RestMethod`:
```powershell
$resp = Invoke-RestMethod -Method Post -Uri http://localhost:80/api/contact/verify -ContentType 'application/json'
$resp | ConvertTo-Json
```
- Expected success response: `{ "ok": true, "message": "SMTP verified" }`.
- On failure, check server logs for details (credentials, firewall, port, TLS).

6) Send a test contact submission
- PowerShell example (sends using actual SMTP configured in env):
```powershell
$body = @{ name='Prueba'; email='tu@correo.com'; message='Hola desde test'; accept=$true } | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri http://localhost:80/api/contact -Body $body -ContentType 'application/json'
```
- Expected response: `{ "ok": true }` and server logs will show `Contact email sent:` with an id.

7) If SMTP fails locally
- Try Mailtrap or a test SMTP provider to ensure credentials and ports work.
- Check if your environment is blocking outbound SMTP ports (some ISPs block 25/465/587).
- If using port 465, ensure `SMTP_SECURE=true`; for 587 use `SMTP_SECURE=false` and STARTTLS.

9) Using Mailtrap for safe testing (optional)
- Why Mailtrap: Mailtrap is a testing SMTP inbox that captures email without delivering to real recipients. It avoids sending test messages to real user inboxes while you debug and iterate.
- When to use it: during development or CI tests. If your current SMTP (Hostinger) already works and you are comfortable sending test mails to the real admin inbox, Mailtrap is optional. It's recommended when multiple developers test or automated tests run to avoid accidental real emails.
- How to use Mailtrap: create an account at https://mailtrap.io, get SMTP credentials, and temporarily replace your `.env` values with Mailtrap's credentials. Example `.env` changes:

```
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_SECURE=false
SMTP_USER=your_mailtrap_user
SMTP_PASS=your_mailtrap_pass
FROM_EMAIL=no-reply@example.com
TO_EMAIL=your@inbox.mailtrap.io
```

After testing, revert to your Hostinger credentials.

8) Review logs
- Server prints useful diagnostics when import or sending fails. If you see `nodemailer import failed`, ensure `npm install` installed `nodemailer`.
- If you see `Contact email sent:` then the provider accepted the message. Track deliverability in your SMTP provider dashboard.

9) Commit & push to GitHub
- Typical git commands (run in project root):
```powershell
git add .
git commit -m "feat: add smtp verify endpoint and dotenv for local testing"
git push origin main
```
- Note: Do NOT commit `.env`. Ensure `.gitignore` contains `.env`.

10) Deploying to Easypanel / Production
- Use your platform UI to set the same env vars (SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, FROM_EMAIL, TO_EMAIL).
- Deploy and watch build logs to confirm `npm ci` installed dependencies.
- After deploy, trigger a test submission from the site and watch server logs for `Contact email sent:` or errors.

If you want, I can also add an npm script `verify-smtp` to call the verify endpoint or use a small Node script to call transporter.verify locally. Tell me if you want that and I will add it.
