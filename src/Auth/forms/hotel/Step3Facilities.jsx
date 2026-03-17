import React from 'react';

const FACILITIES = [
    { id: 'swimming_pool', label: 'Swimming Pool', icon: '🏊' },
    { id: 'air_conditioning', label: 'Air Conditioning', icon: '❄️' },
    { id: 'heater', label: 'Heater', icon: '🔥' },
    { id: 'free_wifi', label: 'Free WiFi', icon: '📶' },
    { id: 'parking', label: 'Parking', icon: '🅿️' },
    { id: 'restaurant', label: 'Restaurant', icon: '🍽️' },
    { id: 'gym', label: 'Gym', icon: '💪' },
    { id: 'spa', label: 'Spa', icon: '🧖' },
    { id: 'room_service', label: 'Room Service', icon: '🛎️' },
    { id: 'airport_shuttle', label: 'Airport Shuttle', icon: '🚐' },
    { id: 'bar', label: 'Bar', icon: '🍸' },
    { id: 'laundry', label: 'Laundry', icon: '👔' },
];

const Step3Facilities = ({ data, errors, onChange }) => {
    const toggleFacility = (facilityId) => {
        const current = data.facilities || [];
        const updated = current.includes(facilityId)
            ? current.filter(f => f !== facilityId)
            : [...current, facilityId];
        onChange({ target: { name: 'facilities', value: updated } });
    };

    return (
        <div className="w-full animate-fadeIn">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Property Facilities</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Select all the facilities available at your property
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {FACILITIES.map((facility) => {
                    const isSelected = (data.facilities || []).includes(facility.id);
                    return (
                        <button
                            key={facility.id}
                            type="button"
                            onClick={() => toggleFacility(facility.id)}
                            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all duration-200 text-left focus:outline-none focus:ring-4 focus:ring-blue-500/10
                                ${isSelected
                                    ? 'border-blue-500 bg-blue-50 shadow-sm'
                                    : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50'
                                }`}
                        >
                            <span className="text-xl shrink-0">{facility.icon}</span>
                            <span className={`text-sm font-medium transition-colors
                                ${isSelected ? 'text-blue-700' : 'text-slate-700'}`}>
                                {facility.label}
                            </span>
                            {isSelected && (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-500 ml-auto shrink-0">
                                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    );
                })}
            </div>

            {(data.facilities || []).length > 0 && (
                <p className="mt-4 text-xs text-slate-500">
                    {(data.facilities || []).length} facilit{(data.facilities || []).length === 1 ? 'y' : 'ies'} selected
                </p>
            )}

            {errors.facilities && (
                <p className="mt-3 text-xs text-red-500">{errors.facilities}</p>
            )}
        </div>
    );
};

export default Step3Facilities;
