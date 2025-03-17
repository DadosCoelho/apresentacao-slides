// src/app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Slide1 from '@/components/slides/Slide1';
import Slide2 from '@/components/slides/Slide2';
import Slide3 from '@/components/slides/Slide3';

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const totalSlides = 3;

  // Este é o useEffect para navegação com teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToSlide(currentSlide + 1);
      } else if (e.key === 'ArrowLeft') {
        goToSlide(currentSlide - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const goToSlide = (slideNumber: number) => {
    if (slideNumber > 0 && slideNumber <= totalSlides) {
      setCurrentSlide(slideNumber);
    }
  };

  const renderSlide = () => {
    switch (currentSlide) {
      case 1: return <Slide1 />;
      case 2: return <Slide2 />;
      case 3: return <Slide3 />;
      default: return <Slide1 />;
    }
  };

  return (
    <div className="presentation">
      {renderSlide()}
      
      <div 
        className={`fixed bottom-4 right-4 flex gap-4  bg-opacity-100 p-4 rounded-lg transition-opacity duration-300 ${isNavHovered ? 'opacity-30' : 'opacity-3'}`}
        onMouseEnter={() => setIsNavHovered(true)}
        onMouseLeave={() => setIsNavHovered(false)}
      >
        <button 
          onClick={() => goToSlide(currentSlide - 1)}
          disabled={currentSlide === 1}
          className="px-4 py-2 bg-white text-black rounded-lg disabled:opacity-30"
        >
          Anterior
        </button>
        <div className="flex items-center text-white">
          {currentSlide} / {totalSlides}
        </div>
        <button 
          onClick={() => goToSlide(currentSlide + 1)}
          disabled={currentSlide === totalSlides}
          className="px-4 py-2 bg-white text-black rounded-lg disabled:opacity-30"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}