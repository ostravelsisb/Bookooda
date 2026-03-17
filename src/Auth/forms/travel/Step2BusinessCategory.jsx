import React from 'react';

const Step2BusinessCategory = ({ data, errors, onChange }) => {
    // Only one option according to constraints: "Travel & Tours"
    const handleSelect = () => {
        onChange({ target: { name: 'businessCategory', value: 'travel_tours', type: 'text' } });
    };

    const isSelected = data.businessCategory === 'travel_tours';

    return (
        <div className="animate-fadeIn">
            <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Business Category</h2>
                <p className="mt-2 text-sm text-slate-500">
                    Select your main business category.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <button
                    type="button"
                    onClick={handleSelect}
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left focus:outline-none focus:ring-4 focus:ring-blue-500/20 group
                        ${isSelected
                            ? 'border-blue-600 bg-blue-50 shadow-[0_8px_30px_rgba(59,130,246,0.12)]'
                            : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'
                        }`}
                >
                    <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300
                            ${isSelected ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21" />
                            </svg>
                        </div>
                        <div className="flex-1 mt-1">
                            <h3 className={`text-xl font-bold transition-colors ${isSelected ? 'text-blue-900' : 'text-slate-900'}`}>
                                Travel & Tours
                            </h3>
                            <p className={`mt-1.5 text-sm leading-relaxed ${isSelected ? 'text-blue-700' : 'text-slate-500'}`}>
                                Register to offer visas, trip planning, file processing, tours, and Umrah services on Bookooda.
                            </p>
                        </div>
                        {/* Checkmark icon */}
                        <div className={`absolute top-6 right-6 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                            ${isSelected ? 'bg-blue-600 border-blue-600 scale-100' : 'border-slate-300 scale-90 opacity-0'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-white">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </button>
            </div>

            {errors.businessCategory && (
                <p className="mt-3 text-sm text-red-600 font-medium animate-pulse">
                    {errors.businessCategory}
                </p>
            )}
        </div>
    );
};

export default Step2BusinessCategory;
