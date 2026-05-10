const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const assetsDir = path.join(__dirname, '..', 'src', 'assets');

const images = [
  // Profile / people
  'NorielFulgencio.png',
  'NorielFulgencio2.png',
  'RobertHerjavec.png',
  'SteveJobs.jpg',
  'MarkTwain.jpg',
  // Services
  'Services1.png',
  'Services2.png',
  'Services3.png',
  'Services3a.png',
  // Hero backgrounds
  'HeroBackground.png',
  'HeroBackgroundv2.png',
  'HeroBackgroundv3.png',
  // Thumbnails
  'ZentraCRM.png',
  'RealtorHQ.png',
  'ParkCabins.png',
  'SaasProjectManagement.png',
  'Zonify.png',
  // Project 1
  'Project1a.png', 'Project1b.png', 'Project1c.png', 'Project1d.png',
  'Project1e.png', 'Project1f.png', 'Project1g.png', 'Project1h.png',
  'Project1i.png', 'Project1j.png', 'Project1k.png',
  // Project 2
  'Project2a.png', 'Project2b.png', 'Project2c.png', 'Project2d.png',
  // Project 3
  'Project3a.png', 'Project3b.png', 'Project3c.png', 'Project3d.png',
  'Project3e.png', 'Project3f.png', 'Project3g.png',
  // Project 4
  'Project4a.png', 'Project4b.png', 'Project4c.png', 'Project4d.png',
  'Project4e.png', 'Project4f.png',
  // Project 5
  'Project5a.png', 'Project5b.png', 'Project5c.png', 'Project5d.png',
  'Project5e.png', 'Project5f.png', 'Project5g.png', 'Project5h.png',
  // Project 6
  'Project6a.png', 'Project6b.png', 'Project6c.png', 'Project6d.png',
  'Project6e.png', 'Project6f.png', 'Project6g.png', 'Project6h.png',
];

async function convert() {
  let converted = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of images) {
    const inputPath = path.join(assetsDir, file);
    const baseName = path.basename(file, path.extname(file));
    const outputPath = path.join(assetsDir, `${baseName}.webp`);

    if (!fs.existsSync(inputPath)) {
      console.log(`SKIP (not found): ${file}`);
      skipped++;
      continue;
    }

    if (fs.existsSync(outputPath)) {
      console.log(`SKIP (already exists): ${baseName}.webp`);
      skipped++;
      continue;
    }

    try {
      await sharp(inputPath).webp({ quality: 82 }).toFile(outputPath);
      const inSize = (fs.statSync(inputPath).size / 1024).toFixed(1);
      const outSize = (fs.statSync(outputPath).size / 1024).toFixed(1);
      console.log(`OK: ${file} (${inSize} KB) -> ${baseName}.webp (${outSize} KB)`);
      converted++;
    } catch (err) {
      console.error(`FAIL: ${file} - ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone: ${converted} converted, ${skipped} skipped, ${failed} failed.`);
}

convert();
