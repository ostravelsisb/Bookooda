import React from 'react';
import Input from '../../components/Input';

const Step1AccountDetails = ({ data, errors, onChange }) => {
    return (
        <div className="w-full animate-fadeIn">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Account Details</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Create your hotel provider account to get started
                </p>
            </div>

            <div className="space-y-4">
                <Input
                    label="Full Name"
                    id="hotel-fullname"
                    name="fullName"
                    placeholder="Muhammad Ali"
                    value={data.fullName}
                    onChange={onChange}
                    error={errors.fullName}
                    required
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    }
                />

                <Input
                    label="Email Address"
                    id="hotel-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={data.email}
                    onChange={onChange}
                    error={errors.email}
                    required
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                    }
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        label="Password"
                        id="hotel-password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={data.password}
                        onChange={onChange}
                        error={errors.password}
                        required
                    />
                    <Input
                        label="Confirm Password"
                        id="hotel-confirm-password"
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={data.confirmPassword}
                        onChange={onChange}
                        error={errors.confirmPassword}
                        required
                    />
                </div>
            </div>
        </div>
    );
};

export default Step1AccountDetails;
