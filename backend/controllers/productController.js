import supabase from '../supabaseClient.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res, next) => {
  const { data, error } = await supabase
    .from('products')
    .select('*');

  if (error) {
    return next(new ErrorResponse(error.message, 500));
  }

  res.status(200).json({
    success: true,
    count: data.length,
    data
  });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return next(new ErrorResponse('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    data
  });
});

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Admin)
export const createProduct = asyncHandler(async (req, res, next) => {
  const { name, description, price, stock, image_url } = req.body;

  const { data, error } = await supabase
    .from('products')
    .insert([
      { name, description, price, stock, image_url }
    ])
    .select();

  if (error) {
    return next(new ErrorResponse(error.message, 400));
  }

  res.status(201).json({
    success: true,
    data: data[0]
  });
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Admin)
export const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select();

  if (error) {
    return next(new ErrorResponse(error.message, 400));
  }

  if (data.length === 0) {
    return next(new ErrorResponse('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    data: data[0]
  });
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Admin)
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    return next(new ErrorResponse(error.message, 400));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
