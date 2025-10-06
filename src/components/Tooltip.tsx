'use client';

import { useState } from 'react';

interface TooltipProps {
    children: React.ReactNode;
    content: string;
    className?: string;
}

export default function Tooltip({ children, content, className = '' }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className={`relative inline-block ${className}`}>
            <div
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                className="cursor-help"
            >
                {children}
            </div>
            {isVisible && (
                <div className="absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-gray-700 rounded-lg shadow-sm tooltip-arrow bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64">
                    {content}
                </div>
            )}
        </div>
    );
}