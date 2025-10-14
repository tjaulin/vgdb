'use client';

import { useState, useEffect } from 'react';
import { Game } from '@/lib/igdb';
import GameCard from './GameCard';
import { useLanguage } from '@/contexts/LanguageContext';

interface PopularGame extends Game {
    popularity_value: number;
}

export default function PopularGames() {
    const [games, setGames] = useState<PopularGame[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { t } = useLanguage();

    useEffect(() => {
        async function fetchPopularGames() {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch('/api/popular-games');

                if (!response.ok) {
                    throw new Error('Impossible de charger les jeux populaires');
                }

                const data = await response.json();
                setGames(data.games);
            } catch (err) {
                console.error('Error fetching popular games:', err);
                setError(err instanceof Error ? err.message : 'Impossible de charger les jeux populaires');
            } finally {
                setLoading(false);
            }
        }

        fetchPopularGames();
    }, []);

    if (loading) {
        return (
            <div className="mb-16">
                <h2 className="flex items-center gap-3 mb-8 text-3xl font-bold text-gray-900 dark:text-white">
                    <span className="text-4xl">🔥</span>
                    Les jeux les plus populaires du moment
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="bg-gray-300 dark:bg-gray-700 aspect-[3/4] rounded-lg mb-3"></div>
                            <div className="w-3/4 h-4 mb-2 bg-gray-300 rounded dark:bg-gray-700"></div>
                            <div className="w-1/2 h-3 bg-gray-300 rounded dark:bg-gray-700"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mb-16">
                <h2 className="flex items-center gap-3 mb-8 text-3xl font-bold text-gray-900 dark:text-white">
                    <span className="text-4xl">🔥</span>
                    Les jeux les plus populaires du moment
                </h2>
                <div className="px-6 py-4 text-red-700 bg-red-100 border border-red-400 rounded-lg dark:bg-red-900/30 dark:border-red-500 dark:text-red-300">
                    <p className="flex items-center gap-2">
                        <span className="text-xl">⚠️</span>
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    if (games.length === 0) {
        return null;
    }

    return (
        <section className="relative mb-20 section-popular">
            {/* Barre décorative */}
            <div className="absolute top-0 left-0 w-20 h-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500"></div>

            <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center animate-fade-in">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-gradient-to-br from-orange-400 to-red-500 animate-pulse-slow">
                        <span className="text-2xl">🔥</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                        Les jeux les plus populaires du moment
                    </h2>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 bg-orange-50 dark:bg-orange-900/20 px-3 py-1.5 rounded-full border border-orange-200 dark:border-orange-800">
                    Basé sur l'activité Steam (24h)
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {games.map((game, index) => (
                    <div
                        key={game.id}
                        className="animate-slide-up"
                        style={{ animationDelay: `${index * 30}ms` }}
                    >
                        <GameCard game={game} />
                    </div>
                ))}
            </div>
        </section>
    );
}
