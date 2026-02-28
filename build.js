const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
const css = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf-8');
const js = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf-8');

const finalHtml = html
    .replace('<link rel="stylesheet" href="style.css">', `<style>${css}</style>`)
    .replace('<script src="script.js"></script>', `<script>${js}</script>`);

fs.writeFileSync(path.join(distDir, 'index.html'), finalHtml);

console.log('Build successful! The serverless file is located at dist/index.html');
