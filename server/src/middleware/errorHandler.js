const { errorResponse } = require('../utils/responseHandler');

const errorHandler = (err, req, res, next) => {
  console.error('[Error Middleware]:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    url: req.originalUrl,
    method: req.method,
  });

  // Handle specific MySQL errors
  if (err.code === 'ER_DUP_ENTRY') {
    return errorResponse(res, 'A record with this information already exists.', 409);
  }
  if (err.code === 'ER_NO_REFERENCED_ROW_2') {
    return errorResponse(res, 'Invalid foreign key reference or associated entity not found.', 400);
  }
  if (err.code === 'ER_ROW_IS_REFERENCED_2') {
    return errorResponse(res, 'Cannot delete or alter this record because related data exists.', 409);
  }
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return errorResponse(res, 'Invalid or expired authentication token. Please sign in again.', 401);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'An unexpected server error occurred.';
  return errorResponse(res, message, statusCode, err.errors || null);
};

module.exports = errorHandler;
