var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: String,
  location: String,
  number: String,
  items:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
});

userSchema.pre('save', function(next) {
  console.log('PRE Save');
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }

  return bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      console.log('salt erro', err);
      return next(err);
    }

    return bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      } else {
        console.log('hashed');
        user.password = hash;
        return next();
      }
    });
  });
});

userSchema.statics.authenticate = function(formData, callback) {
  this.findOne({
    email: formData.email,
  },
  function(err, user) {
    if (user === null) {
      callback('Invalid username or password', null);
    } else {
      user.checkPassword(formData.password, callback);
    }
  });
};

userSchema.methods.checkPassword = function(password, callback) {
  var user = this;

  bcrypt.compare(password, user.password, function(err, isMatch) {
    if (isMatch) {
      callback(null, user);
    } else {
      callback(err, null);
    }
  });
};

var User = mongoose.model('User', userSchema);
module.exports = User;
