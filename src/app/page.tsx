// src/app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Slide1 from '@/components/slides/Slide1';
import Slide2 from '@/components/slides/Slide2';
import Slide3 from '@/components/slides/Slide3';

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
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

  // Este é o useEffect para pré-carregamento dos slides
  /*useEffect(() => {
    // Função para pré-carregar todos os slides
    const preloadSlides = () => {
      // Esta lógica garante que todos os componentes de slide sejam inicializados
      // mesmo que não estejam visíveis ainda
      const slides = [<Slide1 key="1" />, <Slide2 key="2" />, <Slide3 key="3" />];
      
      // Criar um container invisível para renderizar temporariamente os slides
      const preloadDiv = document.createElement('div');
      preloadDiv.style.position = 'absolute';
      preloadDiv.style.opacity = '0';
      preloadDiv.style.pointerEvents = 'none';
      preloadDiv.style.visibility = 'hidden';
      document.body.appendChild(preloadDiv);
      
      // Removemos o container após um segundo
      setTimeout(() => {
        if (document.body.contains(preloadDiv)) {
          document.body.removeChild(preloadDiv);
        }
      }, 1000);
    };
    
    preloadSlides();
  }, []); // Array vazio significa que este efeito roda apenas uma vez na montagem
*/
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
      
      <div className="fixed bottom-4 right-4 flex gap-4 bg-black bg-opacity-30 p-4 rounded-lg">
        <button 
          onClick={() => goToSlide(currentSlide - 1)}
          disabled={currentSlide === 1}
          className="px-4 py-2 bg-white text-black rounded-lg disabled:opacity-50"
        >
          Anterior
        </button>
        <div className="flex items-center text-white">
          {currentSlide} / {totalSlides}
        </div>
        <button 
          onClick={() => goToSlide(currentSlide + 1)}
          disabled={currentSlide === totalSlides}
          className="px-4 py-2 bg-white text-black rounded-lg disabled:opacity-50"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}