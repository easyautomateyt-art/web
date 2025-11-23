const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const base = path.join(__dirname, 'dist');

const mime = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

function sendFile(filePath, res) {
  const ext = path.extname(filePath);
  const type = mime[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': type });
  fs.createReadStream(filePath).pipe(res);
}

http.createServer((req, res) => {
  try {
    const decoded = decodeURIComponent(req.url.split('?')[0]);
    let reqPath = decoded === '/' ? '/index.html' : decoded;
    const safePath = path.normalize(path.join(base, reqPath));
    if (!safePath.startsWith(base)) {
      res.writeHead(400);
      return res.end('Bad Request');
    }

    fs.stat(safePath, (err, stats) => {
      if (!err && stats.isFile()) {
        return sendFile(safePath, res);
      }
      // fallback to index.html for SPA routing
      const index = path.join(base, 'index.html');
      fs.readFile(index, (err2, data) => {
        if (err2) {
          res.writeHead(404);
          return res.end('Not found');
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
    });
  } catch (e) {
    res.writeHead(500);
    res.end('Server error');
  }
}).listen(port, () => console.log(`Server listening on ${port}`));
