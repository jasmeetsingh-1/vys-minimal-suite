const { validationResult } = require('express-validator');

// Reusable middleware to handle validation errors from express-validator
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg).join(', ');
    return res.status(400).json({
      status: 400,
      message: errorMessages,
      data: {}
    });
  }
  next();
};

// Reusable middleware: Check all required fields are filled
// Usage: checkAllFieldsFilled(['field1', 'field2', 'field3'])
const checkAllFieldsFilled = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = [];
    
    requiredFields.forEach(field => {
      if (!req.body[field] || (typeof req.body[field] === 'string' && req.body[field].trim() === '')) {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      return res.status(400).json({
        status: 400,
        message: `Missing or empty required fields: ${missingFields.join(', ')}`,
        data: {}
      });
    }

    next();
  };
};

module.exports = {
  handleValidationErrors,
  checkAllFieldsFilled
};

