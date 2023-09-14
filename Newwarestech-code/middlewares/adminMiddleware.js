
function adminMiddleware( req, res, next){

    
    if(!req.session.userAdminLogged){

        return res.redirect('/admin');

    };

    next();
};



module.exports = adminMiddleware;