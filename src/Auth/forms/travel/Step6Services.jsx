import React from 'react';

const SERVICES = [
    { id: 'visa', label: 'Visa Services', icon: '🛂' },
    { id: 'file_processing', label: 'File Processing', icon: '📁' },
    { id: 'trips', label: 'Trip Planning', icon: '🗺️' },
    { id: 'umrah', label: 'Umrah Services', icon: '🕋' },
    { id: 'group_tours', label: 'Group Tours', icon: '👥' },
    { id: 'private_tours', label: 'Private Tours', icon: '🚗' },
];

const Step6Services = ({ data, errors, onChange }) => {
    const toggleService = (serviceId) => {
        let newServices = [...data.services];
        if (newServices.includes(serviceId)) {
            newServices = newServices.filter(id => id !== serviceId);
        } else {
            newServices.push(serviceId);
        }

        onChange({
            target: { name: 'services', value: newServices }
        });
    };

    return (
        <div className="animate-fadeIn">
            <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Services Offered</h2>
                <p className="mt-2 text-sm text-slate-500">
                    What primary services do you provide? Select all that apply.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SERVICES.map((service) => {
                    const isSelected = data.services.includes(service.id);
                    return (
                        <button
                            key={service.id}
                            type="button"
                            onClick={() => toggleService(service.id)}
                            className={`p-4 rounded-2xl flex items-center justify-between border-2 transition-all duration-300 ${isSelected
                                ? 'bg-blue-50 border-blue-600 shadow-[0_4px_12px_rgba(59,130,246,0.1)]'
                                : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className={`text-2xl transition-transform duration-300 ${isSelected ? 'scale-110' : ''}`}>
                                    {service.icon}
                                </span>
                                <span className={`font-semibold ${isSelected ? 'text-blue-900' : 'text-slate-700'}`}>
                                    {service.label}
                                </span>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                                ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`}>
                                {isSelected && (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-white">
                                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>

            {errors.services && (
                <p className="mt-4 text-sm text-red-600 font-medium animate-pulse text-center">
                    {errors.services}
                </p>
            )}
        </div>
    );
};

export default Step6Services;
