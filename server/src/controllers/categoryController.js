const { query, queryOne } = require('../config/db');
const { successResponse, errorResponse } = require('../utils/responseHandler');

// GET /api/categories
const getCategories = async (req, res, next) => {
  try {
    const categories = await query(`
      SELECT 
        c.id, c.name, c.slug, c.description, c.image_url, c.display_order,
        COUNT(p.id) AS product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.is_active = 1
      WHERE c.is_active = 1
      GROUP BY c.id, c.name, c.slug, c.description, c.image_url, c.display_order
      ORDER BY c.display_order ASC, c.name ASC
    `);

    return successResponse(res, categories, 'Categories retrieved successfully.');
  } catch (error) {
    next(error);
  }
};

// GET /api/categories/:slug
const getCategoryBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const category = await queryOne(`
      SELECT 
        c.id, c.name, c.slug, c.description, c.image_url,
        COUNT(p.id) AS product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.is_active = 1
      WHERE c.slug = ? AND c.is_active = 1
      GROUP BY c.id, c.name, c.slug, c.description, c.image_url
    `, [slug]);

    if (!category) {
      return errorResponse(res, 'Category not found.', 404);
    }

    return successResponse(res, category, 'Category details.');
  } catch (error) {
    next(error);
  }
};

// GET /api/categories/:slug/products
const getCategoryProducts = async (req, res, next) => {
  const productController = require('./productController');
  req.query.category = req.params.slug;
  return productController.getProducts(req, res, next);
};

module.exports = {
  getCategories,
  getCategoryBySlug,
  getCategoryProducts,
};
