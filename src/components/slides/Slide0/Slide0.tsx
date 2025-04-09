// src/components/slides/Slide0/Slide0.tsx
import React, { useState } from 'react';
import styles from './Slide0.module.css';
import { useRouter } from 'next/navigation';

const Slide0: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const correctPassword = 'D@dos'; // Defina sua senha aqui

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      localStorage.setItem('isPresenter', 'true'); // Marca o usuário como apresentador
      localStorage.setItem('currentPresenterSlide', '1'); // Define o slide inicial
      router.push('/slide/1'); // Navega para o Slide 1
    } else {
      setError('Senha incorreta!');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Apresentação</h1>
      <img src="/QRCodeApresentacao.png" alt="QR Code" className={styles.qrCode} />
      <h2 className={styles.subtitle}>Criando slides modernos para suas apresentações</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite a senha"
          className="p-2 rounded text-black"
        />
        <button type="submit" className="ml-2 p-2 bg-white text-black rounded">
          Entrar
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default Slide0;