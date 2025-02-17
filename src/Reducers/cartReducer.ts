import { CartAction, CartState } from "../Types/types";

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return { ...state, items: [...state.items, { ...product, quantity: 1 }] };
    }
    case 'REMOVE_ITEM': {
      const productId = action.payload.id;
      return {
        ...state,
        items: state.items.filter(item => item.id !== productId),
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'SET_CART':
      return { ...state, items: action.payload };
    default:
      return state;
  }
};
