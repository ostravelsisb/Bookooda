import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ROLE_LABELS } from '../../data/verificationConfig';
import { Users, Search, Filter, Shield, AlertTriangle, ChevronDown } from 'lucide-react';

const AdminUsers = () => {
    const { getAllUsers } = useAuth();
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const users = getAllUsers();

    const filtered = useMemo(() => {
        return users.filter(u => {
            if (roleFilter !== 'all' && u.role !== roleFilter) return false;
            if (statusFilter !== 'all' && u.verificationStatus !== statusFilter) return false;
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
            }
            return true;
        });
    }, [users, roleFilter, statusFilter, searchQuery]);

    const statusBadge = (status) => {
        const map = {
            approved: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500', label: 'Approved' },
            pending: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Pending' },
            under_review: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500', label: 'Under Review' },
            rejected: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500', label: 'Rejected' },
            unverified: { bg: 'bg-gray-50', text: 'text-gray-700', dot: 'bg-gray-400', label: 'Unverified' },
        };
        const s = map[status] || map.unverified;
        return (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}></span>
                {s.label}
            </span>
        );
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">All Users</h1>
                <p className="text-sm text-gray-500 mt-1">Manage registered users and their verification status</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                    <p className="text-xs text-gray-500">Total Users</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <p className="text-2xl font-bold text-green-600">{users.filter(u => u.verificationStatus === 'approved').length}</p>
                    <p className="text-xs text-gray-500">Verified</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <p className="text-2xl font-bold text-amber-600">{users.filter(u => u.verificationStatus === 'pending' || u.verificationStatus === 'under_review').length}</p>
                    <p className="text-xs text-gray-500">Pending</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <p className="text-2xl font-bold text-red-600">{users.filter(u => u.verificationStatus === 'rejected').length}</p>
                    <p className="text-xs text-gray-500">Rejected</p>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-500" />
                        Registered Users ({filtered.length})
                    </h2>
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none w-40"
                            />
                        </div>
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none"
                        >
                            <option value="all">All Roles</option>
                            {Object.entries(ROLE_LABELS).filter(([k]) => k !== 'admin').map(([key, label]) => (
                                <option key={key} value={key}>{label}</option>
                            ))}
                        </select>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none"
                        >
                            <option value="all">All Status</option>
                            <option value="approved">Approved</option>
                            <option value="pending">Pending</option>
                            <option value="under_review">Under Review</option>
                            <option value="rejected">Rejected</option>
                            <option value="unverified">Unverified</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">User</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Role</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Source</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center">
                                        <AlertTriangle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                        <p className="text-sm text-gray-500">No users found</p>
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((u, i) => (
                                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-gray-900">{u.name}</p>
                                            <p className="text-xs text-gray-500">{u.email}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-700">{ROLE_LABELS[u.role] || u.role}</span>
                                        </td>
                                        <td className="px-6 py-4">{statusBadge(u.verificationStatus)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-medium px-2 py-1 rounded ${u.source === 'static' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                                                {u.source === 'static' ? 'Demo' : 'Registered'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
