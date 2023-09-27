const { Producto } = require('../../database/models');
const { Op, Sequelize } = require('sequelize');



module.exports = {
    getAll: async (req, res) => {
        try {
            // Consulta para obtener la cantidad total de productos
            const totalProducts = await Producto.count({
                where: {
                    deletedAt: {
                        [Op.eq]: null
                    }
                }
            });

            // Consulta para obtener la lista de productos
            const products = await Product.findAll({
                raw: true,
                nest: true,
                where: {
                    deletedAt: {
                        [Op.eq]: null
                    }
                },
            });

            // Creo un objeto para almacenar la información final
            const response = {
                totalProducts: totalProducts,
                products: [],
            };

            // Creo un mapa (estructura de clave y valor) para almacenar productos con sus imágenes
            const productMap = new Map();

            products.forEach(product => {
                const productId = product.id;

                // Si el producto aún no está en el mapa, se agrega
                if (!productMap.has(productId)) {
                    productMap.set(productId, {
                        ...product,
                        images: [], // Inicializa un array vacío para las imágenes
                    });
                }

                // recupero cada producto del mapa y le agrego cada imagen dentro del array de imagenes del producto
                const productInMap = productMap.get(productId);
                productInMap.images.push(product.images);
            });

            // convierto el mapa de productos de nuevo a un array
            response.products = Array.from(productMap.values());

            res.json(response);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'No se pudo obtener los productos de nuestra base de datos' });
        }
    },

    getProductDetail: async (req, res) => {
        const id = Number(req.params.id);
        const product = await Producto.findByPk(id, {
            where: {
                deletedAt: {
                    [Op.eq]: null
                },

            }
        });

        res.json(product);
    },
}