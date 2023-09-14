
module.exports= function(sequelize,dataTypes){

    // El alias es el nombre como queremos llamar a la tabla
    let alias = "Usuario";

    let cols = {
        // minimo en estas columnas es type
        id :{
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        nombre:{
            type:dataTypes.STRING
        },
        apellido:{
            type:dataTypes.STRING
        },
        email:{
            type:dataTypes.STRING,
            allowNull:false,
            unique: true
        },
        password:{
            type:dataTypes.STRING
        },
        telefono:{
            type:dataTypes.INTEGER
        },
        direccion:{
            type:dataTypes.STRING
        },
        usuariotipo:{
            type:dataTypes.STRING
        }
    
    }

    let config = {
        tableName : "usuarios",
        timestamps : true,
        paranoid : true
    }

    let Usuario = sequelize.define(alias,cols,config);


    Usuario.associate = function (models){

        // belongsToMany es porque hay una relacion de muchos a muchos
        // esto genera una tabla intermedia, (de amgos lados o asociaciones)

       /*  Usuario.belongsToMany (models.Producto,{
            as: "productos",
            through:"producto_usuario",
            foreignKey : "usuario_id",
            otherKey : "producto_id",
            timestamps:false
        }) 
        Usuario.belongsToMany (models.Banco,{
            as: "bancos",
            through:"banco_usuario",
            foreignKey : "usuario_id",
            otherKey : "banco_id",
            timestamps:false
        }) 
        Usuario.belongsTo (models.Transporte,{
            as: "transporte",
            foreignKey : "usuario_id"
        }) 
        Usuario.belongsToMany (models.Cartproduct,{
            as: "cartproducts",
            through:"cartproduct_usuario",
            foreignKey : "usuario_id",
            otherKey : "cartproduct_id",
            timestamps:false
        }); */
    }

    return Usuario;
}