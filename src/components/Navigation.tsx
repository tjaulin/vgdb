'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLoading } from '@/hooks';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
    const [searchQuery, setSearchQuery] = useState('');
    const { isLoading: isSearching, startLoading } = useLoading();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            startLoading();
            window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
        }
    };

    return (
        <nav className="bg-white dark:bg-dark-800 shadow-lg sticky top-0 z-50 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                🎮 <span className="text-primary-500">VGDb</span>
                            </h1>
                        </Link>
                    </div>

                    <div className="flex-1 max-w-lg mx-8">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                placeholder="Rechercher un jeu..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 
                                          border border-gray-300 dark:border-dark-600
                                          bg-white dark:bg-dark-700
                                          text-gray-900 dark:text-white
                                          placeholder-gray-500 dark:placeholder-gray-400
                                          rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent
                                          transition-colors duration-200"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {isSearching ? (
                                    <svg className="animate-spin h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <svg
                                        className="h-5 w-5 text-gray-400 dark:text-gray-500"
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

                    <div className="flex items-center space-x-4">
                        <Link
                            href="/"
                            className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Accueil
                        </Link>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
}