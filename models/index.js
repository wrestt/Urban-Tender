var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/tender_app');

module.exports.Item = require('./item');
module.exports.Comment = require('./comment');
module.exports.User = require('./user');
