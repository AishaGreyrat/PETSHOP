// Valida el formulario de pago
export const validatePaymentForm = (formData: any): Partial<any> => {
    const errors: Partial<any> = {};
    if (!formData.cardNumber.match(/^\d{16}$/)) {
      errors.cardNumber = "El número de tarjeta debe tener 16 dígitos.";
    }
    if (!formData.cardHolder) {
      errors.cardHolder = "El nombre del titular es obligatorio.";
    }
    if (!formData.address) {
      errors.address = "La dirección es obligatoria.";
    }
    return errors;
  };
  