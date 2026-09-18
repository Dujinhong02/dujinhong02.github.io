// Show a clean placeholder when a demo file has not been uploaded yet.
document.querySelectorAll(".video-box").forEach((box) => {
  const video = box.querySelector("video");
  const source = video?.querySelector("source");

  const missing = () => box.classList.add("missing");
  const loaded = () => box.classList.remove("missing");

  video?.addEventListener("loadeddata", loaded);
  video?.addEventListener("error", missing);
  source?.addEventListener("error", missing);

  setTimeout(() => {
    if (video && video.readyState === 0) missing();
  }, 900);
});
