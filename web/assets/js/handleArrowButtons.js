// show/hide arrows on mouse-enter/-leave of carousel

document.addEventListener("DOMContentLoaded", function(event) {

  var mouse_arrows = document.querySelectorAll('.flickity-prev-next-button');
  var main = document.querySelector('main');

  // hide carousel arrows at first;
  hideArrows();

  // on mouse movement, check if mouse above main
  // if so, show carousel arrows
  document.addEventListener('mousemove', function(event) {
    
    // get position of main
    var mainPos = main.getBoundingClientRect();

    mousePos = {
            x: event.pageX,
            y: event.pageY
        };
    if (mousePos.y > mainPos.top && mousePos.y < mainPos.bottom) {
      showArrows();
    } else {
      hideArrows();
    }
  });

  function hideArrows() {
    for (var i = 0; i < mouse_arrows.length; i++) {
      var arrow = mouse_arrows[i];
      if (!arrow.classList.contains('hidden')) {
          arrow.classList.add('hidden');
      }
    }
  }

  function showArrows() {
    for (var i = 0; i < mouse_arrows.length; i++) {
      var arrow = mouse_arrows[i];
      if (arrow.classList.contains('hidden')) {
        arrow.classList.remove('hidden');
      }
    }
  }
});

