// Dummy product details data for testing before MongoDB integration
// In production, this will be replaced with actual MongoDB queries

// Following the exact schema structure:
// {
//   pId: "",                  // 5-character unique product ID
//   pSubTypeDetails: {
//     pSubTypeId: "",
//     pSubTypeName: ""
//   },
//   pTypeDetails: {
//     pTypeId: "",
//     pTypeName: ""
//   },
//   pName: "",
//   pCost: "",
//   pDescription: "",
//   availability: true        // boolean for stock status
// }

let products = [
  {
    pId: "00013",
    pSubTypeDetails: {
      pSubTypeId: "013432",
      pSubTypeName: "Premium Bat"
    },
    pTypeDetails: {
      pTypeId: "013",
      pTypeName: "Bat"
    },
    pName: "SuperStrike Elite Bat",
    pCost: "4500",
    pDescription: "Premium-grade English willow bat for professional players.",
    availability: true
  },
  {
    pId: "00014",
    pSubTypeDetails: {
      pSubTypeId: "014532",
      pSubTypeName: "Premium Ball"
    },
    pTypeDetails: {
      pTypeId: "014",
      pTypeName: "Ball"
    },
    pName: "Velocity Pro Ball",
    pCost: "1200",
    pDescription: "High-quality leather cricket ball suitable for tournaments.",
    availability: true
  },
  {
    pId: "00015",
    pSubTypeDetails: {
      pSubTypeId: "013221",
      pSubTypeName: "Standard Bat"
    },
    pTypeDetails: {
      pTypeId: "013",
      pTypeName: "Bat"
    },
    pName: "Classic Kashmir Willow Bat",
    pCost: "2500",
    pDescription: "Durable Kashmir willow bat for regular practice.",
    availability: false
  }
];

// Helper functions to simulate database operations
const productDetailsData = {
  // Get all products
  getAllProducts: () => {
    return products;
  },

  // Find products by pTypeId
  findByTypeId: (pTypeId) => {
    return products.filter(product => product.pTypeDetails.pTypeId === pTypeId);
  },

  // Find product by pId
  findByProductId: (pId) => {
    return products.find(product => product.pId === pId);
  },

  // Add new product
  addProduct: (productData) => {
    products.push(productData);
    return productData;
  },

  // Update product availability
  updateAvailability: (pId, availability) => {
    const product = products.find(p => p.pId === pId);
    if (product) {
      product.availability = availability;
      return product;
    }
    return null;
  },

  // Check if pId exists
  productIdExists: (pId) => {
    return products.some(product => product.pId === pId);
  },

  // Delete product
  deleteProduct: (pId) => {
    products = products.filter(product => product.pId !== pId);
  },

  // Clear all products (for testing)
  clearProducts: () => {
    products = [];
  },

  // Reset to default products (for testing)
  resetProducts: () => {
    products = [
      {
        pId: "00013",
        pSubTypeDetails: {
          pSubTypeId: "013432",
          pSubTypeName: "Premium Bat"
        },
        pTypeDetails: {
          pTypeId: "013",
          pTypeName: "Bat"
        },
        pName: "SuperStrike Elite Bat",
        pCost: "4500",
        pDescription: "Premium-grade English willow bat for professional players.",
        availability: true
      },
      {
        pId: "00014",
        pSubTypeDetails: {
          pSubTypeId: "014532",
          pSubTypeName: "Premium Ball"
        },
        pTypeDetails: {
          pTypeId: "014",
          pTypeName: "Ball"
        },
        pName: "Velocity Pro Ball",
        pCost: "1200",
        pDescription: "High-quality leather cricket ball suitable for tournaments.",
        availability: true
      },
      {
        pId: "00015",
        pSubTypeDetails: {
          pSubTypeId: "013221",
          pSubTypeName: "Standard Bat"
        },
        pTypeDetails: {
          pTypeId: "013",
          pTypeName: "Bat"
        },
        pName: "Classic Kashmir Willow Bat",
        pCost: "2500",
        pDescription: "Durable Kashmir willow bat for regular practice.",
        availability: false
      }
    ];
  }
};

module.exports = productDetailsData;

