const fs = require('fs');
const path = require('path');

const root = process.cwd();
const cityPagesPath = path.join(root, 'client', 'src', 'data', 'city-pages.ts');
const mapPath = path.join(root, 'client', 'src', 'components', 'service-areas-map.tsx');

function parseCityPages(src) {
  const re = /\{\s*name:\s*"([^"]+)",\s*path:\s*"([^"]+)"\s*\}/g;
  const cities = [];
  let m;
  while ((m = re.exec(src)) !== null) {
    cities.push({ name: m[1], path: m[2] });
  }
  return cities;
}

function parseMapCoords(src) {
  const re = /"([^"]+)"\s*:\s*\[\s*([0-9.-]+)\s*,\s*([0-9.-]+)\s*\]/g;
  const coords = {};
  let m;
  while ((m = re.exec(src)) !== null) {
    coords[m[1]] = [parseFloat(m[2]), parseFloat(m[3])];
  }
  return coords;
}

try {
  const cityPagesSrc = fs.readFileSync(cityPagesPath, 'utf8');
  const mapSrc = fs.readFileSync(mapPath, 'utf8');

  const canonical = parseCityPages(cityPagesSrc);
  const coords = parseMapCoords(mapSrc);

  const report = {
    canonicalCount: canonical.length,
    coordCount: Object.keys(coords).length,
    missingCoords: [],
    invalidCoords: [],
    duplicates: [],
  };

  const seen = new Set();
  for (const c of canonical) {
    if (seen.has(c.name)) report.duplicates.push(c.name);
    seen.add(c.name);

    const cc = coords[c.name];
    if (!cc) report.missingCoords.push(c.name);
    else {
      const [lat, lng] = cc;
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) report.invalidCoords.push({ name: c.name, lat, lng });
      if (lat < 32 || lat > 36 || lng < -121 || lng > -116) report.invalidCoords.push({ name: c.name, lat, lng });
    }
  }

  console.log(JSON.stringify(report, null, 2));
  process.exit(0);
} catch (err) {
  console.error('ERROR', err && err.message);
  process.exit(2);
}
