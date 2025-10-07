'use client';

import Link from 'next/link';
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
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                {t.home.hero.description}
            </p>
            <Link
                href="/explore"
                className="inline-flex items-center px-8 py-4 bg-primary-500 hover:bg-primary-700 text-white font-semibold text-lg rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
                {t.home.hero.exploreButton}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </Link>
        </div>
    );
}