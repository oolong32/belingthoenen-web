// event handlers for about slider
// ===============================
// touch or click on slider-slide (team member image)
// shows/hides additional infos
// and hides/shows slider-dots and footer (mobile only)

// set controller to keep track of visibility
var contactDataVisible = false;

document.addEventListener("DOMContentLoaded", function(event) {

  // list of elements that need an event listener
  // i.e. all slides containing an image of a team member
  var teamMembers = document.querySelectorAll('.team-member');

  // all contact data (hidden by default)
  var contactData = document.querySelectorAll('.contact-data');

  // names, need to be moved around to accomodate contact data
  var names = document.querySelectorAll('.name');

  // visible elements that need to go in case of event
  var footer = document.querySelector('footer');
  var dots = document.querySelector('.flickity-page-dots');

  // attach event listeners
  for (var i = 0; i < teamMembers.length; i++) {
    teamMembers[i].addEventListener('click' || 'touchend', handleClick);

    // pass number in order to select the cell on click when not active
    teamMembers[i].myPrivateNumber = i;
  }

  // attach event listener to all close buttons
  var closeButtons = document.querySelectorAll('.contact-data .close');
  for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click' || 'touchend', hideContactData);
  }

  function handleClick(e) {

    // better test if this has effects on right click
    e.preventDefault();

    // check if the click was on an active slide,
    // i.e. the one visible on mobile or in the center on desktop
    if (!e.target.classList.contains('is-selected')) {
      // jump to slide
      // add 1 to index, cause there is an additional slide (intro)
      var index = parseInt(e.target.myPrivateNumber) + 1;
      flkty.select(index, false, false);
      return;
    }


    if (contactDataVisible) {
        // nothing
        return;
    } else {

      // switch controller on
      contactDataVisible = true;

      // display contact data
      for (var i = 0; i < contactData.length; i++) {
        contactData[i].classList.remove('hidden');
      }

      // move name up
      for (var i = 0; i < names.length; i++) {
        // console.log(names[i]);
        names[i].classList.add('up');
      }

      // hide footer
      footer.classList.add('hidden');

      // hide dots
      dots.classList.add('hidden');

    }
  }

  function hideContactData(e) {
    // console.log('hello');
    // set controller to false
    contactDataVisible = false;

    // prevent event from bubbling up to team-member container
    e.stopPropagation();

    // hide contact data
    for (var i = 0; i < contactData.length; i++) {
      contactData[i].classList.add('hidden');
    }

      // move name down
      for (var i = 0; i < names.length; i++) {
        names[i].classList.remove('up');
      }

    // show footer
    footer.classList.remove('hidden');

    // show dots
    dots.classList.remove('hidden');

  }

});
