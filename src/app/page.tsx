// src/app/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/slide/1');
  }, [router]);

  return null; // Não renderiza nada, apenas redireciona
}