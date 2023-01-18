//custom authorization
export const authorization = (req, res, next) => {
    if (!req.user) {
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
};