import { createSlice } from "@reduxjs/toolkit";

// Auth Slice - stores logged in user data
const authInitialState = {
  userId: null,
  name: null,
  email: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    setAuthData(state, action) {
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    clearAuthData(state) {
      state.userId = null;
      state.name = null;
      state.email = null;
    },
  },
});

// Cart Slice - stores cart items
const cartInitialState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    addToCart(state, action) {
      state.items = { ...state.items, ...action.payload };
    },
    updateQuantity(state, action) {
      const { pId, quantity } = action.payload;
      if (state.items[pId]) {
        state.items[pId].quantity = quantity;
      }
    },
    incrementQuantity(state, action) {
      const pId = action.payload;
      if (state.items[pId]) {
        state.items[pId].quantity += 1;
      }
    },
    decrementQuantity(state, action) {
      const pId = action.payload;
      if (state.items[pId] && state.items[pId].quantity > 1) {
        state.items[pId].quantity -= 1;
      }
    },
    removeFromCart(state, action) {
      const newItems = { ...state.items };
      delete newItems[action.payload];
      state.items = newItems;
    },
    clearCart(state) {
      state.items = {};
    },
  },
});

export const authReducers = authSlice.actions;
export const cartReducers = cartSlice.actions;

export const authReducer = authSlice.reducer;
export const cartReducer = cartSlice.reducer;
