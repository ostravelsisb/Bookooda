import React from 'react';

const options = [
    {
        id: 'individual',
        title: 'Individual',
        desc: 'Work independently and connect with clients looking for expert travel services.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
        ),
    },
    {
        id: 'agency',
        title: 'Travel Agency',
        desc: 'Registered company offering visas, flights, hotels & tour packages.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
            </svg>
        ),
    }
];

const Step3OperatorType = ({ data, errors, onChange }) => {
    return (
        <div className="animate-fadeIn">
            <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Operator Type</h2>
                <p className="mt-2 text-sm text-slate-500">
                    Are you registering as an individual agent or a travel agency?
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {options.map((option) => {
                    const isSelected = data.operatorType === option.id;
                    return (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => onChange({ target: { name: 'operatorType', value: option.id, type: 'text' } })}
                            className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left focus:outline-none focus:ring-4 focus:ring-blue-500/20 group flex flex-col items-center text-center
                                ${isSelected
                                    ? 'border-blue-600 bg-blue-50 shadow-[0_8px_30px_rgba(59,130,246,0.12)]'
                                    : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'
                                }`}
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 mb-4 transition-colors duration-300
                                ${isSelected ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'}`}>
                                {option.icon}
                            </div>
                            <h3 className={`text-lg font-bold transition-colors ${isSelected ? 'text-blue-900' : 'text-slate-900'}`}>
                                {option.title}
                            </h3>
                            <p className={`mt-2 text-xs leading-relaxed ${isSelected ? 'text-blue-700' : 'text-slate-500'}`}>
                                {option.desc}
                            </p>

                            <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300
                                ${isSelected ? 'bg-blue-600 border-blue-600 scale-100' : 'border-slate-300 scale-90 opacity-0'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-white">
                                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </button>
                    );
                })}
            </div>

            {errors.operatorType && (
                <p className="mt-4 text-sm text-red-600 font-medium animate-pulse text-center">
                    {errors.operatorType}
                </p>
            )}
        </div>
    );
};

export default Step3OperatorType;
