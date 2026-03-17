import React, { useState, useEffect } from 'react';

const Step7Countries = ({ data, errors, onChange }) => {
    const [countriesList, setCountriesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,cca2');
                const data = await res.json();
                const formatted = data.map(c => ({
                    name: c.name.common,
                    flag: c.flags.svg || c.flags.png,
                    code: c.cca2
                })).sort((a, b) => a.name.localeCompare(b.name));
                setCountriesList(formatted);
            } catch (err) {
                console.error("Failed to load countries", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCountries();
    }, []);

    const filteredCountries = countriesList.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    const isSelected = (code) => {
        return data.countriesServed.some(c => c.code === code);
    };

    const toggleCountry = (countryObj) => {
        let newCountries = [...data.countriesServed];
        if (isSelected(countryObj.code)) {
            newCountries = newCountries.filter(c => c.code !== countryObj.code);
        } else {
            newCountries.push(countryObj);
        }
        onChange({
            target: { name: 'countriesServed', value: newCountries }
        });
    };

    return (
        <div className="animate-fadeIn">
            <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Destinations</h2>
                <p className="mt-2 text-sm text-slate-500">
                    Which countries do you provide services for?
                </p>
            </div>

            {/* Selected Tags */}
            <div className="mb-4 flex flex-wrap gap-2 min-h-[40px]">
                {data.countriesServed.map(c => (
                    <div key={c.code} className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium border border-blue-100">
                        <img src={c.flag} alt={c.name} className="w-5 h-3.5 object-cover rounded shadow-sm" />
                        {c.name}
                        <button
                            type="button"
                            onClick={() => toggleCountry(c)}
                            className="ml-1 text-blue-400 hover:text-blue-600 focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            {/* Search Input */}
            <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                    </svg>
                </div>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search countries..."
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                />
            </div>

            {/* Countries List */}
            <div className={`overflow-y-auto max-h-[280px] rounded-xl border ${errors.countriesServed ? 'border-red-300' : 'border-slate-200'} p-2 bg-slate-50`} style={{ scrollbarWidth: 'thin' }}>
                {isLoading ? (
                    <div className="flex items-center justify-center p-8">
                        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : filteredCountries.length === 0 ? (
                    <div className="p-4 text-center text-sm text-slate-500">
                        No countries found.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {filteredCountries.map(country => (
                            <button
                                key={country.code}
                                type="button"
                                onClick={() => toggleCountry(country)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all text-left w-full
                                    ${isSelected(country.code)
                                        ? 'bg-blue-50 border-blue-200 shadow-sm'
                                        : 'bg-white border-transparent hover:border-slate-300 hover:shadow-sm'
                                    }`}
                            >
                                <img src={country.flag} alt={country.name} className="w-6 h-4 object-cover rounded shadow-sm shrink-0" />
                                <span className={`text-sm truncate flex-1 ${isSelected(country.code) ? 'text-blue-900 font-medium' : 'text-slate-700'}`}>
                                    {country.name}
                                </span>
                                {isSelected(country.code) && (
                                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-600 shrink-0">
                                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {errors.countriesServed && (
                <p className="mt-3 text-sm text-red-600 font-medium animate-pulse text-center">
                    {errors.countriesServed}
                </p>
            )}
        </div>
    );
};

export default Step7Countries;
