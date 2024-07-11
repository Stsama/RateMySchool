// Middleware to verify if the user is an admin
function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.isAdmin) {
        return next();
    } else {
        return res.status(403).json({ message: 'You are not authorized to access this page!' });
    }
}