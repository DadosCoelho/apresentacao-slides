// src/app/api/presenter/route.ts
import { NextResponse } from 'next/server';

let presenterId: string | null = null;
let currentSlide = 0;

export async function GET() {
  return NextResponse.json({ 
    presenterId, 
    currentSlide, 
    hasPresenter: presenterId !== null // Informa se já existe um apresentador
  });
}

export async function POST(request: Request) {
  const { password } = await request.json();

  // Expulsa o apresentador atual
  if (password === 'sair') {
    presenterId = null;
    currentSlide = 0;
    return NextResponse.json({ message: 'Apresentador expulso', hasPresenter: false });
  }

  // Tenta criar um novo apresentador
  if (password === 'D@ados') {
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

  return NextResponse.json({ error: 'Senha incorreta' }, { status: 403 });
}