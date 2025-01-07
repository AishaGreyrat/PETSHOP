// Actualiza un campo específico del formulario
export const updateFormField = (
    formData: any,
    name: string,
    value: string | number
  ): any => {
    return { ...formData, [name]: value };
  };
  
  // Resetea un formulario a sus valores iniciales
  export const resetForm = (initialState: any): any => {
    return { ...initialState };
  };
  