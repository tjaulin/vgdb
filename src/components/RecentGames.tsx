'use client';

import GameCard from './GameCard';
import RefreshButton from './RefreshButton';
import { Game } from '@/lib/igdb';

interface RecentGamesProps {
    games: Game[];
}

export default function RecentGames({ games }: RecentGamesProps) {
    if (games.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des jeux...</p>
            </div>
        );
    }

    return (
        <section className="section-recent relative">
            {/* Barre décorative */}
            <div className="absolute top-0 left-0 w-20 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>

            <div className="flex items-center justify-between mb-8 animate-fade-in">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 shadow-lg">
                        <span className="text-2xl">🎮</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        Les jeux les plus récents
                    </h2>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                    Dernières sorties
                </div>
            </div>

            <RefreshButton count={games.length} />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
                {games.map((game, index) => (
                    <div
                        key={game.id}
                        className="animate-slide-up"
                        style={{ animationDelay: `${index * 20}ms` }}
                    >
                        <GameCard game={game} />
                    </div>
                ))}
            </div>
        </section>
    );
}
