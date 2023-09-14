module.exports= function(sequelize,dataTypes){

    // El alias es el nombre como queremos llamar a la tabla
    let alias = "Cartproduct";

    let cols = {
        // minimo en estas columnas es type
        id :{
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        // Deberia ser un email. 
        // Tipo de usuario: cliente o administrador
        // Array de ID de productos seleccionados. figuraran en el Cartporduct
        productos_carrito_id:{
            type:dataTypes.INTEGER
        },
        usuarios_carrito_id:{
            type:dataTypes.INTEGER
        },
        bancos_carrito_id:{
            type:dataTypes.INTEGER
        }
        
    }

    let config = {
        tableName : "carrito",
        timestamps : false,
        paranoid : true
    }

    let Cartproduct = sequelize.define(alias,cols,config);

    Cartproduct.associate = function (models){
        // has many quiere decir que categoria tiene muchos productos 

        // en models se usa Producto, porque asi usamos en el alias ("as")
        // el as de esta tabla es como se llama la asociacion
        
        /* Cartproduct.belongsToMany (models.Usuario,{
            as: "usuarios",
            through:"cartproduct_usuario",
            foreignKey : "cartproduct_id",
            otherKey : "usuario_id",
            timestamps:false
        });
        
        Cartproduct.belongsToMany(models.Producto,{
            as: "productos",
            through:"cartproduct_producto",
            foreignKey : "cartproduct_id",
            otherKey : "producto_id",
            timestamps:false
        });

        Cartproduct.belongsToMany(models.Banco,{
            as: "bancos",
            through:"banco_producto",
            foreignKey : "cartproduct_id",
            otherKey : "banco_id",
            timestamps:false
        }); */


    };



    return Cartproduct;
};