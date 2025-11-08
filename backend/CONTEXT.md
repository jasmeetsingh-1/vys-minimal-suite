# Backend Context File - E-Commerce Project

## Database Schema

### User Object Structure (MongoDB)
```javascript
{
    userID: "",        // 14-character UUID
    email: "",         // User email
    passwordEncoded: "", // Encoded password from frontend
    name: ""          // User name
}
```

**IMPORTANT: Always respect this exact structure for user data**

### Reset Password Token Object Structure (MongoDB)
```javascript
{
    userID: "",          // Same as auth userID, must be unique
    email: "",           // User email, must be unique
    token: "",           // 24-character unique alphanumeric token
    emailGenerated: "",  // Boolean - true when reset password triggered
    isValid: ""          // Boolean - true when created, false after use or expiry
}
```

**Key Explanations:**
- `userID`: Same as user's userID from auth table, must be unique
- `email`: User's email, must be unique
- `token`: 24-character unique alphanumeric token (0-9, A-Z, a-z) generated using nanoid
- `emailGenerated`: Boolean value, set to true when reset password is triggered
- `isValid`: Boolean value, true when entry is created, becomes false after token is used
  - *Future: Will auto-expire after 1 day*
  - Once token is used, `isValid` is set to false

**IMPORTANT: Always respect this exact structure for reset password tokens**

### Product Type Table Object Structure (MongoDB)
```javascript
{
  pTypeId: "",          // 3-character unique identifier for the product type
  pTypeName: "",        // readable name of the product type
  subTypes: [
    {
      pSubTypeId: "",   // 6-character unique ID (first 3 must match pTypeId)
      pSubTypeName: ""  // readable name of the subtype
    }
  ]
}
```

**Key Explanations:**
- `pTypeId`: 3-character unique product type identifier
- `pTypeName`: Name of the product type (e.g., "Bat", "Ball")
- `subTypes`: Array of product subtypes under this type
- `pSubTypeId`: 6-character unique ID (prefix matches `pTypeId`, next 3 chars unique within category)
- `pSubTypeName`: Subtype name (e.g., "Premium Bat", "Standard Bat")

**IMPORTANT: Always respect this exact structure for product type data**

### Product Details Table Object Structure (MongoDB)
```javascript
{
  pId: "",                  // 5-character unique product ID
  pSubTypeDetails: {
    pSubTypeId: "",
    pSubTypeName: ""
  },
  pTypeDetails: {
    pTypeId: "",
    pTypeName: ""
  },
  pName: "",
  pCost: "",
  pDescription: "",
  availability: true        // boolean for stock status
}
```

**Key Explanations:**
- `pId`: 5-character unique product ID
- `pSubTypeDetails`: Object describing which subtype the product belongs to
- `pTypeDetails`: Parent product type details (matches `product_type_table`)
- `pName`: Product name
- `pCost`: Product cost (string)
- `pDescription`: Product description
- `availability`: Boolean value (true = available, false = unavailable)

**IMPORTANT: Always respect this exact structure for product detail data**

## API Response Format
**ALL API responses must follow this exact format:**

```javascript
{
  status: <HTTP status code>,
  message: "<descriptive message>",
  data: {
    // relevant data based on the API
  }
}
```

### Response Examples:
- Success: 
  ```javascript
  {
    status: 200,
    message: "success!! User created successfully",
    data: { userId: "abc123xyz45678" }
  }
  ```
- Error:
  ```javascript
  {
    status: 400,
    message: "user exist with the given email",
    data: {}
  }
  ```

## Password Encoding
- Frontend will encode password using `PASSWORD_ENCODING_KEY` from .env
- Backend stores the encoded password as-is (no bcrypt for now)
- Same key must be used on frontend and backend

## Routes

### Authentication Routes

#### GET /vys/auth/get-all-users
**Description:** Get all registered users (for development/testing)

**Payload:** None

**Response:**
```javascript
{
  status: 200,
  message: "success!! Users fetched successfully",
  data: {
    users: [...],
    count: 2
  }
}
```

#### POST /vys/auth/reset-password
**Description:** Reset user password with valid token

**Payload:**
```javascript
{
  email: "",
  userId: "",
  token: "",
  newPasswordEncoded: ""
}
```

**Middlewares (in sequence):**
1. `checkAllFieldsFilled(['email', 'userId', 'token', 'newPasswordEncoded'])` - Ensure all required fields are present
2. `validateEmailFormat` - Validate email format

**Process (Strict Flow):**
1. Validate all fields are required (middleware)
2. Validate email and userId match in auth table using `findUserByEmail`
3. Check that a valid token exists (email, userId, token match and isValid=true)
4. Update password in authData with newPasswordEncoded
5. Invalidate the token (set isValid=false)
6. Return success response

**Response:**
```javascript
{
  status: 200,
  message: "success!! Password reset successfully",
  data: {
    userId: "<user-id>"
  }
}
```

**Error Responses:**
- 400: Missing fields or email/userId mismatch
- 404: User not found
- 401: Invalid or expired reset token
- 500: Failed to update password

#### POST /vys/auth/login
**Description:** User login

**Payload:**
```javascript
{
  email: "",
  password: ""  // Encoded password from frontend
}
```

**Middlewares (in sequence):**
1. `checkAllFieldsFilled(['email', 'password'])` - Ensure all required fields are present
2. `validateEmailFormat` - Validate email format

**Process:**
1. Find user by email in database
2. Check if user exists
3. Match encoded password with stored passwordEncoded
4. Return success response with userId

**Response:**
```javascript
{
  status: 200,
  message: "success!! user logged in successful",
  data: {
    userId: "<user-id>"
  }
}
```

**Error Responses:**
- 404: User not found
- 401: Invalid credentials (password mismatch)

---

### Product Data Routes

#### GET /vys/data/products?typeId=
**Description:** Get all products by typeId, or all products if no typeId provided

**Query Parameters:**
- `typeId` (optional): 3-character product type ID

**Process:**
1. If no typeId provided, return all products
2. Validate that typeId exists in product_type_table
3. Fetch all products with matching pTypeId
4. Return products list

**Response:**
```javascript
{
  status: 200,
  message: "success!! Products fetched successfully",
  data: [
    {
      pId: "00014",
      pSubTypeDetails: { pSubTypeId: "014532", pSubTypeName: "Premium Ball" },
      pTypeDetails: { pTypeId: "014", pTypeName: "Ball" },
      pName: "Velocity Pro Ball",
      pCost: "1200",
      pDescription: "High-quality leather cricket ball...",
      availability: true
    }
  ]
}
```

**Error Responses:**
- 404: Invalid or missing typeId parameter

#### POST /vys/data/products/create
**Description:** Create a new product entry

**Payload:**
```javascript
{
  pSubTypeId: "",
  pSubTypeName: "",
  pTypeId: "",
  pTypeName: "",
  pName: "",
  pCost: "",
  pDescription: "",
  availability: true  // optional, defaults to true
}
```

**Middlewares:**
1. `checkAllFieldsFilled(['pSubTypeId', 'pSubTypeName', 'pTypeId', 'pTypeName', 'pName', 'pCost', 'pDescription'])`

**Process:**
1. Validate all required fields are present
2. Validate that pTypeId exists in product_type_table
3. Validate that pSubTypeId belongs to that pTypeId
4. Generate unique 5-character pId
5. Create and add product to product_details_table
6. Return success response with new product

**Response:**
```javascript
{
  status: 200,
  message: "success!! Product added successfully",
  data: {
    pId: "00015",
    pSubTypeDetails: { ... },
    pTypeDetails: { ... },
    pName: "Cricket Practice Ball",
    pCost: "800",
    pDescription: "Durable training ball...",
    availability: true
  }
}
```

**Error Responses:**
- 400: Missing fields or invalid pSubTypeId
- 404: Invalid pTypeId

#### POST /vys/data/products/availability
**Description:** Update product availability status

**Payload:**
```javascript
{
  pId: "",
  availability: true || false
}
```

**Middlewares:**
1. `checkAllFieldsFilled(['pId', 'availability'])`

**Process:**
1. Validate pId and availability are present
2. Validate availability is boolean
3. Validate that pId exists in product_details_table
4. Update product's availability field
5. Return success response

**Response:**
```javascript
{
  status: 200,
  message: "success!! Product availability updated successfully",
  data: {
    pId: "00014",
    availability: false
  }
}
```

**Error Responses:**
- 400: availability must be boolean
- 404: Product with given pId not found

---

#### POST /vys/auth/new-signup
**Description:** Create new user account

**Payload:**
```javascript
{
  email: "",
  passwordEncoded: "",
  name: ""
}
```

**Middlewares (in sequence):**
1. `checkAllFieldsFilled` - Ensure all required fields are present
2. `validateEmailFormat` - Validate email format
3. `checkEmailAvailability` - Ensure email doesn't already exist

**Process:**
1. Generate 14-character userId using uuid
2. Create user object with userID, email, passwordEncoded, name
3. Save to database (currently dummyData)
4. Return success response with userId

**Response:**
```javascript
{
  status: 200,
  message: "success!! User created successfully",
  data: {
    userId: "<generated-user-id>"
  }
}
```

## Project Structure
```
backend/
├── middlewares/
│   └── validationMiddlewares.js  # Reusable validation middlewares
├── utilities/
│   └── helpers.js                # Reusable utility functions (ID generators, etc.)
├── validators/
│   └── authValidator.js          # Auth-specific validators only
├── dummyData/
│   ├── authData.js               # Mock auth database (temporary)
│   ├── dummyResetPassword.js     # Mock reset password tokens database (temporary)
│   ├── dummyProductTypeTable.js  # Mock product types and subtypes database (temporary)
│   └── dummyProductDetails.js    # Mock product details database (temporary)
├── routes/
│   ├── auth/
│   │   ├── signup.js
│   │   ├── login.js
│   │   ├── users.js
│   │   └── resetPassword.js
│   ├── e-commerceData/
│   │   ├── e-commerceAPI.js
│   │   ├── getProductDetails.js
│   │   ├── createProduct.js
│   │   └── updateAvailability.js
│   └── routers.js                # Central router
├── server.js                     # Main entry point
└── package.json
```

## Middlewares (Reusable)
**Location:** `middlewares/validationMiddlewares.js`

**Always use these reusable middlewares from the middlewares folder:**
- `checkAllFieldsFilled(requiredFields)` - Check if all required fields are filled
  - Usage: `checkAllFieldsFilled(['field1', 'field2', 'field3'])`
- `handleValidationErrors` - Handle express-validator errors
  - Usage: Used internally by validators that use express-validator

**Import Pattern:**
```javascript
const { checkAllFieldsFilled } = require('../../middlewares/validationMiddlewares');
```

## Validators (Route-Specific)
**Location:** `validators/authValidator.js` (and similar files for other routes)

**Route-specific validators:**
- `validateEmailFormat` - Auth-specific email validation
- `checkEmailAvailability` - Auth-specific email duplicate check

**Import Pattern:**
```javascript
const { validateEmailFormat, checkEmailAvailability } = require('../../validators/authValidator');
```

## Utilities
**Location:** `utilities/helpers.js`

- `generateUserId()` - Creates 14-character unique user ID (alphanumeric)
- `generateOrderId()` - Creates 16-character unique order ID (alphanumeric)
- `generateProductId()` - Creates 12-character unique product ID (alphanumeric)
- `generateResetToken()` - Creates 24-character unique reset password token (alphanumeric)
- `generateProductDetailId()` - Creates 5-character unique product detail ID (numeric)
- `getProductTypeDetails(pTypeId)` - Gets product type details by pTypeId from product_type_table

## cURL Format Standard
**ALWAYS use this cURL format for API testing:**
```bash
curl -X POST http://localhost:9944/endpoint \
-H "Content-Type: application/json" \
-d '{
  "key": "value"
}'
```
- Use `-X POST` (or GET, PUT, DELETE)
- Use `-H` for headers
- Use `-d` for data
- This format works universally

## Notes
- **IMPORTANT:** Always use reusable middlewares from `middlewares/` folder for common validation tasks
- Route-specific validators go in `validators/` folder
- All reusable utility functions are in `utilities/helpers.js`
- Using dummyData for now, will migrate to MongoDB later
- Keep this file updated as project evolves

