const express = require('express');
const router = express.Router();
const productDetailsData = require('../../dummyData/dummyProductDetails');
const { checkAllFieldsFilled } = require('../../middlewares/validationMiddlewares');

// POST /vys/data/products/availability
// Description: Update product availability status
// Middlewares: checkAllFieldsFilled
router.post(
  '/products/availability',
  checkAllFieldsFilled(['pId', 'availability']),
  async (req, res) => {
    try {
      const { pId, availability } = req.body;

      // Validate that availability is a boolean
      if (typeof availability !== 'boolean') {
        return res.status(400).json({
          status: 400,
          message: 'availability must be a boolean value (true or false)',
          data: {}
        });
      }

      // Step 2: Validate that pId exists in product_details_table
      const product = productDetailsData.findByProductId(pId);
      
      if (!product) {
        return res.status(404).json({
          status: 404,
          message: 'Product with given pId not found',
          data: {}
        });
      }

      // Step 3: Update the product's availability
      const updatedProduct = productDetailsData.updateAvailability(pId, availability);

      // Return success response
      return res.status(200).json({
        status: 200,
        message: 'success!! Product availability updated successfully',
        data: {
          pId: updatedProduct.pId,
          availability: updatedProduct.availability
        }
      });

    } catch (error) {
      console.error('Update availability error:', error);
      return res.status(500).json({
        status: 500,
        message: 'Internal server error while updating availability',
        data: {}
      });
    }
  }
);

module.exports = router;

