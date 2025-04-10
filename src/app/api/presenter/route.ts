// src/app/api/presenter/route.ts
import { NextResponse } from 'next/server';

let presenterId: string | null = null;
let currentSlide = 0;

export async function GET() {
  return NextResponse.json({ 
    presenterId, 
    currentSlide, 
    hasPresenter: presenterId !== null 
  });
}

export async function POST(request: Request) {
  const { role, presenterId: clientPresenterId } = await request.json();

  // Expulsar o apresentador atual
  if (role === 'presenter' && clientPresenterId === presenterId) {
    presenterId = null;
    currentSlide = 0;
    return NextResponse.json({ message: 'Apresentador expulso', hasPresenter: false });
  }

  // Criar um novo apresentador
  if (role === 'presenter' && !clientPresenterId) {
    if (presenterId === null) {
      presenterId = crypto.randomUUID();
      currentSlide = 1;
      return NextResponse.json({ presenterId, currentSlide, hasPresenter: true });
    } else {
      return NextResponse.json({ 
        error: 'Já existe um apresentador ativo.', 
        hasPresenter: true 
      }, { status: 403 });
    }
  }

  // Espectadores apenas consultam o estado
  if (role === 'spectator') {
    return NextResponse.json({ 
      presenterId, 
      currentSlide, 
      hasPresenter: presenterId !== null 
    });
  }

  return NextResponse.json({ error: 'Papel inválido ou ID do apresentador não corresponde' }, { status: 403 });
}