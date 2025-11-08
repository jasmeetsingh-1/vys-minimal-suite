// Dummy reset password data for testing before MongoDB integration
// In production, this will be replaced with actual MongoDB queries

// Following the exact schema structure:
// {
//   userID: "",          // Same as auth userID, must be unique
//   email: "",           // User email, must be unique
//   token: "",           // 24-character unique alphanumeric token
//   emailGenerated: "",  // Boolean - true when reset password triggered
//   isValid: ""          // Boolean - true when created, false after use
// }

let resetPasswordTokens = [
  {
    userID: 'test12345678ab',
    email: 'test@example.com',
    token: 'abc123XYZ789token456def',
    emailGenerated: true,
    isValid: true
  },
  {
    userID: "UGKaIJnllbacKA",
    email: "jasmeet@gmail.com",
    token: 'abc123XfdYZ789token456def',
    emailGenerated: true,
    isValid: true
  }
];

// Helper functions to simulate database operations
const resetPasswordData = {
  // Get all reset tokens
  getAllTokens: () => {
    return resetPasswordTokens;
  },

  // Find token by email
  findByEmail: (email) => {
    return resetPasswordTokens.find(token => token.email === email);
  },

  // Find token by userID
  findByUserId: (userID) => {
    return resetPasswordTokens.find(token => token.userID === userID);
  },

  // Find token by email and userID
  findByEmailAndUserId: (email, userID) => {
    return resetPasswordTokens.find(token => token.email === email && token.userID === userID);
  },

  // Find valid token by email, userID, and token
  findValidToken: (email, userID, token) => {
    return resetPasswordTokens.find(
      t => t.email === email && t.userID === userID && t.token === token && t.isValid === true
    );
  },

  // Add new reset token
  addToken: (tokenData) => {
    const newToken = {
      userID: tokenData.userID,
      email: tokenData.email,
      token: tokenData.token,
      emailGenerated: tokenData.emailGenerated || true,
      isValid: tokenData.isValid !== undefined ? tokenData.isValid : true
    };
    resetPasswordTokens.push(newToken);
    return newToken;
  },

  // Invalidate token (set isValid to false)
  invalidateToken: (email, userID, token) => {
    const tokenEntry = resetPasswordTokens.find(
      t => t.email === email && t.userID === userID && t.token === token
    );
    if (tokenEntry) {
      tokenEntry.isValid = false;
      return true;
    }
    return false;
  },

  // Delete token
  deleteToken: (email, userID) => {
    resetPasswordTokens = resetPasswordTokens.filter(
      t => !(t.email === email && t.userID === userID)
    );
  },

  // Clear all tokens (for testing)
  clearTokens: () => {
    resetPasswordTokens = [];
  },

  // Reset to default tokens (for testing)
  resetTokens: () => {
    resetPasswordTokens = [
      {
        userID: 'test12345678ab',
        email: 'test@example.com',
        token: 'abc123XYZ789token456def',
        emailGenerated: true,
        isValid: true
      }
    ];
  }
};

module.exports = resetPasswordData;

