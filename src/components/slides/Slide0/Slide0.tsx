// src/components/slides/Slide0/Slide0.tsx
import React from 'react';
import styles from './Slide0.module.css';

const Slide1: React.FC = () => {
  return (
      <div className={styles.container}>
        <h1 className={styles.title}>Apresentação</h1>
        <img src="/QRCodeApresentacao.png" alt="QR Code" className={styles.qrCode} />
        <h2 className={styles.subtitle}>Criando slides modernos para suas apresentações</h2>
      </div>
  );
};

export default Slide1;