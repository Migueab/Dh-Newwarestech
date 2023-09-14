
const userAdminModel = require('../models/usersAdmin');


function userAdminLoggedNavMiddleware(req,res,next){

    res.locals.adminIsLogged = false;

    
    let emailInCookie = req.cookies.emailAdmin;
    let userAdminFromCookie = userAdminModel.findByField('email',emailInCookie);
    
        if(userAdminFromCookie){ 

            req.session.userAdminLogged = userAdminFromCookie;
        }


    if(req.session.userAdminLogged){
       
        res.locals.adminIsLogged=true;
        res.locals.adminUserLogged = req.session.userAdminLogged;
       
    }

    next();
}




module.exports= userAdminLoggedNavMiddleware;
