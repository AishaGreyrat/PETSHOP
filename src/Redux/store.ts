// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import productReducer from './features/productSlice';

// Configuración del store con los reducers
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
  },
});

// Tipos de utilidad para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
