import supabase from '../supabaseClient.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Checkout cart to create an order
// @route   POST /api/orders
// @access  Private
export const createOrder = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  // 1. Get Cart
  const { data: cart, error: cartError } = await supabase
    .from('orders')
    .select(`
      *,
      items:order_items (
        quantity,
        price
      )
    `)
    .eq('user_id', userId)
    .eq('status', 'cart')
    .maybeSingle();

  if (cartError) {
    return next(new ErrorResponse(cartError.message, 500));
  }

  if (!cart) {
    return next(new ErrorResponse('No active cart found to checkout', 400));
  }

  if (!cart.items || cart.items.length === 0) {
    return next(new ErrorResponse('Cart is empty', 400));
  }

  // 2. Calculate Final Total
  let total = 0;
  cart.items.forEach(item => {
    total += item.price * item.quantity;
  });

  // 3. Update Order status to 'pending' (or 'placed')
  const { data: order, error: updateError } = await supabase
    .from('orders')
    .update({ 
      status: 'pending',
      total_price: total,
    })
    .eq('id', cart.id)
    .select()
    .single();

  if (updateError) {
    return next(new ErrorResponse(updateError.message, 500));
  }

  res.status(201).json({
    success: true,
    message: 'Order placed successfully',
    data: order
  });
});

// @desc    Get logged-in user's orders
// @route   GET /api/orders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      items:order_items (
        *,
        product:products (name, image_url)
      )
    `)
    .eq('user_id', userId)
    .neq('status', 'cart') // Exclude active carts
    .order('created_at', { ascending: false });

  if (error) {
    return next(new ErrorResponse(error.message, 500));
  }

  res.status(200).json({
    success: true,
    count: data.length,
    data
  });
});

// @desc    Get all orders (Admin)
// @route   GET /api/admin/orders
// @access  Private (Admin)
export const getAllOrders = asyncHandler(async (req, res, next) => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      items:order_items (
        *,
        product:products (name)
      )
    `)
    .neq('status', 'cart')
    .order('created_at', { ascending: false });

  if (error) {
    return next(new ErrorResponse(error.message, 500));
  }

  res.status(200).json({
    success: true,
    count: data.length,
    data
  });
});
