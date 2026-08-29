const fs = require('fs');
const path = require('path');

const distPath = path.join(process.cwd(), 'dist', 'index.cjs');
if (!fs.existsSync(distPath)) {
  console.error('dist/index.cjs not found');
  process.exit(2);
}
const src = fs.readFileSync(distPath, 'utf8');

const arrRe = /var\s+ru\s*=\s*"[^"]+",_N=\[([^\]]+)\]/m;
const m = arrRe.exec(src);
const result = { foundArray: false, paths: [], serverBlock: false };
if (m) {
  result.foundArray = true;
  const body = m[1];
  const pathRe = /path:\s*"([^"]+)"/g;
  let mm;
  while ((mm = pathRe.exec(body)) !== null) {
    result.paths.push(mm[1]);
  }
}

result.serverBlock = /class="server-service-areas"/.test(src) || /server-service-areas/.test(src);

console.log(JSON.stringify(result, null, 2));
if (!result.foundArray) process.exit(3);
if (result.paths.length === 0) process.exit(4);
process.exit(0);
