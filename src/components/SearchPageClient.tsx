'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Game } from '@/lib/igdb';
import { useLanguage } from '@/contexts/LanguageContext';
import GameCard from '@/components/GameCard';
import SearchEmpty from '@/components/SearchEmpty';

export default function SearchPageClient() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const { t, language } = useLanguage();

    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [infiniteScrollEnabled, setInfiniteScrollEnabled] = useState(false);

    const loadGames = useCallback(async (pageNumber: number, reset: boolean = false) => {
        try {
            if (reset) {
                setLoading(true);
            } else {
                setLoadingMore(true);
            }

            const limit = 20;
            const offset = pageNumber * limit;

            const params = new URLSearchParams({
                q: query || '',
                limit: limit.toString(),
                offset: offset.toString()
            });

            const response = await fetch(`/api/search?${params.toString()}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to search games');
            }

            const newGames = data.games;

            if (reset) {
                setGames(newGames);
                setPage(0);
            } else {
                setGames(prev => [...prev, ...newGames]);
                setPage(pageNumber);
            }

            setHasMore(data.hasMore);
        } catch (error) {
            console.error('Error loading games:', error);
            setError(error instanceof Error ? error.message : 'Une erreur est survenue lors de la recherche');
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, [query]);

    const handleLoadMore = () => {
        if (!loadingMore && hasMore) {
            setInfiniteScrollEnabled(true); // Activer le scroll infini après le premier clic
            loadGames(page + 1);
        }
    };

    // Fonction pour détecter le scroll en bas de page
    const handleScroll = useCallback(() => {
        if (!infiniteScrollEnabled || loadingMore || !hasMore) return;

        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.offsetHeight;

        // Si on est à 100px du bas de la page
        if (scrollTop + windowHeight >= docHeight - 100) {
            loadGames(page + 1);
        }
    }, [infiniteScrollEnabled, loadingMore, hasMore, page, loadGames]);

    // Chargement initial
    useEffect(() => {
        if (query) {
            loadGames(0, true);
        }
    }, [query, loadGames]);

    // Gestion du scroll infini
    useEffect(() => {
        if (infiniteScrollEnabled) {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [infiniteScrollEnabled, handleScroll]);

    if (!query) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <SearchEmpty />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="flex items-center space-x-3">
                        <svg className="animate-spin w-8 h-8 text-primary-500" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                            {t.search.searching}
                        </span>
                    </div>
                </div>
            ) : (
                <>
                    {games.length === 0 ? (
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
                    ) : (
                        <>
                            {/* Header */}
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    {t.search.title}
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {games.length === 1
                                        ? `1 ${t.search.result}`
                                        : `${games.length}+ ${t.search.results}`
                                    } {language === 'fr' ? 'pour' : 'for'} &quot;{query}&quot;
                                </p>
                            </div>

                            {/* Games grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {games.map((game) => (
                                    <GameCard key={game.id} game={game} />
                                ))}
                            </div>

                            {/* Load more button ou indicateur de scroll infini */}
                            {hasMore && !infiniteScrollEnabled && (
                                <div className="flex justify-center mt-8">
                                    <button
                                        onClick={handleLoadMore}
                                        disabled={loadingMore}
                                        className="px-8 py-3 bg-primary-500 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
                                    >
                                        {loadingMore ? (
                                            <div className="flex items-center space-x-2">
                                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>{t.explore.loadingMore}</span>
                                            </div>
                                        ) : (
                                            t.explore.loadMore
                                        )}
                                    </button>
                                </div>
                            )}

                            {/* Indicateur de chargement pour le scroll infini */}
                            {infiniteScrollEnabled && loadingMore && (
                                <div className="flex justify-center items-center mt-8 py-4">
                                    <div className="flex items-center space-x-3">
                                        <svg className="animate-spin w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                                            {t.explore.loadingMore}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {!hasMore && games.length > 0 && (
                                <div className="text-center mt-8">
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {t.explore.noMoreResults}
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
}