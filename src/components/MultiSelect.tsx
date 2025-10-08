'use client';

import { useState, useRef, useEffect } from 'react';
// Icônes SVG simples
const ChevronDownIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
);

const XMarkIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const MagnifyingGlassIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
);

export interface MultiSelectOption {
    id: number | string;
    name: string;
}

interface MultiSelectProps {
    options: MultiSelectOption[];
    selectedValues: string[];
    onSelectionChange: (values: string[]) => void;
    placeholder: string;
    searchPlaceholder: string;
    maxDisplayItems?: number;
}

export default function MultiSelect({
    options,
    selectedValues,
    onSelectionChange,
    placeholder,
    searchPlaceholder,
    maxDisplayItems = 3
}: MultiSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Filtrer les options selon le terme de recherche
    const filteredOptions = options.filter(option =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Fermer le dropdown si on clique à l'extérieur
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleToggleOption = (optionName: string) => {
        if (selectedValues.includes(optionName)) {
            onSelectionChange(selectedValues.filter(value => value !== optionName));
        } else {
            onSelectionChange([...selectedValues, optionName]);
        }
    };

    const handleRemoveItem = (optionName: string) => {
        onSelectionChange(selectedValues.filter(value => value !== optionName));
    };

    const getDisplayText = () => {
        if (selectedValues.length === 0) {
            return placeholder;
        }

        if (selectedValues.length <= maxDisplayItems) {
            return selectedValues.join(', ');
        }

        return `${selectedValues.slice(0, maxDisplayItems).join(', ')} +${selectedValues.length - maxDisplayItems}`;
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
                <span className={`truncate ${selectedValues.length === 0 ? 'text-gray-500 dark:text-gray-400' : ''}`}>
                    {getDisplayText()}
                </span>
                <ChevronDownIcon
                    className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Selected Items Display */}
            {selectedValues.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                    {selectedValues.map((value) => (
                        <span
                            key={value}
                            className="inline-flex items-center px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-md"
                        >
                            {value}
                            <button
                                type="button"
                                onClick={() => handleRemoveItem(value)}
                                className="ml-1 hover:text-primary-600 dark:hover:text-primary-400"
                            >
                                <XMarkIcon className="w-3 h-3" />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
                    {/* Search Input */}
                    <div className="p-3 border-b border-gray-200 dark:border-gray-600">
                        <div className="relative">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder={searchPlaceholder}
                                value={searchTerm}
                                name="multi-select-search"
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                autoFocus
                            />
                        </div>
                    </div>

                    {/* Options List */}
                    <div className="max-h-60 overflow-y-auto custom-scrollbar">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <label
                                    key={option.id}
                                    className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedValues.includes(option.name)}
                                        onChange={() => handleToggleOption(option.name)}
                                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                        {option.name}
                                    </span>
                                </label>
                            ))
                        ) : (
                            <div className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                                Aucun résultat trouvé
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}