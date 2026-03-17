import React from 'react';

const Button = ({
    children,
    type = 'button',
    variant = 'primary',
    isLoading = false,
    disabled = false,
    onClick,
    className = '',
    ...props
}) => {
    const baseStyles = 'w-full flex justify-center items-center py-3 px-4 border rounded-xl shadow-sm text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

    const variants = {
        primary: 'border-transparent text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500',
        secondary: 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500',
        danger: 'border-transparent text-white bg-red-600 hover:bg-red-700 focus:ring-red-500',
        dark: 'border-transparent text-white bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black focus:ring-gray-700'
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                </>
            ) : children}
        </button>
    );
};

export default Button;
