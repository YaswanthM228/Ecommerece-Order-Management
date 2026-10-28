const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticate } = require('../middleware/authMiddleware');

router.use(authenticate);

router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
router.put('/items/:id', cartController.updateQuantity);
router.delete('/items/:id', cartController.removeFromCart);
router.delete('/clear', cartController.clearCart);

module.exports = router;
