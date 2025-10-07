'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { languages, LanguageCode } from '@/translations';

export default function LanguageSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage } = useLanguage();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Fermer le dropdown quand on clique à l'extérieur
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLanguageChange = (langCode: LanguageCode) => {
        setLanguage(langCode);
        setIsOpen(false);
    };

    const currentLanguage = languages[language];

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium
                         text-gray-700 dark:text-gray-300 
                         hover:bg-gray-100 dark:hover:bg-dark-700 
                         transition-colors duration-200"
                aria-label="Select language"
            >
                <span className="text-lg">{currentLanguage.flag}</span>
                <span className="hidden sm:block">{currentLanguage.name}</span>
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-800 rounded-lg shadow-lg 
                               border border-gray-200 dark:border-dark-600 py-2 z-50">
                    {Object.entries(languages).map(([code, lang]) => (
                        <button
                            key={code}
                            onClick={() => handleLanguageChange(code as LanguageCode)}
                            className={`w-full flex items-center space-x-3 px-4 py-2 text-left
                                      hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors
                                      ${language === code ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' :
                                    'text-gray-700 dark:text-gray-300'}`}
                        >
                            <span className="text-lg">{lang.flag}</span>
                            <span className="font-medium">{lang.name}</span>
                            {language === code && (
                                <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}