// Handle Events on Archive-Thumb-Lists and Archive-Project-Description
// Thumbs have click/touchend event listeners that toggle visibility of description modal.
// A visible description modal has a one-time click/touchend event listener that makes it disapear.

document.addEventListener("DOMContentLoaded", function(event) {

  var archive = document.querySelectorAll('.archive-project');
  var descriptions = document.querySelectorAll('.archive-project-description');
  var header = document.querySelector('header');

  for (var i = 0; i < archive.length; i++ ) {
    archive[i].addEventListener('click' || 'touchend', handleArchiveClick);
    // record order to find matching description
    archive[i].archiveOrder = i;
  }

  function handleArchiveClick(e) {
    if (e.target.classList.contains('archive-project-description')) {
      // clicked on the description
      // such click should not close the modal
      return true;
    }
    // console.log(e.target);

    //var archiveDescription = e.target.parentElement.children[1];
    var archiveDescription = descriptions[e.target.parentElement.archiveOrder];

    archiveDescription.classList.remove('hidden');
    var close = archiveDescription.querySelector('.close');
    close.addEventListener('click' || 'touchend', hideArchiveDescription, {once: true})


    // display all the wonderful content
    var clickedThumb = e.target.parentElement; 
    var archiveThumbsUl = clickedThumb.parentElement; 
    var descriptionUl = document.querySelector('#archive-descriptions'); 
    var allArchiveThumbs = archiveThumbsUl.children; 
    var footer = document.querySelector('footer');
    var marquee = document.querySelector('.simple-marquee-container');

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
    console.log('moving to ' + index);
    flktyArc.select(index, true, false);
  }

  function hideArchiveDescription(e) {
    // hide archive poject description container
    var archiveProjectDescriptionContainer = document.querySelector('#archive-descriptions');
    archiveProjectDescriptionContainer.classList.add('hidden');
    // hide archive project description
    var description = e.target.parentElement;
    description.classList.add('hidden');

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
  }

});
