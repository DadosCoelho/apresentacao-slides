// src/components/slides/Slide0/Slide0.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Slide0.module.css';
import { useRouter } from 'next/navigation';

const Slide0: React.FC = () => {
  const [hasPresenter, setHasPresenter] = useState(false);
  const [isPresenter, setIsPresenter] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPresenterStatus = async () => {
      const response = await fetch('/api/presenter');
      const data = await response.json();
      setHasPresenter(data.hasPresenter);
      const localPresenterId = localStorage.getItem('presenterId');
      setIsPresenter(!!localPresenterId && localPresenterId === data.presenterId);
    };
    fetchPresenterStatus();
  }, []);

  const handlePresenterAction = async () => {
    if (hasPresenter) {
      // Expulsar o apresentador atual
      const storedPresenterId = localStorage.getItem('presenterId');
      const response = await fetch('/api/presenter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'presenter', presenterId: storedPresenterId }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.removeItem('isPresenter');
        localStorage.removeItem('presenterId');
        setHasPresenter(false);
        setIsPresenter(false);
      }
    } else {
      // Tornar-se apresentador
      const response = await fetch('/api/presenter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'presenter' }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('isPresenter', 'true');
        localStorage.setItem('presenterId', data.presenterId);
        setIsPresenter(true);
        setHasPresenter(true);
        router.push('/slide/1');
      }
    }
  };

  const handleSpectatorAccess = async () => {
    localStorage.setItem('isSpectator', 'true');
    localStorage.removeItem('isPresenter');
    localStorage.removeItem('presenterId');
    const response = await fetch('/api/presenter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'spectator' }),
    });
    const data = await response.json();
    if (response.ok) {
      router.push(`/slide/${data.currentSlide || 0}`);
    }
  };

  const handleLogout = async () => {
    const storedPresenterId = localStorage.getItem('presenterId');
    await fetch('/api/presenter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'presenter', presenterId: storedPresenterId }),
    });
    localStorage.removeItem('isPresenter');
    localStorage.removeItem('presenterId');
    setIsPresenter(false);
    setHasPresenter(false);
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
      <div className="mt-4 flex items-center justify-center gap-2">
        {!isPresenter ? (
          <>
            <button
              onClick={handlePresenterAction}
              className="p-2 bg-white text-black rounded w-60"
            >
              {hasPresenter ? 'Expulsar Apresentador' : 'Apresentador'}
            </button>
            <button
              onClick={handleSpectatorAccess}
              className="p-2 bg-blue-500 text-white rounded w-60"
            >
              Acessar como Espectador
            </button>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="p-2 bg-red-500 text-white rounded w-60"
          >
            Sair
          </button>
        )}
      </div>
    </div>
  );
};

export default Slide0;