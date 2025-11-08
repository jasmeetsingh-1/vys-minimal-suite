const express = require('express');
const router = express.Router();
const authData = require('../../dummyData/authData');
const { checkAllFieldsFilled } = require('../../middlewares/validationMiddlewares');
const { validateEmailFormat } = require('../../validators/authValidator');

// GET /vys/auth/get-all-users
// Description: Get all users (for development/testing purposes)
router.get('/get-all-users', (req, res) => {
  try {
    const users = authData.getAllUsers();

    return res.status(200).json({
      status: 200,
      message: 'success!! Users fetched successfully',
      data: {
        users: users,
        count: users.length
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    return res.status(500).json({
      status: 500,
      message: 'Internal server error while fetching users',
      data: {}
    });
  }
});

// POST /vys/auth/check-email
// Description: Check if a user exists for the given email
router.post(
  '/check-email',
  checkAllFieldsFilled(['email']),
  validateEmailFormat,
  (req, res) => {
    try {
      const { email } = req.body;

      const user = authData.findUserByEmail(email);
      const exists = Boolean(user);

      return res.status(200).json({
        status: 200,
        message: exists
          ? 'success!! User exists with the given email'
          : 'success!! No user found with the given email',
        data: {
          exists: exists,
          userId: exists ? user.userID : null
        }
      });
    } catch (error) {
      console.error('Check email error:', error);
      return res.status(500).json({
        status: 500,
        message: 'Internal server error while checking email',
        data: {}
      });
    }
  }
);

module.exports = router;

