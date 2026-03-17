import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Button from '../../components/Button';
import Footer from '../../../Components/Footer';
import Step1AccountDetails from './Step1AccountDetails';
import Step2PropertyType from './Step2PropertyType';
import Step3Facilities from './Step3Facilities';
import Step4RoomTypes from './Step4RoomTypes';
import Step5PropertyImages from './Step5PropertyImages';
import Step6VerificationPending from './Step6VerificationPending';

const STEPS = [
    { number: 1, label: 'Account', icon: '👤' },
    { number: 2, label: 'Property Type', icon: '🏨' },
    { number: 3, label: 'Facilities', icon: '✨' },
    { number: 4, label: 'Room Types', icon: '🛏️' },
    { number: 5, label: 'Images', icon: '📸' },
    { number: 6, label: 'Complete', icon: '✅' },
];

const HotelOnboardingPage = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        propertyType: '',
        facilities: [],
        roomTypes: [{ name: '', rooms: '', pricePerNight: '' }],
        images: [],
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

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
                handleSubmit();
            } else {
                setCurrentStep(prev => prev + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
            setErrors({});
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
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
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                setErrors({ submit: result.message || 'Registration failed. Please try again.' });
            }
        }, 1000);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <Step1AccountDetails data={formData} errors={errors} onChange={handleChange} />;
            case 2: return <Step2PropertyType data={formData} errors={errors} onChange={handleChange} />;
            case 3: return <Step3Facilities data={formData} errors={errors} onChange={handleChange} />;
            case 4: return <Step4RoomTypes data={formData} errors={errors} onChange={handleChange} />;
            case 5: return <Step5PropertyImages data={formData} errors={errors} onChange={handleChange} />;
            case 6: return <Step6VerificationPending />;
            default: return null;
        }
    };

    const stepTitles = {
        1: 'Create your hotel provider account',
        2: 'Choose your property type',
        3: 'Select available facilities',
        4: 'Define your room categories',
        5: 'Upload property photos',
    };

    return (
        <div className="min-h-screen w-full bg-slate-50 font-sans selection:bg-blue-200 flex flex-col">

            {/* ═══════════ Top Navigation Bar ═══════════ */}
            <div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <img src="/mainlogo.png" alt="Bookooda Logo" className="h-8 w-8 object-contain" />
                            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Bookooda</h1>
                            {currentStep < 6 && (
                                <span className="hidden sm:inline-flex ml-3 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100">
                                    Property Setup
                                </span>
                            )}
                        </div>

                        {currentStep < 6 && (
                            <button
                                onClick={() => navigate('/auth')}
                                className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors group px-3 py-2 rounded-lg hover:bg-slate-100"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 transition-transform group-hover:-translate-x-0.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                </svg>
                                Exit Setup
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ═══════════ Progress Section ═══════════ */}
            {currentStep < 6 && (
                <div className="bg-white border-b border-slate-100">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
                        {/* Step circles */}
                        <div className="flex items-center justify-between">
                            {STEPS.filter(s => s.number <= 5).map((step, index) => {
                                const isActive = currentStep === step.number;
                                const isCompleted = currentStep > step.number;
                                const isLast = index === 4;

                                return (
                                    <React.Fragment key={step.number}>
                                        <div className="flex flex-col items-center relative z-10">
                                            <div
                                                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300
                                                    ${isCompleted
                                                        ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200'
                                                        : isActive
                                                            ? 'bg-white border-blue-600 text-blue-600 shadow-[0_0_0_4px_rgba(59,130,246,0.12)]'
                                                            : 'bg-slate-100 border-slate-200 text-slate-400'
                                                    }`}
                                            >
                                                {isCompleted ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                                    </svg>
                                                ) : (
                                                    <span className="text-lg">{step.icon}</span>
                                                )}
                                            </div>
                                            <span className={`mt-2 text-[10px] sm:text-xs font-semibold transition-colors whitespace-nowrap
                                                ${isActive || isCompleted ? 'text-blue-600' : 'text-slate-400'}`}>
                                                {step.label}
                                            </span>
                                        </div>

                                        {!isLast && (
                                            <div className="flex-1 mx-1.5 sm:mx-3 mt-[-20px]">
                                                <div className="h-[3px] w-full bg-slate-200 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full bg-blue-600 rounded-full transition-all duration-500 ease-in-out
                                                            ${isCompleted ? 'w-full' : 'w-0'}`}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>

                        {/* Progress bar + text */}
                        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                            <span className="font-medium">Step {currentStep} of 5</span>
                            <span className="font-medium">{Math.round((currentStep / 5) * 100)}% Complete</span>
                        </div>
                        <div className="mt-2 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500 ease-in-out"
                                style={{ width: `${(currentStep / 5) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ═══════════ Main Content ═══════════ */}
            <div className="flex-1">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                    {/* Step card */}
                    <div className={`bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100 transition-all duration-300
                        ${currentStep === 6 ? 'p-8 sm:p-12' : 'p-6 sm:p-10'}`}>
                        {renderStep()}

                        {/* Submit error */}
                        {errors.submit && (
                            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                                <p className="text-sm text-red-600">{errors.submit}</p>
                            </div>
                        )}
                    </div>

                    {/* ═══════════ Navigation Buttons ═══════════ */}
                    {currentStep < 6 && (
                        <div className="mt-6">
                            {/* Button row */}
                            <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100 p-4 sm:p-5">
                                <div className="flex items-center justify-between gap-4">
                                    {/* Left side: Back button or step info */}
                                    <div className="flex items-center gap-3">
                                        {currentStep > 1 ? (
                                            <button
                                                type="button"
                                                onClick={handleBack}
                                                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                                </svg>
                                                Back
                                            </button>
                                        ) : (
                                            <div className="hidden sm:flex items-center gap-2.5 text-sm text-slate-400">
                                                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-emerald-500">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                                    </svg>
                                                </div>
                                                <span className="font-medium">Your data is secure</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right side: Next/Submit button */}
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        disabled={isSubmitting}
                                        className="inline-flex items-center gap-2.5 px-7 sm:px-10 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                {currentStep === 5 ? (
                                                    <>
                                                        Submit Property
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                        </svg>
                                                    </>
                                                ) : (
                                                    <>
                                                        Continue
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                                        </svg>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Sign in + help row */}
                            <div className="flex items-center justify-between mt-4 px-2">
                                {currentStep === 1 ? (
                                    <p className="text-sm text-gray-500">
                                        Already have an account?{' '}
                                        <button
                                            type="button"
                                            onClick={() => navigate('/auth', {
                                                state: { role: 'hotel_provider', mode: 'login' }
                                            })}
                                            className="font-semibold text-blue-600 hover:text-blue-500 hover:underline transition-all"
                                        >
                                            Sign in
                                        </button>
                                    </p>
                                ) : (
                                    <div />
                                )}
                                <p className="text-xs text-slate-400">
                                    Need help?{' '}
                                    <a href="mailto:support@bookooda.com" className="text-blue-500 hover:underline font-medium">
                                        Contact us
                                    </a>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ═══════════ Footer ═══════════ */}
            <Footer />
        </div>
    );
};

export default HotelOnboardingPage;
