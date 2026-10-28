// =============================================================================
// SHOPSPHERE IDEMPOTENT DATABASE SEEDER
// Populates 11 Categories, 275 Products (25/cat), Users, Coupons, Addresses & Reviews
// =============================================================================

require('../config/env');
const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');
const { categoriesData } = require('./seedData');
const { allProducts } = require('./productsCatalog');

async function seed() {
  console.log('================================================================');
  console.log('  SHOPSPHERE DATABASE SEEDER');
  console.log('================================================================');

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // 1. SEED USERS
    console.log('\n[1/6] Seeding Users...');
    const adminPasswordHash = bcrypt.hashSync('Admin@123', 10);
    const customerPasswordHash = bcrypt.hashSync('Customer@123', 10);

    const usersToSeed = [
      {
        name: 'Admin User',
        email: 'admin@shopsphere.io',
        password_hash: adminPasswordHash,
        role: 'admin',
        phone: '+91 98765 43210',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      },
      {
        name: 'Admin User',
        email: 'admin@shopsphere.com',
        password_hash: adminPasswordHash,
        role: 'admin',
        phone: '+91 98765 43210',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      },
      {
        name: 'Demo Shopper',
        email: 'customer@shopsphere.io',
        password_hash: customerPasswordHash,
        role: 'customer',
        phone: '+91 98765 12345',
        avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      },
      {
        name: 'Demo Shopper',
        email: 'customer@shopsphere.com',
        password_hash: customerPasswordHash,
        role: 'customer',
        phone: '+91 98765 12345',
        avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      },
    ];

    for (const u of usersToSeed) {
      await connection.query(
        `INSERT INTO users (name, email, password_hash, role, phone, avatar_url, is_active)
         VALUES (?, ?, ?, ?, ?, ?, 1)
         ON DUPLICATE KEY UPDATE
           name = VALUES(name),
           password_hash = VALUES(password_hash),
           role = VALUES(role),
           phone = VALUES(phone),
           avatar_url = VALUES(avatar_url),
           is_active = 1`,
        [u.name, u.email, u.password_hash, u.role, u.phone, u.avatar_url]
      );
    }

    // Retrieve user IDs
    const [[adminUser]] = await connection.query('SELECT id FROM users WHERE email = ?', ['admin@shopsphere.io']);
    const [[demoUser]] = await connection.query('SELECT id FROM users WHERE email = ?', ['customer@shopsphere.io']);

    // Ensure carts & wishlists exist for demo shopper
    if (demoUser) {
      await connection.query(
        `INSERT INTO carts (user_id) VALUES (?) ON DUPLICATE KEY UPDATE user_id = VALUES(user_id)`,
        [demoUser.id]
      );
      await connection.query(
        `INSERT INTO wishlists (user_id) VALUES (?) ON DUPLICATE KEY UPDATE user_id = VALUES(user_id)`,
        [demoUser.id]
      );

      // Seed Default Address for Demo Customer
      await connection.query(
        `INSERT INTO addresses (user_id, full_name, phone, address_line1, address_line2, landmark, city, state, postal_code, country, address_type, is_default)
         VALUES (?, 'Demo Shopper', '+91 98765 12345', 'Flat 402, Prestige Palms', 'Outer Ring Road, Kadubeesanahalli', 'Near Marathahalli Bridge', 'Bengaluru', 'Karnataka', '560103', 'India', 'home', 1)
         ON DUPLICATE KEY UPDATE full_name = VALUES(full_name)`,
        [demoUser.id]
      );
    }
    console.log(`  ✓ Seeded 2 users: admin@shopsphere.io and customer@shopsphere.io`);

    // 2. SEED CATEGORIES
    console.log('\n[2/6] Seeding Categories...');
    for (const cat of categoriesData) {
      await connection.query(
        `INSERT INTO categories (id, name, slug, description, image_url, display_order, is_active)
         VALUES (?, ?, ?, ?, ?, ?, 1)
         ON DUPLICATE KEY UPDATE
           name = VALUES(name),
           slug = VALUES(slug),
           description = VALUES(description),
           image_url = VALUES(image_url),
           display_order = VALUES(display_order),
           is_active = 1`,
        [cat.id, cat.name, cat.slug, cat.description, cat.image_url, cat.display_order]
      );
    }
    console.log(`  ✓ Seeded ${categoriesData.length} categories.`);

    // 3. SEED PRODUCTS
    console.log(`\n[3/6] Seeding ${allProducts.length} Products & Images...`);
    let insertedProducts = 0;
    for (const p of allProducts) {
      await connection.query(
        `INSERT INTO products (
           category_id, name, slug, brand, sku, description, short_description,
           price, original_price, stock_quantity, rating, review_count,
           is_featured, is_trending, is_deal_of_day, is_active
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
         ON DUPLICATE KEY UPDATE
           category_id = VALUES(category_id),
           name = VALUES(name),
           brand = VALUES(brand),
           description = VALUES(description),
           short_description = VALUES(short_description),
           price = VALUES(price),
           original_price = VALUES(original_price),
           stock_quantity = VALUES(stock_quantity),
           rating = VALUES(rating),
           review_count = VALUES(review_count),
           is_featured = VALUES(is_featured),
           is_trending = VALUES(is_trending),
           is_deal_of_day = VALUES(is_deal_of_day),
           is_active = 1`,
        [
          p.category_id,
          p.name,
          p.slug,
          p.brand,
          p.sku,
          p.description,
          p.short_description || null,
          p.price,
          p.original_price,
          p.stock_quantity,
          p.rating,
          p.review_count,
          p.is_featured ? 1 : 0,
          p.is_trending ? 1 : 0,
          p.is_deal_of_day ? 1 : 0,
        ]
      );

      // Get product id
      const [[dbProd]] = await connection.query('SELECT id FROM products WHERE sku = ?', [p.sku]);
      if (dbProd && p.image_url) {
        await connection.query(
          `INSERT INTO product_images (product_id, image_url, alt_text, is_primary, display_order)
           VALUES (?, ?, ?, 1, 0)
           ON DUPLICATE KEY UPDATE image_url = VALUES(image_url)`,
          [dbProd.id, p.image_url, p.name]
        );
      }
      insertedProducts++;
    }
    console.log(`  ✓ Seeded ${insertedProducts} products and their primary images.`);

    // 4. SEED COUPONS
    console.log('\n[4/6] Seeding Promotional Coupons...');
    const coupons = [
      {
        code: 'SPHERE10',
        description: '10% instant discount on orders above ₹1,000 (Max ₹500)',
        discount_type: 'percentage',
        discount_value: 10.0,
        min_order_amount: 1000.0,
        max_discount_amount: 500.0,
      },
      {
        code: 'WELCOME20',
        description: 'Flat 20% discount on first purchase above ₹2,000 (Max ₹1,000)',
        discount_type: 'percentage',
        discount_value: 20.0,
        min_order_amount: 2000.0,
        max_discount_amount: 1000.0,
      },
      {
        code: 'FESTIVE15',
        description: 'Special 15% festive discount on orders above ₹1,500 (Max ₹750)',
        discount_type: 'percentage',
        discount_value: 15.0,
        min_order_amount: 1500.0,
        max_discount_amount: 750.0,
      },
      {
        code: 'FLAT500',
        description: 'Flat ₹500 discount on electronics and lifestyle above ₹5,000',
        discount_type: 'flat',
        discount_value: 500.0,
        min_order_amount: 5000.0,
        max_discount_amount: 500.0,
      },
    ];

    for (const c of coupons) {
      await connection.query(
        `INSERT INTO coupons (code, description, discount_type, discount_value, min_order_amount, max_discount_amount, is_active)
         VALUES (?, ?, ?, ?, ?, ?, 1)
         ON DUPLICATE KEY UPDATE
           description = VALUES(description),
           discount_type = VALUES(discount_type),
           discount_value = VALUES(discount_value),
           min_order_amount = VALUES(min_order_amount),
           max_discount_amount = VALUES(max_discount_amount),
           is_active = 1`,
        [c.code, c.description, c.discount_type, c.discount_value, c.min_order_amount, c.max_discount_amount]
      );
    }
    console.log(`  ✓ Seeded ${coupons.length} promotional coupons.`);

    // 5. SEED VERIFIED REVIEWS FOR FEATURED PRODUCTS
    console.log('\n[5/6] Seeding Verified Customer Reviews...');
    const [sampleFeatured] = await connection.query('SELECT id, name FROM products WHERE is_featured = 1 LIMIT 10');
    if (demoUser && sampleFeatured.length > 0) {
      for (const prod of sampleFeatured) {
        await connection.query(
          `INSERT INTO reviews (product_id, user_id, rating, title, comment, is_verified_purchase)
           VALUES (?, ?, 5, 'Exceptional quality & fast delivery!', 'Exceeded all my expectations. Build quality and performance are world-class.', 1)
           ON DUPLICATE KEY UPDATE rating = VALUES(rating)`,
          [prod.id, demoUser.id]
        );
      }
      console.log(`  ✓ Seeded verified reviews for featured products.`);
    }

    await connection.commit();
    console.log('\n[6/6] Database transaction committed successfully!');

    // 6. VALIDATE AND PRINT REPORT
    console.log('\n================================================================');
    console.log('  SEED VALIDATION & REPORT');
    console.log('================================================================');

    const [[{ totalCategories }]] = await connection.query('SELECT COUNT(*) AS totalCategories FROM categories');
    const [[{ totalProducts }]] = await connection.query('SELECT COUNT(*) AS totalProducts FROM products WHERE is_active = 1');
    const [[{ totalUsers }]] = await connection.query('SELECT COUNT(*) AS totalUsers FROM users');
    const [[{ totalCoupons }]] = await connection.query('SELECT COUNT(*) AS totalCoupons FROM coupons');

    console.log(`Total Active Categories: ${totalCategories}`);
    console.log(`Total Active Products:   ${totalProducts}`);
    console.log(`Total Registered Users:  ${totalUsers}`);
    console.log(`Total Active Coupons:    ${totalCoupons}`);

    console.log('\nBreakdown Per Category:');
    const [breakdown] = await connection.query(`
      SELECT c.id, c.name, COUNT(p.id) AS product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.is_active = 1
      GROUP BY c.id, c.name
      ORDER BY c.id
    `);

    let allCompliant = true;
    for (const row of breakdown) {
      const compliant = row.product_count >= 20;
      if (!compliant) allCompliant = false;
      const statusTag = compliant ? '✓ OK (>= 20)' : '✗ FAILED (< 20)';
      console.log(`  [${String(row.id).padStart(2, '0')}] ${row.name.padEnd(25)} : ${row.product_count} products [${statusTag}]`);
    }

    if (allCompliant) {
      console.log('\nSUCCESS: All 11 categories satisfy the strict >= 20 products requirement!');
    } else {
      console.warn('\nWARNING: Some categories have fewer than 20 products.');
    }
    console.log('================================================================\n');

  } catch (error) {
    await connection.rollback();
    console.error('Seeding failed! Transaction rolled back.', error);
    process.exit(1);
  } finally {
    connection.release();
    process.exit(0);
  }
}

seed();
