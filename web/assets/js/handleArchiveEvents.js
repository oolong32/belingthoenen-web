// Handle Events on Archive-Thumb-Lists and Archive-Project-Description
// Thumbs have click/touchend event listeners that toggle visibility of description modal.
// A visible description modal has a one-time click/touchend event listener that makes it disapear.


document.addEventListener("DOMContentLoaded", function(event) {
  var archive = document.querySelectorAll('.archive-project');
  var main = document.querySelector('main');
  console.log(archive);

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
  var archiveDescription = e.target.parentElement.children[1];
  archiveDescription.classList.remove('hidden');
  var close = archiveDescription.querySelector('.close');
  close.addEventListener('click' || 'touchend', hideArchiveDescription, {once: true})
  
  //main.style.display = 'none';
}

function hideArchiveDescription(e) {
  // Archiv-Projektbeschrieb ausblenden
  var description = e.target.parentElement;
  description.classList.add('hidden');

  //main.style.display = 'block';
}
