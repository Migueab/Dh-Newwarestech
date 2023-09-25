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
    },

    getPrinters: (req, res) => {

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

                return res.render('productDetail', {
                    product: producto
                });
            }).catch(function(e){

                return console.log(e)
            })

    },


    createProduct: (req, res) => {

        res.render('createProduct', {
            errors: [],
            values: []
        });

    },

    addProduct: (req, res) => {

        const newProduct = req.body;

        /* let imagenDelProducto = '/images/'+req.file.filename

        req.file? imagenDelProducto : ""; */
        
        const validations = expressValidator.validationResult(req);

        if (validations.errors.length > 0) {

            res.render('createProduct', {

                errors: validations.errors,
                values: req.body
            });

        }

        if(validations.errors.length <= 0){

            db.Producto.create({
    
                ...newProduct,

                imagen: req.file.filename
    
            });
        }else{

            return res.render("createProduct" ,{

                errors: validations.errors,
                values: req.body
            })
        }
        

        if (newProduct.product_type === "phones") {
 
            return res.redirect('/products/productsPhones')

        }else if(newProduct.product_type === "printer"){

            return res.redirect('/products/productsPrinters')
        
        }else if(newProduct.product_type === "printer"){

            return res.redirect('/products/productsInformatica')

        }else if(newProduct.product_type === "accesories"){

            return res.redirect('/products/productsAccesorios');
        }else{

            return res.redirect("/")
        }


       /*  res.redirect('/') */

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

        /* switch (newProduct.product_type) {
 
            case "phones":
                return res.redirect('/productsPhones');
            break;
            case "printer":
                return res.redirect('/productsPrinters');
            break;
            case "accesories":
                return res.redirect('/productsInformatica');
            break;
            case "software":
                return res.redirect('/productsAccesorios');
            break;
        
            default: 
                break;
        } */


    },

    getUpdate: (req, res) => {

        const id = Number(req.params.id);

        db.Producto.findByPk(id)
            .then(function (producto) {

                return res.render('updateProduct', {

                    products: producto,
                    errors: [],
                    values: []
                })
            })

    },

    updateProduct: (req, res) => {

        const id = Number(req.params.id);

        const validations = expressValidator.validationResult(req);

        db.Producto.findOne({

            where:{
                id:id
            }

        }).then(function(producto){
    
            if (validations.errors.length > 0) {
    
                return res.render('updateProduct', {
    
                    errors: validations.errors,
                    values: req.body,
                    products: producto
                });
            }

        }).catch(function(e){

            return console.log(e)
        })

        if(validations.errors.length <= 0){

            db.Producto.update({
    
                product_type:req.body.product_type,
                nombre:req.body.nombre,
                precio:req.body.precio,
                stock:req.body.stock,
                descripcion:req.body.descripcion,

                imagen: req.file.filename
    
            }, {
                where: {
                    id: id
                }
            });
            
        }


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

        console.log(req.params.id)

        const userDataSession = req.session.userLogged;

        db.Carrito.findOne({

            where:{
                usuarios_id : 1
            }

        }).then(function(carrito){

            return carrito
        })

        db.Producto.findByPk(id)
            .then(function (producto) {


                return producto
            })


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
        
        let emailSession 

        // Hay que establecer la condicion de la session por uno u otro tipo de usuarios

        db.Usuario.findOne({

            where:{
                email: emailSession
            }

        }).then(function(usuario){

            let carritoEncontrado = db.Carrito.findAll({
                where: {
                    usuarios_id: usuario.id
                }
            })
                return carritoEncontrado

        })
        .then(function (carrito) {
    
                const cartProduct = carrito;
                const cartAdminProducts = carrito;
    
                return res.render('productcart', {
    
                    cartProducts: cartProduct,
                    cartAdminProducts : cartAdminProducts
                });

            }).catch(function(e){
    
                return console.log(e)
            });
        

    }
}

module.exports = productController;