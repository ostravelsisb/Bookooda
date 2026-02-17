import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';

const AgentLogin = ({ onToggle }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                alert('Agent Login Successful!');
            }, 1000);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center p-6 md:p-10">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Agent Login</h2>
                    <p className="mt-2 text-sm text-gray-600">Access your agent dashboard</p>
                </div>

                <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                    <Input
                        label="Registered Email"
                        id="agent-email"
                        name="email"
                        type="email"
                        placeholder="agent@example.com"
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
                        id="agent-password"
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
                            id="agent-remember"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                            label="Remember me"
                        />
                        <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 hover:underline transition-colors">
                            Forgot password?
                        </a>
                    </div>

                    <Button type="submit" isLoading={isLoading}>
                        Sign In as Agent
                    </Button>

                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Don't have an agent account?{' '}
                            <button
                                type="button"
                                onClick={onToggle}
                                className="font-semibold text-blue-600 hover:text-blue-500 focus:outline-none hover:underline transition-all"
                            >
                                Register as Agent
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AgentLogin;
