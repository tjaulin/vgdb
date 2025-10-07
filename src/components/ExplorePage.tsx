'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Game } from '@/lib/igdb';
import { useLanguage } from '@/contexts/LanguageContext';
import GameCard from './GameCard';
import GameFilters from './GameFilters';

interface FilterOptions {
    genres: string[];
    platforms: string[];
    yearRange: [number, number];
    ratingRange: [number, number];
}

export default function ExplorePage() {
    const { t } = useLanguage();
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [filters, setFilters] = useState<FilterOptions>({
        genres: [],
        platforms: [],
        yearRange: [1980, new Date().getFullYear()],
        ratingRange: [0, 100]
    });
    const [appliedFilters, setAppliedFilters] = useState<FilterOptions>(filters);
    const [infiniteScrollEnabled, setInfiniteScrollEnabled] = useState(false);

    // Ref pour éviter les doubles appels
    const initialLoadRef = useRef(false);
    const appliedFiltersRef = useRef(filters);

    // Maintenir la ref à jour avec les filtres appliqués
    useEffect(() => {
        appliedFiltersRef.current = appliedFilters;
    }, [appliedFilters]);

    const loadGames = useCallback(async (pageNumber: number, reset: boolean = false, filtersToUse?: FilterOptions) => {
        try {
            if (reset) {
                setLoading(true);
                setPage(0);
                setInfiniteScrollEnabled(false); // Reset du scroll infini lors d'un nouveau filtre
            } else {
                setLoadingMore(true);
            }

            const limit = 20;
            const offset = pageNumber * limit;

            // Utiliser les filtres passés en paramètre ou récupérer depuis la ref
            const currentFilters = filtersToUse || appliedFiltersRef.current;

            // Construire l'URL avec les filtres
            const params = new URLSearchParams({
                limit: limit.toString(),
                offset: offset.toString()
            });

            if (currentFilters.genres.length > 0) {
                params.append('genres', currentFilters.genres.join(','));
            }

            if (currentFilters.platforms.length > 0) {
                params.append('platforms', currentFilters.platforms.join(','));
            }

            if (currentFilters.yearRange[0] > 1980 || currentFilters.yearRange[1] < new Date().getFullYear()) {
                params.append('yearRange', currentFilters.yearRange.join(','));
            }

            if (currentFilters.ratingRange[0] > 0 || currentFilters.ratingRange[1] < 100) {
                params.append('ratingRange', currentFilters.ratingRange.join(','));
            }

            const response = await fetch(`/api/games?${params.toString()}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch games');
            }

            const newGames = data.games;

            if (reset) {
                setGames(newGames);
            } else {
                setGames(prev => [...prev, ...newGames]);
            }

            setHasMore(data.hasMore);
            setPage(pageNumber);
        } catch (error) {
            console.error('Error loading games:', error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, []);

    const handleApplyFilters = (filtersToApply: FilterOptions) => {

        setAppliedFilters(filtersToApply);
        loadGames(0, true, filtersToApply);
    };

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

    // Chargement initial avec protection contre les doubles appels
    useEffect(() => {
        if (initialLoadRef.current) return; // Évite les doubles appels en mode StrictMode
        initialLoadRef.current = true;

        const loadInitialGames = async () => {
            try {
                setLoading(true);
                setPage(0);

                const response = await fetch('/api/games?limit=20&offset=0');
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch games');
                }

                setGames(data.games);
                setHasMore(data.hasMore);
                setPage(0);
            } catch (error) {
                console.error('Error loading initial games:', error);
            } finally {
                setLoading(false);
            }
        };

        loadInitialGames();
    }, []); // Aucune dépendance + protection par ref

    // Gestion du scroll infini
    useEffect(() => {
        if (infiniteScrollEnabled) {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [infiniteScrollEnabled, handleScroll]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {t.explore.title}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        {t.explore.description}
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:w-80 flex-shrink-0">
                        <GameFilters
                            filters={filters}
                            onFiltersChange={setFilters}
                            onApplyFilters={handleApplyFilters}
                        />
                    </div>

                    {/* Games Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="flex items-center space-x-3">
                                    <svg className="animate-spin w-8 h-8 text-primary-500" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                                        {t.explore.loading}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Results count */}
                                <div className="mb-6">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {t.explore.resultsCount.replace('{count}', games.length.toString())}
                                    </p>
                                </div>

                                {/* Games grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
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
                    </div>
                </div>
            </div>
        </div>
    );
}