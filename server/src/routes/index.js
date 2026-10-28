const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');
const cartRoutes = require('./cartRoutes');
const wishlistRoutes = require('./wishlistRoutes');
const addressRoutes = require('./addressRoutes');
const couponRoutes = require('./couponRoutes');
const orderRoutes = require('./orderRoutes');
const notificationRoutes = require('./notificationRoutes');
const reviewRoutes = require('./reviewRoutes');
const adminRoutes = require('./adminRoutes');

// API Health Check
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'ShopSphere API',
    version: '1.0.0',
  });
});

// Mount modular sub-routers
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/cart', cartRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/addresses', addressRoutes);
router.use('/coupons', couponRoutes);
router.use('/orders', orderRoutes);
router.use('/notifications', notificationRoutes);
router.use('/reviews', reviewRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
