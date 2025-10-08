import { GENRE_MAP, PLATFORM_MAP } from '@/data/igdb-data';

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
    rating_count?: number;
    total_rating?: number;
    total_rating_count?: number;
    screenshots?: Array<{
        id: number;
        url: string;
    }>;
    language_supports?: Array<{
        id: number;
        language: Language;
        language_support_type: LanguageSupportType;
    }>;
}

export interface Language {
    id: number;
    name: string;
    native_name: string;
    locale: string;
}

export interface LanguageSupportType {
    id: number;
    name: string;
}

export interface LanguageSupport {
    id: number;
    game: number;
    language: Language;
    language_support_type: LanguageSupportType;
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
        const data = await response.json();
        console.log(data);

        return data;
    }

    async getRecentGames(limit: number = 50, offset: number = 0): Promise<Game[]> {
        const query = `
      fields name, cover.url, first_release_date, rating, rating_count, total_rating, total_rating_count,
             genres.name, platforms.name, involved_companies.company.name, involved_companies.developer, involved_companies.publisher;
      where rating != null & cover != null & first_release_date != null;
      limit ${limit};
      offset ${offset};
      sort first_release_date desc;
    `;

        const games = await this.makeRequest('games', query);
        return games;
    }

    async getGamesWithFilters(filters: {
        genres?: string[];
        platforms?: string[];
        yearRange?: [number, number];
        ratingRange?: [number, number];
        limit?: number;
        offset?: number;
    }): Promise<Game[]> {
        const {
            genres = [],
            platforms = [],
            yearRange,
            ratingRange,
            limit = 20,
            offset = 0
        } = filters;

        let whereConditions = ['rating != null', 'cover != null', 'first_release_date != null'];

        // Filtres par genre (utilisation d'IDs pour plus de précision)
        if (genres.length > 0) {
            const genreIds = genres.map(genre => GENRE_MAP[genre]).filter(id => id !== undefined);
            if (genreIds.length > 0) {
                whereConditions.push(`genres = [${genreIds.join(',')}]`);
            }
        }        // Filtres par plateforme (utilisation d'IDs pour plus de précision)
        if (platforms.length > 0) {
            const platformIds = platforms.map(platform => PLATFORM_MAP[platform]).filter(id => id !== undefined);
            if (platformIds.length > 0) {
                whereConditions.push(`platforms = [${platformIds.join(',')}]`);
            }
        }

        // Filtre par année
        if (yearRange) {
            const startTimestamp = Math.floor(new Date(yearRange[0], 0, 1).getTime() / 1000);
            const endTimestamp = Math.floor(new Date(yearRange[1], 11, 31).getTime() / 1000);
            whereConditions.push(`first_release_date >= ${startTimestamp} & first_release_date <= ${endTimestamp}`);
        }

        // Filtre par note
        if (ratingRange) {
            whereConditions.push(`total_rating >= ${ratingRange[0]} & total_rating <= ${ratingRange[1]}`);
        }

        const query = `
      fields name, cover.url, first_release_date, rating, rating_count, total_rating, total_rating_count,
             genres.name, platforms.name, involved_companies.company.name, involved_companies.developer, involved_companies.publisher;
      where ${whereConditions.join(' & ')};
      limit ${limit};
      offset ${offset};
      sort first_release_date desc;
    `;

        const games = await this.makeRequest('games', query);
        return games;
    }

    async getGameById(id: number): Promise<Game> {
        const query = `
      fields name, summary, cover.url, first_release_date, platforms.name, genres.name, 
             rating, rating_count, total_rating, total_rating_count, screenshots.url, involved_companies.company.name, 
             involved_companies.developer, involved_companies.publisher,
             language_supports.language.name, language_supports.language.native_name, language_supports.language.locale,
             language_supports.language_support_type.name;
      where id = ${id};
    `;

        const games = await this.makeRequest('games', query);
        return games[0];
    }

    async searchGames(query: string, limit: number = 20): Promise<Game[]> {
        const searchQuery = `
      fields name, cover.url, first_release_date, rating, rating_count, total_rating, total_rating_count, 
             genres.name, involved_companies.company.name, involved_companies.developer, involved_companies.publisher;
      search "${query}";
      where rating != null & cover != null;
      limit ${limit};
    `;

        const games = await this.makeRequest('games', searchQuery);
        return games;
    }

    async getSimilarGames(gameId: number, limit: number = 5): Promise<Game[]> {
        const query = `
      fields name, cover.url, first_release_date, rating, rating_count, total_rating, total_rating_count,
             genres.name, involved_companies.company.name, involved_companies.developer, involved_companies.publisher;
      where similar_games = [${gameId}] & rating != null & cover != null;
      limit ${limit};
    `;

        const games = await this.makeRequest('games', query);
        return games;
    }

    async getLanguages(): Promise<Language[]> {
        const query = `
      fields name, native_name, locale;
      limit 100;
      sort name asc;
    `;

        const languages = await this.makeRequest('languages', query);
        return languages;
    }

    async getLanguageSupportTypes(): Promise<LanguageSupportType[]> {
        const query = `
      fields name;
      limit 10;
    `;

        const types = await this.makeRequest('language_support_types', query);
        return types;
    }

    async getLanguageSupportsForGame(gameId: number): Promise<LanguageSupport[]> {
        const query = `
      fields language.name, language.native_name, language.locale, language_support_type.name;
      where game = ${gameId};
      limit 50;
    `;

        const supports = await this.makeRequest('language_supports', query);
        return supports;
    }
}

export const igdbService = new IGDBService();