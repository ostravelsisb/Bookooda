import React from 'react';

const SearchSelect = ({
    label,
    id,
    value,
    onChange,
    options = [],
    placeholder = 'Select an option',
    icon,
    className = ''
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
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 z-10">
                        {icon}
                    </div>
                )}
                <select
                    id={id}
                    value={value}
                    onChange={onChange}
                    className={`block w-full rounded-xl border border-gray-200 bg-white ${icon ? 'pl-12' : 'pl-4'
                        } pr-10 py-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm cursor-pointer hover:border-gray-300 appearance-none`}
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.5rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.5em 1.5em'
                    }}
                >
                    <option value="">{placeholder}</option>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SearchSelect;
