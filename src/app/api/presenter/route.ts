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
  const { password, role, presenterId: clientPresenterId } = await request.json();

  // Expulsa o apresentador atual (apenas por apresentadores ou tentativa de novo apresentador)
  if (password === 'sair' && role === 'presenter') {
    if (presenterId === null) {
      return NextResponse.json({ error: 'Nenhum apresentador para expulsar' }, { status: 400 });
    }
    if (clientPresenterId && clientPresenterId === presenterId) {
      presenterId = null;
      currentSlide = 0;
      return NextResponse.json({ message: 'Apresentador expulso', hasPresenter: false });
    }
    return NextResponse.json({ error: 'Apenas o apresentador atual pode expulsar' }, { status: 403 });
  }

  // Tenta criar um novo apresentador
  if (password === 'D@ados' && role === 'presenter') {
    if (presenterId === null) {
      presenterId = crypto.randomUUID();
      currentSlide = 1;
      return NextResponse.json({ presenterId, currentSlide, hasPresenter: true });
    } else {
      return NextResponse.json({ 
        error: 'Já existe um apresentador ativo. Use a senha "sair" para expulsá-lo.', 
        hasPresenter: true 
      }, { status: 403 });
    }
  }

  // Espectadores não podem alterar o estado, apenas consultar
  if (role === 'spectator') {
    return NextResponse.json({ 
      presenterId, 
      currentSlide, 
      hasPresenter: presenterId !== null 
    });
  }

  // Navegação ou outras ações do apresentador
  if (role === 'presenter' && clientPresenterId === presenterId) {
    return NextResponse.json({ presenterId, currentSlide, hasPresenter: true });
  }

  return NextResponse.json({ error: 'Senha incorreta, papel inválido ou ID do apresentador não corresponde' }, { status: 403 });
}