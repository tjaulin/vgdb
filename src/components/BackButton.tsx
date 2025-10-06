'use client';

export default function BackButton() {
    return (
        <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 dark:hover:bg-dark-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors"
        >
            <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Page précédente
        </button>
    );
}