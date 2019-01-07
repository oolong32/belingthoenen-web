document.addEventListener("DOMContentLoaded", function() {
  var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

  if ("IntersectionObserver" in window) {
    // funktioniert noch nicht in iOS Safari (Dez. 2018) auch nicht in iOS Firefox, erstaunlicherweise :-(
    // https://caniuse.com/#search=IntersectionObserver
    var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(video) {
        if (video.isIntersecting) {
          for (let source in video.target.children) {
            var videoSource = video.target.children[source];
            if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
              videoSource.src = videoSource.dataset.src;
            }
          }

          video.target.load();
          video.target.classList.remove("lazy");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach(function(lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  } else {
    // ios safari, ios firefox
    let active = false;
    const lazyLoad = function() {
        if (active === false) {
          active = true;

          setTimeout(function() {
            lazyVideos.forEach(function(lazyVideo) {
              if ((lazyVideo.getBoundingClientRect().top <= window.innerHeight && lazyVideo.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyVideo).display !== "none") {

                for (let source in lazyVideo.children) {
                  var videoSource = lazyVideo.children[source];
                  if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                    videoSource.src = videoSource.dataset.src;
                  }
                }
                lazyVideo.load();
                lazyVideo.classList.remove("lazy");

                // lazyVideos soll nur ungeladene Videos enthalten
                lazyVideos = lazyVideos.filter(function(video) {
                  return video !== lazyVideo;
                });

                if (lazyVideos.length === 0) {
                  document.removeEventListener("scroll", lazyLoad);
                  window.removeEventListener("resize", lazyLoad);
                  window.removeEventListener("orientationchange", lazyLoad);
                  // remove my event listeners
                  window.removeEventListener("touchend", lazyLoad);
                  window.removeEventListener("click", lazyLoad);
                }
              }
            });

            active = false;
          }, 200);
        }
      };
      document.addEventListener("scroll", lazyLoad);
      window.addEventListener("resize", lazyLoad);
      window.addEventListener("orientationchange", lazyLoad);
      // my event listeners
      document.addEventListener("touchend", lazyLoad);
      document.addEventListener("click", lazyLoad);

      // warum nicht gleich noch so?
      setTimeout(lazyLoad, 500);
  }
});
