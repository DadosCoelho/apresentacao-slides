'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Slide0.module.css';
import { useRouter } from 'next/navigation';

const Slide0: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [hasPresenter, setHasPresenter] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPresenterStatus = async () => {
      const response = await fetch('/api/presenter');
      const data = await response.json();
      setHasPresenter(data.hasPresenter);
    };
    fetchPresenterStatus();
  }, []);

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
        body: JSON.stringify({ password, role: 'presenter' }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.message === 'Apresentador expulso') {
          setError('Apresentador expulso! Você pode entrar como apresentador agora.');
          setHasPresenter(false);
          setPassword('');
          setShowPasswordField(false);
        } else {
          localStorage.setItem('isPresenter', 'true');
          localStorage.setItem('presenterId', data.presenterId); // Armazena o presenterId
          router.push('/slide/1');
        }
      } else {
        setError(data.error || 'Erro ao autenticar');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor');
      console.error(err);
    }
  };

  const handleSpectatorAccess = async () => {
    localStorage.setItem('isSpectator', 'true');
    localStorage.removeItem('isPresenter');
    localStorage.removeItem('presenterId'); // Remove presenterId para espectadores
    try {
      const response = await fetch('/api/presenter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'spectator' }),
      });
      const data = await response.json();
      if (response.ok) {
        router.push(`/slide/${data.currentSlide || 0}`);
      }
    } catch (err) {
      console.error('Erro ao acessar como espectador:', err);
      router.push('/slide/0');
    }
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
            placeholder={hasPresenter ? 'Senha para expulsar (sair)' : 'Senha do apresentador'}
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
      {hasPresenter && !showPasswordField && (
        <p className="text-yellow-300 mt-2 text-center">
          Já existe um apresentador ativo. Use a senha <strong>&quot;sair&quot;</strong> para expulsá-lo.
        </p>
      )}
    </div>
  );
};

export default Slide0;