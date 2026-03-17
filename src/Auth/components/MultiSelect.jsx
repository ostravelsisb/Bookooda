import React, { useState, useRef, useEffect } from 'react';

const MultiSelect = ({
    label,
    id,
    name,
    options = [],
    value = [],
    onChange,
    error,
    required = false,
    placeholder = 'Select options...',
    className = ''
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleOption = (option) => {
        const newValue = value.includes(option)
            ? value.filter(v => v !== option)
            : [...value, option];
        onChange({ target: { name, value: newValue } });
    };

    const removeTag = (option, e) => {
        e.stopPropagation();
        onChange({ target: { name, value: value.filter(v => v !== option) } });
    };

    const filtered = options.filter(opt =>
        opt.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={`w-full ${className}`} ref={wrapperRef}>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`relative min-h-[46px] w-full rounded-xl border px-3 py-2 cursor-pointer transition-all
                    ${error ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-blue-400'}
                    ${isOpen ? 'ring-2 ring-blue-500/20 border-blue-500' : ''}
                `}
            >
                <div className="flex flex-wrap gap-1.5 items-center">
                    {value.length > 0 ? (
                        value.map(tag => (
                            <span
                                key={tag}
                                className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-lg"
                            >
                                {tag}
                                <button
                                    type="button"
                                    onClick={(e) => removeTag(tag, e)}
                                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                    </svg>
                                </button>
                            </span>
                        ))
                    ) : (
                        <span className="text-sm text-gray-400 py-0.5">{placeholder}</span>
                    )}
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-50 mt-1 w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden animate-fadeIn">
                    <div className="p-2 border-b border-gray-100">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <div className="max-h-48 overflow-y-auto p-1">
                        {filtered.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center py-3">No options found</p>
                        ) : (
                            filtered.map(opt => (
                                <button
                                    key={opt}
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); toggleOption(opt); }}
                                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center justify-between
                                        ${value.includes(opt) ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}
                                    `}
                                >
                                    {opt}
                                    {value.includes(opt) && (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-600">
                                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
};

export default MultiSelect;
