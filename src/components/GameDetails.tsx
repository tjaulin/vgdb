import Image from 'next/image';
import { Game, getImageUrl } from '@/lib/igdb';
import GameCard from './GameCard';

interface GameDetailsProps {
    game: Game;
    similarGames?: Game[];
}

export default function GameDetails({ game, similarGames }: GameDetailsProps) {
    const formatDate = (timestamp?: number) => {
        if (!timestamp) return 'Date inconnue';
        return new Date(timestamp * 1000).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const coverUrl = game.cover?.url ? getImageUrl(game.cover.url.split('/').pop()!.replace('.jpg', '')) : '/placeholder-game.jpg';

    const developers = game.involved_companies?.filter(company => company.developer);
    const publishers = game.involved_companies?.filter(company => company.publisher);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Image de couverture */}
                <div className="lg:col-span-1">
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src={coverUrl}
                            alt={game.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Informations du jeu */}
                <div className="lg:col-span-2">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{game.name}</h1>

                    {(game.rating || game.total_rating) && (
                        <div className="flex items-center space-x-4 mb-6">
                            {game.rating && (
                                <div className="flex items-center">
                                    <span className="text-2xl font-bold text-primary-500 dark:text-primary-400">
                                        {Math.round(game.rating)}%
                                    </span>
                                    <span className="ml-2 text-gray-600 dark:text-gray-400">Note critique</span>
                                </div>
                            )}
                            {game.total_rating && (
                                <div className="flex items-center">
                                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                        {Math.round(game.total_rating)}%
                                    </span>
                                    <span className="ml-2 text-gray-600 dark:text-gray-400">Note générale</span>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Date de sortie</h3>
                            <p className="text-gray-600 dark:text-gray-400">{formatDate(game.first_release_date)}</p>
                        </div>

                        {game.platforms && game.platforms.length > 0 && (
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Plateformes</h3>
                                <div className="flex flex-wrap gap-2">
                                    {game.platforms.map((platform) => (
                                        <span
                                            key={platform.id}
                                            className="inline-block bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-sm px-3 py-1 rounded-full"
                                        >
                                            {platform.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {game.genres && game.genres.length > 0 && (
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Genres</h3>
                                <div className="flex flex-wrap gap-2">
                                    {game.genres.map((genre) => (
                                        <span
                                            key={genre.id}
                                            className="inline-block bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-sm px-3 py-1 rounded-full"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {developers && developers.length > 0 && (
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Développeurs</h3>
                                <div className="flex flex-wrap gap-2">
                                    {developers.map((dev) => (
                                        <span
                                            key={dev.id}
                                            className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm px-3 py-1 rounded-full"
                                        >
                                            {dev.company.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {publishers && publishers.length > 0 && (
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Éditeurs</h3>
                                <div className="flex flex-wrap gap-2">
                                    {publishers.map((pub) => (
                                        <span
                                            key={pub.id}
                                            className="inline-block bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 text-sm px-3 py-1 rounded-full"
                                        >
                                            {pub.company.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {game.summary && (
                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Description</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{game.summary}</p>
                        </div>
                    )}

                    {game.screenshots && game.screenshots.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Screenshots</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {game.screenshots.slice(0, 6).map((screenshot) => (
                                    <div key={screenshot.id} className="relative aspect-video rounded-lg overflow-hidden">
                                        <Image
                                            src={getImageUrl(screenshot.url.split('/').pop()!.replace('.jpg', ''), 'screenshot_med')}
                                            alt="Screenshot"
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Jeux similaires */}
            {similarGames && similarGames.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Jeux similaires</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {similarGames.map((game) => (
                            <GameCard key={game.id} game={game} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}