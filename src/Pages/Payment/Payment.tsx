import React from "react";
import PaymentForm from "@/Components/Forms/PaymentForm"; // Ajuste en la importación

const PaymentPage: React.FC = () => {
  const handleCloseModal = () => {
    console.log("Modal cerrado"); // Manejo de cierre, opcional
  };

  return (
    <div className={styles.paymentPage}>
      <h1 className={styles.title}>Pago</h1>
      <PaymentForm closeModal={handleCloseModal} /> {/* Proporciona la prop requerida */}
    </div>
  );
};

export default PaymentPage;
