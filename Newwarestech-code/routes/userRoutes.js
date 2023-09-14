const express = require('express');
const multer = require('multer');
const userController = require('../controllers/userController');
const router = express.Router();

const validationsUser = require('../middlewares/validationsUser');

const validationsUserLogin = require('../middlewares/validationUserLogin');

const authMiddleware = require('../middlewares/authMiddleware');

const guestMiddleware = require ('../middlewares/guestMiddleware');

const storage = require('../middlewares/storage');
const upload = multer({storage}); 



//Configuración multer final


//@GET /users/login
router.get('/login', guestMiddleware , userController.getLogin);

router.post('/login' , validationsUserLogin.validateLogInUser , userController.postLogin);

//@GET /users/register
router.get('/register', guestMiddleware , userController.getRegister);

//@Post /users/usersList
router.post ('/register',[ upload.single('image'), validationsUser.validateCreateUser ], userController.postRegister );


//Rutas de user

//@GET /users/userList
router.get('/userList' ,userController.getuserList);


//@get /users/userprofile
router.get('/userprofile',userController.getUserProfile);


//@GET /users/:id/update
router.get('/:user/updateuser', authMiddleware ,userController.getuserToUpdate); 

//@put /users/:id/put  formulario para update
router.put('/:user/put',[ upload.single('image'), authMiddleware ], userController.userUpdate); 


//@post /users/:id/deleteUser  funcion de  update
router.delete('/updateuser/:user/delete', authMiddleware ,userController.deleteUser); 

//@get /logout
router.get ( '/logout' , userController.getLogout );



module.exports = router;