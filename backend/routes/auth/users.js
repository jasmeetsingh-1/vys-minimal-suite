const express = require('express');
const router = express.Router();
const authData = require('../../dummyData/authData');

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

module.exports = router;

