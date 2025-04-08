// src/components/Navigation.tsx
import React, { useState } from 'react';

interface NavigationProps {
  totalSlides: number;
  currentSlide: number;
  onNavigate: (slideNumber: number) => void;
}

const Navigation: React.FC<NavigationProps> = ({ totalSlides, currentSlide, onNavigate }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`fixed bottom-4 right-4 flex gap-4 bg-black bg-opacity-70 p-4 rounded-lg transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-30'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
    >
      <button 
        onClick={() => onNavigate(currentSlide - 1)}
        disabled={currentSlide === 1}
        className="px-4 py-2 bg-white text-black rounded-lg disabled:opacity-50"
      >
        Anterior
      </button>
      <div className="flex items-center text-white">
        {currentSlide} / {totalSlides}
      </div>
      <button 
        onClick={() => onNavigate(currentSlide + 1)}
        disabled={currentSlide === totalSlides}
        className="px-4 py-2 bg-white text-black rounded-lg disabled:opacity-50"
      >
        Próximo
      </button>
    </div>
  );
};

export default Navigation;
