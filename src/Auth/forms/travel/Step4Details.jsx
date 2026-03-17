import React from 'react';
import Input from '../../components/Input';

const Step4Details = ({ data, errors, onChange }) => {
    const isIndividual = data.operatorType === 'individual';

    // Helper for nested fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        const targetSection = isIndividual ? 'individualDetails' : 'agencyDetails';
        
        onChange({
            target: {
                name: targetSection,
                value: {
                    ...data[targetSection],
                    [name]: value
                },
                type: 'nested'
            }
        });
    };

    if (isIndividual) {
        return (
            <div className="animate-fadeIn">
                <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Personal Details</h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Tell us more about yourself and your experience.
                    </p>
                </div>

                <div className="space-y-5">
                    <Input
                        label="Full Name"
                        name="fullName"
                        value={data.individualDetails.fullName}
                        onChange={handleChange}
                        error={errors.individualDetails?.fullName}
                        placeholder="e.g. Ali Ahmed"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Input
                            label="Phone Number"
                            name="phone"
                            value={data.individualDetails.phone}
                            onChange={handleChange}
                            error={errors.individualDetails?.phone}
                            placeholder="e.g. +92 300 1234567"
                        />
                        <Input
                            label="Years of Experience"
                            name="experienceYears"
                            type="number"
                            min="0"
                            value={data.individualDetails.experienceYears}
                            onChange={handleChange}
                            error={errors.individualDetails?.experienceYears}
                            placeholder="e.g. 5"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Input
                            label="City"
                            name="city"
                            value={data.individualDetails.city}
                            onChange={handleChange}
                            error={errors.individualDetails?.city}
                            placeholder="e.g. Lahore"
                        />
                        <Input
                            label="Country"
                            name="country"
                            value={data.individualDetails.country}
                            onChange={handleChange}
                            error={errors.individualDetails?.country}
                            placeholder="e.g. Pakistan"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700">Short Bio</label>
                        <textarea
                            name="bio"
                            value={data.individualDetails.bio}
                            onChange={handleChange}
                            placeholder="Write a short summary about your travel expertise..."
                            className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none resize-y min-h-[100px] bg-slate-50 focus:bg-white
                                ${errors.individualDetails?.bio ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'}`}
                        />
                        {errors.individualDetails?.bio && (
                            <p className="text-red-500 text-xs mt-1 animate-pulse">{errors.individualDetails.bio}</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Travel Agency
    return (
        <div className="animate-fadeIn">
            <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Agency Details</h2>
                <p className="mt-2 text-sm text-slate-500">
                    Provide the official details for your travel agency.
                </p>
            </div>

            <div className="space-y-5">
                <Input
                    label="Agency Name"
                    name="agencyName"
                    value={data.agencyDetails.agencyName}
                    onChange={handleChange}
                    error={errors.agencyDetails?.agencyName}
                    placeholder="e.g. Pak Travel Agency"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                        label="Registration Number"
                        name="registrationNumber"
                        value={data.agencyDetails.registrationNumber}
                        onChange={handleChange}
                        error={errors.agencyDetails?.registrationNumber}
                        placeholder="e.g. REG-12345"
                    />
                    <Input
                        label="Contact Phone"
                        name="phone"
                        value={data.agencyDetails.phone}
                        onChange={handleChange}
                        error={errors.agencyDetails?.phone}
                        placeholder="e.g. +92 300 1234567"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                        label="City"
                        name="city"
                        value={data.agencyDetails.city}
                        onChange={handleChange}
                        error={errors.agencyDetails?.city}
                        placeholder="e.g. Karachi"
                    />
                    <Input
                        label="Country"
                        name="country"
                        value={data.agencyDetails.country}
                        onChange={handleChange}
                        error={errors.agencyDetails?.country}
                        placeholder="e.g. Pakistan"
                    />
                </div>

                <Input
                    label="Office Address"
                    name="address"
                    value={data.agencyDetails.address}
                    onChange={handleChange}
                    error={errors.agencyDetails?.address}
                    placeholder="Complete office address"
                />

                <Input
                    label="Website (Optional)"
                    name="website"
                    value={data.agencyDetails.website}
                    onChange={handleChange}
                    error={errors.agencyDetails?.website}
                    placeholder="https://www.youragency.com"
                />
            </div>
        </div>
    );
};

export default Step4Details;
