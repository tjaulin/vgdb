import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import MetadataUpdater from '@/components/MetadataUpdater';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Video Games Database - Découvrez les meilleurs jeux vidéos',
    description: 'Explorez notre base de données complète de jeux vidéos avec des informations détaillées, notes, screenshots et plus encore.',
    keywords: 'jeux vidéo, gaming, database, IGDB, reviews, games',

};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" suppressHydrationWarning>
            <body className={`${inter.className} bg-gray-50 dark:bg-dark-900 min-h-screen transition-colors duration-200`}>
                <LanguageProvider>
                    <ThemeProvider>
                        <MetadataUpdater />
                        <Navigation />
                        <main>{children}</main>
                    </ThemeProvider>
                </LanguageProvider>
            </body>
        </html>
    );
}