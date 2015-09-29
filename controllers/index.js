app.get('/', function(req, res) {
  res.redirect('/items');
});

require('./login');
require('./signup');
require('./users');
require('./items');

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/items');
});

app.get('*', function(req, res) {
  res.render('404');
});
