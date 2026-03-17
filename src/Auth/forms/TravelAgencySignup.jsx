import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';

const TravelAgencySignup = ({ onToggle, onSubmit }) => {
    const [formData, setFormData] = useState({
        companyName: '',
        registrationNumber: '',
        ownerName: '',
        businessEmail: '',
        phoneNumber: '',
        officeAddress: '',
        city: '',
        website: '',
        yearsOfExperience: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
        if (!formData.registrationNumber.trim()) newErrors.registrationNumber = 'Registration number is required';
        if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required';
        if (!formData.businessEmail) {
            newErrors.businessEmail = 'Business email is required';
        } else if (!emailRegex.test(formData.businessEmail)) {
            newErrors.businessEmail = 'Invalid email format';
        }
        if (!formData.phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!phoneRegex.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Invalid phone number';
        }
        if (!formData.officeAddress.trim()) newErrors.officeAddress = 'Office address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Years of experience is required';
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
                setIsLoading(false);
                if (onSubmit) onSubmit({ ...formData, role: 'travel_agency', status: 'Unverified' });
                else alert('Travel Agency Registration Successful! Your account is pending phone verification.');
            }, 1000);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    return (
        <div className="w-full animate-fadeIn">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Travel Agency Registration</h2>
                <p className="mt-1 text-sm text-gray-500">Register your travel company on Bookooda</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Company Name" id="ta-company" name="companyName" placeholder="ABC Travel Agency" value={formData.companyName} onChange={handleChange} error={errors.companyName} required />
                    <Input label="Registration Number" id="ta-reg" name="registrationNumber" placeholder="REG-123456" value={formData.registrationNumber} onChange={handleChange} error={errors.registrationNumber} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Owner Name" id="ta-owner" name="ownerName" placeholder="Muhammad Ali" value={formData.ownerName} onChange={handleChange} error={errors.ownerName} required />
                    <Input label="Business Email" id="ta-email" name="businessEmail" type="email" placeholder="info@agency.com" value={formData.businessEmail} onChange={handleChange} error={errors.businessEmail} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Phone Number" id="ta-phone" name="phoneNumber" type="tel" placeholder="+92 300 1234567" value={formData.phoneNumber} onChange={handleChange} error={errors.phoneNumber} required />
                    <Input label="City" id="ta-city" name="city" placeholder="Lahore" value={formData.city} onChange={handleChange} error={errors.city} required />
                </div>
                <Input label="Office Address" id="ta-address" name="officeAddress" placeholder="123 Main Street, Block B" value={formData.officeAddress} onChange={handleChange} error={errors.officeAddress} required />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Website (Optional)" id="ta-website" name="website" type="url" placeholder="https://www.agency.com" value={formData.website} onChange={handleChange} />
                    <Input label="Years of Experience" id="ta-experience" name="yearsOfExperience" type="number" placeholder="5" value={formData.yearsOfExperience} onChange={handleChange} error={errors.yearsOfExperience} required />
                </div>

                <div className="border-t border-gray-100 pt-4 mt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input label="Password" id="ta-password" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} error={errors.password} required />
                        <Input label="Confirm Password" id="ta-confirm" name="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} required />
                    </div>
                </div>

                <Checkbox id="ta-terms" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} error={errors.agreeTerms} required
                    label={<span>I agree to the <a href="#" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">Terms & Conditions</a></span>}
                />

                <Button type="submit" isLoading={isLoading}>Register Travel Agency</Button>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <button type="button" onClick={onToggle} className="font-semibold text-blue-600 hover:text-blue-500 hover:underline transition-all">Sign in</button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default TravelAgencySignup;
