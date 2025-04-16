//src/app/slide/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Slide0 from '../../../components/slides/Slide0/Slide0';
import Slide1 from '../../../components/slides/Slide1/Slide1';
import Slide2 from '../../../components/slides/Slide2/Slide2';
import Slide3 from '../../../components/slides/Slide3/Slide3';
import Slide4 from '../../../components/slides/Slide4/Slide4';
import Slide5 from '../../../components/slides/Slide5/Slide5';
import Slide6 from '../../../components/slides/Slide6/Slide6';
import Slide7 from '../../../components/slides/Slide7/Slide7';
import Navigation from '@/components/Navigation';

const SlidePage = () => {
  const params = useParams();
  const router = useRouter();
  const slideId = parseInt(params.id as string) || 0;

  const [isPresenter, setIsPresenter] = useState(false);
  const [isSpectator, setIsSpectator] = useState(false);
  const [presenterSlide, setPresenterSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const totalSlides = 7;

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
    if (isLoading) return;
    if (!isPresenter && !isSpectator && slideId !== 0) {
      router.replace('/slide/0');
    } else if (isSpectator && slideId > presenterSlide) {
      router.replace(`/slide/${presenterSlide}`);
    }
  }, [isPresenter, isSpectator, slideId, presenterSlide, router, isLoading]);

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
      case 4:
        return <Slide4 />;
      case 5:
        return <Slide5 />;
      case 6:
        return <Slide6 />;
      case 7:
        return <Slide7 />;
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