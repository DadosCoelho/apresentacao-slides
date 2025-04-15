// src/app/api/presenter/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Simulação de estado no servidor (em produção, use um banco de dados)
const presenter: { id: string | null; currentSlide: number } = {
  id: null,
  currentSlide: 0,
};

export async function GET() {
  return NextResponse.json({
    hasPresenter: presenter.id !== null,
    presenterId: presenter.id,
    currentSlide: presenter.currentSlide,
  });
}

export async function POST(request: NextRequest) { 
  const body = await request.json();
  const { role, presenterId, currentSlide } = body;

  if (role === 'presenter') {
    if (presenter.id === null) {
      const newPresenterId = presenterId || Math.random().toString(36).substring(2);
      presenter.id = newPresenterId;
      presenter.currentSlide = 0;
      return NextResponse.json({ presenterId: newPresenterId, currentSlide: 0 }, { status: 200 });
    } else if (presenterId && presenter.id === presenterId) {
      if (currentSlide !== undefined) {
        // Atualiza o slide atual do apresentador
        presenter.currentSlide = currentSlide;
        return NextResponse.json({ presenterId, currentSlide }, { status: 200 });
      }
      // Expulsar o apresentador
      presenter.id = null;
      presenter.currentSlide = 0;
      return NextResponse.json({ message: 'Presenter expelled' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Presenter already exists' }, { status: 403 });
    }
  } else if (role === 'spectator') {
    return NextResponse.json({ currentSlide: presenter.currentSlide }, { status: 200 });
  } else if (role === 'logout') {
    presenter.id = null;
    presenter.currentSlide = 0;
    return NextResponse.json({ message: 'Logged out' }, { status: 200 });
  }

  return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
}

