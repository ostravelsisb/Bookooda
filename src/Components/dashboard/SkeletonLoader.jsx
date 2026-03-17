const SkeletonLoader = ({ type = 'card', count = 4 }) => {
    const skeletons = Array.from({ length: count });

    if (type === 'card') {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {skeletons.map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
                        <div className="flex justify-between">
                            <div className="space-y-3 flex-1">
                                <div className="h-3 bg-gray-200 rounded w-24" />
                                <div className="h-7 bg-gray-200 rounded w-16" />
                                <div className="h-3 bg-gray-200 rounded w-20" />
                            </div>
                            <div className="w-12 h-12 bg-gray-200 rounded-xl" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (type === 'table') {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                <div className="p-6 space-y-4">
                    {skeletons.map((_, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <div className="h-4 bg-gray-200 rounded flex-1" />
                            <div className="h-4 bg-gray-200 rounded w-24" />
                            <div className="h-4 bg-gray-200 rounded w-20" />
                            <div className="h-6 bg-gray-200 rounded-full w-16" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (type === 'chart') {
        return (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-32 mb-6" />
                <div className="h-64 bg-gray-100 rounded-xl" />
            </div>
        );
    }

    return null;
};

export default SkeletonLoader;
