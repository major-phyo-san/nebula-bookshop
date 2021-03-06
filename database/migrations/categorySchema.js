var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = mongoose.Schema({
    name: String,
    description: String,
    subcategories: [{
        type: Schema.Types.ObjectId,
        ref: 'Subcategory'
    }]
});

module.exports = categorySchema;