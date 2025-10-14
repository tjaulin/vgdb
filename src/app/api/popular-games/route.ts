import { NextRequest, NextResponse } from 'next/server';
import { igdbService } from '@/lib/igdb';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache pour 1 heure

export async function GET(request: NextRequest) {
    try {
        // Récupérer les 50 jeux populaires
        const games = await igdbService.getPopularGames(50);

        return NextResponse.json({
            games,
            count: games.length,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching popular games:', error);
        return NextResponse.json(
            {
                error: 'Failed to fetch popular games',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
