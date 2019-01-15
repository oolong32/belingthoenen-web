// event handlers
/*
$('video').click(function() {
  $('.description').removeClass('hidden'); 
  $('.is-selected').style('height: ' + 800 +'px');
  $('footer').addClass('hidden'); 
});
*/
const videos = document.querySelectorAll('video');

for (let i = 0; i < videos.length; i++) {
  videos[i].addEventListener('click' || 'touchend', handleClick);
}

function handleClick(e) {
  let container = e.target.parentElement;
  if (container.classList.contains('is-selected')) {
    let description = container.children[1];
    description.classList.remove('hidden');

    // hide archive
    // container vergrössern etc.

    // attach event listener to close button
    let close = description.children[0];
    close.addEventListener('click', hideDescription, {once: true})
  }
}

function hideDescription(e) {
  // Projektbeschrieb ausblenden
  let description = e.target.parentElement;
  description.classList.add('hidden');
}
