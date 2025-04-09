// src/components/slides/Slide1/Slide1.tsx
import React from 'react';
import styles from './Slide1.module.css';

const Slide1: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Apresentação com Next.js</h1>
      <h2 className={styles.subtitle}>Criando slides modernos para suas apresentações</h2>
      <div className={styles.content}>
        <ul className={styles.list}>
          <li className={styles.listItem}>Feito com Next.js e Tailwind CSS</li>
          <li className={styles.listItem}>Navegação entre slides com teclado</li>
          <li className={styles.listItem}>Compatível com dispositivos móveis</li>
        </ul>
      </div>
    </div>
  );
};

export default Slide1;