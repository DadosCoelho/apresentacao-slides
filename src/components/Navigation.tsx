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
  const [isSpectator, setIsSpectator] = useState(false);
  const [idSlidePresenter, setIdSlidePresenter] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const presenter = localStorage.getItem('isPresenter') === 'true';
    const spectator = localStorage.getItem('isSpectator') === 'true';
    const slidePresenter = parseInt(localStorage.getItem('idSlidePresenter') || '0');
    
    setIsPresenter(presenter);
    setIsSpectator(spectator);
    setIdSlidePresenter(slidePresenter);

    if (spectator && currentSlide > slidePresenter) {
      router.push(`/slide/${slidePresenter}`);
    }
  }, [currentSlide, router]);

  const handleNavigate = (slide: number) => {
    if (isPresenter) {
      localStorage.setItem('idSlidePresenter', slide.toString());
      setIdSlidePresenter(slide);
      onNavigate(slide);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/slide/0');
  };

  return (
    <div
      className={`fixed bottom-4 right-4 flex gap-4 bg-black bg-opacity-70 p-4 rounded-lg transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-70'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isPresenter && (
        <>
          <button
            onClick={() => handleNavigate(currentSlide - 1)}
            disabled={currentSlide === 0}
            className="px-4 py-2 bg-white text-black rounded-lg disabled:opacity-50"
          >
            Anterior
          </button>
          <div className="flex items-center text-white">
            {currentSlide} / {totalSlides}
          </div>
          <button
            onClick={() => handleNavigate(currentSlide + 1)}
            disabled={currentSlide === totalSlides}
            className="px-4 py-2 bg-white text-black rounded-lg disabled:opacity-50"
          >
            Próximo
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Sair
          </button>
        </>
      )}
      {isSpectator && (
        <div className="flex items-center text-white">
          {idSlidePresenter} / {totalSlides}
        </div>
      )}
    </div>
  );
};

export default Navigation;