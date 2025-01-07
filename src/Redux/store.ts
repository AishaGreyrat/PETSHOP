import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import paymentReducer from "./slices/paymentSlice";
import productReducer from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    payment: paymentReducer,
    products: productReducer,
  },
});

// Tipos para el estado global y el despachador
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
