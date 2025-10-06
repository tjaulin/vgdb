import Link from 'next/link';
import Image from 'next/image';
import { Game, getImageUrl } from '@/lib/igdb';
import RatingBadge from './RatingBadge';

interface GameCardProps {
    game: Game;
}

export default function GameCard({ game }: GameCardProps) {
    const formatDate = (timestamp?: number) => {
        if (!timestamp) return 'Date inconnue';
        return new Date(timestamp * 1000).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const coverUrl = game.cover?.url ? getImageUrl(game.cover.url.split('/').pop()!.replace('.jpg', '')) : '/placeholder-game.jpg';

    return (
        <Link href={`/game/${game.id}`} className="group">
            <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md dark:shadow-dark-900/20 overflow-hidden hover:shadow-lg dark:hover:shadow-dark-900/40 transition-all duration-300 h-full flex flex-col">
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
            </div>
        </Link>
    );
}