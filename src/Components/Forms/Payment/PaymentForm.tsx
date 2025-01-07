import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema } from "../../../ValidationSchemas/validationSchemas";
import { PaymentFormData } from "../../../Types/types";
import "./Paymentform.css"; // Importación de los estilos

const PaymentForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    mode: "onChange", // Configuración para reducir errores excesivos
  });

  const onSubmit = (data: PaymentFormData) => {
    console.log("Datos de pago enviados", data);
    closeModal(); // Cerrar el modal después de enviar el formulario
  };

  return (
    <form className="payment-page" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="payment">Formulario de Pago</h2>

      <div className="payment-direccion">
        <label htmlFor="address">Dirección</label>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="address"
              placeholder="Ingrese su dirección"
              type="text"
              value={field.value || ""} // Asegurar que el valor sea string
            />
          )}
        />
        {errors.address && <p>{errors.address.message}</p>}
      </div>

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
              value={field.value || ""} // Asegurar que el valor sea string
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
              value={field.value || ""} // Asegurar que el valor sea string
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
              value={field.value || ""} // Asegurar que el valor sea string
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
              value={field.value || ""} // Asegurar que el valor sea string
            />
          )}
        />
        {errors.cvv && <p>{errors.cvv.message}</p>}
      </div>

      <button className="btn-confirm" type="submit">Confirmar Pago</button>
    </form>
  );
};

export default PaymentForm;
