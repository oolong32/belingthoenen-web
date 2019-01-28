// event handlers
/*
$('video').click(function() {
  $('.description').removeClass('hidden'); 
  $('.is-selected').style('height: ' + 800 +'px');
  $('footer').addClass('hidden'); 
});
*/

document.addEventListener("DOMContentLoaded", function(event) {
  const videos = document.querySelectorAll('video');
  const footer = document.querySelector('footer');
  const dots = document.querySelector('.flickity-page-dots');

  for (let i = 0; i < videos.length; i++) {
    videos[i].addEventListener('click' || 'touchend', handleClick);
  }

  function handleClick(e) {
    let container = e.target.parentElement;
    if (container.classList.contains('is-selected')) {
      let description = container.children[1]; // +1 Exp. for daring to hardcode this.
      description.classList.remove('hidden');

      // hide footer
      footer.classList.add('hidden');
      // hide dots
      dots.classList.add('hidden');

      // attach event listener to close button
      let close = description.querySelector('.close');
      close.addEventListener('click' || 'touchend', hideDescription, {once: true})
    }
  }

  function hideDescription(e) {
    // Projektbeschrieb ausblenden
    let description = e.target.parentElement;
    description.classList.add('hidden');
    // hide footer
    footer.classList.remove('hidden');
    // show dots
    dots.classList.remove('hidden');
  }
});


