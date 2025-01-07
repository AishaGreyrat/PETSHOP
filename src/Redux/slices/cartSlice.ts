import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types";
import { calculateTotal, incrementCartItem } from "@/Reducers/cartReducerHelpers";

// Estado inicial
const initialState: {
  items: CartItem[];
  total: number;
} = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        state.items = incrementCartItem(state.items, action.payload);
      } else {
        state.items.push(action.payload);
      }
      state.total = calculateTotal(state.items);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.total = calculateTotal(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

// Exporta las acciones y el reducer
export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
