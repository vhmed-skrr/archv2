# ✅ Netlify Deployment Checklist
# قائمة التحقق قبل الرفع على Netlify

---

## 📋 Pre-Deployment Checklist

### 1. File Structure ✅
- [x] `index.html` in root directory
- [x] `css/style.css` exists
- [x] `js/script.js` exists
- [ ] `images/` folder has all required images ❌ **MISSING!**
- [x] `data/` folder with JSON files
- [x] `admin/` folder for CMS
- [x] `netlify.toml` configuration file

---

### 2. File Paths Verification ✅

**All paths are CORRECT (relative):**
- ✅ `<link href="css/style.css">`
- ✅ `<script src="js/script.js">`
- ✅ No local paths (D:/ or file:///)
- ✅ No absolute paths

---

### 3. Case Sensitivity ✅

**All filenames use lowercase:**
- ✅ `css/` (not CSS/)
- ✅ `style.css` (not Style.css)
- ✅ `js/` (not JS/)
- ✅ `script.js` (not Script.js)

---

### 4. Required Images ❌ **ACTION NEEDED**

**Missing images in `images/` folder:**
- [ ] `hero_bg.jpg` - Homepage background
- [ ] `era_ancient.jpg` - Ancient Egypt
- [ ] `era_ptolemaic.jpg` - Ptolemaic era
- [ ] `era_coptic.jpg` - Coptic era
- [ ] `era_islamic.jpg` - Islamic era
- [ ] `era_muhammad_ali.jpg` - Muhammad Ali
- [ ] `era_modern.jpg` - Modern Egypt

**How to fix:**
1. See `IMAGE_SOURCING_GUIDE.md`
2. See `VISUAL_IDENTITY.md` for specs
3. Download from Unsplash/Pexels
4. Or generate with AI (Midjourney, DALL-E)

---

### 5. Folder Structure

```
✅ CORRECT STRUCTURE:

web v/                          
├── index.html                  ✅
├── about.html                  ✅
├── contact.html                ✅
├── periods.html                ✅
├── types.html                  ✅
├── era.html                    ✅
├── 404.html                    ✅
├── netlify.toml                ✅
├── _redirects                  ✅
│
├── css/                        ✅
│   └── style.css              ✅
│
├── js/                         ✅
│   └── script.js              ✅
│
├── images/                     ⚠️ EMPTY!
│   └── README.md              ✅
│
├── assets/                     ✅
│   └── images/
│       └── uploads/
│
├── data/                       ✅
│   ├── eras.json              ✅
│   ├── articles.json          ✅
│   ├── periods.json           ✅
│   └── types.json             ✅
│
├── admin/                      ✅
│   ├── index.html             ✅
│   └── config.yml             ✅
│
└── posts/                      ✅
    └── README.md              ✅
```

---

## 🚀 Deployment Steps

### Option 1: Drag & Drop (Easiest)

1. **Add images to `images/` folder first!**
2. Go to https://app.netlify.com
3. Drag the entire `web v/` folder
4. Drop it in the upload area
5. Wait for deployment
6. Open the generated URL

### Option 2: Git + Netlify (Recommended)

```bash
# 1. Add images first!
# 2. Initialize Git
git init
git add .
git commit -m "Initial deployment"
git branch -M main

# 3. Push to GitHub
git remote add origin https://github.com/username/repo.git
git push -u origin main

# 4. Connect to Netlify
# - Go to Netlify Dashboard
# - "New site from Git"
# - Select your repo
# - Publish directory: `.`
# - Deploy!
```

---

## 🔍 Post-Deployment Verification

After deploying, check:

1. **Open your site URL**
2. **Press F12** (Developer Tools)
3. **Console tab** - No red errors
4. **Network tab** - All files status 200 (green)
5. **CSS working** - Site is styled correctly
6. **Images showing** - All images visible

---

## 🐛 Common Issues & Solutions

### Issue: CSS not loading
**Cause**: Wrong path or case sensitivity
**Fix**: Check `<link href="css/style.css">` (lowercase)

### Issue: Images not showing
**Cause**: `images/` folder is empty
**Fix**: Add images as listed above

### Issue: 404 errors
**Cause**: Wrong file names
**Fix**: Check file names match exactly (case-sensitive)

### Issue: Works locally but not on Netlify
**Cause**: Local paths or case sensitivity
**Fix**: Use relative paths only, match case exactly

---

## ⚠️ CRITICAL: Before Deploying

**YOU MUST ADD IMAGES FIRST!**

The site will deploy but images won't show because the `images/` folder is currently empty.

**Quick fix:**
1. Download 7 placeholder images from Unsplash
2. Rename them to match the required names
3. Place in `images/` folder
4. Then deploy

---

## 📊 Current Status

| Component | Status | Notes |
|-----------|--------|-------|
| **HTML Files** | ✅ Ready | All pages present |
| **CSS** | ✅ Ready | Correct relative path |
| **JavaScript** | ✅ Ready | Correct relative path |
| **Images** | ❌ Missing | Folder is empty! |
| **Data Files** | ✅ Ready | All JSON files present |
| **CMS Admin** | ✅ Ready | Needs Netlify Identity |
| **Folder Structure** | ✅ Correct | Proper hierarchy |
| **File Paths** | ✅ Correct | All relative paths |

---

## 🎯 Action Required

**BEFORE deploying to Netlify:**

1. ⚠️ **Add images to `images/` folder**
2. ✅ Verify all files are in correct folders
3. ✅ Check file names (case-sensitive)
4. ✅ Test locally if possible
5. 🚀 Deploy to Netlify

**AFTER deploying:**

1. Enable Netlify Identity (for CMS)
2. Enable Git Gateway (for CMS)
3. Test the site thoroughly
4. Check Developer Tools for errors

---

**Next Steps:**
1. Add images (see `IMAGE_SOURCING_GUIDE.md`)
2. Deploy to Netlify
3. Enable Identity + Git Gateway
4. Test everything

**Need help?** See `NETLIFY_DEPLOYMENT_GUIDE.md` for detailed instructions.
