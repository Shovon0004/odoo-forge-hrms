const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');

/**
 * Protect routes - Authentication Guard
 */
const protect = async (req, res, next) => {
  try {
    let token;

    // Check for authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get employee from database
    const employee = await Employee.findById(decoded.id);
    if (!employee) {
      return res.status(401).json({ success: false, error: 'User no longer exists' });
    }

    // Attach user to req object
    req.user = employee;
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    return res.status(401).json({ success: false, error: 'Not authorized, token failed' });
  }
};

/**
 * Restrict to specific roles - RBAC Guard
 */
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Role (${req.user ? req.user.role : 'Guest'}) is not allowed to access this resource`
      });
    }
    next();
  };
};

module.exports = { protect, restrictTo };
