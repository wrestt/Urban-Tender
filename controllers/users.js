var db = require('../models/index');

//Users Home Page
app.get('/users', function(req, res) {
  db.User.find({}, function(err, users) {
    if (err) {
      console.log('Users Home Page', err);
    } else {
      res.render('users/index', {users: users, moment: moment});
    }
  });
});

//User Account Page
app.get('/users/:id', routeMiddleware.ensureCorrectUser, function(req, res) {
  db.User.findById(req.params.id)
    .populate('items')
    .exec(function(err, user) {
      if (err) {
        console.log('Account err', err);
        res.redirect('/users/');
      } else {
        db.Item.populate(user, {
          path: 'items.comments',
          model: 'Comment',
        }, function(err, user) {
          if (err) {
            console.log('User Item Err', err);
            res.redirect('/users/' + user._id);
          } else {
            res.render('users/show',{user: user, moment: moment});
          }
        });
      };
    });
});

//USER ITEMS
app.get('/users/:id/items', routeMiddleware.ensureLoggedIn,
  function(req, res) {
  db.User.findById(req.params.id)
    .populate('items')
    .exec(function(err, user) {
      if (err) {
        console.log('USER ITEMS err', err);
        res.redirect('/users/');
      } else {
        db.Item.populate(user, {
          path: 'items.comments',
          model: 'Comment',
        }, function(err, user) {
          if (err) {
            console.log('USER ITEMS Err', err);
            res.redirect('/users/' + user._id);
          } else {
            console.log('USER STORE PAGE');
            res.render('users/sell',{user: user, moment: moment});
          }
        });
      };
    });
});

//Update Account
app.put('/users/:id', routeMiddleware.ensureCorrectUser, function(req, res) {
  var updateContent = req.body.user;
  db.User.findByIdAndUpdate(req.session.id, updateContent,
    function(err, user) {
      if (err) {
        console.log('update user err', err);
        res.redirect(user._id);
      } else {
        res.redirect('/users/' + user._id);
      }
    }
  );
});

//Delete Account
app.delete('/users/:id', routeMiddleware.ensureCorrectUser, function(req, res) {
  db.User.findByIdAndRemove(req.params.id, function(err, user) {
    if (err) {
      console.log('Delete Err', err);
      res.redirect('/users');
    } else {
      res.redirect('/logout');
    }
  });
});
