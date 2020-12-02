var mongoose = require('mongoose');

var categorySchema = require('../../database/migrations/categorySchema');

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;