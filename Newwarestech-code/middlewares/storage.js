
const multer = require('multer');

//Configuración multer inicio
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, './public/images/users')
    },
    filename: (req,file, cb)=>{
        cb(null, 'user-' + Date.now() + '-' + file.originalname);
    } 
});

module.exports = storage;