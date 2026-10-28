const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);
router.get('/search', productController.getProducts);
router.get('/deals', productController.getDealsOfDay);
router.get('/trending', productController.getTrending);
router.get('/featured', productController.getFeatured);
router.get('/new-arrivals', productController.getNewArrivals);
router.get('/best-sellers', productController.getBestSellers);
router.get('/related/:productId', productController.getRelated);
router.get('/slug/:slug', (req, res, next) => {
  req.params.idOrSlug = req.params.slug;
  return productController.getProductDetails(req, res, next);
});
router.get('/:idOrSlug', productController.getProductDetails);

module.exports = router;
