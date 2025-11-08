const { body } = require('express-validator');
const authData = require('../dummyData/authData');
const { handleValidationErrors } = require('../middlewares/validationMiddlewares');

// Auth-specific validator: Validate email format
const validateEmailFormat = [
  body('email')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  handleValidationErrors
];

// Auth-specific validator: Check email availability (no duplicate emails)
const checkEmailAvailability = (req, res, next) => {
  const { email } = req.body;
  
  const existingUser = authData.findUserByEmail(email);
  
  if (existingUser) {
    return res.status(409).json({
      status: 409,
      message: 'user exist with the given email',
      data: {}
    });
  }
  
  next();
};

module.exports = {
  validateEmailFormat,
  checkEmailAvailability
};
