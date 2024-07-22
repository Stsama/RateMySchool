const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const bcrypt = require("bcrypt");
// const sessionMiddleware = require('../middleware/sessionMiddleware');
const MongoStore = require('connect-mongo');
const JWT = require('jsonwebtoken');





// passport middleware
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      const newUser = {
        googleId: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value,
        password: await bcrypt.hash(profile.emails[0].value, 10),
        profilePicture: profile.photos[0].values,
      };

      try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          done(null, user);
        } else {
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);

//Google Login Route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// Retrieve user data
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login-failure",
    successRedirect: "http://localhost:3000/login",
  })
);

//Route if something went wrong
router.get("/login-failure", (req, res) => {
  res.json({ message: "Login Failed" });
});

//Destroy user's session
router.get("/google-logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.log(error);
      res.json({ message: "Error when loggin out " });
    } else {
      res.redirect("/");
    }
  });
});

//Persist user data after successful authentication
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//Retrieving user data from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});


// Routes

// Route to authenticate with Google
router.get("/", (req, res) => {
  res.send('<a href="/api/auth/google">Authenticate with Google</a>');
});


// register from the form
router.post("/register", async (req, res, next) => {
  try{
    const { username, email, password, password2 } = req.body;
    if (!username || !email || !password || !password2) {
      return res.status(400).json({ message: "Please fill all the fields!" });
    }
    const newEmail = email.toLowerCase();
    // check if the user already exists
    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists!" });
    }
    // password length
    if (password.length < 5 || password2.length < 5) {
      return res.status(400).json({ message: "Password must be at least 5 characters long" });
    }
    // password match
    if (password !== password2) {
      return res.status(400).json({ message: "Passwords do not match!" });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email: newEmail,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(200).json({ message: "You are registered!" });
  } catch (error) {
    next(error);
  }
});


// login from the form
router.post("/login", async (req, res) => {
  if (req.session.user) {
    return res.status(200).json({ message: "You are already logged in!"});
    // res.status(200).json(req.session.user);
  } else {
    try {
      if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: "Please fill all the fields!" });
      }
      if (req.body.password && req.body.email.toLowerCase()) {
        const user = await User.findOne({
          email: req.body.email,
        });
        if (!user) {
          return res.status(400).json({ message: "Wrong Credentials!" });
        }
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!validPassword) {
          return res.status(404).json({ message: "Wrong Credentials!" });
        }
        const {_id: id, username: name} = user;
        const token = JWT.sign({id, name}, process.env.JWT_SECRET, {expiresIn: '1d'});
        
        return res.status(200).json({token, id, name});
      }
    } catch (error) {
      console.log(error);
    }
  }
});


// logout from the form
router.get("/form-logout", (req, res) => {
  res.destroy();
  res.clearCookie('session_id'); // clear cookie
  req.session.destroy((error) => {
    if (error) {
      console.log(error);
      res.status(400).send({ message: "Error when loggin out " });
    } else {
      res.status(200).send({ message: "You are logged out!" });
    }
  });
});

module.exports = router;
