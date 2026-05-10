/**
 * Generate 1x (half-size) variants of oversized images for srcset delivery.
 * Lighthouse flags these images as too large for their display dimensions:
 *
 *  NorielFulgencio_AboutMe.webp  740×899  → also create 370×449  (1x, displayed at max 370px)
 *  softdev.webp                  700×503  → also create 626×450  (2x) and 313×225 (1x, displayed at 313px)
 *  automation.webp               700×503  → same
 *  webdev.webp                   700×503  → same
 *
 * Run: node scripts/resize-images.js
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const assets = path.join(__dirname, '..', 'src', 'assets');

const tasks = [
  // About Me image — create 1x version (original 740px is the 2x)
  {
    input: 'NorielFulgencio_AboutMe.webp',
    output: 'NorielFulgencio_AboutMe_1x.webp',
    width: 370,
    quality: 80,
  },
  // Services images — 2x variant (resize from 700 → 626) and 1x variant
  { input: 'softdev.webp',    output: 'softdev_2x.webp',    width: 626, quality: 80 },
  { input: 'softdev.webp',    output: 'softdev_1x.webp',    width: 313, quality: 80 },
  { input: 'automation.webp', output: 'automation_2x.webp', width: 626, quality: 80 },
  { input: 'automation.webp', output: 'automation_1x.webp', width: 313, quality: 80 },
  { input: 'webdev.webp',     output: 'webdev_2x.webp',     width: 626, quality: 80 },
  { input: 'webdev.webp',     output: 'webdev_1x.webp',     width: 313, quality: 80 },
];

(async () => {
  for (const { input, output, width, quality } of tasks) {
    const inputPath = path.join(assets, input);
    const outputPath = path.join(assets, output);
    if (!fs.existsSync(inputPath)) {
      console.warn(`[skip] ${input} not found`);
      continue;
    }
    await sharp(inputPath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toFile(outputPath);
    const kb = (fs.statSync(outputPath).size / 1024).toFixed(1);
    console.log(`[done] ${output} — ${kb} KiB`);
  }
  console.log('\nAll variants created. Update components to use srcset.');
})();
