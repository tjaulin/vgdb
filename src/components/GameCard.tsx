'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Game, getImageUrl } from '@/lib/igdb';
import { formatDate } from '@/lib/utils';
import { useLoading } from '@/hooks';
import { useLanguage } from '@/contexts/LanguageContext';
import RatingBadge from './RatingBadge';

interface GameCardProps {
    game: Game;
}

export default function GameCard({ game }: GameCardProps) {
    const [isNavigating, setIsNavigating] = useState(false);
    const [imageSrc, setImageSrc] = useState(
        game.cover?.url ? getImageUrl(game.cover.url.split('/').pop()!.replace('.jpg', '')) : '/placeholder-game.svg'
    );
    const { t, language } = useLanguage();

    const handleImageError = () => {
        setImageSrc('/placeholder-game.svg');
    };

    const handleClick = () => {
        setIsNavigating(true);
    };

    return (
        <Link href={`/game/${game.id}`} className="group" onClick={handleClick}>
            <div className="relative flex flex-col h-full overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-md dark:bg-dark-800 dark:shadow-dark-900/20 hover:shadow-lg dark:hover:shadow-dark-900/40">
                <div className="relative aspect-[3/4] overflow-hidden flex-shrink-0">
                    <Image
                        src={imageSrc}
                        alt={game.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        onError={handleImageError}
                    />
                    <RatingBadge
                        rating={game.rating}
                        ratingCount={game.rating_count}
                        totalRating={game.total_rating}
                        totalRatingCount={game.total_rating_count}
                    />
                </div>
                <div className="flex flex-col flex-grow p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors min-h-[3.5rem]">
                        {game.name}
                    </h3>
                    <p className="flex-shrink-0 mb-3 text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(game.first_release_date, language === 'fr' ? 'fr-FR' : 'en-US', t.game.unknownDate)}
                    </p>
                    <div className="flex flex-col justify-end flex-grow space-y-2">
                        {/* Développeurs */}
                        {(() => {
                            const developers = game.involved_companies?.filter(company => company.developer) || [];
                            return developers.length > 0 ? (
                                <div className="flex flex-wrap gap-1">
                                    {developers.slice(0, 2).map((dev) => (
                                        <span
                                            key={dev.id}
                                            className="inline-block px-2 py-1 text-xs text-purple-800 bg-purple-100 rounded dark:bg-purple-900/30 dark:text-purple-300"
                                        >
                                            {dev.company.name}
                                        </span>
                                    ))}
                                    {developers.length > 2 && (
                                        <span className="inline-block px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300">
                                            +{developers.length - 2}
                                        </span>
                                    )}
                                </div>
                            ) : null;
                        })()}

                        {/* Genres */}
                        {game.genres && game.genres.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {game.genres.slice(0, 2).map((genre) => (
                                    <span
                                        key={genre.id}
                                        className="inline-block px-2 py-1 text-xs rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                                {game.genres.length > 2 && (
                                    <span className="inline-block px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300">
                                        +{game.genres.length - 2}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Themes */}
                        {game.themes && game.themes.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {game.themes.slice(0, 2).map((theme) => (
                                    <span
                                        key={theme.id}
                                        className="inline-block px-2 py-1 text-xs text-red-800 bg-red-100 rounded dark:bg-red-900/30 dark:text-red-300"
                                    >
                                        {theme.name}
                                    </span>
                                ))}
                                {game.themes.length > 2 && (
                                    <span className="inline-block px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300">
                                        +{game.themes.length - 2}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Overlay de chargement */}
                {isNavigating && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                        <div className="flex items-center p-4 space-x-3 bg-white rounded-lg shadow-lg dark:bg-dark-700">
                            <svg className="w-5 h-5 animate-spin text-primary-500" fill="none" viewBox="0 0 24 24">
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