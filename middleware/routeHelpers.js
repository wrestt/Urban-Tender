var routeHelpers = {
  ensureLoggedIn: function(req, res, next) {
    if (req.session.id !== null && req.session.id !== undefined) {
      return next();
    } else {
      res.redirect('/login');
    }
  },

  ensureCorrectUser: function(req, res, next) {
    db.User.findById(req.params.id, function(err, user) {
      if (user._id !== req.session.id) {
        res.redirect('/users');
      } else {
        return next();
      }
    });
  },

  preventLoginSignup: function(req, res, next) {
    if (req.session.id !== null && req.session.id !== undefined) {
      res.redirect('/users/login');
    } else {
      return next();
    }
  },
};

module.exports = routeHelpers;
