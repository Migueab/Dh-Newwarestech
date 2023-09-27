
function validarImagen( req,res,next){

    const imagen = req.file

    if (!imagen){

        return res.render('createProduct',{

            errors: [{
                msg:"Agregue una imagen"
            }],
                values: req.body
        })
    }

    next()
}

module.exports = validarImagen;