const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticate } = require('../middleware/authMiddleware');

router.use(authenticate);

router.post('/checkout', orderController.checkout);
router.post('/', orderController.checkout);
router.get('/', orderController.getUserOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id/cancel', orderController.cancelOrder);
router.get('/:id/invoice', orderController.getInvoice);

module.exports = router;
