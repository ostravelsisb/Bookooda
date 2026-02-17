import React from 'react';

const Checkbox = ({
    id,
    name,
    checked,
    onChange,
    label,
    error,
    required = false,
    className = ''
}) => {
    return (
        <div className={`w-full ${className}`}>
            <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input
                        id={id}
                        name={name}
                        type="checkbox"
                        checked={checked}
                        onChange={onChange}
                        className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer transition-all ${error ? 'border-red-500' : ''}`}
                    />
                </div>
                {label && (
                    <div className="ml-3 text-sm">
                        <label htmlFor={id} className="font-medium text-gray-700 cursor-pointer">
                            {label} {required && <span className="text-red-500">*</span>}
                        </label>
                    </div>
                )}
            </div>
            {error && <p className="mt-1 text-xs text-red-500 ml-7">{error}</p>}
        </div>
    );
};

export default Checkbox;
