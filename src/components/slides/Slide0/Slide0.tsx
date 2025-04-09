// src/components/slides/Slide0/Slide0.tsx
import React, { useState, useEffect } from 'react';
import styles from './Slide0.module.css';
import { useRouter } from 'next/navigation';

const Slide0: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const correctPassword = 'D@ados';

  useEffect(() => {
    const existingPresenter = localStorage.getItem('presenterId');
    if (existingPresenter && localStorage.getItem('isPresenter') !== 'true') {
      setError('Já existe um apresentador ativo. Aguarde ou expulse-o.');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      const existingPresenter = localStorage.getItem('presenterId');
      if (existingPresenter && localStorage.getItem('isPresenter') !== 'true') {
        setError('Já existe um apresentador ativo. Expulse-o primeiro.');
        return;
      }
      const presenterId = crypto.randomUUID();
      localStorage.setItem('isPresenter', 'true');
      localStorage.setItem('presenterId', presenterId);
      localStorage.setItem('currentPresenterSlide', '1');
      router.push('/slide/1');
    } else {
      setError('Senha incorreta!');
    }
  };

  const handleKickPresenter = () => {
    localStorage.removeItem('isPresenter');
    localStorage.removeItem('presenterId');
    localStorage.removeItem('currentPresenterSlide');
    setError('Apresentador expulso! Você pode entrar agora.');
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
      <button
        onClick={handleKickPresenter}
        className="mt-4 p-2 bg-red-500 text-white rounded"
      >
        Expulsar Apresentador
      </button>
    </div>
  );
};

export default Slide0;