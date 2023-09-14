
const userModel = require('../models/users');

function userLoggedNavMiddleware(req,res,next){

    res.locals.isLogged = false;

/*  Verificando funcionamiento de cookie */
/*  Figura como undefined al leer emailUser , la cookie */

    let emailInCookie = req.cookies.emailUser;
    let userFromCookie = userModel.findByField('email',emailInCookie);
    
        if(userFromCookie){ 

            req.session.userLogged = userFromCookie;
        }

/* Verificando */

    if(req.session.userLogged){

        res.locals.isLogged=true;
        res.locals.userLogged = req.session.userLogged;

    }

    next();
}

module.exports=userLoggedNavMiddleware;