import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Tipos para el estado del formulario de pago
interface PaymentFormData {
  cardNumber: string;
  cardHolder: string;
  expirationDate: string;
  cvv: string;
  address: string;
}

// Estado inicial del pago
const initialState: {
  formData: PaymentFormData;
  selectedMethod: string | null;
  errors: Partial<PaymentFormData>;
  isModalOpen: boolean;
} = {
  formData: {
    cardNumber: "",
    cardHolder: "",
    expirationDate: "",
    cvv: "",
    address: "",
  },
  selectedMethod: null,
  errors: {},
  isModalOpen: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<Partial<PaymentFormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    updateSelectedMethod: (state, action: PayloadAction<string | null>) => {
      state.selectedMethod = action.payload;
    },
    updateErrors: (state, action: PayloadAction<Partial<PaymentFormData>>) => {
      state.errors = action.payload;
    },
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
  },
});

// Exporta las acciones y el reducer
export const { updateFormData, updateSelectedMethod, updateErrors, toggleModal } =
  paymentSlice.actions;
export default paymentSlice.reducer;
