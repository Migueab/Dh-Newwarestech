const fs = require('fs') 
const path = require('path');
const uuid = require('uuid');
const { findAll } = require('./product');

const userAdminModel = {

    //Ruta del archivo JSON
    route: '../data/adminUsers.json',

    //Ver base completa, activos e inactivos

    findComplete: function(deleted){
        
        const allUsersJSON = fs.readFileSync(path.join(__dirname, this.route), 'utf-8'); //Leer archivo JSON y tipo de caracteres que se usan 
        
        let users = JSON.parse(allUsersJSON) //Traducir de JSON a JS
        
        users = users.filter(users => (users.deleted === deleted));
        
        const userJSON = JSON.stringify(users); // Convertir de JS a JSON 
        
        return users;
    },

    findAll: function(){

         const allAdminUsersJson = fs.readFileSync(path.join(__dirname, this.route), 'utf-8');

        let adminUsers = JSON.parse(allAdminUsersJson);

        return adminUsers;

    },

    //Traer un user según su ID
    findByid: function(id){

        let users = this.findAll();

        let searched = users.find(elemento => elemento.id === id); 

        if(!searched){ //en caso que no se encuentre el id a buscar
            searched = null;
        }
        return searched;
    },

    findByField: function(field , text){

        let users =this.findAll();

        let userFound = users.find(elemento=> elemento[field]===text);
        return userFound;
    },

    //Editar un user
    updateByid: function(id, newAdminData){

        const users = this.findAll();

        const user = users.find(elemento=> elemento.id === id)

        const indice = users.indexOf(user); //Buscar indice del user
        
        users[indice]={
            
            ...user,
            email: users[indice].email,

            apellido: newAdminData.apellido,
            nombre: newAdminData.nombre
        }

        const usersJSON = JSON.stringify(users); // Convertir de JS a JSON

        fs.writeFileSync(path.join(__dirname, this.route), usersJSON);

        return users;
    },
    
    //Crear un cliente

    createOne: function(newUser){

        const users = this.findComplete(false);

        newUser={
            ...newUser,
            id : users[users.length - 1].id + 1,//creo el nuevo id
            idU : uuid.v4(),
            deleted : false
        }

        users.push(newUser);
        
        const usersJSON = JSON.stringify(users); 

        fs.writeFileSync(path.join(__dirname, this.route), usersJSON);   

        return users; 
    },

    deleteByid: function(id){

        let users = this.findAll();

        users = users.filter(elemento => elemento.id !== id)
        
        const usersJSON = JSON.stringify(users); // Convertir de JS a JSON
        
        fs.writeFileSync(path.join(__dirname, this.route), usersJSON);

        return users;
    } 
}

module.exports = userAdminModel;