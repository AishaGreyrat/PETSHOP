import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema } from "../../../ValidationSchemas/validationSchemas";
import * as z from "zod";

type PaymentFormData = z.infer<typeof paymentSchema>;

const PaymentForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    mode: "onChange",
  });

  const onSubmit = (data: PaymentFormData) => {
    console.log("Datos de pago enviados:", data);
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Formulario de Pago</h2>

      {/* Campo Dirección */}
      <div>
        <label htmlFor="address">Dirección</label>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="address"
              placeholder="Ingrese su dirección"
              aria-invalid={!!errors.address}
            />
          )}
        />
        {errors.address && <p className="error">{errors.address.message}</p>}
      </div>

      {/* Campo Nombre */}
      <div>
        <label htmlFor="nombre">Nombre</label>
        <Controller
          name="nombre"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="nombre"
              placeholder="Ingrese su nombre"
              aria-invalid={!!errors.nombre}
            />
          )}
        />
        {errors.nombre && <p className="error">{errors.nombre.message}</p>}
      </div>

      {/* Campo Número de Tarjeta */}
      <div>
        <label htmlFor="cardNumber">Número de Tarjeta</label>
        <Controller
          name="cardNumber"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              aria-invalid={!!errors.cardNumber}
            />
          )}
        />
        {errors.cardNumber && <p className="error">{errors.cardNumber.message}</p>}
      </div>

      {/* Campo Titular de la Tarjeta */}
      <div>
        <label htmlFor="cardHolder">Titular de la Tarjeta</label>
        <Controller
          name="cardHolder"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="cardHolder"
              placeholder="Nombre completo"
              aria-invalid={!!errors.cardHolder}
            />
          )}
        />
        {errors.cardHolder && <p className="error">{errors.cardHolder.message}</p>}
      </div>

      {/* Campo Fecha de Vencimiento */}
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
              aria-invalid={!!errors.expirationDate}
            />
          )}
        />
        {errors.expirationDate && (
          <p className="error">{errors.expirationDate.message}</p>
        )}
      </div>

      {/* Campo CVV */}
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
              type="password"
              aria-invalid={!!errors.cvv}
            />
          )}
        />
        {errors.cvv && <p className="error">{errors.cvv.message}</p>}
      </div>

      <button type="submit">Confirmar Pago</button>
    </form>
  );
};

export default PaymentForm;
