// src/components/slides/Slide9/Slide9.tsx
import React from 'react';
import styles from './Slide9.module.css';

const Slide9: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contato & Dúvidas</h1>
      <div className={styles.content}>
        <p className={styles.thanksText}>Obrigado pela atenção!</p>
        <div className={styles.contactInfo}>
          <p className={styles.contactItem}>✉️ email@exemplo.com</p>
          <p className={styles.contactItem}>🌐 www.seusite.com</p>
          <p className={styles.contactItem}>📱 (00) 12345-6789</p>
        </div>
      </div>
    </div>
  );
};

export default Slide9;