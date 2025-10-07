/**
 * Formate un timestamp Unix en date localisée
 */
export const formatDate = (timestamp?: number, locale: string = 'fr-FR', unknownDateText: string = 'Date inconnue'): string => {
    if (!timestamp) return unknownDateText;
    return new Date(timestamp * 1000).toLocaleDateString(locale, {
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

