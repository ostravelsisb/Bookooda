import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Footer from '../../../Components/Footer';

// Steps
import Step1AccountDetails from './Step1AccountDetails';
import Step2OperatorType from './Step3OperatorType'; // renamed component usage
import Step3Details from './Step4Details';
import Step4Services from './Step6Services';
import Step5Countries from './Step7Countries';
import Step6AdditionalDetails from './Step8AdditionalDetails';
import Step7Documents from './Step5Documents';
import Step8VerificationPending from './Step9VerificationPending';

const STEPS = [
    { number: 1, label: 'Type', icon: '📝' },
    { number: 2, label: 'Account', icon: '👤' },
    { number: 3, label: 'Details', icon: '📋' },
    { number: 4, label: 'Services', icon: '✨' },
    { number: 5, label: 'Destinations', icon: '🌍' },
    { number: 6, label: 'Extra', icon: '➕' },
    { number: 7, label: 'Docs', icon: '📎' },
    { number: 8, label: 'Complete', icon: '✅' },
];

const TravelOnboardingPage = () => {
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
        businessCategory: 'travel_tours',
        operatorType: '',
        individualDetails: {
            fullName: '',
            phone: '',
            city: '',
            country: '',
            experienceYears: '',
            bio: ''
        },
        agencyDetails: {
            agencyName: '',
            registrationNumber: '',
            address: '',
            city: '',
            country: '',
            phone: '',
            website: ''
        },
        documents: {},
        services: [],
        countriesServed: [],
        additionalDetails: {
            description: '',
            packages: '',
            pricingRange: '',
            experienceYears: ''
        }
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (type === 'nested') {
            setFormData(prev => ({ ...prev, [name]: value }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateStep = (step) => {
        const newErrors = {};
        let isValid = true;

        if (step === 1) { // Type
            if (!formData.operatorType) newErrors.operatorType = 'Please select an operator type';
        } else if (step === 2) { // Account
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
            if (!formData.email) newErrors.email = 'Email is required';
            else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';
            if (!formData.password || formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
            if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        } else if (step === 3) { // Details
            if (formData.operatorType === 'individual') {
                if (!formData.individualDetails.fullName) newErrors.individualDetails = { ...newErrors.individualDetails, fullName: 'Required' };
                if (!formData.individualDetails.phone) newErrors.individualDetails = { ...newErrors.individualDetails, phone: 'Required' };
                if (!formData.individualDetails.city) newErrors.individualDetails = { ...newErrors.individualDetails, city: 'Required' };
                if (!formData.individualDetails.country) newErrors.individualDetails = { ...newErrors.individualDetails, country: 'Required' };
            } else {
                if (!formData.agencyDetails.agencyName) newErrors.agencyDetails = { ...newErrors.agencyDetails, agencyName: 'Required' };
                if (!formData.agencyDetails.registrationNumber) newErrors.agencyDetails = { ...newErrors.agencyDetails, registrationNumber: 'Required' };
                if (!formData.agencyDetails.phone) newErrors.agencyDetails = { ...newErrors.agencyDetails, phone: 'Required' };
                if (!formData.agencyDetails.city) newErrors.agencyDetails = { ...newErrors.agencyDetails, city: 'Required' };
                if (!formData.agencyDetails.country) newErrors.agencyDetails = { ...newErrors.agencyDetails, country: 'Required' };
                if (!formData.agencyDetails.address) newErrors.agencyDetails = { ...newErrors.agencyDetails, address: 'Required' };
            }
        } else if (step === 4) { // Services
            if (formData.services.length === 0) newErrors.services = 'Select at least one service';
        } else if (step === 5) { // Destinations
            if (formData.countriesServed.length === 0) newErrors.countriesServed = 'Select at least one destination';
        } else if (step === 6) { // Extra Details
            if (!formData.additionalDetails.description.trim()) newErrors.additionalDetails = { ...newErrors.additionalDetails, description: 'Required' };
        } else if (step === 7) { // Documents
            if (formData.operatorType === 'individual') {
                if (!formData.documents.cnicFront) newErrors.documents = { ...newErrors.documents, cnicFront: 'Required' };
                if (!formData.documents.cnicBack) newErrors.documents = { ...newErrors.documents, cnicBack: 'Required' };
            } else {
                if (!formData.documents.registrationCertificate) newErrors.documents = { ...newErrors.documents, registrationCertificate: 'Required' };
                if (!formData.documents.ntnNumber) newErrors.documents = { ...newErrors.documents, ntnNumber: 'Required' };
                if (!formData.documents.ntnCertificate) newErrors.documents = { ...newErrors.documents, ntnCertificate: 'Required' };
                if (!formData.documents.ownerId) newErrors.documents = { ...newErrors.documents, ownerId: 'Required' };
            }
        }

        if (Object.keys(newErrors).length > 0) {
            isValid = false;
            setErrors(newErrors);
        }
        return isValid;
    };

    const handleNext = async () => {
        if (validateStep(currentStep)) {
            if (currentStep === 7) {
                await handleSubmit();
            } else {
                setCurrentStep(prev => prev + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // Log payload structure just for simulation before context logic handles it
            const payload = {
                account: {
                    name: formData.fullName,
                    email: formData.email,
                    password: formData.password
                },
                operatorType: formData.operatorType,
                individualDetails: formData.individualDetails,
                agencyDetails: formData.agencyDetails,
                documents: formData.documents,
                services: formData.services,
                countriesServed: formData.countriesServed,
                additionalDetails: formData.additionalDetails
            };
            
            console.log("Submitting travel provider data", payload);

            // Send data to AuthContext
            const authPayload = {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                role: 'travel_tours',
                phoneNumber: formData.operatorType === 'individual' ? formData.individualDetails.phone : formData.agencyDetails.phone,
                city: formData.operatorType === 'individual' ? formData.individualDetails.city : formData.agencyDetails.city,
                // attaching full application data for any potential backend usage:
                applicationData: payload
            };

            const result = register(authPayload);

            if (result.success) {
                setCurrentStep(8);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                setErrors({ submit: result.message || 'Registration failed. Please try again.' });
            }
        } catch (error) {
            console.error("Submission failed", error);
            setErrors({ submit: "Failed to submit application. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <Step2OperatorType data={formData} errors={errors} onChange={handleChange} />;
            case 2: return <Step1AccountDetails data={formData} errors={errors} onChange={handleChange} />;
            case 3: return <Step3Details data={formData} errors={errors} onChange={handleChange} />;
            case 4: return <Step4Services data={formData} errors={errors} onChange={handleChange} />;
            case 5: return <Step5Countries data={formData} errors={errors} onChange={handleChange} />;
            case 6: return <Step6AdditionalDetails data={formData} errors={errors} onChange={handleChange} />;
            case 7: return <Step7Documents data={formData} errors={errors} onChange={handleChange} />;
            case 8: return <Step8VerificationPending />;
            default: return null;
        }
    };

    const currentStepData = STEPS.find(s => s.number === currentStep) || STEPS[0];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-200">
            {/* Top Bar Navigation */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 sm:h-20">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                                    <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
                                    <path fillRule="evenodd" d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.163 3.75A.75.75 0 0110 12h4a.75.75 0 010 1.5h-4a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-none tracking-[-0.02em]">Bookooda</h1>
                                <p className="text-[10px] sm:text-xs font-semibold text-blue-600 uppercase tracking-widest mt-0.5">Travel Partner</p>
                            </div>
                        </div>

                        {/* Center Step Title (Desktop Only) */}
                        {currentStep < 8 && (
                            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-slate-100/50 rounded-full border border-slate-200">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-blue-600 text-xs font-bold shadow-sm">
                                    {currentStep}
                                </span>
                                <span className="text-sm font-semibold text-slate-700 pr-2">
                                    {currentStepData.label}
                                </span>
                            </div>
                        )}

                        {/* Exit button */}
                        <div className="flex items-center">
                            <button
                                onClick={() => navigate('/auth')}
                                className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors px-3 sm:px-4 py-2 rounded-lg hover:bg-slate-100"
                            >
                                <span className="hidden sm:inline">Exit Setup</span>
                                <span className="sm:hidden">Exit</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main scrollable area */}
            <div className="flex-1 flex flex-col pb-32 pt-6">
                <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 flex-1 flex flex-col justify-start">
                    
                    {/* Progress Bar Header */}
                    {currentStep < 8 && (
                        <div className="mb-8">
                            {/* Progress bar line */}
                            <div className="relative h-2 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner mb-6">
                                <div
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
                                />
                            </div>

                            {/* Mobile Step Title */}
                            <div className="flex md:hidden items-center justify-between mb-2">
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Step {currentStep} of {STEPS.length - 1}</span>
                                <span className="text-sm font-semibold text-slate-800">{currentStepData.label}</span>
                            </div>

                            {/* Step Indicators (Desktop mainly) */}
                            <div className="hidden sm:flex justify-between relative px-2">
                                {STEPS.slice(0, -1).map((step, idx) => {
                                    const isComplete = step.number < currentStep;
                                    const isCurrent = step.number === currentStep;

                                    return (
                                        <div key={step.number} className="flex flex-col items-center relative z-10 w-12 sm:w-16">
                                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all duration-300 shadow-sm border-2
                                                ${isComplete ? 'bg-blue-600 text-white border-blue-600 shadow-blue-500/30' :
                                                    isCurrent ? 'bg-white text-blue-600 border-blue-500 shadow-xl scale-110' :
                                                        'bg-slate-50 text-slate-400 border-slate-200'}`}
                                            >
                                                {isComplete ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                                    </svg>
                                                ) : (
                                                    <span>{step.icon}</span>
                                                )}
                                            </div>
                                            <span className={`mt-3 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-center ${isCurrent ? 'text-blue-700' : isComplete ? 'text-slate-700' : 'text-slate-400'}`}>
                                                {step.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Step Content Container */}
                    <div className={`flex-1 w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 sm:p-10 mb-6 transition-all duration-500 ease-in-out ${currentStep === 8 ? 'scale-100 opacity-100 shadow-none border-0 bg-transparent' : ''}`}>
                        {errors.submit && (
                            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3 text-red-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm font-medium">{errors.submit}</span>
                            </div>
                        )}
                        {renderStep()}
                    </div>

                    {/* Navigation Buttons Card */}
                    {currentStep < 8 && (
                        <div className="mt-auto pt-2 pb-6">
                            <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100">
                                <div className="flex items-center justify-between">
                                    {/* Left side: Back button or Security badge */}
                                    <div className="flex items-center">
                                        {currentStep > 1 ? (
                                            <button
                                                type="button"
                                                onClick={handleBack}
                                                disabled={isSubmitting}
                                                className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-xl border-2 border-slate-200 text-slate-600 text-sm font-bold bg-white hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 transition-all focus:outline-none focus:ring-4 focus:ring-slate-100 disabled:opacity-50"
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
                                                <span className="font-medium">Secure</span>
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
                                                {currentStep === 7 ? (
                                                    <>
                                                        Submit Profile
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
                                                state: { role: 'travel_tours', mode: 'login' }
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

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default TravelOnboardingPage;
