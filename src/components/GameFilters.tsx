'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { IGDB_GENRES, IGDB_PLATFORMS, IGDB_THEMES } from '@/data/igdb-data';
import MultiSelect from './MultiSelect';

interface FilterOptions {
    search: string;
    genres: string[];
    platforms: string[];
    themes: string[];
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
const AVAILABLE_THEMES = IGDB_THEMES;

export default function GameFilters({ filters, onFiltersChange, onApplyFilters }: GameFiltersProps) {
    const { t } = useLanguage();
    const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

    const currentYear = new Date().getFullYear();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalFilters(prev => ({ ...prev, search: e.target.value }));
    };

    const handleGenresChange = (genres: string[]) => {
        setLocalFilters(prev => ({ ...prev, genres }));
    };

    const handlePlatformsChange = (platforms: string[]) => {
        setLocalFilters(prev => ({ ...prev, platforms }));
    };

    const handleThemesChange = (themes: string[]) => {
        setLocalFilters(prev => ({ ...prev, themes }));
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
            search: '',
            genres: [],
            platforms: [],
            themes: [],
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

            {/* Search Field */}
            <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Recherche
                </h3>
                <div className="relative">
                    <input
                        type="text"
                        value={localFilters.search}
                        onChange={handleSearchChange}
                        placeholder="Rechercher un jeu..."
                        className="w-full pl-10 pr-4 py-2.5 
                                  text-sm font-medium
                                  border-2 border-gray-300 dark:border-dark-500
                                  bg-white dark:bg-dark-700
                                  text-gray-900 dark:text-white
                                  placeholder-gray-500 dark:placeholder-gray-400
                                  rounded-lg 
                                  focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400
                                  transition-all duration-200"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                    </div>
                    {localFilters.search && (
                        <button
                            onClick={() => setLocalFilters(prev => ({ ...prev, search: '' }))}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Genres */}
            <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    {t.explore.filters.genres}
                </h3>
                <MultiSelect
                    options={AVAILABLE_GENRES}
                    selectedValues={localFilters.genres}
                    onSelectionChange={handleGenresChange}
                    placeholder="Sélectionner des genres..."
                    searchPlaceholder="Rechercher un genre..."
                />
            </div>

            {/* Platforms */}
            <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    {t.explore.filters.platforms}
                </h3>
                <MultiSelect
                    options={AVAILABLE_PLATFORMS}
                    selectedValues={localFilters.platforms}
                    onSelectionChange={handlePlatformsChange}
                    placeholder="Sélectionner des plateformes..."
                    searchPlaceholder="Rechercher une plateforme..."
                />
            </div>

            {/* Themes */}
            <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Thèmes
                </h3>
                <MultiSelect
                    options={AVAILABLE_THEMES}
                    selectedValues={localFilters.themes}
                    onSelectionChange={handleThemesChange}
                    placeholder="Sélectionner des thèmes..."
                    searchPlaceholder="Rechercher un thème..."
                />
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