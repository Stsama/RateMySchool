// check if the owner of the school has updated his profile

const isUpdated = async (req, res, next) => {
    if (req.session.user) {
        const user = await User.findById(req.session.user._id);
        if (!user.username || !user.email || !user.phoneNumber || !user.password) {
            res.status(403).json({ message: 'Please update your profile!' });
        } else {
            next();
        }
    }
    else {
        res.status(401).json({ message: 'You are not logged in!' });
    }
}