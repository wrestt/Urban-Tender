var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  kind: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  image: String,
  description: String,
  price: Number,
  quantity: Number,
  seller: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
