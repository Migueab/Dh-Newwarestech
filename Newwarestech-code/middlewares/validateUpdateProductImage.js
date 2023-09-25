
const db = require("../database/models");

function validarEdicionImagen( req,res,next){

    const imagen = req.file

    const id = Number(req.params.id)

    if (!imagen || imagen === "undefined"){

        db.Producto.findOne({
            where:{
                id:id
            }
        }).then(function(producto){

            return res.render('updateProduct',{

            errors: [{
                msg:"Agregue una imagen"
            }],
                values: req.body,
                products:producto
        })

        }).catch(function(e){

            return console.log(e)
        })

    }

    next()
}

module.exports = validarEdicionImagen;