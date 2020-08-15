/**
 * Defining consumable schema
 */
var mongoose = require('mongoose');
var Mixed = mongoose.Schema.Types.Mixed

// Define our ship schema
var ConsumableSchema = new mongoose.Schema({
    profile: Mixed,
    name: String,
    price_gold: Number,
    image: String,
    consumable_id: Number,
    price_credit: Number,
    type: String,
    description: String
}, { collection: 'consumables' });

// Export the Mongoose model
module.exports = mongoose.model('Consumable', ConsumableSchema);