import { NextRequest, NextResponse } from 'next/server';
import { igdbService } from '@/lib/igdb';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '20');
        const offset = parseInt(searchParams.get('offset') || '0');

        // Récupérer les filtres depuis les paramètres d'URL
        const search = searchParams.get('search') || undefined;
        const genres = searchParams.get('genres')?.split(',').filter(Boolean) || [];
        const platforms = searchParams.get('platforms')?.split(',').filter(Boolean) || [];
        const themes = searchParams.get('themes')?.split(',').filter(Boolean) || [];

        console.log('🔍 API Route - Search param:', search); // Debug log

        const yearRangeParam = searchParams.get('yearRange');
        const yearRange = yearRangeParam ?
            yearRangeParam.split(',').map(Number) as [number, number] : undefined;

        const ratingRangeParam = searchParams.get('ratingRange');
        const ratingRange = ratingRangeParam ?
            ratingRangeParam.split(',').map(Number) as [number, number] : undefined;

        let games;

        // Si des filtres sont appliqués (incluant la recherche), utiliser getGamesWithFilters
        if (search || genres.length > 0 || platforms.length > 0 || themes.length > 0 || yearRange || ratingRange) {
            games = await igdbService.getGamesWithFilters({
                search,
                genres,
                platforms,
                themes,
                yearRange,
                ratingRange,
                limit,
                offset
            });
        }
        // Si aucun filtre n'est appliqué, utiliser getRecentGames
        else {
            games = await igdbService.getRecentGames(limit, offset);
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