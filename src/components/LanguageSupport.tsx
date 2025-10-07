'use client';

import { Game } from '@/lib/igdb';
import { useLanguage } from '@/contexts/LanguageContext';

interface LanguageSupportProps {
    game: Game;
}

export default function LanguageSupport({ game }: LanguageSupportProps) {
    const { t } = useLanguage();

    if (!game.language_supports || game.language_supports.length === 0) {
        return null;
    }

    // Grouper par type de support
    const supportsByType = game.language_supports.reduce((acc, support) => {
        const typeName = support.language_support_type.name;
        if (!acc[typeName]) {
            acc[typeName] = [];
        }
        acc[typeName].push(support.language);
        return acc;
    }, {} as Record<string, any[]>);

    const getTypeTranslation = (type: string) => {
        switch (type.toLowerCase()) {
            case 'voice':
            case 'voice acting':
                return t.game.voiceActing;
            case 'subtitles':
                return t.game.subtitles;
            case 'interface':
                return t.game.interface;
            default:
                return type;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type.toLowerCase()) {
            case 'voice':
            case 'voice acting':
                return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
            case 'subtitles':
                return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
            case 'interface':
                return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300';
            default:
                return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
        }
    };

    return (
        <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t.game.languageSupport}</h3>
            <div className="space-y-6">
                {Object.entries(supportsByType).map(([type, languages]) => (
                    <div key={type}>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                            {getTypeTranslation(type)}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {languages.map((language, index) => (
                                <span
                                    key={`${type}-${language.id || index}`}
                                    className={`inline-block text-sm px-3 py-1 rounded-full ${getTypeColor(type)}`}
                                    title={language.native_name}
                                >
                                    {language.name}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}