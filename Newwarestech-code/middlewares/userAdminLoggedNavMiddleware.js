
const db = require('../database/models')

function userAdminLoggedNavMiddleware(req,res,next){

    res.locals.adminIsLogged = false;

    let emailInCookie = req.cookies.emailAdmin;

    db.Usuario.findOne({

        where:{
            email: emailInCookie
        }
    }).then(function(usuario){

        let userAdminFromCookie = usuario;

        if(userAdminFromCookie){ 
    
            return req.session.userAdminLogged = userAdminFromCookie;
        }
    

    }).catch(function(e){

        return console.log(e)
    })
    
    if(req.session.userAdminLogged){
       
        res.locals.adminIsLogged=true;
        res.locals.adminUserLogged = req.session.userAdminLogged;
       
        }

    next();
}


module.exports= userAdminLoggedNavMiddleware;
