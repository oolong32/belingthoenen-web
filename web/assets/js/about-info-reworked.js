// event handlers for about slider
// ===============================
// touch or click on slider-slide (team member image)
// shows/hides additional infos
// and hides/shows slider-dots and footer (mobile only)

document.addEventListener("DOMContentLoaded", function(event) {

  // list of elements that need an event listener
  // i.e. all slides containing an image of a team member
  var teamMembers = document.querySelectorAll('.team-member');

  // visible elements that need to go in case of event
  var footer = document.querySelector('footer');
  var dots = document.querySelector('.flickity-page-dots');

  // attach event listeners
  for (var i = 0; i < teamMembers.length; i++) {
    teamMembers[i].addEventListener('click' || 'touchend', handleClick);
  }

  function handleClick(e) {

    // get the slide containing the hidden information, in
    // this case a slide with a background image of the team member
    var container = e.target;

    if (container.classList.contains('is-selected')) {

      // display infos
      var description = container.children[1]; // +1 Exp. for daring to hardcode this
      description.classList.remove('hidden');

      // move name up to accomodate the unhidden infos
      var name = container.children[0]; // +5 Exp.
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

    // not neccessary, but better safe than sorry
    e.preventDefault();

    // hide infos
    var closeButton = e.target
    var description = e.target.parentElement;
    description.classList.add('hidden');

    // move name down again
    var name = description.parentElement.children[0]; // +100 Exp. & level up!
    name.classList.remove('up');

    // show footer
    footer.classList.remove('hidden');

    // show dots
    dots.classList.remove('hidden');
  }
});

