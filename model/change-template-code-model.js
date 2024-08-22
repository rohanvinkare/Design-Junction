const mongoose = require('mongoose');



// Define Schema
const changeSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    property: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to user model, if needed
    }
});

// Define Model
module.exports = mongoose.model('Change', changeSchema);



