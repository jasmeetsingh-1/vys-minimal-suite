const express = require('express');
const router = express.Router();
const authData = require('../../dummyData/authData');
const { checkAllFieldsFilled } = require('../../middlewares/validationMiddlewares');
const { validateEmailFormat } = require('../../validators/authValidator');

// POST /vys/auth/login
// Description: User login
// Middlewares: checkAllFieldsFilled -> validateEmailFormat
router.post(
  '/login',
  checkAllFieldsFilled(['email', 'password']),
  validateEmailFormat,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = authData.findUserByEmail(email);

      // Check if user exists
      if (!user) {
        return res.status(404).json({
          status: 404,
          message: 'User not found with the given email',
          data: {}
        });
      }

      // Match encoded password
      if (user.passwordEncoded !== password) {
        return res.status(401).json({
          status: 401,
          message: 'Invalid credentials',
          data: {}
        });
      }

      // Login successful
      return res.status(200).json({
        status: 200,
        message: 'success!! user logged in successful',
        data: {
          userId: user.userID
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({
        status: 500,
        message: 'Internal server error during login',
        data: {}
      });
    }
  }
);

module.exports = router;
