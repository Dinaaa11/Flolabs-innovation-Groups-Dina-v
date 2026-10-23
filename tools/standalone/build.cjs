const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const postcss = require('../../uploads/flolabs-library1/node_modules/postcss');
const tailwind = require('../../uploads/flolabs-library1/node_modules/@tailwindcss/postcss');

const root = path.resolve(__dirname, '../..');
const app = path.join(root, 'uploads', 'flolabs-library1');
const outDir = path.join(root, 'tools', 'standalone', 'dist');
fs.mkdirSync(outDir, { recursive: true });

const esbuild = path.join(app, 'node_modules', 'esbuild', 'bin', 'esbuild');
const esbuildCmd = fs.existsSync(esbuild) ? esbuild : 'npx';
const esbuildArgs = fs.existsSync(esbuild)
  ? []
  : ['--yes', 'esbuild'];

execFileSync(
  esbuildCmd,
  [
    ...esbuildArgs,
    path.join(__dirname, 'entry.tsx'),
    '--bundle',
    '--format=iife',
    '--jsx=automatic',
    '--outfile=' + path.join(outDir, 'app.js'),
    '--alias:next/navigation=' + path.join(__dirname, 'next-shim.tsx'),
    '--alias:next/link=' + path.join(__dirname, 'next-shim.tsx'),
    '--define:process.env.NODE_ENV="production"',
  ],
  { cwd: app, stdio: 'inherit', shell: true }
);

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
