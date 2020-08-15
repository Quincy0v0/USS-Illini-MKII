/**
 * Defining ship schema
 */
var mongoose = require('mongoose');
var Mixed = mongoose.Schema.Types.Mixed

// Define our ship schema
var ShipSchema = new mongoose.Schema({
    description: String,
    price_gold: Number,
    ship_id_str: String,
    has_demo_profile: Boolean,
    images: {
        small: String,
        medium: String,
        Large: String,
        contour: String
    },
    modules: {
        engine: [Number],
        torpedo_bomber: [Number],
        fighter: [Number],
        hull: [Number],
        artillery: [Number],
        torpedoes: [Number],
        fire_control: [Number],
        flight_control: [Number],
        dive_bomber: [Number]
    },
    modules_tree: Mixed, // Map ?
    nation: String,
    is_premium: Boolean,
    ship_id: Number,
    price_credit: Number,
    default_profile: Mixed,
    upgrades: [Number],
    tier: Number,
    next_ships: {},
    mod_slots: Number,
    type: String,
    is_special: Boolean,
    name: String
}, { collection: 'ships' });

// Export the Mongoose model
module.exports = mongoose.model('Ship', ShipSchema);