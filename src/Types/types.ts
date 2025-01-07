// Interfaces relacionadas con productos y el carrito
export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category?: string;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export interface CartAction {
  type: "ADD_ITEM" | "REMOVE_ITEM" | "CLEAR_CART" | "SET_CART";
  payload?: any;
}

// Interfaces para el estado y datos de formularios
export type PaymentFormData = {
  address: string;
  cardNumber: string;
  cardHolder: string;
  expirationDate: string;
  cvv: string;
};
