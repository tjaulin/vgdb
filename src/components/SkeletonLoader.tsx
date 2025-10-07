interface SkeletonLoaderProps {
    type?: 'card' | 'detail' | 'list';
    count?: number;
    className?: string;
}

export default function SkeletonLoader({ type = 'card', count = 1, className = '' }: SkeletonLoaderProps) {
    if (type === 'card') {
        return (
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ${className}`}>
                {Array.from({ length: count }).map((_, index) => (
                    <div key={index} className="bg-white dark:bg-dark-800 rounded-lg shadow-md overflow-hidden animate-pulse">
                        {/* Image skeleton */}
                        <div className="aspect-[3/4] bg-gray-300 dark:bg-gray-600" />

                        {/* Content skeleton */}
                        <div className="p-4 space-y-3">
                            {/* Title skeleton */}
                            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded" />
                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />

                            {/* Date skeleton */}
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />

                            {/* Tags skeleton */}
                            <div className="flex gap-2">
                                <div className="h-6 bg-primary-200 dark:bg-primary-900/30 rounded-full w-16" />
                                <div className="h-6 bg-primary-200 dark:bg-primary-900/30 rounded-full w-20" />
                            </div>

                            <div className="flex gap-2">
                                <div className="h-6 bg-emerald-200 dark:bg-emerald-900/30 rounded-full w-14" />
                                <div className="h-6 bg-emerald-200 dark:bg-emerald-900/30 rounded-full w-18" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (type === 'detail') {
        return (
            <div className={`animate-pulse ${className}`}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Image skeleton */}
                    <div className="lg:col-span-1">
                        <div className="aspect-[3/4] bg-gray-300 dark:bg-gray-600 rounded-lg" />
                    </div>

                    {/* Content skeleton */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title */}
                        <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />

                        {/* Rating */}
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />

                        {/* Info grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/3" />
                                    <div className="flex gap-2">
                                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16" />
                                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div className="space-y-3">
                            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4" />
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Screenshots skeleton */}
                <div className="mt-16 space-y-4">
                    <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/4" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="aspect-video bg-gray-300 dark:bg-gray-600 rounded-lg" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (type === 'list') {
        return (
            <div className={`space-y-4 ${className}`}>
                {Array.from({ length: count }).map((_, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-white dark:bg-dark-800 rounded-lg animate-pulse">
                        <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded" />
                        <div className="flex-1 space-y-2">
                            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return null;
}