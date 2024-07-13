const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const upload = require('express-fileupload');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const passport = require('passport')
const path = require('path')
const fs = require('fs');

// port 
const port = process.env.PORT || 3000;

// routes
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const contactRoute = require('./routes/contacts')
const schoolRoute = require('./routes/schools')


// session store
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({mongoUrl: process.env.DB_URI})
}));



// db connection
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("connected"))
  .catch((e) => console.log(e));

// middlewares
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("common"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(upload());




// my routes

app.use('/api/v1/users', userRoute)
app.use('/api/v1/auth', authRoute)
app.use('/contact', contactRoute)
app.use('/api/v1/schools', schoolRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
