const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
    // may have to change the user_id property later according to other login middleware
    res.cookie('ssid', res.locals.hash, { httpOnly: true })
    return next();
}

module.exports = cookieController;