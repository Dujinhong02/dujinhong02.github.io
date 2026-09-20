document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll(".project-video");

  /*
   * -------------------------------------------------------
   * 1. Lazy loading
   *
   * 当视频距离视口约 300px 时，才真正设置 src 并开始下载。
   * -------------------------------------------------------
   */
  const loadObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const video = entry.target;
        const source = video.querySelector("source");

        // 防止重复加载
        if (!video.dataset.loaded && source?.dataset.src) {
          source.src = source.dataset.src;
          video.dataset.loaded = "true";

          video.load();
        }

        // 视频只需要加载一次
        observer.unobserve(video);
      });
    },
    {
      rootMargin: "300px 0px",
      threshold: 0
    }
  );


  /*
   * -------------------------------------------------------
   * 2. Autoplay / pause
   *
   * 真正进入可视区域后播放；
   * 离开可视区域后暂停。
   * -------------------------------------------------------
   */
  const playObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;

        // 尚未加载时不处理
        if (!video.dataset.loaded) return;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
          video.play().catch(() => {
            // 某些浏览器可能阻止自动播放
          });
        } else {
          video.pause();
        }
      });
    },
    {
      rootMargin: "0px",
      threshold: [0, 0.15]
    }
  );


  /*
   * -------------------------------------------------------
   * 3. Error handling
   * -------------------------------------------------------
   */
  videos.forEach((video) => {
    const box = video.closest(".media-box");
    const source = video.querySelector("source");

    const showMissing = () => {
      box?.classList.add("missing");
    };

    const showVideo = () => {
      box?.classList.remove("missing");
    };


    /*
     * loadeddata 表示已经能够解码视频第一帧。
     *
     * 如果有 poster：
     * 浏览器在播放前继续显示 poster。
     *
     * 如果没有 poster：
     * 此时浏览器就可以显示视频第一帧。
     */
    video.addEventListener("loadeddata", showVideo);


    /*
     * 只有真正加载失败才显示错误。
     *
     * 不再使用固定 700ms timeout。
     */
    video.addEventListener("error", showMissing);
    source?.addEventListener("error", showMissing);


    loadObserver.observe(video);
    playObserver.observe(video);
  });
});
