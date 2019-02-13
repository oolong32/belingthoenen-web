// show/hide arrows on mouse-enter/-leave of carousel

document.addEventListener("DOMContentLoaded", function(event) {
  var carousel = document.querySelector('.carousel');
  var mouse_arrows = document.querySelectorAll('.flickity-prev-next-button');

  carousel.addEventListener('mouseover', showArrows);
  carousel.addEventListener('mouseleave', hideArrows);
  hideArrows(); // hide arrows at first;

  function hideArrows() {
    for (var i = 0; i < mouse_arrows.length; i++) {
      var arrow = mouse_arrows[i];
      arrow.classList.add('hidden');
    }
  }

  function showArrows() {
    for (var i = 0; i < mouse_arrows.length; i++) {
      var arrow = mouse_arrows[i];
      arrow.classList.remove('hidden');
    }
  }
});

