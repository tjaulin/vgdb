export interface Translations {
    // Navigation
    navigation: {
        title: string;
        search: {
            placeholder: string;
        };
        random: string;
    };

    // Home page  
    home: {
        hero: {
            title: string;
            subtitle: string;
            description: string;
        };
        features: {
            title: string;
            comprehensive: {
                title: string;
                description: string;
            };
            detailed: {
                title: string;
                description: string;
            };
            personalized: {
                title: string;
                description: string;
            };
        };
    };

    // Game Card & Details
    game: {
        unknownDate: string;
        releaseDate: string;
        platforms: string;
        genres: string;
        developers: string;
        publishers: string;
        description: string;
        screenshots: string;
        showMore: string;
        showLess: string;
        similarGames: string;
        languageSupport: string;
        voiceActing: string;
        subtitles: string;
        interface: string;
        randomGames: string;
        refreshing: string;
        refresh: string;
        loadingError: string;
        gameNotFound: string;
        backToHome: string;
    };

    // Rating system
    rating: {
        criticScore: string;
        userScore: string;
        votes: string;
        vote: string;
        basedOn: string;
        critics: string;
        users: string;
    };

    // Search
    search: {
        results: string;
        result: string;
        noResults: string;
        searching: string;
        title: string;
        emptyTitle: string;
        emptyDescription: string;
        notFound: string;
        tryOther: string;
    };

    // Breadcrumb
    breadcrumb: {
        home: string;
    };

    // Common
    common: {
        loading: string;
        error: string;
        retry: string;
    };
}