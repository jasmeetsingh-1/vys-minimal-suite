const express = require('express');
const router = express.Router();
const productDetailsData = require('../../dummyData/dummyProductDetails');
const productTypeData = require('../../dummyData/dummyProductTypeTable');
const { checkAllFieldsFilled } = require('../../middlewares/validationMiddlewares');
const { generateProductDetailId } = require('../../utilities/helpers');

// POST /vys/data/products/create
// Description: Create a new product entry
// Middlewares: checkAllFieldsFilled
router.post(
  '/products/create',
  checkAllFieldsFilled(['pSubTypeId', 'pSubTypeName', 'pTypeId', 'pTypeName', 'pName', 'pCost', 'pDescription']),
  async (req, res) => {
    try {
      const { 
        pSubTypeId, 
        pSubTypeName, 
        pTypeId, 
        pTypeName, 
        pName, 
        pCost, 
        pDescription, 
        availability 
      } = req.body;

      // Step 2: Validate that pTypeId exists in product_type_table
      const productType = productTypeData.findByTypeId(pTypeId);
      
      if (!productType) {
        return res.status(404).json({
          status: 404,
          message: 'Invalid pTypeId - Product type does not exist',
          data: {}
        });
      }

      // Step 3: Validate that pSubTypeId belongs to that pTypeId
      const isValidSubType = productTypeData.validateSubTypeForType(pTypeId, pSubTypeId);
      
      if (!isValidSubType) {
        return res.status(400).json({
          status: 400,
          message: 'Invalid pSubTypeId - Subtype does not belong to the specified product type',
          data: {}
        });
      }

      // Step 4: Generate a unique 5-character pId
      const pId = generateProductDetailId();

      // Step 5: Create new product object
      const newProduct = {
        pId: pId,
        pSubTypeDetails: {
          pSubTypeId: pSubTypeId,
          pSubTypeName: pSubTypeName
        },
        pTypeDetails: {
          pTypeId: pTypeId,
          pTypeName: pTypeName
        },
        pName: pName,
        pCost: pCost,
        pDescription: pDescription,
        availability: availability !== undefined ? availability : true
      };

      // Step 6: Add product to dummyProductDetails
      productDetailsData.addProduct(newProduct);

      // Return success response
      return res.status(200).json({
        status: 200,
        message: 'success!! Product added successfully',
        data: newProduct
      });

    } catch (error) {
      console.error('Create product error:', error);
      return res.status(500).json({
        status: 500,
        message: 'Internal server error while creating product',
        data: {}
      });
    }
  }
);

module.exports = router;

