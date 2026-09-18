# Jinhong Du — Personal Research Website

A lightweight academic/research portfolio for robotic manipulation, 3D perception, grasping, reinforcement learning, and Sim2Real.

## 1. Add your demo videos

Put your MP4 files here:

```text
assets/
├── gapg/
│   └── demo.mp4
├── supergrasp/
│   └── demo.mp4
└── pushpoint/
    └── demo.mp4
```

The page will autoplay them muted, loop them, and keep native controls available.

Recommended export:

- MP4 / H.264
- 1080p or 720p
- 10–30 seconds
- muted-friendly (the site autoplays muted)
- keep each video reasonably small for faster loading

## 2. Replace placeholder links

Open `index.html` and search for:

- `YOUR_GAPG_PAPER_URL`
- `YOUR_GAPG_VIDEO_URL`
- `YOUR_SUPERGRASP_PAPER_URL`
- `YOUR_SUPERGRASP_CODE_URL`
- `YOUR_SUPERGRASP_VIDEO_URL`
- `YOUR_PUSHPOINT_PROJECT_URL`
- `YOUR_PUSHPOINT_VIDEO_URL`

Replace them with your real links.

## 3. CV

`assets/cv.pdf` is included from the resume supplied when this site was generated.

**Privacy note:** review the PDF before publishing. If it contains a phone number or other information you do not want public on the internet, replace it with a public-safe CV.

## 4. Publish with GitHub Pages

If your GitHub username is `example`, create a public repository named:

```text
example.github.io
```

Upload everything in this project to the repository root:

```text
index.html
style.css
script.js
assets/
```

Then go to:

`Repository → Settings → Pages`

Choose:

- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/(root)**

Your website will be available at:

```text
https://example.github.io
```

## 5. Preview locally

You can double-click `index.html`, or serve it with Python:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Customize

- Main content: `index.html`
- Visual design: `style.css`
- Mobile menu / animation / video fallback: `script.js`
