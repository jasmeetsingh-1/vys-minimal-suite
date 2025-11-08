// Dummy product type data for testing before MongoDB integration
// In production, this will be replaced with actual MongoDB queries

// Following the exact schema structure:
// {
//   pTypeId: "",          // 3-character unique identifier for the product type
//   pTypeName: "",        // readable name of the product type
//   subTypes: [
//     {
//       pSubTypeId: "",   // 6-character unique ID (first 3 must match pTypeId)
//       pSubTypeName: ""  // readable name of the subtype
//     }
//   ]
// }

let productTypes = [
  {
    pTypeId: "013",
    pTypeName: "Bat",
    subTypes: [
      {
        pSubTypeId: "013432",
        pSubTypeName: "Premium Bat"
      },
      {
        pSubTypeId: "013221",
        pSubTypeName: "Standard Bat"
      }
    ]
  },
  {
    pTypeId: "014",
    pTypeName: "Ball",
    subTypes: [
      {
        pSubTypeId: "014532",
        pSubTypeName: "Premium Ball"
      },
      {
        pSubTypeId: "014421",
        pSubTypeName: "Training Ball"
      }
    ]
  }
];

// Helper functions to simulate database operations
const productTypeData = {
  // Get all product types
  getAllProductTypes: () => {
    return productTypes;
  },

  // Find product type by pTypeId
  findByTypeId: (pTypeId) => {
    return productTypes.find(type => type.pTypeId === pTypeId);
  },

  // Find subtype by pSubTypeId
  findSubTypeById: (pSubTypeId) => {
    for (const productType of productTypes) {
      const subType = productType.subTypes.find(st => st.pSubTypeId === pSubTypeId);
      if (subType) {
        return {
          ...subType,
          pTypeId: productType.pTypeId,
          pTypeName: productType.pTypeName
        };
      }
    }
    return null;
  },

  // Validate if subtype belongs to product type
  validateSubTypeForType: (pTypeId, pSubTypeId) => {
    const productType = productTypes.find(type => type.pTypeId === pTypeId);
    if (!productType) return false;
    
    return productType.subTypes.some(st => st.pSubTypeId === pSubTypeId);
  },

  // Add new product type
  addProductType: (typeData) => {
    productTypes.push(typeData);
    return typeData;
  },

  // Clear all product types (for testing)
  clearProductTypes: () => {
    productTypes = [];
  },

  // Reset to default product types (for testing)
  resetProductTypes: () => {
    productTypes = [
      {
        pTypeId: "013",
        pTypeName: "Bat",
        subTypes: [
          {
            pSubTypeId: "013432",
            pSubTypeName: "Premium Bat"
          },
          {
            pSubTypeId: "013221",
            pSubTypeName: "Standard Bat"
          }
        ]
      },
      {
        pTypeId: "014",
        pTypeName: "Ball",
        subTypes: [
          {
            pSubTypeId: "014532",
            pSubTypeName: "Premium Ball"
          },
          {
            pSubTypeId: "014421",
            pSubTypeName: "Training Ball"
          }
        ]
      }
    ];
  }
};

module.exports = productTypeData;

