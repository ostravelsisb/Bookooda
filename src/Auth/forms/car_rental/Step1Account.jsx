import React from 'react';
import Input from '../../components/Input';

const Step1Account = ({ data, errors, onChange }) => {
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
                    value={data.account.name}
                    onChange={(e) => onChange({ target: { name: 'account', value: { ...data.account, name: e.target.value }, type: 'nested' } })}
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
                    value={data.account.email}
                    onChange={(e) => onChange({ target: { name: 'account', value: { ...data.account, email: e.target.value }, type: 'nested' } })}
                    error={errors.email}
                    placeholder="you@example.com"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                    }
                />

                <Input
                    label="Phone Number"
                    name="phone"
                    value={data.account.phone}
                    onChange={(e) => onChange({ target: { name: 'account', value: { ...data.account, phone: e.target.value }, type: 'nested' } })}
                    error={errors.phone}
                    placeholder="+92 300 1234567"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H3.75A1.5 1.5 0 002.25 3.75v3z" />
                        </svg>
                    }
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={data.account.password}
                        onChange={(e) => onChange({ target: { name: 'account', value: { ...data.account, password: e.target.value }, type: 'nested' } })}
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
                        value={data.account.confirmPassword}
                        onChange={(e) => onChange({ target: { name: 'account', value: { ...data.account, confirmPassword: e.target.value }, type: 'nested' } })}
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

export default Step1Account;
