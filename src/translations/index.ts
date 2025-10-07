export { fr } from './fr';
export { en } from './en';

export const languages = {
    fr: {
        name: 'Français',
        flag: '🇫🇷',
        code: 'fr'
    },
    en: {
        name: 'English',
        flag: '🇺🇸',
        code: 'en'
    }
} as const;

export type LanguageCode = keyof typeof languages;