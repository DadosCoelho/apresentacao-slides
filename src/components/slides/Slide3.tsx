// src/components/slides/Slide3.tsx
import React from 'react';
import SlideLayout from '../SlideLayout';

const Slide3: React.FC = () => {
  return (
    <SlideLayout 
      title="Contato & Dúvidas" 
      bgColor="bg-purple-800"
    >
      <div className="flex flex-col items-center justify-center space-y-8">
        <p className="text-4xl font-light">Obrigado pela atenção!</p>
        <div className="text-3xl mt-8">
          <p className="mb-4">✉️ email@exemplo.com</p>
          <p className="mb-4">🌐 www.seusite.com</p>
          <p>📱 (00) 12345-6789</p>
        </div>
      </div>
    </SlideLayout>
  );
};

export default Slide3;