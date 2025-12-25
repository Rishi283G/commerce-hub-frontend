import supabase from '../supabaseClient.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Get current user's cart
// @route   GET /api/cart
// @access  Private
export const getCart = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  // Find order with status 'cart'
  const { data: cart, error } = await supabase
    .from('orders')
    .select(`
      *,
      items:order_items (
        *,
        product:products (*)
      )
    `)
    .eq('user_id', userId)
    .eq('status', 'cart')
    .maybeSingle();

  if (error) {
    return next(new ErrorResponse(error.message, 500));
  }

  if (!cart) {
    return res.status(200).json({ success: true, data: { items: [] } });
  }

  // Calculate total on the fly for display
  let calculatedTotal = 0;
  if (cart.items) {
    cart.items.forEach(item => {
      calculatedTotal += item.price * item.quantity;
    });
  }

  res.status(200).json({
    success: true,
    data: { ...cart, total_price: calculatedTotal }
  });
});

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
export const addToCart = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;
  const qty = quantity || 1;

  if (!productId) {
    return next(new ErrorResponse('Please provide a separate productId', 400));
  }

  // 1. Get Product Price
  const { data: product, error: prodError } = await supabase
    .from('products')
    .select('price')
    .eq('id', productId)
    .single();

  if (prodError || !product) {
    return next(new ErrorResponse('Product not found', 404));
  }

  // 2. Get or Create Cart
  let { data: cart, error: cartError } = await supabase
    .from('orders')
    .select('id')
    .eq('user_id', userId)
    .eq('status', 'cart')
    .maybeSingle();

  if (cartError) {
    return next(new ErrorResponse(cartError.message, 500));
  }

  if (!cart) {
    const { data: newCart, error: createError } = await supabase
      .from('orders')
      .insert([{ user_id: userId, status: 'cart', total_price: 0 }])
      .select()
      .single();

    if (createError) {
      return next(new ErrorResponse(createError.message, 500));
    }
    cart = newCart;
  }

  // 3. Check if item exists in cart
  const { data: existingItem, error: itemError } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', cart.id)
    .eq('product_id', productId)
    .maybeSingle();

  if (itemError) {
    return next(new ErrorResponse(itemError.message, 500));
  }

  if (existingItem) {
    // Update quantity
    const newQuantity = existingItem.quantity + qty;
    const { error: updateError } = await supabase
      .from('order_items')
      .update({ quantity: newQuantity })
      .eq('id', existingItem.id);

    if (updateError) {
      return next(new ErrorResponse(updateError.message, 500));
    }
  } else {
    // Insert new item
    const { error: insertError } = await supabase
      .from('order_items')
      .insert({
        order_id: cart.id,
        product_id: productId,
        quantity: qty,
        price: product.price // snapshot price
      });

    if (insertError) {
      return next(new ErrorResponse(insertError.message, 500));
    }
  }

  res.status(200).json({ success: true, message: 'Item added to cart' });
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove
// @access  Private
export const removeFromCart = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { productId } = req.body; 
  
  const targetProductId = productId || req.query.productId;

  if (!targetProductId) {
    return next(new ErrorResponse('Please provide productId', 400));
  }

  const { data: cart, error: cartError } = await supabase
    .from('orders')
    .select('id')
    .eq('user_id', userId)
    .eq('status', 'cart')
    .maybeSingle();

  if (cartError || !cart) {
    return next(new ErrorResponse('Cart not found', 404));
  }

  const { error: deleteError } = await supabase
    .from('order_items')
    .delete()
    .eq('order_id', cart.id)
    .eq('product_id', targetProductId);

  if (deleteError) {
    return next(new ErrorResponse(deleteError.message, 500));
  }

  res.status(200).json({ success: true, message: 'Item removed from cart' });
});
