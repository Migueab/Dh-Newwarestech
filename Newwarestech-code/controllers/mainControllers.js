const express = require('express');
const path = require('path');

const uuid = require('uuid');

const expressValidator = require('express-validator');

const db = require("../database/models");

const bcryptjs = require('bcryptjs');

const controllers = {

    getIndex: (req, res) => {
        res.render('index');
    },

    getAdmin: (req, res) => {

        db.Usuario.findAll({
            where: {
                usuariotipo: "administrador"
            }
        })
            .then(function (usuarios) {

                return res.render('admin', {

                    usersAdmin: usuarios,
                    errors: [],
                    values: [],
                    session: req.session.userAdminLogged
                });

            }).catch( function(e){

                console.log(e)
            });

},

    //Login de administrador
    postAdmin: (req, res) => {

        /* const usersAdmin = userAdminModel.findComplete(false); */

        db.Usuario.findAll({

        where: {
            userType: "adminUser"
        }
    })
    .then(function (usuarios) {

        const usersAdmin = usuarios;

        return usersAdmin;
    })

const validation = expressValidator.validationResult(req);

if (validation.errors.length > 0) {

    return res.render('admin', {
        errors: validation.errors,
        values: req.body,
        usersAdmin: usersAdmin
    });
};

db.Usuario.findOne({

    where: {
        email: req.body.email
    }
}).then(function (usuario) {

    const userAdminInLogin = usuario;

    return userAdminInLogin;
})

if (!userAdminInLogin) {

    return res.render('admin', {
        errors: [{
            msg: 'Este email no se encuentra registrado'
        }],
        values: req.body,
        usersAdmin
    })
}

if (userAdminInLogin) {

    db.Usuario.findOne({
        where: {
            email: req.body.email
        }
    }).then(function (usuario) {

        const passwordCoincid = bcryptjs.compareSync(req.body.password, usuario.password);

        return passwordCoincid;
    })

    if (passwordCoincid) {

        delete userAdminInLogin.password;
        delete userAdminInLogin.id;

        if (req.body.rememberme) {
            res.cookie('emailAdmin', userAdminInLogin.email, { maxAge: (1000 * 60) * 60 * 24 });
        }

        req.session.userAdminLogged = userAdminInLogin;

        return res.redirect('/admin');

    } else {

        return res.render('admin', {
            errors: [{
                msg: 'Contraseña incorrecta'
            }],
            values: req.body,
        });
    };
}
    },

// REGISTRACION del ADMINISTRADOR
getAdminRegister: (req, res) => {
    res.render('adminRegister', {

        errors: [],
        values: []
    });
},

    // REGISTRACION DE UN ADMINISTRADOR POST

    postAdminRegister: (req, res) => {

        const validation = expressValidator.validationResult(req);

        if (validation.errors.length > 0) {

            res.render('adminRegister', {

                errors: validation.errors,
                values: req.body
            });

        }

        const passwordEquality = req.body.password === req.body.confirmpassword;

        if (!passwordEquality) {

            return res.render('register', {
                errors: [{
                    msg: "La contraseña debe coincidir"
                }],
                values: req.body,
            })
        }

        db.Usuario.findOne({
            where: {
                email: req.body.email
            }
        }).then(function (usuario) {

            let usuarioAdminEnBD = usuario;
            
            if (usuarioAdminEnBD) {

                return res.render('register', {

                    errors: [{
                        msg: "El mail ya existe, elija otro"
                    }],
                    values: req.body
                })
            }
        })

        /* const usuarioAdminEnBD = userAdminModel.findByField('email', req.body.email); */


        const newUser = {

            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            confirmpassword: bcryptjs.hashSync(req.body.confirmpassword, 10)

        }

        /* userAdminModel.createOne(newUser); */

        db.Usuario.create({
            ...newUser
        })

        if (newUser) {

            const usuariotipo = "administrador";

            db.Cartproduct.create({

                email: req.body.email,
                usuariotipo: "administrador",
                productId: []
                
            })

            /* cartProductModel.createCartProduct(newUser, userClass); */

        }

        return res.redirect('/admin');

    },

        // Perfil del ADMINISTRADOR

        getAdminUserProfile: (req, res) => {

            const id = Number(req.query.id);

            db.Usuario.findOne({
                where: {
                    id: id
                }
            }).then(function (usuario) {

                const userAdmin = usuario

                return res.render('adminUserProfile', {

                    userAdmin: userAdmin
                });

            })

            /* const userAdmin = userAdminModel.findByField('id', id) */

        },

            // UPDATE del ADMINISTRADOR

            getUserAdminToUpdate: (req, res) => {

                db.Usuario.findOne({
                    where: {
                        email: req.session.userAdminLogged.email
                    }
                }).then(function (usuario) {

                    const userAdmin = usuario;

                    return res.render('updateAdminUsers', {
                        userAdmin: userAdmin
                    });
                })

                /* const userAdmin = userAdminModel.findByField('email', req.cookies.emailAdmin || req.session.userAdminLogged.email) */

            },

                // PUT del ADMINISTRADOR

                putUserAdminUpdate: (req, res) => {

                    /* const userAdmin = userAdminModel.findByField('email', req.cookies.emailAdmin || req.session.userAdminLogged.email) */

                    db.Usuario.update({

                        ...req.body
                    }, {
                        where: {
                            email: req.session.userAdminLogged.email
                        }
                    })

                    /* newData.image = '/images/users/' + req.file.filename; */
                    /* userAdminModel.updateByid(id, newAdminData) */

                    res.redirect('/admin')
                },

                    // Delete del ADMINISTRADOR

                    deleteUserAdmin: (req, res) => {

                        const id = Number(req.params.userAdmin);

                        db.Usuario.destroy({
                            where: {
                                id: id
                            }
                        })

                        /* userAdminModel.deleteByid(id); */
                        /*    users = userAdminModel.findComplete(false)*/

                        delete req.session.userAdminLogged
                        res.clearCookie('emailAdmin');

                        res.redirect('/admin');

                    },

                        getAdminCart: (req, res) => {

                            const userEmailSession = req.session.userAdminLogged.email;

                            db.Cartproduct.findOne({
                                where: {
                                    email: userEmailSession
                                }
                            }).then(function (cartproduct) {

                                cartAdminProducts = cartproduct;

                                if (!cartAdminProducts) {

                                    return cartAdminProducts = []
                                }

                                return res.render('productcart', {

                                    cartAdminProducts: cartAdminProducts

                                })
                            })

                            /* let cartAdminProducts = cartProductModel.checkCart(userEmailSession); */

                        },

                            addAdminCart: (req, res) => {

                                res.send(console.log('hola id: ' + products.id));

                            },

                                getAdminaddToCart: (req, res) => {

                                    const id = Number(req.params.id);

                                    /* let products1 = productModel.findByid(id) */

                                    db.Producto.findOne({
                                        where: {
                                            id: id
                                        }
                                    }).then(function (porducto) {

                                        const producto = producto;

                                        return producto;
                                    })

                                    // Hay que preguntar a la carta de producto
                                    // Carta de producto, donde email
                                    // Esta el producto que quiere agregar?
                                    // Como es un array se le puede preguntar includes if true
                                    // Si no esta lo suma con update en productId . push
                                    // Si esta ya lo tiene

                                    db.Cartproduct.findOne({

                                        where: {
                                            email: req.session.userAdminLogged.email
                                        }
                                    }).then(function (cartadeproducto) {

                                        const cartproduct = cartadeproducto;

                                        return cartproduct;
                                    })

                                    if (cartproduct.productId.includes(producto) === false) {

                                        db.Cartproduct.update({

                                            productId: productId.push(producto)
                                        }, {
                                            where: {
                                                email: req.session.userAdminLogged.email
                                            }
                                        })
                                    } else {

                                        return res.redirect('/productAdminCart')
                                    }


                                    return res.redirect('/productAdminCart')

                                    // Pasar el email a cartManager
                                    /*   cartProductModel.cartManager(products1, userDataSession) */

                                },

                                    getAdminRemoveFromCart: (req, res) => {

                                        const id = Number(req.params.id);

                                        const userDataSession = req.session.userAdminLogged;

                                        db.Cartproduct.destroy({

                                            productId: id
                                        }, {
                                            where: {
                                                email: userDataSession.email
                                            }
                                        }).then(function (cartadeproducto) {

                                            const cartAdminProducts = cartadeproducto;

                                            return res.render('productcart', {

                                                cartAdminProducts: [cartAdminProducts]

                                            })

                                        })

                                        /* const cartAdminProducts = cartProductModel.removeFromCart(id, userDataSession); */

                                    },

                                        getAdmincleanCart: (req, res) => {

                                            const userDataSession = req.session.userAdminLogged;

                                            db.Cartproduct.destroy({
                                                productId
                                            }, {
                                                where: {
                                                    email: userDataSession.email
                                                }
                                            }).then(function (cartadeproducto) {

                                                const cartAdminProducts = cartadeproducto;

                                                return res.render('productcart', {

                                                    cartAdminProducts
                                                });
                                            })

                                            /* const cartAdminProducts = cartProductModel.cleanCart(userDataSession); */

                                        },

                                            amdminLogOut: (req, res) => {

                                                res.clearCookie('emailAdmin');
                                                res.clearCookie('emailUser');
                                                res.clearCookie();
                                                req.session.destroy();
                                                return res.redirect('/admin');

                                            }

}

module.exports = controllers;