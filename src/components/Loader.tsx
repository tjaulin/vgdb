'use client';

interface LoaderProps {
    type?: 'spinner' | 'pulse' | 'dots';
    size?: 'sm' | 'md' | 'lg';
    text?: string;
    className?: string;
}

export default function Loader({ type = 'spinner', size = 'md', text, className = '' }: LoaderProps) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    const textSizes = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg'
    };

    if (type === 'spinner') {
        return (
            <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
                <div className={`${sizeClasses[size]} animate-spin`}>
                    <svg className="w-full h-full text-primary-500" fill="none" viewBox="0 0 24 24">
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                </div>
                {text && (
                    <p className={`${textSizes[size]} text-gray-600 dark:text-gray-400 animate-pulse`}>
                        {text}
                    </p>
                )}
            </div>
        );
    }

    if (type === 'pulse') {
        return (
            <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
                <div className={`${sizeClasses[size]} bg-primary-500 rounded-full animate-pulse`} />
                {text && (
                    <p className={`${textSizes[size]} text-gray-600 dark:text-gray-400 animate-pulse`}>
                        {text}
                    </p>
                )}
            </div>
        );
    }

    if (type === 'dots') {
        return (
            <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
                <div className="flex space-x-2">
                    <div className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'} bg-primary-500 rounded-full animate-bounce`} />
                    <div className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'} bg-primary-500 rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }} />
                    <div className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'} bg-primary-500 rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }} />
                </div>
                {text && (
                    <p className={`${textSizes[size]} text-gray-600 dark:text-gray-400`}>
                        {text}
                    </p>
                )}
            </div>
        );
    }

    return null;
}