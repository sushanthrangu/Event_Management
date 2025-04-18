const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const rsvpSchema = new Schema({
    rsvp: {type: String, required:[true, 'RSVP is required']},
    user: {type: Schema.Types.ObjectId, ref: 'User', required:[true, 'RSVP is required']},
    connection: {type: Schema.Types.ObjectId, ref: 'Connection', required:[true, 'RSVP is required']}
});

//collection name is rsvps in database
module.exports = mongoose.model('Rsvp', rsvpSchema);