const { log } = require('console');
const { name } = require('ejs');
const express = require('express');
const path = require('path');

const expressValidator = require('express-validator');

const productModel = require('../Models/product');
const cartProductModel = require('../Models/cartProduct');



const productController = {

    //Renderizar productos en la vista 'productList' inicio

    getPhones:(req,res)=>{ 

        const products = productModel.findByProduct_type('phones', false)

        res.render('productList', {
            products
        });
    },  

    getPrinters:(req,res)=>{

        const products = productModel.findByProduct_type('printer', false);
        
        res.render('productList', {
            products
        });
    },

    getAccesorios:(req,res)=>{

        const products = productModel.findByProduct_type('accesories', false);

        res.render('productList', {
            products
        });
    },

    getInformatica:(req,res)=>{

        const products = productModel.findByProduct_type('software', false);

        res.render('productList', {
            products
        });
    },
    
    //Renderizar productos en la vista 'productList' fin

    addCart: (req,res)=>{

        res.send(console.log('hola id: ' + products.id));
    },
    
    getDetail:(req,res)=>{

        const id = Number(req.params.id);

        const product = productModel.findByid(id)

        res.render('productDetail', {
            product:product
        });
    }, 
    
    /* postDetail: (req,res)=>{

        let detalleProducto = [];

        const datos = req.body;
                
        detalleProducto.push(datos);
        
        res.json(detalleProducto);

       // res.render('productDetail')
    }, */

    createProduct: (req,res)=>{

        res.render('createProduct' , {
            errors:[],
            values:[]
        });

    },

    addProduct: (req,res)=>{ 

        /* const body = '/createProduct'; */
        
        const validations = expressValidator.validationResult(req);
        
        if(validations.errors.length > 0){
            
            res.render('createProduct', {

                errors:validations.errors,
                values:req.body
            });

        }

            const newProduct = req.body;
            
            newProduct.image = '/images/' + req.file.filename;
           
            productModel.createOne(newProduct);
            
            return res.redirect('/products/:id/productDetail');
        
        
        /*         if(req.file){

            const validations = 
        } 
        */

        /*else { queda pendiente poner un mensaje par avisar que no se agregó una imagen, y
            refrescar la vista
            res.status('No se cargó una imagen, intentar nuevamente').send(body);
        }*/
    },

    getUpdate: (req,res)=>{

        const id = Number(req.params.id);

        const products = productModel.findByid(id)

        res.render('updateProduct', {

            products,
            errors:[],
            values:[]
        })
    },

    updateProduct: (req,res)=>{

        const id = Number(req.params.id);
        
        const validations = expressValidator.validationResult(req);

        if(validations.errors.length > 0){
            
            res.render('updateProduct', {

                errors:validations.errors,
                values:req.body
            });

        }

        // Por el body llega dos veces image porque tiene que leer si no sube imagen
        
        let newData = req.body;

        newData.image = req.file? '/images/' + req.file.filename : req.body.img
        
        const product_type = newData.product_type;

        productModel.updateByid(id, newData);

       /*  switch (product_type) {

            case 'phones':
                return productController.getPhones(req, res);
            break;
            case 'printer':
                return productController.getPrinters(req, res);
            break;
            case 'accesories':
                return productController.getAccesorios(req, res);
            break;
            case 'software':
                return productController.getInformatica(req, res);
            break;
        
            default:
                break;
        } */

        return res.redirect('/products/:id/productDetail');
    }, 

    deleteProduct: (req,res)=>{

        const id = Number(req.params.id);

        let products = productModel.deleteByid(id)

        products = productModel.findAll(false)

        res.render('productList', {products})
    },

    getaddToCart: (req,res)=>{

        const id = Number(req.params.id);

        let products1 = productModel.findByid(id)

        const userDataSession = req.session.userLogged;

        // Pasar el email a cartManager

        const product_type = products1.product_type;

        cartProductModel.cartManager(products1 , userDataSession)

       /*  console.log(product_type); */

       // PARA QUE EL SWITCH??

        /* switch (product_type) {

            case 'phones':
                return productController.getPhones(req, res);
            break;
            case 'printer':
                return productController.getPrinters(req, res);
            break;
            case 'accesories':
                return productController.getAccesorios(req, res);
            break;
            case 'software':
                return productController.getInformatica(req, res);
            break;
        
            default:
                break;
        } */

        return res.redirect('/products/productCart');
    },

    getRemoveFromCart: (req,res)=>{

        const id = Number(req.params.id);

        const userDataSession = req.session.userLogged;

        const cartProducts =  cartProductModel.removeFromCart(id , userDataSession);

        res.render('productcart',{

            cartProducts:[cartProducts]

        })

    },

    getcleanCart: (req,res)=>{

        const userDataSession = req.session.userLogged

        const cartProducts = cartProductModel.cleanCart(userDataSession);

        res.render('productcart', {cartProducts});

    },

    getCart: (req,res)=>{

        const userEmailSession = req.session.userLogged.email;
        
        let cartProducts = cartProductModel.checkCart(userEmailSession);

        if(!cartProducts){
            cartProducts=[]
        }
       
        return res.render('productcart',{

            cartProducts:[cartProducts]
            
        });
    }
}

module.exports = productController;