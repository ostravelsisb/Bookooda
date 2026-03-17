import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import Select from '../components/Select';
import MultiSelect from '../components/MultiSelect';
import FileUpload from '../components/FileUpload';

const VEHICLE_TYPES = ['Sedan', 'SUV', 'Prado', 'Coaster', 'Hiace', 'Bus', 'Pickup', 'Luxury', 'Sports Car', 'Minivan'];

const CarRentalSignup = ({ onToggle, onSubmit }) => {
    const [formData, setFormData] = useState({
        companyName: '',
        cnicOrRegNumber: '',
        email: '',
        phoneNumber: '',
        officeAddress: '',
        city: '',
        fleetSize: '',
        vehicleTypes: [],
        driverAvailability: '',
        startingPricePerDay: '',
        vehicleDocs: null,
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

        if (!formData.companyName.trim()) newErrors.companyName = 'Name is required';
        if (!formData.cnicOrRegNumber.trim()) newErrors.cnicOrRegNumber = 'CNIC or Registration is required';
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
        if (!formData.fleetSize) newErrors.fleetSize = 'Fleet size is required';
        if (formData.vehicleTypes.length === 0) newErrors.vehicleTypes = 'Select at least one vehicle type';
        if (!formData.driverAvailability) newErrors.driverAvailability = 'Please select availability';
        if (!formData.startingPricePerDay) newErrors.startingPricePerDay = 'Starting price is required';
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
                if (onSubmit) onSubmit({ ...formData, role: 'car_rental', status: 'Unverified' });
                else alert('Car Rental Registration Successful! Phone verification is pending.');
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
                <h2 className="text-2xl font-bold text-gray-900">Car Rental Registration</h2>
                <p className="mt-1 text-sm text-gray-500">List your rental vehicles on Bookooda</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Full Name / Company Name" id="cr-name" name="companyName" placeholder="Ali Car Rentals" value={formData.companyName} onChange={handleChange} error={errors.companyName} required />
                    <Input label="CNIC / Business Reg Number" id="cr-reg" name="cnicOrRegNumber" placeholder="12345-1234567-1" value={formData.cnicOrRegNumber} onChange={handleChange} error={errors.cnicOrRegNumber} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Email" id="cr-email" name="email" type="email" placeholder="rentals@example.com" value={formData.email} onChange={handleChange} error={errors.email} required />
                    <Input label="Phone Number" id="cr-phone" name="phoneNumber" type="tel" placeholder="+92 300 1234567" value={formData.phoneNumber} onChange={handleChange} error={errors.phoneNumber} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="City" id="cr-city" name="city" placeholder="Islamabad" value={formData.city} onChange={handleChange} error={errors.city} required />
                    <Input label="Office Address" id="cr-address" name="officeAddress" placeholder="D-12, Markaz" value={formData.officeAddress} onChange={handleChange} error={errors.officeAddress} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Fleet Size" id="cr-fleet" name="fleetSize" type="number" placeholder="10" value={formData.fleetSize} onChange={handleChange} error={errors.fleetSize} required />
                    <Select label="Driver Availability" id="cr-driver" name="driverAvailability" value={formData.driverAvailability} onChange={handleChange} error={errors.driverAvailability} required placeholder="Select..."
                        options={[{ value: 'yes', label: 'Yes - Drivers Available' }, { value: 'no', label: 'No - Self-Drive Only' }]}
                    />
                </div>

                <MultiSelect label="Vehicle Types" id="cr-vehicles" name="vehicleTypes" options={VEHICLE_TYPES} value={formData.vehicleTypes} onChange={handleChange} error={errors.vehicleTypes} required placeholder="Select vehicle types" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Starting Price Per Day (PKR)" id="cr-price" name="startingPricePerDay" type="number" placeholder="5000" value={formData.startingPricePerDay} onChange={handleChange} error={errors.startingPricePerDay} required />
                    <Input label="Bank Account Details" id="cr-bank" name="bankAccountDetails" placeholder="IBAN / Account Number" value={formData.bankAccountDetails} onChange={handleChange} />
                </div>

                <FileUpload label="Upload Vehicle Registration Documents" id="cr-docs" name="vehicleDocs" onChange={handleChange} accept=".pdf,.jpg,.jpeg,.png" multiple hint="Upload registration documents" />

                <div className="border-t border-gray-100 pt-4 mt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input label="Password" id="cr-password" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} error={errors.password} required />
                        <Input label="Confirm Password" id="cr-confirm" name="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} required />
                    </div>
                </div>

                <Checkbox id="cr-terms" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} error={errors.agreeTerms} required
                    label={<span>I agree to the <a href="#" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">Terms & Conditions</a></span>}
                />

                <Button type="submit" isLoading={isLoading}>Register Car Rental</Button>

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

export default CarRentalSignup;
