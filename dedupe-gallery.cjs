// One-off cleanup: delete duplicate galleryImage documents.
// The migration script ran 3x, creating duplicate docs (279 total, ~146 unique assets).
// Keeps the OLDEST document per referenced asset; deletes everything newer.
// ALWAYS writes a full JSON backup of all docs before deleting anything.
//
//   Dry run (default):  node --env-file=.env dedupe-gallery.cjs
//   Actually delete:    node --env-file=.env dedupe-gallery.cjs --execute
//   Restore later:      node --env-file=.env dedupe-gallery.cjs --restore backups/<file>.json

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || '3r8wb2ev',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.VITE_SANITY_TOKEN,
});

function assetKeyOf(doc) {
  return doc.image?.asset?._ref || doc.image?._ref || null;
}

async function main() {
  const execute = process.argv.includes('--execute');
  const restoreFileIdx = process.argv.indexOf('--restore');

  // ---------- RESTORE MODE ----------
  if (restoreFileIdx !== -1) {
    const file = process.argv[restoreFileIdx + 1];
    if (!file || !fs.existsSync(file)) {
      console.error('Usage: node --env-file=.env dedupe-gallery.cjs --restore backups/<file>.json');
      process.exit(1);
    }
    const backup = JSON.parse(fs.readFileSync(file, 'utf8'));
    const docs = backup.documents || [];
    console.log(`Restoring ${docs.length} documents from ${file}...`);
    for (let i = 0; i < docs.length; i += 100) {
      const batch = docs.slice(i, i + 100).map(({ _rev, ...doc }) => ({ ...doc, _id: doc._id }));
      await client.transaction(batch.map((doc) => client.createOrReplace(doc))).commit();
      console.log(`  restored ${Math.min(i + 100, docs.length)}/${docs.length}`);
    }
    console.log('Restore complete.');
    return;
  }

  // ---------- DEDUPE MODE ----------
  if (!process.env.VITE_SANITY_TOKEN) {
    console.error('VITE_SANITY_TOKEN missing from .env — a write token is required.');
    process.exit(1);
  }

  const docs = await client.fetch('*[_type == "galleryImage"]');
  console.log(`Fetched ${docs.length} galleryImage documents.`);

  // 1. Backup everything first
  const backupDir = path.join(__dirname, 'backups');
  fs.mkdirSync(backupDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const backupFile = path.join(backupDir, `galleryImage-backup-${stamp}.json`);
  fs.writeFileSync(
    backupFile,
    JSON.stringify({ exportedAt: new Date().toISOString(), projectId: client.config().projectId, dataset: client.config().dataset, count: docs.length, documents: docs }, null, 2)
  );
  console.log(`Backup written: ${path.relative(__dirname, backupFile)}`);

  // 2. Group by referenced asset
  const groups = new Map();
  for (const doc of docs) {
    const key = assetKeyOf(doc) || `__noref_${doc._id}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(doc);
  }

  // 3. Keep oldest per group, queue the rest for deletion
  const toDelete = [];
  for (const group of groups.values()) {
    if (group.length <= 1) continue;
    group.sort((a, b) => String(a._createdAt || '').localeCompare(String(b._createdAt || '')));
    toDelete.push(...group.slice(1));
  }

  console.log(`Unique assets: ${groups.get('__noref_') ? groups.size - 1 : groups.size}`);
  console.log(`Documents to delete: ${toDelete.length}`);
  console.log('Sample of what goes:');
  for (const d of toDelete.slice(0, 5)) {
    console.log(`  - ${d._id} | ${d.alt || 'no alt'} | created ${d._createdAt}`);
  }

  if (!execute) {
    console.log('\nDRY RUN — nothing deleted. Re-run with --execute to delete.');
    return;
  }

  // 4. Delete in batches
  let deleted = 0;
  for (let i = 0; i < toDelete.length; i += 100) {
    const batch = toDelete.slice(i, i + 100);
    const tx = client.transaction();
    for (const doc of batch) tx.delete(doc._id);
    await tx.commit();
    deleted += batch.length;
    console.log(`  deleted ${deleted}/${toDelete.length}`);
  }
  console.log(`\nDone. ${deleted} duplicates deleted. Full backup at ${path.relative(__dirname, backupFile)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
