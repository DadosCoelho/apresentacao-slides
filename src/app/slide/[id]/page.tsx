//src/app/slide/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';

// Função para importar slides dinamicamente
const loadSlide = (id: number) => {
  return dynamic(() => import(`../../../components/slides/Slide${id}/Slide${id}`), {
    loading: () => <div>Carregando...</div>,
  });
};

const SlidePage = () => {
  const params = useParams();
  const router = useRouter();
  const slideId = parseInt(params.id as string) || 0;

  const [isPresenter, setIsPresenter] = useState(false);
  const [isSpectator, setIsSpectator] = useState(false);
  const [presenterSlide, setPresenterSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [totalSlides, setTotalSlides] = useState(0);

  // Determinar o número total de slides dinamicamente
  useEffect(() => {
    const fetchTotalSlides = async () => {
      let slideCount = 0;
      try {
        // Tenta importar slides até encontrar um que não existe
        while (true) {
          await import(`../../../components/slides/Slide${slideCount}/Slide${slideCount}`);
          slideCount++;
        }
      } catch {
        setTotalSlides(slideCount);
      }
    };
    fetchTotalSlides();
  }, []);

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
    };
    fetchPresenterStatus();
  }, []);

  useEffect(() => {
    if (isLoading || totalSlides === 0) return;
    if (!isPresenter && !isSpectator && slideId !== 0) {
      router.replace('/slide/0');
    } else if (isSpectator && slideId > presenterSlide) {
      router.replace(`/slide/${presenterSlide}`);
    } else if (slideId >= totalSlides) {
      router.replace(`/slide/${totalSlides - 1}`);
    }
  }, [isPresenter, isSpectator, slideId, presenterSlide, router, isLoading, totalSlides]);

  const handleNavigate = (slideNumber: number) => {
    if (slideNumber >= 0 && slideNumber < totalSlides) {
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

  if (isLoading || totalSlides === 0) return <div>Carregando...</div>;
  if (!isPresenter && !isSpectator && slideId !== 0) return null;
  if (isSpectator && slideId > presenterSlide) return null;
  if (slideId >= totalSlides) return null;

  // Carrega o componente do slide dinamicamente
  const SlideComponent = loadSlide(slideId);

  return (
    <div className="relative">
      <SlideComponent />
      <Navigation totalSlides={totalSlides - 1} currentSlide={slideId} onNavigate={handleNavigate} />
    </div>
  );
};

export default SlidePage;