const session = require("express-session");
const MongoStore = require("connect-mongo");


const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false, // Ne pas sauvegarder les sessions non initialisées
  store: MongoStore.create({ mongoUrl: process.env.DB_URI }),
  cookie: {
    secure: false, // Mettre à true en production avec HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 jours
  },
});

module.exports = sessionMiddleware;
