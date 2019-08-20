// Handle Events on Archive-Thumb-Lists and Archive-Project-Description
// Thumbs have click/touchend event listeners that toggle visibility of description modal.
// A visible description modal has a one-time click/touchend event listener that makes it disapear.

document.addEventListener("DOMContentLoaded", function(event) {

  var archive = document.querySelectorAll('.archive-project');
  var descriptions = document.querySelectorAll('.archive-project-description');
  var header = document.querySelector('header');
  var projectSliderArrowLeft = document.querySelector('#customButtonLeft');
  var projectSliderArrowRight = document.querySelector('#customButtonRight');
  var allArchiveVideos = document.querySelectorAll('.archive-video');
  var video = null; // empty Var, gets video when archive Project active and video available

  for (var i = 0; i < archive.length; i++ ) {
    archive[i].addEventListener('click' || 'touchend', handleArchiveClick);
    // record order to find matching description
    archive[i].archiveOrder = i;
  }

  /* Event Handler: Show/Hide Description {{{*/
  function handleArchiveClick(e) {
    if (e.target.classList.contains('archive-project-description')) {
      // click on the description should not close the modal
      return true;
    }

    var archiveDescription = descriptions[e.target.parentElement.archiveOrder];

    archiveDescription.classList.remove('hidden');
    var close = archiveDescription.querySelector('.close-handler');
    close.addEventListener('click' || 'touchend', hideArchiveDescription, {once: true})

    // display all the wonderful content
    var clickedThumb = e.target.parentElement; 
    var archiveThumbsUl = clickedThumb.parentElement; 
    var descriptionUl = document.querySelector('#archive-descriptions'); 
    var allArchiveThumbs = archiveThumbsUl.children; 
    var footer = document.querySelector('footer');
    var marquee = document.querySelector('.simple-marquee-container');

    // hide arrows of project slider
    projectSliderArrowLeft.style.opacity = '0';
    projectSliderArrowRight.style.opacity = '0';

    // check if the active thumb has been clicked
    if (clickedThumb.classList.contains('active')) {
      return; // don’t do anything
    }

    // check what’s active and reset it
    // (grown thumbs should shrink, if there are any
    for (var i = 0; i < allArchiveThumbs.length; i++) {
      if (allArchiveThumbs[i].classList.contains('active')) { // there was already an active archive project
        var activeThumb = allArchiveThumbs[i];
        activeThumb.classList.remove('active');
        var activeDescription = descriptions[activeThumb.archiveOrder];
        activeDescription.classList.add('hidden');
      }
    }
    // set everything involved to active 
    descriptionUl.classList.remove('hidden'); // description container becomes visible
    archiveThumbsUl.classList.add('active'); // thumb-row doesn’t collapse on mouse out
    clickedThumb.classList.add('active'); // thumb grows
    footer.classList.add('active');  // ?
    marquee.classList.add('hidden'); // hide news ticker
    header.classList.add('shrink'); // header needs to get smaller

    // move thumb to center
    var index = parseInt(clickedThumb.archiveOrder);
    flktyArc.select(index, true, false);

    // is there a video running?
    // stopVideos(allArchiveVideos);
    
    // Is there a Video in this Archive-Project?
    video = archiveDescription.querySelector('video');
    if (video) {
      playVideo(video);
    } else {
      // no video, play nothing
    }
      
  }

  function hideArchiveDescription(e) {
    // hide archive poject description container
    var archiveProjectDescriptionContainer = document.querySelector('#archive-descriptions');
    archiveProjectDescriptionContainer.classList.add('hidden');

    // hide archive project description
      // probably a mistake
      // var description = e.target.parentElement;
    for (var i = 0; i < descriptions.length; i++) {
      var description = descriptions[i];
      if (!description.classList.contains('hidden')) {
        description.classList.add('hidden');
      }
    }

    // parent list shall shrink
    var archiveThumbsUl = document.querySelector('#archive ul');
    var archiveThumbs = document.querySelectorAll('.archive-project');
    var footer = document.querySelector('footer');
    var marquee = document.querySelector('.simple-marquee-container');
    for (var i = 0; i < archiveThumbs.length; i++) {
      archiveThumbs[i].classList.remove('active');
    }
    archiveThumbsUl.classList.remove('active');
    footer.classList.remove('active');
    marquee.classList.remove('hidden');
    header.classList.remove('shrink'); // header needs to grow

    // show project slider arrows
    projectSliderArrowLeft.style.opacity = '1';
    projectSliderArrowRight.style.opacity = '1';

    // is there a video running?
    stopVideos(allArchiveVideos);
  }
  /* Event Handler: Show/Hide Description }}}*/

  // find all videos in archive entries
  descriptions.forEach(project => {
    let videoContainer = project.querySelector('.video-container');
    if (videoContainer) {
      let video = videoContainer.querySelector('video');

      // reset dimensions of container to position custom buttons
      video.addEventListener('loadedmetadata', function(e) {
        let width = this.videoWidth;
        let height = this.videoHeight;
        console.log(`Video width: ${width}, height: ${height}`);
        if (width > height) {
          // 16:9
          
          // videoContainer.style.paddingBottom = '56.25%';
        } else {
          // 9:16
          // videoContainer.style.width = '50%';
          // videoContainer.style.paddingBottom = '89%';
          // unbefriedigend
          // muss auch hier mit fixen Werten gearbeitet werden?
        }
      }, false);

      // hook up buttons
      // or better not, because zomg – it won’t work on mobile
      /*
      let playButton = videoContainer.querySelector('.play-pause');
      let muteButton = videoContainer.querySelector('.mute')
      let fullscreenButton = videoContainer.querySelector('.full-screen')

      playButton.addEventListener('click' || 'touchend', function() {
        if (video.paused == true) {
          video.play();
          playButton.classList.add('active')
        } else {
          video.pause();
          playButton.classList.remove('active')
        }
      });

      muteButton.addEventListener('click' || 'touchend', function() {
      });

      fullscreenButton.addEventListener('click' || 'touchend', function() {
      });
      */
    }
  });
  
  function playVideo(vid) {
    if (vid.paused == true) {
      vid.play();
    }
  }

  function stopVideos(arrOfVids) {
    arrOfVids.forEach(function(vid) {
      if (vid.paused == false) {
        vid.pause();
      }
    });
  }
});
