// src/app/slide/[id]/page.tsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Slide0 from '../../../components/slides/Slide0/Slide0';
import Slide1 from '@/components/slides/Slide1/Slide1';
import Slide2 from '@/components/slides/Slide2/Slide2';
import Slide3 from '@/components/slides/Slide3/Slide3';
import Navigation from '@/components/Navigation';

const SlidePage = () => {
  const params = useParams(); // Obtém os parâmetros da URL
  const slideId = parseInt(params.id as string) || 1; // ID do slide atual
  const totalSlides = 3; // Total de slides disponíveis

  const renderSlide = () => {
    switch (slideId) {
      case 0:
        return <Slide0 />;
      case 1:
        return <Slide1 />;
      case 2:
        return <Slide2 />;
      case 3:
        return <Slide3 />;
      default:
        return <Slide1 />;
    }
  };

  return (
    <div className="relative">
      {renderSlide()}
      <Navigation 
        totalSlides={totalSlides} 
        currentSlide={slideId} 
        onNavigate={(slideNumber: number) => {
          console.log(`Navigating to slide ${slideNumber}`);
        }} 
      />
    </div>
  );
};

export default SlidePage;