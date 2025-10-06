'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface ImageModalProps {
    isOpen: boolean;
    imageUrl: string;
    altText: string;
    onClose: () => void;
}

export default function ImageModal({ isOpen, imageUrl, altText, onClose }: ImageModalProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
            onClick={onClose}
        >
            <div className="relative max-w-5xl max-h-full w-full h-full flex items-center justify-center">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-2 transition-colors"
                    aria-label="Fermer"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

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