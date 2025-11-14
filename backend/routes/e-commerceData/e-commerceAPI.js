const express = require('express');
const router = express.Router();
const productTypeData = require('../../dummyData/dummyProductTypeTable');

// GET /vys/ecommerce/product-types
// Description: Fetch all product types along with their subtypes
router.get('/product-types', (req, res) => {
  try {
    const productTypes = productTypeData.getAllProductTypes();

    return res.status(200).json({
      status: 200,
      message: 'success!! Product types fetched successfully',
      data: productTypes
    });
  } catch (error) {
    console.error('Get product types error:', error);
    return res.status(500).json({
      status: 500,
      message: 'Internal server error while fetching product types',
      data: []
    });
  }
});

// GET /vys/ecommerce/product-types/:typeId/subtypes
// Description: Fetch subtypes for a given product type
router.get('/product-types/:typeId/subtypes', (req, res) => {
  try {
    const { typeId } = req.params;

    if (!typeId) {
      return res.status(400).json({
        status: 400,
        message: 'typeId parameter is required',
        data: []
      });
    }

    const productType = productTypeData.findByTypeId(typeId);

    if (!productType) {
      return res.status(404).json({
        status: 404,
        message: 'Invalid typeId parameter',
        data: []
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'success!! Product subtypes fetched successfully',
      data: productType.subTypes
    });
  } catch (error) {
    console.error('Get product subtypes error:', error);
    return res.status(500).json({
      status: 500,
      message: 'Internal server error while fetching product subtypes',
      data: []
    });
  }
});

module.exports = router;

