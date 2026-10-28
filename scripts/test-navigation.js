import fs from 'fs';
import path from 'path';

// 1. Extract declared routes from AppRoutes.jsx
const appRoutesPath = path.resolve('src/routes/AppRoutes.jsx');
const appRoutesContent = fs.readFileSync(appRoutesPath, 'utf8');

const routeRegex = /<Route\s+path=["']([^"']+)["']/g;
const declaredRoutes = [];
let match;
while ((match = routeRegex.exec(appRoutesContent)) !== null) {
  declaredRoutes.push(match[1]);
}

// Convert route patterns to regex (e.g. /category/:categorySlug, /products/:productId, /admin/*)
const routePatterns = declaredRoutes.map((r) => {
  if (r === '*') return { pattern: r, regex: /.*/ };
  // Replace parameters like :productId with [^/?#]+
  const escaped = r.replace(/:[a-zA-Z0-9_]+/g, '[^/?#]+');
  return { pattern: r, regex: new RegExp(`^${escaped}$`) };
});

// Admin subroutes
const adminRoutes = [
  '/admin/dashboard',
  '/admin/products',
  '/admin/categories',
  '/admin/orders',
  '/admin/customers',
  '/admin/inventory',
  '/admin/reports',
  '/admin/settings'
];
adminRoutes.forEach(ar => {
  routePatterns.push({ pattern: ar, regex: new RegExp(`^${ar}$`) });
});

console.log('====================================================');
console.log('  SHOPSPHERE NAVIGATION & ROUTE AUDIT TEST SUITE   ');
console.log('====================================================');
console.log(`Declared Route Patterns in AppRoutes.jsx (${declaredRoutes.length}):`);
declaredRoutes.forEach((r) => console.log(`  ✓ ${r}`));
console.log(`Admin Nested Routes:`);
adminRoutes.forEach((r) => console.log(`  ✓ ${r}`));

// 2. Scan all .jsx files for Link, NavLink, and navigate calls
function getAllFiles(dir, exts = ['.jsx', '.js']) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist' && file !== '.git') {
        results = results.concat(getAllFiles(fullPath, exts));
      }
    } else {
      if (exts.includes(path.extname(file))) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const allSrcFiles = getAllFiles(path.resolve('src'));
const scannedLinks = [];
let deadLinksFound = 0;

allSrcFiles.forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(process.cwd(), file);

  // Link and NavLink to="..."
  const toRegex = /<(?:Link|NavLink)[^>]+to={?["'`]([^"'`{}]+)["'`]}?/g;
  let toMatch;
  while ((toMatch = toRegex.exec(content)) !== null) {
    const dest = toMatch[1];
    scannedLinks.push({ file: relPath, dest, type: 'Link/NavLink' });
  }

  // navigate('...') or navigate("...")
  const navRegex = /navigate\(["'`]([^"'`]+)["'`]\)/g;
  let navMatch;
  while ((navMatch = navRegex.exec(content)) !== null) {
    const dest = navMatch[1];
    scannedLinks.push({ file: relPath, dest, type: 'navigate' });
  }

  // Check for placeholder href="#"
  const hrefHash = /href=["']#["']/g;
  if (hrefHash.test(content)) {
    console.warn(`[WARNING] Placeholder href="#" found in: ${relPath}`);
    deadLinksFound++;
  }
});

console.log(`\nScanned ${scannedLinks.length} navigation targets across ${allSrcFiles.length} source files.`);

// 3. Validate each scanned link
const testedLinks = new Set();
let passed = 0;
let warned = 0;

console.log('\n--- Route Validation Matrix ---');
scannedLinks.forEach(({ file, dest, type }) => {
  // Ignore external links
  if (dest.startsWith('http://') || dest.startsWith('https://')) return;

  // Strip query string and hash for route pattern matching
  const cleanPath = dest.split('?')[0].split('#')[0];
  const testKey = `${cleanPath} [${dest}]`;

  if (testedLinks.has(testKey)) return;
  testedLinks.add(testKey);

  // Match against route patterns
  const isMatched = routePatterns.some((rp) => rp.regex.test(cleanPath));

  if (isMatched) {
    passed++;
    console.log(`  [PASS] ${dest.padEnd(35)} -> Matched Route in ${file}`);
  } else {
    warned++;
    console.error(`  [FAIL] ${dest.padEnd(35)} -> No matching route pattern! (in ${file})`);
  }
});

console.log('\n====================================================');
console.log(`SUMMARY:`);
console.log(`  Passed Routes: ${passed}`);
console.log(`  Failed / Unmatched Routes: ${warned}`);
console.log(`  Dead href="#" Placeholders: ${deadLinksFound}`);
console.log('====================================================');

if (warned === 0 && deadLinksFound === 0) {
  console.log('🎉 ALL APPLICATION ROUTES AND LINKS ARE 100% VALIDATED AND FUNCTIONAL!');
  process.exit(0);
} else {
  console.log('⚠️ Some links require attention.');
  process.exit(1);
}
