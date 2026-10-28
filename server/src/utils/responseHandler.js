/**
 * Standardized JSON API responses
 */
const successResponse = (res, data = null, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const paginatedResponse = (res, data, page, limit, total, message = 'Success') => {
  const totalPages = Math.ceil(total / limit) || 1;
  return res.status(200).json({
    success: true,
    message,
    data,
    pagination: {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      total: parseInt(total, 10),
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  });
};

const errorResponse = (res, message = 'Internal Server Error', statusCode = 500, errors = null) => {
  const response = {
    success: false,
    message,
  };
  if (errors) {
    response.errors = errors;
  }
  return res.status(statusCode).json(response);
};

module.exports = {
  successResponse,
  paginatedResponse,
  errorResponse,
};
