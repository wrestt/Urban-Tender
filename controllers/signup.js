var db = require('../models/index');
var bcrypt = require('bcrypt');

app.get('/signup', routeMiddleware.preventLoginSignup, function(req, res) {
  res.render('users/signup');
});

app.post('/signup', function(req, res) {
  var newUser = req.body.user;
  console.log('New User', newUser);
  db.User.create(newUser, function(err, user) {
    console.log('Made It Here');
    if (user) {
      console.log('New User Created', user);
      req.login(user);
      res.render('users/show', {user: user});
    } else {
      console.log('User Not Created');
      console.log('error', err);
      res.render('users/signup');
    }
  });
});

var db = require('../models/index');
