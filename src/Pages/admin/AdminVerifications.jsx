import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLE_LABELS } from '../../data/verificationConfig';
import { StatusBadge, AdminCard } from '../../Components/admin/AdminComponents';
import {
    Users, CheckCircle, XCircle, Clock, Eye, Shield, Search,
    ChevronRight, Hotel, Car, Map, Moon, Plane, UserCircle,
    Filter, CheckSquare, Square, AlertTriangle, Zap, ArrowRight,
    Package, BarChart3, ChevronDown, X, MessageSquare
} from 'lucide-react';

const CATEGORY_TABS = [
    { key: 'all', label: 'All Requests', icon: Package },
    { key: 'travel_agency', label: 'Travel Agencies', icon: Plane },
    { key: 'individual_agent', label: 'Individual Agents', icon: UserCircle },
    { key: 'hotel_provider', label: 'Hotels', icon: Hotel },
    { key: 'car_rental', label: 'Car Rentals', icon: Car },
    { key: 'trip_provider', label: 'Trip Providers', icon: Map },
    { key: 'umrah_provider', label: 'Umrah Providers', icon: Moon },
];

const STATUS_TABS = [
    { key: 'all', label: 'All', color: 'gray' },
    { key: 'pending', label: 'Pending', color: 'amber' },
    { key: 'under_review', label: 'Under Review', color: 'blue' },
    { key: 'approved', label: 'Approved', color: 'green' },
    { key: 'rejected', label: 'Rejected', color: 'red' },
];

const AdminVerifications = () => {
    const { getVerificationRequests, updateVerificationStatus } = useAuth();
    const navigate = useNavigate();

    const [categoryTab, setCategoryTab] = useState('all');
    const [statusTab, setStatusTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [rejectModal, setRejectModal] = useState(null);     // { id, name } or null
    const [rejectionNotes, setRejectionNotes] = useState('');
    const [actionLoading, setActionLoading] = useState('');    // 'approve-ID' | 'reject-ID' | 'bulk'
    const [toast, setToast] = useState(null);                  // { message, type }

    const requests = getVerificationRequests();

    // ── Stats by category ──
    const categoryStats = useMemo(() => {
        const stats = { all: { total: 0, pending: 0 } };
        CATEGORY_TABS.forEach(tab => {
            if (tab.key !== 'all') stats[tab.key] = { total: 0, pending: 0 };
        });
        requests.forEach(r => {
            stats.all.total++;
            if (r.status === 'pending' || r.status === 'under_review') stats.all.pending++;
            if (stats[r.role]) {
                stats[r.role].total++;
                if (r.status === 'pending' || r.status === 'under_review') stats[r.role].pending++;
            }
        });
        return stats;
    }, [requests]);

    // ── Status counts ──
    const statusCounts = useMemo(() => {
        const base = categoryTab === 'all' ? requests : requests.filter(r => r.role === categoryTab);
        return {
            all: base.length,
            pending: base.filter(r => r.status === 'pending').length,
            under_review: base.filter(r => r.status === 'under_review').length,
            approved: base.filter(r => r.status === 'approved').length,
            rejected: base.filter(r => r.status === 'rejected').length,
        };
    }, [requests, categoryTab]);

    // ── Filtered requests ──
    const filtered = useMemo(() => {
        return requests.filter(r => {
            if (categoryTab !== 'all' && r.role !== categoryTab) return false;
            if (statusTab !== 'all' && r.status !== statusTab) return false;
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                return (
                    r.name.toLowerCase().includes(q) ||
                    r.email.toLowerCase().includes(q) ||
                    r.id.toLowerCase().includes(q)
                );
            }
            return true;
        });
    }, [requests, categoryTab, statusTab, searchQuery]);

    // ── Selection ──
    const toggleSelect = (id) => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const selectAll = () => {
        if (selectedIds.size === filtered.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filtered.map(r => r.id)));
        }
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // ── Quick Actions ──
    const quickApprove = useCallback((id) => {
        setActionLoading(`approve-${id}`);
        setTimeout(() => {
            updateVerificationStatus(id, 'approved', '');
            setActionLoading('');
            setSelectedIds(prev => { const n = new Set(prev); n.delete(id); return n; });
            showToast('Request approved successfully');
        }, 400);
    }, [updateVerificationStatus]);

    const quickMarkReview = useCallback((id) => {
        setActionLoading(`review-${id}`);
        setTimeout(() => {
            updateVerificationStatus(id, 'under_review', '');
            setActionLoading('');
            showToast('Marked as under review');
        }, 300);
    }, [updateVerificationStatus]);

    const handleReject = () => {
        if (!rejectModal || !rejectionNotes.trim()) return;
        setActionLoading(`reject-${rejectModal.id}`);
        setTimeout(() => {
            updateVerificationStatus(rejectModal.id, 'rejected', rejectionNotes);
            setActionLoading('');
            setRejectModal(null);
            setRejectionNotes('');
            setSelectedIds(prev => { const n = new Set(prev); n.delete(rejectModal.id); return n; });
            showToast('Request rejected');
        }, 400);
    };

    // ── Bulk Actions ──
    const bulkApprove = () => {
        if (selectedIds.size === 0) return;
        setActionLoading('bulk');
        const ids = [...selectedIds];
        let i = 0;
        const interval = setInterval(() => {
            if (i >= ids.length) {
                clearInterval(interval);
                setActionLoading('');
                setSelectedIds(new Set());
                showToast(`${ids.length} request(s) approved`);
                return;
            }
            updateVerificationStatus(ids[i], 'approved', '');
            i++;
        }, 100);
    };

    const bulkMarkReview = () => {
        if (selectedIds.size === 0) return;
        setActionLoading('bulk');
        const ids = [...selectedIds];
        let i = 0;
        const interval = setInterval(() => {
            if (i >= ids.length) {
                clearInterval(interval);
                setActionLoading('');
                setSelectedIds(new Set());
                showToast(`${ids.length} request(s) marked as under review`);
                return;
            }
            updateVerificationStatus(ids[i], 'under_review', '');
            i++;
        }, 100);
    };

    const isAllSelected = filtered.length > 0 && selectedIds.size === filtered.length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-blue-600 font-medium mb-1">
                        <Shield className="w-4 h-4" />
                        Verification Center
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Verification Requests</h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        {statusCounts.pending + statusCounts.under_review} request(s) need attention
                    </p>
                </div>

                {/* Bulk Actions Bar */}
                {selectedIds.size > 0 && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl animate-fadeIn">
                        <span className="text-sm font-medium text-blue-700">{selectedIds.size} selected</span>
                        <div className="w-px h-5 bg-blue-200"></div>
                        <button
                            onClick={bulkApprove}
                            disabled={actionLoading === 'bulk'}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white text-xs font-semibold rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                        >
                            <CheckCircle className="w-3.5 h-3.5" />
                            Approve All
                        </button>
                        <button
                            onClick={bulkMarkReview}
                            disabled={actionLoading === 'bulk'}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 text-white text-xs font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                        >
                            <Eye className="w-3.5 h-3.5" />
                            Mark Review
                        </button>
                        <button
                            onClick={() => setSelectedIds(new Set())}
                            className="p-1.5 text-blue-400 hover:text-blue-600 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            {/* ── Category Tabs ── */}
            <div className="bg-white rounded-2xl border border-gray-200 p-1.5 overflow-x-auto scrollbar-hide">
                <div className="flex gap-1 min-w-max">
                    {CATEGORY_TABS.map(tab => {
                        const TabIcon = tab.icon;
                        const stat = categoryStats[tab.key] || { total: 0, pending: 0 };
                        const isActive = categoryTab === tab.key;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => { setCategoryTab(tab.key); setStatusTab('all'); setSelectedIds(new Set()); }}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap
                                    ${isActive
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <TabIcon className="w-4 h-4" />
                                {tab.label}
                                {stat.pending > 0 && (
                                    <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-700'}`}>
                                        {stat.pending}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ── Status Filter + Search ── */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                {/* Status Pills */}
                <div className="flex items-center gap-1.5 flex-wrap">
                    {STATUS_TABS.map(tab => {
                        const count = statusCounts[tab.key];
                        const isActive = statusTab === tab.key;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => { setStatusTab(tab.key); setSelectedIds(new Set()); }}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                                    ${isActive
                                        ? `bg-${tab.color}-100 text-${tab.color}-700 ring-1 ring-${tab.color}-200`
                                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                    }`}
                            >
                                {tab.label}
                                <span className={`px-1 py-0.5 rounded text-[10px] ${isActive ? `bg-${tab.color}-200/60` : 'bg-gray-200/60'}`}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search name, email, ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white"
                    />
                </div>
            </div>

            {/* ── Request List ── */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                {/* Table Header */}
                <div className="grid grid-cols-[40px_1fr_140px_100px_100px_140px] items-center px-4 py-3 bg-gray-50/80 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center justify-center">
                        <button onClick={selectAll} className="text-gray-400 hover:text-blue-600 transition-colors">
                            {isAllSelected ? <CheckSquare className="w-4 h-4 text-blue-600" /> : <Square className="w-4 h-4" />}
                        </button>
                    </div>
                    <div className="pl-2">Applicant</div>
                    <div>Category</div>
                    <div>Date</div>
                    <div>Status</div>
                    <div className="text-right pr-2">Quick Actions</div>
                </div>

                {/* Request Rows */}
                <div className="divide-y divide-gray-50">
                    {filtered.length === 0 ? (
                        <div className="py-16 text-center">
                            <AlertTriangle className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                            <p className="text-sm text-gray-500">No verification requests found</p>
                            <p className="text-xs text-gray-400 mt-1">Adjust your filters or search query</p>
                        </div>
                    ) : (
                        filtered.map((req) => {
                            const isSelected = selectedIds.has(req.id);
                            const isProcessing = actionLoading === `approve-${req.id}` || actionLoading === `reject-${req.id}` || actionLoading === `review-${req.id}`;
                            const isPendingOrReview = req.status === 'pending' || req.status === 'under_review';

                            return (
                                <div
                                    key={req.id}
                                    className={`grid grid-cols-[40px_1fr_140px_100px_100px_140px] items-center px-4 py-3.5 transition-all duration-200 group
                                        ${isSelected ? 'bg-blue-50/50' : 'hover:bg-gray-50/50'}
                                        ${isProcessing ? 'opacity-60' : ''}`}
                                >
                                    {/* Checkbox */}
                                    <div className="flex items-center justify-center">
                                        <button onClick={() => toggleSelect(req.id)} className="text-gray-400 hover:text-blue-600 transition-colors">
                                            {isSelected ? <CheckSquare className="w-4 h-4 text-blue-600" /> : <Square className="w-4 h-4" />}
                                        </button>
                                    </div>

                                    {/* Applicant */}
                                    <div className="flex items-center gap-3 pl-2 min-w-0">
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm shrink-0">
                                            {req.name.charAt(0)}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{req.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{req.email}</p>
                                        </div>
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <span className="text-xs font-medium text-gray-700">{ROLE_LABELS[req.role] || req.role}</span>
                                    </div>

                                    {/* Date */}
                                    <div>
                                        <span className="text-xs text-gray-500">{req.submittedDate}</span>
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <StatusBadge status={req.status} />
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="flex items-center gap-1 justify-end pr-2">
                                        {isPendingOrReview && (
                                            <>
                                                {/* Quick Approve */}
                                                <button
                                                    onClick={() => quickApprove(req.id)}
                                                    disabled={!!actionLoading}
                                                    title="Quick Approve"
                                                    className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-all disabled:opacity-30"
                                                >
                                                    {actionLoading === `approve-${req.id}`
                                                        ? <div className="w-4 h-4 border-2 border-green-200 border-t-green-600 rounded-full animate-spin" />
                                                        : <CheckCircle className="w-4 h-4" />}
                                                </button>

                                                {/* Quick Reject */}
                                                <button
                                                    onClick={() => { setRejectModal({ id: req.id, name: req.name }); setRejectionNotes(''); }}
                                                    disabled={!!actionLoading}
                                                    title="Quick Reject"
                                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-30"
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                </button>

                                                {/* Mark Under Review (only for pending) */}
                                                {req.status === 'pending' && (
                                                    <button
                                                        onClick={() => quickMarkReview(req.id)}
                                                        disabled={!!actionLoading}
                                                        title="Mark Under Review"
                                                        className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-all disabled:opacity-30"
                                                    >
                                                        {actionLoading === `review-${req.id}`
                                                            ? <div className="w-4 h-4 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                                                            : <Eye className="w-4 h-4" />}
                                                    </button>
                                                )}
                                            </>
                                        )}

                                        {/* View Details — always available */}
                                        <button
                                            onClick={() => navigate(`/dashboard/admin/review/${req.id}`)}
                                            title="View Full Details"
                                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer */}
                {filtered.length > 0 && (
                    <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-xs text-gray-500">
                            Showing {filtered.length} of {requests.length} request(s)
                        </p>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Zap className="w-3 h-3" />
                            Quick actions enabled for pending & under review
                        </div>
                    </div>
                )}
            </div>

            {/* ── Rejection Modal ── */}
            {rejectModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setRejectModal(null)}>
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Reject Verification</h3>
                                <p className="text-sm text-gray-500">{rejectModal.name}</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">Provide a reason. The user will see this and can resubmit.</p>
                        <textarea
                            value={rejectionNotes}
                            onChange={(e) => setRejectionNotes(e.target.value)}
                            placeholder="e.g. Missing CNIC copy, incomplete business address..."
                            rows={3}
                            autoFocus
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none resize-none"
                        />
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => setRejectModal(null)}
                                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReject}
                                disabled={!rejectionNotes.trim() || actionLoading === `reject-${rejectModal.id}`}
                                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                                {actionLoading === `reject-${rejectModal.id}` ? (
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

            {/* ── Toast Notification ── */}
            {toast && (
                <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl text-sm font-medium animate-slideIn
                    ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                    {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    {toast.message}
                </div>
            )}
        </div>
    );
};

export default AdminVerifications;
