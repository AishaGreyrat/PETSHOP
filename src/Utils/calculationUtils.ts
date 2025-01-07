import { CartItem } from "@/Redux/types";

// Calcula el total del carrito
export const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

// Calcula el impuesto basado en un porcentaje
export const calculateTax = (amount: number, taxRate: number): number => {
  return amount * (taxRate / 100);
};

// Aplica un descuento a un monto
export const applyDiscount = (amount: number, discount: number): number => {
  return amount - discount;
};
