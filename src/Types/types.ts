/* -------------------------------------- Props Components -------------------------------------- */

export interface AppBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

/* -------------------------------------- Props Modales -------------------------------------- */

export interface ModalProps {
  isOpen: boolean;           // Controla si el modal está visible
  onClose: () => void;       // Función para cerrar el modal
  children: React.ReactNode; // El contenido del modal
}

export interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
};

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
};

export interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
};

export interface PaymentModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  total: number;
};

/* Nuevas interfaces para los modales de Términos de Servicio y Contáctanos */
export interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* Nuevas interfaces para los modales adicionales que has solicitado */

export interface SignOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void; // Confirmación para cerrar sesión
}

export interface ClearCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void; // Confirmación para limpiar el carrito
}

export interface AddProductSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ConfirmSaveChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (e: React.FormEvent) => Promise<void>; // Confirmación para guardar los cambios (ahora recibe el evento)
}

export interface SaveChangesSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface AddToCartSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* Parte de Payment */

export type PaymentFormData = {
  address: string;
  cardNumber: string;
  cardHolder: string;
  expirationDate: string;
  cvv: string;
};

/* -------------------------------------- Props Forms -------------------------------------- */

export interface RegisterFormProps {
  closeModal?: () => void;
};

export interface LoginFormProps {
  closeModal?: () => void;
}

export interface AddProductFormProps {
  closeModal?: () => void;
}

export interface ButtonProps {
  label: string;             // El texto del botón
  onClick: () => void;       // Función para manejar el clic
};

/* -------------------------------------- Props Pages -------------------------------------- */

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category?: string;
  image?: string;
};

export interface ProductListProps {
  searchTerm: string;
  selectedCategory: string;
};

export interface ShopPageProps {
  searchTerm: string;
  selectedCategory: string;
};

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export interface CartAction {
  type: 'ADD_ITEM' | 'REMOVE_ITEM' | 'CLEAR_CART' | 'SET_CART';
  payload?: any;
}
