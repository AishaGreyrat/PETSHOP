import { useState } from "react";
import { validatePaymentForm } from "@/Reducers/paymentReducerHelpers";

const useValidatePaymentForm = (initialFormData: any) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  // Valida el formulario y actualiza los errores
  const validateForm = () => {
    const validationErrors = validatePaymentForm(formData);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0; // Retorna si el formulario es válido
  };

  return { formData, setFormData, errors, validateForm };
};

export default useValidatePaymentForm;
