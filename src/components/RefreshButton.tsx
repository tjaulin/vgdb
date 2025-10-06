'use client';

interface RefreshButtonProps {
    count: number;
}

export default function RefreshButton({ count }: RefreshButtonProps) {
    return (
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Jeux aléatoires ({count})
            </h2>
            <button
                onClick={() => window.location.reload()}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
                🎲 Nouveaux jeux
            </button>
        </div>
    );
}