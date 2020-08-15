/**
 * Defining user schema
 */
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId

// Define our user schema
var UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    avator: { type: String, default: 'https://cdn.vox-cdn.com/thumbor/ctZ6WW-UTBZuXSSq0BIxLS3r0AI=/0x0:3840x2160/1820x1213/filters:focal(2125x553:2739x1167):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/65638220/Death_Stranding_Sam_Porter_Bridges.13.jpg'},
    posts: { type: [ObjectId], default: []},
    account_id: { type: Number, default: 0}
},{ collection : 'users' });

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
