const { query, queryOne } = require('../config/db');
const { successResponse, paginatedResponse, errorResponse } = require('../utils/responseHandler');

// GET /api/products
const getProducts = async (req, res, next) => {
  try {
    const {
      q,
      category,
      category_id,
      brand,
      min_price,
      max_price,
      rating,
      in_stock,
      sort = 'popularity',
      page = 1,
      limit = 12,
    } = req.query;

    const offset = (Math.max(1, parseInt(page, 10)) - 1) * parseInt(limit, 10);
    const conditions = ['p.is_active = 1'];
    const params = [];

    // Search query on name, brand, description
    if (q && q.trim()) {
      conditions.push('(p.name LIKE ? OR p.brand LIKE ? OR p.description LIKE ?)');
      const searchParam = `%${q.trim()}%`;
      params.push(searchParam, searchParam, searchParam);
    }

    // Category filter by slug or ID
    if (category && category !== 'all') {
      conditions.push('c.slug = ?');
      params.push(category);
    } else if (category_id) {
      conditions.push('p.category_id = ?');
      params.push(category_id);
    }

    // Brand filter
    if (brand && brand !== 'all') {
      conditions.push('p.brand = ?');
      params.push(brand);
    }

    // Price range
    if (min_price) {
      conditions.push('p.price >= ?');
      params.push(parseFloat(min_price));
    }
    if (max_price) {
      conditions.push('p.price <= ?');
      params.push(parseFloat(max_price));
    }

    // Minimum rating
    if (rating) {
      conditions.push('p.rating >= ?');
      params.push(parseFloat(rating));
    }

    // In stock only
    if (in_stock === 'true' || in_stock === '1') {
      conditions.push('p.stock_quantity > 0');
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    // Sorting
    let orderByClause = 'ORDER BY p.review_count DESC, p.rating DESC';
    switch (sort) {
      case 'price_asc':
        orderByClause = 'ORDER BY p.price ASC';
        break;
      case 'price_desc':
        orderByClause = 'ORDER BY p.price DESC';
        break;
      case 'rating':
        orderByClause = 'ORDER BY p.rating DESC, p.review_count DESC';
        break;
      case 'newest':
        orderByClause = 'ORDER BY p.created_at DESC';
        break;
      case 'popularity':
      default:
        orderByClause = 'ORDER BY p.review_count DESC, p.rating DESC';
        break;
    }

    // Count query
    const countSql = `
      SELECT COUNT(DISTINCT p.id) AS total
      FROM products p
      JOIN categories c ON p.category_id = c.id
      ${whereClause}
    `;
    const countResult = await queryOne(countSql, params);
    const total = countResult ? countResult.total : 0;

    // Items query with primary image
    const dataSql = `
      SELECT 
        p.id, p.category_id, p.name, p.slug, p.brand, p.sku,
        p.short_description, p.price, p.original_price, p.discount_percent,
        p.stock_quantity, p.rating, p.review_count, p.is_featured,
        p.is_trending, p.is_deal_of_day, p.deal_end_time,
        c.name AS category_name, c.slug AS category_slug,
        COALESCE(
          (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1),
          (SELECT image_url FROM product_images WHERE product_id = p.id LIMIT 1),
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
        ) AS primary_image
      FROM products p
      JOIN categories c ON p.category_id = c.id
      ${whereClause}
      ${orderByClause}
      LIMIT ? OFFSET ?
    `;

    const queryParams = [...params, parseInt(limit, 10), offset];
    const products = await query(dataSql, queryParams);

    return paginatedResponse(res, products, page, limit, total, 'Products retrieved successfully.');
  } catch (error) {
    next(error);
  }
};

// GET /api/products/:idOrSlug
const getProductDetails = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    const isNumeric = /^\d+$/.test(idOrSlug);

    const productSql = `
      SELECT 
        p.*,
        c.name AS category_name,
        c.slug AS category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE ${isNumeric ? 'p.id = ?' : 'p.slug = ?'} AND p.is_active = 1
    `;

    const product = await queryOne(productSql, [idOrSlug]);
    if (!product) {
      return errorResponse(res, 'Product not found.', 404);
    }

    // Fetch all gallery images
    const images = await query(
      'SELECT id, image_url, alt_text, is_primary FROM product_images WHERE product_id = ? ORDER BY is_primary DESC, display_order ASC',
      [product.id]
    );

    // Fetch product variants
    const variants = await query(
      'SELECT id, variant_type, variant_value, price_modifier, stock_quantity, sku FROM product_variants WHERE product_id = ? ORDER BY variant_type, id',
      [product.id]
    );

    // Fetch verified customer reviews
    const reviews = await query(
      `SELECT r.id, r.rating, r.title, r.comment, r.is_verified_purchase, r.created_at, u.name AS user_name, u.avatar_url
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       WHERE r.product_id = ?
       ORDER BY r.created_at DESC`,
      [product.id]
    );

    return successResponse(res, {
      ...product,
      images: images.length ? images : [{ id: 1, image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', is_primary: 1 }],
      variants,
      reviews,
    }, 'Product details retrieved successfully.');
  } catch (error) {
    next(error);
  }
};

// GET /api/products/deals
const getDealsOfDay = async (req, res, next) => {
  try {
    const deals = await query(`
      SELECT 
        p.id, p.category_id, p.name, p.slug, p.brand, p.short_description,
        p.price, p.original_price, p.discount_percent, p.stock_quantity,
        p.rating, p.review_count, p.deal_end_time,
        c.name AS category_name, c.slug AS category_slug,
        (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) AS primary_image
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.is_deal_of_day = 1 AND p.is_active = 1
      ORDER BY p.discount_percent DESC
      LIMIT 8
    `);
    return successResponse(res, deals, 'Deals of the day.');
  } catch (error) {
    next(error);
  }
};

// GET /api/products/trending
const getTrending = async (req, res, next) => {
  try {
    const { category_id } = req.query;
    let sql = `
      SELECT 
        p.id, p.category_id, p.name, p.slug, p.brand, p.short_description,
        p.price, p.original_price, p.discount_percent, p.stock_quantity,
        p.rating, p.review_count,
        c.name AS category_name, c.slug AS category_slug,
        (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) AS primary_image
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.is_trending = 1 AND p.is_active = 1
    `;
    const params = [];
    if (category_id && category_id !== 'all') {
      sql += ' AND p.category_id = ?';
      params.push(category_id);
    }
    sql += ' ORDER BY p.rating DESC, p.review_count DESC LIMIT 12';

    const products = await query(sql, params);
    return successResponse(res, products, 'Trending products.');
  } catch (error) {
    next(error);
  }
};

// GET /api/products/related/:productId
const getRelated = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const currentProduct = await queryOne('SELECT category_id FROM products WHERE id = ?', [productId]);
    if (!currentProduct) {
      return errorResponse(res, 'Product not found.', 404);
    }

    const related = await query(`
      SELECT 
        p.id, p.category_id, p.name, p.slug, p.brand, p.short_description,
        p.price, p.original_price, p.discount_percent, p.stock_quantity,
        p.rating, p.review_count,
        c.name AS category_name,
        (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) AS primary_image
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.category_id = ? AND p.id != ? AND p.is_active = 1
      ORDER BY p.rating DESC
      LIMIT 4
    `, [currentProduct.category_id, productId]);

    return successResponse(res, related, 'Related products.');
  } catch (error) {
    next(error);
  }
};

// GET /api/products/featured
const getFeatured = async (req, res, next) => {
  try {
    const products = await query(`
      SELECT 
        p.id, p.category_id, p.name, p.slug, p.brand, p.short_description,
        p.price, p.original_price, p.discount_percent, p.stock_quantity,
        p.rating, p.review_count, p.is_featured, p.is_trending, p.is_deal_of_day,
        c.name AS category_name, c.slug AS category_slug,
        (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) AS primary_image
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.is_featured = 1 AND p.is_active = 1
      ORDER BY p.rating DESC, p.review_count DESC
      LIMIT 12
    `);
    return successResponse(res, products, 'Featured products.');
  } catch (error) {
    next(error);
  }
};

// GET /api/products/new-arrivals
const getNewArrivals = async (req, res, next) => {
  try {
    const products = await query(`
      SELECT 
        p.id, p.category_id, p.name, p.slug, p.brand, p.short_description,
        p.price, p.original_price, p.discount_percent, p.stock_quantity,
        p.rating, p.review_count, p.is_featured, p.is_trending, p.is_deal_of_day,
        c.name AS category_name, c.slug AS category_slug,
        (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) AS primary_image
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = 1
      ORDER BY p.id DESC
      LIMIT 12
    `);
    return successResponse(res, products, 'New arrivals.');
  } catch (error) {
    next(error);
  }
};

// GET /api/products/best-sellers
const getBestSellers = async (req, res, next) => {
  try {
    const products = await query(`
      SELECT 
        p.id, p.category_id, p.name, p.slug, p.brand, p.short_description,
        p.price, p.original_price, p.discount_percent, p.stock_quantity,
        p.rating, p.review_count, p.is_featured, p.is_trending, p.is_deal_of_day,
        c.name AS category_name, c.slug AS category_slug,
        (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) AS primary_image
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = 1
      ORDER BY p.review_count DESC, p.rating DESC
      LIMIT 12
    `);
    return successResponse(res, products, 'Best sellers.');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductDetails,
  getDealsOfDay,
  getTrending,
  getFeatured,
  getNewArrivals,
  getBestSellers,
  getRelated,
};
