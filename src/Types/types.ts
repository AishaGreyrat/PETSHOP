/* 
    Aqui se inicializan y definen las interfaces para ser consumidas por los componentes
    o paginas que lo requieran
*/

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
  }

  /* Parte de Payment */

  export type PaymentFormData = {
    address: string;         // Cambiado de Text a string
    cardNumber: string;      // Número de tarjeta
    cardHolder: string;      // Nombre del titular
    expirationDate: string;  // Fecha de vencimiento en formato MM/AA
    cvv: string;             // Código de seguridad
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
  }
  
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