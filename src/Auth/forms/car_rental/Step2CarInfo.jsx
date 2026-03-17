import React from 'react';
import Input from '../../components/Input';

const CAR_CATEGORIES = ['Economy', 'Sedan', 'SUV', 'Luxury', 'Van', 'Hatchback', '4x4 / Off-road'];
const TRANSMISSION_TYPES = ['Manual', 'Automatic'];
const FUEL_TYPES = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];

const Step2CarInfo = ({ car, errors, onChange }) => {
    return (
        <div className="animate-fadeIn">
            <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Car Information</h2>
                <p className="mt-2 text-sm text-slate-500">
                    Provide accurate details about your vehicle to help customers find it.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Car Category */}
                <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700 ml-1">Car Category</label>
                    <div className="relative group">
                        <select
                            name="category"
                            value={car.category}
                            onChange={onChange}
                            className={`w-full h-12 bg-slate-50 border-2 ${errors.category ? 'border-red-400' : 'border-slate-100 group-hover:border-slate-200'} rounded-xl px-4 text-slate-900 font-medium transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500 appearance-none`}
                        >
                            <option value="">Select Category</option>
                            {CAR_CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                    </div>
                    {errors.category && <p className="text-xs text-red-500 font-medium ml-1">{errors.category}</p>}
                </div>

                <Input
                    label="Car Brand"
                    name="brand"
                    value={car.brand}
                    onChange={onChange}
                    error={errors.brand}
                    placeholder="e.g. Toyota"
                />

                <Input
                    label="Car Model"
                    name="model"
                    value={car.model}
                    onChange={onChange}
                    error={errors.model}
                    placeholder="e.g. Corolla"
                />

                <Input
                    label="Year of Make"
                    name="year"
                    type="number"
                    value={car.year}
                    onChange={onChange}
                    error={errors.year}
                    placeholder="e.g. 2022"
                />

                <Input
                    label="Color"
                    name="color"
                    value={car.color}
                    onChange={onChange}
                    error={errors.color}
                    placeholder="e.g. Silver"
                />

                <Input
                    label="Number of Seats"
                    name="seats"
                    type="number"
                    value={car.seats}
                    onChange={onChange}
                    error={errors.seats}
                    placeholder="e.g. 5"
                />

                <Input
                    label="Registration Number"
                    name="registrationNumber"
                    value={car.registrationNumber}
                    onChange={onChange}
                    error={errors.registrationNumber}
                    placeholder="e.g. LE-1234"
                />

                {/* Transmission Type */}
                <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700 ml-1">Transmission Type</label>
                    <div className="grid grid-cols-2 gap-3">
                        {TRANSMISSION_TYPES.map(type => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => onChange({ target: { name: 'transmission', value: type } })}
                                className={`h-12 rounded-xl text-sm font-bold transition-all border-2 ${car.transmission === type ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-white border-slate-100 text-slate-600 hover:border-slate-200 hover:bg-slate-50'}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                    {errors.transmission && <p className="text-xs text-red-500 font-medium ml-1">{errors.transmission}</p>}
                </div>

                {/* Fuel Type */}
                <div className="space-y-1.5 col-span-1 md:col-span-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Fuel Type</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {FUEL_TYPES.map(type => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => onChange({ target: { name: 'fuelType', value: type } })}
                                className={`h-12 rounded-xl text-sm font-bold transition-all border-2 ${car.fuelType === type ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-white border-slate-100 text-slate-600 hover:border-slate-200 hover:bg-slate-50'}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                    {errors.fuelType && <p className="text-xs text-red-500 font-medium ml-1">{errors.fuelType}</p>}
                </div>
            </div>
        </div>
    );
};

export default Step2CarInfo;
