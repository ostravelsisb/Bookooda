import React from 'react';
import Input from '../../components/Input';

const Step1AccountDetails = ({ data, errors, onChange }) => {
    return (
        <div className="animate-fadeIn">
            <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Create your account</h2>
                <p className="mt-2 text-sm text-slate-500">
                    Welcome! Let's start by setting up your login details.
                </p>
            </div>

            <div className="space-y-5">
                <Input
                    label="Full Name"
                    name="fullName"
                    value={data.fullName}
                    onChange={onChange}
                    error={errors.fullName}
                    placeholder="Enter your full name"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    }
                />

                <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={onChange}
                    error={errors.email}
                    placeholder="you@example.com"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                    }
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={data.password}
                        onChange={onChange}
                        error={errors.password}
                        placeholder="••••••••"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                            </svg>
                        }
                    />

                    <Input
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={data.confirmPassword}
                        onChange={onChange}
                        error={errors.confirmPassword}
                        placeholder="••••••••"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                            </svg>
                        }
                    />
                </div>
                {errors.password && (
                    <p className="text-[11px] text-slate-500 mt-1">
                        Password must be at least 8 characters long.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Step1AccountDetails;
