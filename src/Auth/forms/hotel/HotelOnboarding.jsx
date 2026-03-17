import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Button from '../../components/Button';
import Step1AccountDetails from './Step1AccountDetails';
import Step2PropertyType from './Step2PropertyType';
import Step3Facilities from './Step3Facilities';
import Step4RoomTypes from './Step4RoomTypes';
import Step5PropertyImages from './Step5PropertyImages';
import Step6VerificationPending from './Step6VerificationPending';

const STEPS = [
    { number: 1, label: 'Account' },
    { number: 2, label: 'Property' },
    { number: 3, label: 'Facilities' },
    { number: 4, label: 'Rooms' },
    { number: 5, label: 'Images' },
    { number: 6, label: 'Complete' },
];

const HotelOnboarding = ({ onToggle }) => {
    const { register } = useAuth();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        // Step 1 — Account
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        // Step 2 — Property Type
        propertyType: '',
        // Step 3 — Facilities
        facilities: [],
        // Step 4 — Room Types
        roomTypes: [{ name: '', rooms: '', pricePerNight: '' }],
        // Step 5 — Images
        images: [],
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        // Clear related error
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // ── Validation per step ──
    const validateStep = (step) => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        switch (step) {
            case 1:
                if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
                if (!formData.email) {
                    newErrors.email = 'Email is required';
                } else if (!emailRegex.test(formData.email)) {
                    newErrors.email = 'Invalid email format';
                }
                if (!formData.password) {
                    newErrors.password = 'Password is required';
                } else if (formData.password.length < 8) {
                    newErrors.password = 'Password must be at least 8 characters';
                }
                if (!formData.confirmPassword) {
                    newErrors.confirmPassword = 'Please confirm your password';
                } else if (formData.password !== formData.confirmPassword) {
                    newErrors.confirmPassword = 'Passwords do not match';
                }
                break;

            case 2:
                if (!formData.propertyType) {
                    newErrors.propertyType = 'Please select a property type';
                }
                break;

            case 3:
                // Facilities are optional — no strict validation
                break;

            case 4:
                if (!formData.roomTypes || formData.roomTypes.length === 0) {
                    newErrors.roomTypes = 'Add at least one room type';
                } else {
                    formData.roomTypes.forEach((room, i) => {
                        if (!room.name.trim()) newErrors[`roomName-${i}`] = 'Room name is required';
                        if (!room.rooms || Number(room.rooms) <= 0) newErrors[`roomCount-${i}`] = 'Enter a valid number';
                        if (!room.pricePerNight || Number(room.pricePerNight) <= 0) newErrors[`roomPrice-${i}`] = 'Enter a valid price';
                    });
                }
                break;

            case 5:
                if (!formData.images || formData.images.length < 3) {
                    newErrors.images = 'Please upload at least 3 images';
                }
                break;

            default:
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            if (currentStep === 5) {
                // Final step — submit everything
                handleSubmit();
            } else {
                setCurrentStep(prev => prev + 1);
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
            setErrors({});
        }
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            // Build the final payload
            const payload = {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                role: 'hotel_provider',
                phoneNumber: '',
                city: '',
                propertyType: formData.propertyType,
                facilities: formData.facilities,
                roomTypes: formData.roomTypes.map(r => ({
                    name: r.name,
                    rooms: Number(r.rooms),
                    pricePerNight: Number(r.pricePerNight),
                })),
                images: formData.images,
            };

            const result = register(payload);
            setIsSubmitting(false);

            if (result.success) {
                setCurrentStep(6);
            } else {
                setErrors({ submit: result.message || 'Registration failed. Please try again.' });
            }
        }, 1000);
    };

    // ── Progress Indicator ──
    const ProgressIndicator = () => (
        <div className="mb-8">
            <div className="flex items-center justify-between">
                {STEPS.map((step, index) => {
                    const isActive = currentStep === step.number;
                    const isCompleted = currentStep > step.number;
                    const isLast = index === STEPS.length - 1;

                    return (
                        <React.Fragment key={step.number}>
                            <div className="flex flex-col items-center relative">
                                {/* Circle */}
                                <div
                                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300
                                        ${isCompleted
                                            ? 'bg-blue-600 border-blue-600 text-white'
                                            : isActive
                                                ? 'bg-white border-blue-600 text-blue-600 shadow-[0_0_0_4px_rgba(59,130,246,0.15)]'
                                                : 'bg-gray-100 border-gray-200 text-gray-400'
                                        }`}
                                >
                                    {isCompleted ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                        </svg>
                                    ) : step.number}
                                </div>
                                {/* Label */}
                                <span className={`mt-1.5 text-[10px] sm:text-xs font-medium transition-colors whitespace-nowrap
                                    ${isActive ? 'text-blue-600' : isCompleted ? 'text-blue-600' : 'text-gray-400'}`}>
                                    {step.label}
                                </span>
                            </div>

                            {/* Connector line */}
                            {!isLast && (
                                <div className="flex-1 mx-1 sm:mx-2 mt-[-16px]">
                                    <div className="h-0.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full bg-blue-600 rounded-full transition-all duration-500
                                                ${isCompleted ? 'w-full' : 'w-0'}`}
                                        />
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );

    // ── Step Content ──
    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Step1AccountDetails data={formData} errors={errors} onChange={handleChange} />;
            case 2:
                return <Step2PropertyType data={formData} errors={errors} onChange={handleChange} />;
            case 3:
                return <Step3Facilities data={formData} errors={errors} onChange={handleChange} />;
            case 4:
                return <Step4RoomTypes data={formData} errors={errors} onChange={handleChange} />;
            case 5:
                return <Step5PropertyImages data={formData} errors={errors} onChange={handleChange} />;
            case 6:
                return <Step6VerificationPending />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full animate-fadeIn">
            {/* Progress – hide on final step */}
            {currentStep < 6 && <ProgressIndicator />}

            {/* Step content */}
            {renderStep()}

            {/* Submit error */}
            {errors.submit && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm text-red-600">{errors.submit}</p>
                </div>
            )}

            {/* Navigation buttons — hide on final step */}
            {currentStep < 6 && (
                <div className="flex items-center gap-3 mt-8">
                    {currentStep > 1 && (
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleBack}
                            className="flex-1"
                        >
                            <span className="flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                </svg>
                                Back
                            </span>
                        </Button>
                    )}
                    <Button
                        type="button"
                        onClick={handleNext}
                        isLoading={isSubmitting}
                        className="flex-1"
                    >
                        <span className="flex items-center justify-center gap-2">
                            {currentStep === 5 ? 'Submit Property' : 'Next'}
                            {currentStep < 5 && !isSubmitting && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            )}
                        </span>
                    </Button>
                </div>
            )}

            {/* Login toggle — only show on step 1 */}
            {currentStep === 1 && onToggle && (
                <div className="text-center mt-6">
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
            )}
        </div>
    );
};

export default HotelOnboarding;
