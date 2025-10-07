import { NextRequest, NextResponse } from 'next/server';
import { igdbService } from '@/lib/igdb';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '20');
        const offset = parseInt(searchParams.get('offset') || '0');

        // Récupérer les filtres depuis les paramètres d'URL
        const genres = searchParams.get('genres')?.split(',').filter(Boolean) || [];
        const platforms = searchParams.get('platforms')?.split(',').filter(Boolean) || [];

        const yearRangeParam = searchParams.get('yearRange');
        const yearRange = yearRangeParam ?
            yearRangeParam.split(',').map(Number) as [number, number] : undefined;

        const ratingRangeParam = searchParams.get('ratingRange');
        const ratingRange = ratingRangeParam ?
            ratingRangeParam.split(',').map(Number) as [number, number] : undefined;

        let games;

        // Si aucun filtre n'est appliqué, utiliser getRecentGames avec offset pour pagination
        if (genres.length === 0 && platforms.length === 0 && !yearRange && !ratingRange) {
            games = await igdbService.getRecentGames(limit, offset);
        } else {
            // Utiliser la nouvelle méthode avec filtres
            games = await igdbService.getGamesWithFilters({
                genres,
                platforms,
                yearRange,
                ratingRange,
                limit,
                offset
            });
        }

        return NextResponse.json({ games, hasMore: games.length === limit });
    } catch (error) {
        console.error('Error fetching games:', error);
        return NextResponse.json(
            { error: 'Failed to fetch games' },
            { status: 500 }
        );
    }
}