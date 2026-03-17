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

const SignupForm = ({ selectedRole, onToggle }) => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        city: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!phoneRegex.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Invalid phone number';
        }
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Min 8 chars, 1 uppercase, 1 number';
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the Terms';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setIsLoading(true);
            setTimeout(() => {
                const result = register({
                    ...formData,
                    role: selectedRole,
                });
                setIsLoading(false);
                if (result.success) {
                    // Customer auto-approved → go to dashboard
                    if (selectedRole === 'customer') {
                        navigate('/dashboard/user');
                    } else {
                        // All other roles → go to verification page
                        navigate('/verification');
                    }
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

    // ── Hotel / Travel Provider: redirect to full-page onboarding ──
    if (selectedRole === 'hotel_provider') {
        navigate('/onboarding/hotel');
        return null;
    }
    if (selectedRole === 'travel_tours') {
        navigate('/onboarding/travel');
        return null;
    }

    return (
        <div className="w-full animate-fadeIn">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Create Your Account</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Register as <span className="font-semibold text-blue-600">{roleLabel}</span>
                </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <Input
                    label="Full Name"
                    id="signup-name"
                    name="fullName"
                    placeholder="Muhammad Ali"
                    value={formData.fullName}
                    onChange={handleChange}
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
                    id="signup-email"
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        label="Phone Number"
                        id="signup-phone"
                        name="phoneNumber"
                        type="tel"
                        placeholder="+92 300 1234567"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        error={errors.phoneNumber}
                        required
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>
                        }
                    />
                    <Input
                        label="City"
                        id="signup-city"
                        name="city"
                        placeholder="Lahore"
                        value={formData.city}
                        onChange={handleChange}
                        error={errors.city}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        label="Password"
                        id="signup-password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        required
                    />
                    <Input
                        label="Confirm Password"
                        id="signup-confirm"
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={errors.confirmPassword}
                        required
                    />
                </div>

                <Checkbox
                    id="signup-terms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    error={errors.agreeTerms}
                    required
                    label={
                        <span>
                            I agree to the{' '}
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
                                Terms & Conditions
                            </a>
                        </span>
                    }
                />

                <Button type="submit" isLoading={isLoading}>
                    Create Account
                </Button>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <button
                            type="button"
                            onClick={onToggle}
                            className="font-semibold text-blue-600 hover:text-blue-500 hover:underline transition-all"
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default SignupForm;
