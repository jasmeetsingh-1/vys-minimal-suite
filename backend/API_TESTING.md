# API Testing - cURL Commands

This file contains Postman cURL commands for all API endpoints in the project.

---

## Authentication APIs

### 1. Signup - Create New User

**Endpoint:** `POST /vys/auth/new-signup`

**Description:** Create a new user account

**cURL Command:**
```bash
curl -X POST http://localhost:9944/vys/auth/new-signup \
-H "Content-Type: application/json" \
-d '{
  "email": "newuser@example.com",
  "passwordEncoded": "encodedPassword123",
  "name": "John Doe"
}'
```

**Success Response (200):**
```json
{
  "status": 200,
  "message": "success!! User created successfully",
  "data": {
    "userId": "abc123xyz45678"
  }
}
```

**Error Response - Missing Fields (400):**
```json
{
  "status": 400,
  "message": "Missing or empty required fields: email, passwordEncoded",
  "data": {}
}
```

**Error Response - Invalid Email (400):**
```json
{
  "status": 400,
  "message": "Invalid email format",
  "data": {}
}
```

**Error Response - Email Already Exists (409):**
```json
{
  "status": 409,
  "message": "user exist with the given email",
  "data": {}
}
```

---

## Test Cases for Signup

### Test Case 1: Successful Signup
```bash
curl -X POST http://localhost:9944/vys/auth/new-signup \
-H "Content-Type: application/json" \
-d '{
  "email": "test1@example.com",
  "passwordEncoded": "myEncodedPass123",
  "name": "Test User One"
}'
```

### Test Case 2: Missing Fields
```bash
curl -X POST http://localhost:9944/vys/auth/new-signup \
-H "Content-Type: application/json" \
-d '{
  "email": "test2@example.com",
  "name": "Test User Two"
}'
```

### Test Case 3: Invalid Email Format
```bash
curl -X POST http://localhost:9944/vys/auth/new-signup \
-H "Content-Type: application/json" \
-d '{
  "email": "invalid-email-format",
  "passwordEncoded": "myEncodedPass123",
  "name": "Test User Three"
}'
```

### Test Case 4: Duplicate Email
```bash
# First create a user
curl -X POST http://localhost:9944/vys/auth/new-signup \
-H "Content-Type: application/json" \
-d '{
  "email": "duplicate@example.com",
  "passwordEncoded": "myEncodedPass123",
  "name": "First User"
}'

# Try to create another user with same email
curl -X POST http://localhost:9944/vys/auth/new-signup \
-H "Content-Type: application/json" \
-d '{
  "email": "duplicate@example.com",
  "passwordEncoded": "anotherPass456",
  "name": "Second User"
}'
```

---

## Notes
- Base URL: `http://localhost:9944`
- All requests use `Content-Type: application/json`
- Password must be encoded on frontend using `PASSWORD_ENCODING_KEY` before sending
- All responses follow the standard format: `{ status, message, data }`
- **cURL Format:** Always use `-X POST`, `-H`, and `-d` flags (this format works universally)

---

## Quick Start Testing

To quickly test the signup endpoint, run:

```bash
curl -X POST http://localhost:9944/vys/auth/new-signup \
-H "Content-Type: application/json" \
-d '{
  "email": "quicktest@example.com",
  "passwordEncoded": "testpass123",
  "name": "Quick Test User"
}'
```

---

### 2. Login - User Login

**Endpoint:** `POST /vys/auth/login`

**Description:** User login with email and password

**cURL Command:**
```bash
curl -X POST http://localhost:9944/vys/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "test@example.com",
  "password": "encodedPassword123"
}'
```

**Success Response (200):**
```json
{
  "status": 200,
  "message": "success!! user logged in successful",
  "data": {
    "userId": "test12345678ab"
  }
}
```

**Error Response - Missing Fields (400):**
```json
{
  "status": 400,
  "message": "Missing or empty required fields: email, password",
  "data": {}
}
```

**Error Response - Invalid Email Format (400):**
```json
{
  "status": 400,
  "message": "Invalid email format",
  "data": {}
}
```

**Error Response - User Not Found (404):**
```json
{
  "status": 404,
  "message": "User not found with the given email",
  "data": {}
}
```

**Error Response - Invalid Credentials (401):**
```json
{
  "status": 401,
  "message": "Invalid credentials",
  "data": {}
}
```

---

## Test Cases for Login

### Test Case 1: Successful Login (with existing user)
```bash
curl -X POST http://localhost:9944/vys/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "test@example.com",
  "password": "encodedPassword123"
}'
```

### Test Case 2: Missing Fields
```bash
curl -X POST http://localhost:9944/vys/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "test@example.com"
}'
```

### Test Case 3: Invalid Email Format
```bash
curl -X POST http://localhost:9944/vys/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "invalid-email",
  "password": "encodedPassword123"
}'
```

### Test Case 4: User Not Found
```bash
curl -X POST http://localhost:9944/vys/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "nonexistent@example.com",
  "password": "somepassword"
}'
```

### Test Case 5: Wrong Password
```bash
curl -X POST http://localhost:9944/vys/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "test@example.com",
  "password": "wrongpassword"
}'
```

---

### 3. Reset Password

**Endpoint:** `POST /vys/auth/reset-password`

**Description:** Reset user password using a valid token

**cURL Command:**
```bash
curl -X POST http://localhost:9944/vys/auth/reset-password \
-H "Content-Type: application/json" \
-d '{
  "email": "test@example.com",
  "userId": "test12345678ab",
  "token": "abc123XYZ789token456def",
  "newPasswordEncoded": "newEncodedPassword456"
}'
```

**Success Response (200):**
```json
{
  "status": 200,
  "message": "success!! Password reset successfully",
  "data": {
    "userId": "test12345678ab"
  }
}
```

**Error Response - Missing Fields (400):**
```json
{
  "status": 400,
  "message": "Missing or empty required fields: email, userId, token",
  "data": {}
}
```

**Error Response - Invalid Email Format (400):**
```json
{
  "status": 400,
  "message": "Invalid email format",
  "data": {}
}
```

**Error Response - Email/UserId Mismatch (400):**
```json
{
  "status": 400,
  "message": "Email and userId do not match",
  "data": {}
}
```

**Error Response - User Not Found (404):**
```json
{
  "status": 404,
  "message": "User not found with the given email",
  "data": {}
}
```

**Error Response - Invalid/Expired Token (401):**
```json
{
  "status": 401,
  "message": "Invalid or expired reset token",
  "data": {}
}
```

---

## Test Cases for Reset Password

### Test Case 1: Successful Password Reset (with valid token)
```bash
curl -X POST http://localhost:9944/vys/auth/reset-password \
-H "Content-Type: application/json" \
-d '{
  "email": "test@example.com",
  "userId": "test12345678ab",
  "token": "abc123XYZ789token456def",
  "newPasswordEncoded": "newEncodedPassword456"
}'
```

### Test Case 2: Missing Fields
```bash
curl -X POST http://localhost:9944/vys/auth/reset-password \
-H "Content-Type: application/json" \
-d '{
  "email": "test@example.com",
  "userId": "test12345678ab"
}'
```

### Test Case 3: Email/UserId Mismatch
```bash
curl -X POST http://localhost:9944/vys/auth/reset-password \
-H "Content-Type: application/json" \
-d '{
  "email": "test@example.com",
  "userId": "wronguserid123",
  "token": "abc123XYZ789token456def",
  "newPasswordEncoded": "newEncodedPassword456"
}'
```

### Test Case 4: Invalid Token
```bash
curl -X POST http://localhost:9944/vys/auth/reset-password \
-H "Content-Type: application/json" \
-d '{
  "email": "test@example.com",
  "userId": "test12345678ab",
  "token": "invalidtoken123456789012",
  "newPasswordEncoded": "newEncodedPassword456"
}'
```

### Test Case 5: Token Already Used (isValid=false)
```bash
# First use the token (Test Case 1)
# Then try to use it again with the same curl command
curl -X POST http://localhost:9944/vys/auth/reset-password \
-H "Content-Type: application/json" \
-d '{
  "email": "test@example.com",
  "userId": "test12345678ab",
  "token": "abc123XYZ789token456def",
  "newPasswordEncoded": "anotherNewPassword789"
}'
```

---

### 4. Get All Users

**Endpoint:** `GET /vys/auth/get-all-users`

**Description:** Get all registered users (for development/testing purposes)

**cURL Command:**
```bash
curl -X GET http://localhost:9944/vys/auth/get-all-users \
-H "Content-Type: application/json"
```

**Success Response (200):**
```json
{
  "status": 200,
  "message": "success!! Users fetched successfully",
  "data": {
    "users": [
      {
        "userID": "test12345678ab",
        "email": "test@example.com",
        "passwordEncoded": "encodedPassword123",
        "name": "Test User"
      },
      {
        "userID": "admin1234567abc",
        "email": "admin@example.com",
        "passwordEncoded": "encodedAdmin123",
        "name": "Admin User"
      }
    ],
    "count": 2
  }
}
```

---

## Product Data APIs

### 5. Get Product Details

**Endpoint:** `GET /vys/data/products?typeId=`

**Description:** Get all products by typeId, or all products if no typeId provided

**cURL Command (with typeId):**
```bash
curl -X GET 'http://localhost:9944/vys/data/products?typeId=014' \
-H "Content-Type: application/json"
```

**cURL Command (all products):**
```bash
curl -X GET http://localhost:9944/vys/data/products \
-H "Content-Type: application/json"
```

**Success Response (200):**
```json
{
  "status": 200,
  "message": "success!! Products fetched successfully",
  "data": [
    {
      "pId": "00014",
      "pSubTypeDetails": {
        "pSubTypeId": "014532",
        "pSubTypeName": "Premium Ball"
      },
      "pTypeDetails": {
        "pTypeId": "014",
        "pTypeName": "Ball"
      },
      "pName": "Velocity Pro Ball",
      "pCost": "1200",
      "pDescription": "High-quality leather cricket ball suitable for tournaments.",
      "availability": true
    }
  ]
}
```

**Error Response - Invalid typeId (404):**
```json
{
  "status": 404,
  "message": "Invalid or missing typeId parameter",
  "data": []
}
```

---

## Test Cases for Get Product Details

### Test Case 1: Get Products by TypeId
```bash
curl -X GET 'http://localhost:9944/vys/data/products?typeId=013' \
-H "Content-Type: application/json"
```

### Test Case 2: Get All Products (no typeId)
```bash
curl -X GET http://localhost:9944/vys/data/products \
-H "Content-Type: application/json"
```

### Test Case 3: Invalid TypeId
```bash
curl -X GET 'http://localhost:9944/vys/data/products?typeId=999' \
-H "Content-Type: application/json"
```

---

### 6. Create New Product

**Endpoint:** `POST /vys/data/products/create`

**Description:** Create a new product entry

**cURL Command:**
```bash
curl -X POST http://localhost:9944/vys/data/products/create \
-H "Content-Type: application/json" \
-d '{
  "pSubTypeId": "014421",
  "pSubTypeName": "Training Ball",
  "pTypeId": "014",
  "pTypeName": "Ball",
  "pName": "Cricket Practice Ball",
  "pCost": "800",
  "pDescription": "Durable training ball for daily practice sessions.",
  "availability": true
}'
```

**Success Response (200):**
```json
{
  "status": 200,
  "message": "success!! Product added successfully",
  "data": {
    "pId": "00016",
    "pSubTypeDetails": {
      "pSubTypeId": "014421",
      "pSubTypeName": "Training Ball"
    },
    "pTypeDetails": {
      "pTypeId": "014",
      "pTypeName": "Ball"
    },
    "pName": "Cricket Practice Ball",
    "pCost": "800",
    "pDescription": "Durable training ball for daily practice sessions.",
    "availability": true
  }
}
```

**Error Response - Missing Fields (400):**
```json
{
  "status": 400,
  "message": "Missing or empty required fields: pName, pCost",
  "data": {}
}
```

**Error Response - Invalid pTypeId (404):**
```json
{
  "status": 404,
  "message": "Invalid pTypeId - Product type does not exist",
  "data": {}
}
```

**Error Response - Invalid pSubTypeId (400):**
```json
{
  "status": 400,
  "message": "Invalid pSubTypeId - Subtype does not belong to the specified product type",
  "data": {}
}
```

---

## Test Cases for Create Product

### Test Case 1: Successful Product Creation
```bash
curl -X POST http://localhost:9944/vys/data/products/create \
-H "Content-Type: application/json" \
-d '{
  "pSubTypeId": "013221",
  "pSubTypeName": "Standard Bat",
  "pTypeId": "013",
  "pTypeName": "Bat",
  "pName": "Player Edition Bat",
  "pCost": "3000",
  "pDescription": "High-quality bat for intermediate players.",
  "availability": true
}'
```

### Test Case 2: Missing Required Fields
```bash
curl -X POST http://localhost:9944/vys/data/products/create \
-H "Content-Type: application/json" \
-d '{
  "pSubTypeId": "013221",
  "pSubTypeName": "Standard Bat",
  "pTypeId": "013"
}'
```

### Test Case 3: Invalid pTypeId
```bash
curl -X POST http://localhost:9944/vys/data/products/create \
-H "Content-Type: application/json" \
-d '{
  "pSubTypeId": "999999",
  "pSubTypeName": "Invalid Type",
  "pTypeId": "999",
  "pTypeName": "Invalid",
  "pName": "Test Product",
  "pCost": "1000",
  "pDescription": "Test description"
}'
```

### Test Case 4: SubType Does Not Belong to Type
```bash
curl -X POST http://localhost:9944/vys/data/products/create \
-H "Content-Type: application/json" \
-d '{
  "pSubTypeId": "014532",
  "pSubTypeName": "Premium Ball",
  "pTypeId": "013",
  "pTypeName": "Bat",
  "pName": "Invalid Product",
  "pCost": "1000",
  "pDescription": "This should fail - Ball subtype with Bat type"
}'
```

---

### 7. Update Product Availability

**Endpoint:** `POST /vys/data/products/availability`

**Description:** Update product availability status

**cURL Command:**
```bash
curl -X POST http://localhost:9944/vys/data/products/availability \
-H "Content-Type: application/json" \
-d '{
  "pId": "00014",
  "availability": false
}'
```

**Success Response (200):**
```json
{
  "status": 200,
  "message": "success!! Product availability updated successfully",
  "data": {
    "pId": "00014",
    "availability": false
  }
}
```

**Error Response - Missing Fields (400):**
```json
{
  "status": 400,
  "message": "Missing or empty required fields: pId, availability",
  "data": {}
}
```

**Error Response - Invalid Boolean (400):**
```json
{
  "status": 400,
  "message": "availability must be a boolean value (true or false)",
  "data": {}
}
```

**Error Response - Product Not Found (404):**
```json
{
  "status": 404,
  "message": "Product with given pId not found",
  "data": {}
}
```

---

## Test Cases for Update Product Availability

### Test Case 1: Set Product to Unavailable
```bash
curl -X POST http://localhost:9944/vys/data/products/availability \
-H "Content-Type: application/json" \
-d '{
  "pId": "00013",
  "availability": false
}'
```

### Test Case 2: Set Product to Available
```bash
curl -X POST http://localhost:9944/vys/data/products/availability \
-H "Content-Type: application/json" \
-d '{
  "pId": "00013",
  "availability": true
}'
```

### Test Case 3: Missing Fields
```bash
curl -X POST http://localhost:9944/vys/data/products/availability \
-H "Content-Type: application/json" \
-d '{
  "pId": "00013"
}'
```

### Test Case 4: Invalid Product ID
```bash
curl -X POST http://localhost:9944/vys/data/products/availability \
-H "Content-Type: application/json" \
-d '{
  "pId": "99999",
  "availability": false
}'
```

### Test Case 5: Invalid Boolean Value (string instead)
```bash
curl -X POST http://localhost:9944/vys/data/products/availability \
-H "Content-Type: application/json" \
-d '{
  "pId": "00013",
  "availability": "false"
}'
```

---

*More APIs will be added below as they are implemented...*
