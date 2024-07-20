const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const upload = require('express-fileupload');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const session = require('express-session');
const passport = require('passport')
const path = require('path')
const fs = require('fs');

// port 
const port = process.env.PORT || 5000;

// routes
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const contactRoute = require('./routes/contacts')
const schoolRoute = require('./routes/schools')
const errorHandler = require('./middleware/errorHandler');


// session store
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl: process.env.DB_URI}),
  cookie: { 
    name: 'session',
    secure: false, // Mettre à true en production avec HTTPS
    httpOnly: true,
    // domain: 'http://localhost',
   } // 30 jours
  // cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 } // 30 jours
}));

// const sessionMiddleware = (session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false, // Ne pas sauvegarder les sessions non initialisées
//   store: MongoStore.create({ mongoUrl: process.env.DB_URI }),
//   cookie: {
//     secure: false, // Mettre à true en production avec HTTPS
//     httpOnly: true,
//     maxAge: 1000 * 60 * 60 * 24 * 30, // 30 jours
//   },
// }));




// db connection
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("connected"))
  .catch((e) => console.log(e));

// middlewares
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(cors());
app.use(upload());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(cors({
  origin: 'http://localhost:3000', // Votre URL frontend
  credentials: true // Permettre l'envoi de cookies
}));




// my routes

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/contact', contactRoute)
app.use('/api/v1/schools', schoolRoute)


// Middleware de gestion des erreurs
app.use(errorHandler);

app.listen(port, () => {
  console.log(`RateMySchool app listening on port ${port}`);
});
