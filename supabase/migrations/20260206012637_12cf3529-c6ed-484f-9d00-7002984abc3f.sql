-- Fix: Ensure INSERT policies on orders and order_items are PERMISSIVE (not RESTRICTIVE)
-- Drop existing INSERT policies
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
DROP POLICY IF EXISTS "Anyone can insert order items" ON public.order_items;

-- Recreate as explicitly PERMISSIVE
CREATE POLICY "Anyone can create orders" 
ON public.orders 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Anyone can insert order items" 
ON public.order_items 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);
