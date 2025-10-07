'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Game, getImageUrl } from '@/lib/igdb';
import RatingBadge from './RatingBadge';

interface GameCardProps {
    game: Game;
}

export default function GameCard({ game }: GameCardProps) {
    const [isNavigating, setIsNavigating] = useState(false);
    const formatDate = (timestamp?: number) => {
        if (!timestamp) return 'Date inconnue';
        return new Date(timestamp * 1000).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const coverUrl = game.cover?.url ? getImageUrl(game.cover.url.split('/').pop()!.replace('.jpg', '')) : '/placeholder-game.jpg';

    const handleClick = () => {
        setIsNavigating(true);
    };

    return (
        <Link href={`/game/${game.id}`} className="group" onClick={handleClick}>
            <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md dark:shadow-dark-900/20 overflow-hidden hover:shadow-lg dark:hover:shadow-dark-900/40 transition-all duration-300 h-full flex flex-col relative">
                <div className="relative aspect-[3/4] overflow-hidden flex-shrink-0">
                    <Image
                        src={coverUrl}
                        alt={game.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <RatingBadge
                        rating={game.rating}
                        ratingCount={game.rating_count}
                        totalRating={game.total_rating}
                        totalRatingCount={game.total_rating_count}
                    />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors min-h-[3.5rem]">
                        {game.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex-shrink-0">
                        {formatDate(game.first_release_date)}
                    </p>
                    <div className="flex-grow flex flex-col justify-end space-y-2">
                        {game.platforms && game.platforms.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {game.platforms.slice(0, 3).map((platform) => (
                                    <span
                                        key={platform.id}
                                        className="inline-block bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-xs px-2 py-1 rounded"
                                    >
                                        {platform.name}
                                    </span>
                                ))}
                                {game.platforms.length > 3 && (
                                    <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded">
                                        +{game.platforms.length - 3}
                                    </span>
                                )}
                            </div>
                        )}
                        {game.genres && game.genres.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {game.genres.slice(0, 2).map((genre) => (
                                    <span
                                        key={genre.id}
                                        className="inline-block bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-xs px-2 py-1 rounded"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Overlay de chargement */}
                {isNavigating && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 rounded-lg">
                        <div className="bg-white dark:bg-dark-700 rounded-lg p-4 flex items-center space-x-3 shadow-lg">
                            <svg className="animate-spin w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Chargement...</span>
                        </div>
                    </div>
                )}
            </div>
        </Link>
    );
}