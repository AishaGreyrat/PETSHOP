import React from "react";
import Modal from "./Modal";  // Importamos el componente Modal base
import { ContactModalProps } from "../../Types/types";  // Importamos las props definidas en types.ts
import styles from "./Modal.module.css";  // Estilos específicos

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  console.log("Modal isOpen:", isOpen); // Verifica si isOpen es true o false

  return (
    <Modal isOpen={isOpen} onClose={onClose}>  {/* Usamos `onClose` para manejar el cierre */}
      <div className={styles.ModalBody}>
        <h2>Contáctanos</h2>
        
        <p>También puedes visitarnos en nuestro perfil de Facebook: <a href="https://www.facebook.com/share/19wBWCqMNU/" target="_blank" rel="noopener noreferrer">Facebook Peekeshop</a>.</p>
        
        <p>O llamarnos al número: +1 999 492 3773.</p>
      </div>
    </Modal>
  );
};

export default ContactModal;