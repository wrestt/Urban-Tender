var db = require('../models/index');

//Users Home Page
app.get('/users', function(req, res) {
  db.User.find({}, function(err, users) {
    if (err) {
      console.log('Users Home Page', err);
    } else {
      res.render('users/index', {users: users, moment:moment});
    }
  });
});

//User Account Page
app.get('/users/:id', routeMiddleware.ensureLoggedIn, function(req, res) {
  db.User.findById(req.params.id)
    .populate('items')
    .exec(function(err, user) {
      if (err) {
        console.log('Account err', err);
        res.redirect('/users/:id');
      } else {
        db.Item.populate(user, {
          path: 'items.comments',
          model: 'Comment',
        }, function(err, items) {
          if (err) {
            console.log('User Item Err', err);
            res.redirect('/users/:id');
          } else {
            res.render('users/show', {user:user, items:items, moment:moment});
          }
        });
      };
    });
});

//Update Account
app.put('/users/:id', routeMiddleware.ensureLoggedIn, function(req, res) {
  var updateInfo = req.body;
  db.User.findByIdAndUpdate(req.params.id, updateInfo,
    function(err, user) {
   if (err) {
     console.log('Update Err', err);
     res.redirect('/users/:id');
   }  else {
     console.log('Updated User', user);
     res.redirect('/users/:id');
   }
 });
});

//Delete Account
app.delete('/users/:id', routeMiddleware.ensureLoggedIn, function(req, res) {
  db.User.findByIdAndRemove(req.params.id, function(err, user) {
    if (err) {
      console.log('Delete Err', err);
      ('/users');
      res.redirect('/users/:id');
    } else {
      console.log('Deleted User');
      res.redirect('/users');
    }
  });
});
