import React, { useState } from 'react';
import TermsModal from '../Modal/TermsModal';
import ContactModal from '../Modal/ContactModal';

const Footer: React.FC = () => {
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
    </footer>
  );
};

export default Footer;
