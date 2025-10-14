'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLoading } from '@/hooks';
import { useLanguage } from '@/contexts/LanguageContext';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';

export default function Navigation() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const { isLoading: isSearching, startLoading } = useLoading();
    const { t } = useLanguage();

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 640); // sm breakpoint
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            startLoading();
            window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
        }
    };

    return (
        <nav className="sticky top-0 z-50 transition-colors duration-200 bg-white border-b border-gray-100 shadow-lg dark:bg-dark-800 dark:border-dark-700">
            <div className="px-3 mx-auto max-w-7xl sm:px-4 lg:px-8">
                <div className="flex items-center justify-between h-15 sm:h-16">
                    {/* Logo - Plus compact sur mobile */}
                    <div className="flex items-center min-w-0">
                        <Link href="/" className="flex-shrink-0">
                            <h1 className="text-base font-bold text-gray-900 sm:text-xl lg:text-2xl dark:text-white whitespace-nowrap">
                                🎮 <span className="text-primary-500">VGDb</span>
                            </h1>
                        </Link>
                    </div>

                    {/* Recherche - Optimisée pour mobile */}
                    <div className="flex-1 max-w-xs mx-3 sm:max-w-sm lg:max-w-lg sm:mx-4 lg:mx-8">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                placeholder={isMobile ? "Rechercher..." : t.navigation.search.placeholder}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 
                                          text-sm sm:text-base font-medium
                                          border-2 border-gray-300 dark:border-dark-500
                                          bg-white dark:bg-dark-700
                                          text-gray-900 dark:text-white
                                          placeholder-gray-500 dark:placeholder-gray-400
                                          rounded-xl sm:rounded-lg 
                                          focus:outline-none
                                          shadow-sm"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                {isSearching ? (
                                    <svg className="w-4 h-4 animate-spin sm:h-5 sm:w-5 text-primary-500" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <svg
                                        className="w-4 h-4 text-gray-500 sm:h-5 sm:w-5 dark:text-gray-400"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Actions - Compactes sur mobile */}
                    <div className="flex items-center min-w-0 space-x-1 sm:space-x-2 lg:space-x-4">

                        {/* Lien Random - Caché sur très petits écrans */}
                        <Link
                            href="/"
                            className="hidden px-2 py-1 text-xs font-medium text-gray-600 transition-colors rounded-md md:inline-flex dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 lg:px-3 lg:py-2 lg:text-sm whitespace-nowrap"
                        >
                            {t.navigation.home}
                        </Link>

                        {/* Lien Explorer */}
                        <Link
                            href="/explore"
                            className="px-2 py-1 text-xs font-medium text-gray-600 transition-colors rounded-md dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 lg:px-3 lg:py-2 lg:text-sm whitespace-nowrap"
                        >
                            {t.navigation.explore}
                        </Link>

                        {/* LanguageSelector - Toujours visible mais plus petit sur mobile */}
                        <div className="scale-75 sm:scale-90 lg:scale-100">
                            <LanguageSelector />
                        </div>

                        {/* ThemeToggle - Toujours visible mais plus petit sur mobile */}
                        <div className="scale-75 sm:scale-90 lg:scale-100">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}