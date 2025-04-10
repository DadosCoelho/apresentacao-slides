//src/app/slide/[id]/page.tsx
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

  const [isPresenter, setIsPresenter] = useState(false);
  const [isSpectator, setIsSpectator] = useState(false);
  const [presenterSlide, setPresenterSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const totalSlides = 3;

  useEffect(() => {
    const fetchPresenterStatus = async () => {
      const response = await fetch('/api/presenter');
      const data = await response.json();
      const localIsPresenter = localStorage.getItem('isPresenter') === 'true';
      const localPresenterId = localStorage.getItem('presenterId');
      const localIsSpectator = localStorage.getItem('isSpectator') === 'true';
      setIsPresenter(localIsPresenter && localPresenterId === data.presenterId);
      setIsSpectator(localIsSpectator);
      setPresenterSlide(data.currentSlide);
      setIsLoading(false);

      // Se for espectador e o slide atual for diferente do apresentador, ajusta
      if (localIsSpectator && slideId !== data.currentSlide) {
        router.replace(`/slide/${data.currentSlide}`);
      }
    };

    fetchPresenterStatus(); // Chama ao montar

    // Polling a cada 2 segundos
    const interval = setInterval(() => {
      fetchPresenterStatus();
    }, 2000);

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar
  }, [slideId, router]);

  const handleNavigate = (slideNumber: number) => {
    if (slideNumber >= 0 && slideNumber <= totalSlides) {
      fetch('/api/presenter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: 'presenter',
          presenterId: localStorage.getItem('presenterId'),
          currentSlide: slideNumber,
        }),
      }).then(() => {
        setPresenterSlide(slideNumber);
        router.push(`/slide/${slideNumber}`);
      });
    }
  };

  if (isLoading) return null;
  if (!isPresenter && !isSpectator && slideId !== 0) return null;
  if (isSpectator && slideId > presenterSlide) return null;

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

  return (
    <div className="relative">
      {renderSlide()}
      <Navigation totalSlides={totalSlides} currentSlide={slideId} onNavigate={handleNavigate} />
    </div>
  );
};

export default SlidePage;