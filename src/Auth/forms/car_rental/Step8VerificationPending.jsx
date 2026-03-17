import React from 'react';
import { useNavigate } from 'react-router-dom';

const Step8VerificationPending = () => {
    const navigate = useNavigate();

    return (
        <div className="animate-fadeIn py-12 px-4 sm:px-8 text-center bg-white rounded-3xl shadow-[0_2px_40px_-12px_rgba(0,0,0,0.1)] border border-slate-100/60 max-w-2xl mx-auto my-12">
            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 border-[6px] border-emerald-100/50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-emerald-400/20 rounded-full animate-ping opacity-75"></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-emerald-500 relative z-10 animate-pulse">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                Verification Pending
            </h2>

            <div className="space-y-4 max-w-lg mx-auto">
                <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                    Your car rental profile and vehicle details have been submitted successfully.
                </p>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                    <p className="text-sm text-slate-500 leading-relaxed">
                        Our admin team will verify your driving license and vehicle documents before activating your listings. You will be notified via email once approved.
                    </p>
                </div>

                <div className="inline-flex items-center gap-2 mt-4 py-2 px-4 bg-emerald-50/50 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-emerald-500 shrink-0">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-semibold text-emerald-700">Estimated review time: 24–48 hours</span>
                </div>
            </div>

            <div className="mt-10 pt-10 border-t border-slate-100">
                <button
                    onClick={() => navigate('/dashboard/agent')}
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-lg shadow-slate-900/20 hover:shadow-slate-900/30 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-slate-900/10"
                >
                    Go to Dashboard
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Step8VerificationPending;
