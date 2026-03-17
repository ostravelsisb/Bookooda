import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const Step6VerificationPending = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full animate-fadeIn flex flex-col items-center justify-center text-center py-6">
            {/* Success icon */}
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-emerald-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Property Verification Pending
            </h2>

            {/* Message */}
            <p className="text-sm text-gray-600 max-w-md leading-relaxed mb-2">
                Your property has been submitted successfully. Our admin team will review and verify your property before it goes live.
            </p>

            {/* Subtext */}
            <p className="text-xs text-gray-400 mb-8">
                This usually takes 24–48 hours.
            </p>

            {/* Info card */}
            <div className="w-full max-w-sm bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-8">
                <div className="flex items-start gap-3">
                    <div className="shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-medium text-blue-800">What happens next?</p>
                        <p className="text-xs text-blue-600 mt-1 leading-relaxed">
                            Our team will review your property details, images, and room information. You'll receive an email notification once verification is complete.
                        </p>
                    </div>
                </div>
            </div>

            {/* Go to Dashboard button */}
            <div className="w-full max-w-xs">
                <Button
                    type="button"
                    onClick={() => navigate('/dashboard/agent')}
                >
                    Go to Dashboard
                </Button>
            </div>
        </div>
    );
};

export default Step6VerificationPending;
