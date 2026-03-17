import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import FileUpload from '../components/FileUpload';
import MultiSelect from '../components/MultiSelect';

const EXPERTISE_OPTIONS = ['Visa Processing', 'Flights Booking', 'Hotel Booking', 'Tours & Packages', 'Study Abroad', 'Travel Insurance', 'Umrah & Hajj', 'Car Rental'];

const IndividualAgentSignup = ({ onToggle, onSubmit }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        cnicNumber: '',
        email: '',
        phoneNumber: '',
        city: '',
        yearsOfExperience: '',
        areasOfExpertise: [],
        idProof: null,
        profilePicture: null,
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

        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.cnicNumber.trim()) newErrors.cnicNumber = 'CNIC / ID Number is required';
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
        if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Experience is required';
        if (formData.areasOfExpertise.length === 0) newErrors.areasOfExpertise = 'Select at least one area';
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
                if (onSubmit) onSubmit({ ...formData, role: 'individual_agent', status: 'Unverified' });
                else alert('Individual Agent Registration Successful! Phone verification is pending.');
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
                <h2 className="text-2xl font-bold text-gray-900">Individual Agent Registration</h2>
                <p className="mt-1 text-sm text-gray-500">Join Bookooda as an independent travel agent</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Full Name" id="ia-name" name="fullName" placeholder="Muhammad Ahmed" value={formData.fullName} onChange={handleChange} error={errors.fullName} required />
                    <Input label="CNIC / ID Number" id="ia-cnic" name="cnicNumber" placeholder="12345-1234567-1" value={formData.cnicNumber} onChange={handleChange} error={errors.cnicNumber} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Email" id="ia-email" name="email" type="email" placeholder="agent@example.com" value={formData.email} onChange={handleChange} error={errors.email} required />
                    <Input label="Phone Number" id="ia-phone" name="phoneNumber" type="tel" placeholder="+92 300 1234567" value={formData.phoneNumber} onChange={handleChange} error={errors.phoneNumber} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="City" id="ia-city" name="city" placeholder="Karachi" value={formData.city} onChange={handleChange} error={errors.city} required />
                    <Input label="Years of Experience" id="ia-experience" name="yearsOfExperience" type="number" placeholder="3" value={formData.yearsOfExperience} onChange={handleChange} error={errors.yearsOfExperience} required />
                </div>

                <MultiSelect label="Areas of Expertise" id="ia-expertise" name="areasOfExpertise" options={EXPERTISE_OPTIONS} value={formData.areasOfExpertise} onChange={handleChange} error={errors.areasOfExpertise} required placeholder="Select your areas of expertise" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FileUpload label="Upload ID Proof" id="ia-idproof" name="idProof" onChange={handleChange} accept=".pdf,.jpg,.jpeg,.png" hint="Upload CNIC / ID copy" />
                    <FileUpload label="Profile Picture" id="ia-profile" name="profilePicture" onChange={handleChange} accept="image/*" hint="Upload your photo" />
                </div>

                <div className="border-t border-gray-100 pt-4 mt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input label="Password" id="ia-password" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} error={errors.password} required />
                        <Input label="Confirm Password" id="ia-confirm" name="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} required />
                    </div>
                </div>

                <Checkbox id="ia-terms" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} error={errors.agreeTerms} required
                    label={<span>I agree to the <a href="#" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">Terms & Conditions</a></span>}
                />

                <Button type="submit" isLoading={isLoading}>Register as Agent</Button>

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

export default IndividualAgentSignup;
