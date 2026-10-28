-- =============================================================================
-- SHOPSPHERE SEED DATA
-- High quality seed data with realistic Indian catalog and INR prices
-- =============================================================================

USE `shopsphere_db`;

-- -----------------------------------------------------------------------------
-- 1. USERS
-- -----------------------------------------------------------------------------
INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `role`, `phone`, `avatar_url`) VALUES
(1, 'ShopSphere Admin', 'admin@shopsphere.com', '$2a$10$5Nv0zKwTQIT/DZcGo6mVWuSXFvJDFMsxFB5j5i8dbOs9lQJ.Qo652', 'admin', '+91 98765 43210', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'),
(2, 'Aarav Patel', 'customer@shopsphere.com', '$2a$10$qFpSL5bwIDKnkhoFD6Oeleag2FszUVEWLbXg2dz3TjWbvMsjp9DKC', 'customer', '+91 98123 45678', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'),
(3, 'Priya Sharma', 'priya.sharma@example.com', '$2a$10$qFpSL5bwIDKnkhoFD6Oeleag2FszUVEWLbXg2dz3TjWbvMsjp9DKC', 'customer', '+91 98234 56789', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80');

-- -----------------------------------------------------------------------------
-- 2. CATEGORIES
-- -----------------------------------------------------------------------------
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image_url`, `display_order`) VALUES
(1, 'Electronics', 'electronics', 'Smartphones, audio, smart wearables, laptops and modern tech accessories', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80', 1),
(2, 'Fashion', 'fashion', 'Trendy Indian and western wear, footwear, and designer accessories', 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80', 2),
(3, 'Home & Living', 'home-living', 'Modern home decor, luxury beddings, kitchen essentials and lighting', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80', 3),
(4, 'Beauty', 'beauty', 'Premium skincare, haircare, wellness and organic personal care products', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80', 4),
(5, 'Sports & Fitness', 'sports-fitness', 'Gym gear, badminton rackets, yoga mats and premium sportswear', 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80', 5),
(6, 'Books & Media', 'books-media', 'Bestselling fiction, business insights, academic titles and self-growth', 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80', 6);

-- -----------------------------------------------------------------------------
-- 3. PRODUCTS
-- -----------------------------------------------------------------------------
INSERT INTO `products` (`id`, `category_id`, `name`, `slug`, `brand`, `sku`, `description`, `short_description`, `price`, `original_price`, `stock_quantity`, `rating`, `review_count`, `is_featured`, `is_trending`, `is_deal_of_day`, `deal_end_time`) VALUES
-- Electronics
(1, 1, 'Aura ANC Wireless Headphones', 'aura-anc-wireless-headphones', 'SoundPulse', 'ELE-HP-001', 'Experience studio-grade active noise cancellation with 40-hour battery life, high-res audio drivers, and plush memory foam ear cushions for all-day comfort. Features fast charging via USB-C and multipoint Bluetooth 5.3 pairing.', 'Studio-grade ANC headphones with 40h battery & high-res audio drivers', 4999.00, 7999.00, 45, 4.80, 128, 1, 1, 1, DATE_ADD(NOW(), INTERVAL 24 HOUR)),
(2, 1, 'Apex Smartwatch Pro with AMOLED Display', 'apex-smartwatch-pro-amoled', 'TitanFit', 'ELE-SW-002', 'Crisp 1.43-inch AMOLED display with always-on screen, continuous SpO2 and heart-rate monitoring, 100+ sports modes, Bluetooth calling, and IP68 water resistance.', '1.43 inch AMOLED display with Bluetooth calling & health tracking', 3499.00, 5999.00, 60, 4.60, 94, 1, 1, 0, NULL),
(3, 1, 'Wave 30W Waterproof Bluetooth Speaker', 'wave-30w-waterproof-bluetooth-speaker', 'SonicBoom', 'ELE-SP-003', 'Punchy 360-degree bass with 30W peak output, IPX7 waterproof housing, RGB beat lighting, and 16 hours of continuous playtime. Ideal for poolside and travel.', '30W portable party speaker with deep bass and IPX7 rating', 2299.00, 3999.00, 30, 4.50, 67, 0, 1, 1, DATE_ADD(NOW(), INTERVAL 18 HOUR)),
(4, 1, 'HyperCharge 65W GaN Fast Charger', 'hypercharge-65w-gan-fast-charger', 'VoltTech', 'ELE-CH-004', 'Compact triple-port Gallium Nitride charger supporting laptops, MacBooks, iPhones, and Android smartphones simultaneously with smart power distribution.', 'Ultra-compact 65W GaN charger with 2 USB-C and 1 USB-A ports', 1899.00, 2999.00, 85, 4.70, 52, 0, 0, 0, NULL),

-- Fashion
(5, 2, 'Heritage Handloom Pure Linen Shirt', 'heritage-handloom-pure-linen-shirt', 'VedicThreads', 'FAS-SH-005', 'Tailored from breathable 100% pure organic linen. Features a relaxed spread collar, mother-of-pearl buttons, and a tailored slim drape for summer comfort and casual sophistication.', 'Pure organic linen shirt with relaxed collar & premium drape', 1999.00, 3499.00, 40, 4.70, 83, 1, 1, 0, NULL),
(6, 2, 'Urban Comfort Indigo Slim Stretch Denim', 'urban-comfort-indigo-slim-stretch-denim', 'DenimCraft', 'FAS-JN-006', 'Durable 12.5 oz premium cotton-blend stretch denim with authentic indigo wash, reinforced rivets, and comfort waist flexibility engineered for long workdays.', 'Flexible slim-fit indigo jeans crafted for everyday durability', 2199.00, 3299.00, 55, 4.40, 41, 0, 1, 0, NULL),
(7, 2, 'Artisan Handcrafted Leather Chelsea Boots', 'artisan-leather-chelsea-boots', 'TanneryCo', 'FAS-FT-007', 'Hand-burnished full grain leather with Goodyear welt construction, elasticated side gussets, and cushioned arch support for timeless formal and casual styling.', 'Full-grain leather Chelsea boots with Goodyear welted sole', 4499.00, 6999.00, 25, 4.90, 64, 1, 0, 1, DATE_ADD(NOW(), INTERVAL 36 HOUR)),
(8, 2, 'Minimalist Classic Chronograph Watch', 'minimalist-classic-chronograph-watch', 'Chronos', 'FAS-WT-008', 'Sleek matte stainless steel case with sapphire-coated crystal, genuine leather strap, Japanese quartz movement, and 50m water resistance.', 'Japanese quartz movement watch with Italian leather band', 3299.00, 4999.00, 35, 4.60, 39, 0, 0, 0, NULL),

-- Home & Living
(9, 3, 'Aroma Ultrasonic Ceramic Essential Oil Diffuser', 'aroma-ultrasonic-ceramic-diffuser', 'ZenNest', 'HOM-DF-009', 'Handcrafted ceramic cover with ultrasonic cool-mist atomization, 7 ambient warm LED mood lights, whisper-quiet operation, and auto safety shut-off.', 'Ceramic essential oil diffuser with ambient warm lighting', 1799.00, 2799.00, 50, 4.60, 78, 1, 1, 1, DATE_ADD(NOW(), INTERVAL 12 HOUR)),
(10, 3, 'Royal 400 TC Egyptian Cotton Bed Sheet Set', 'royal-400-tc-egyptian-cotton-bed-sheet', 'Loom & Nest', 'HOM-BD-010', 'Silky sateen weave 400 thread count long-staple Egyptian cotton king bed sheet set including two matching pillow covers. Deep pockets fit mattresses up to 14 inches.', 'Luxury 400 TC sateen weave king bed sheet set with 2 pillow covers', 2499.00, 4199.00, 38, 4.80, 112, 1, 0, 0, NULL),
(11, 3, 'Handcrafted Ceramic Stoneware Dinner Set (12-Piece)', 'handcrafted-ceramic-stoneware-dinner-set', 'ClayCraft', 'HOM-DS-011', 'Artisan-glazed stoneware dinner set including 4 dinner plates, 4 side plates, and 4 dessert bowls. Microwave, dishwasher, and oven safe up to 200°C.', '12-piece artisan glazed microwave-safe stoneware dinnerware', 3799.00, 5999.00, 20, 4.90, 46, 0, 1, 0, NULL),
(12, 3, 'Ergonomic Memory Foam Lumbar Support Cushion', 'ergonomic-memory-foam-lumbar-cushion', 'OrthoRest', 'HOM-CS-012', 'Contoured high-density memory foam cushion with breathable 3D mesh cover and adjustable dual straps designed to alleviate office chair back discomfort.', 'High-density memory foam back support with breathable mesh cover', 1299.00, 1999.00, 65, 4.40, 89, 0, 0, 0, NULL),

-- Beauty & Personal Care
(13, 4, 'Pure Radiance Vitamin C + Hyaluronic Face Serum', 'pure-radiance-vitamin-c-face-serum', 'Botanica', 'BEA-SR-013', 'Potent 15% Ethyl Ascorbic Acid infused with Ferulic Acid and multi-molecular Hyaluronic Acid for targeted dark spot correction and collagen boost.', '15% Vitamin C glow serum with Hyaluronic Acid & Ferulic Acid', 899.00, 1499.00, 90, 4.70, 156, 1, 1, 1, DATE_ADD(NOW(), INTERVAL 20 HOUR)),
(14, 4, 'Organic Cold-Pressed Moroccan Argan Hair Oil', 'organic-cold-pressed-argan-hair-oil', 'Naturale', 'BEA-OL-014', '100% pure certified organic Moroccan argan oil rich in Vitamin E and essential fatty acids for taming frizz, split-end recovery, and deep scalp nourishment.', 'Pure certified organic Argan oil for silky frizz-free hair', 999.00, 1699.00, 70, 4.80, 95, 0, 1, 0, NULL),
(15, 4, 'HydraShield SPF 50+ PA++++ Dewy Sunscreen Gel', 'hydrashield-spf-50-dewy-sunscreen-gel', 'DermaSun', 'BEA-SN-015', 'Broad spectrum UV protection with zero white cast, ultra-lightweight gel texture, enriched with Niacinamide and Centella Asiatica for soothing barrier defense.', 'Ultralight invisible SPF 50 gel with Niacinamide & zero white cast', 649.00, 899.00, 110, 4.60, 210, 1, 0, 0, NULL),
(16, 4, 'Charcoal Deep Detox Clarifying Clay Face Mask', 'charcoal-deep-detox-clay-mask', 'PurityLabs', 'BEA-MK-016', 'Formulated with French Kaolin clay, activated bamboo charcoal, and tea tree oil to draw out impurities, refine open pores, and control excess sebum.', 'Pore-clearing Kaolin clay & bamboo charcoal purifying mask', 549.00, 799.00, 80, 4.30, 43, 0, 0, 0, NULL),

-- Sports & Fitness
(17, 5, 'ProGrip Anti-Slip Natural Rubber Yoga Mat', 'progrip-anti-slip-rubber-yoga-mat', 'AsanaPro', 'SPO-YM-017', '6mm thick high-density natural tree rubber with moisture-wicking polyurethane surface and laser-etched alignment guides for superior traction and joint cushioning.', '6mm natural rubber alignment yoga mat with superior dry/wet grip', 1899.00, 2999.00, 45, 4.80, 88, 1, 1, 0, NULL),
(18, 5, 'Adjustable Quick-Select Dumbbell Set (2.5 to 24 kg)', 'adjustable-quick-select-dumbbell-set', 'IronFlex', 'SPO-DB-018', 'Space-saving selector dumbbell replacing 15 sets of weights with a smooth dial mechanism. Heavy-duty molded steel plates with textured contour grip.', 'Dial-adjustable selector dumbbell replacing 15 weight sets', 8999.00, 13999.00, 15, 4.90, 54, 1, 0, 1, DATE_ADD(NOW(), INTERVAL 48 HOUR)),
(19, 5, 'AeroStrike Carbon Fiber Badminton Racket', 'aerostrike-carbon-fiber-badminton-racket', 'SwiftCourt', 'SPO-RK-019', 'Ultralight 4U 82g Japanese Toray high modulus carbon fiber frame pre-strung at 28 lbs tension with isometric head shape for explosive smashes.', '82g ultralight Toray carbon racket strung at 28 lbs tension', 2299.00, 3799.00, 50, 4.60, 62, 0, 1, 0, NULL),
(20, 5, 'Thermal Insulated Stainless Steel Sports Bottle (1L)', 'thermal-insulated-sports-bottle-1l', 'HydroPeak', 'SPO-BT-020', 'Double-wall vacuum insulated 18/8 food-grade stainless steel keeping drinks icy cold for 24h or steaming hot for 12h. Leakproof spout with carry loop.', '1 Litre double-wall vacuum insulated bottle cold 24h hot 12h', 899.00, 1499.00, 95, 4.70, 134, 0, 0, 0, NULL),

-- Books & Media
(21, 6, 'Mastering Full-Stack System Architecture', 'mastering-full-stack-system-architecture', 'TechCraft Press', 'BOK-FS-021', 'Comprehensive blueprint for designing scalable microservices, resilient distributed databases, high-performance caching layers, and production web APIs.', 'Practical guide to scalable microservices and resilient architectures', 1199.00, 1699.00, 60, 4.90, 89, 1, 1, 0, NULL),
(22, 6, 'The Mindful Entrepreneur: Building Sustainable Ventures', 'mindful-entrepreneur-sustainable-ventures', 'Zenith Books', 'BOK-ME-022', 'A holistic guide to building customer-centric businesses with disciplined capital allocation, thoughtful team leadership, and long-term economic moats.', 'Modern playbook on customer-obsessed businesses & disciplined growth', 699.00, 999.00, 75, 4.80, 45, 0, 1, 0, NULL),
(23, 6, 'Gourmet Indian Kitchen: Regional Delicacies', 'gourmet-indian-kitchen-regional-delicacies', 'SpiceHeritage', 'BOK-GI-023', 'Over 120 authentic regional recipes with step-by-step masterclasses on spice temperings, slow-cooked curries, and modern heritage plating.', '120+ authentic regional recipes with spice masterclasses', 899.00, 1299.00, 40, 4.70, 38, 0, 0, 1, DATE_ADD(NOW(), INTERVAL 24 HOUR)),
(24, 6, 'Atomic Habits & Peak Cognitive Performance', 'atomic-habits-peak-cognitive-performance', 'Vanguard Publishing', 'BOK-AH-024', 'Evidence-based cognitive routines for deep focus, creative breakthroughs, and systematic micro-habit execution in modern high-distraction environments.', 'Practical neuroscience of deep focus and compound daily habits', 599.00, 799.00, 120, 4.90, 215, 1, 0, 0, NULL);

-- -----------------------------------------------------------------------------
-- 4. PRODUCT IMAGES
-- -----------------------------------------------------------------------------
INSERT INTO `product_images` (`product_id`, `image_url`, `alt_text`, `is_primary`, `display_order`) VALUES
(1, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', 'Aura ANC Wireless Headphones Front View', 1, 1),
(1, 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80', 'Aura ANC Wireless Headphones Angled View', 0, 2),
(1, 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80', 'Aura ANC Wireless Headphones Side Ear Cushion', 0, 3),

(2, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80', 'Apex Smartwatch Pro Front Display', 1, 1),
(2, 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80', 'Apex Smartwatch Pro Wrist Perspective', 0, 2),

(3, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80', 'Wave 30W Waterproof Bluetooth Speaker Front', 1, 1),
(4, 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80', 'HyperCharge 65W GaN Fast Charger Plug', 1, 1),

(5, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80', 'Heritage Pure Linen Shirt Front View', 1, 1),
(5, 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80', 'Heritage Pure Linen Shirt Fabric Detail', 0, 2),

(6, 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80', 'Urban Comfort Indigo Denim Front', 1, 1),
(7, 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80', 'Artisan Leather Chelsea Boots Side Angle', 1, 1),
(8, 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80', 'Minimalist Classic Chronograph Watch Dial', 1, 1),

(9, 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80', 'Aroma Ultrasonic Ceramic Diffuser Mist', 1, 1),
(10, 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80', 'Royal 400 TC Egyptian Cotton Bed Sheet', 1, 1),
(11, 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80', 'Ceramic Stoneware Dinner Set Setting', 1, 1),
(12, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80', 'Ergonomic Memory Foam Cushion', 1, 1),

(13, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80', 'Pure Radiance Vitamin C Serum Bottle', 1, 1),
(14, 'https://images.unsplash.com/photo-1608248597359-52e85040e53a?auto=format&fit=crop&w=800&q=80', 'Organic Moroccan Argan Hair Oil Drop', 1, 1),
(15, 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80', 'HydraShield SPF 50 Gel Tube', 1, 1),
(16, 'https://images.unsplash.com/photo-1567928815104-b7980ee5032e?auto=format&fit=crop&w=800&q=80', 'Charcoal Deep Detox Face Mask Jar', 1, 1),

(17, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80', 'ProGrip Rubber Yoga Mat Rolled Out', 1, 1),
(18, 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&w=800&q=80', 'Adjustable Dumbbell On Floor', 1, 1),
(19, 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80', 'AeroStrike Carbon Badminton Racket', 1, 1),
(20, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80', 'Thermal Insulated Sports Bottle', 1, 1),

(21, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80', 'Mastering Full-Stack Architecture Book Cover', 1, 1),
(22, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80', 'The Mindful Entrepreneur Book Cover', 1, 1),
(23, 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80', 'Gourmet Indian Kitchen Recipe Book', 1, 1),
(24, 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&w=800&q=80', 'Atomic Habits & Peak Performance Book', 1, 1);

-- -----------------------------------------------------------------------------
-- 5. PRODUCT VARIANTS
-- -----------------------------------------------------------------------------
INSERT INTO `product_variants` (`product_id`, `variant_type`, `variant_value`, `price_modifier`, `stock_quantity`, `sku`) VALUES
(1, 'color', 'Midnight Black', 0.00, 25, 'ELE-HP-001-BLK'),
(1, 'color', 'Platinum Silver', 0.00, 20, 'ELE-HP-001-SLV'),
(2, 'color', 'Space Gray', 0.00, 30, 'ELE-SW-002-GRY'),
(2, 'color', 'Rose Gold', 200.00, 30, 'ELE-SW-002-GLD'),
(5, 'size', 'M (38)', 0.00, 15, 'FAS-SH-005-M'),
(5, 'size', 'L (40)', 0.00, 15, 'FAS-SH-005-L'),
(5, 'size', 'XL (42)', 0.00, 10, 'FAS-SH-005-XL'),
(6, 'size', '32 Slim', 0.00, 20, 'FAS-JN-006-32'),
(6, 'size', '34 Slim', 0.00, 25, 'FAS-JN-006-34'),
(6, 'size', '36 Slim', 0.00, 10, 'FAS-JN-006-36'),
(7, 'size', 'UK 8', 0.00, 10, 'FAS-FT-007-8'),
(7, 'size', 'UK 9', 0.00, 10, 'FAS-FT-007-9'),
(7, 'size', 'UK 10', 0.00, 5, 'FAS-FT-007-10'),
(10, 'size', 'Queen Size', 0.00, 20, 'HOM-BD-010-Q'),
(10, 'size', 'King Size', 300.00, 18, 'HOM-BD-010-K');

-- -----------------------------------------------------------------------------
-- 6. ADDRESSES
-- -----------------------------------------------------------------------------
INSERT INTO `addresses` (`user_id`, `full_name`, `phone`, `address_line1`, `address_line2`, `landmark`, `city`, `state`, `postal_code`, `country`, `address_type`, `is_default`) VALUES
(2, 'Aarav Patel', '+91 98123 45678', 'Flat 402, Shanti Vihar Apartments', '100 Feet Road, Indiranagar', 'Near Metro Station', 'Bengaluru', 'Karnataka', '560038', 'India', 'home', 1),
(2, 'Aarav Patel', '+91 98123 45678', 'WeWork Galaxy, 43 Residency Rd', 'Shanthala Nagar, Ashok Nagar', 'Opposite Bangalore Club', 'Bengaluru', 'Karnataka', '560025', 'India', 'work', 0),
(3, 'Priya Sharma', '+91 98234 56789', 'B-12, Sector 62', 'Noida Industrial Area', 'Near Fortis Hospital', 'Noida', 'Uttar Pradesh', '201309', 'India', 'home', 1);

-- -----------------------------------------------------------------------------
-- 7. COUPONS
-- -----------------------------------------------------------------------------
INSERT INTO `coupons` (`code`, `description`, `discount_type`, `discount_value`, `min_order_amount`, `max_discount_amount`, `usage_limit`, `times_used`, `valid_until`, `is_active`) VALUES
('WELCOME500', 'Flat ₹500 off on your first order above ₹2,000', 'flat', 500.00, 2000.00, 500.00, 1000, 14, DATE_ADD(NOW(), INTERVAL 90 DAY), 1),
('FESTIVE10', '10% instant discount on orders above ₹1,000 up to ₹1,500', 'percentage', 10.00, 1000.00, 1500.00, 5000, 48, DATE_ADD(NOW(), INTERVAL 60 DAY), 1),
('SAVE20', '20% super saver on premium orders above ₹2,500 up to ₹2,000', 'percentage', 20.00, 2500.00, 2000.00, 500, 23, DATE_ADD(NOW(), INTERVAL 45 DAY), 1),
('FREESHIP', 'Free standard delivery on orders above ₹499', 'flat', 99.00, 499.00, 99.00, 2000, 62, DATE_ADD(NOW(), INTERVAL 30 DAY), 1);

-- -----------------------------------------------------------------------------
-- 8. INITIAL ORDERS & REPORTING SEED
-- -----------------------------------------------------------------------------
INSERT INTO `orders` (`id`, `order_number`, `user_id`, `customer_name`, `customer_email`, `customer_phone`, `shipping_address_line`, `city`, `state`, `postal_code`, `country`, `subtotal`, `discount_amount`, `delivery_charge`, `tax_amount`, `total_amount`, `coupon_code`, `order_status`, `payment_status`, `payment_method`, `created_at`) VALUES
(1, 'ORD-20261001-7891', 2, 'Aarav Patel', 'customer@shopsphere.com', '+91 98123 45678', 'Flat 402, Shanti Vihar Apartments, 100 Feet Road, Indiranagar', 'Bengaluru', 'Karnataka', '560038', 'India', 4999.00, 500.00, 0.00, 809.82, 5308.82, 'WELCOME500', 'delivered', 'paid', 'upi', DATE_SUB(NOW(), INTERVAL 7 DAY)),
(2, 'ORD-20261004-4512', 3, 'Priya Sharma', 'priya.sharma@example.com', '+91 98234 56789', 'B-12, Sector 62, Noida Industrial Area', 'Noida', 'Uttar Pradesh', '201309', 'India', 3799.00, 379.90, 0.00, 615.44, 4034.54, 'FESTIVE10', 'shipped', 'paid', 'card', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(3, 'ORD-20261007-8821', 2, 'Aarav Patel', 'customer@shopsphere.com', '+91 98123 45678', 'Flat 402, Shanti Vihar Apartments, 100 Feet Road, Indiranagar', 'Bengaluru', 'Karnataka', '560038', 'India', 2199.00, 0.00, 99.00, 395.82, 2693.82, NULL, 'confirmed', 'paid', 'upi', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(4, 'ORD-20261008-9934', 3, 'Priya Sharma', 'priya.sharma@example.com', '+91 98234 56789', 'B-12, Sector 62, Noida Industrial Area', 'Noida', 'Uttar Pradesh', '201309', 'India', 1899.00, 0.00, 99.00, 341.82, 2339.82, NULL, 'ordered', 'pending', 'cod', NOW());

INSERT INTO `order_items` (`order_id`, `product_id`, `product_name`, `product_sku`, `product_image`, `variant_info`, `unit_price`, `quantity`, `total_price`) VALUES
(1, 1, 'Aura ANC Wireless Headphones', 'ELE-HP-001', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', 'Midnight Black', 4999.00, 1, 4999.00),
(2, 11, 'Handcrafted Ceramic Stoneware Dinner Set (12-Piece)', 'HOM-DS-011', 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80', 'Natural Slate Glaze', 3799.00, 1, 3799.00),
(3, 6, 'Urban Comfort Indigo Slim Stretch Denim', 'FAS-JN-006', 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80', 'Size 34 Slim', 2199.00, 1, 2199.00),
(4, 17, 'ProGrip Anti-Slip Natural Rubber Yoga Mat', 'SPO-YM-017', 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80', 'Forest Green (6mm)', 1899.00, 1, 1899.00);

INSERT INTO `payments` (`order_id`, `payment_method`, `transaction_reference`, `amount`, `payment_status`, `payment_details`) VALUES
(1, 'upi', 'UPI-TXN-90214811', 5308.82, 'paid', '{"upi_id": "aarav@oksbi", "gateway": "ShopSphere UPI Gateway"}'),
(2, 'card', 'CRD-TXN-88301142', 4034.54, 'paid', '{"card_brand": "Visa", "last4": "4242", "gateway": "ShopSphere Secure Pay"}'),
(3, 'upi', 'UPI-TXN-11983023', 2693.82, 'paid', '{"upi_id": "aarav@okhdfcbank", "gateway": "ShopSphere UPI Gateway"}'),
(4, 'cod', 'COD-PEND-7740192', 2339.82, 'pending', '{"collection_status": "due_on_delivery"}');

-- -----------------------------------------------------------------------------
-- 9. NOTIFICATIONS
-- -----------------------------------------------------------------------------
INSERT INTO `notifications` (`user_id`, `title`, `message`, `type`, `reference_id`) VALUES
(2, 'Order Delivered Successfully!', 'Your order #ORD-20261001-7891 (Aura ANC Headphones) has been delivered. We hope you love it!', 'order', 'ORD-20261001-7891'),
(2, 'New Deal Alert: Up to 40% Off', 'Deals of the day on audio equipment and smart wearables are now live. Explore trending items today.', 'promo', 'deal-of-day'),
(3, 'Order Shipped!', 'Your order #ORD-20261004-4512 has shipped via BlueDart Express. Track your shipment in order details.', 'order', 'ORD-20261004-4512');

-- -----------------------------------------------------------------------------
-- 10. REVIEWS
-- -----------------------------------------------------------------------------
INSERT INTO `reviews` (`product_id`, `user_id`, `rating`, `title`, `comment`, `is_verified_purchase`) VALUES
(1, 2, 5, 'Best ANC headphones in this segment!', 'The noise cancellation is shockingly good for flights and coffee shops. Bass is punchy without overpowering the vocals. Battery easily lasts 4-5 days of heavy use.', 1),
(1, 3, 5, 'Super comfortable memory foam', 'The ear cushions do not press hard on glasses. Quick charge feature gave me 5 hours of playtime with just a 15-minute charge.', 1),
(5, 2, 4, 'Crisp linen quality', 'Very breathable for Indian summers. Beautiful drape and quality stitch work. Recommended to size up if you like a relaxed look.', 1),
(11, 3, 5, 'Stunning dinnerware set', 'The matte stoneware glaze looks ultra luxurious on the dining table. Survived multiple dishwasher runs without any chipping.', 1);

-- -----------------------------------------------------------------------------
-- 11. CARTS & WISHLISTS INITIAL SETUP
-- -----------------------------------------------------------------------------
INSERT INTO `carts` (`id`, `user_id`) VALUES (1, 2), (2, 3);
INSERT INTO `cart_items` (`cart_id`, `product_id`, `quantity`) VALUES
(1, 4, 1);

INSERT INTO `wishlists` (`id`, `user_id`) VALUES (1, 2), (2, 3);
INSERT INTO `wishlist_items` (`wishlist_id`, `product_id`) VALUES
(1, 8),
(1, 13);
