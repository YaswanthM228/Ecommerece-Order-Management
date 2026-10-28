const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/adminMiddleware');
const { validate } = require('../middleware/validator');

router.use(authenticate, requireAdmin);

// Dashboard KPI
router.get('/dashboard', adminController.getDashboardStats);

// Products management
router.get('/products', adminController.getAdminProducts);
router.post(
  '/products',
  [
    body('name').trim().notEmpty().withMessage('Product name is required'),
    body('category_id').isInt().withMessage('Valid category is required'),
    body('price').isFloat({ min: 0.01 }).withMessage('Valid price is required'),
    body('stock_quantity').isInt({ min: 0 }).withMessage('Valid stock quantity is required'),
    validate,
  ],
  adminController.createProduct
);
router.put('/products/:id', adminController.updateProduct);
router.delete('/products/:id', adminController.deleteProduct);
router.put('/products/:id/stock', adminController.updateProductStock);

// Orders management
router.get('/orders', adminController.getAdminOrders);
router.put('/orders/:id/status', adminController.updateOrderStatus);

// Customers management
router.get('/customers', adminController.getCustomers);

// Sales & SQL reports
router.get('/reports/sales', adminController.getSalesReports);

module.exports = router;
