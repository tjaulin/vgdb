import { NextRequest, NextResponse } from 'next/server';
import { igdbService } from '@/lib/igdb';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const query = searchParams.get('q');

        if (!query) {
            return NextResponse.json(
                { error: 'Paramètre de recherche manquant' },
                { status: 400 }
            );
        }

        const games = await igdbService.searchGames(query);

        return NextResponse.json(games);
    } catch (error) {
        console.error('API Search Error:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la recherche' },
            { status: 500 }
        );
    }
}