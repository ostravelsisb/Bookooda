import React from 'react';

const SearchInput = ({
    label,
    id,
    type = 'text',
    placeholder,
    value,
    onChange,
    icon,
    className = '',
    ...props
}) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        {icon}
                    </div>
                )}
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    className={`block w-full rounded-xl border border-gray-200 bg-white ${icon ? 'pl-12' : 'pl-4'
                        } pr-4 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm hover:border-gray-300`}
                    placeholder={placeholder}
                    {...props}
                />
            </div>
        </div>
    );
};

export default SearchInput;
