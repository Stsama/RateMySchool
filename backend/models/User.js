const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        default: ""
    },
    username:{
        type: String,
        required: true,
        nim: 3,
        max: 30,  
    },
    email:{
        type: String,
        require: true,
        max: 50,
        unique: true  
    },
    password:{
        type: String,
        require: true,
        min: 5
    },
    phoneNumber:{
        type: Number,
        min: 7
    },
    profilePicture:{
        type: String,
        default: "DefaultUserProfile.png", 
    },
    isAdmin:{
        type: Boolean,
        default: false, 
    },
} , {timestamps: true});


module.exports = mongoose.model('User', UserSchema);