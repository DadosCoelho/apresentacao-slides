// src/app/slide/[id]/page.tsx
'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Slide0 from '../../../components/slides/Slide0/Slide0';
import Slide1 from '@/components/slides/Slide1/Slide1';
import Slide2 from '@/components/slides/Slide2/Slide2';
import Slide3 from '@/components/slides/Slide3/Slide3';
import Navigation from '@/components/Navigation';

const SlidePage = () => {
  const params = useParams();
  const router = useRouter();
  const slideId = parseInt(params.id as string) || 0; // ID do slide atual
  const totalSlides = 3;

  // Verifica se o usuário é o apresentador
  const isPresenter = localStorage.getItem('isPresenter') === 'true';
  // Obtém o slide atual do apresentador
  const presenterSlide = parseInt(localStorage.getItem('currentPresenterSlide') || '0');

  // Redireciona para o Slide 0 se não for apresentador e tentar acessar outro slide
  useEffect(() => {
    if (!isPresenter && slideId !== 0) {
      router.replace('/slide/0');
    }
  }, [isPresenter, slideId, router]);

  // Bloqueia qualquer slide além do 0 se não for apresentador
  if (!isPresenter && slideId !== 0) {
    return null; // Não renderiza nada enquanto redireciona
  }

  // Restringe acesso a slides futuros para não apresentadores (após autenticação do apresentador)
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