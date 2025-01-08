import React, { useState } from 'react';
import TermsModal from '../Modal/TermsModal';
import ContactModal from '../Modal/ContactModal';

const Footer: React.FC = () => {
<<<<<<< HEAD
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openTermsModal = () => setIsTermsModalOpen(true);
  const closeTermsModal = () => setIsTermsModalOpen(false);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  return (
    <footer className="footer">
      <div className="footerContent">
        <p className="footerText">&copy; 2024 Peekeshop. Todos los derechos reservados.</p>

        <ul className="footerLinks">
          <li>
            <a
              href="#terms"
              aria-label="Términos de servicio"
              onClick={(e) => {
                e.preventDefault();
                openTermsModal();
              }}
            >
              Términos de servicio
            </a>
          </li>
          <li>
            <a
              href="#contact"
              aria-label="Contáctanos"
              onClick={(e) => {
                e.preventDefault();
                openContactModal();
              }}
            >
              Contáctanos
            </a>
          </li>
        </ul>
      </div>

      {/* Modal de Términos de servicio */}
      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={closeTermsModal}
      />

      {/* Modal de Contacto */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
      />
=======
  return (
    <footer className={styles.footer}>
      <ul>
        <li><a href="#about" className={styles['footer-link']}>Acerca de</a></li>
        <li><a href="#contact" className={styles['footer-link']}>Contacto</a></li>
        <li><a href="#privacy" className={styles['footer-link']}>Privacidad</a></li>
      </ul>
      <p>© 2025 Mi E-commerce</p>
>>>>>>> 0be6c39261925c93c5446d6c80f23aa47ce7343c
    </footer>
  );
};

export default Footer;
