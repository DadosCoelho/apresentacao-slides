// src/app/api/presenter/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Simulação de estado no servidor (em produção, use um banco de dados)
const presenter: { id: string | null; currentSlide: number } = {
  id: null,
  currentSlide: 0,
};

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const action = url.searchParams.get('action');

  if (action === 'expel') {
    if (presenter.id !== null) {
      presenter.id = null;
      presenter.currentSlide = 0;
      return NextResponse.json({ message: 'Presenter expelled' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'No presenter to expel' }, { status: 404 });
    }
  }

  return NextResponse.json({
    hasPresenter: presenter.id !== null,
    presenterId: presenter.id,
    currentSlide: presenter.currentSlide,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { role, presenterId } = body;

  if (role === 'presenter') {
    if (presenter.id === null) {
      // Tornar-se apresentador
      const newPresenterId = presenterId || Math.random().toString(36).substring(2); // Gera um ID único
      presenter.id = newPresenterId;
      presenter.currentSlide = 0;
      return NextResponse.json({ presenterId: newPresenterId, currentSlide: 0 }, { status: 200 });
    } else if (presenterId && presenter.id === presenterId) {
      // Expulsar o apresentador atual (mantido para compatibilidade com POST)
      presenter.id = null;
      presenter.currentSlide = 0;
      return NextResponse.json({ message: 'Presenter expelled' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Presenter already exists' }, { status: 403 });
    }
  } else if (role === 'spectator') {
    // Apenas retorna o slide atual do apresentador
    return NextResponse.json({ currentSlide: presenter.currentSlide }, { status: 200 });
  } else if (role === 'logout') {
    // Logout geral (limpa o apresentador)
    presenter.id = null;
    presenter.currentSlide = 0;
    return NextResponse.json({ message: 'Logged out' }, { status: 200 });
  }

  return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
}