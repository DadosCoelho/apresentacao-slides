// src/components/Navigation.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface NavigationProps {
  totalSlides: number;
  currentSlide: number;
  onNavigate: (slideNumber: number) => void;
}

const Navigation: React.FC<NavigationProps> = ({ totalSlides, currentSlide, onNavigate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPresenter, setIsPresenter] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const presenterStatus = localStorage.getItem('isPresenter') === 'true';
    // Removemos isSpectator pois não é necessário aqui, apenas isPresenter controla a navegação
    setIsPresenter(presenterStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isPresenter');
    localStorage.removeItem('presenterId');
    localStorage.removeItem('currentPresenterSlide');
    setIsPresenter(false);
    router.push('/slide/0');
  };

  return (
    <div
      className={`fixed bottom-4 right-4 flex gap-4 bg-black bg-opacity-70 p-4 rounded-lg transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-70'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
    >
      <button
        onClick={() => onNavigate(currentSlide - 1)}
        disabled={currentSlide === 0 || !isPresenter}
        className="px-4 py-2 bg-white text-black rounded-lg disabled:opacity-50"
      >
        Anterior
      </button>
      <div className="flex items-center text-white">
        {currentSlide} / {totalSlides}
      </div>
      <button
        onClick={() => onNavigate(currentSlide + 1)}
        disabled={currentSlide === totalSlides || !isPresenter}
        className="px-4 py-2 bg-white text-black rounded-lg disabled:opacity-50"
      >
        Próximo
      </button>
      {isPresenter && (
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Sair
        </button>
      )}
    </div>
  );
};

export default Navigation;