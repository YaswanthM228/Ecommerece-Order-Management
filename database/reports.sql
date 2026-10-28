-- =============================================================================
-- SHOPSPHERE SQL REPORTING QUERIES
-- Aggregate analytics using SUM(), COUNT(), GROUP BY, and JOINs
-- =============================================================================

USE `shopsphere_db`;

-- 1. OVERALL KPI METRICS
-- Total revenue, total orders placed, completed orders, and active customers
SELECT 
    COUNT(DISTINCT o.id) AS total_orders,
    COALESCE(SUM(CASE WHEN o.order_status != 'cancelled' THEN o.total_amount ELSE 0 END), 0) AS total_revenue,
    COUNT(DISTINCT CASE WHEN o.order_status = 'delivered' THEN o.id END) AS delivered_orders,
    COUNT(DISTINCT o.user_id) AS purchasing_customers,
    COALESCE(AVG(CASE WHEN o.order_status != 'cancelled' THEN o.total_amount END), 0) AS average_order_value
FROM orders o;

-- 2. SALES AND REVENUE BY CATEGORY
-- Demonstrating SUM, COUNT, and GROUP BY with multi-table JOIN
SELECT 
    c.id AS category_id,
    c.name AS category_name,
    COUNT(DISTINCT oi.order_id) AS total_orders_count,
    SUM(oi.quantity) AS total_units_sold,
    COALESCE(SUM(oi.total_price), 0) AS gross_sales_amount
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.id AND o.order_status != 'cancelled'
GROUP BY c.id, c.name
ORDER BY gross_sales_amount DESC;

-- 3. DAILY REVENUE SUMMARY (PAST 30 DAYS)
SELECT 
    DATE(o.created_at) AS sale_date,
    COUNT(o.id) AS orders_count,
    SUM(o.subtotal) AS daily_subtotal,
    SUM(o.discount_amount) AS daily_discounts,
    SUM(o.tax_amount) AS daily_tax,
    SUM(o.total_amount) AS daily_net_revenue
FROM orders o
WHERE o.order_status != 'cancelled'
  AND o.created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
GROUP BY DATE(o.created_at)
ORDER BY sale_date DESC;

-- 4. ORDER STATUS BREAKDOWN
SELECT 
    o.order_status,
    COUNT(o.id) AS order_count,
    SUM(o.total_amount) AS aggregate_amount,
    ROUND((COUNT(o.id) / (SELECT COUNT(*) FROM orders)) * 100, 2) AS percentage_of_total
FROM orders o
GROUP BY o.order_status
ORDER BY order_count DESC;

-- 5. TOP SELLING PRODUCTS
SELECT 
    p.id AS product_id,
    p.name AS product_name,
    p.brand,
    c.name AS category,
    p.stock_quantity AS current_stock,
    COALESCE(SUM(oi.quantity), 0) AS total_quantity_sold,
    COALESCE(SUM(oi.total_price), 0) AS total_revenue_generated
FROM products p
JOIN categories c ON p.category_id = c.id
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.id AND o.order_status != 'cancelled'
GROUP BY p.id, p.name, p.brand, c.name, p.stock_quantity
ORDER BY total_quantity_sold DESC
LIMIT 10;

-- 6. LOW INVENTORY ALERT
SELECT 
    p.id,
    p.sku,
    p.name,
    c.name AS category,
    p.stock_quantity,
    CASE 
        WHEN p.stock_quantity = 0 THEN 'Out of Stock'
        WHEN p.stock_quantity <= 20 THEN 'Low Stock Critical'
        ELSE 'Healthy'
    END AS stock_status
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.stock_quantity <= 25
ORDER BY p.stock_quantity ASC;

-- 7. DETAILED INVOICE JOIN QUERY (Used by invoice generator)
-- Param: o.id = ?
SELECT 
    o.id AS order_id,
    o.order_number,
    o.created_at AS order_date,
    o.order_status,
    o.payment_status,
    o.payment_method,
    o.customer_name,
    o.customer_email,
    o.customer_phone,
    o.shipping_address_line,
    o.city,
    o.state,
    o.postal_code,
    o.country,
    o.subtotal,
    o.discount_amount,
    o.delivery_charge,
    o.tax_amount,
    o.total_amount,
    o.coupon_code,
    oi.id AS item_id,
    oi.product_id,
    oi.product_name,
    oi.product_sku,
    oi.variant_info,
    oi.unit_price,
    oi.quantity,
    oi.total_price,
    p.transaction_reference,
    p.payment_details
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
LEFT JOIN payments p ON o.id = p.order_id
WHERE o.id = 1;
