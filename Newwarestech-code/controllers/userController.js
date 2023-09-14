const express = require('express');

const expressValidator = require('express-validator');

const bcryptjs = require('bcryptjs');
const session = require('express-session');

const db = require("../database/models");

const userController = {

    getRegister: (req, res) => {

        res.render('register', {

            errors: [],
            values: []
        });
    },

    postRegister: (req, res) => {

        const validation = expressValidator.validationResult(req);

        if (validation.errors.length > 0) {

            return res.render('register', {

                errors: validation.errors,
                values: req.body

            })

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

        /* const usuarioEnBD = userModel.findByField('email',req.body.email); */

        db.Usuario.findOne({
            where: {
                email: req.body.email
            }
        }).then(function (usuario) {

            const usuarioEnBD = usuario;

            if (usuarioEnBD) {

                return res.render('register', {
                    errors: [{
                        msg: "El mail ya existe, elija otro"
                    }],
                    values: req.body
                })
            }

        }).catch(function (e) {

            return console.log("El usuario no se ha encontrado")
        });

        const newUser = {

            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            confirmpassword: bcryptjs.hashSync(req.body.confirmpassword, 10),
            usuariotipo: "cliente"
        }

        db.Usuario.create({
            ...newUser
        })

        /* newUser.image = req.file ? newUser.image = '/images/users/' + req.file.filename : newUser.image = '/images/users/user.png'; */
        /* userModel.createOne(newUser); */

        /* if(newUser){
                const userClass = "ClientUser"
                cartProductModel.createCartProduct(newUser,userClass)
            } */

        return res.redirect('/users/login');

    },
    getLogin: (req, res) => {
        res.render('login', {
            errors: [],
            values: []
        });
    },

    postLogin: (req, res) => {

        const validation = expressValidator.validationResult(req);

        if (validation.errors.length > 0) {

            return res.render('login', {
                errors: validation.errors,
                values: req.body
            })
        }

        /* const userInLogin = userModel.findByField('email',req.body.email); */

        db.Usuario.findOne({
            where: {
                email: req.body.email
            }
        }).then(function (usuario) {

            const userInLogin = usuario;

            if (!userInLogin) {

                return res.render('login', {
                    errors: [{
                        msg: 'Este email no se encuentra registrado'
                    }],
                    values: req.body
                })
            }

        }).catch(function (e) {

            return console.log("El usuario en login no se encuentra")
        });

        db.Usuario.findOne({

            where: {
                email: req.body.email
            }
            
        }).then(function (usuario) {

            const userInLogin = usuario;

            if (userInLogin) {

                const passwordCoincid = bcryptjs.compareSync(req.body.password, userInLogin.password);

                if (passwordCoincid) {

                    delete userInLogin.password;
                    delete userInLogin.id;

                    if (req.body.rememberme) {
                        res.cookie('emailUser', userInLogin.email, { maxAge: (1000 * 60) * 60 * 24 });
                    }

                    req.session.userLogged = userInLogin;

                    return res.redirect('/products/productCart');

                } else {

                    return res.render('login', {
                        errors: [{
                            msg: 'Contraseña incorrecta'
                        }],
                        values: req.body
                    });
                }
            }
        });

    },

    getuserList: (req, res) => {

        /* const users = userModel.findComplete(false) */

        db.Usuario.findAll({
            where:{
                usuariotipo:"cliente"
            }
        })
        .then(function(usuarios){

            const users = usuarios;
            
            return res.render('userList', { users });

        }).catch(function(e){

            return console.log("Los usuarios no fueron encontrados")
        })

    },

    getUserProfile: (req, res) => {

        /* const user = userModel.findByField('email', req.session.userLogged.email) */
        const userDataSession = req.session.userLogged;

        db.Usuario.findOne({
            where:{
                email: userDataSession.email
            }
        }).then(function(usuario){

            const user = usuario;

            return res.render('userProfile', {
            user: user,

        });

        }).catch(function(e){

            return console.log("No se encontro la informacion del usuario")
        })
        
    },

    getuserToUpdate: (req, res) => {

        const id = Number(req.params.user);

        /* const users = userModel.findByid(id) */

        db.Usuario.findOne({
            where:{
                id:id
            }
        }).then(function(usuario){

            const users = usuario;

            return res.render('updateUser', {
                users: users
            })
        }).catch(function(e){
            return console.log("La informacion del usuario no se encontro")
        });

    },

    userUpdate: (req, res) => {

        const id = Number(req.params.user);

        newData = req.body;

        db.Usuario.update({

            ...newData
        },{
            where:{
                id:id
            }
        })

        /* newData.image = req.file ? newData.image = '/images/users/' + req.file.filename : newData.image = '/images/users/user.png'; */
        /* userModel.updateByid(id, newData) */

        res.redirect('/users/userprofile')
    },

    deleteUser: (req, res) => {

        const id = Number(req.params.user);

        /* userModel.deleteByid(id); */

        db.Usuario.destroy({
            where:{
                id:id
            }
        });

        delete req.session.userLogged;
        res.clearCookie('emailUser');
        res.clearCookie();

        res.redirect('/');

    },

    getLogout: (req, res) => {

        res.clearCookie('emailUser');
        res.clearCookie('emailAdmin');
        res.clearCookie();
        req.session.destroy();
        return res.redirect('/');
    },
}

module.exports = userController;