import React from 'react';

const RENTAL_SERVICES = [
    { id: 'city_to_city', label: 'City to City Travel', icon: '🛣️' },
    { id: 'within_city', label: 'Within City Rental', icon: '🏙️' },
    { id: 'airport', label: 'Airport Pickup / Drop', icon: '✈️' },
    { id: 'daily', label: 'Daily Rental', icon: '📅' },
    { id: 'weekly', label: 'Weekly Rental', icon: '📆' },
    { id: 'monthly', label: 'Monthly Rental', icon: '🗓️' },
    { id: 'long_term', label: 'Long Term Leasing', icon: '🏢' }
];

const Step5RentalServices = ({ selectedServices, onChange, error }) => {
    const toggleService = (id) => {
        const newValue = selectedServices.includes(id)
            ? selectedServices.filter(item => item !== id)
            : [...selectedServices, id];
        
        onChange({ target: { name: 'rentalServices', value: newValue } });
    };

    return (
        <div className="animate-fadeIn">
            <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Rental Services Offered</h2>
                <p className="mt-2 text-sm text-slate-500">
                    What primary services do you provide? Select all that apply.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {RENTAL_SERVICES.map((service) => {
                    const isSelected = selectedServices.includes(service.id);
                    return (
                        <button
                            key={service.id}
                            type="button"
                            onClick={() => toggleService(service.id)}
                            className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 text-left
                                ${isSelected 
                                    ? 'bg-blue-50 border-blue-600 shadow-md shadow-blue-500/5' 
                                    : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50'}`}
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl
                                ${isSelected ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                                {service.icon}
                            </div>
                            <div className="flex-1">
                                <h4 className={`font-bold text-sm ${isSelected ? 'text-blue-700' : 'text-slate-700'}`}>
                                    {service.label}
                                </h4>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                                ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-200 bg-white'}`}>
                                {isSelected && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
            {error && <p className="mt-4 text-sm text-red-500 font-medium text-center">{error}</p>}
        </div>
    );
};

export default Step5RentalServices;
