
module.exports= function(sequelize,dataTypes){

    // El alias es el nombre como queremos llamar a la tabla
    let alias = "Producto";

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
        precio:{
            type:dataTypes.INTEGER
        },
        imagen:{
            type:dataTypes.STRING,
            allowNull: true
        },
        descripcion:{
            type:dataTypes.STRING
        },
        stock:{
            type:dataTypes.INTEGER
        },
        product_type : {
            type: dataTypes.STRING
        }
        // Pregunta, es que en las tablas intermedias hay que incluir foreign Key?
        // usuario_id ??
    }

    let config = {
        tableName : "productos",
        timestamps : true,
        paranoid : true
    }

    let Producto = sequelize.define(alias,cols,config);

   
    Producto.associate = function (models){

        // La relacion associate se hace una vez, dentro de la misma funcion(models)

        // en ese caso usamos belongs to porque un producto pertenece a una categoria

        /* Categorias */
       /*  Producto.belongsTo (models.Categoria,{
            as: "categoria",
            foreignKey : "categoria_id"
        })  */

        /* Producto.belongsToMany (models.Usuario,{
            as: "usuarios",
            through:"producto_usuario",
            foreignKey : "producto_id",
            otherKey : "usuario_id",
            timestamps:false
        })

        Producto.belongsToMany (models.Proveedor,{
            as: "proveedores",
            through:"producto_proveedor",
            foreignKey : "producto_id",
            otherKey : "proveedor_id",
            timestamps:false
        }) 

        Producto.belongsTo (models.Transporte,{
            as: "transporte",
            foreignKey : "producto_id"
        }) 
        
        Producto.belongsToMany(models.Cartproduct,{
            as: "cartproducts",
            through:"cartproduct_producto",
            foreignKey : "producto_id",
            otherKey : "cartproduct_id",
            timestamps:false
        }); */

    }

    return Producto;
}