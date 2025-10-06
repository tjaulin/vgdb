// Configuration pour l'API IGDB
export const IGDB_CONFIG = {
    baseUrl: 'https://api.igdb.com/v4',
    clientId: process.env.IGDB_CLIENT_ID,
    accessToken: process.env.IGDB_ACCESS_TOKEN,
};

export interface Game {
    id: number;
    name: string;
    summary?: string;
    cover?: {
        id: number;
        url: string;
    };
    first_release_date?: number;
    platforms?: Array<{
        id: number;
        name: string;
    }>;
    genres?: Array<{
        id: number;
        name: string;
    }>;
    involved_companies?: Array<{
        id: number;
        company: {
            id: number;
            name: string;
        };
        developer: boolean;
        publisher: boolean;
    }>;
    rating?: number;
    total_rating?: number;
    screenshots?: Array<{
        id: number;
        url: string;
    }>;
    similar_games?: Array<{
        id: number;
        name: string;
        cover?: {
            id: number;
            url: string;
        };
    }>;
}

// Fonction pour construire l'URL d'image IGDB
export function getImageUrl(imageId: string, size: 'thumb' | 'cover_small' | 'logo_med' | 'cover_big' | 'screenshot_med' | 'screenshot_big' = 'cover_big'): string {
    if (!imageId) return '/placeholder-game.jpg';
    // Supprimer l'extension .jpg si elle est déjà présente
    const cleanImageId = imageId.replace('.jpg', '');
    return `https://images.igdb.com/igdb/image/upload/t_${size}/${cleanImageId}.jpg`;
}

// Service API pour IGDB
class IGDBService {
    private async makeRequest(endpoint: string, query: string): Promise<any> {
        if (!IGDB_CONFIG.clientId || !IGDB_CONFIG.accessToken) {
            throw new Error('IGDB API credentials not configured. Please set IGDB_CLIENT_ID and IGDB_ACCESS_TOKEN environment variables.');
        }

        const response = await fetch(`${IGDB_CONFIG.baseUrl}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Client-ID': IGDB_CONFIG.clientId!,
                'Authorization': `Bearer ${IGDB_CONFIG.accessToken}`,
                'Content-Type': 'text/plain',
            },
            body: query,
        });

        if (!response.ok) {
            throw new Error(`IGDB API error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }

    async getRandomGames(limit: number = 50): Promise<Game[]> {
        const query = `
      fields name, summary, cover.url, first_release_date, platforms.name, genres.name, rating, total_rating;
      where rating != null & cover != null & platforms != null;
      limit ${limit};
      offset ${Math.floor(Math.random() * 1000)};
      sort total_rating desc;
    `;

        return this.makeRequest('games', query);
    }

    async getGameById(id: number): Promise<Game> {
        const query = `
      fields name, summary, cover.url, first_release_date, platforms.name, genres.name, 
             rating, total_rating, screenshots.url, involved_companies.company.name, 
             involved_companies.developer, involved_companies.publisher, similar_games.name, 
             similar_games.cover.url;
      where id = ${id};
    `;

        const games = await this.makeRequest('games', query);
        return games[0];
    }

    async searchGames(query: string, limit: number = 20): Promise<Game[]> {
        const searchQuery = `
      fields name, summary, cover.url, first_release_date, platforms.name, genres.name, rating, total_rating;
      search "${query}";
      where rating != null & cover != null;
      limit ${limit};
    `;

        return this.makeRequest('games', searchQuery);
    }

    async getSimilarGames(gameId: number, limit: number = 5): Promise<Game[]> {
        const query = `
      fields name, summary, cover.url, first_release_date, platforms.name, genres.name, rating, total_rating;
      where similar_games = [${gameId}] & rating != null & cover != null;
      limit ${limit};
    `;

        return this.makeRequest('games', query);
    }
}

export const igdbService = new IGDBService();