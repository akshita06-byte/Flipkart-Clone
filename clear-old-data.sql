-- Clear old demo data and ensure RLS is disabled
-- This script clears any demo orders and ensures we can insert new ones

-- Disable RLS on all tables for development
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Delete old orders with "user-1" to reset
DELETE FROM order_items WHERE order_id IN (
  SELECT id FROM orders WHERE user_id = 'user-1' OR user_id LIKE 'user-%' OR user_id LIKE 'admin-%'
);

DELETE FROM orders WHERE user_id = 'user-1' OR user_id LIKE 'user-%' OR user_id LIKE 'admin-%';

-- Verify the tables are clean
SELECT COUNT(*) as order_count FROM orders;
SELECT COUNT(*) as order_item_count FROM order_items;
