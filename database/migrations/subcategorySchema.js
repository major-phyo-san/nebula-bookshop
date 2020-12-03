var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subcategorySchema = mongoose.Schema({
    name: String,
    description: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
});

module.exports = subcategorySchema;