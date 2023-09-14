
const expressValidator = require('express-validator');

const Updatevalidations={

    validateUpdateProduct:[
        
        expressValidator.body('product_type')
        .notEmpty()
        .withMessage('Selecciona una categoria'),
        
        expressValidator.body('name')
        .notEmpty()
        .withMessage('Escriba el nombre del producto'),
        
        expressValidator.body('price')
        .notEmpty()
        .withMessage('Escriba el precio del producto'),
        
        expressValidator.body('description')
        .notEmpty()
        .withMessage('Escriba la descripción del producto'),

        expressValidator.body('image')
        .notEmpty()
        .withMessage('Agregue la imagen del producto')

    ]
}


module.exports=Updatevalidations;