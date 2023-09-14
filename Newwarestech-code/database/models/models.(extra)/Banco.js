
module.exports= function(sequelize,dataTypes){

    // El alias es el nombre como queremos llamar a la tabla
    let alias = "Banco";

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
        numerodecuenta:{
            type:dataTypes.INTEGER
        },
        fechaexpiracion:{
            type:dataTypes.DATE
        },
        titular:{
            type:dataTypes.STRING
        }

        // Esstos dos tienen tablas pivot, hay que incluirlos?

   /*      proveedor_id : {
            type:dataTypes.INTEGER
        },
        usuario_id : {
            type:dataTypes.INTEGER
        } */
    
    }

    let config = {
        tableName : "bancos",
        timestamps : false,
        paranoid : true
        // soft delete, buscar en sequelize
    }

    let Banco = sequelize.define(alias,cols,config);


    Banco.associate = function (models){

        // belongsToMany es porque hay una relacion de muchos a muchos
        // esto genera una tabla intermedia, (de amgos lados o asociaciones)

       /*  Banco.belongsToMany (models.Usuario,{
            as: "usuarios",
            through:"banco_usuario",
            foreignKey : "banco_id",
            otherKey : "usuario_id",
            timestamps:false
        }) 
        Banco.belongsToMany (models.Proveedor,{
            as: "proveedores",
            through:"banco_proveedor",
            foreignKey : "banco_id",
            otherKey : "proveedor_id",
            timestamps:false
        }) 
        Banco.belongsToMany(models.Cartproduct,{
            as: "cartporducts",
            through:"banco_producto",
            foreignKey : "banco_id",
            otherKey : "cartproduct_id",
            timestamps:false
        }); */
    }

    return Banco;
}