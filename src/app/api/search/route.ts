import { NextRequest, NextResponse } from 'next/server';
import { igdbService } from '@/lib/igdb';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const query = searchParams.get('q');
        const limit = parseInt(searchParams.get('limit') || '20');
        const offset = parseInt(searchParams.get('offset') || '0');

        if (!query) {
            return NextResponse.json(
                { error: 'Query parameter is required' },
                { status: 400 }
            );
        }

        const games = await igdbService.searchGames(query, limit, offset);

        return NextResponse.json({
            games,
            hasMore: games.length === limit
        });
    } catch (error) {
        console.error('Error searching games:', error);
        return NextResponse.json(
            { error: 'Failed to search games' },
            { status: 500 }
        );
    }
}