var mongoose = require('mongoose');

var subcategorySchema = require('../../database/migrations/subcategorySchema');

var Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;