const express = require('express');
const apiProductsRoutes = express.Router();
const apiController = require('../../controllers/api/productsController');

// @GET  /api/products
apiProductsRoutes.get('/', apiController.getAll)

// @GET /api/products/detail/:id
apiProductsRoutes.get('/:id/detail', apiController.getProductDetail);

module.exports = apiProductsRoutes;