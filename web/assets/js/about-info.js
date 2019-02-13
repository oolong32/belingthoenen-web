// event handlers

document.addEventListener("DOMContentLoaded", function(event) {
  var teamMembers = document.querySelectorAll('.team-member');
  var footer = document.querySelector('footer');
  var dots = document.querySelector('.flickity-page-dots');

  for (var i = 0; i < teamMembers.length; i++) {
    teamMembers[i].addEventListener('click' || 'touchend', handleClick);
  }

  function handleClick(e) {
    var container = e.target;

    if (container.classList.contains('is-selected')) {
      var name = container.children[0]; // +1 Exp. for daring to hardcode this.

      // show contact-infos
      var description = container.children[1]; // +1 Exp. for daring to hardcode this.
      description.classList.remove('hidden');

      // move name up
      name.classList.add('up');

      // hide footer
      footer.classList.add('hidden');
      // hide dots
      dots.classList.add('hidden');

      // attach event listener to close button
      var closeButton = description.children[1];
      closeButton.addEventListener('click' || 'touchend', hideDescription, {once: true});
    }
  }

  function hideDescription(e) {
    e.preventDefault();
    var closeButton = e.target
    console.log(closeButton);
    // Projektbeschrieb ausblenden
    var description = e.target.parentElement;
    var name = description.parentElement.children[0]; // +1 Exp. for daring to hardcode this.
    description.classList.add('hidden');
    // move name down
    name.classList.remove('up');
    // show footer
    footer.classList.remove('hidden');
    // show dots
    dots.classList.remove('hidden');
  }
});

