// Middleware pour vérifier si l'utilisateur est authentifié
function isAuthenticated(req, res, next) {
    if (req.session.user) {
      return next();
    } else {
      return res.status(401).json({ message: "You are not authenticated!" });
    }
  }