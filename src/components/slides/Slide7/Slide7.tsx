// src/components/slides/Slide7/Slide7.tsx
import React from 'react';
import styles from './Slide7.module.css';

const Slide7: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recursos Principais PAG.7</h1>
      <div className={styles.content}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Responsivo</h3>
            <p className={styles.cardText}>Adaptável a qualquer tamanho de tela</p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Rápido</h3>
            <p className={styles.cardText}>Carregamento instantâneo entre slides</p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Personalizável</h3>
            <p className={styles.cardText}>Fácil de modificar e estilizar</p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Interativo</h3>
            <p className={styles.cardText}>Adicione elementos interativos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide7;