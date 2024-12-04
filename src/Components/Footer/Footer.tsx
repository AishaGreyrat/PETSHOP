import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p className={styles.footerText}>&copy; 2024 Peekeshop. Todos los derechos reservados.</p>

        <ul className={styles.footerLinks}>
          <li><a href="#terms" aria-label="Términos de servicio">Términos de servicio</a></li>
          <li><a href="#contact" aria-label="Contáctanos">Contáctanos</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
