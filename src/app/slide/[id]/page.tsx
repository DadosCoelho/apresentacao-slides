// src/app/slide/[id]/page.tsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Slide1 from '@/components/slides/Slide1';
import Slide2 from '@/components/slides/Slide2';
import Slide3 from '@/components/slides/Slide3';
import Navigation from '@/components/Navigation';

const SlidePage = () => {
  const params = useParams();
  const slideId = parseInt(params.id as string) || 1;
  const totalSlides = 3;

  const renderSlide = () => {
    switch (slideId) {
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
          // Implement navigation logic here
          console.log(`Navigating to slide ${slideNumber}`);
        }} 
      />
    </div>
  );
};

export default SlidePage;