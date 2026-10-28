const { errorResponse } = require('../utils/responseHandler');

const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return errorResponse(res, 'Authentication required.', 401);
  }

  if (req.user.role !== 'admin') {
    return errorResponse(res, 'Access denied. Administrator privileges required.', 403);
  }

  next();
};

module.exports = {
  requireAdmin,
};
