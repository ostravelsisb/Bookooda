import React from 'react';

const Select = ({
    label,
    id,
    name,
    value,
    onChange,
    options = [],
    error,
    required = false,
    placeholder = 'Select an option',
    className = ''
}) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className={`block w-full rounded-xl border ${error ? 'border-red-500 bg-red-50 focus:ring-red-500' : 'border-gray-200 bg-gray-50 focus:ring-blue-500'
                    } px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent transition-all sm:text-sm cursor-pointer`}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
};

export default Select;
