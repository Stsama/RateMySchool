const mongoose = require('mongoose');

const SchoolSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        min: 3,
        max: 50,
        unique: true
    },
    address: {
        type: String,
        required: true,
        min: 3,
        max: 50,
    },
    location: {
        type: String,
        min: 3,
        max: 50,
    },
    phoneNumber: {
        type: Number,
        min: 7
    },
    description: {
        type: String,
        required: true,
        min: 10,
        max: 500
    },
    successRate: [
        info = {
            year: { type: String },
            rate: { type: Number }
        }
    ],
    reviews: [(review = {
        announcedBy: { type: String, default: "Unknown"}, 
        rating: { type: Number },
        review: { type: String }
    })],
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    trainings: {
        type: Array,
        default: []
    },
    schoolImages: {
        type: Array,
        default: []
    }
}, { timestamps: true });





module.exports = mongoose.model('School', SchoolSchema);