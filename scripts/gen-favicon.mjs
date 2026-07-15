/**
 * gen-favicon.mjs — generate favicon.ico from web-app-manifest-192x192.png
 *
 * Uses only `sharp` (already a Next.js transitive dependency).
 * Writes a valid multi-size ICO (16×16 + 32×32 + 48×48) that browsers accept.
 *
 * ICO format reference:
 *   ICONDIR  (6 bytes)
 *   ICONDIRENTRY × N (16 bytes each)
 *   PNG/BMP image blobs (variable)
 */

import sharp from 'sharp';
import { writeFileSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const SRC = resolve(root, 'public', 'web-app-manifest-192x192.png');
const DST_APP = resolve(root, 'src', 'app', 'favicon.ico');
const DST_PUB = resolve(root, 'public', 'favicon.ico');
const DST_ICON = resolve(root, 'public', 'favicon-96x96.png');

const SIZES = [16, 32, 48];

async function pngAt(size) {
  return sharp(SRC).resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
}

function writeICO(pngs) {
  const count = pngs.length;

  // ICONDIR: reserved(2) + type(2) + count(2)
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);   // reserved
  header.writeUInt16LE(1, 2);   // type = ICO
  header.writeUInt16LE(count, 4);

  // Offset of first image = header + all entries
  let offset = 6 + 16 * count;

  const entries = [];
  for (let i = 0; i < count; i++) {
    const size = SIZES[i];
    const blob = pngs[i];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0);   // width  (0 = 256)
    entry.writeUInt8(size === 256 ? 0 : size, 1);   // height
    entry.writeUInt8(0, 2);                          // colour count (0 = >256)
    entry.writeUInt8(0, 3);                          // reserved
    entry.writeUInt16LE(1, 4);                       // colour planes
    entry.writeUInt16LE(32, 6);                      // bits per pixel
    entry.writeUInt32LE(blob.length, 8);             // image data size
    entry.writeUInt32LE(offset, 12);                 // offset of image data
    entries.push(entry);
    offset += blob.length;
  }

  return Buffer.concat([header, ...entries, ...pngs]);
}

async function main() {
  console.log('Generating favicon sizes…');
  const pngs = await Promise.all(SIZES.map(pngAt));

  const ico = writeICO(pngs);

  writeFileSync(DST_APP, ico);
  console.log(`✓ ${DST_APP} (${ico.length} bytes)`);

  writeFileSync(DST_PUB, ico);
  console.log(`✓ ${DST_PUB} (${ico.length} bytes)`);

  // Also regenerate the 96px PNG for the metadata icons array
  const png96 = await pngAt(96);
  writeFileSync(DST_ICON, png96);
  console.log(`✓ ${DST_ICON} (${png96.length} bytes)`);

  console.log('Done.');
}

main().catch(err => { console.error(err); process.exit(1); });
