'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function HomeHero() {
    const { t } = useLanguage();

    return (
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                {t.home.hero.title.split('jeux vidéos').length > 1 ? (
                    <>
                        {t.home.hero.title.split('jeux vidéos')[0]}
                        <span className="text-primary-500 dark:text-primary-400">jeux vidéos</span>
                        {t.home.hero.title.split('jeux vidéos')[1]}
                    </>
                ) : t.home.hero.title.split('video games').length > 1 ? (
                    <>
                        {t.home.hero.title.split('video games')[0]}
                        <span className="text-primary-500 dark:text-primary-400">video games</span>
                        {t.home.hero.title.split('video games')[1]}
                    </>
                ) : (
                    t.home.hero.title
                )}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t.home.hero.description}
            </p>
        </div>
    );
}