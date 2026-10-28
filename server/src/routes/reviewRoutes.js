const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/product/:productId', reviewController.getProductReviews);
router.post('/', authenticate, reviewController.addReview);

module.exports = router;
