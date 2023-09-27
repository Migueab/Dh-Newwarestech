const { Usuario } = require('../../database/models');
const { Op } = require('sequelize');

const userController = {

    getAll: async (req, res) => {
        const users = await Usuario.findAll({
            raw: true,
            nest: true,
        });

        const usersJSON = users.map(user => ({
            id: user.id,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            profile_picture: user.images,
            detail: `http://localhost:3005/api/users/${user.id}`
        }));
    
        res.json({users: usersJSON});

    },

    getProfile: async (req, res) => {
        const id = req.params.id;
        const user = await Usuario.findByPk(id);

        const userJSON = user.toJSON(user);

        delete userJSON.password;

        res.json({user: userJSON});

    },

};


module.exports = userController;