const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');
const { validate } = require('../middleware/validator');

// Register validation rules
const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2, max: 100 }),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('phone').optional().isMobilePhone('any').withMessage('Valid phone number required'),
  validate,
];

// Login validation rules
const loginValidation = [
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
  validate,
];

// Password reset validation rules
const resetValidation = [
  body('token').notEmpty().withMessage('Reset token is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  validate,
];

router.post('/register', authLimiter, registerValidation, authController.register);
router.post('/login', authLimiter, loginValidation, authController.login);
router.get('/me', authenticate, authController.getCurrentUser);
router.put('/profile', authenticate, authController.updateProfile);
router.post('/change-password', authenticate, authController.changePassword);
router.post('/forgot-password', authLimiter, authController.forgotPassword);
router.post('/reset-password', authLimiter, resetValidation, authController.resetPassword);

module.exports = router;
