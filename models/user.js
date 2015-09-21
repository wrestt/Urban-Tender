var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: String,
  email: {
  type: String,
  required: true,
  lowercase: true
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
    ref: 'Item'
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
})

Var User = mongoose.model('User', userSchema);

module.exports = User;
