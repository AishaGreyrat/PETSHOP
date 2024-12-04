import { Dispatch, FormEvent } from "react";
import { CartAction } from "../Contexts/CartContext";  // Asumiendo que CartContext está en esa ruta
import { doc, increment, updateDoc } from "firebase/firestore";

// Función para eliminar un producto del carrito
export const handleRemove = (id: string, dispatch: Dispatch<CartAction>) => {
  dispatch({ type: "REMOVE_ITEM", payload: { id } });
};

// Función para limpiar el carrito
export const handleClearCart = (dispatch: Dispatch<CartAction>) => {
  dispatch({ type: "CLEAR_CART" });
};

// Cambiar método de pago
export const handleMethodChange = (
  method: string,
  setSelectedMethod: React.Dispatch<React.SetStateAction<string | null>>,
  setErrors: React.Dispatch<React.SetStateAction<any>>
) => {
  setSelectedMethod(method);
  setErrors({ cardNumber: "", cardHolder: "", expirationDate: "", cvv: "" });
};

// Manejo de cambios en los campos del formulario
export const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setFormData: React.Dispatch<React.SetStateAction<any>>
) => {
  const { name, value } = e.target;
  setFormData((prevData: any) => ({ ...prevData, [name]: value }));
};

// Manejo de envío del formulario (para validar y mostrar el modal)
export const handleSubmit = (
  e: React.FormEvent,
  validateForm: Function,
  formData: any,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  e.preventDefault();
  const { valid, errors } = validateForm(formData);
  if (valid) {
    setIsModalOpen(true); // Abre el modal de confirmación si el formulario es válido
  } else {
    // Manejo de errores si no es válido
    console.log(errors);
  }
};

// Confirmación de pago y actualización de la cantidad en la base de datos
export const handleConfirmPayment = async (
  state: any,
  dispatch: Dispatch<CartAction>,
  navigate: any,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  db: any // Suponiendo que has importado db desde tu configuración de Firebase
) => {
  // Simula el procesamiento del pago
  alert("Pago realizado con éxito");

  try {
    for (const item of state.items) {
      const productRef = doc(db, "products", item.id); // Asegúrate de que 'products' es tu colección en Firebase
      await updateDoc(productRef, {
        quantity: increment(-item.quantity), // Decrementa la cantidad según el carrito
      });
    }

    // Vaciar el carrito local después de procesar el pago
    dispatch({ type: "CLEAR_CART" });

    // Redirige al usuario a la página de inicio
    navigate("/");
  } catch (error) {
    console.error("Error al actualizar las cantidades en Firebase: ", error);
    alert("Hubo un error al procesar tu pago.");
  } finally {
    setIsModalOpen(false); // Cerrar el modal después de procesar el pago
  }
};

// Cerrar el modal sin realizar el pago
export const handleCancelPayment = (
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsModalOpen(false);
};

export const handleSubmitPayment = (
    e: FormEvent,
    formData: any,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    e.preventDefault();
    console.log("Datos de pago enviados:", formData);
  
    // Lógica para procesar el pago (por ejemplo, llamando a una API o gestionando el estado)
    // Al final, abre el modal de confirmación
    setIsModalOpen(true);
  };
