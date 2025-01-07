// Valida un email
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[\\w-.]+@[\\w-]+\\.[a-z]{2,4}$/i;
    return emailRegex.test(email);
  };
  
  // Valida un número de tarjeta de crédito
  export const isValidCardNumber = (cardNumber: string): boolean => {
    return cardNumber.match(/^\d{16}$/) !== null;
  };
  
  // Valida un CVV
  export const isValidCVV = (cvv: string): boolean => {
    return cvv.match(/^\d{3}$/) !== null;
  };
  
  // Valida que un campo no esté vacío
  export const isNotEmpty = (value: string): boolean => {
    return value.trim() !== "";
  };
  