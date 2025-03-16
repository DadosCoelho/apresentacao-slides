// src/components/slides/Slide2.tsx
import React from 'react';
import SlideLayout from '../SlideLayout';

const Slide2: React.FC = () => {
  return (
    <SlideLayout 
      title="Recursos Principais" 
      bgColor="bg-emerald-700"
    >
      <div className="grid grid-cols-2 gap-8 w-full">
        <div className="bg-white bg-opacity-20 p-8 rounded-lg">
          <h3 className="text-4xl font-bold mb-4 text-black">Responsivo</h3>
          <p className="text-2xl text-black">Adaptável a qualquer tamanho de tela</p>
        </div>
        <div className="bg-white bg-opacity-20 p-8 rounded-lg">
          <h3 className="text-4xl font-bold mb-4 text-black">Rápido</h3>
          <p className="text-2xl text-black">Carregamento instantâneo entre slides</p>
        </div>
        <div className="bg-white bg-opacity-20 p-8 rounded-lg">
          <h3 className="text-4xl font-bold mb-4 text-black">Personalizável</h3>
          <p className="text-2xl text-black">Fácil de modificar e estilizar</p>
        </div>
        <div className="bg-white bg-opacity-20 p-8 rounded-lg">
          <h3 className="text-4xl font-bold mb-4 text-black">Interativo</h3>
          <p className="text-2xl text-black">Adicione elementos interativos</p>
        </div>
      </div>
    </SlideLayout>
  );
};

export default Slide2;