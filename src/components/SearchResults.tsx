'use client';

import { Game } from '@/lib/igdb';
import { useLanguage } from '@/contexts/LanguageContext';
import GameCard from '@/components/GameCard';

interface SearchResultsProps {
    games: Game[];
    query: string;
    error: string | null;
}

export default function SearchResults({ games, query, error }: SearchResultsProps) {
    const { t, language } = useLanguage();

    if (error) {
        return (
            <div className="text-center">
                <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-500 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
                    <h2 className="text-xl font-semibold mb-2">{t.game.loadingError}</h2>
                    <p className="mb-4">{error}</p>
                    <a
                        href="/"
                        className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded transition-colors"
                    >
                        {t.game.backToHome}
                    </a>
                </div>
            </div>
        );
    }

    if (games.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {t.search.notFound}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    {language === 'fr'
                        ? `Aucun jeu trouvé pour "${query}". ${t.search.tryOther}`
                        : `${t.search.notFound} for "${query}". ${t.search.tryOther}`
                    }
                </p>
                <a
                    href="/"
                    className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                    {t.game.backToHome}
                </a>
            </div>
        );
    }

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {t.search.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    {games.length === 1
                        ? `1 ${t.search.result}`
                        : `${games.length} ${t.search.results}`
                    } {language === 'fr' ? 'pour' : 'for'} &quot;{query}&quot;
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {games.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>
        </>
    );
}