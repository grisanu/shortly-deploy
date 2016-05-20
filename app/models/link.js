var db = require('../config');
var mongoose = require('mongoose');
var crypto = require('crypto');

var linkSchema = mongoose.Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
  link: String
});

var Link = mongoose.model('Link', linkSchema);

linkSchema.pre('save', function (next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});

module.exports = Link;
