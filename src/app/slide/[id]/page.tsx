// src/app/slide/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Slide0 from '../../../components/slides/Slide0/Slide0';
import Slide1 from '@/components/slides/Slide1/Slide1';
import Slide2 from '@/components/slides/Slide2/Slide2';
import Slide3 from '@/components/slides/Slide3/Slide3';
import Navigation from '@/components/Navigation';

const SlidePage = () => {
  const params = useParams();
  const router = useRouter();
  const slideId = parseInt(params.id as string) || 0;
  const totalSlides = 3;

  const [isPresenter, setIsPresenter] = useState(false);
  const [presenterSlide, setPresenterSlide] = useState(0);

  useEffect(() => {
    const presenterStatus = localStorage.getItem('isPresenter') === 'true';
    setIsPresenter(presenterStatus);
    setPresenterSlide(parseInt(localStorage.getItem('currentPresenterSlide') || '0'));
  }, []);

  useEffect(() => {
    if (!isPresenter && slideId !== 0) {
      router.replace('/slide/0');
    }
  }, [isPresenter, slideId, router]);

  if (!isPresenter && slideId !== 0) {
    return null;
  }

  if (!isPresenter && slideId > presenterSlide) {
    return (
      <div className="flex items-center justify-center h-screen text-white bg-gray-800">
        <h1 className="text-2xl">Aguarde o apresentador avançar para este slide!</h1>
      </div>
    );
  }

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
        return <Slide0 />;
    }
  };

  const handleNavigate = (slideNumber: number) => {
    if (isPresenter && slideNumber >= 0 && slideNumber <= totalSlides) {
      localStorage.setItem('currentPresenterSlide', slideNumber.toString());
      setPresenterSlide(slideNumber);
      router.push(`/slide/${slideNumber}`);
    }
  };

  return (
    <div className="relative">
      {renderSlide()}
      <Navigation
        totalSlides={totalSlides}
        currentSlide={slideId}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default SlidePage;