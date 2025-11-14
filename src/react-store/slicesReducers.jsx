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
      // Cart functionality will be implemented later
      state.items = { ...state.items, ...action.payload };
    },
    removeFromCart(state, action) {
      // Cart functionality will be implemented later
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
