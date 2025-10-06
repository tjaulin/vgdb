'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface ImageModalProps {
    isOpen: boolean;
    imageUrl: string;
    altText: string;
    onClose: () => void;
    onPrevious?: () => void;
    onNext?: () => void;
    currentIndex?: number;
    totalImages?: number;
}

export default function ImageModal({ isOpen, imageUrl, altText, onClose, onPrevious, onNext, currentIndex, totalImages }: ImageModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowLeft' && onPrevious) {
                onPrevious();
            } else if (e.key === 'ArrowRight' && onNext) {
                onNext();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose, onPrevious, onNext]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
            onClick={onClose}
        >
            <div className="relative max-w-5xl max-h-full w-full h-full flex items-center justify-center">
                <button
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-2 transition-colors"
                    aria-label="Fermer"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Compteur d'images */}
                {currentIndex !== undefined && totalImages !== undefined && (
                    <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                        {currentIndex + 1} / {totalImages}
                    </div>
                )}

                {/* Bouton précédent */}
                {onPrevious && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onPrevious(); }}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-3 transition-colors"
                        aria-label="Image précédente"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}

                {/* Bouton suivant */}
                {onNext && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onNext(); }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-3 transition-colors"
                        aria-label="Image suivante"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}

                <div
                    className="relative max-w-full max-h-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Image
                        src={imageUrl}
                        alt={altText}
                        width={1200}
                        height={675}
                        className="max-w-full max-h-full object-contain rounded-lg"
                        quality={90}
                    />
                </div>
            </div>
        </div>
    );
}