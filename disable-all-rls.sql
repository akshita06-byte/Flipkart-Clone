-- Disable RLS on all tables
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Drop all RLS policies
DROP POLICY IF EXISTS "Allow users to view their own order items" ON order_items;
DROP POLICY IF EXISTS "Allow users to insert their own orders" ON orders;
DROP POLICY IF EXISTS "Allow users to view their own orders" ON orders;
DROP POLICY IF EXISTS "Everyone can view products" ON products;
DROP POLICY IF EXISTS "Only admins can delete products" ON products;
DROP POLICY IF EXISTS "Only admins can insert products" ON products;
DROP POLICY IF EXISTS "Only admins can update products" ON products;
