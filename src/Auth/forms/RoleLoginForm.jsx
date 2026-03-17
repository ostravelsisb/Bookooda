import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';

const ROLE_LABELS = {
    travel_tours: 'Travel & Tours',
    car_rental: 'Car Rental Provider',
    trip_provider: 'Trip Provider',
    umrah_provider: 'Umrah Service Provider',
    hotel_provider: 'Hotel Provider',
    customer: 'Customer',
};

// Dashboard paths by role
const ROLE_DASHBOARD_MAP = {
    user: '/dashboard/user',
    customer: '/dashboard/user',
    agent: '/dashboard/agent',
    travel_tours: '/dashboard/agent',
    car_rental: '/dashboard/agent',
    trip_provider: '/dashboard/agent',
    umrah_provider: '/dashboard/agent',
    hotel_provider: '/dashboard/agent',
    admin: '/dashboard/admin',
};

const RoleLoginForm = ({ selectedRole, onToggle }) => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');

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
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoginError('');
        if (validate()) {
            setIsLoading(true);
            setTimeout(() => {
                const result = login(formData.email, formData.password);
                setIsLoading(false);
                if (result.success) {
                    // Check verification status to decide redirect
                    const vs = result.verificationStatus;
                    if (vs === 'approved' || result.role === 'customer' || result.role === 'user' || result.role === 'admin') {
                        const dashboardPath = ROLE_DASHBOARD_MAP[result.role] || '/auth';
                        navigate(dashboardPath);
                    } else {
                        // Unverified, pending, under_review, rejected → verification page
                        navigate('/verification');
                    }
                } else {
                    setLoginError(result.message);
                }
            }, 800);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const roleLabel = ROLE_LABELS[selectedRole] || 'Your Account';

    return (
        <div className="w-full animate-fadeIn">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                <p className="mt-1 text-sm text-gray-500">Sign in as <span className="font-semibold text-blue-600">{roleLabel}</span></p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
                <Input
                    label="Email Address"
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
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
                    id="login-password"
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

                <div className="flex items-center justify-between">
                    <Checkbox
                        id="login-remember"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        label="Remember me"
                    />
                    <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 hover:underline transition-colors">
                        Forgot password?
                    </a>
                </div>

                {loginError && (
                    <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-100 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                        </svg>
                        {loginError}
                    </div>
                )}

                <Button type="submit" isLoading={isLoading}>
                    Sign In
                </Button>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <button
                            type="button"
                            onClick={() => {
                                if (selectedRole === 'hotel_provider') {
                                    navigate('/onboarding/hotel');
                                } else if (selectedRole === 'travel_tours') {
                                    navigate('/onboarding/travel');
                                } else {
                                    onToggle();
                                }
                            }}
                            className="font-semibold text-blue-600 hover:text-blue-500 focus:outline-none hover:underline transition-all"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default RoleLoginForm;
