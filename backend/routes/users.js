const router = require("express").Router();
const fs = require("fs");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const path = require("path");
const { v4: uuid } = require("uuid");
const isAuthenticated = require("../middleware/isAuthenticated");


// update user's profilePicture
router.post("/change-avatar", isAuthenticated, async (req, res) => {
  try {
    if (!req.files.profilePicture) {
      return res.status(422).json({ message: "Please upload an image" });
    }
    // find the user by id
    const user = await User.findById(req.user.id);
    // delete the old profile picture
    if (user.profilePicture) {
      fs.unlink(path.join(__dirname, "../uploads/", user.profilePicture), (err) => {
        if (err) {
          return res.status(400).json({ message: "The file was not deleted!" });
        }
      });
    }
    const { profilePicture } = req.files;
    if (profilePicture.size > 2000000) {
      return res.status(422).json({ message: "Image size should not exceed 2MB" });
    }
    let fileName = profilePicture.name;
    let splitedName = fileName.split(".");
    let newFileName = splitedName[0] + uuid() + "." + splitedName[splitedName.length - 1];
    profilePicture.mv(path.join(__dirname, "../uploads", newFileName), async (err) => {
      if (err) {
        return res.status(400).json({ message: "The file was not uploaded!" });
      }
      const updatedAvatar = await User.findByIdAndUpdate(req.user.id, { profilePicture: newFileName }, { new: true });
      if (!updatedAvatar) {
        return res.status(422).json({ message: "User was not updated!" });
      }
      return res.status(200).json(updatedAvatar);
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// update user's data
router.patch("/edit-user", isAuthenticated, async (req, res) => {
  try {
    const { username, email, phoneNumber, currentPassword, password, password2 } = req.body;
    if (!username || !email || !phoneNumber || !currentPassword || !password || !password2) {
      return res.status(400).json({ message: "Please fill all the fields!" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    // check if the email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists && emailExists._id != req.user.id) {
      return res.status(422).json({ message: "Email already exists!" });
    }
    // compare the password with the hashed password of the user in the database
    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) {
      return res.status(422).json({ message: "Try again your old password is incorrect" });
    }
    // compare the new password with the confirm password
    if (password !== password2) {
      return res.status(422).json({ message: "Passwords do not match!" });
    }
    if (password.length < 5 || password2.length < 5) {
      return res.status(422).json({ message: "Password must be at least 5 characters long" });
    }
    // hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const updatedUser = await User.findByIdAndUpdate(req.user.id, { username, email, phoneNumber, password: hashedPassword }, { new: true });
    if (!updatedUser) {
      return res.status(422).json({ message: "User was not updated!" });
    }
    return res.status(200).json({ message: "User was updated!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});


// delete user's data
router.delete("/:id", async (req, res) => {
  // check if the user is logged in and if he/she is the owner of the account
  if (req.session.user) {
    try {
      await User.findByIdAndDelete(req.session.user._id);
      req.session.destroy();
      res.status(200).json({ message: "Account has been deleted!" });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(401).json({ message: "You can delete only your account!" });
  }
});

// get user's data
router.get("/:id", async (req, res) => {
  // find the user by id
  try {
    const user = await User.findById(req.params.id).select("-password  -phoneNumber");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// get all the users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
