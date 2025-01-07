import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <ul>
        <li><a href="#about" className={styles['footer-link']}>Acerca de</a></li>
        <li><a href="#contact" className={styles['footer-link']}>Contacto</a></li>
        <li><a href="#privacy" className={styles['footer-link']}>Privacidad</a></li>
      </ul>
      <p>© 2025 Mi E-commerce</p>
    </footer>
  );
};

export default Footer;
