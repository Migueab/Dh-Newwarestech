
const db = require('../database/models')

function userAdminLoggedNavMiddleware(req,res,next){

    res.locals.adminIsLogged = false;

    let emailInCookie = req.cookies.emailAdmin;

    if(emailInCookie){

    db.Usuario.findOne({

        where:{
            email: req.cookies.emailAdmin
        }
    }).then(function(usuario){

        let userAdminFromCookie = usuario;

        if(userAdminFromCookie){ 
    
            return req.session.userAdminLogged = userAdminFromCookie;
        }
    

    }).catch(function(e){

        return console.log(e)
    })
}

    /* Verificando */

    if(req.session.userAdminLogged){
       
        res.locals.adminIsLogged=true;
        res.locals.adminUserLogged = req.session.userAdminLogged;
       
        }

    next();
}


module.exports= userAdminLoggedNavMiddleware;
