'use client';

import Tooltip from './Tooltip';

interface RatingDisplayProps {
    rating?: number;
    ratingCount?: number;
    totalRating?: number;
    totalRatingCount?: number;
    className?: string;
}

export default function RatingDisplay({
    rating,
    ratingCount,
    totalRating,
    totalRatingCount,
    className = ''
}: RatingDisplayProps) {
    const formatCount = (count?: number) => {
        if (!count) return '';
        if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
        if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
        return count.toString();
    };

    return (
        <div className={`flex items-center space-x-4 ${className}`}>
            {rating && (
                <div className="flex items-center space-x-1">
                    <span className="text-2xl font-bold text-primary-500 dark:text-primary-400">
                        {Math.round(rating)}%
                    </span>
                    <Tooltip content="Note moyenne des utilisateurs IGDB uniquement. Cette note reflète l'opinion de la communauté IGDB.">
                        <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                Note utilisateurs
                                {ratingCount && ` (${formatCount(ratingCount)})`}
                            </span>
                        </div>
                    </Tooltip>
                </div>
            )}
            {totalRating && (
                <div className="flex items-center space-x-1">
                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        {Math.round(totalRating)}%
                    </span>
                    <Tooltip content="Note moyenne combinée incluant les notes des utilisateurs IGDB ET des critiques externes (sites spécialisés, presse). Cette note offre une vision plus globale de la réception du jeu.">
                        <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                Note globale
                                {totalRatingCount && ` (${formatCount(totalRatingCount)})`}
                            </span>
                        </div>
                    </Tooltip>
                </div>
            )}
        </div>
    );
}