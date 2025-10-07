/**
 * Formate un timestamp Unix en date localisée française
 */
export const formatDate = (timestamp?: number): string => {
    if (!timestamp) return 'Date inconnue';
    return new Date(timestamp * 1000).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

/**
 * Utilitaire pour combiner les classes CSS de manière conditionnelle
 */
export const cn = (...classes: (string | undefined | null | false)[]): string => {
    return classes.filter(Boolean).join(' ');
};