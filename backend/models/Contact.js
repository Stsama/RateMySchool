const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        min: 3,
        max: 50,
    },
    message: {
        type: String,
        required: true,
        min: 10,
        max: 500
    }
}, { timestamps: true });






module.exports = mongoose.model('Contact', ContactSchema);