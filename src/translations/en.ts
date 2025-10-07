import { Translations } from '@/types/translations';

export const en: Translations = {
    navigation: {
        title: "VGDb",
        search: {
            placeholder: "Search for a game..."
        },
        random: "Home"
    },

    home: {
        hero: {
            title: "Discover the best video games",
            subtitle: "",
            description: "Explore our collection of video games with detailed information, ratings, screenshots and much more.",
            exploreButton: "Explore"
        },
        features: {
            title: "Why choose VGDb?",
            comprehensive: {
                title: "Comprehensive Database",
                description: "Over 100,000 games listed with detailed information and regular updates."
            },
            detailed: {
                title: "Detailed Information",
                description: "Ratings, screenshots, platforms, genres, developers and much more for each game."
            },
            personalized: {
                title: "Personalized Experience",
                description: "Discover new games through our intelligent recommendation system with screenshots and personalized recommendations."
            }
        }
    },

    explore: {
        title: "Explore Games",
        description: "Discover your next favorite game with our advanced filters",
        loading: "Loading games...",
        loadingMore: "Loading...",
        loadMore: "Load more games",
        resultsCount: "{count} games found",
        noMoreResults: "You've seen all available games",
        filters: {
            title: "Filters",
            genres: "Genres",
            platforms: "Platforms",
            yearRange: "Release year",
            ratingRange: "Rating range",
            applyFilters: "Apply filters",
            clearFilters: "Clear filters"
        }
    },

    game: {
        unknownDate: "Unknown date",
        releaseDate: "Release Date",
        platforms: "Platforms",
        genres: "Genres",
        developers: "Developers",
        publishers: "Publishers",
        description: "Description",
        screenshots: "Screenshots",
        showMore: "Show more",
        showLess: "Show less",
        similarGames: "Similar Games",
        languageSupport: "Language Support",
        voiceActing: "Voice Acting",
        subtitles: "Subtitles",
        interface: "Interface",
        randomGames: "Random Games",
        refreshing: "Refreshing...",
        refresh: "Refresh",
        loadingError: "Loading Error",
        gameNotFound: "Game not found",
        backToHome: "Back to Home"
    },

    rating: {
        criticScore: "Critic Score",
        userScore: "User Score",
        votes: "votes",
        vote: "vote",
        basedOn: "Based on",
        critics: "critics",
        users: "users"
    },

    search: {
        results: "results",
        result: "result",
        noResults: "No results found",
        searching: "Searching...",
        title: "Search Results",
        emptyTitle: "Game Search",
        emptyDescription: "Use the search bar at the top of the page to find your favorite games.",
        notFound: "No games found",
        tryOther: "Try different keywords or check spelling."
    },

    breadcrumb: {
        home: "Home"
    },

    common: {
        loading: "Loading...",
        error: "An error occurred",
        retry: "Retry"
    }
};