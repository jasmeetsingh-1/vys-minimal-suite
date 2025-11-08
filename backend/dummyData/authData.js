// Dummy authentication data for testing before MongoDB integration
// In production, this will be replaced with actual MongoDB queries

// Following the exact schema structure:
// {
//   userID: "",
//   email: "",
//   passwordEncoded: "",
//   name: ""
// }

let users = [
  {
    userID: 'test12345678ab',
    email: 'test@example.com',
    passwordEncoded: 'encodedPassword123', // This will be encoded by frontend
    name: 'Test User'
  },
  {
    userID: 'UGKaIJnllbacKA',
    email: 'jasmeet@gmail.com',
    passwordEncoded: 'Amritsar@123', // This will be encoded by frontend
    name: 'Admin User'
  }
];

// Helper functions to simulate database operations
const authData = {
  // Get all users
  getAllUsers: () => {
    return users;
  },

  // Find user by email
  findUserByEmail: (email) => {
    return users.find(user => user.email === email);
  },

  // Find user by userID
  findUserById: (userID) => {
    return users.find(user => user.userID === userID);
  },

  // Add new user (for signup)
  addUser: (userData) => {
    const newUser = {
      userID: userData.userID,
      email: userData.email,
      passwordEncoded: userData.passwordEncoded,
      name: userData.name
    };
    users.push(newUser);
    return newUser;
  },

  // Check if email exists
  emailExists: (email) => {
    return users.some(user => user.email === email);
  },

  // Update user password
  updatePassword: (email, userID, newPasswordEncoded) => {
    const user = users.find(u => u.email === email && u.userID === userID);
    if (user) {
      user.passwordEncoded = newPasswordEncoded;
      return true;
    }
    return false;
  },

  // Delete user (for testing)
  deleteUser: (userID) => {
    users = users.filter(user => user.userID !== userID);
  },

  // Clear all users (for testing)
  clearUsers: () => {
    users = [];
  },

  // Reset to default users (for testing)
  resetUsers: () => {
    users = [
      {
        userID: 'test12345678ab',
        email: 'test@example.com',
        passwordEncoded: 'encodedPassword123',
        name: 'Test User'
      },
      {
        userID: 'admin1234567abc',
        email: 'admin@example.com',
        passwordEncoded: 'encodedAdmin123',
        name: 'Admin User'
      }
    ];
  }
};

module.exports = authData;
