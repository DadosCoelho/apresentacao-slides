// src/app/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Slide0 from '../components/slides/Slide0/Slide0';
import Slide1 from '@/components/slides/Slide1/Slide1';
import Slide2 from '@/components/slides/Slide2/Slide2';
import Slide3 from '@/components/slides/Slide3/Slide3';
import Navigation from '@/components/Navigation';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0); // ID do slide atual
  const totalSlides = 3; // Total de slides disponíveis

  // Detecta se é mobile baseado no tamanho da tela
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Navegação com teclado (apenas para desktop)
  useEffect(() => {
    if (isMobile) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToSlide(currentSlide + 1);
      } else if (e.key === 'ArrowLeft') {
        goToSlide(currentSlide - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, isMobile]);

  const goToSlide = (slideNumber: number) => {
    if (slideNumber >= 0 && slideNumber <= totalSlides) {
      setCurrentSlide(slideNumber);
      
      // Para desktop: rolagem automática para o slide
      if (!isMobile) {
        const element = document.getElementById(`slide-${slideNumber}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  // Layout mobile: todos os slides empilhados verticalmente
  if (isMobile) {
    return (
      <div className="mobile-presentation">
        <div id="slide-0"><Slide0 /></div>
        <div id="slide-1"><Slide1 /></div>
        <div id="slide-2"><Slide2 /></div>
        <div id="slide-3"><Slide3 /></div>
      </div>
    );
  }

  // Layout desktop: exibe apenas o slide atual com navegação
  return (
    <div className="desktop-presentation">
      <div className="h-screen">
        {currentSlide === 0 && <Slide0 />}
        {currentSlide === 1 && <Slide1 />}
        {currentSlide === 2 && <Slide2 />}
        {currentSlide === 3 && <Slide3 />}
      </div>
      <Navigation totalSlides={totalSlides} currentSlide={currentSlide} onNavigate={goToSlide} />
    </div>
  );
}







