import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import MultiSelect from '../components/MultiSelect';

const CITIES = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Peshawar', 'Quetta', 'Multan', 'Faisalabad', 'Sialkot', 'Murree', 'Hunza', 'Skardu', 'Gilgit', 'Swat', 'Naran', 'Kaghan', 'Chitral', 'Bahawalpur', 'Abbottabad', 'Muzaffarabad'];
const TRIP_TYPES = ['Honeymoon', 'Family', 'Adventure', 'Corporate', 'Solo Travel', 'Group Tour', 'Religious', 'Cultural', 'Camping', 'Weekend Getaway'];

const TripProviderSignup = ({ onToggle, onSubmit }) => {
    const [formData, setFormData] = useState({
        businessName: '',
        ownerName: '',
        email: '',
        phoneNumber: '',
        facebookLink: '',
        instagramLink: '',
        websiteLink: '',
        citiesOfOperation: [],
        tripTypes: [],
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

        if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
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
        if (formData.citiesOfOperation.length === 0) newErrors.citiesOfOperation = 'Select at least one city';
        if (formData.tripTypes.length === 0) newErrors.tripTypes = 'Select at least one trip type';
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
                if (onSubmit) onSubmit({ ...formData, role: 'trip_provider', status: 'Unverified' });
                else alert('Trip Provider Registration Successful! Phone verification is pending.');
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
                <h2 className="text-2xl font-bold text-gray-900">Trip Provider Registration</h2>
                <p className="mt-1 text-sm text-gray-500">Organize tours and packages with Bookooda</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Business / Brand Name" id="tp-business" name="businessName" placeholder="Adventure Pakistan" value={formData.businessName} onChange={handleChange} error={errors.businessName} required />
                    <Input label="Owner Name" id="tp-owner" name="ownerName" placeholder="Hassan Ali" value={formData.ownerName} onChange={handleChange} error={errors.ownerName} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Email" id="tp-email" name="email" type="email" placeholder="trips@example.com" value={formData.email} onChange={handleChange} error={errors.email} required />
                    <Input label="Phone Number" id="tp-phone" name="phoneNumber" type="tel" placeholder="+92 300 1234567" value={formData.phoneNumber} onChange={handleChange} error={errors.phoneNumber} required />
                </div>

                <div className="bg-blue-50/70 rounded-xl p-4 space-y-3">
                    <p className="text-xs font-medium text-blue-700 uppercase tracking-wider">Social Links (Optional)</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <Input id="tp-fb" name="facebookLink" placeholder="Facebook Page" value={formData.facebookLink} onChange={handleChange} />
                        <Input id="tp-ig" name="instagramLink" placeholder="Instagram Page" value={formData.instagramLink} onChange={handleChange} />
                        <Input id="tp-web" name="websiteLink" placeholder="Website (Optional)" value={formData.websiteLink} onChange={handleChange} />
                    </div>
                </div>

                <MultiSelect label="Cities / Areas of Operation" id="tp-cities" name="citiesOfOperation" options={CITIES} value={formData.citiesOfOperation} onChange={handleChange} error={errors.citiesOfOperation} required placeholder="Select cities..." />

                <MultiSelect label="Types of Trips" id="tp-types" name="tripTypes" options={TRIP_TYPES} value={formData.tripTypes} onChange={handleChange} error={errors.tripTypes} required placeholder="Select trip types..." />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Starting Package Price (PKR)" id="tp-price" name="startingPackagePrice" type="number" placeholder="15000" value={formData.startingPackagePrice} onChange={handleChange} error={errors.startingPackagePrice} required />
                    <Input label="Bank Account Details" id="tp-bank" name="bankAccountDetails" placeholder="IBAN / Account Number" value={formData.bankAccountDetails} onChange={handleChange} />
                </div>

                <div className="border-t border-gray-100 pt-4 mt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input label="Password" id="tp-password" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} error={errors.password} required />
                        <Input label="Confirm Password" id="tp-confirm" name="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} required />
                    </div>
                </div>

                <Checkbox id="tp-terms" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} error={errors.agreeTerms} required
                    label={<span>I agree to the <a href="#" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">Terms & Conditions</a></span>}
                />

                <Button type="submit" isLoading={isLoading}>Register Trip Provider</Button>

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

export default TripProviderSignup;
