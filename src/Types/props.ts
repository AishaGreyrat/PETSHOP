// Props para el componente Modal
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }
  
  // Props para componentes reutilizables
  export interface InputFieldProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  export interface ButtonProps {
    label: string;
    onClick: () => void;
  }
  
  // Props para AppBar y SearchBar
  export interface AppBarProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  }
  
  export interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    selectedCategory: string;
    setSelectedCategory: (value: string) => void;
  }
  
  // Props para formularios
  export interface LoginFormProps {
    closeModal?: () => void;
  }
  
  export interface RegisterFormProps {
    closeModal?: () => void;
  }
  
  export interface AddProductFormProps {
    closeModal?: () => void;
  }
  