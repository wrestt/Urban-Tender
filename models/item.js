var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  name: String,
  type: String,
  date: Date,
  price: Number,
  seller: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
