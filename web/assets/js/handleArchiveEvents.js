// Handle Events on Archive-Thumb-Lists and Archive-Project-Description
// Thumbs have click/touchend event listeners that toggle visibility of description modal.
// A visible description modal has a one-time click/touchend event listener that makes it disapear.


document.addEventListener("DOMContentLoaded", function(event) {
  var archive = document.querySelectorAll('.archive-project');

  for (var i = 0; i < archive.length; i++ ) {
    archive[i].addEventListener('click' || 'touchend', handleArchiveClick);
  }

  /*
  for (var i = 0; i < archive.length; i++ ) {
    var archiveProject = archive[i];
    console.log('project: ' + archiveProject);

    archiveProject.addEventListener('click' || 'touchend', (e) => {
      console.log('target: ' + e.target);
      var description = archiveProject.querySelector('.archive-project-description');
      description.classList.remove('hidden');

      var close = description.querySelector('.close');
      close.addEventListener('click' || 'touchend', hideArchiveDescription, {once: true});
    });
  }
  */
});

function handleArchiveClick(e) {
  if (e.target.classList.contains('archive-project-description')) {
    // clicked on the description
    // such click should not close the modal
    return true;
  }
  console.log(e.target);
  var archiveDescription = e.target.parentElement.children[1];
  archiveDescription.classList.remove('hidden');
  var close = archiveDescription.querySelector('.close');
  close.addEventListener('click' || 'touchend', hideArchiveDescription, {once: true})


  // parent list shall grow to display all it’s wonderful content
  var parentLi = archiveDescription.parentElement;
  var parentUl = parentLi.parentElement;
  var allLiItems = parentUl.children;
  var footer = document.querySelector('footer');
  var marquee = document.querySelector('.simple-marquee-container');
  // check what’s active and reset it
  for (var i = 0; i < allLiItems.length; i++) {
    if (allLiItems[i].classList.contains('active')) { // there was already an active archive project
      var activeLi = allLiItems[i];
      activeLi.classList.remove('active');
      var activeDescription = activeLi.children[1];
      activeDescription.classList.add('hidden');
      // var activeClose = activeDescription.children[2];
      // activeClose.removeEventListener('click' || 'touchend', hideArchiveDescription);
      // this doesn’t work, let’s hope it doesn’t cause trouble

    }
  }
  // set everything involved to active 
  parentUl.classList.add('active');
  parentLi.classList.add('active');
  footer.classList.add('active');
  marquee.classList.add('hidden');
}

function hideArchiveDescription(e) {
  // Archiv-Projektbeschrieb ausblenden
  var description = e.target.parentElement;
  description.classList.add('hidden');

  // parent list shall shrink
  var parentLi = description.parentElement;
  var parentUl = parentLi.parentElement;
  var footer = document.querySelector('footer');
  var marquee = document.querySelector('.simple-marquee-container');
  parentLi.classList.remove('active');
  parentUl.classList.remove('active');
  footer.classList.remove('active');
  marquee.classList.remove('hidden');
}
