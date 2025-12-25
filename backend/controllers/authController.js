import supabaseAuth from '../utils/supabaseAuthClient.js';
import supabaseAdmin from '../utils/supabaseAdminClient.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Security: Default to 'user' role
  const userRole = 'user'; 

  // Use supabaseAdmin to allow setting metadata/roles securely if needed (or just following user instruction)
  const { data, error } = await supabaseAdmin.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: userRole
      }
    }
  });

  if (error) {
    return next(new ErrorResponse(error.message, 400));
  }

  res.status(201).json({
    success: true,
    message: 'Registration successful. Please check your email for verification if enabled.',
    user: data.user,
    session: data.session
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Use supabaseAuth for login (requires Anon key)
  const { data, error } = await supabaseAuth.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return next(new ErrorResponse(error.message, 401));
  }

  res.status(200).json({
    success: true,
    user: data.user,
    token: data.session.access_token
  });
});
