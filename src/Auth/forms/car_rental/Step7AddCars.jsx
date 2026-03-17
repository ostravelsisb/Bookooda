import React from 'react';

const Step7AddCars = ({ cars, onEdit, onRemove, onAddAnother }) => {
    return (
        <div className="animate-fadeIn">
            <div className="mb-8 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Your fleet</h2>
                <p className="mt-2 text-sm text-slate-500">
                    Review your added vehicles or add more to your profile.
                </p>
            </div>

            <div className="space-y-4 mb-8">
                {cars.map((car, index) => (
                    <div 
                        key={index}
                        className="group relative bg-white border-2 border-slate-100 rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 flex flex-col sm:flex-row items-center justify-between gap-6"
                    >
                        <div className="flex items-center gap-5 w-full sm:w-auto">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl shrink-0 border border-blue-100">
                                🚗
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-900 text-lg leading-tight">
                                    {car.brand || 'Unnamed'} {car.model || 'Car'}
                                </h4>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                                    <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                        {car.category || 'No Category'}
                                    </p>
                                    <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                        {car.registrationNumber || 'No Plate'}
                                    </p>
                                    <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                        {car.year || 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <button
                                type="button"
                                onClick={() => onEdit(index)}
                                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold bg-white hover:bg-slate-50 hover:border-slate-300 transition-all"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                                Edit
                            </button>
                            {cars.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => onRemove(index)}
                                    className="p-2.5 rounded-xl border border-red-50 text-red-400 hover:bg-red-50 hover:text-red-500 transition-all"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={onAddAnother}
                className="w-full flex items-center justify-center gap-3 p-6 rounded-3xl border-2 border-dashed border-blue-200 bg-blue-50/50 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 group"
            >
                <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </div>
                <span className="font-extrabold text-lg">Add Another Car</span>
            </button>
        </div>
    );
};

export default Step7AddCars;
