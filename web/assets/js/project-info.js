// event handlers for home slider
// ==============================
// touch or click on slider-card (project movie)
// shows/hides additional infos
// and hides/shows slider-dots and footer (mobile only)

document.addEventListener("DOMContentLoaded", function(event) {

  // list of elements that need an event listener
  // i.e. all slides (containing a project video)
  var videos = document.querySelectorAll('video');

  // visible elements that need to go in case of event
  var footer = document.querySelector('footer');
  var dots = document.querySelector('.flickity-page-dots');

  // attach event listener
  for (var i = 0; i < videos.length; i++) {
    videos[i].addEventListener('click' || 'touchend', handleClick);
  }

  function handleClick(e) {

    // get the slide containing the video and the hidden infos
    var container = e.target.parentElement;

    if (container.classList.contains('is-selected')) {

      // display infos
      var description = container.children[1]; // +1 Exp. for daring to hardcode this.
      description.classList.remove('hidden');

      // hide footer
      footer.classList.add('hidden');

      // hide dots
      dots.classList.add('hidden');

      // attach event listener to close button
      var closeButton = description.querySelector('.close');
      closeButton.addEventListener('click' || 'touchend', hideDescription, {once: true});
    }
  }

  function hideDescription(e) {

    // not neccessary, but better safe than sorry
    e.preventDefault();

    // hide infos
    var closeButton = e.target;
    var description = closeButton.parentElement;
    description.classList.add('hidden');

    // show footer
    footer.classList.remove('hidden');

    // show dots
    dots.classList.remove('hidden');
  }
});


