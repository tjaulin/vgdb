import { igdbService, Game } from '@/lib/igdb';
import SearchResults from '@/components/SearchResults';
import SearchEmpty from '@/components/SearchEmpty';
import type { Metadata } from 'next';

interface Props {
    searchParams: { q?: string };
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const query = searchParams.q;

    return {
        title: query ? `Résultats pour "${query}" - Video Games Database` : 'Recherche - Video Games Database',
        description: query ? `Découvrez les jeux correspondant à "${query}"` : 'Recherchez vos jeux vidéos préférés',
    };
}

export default async function SearchPage({ searchParams }: Props) {
    const query = searchParams.q;
    let games: Game[] = [];
    let error: string | null = null;

    if (!query) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <SearchEmpty />
            </div>
        );
    }

    try {
        games = await igdbService.searchGames(query, 20);
    } catch (err) {
        error = err instanceof Error ? err.message : 'Une erreur est survenue lors de la recherche';
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <SearchResults games={games} query={query} error={error} />
        </div>
    );
}