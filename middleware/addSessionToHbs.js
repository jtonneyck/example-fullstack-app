function addSessionToHbs(req,res,next){
    if(req.session.user) {
        res.locals.loggedIn = true;
        res.locals.user = req.session.user;    
     }
     next();
}

module.exports = addSessionToHbs;