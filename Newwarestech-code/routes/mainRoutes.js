const express = require('express');
const mainControllers = require('../controllers/mainControllers');
const router = express.Router();

const validationsUser = require('../middlewares/validationsUser');
const validationsUserLogin = require('../middlewares/validationUserLogin');

const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

const userAdminLoggedNavMiddleware = require('../middlewares/userAdminLoggedNavMiddleware');

//@get /
router.get('/', mainControllers.getIndex);

//@get /admin
router.get('/admin', mainControllers.getAdmin);

//Login del admin
//@post /admin
router.post('/admin', validationsUserLogin.validateLogInUser ,mainControllers.postAdmin);


//@get /adminregister
router.get('/adminregister', mainControllers.getAdminRegister);

//@post /adminregister
router.post('/adminregister', validationsUser.validateCreateUser ,mainControllers.postAdminRegister);



//@get /adminuserprofile       
router.get('/adminuserprofile/:userAdmin', mainControllers.getAdminUserProfile);


//@get /update/admin        
router.get('/updateadminuser/:userAdmin', mainControllers.getUserAdminToUpdate);

//@put /update/admin
router.put('/updateadminuser/:userAdmin/update', mainControllers.putUserAdminUpdate);


//@delete

router.delete ('/updateadminuser/:userAdmin/delete' , mainControllers.deleteUserAdmin)


//Carrito del admin

// @GET /products/productCart
router.get('/productAdminCart', mainControllers.getAdminCart);

//@POST /products/productCart
router.post('/:id/productAdminCart', mainControllers.addAdminCart); 


//@GET /products/:id/addToCart
router.get('/:id/addToAdminCart', mainControllers.getAdminaddToCart);

router.get('/:id/removeFromAdminCart', mainControllers.getAdminRemoveFromCart);

//@GET /products/cleanCart
router.get('/cleanAdminCart', mainControllers.getAdmincleanCart);

// fin carrito del admin



router.post ('/adminlogout' , mainControllers.amdminLogOut)


module.exports = router;