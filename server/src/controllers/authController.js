const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config/env');
const { query, queryOne } = require('../config/db');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRES_IN }
  );
};

// POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingUser = await queryOne('SELECT id FROM users WHERE email = ?', [email.toLowerCase().trim()]);
    if (existingUser) {
      return errorResponse(res, 'An account with this email address already exists.', 409);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const result = await query(
      'INSERT INTO users (name, email, password_hash, role, phone) VALUES (?, ?, ?, ?, ?)',
      [name.trim(), email.toLowerCase().trim(), passwordHash, 'customer', phone || null]
    );

    const userId = result.insertId;

    // Create empty cart and wishlist
    await query('INSERT INTO carts (user_id) VALUES (?)', [userId]);
    await query('INSERT INTO wishlists (user_id) VALUES (?)', [userId]);

    // Send welcome notification
    await query(
      'INSERT INTO notifications (user_id, title, message, type) VALUES (?, ?, ?, ?)',
      [userId, 'Welcome to ShopSphere!', 'Your shopping account is ready. Enjoy curated collections and verified brands.', 'system']
    );

    const user = {
      id: userId,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      role: 'customer',
      phone: phone || null,
      avatar_url: null,
    };

    const token = generateToken(user);

    return successResponse(res, { user, token }, 'Registration successful.', 201);
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await queryOne(
      'SELECT id, name, email, password_hash, role, phone, avatar_url, is_active FROM users WHERE email = ?',
      [email.toLowerCase().trim()]
    );

    if (!user) {
      return errorResponse(res, 'Invalid email or password.', 401);
    }

    if (!user.is_active) {
      return errorResponse(res, 'This account has been deactivated. Please contact customer support.', 403);
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return errorResponse(res, 'Invalid email or password.', 401);
    }

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      avatar_url: user.avatar_url,
    };

    const token = generateToken(userData);

    return successResponse(res, { user: userData, token }, 'Logged in successfully.');
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/me
const getCurrentUser = async (req, res, next) => {
  try {
    return successResponse(res, { user: req.user }, 'Current user profile.');
  } catch (error) {
    next(error);
  }
};

// PUT /api/auth/profile
const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, avatar_url } = req.body;
    const userId = req.user.id;

    await query(
      'UPDATE users SET name = COALESCE(?, name), phone = COALESCE(?, phone), avatar_url = COALESCE(?, avatar_url) WHERE id = ?',
      [name ? name.trim() : null, phone || null, avatar_url || null, userId]
    );

    const updatedUser = await queryOne(
      'SELECT id, name, email, role, phone, avatar_url FROM users WHERE id = ?',
      [userId]
    );

    return successResponse(res, { user: updatedUser }, 'Profile updated successfully.');
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/change-password
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    const user = await queryOne('SELECT password_hash FROM users WHERE id = ?', [userId]);
    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isMatch) {
      return errorResponse(res, 'Current password does not match.', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(newPassword, salt);

    await query('UPDATE users SET password_hash = ? WHERE id = ?', [newHash, userId]);

    return successResponse(res, null, 'Password updated successfully.');
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/forgot-password (Safe demo flow)
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await queryOne('SELECT id FROM users WHERE email = ?', [email.toLowerCase().trim()]);

    if (!user) {
      // Don't disclose user non-existence for security
      return successResponse(res, { demo_mode: true }, 'If an account exists with this email, a reset code has been sent.');
    }

    // Generate secure 6-digit verification code or token
    const token = crypto.randomBytes(20).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await query(
      'INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
      [user.id, token, expiresAt]
    );

    // In demo environment, we safely return token to allow testing the reset flow
    return successResponse(
      res,
      { demo_token: token, expires_in_minutes: 60 },
      'Password reset request processed. Use the provided demo token to complete reset.'
    );
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/reset-password
const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    const resetRecord = await queryOne(
      'SELECT id, user_id FROM password_reset_tokens WHERE token = ? AND is_used = 0 AND expires_at > NOW()',
      [token]
    );

    if (!resetRecord) {
      return errorResponse(res, 'Invalid or expired password reset token.', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(newPassword, salt);

    await query('UPDATE users SET password_hash = ? WHERE id = ?', [newHash, resetRecord.user_id]);
    await query('UPDATE password_reset_tokens SET is_used = 1 WHERE id = ?', [resetRecord.id]);

    return successResponse(res, null, 'Password has been reset successfully. Please log in with your new credentials.');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
};
