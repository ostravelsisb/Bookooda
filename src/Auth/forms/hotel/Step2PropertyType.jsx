import React from 'react';

const PROPERTY_TYPES = [
    { id: 'hotel', label: 'Hotel', icon: '🏨', description: 'Traditional hotel with multiple rooms and services' },
    { id: 'apartment', label: 'Apartment', icon: '🏢', description: 'Self-contained units for short or long stays' },
    { id: 'resort', label: 'Resort', icon: '🏖️', description: 'Luxury property with recreational amenities' },
    { id: 'villa', label: 'Villa', icon: '🏡', description: 'Private luxury home for exclusive stays' },
    { id: 'guest_house', label: 'Guest House', icon: '🏠', description: 'Cozy, home-like accommodation for travelers' },
    { id: 'hostel', label: 'Hostel', icon: '🛏️', description: 'Budget-friendly shared or private rooms' },
    { id: 'bnb', label: 'Bed & Breakfast', icon: '☕', description: 'Charming stay with morning meals included' },
    { id: 'holiday_home', label: 'Holiday Home', icon: '🌴', description: 'Vacation rental for families and groups' },
];

const Step2PropertyType = ({ data, errors, onChange }) => {
    const handleSelect = (typeId) => {
        onChange({ target: { name: 'propertyType', value: typeId } });
    };

    return (
        <div className="w-full animate-fadeIn">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Property Type</h2>
                <p className="mt-1 text-sm text-gray-500">
                    What type of property are you registering?
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROPERTY_TYPES.map((type) => {
                    const isSelected = data.propertyType === type.id;
                    return (
                        <button
                            key={type.id}
                            type="button"
                            onClick={() => handleSelect(type.id)}
                            className={`group relative flex items-start gap-4 p-4 rounded-2xl border-2 transition-all duration-300 text-left focus:outline-none focus:ring-4 focus:ring-blue-500/10
                                ${isSelected
                                    ? 'border-blue-500 bg-blue-50/80 shadow-[0_4px_20px_rgba(59,130,246,0.12)]'
                                    : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]'
                                }`}
                        >
                            {/* Selected indicator */}
                            {isSelected && (
                                <div className="absolute top-3 right-3">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-white">
                                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            )}

                            <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110
                                ${isSelected ? 'bg-blue-100' : 'bg-slate-100'}`}>
                                {type.icon}
                            </div>
                            <div className="flex-1 min-w-0 pt-0.5 pr-6">
                                <h3 className={`font-semibold text-sm md:text-base leading-tight transition-colors
                                    ${isSelected ? 'text-blue-700' : 'text-slate-900 group-hover:text-blue-600'}`}>
                                    {type.label}
                                </h3>
                                <p className="text-xs md:text-sm text-slate-500 mt-1 leading-relaxed line-clamp-2">
                                    {type.description}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>

            {errors.propertyType && (
                <p className="mt-3 text-xs text-red-500">{errors.propertyType}</p>
            )}
        </div>
    );
};

export default Step2PropertyType;
