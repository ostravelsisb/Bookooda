import React from 'react';
import Input from '../../components/Input';

const Step8AdditionalDetails = ({ data, errors, onChange }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({
            target: {
                name: 'additionalDetails',
                value: {
                    ...data.additionalDetails,
                    [name]: value
                },
                type: 'nested'
            }
        });
    };

    return (
        <div className="animate-fadeIn">
            <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Additional Details</h2>
                <p className="mt-2 text-sm text-slate-500">
                    Provide a few more details to help your profile stand out.
                </p>
            </div>

            <div className="space-y-6">
                {/* Description */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-700">Detailed Description of Services <span className="text-red-500">*</span></label>
                    <textarea
                        name="description"
                        value={data.additionalDetails.description}
                        onChange={handleChange}
                        placeholder="E.g., We specialize in Umrah packages with 5-star accommodations..."
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none resize-y min-h-[120px] bg-slate-50 focus:bg-white
                            ${errors.additionalDetails?.description ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'}`}
                    />
                    {errors.additionalDetails?.description && (
                        <p className="text-red-500 text-xs mt-1 animate-pulse">{errors.additionalDetails.description}</p>
                    )}
                </div>

                {/* Packages */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-700">Special Packages Offered <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <textarea
                        name="packages"
                        value={data.additionalDetails.packages}
                        onChange={handleChange}
                        placeholder="E.g., Honeymoon to Maldives, Group Tour to northern areas..."
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none resize-y min-h-[100px] bg-slate-50 focus:bg-white border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10`}
                    />
                </div>

                {/* Pricing / Experience Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700">Pricing Range <span className="text-gray-400 font-normal">(Optional)</span></label>
                        <select
                            name="pricingRange"
                            value={data.additionalDetails.pricingRange || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none"
                        >
                            <option value="">Select pricing range</option>
                            <option value="budget">Budget Friendly (Economy)</option>
                            <option value="mid">Mid-Range</option>
                            <option value="luxury">Luxury / Premium</option>
                            <option value="flexible">Flexible (All Types)</option>
                        </select>
                    </div>

                    <Input
                        label="Years in Industry"
                        name="experienceYears"
                        type="number"
                        min="0"
                        value={data.additionalDetails.experienceYears}
                        onChange={handleChange}
                        error={errors.additionalDetails?.experienceYears}
                        placeholder="e.g. 10"
                    />
                </div>
            </div>
        </div>
    );
};

export default Step8AdditionalDetails;
