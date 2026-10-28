-- =============================================================================
-- SHOPSPHERE DATABASE SCHEMA (MySQL 8.0)
-- Production-ready E-Commerce Database Schema
-- =============================================================================

CREATE DATABASE IF NOT EXISTS `shopsphere_db`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `shopsphere_db`;

-- Drop existing tables in reverse dependency order
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `password_reset_tokens`;
DROP TABLE IF EXISTS `reviews`;
DROP TABLE IF EXISTS `notifications`;
DROP TABLE IF EXISTS `coupons`;
DROP TABLE IF EXISTS `payments`;
DROP TABLE IF EXISTS `order_items`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `wishlist_items`;
DROP TABLE IF EXISTS `wishlists`;
DROP TABLE IF EXISTS `cart_items`;
DROP TABLE IF EXISTS `carts`;
DROP TABLE IF EXISTS `addresses`;
DROP TABLE IF EXISTS `product_variants`;
DROP TABLE IF EXISTS `product_images`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `users`;
SET FOREIGN_KEY_CHECKS = 1;

-- -----------------------------------------------------------------------------
-- 1. USERS
-- -----------------------------------------------------------------------------
CREATE TABLE `users` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('customer', 'admin') NOT NULL DEFAULT 'customer',
  `phone` VARCHAR(20) DEFAULT NULL,
  `avatar_url` VARCHAR(500) DEFAULT NULL,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_users_email` (`email`),
  INDEX `idx_users_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 2. CATEGORIES
-- -----------------------------------------------------------------------------
CREATE TABLE `categories` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(120) NOT NULL UNIQUE,
  `description` TEXT DEFAULT NULL,
  `image_url` VARCHAR(500) DEFAULT NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_categories_slug` (`slug`),
  INDEX `idx_categories_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 3. PRODUCTS
-- -----------------------------------------------------------------------------
CREATE TABLE `products` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `category_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(280) NOT NULL UNIQUE,
  `brand` VARCHAR(100) NOT NULL,
  `sku` VARCHAR(60) NOT NULL UNIQUE,
  `description` MEDIUMTEXT NOT NULL,
  `short_description` VARCHAR(500) DEFAULT NULL,
  `price` DECIMAL(12, 2) NOT NULL,
  `original_price` DECIMAL(12, 2) NOT NULL,
  `discount_percent` INT GENERATED ALWAYS AS (
    CASE 
      WHEN original_price > price THEN ROUND(((original_price - price) / original_price) * 100)
      ELSE 0
    END
  ) STORED,
  `stock_quantity` INT NOT NULL DEFAULT 0,
  `rating` DECIMAL(3, 2) NOT NULL DEFAULT 0.00,
  `review_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `is_featured` BOOLEAN NOT NULL DEFAULT FALSE,
  `is_trending` BOOLEAN NOT NULL DEFAULT FALSE,
  `is_deal_of_day` BOOLEAN NOT NULL DEFAULT FALSE,
  `deal_end_time` TIMESTAMP NULL DEFAULT NULL,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  INDEX `idx_products_category` (`category_id`),
  INDEX `idx_products_slug` (`slug`),
  INDEX `idx_products_brand` (`brand`),
  INDEX `idx_products_price` (`price`),
  INDEX `idx_products_rating` (`rating`),
  INDEX `idx_products_active` (`is_active`),
  INDEX `idx_products_trending` (`is_trending`),
  INDEX `idx_products_deal` (`is_deal_of_day`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 4. PRODUCT IMAGES
-- -----------------------------------------------------------------------------
CREATE TABLE `product_images` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `product_id` INT UNSIGNED NOT NULL,
  `image_url` VARCHAR(500) NOT NULL,
  `alt_text` VARCHAR(255) DEFAULT NULL,
  `is_primary` BOOLEAN NOT NULL DEFAULT FALSE,
  `display_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_product_images_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX `idx_product_images_product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 5. PRODUCT VARIANTS
-- -----------------------------------------------------------------------------
CREATE TABLE `product_variants` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `product_id` INT UNSIGNED NOT NULL,
  `variant_type` ENUM('color', 'size', 'storage', 'edition') NOT NULL,
  `variant_value` VARCHAR(100) NOT NULL,
  `price_modifier` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  `stock_quantity` INT NOT NULL DEFAULT 0,
  `sku` VARCHAR(80) NOT NULL UNIQUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_product_variants_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX `idx_product_variants_product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 6. ADDRESSES
-- -----------------------------------------------------------------------------
CREATE TABLE `addresses` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED NOT NULL,
  `full_name` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `address_line1` VARCHAR(255) NOT NULL,
  `address_line2` VARCHAR(255) DEFAULT NULL,
  `landmark` VARCHAR(150) DEFAULT NULL,
  `city` VARCHAR(100) NOT NULL,
  `state` VARCHAR(100) NOT NULL,
  `postal_code` VARCHAR(20) NOT NULL,
  `country` VARCHAR(60) NOT NULL DEFAULT 'India',
  `address_type` ENUM('home', 'work', 'other') NOT NULL DEFAULT 'home',
  `is_default` BOOLEAN NOT NULL DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_addresses_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX `idx_addresses_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 7. CARTS & CART ITEMS
-- -----------------------------------------------------------------------------
CREATE TABLE `carts` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED NOT NULL UNIQUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_carts_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `cart_items` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `cart_id` INT UNSIGNED NOT NULL,
  `product_id` INT UNSIGNED NOT NULL,
  `variant_id` INT UNSIGNED DEFAULT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_cart_items_cart` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_cart_items_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_cart_items_variant` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  UNIQUE KEY `uk_cart_product_variant` (`cart_id`, `product_id`, `variant_id`),
  INDEX `idx_cart_items_cart` (`cart_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 8. WISHLISTS & WISHLIST ITEMS
-- -----------------------------------------------------------------------------
CREATE TABLE `wishlists` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED NOT NULL UNIQUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_wishlists_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `wishlist_items` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `wishlist_id` INT UNSIGNED NOT NULL,
  `product_id` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_wishlist_items_wishlist` FOREIGN KEY (`wishlist_id`) REFERENCES `wishlists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_wishlist_items_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE KEY `uk_wishlist_product` (`wishlist_id`, `product_id`),
  INDEX `idx_wishlist_items_wishlist` (`wishlist_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 9. ORDERS
-- -----------------------------------------------------------------------------
CREATE TABLE `orders` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `order_number` VARCHAR(32) NOT NULL UNIQUE,
  `user_id` INT UNSIGNED NOT NULL,
  `customer_name` VARCHAR(100) NOT NULL,
  `customer_email` VARCHAR(191) NOT NULL,
  `customer_phone` VARCHAR(20) NOT NULL,
  `shipping_address_line` VARCHAR(500) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `state` VARCHAR(100) NOT NULL,
  `postal_code` VARCHAR(20) NOT NULL,
  `country` VARCHAR(60) NOT NULL DEFAULT 'India',
  `subtotal` DECIMAL(12, 2) NOT NULL,
  `discount_amount` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `delivery_charge` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  `tax_amount` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `total_amount` DECIMAL(12, 2) NOT NULL,
  `coupon_code` VARCHAR(50) DEFAULT NULL,
  `order_status` ENUM('ordered', 'confirmed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled') NOT NULL DEFAULT 'ordered',
  `payment_status` ENUM('pending', 'paid', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
  `payment_method` ENUM('cod', 'card', 'upi', 'netbanking') NOT NULL DEFAULT 'cod',
  `cancellation_reason` VARCHAR(255) DEFAULT NULL,
  `estimated_delivery_date` DATE DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  INDEX `idx_orders_user` (`user_id`),
  INDEX `idx_orders_number` (`order_number`),
  INDEX `idx_orders_status` (`order_status`),
  INDEX `idx_orders_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 10. ORDER ITEMS (Historical Snapshot)
-- -----------------------------------------------------------------------------
CREATE TABLE `order_items` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT UNSIGNED NOT NULL,
  `product_id` INT UNSIGNED NOT NULL,
  `product_name` VARCHAR(255) NOT NULL,
  `product_sku` VARCHAR(60) NOT NULL,
  `product_image` VARCHAR(500) DEFAULT NULL,
  `variant_info` VARCHAR(150) DEFAULT NULL,
  `unit_price` DECIMAL(12, 2) NOT NULL,
  `quantity` INT NOT NULL,
  `total_price` DECIMAL(12, 2) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_order_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_order_items_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  INDEX `idx_order_items_order` (`order_id`),
  INDEX `idx_order_items_product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 11. PAYMENTS
-- -----------------------------------------------------------------------------
CREATE TABLE `payments` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT UNSIGNED NOT NULL,
  `payment_method` ENUM('cod', 'card', 'upi', 'netbanking') NOT NULL,
  `transaction_reference` VARCHAR(100) NOT NULL UNIQUE,
  `amount` DECIMAL(12, 2) NOT NULL,
  `payment_status` ENUM('pending', 'paid', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
  `payment_details` JSON DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_payments_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX `idx_payments_order` (`order_id`),
  INDEX `idx_payments_ref` (`transaction_reference`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 12. COUPONS
-- -----------------------------------------------------------------------------
CREATE TABLE `coupons` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `code` VARCHAR(50) NOT NULL UNIQUE,
  `description` VARCHAR(255) NOT NULL,
  `discount_type` ENUM('flat', 'percentage') NOT NULL,
  `discount_value` DECIMAL(10, 2) NOT NULL,
  `min_order_amount` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  `max_discount_amount` DECIMAL(10, 2) DEFAULT NULL,
  `usage_limit` INT DEFAULT NULL,
  `times_used` INT NOT NULL DEFAULT 0,
  `valid_from` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `valid_until` TIMESTAMP NULL DEFAULT NULL,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_coupons_code` (`code`),
  INDEX `idx_coupons_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 13. NOTIFICATIONS
-- -----------------------------------------------------------------------------
CREATE TABLE `notifications` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED NOT NULL,
  `title` VARCHAR(150) NOT NULL,
  `message` TEXT NOT NULL,
  `type` ENUM('order', 'promo', 'system') NOT NULL DEFAULT 'system',
  `is_read` BOOLEAN NOT NULL DEFAULT FALSE,
  `reference_id` VARCHAR(50) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_notifications_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX `idx_notifications_user` (`user_id`),
  INDEX `idx_notifications_read` (`is_read`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 14. REVIEWS
-- -----------------------------------------------------------------------------
CREATE TABLE `reviews` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `product_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `rating` TINYINT UNSIGNED NOT NULL CHECK (`rating` BETWEEN 1 AND 5),
  `title` VARCHAR(150) DEFAULT NULL,
  `comment` TEXT NOT NULL,
  `is_verified_purchase` BOOLEAN NOT NULL DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_reviews_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_reviews_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX `idx_reviews_product` (`product_id`),
  INDEX `idx_reviews_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 15. PASSWORD RESET TOKENS
-- -----------------------------------------------------------------------------
CREATE TABLE `password_reset_tokens` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED NOT NULL,
  `token` VARCHAR(255) NOT NULL UNIQUE,
  `expires_at` TIMESTAMP NOT NULL,
  `is_used` BOOLEAN NOT NULL DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_reset_tokens_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX `idx_reset_tokens_token` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
