'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Game, getImageUrl } from '@/lib/igdb';
import { formatDate } from '@/lib/utils';
import { useImageModal } from '@/hooks';
import { useLanguage } from '@/contexts/LanguageContext';
import GameCard from './GameCard';
import ImageModal from './ImageModal';
import RatingDisplay from './RatingDisplay';
import LanguageSupport from './LanguageSupport';

interface GameDetailsProps {
    game: Game;
    similarGames?: Game[];
}

export default function GameDetails({ game, similarGames }: GameDetailsProps) {
    const { selectedImage, selectedImageIndex, isModalOpen, openModal, closeModal, setSelectedImage, setSelectedImageIndex } = useImageModal();
    const [showAllScreenshots, setShowAllScreenshots] = useState(false);
    const [coverImageSrc, setCoverImageSrc] = useState(
        game.cover?.url ? getImageUrl(game.cover.url.split('/').pop()!.replace('.jpg', '')) : '/placeholder-game.svg'
    );
    const { t, language } = useLanguage();

    const navigateImage = (direction: 'prev' | 'next') => {
        if (!game.screenshots) return;

        let newIndex = selectedImageIndex;
        if (direction === 'prev') {
            newIndex = selectedImageIndex > 0 ? selectedImageIndex - 1 : game.screenshots.length - 1;
        } else {
            newIndex = selectedImageIndex < game.screenshots.length - 1 ? selectedImageIndex + 1 : 0;
        }

        setSelectedImageIndex(newIndex);
        const newImageUrl = getImageUrl(game.screenshots[newIndex].url.split('/').pop()!.replace('.jpg', ''), 'screenshot_big');
        setSelectedImage(newImageUrl);
    };

    const handleCoverImageError = () => {
        setCoverImageSrc('/placeholder-game.svg');
    };

    const developers = game.involved_companies?.filter(company => company.developer);
    const publishers = game.involved_companies?.filter(company => company.publisher);

    return (
        <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Image de couverture */}
                <div className="lg:col-span-1">
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src={coverImageSrc}
                            alt={game.name}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 1024px) 100vw, 33vw"
                            onError={handleCoverImageError}
                        />
                    </div>
                </div>

                {/* Informations du jeu */}
                <div className="lg:col-span-2">
                    <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">{game.name}</h1>

                    {(game.rating || game.total_rating) && (
                        <RatingDisplay
                            rating={game.rating}
                            ratingCount={game.rating_count}
                            totalRating={game.total_rating}
                            totalRatingCount={game.total_rating_count}
                            className="mb-6"
                        />
                    )}

                    <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
                        <div>
                            <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">{t.game.releaseDate}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{formatDate(game.first_release_date, language === 'fr' ? 'fr-FR' : 'en-US', t.game.unknownDate)}</p>
                        </div>

                        {game.platforms && game.platforms.length > 0 && (
                            <div>
                                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">{t.game.platforms}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {game.platforms.map((platform) => (
                                        <span
                                            key={platform.id}
                                            className="inline-block px-3 py-1 text-sm rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300"
                                        >
                                            {platform.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {game.genres && game.genres.length > 0 && (
                            <div>
                                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">{t.game.genres}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {game.genres.map((genre) => (
                                        <span
                                            key={genre.id}
                                            className="inline-block px-3 py-1 text-sm rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {game.themes && game.themes.length > 0 && (
                            <div>
                                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">{t.game.themes}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {game.themes.map((theme) => (
                                        <span
                                            key={theme.id}
                                            className="inline-block px-3 py-1 text-sm text-red-800 bg-red-100 rounded-full dark:bg-red-900/30 dark:text-red-300"
                                        >
                                            {theme.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {developers && developers.length > 0 && (
                            <div>
                                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">{t.game.developers}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {developers.map((dev) => (
                                        <span
                                            key={dev.id}
                                            className="inline-block px-3 py-1 text-sm text-purple-800 bg-purple-100 rounded-full dark:bg-purple-900/30 dark:text-purple-300"
                                        >
                                            {dev.company.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {publishers && publishers.length > 0 && (
                            <div>
                                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">{t.game.publishers}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {publishers.map((pub) => (
                                        <span
                                            key={pub.id}
                                            className="inline-block px-3 py-1 text-sm text-orange-800 bg-orange-100 rounded-full dark:bg-orange-900/30 dark:text-orange-300"
                                        >
                                            {pub.company.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Description du jeu */}
                    <p className="mb-8 text-base leading-relaxed text-gray-900 dark:text-gray-100">
                        {game.summary}
                    </p>

                    {/* Langues supportées */}
                    <LanguageSupport game={game} />

                    {game.screenshots && game.screenshots.length > 0 && (
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{t.game.screenshots}</h3>
                                {game.screenshots.length > 6 && (
                                    <button
                                        onClick={() => setShowAllScreenshots(!showAllScreenshots)}
                                        className="px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-primary-500 hover:bg-primary-600"
                                    >
                                        {showAllScreenshots ? t.game.showLess : `${t.game.showMore} (${game.screenshots.length})`}
                                    </button>
                                )}
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {(showAllScreenshots ? game.screenshots : game.screenshots.slice(0, 6)).map((screenshot, index) => {
                                    const medImageUrl = getImageUrl(screenshot.url.split('/').pop()!.replace('.jpg', ''), 'screenshot_med');
                                    const bigImageUrl = getImageUrl(screenshot.url.split('/').pop()!.replace('.jpg', ''), 'screenshot_big');

                                    return (
                                        <div
                                            key={screenshot.id}
                                            className="relative overflow-hidden rounded-lg cursor-pointer aspect-video group"
                                            onClick={() => openModal(bigImageUrl, index)}
                                        >
                                            <Image
                                                src={medImageUrl}
                                                alt={`Screenshot ${index + 1}`}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 bg-black bg-opacity-0 group-hover:bg-opacity-20">
                                                <svg
                                                    className="w-8 h-8 text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Jeux similaires */}
            {similarGames && similarGames.length > 0 && (
                <div className="mt-16">
                    <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">{t.game.similarGames}</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {similarGames.map((game) => (
                            <GameCard key={game.id} game={game} />
                        ))}
                    </div>
                </div>
            )}

            {/* Modal pour l'agrandissement des screenshots */}
            <ImageModal
                isOpen={isModalOpen}
                imageUrl={selectedImage || ''}
                altText={`Screenshot ${selectedImageIndex + 1}`}
                onClose={closeModal}
                onPrevious={game.screenshots && game.screenshots.length > 1 ? () => navigateImage('prev') : undefined}
                onNext={game.screenshots && game.screenshots.length > 1 ? () => navigateImage('next') : undefined}
                currentIndex={selectedImageIndex}
                totalImages={game.screenshots?.length}
            />
        </div>
    );
}