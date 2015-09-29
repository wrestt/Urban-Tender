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

var ospry = new Ospry('pk-test-zp2a9xkwxa16ng0pgn5rokya');

var onUpload = function(err, metadata) {
  ospry.get({
    url: metadata.url,
    maxHeight: 300,
    maxWidth: 300,
  });
};

$('#up-form').submit(function(e) {
  e.preventDefault();
  ospry.up({
    form: this,
    imageReady: function(err, metadata, i) {
      console.log(metadata);
      if (err === null) {
        $('#item-image').val(metadata.url);
        $('#item-form').submit();
      }
    },
  });
});

$('#up-user-edit-form').submit(function(e) {
  e.preventDefault();
  ospry.up({
    form: this,
    imageReady: function(err, metadata, i) {
      console.log(metadata);
      if (err === null) {
        $('#avatar').val(metadata.url);
        $('#user-edit-form').submit();
      }
    },
  });
});
