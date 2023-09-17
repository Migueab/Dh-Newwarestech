
const db = require('../database/models')

function userAdminLoggedNavMiddleware(req,res,next){

    res.locals.adminIsLogged = false;

    let emailInCookie = req.cookies.emailAdmin;

    console.log( "This"+emailInCookie)

    let userAdminFromCookie = db.Usuario.findOne({

        where:{
            email: emailInCookie
        }
    }).then(function(usuario){

        return usuario

    }).catch(function(e){

        return console.log(e)
    })
    
    
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
