// Migration script: Upload ALL images to Sanity
// Run with: SANITY_TOKEN=xxx node migrate-images.cjs
// Auto-discovers images in src/assets/ and uploads them as galleryImage documents

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: '3r8wb2ev',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

const ASSETS_DIR = path.join(__dirname, 'src', 'assets', 'images');
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp']);

const FOLDER_CATEGORY = {
  'events': 'events',
  'solutions': 'solutions',
  'about': 'about',
  'shared': 'home',
};

const SKIP_PATTERNS = [
  'duplicate', 'blurred', 'logo', 'primary-logo',
  'audience', 'meeting-duplicate', 'tree-planting-duplicate',
];

function shouldSkip(filename) {
  const lower = filename.toLowerCase();
  return SKIP_PATTERNS.some(p => lower.includes(p));
}

function inferCategory(filePath) {
  const rel = path.relative(ASSETS_DIR, filePath);
  const parts = rel.split(path.sep);
  return FOLDER_CATEGORY[parts[0]] || 'home';
}

function inferAlt(filename) {
  return filename
    .replace(/\.(jpg|jpeg|png|gif|webp)$/i, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim();
}

function walk(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walk(full));
    } else if (entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      if (!shouldSkip(entry.name)) {
        results.push(full);
      }
    }
  }
  return results;
}

async function migrate() {
  if (!process.env.SANITY_TOKEN) {
    console.error('Please set SANITY_TOKEN environment variable');
    process.exit(1);
  }

  const images = walk(ASSETS_DIR);
  console.log(`Found ${images.length} images to upload...`);

  // Skip assets that already have a galleryImage doc so re-runs don't create duplicates
  const existing = new Set();
  const existingDocs = await client.fetch(
    `*[_type == "galleryImage"] { _id, "assetRef": image._ref, "assetId": image.asset._ref }`
  );
  for (const doc of existingDocs || []) {
    const ref = doc.assetId || doc.assetRef;
    if (ref) existing.add(ref);
  }
  console.log(`${existing.size} galleryImage docs already exist; matching assets will be skipped.`);

  let success = 0;
  let failed = 0;
  let skipped = 0;

  for (let i = 0; i < images.length; i++) {
    const filePath = images[i];
    const filename = path.basename(filePath);
    const category = inferCategory(filePath);
    const alt = inferAlt(filename);

    try {
      const imageBuffer = fs.readFileSync(filePath);
      const asset = await client.assets.upload('image', imageBuffer, {
        filename,
        contentType: filename.endsWith('.png') ? 'image/png' : 'image/jpeg',
      });

      if (existing.has(asset._id)) {
        skipped++;
        process.stdout.write(`\r  skip ${skipped} - ${filename} already migrated\n`);
        continue;
      }

      // Canonical Sanity image field shape: the reference lives under image.asset
      await client.create({
        _type: 'galleryImage',
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id },
        },
        alt,
        caption: alt,
        category,
        order: i,
      });

      success++;
      process.stdout.write(`\r  ${success}/${images.length} - ${filename}\n`);
    } catch (err) {
      failed++;
      console.error(`\nFAIL: ${filename} → ${err.message}`);
    }
  }

  console.log(`\n\nMigration complete: ${success} uploaded, ${skipped} skipped (already existed), ${failed} failed`);
}

migrate();