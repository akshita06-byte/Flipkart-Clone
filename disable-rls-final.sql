-- Disable RLS on all tables completely
ALTER TABLE IF EXISTS public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.order_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.products DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS users_policy ON public.users;
DROP POLICY IF EXISTS orders_policy ON public.orders;
DROP POLICY IF EXISTS order_items_policy ON public.order_items;
DROP POLICY IF EXISTS products_policy ON public.products;
DROP POLICY IF EXISTS "Enable access for all users" ON public.users;
DROP POLICY IF EXISTS "Enable access for all users" ON public.orders;
DROP POLICY IF EXISTS "Enable access for all users" ON public.order_items;
DROP POLICY IF EXISTS "Enable access for all users" ON public.products;

-- Verify RLS is disabled
SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND rowsecurity = true;
