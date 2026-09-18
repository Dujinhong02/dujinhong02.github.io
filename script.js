document.querySelectorAll(".media-box").forEach((box) => {
  const video = box.querySelector("video");
  const source = video?.querySelector("source");

  const showMissing = () => box.classList.add("missing");
  const showVideo = () => box.classList.remove("missing");

  video?.addEventListener("loadeddata", showVideo);
  video?.addEventListener("error", showMissing);
  source?.addEventListener("error", showMissing);

  setTimeout(() => {
    if (video && video.readyState === 0) showMissing();
  }, 700);
});
