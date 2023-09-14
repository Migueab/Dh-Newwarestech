
const db = require('../database/models')

function userAdminLoggedNavMiddleware(req,res,next){

    res.locals.adminIsLogged = false;

    let emailInCookie = req.cookies.emailAdmin;


    let userAdminFromCookie = db.Usuario.findOne({
        where:{
            usuariotipo:"administrador",
            email: emailInCookie
        }
    }).then(function(usuario){

        return usuario

    }).catch(function(e){

        return console.log("MW : No se encontro el usuario administrador")
    })
    
    
    
    /* userAdminModel.findByField('email',emailInCookie); */
    
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
