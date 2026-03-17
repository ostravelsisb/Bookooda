import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLE_LABELS, VERIFICATION_CONFIGS } from '../../data/verificationConfig';
import {
    ArrowLeft, CheckCircle, XCircle, Clock, Eye, Shield, FileText,
    User, Mail, Phone, MapPin, Calendar, MessageSquare, AlertCircle
} from 'lucide-react';

const AdminVerificationReview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getVerificationRequests, updateVerificationStatus } = useAuth();
    const [request, setRequest] = useState(null);
    const [rejectionNotes, setRejectionNotes] = useState('');
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [actionLoading, setActionLoading] = useState('');

    useEffect(() => {
        const requests = getVerificationRequests();
        const found = requests.find(r => r.id === id);
        if (found) {
            setRequest(found);
            setRejectionNotes(found.adminNotes || '');
        }
    }, [id]);

    if (!request) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Verification request not found</p>
                    <button onClick={() => navigate('/dashboard/admin')} className="mt-3 text-blue-600 text-sm hover:underline">
                        Go back
                    </button>
                </div>
            </div>
        );
    }

    const config = VERIFICATION_CONFIGS[request.role];

    const handleApprove = () => {
        setActionLoading('approve');
        setTimeout(() => {
            updateVerificationStatus(request.id, 'approved', '');
            setRequest(prev => ({ ...prev, status: 'approved', adminNotes: '' }));
            setActionLoading('');
        }, 800);
    };

    const handleReject = () => {
        if (!rejectionNotes.trim()) return;
        setActionLoading('reject');
        setTimeout(() => {
            updateVerificationStatus(request.id, 'rejected', rejectionNotes);
            setRequest(prev => ({ ...prev, status: 'rejected', adminNotes: rejectionNotes }));
            setShowRejectModal(false);
            setActionLoading('');
        }, 800);
    };

    const handleMarkUnderReview = () => {
        setActionLoading('review');
        setTimeout(() => {
            updateVerificationStatus(request.id, 'under_review', '');
            setRequest(prev => ({ ...prev, status: 'under_review' }));
            setActionLoading('');
        }, 500);
    };

    const statusBadge = (status) => {
        const map = {
            pending: { bg: 'bg-amber-100', text: 'text-amber-800', label: '🟡 Pending Review' },
            under_review: { bg: 'bg-blue-100', text: 'text-blue-800', label: '🔵 Under Review' },
            approved: { bg: 'bg-green-100', text: 'text-green-800', label: '🟢 Approved' },
            rejected: { bg: 'bg-red-100', text: 'text-red-800', label: '🔴 Rejected' },
        };
        const s = map[status] || map.pending;
        return <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${s.bg} ${s.text}`}>{s.label}</span>;
    };

    return (
        <div className="space-y-6 max-w-4xl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/dashboard/admin')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-500" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Review Verification</h1>
                        <p className="text-sm text-gray-500">Request ID: {request.id}</p>
                    </div>
                </div>
                {statusBadge(request.status)}
            </div>

            {/* Applicant Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-500" />
                    Applicant Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <User className="w-5 h-5 text-gray-400 shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500">Name</p>
                            <p className="text-sm font-medium text-gray-900">{request.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Mail className="w-5 h-5 text-gray-400 shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500">Email</p>
                            <p className="text-sm font-medium text-gray-900 truncate">{request.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Phone className="w-5 h-5 text-gray-400 shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500">Phone</p>
                            <p className="text-sm font-medium text-gray-900">{request.phone || '—'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Shield className="w-5 h-5 text-gray-400 shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500">Role</p>
                            <p className="text-sm font-medium text-gray-900">{ROLE_LABELS[request.role]}</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500">City</p>
                            <p className="text-sm font-medium text-gray-900">{request.city || '—'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Calendar className="w-5 h-5 text-gray-400 shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500">Submitted</p>
                            <p className="text-sm font-medium text-gray-900">{request.submittedDate}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Business Details */}
            {request.verificationData && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-500" />
                        Business Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Object.entries(request.verificationData).map(([key, value]) => {
                            const fieldConfig = config?.fields?.find(f => f.name === key);
                            return (
                                <div key={key} className={`p-3 bg-gray-50 rounded-xl ${!fieldConfig ? '' : fieldConfig.type === 'textarea' ? 'sm:col-span-2' : ''}`}>
                                    <p className="text-xs text-gray-500 capitalize">{fieldConfig?.label || key.replace(/([A-Z])/g, ' $1')}</p>
                                    <p className="text-sm font-medium text-gray-900 mt-0.5">{value || '—'}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Uploaded Documents */}
            {request.documents?.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-500" />
                        Uploaded Documents
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {request.documents.map((doc, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{doc}</p>
                                    <p className="text-xs text-gray-500">Uploaded</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Admin Notes (if exists) */}
            {request.adminNotes && (
                <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
                    <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        Previous Admin Notes
                    </h3>
                    <p className="text-sm text-red-700">{request.adminNotes}</p>
                </div>
            )}

            {/* Action Buttons */}
            {request.status !== 'approved' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Take Action</h3>
                    <div className="flex flex-wrap gap-3">
                        {request.status === 'pending' && (
                            <button
                                onClick={handleMarkUnderReview}
                                disabled={!!actionLoading}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-blue-700 font-medium rounded-xl hover:bg-blue-100 transition-colors disabled:opacity-50"
                            >
                                {actionLoading === 'review' ? (
                                    <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                                Mark as Under Review
                            </button>
                        )}
                        <button
                            onClick={handleApprove}
                            disabled={!!actionLoading}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-xl shadow-lg shadow-green-500/25 hover:shadow-xl transition-all disabled:opacity-50"
                        >
                            {actionLoading === 'approve' ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <CheckCircle className="w-4 h-4" />
                            )}
                            Approve
                        </button>
                        <button
                            onClick={() => setShowRejectModal(true)}
                            disabled={!!actionLoading}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-700 font-medium rounded-xl hover:bg-red-100 transition-colors disabled:opacity-50"
                        >
                            <XCircle className="w-4 h-4" />
                            Reject
                        </button>
                    </div>
                </div>
            )}

            {/* Approved Success */}
            {request.status === 'approved' && (
                <div className="bg-green-50 rounded-2xl border border-green-200 p-6 text-center">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-green-800">This request has been approved</h3>
                    <p className="text-sm text-green-600 mt-1">The user can now access their full dashboard and add services.</p>
                </div>
            )}

            {/* Rejection Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fadeIn">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Reject Verification</h3>
                        <p className="text-sm text-gray-500 mb-4">Provide a reason for rejection. The user will see this and can resubmit.</p>
                        <textarea
                            value={rejectionNotes}
                            onChange={(e) => setRejectionNotes(e.target.value)}
                            placeholder="Enter rejection reason..."
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none resize-none"
                        />
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => setShowRejectModal(false)}
                                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReject}
                                disabled={!rejectionNotes.trim() || actionLoading === 'reject'}
                                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                                {actionLoading === 'reject' ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <XCircle className="w-4 h-4" />
                                )}
                                Confirm Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminVerificationReview;
