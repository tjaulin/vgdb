import { igdbService, Game } from '@/lib/igdb';
import GameCard from '@/components/GameCard';
import RefreshButton from '@/components/RefreshButton';
import HomeHero from '@/components/HomeHero';
import HomeFeatures from '@/components/HomeFeatures';

export default async function HomePage() {
    let games: Game[] = [];
    let error: string | null = null;

    try {
        games = await igdbService.getRecentGames(50, 0);
    } catch (err) {
        error = err instanceof Error ? err.message : 'Une erreur est survenue lors du chargement des jeux';
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                    <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-500 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
                        <h2 className="text-xl font-semibold mb-2">Erreur de configuration API</h2>
                        <p className="mb-4">{error}</p>
                        <div className="text-sm text-left bg-red-50 dark:bg-red-900/20 p-3 rounded">
                            <p className="font-semibold mb-2">Pour configurer l&apos;API IGDB :</p>
                            <ol className="list-decimal list-inside space-y-1">
                                <li>Créez une application sur <a href="https://dev.twitch.tv/console/apps" className="text-primary-600 dark:text-primary-400 underline" target="_blank">Twitch Developer Console</a></li>
                                <li>Obtenez votre Client ID</li>
                                <li>Générez un Access Token via POST: https://id.twitch.tv/oauth2/token?client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&grant_type=client_credentials</li>
                                <li>Ajoutez vos clés dans le fichier .env.local</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <HomeHero />

            {games.length > 0 ? (
                <>
                    <RefreshButton count={games.length} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {games.map((game) => (
                            <GameCard key={game.id} game={game} />
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des jeux...</p>
                </div>
            )}

            <HomeFeatures />
        </div>
    );
}