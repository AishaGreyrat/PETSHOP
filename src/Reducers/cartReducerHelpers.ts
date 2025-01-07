import { CartItem } from "@/Redux/types";

// Calcula el total del carrito
export const calculateTotal = (items: CartItem[]): number =>
  items.reduce((acc, item) => acc + item.price * item.quantity, 0);

// Busca un producto en el carrito
export const findCartItem = (items: CartItem[], id: string): CartItem | undefined =>
  items.find((item) => item.id === id);

// Incrementa la cantidad de un producto en el carrito
export const incrementCartItem = (items: CartItem[], item: CartItem): CartItem[] => {
  return items.map((existingItem) =>
    existingItem.id === item.id
      ? { ...existingItem, quantity: existingItem.quantity + item.quantity }
      : existingItem
  );
};
