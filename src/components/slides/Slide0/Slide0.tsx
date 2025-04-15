// src/components/slides/Slide0/Slide0.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Slide0.module.css';
import { useRouter } from 'next/navigation';

const Slide0: React.FC = () => {
  const [hasPresenter, setHasPresenter] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkPresenter = async () => {
      const response = await fetch('/api/presenter');
      const { hasPresenter: serverHasPresenter } = await response.json();
      setHasPresenter(serverHasPresenter);

      const isPresenter = localStorage.getItem('isPresenter') === 'true';
      const isSpectator = localStorage.getItem('isSpectator') === 'true';

      if (!isPresenter && !isSpectator) {
        router.push('/slide/0');
      }
    };
    checkPresenter();
  }, [router]);

  const handlePresenter = async () => {
    const response = await fetch('/api/presenter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'presenter' }),
    });
    const { presenterId } = await response.json();
    if (response.ok) {
      localStorage.setItem('isPresenter', 'true');
      localStorage.setItem('isSpectator', 'false');
      localStorage.setItem('presenterId', presenterId);
      localStorage.setItem('idSlidePresenter', '0');
      setHasPresenter(true);
      router.push('/slide/1');
    }
  };

  const handleSpectator = async () => {
    const response = await fetch('/api/presenter');
    const { currentSlide } = await response.json();
    localStorage.setItem('isPresenter', 'false');
    localStorage.setItem('isSpectator', 'true');
    localStorage.setItem('idSlidePresenter', currentSlide || '0');
    router.push(`/slide/${currentSlide || 1}`);
  };

  const handleExpelPresenter = async () => {
    const response = await fetch('/api/presenter?action=expel', {
      method: 'GET',
    });
    if (response.ok) {
      localStorage.clear();
      setHasPresenter(false);
      router.push('/slide/0');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/presenter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'logout' }),
    });
    localStorage.clear();
    setHasPresenter(false);
    router.push('/slide/0');
  };

  const isPresenter = localStorage.getItem('isPresenter') === 'true';

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
      <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
        {!isPresenter && !hasPresenter && (
          <button
            onClick={handlePresenter}
            className="p-2 bg-white text-black rounded w-60"
          >
            Apresentador
          </button>
        )}
        {!isPresenter && hasPresenter && (
          <button
            onClick={handleSpectator}
            className="p-2 bg-blue-500 text-white rounded w-60"
          >
            Espectador
          </button>
        )}
        {isPresenter && (
          <button
            onClick={handleLogout}
            className="p-2 bg-red-500 text-white rounded w-60"
          >
            Sair
          </button>
        )}
        {hasPresenter && (
          <button
            onClick={handleExpelPresenter}
            className="p-2 bg-yellow-500 text-white rounded w-60"
          >
            Expulsar Apresentador
          </button>
        )}
      </div>
    </div>
  );
};

export default Slide0;