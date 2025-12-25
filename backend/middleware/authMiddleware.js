import supabase from '../supabaseClient.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

// Protect routes - Verify JWT token
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      console.error('Auth Error:', error);
      return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Auth Exception:', err);
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});

// Grant access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    // Check user_metadata for role. Default to 'user' if not present.
    const userRole = req.user.user_metadata && req.user.user_metadata.role ? req.user.user_metadata.role : 'user';
    
    if (!roles.includes(userRole)) {
      return next(
        new ErrorResponse(
          `User role ${userRole} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
