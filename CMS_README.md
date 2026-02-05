# Egyptian Heritage CMS Guide

## Overview
This project uses **Decap CMS** (formerly Netlify CMS) to manage content. Data is stored as Markdown files in the `posts/` folder and compiled into a JSON index for the website to display.

## How It Works (The "Backend" Logic)
1.  **Content Creation**: You create a post in the Admin Panel (`/admin`).
2.  **Storage**: The CMS saves a Markdown (`.md`) file in `posts/`.
3.  **Automation**:
    *   **On Netlify (Deployment)**: The build command `npm run build` runs automatically. It scans `posts/`, extracts data (title, date, tags, etc.), and updates `posts/index.json`.
    *   **Locally**: You run the script manually to see changes immediately.

## 🛠️ Local Development (How to Run)
Since this site uses a robust build script (Node.js), you need to set up your environment once.

### 1. Prerequisites
*   Install **Node.js** (LTS version recommended) from [nodejs.org](https://nodejs.org/).

### 2. Setup (Run once)
Open your terminal in the project folder and run:
```bash
npm install
```
This installs the necessary tools (like `front-matter` parser).

### 3. Adding Content & Updating Site
When you add a new post (manually or via CMS local backend):
1.  Run the build script:
    ```bash
    npm run build
    ```
2.  The `posts/index.json` file will update.
3.  Refresh your browser to see the new content.

## CMS Features
*   **Users**: Managed via Netlify Identity. No database is required.
*   **Comments**: Static sites do not support dynamic comments natively. You would need to integrate a third-party service like Disqus or Utterances if requested.
*   **Tags**: Tags added in the CMS are fully indexed and searchable on the site.

## Future Customization
To change how posts are indexed, edit `scripts/generate_index.js`.
To change CMS fields, edit `admin/config.yml`.
