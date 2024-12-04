import React from "react";
import { useForm, Controller } from "react-hook-form"; // Usamos react-hook-form
import { zodResolver } from "@hookform/resolvers/zod"; // Resolver con Zod
import { paymentSchema } from "../../../ValidationSchemas/validationSchemas"; // Asegúrate de que el esquema esté importado correctamente
import { PaymentFormData } from "../../../Types/types";  // El tipo de datos del formulario, importado de `types.ts`

const PaymentForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),  // Usamos Zod para validación
  });

  const onSubmit = (data: PaymentFormData) => {
    console.log("Datos de pago enviados", data);
    closeModal();  // Cerrar el modal después de enviar el formulario
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Formulario de Pago</h2>

      <div>
        <label htmlFor="cardNumber">Número de Tarjeta</label>
        <Controller
          name="cardNumber"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="cardNumber"
              placeholder="Ingrese el número de la tarjeta"
              type="text"
            />
          )}
        />
        {errors.cardNumber && <p>{errors.cardNumber.message}</p>}
      </div>

      <div>
        <label htmlFor="cardHolder">Titular de la Tarjeta</label>
        <Controller
          name="cardHolder"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="cardHolder"
              placeholder="Nombre del titular"
              type="text"
            />
          )}
        />
        {errors.cardHolder && <p>{errors.cardHolder.message}</p>}
      </div>

      <div>
        <label htmlFor="expirationDate">Fecha de Vencimiento</label>
        <Controller
          name="expirationDate"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="expirationDate"
              placeholder="MM/AA"
              type="text"
            />
          )}
        />
        {errors.expirationDate && <p>{errors.expirationDate.message}</p>}
      </div>

      <div>
        <label htmlFor="cvv">CVV</label>
        <Controller
          name="cvv"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="cvv"
              placeholder="CVV"
              type="text"
            />
          )}
        />
        {errors.cvv && <p>{errors.cvv.message}</p>}
      </div>

      <button type="submit">Confirmar Pago</button>
    </form>
  );
};

export default PaymentForm;
