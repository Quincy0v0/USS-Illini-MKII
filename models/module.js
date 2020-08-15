/**
 * Defining module schema
 */
var mongoose = require('mongoose');
var Mixed = mongoose.Schema.Types.Mixed

// Define our module schema
var ModuleSchema = new mongoose.Schema({
    profile: Mixed,
    name: String,
    image: String,
    tag: String,
    module_id_str: String,
    module_id: Number,
    type: String,
    price_credit: Number
}, { collection: 'modules' });

// Export the Mongoose model
module.exports = mongoose.model('Module', ModuleSchema);