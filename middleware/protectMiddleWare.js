function protectMiddleWare(req,res,next) {
    if(req.session.user) next();
    else res.redirect(`/users/login?redirectUrl=${req.originalUrl}`);
}

module.exports = protectMiddleWare;