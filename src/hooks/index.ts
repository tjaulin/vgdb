import { useState } from 'react';

/**
 * Hook personnalisé pour gérer les états de chargement
 */
export function useLoading(initialState: boolean = false) {
    const [isLoading, setIsLoading] = useState(initialState);

    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);

    return {
        isLoading,
        startLoading,
        stopLoading,
        setIsLoading,
    };
}

/**
 * Hook personnalisé pour gérer la navigation modal d'images
 */
export function useImageModal() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (imageUrl: string, index: number) => {
        setSelectedImage(imageUrl);
        setSelectedImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setIsModalOpen(false);
    };

    return {
        selectedImage,
        selectedImageIndex,
        isModalOpen,
        openModal,
        closeModal,
        setSelectedImage,
        setSelectedImageIndex,
    };
}