var db = require('../models/index');
var ospry = require('ospry');
// ITEM INDEX
app.get('/items', function(req, res) {
  db.Item.find({})
  .populate('seller')
  .exec(function(err, items) {
    if (err) {
      console.log('Item Err', err);
    } else {
      console.log('DEZZZ Items', items);
      res.render('items/index', {items: items});
    }
  });
});

// CREATE ITEM
app.post('/items', function(req, res) {
  console.log('made it to items');
  var newItem = req.body.item;
  db.User.findById(req.session.id, function(err, user) {
    if (!newItem.image) {
      newItem.image = '/default.jpg';
    }
    db.Item.create(newItem, function(err, item) {
      user.items.push(item);
      item.seller = user._id;
      user.save();
      item.save();
      res.redirect('/items');
    });
  });
});

// SHOW ITEM
app.get('/items/:id', function(req, res) {
  db.Item.findById(req.params.id)
    .populate('seller')
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
app.get('/items/:id/edit', routeMiddleware.ensureCorrectUserItem,
  function(req, res) {
  db.Item.findById(req.params.id, function(err, item) {
    res.render('items/edit', {item: item});
  });
});

// UPDATE ITEM
app.put('/items/:id', routeMiddleware.ensureCorrectUserItem,
  function(req, res) {
  var updateContent = req.body.item;
  console.log('*************', req.body.item);
  db.Item.findByIdAndUpdate(req.params.id, updateContent,
    function(err, item) {
      if (err) {
        console.log('update item err', err);
        res.redirect(item._id);
      } else {
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
