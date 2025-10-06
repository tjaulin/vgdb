import Link from 'next/link';
import BackButton from '@/components/BackButton';

export default function NotFound() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
                <div className="text-9xl font-bold text-gray-300 dark:text-gray-600 mb-4">404</div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Jeu non trouvé</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                    Désolé, le jeu que vous recherchez n&apos;existe pas ou n&apos;est plus disponible.
                    Peut-être a-t-il été déplacé vers une autre dimension gaming ?
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="/"
                        className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
                    >
                        <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Retour à l&apos;accueil
                    </Link>

                    <BackButton />
                </div>

                <div className="mt-12">
                    <div className="text-8xl mb-4">🎮</div>
                    <p className="text-gray-500 dark:text-gray-400">
                        En attendant, que diriez-vous de découvrir d&apos;autres jeux fantastiques ?
                    </p>
                </div>
            </div>
        </div>
    );
}