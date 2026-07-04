/**
 * Password strength rules check:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one digit
 * - At least one special character
 */
const isValidPassword = (password) => {
  if (!password || password.length < 8) return false;
  
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return hasUpperCase && hasLowerCase && hasDigit && hasSpecial;
};

/**
 * Validate Organization and Admin Signup
 */
const validateOrgSignup = (req, res, next) => {
  const { company_name, name, email, password } = req.body;

  if (!company_name || !company_name.trim()) {
    return res.status(400).json({ success: false, error: 'Company name is required' });
  }
  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, error: 'Admin name is required' });
  }
  if (!email || !email.trim()) {
    return res.status(400).json({ success: false, error: 'Admin email is required' });
  }
  
  // Basic email pattern regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email address format' });
  }

  if (!password || !isValidPassword(password)) {
    return res.status(400).json({
      success: false,
      error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    });
  }

  next();
};

/**
 * Validate Employee Profile Activation (Sign Up)
 */
const validateEmployeeSignup = (req, res, next) => {
  const { employee_id, email, password, role } = req.body;

  if (!employee_id || !employee_id.trim()) {
    return res.status(400).json({ success: false, error: 'Employee ID is required' });
  }
  if (!email || !email.trim()) {
    return res.status(400).json({ success: false, error: 'Email is required' });
  }
  if (!role || !['Employee', 'HR'].includes(role)) {
    return res.status(400).json({ success: false, error: 'Invalid role. Must be Employee or HR' });
  }
  if (!password || !isValidPassword(password)) {
    return res.status(400).json({
      success: false,
      error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    });
  }

  next();
};

/**
 * Validate Employee Onboarding (HR/Admin creates new profile)
 */
const validateEmployeeOnboard = (req, res, next) => {
  const { name, email, role } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, error: 'Employee name is required' });
  }
  if (!email || !email.trim()) {
    return res.status(400).json({ success: false, error: 'Employee email is required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email address format' });
  }

  if (!role || !['Admin', 'HR', 'Employee'].includes(role)) {
    return res.status(400).json({ success: false, error: 'Invalid role. Must be Admin, HR, or Employee' });
  }

  next();
};

module.exports = {
  validateOrgSignup,
  validateEmployeeSignup,
  validateEmployeeOnboard,
  isValidPassword
};
