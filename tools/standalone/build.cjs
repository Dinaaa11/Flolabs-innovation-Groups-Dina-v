const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { createRequire } = require('module');

const root = path.resolve(__dirname, '../..');
const app = path.join(root, 'uploads', 'flolabs-library1');
const appRequire = createRequire(path.join(app, 'package.json'));
const postcss = appRequire('postcss');
const tailwind = appRequire('@tailwindcss/postcss');

const outDir = path.join(root, 'tools', 'standalone', 'dist');
fs.mkdirSync(outDir, { recursive: true });

const esbuild = appRequire('esbuild');

esbuild.buildSync({
  absWorkingDir: app,
  entryPoints: [path.join(__dirname, 'entry.tsx')],
  bundle: true,
  format: 'iife',
  jsx: 'automatic',
  outfile: path.join(outDir, 'app.js'),
  alias: {
    'next/navigation': path.join(__dirname, 'next-shim.tsx'),
    'next/link': path.join(__dirname, 'next-shim.tsx'),
  },
  define: { 'process.env.NODE_ENV': '"production"' },
  nodePaths: [path.join(app, 'node_modules')],
});

const exportFile = path.join(outDir, 'export-meetings.cjs');
esbuild.buildSync({
  absWorkingDir: app,
  entryPoints: [path.join(__dirname, 'export-meetings.ts')],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  outfile: exportFile,
  nodePaths: [path.join(app, 'node_modules')],
});

const envCandidates = [
  path.join(app, '.env.local'),
  path.join(root, '..', 'env'),
].filter((file) => fs.existsSync(file));

let meetingData = { meetings: [], details: {} };
if (envCandidates[0]) {
  const exported = spawnSync(process.execPath, [exportFile], {
    env: { ...process.env, FLO_ENV_FILE: envCandidates[0] },
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
  if (exported.status !== 0) {
    console.error(exported.stderr || 'meeting export failed');
    process.exit(exported.status || 1);
  }
  const jsonLine = exported.stdout.split('\n').map((line) => line.trim()).filter((line) => line.startsWith('{')).pop();
  meetingData = JSON.parse(jsonLine || '');
  console.log('meetings', meetingData.meetings.length);
} else {
  console.error('no env file found for meeting export');
  process.exit(1);
}

const meetingScript = `window.__FLO_MEETINGS__=${JSON.stringify(meetingData.meetings).replace(/</g, '\\u003c')};window.__FLO_DETAILS__=${JSON.stringify(meetingData.details).replace(/</g, '\\u003c')};`;

const cssSource = fs.readFileSync(path.join(app, 'src', 'index.css'), 'utf8');
postcss([tailwind()])
  .process(cssSource, { from: path.join(app, 'src', 'index.css') })
  .then((result) => {
    let js = fs.readFileSync(path.join(outDir, 'app.js'), 'utf8');
    const asset = 'uploads/flolabs-library1/public';
    js = js.replace(
      /(["'`])(\/(?:about|logos|projects|verticals)\/[^"'`]+|\/[A-Za-z0-9_.-]+\.(?:png|svg|webp|jpe?g|gif))/g,
      (_, quote, file) => `${quote}${asset}${file}`
    );
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Flolabs innovation Group</title>
<link rel="icon" href="${asset}/logos/logo-87ef29e9.png" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700&family=Google+Sans+Flex:opsz,wght@6..144,1..1000&family=Google+Sans:wght@400;500;700&family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>
${result.css}
</style>
</head>
<body>
<div id="root"></div>
<script>${meetingScript}</script>
<script>
${js}
</script>
</body>
</html>
`;
    const target = path.join(root, 'flolabs-standalone.html');
    fs.writeFileSync(target, html);
    console.log('wrote', target, html.length);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
