import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';

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
        <html lang="fr">
            <body className={`${inter.className} bg-gray-50 min-h-screen`}>
                <Navigation />
                <main>{children}</main>
            </body>
        </html>
    );
}