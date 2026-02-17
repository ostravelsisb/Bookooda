import React from 'react';

const SearchButton = ({
    children,
    onClick,
    icon,
    variant = 'primary',
    className = '',
    ...props
}) => {
    const variants = {
        primary: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/50',
        secondary: 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
    };

    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${variants[variant]} ${className}`}
            {...props}
        >
            {icon && <span className="text-xl">{icon}</span>}
            {children}
        </button>
    );
};

export default SearchButton;
