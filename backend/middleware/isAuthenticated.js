const jwt = require('jsonwebtoken');


const isAuthenticated = (req, res, next) => {
  const Authorization = req.headers.Authorization || req.headers.authorization;
  if(Authorization && Authorization.startsWith('Bearer')) {
    const token = Authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, info) => {
      if(err) {
        return res.status(403).json({ message: 'Unauthorized Invalid Token' });
      }
      req.user = info;
      next();
    });
  } else {
    return res.status(402).json({ message: 'Unauthorized no token' });
  }
};

module.exports = isAuthenticated;