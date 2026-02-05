# Deployment Guide

This project is designed to be **Host-Agnostic**. It generates a static Production Build that can be hosted anywhere.

## 🚀 How to Build
To generate the production-ready files, run:

```bash
npm install
npm run build
```

## 📂 Output
The build process creates a `dist/` folder.
**THIS IS THE ONLY FOLDER YOU NEED TO UPLOAD.**

It contains:
*   `index.html` and all site pages.
*   `css/` (Minified styles).
*   `js/` (Minified scripts).
*   `posts/` (Generated HTML articles & JSON index).
*   `assets/` (Images and fonts).
*   `sitemap.xml` & `robots.txt`.

## ☁️ Hosting Instructions

### 1. Netlify (Recommended)
*   **Build Command**: `npm run build`
*   **Publish Directory**: `dist`
*   *Note: `netlify.toml` is already configured for this.*

### 2. Vercel
*   Import the project from GitHub.
*   **Build Command**: `npm run build`
*   **Output Directory**: `dist`

### 3. cPanel / Apache / Nginx
1.  Run `npm run build` on your local machine.
2.  Zip the contents of the `dist/` folder.
3.  Upload the zip to your server's `public_html`.
4.  Unzip it. Done.

## 🔒 Security
The `dist/` folder **excludes**:
*   Source code scripts (`scripts/`)
*   Configuration files (`package.json`, `.git`)
*   Documentation files
This ensures your server only hosts the public files.

## ⚡ Performance
*   All CSS/JS is minified.
*   Images in articles use `loading="lazy"`.
