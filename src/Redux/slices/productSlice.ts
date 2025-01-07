import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types";

// Estado inicial de los productos
const initialState: {
  products: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
} = {
  products: [],
  categories: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Exporta las acciones y el reducer
export const { setProducts, setCategories, setLoading, setError } = productSlice.actions;
export default productSlice.reducer;
