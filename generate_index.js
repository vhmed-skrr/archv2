const fs = require('fs');
const path = require('path');
const frontMatter = require('front-matter');
const { marked } = require('marked');
const { execSync } = require('child_process');
const ncp = require('ncp').ncp;

// Configuration
const CONFIG = {
    distDir: path.join(__dirname, '../dist'),
    srcDir: path.join(__dirname, '../'),
    postsDir: path.join(__dirname, '../posts'),
    siteUrl: 'https://egyptian-heritage.netlify.app'
};

// Ensure clean dist directory
if (fs.existsSync(CONFIG.distDir)) {
    fs.rmSync(CONFIG.distDir, { recursive: true, force: true });
}
fs.mkdirSync(CONFIG.distDir, { recursive: true });

console.log('🚀 Starting Build Process...');

// --- 1. Copy Static Assets (HTML, Fonts, Images, Admin) ---
const excludeList = ['node_modules', 'scripts', 'package.json', 'package-lock.json', '.git', '.gitignore', 'dist', 'posts', 'README.md', 'task.md', 'implementation_plan.md', 'cms_readme.md'];

fs.readdirSync(CONFIG.srcDir).forEach(file => {
    if (!excludeList.includes(file) && !file.startsWith('.')) {
        const srcPath = path.join(CONFIG.srcDir, file);
        const destPath = path.join(CONFIG.distDir, file);

        // Skip CSS/JS folders for now (handled by minification)
        if (file === 'css' || file === 'js') return;

        ncp(srcPath, destPath, (err) => {
            if (err) console.error(`Error copying ${file}:`, err);
        });
    }
});

// Copy posts implementation is handled separately below to generate HTML
fs.mkdirSync(path.join(CONFIG.distDir, 'posts'), { recursive: true });

// --- 2. Minify CSS ---
console.log('🎨 Minifying CSS...');
fs.mkdirSync(path.join(CONFIG.distDir, 'css'), { recursive: true });
try {
    execSync(`npx cleancss -o "${path.join(CONFIG.distDir, 'css/style.css')}" "${path.join(CONFIG.srcDir, 'css/style.css')}"`);
    console.log('✔ CSS Minified');
} catch (e) {
    console.error('CSS Minification failed:', e.message);
    // Fallback copy
    fs.copyFileSync(path.join(CONFIG.srcDir, 'css/style.css'), path.join(CONFIG.distDir, 'css/style.css'));
}

// --- 3. Minify JS ---
console.log('📜 Minifying JS...');
fs.mkdirSync(path.join(CONFIG.distDir, 'js'), { recursive: true });
try {
    execSync(`npx terser "${path.join(CONFIG.srcDir, 'js/script.js')}" -o "${path.join(CONFIG.distDir, 'js/script.js')}"`);
    console.log('✔ JS Minified');
} catch (e) {
    console.error('JS Minification failed:', e.message);
    // Fallback copy
    fs.copyFileSync(path.join(CONFIG.srcDir, 'js/script.js'), path.join(CONFIG.distDir, 'js/script.js'));
}

// --- 4. Process Content (Posts & Sitemap) ---
console.log('📝 Processing Content...');
const templatePath = path.join(CONFIG.postsDir, '_article_template.html');
let template = '';
if (fs.existsSync(templatePath)) {
    template = fs.readFileSync(templatePath, 'utf8');
}

const posts = [];
const sitemapUrls = [`${CONFIG.siteUrl}/index.html`];

fs.readdirSync(CONFIG.postsDir).forEach(file => {
    if (path.extname(file) === '.md' && file !== 'README.md') {
        const content = fs.readFileSync(path.join(CONFIG.postsDir, file), 'utf8');
        try {
            const parsed = frontMatter(content);
            const data = parsed.attributes;
            const slug = file.replace('.md', '');
            const postUrl = `posts/${slug}.html`;

            data.path = postUrl;
            if (!data.title) data.title = slug;
            if (!data.date) data.date = new Date().toISOString().split('T')[0];

            posts.push(data);
            sitemapUrls.push(`${CONFIG.siteUrl}/${postUrl}`);

            // Generate HTML Page
            if (template) {
                const htmlContent = marked(parsed.body);
                let pageHtml = template
                    .replace(/{{title}}/g, data.title)
                    .replace(/{{description}}/g, data.description || '')
                    .replace(/{{author}}/g, data.author || 'Egyptian Heritage Team')
                    .replace(/{{date}}/g, data.date)
                    .replace(/{{era}}/g, data.era || 'General')
                    .replace(/{{image}}/g, `${CONFIG.siteUrl}/${data.image}`)
                    .replace(/{{image_raw}}/g, data.image)
                    .replace(/{{url}}/g, `${CONFIG.siteUrl}/${postUrl}`)
                    .replace(/{{content}}/g, htmlContent)
                    .replace(/{{lang}}/g, 'en')
                    .replace(/{{dir}}/g, 'ltr');

                // Dynamic Tags
                let tagsHtml = '';
                if (data.tags && Array.isArray(data.tags)) {
                    tagsHtml = data.tags.map(t => `<span class="tag-item">#${t}</span>`).join(' ');
                }
                pageHtml = pageHtml.replace(/{{tags}}/g, (data.tags || []).join(', '))
                    .replace(/{{tags_html}}/g, tagsHtml);

                // Inject Lazy Loading for Article Images
                pageHtml = pageHtml.replace(/<img /g, '<img loading="lazy" ');

                fs.writeFileSync(path.join(CONFIG.distDir, 'posts', `${slug}.html`), pageHtml);
            }
        } catch (e) {
            console.warn(`Skipping ${file}: ${e.message}`);
        }
    }
});

// Write Index JSON
posts.sort((a, b) => new Date(b.date) - new Date(a.date));
fs.writeFileSync(path.join(CONFIG.distDir, 'posts/index.json'), JSON.stringify(posts, null, 4));

// Write Sitemap
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(url => `
    <url>
        <loc>${url}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${url.endsWith('index.html') ? '1.0' : '0.8'}</priority>
    </url>
`).join('')}
</urlset>`;
fs.writeFileSync(path.join(CONFIG.distDir, 'sitemap.xml'), sitemapContent);

console.log('✅ Build Complete! Output directory: dist/');
