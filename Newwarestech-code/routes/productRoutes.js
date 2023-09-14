
const express = require('express');

const multer = require('multer');

const {body} = require('express-validator');

const productController = require('../controllers/productController');

const router = express.Router();

const validateAddProduct = require('../middlewares/validations');
const updateValidateProduct = require('../middlewares/validateUpDateProduct');

const adminMiddleware = require('../middlewares/adminMiddleware');

//validaciones

//Configuración multer inicio

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, './public/images')
    },
    filename: (req,file, cb)=>{
        cb(null, Date.now() + '-' + file.originalname);
    } 
});

const upload = multer({storage : storage}); 

//Configuración multer final


//Requerir productos inicio

//@GET /products/productsPhones                
router.get('/productsPhones', productController.getPhones);            

//@GET /products/productsPrinters    
router.get('/productsPrinters', productController.getPrinters);        

//@GET /products/productsInformatica    
router.get('/productsInformatica', productController.getInformatica);  

//@GET /products/productsAccesorios
router.get('/productsAccesorios', productController.getAccesorios);    

//Requerir productos fin


//Carrito de compras

//@GET /products/productCart
router.get('/productCart', productController.getCart); 

//@POST /products/productCart
router.post('/:id/productCart', productController.addCart); 


//CRUD inicio

//@GET /products/createProduct
router.get('/createProduct', productController.createProduct); 

//@POST /products/createProduct
router.post('/createProduct',[ validateAddProduct.validateCreateProduct, upload.single('image'), adminMiddleware], productController.addProduct); 


//@GET /products/:id/productDetail
router.get('/:id/productDetail', productController.getDetail); 

//@DELETE /products/:id/delete
router.get('/:id/delete', adminMiddleware ,productController.deleteProduct); 

//@GET /products/:id/update
router.get('/:id/update', adminMiddleware ,productController.getUpdate); 

//@put /products/:id/put  este es el update
router.put('/:id/update',[ updateValidateProduct.validateUpdateProduct, upload.single('image'), adminMiddleware ],productController.updateProduct ); 



//CRUD final

//Rutas carrito de compra inicio

//@GET /products/:id/addToCart
router.get('/:id/addToCart', productController.getaddToCart);

router.get('/:id/removeFromCart', productController.getRemoveFromCart);

//@GET /products/cleanCart
router.get('/cleanCart', productController.getcleanCart);

//Rutas carrito de compra final

module.exports = router;