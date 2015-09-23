var db = require('../models/index');

// ITEM INDEX
app.get('/items', function(req, res) {
  db.Item.find({}, function(err, items) {
    res.render('items/index', {items: items});
  });
});

// NEW ITEM
app.get('/items/new', routeMiddleware.ensureLoggedIn, function(req, res) {
  res.render('items/new');
});

// CREATE ITEM
app.post('/items', function(req, res) {
  var newItem = req.body;
  db.User.findById(req.session.id, function(err, user) {
    if (!newItem.image) {
      newItem.image = 'default.gif';
    }

    db.Item.create(newItem, function(err, item) {
      user.items.push(item);
      item.owner = user._id;
      user.save();
      item.save();
      res.redirect('/items');
    });
  });
});

// SHOW ITEM
app.get('/items/:id', function(req, res) {
  db.Item.findById(req.params.id)
    .populate('user')
    .exec(function(err, item) {
      if (err) {
        console.log(err);
      } else {
        console.log(item);
        res.render('items/show', {item: item});
      }
    });
});

// EDIT ITEM
app.get('/items/:id/edit', function(req, res) {
  db.Item.findById(req.params.id, function(err, item) {
    res.render('items/edit', {item:item});
  });
});

// UPDATE ITEM
app.put('/items/:id', function(req, res) {
  var updateContent = req.body;
  db.Item.findByIdAndUpdate(req.params.id, updateContent,
    function(err, item) {
      if (err) {
        console.log(err);
        res.render('items/edit', {item:item});
      } else {
        console.log(item);
        res.redirect('/items/' + item._id);
      }
    }
  );
});

// DELETE ITEM
app.delete('/items/:id', function(req, res) {
  db.Item.findByIdAndRemove(req.params.id, function(err, item) {
    if (err) {
      console.log(err);
      res.render('items/show');
    } else {
      res.redirect('/items');
    }
  });
});
