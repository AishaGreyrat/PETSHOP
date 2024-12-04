import React from "react";
import Modal from "./Modal";  // Importamos el componente Modal base
import PaymentForm from "../Forms/Payment/PaymentForm";  // El formulario de pago
import { PaymentModalProps } from "../../Types/types";  // Importa las props definidas en types.ts
import styles from "./Modal.module.css";  // Estilos específicos

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onCancel }) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>  {/* Usamos `onCancel` para manejar el cierre */}
      <div className={styles.ModalBody}>
        {/* Pasamos el `closeModal` que probablemente será un `onClose` para cerrar el modal */}
        <PaymentForm closeModal={onCancel} /> 
      </div>
    </Modal>
  );
};

export default PaymentModal;
