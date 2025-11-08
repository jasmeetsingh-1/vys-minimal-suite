const express = require('express');
const router = express.Router();
const authData = require('../../dummyData/authData');
const { generateUserId } = require('../../utilities/helpers');
const { checkAllFieldsFilled } = require('../../middlewares/validationMiddlewares');
const {
  validateEmailFormat,
  checkEmailAvailability
} = require('../../validators/authValidator');

// Test route to verify auth routes are mounted
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes are working!' });
});

// POST /vys/auth/new-signup
// Description: Create new user account
// Middlewares: checkAllFieldsFilled -> validateEmailFormat -> checkEmailAvailability
router.post(
  '/new-signup',
  checkAllFieldsFilled(['email', 'passwordEncoded', 'name']),
  validateEmailFormat,
  checkEmailAvailability,
  async (req, res) => {
    try {
      const { email, passwordEncoded, name } = req.body;
      console.log("insde")

      // Generate 14-character userId
      const userID = generateUserId();

      // Create user object following the exact schema
      const newUser = {
        userID: userID,
        email: email,
        passwordEncoded: passwordEncoded,
        name: name
      };

      // Add user to dummy data (will be MongoDB later)
      authData.addUser(newUser);

      // Return success response in the standard format
      return res.status(200).json({
        status: 200,
        message: 'success!! User created successfully',
        data: {
          userId: userID
        }
      });

    } catch (error) {
      console.error('Signup error:', error);
      return res.status(500).json({
        status: 500,
        message: 'Internal server error during user creation',
        data: {}
      });
    }
  }
);

module.exports = router;
