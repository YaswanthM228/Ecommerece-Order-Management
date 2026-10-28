const jwt = require('jsonwebtoken');
const config = require('../config/env');
const { queryOne } = require('../config/db');
const { errorResponse } = require('../utils/responseHandler');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'Authentication required. No token provided.', 401);
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return errorResponse(res, 'Authentication required. Malformed token.', 401);
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await queryOne(
      'SELECT id, name, email, role, phone, avatar_url, is_active FROM users WHERE id = ?',
      [decoded.userId || decoded.id]
    );

    if (!user || !user.is_active) {
      return errorResponse(res, 'Account not found or deactivated.', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return errorResponse(res, 'Session has expired. Please sign in again.', 401);
    }
    return errorResponse(res, 'Invalid authentication token.', 401);
  }
};

const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      if (token) {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        const user = await queryOne(
          'SELECT id, name, email, role, phone, avatar_url, is_active FROM users WHERE id = ?',
          [decoded.userId || decoded.id]
        );
        if (user && user.is_active) {
          req.user = user;
        }
      }
    }
    next();
  } catch (error) {
    // For optional auth, continue as unauthenticated guest
    next();
  }
};

module.exports = {
  authenticate,
  optionalAuth,
};
