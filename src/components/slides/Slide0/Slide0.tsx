// src/components/slides/Slide0/Slide0.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './Slide0.module.css';
import { useRouter } from 'next/navigation';

const Slide0: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPasswordField, setShowPasswordField] = useState(false);
  const router = useRouter();

  const handlePresenterClick = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!showPasswordField) {
      setShowPasswordField(true);
      return;
    }

    try {
      const response = await fetch('/api/presenter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json(); // Dados da resposta da API

      if (response.ok) {
        if (data.message === 'Apresentador expulso') {
          setError('Apresentador expulso! Você pode entrar como apresentador agora.');
          setPassword('');
          setShowPasswordField(false);
        } else {
          localStorage.setItem('isPresenter', 'true');
          localStorage.setItem('presenterId', data.presenterId);
          router.push('/slide/1');
        }
      } else {
        setError(data.error || 'Erro ao autenticar'); // Usa data.error explicitamente
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor');
      console.error(err);
    }
  };

  const handleSpectatorAccess = () => {
    localStorage.setItem('isSpectator', 'true');
    localStorage.removeItem('isPresenter');
    router.push('/slide/0');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Apresentação</h1>
      <Image
        src="/QRCodeApresentacao.png"
        alt="QR Code"
        width={300}
        height={300}
        className={styles.qrCode}
      />
      <h2 className={styles.subtitle}>Criando slides modernos para suas apresentações</h2>
      <form onSubmit={handlePresenterClick} className="mt-4 flex items-center justify-center gap-2">
        {showPasswordField && (
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha do apresentador"
            className="p-2 rounded text-black"
            autoFocus
          />
        )}
        <button type="submit" className="p-2 bg-white text-black rounded w-60">
          {showPasswordField ? 'Entrar' : 'Apresentador'}
        </button>
        <button
          type="button"
          onClick={handleSpectatorAccess}
          className="p-2 bg-blue-500 text-white rounded w-60"
        >
          Acessar como Espectador
        </button>
      </form>
      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
    </div>
  );
};

export default Slide0;