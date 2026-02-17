import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        adminCode: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        if (!formData.adminCode) {
            newErrors.adminCode = 'Admin code is required';
        } else if (formData.adminCode !== 'ADMIN2026') {
            newErrors.adminCode = 'Invalid admin code';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                alert('Admin Login Successful!');
            }, 1000);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center p-6 md:p-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            <div className="w-full max-w-md space-y-6">
                {/* Secure Badge */}
                <div className="flex justify-center mb-4">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-500/20 border border-red-500/50">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-red-400 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                        </svg>
                        <span className="text-sm font-semibold text-red-400">SECURE ADMIN ACCESS</span>
                    </div>
                </div>

                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white tracking-tight">Admin Portal</h2>
                    <p className="mt-2 text-sm text-gray-400">Restricted access for authorized personnel only</p>
                </div>

                <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                    <Input
                        label="Admin Email"
                        id="admin-email"
                        name="email"
                        type="email"
                        placeholder="admin@bookooda.com"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        required
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                        }
                    />

                    <Input
                        label="Password"
                        id="admin-password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        required
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                            </svg>
                        }
                    />

                    <Input
                        label="Secure Admin Code"
                        id="admin-code"
                        name="adminCode"
                        type="password"
                        placeholder="Enter admin code"
                        value={formData.adminCode}
                        onChange={handleChange}
                        error={errors.adminCode}
                        required
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                            </svg>
                        }
                    />

                    <Button type="submit" isLoading={isLoading} variant="dark">
                        Access Admin Portal
                    </Button>

                    <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <p className="text-xs text-yellow-400 text-center">
                            ⚠️ All admin activities are logged and monitored
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
