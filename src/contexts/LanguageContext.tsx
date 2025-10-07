'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Translations } from '@/types/translations';
import { LanguageCode, languages, fr, en } from '@/translations';

interface LanguageContextType {
    language: LanguageCode;
    setLanguage: (lang: LanguageCode) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = { fr, en };

interface LanguageProviderProps {
    children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
    const [language, setLanguage] = useState<LanguageCode>('fr'); // Français par défaut
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Récupérer la langue depuis localStorage ou détecter depuis le navigateur
        const savedLanguage = localStorage.getItem('vgdb-language') as LanguageCode;

        if (savedLanguage && savedLanguage in languages) {
            setLanguage(savedLanguage);
        } else {
            // Détecter la langue du navigateur
            const browserLang = navigator.language.split('-')[0] as LanguageCode;
            if (browserLang in languages) {
                setLanguage(browserLang);
            }
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('vgdb-language', language);
            // Mettre à jour l'attribut lang du document
            document.documentElement.lang = language;
        }
    }, [language, mounted]);

    const changeLanguage = (lang: LanguageCode) => {
        setLanguage(lang);
    };

    const value = {
        language,
        setLanguage: changeLanguage,
        t: translations[language],
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}