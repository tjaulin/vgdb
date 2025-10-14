import { igdbService, Game } from '@/lib/igdb';
import HomeHero from '@/components/HomeHero';
import HomeFeatures from '@/components/HomeFeatures';
import PopularGames from '@/components/PopularGames';
import RecentGames from '@/components/RecentGames';

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
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <HomeHero />

                {/* Section des jeux les plus populaires - Fond avec effet */}
                <div className="relative py-12 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50/50 via-red-50/30 to-pink-50/50 dark:from-orange-950/20 dark:via-red-950/10 dark:to-pink-950/20 rounded-3xl shadow-sm border border-orange-100/50 dark:border-orange-900/30 mb-16">
                    <PopularGames />
                </div>

                {/* Séparateur visuel */}
                <div className="flex items-center justify-center my-16">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
                    <div className="px-4">
                        <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"></div>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
                </div>

                {/* Section des jeux récents - Fond différent */}
                <div className="relative py-12 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50/50 via-blue-50/30 to-cyan-50/50 dark:from-green-950/20 dark:via-blue-950/10 dark:to-cyan-950/20 rounded-3xl shadow-sm border border-green-100/50 dark:border-green-900/30 mb-16">
                    <RecentGames games={games} />
                </div>

                <HomeFeatures />
            </div>
        </div>
    );
}