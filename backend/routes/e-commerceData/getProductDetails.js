const express = require('express');
const router = express.Router();
const productDetailsData = require('../../dummyData/dummyProductDetails');
const { getProductTypeDetails } = require('../../utilities/helpers');

// GET /vys/data/products?typeId=
// Description: Get all products by typeId, or all products if no typeId provided
router.get('/products', (req, res) => {
  try {
    const { typeId } = req.query;

    // If no typeId provided, return all products
    if (!typeId) {
      const allProducts = productDetailsData.getAllProducts();
      return res.status(200).json({
        status: 200,
        message: 'success!! All products fetched successfully',
        data: allProducts
      });
    }

    // Validate that typeId exists in product_type_table
    const productType = getProductTypeDetails(typeId);
    
    if (!productType) {
      return res.status(404).json({
        status: 404,
        message: 'Invalid or missing typeId parameter',
        data: []
      });
    }

    // Fetch all products with matching pTypeId
    const products = productDetailsData.findByTypeId(typeId);

    return res.status(200).json({
      status: 200,
      message: 'success!! Products fetched successfully',
      data: products
    });

  } catch (error) {
    console.error('Get product details error:', error);
    return res.status(500).json({
      status: 500,
      message: 'Internal server error while fetching products',
      data: []
    });
  }
});

module.exports = router;

