import { Translations } from '@/types/translations';

export const fr: Translations = {
    navigation: {
        title: "VGDb",
        search: {
            placeholder: "Rechercher un jeu..."
        },
        random: "Accueil"
    },

    home: {
        hero: {
            title: "Découvrez les meilleurs jeux vidéos",
            subtitle: "",
            description: "Explorez notre collection de jeux vidéos avec des informations détaillées, notes, screenshots et bien plus encore.",
            exploreButton: "Explorer"
        },
        features: {
            title: "Pourquoi choisir VGDb ?",
            comprehensive: {
                title: "Base de données complète",
                description: "Plus de 100 000 jeux répertoriés avec des informations détaillées et mises à jour régulièrement."
            },
            detailed: {
                title: "Informations détaillées",
                description: "Notes, captures d'écran, plateformes, genres, développeurs et bien plus pour chaque jeu."
            },
            personalized: {
                title: "Expérience personnalisée",
                description: "Découvrez de nouveaux jeux grâce à notre système de recommandation intelligent avec des screenshots et des recommandations personnalisées."
            }
        }
    },

    explore: {
        title: "Explorer les jeux",
        description: "Découvrez votre prochain jeu favori grâce à nos filtres avancés",
        loading: "Chargement des jeux...",
        loadingMore: "Chargement...",
        loadMore: "Charger plus de jeux",
        resultsCount: "{count} jeux trouvés",
        noMoreResults: "Vous avez vu tous les jeux disponibles",
        filters: {
            title: "Filtres",
            genres: "Genres",
            platforms: "Plateformes",
            yearRange: "Année de sortie",
            ratingRange: "Plage de notes",
            applyFilters: "Appliquer les filtres",
            clearFilters: "Réinitialiser"
        }
    },

    game: {
        unknownDate: "Date inconnue",
        releaseDate: "Date de sortie",
        platforms: "Plateformes",
        genres: "Genres",
        developers: "Développeurs",
        publishers: "Éditeurs",
        description: "Description",
        screenshots: "Screenshots",
        showMore: "Afficher plus",
        showLess: "Afficher moins",
        similarGames: "Jeux similaires",
        languageSupport: "Langues supportées",
        voiceActing: "Doublage",
        subtitles: "Sous-titres",
        interface: "Interface",
        randomGames: "Jeux récents",
        refreshing: "Actualisation...",
        refresh: "Actualiser",
        loadingError: "Erreur de chargement",
        gameNotFound: "Jeu non trouvé",
        backToHome: "Retour à l'accueil"
    },

    rating: {
        criticScore: "Note Critique",
        userScore: "Note Utilisateur",
        votes: "votes",
        vote: "vote",
        basedOn: "Basé sur",
        critics: "critiques",
        users: "utilisateurs"
    },

    search: {
        results: "résultats",
        result: "résultat",
        noResults: "Aucun résultat trouvé",
        searching: "Recherche en cours...",
        title: "Résultats de recherche",
        emptyTitle: "Recherche de jeux",
        emptyDescription: "Utilisez la barre de recherche en haut de la page pour trouver vos jeux préférés.",
        notFound: "Aucun jeu trouvé",
        tryOther: "Essayez avec d'autres mots-clés ou vérifiez l'orthographe."
    },

    breadcrumb: {
        home: "Accueil"
    },

    common: {
        loading: "Chargement...",
        error: "Une erreur est survenue",
        retry: "Réessayer"
    }
};