const { customAlphabet } = require('nanoid');

// Generate a 14-character unique user ID
const generateUserId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 14);

// Generate a unique order ID (can be used later for orders)
const generateOrderId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 16);

// Generate a unique product ID (can be used later for products)
const generateProductId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 12);

// Generate a 24-character unique reset password token (alphanumeric)
const generateResetToken = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 24);

// Generate a 5-character unique product ID (numeric)
const generateProductDetailId = customAlphabet('0123456789', 5);

// Get product type details by pTypeId
const getProductTypeDetails = (pTypeId) => {
  console.log("this is the product Type id >>>", pTypeId);
  const productTypeData = require('../dummyData/dummyProductTypeTable');
  return productTypeData.findByTypeId(pTypeId) || null;
};

module.exports = {
  generateUserId,
  generateOrderId,
  generateProductId,
  generateResetToken,
  generateProductDetailId,
  getProductTypeDetails
};

