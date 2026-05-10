/**
 * Post-build script: Inline the CSS bundle into index.html
 *
 * Eliminates the render-blocking CSS network request from the critical path.
 * The CSS (after Tailwind purge) is ~7 KiB — small enough to inline entirely.
 * Result: browser renders with a single HTML request instead of HTML → CSS chain.
 */

const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');
const manifestPath = path.join(buildDir, 'asset-manifest.json');
const htmlPath = path.join(buildDir, 'index.html');

try {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const cssRelPath = manifest.files['main.css']; // e.g. "/static/css/main.42f92018.css"

  if (!cssRelPath) {
    console.log('[inline-css] No main.css in manifest — skipping.');
    process.exit(0);
  }

  // Strip leading slash to get filesystem path
  const cssFilePath = path.join(buildDir, cssRelPath.replace(/^\//, ''));
  const css = fs.readFileSync(cssFilePath, 'utf8');

  let html = fs.readFileSync(htmlPath, 'utf8');

  // Replace the external <link rel="stylesheet"> with an inline <style> block
  const linkTagRegex = /<link href="[^"]*\.css" rel="stylesheet">/;
  if (!linkTagRegex.test(html)) {
    console.log('[inline-css] No CSS <link> tag found in index.html — skipping.');
    process.exit(0);
  }

  html = html.replace(linkTagRegex, `<style>${css}</style>`);
  fs.writeFileSync(htmlPath, html, 'utf8');

  // Also remove the now-unused CSS file and its source map to keep build clean
  fs.unlinkSync(cssFilePath);
  const mapPath = cssFilePath + '.map';
  if (fs.existsSync(mapPath)) fs.unlinkSync(mapPath);

  const sizeKb = (css.length / 1024).toFixed(2);
  console.log(`[inline-css] Inlined ${sizeKb} KiB of CSS into index.html. Critical path chain eliminated.`);
} catch (err) {
  console.error('[inline-css] Error:', err.message);
  process.exit(1);
}
