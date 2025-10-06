import { igdbService, Game } from '@/lib/igdb';
import GameCard from '@/components/GameCard';
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
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Recherche de jeux</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Utilisez la barre de recherche en haut de la page pour trouver vos jeux préférés.
                    </p>
                    <a
                        href="/"
                        className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                        Retour à l&apos;accueil
                    </a>
                </div>
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
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Résultats de recherche
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    {games.length > 0
                        ? `${games.length} résultat${games.length > 1 ? 's' : ''} trouvé${games.length > 1 ? 's' : ''} pour "${query}"`
                        : `Aucun résultat trouvé pour "${query}"`}
                </p>
            </div>

            {error && (
                <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-500 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-6">
                    <p>{error}</p>
                </div>
            )}

            {games.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {games.map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            ) : query && !error ? (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Aucun jeu trouvé</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Essayez avec d&apos;autres mots-clés ou vérifiez l&apos;orthographe.
                    </p>
                    <a
                        href="/"
                        className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                        Découvrir des jeux populaires
                    </a>
                </div>
            ) : null}

            {games.length > 0 && (
                <div className="mt-12 text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Vous ne trouvez pas ce que vous cherchez ?
                    </p>
                    <a
                        href="/"
                        className="inline-block bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                        Explorer d&apos;autres jeux
                    </a>
                </div>
            )}
        </div>
    );
}