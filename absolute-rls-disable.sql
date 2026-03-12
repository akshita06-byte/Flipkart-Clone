-- Absolutely disable RLS on all tables
ALTER TABLE "public"."users" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."orders" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."order_items" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."products" DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "allow_insert_for_authenticated_users" ON "public"."orders";
DROP POLICY IF EXISTS "allow_select_own_orders" ON "public"."orders";
DROP POLICY IF EXISTS "allow_insert_own_items" ON "public"."order_items";
DROP POLICY IF EXISTS "allow_select_own_items" ON "public"."order_items";
DROP POLICY IF EXISTS "allow_select_products" ON "public"."products";
DROP POLICY IF EXISTS "allow_insert_products_admin" ON "public"."products";
DROP POLICY IF EXISTS "allow_delete_products_admin" ON "public"."products";
DROP POLICY IF EXISTS "allow_select_own_user" ON "public"."users";

-- Verify RLS is disabled
SELECT schemaname, tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';
