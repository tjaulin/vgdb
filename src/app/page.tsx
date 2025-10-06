import { igdbService, Game } from '@/lib/igdb';
import GameCard from '@/components/GameCard';
import RefreshButton from '@/components/RefreshButton';

export default async function HomePage() {
    let games: Game[] = [];
    let error: string | null = null;

    try {
        games = await igdbService.getRandomGames(50);
    } catch (err) {
        error = err instanceof Error ? err.message : 'Une erreur est survenue lors du chargement des jeux';
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <h2 className="text-xl font-semibold mb-2">Erreur de configuration API</h2>
                        <p className="mb-4">{error}</p>
                        <div className="text-sm text-left bg-red-50 p-3 rounded">
                            <p className="font-semibold mb-2">Pour configurer l&apos;API IGDB :</p>
                            <ol className="list-decimal list-inside space-y-1">
                                <li>Créez une application sur <a href="https://dev.twitch.tv/console/apps" className="text-blue-600 underline" target="_blank">Twitch Developer Console</a></li>
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
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                    Découvrez les meilleurs{' '}
                    <span className="text-blue-600">jeux vidéos</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Explorez notre collection de jeux vidéos avec des informations détaillées,
                    notes, screenshots et bien plus encore.
                </p>
            </div>

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
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Chargement des jeux...</p>
                </div>
            )}

            <div className="mt-16 text-center">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Une base de données complète
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Alimentée par IGDB, notre plateforme vous donne accès à des milliers de jeux
                        avec des informations détaillées, des notes de critiques et d&apos;utilisateurs,
                        des screenshots et des recommandations personnalisées.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-3xl mb-2">🎮</div>
                            <h4 className="font-semibold text-gray-900">Milliers de jeux</h4>
                            <p className="text-sm text-gray-600">Découvrez des jeux de toutes les plateformes</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-2">⭐</div>
                            <h4 className="font-semibold text-gray-900">Notes et critiques</h4>
                            <p className="text-sm text-gray-600">Consultez les avis des experts et joueurs</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-2">🔍</div>
                            <h4 className="font-semibold text-gray-900">Recherche avancée</h4>
                            <p className="text-sm text-gray-600">Trouvez exactement ce que vous cherchez</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}