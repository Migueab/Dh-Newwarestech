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

            return console.log(e)
        });



        let newUser = {

            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            usuariotipo: "cliente",
        }

        newUser.imagen ? '/images/' + req.file.filename :'/images/users/user.png';


        db.Usuario.create({
            ...newUser
        })


        if(newUser){

            db.Usuario.findOne({
                where:{
                    email:newUser.email
                }
            }).then(function(nuevousuario){

                
                return db.Carrito.create(

                    usuarios_id = nuevousuario.id
                );

            }).catch(function(e){
                return console.log(e)
            })
        }

        return res.redirect('/');

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

        db.Usuario.findOne({
            where: {
                usuariotipo:"cliente",
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

            return console.log(e)
        });

        db.Usuario.findOne({

            where: {
                usuariotipo:"cliente",
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

                    return res.redirect('/');

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

            return console.log(e)
        })

    },

    getUserProfile: (req, res) => {

        const userDataSession = req.session.userLogged;

        console.log(userDataSession)

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

        console.log(id)

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
            return console.log(e)
        });

    },

    userUpdate: (req, res) => {

        const id = Number(req.params.user);

        newData = req.body;

        db.Usuario.update({

            nombre: req.body.nombre,
            apellido:req.body.apellido,
            telefono: req.body.telefono,
            direccion: req.body.direccion,
            imagen: req.body.imagen
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