import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLE_LABELS } from '../../data/verificationConfig';
import { Clock, CheckCircle, XCircle, Eye, RefreshCw, Shield, Calendar, MessageSquare, ArrowRight, FileText, Upload, Loader2, AlertCircle } from 'lucide-react';

const STATUS_CONFIG = {
    pending: {
        icon: Clock,
        label: 'Documents Received',
        description: 'Your documents have been received and are in queue for review.',
        bgGradient: 'from-amber-500 to-orange-500',
        lightBg: 'bg-amber-50',
        textColor: 'text-amber-700',
        borderColor: 'border-amber-200',
    },
    under_review: {
        icon: Eye,
        label: 'Under Review',
        description: 'An admin is currently reviewing your verification documents. You will be notified once a decision is made.',
        bgGradient: 'from-blue-500 to-indigo-500',
        lightBg: 'bg-blue-50',
        textColor: 'text-blue-700',
        borderColor: 'border-blue-200',
    },
    approved: {
        icon: CheckCircle,
        label: 'Verified ✓',
        description: 'Congratulations! Your account has been verified. You now have full access to your dashboard.',
        bgGradient: 'from-green-500 to-emerald-500',
        lightBg: 'bg-green-50',
        textColor: 'text-green-700',
        borderColor: 'border-green-200',
    },
    rejected: {
        icon: XCircle,
        label: 'Rejected',
        description: 'Some of your documents didn\'t meet our requirements. Please review the admin notes below and re-upload the specific documents that need correction.',
        bgGradient: 'from-red-500 to-rose-500',
        lightBg: 'bg-red-50',
        textColor: 'text-red-700',
        borderColor: 'border-red-200',
    },
};

const VerificationStatus = ({ verification, onResubmit }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState('');

    const status = verification?.status || user?.verificationStatus || 'pending';
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
    const StatusIcon = config.icon;

    // Countdown timer for pending/under_review
    useEffect(() => {
        if (status !== 'pending' && status !== 'under_review') return;
        const update = () => {
            const submitted = verification?.submittedDate ? new Date(verification.submittedDate) : new Date();
            const target = new Date(submitted.getTime() + 6 * 60 * 60 * 1000); // 6 hours
            const now = new Date();
            const diff = target - now;
            if (diff <= 0) {
                setCountdown('Review expected any moment now...');
            } else {
                const h = Math.floor(diff / 3600000);
                const m = Math.floor((diff % 3600000) / 60000);
                setCountdown(`Estimated review in ~${h}h ${m}m`);
            }
        };
        update();
        const interval = setInterval(update, 60000);
        return () => clearInterval(interval);
    }, [status, verification]);

    const handleLogout = () => { logout(); navigate('/auth'); };

    const handleGoToDashboard = () => {
        if (status === 'approved') {
            const dashMap = { user: '/dashboard/user', customer: '/dashboard/user', admin: '/dashboard/admin' };
            navigate(dashMap[user?.role] || '/dashboard/agent');
        }
    };

    const timelineSteps = [
        {
            label: 'Account Created',
            description: user?.email || 'Email registered',
            completed: true,
            icon: CheckCircle,
        },
        {
            label: 'Documents Submitted',
            description: verification?.submittedDate ? `Submitted on ${verification.submittedDate}` : 'Awaiting submission',
            completed: !!verification,
            icon: Upload,
        },
        {
            label: 'Documents Received',
            description: verification ? 'Your documents are in our system' : 'Waiting for submission',
            completed: !!verification,
            icon: FileText,
        },
        {
            label: 'Under Admin Review',
            description: status === 'under_review' ? 'An admin is reviewing now' : status === 'approved' || status === 'rejected' ? 'Review completed' : 'Waiting for admin',
            completed: status === 'under_review' || status === 'approved' || status === 'rejected',
            active: status === 'under_review',
            icon: Eye,
        },
        {
            label: status === 'rejected' ? 'Rejected — Action Required' : 'Verified',
            description: status === 'approved' ? 'Your account is now fully verified!' : status === 'rejected' ? 'Please re-upload required documents' : 'Final step',
            completed: status === 'approved',
            failed: status === 'rejected',
            icon: status === 'rejected' ? XCircle : status === 'approved' ? CheckCircle : Shield,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/mainlogo.png" alt="Bookooda" className="h-8 w-8" />
                        <span className="text-lg font-bold text-blue-600">Bookooda</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500 hidden sm:block">{user?.email}</span>
                        <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-600 font-medium hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                {/* Status Hero Card */}
                <div className={`bg-gradient-to-r ${config.bgGradient} rounded-2xl p-8 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                <StatusIcon className="w-7 h-7" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2.5 h-2.5 rounded-full ${status === 'pending' || status === 'under_review' ? 'bg-white/80 animate-pulse' : status === 'approved' ? 'bg-green-300' : 'bg-red-300'}`}></div>
                                    <span className="text-sm font-medium text-white/80">Verification Status</span>
                                </div>
                                <h2 className="text-2xl font-bold">{config.label}</h2>
                            </div>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed max-w-lg">{config.description}</p>
                    </div>
                </div>

                {/* ── Wait Time Notice (pending / under_review) ── */}
                {(status === 'pending' || status === 'under_review') && (
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                                <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-blue-900 mb-1">Please wait 2-6 hours</h3>
                                <p className="text-sm text-blue-700 leading-relaxed">
                                    Our admin team reviews all verification requests within <strong>2-6 hours</strong> during business hours.
                                    You will receive a notification once your documents are reviewed.
                                </p>
                                {countdown && (
                                    <p className="text-xs text-blue-600 mt-2 font-medium flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5" />
                                        {countdown}
                                    </p>
                                )}
                                <div className="flex items-center gap-4 mt-3 text-xs text-blue-600">
                                    <span className="flex items-center gap-1">✓ Documents received</span>
                                    <span className="flex items-center gap-1">
                                        {status === 'under_review' ? '✓ Under review' : '⏳ Waiting for review'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* User Info Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-500" />
                        Account Information
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Name</p>
                            <p className="text-sm font-medium text-gray-900 mt-0.5">{user?.name || '—'}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Role</p>
                            <p className="text-sm font-medium text-gray-900 mt-0.5">{ROLE_LABELS[user?.role] || user?.role}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                            <p className="text-sm font-medium text-gray-900 mt-0.5 truncate">{user?.email || '—'}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Submitted</p>
                            <p className="text-sm font-medium text-gray-900 mt-0.5">{verification?.submittedDate || '—'}</p>
                        </div>
                    </div>
                </div>

                {/* Submitted Documents List */}
                {verification?.documents && verification.documents.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-blue-500" />
                            Submitted Documents
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {verification.documents.map((doc, i) => (
                                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${status === 'approved' ? 'border-green-200 bg-green-50/50' :
                                        status === 'rejected' ? 'border-red-200 bg-red-50/50' :
                                            'border-gray-200 bg-gray-50/50'
                                    }`}>
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${status === 'approved' ? 'bg-green-100' :
                                            status === 'rejected' ? 'bg-red-100' : 'bg-blue-100'
                                        }`}>
                                        {status === 'approved' ? <CheckCircle className="w-4 h-4 text-green-600" /> :
                                            status === 'rejected' ? <AlertCircle className="w-4 h-4 text-red-600" /> :
                                                <FileText className="w-4 h-4 text-blue-600" />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-800">{doc}</p>
                                        <p className="text-xs text-gray-500">
                                            {status === 'approved' ? 'Verified' :
                                                status === 'rejected' ? 'Needs re-upload' :
                                                    'Under review'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Timeline */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-blue-500" />
                        Verification Timeline
                    </h3>
                    <div className="space-y-0">
                        {timelineSteps.map((step, i) => {
                            const StepIcon = step.icon;
                            const isLast = i === timelineSteps.length - 1;

                            return (
                                <div key={i} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${step.completed ? 'bg-green-100 text-green-600' : step.failed ? 'bg-red-100 text-red-600' : step.active ? 'bg-blue-100 text-blue-600 animate-pulse' : 'bg-gray-100 text-gray-400'}`}>
                                            <StepIcon className="w-5 h-5" />
                                        </div>
                                        {!isLast && (
                                            <div className={`w-0.5 h-8 ${step.completed ? 'bg-green-200' : step.failed ? 'bg-red-200' : 'bg-gray-200'}`}></div>
                                        )}
                                    </div>
                                    <div className="pb-8">
                                        <p className={`text-sm font-semibold ${step.completed ? 'text-green-700' : step.failed ? 'text-red-700' : step.active ? 'text-blue-700' : 'text-gray-500'}`}>
                                            {step.label}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-0.5">{step.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Admin Notes (if rejected) */}
                {status === 'rejected' && verification?.adminNotes && (
                    <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
                        <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5" />
                            Admin Notes — What Needs Correction
                        </h3>
                        <p className="text-sm text-red-700 leading-relaxed">{verification.adminNotes}</p>
                        <div className="mt-3 p-3 bg-red-100/50 rounded-xl">
                            <p className="text-xs text-red-600 font-medium">
                                💡 You only need to re-upload the documents mentioned above. All other documents are already saved.
                            </p>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                    {status === 'approved' && (
                        <button
                            onClick={handleGoToDashboard}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-green-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                        >
                            Go to Dashboard
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    )}
                    {status === 'rejected' && onResubmit && (
                        <button
                            onClick={onResubmit}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                        >
                            <Upload className="w-5 h-5" />
                            Re-upload Required Documents
                        </button>
                    )}
                    <button
                        onClick={handleLogout}
                        className="sm:w-auto px-6 py-3.5 border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors text-center"
                    >
                        Logout
                    </button>
                </div>

                {/* Help section */}
                {(status === 'pending' || status === 'under_review') && (
                    <div className="text-center py-4">
                        <p className="text-xs text-gray-400">
                            Need help? Contact us at <a href="mailto:support@bookooda.com" className="text-blue-500 hover:underline">support@bookooda.com</a> or call +92 42 35678901
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerificationStatus;
