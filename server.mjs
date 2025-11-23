import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

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
  const distPath = path.join(__dirname, 'dist');

  app.use(express.static(distPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });

  app.listen(port, () => {
    console.log(`Server listening on ${port}`);
  });
}

startServer();
