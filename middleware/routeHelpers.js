var db = require('../models');
var mongoose = require('mongoose');

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
        if (err) {
          console.log('Ensure Correct User Err', err);
        } else {
          if (user._id != req.session.id) {
            res.redirect('/users');
          } else {
            return next();
          }
        }
      });
    },

  ensureCorrectUserItem: function(req, res, next) {
      db.Item.findById(req.params.id)
      .populate('seller')
      .exec(function(err, item) {
        if (err) {
          console.log('Ensure Correct User Err', err);
        } else {
          if (item.seller[0]._id != req.session.id) {
            res.redirect('/users');
          } else {
            return next();
          }
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
