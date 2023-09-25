
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
            type:dataTypes.STRING,
            allowNull:false
        },
        apellido:{
            type:dataTypes.STRING,
            allowNull:false
        },
        email:{
            type:dataTypes.STRING,
            allowNull:false,
            unique: true
        },
        password:{
            type:dataTypes.STRING,
            allowNull : false
        },
        telefono:{
            type:dataTypes.STRING,
            allowNull :true
        },
        direccion:{
            type:dataTypes.STRING
        },
        usuariotipo:{
            type:dataTypes.STRING
        },
        imagen:{
            type:dataTypes.STRING
        },
        createdAt:{
            type:dataTypes.DATE,
            allowNull:true
        },
        updatedAt:{
            type:dataTypes.DATE,
            allowNull:true
        },
        deletedAt:{
            type:dataTypes.DATE,
            allowNull:true
        },

    
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

        /*
         Usuario.belongsToMany (models.Producto,{
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
        
        */
        Usuario.belongsToMany (models.Carrito,{
            as: "carritos",
            through:"carrito",
            foreignKey : "usuario_id",
            otherKey : "carrito_id",
            timestamps:true
        }); 
    }

    return Usuario;
}