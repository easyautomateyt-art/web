/**
 * Generates a valid, on-brand 1200x630 og-image.png with zero dependencies.
 * Solid brand background (#001F20) with cyan (#00E8E5) accent bands.
 * For a richer preview (logo + text), export public/og-image.svg to PNG and
 * overwrite public/og-image.png — the meta path stays the same.
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const W = 1200;
const H = 630;

const BG = [0x00, 0x1f, 0x20];
const CYAN = [0x00, 0xe8, 0xe5];
const TEAL = [0x00, 0x3a, 0x3b];

function mix(a, b, t) {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

// Build RGBA raster.
const raw = Buffer.alloc((W * 4 + 1) * H);
for (let y = 0; y < H; y++) {
  const rowStart = y * (W * 4 + 1);
  raw[rowStart] = 0; // filter type 0 (None)
  for (let x = 0; x < W; x++) {
    // Subtle diagonal gradient from BG to TEAL for depth.
    const g = (x / W) * 0.5 + (y / H) * 0.5;
    let [r, gr, b] = mix(BG, TEAL, g * 0.6);

    // Cyan accent band on the left edge.
    if (x < 18) [r, gr, b] = CYAN;
    // Thin cyan underline band near the lower third.
    if (y > 470 && y < 478 && x > 90 && x < 540) [r, gr, b] = CYAN;

    const o = rowStart + 1 + x * 4;
    raw[o] = r;
    raw[o + 1] = gr;
    raw[o + 2] = b;
    raw[o + 3] = 255;
  }
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const body = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body) >>> 0, 0);
  return Buffer.concat([len, body, crc]);
}

// CRC32 (PNG spec).
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return c ^ 0xffffffff;
}

const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 6; // color type RGBA
ihdr[10] = 0;
ihdr[11] = 0;
ihdr[12] = 0;

const idat = zlib.deflateSync(raw, { level: 9 });
const png = Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))]);

const out = path.resolve(__dirname, '..', 'public', 'og-image.png');
fs.writeFileSync(out, png);
console.log(`[og-image] wrote ${out} (${png.length} bytes)`);
