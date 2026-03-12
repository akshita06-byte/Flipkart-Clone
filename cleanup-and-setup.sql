-- Disable RLS on all tables first
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Drop existing RLS policies if any
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Users can insert their own data" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;
DROP POLICY IF EXISTS "Users can delete their own data" ON users;

DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
DROP POLICY IF EXISTS "Users can insert their own orders" ON orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON orders;
DROP POLICY IF EXISTS "Users can delete their own orders" ON orders;

DROP POLICY IF EXISTS "Anyone can view order items" ON order_items;
DROP POLICY IF EXISTS "Users can insert order items" ON order_items;

DROP POLICY IF EXISTS "Anyone can view products" ON products;
DROP POLICY IF EXISTS "Admins can insert products" ON products;
DROP POLICY IF EXISTS "Admins can update products" ON products;
DROP POLICY IF EXISTS "Admins can delete products" ON products;

-- Clear all existing data
TRUNCATE TABLE order_items CASCADE;
TRUNCATE TABLE orders CASCADE;
TRUNCATE TABLE products CASCADE;
TRUNCATE TABLE users CASCADE;

-- Create demo users
INSERT INTO users (id, email, name, phone, is_admin) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'demo@flipkart.com', 'Demo User', '+91 9999999999', false),
('550e8400-e29b-41d4-a716-446655440001', 'admin@flipkart.com', 'Admin', '+91 9999999999', true);
