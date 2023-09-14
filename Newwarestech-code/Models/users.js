const fs = require('fs') 
const path = require('path');
const uuid = require('uuid');

const userModel = {

    //Ruta del archivo JSON
    route: '../data/users.json',

    //Ver base completa, activos e inactivos

    findComplete: function(deleted){
        
        const allUsersJSON = fs.readFileSync(path.join(__dirname, this.route), 'utf-8'); //Leer archivo JSON y tipo de caracteres que se usan 
        
        let users = JSON.parse(allUsersJSON) //Traducir de JSON a JS
        
        users = users.filter(users => (users.deleted === deleted));
        
        const userJSON = JSON.stringify(users); // Convertir de JS a JSON 
        
        return users;
    },

    findAll: function(){

        const allUsersJson = fs.readFileSync(path.join(__dirname, this.route), 'utf-8');

        let users = JSON.parse(allUsersJson);

        return users;

    },
    //Traer un user según su ID
    findByid: function(id){

        let users = this.findComplete(false);

        let searched = users.find(users => users.id === id); 

        if(!searched){ //en caso que no se encuentre el id a buscar
            searched = null;
        }
        return searched;
    },

    findByField: function(field , text){

        let users =this.findComplete(false);

        let userFound = users.find(elemento=> elemento[field]===text);
        return userFound;
    },

    //Editar un user
    updateByid: function(id, newData){

        let users = this.findComplete(false);

        const user = this.findByField('id',id)

        const indice = users.findIndex(userActual => userActual.id === id); //Buscar indice del user
        
        users[indice]={
            ...user,

            nombre : newData.nombre,
            apellido : newData.apellido,
            email : newData.email,
            category : newData.category,
            image : newData.image,
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

        users = users.filter(elemento => elemento.id !== id);
 
        const usersJSON = JSON.stringify(users); // Convertir de JS a JSON

        fs.writeFileSync(path.join(__dirname, this.route), usersJSON);

        return users;
    } 
}

module.exports = userModel;