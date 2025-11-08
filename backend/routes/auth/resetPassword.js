const express = require('express');
const router = express.Router();
const authData = require('../../dummyData/authData');
const resetPasswordData = require('../../dummyData/dummyResetPassword');
const { checkAllFieldsFilled } = require('../../middlewares/validationMiddlewares');
const { validateEmailFormat } = require('../../validators/authValidator');

// POST /vys/auth/reset-password
// Description: Reset user password with valid token
// Middlewares: checkAllFieldsFilled -> validateEmailFormat
router.post(
  '/reset-password',
  checkAllFieldsFilled(['email', 'userId', 'token', 'newPasswordEncoded']),
  validateEmailFormat,
  async (req, res) => {
    try {
      const { email, userId, token, newPasswordEncoded } = req.body;

      // Step 1: All fields are already validated by middleware

      // Step 2: Validate that email and userId match in auth table
      const user = authData.findUserByEmail(email);
      
      if (!user) {
        return res.status(404).json({
          status: 404,
          message: 'User not found with the given email',
          data: {}
        });
      }

      if (user.userID !== userId) {
        return res.status(400).json({
          status: 400,
          message: 'Email and userId do not match',
          data: {}
        });
      }

      // Step 3: Check that we have a valid token entry for the given email and userId
      const validToken = resetPasswordData.findValidToken(email, userId, token);

      if (!validToken) {
        return res.status(401).json({
          status: 401,
          message: 'Invalid or expired reset token',
          data: {}
        });
      }

      // Step 4: Update the password in authData
      const passwordUpdated = authData.updatePassword(email, userId, newPasswordEncoded);

      if (!passwordUpdated) {
        return res.status(500).json({
          status: 500,
          message: 'Failed to update password',
          data: {}
        });
      }

      // Step 5: Invalidate the token (set isValid to false)
      resetPasswordData.invalidateToken(email, userId, token);

      // Return success response
      return res.status(200).json({
        status: 200,
        message: 'success!! Password reset successfully',
        data: {
          userId: userId
        }
      });

    } catch (error) {
      console.error('Reset password error:', error);
      return res.status(500).json({
        status: 500,
        message: 'Internal server error during password reset',
        data: {}
      });
    }
  }
);

module.exports = router;

