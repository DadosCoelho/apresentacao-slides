// src/components/Navigation.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface NavigationProps {
  totalSlides: number;
  currentSlide: number;
}

const Navigation: React.FC<NavigationProps> = ({ totalSlides, currentSlide }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const goToSlide = (slideNumber: number) => {
    if (slideNumber > 0 && slideNumber <= totalSlides) {
      router.push(`/slide/${slideNumber}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      goToSlide(currentSlide + 1);
    } else if (e.key === 'ArrowLeft') {
      goToSlide(currentSlide - 1);
    }
  };

  return (
    <div 
      className={`fixed bottom-4 right-4 flex gap-4 bg-black p-4 rounded-lg transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-5'}`}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
    >
      <button 
        onClick={() => goToSlide(currentSlide - 1)}
        disabled={currentSlide === 1}
        className="px-4 py-2 bg-white text-black rounded-lg disabled:opacity-80"
      >
        Anterior
      </button>
      <div className="flex items-center text-white">
        {currentSlide} / {totalSlides}
      </div>
      <button 
        onClick={() => goToSlide(currentSlide + 1)}
        disabled={currentSlide === totalSlides}
        className="px-4 py-2 bg-white text-black rounded-lg disabled:opacity-80"
      >
        Próximo
      </button>
    </div>
  );
};

export default Navigation;