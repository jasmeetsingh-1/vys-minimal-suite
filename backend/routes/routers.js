const express = require('express');
const router = express.Router();

// Import route modules
const signupRoutes = require('./auth/signup');
const loginRoutes = require('./auth/login');
const usersRoutes = require('./auth/users');
const resetPasswordRoutes = require('./auth/resetPassword');
const ecommerceRoutes = require('./e-commerceData/e-commerceAPI');

// Import product routes
const getProductDetailsRoutes = require('./e-commerceData/getProductDetails');
const createProductRoutes = require('./e-commerceData/createProduct');
const updateAvailabilityRoutes = require('./e-commerceData/updateAvailability');

// Mount auth routes
router.use('/auth', signupRoutes);
router.use('/auth', loginRoutes);
router.use('/auth', usersRoutes);
router.use('/auth', resetPasswordRoutes);

// Mount e-commerce routes
router.use('/ecommerce', ecommerceRoutes);

// Mount product data routes
router.use('/data', getProductDetailsRoutes);
router.use('/data', createProductRoutes);
router.use('/data', updateAvailabilityRoutes);

module.exports = router;

