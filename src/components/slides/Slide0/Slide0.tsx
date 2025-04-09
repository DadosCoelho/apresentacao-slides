// src/components/slides/Slide0/Slide0.tsx
import React, { useState, useEffect } from 'react';
import styles from './Slide0.module.css';
import { useRouter } from 'next/navigation';

const Slide0: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPasswordField, setShowPasswordField] = useState(false);
  const router = useRouter();
  const correctPassword = 'D@ados';
  const kickPassword = 'sair';

  useEffect(() => {
    const existingPresenter = localStorage.getItem('presenterId');
    if (existingPresenter && localStorage.getItem('isPresenter') !== 'true') {
      setError('Já existe um apresentador ativo. Use a senha oculta para expulsá-lo.');
    }
  }, []);

  const handlePresenterClick = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!showPasswordField) {
      setShowPasswordField(true);
      return;
    }

    const existingPresenter = localStorage.getItem('presenterId');
    console.log('Senha digitada:', password); // Log para depuração
    console.log('Presenter existente:', existingPresenter);

    if (password === kickPassword) {
      localStorage.removeItem('isPresenter');
      localStorage.removeItem('presenterId');
      localStorage.removeItem('currentPresenterSlide');
      setError('Apresentador expulso! Você pode entrar como apresentador agora.');
      setPassword('');
      setShowPasswordField(false);
      console.log('Apresentador expulso');
      return;
    }

    if (password === correctPassword) {
      if (existingPresenter && localStorage.getItem('isPresenter') !== 'true') {
        setError('Já existe um apresentador ativo. Use a senha oculta para expulsá-lo.');
        return;
      }
      const presenterId = crypto.randomUUID();
      localStorage.setItem('isPresenter', 'true');
      localStorage.setItem('presenterId', presenterId);
      localStorage.setItem('currentPresenterSlide', '1');
      console.log('Autenticado como apresentador:', { isPresenter: localStorage.getItem('isPresenter'), presenterId });
      router.push('/slide/1');
    } else {
      setError('Senha incorreta!');
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
      <img src="/QRCodeApresentacao.png" alt="QR Code" className={styles.qrCode} />
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
        <button
          type="submit"
          className="p-2 bg-white text-black rounded w-60"
        >
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