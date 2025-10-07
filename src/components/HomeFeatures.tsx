'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function HomeFeatures() {
    const { t } = useLanguage();

    return (
        <div className="bg-gray-100 dark:bg-dark-800 rounded-lg p-8 mt-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
                {t.home.features.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                    <div className="text-4xl mb-4">📚</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {t.home.features.comprehensive.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        {t.home.features.comprehensive.description}
                    </p>
                </div>
                <div className="text-center">
                    <div className="text-4xl mb-4">📊</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {t.home.features.detailed.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        {t.home.features.detailed.description}
                    </p>
                </div>
                <div className="text-center">
                    <div className="text-4xl mb-4">🎯</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {t.home.features.personalized.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        {t.home.features.personalized.description}
                    </p>
                </div>
            </div>
        </div>
    );
}