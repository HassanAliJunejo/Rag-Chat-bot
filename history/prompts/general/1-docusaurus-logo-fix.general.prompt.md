---
id: 1
title: Docusaurus Logo Fix
stage: general
date: 2025-12-24
model: Qwen Code
feature: none
branch: main
user: ASUS
command: /sp.implement
labels: ["docusaurus", "logo", "debugging"]
links: 
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - docusaurus.config.js
  - static/img/simple-robot.svg
  - static/img/robot-hero.png
tests: []
---

# Docusaurus Logo Fix

## User Prompt

Execute the implementation plan by processing and executing all tasks defined in tasks.md

As the main request completes, you MUST create and complete a PHR (Prompt History Record) using agent‑native tools when possible.

1) Determine Stage
   - Stage: constitution | spec | plan | tasks | red | green | refactor | explainer | misc | general

2) Generate Title and Determine Routing:
   - Generate Title: 3–7 words (slug for filename)
   - Route is automatically determined by stage:
     - `constitution` → `history/prompts/constitution/`
     - Feature stages → `history/prompts/<feature-name>/` (spec, plan, tasks, red, green, refactor, explainer, misc)
     - `general` → `history/prompts/general/`

3) Create and Fill PHR (Shell first; fallback agent‑native)
   - Run: `.specify/scripts/bash/create-phr.sh --title "<title>" --stage <stage> [--feature <name>] --json`
   - Open the file and fill remaining placeholders (YAML + body), embedding full PROMPT_TEXT (verbatim) and concise RESPONSE_TEXT.
   - If the script fails:
     - Read `.specify/templates/phr-template.prompt.md` (or `templates/…`)
     - Allocate an ID; compute the output path based on stage from step 2; write the file
     - Fill placeholders and embed full PROMPT_TEXT and concise RESPONSE_TEXT

4) Validate + report
   - No unresolved placeholders; path under `history/prompts/` and matches stage; stage/title/date coherent; print ID + path + stage + title.
   - On failure: warn, don't block. Skip only for `/sp.phr`.

/sp.implement You are a senior frontend + Docusaurus expert.

PROBLEM:
My website header shows text correctly but the LOGO / IMAGE is NOT appearing.
The page is built using Docusaurus (React-based).
No console error, but image area is blank.

TASK:
1. Analyze ALL possible reasons why image/logo does not render in Docusaurus or React.
2. Specifically check:
   - static/ folder usage
   - correct image path
   - relative vs absolute paths
   - navbar logo config (themeConfig.navbar.logo)
   - baseUrl & url issues
   - case-sensitive filename issue (Linux build)
   - SVG vs PNG loading
   - CSS hiding image (display:none, opacity, z-index)
   - broken import statement
3. Provide:
   - Exact correct folder structure
   - Correct config code for docusaurus.config.js
   - Correct JSX / Markdown usage
   - Correct <img> usage example
4. Assume image exists but is NOT loading visually.
5. Give FIXES step-by-step (DO NOT explain theory).
6. Give final checklist to verify.

IMPORTANT RULES:
- Do NOT guess.
- Do NOT be generic.
- Give exact working code.
- Answer like a production-level debugger.

## Response

## Docusaurus Logo/Image Debugging - Fix

I've identified the issue: The logo file `logo.svg` referenced in your `docusaurus.config.js` does not exist in the `static/img` directory. The configuration is looking for a file that doesn't exist, which is why the logo isn't appearing.

### Exact Fix:

**Option 1: Use an existing image file**

Change the logo configuration in `docusaurus.config.js` to use one of the existing images:

```js
logo: {
  alt: 'ROS 2 Logo',
  src: 'img/simple-robot.svg',  // Changed from 'img/logo.svg' to 'img/simple-robot.svg'
},
```

Or if you prefer the PNG version:

```js
logo: {
  alt: 'ROS 2 Logo',
  src: 'img/robot-hero.png',  // Changed from 'img/logo.svg' to 'img/robot-hero.png'
},
```

**Option 2: Add the missing logo file**

If you have a specific logo image you want to use:
1. Place your logo image file named `logo.svg` in the `static/img/` directory
2. Make sure the file is in SVG format (or change the extension to match the format)

### Complete Correct Folder Structure:

```
your-docusaurus-project/
├── static/
│   ├── img/
│   │   ├── logo.svg          # ← Add this file OR
│   │   ├── simple-robot.svg  # ← Use this existing file
│   │   └── robot-hero.png    # ← Or use this existing file
│   ├── images/
│   └── code-examples/
├── src/
├── docusaurus.config.js      # ← Configuration file
└── ...
```

### Correct Configuration Code:

Update your `docusaurus.config.js` navbar section:

```js
navbar: {
  title: 'ROS 2 Humanoid Robotics',
  logo: {
    alt: 'ROS 2 Logo',
    src: 'img/simple-robot.svg',  // Using existing file
  },
  // ... rest of your navbar items
},
```

### Additional Checks to Verify:

1. **File exists**: Make sure the file you reference actually exists in `static/img/`
2. **Case sensitivity**: Ensure the filename case matches exactly (Linux builds are case-sensitive)
3. **File format**: Make sure the file format matches the extension (SVG, PNG, JPG, etc.)
4. **File integrity**: Ensure the image file isn't corrupted
5. **Build**: After making changes, restart your Docusaurus development server with `npm run start`

### CSS Override Check:

If the logo still doesn't appear after fixing the path, check if any custom CSS is hiding the image. Look in `src/css/custom.css` for any rules that might affect the navbar logo:

```css
/* Make sure you don't have conflicting CSS rules like: */
.navbar__logo {
  display: none;
  opacity: 0;
  visibility: hidden;
}
```

### Final Checklist:

- [ ] Image file exists in `static/img/` directory
- [ ] File path in `docusaurus.config.js` matches the actual filename
- [ ] Filename case matches exactly (case-sensitive on Linux)
- [ ] File is not corrupted
- [ ] No CSS rules are hiding the logo
- [ ] Server has been restarted after changes

The most likely fix is to update your `docusaurus.config.js` to use one of the existing image files: either `img/simple-robot.svg` or `img/robot-hero.png`.
