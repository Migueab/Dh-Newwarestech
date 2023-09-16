const { log } = require('console');
const { name } = require('ejs');
const express = require('express');
const path = require('path');

const expressValidator = require('express-validator');

const db = require("../database/models");

const productController = {

    //Renderizar productos en la vista 'productList' inicio

    getPhones: (req, res) => {

        db.Producto.findAll({
            where: {
                product_type: "phones"
            }
        })
            .then(function (products) {

                /* const products = productos; */

                return res.render('productList', {
                    products: products
                });

            })

        /* const products = productModel.findByProduct_type('phones', false) */

    },

    getPrinters: (req, res) => {

        /* const products = productModel.findByProduct_type('printer', false); */

        db.Producto.findAll({
            where: {
                product_type: "printer"
            }
        }).then(function (productos) {

            const products = productos;
            return res.render('productList', {
                products
            });
        })

    },

    getAccesorios: (req, res) => {

        /* const products = productModel.findByProduct_type('accesories', false); */

        db.Producto.findAll({
            where: {
                product_type: "accesories"
            }
        }).then(function (productos) {

            const products = productos;

            return res.render('productList', {

                products: products
            });
        })

    },

    getInformatica: (req, res) => {

        /* const products = productModel.findByProduct_type('software', false); */

        db.Producto.findAll({
            where: {
                product_type: "software"
            }
        }).then(function (prodcutos) {

            const products = prodcutos;

            return res.render('productList', {
                products: products
            });
        })

    },

    //Renderizar productos en la vista 'productList' fin

    addCart: (req, res) => {

        res.send(console.log('hola id: ' + products.id));
    },

    getDetail: (req, res) => {

        const id = Number(req.params.id);

        db.Producto.findByPk(id)
            .then(function (producto) {

                const product = producto;

                return res.render('productDetail', {
                    product: product
                });
            })

        /* const product = productModel.findByid(id) */

    },

    /* postDetail: (req,res)=>{

        let detalleProducto = [];

        const datos = req.body;
                
        detalleProducto.push(datos);
        
        res.json(detalleProducto);

       // res.render('productDetail')
    }, */

    createProduct: (req, res) => {

        res.render('createProduct', {
            errors: [],
            values: []
        });

    },

    addProduct: (req, res) => {

        /* const body = '/createProduct'; */

        const validations = expressValidator.validationResult(req);

        if (validations.errors.length > 0) {

            res.render('createProduct', {

                errors: validations.errors,
                values: req.body
            });

        }

        const newProduct = req.body;

        newProduct.imagen = '/images/' + req.file.filename

        db.Producto.create({

            ...newProduct,

        });

        res.redirect('/')
/* 
        let newproductid = db.Producto.findAll({
            limit:1,
            where:id,
            order:[['createdAt','DESC']]
        })
            .then(function (producto) { 

                return producto

            }).catch(function(e){
                return console.log(e)
            })

            console.log(newproductid)

        return res.redirect('/products/'+newproductid+'/productDetail'); */

        switch (newProduct.product_type) {
 
            case 'phones':
                return res.redirect('/productsPhones');
            break;
            case 'printer':
                return res.redirect('/productsPrinters');
            break;
            case 'accesories':
                return res.redirect('/productsInformatica');
            break;
            case 'software':
                return res.redirect('/productsAccesorios');
            break;
        
            default: 
                break;
        }


    },

    getUpdate: (req, res) => {

        const id = Number(req.params.id);

        /* const products = productModel.findByid(id) */

        db.Producto.findByPk(id)
            .then(function (producto) {

                const products = producto;

                return res.render('updateProduct', {

                    products: products,
                    errors: [],
                    values: []
                })
            })

    },

    updateProduct: (req, res) => {

        const id = Number(req.params.id);

        const validations = expressValidator.validationResult(req);

        if (validations.errors.length > 0) {

            res.render('updateProduct', {

                errors: validations.errors,
                values: req.body
                
            });
        }

        if (!newData.imagen) {

            db.Producto.findOne({

                where: {
                    id: id
                }

            }).then(function (producto) {

                return producto.imagen

            }).catch(function (e) {
                return console.log(e)
            })
        }
        // Esto es asi porque, si no cambia la imagen, que sea la que habia antes
    

        db.Producto.update({

            product_type:req.body.product_type,
            nombre:req.body.nombre,
            imagen:req.body.imagen,
            precio:req.body.precio,
            stock:req.body.stock,
            descripcion:req.body.descripcion

        }, {
            where: {
                id: id
            }
        });

        /*  newData.image = req.file? '/images/' + req.file.filename : req.body.img */

        /* const product_type = newData.product_type; */

        /* productModel.updateByid(id, newData); */

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

        return res.redirect('/products/'+id+'/productDetail');
    },

    deleteProduct: (req, res) => {

        const id = Number(req.params.id);

        /* let products = productModel.deleteByid(id) */

        db.Producto.destroy({

            where: {
                id: id
            }
        })

        res.redirect('/')

        // Deberia ser un resredirect prductList
    },

    getaddToCart: (req, res) => {

        const id = Number(req.params.id);

        /* let products1 = productModel.findByid(id) */

        const userDataSession = req.session.userLogged;

        db.Producto.findByPk(id)
            .then(function (producto) {

                const product = cartadeproducto;

                return product
            })

        // Pasar el email a cartManager

        /*   const product_type = products1.product_type;
  
          cartProductModel.cartManager(products1 , userDataSession) */

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

    getRemoveFromCart: (req, res) => {

        const id = Number(req.params.id);

        const userDataSession = req.session.userLogged;

        /*  const cartProducts =  cartProductModel.removeFromCart(id , userDataSession); */

        db.Cartproduct.update({



        }, {
            where: {
                email: userDataSession.email
            }
        })

        res.render('productcart', {

            cartProducts: [cartProducts]

        })

    },

    getcleanCart: (req, res) => {

        const userDataSession = req.session.userLogged

        /* const cartProducts = cartProductModel.cleanCart(userDataSession); */

        db.Cartproduct.update({

            productId: []
            // Pregunta, el reemplazo por un array vacio elimina los existentes?

        }, {
            where: {
                email: userDataSession.email
            }
        });

        res.redirect('/products/productCart');

    },

    getCart: (req, res) => {

        const userEmailSession = req.session.userLogged.email;

        /* let cartProducts = cartProductModel.checkCart(userEmailSession); */

        db.Cartproduct.findAll({
            where: {
                email: userEmailSession
            }
        }).then(function (cartadeproducto) {

            const cartProducts = cartadeproducto;

            return res.render('productcart', {

                cartProducts: [cartProducts]

            });
        })

        /*  if(!cartProducts){
             cartProducts=[]
         }
         */
    }
}

module.exports = productController;