const router = require('express').Router()
const fs = require('fs');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const path = require('path');
const { v4: uuid } = require('uuid');


// update user's data
router.put('/', async (req, res) => {
    // check if the user is logged in and if he/she is the owner of the account
    if (req.session.user) {
        const user = await User.findById(req.session.user._id);
        const newUserData = {};
        // check if the user wants to change the password
        if (req.files) {
            if (req.files.profilePicture) {
                // delete the old profile picture if it exists
                if (user.profilePicture) {
                    fs.unlink(path.join(__dirname, '../uploads', user.profilePicture), (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
                const file = req.files.profilePicture;
                if (file.size > 2000000) {
                    return res.status(400).json({ message: 'The file is too big!' });
                }
                let fileName = file.name;
                let split = fileName.split('.');
                let newFileName = split[0] + uuid() + '.' + split[split.length - 1];
                file.mv(path.join(__dirname, '../uploads', newFileName), async (err) => {
                    if (err) {
                        return res.status(500).json({ message: 'The file was not uploaded!' });
                    }
        
                });
                newUserData.profilePicture = newFileName;
            }
        }

        if (req.body) {
            if (req.body.password) {
                // harsh the password
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
            try {
                const { username, email, phoneNumber, password } = req.body;
                newUserData.username  = username || user.username;
                newUserData.email  = email || user.email;
                newUserData.phoneNumber  = phoneNumber || user.phoneNumber;
                newUserData.password  = password || user.password;
    
            } catch (error) {
                console.log(error);
            }
        }
        try {
            await User.findByIdAndUpdate(req.session.user._id, newUserData, { new: true });
            res.status(200).json({ message: 'Your data has been updated!' });
        } catch (error) {
            console.log(error);
        }
        
    } else {
        res.status(401).json({ message: 'You are not logged in!' });   
    }
});

// delete user's data
router.delete('/:id', async (req, res) => {
    // check if the user is logged in and if he/she is the owner of the account
    if (req.session.user) {
        try {
            await User.findByIdAndDelete(req.session.user._id);
            req.session.destroy();
            res.status(200).json({ message: 'Account has been deleted!' });
        } catch (error) {   
            console.log(error);
        }
    }else {
        res.status(401).json({ message: 'You can delete only your account!' });
    }
});

// user's profile
router.get('/profile', async (req, res) => {
    // check if the user is logged in
    if (req.session.user) {
        const user = await User.findById(req.session.user._id);
        res.status(200).json({ message: 'Here is your profile', user: {
            username: user.username,
            email: user.email,
            phoneNumber: user.get('phoneNumber'),
            profilePicture: user.get('profilePicture'),         
        } });
    } else {
        res.status(401).json({ message: 'You are not logged in!' });
    }
});

module.exports = router;