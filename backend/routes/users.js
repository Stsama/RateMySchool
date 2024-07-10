const router = require('express').Router()
const User = require('../models/User');
const bcrypt = require('bcrypt');


// update user's data
router.put('/:id', async (req, res) => {
    // check if the user is logged in and if he/she is the owner of the account
    if (req.session.user && req.session.user._id === req.params.id) {
        // check if the user wants to update the password
        if (req.body.password) {
            // harsh the password
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {  $set: req.body, });
            res.status(200).json({ message: 'Account has been updated!', user: updatedUser });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    else {
        res.status(401).json({ message: 'You can update only your account!' });
    }
});

// delete user's data
router.delete('/:id', async (req, res) => {
    // check if the user is logged in and if he/she is the owner of the account
    if (req.session.user && req.session.user._id === req.params.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
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
        res.status(200).json({ message: 'Here is your profile', user: user });
    } else {
        res.status(401).json({ message: 'You are not logged in!' });
    }
});



// get a user
// router.get('/:id', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         const { password, updatedAt, ...other } = user._doc;
//         res.status(200).json(other);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });

module.exports = router;