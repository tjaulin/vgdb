'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark'); // Mode nuit par défaut
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Récupérer le thème sauvegardé ou utiliser dark par défaut
        const savedTheme = localStorage.getItem('vgdb-theme') as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            // Sauvegarder le thème et appliquer la classe au document
            localStorage.setItem('vgdb-theme', theme);
            document.documentElement.classList.remove('light', 'dark');
            document.documentElement.classList.add(theme);
        }
    }, [theme, mounted]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    // Éviter le flash de contenu incorrect pendant l'hydratation
    if (!mounted) {
        return <div className="min-h-screen bg-gray-900" />;
    }

    return (
        <ThemeContext.Provider value={{
            theme,
            toggleTheme,
            isDark: theme === 'dark'
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}