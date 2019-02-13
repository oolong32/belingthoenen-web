// event handlers

document.addEventListener("DOMContentLoaded", function(event) {
  var teamMembers = document.querySelectorAll('.team-member');
  console.log(teamMembers);
  var footer = document.querySelector('footer');
  var dots = document.querySelector('.flickity-page-dots');

  for (var i = 0; i < teamMembers.length; i++) {
    teamMembers[i].addEventListener('click' || 'touchend', handleClick);
  }
});

function handleClick(e) {
  var container = e.target;
  if (container.classList.contains('is-selected')) {
    var description = container.children[1]; // +1 Exp. for daring to hardcode this.
    console.log(description);
    description.classList.remove('hidden');

    // hide footer
    footer.classList.add('hidden');
    // hide dots
    dots.classList.add('hidden');

    // attach event listener to close button
    var close = description.querySelector('.close');
    close.addEventListener('click' || 'touchend', hideDescription, {once: true})
  }
}

function hideDescription(e) {
  // Projektbeschrieb ausblenden
  var description = e.target.parentElement;
  description.classList.add('hidden');
  // hide footer
  footer.classList.remove('hidden');
  // show dots
  dots.classList.remove('hidden');
}


