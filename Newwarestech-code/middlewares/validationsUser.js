
const expressValidator = require('express-validator');


validationsUser={

    validateCreateUser:[

        expressValidator.body('nombre')
        .notEmpty().withMessage('El nombre no deberia estar vacio')
        .isLength({min:2,max:50}).withMessage('El nombre debe contener mas de dos caracteres'),
        
        expressValidator.body('apellido')
        .notEmpty().withMessage('El apellido no deberia estar vacio')
        .isLength({min:2,max:50}).withMessage('El apellido debe contener mas de dos caracteres'),

        expressValidator.body('email')
        .notEmpty().withMessage('El email no deberia estar vacio')
        .isEmail().withMessage('Deberia ser un email'),

        expressValidator.body('password')
        .notEmpty().withMessage('Escriba una contraseña')
        .isLength({min:8,max:16}).withMessage('La contraseña debe contener entre 8 y 16 caracteres')
    ]

}



module.exports = validationsUser;