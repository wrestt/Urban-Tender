var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  date: Date,
  content: String,
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
