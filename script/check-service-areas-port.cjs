const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || process.argv[2] || '4173';
const url = `http://localhost:${port}/service-areas`;
const canonicalSrc = fs.readFileSync(path.join(process.cwd(), 'client', 'src', 'data', 'city-pages.ts'), 'utf8');
const cityRe = /\{\s*name:\s*"([^"]+)",\s*path:\s*"([^"]+)"\s*\}/g;
const expected = [];
let m;
while ((m = cityRe.exec(canonicalSrc)) !== null) {
  expected.push(m[2]);
}

http.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk.toString());
  res.on('end', () => {
    const missing = [];
    for (const p of expected) {
      if (!data.includes(`href=\"${p}\"`) && !data.includes(`href=\'${p}\'`) && !data.includes(`href=\"http://localhost:${port}${p}\"`) && !data.includes(`>${p}<`) && !data.includes(`${p}</a>`)) {
        missing.push(p);
      }
    }
    const result = {
      url,
      expectedCount: expected.length,
      missingCount: missing.length,
      missing,
    };
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
  });
}).on('error', (err) => {
  console.error('FETCH_ERROR', err && err.message);
  process.exit(2);
});
