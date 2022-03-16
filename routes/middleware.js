

// middleware function to check for logged-in users
exports.sessionChecker = (req, res, next) => {
    console.log("user: "+req.session.user+", userid: "+req.session.userid)
    if (req.session.user && req.session.userid) {
        console.log("middleware successful")
        return next()
    } else {
        return res.status(401).send("You need to be logged in")
    }
};

