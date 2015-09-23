var db = require('../models');

var loginHelpers = function(req, res, next) {
  req.login = function(user) {
    req.session.id = user._id;
    req.session.info = user;
  };

  req.logout = function() {
    req.session.id = null;
    req.session.info = null;
  };

  next();
};

module.exports = loginHelpers;
