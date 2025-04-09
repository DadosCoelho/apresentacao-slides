// src/app/api/presenter/route.ts
import { NextResponse } from 'next/server';

let presenterId: string | null = null;
let currentSlide = 0;

export async function GET() {
  return NextResponse.json({ presenterId, currentSlide });
}

export async function POST(request: Request) {
  const { password } = await request.json();
  if (password === 'D@ados' && !presenterId) {
    presenterId = crypto.randomUUID();
    currentSlide = 1;
    return NextResponse.json({ presenterId, currentSlide });
  }
  return NextResponse.json({ error: 'Senha incorreta ou apresentador já existe' }, { status: 403 });
}

export async function DELETE() {
  presenterId = null;
  currentSlide = 0;
  return NextResponse.json({ message: 'Apresentador expulso' });
}