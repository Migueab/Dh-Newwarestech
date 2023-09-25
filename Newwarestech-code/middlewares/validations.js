const expressValidator = require('express-validator');

const validations={

    validateCreateProduct:[
        
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
        .withMessage('Escriba la descripción del producto')
        .isLength({min:20,max:100}).withMessage('La descripcion debe contener mas de 20 caracteres'),

        /* expressValidator.body("imagen")
        .notEmpty()
        .withMessage('Agregue la imagen del producto') */

    ]
}


module.exports=validations;