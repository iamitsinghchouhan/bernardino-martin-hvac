import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = 'client/public';
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

const configs = {
  hero: { width: 1920, height: 1080, quality: 75 },
  gallery: { width: 800, height: 600, quality: 70 },
  service: { width: 640, height: 480, quality: 70 },
  logo: { width: 128, height: 128, quality: 80 },
  favicon: { width: 64, height: 64, quality: 80 },
  og: { width: 1200, height: 630, quality: 75 },
};

function getConfig(filename) {
  if (filename.includes('hero') || filename === 'real-solar-install') return configs.hero;
  if (filename.startsWith('real-')) return configs.gallery;
  if (filename.startsWith('svc-')) return configs.service;
  if (filename === 'technician' || filename === 'happy-family-tech') return configs.gallery;
  if (filename === 'ac-repair' || filename === 'heating' || filename === 'solar-service') return configs.service;
  return configs.gallery;
}

async function optimizeImage(inputPath, outputPath, config) {
  const { width, height, quality } = config;
  await sharp(inputPath)
    .resize(width, height, { fit: 'cover', withoutEnlargement: true })
    .webp({ quality, effort: 4 })
    .toFile(outputPath);
}

async function main() {
  let totalOriginal = 0;
  let totalOptimized = 0;
  let count = 0;

  const imageFiles = fs.readdirSync(IMAGES_DIR).filter(f => f.endsWith('.png') || f.endsWith('.jpg'));
  
  for (const file of imageFiles) {
    const inputPath = path.join(IMAGES_DIR, file);
    const baseName = path.parse(file).name;
    const outputPath = path.join(IMAGES_DIR, `${baseName}.webp`);
    const config = getConfig(baseName);
    
    try {
      const originalSize = fs.statSync(inputPath).size;
      await optimizeImage(inputPath, outputPath, config);
      const newSize = fs.statSync(outputPath).size;
      
      totalOriginal += originalSize;
      totalOptimized += newSize;
      count++;
      
      const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
      console.log(`${file} → ${baseName}.webp: ${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB (${savings}% smaller)`);
    } catch (err) {
      console.error(`Failed: ${file}:`, err.message);
    }
  }

  const logoInput = path.join(PUBLIC_DIR, 'logo-bm.png');
  if (fs.existsSync(logoInput)) {
    const originalSize = fs.statSync(logoInput).size;
    await sharp(logoInput)
      .resize(configs.logo.width, configs.logo.height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: configs.logo.quality })
      .toFile(path.join(PUBLIC_DIR, 'logo-bm.webp'));
    const newSize = fs.statSync(path.join(PUBLIC_DIR, 'logo-bm.webp')).size;
    totalOriginal += originalSize;
    totalOptimized += newSize;
    count++;
    console.log(`logo-bm.png → logo-bm.webp: ${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB`);
  }

  const faviconInput = path.join(PUBLIC_DIR, 'favicon.png');
  if (fs.existsSync(faviconInput)) {
    const originalSize = fs.statSync(faviconInput).size;
    await sharp(faviconInput)
      .resize(configs.favicon.width, configs.favicon.height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: configs.favicon.quality })
      .toFile(path.join(PUBLIC_DIR, 'favicon.webp'));
    const newSize = fs.statSync(path.join(PUBLIC_DIR, 'favicon.webp')).size;
    totalOriginal += originalSize;
    totalOptimized += newSize;
    count++;
    console.log(`favicon.png → favicon.webp: ${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB`);
  }

  const ogInput = path.join(PUBLIC_DIR, 'opengraph.jpg');
  if (fs.existsSync(ogInput)) {
    const originalSize = fs.statSync(ogInput).size;
    await sharp(ogInput)
      .resize(configs.og.width, configs.og.height, { fit: 'cover' })
      .webp({ quality: configs.og.quality })
      .toFile(path.join(PUBLIC_DIR, 'opengraph.webp'));
    const newSize = fs.statSync(path.join(PUBLIC_DIR, 'opengraph.webp')).size;
    totalOriginal += originalSize;
    totalOptimized += newSize;
    count++;
    console.log(`opengraph.jpg → opengraph.webp: ${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB`);
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Optimized ${count} images`);
  console.log(`Original total: ${(totalOriginal / 1024 / 1024).toFixed(1)}MB`);
  console.log(`Optimized total: ${(totalOptimized / 1024 / 1024).toFixed(1)}MB`);
  console.log(`Total savings: ${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}%`);
}

main().catch(console.error);
