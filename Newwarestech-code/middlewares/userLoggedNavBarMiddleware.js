

const db = require('../database/models');

function userLoggedNavMiddleware(req,res,next){

    res.locals.isLogged = false;

/*  Verificando funcionamiento de cookie */
/*  Figura como undefined al leer emailUser , la cookie */

    let emailInCookie = req.cookies.emailUser;

    if(emailInCookie){

    db.Usuario.findOne({
        where:{

            email: req.cookies.emailUser

        }}).then(function(usuario){

            let userFromCookie = usuario;

            if(userFromCookie){ 

                return req.session.userLogged = userFromCookie;
             }

        }).catch(function(e){

            return console.log(e);

        });
    }

/* Verificando */

    if(req.session.userLogged){

        res.locals.isLogged=true;
        res.locals.userLogged = req.session.userLogged;

    }

    next();
}

module.exports=userLoggedNavMiddleware;