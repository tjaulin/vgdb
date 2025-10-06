'use client';

import Tooltip from './Tooltip';

interface RatingBadgeProps {
    rating?: number;
    ratingCount?: number;
    totalRating?: number;
    totalRatingCount?: number;
}

export default function RatingBadge({
    rating,
    ratingCount,
    totalRating,
    totalRatingCount
}: RatingBadgeProps) {
    // Priorité à la note globale, sinon note utilisateurs, sinon rien
    const displayRating = totalRating || rating;
    const displayCount = totalRatingCount || ratingCount;
    const isGlobalRating = !!totalRating;

    if (!displayRating) return null; const formatCount = (count?: number) => {
        if (!count) return '';
        if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
        if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
        return count.toString();
    };

    const tooltipContent = isGlobalRating
        ? `Note globale : moyenne combinée incluant les utilisateurs IGDB et les critiques externes${displayCount ? ` (${formatCount(displayCount)} votes)` : ''}`
        : `Note des utilisateurs IGDB${displayCount ? ` (${formatCount(displayCount)} votes)` : ''}`;

    return (
        <div className="absolute top-2 right-2 z-10">
            <Tooltip content={tooltipContent}>
                <div className="bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm font-semibold flex items-center space-x-1">
                    <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{Math.round(displayRating)}%</span>
                </div>
            </Tooltip>
        </div>
    );
}