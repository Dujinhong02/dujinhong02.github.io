// Mobile navigation
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// Scroll reveal
const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => observer.observe(item));

// Video placeholders: if local demo file is missing, show a clean fallback instead of a broken player.
document.querySelectorAll(".project-video").forEach((video) => {
  const wrap = video.closest(".demo-wrap");
  const source = video.querySelector("source");

  const showFallback = () => wrap?.classList.add("missing-video");
  const showVideo = () => wrap?.classList.remove("missing-video");

  video.addEventListener("loadeddata", showVideo);
  video.addEventListener("error", showFallback);

  if (source) {
    source.addEventListener("error", showFallback);
  }

  // GitHub Pages returns an error for missing files; this catches browsers
  // that do not always propagate a media element error immediately.
  setTimeout(() => {
    if (video.readyState === 0) showFallback();
  }, 1200);
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Lightweight point-cloud animation for the hero.
// No external libraries are required.
const canvas = document.getElementById("pointCloudCanvas");
const ctx = canvas?.getContext("2d");

if (canvas && ctx) {
  const points = [];
  const pointCount = 110;
  let width = 0;
  let height = 0;
  let dpr = 1;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (!points.length) {
      for (let i = 0; i < pointCount; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = 0.2 + Math.random() * 0.8;
        points.push({
          a,
          r,
          z: Math.random() * 2 - 1,
          speed: 0.00018 + Math.random() * 0.00032,
          size: 1.2 + Math.random() * 2.2,
        });
      }
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, width, height);

    const cx = width * 0.5;
    const cy = height * 0.5;
    const scale = Math.min(width, height) * 0.36;

    // Robot-like grasp lines
    ctx.strokeStyle = "rgba(17,24,39,0.18)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(width * 0.68, height * 0.23);
    ctx.lineTo(width * 0.58, height * 0.42);
    ctx.lineTo(width * 0.67, height * 0.60);
    ctx.stroke();

    ctx.strokeStyle = "rgba(37,99,235,0.34)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width * 0.66, height * 0.59);
    ctx.lineTo(width * 0.60, height * 0.69);
    ctx.moveTo(width * 0.66, height * 0.59);
    ctx.lineTo(width * 0.72, height * 0.69);
    ctx.stroke();

    const projected = points.map((p) => {
      const angle = p.a + t * p.speed;
      const x3 = Math.cos(angle) * p.r;
      const y3 = Math.sin(angle * 1.15) * p.r * 0.72;
      const z3 = Math.sin(angle) * p.r + p.z * 0.35;
      const perspective = 1 / (1.5 - z3 * 0.23);
      return {
        x: cx + x3 * scale * perspective,
        y: cy + y3 * scale * perspective,
        z: z3,
        size: p.size * perspective,
      };
    });

    projected
      .sort((a, b) => a.z - b.z)
      .forEach((p) => {
        const alpha = 0.25 + ((p.z + 1.4) / 2.8) * 0.55;
        ctx.fillStyle = `rgba(37,99,235,${Math.max(0.18, Math.min(alpha, 0.78))})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

    // Target marker
    ctx.strokeStyle = "rgba(37,99,235,0.55)";
    ctx.lineWidth = 1;
    ctx.strokeRect(width * 0.38, height * 0.42, width * 0.24, height * 0.18);

    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(draw);
}
