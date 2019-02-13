// event handlers

document.addEventListener("DOMContentLoaded", function(event) {
  var videos = document.querySelectorAll('video');
  var footer = document.querySelector('footer');
  var dots = document.querySelector('.flickity-page-dots');

  for (var i = 0; i < videos.length; i++) {
    videos[i].addEventListener('click' || 'touchend', handleClick);
  }

  function handleClick(e) {
    var container = e.target.parentElement;
    if (container.classList.contains('is-selected')) {
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
    e.preventDefault();
    // Projektbeschrieb ausblenden
    var description = e.target.parentElement;
    description.classList.add('hidden');
    // hide footer
    footer.classList.remove('hidden');
    // show dots
    dots.classList.remove('hidden');
  }
});


