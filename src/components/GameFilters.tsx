'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { IGDB_GENRES, IGDB_PLATFORMS } from '@/data/igdb-data';

interface FilterOptions {
    genres: string[];
    platforms: string[];
    yearRange: [number, number];
    ratingRange: [number, number];
}

interface GameFiltersProps {
    filters: FilterOptions;
    onFiltersChange: (filters: FilterOptions) => void;
    onApplyFilters: (filters: FilterOptions) => void;
}

// Utilisation des données centralisées IGDB
const AVAILABLE_GENRES = IGDB_GENRES;
const AVAILABLE_PLATFORMS = IGDB_PLATFORMS;

export default function GameFilters({ filters, onFiltersChange, onApplyFilters }: GameFiltersProps) {
    const { t } = useLanguage();
    const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

    const currentYear = new Date().getFullYear();

    const handleGenreToggle = (genre: string) => {
        const newGenres = localFilters.genres.includes(genre)
            ? localFilters.genres.filter(g => g !== genre)
            : [...localFilters.genres, genre];

        setLocalFilters(prev => ({ ...prev, genres: newGenres }));
    };

    const handlePlatformToggle = (platform: string) => {
        const newPlatforms = localFilters.platforms.includes(platform)
            ? localFilters.platforms.filter(p => p !== platform)
            : [...localFilters.platforms, platform];

        setLocalFilters(prev => ({ ...prev, platforms: newPlatforms }));
    };

    const handleYearRangeChange = (index: number, value: number) => {
        const newRange: [number, number] = [...localFilters.yearRange];
        newRange[index] = value;
        setLocalFilters(prev => ({ ...prev, yearRange: newRange }));
    };

    const handleRatingRangeChange = (index: number, value: number) => {
        const newRange: [number, number] = [...localFilters.ratingRange];
        newRange[index] = value;
        setLocalFilters(prev => ({ ...prev, ratingRange: newRange }));
    };

    const handleApply = () => {
        onFiltersChange(localFilters);
        onApplyFilters(localFilters);
    };

    const handleClear = () => {
        const resetFilters: FilterOptions = {
            genres: [],
            platforms: [],
            yearRange: [1980, currentYear],
            ratingRange: [0, 100]
        };
        setLocalFilters(resetFilters);
        onFiltersChange(resetFilters);
    };

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    return (
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {t.explore.filters.title}
            </h2>

            {/* Genres */}
            <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    {t.explore.filters.genres}
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                    {AVAILABLE_GENRES.map((genre) => (
                        <label key={genre.id} className="flex items-center">
                            <input
                                type="checkbox"
                                checked={localFilters.genres.includes(genre.name)}
                                onChange={() => handleGenreToggle(genre.name)}
                                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                {genre.name}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Platforms */}
            <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    {t.explore.filters.platforms}
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                    {AVAILABLE_PLATFORMS.map((platform) => (
                        <label key={platform.id} className="flex items-center">
                            <input
                                type="checkbox"
                                checked={localFilters.platforms.includes(platform.name)}
                                onChange={() => handlePlatformToggle(platform.name)}
                                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                {platform.name}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Year Range */}
            <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    {t.explore.filters.yearRange}
                </h3>
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                            De: {localFilters.yearRange[0]}
                        </label>
                        <input
                            type="range"
                            min="1980"
                            max={currentYear}
                            value={localFilters.yearRange[0]}
                            onChange={(e) => handleYearRangeChange(0, parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                            À: {localFilters.yearRange[1]}
                        </label>
                        <input
                            type="range"
                            min="1980"
                            max={currentYear}
                            value={localFilters.yearRange[1]}
                            onChange={(e) => handleYearRangeChange(1, parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                    </div>
                </div>
            </div>

            {/* Rating Range */}
            <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    {t.explore.filters.ratingRange}
                </h3>
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                            Note minimum: {localFilters.ratingRange[0]}/100
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={localFilters.ratingRange[0]}
                            onChange={(e) => handleRatingRangeChange(0, parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                            Note maximum: {localFilters.ratingRange[1]}/100
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={localFilters.ratingRange[1]}
                            onChange={(e) => handleRatingRangeChange(1, parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
                <button
                    onClick={handleApply}
                    className="w-full px-4 py-3 bg-primary-500 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                    {t.explore.filters.applyFilters}
                </button>
                <button
                    onClick={handleClear}
                    className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors duration-200"
                >
                    {t.explore.filters.clearFilters}
                </button>
            </div>
        </div>
    );
}