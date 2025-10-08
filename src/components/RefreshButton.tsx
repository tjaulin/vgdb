'use client';

import { useLoading } from '@/hooks';
import { useLanguage } from '@/contexts/LanguageContext';

interface RefreshButtonProps {
    count: number;
}

export default function RefreshButton({ count }: RefreshButtonProps) {
    const { t } = useLanguage();

    return (
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t.game.randomGames} ({count})
            </h2>
        </div>
    );
}