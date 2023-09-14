
module.exports= function(sequelize,dataTypes){

    // El alias es el nombre como queremos llamar a la tabla
    let alias = "Proveedor";

    let cols = {
        // minimo en estas columnas es type
        id :{
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        razonsocial:{
            type:dataTypes.STRING
        },
        direccion:{
            type:dataTypes.STRING
        },
        cuit:{
            type:dataTypes.INTEGER,
            unique: true
        },
        telefono:{
            type:dataTypes.INTEGER,
            unique:true
        }
    
    }

    let config = {
        tableName : "proveedores",
        timestamps : false,
        paranoid : true
    }

    let Proveedor = sequelize.define(alias,cols,config);


    Proveedor.associate = function (models){

        // belongsToMany es porque hay una relacion de muchos a muchos
        // esto genera una tabla intermedia, (de amgos lados o asociaciones)

       /*  Proveedor.belongsToMany (models.Producto,{
            as: "productos",
            through:"producto_proveedor",
            foreignKey : "proveedor_id",
            otherKey : "producto_id",
            timestamps:false
        }) 

        Proveedor.belongsToMany (models.Banco,{
            as: "bancos",
            through:"banco_proveedor",
            foreignKey : "proveedor_id",
            otherKey : "banco_id",
            timestamps:false
        }) 
        Proveedor.belongsTo (models.Transporte,{
            as: "transporte",
            foreignKey : "proveedor_id"
        })  */
    }

    return Proveedor;
}