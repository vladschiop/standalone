import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'User auth endpoint' })
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: 'User auth endpoint' })
}