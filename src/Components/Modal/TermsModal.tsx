import React from "react";
import Modal from "./Modal";  // Importamos el componente Modal base
import { TermsModalProps } from "../../Types/types";  // Importamos las props definidas en types.ts
import styles from "./Modal.module.css";  // Estilos específicos

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>  {/* Usamos `onClose` para manejar el cierre */}
      <div className={styles.ModalBody}>
        <h2>Términos y Condiciones</h2>
        <p>Aquí van los términos de servicio de Peekeshop.</p>
        
        <h3>1. Uso del sitio</h3>
        <p>Al acceder y utilizar nuestro sitio web, aceptas cumplir con los términos y condiciones establecidos en este acuerdo. Si no estás de acuerdo con estos términos, te recomendamos no usar nuestro servicio.</p>
        
        <h3>2. Productos</h3>
        <p>Los productos vendidos a través de nuestra tienda están destinados exclusivamente para el cuidado de perros y gatos. Los productos están sujetos a disponibilidad y pueden ser modificados sin previo aviso.</p>
        
        <h3>3. Precios y Pagos</h3>
        <p>Los precios de los productos están indicados en la moneda local e incluyen impuestos aplicables. El pago debe realizarse al momento de la compra mediante los métodos disponibles en el sitio.</p>
        
        <h3>4. Envíos</h3>
        <p>Los tiempos de envío son estimados y pueden variar según la ubicación del cliente. Peekeshop no se responsabiliza por retrasos causados por el servicio de mensajería o factores externos.</p>
        
        <h3>5. Devoluciones y Reembolsos</h3>
        <p>Las devoluciones son aceptadas dentro de los primeros 30 días posteriores a la compra. El producto debe estar en su estado original y sin uso. Los reembolsos se procesarán una vez que el producto sea recibido y verificado.</p>
        
        <h3>6. Responsabilidad</h3>
        <p>Peekeshop no se hace responsable por cualquier daño o lesión causada por el uso inadecuado de los productos. Asegúrate de seguir las instrucciones proporcionadas por los fabricantes de los productos.</p>
        
        <h3>7. Modificaciones de los Términos</h3>
        <p>Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones se publicarán en este sitio y entrarán en vigencia inmediatamente después de su publicación.</p>

        <p>Si tienes alguna pregunta sobre estos términos, por favor, contáctanos a través de nuestro servicio de atención al cliente.</p>
      </div>
    </Modal>
  );
};

export default TermsModal;
