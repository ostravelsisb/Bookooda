import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import MultiSelect from '../components/MultiSelect';

const UMRAH_SERVICES = ['Visa Processing', 'Hotel Booking', 'Transport', 'Complete Package', 'Group Umrah', 'VIP Package', 'Ziyarat Tours', 'Flight Booking'];

const UmrahProviderSignup = ({ onToggle, onSubmit }) => {
    const [formData, setFormData] = useState({
        companyName: '',
        ownerName: '',
        email: '',
        phoneNumber: '',
        officeAddress: '',
        city: '',
        ministryRegNumber: '',
        yearsOfExperience: '',
        servicesOffered: [],
        startingPackagePrice: '',
        bankAccountDetails: '',
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
        if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required';
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
        if (!formData.officeAddress.trim()) newErrors.officeAddress = 'Office address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Experience is required';
        if (formData.servicesOffered.length === 0) newErrors.servicesOffered = 'Select at least one service';
        if (!formData.startingPackagePrice) newErrors.startingPackagePrice = 'Starting price is required';
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
                if (onSubmit) onSubmit({ ...formData, role: 'umrah_provider', status: 'Unverified' });
                else alert('Umrah Service Provider Registration Successful! Phone verification is pending.');
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
                <h2 className="text-2xl font-bold text-gray-900">Umrah Service Provider</h2>
                <p className="mt-1 text-sm text-gray-500">Offer Umrah travel packages on Bookooda</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Company Name" id="up-company" name="companyName" placeholder="Al-Haramain Travels" value={formData.companyName} onChange={handleChange} error={errors.companyName} required />
                    <Input label="Owner Name" id="up-owner" name="ownerName" placeholder="Muhammad Usman" value={formData.ownerName} onChange={handleChange} error={errors.ownerName} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Email" id="up-email" name="email" type="email" placeholder="umrah@example.com" value={formData.email} onChange={handleChange} error={errors.email} required />
                    <Input label="Phone Number" id="up-phone" name="phoneNumber" type="tel" placeholder="+92 300 1234567" value={formData.phoneNumber} onChange={handleChange} error={errors.phoneNumber} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="City" id="up-city" name="city" placeholder="Lahore" value={formData.city} onChange={handleChange} error={errors.city} required />
                    <Input label="Office Address" id="up-address" name="officeAddress" placeholder="Hall Road, Lahore" value={formData.officeAddress} onChange={handleChange} error={errors.officeAddress} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Ministry Reg. Number (Optional)" id="up-ministry" name="ministryRegNumber" placeholder="MoRA-12345" value={formData.ministryRegNumber} onChange={handleChange} />
                    <Input label="Years of Experience" id="up-experience" name="yearsOfExperience" type="number" placeholder="8" value={formData.yearsOfExperience} onChange={handleChange} error={errors.yearsOfExperience} required />
                </div>

                <MultiSelect label="Services Offered" id="up-services" name="servicesOffered" options={UMRAH_SERVICES} value={formData.servicesOffered} onChange={handleChange} error={errors.servicesOffered} required placeholder="Select services..." />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Starting Package Price (PKR)" id="up-price" name="startingPackagePrice" type="number" placeholder="150000" value={formData.startingPackagePrice} onChange={handleChange} error={errors.startingPackagePrice} required />
                    <Input label="Bank Account Details" id="up-bank" name="bankAccountDetails" placeholder="IBAN / Account Number" value={formData.bankAccountDetails} onChange={handleChange} />
                </div>

                <div className="border-t border-gray-100 pt-4 mt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input label="Password" id="up-password" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} error={errors.password} required />
                        <Input label="Confirm Password" id="up-confirm" name="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} required />
                    </div>
                </div>

                <Checkbox id="up-terms" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} error={errors.agreeTerms} required
                    label={<span>I agree to the <a href="#" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">Terms & Conditions</a></span>}
                />

                <Button type="submit" isLoading={isLoading}>Register Umrah Provider</Button>

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

export default UmrahProviderSignup;
