-- Allow guest checkout by updating orders policies
DROP POLICY IF EXISTS "Users can create their own orders" ON public.orders;
CREATE POLICY "Anyone can create orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);

-- Update order_items policy for guest checkout
DROP POLICY IF EXISTS "Users can insert their own order items" ON public.order_items;
CREATE POLICY "Anyone can insert order items" 
ON public.order_items 
FOR INSERT 
WITH CHECK (true);

-- Allow admins to view all order items
CREATE POLICY "Admins can view all order items" 
ON public.order_items 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));