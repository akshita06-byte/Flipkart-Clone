-- Complete reset and RLS disable for all tables
-- Drop all RLS policies
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON users;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON users;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON users;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON orders;
DROP POLICY IF EXISTS "Enable insert for authenticated users on orders" ON orders;
DROP POLICY IF EXISTS "Enable update for authenticated users on orders" ON orders;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON order_items;
DROP POLICY IF EXISTS "Enable insert for authenticated users on order_items" ON order_items;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON products;
DROP POLICY IF EXISTS "Enable insert for authenticated users on products" ON products;
DROP POLICY IF EXISTS "Enable update for authenticated users on products" ON products;
DROP POLICY IF EXISTS "Enable delete for authenticated users on products" ON products;

-- Disable RLS on all tables
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Clear all data
TRUNCATE TABLE order_items CASCADE;
TRUNCATE TABLE orders CASCADE;
TRUNCATE TABLE products CASCADE;
TRUNCATE TABLE users CASCADE;

-- Verify RLS is disabled
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename IN ('users', 'orders', 'order_items', 'products');
