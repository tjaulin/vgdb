'use client';

import { useLoading } from '@/hooks';

interface RefreshButtonProps {
    count: number;
}

export default function RefreshButton({ count }: RefreshButtonProps) {
    const { isLoading: isRefreshing, startLoading } = useLoading();

    const handleRefresh = async () => {
        startLoading();
        // Petit délai pour montrer le loader
        setTimeout(() => {
            window.location.reload();
        }, 300);
    };

    return (
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Jeux aléatoires ({count})
            </h2>
            <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white px-4 py-2 rounded-lg transition-colors"
            >
                {isRefreshing ? (
                    <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Chargement...</span>
                    </>
                ) : (
                    <>
                        <span>🎲</span>
                        <span>Nouveaux jeux</span>
                    </>
                )}
            </button>
        </div>
    );
}