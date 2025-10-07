'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function SearchEmpty() {
    const { t, language } = useLanguage();

    return (
        <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t.search.emptyTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
                {t.search.emptyDescription}
            </p>
            <a
                href="/"
                className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
                {t.game.backToHome}
            </a>
        </div>
    );
}