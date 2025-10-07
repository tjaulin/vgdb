import { NextRequest, NextResponse } from 'next/server';
import { igdbService } from '@/lib/igdb';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const limit = parseInt(searchParams.get('limit') || '20');

        const games = await igdbService.getRandomGames(limit);

        return NextResponse.json(games);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Erreur lors du chargement des jeux' },
            { status: 500 }
        );
    }
}