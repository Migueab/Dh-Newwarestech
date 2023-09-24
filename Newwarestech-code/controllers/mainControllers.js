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

            }).catch(function (e) {

                console.log(e)
            });

    },

    //Login de administrador
    postAdmin: (req, res) => {

        let emailadministrador = req.body.email;

        // Primer findall es para la validacion
        db.Usuario.findAll({

            where: {
                usuariotipo: "administrador",
                email : emailadministrador
            }
        })
            .then(function (usuario) {

                const usersAdmin = usuario;

                const validation = expressValidator.validationResult(req);
        
                if (validation.errors.length > 0) {
        
                    return res.render('admin', {
        
                        errors: validation.errors,
                        values: req.body,
                        session: req.session.userAdminLogged,
                        usersAdmin: usersAdmin
                    });
        
                };

            }).catch(function (e) {

                return console.log(e);
            });


        db.Usuario.findOne({

            where: {
                usuariotipo: "administrador",
                email: emailadministrador
            }

        }).then(function (usuario) {

            const userAdminInLogin = usuario;

            if (!userAdminInLogin) {
    
                return res.render('admin', {
    
                    errors: [{
                        msg: 'Este email no se encuentra registrado'
                    }],
                    values: req.body,
                    usersAdmin : [],
                    session:[]
                })
            }

        }).catch(function (e) {

            return console.log(e)

        })

        db.Usuario.findOne({

            where: {
                usuariotipo: "administrador",
                email: emailadministrador
            }

        }).then(function (usuario) {

            const userAdminInLogin = usuario;
            const passwordCoincid = bcryptjs.compareSync(req.body.password, userAdminInLogin.password);
        
        if (userAdminInLogin && passwordCoincid) {

                delete userAdminInLogin.password;
                delete userAdminInLogin.id;

                if (req.body.rememberme) {
                    res.cookie('emailAdmin', userAdminInLogin.email, { maxAge: (1000 * 60) * 60 * 24 });
                }

                req.session.userAdminLogged = userAdminInLogin;

                return res.redirect('/admin');
        }
            
    }).catch(function(e){

        return console.log(e)
    })

    db.Usuario.findOne({

        where: {
            usuariotipo: "administrador",
            email: emailadministrador
        }

    }).then(function (usuario) {

        const userAdminInLogin = usuario;
        const passwordCoincid = bcryptjs.compareSync(req.body.password, userAdminInLogin.password);
    
        if (userAdminInLogin && !passwordCoincid){

            return res.render('admin', {
                errors: [{
                    msg: 'Contraseña incorrecta'
                }],
                values: req.body,
                session: [],
                usersAdmin : []
            });
        };

    }).catch(function(e){
        return console.log(e)
    })


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

        // El console log es leido correctamente

        // console.log(req.body.email)

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

        const newUser = {

            ...req.body,
            usuariotipo: "administrador",
            password: bcryptjs.hashSync(req.body.password, 10),
            /*    confirmpassword: bcryptjs.hashSync(req.body.confirmpassword, 10) */
        }

        newUser.imagen = req.file ? '/images/users/' + req.file.filename : '/images/users/user.png';
    

        db.Usuario.create({
            ...newUser
        })

        /* 
                if (newUser) {
        
                    db.Cartproduct.create({
        
                        email: req.body.email,
                        usuariotipo: "administrador",
                     
                    })
        
                } */

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

            return res.render('adminUserProfile', {

                userAdmin: usuario
            });

        })

    },

    // UPDATE del ADMINISTRADOR

    getUserAdminToUpdate: (req, res) => {

        db.Usuario.findOne({
            where: {
                email: req.session.userAdminLogged.email
            }
        }).then(function (usuario) {

            return res.render('updateAdminUsers', {

                userAdmin: usuario

            });
        })

    },

    // PUT del ADMINISTRADOR

    putUserAdminUpdate: (req, res) => {


        let nuevaImagen = "/images/users/" + Date.now() + req.body.imagen

        db.Usuario.update({

            nombre: req.body.nombre,
            apellido: req.body.apellido,
            imagen : nuevaImagen
            
        }, {
            where: {
                email: req.session.userAdminLogged.email
            }
        })

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

        delete req.session.userAdminLogged
        res.clearCookie('emailAdmin');

        res.redirect('/admin');

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