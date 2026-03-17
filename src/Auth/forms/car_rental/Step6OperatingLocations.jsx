import React, { useState } from 'react';

const PAKISTAN_CITIES = [
    "Islamabad", "Rawalpindi", "Lahore", "Karachi", "Peshawar", "Multan", "Faisalabad", "Quetta",
    "Sialkot", "Gujranwala", "Hyderabad", "Bahawalpur", "Sargodha", "Sukkur", "Larkana", "Sheikhupura"
].sort();

const Step6OperatingLocations = ({ selectedCities, onChange, error }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const toggleCity = (city) => {
        const newValue = selectedCities.includes(city)
            ? selectedCities.filter(item => item !== city)
            : [...selectedCities, city];
        
        onChange({ target: { name: 'operatingCities', value: newValue } });
    };

    const filteredCities = PAKISTAN_CITIES.filter(city => 
        city.toLowerCase().includes(searchTerm.toLowerCase()) && !selectedCities.includes(city)
    );

    return (
        <div className="animate-fadeIn">
            <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Operating Locations</h2>
                <p className="mt-2 text-sm text-slate-500">
                    Select the cities where you offer your car rental services.
                </p>
            </div>

            <div className="space-y-6">
                {/* Search / Dropdown UI */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Add City</label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search city..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-12 bg-slate-50 border-2 border-slate-100 rounded-xl px-12 text-slate-900 font-medium transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500"
                        />
                        {searchTerm && (
                            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto p-2 space-y-1 animate-fadeIn">
                                {filteredCities.length > 0 ? (
                                    filteredCities.map(city => (
                                        <button
                                            key={city}
                                            type="button"
                                            onClick={() => {
                                                toggleCity(city);
                                                setSearchTerm('');
                                            }}
                                            className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-700 font-medium transition-colors flex items-center justify-between"
                                        >
                                            {city}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-slate-300">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </button>
                                    ))
                                ) : (
                                    <p className="p-3 text-sm text-slate-500 text-center">No cities found</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Selected Cities Display */}
                <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700 ml-1">Selected Cities ({selectedCities.length})</label>
                    {selectedCities.length > 0 ? (
                        <div className="flex flex-wrap gap-2.5 p-5 bg-slate-50 border-2 border-slate-100 border-dashed rounded-2xl min-h-[100px]">
                            {selectedCities.map(city => (
                                <span
                                    key={city}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-blue-100 text-blue-700 rounded-full text-sm font-bold shadow-sm animate-fadeIn"
                                >
                                    {city}
                                    <button
                                        type="button"
                                        onClick={() => toggleCity(city)}
                                        className="hover:text-red-500 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-8 bg-slate-50 border-2 border-slate-100 border-dashed rounded-2xl">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-300 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                            </div>
                            <p className="text-sm text-slate-400 font-medium">No locations selected yet</p>
                        </div>
                    )}
                </div>
                {error && <p className="text-sm text-red-500 font-medium text-center">{error}</p>}
            </div>
        </div>
    );
};

export default Step6OperatingLocations;
