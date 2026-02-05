# Decap CMS Setup Guide
## Egyptian Heritage Website

This guide will help you complete the Decap CMS setup for content management.

---

## ✅ What's Already Done

1. **Admin Panel Created** (`/admin/index.html`)
2. **CMS Configuration** (`/admin/config.yml`)
3. **Content Directories**:
   - `/posts` - Article storage
   - `/assets/images/uploads` - Image uploads
4. **Netlify Configuration** (`netlify.toml`)
5. **Identity Widget** added to `index.html`

---

## 🔧 Required Manual Steps (Netlify Dashboard)

### Step 1: Enable Netlify Identity

1. Go to your Netlify dashboard
2. Select your site
3. Navigate to **Site Settings** > **Identity**
4. Click **Enable Identity**

### Step 2: Configure Identity Settings

**Registration Preferences:**
- Set to **Invite only** (recommended for security)
- Or **Open** if you want public registration

**External Providers (Optional):**
- Enable Google, GitHub, GitLab for social login
- Or keep Email/Password only

### Step 3: Enable Git Gateway

1. In **Identity** settings
2. Scroll to **Services** > **Git Gateway**
3. Click **Enable Git Gateway**
4. This allows CMS to commit to your repository

### Step 4: Invite Users

1. Go to **Identity** tab
2. Click **Invite users**
3. Enter email addresses
4. Users will receive invitation emails

---

## 🚀 Using the CMS

### First Login

1. Visit `https://your-site.netlify.app/admin`
2. Click "Login with Netlify Identity"
3. If invited: Check email and set password
4. If open registration: Sign up directly

### Creating an Article

1. Log into `/admin`
2. Click **Articles & Insights**
3. Click **New Articles & Insights**
4. Fill in fields:
   - **Title**: Article headline
   - **Description**: Brief summary
   - **Publish Date**: Publication date
   - **Featured Image**: Upload or select image
   - **Historical Era**: Select from dropdown
   - **Author**: Your name (optional)
   - **Tags**: Keywords (optional)
   - **Body**: Write content in Markdown
5. Click **Publish**

### Workflow

- **Save**: Saves draft (not published)
- **Publish**: Commits to Git → Triggers Netlify deploy
- **Delete**: Removes article

---

## 📝 Markdown Guide

The CMS uses Markdown for article content:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- Bullet point
- Another point

1. Numbered list
2. Second item

[Link text](https://example.com)

![Image alt text](/assets/images/uploads/image.jpg)
```

---

## 🔗 Integrating Articles with Website

### Current Status
Articles are saved to `/posts` but **not yet displayed** on the website.

### Next Steps (Choose One)

#### Option A: Static Site Generator (Recommended)
Use a build tool like **11ty** or **Jekyll** to:
- Read Markdown files from `/posts`
- Generate HTML pages
- Create article index

**Pros**: SEO-friendly, fast, static  
**Cons**: Requires build step

#### Option B: Client-Side JavaScript
Create a script to:
- Fetch posts from `/posts` directory
- Parse Markdown frontmatter
- Render dynamically

**Pros**: Simple, no build step  
**Cons**: Not SEO-friendly, slower

#### Option C: Netlify Functions
Create serverless function to:
- Generate post index on build
- Serve as JSON API

**Pros**: Flexible, scalable  
**Cons**: More complex

---

## 📊 Post Display Implementation

### Quick Solution (Manual Index)

Create `posts/index.json` manually:

```json
[
  {
    "slug": "ancient-temples-luxor",
    "title": "Ancient Temples of Luxor",
    "description": "Exploring the magnificent temples...",
    "date": "2026-02-05",
    "era": "ancient_egypt",
    "image": "/assets/images/uploads/luxor.jpg",
    "author": "Egyptian Heritage Team",
    "tags": ["temples", "luxor", "archaeology"]
  }
]
```

Then update `index.html` to fetch and display:

```javascript
fetch('/posts/index.json')
  .then(res => res.json())
  .then(posts => {
    const container = document.getElementById('articles-grid');
    posts.forEach(post => {
      // Create article card HTML
      // Append to container
    });
  });
```

---

## 🎨 Visual Guidelines for Images

When uploading images via CMS, follow `VISUAL_IDENTITY.md`:

- **Lighting**: Golden hour/sunset only
- **Colors**: Warm (gold, orange, beige)
- **Content**: No people, no modern elements
- **Quality**: High resolution (4K preferred)
- **Size**: Optimize to max 500KB

---

## 🔒 Security Best Practices

1. **Invite Only**: Keep registration invite-only
2. **Strong Passwords**: Require complex passwords
3. **2FA**: Enable two-factor authentication (if available)
4. **Review Commits**: Monitor Git commits from CMS
5. **Backup**: Regularly backup your repository

---

## 🐛 Troubleshooting

### Can't Access /admin
- Check if Netlify Identity is enabled
- Clear browser cache
- Try incognito mode

### Can't Login
- Check email for invitation
- Verify email/password
- Reset password if needed

### Can't Publish
- Verify Git Gateway is enabled
- Check repository permissions
- Review Netlify deploy logs

### Images Not Uploading
- Check file size (max 5MB)
- Verify media folder path in config.yml
- Check browser console for errors

---

## 📚 Resources

- **Decap CMS Docs**: https://decapcms.org/docs/
- **Netlify Identity**: https://docs.netlify.com/visitor-access/identity/
- **Git Gateway**: https://docs.netlify.com/visitor-access/git-gateway/
- **Markdown Guide**: https://www.markdownguide.org/

---

## 🎯 Next Steps

1. ✅ Enable Netlify Identity in dashboard
2. ✅ Enable Git Gateway
3. ✅ Invite users
4. ✅ Test CMS by creating a sample article
5. ⏳ Implement article display on website
6. ⏳ Customize CMS (optional)

---

**Status**: CMS infrastructure complete. Manual Netlify dashboard configuration required.
