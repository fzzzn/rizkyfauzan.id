import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const PUBLIC_DIR = './public';
const QUALITY = 80;

async function optimizeImages() {
  console.log('🖼️  Optimizing images...\n');
  
  const files = await readdir(PUBLIC_DIR);
  const imageFiles = files.filter(f => 
    ['.png', '.jpg', '.jpeg'].includes(extname(f).toLowerCase()) &&
    !f.includes('-optimized')
  );

  for (const file of imageFiles) {
    const inputPath = join(PUBLIC_DIR, file);
    const stats = await stat(inputPath);
    const originalSize = stats.size;
    
    // Skip small images (icons, favicons)
    if (originalSize < 50000) {
      console.log(`⏭️  Skipping ${file} (${(originalSize / 1024).toFixed(1)} KB - too small)`);
      continue;
    }

    const name = basename(file, extname(file));
    const webpPath = join(PUBLIC_DIR, `${name}.webp`);
    
    try {
      // Create WebP version
      await sharp(inputPath)
        .webp({ quality: QUALITY })
        .toFile(webpPath);
      
      const webpStats = await stat(webpPath);
      const savings = ((1 - webpStats.size / originalSize) * 100).toFixed(1);
      
      console.log(`✅ ${file} → ${name}.webp`);
      console.log(`   ${(originalSize / 1024).toFixed(1)} KB → ${(webpStats.size / 1024).toFixed(1)} KB (${savings}% smaller)\n`);
    } catch (err) {
      console.error(`❌ Failed to optimize ${file}:`, err.message);
    }
  }
  
  console.log('✨ Image optimization complete!');
}

optimizeImages().catch(console.error);
