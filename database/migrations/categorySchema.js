var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
    name: String,
    description: String
});

module.exports = categorySchema;