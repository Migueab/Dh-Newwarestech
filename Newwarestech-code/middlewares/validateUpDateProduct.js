
const expressValidator = require('express-validator');

const Updatevalidations={

    validateUpdateProduct:[
        
        expressValidator.body('product_type')
        .notEmpty()
        .withMessage('Selecciona una categoria'),
        
        expressValidator.body('nombre')
        .notEmpty()
        .withMessage('Escriba el nombre del producto'),
        
        expressValidator.body('precio')
        .notEmpty()
        .withMessage('Escriba el precio del producto'),
        
        expressValidator.body('descripcion')
        .notEmpty()
        .withMessage('Escriba la descripción del producto'),

        expressValidator.body('imagen')
        .notEmpty()
        .withMessage('Agregue la imagen del producto')

    ]
}


module.exports=Updatevalidations;