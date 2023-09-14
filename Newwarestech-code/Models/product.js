const fs = require('fs')
const path = require('path');

const productModel = {
    //Ruta del archivo JSON
    route: '../data/products.json',
    route2: '../data/cartProducts.json',

    //***Para poder utilizar el this, las funciones no pueden sen arrow function =>()***    

    //Ver base completa, activos e inactivos

    findComplete: function () {

        const allProductsJSON = fs.readFileSync(path.join(__dirname, this.route), 'utf-8'); //Leer archivo JSON y tipo de caracteres que se usan 

        let products = JSON.parse(allProductsJSON) //Traducir de JSON a JS

        const productsJSON = JSON.stringify(products); // Convertir de JS a JSON 

        return products;
    },

    //Traer todos los productos activos (deleted = false)
    findAll: function (deleted) {

        const allProductsJSON = fs.readFileSync(path.join(__dirname, this.route), 'utf-8'); //Leer archivo JSON y tipo de caracteres que se usan 

        let products = JSON.parse(allProductsJSON) //Traducir de JSON a JS

        products = products.filter(product => (product.deleted === deleted));

        const productsJSON = JSON.stringify(products); // Convertir de JS a JSON 

        return products;
    },

    //Traer un producto según su ID
    findByid: function (id) {

        let products = this.findAll(false);

        products = products.find(products => products.id === id);

        if (!products) { //en caso que no se encuentre el id a buscar
            products = null;
        }
        return products;
    },

    //Traer un producto según su categoria
    findByProduct_type: function (product_type, deleted) {

        let products = this.findAll(deleted);

        products = products.filter(product => (product.product_type === product_type));

        //muestra solo los productos con la propiedad deleted: false

        products = products.filter(product => (product.deleted === deleted));

        const productsJSON = JSON.stringify(products); // Convertir de JS a JSON    

        return products;
    },

    //Eliminar un producto (softdelete)
    deleteByid: function (id) {

        let products = this.findComplete();

        const indice = products.findIndex(productoActual => productoActual.id === id); //Buscar indice del producto

        products[indice].deleted = true;

        const productsJSON = JSON.stringify(products); // Convertir de JS a JSON

        fs.writeFileSync(path.join(__dirname, this.route), productsJSON);

        return products;
    },

    //Editar un producto
    updateByid: function (id, newData) {

        let products = this.findComplete();

        const product = this.findByid(id);

        const indice = products.findIndex(elemento => elemento.id === id); //Buscar indice del producto

        products[indice]={
            
            ...product,
            image :newData.image,
            name : newData.name,
            price : newData.price,
            product_type : newData.product_type,
            
        }

        const productsJSON = JSON.stringify(products); // Convertir de JS a JSON

        fs.writeFileSync(path.join(__dirname, this.route), productsJSON);

        return products;
    },

    //Crear un producto
    createOne: function (newProduct) {

        let products = this.findComplete();

        newProduct.id = products[products.length - 1].id + 1;//creo el nuevo id
        newProduct.deleted = false;

        products.push(newProduct);

        const productsJSON = JSON.stringify(products);

        fs.writeFileSync(path.join(__dirname, this.route), productsJSON);

        return products;

    },

    //Agregar products al carro de compras

    cartManager: function (data) {

        let productsJSON = fs.readFileSync(path.join(__dirname, this.route2), 'utf-8');

        let cartProducts = JSON.parse(productsJSON);

        /* let cartProductsJSON = JSON.stringify(cartProducts); */

        cartProducts.push(data);

        productsJSON = JSON.stringify(cartProducts);

        fs.writeFileSync(path.join(__dirname, this.route2), productsJSON);

        return cartProducts;
    },
    checkCart: function () {

        let productsJSON = fs.readFileSync(path.join(__dirname, this.route2), 'utf-8');

        let cartProducts = JSON.parse(productsJSON);

        let cartProductsJSON = JSON.stringify(cartProducts);
        
        return cartProducts;
    },
    //Vaciar carro de compras

    clean: function (data) {

        cartProducts = data;

        const productsJSON = JSON.stringify(cartProducts); // Convertir de JS a JSON

        fs.writeFileSync(path.join(__dirname, this.route2), productsJSON);

        return cartProducts;
    }
}
module.exports = productModel;