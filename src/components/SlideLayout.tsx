// src/components/SlideLayout.tsx
import React, { ReactNode } from 'react';

interface SlideLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  bgColor?: string;
}

const SlideLayout: React.FC<SlideLayoutProps> = ({ 
  children, 
  title, 
  subtitle, 
  bgColor = 'bg-indigo-800' 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full h-screen ${bgColor} text-white p-16`}>
      {title && <h1 className="text-6xl font-bold mb-8 text-center">{title}</h1>}
      {subtitle && <h2 className="text-4xl font-medium mb-12 text-center">{subtitle}</h2>}
      <div className="text-3xl">{children}</div>
    </div>
  );
};

export default SlideLayout;