import { notFound } from 'next/navigation';
import { igdbService, Game } from '@/lib/igdb';
import GameDetails from '@/components/GameDetails';
import type { Metadata } from 'next';

interface Props {
    params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const game = await igdbService.getGameById(parseInt(params.id));

        if (!game) {
            return {
                title: 'Jeu non trouvé - Video Games Database',
            };
        }

        return {
            title: `${game.name} - Video Games Database`,
            description: game.summary || `Découvrez toutes les informations sur ${game.name}`,
            openGraph: {
                title: game.name,
                description: game.summary || `Découvrez toutes les informations sur ${game.name}`,
                images: game.cover?.url ? [`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.url.split('/').pop()}.jpg`] : [],
            },
        };
    } catch (error) {
        return {
            title: 'Jeu non trouvé - Video Games Database',
        };
    }
}

export default async function GamePage({ params }: Props) {
    const gameId = parseInt(params.id);

    if (isNaN(gameId)) {
        notFound();
    }

    let game: Game | null = null;
    let similarGames: Game[] = [];
    let error: string | null = null;

    try {
        game = await igdbService.getGameById(gameId);

        if (!game) {
            notFound();
        }

        // Récupérer les jeux similaires
        try {
            similarGames = await igdbService.getSimilarGames(gameId, 5);
        } catch (similarError) {
            // Si on ne peut pas récupérer les jeux similaires, on continue sans eux
            console.warn('Impossible de récupérer les jeux similaires:', similarError);
        }
    } catch (err) {
        error = err instanceof Error ? err.message : 'Une erreur est survenue lors du chargement du jeu';
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <h2 className="text-xl font-semibold mb-2">Erreur de chargement</h2>
                        <p className="mb-4">{error}</p>
                        <a
                            href="/"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                        >
                            Retour à l'accueil
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    if (!game) {
        notFound();
    }

    return (
        <div>
            {/* Breadcrumb */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <a
                                    href="/"
                                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                                >
                                    <svg
                                        className="mr-2 w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                                    </svg>
                                    Accueil
                                </a>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg
                                        className="w-6 h-6 text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 truncate max-w-xs">
                                        {game.name}
                                    </span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Détails du jeu */}
            <GameDetails game={game} similarGames={similarGames} />
        </div>
    );
}