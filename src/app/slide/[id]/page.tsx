//src/app/slide/[id]/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Slide0 from '../../../components/slides/Slide0/Slide0';
import Slide1 from '@/components/slides/Slide1/Slide1';
import Slide2 from '@/components/slides/Slide2/Slide2';
import Slide3 from '@/components/slides/Slide3/Slide3';

const SlidePage = () => {
  const params = useParams();
  const router = useRouter();
  const slideId = parseInt(params.id as string) || 0;

  const [isPresenter, setIsPresenter] = useState(false);
  const [isSpectator, setIsSpectator] = useState(false);
  const [presenterSlide, setPresenterSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Carrega o status do apresentador
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

  // Lógica de redirecionamento
  useEffect(() => {
    if (isLoading) return; // Aguarda o carregamento

    if (!isPresenter && !isSpectator && slideId !== 0) {
      router.replace('/slide/0');
    } else if (isSpectator && slideId > presenterSlide) {
      router.replace(`/slide/${presenterSlide}`);
    }
  }, [isPresenter, isSpectator, slideId, presenterSlide, router, isLoading]);

  // Renderiza apenas após o carregamento e se as condições forem atendidas
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
    </div>
  );
};

export default SlidePage;