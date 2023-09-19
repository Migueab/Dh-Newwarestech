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
router.get('/adminregister', authMiddleware ,mainControllers.getAdminRegister);

//@post /adminregister
router.post('/adminregister', authMiddleware ,validationsUser.validateCreateUser ,mainControllers.postAdminRegister);



//@get /adminuserprofile       
router.get('/adminuserprofile/:userAdmin', authMiddleware ,mainControllers.getAdminUserProfile);


//@get /update/admin        
router.get('/updateadminuser/:userAdmin', authMiddleware ,mainControllers.getUserAdminToUpdate);

//@put /update/admin
router.put('/updateadminuser/:userAdmin/update', authMiddleware , mainControllers.putUserAdminUpdate);


//@delete

router.delete ('/updateadminuser/:userAdmin/delete' , authMiddleware,  mainControllers.deleteUserAdmin)


//@logout

router.post ('/adminlogout' , mainControllers.amdminLogOut)


module.exports = router;