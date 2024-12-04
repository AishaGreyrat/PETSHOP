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
  