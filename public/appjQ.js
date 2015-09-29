$(document).ready(function() {
  console.log('The document is ready!');
});


$('.item-filter').on('click',function(e) {
  var home = 'http://localhost:3000/items';
  var location = window.location.href;
  if (home === location) {
    var filterTitle = this.innerHTML;
    var filterPeram = this.innerHTML.toLowerCase();
    e.preventDefault();
    $('#index-title').html(filterTitle);
    $('.item-filter-cards').css('display', 'none');
    $('#' + filterPeram).css('display', '');
  }
});

$('.item-all').on('click', function(e) {
  var home = 'http://localhost:3000/items';
  var location = window.location.href;
  if (home === location) {
    e.preventDefault();
    $('#index-title').html('Fruits & Vegetables');
    $('.item-filter-cards').css('display', '');
  }
});
