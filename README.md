# FloLabs Innovations Group

Redesign workspace for the FloLabs site (Next.js app + static GitHub Pages build).

## Layout

```text
.
├── site/                         # Static Pages entry (standalone HTML)
│   ├── index.html
│   └── flolabs-standalone.html
├── uploads/
│   └── flolabs-library1/         # Next.js app (source of truth for UI)
├── tools/
│   └── standalone/               # Bundle scripts for site/*.html
├── archive/
│   ├── uploads-scratch/          # Old loose logos / paste dumps
│   └── site-legacy/              # Older standalone snapshots
├── .github/workflows/pages.yml   # Deploys site/ + public assets
└── PRODUCT.md
```

## App

```bash
cd uploads/flolabs-library1
npm install
npm run dev
```

## Rebuild static site

```bash
node tools/standalone/rebuild-ui.cjs
```

Writes `site/flolabs-standalone.html` and `site/index.html`.

## GitHub Pages

Workflow copies `site/flolabs-standalone.html` → `_site/index.html` and mirrors `uploads/flolabs-library1/public` assets.

Live: https://dinaaa11.github.io/Flolabs-innovation-Groups-Dina-v/

## Notes

- `Flolabs-innovation-Groups-Dina/` is a legacy nested gitlink; ignore for day-to-day work.
- Keep product UI changes in `uploads/flolabs-library1`, then rebuild `site/` before push when Pages must update.
