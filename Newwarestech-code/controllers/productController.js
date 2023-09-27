const { log, count } = require('console');
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
            }).catch(function (e) {

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

        if (validations.errors.length <= 0) {

            db.Producto.create({

                ...newProduct,

                imagen: "/images/" +req.file.filename

            });
        } else {

            return res.render("createProduct", {

                errors: validations.errors,
                values: req.body
            })
        }


        if (newProduct.product_type === "phones") {

            return res.redirect('/products/productsPhones')

        } else if (newProduct.product_type === "printer") {

            return res.redirect('/products/productsPrinters')

        } else if (newProduct.product_type === "printer") {

            return res.redirect('/products/productsInformatica')

        } else if (newProduct.product_type === "accesories") {

            return res.redirect('/products/productsAccesorios');
        } else {

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
        
        db.Producto.findOne({
            
            where: {
                id: id
            }
            
        }).then(function (producto) {
            
            const validations = expressValidator.validationResult(req);

            if (validations.errors.length > 0) {

                return res.render('updateProduct', {

                    errors: validations.errors,
                    values: req.body,
                    products: producto
                });
            }

        }).catch(function (e) {

            return console.log(e)
        })

            db.Producto.update({

                product_type: req.body.product_type,
                nombre: req.body.nombre,
                precio: req.body.precio,
                stock: req.body.stock,
                descripcion: req.body.descripcion,

                imagen: "/images/"+ req.file.filename

            }, {
                where: {
                    id: id
                }
            });


        return res.redirect('/products/' + id + '/productDetail');
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

            where: {
                usuarios_id: 1
            }

        }).then(function (carrito) {

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

            where: {
                email: emailSession
            }

        }).then(function (usuario) {

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
                    cartAdminProducts: cartAdminProducts
                });

            }).catch(function (e) {

                return console.log(e)
            });

    },

    getApiProducts: (req, res) => {

        db.Producto.findAll()

            .then(productos => {

                /* usuarios.map(elemento=> elemento.dataValues.detail = detailUser ); */

                /* usuarios.forEach(elemento=>elemento.dataValues.detail += elemento.dataValues.id); */

                let countByCategory

                let software = 0
                let printer = 0
                let phones = 0
                let accesories = 0

                productos.filter((elemento) => {

                    if (elemento.dataValues.product_type === "software") {

                        software++

                        return software
                    }
                    if (elemento.dataValues.product_type === "printer") {

                        printer++

                        return printer
                    }
                    if (elemento.dataValues.product_type === "accesories") {

                        accesories++

                        return accesories
                    }
                    if (elemento.dataValues.product_type === "phones") {

                        phones++

                        return phones
                    }

                    /* printer : elemento.dataValues.nombre ==="printer",
                    phones : elemento.dataValues.apellido === "phones",
                    accesories : elemento.dataValues.email=== "accesories", */

                });

                countByCategory = {

                    software: software,
                    printer: printer,
                    phones: phones,
                    accesories: accesories
                }

                let detailUser = "http://localhost:3005/products/api/products/"

                const detail = "detail"

                productos.map(elemento => elemento.dataValues.detail = detailUser);

                productos.forEach(elemento => elemento.dataValues.detail += elemento.dataValues.id);



                productos.filter((elemento) => {

                    elemento.dataValues = {

                        id: elemento.dataValues.id,
                        nombre: elemento.dataValues.nombre,
                        descripcion: elemento.dataValues.descripcion,

                        detail: elemento.dataValues.detail
                    }

                });

                console.log(productos)

                return res.status(200).json({

                    count: productos.length,
                    countByCategory: countByCategory,
                    data: productos,
                    url: "http://localhost:3005/products/api/products/",

                    status: 200
                })
            })
    },

    getApiProductDetail: (req, res) => {

        db.Producto.findByPk( req.params.id)
        .then( producto =>{

           let productoDB = {

                id: producto.id,
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                imagen : producto.imagen
           }

          /*  let imagenUsuario = usuario.imagen */

            return res.status(200).json({

                data : productoDB,
                status : 200


            })
        })




    }

}

module.exports = productController;