# Jinhong Du — Academic Homepage

This version uses a compact robotics/academic-homepage structure:

1. Profile + short research bio
2. Research interests
3. News
4. Selected research with demo videos
5. Education
6. Skills

It is intentionally simple and publication-focused.

## Replace your portrait

The page currently uses:

```text
assets/profile-placeholder.svg
```

Put your portrait in `assets/profile.jpg` and change this line in `index.html`:

```html
<img src="assets/profile-placeholder.svg" alt="Jinhong Du" />
```

to:

```html
<img src="assets/profile.jpg" alt="Jinhong Du" />
```

A square-ish or portrait photo works best.

## Add demo videos

```text
assets/gapg/demo.mp4
assets/supergrasp/demo.mp4
assets/pushpoint/demo.mp4
```

Recommended:
- MP4 / H.264
- 4:3 or 16:9
- about 10–30 seconds
- compressed for web

## Replace links

Search `index.html` for `YOUR_` and replace the placeholders.

## Deploy

For your current GitHub Pages repository, replace the existing website files with:

```text
index.html
style.css
script.js
assets/
```

Commit to `main`. GitHub Pages will redeploy automatically.
