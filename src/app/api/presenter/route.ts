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
  const { password, role } = await request.json();

  // Expulsa o apresentador atual (apenas por apresentadores ou tentativa de novo apresentador)
  if (password === 'sair' && (role === 'presenter' || !role)) {
    if (presenterId !== null) {
      presenterId = null;
      currentSlide = 0;
      return NextResponse.json({ message: 'Apresentador expulso', hasPresenter: false });
    }
    return NextResponse.json({ error: 'Nenhum apresentador para expulsar' }, { status: 400 });
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

  return NextResponse.json({ error: 'Senha incorreta ou papel inválido' }, { status: 403 });
}