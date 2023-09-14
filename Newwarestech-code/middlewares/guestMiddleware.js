
function guestMiddleware (req,res,next){

    if(req.session.userLogged){

        return res.redirect('/products/productCart');
    
    }; 

    next();
}

module.exports=guestMiddleware;

