const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const bcrypt = require("bcrypt");

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
        password: await bcrypt.hash(profile.id, 10),
        profileImage: profile.photos[0].values,
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
    successRedirect: "/dashboard",
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
  res.send('<a href="/api/v1/auth/google">Authenticate with Google</a>');
});


// register from the form
router.post("/register", async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.username) {
    res.status(400).json({ message: "Please fill all the fields!" });
  }

  if (req.body.password && req.body.password.length < 5) {
    res.status(400).json({ message: "Password must be at least 5 characters long!" });
  }
  if (req.body.username && (req.body.username.length < 3 || req.body.username.length > 30)) {
    res.status(400).json({ message: "Username must be between 3 and 30 characters long!" });
  }
  try {
    // harsh the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // create new user
    if (req.body.password && req.body.username && req.body.email) {
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
      // save user and respond
      const savedUser = await newUser.save();
      res.status(200).json({ message: "User created successfully!", user: savedUser });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
});


// login from the form
router.post("/login", async (req, res) => {
  if (req.session.user) {
    res.status(200).json({ message: "You are already logged in!"});
    // res.status(200).json(req.session.user);
  } else {
    try {
      if (!req.body.email || !req.body.password) {
        res.status(400).json({ message: "Please fill all the fields!" });
      }
      if (req.body.password && req.body.email) {
        const user = await User.findOne({
          email: req.body.email,
        });
        if (!user) {
          res.status(400).json({ message: "Wrong Credentials!" });
        }
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!validPassword) {
          res.status(404).json({ message: "Wrong Credentials!" });
        }
        req.session.user = user;
        res.status(200).json({ message: "You are logged in!", user: user });
      }
    } catch (error) {
      console.log(error);
    }
  }
});


// logout from the form
router.get("/form-logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.log(error);
      res.send({ message: "Error when loggin out " });
    } else {
      res.redirect("/api/v1/auth");
    }
  });
});

module.exports = router;
