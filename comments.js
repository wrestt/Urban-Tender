var db = require('../models/index');

//Chat Page
app.get('', routeMiddleware.ensureLoggedIn, function(req, res) {
  db.Item.findById(req.params.item_id)
    .populate('comments')
    .exec(function(err, item) {
      if (err) {
        console.log('Chat Page', err);
        res.redirect('/Vegetable/:item_id/comments');
      } else {
        db.Comment.populate(item, {
          path: 'comments.owner',
          model: 'User',
        });
      }
    });
});

//Create Chat
app.post('', function(req, res) {

});

//Edit Chat
app.put('', function(req, res) {

});

//Update Chat
app.put('', function(req, res) {

});

//Delete Chat
app.delete('', routeMiddleware.ensureLoggedIn, function(req, res) {

});
