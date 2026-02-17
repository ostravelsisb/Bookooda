import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import Select from '../components/Select';

const AgentSignup = ({ onToggle }) => {
    const [agentType, setAgentType] = useState('');
    const [formData, setFormData] = useState({
        // Individual Agent Fields
        fullName: '',
        cnic: '',
        phone: '',
        email: '',
        address: '',
        // Agency Fields
        agencyName: '',
        ownerName: '',
        agencyRegNumber: '',
        officeAddress: '',
        businessEmail: '',
        contactNumber: '',
        website: '',
        // Common Fields
        password: '',
        confirmPassword: '',
        agreeTerms: false
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const agentTypeOptions = [
        { value: 'individual', label: 'Individual Agent' },
        { value: 'agency', label: 'Agency' }
    ];

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/;

        if (!agentType) {
            newErrors.agentType = 'Please select agent type';
        }

        if (agentType === 'individual') {
            if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
            if (!formData.cnic) {
                newErrors.cnic = 'CNIC/Registration Number is required';
            } else if (!cnicRegex.test(formData.cnic)) {
                newErrors.cnic = 'Invalid CNIC format (e.g., 12345-1234567-1)';
            }
            if (!formData.phone) {
                newErrors.phone = 'Phone number is required';
            } else if (!phoneRegex.test(formData.phone)) {
                newErrors.phone = 'Invalid phone number';
            }
            if (!formData.email) {
                newErrors.email = 'Email is required';
            } else if (!emailRegex.test(formData.email)) {
                newErrors.email = 'Invalid email format';
            }
            if (!formData.address.trim()) newErrors.address = 'Address is required';
        }

        if (agentType === 'agency') {
            if (!formData.agencyName.trim()) newErrors.agencyName = 'Agency Name is required';
            if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner Name is required';
            if (!formData.agencyRegNumber.trim()) newErrors.agencyRegNumber = 'Registration Number is required';
            if (!formData.officeAddress.trim()) newErrors.officeAddress = 'Office Address is required';
            if (!formData.businessEmail) {
                newErrors.businessEmail = 'Business Email is required';
            } else if (!emailRegex.test(formData.businessEmail)) {
                newErrors.businessEmail = 'Invalid email format';
            }
            if (!formData.contactNumber) {
                newErrors.contactNumber = 'Contact Number is required';
            } else if (!phoneRegex.test(formData.contactNumber)) {
                newErrors.contactNumber = 'Invalid phone number';
            }
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must be 8+ chars, 1 uppercase, 1 number';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.agreeTerms) {
            newErrors.agreeTerms = 'You must agree to the Terms & Conditions';
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
                alert(`${agentType === 'individual' ? 'Individual Agent' : 'Agency'} Registration Successful!`);
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

    const handleAgentTypeChange = (e) => {
        setAgentType(e.target.value);
        setErrors({});
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center p-6 md:p-10 overflow-y-auto">
            <div className="w-full max-w-md space-y-6 my-6">
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Agent Registration</h2>
                    <p className="mt-2 text-sm text-gray-600">Join Bookooda as a travel agent</p>
                </div>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <Select
                        label="Agent Type"
                        id="agent-type"
                        name="agentType"
                        value={agentType}
                        onChange={handleAgentTypeChange}
                        options={agentTypeOptions}
                        error={errors.agentType}
                        required
                        placeholder="Select agent type"
                    />

                    {agentType === 'individual' && (
                        <div className="space-y-4 animate-fadeIn">
                            <Input
                                label="Full Name"
                                id="agent-fullname"
                                name="fullName"
                                type="text"
                                placeholder="John Doe"
                                value={formData.fullName}
                                onChange={handleChange}
                                error={errors.fullName}
                                required
                            />

                            <Input
                                label="CNIC / Registration Number"
                                id="agent-cnic"
                                name="cnic"
                                type="text"
                                placeholder="12345-1234567-1"
                                value={formData.cnic}
                                onChange={handleChange}
                                error={errors.cnic}
                                required
                            />

                            <Input
                                label="Phone Number"
                                id="agent-phone"
                                name="phone"
                                type="tel"
                                placeholder="+92 300 1234567"
                                value={formData.phone}
                                onChange={handleChange}
                                error={errors.phone}
                                required
                            />

                            <Input
                                label="Email Address"
                                id="agent-email"
                                name="email"
                                type="email"
                                placeholder="agent@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email}
                                required
                            />

                            <Input
                                label="Address"
                                id="agent-address"
                                name="address"
                                type="text"
                                placeholder="Street, City, Country"
                                value={formData.address}
                                onChange={handleChange}
                                error={errors.address}
                                required
                            />
                        </div>
                    )}

                    {agentType === 'agency' && (
                        <div className="space-y-4 animate-fadeIn">
                            <Input
                                label="Agency Name"
                                id="agency-name"
                                name="agencyName"
                                type="text"
                                placeholder="Travel Agency Ltd."
                                value={formData.agencyName}
                                onChange={handleChange}
                                error={errors.agencyName}
                                required
                            />

                            <Input
                                label="Owner Name"
                                id="owner-name"
                                name="ownerName"
                                type="text"
                                placeholder="John Doe"
                                value={formData.ownerName}
                                onChange={handleChange}
                                error={errors.ownerName}
                                required
                            />

                            <Input
                                label="Agency Registration Number"
                                id="agency-reg"
                                name="agencyRegNumber"
                                type="text"
                                placeholder="REG-123456"
                                value={formData.agencyRegNumber}
                                onChange={handleChange}
                                error={errors.agencyRegNumber}
                                required
                            />

                            <Input
                                label="Office Address"
                                id="office-address"
                                name="officeAddress"
                                type="text"
                                placeholder="Office Street, City, Country"
                                value={formData.officeAddress}
                                onChange={handleChange}
                                error={errors.officeAddress}
                                required
                            />

                            <Input
                                label="Business Email"
                                id="business-email"
                                name="businessEmail"
                                type="email"
                                placeholder="info@agency.com"
                                value={formData.businessEmail}
                                onChange={handleChange}
                                error={errors.businessEmail}
                                required
                            />

                            <Input
                                label="Contact Number"
                                id="contact-number"
                                name="contactNumber"
                                type="tel"
                                placeholder="+92 300 1234567"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                error={errors.contactNumber}
                                required
                            />

                            <Input
                                label="Website (Optional)"
                                id="website"
                                name="website"
                                type="url"
                                placeholder="https://www.agency.com"
                                value={formData.website}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    {agentType && (
                        <div className="space-y-4 pt-2 animate-fadeIn">
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
                            />

                            <Input
                                label="Confirm Password"
                                id="agent-confirm-password"
                                name="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                error={errors.confirmPassword}
                                required
                            />

                            <Checkbox
                                id="agent-agree-terms"
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
                                Register as Agent
                            </Button>

                            <div className="text-center mt-4">
                                <p className="text-sm text-gray-600">
                                    Already have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={onToggle}
                                        className="font-semibold text-blue-600 hover:text-blue-500 focus:outline-none hover:underline transition-all"
                                    >
                                        Sign in
                                    </button>
                                </p>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AgentSignup;
