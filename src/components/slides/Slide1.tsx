// src/components/slides/Slide1.tsx
import React from 'react';
import SlideLayout from '../SlideLayout';

const Slide1: React.FC = () => {
  return (
    <SlideLayout 
      title="Apresentação com Next.js" 
      subtitle="Criando slides modernos para suas apresentações"
    >
      <ul className="list-disc space-y-6 pl-6">
        <li>Feito com Next.js e Tailwind CSS</li>
        <li>Navegação entre slides com teclado</li>
        <li>Compatível com dispositivos móveis</li>
      </ul>
    </SlideLayout>
  );
};

export default Slide1;