import Link from 'next/link';
import Image from 'next/image';
import { Game, getImageUrl } from '@/lib/igdb';

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
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                        src={coverUrl}
                        alt={game.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    {game.rating && (
                        <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm font-semibold">
                            {Math.round(game.rating)}%
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                        {game.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                        {formatDate(game.first_release_date)}
                    </p>
                    {game.platforms && game.platforms.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                            {game.platforms.slice(0, 3).map((platform) => (
                                <span
                                    key={platform.id}
                                    className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                >
                                    {platform.name}
                                </span>
                            ))}
                            {game.platforms.length > 3 && (
                                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
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
                                    className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}