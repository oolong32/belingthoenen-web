// event handlers
$('video').click(function() {
  $('.description').removeClass('hidden'); 
  $('footer').addClass('hidden'); 
});

$('.close').click(function() {
  $('.description').addClass('hidden');
  $('footer').removeClass('hidden'); 
}); 
