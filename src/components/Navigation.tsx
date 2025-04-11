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
  const [presenterSlide, setPresenterSlide] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const presenter = localStorage.getItem('isPresenter') === 'true';
    const spectator = localStorage.getItem('isSpectator') === 'true';
    setIsPresenter(presenter);
    setIsSpectator(spectator);

    const fetchPresenterSlide = async () => {
      const response = await fetch('/api/presenter');
      const data = await response.json();
      if (presenter) {
        setPresenterSlide(data.currentSlide);
      }
    };

    fetchPresenterSlide();

    const interval = setInterval(() => {
      fetchPresenterSlide();
    }, 2000);

    return () => clearInterval(interval);
  }, [router]);

  const handleNavigate = (slide: number) => {
    if (isPresenter) {
      onNavigate(slide);
    } else if (isSpectator && slide >= 0 && slide <= presenterSlide) {
      router.push(`/slide/${slide}`);
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 flex gap-4 bg-black bg-opacity-70 p-4 rounded-lg transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-70'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {(isPresenter || isSpectator) && (
        <>
          <button
            onClick={() => handleNavigate(currentSlide - 1)}
            disabled={currentSlide === 0 || (isSpectator && currentSlide <= 0)}
            className="px-4 py-2 bg-white text-black rounded-lg disabled:opacity-50"
          >
            Anterior
          </button>
          <div className="flex items-center text-white">
            {currentSlide + 1} / {totalSlides + 1}
          </div>
          <button
            onClick={() => handleNavigate(currentSlide + 1)}
            disabled={
              currentSlide === totalSlides || (isSpectator && currentSlide >= presenterSlide)
            }
            className="px-4 py-2 bg-white text-black rounded-lg disabled:opacity-50"
          >
            Próximo
          </button>
        </>
      )}
    </div>
  );
};

export default Navigation;