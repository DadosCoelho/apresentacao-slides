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
  const [isSpectator, setIsSpectator] = useState(false);
  const [presenterSlide, setPresenterSlide] = useState(0);

  useEffect(() => {
    const fetchPresenterStatus = async () => {
      const response = await fetch('/api/presenter');
      const data = await response.json();
      const localIsPresenter = localStorage.getItem('isPresenter') === 'true';
      const localIsSpectator = localStorage.getItem('isSpectator') === 'true';
      setIsPresenter(localIsPresenter && data.presenterId !== null); // Só é apresentador se local e API confirmarem
      setIsSpectator(localIsSpectator);
      setPresenterSlide(data.currentSlide);
    };
    fetchPresenterStatus();
  }, []);

  useEffect(() => {
    if (!isPresenter && !isSpectator && slideId !== 0) {
      router.replace('/slide/0');
    }
    if (isSpectator && slideId > presenterSlide) {
      router.replace(`/slide/${presenterSlide}`);
    }
  }, [isPresenter, isSpectator, slideId, presenterSlide, router]);

  if (!isPresenter && !isSpectator && slideId !== 0) {
    return null;
  }

  if (isSpectator && slideId > presenterSlide) {
    return null;
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

  const handleNavigate = async (slideNumber: number) => {
    if (isPresenter && slideNumber >= 0 && slideNumber <= totalSlides) {
      try {
        const response = await fetch('/api/presenter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: 'D@ados' }), // Revalida a senha para manter o estado
        });
        const data = await response.json();
        if (response.ok) {
          setPresenterSlide(slideNumber);
          router.push(`/slide/${slideNumber}`);
        }
      } catch (err) {
        console.error('Erro ao navegar:', err);
      }
    }
  };

  return (
    <div className="relative">
      {renderSlide()}
      <Navigation totalSlides={totalSlides} currentSlide={slideId} onNavigate={handleNavigate} />
    </div>
  );
};

export default SlidePage;