const checkForUser = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json("please log in");
    }
    next();
};

module.exports = {
    checkForUser
}