'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect } from 'react';

export default function MetadataUpdater() {
    const { t, language } = useLanguage();

    useEffect(() => {
        // Mettre à jour le titre de la page
        document.title = language === 'fr'
            ? 'VGDb - Base de données complète de jeux vidéo'
            : 'VGDb - Complete Video Game Database';

        // Mettre à jour la description meta
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', t.home.hero.description);
        }

        // Mettre à jour l'attribut lang du HTML
        document.documentElement.lang = language === 'fr' ? 'fr-FR' : 'en-US';
    }, [t, language]);

    return null;
}