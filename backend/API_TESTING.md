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

### 3. Check User By Email

**Endpoint:** `POST /vys/auth/check-email`

**Description:** Check whether a user exists for the provided email

**cURL Command:**
```bash
curl -X POST http://localhost:9944/vys/auth/check-email \
-H "Content-Type: application/json" \
-d '{
  "email": "test@example.com"
}'
```

**Success Response (User Exists) (200):**
```json
{
  "status": 200,
  "message": "success!! User exists with the given email",
  "data": {
    "exists": true,
    "userId": "test12345678ab"
  }
}
```

**Success Response (User Not Found) (200):**
```json
{
  "status": 200,
  "message": "success!! No user found with the given email",
  "data": {
    "exists": false,
    "userId": null
  }
}
```

**Error Response - Missing Fields (400):**
```json
{
  "status": 400,
  "message": "Missing or empty required fields: email",
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

---

### 4. Reset Password

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

### 5. Get All Users

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

### 6. Get Product Details

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

### 6.5. Get Product by ID

**Endpoint:** `GET /vys/data/products/:pId`

**Description:** Get a single product by its product ID (pId)

**cURL Command:**
```bash
curl -X GET http://localhost:9944/vys/data/products/00014 \
-H "Content-Type: application/json"
```

**Success Response (200):**
```json
{
  "status": 200,
  "message": "success!! Product fetched successfully",
  "data": {
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
}
```

**Error Response - Missing pId (400):**
```json
{
  "status": 400,
  "message": "Missing pId parameter",
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

**Error Response - Server Error (500):**
```json
{
  "status": 500,
  "message": "Internal server error while fetching product",
  "data": {}
}
```

---

### 7. Create New Product

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

### 8. Update Product Availability

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

### 9. Get Product Types (with subtypes)

**Endpoint:** `GET /vys/ecommerce/product-types`

**Description:** Return all product types along with their subtypes.

**cURL Command:**
```bash
curl -X GET http://localhost:9944/vys/ecommerce/product-types \
-H "Content-Type: application/json"
```

**Success Response (200):**
```json
{
  "status": 200,
  "message": "success!! Product types fetched successfully",
  "data": [
    {
      "pTypeId": "013",
      "pTypeName": "Bat",
      "subTypes": [
        {
          "pSubTypeId": "013432",
          "pSubTypeName": "Premium Bat"
        },
        {
          "pSubTypeId": "013221",
          "pSubTypeName": "Standard Bat"
        }
      ]
    }
  ]
}
```

**Error Response (500):**
```json
{
  "status": 500,
  "message": "Internal server error while fetching product types",
  "data": []
}
```

---

### 10. Get Product Subtypes by Type

**Endpoint:** `GET /vys/ecommerce/product-types/:typeId/subtypes`

**Description:** Return the list of subtypes for the provided product type ID.

**cURL Command (typeId = 013):**
```bash
curl -X GET http://localhost:9944/vys/ecommerce/product-types/013/subtypes \
-H "Content-Type: application/json"
```

**Success Response (200):**
```json
{
  "status": 200,
  "message": "success!! Product subtypes fetched successfully",
  "data": [
    {
      "pSubTypeId": "013432",
      "pSubTypeName": "Premium Bat"
    },
    {
      "pSubTypeId": "013221",
      "pSubTypeName": "Standard Bat"
    }
  ]
}
```

**Error Response - Missing typeId (400):**
```json
{
  "status": 400,
  "message": "typeId parameter is required",
  "data": []
}
```

**Error Response - Invalid typeId (404):**
```json
{
  "status": 404,
  "message": "Invalid typeId parameter",
  "data": []
}
```

**Error Response - Server Error (500):**
```json
{
  "status": 500,
  "message": "Internal server error while fetching product subtypes",
  "data": []
}
```

---

*More APIs will be added below as they are implemented...*
