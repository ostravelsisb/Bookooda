import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLE_LABELS } from '../../data/verificationConfig';
import { adminServiceListings, ADMIN_CATEGORY_CONFIG, platformStats } from '../../data/adminData';
import { StatCard, StatusBadge, AdminCard } from '../../Components/admin/AdminComponents';
import {
    Users, CheckCircle, XCircle, Clock, Eye, Shield,
    TrendingUp, AlertTriangle, Search, ChevronRight, BarChart3,
    Hotel, Car, Map, Moon, Plane, UserCircle, Package,
    DollarSign, Star, Activity, ArrowUpRight, Zap, Globe
} from 'lucide-react';

const ICON_MAP = {
    customer: Users,
    travel_agency: Plane,
    individual_agent: UserCircle,
    hotel_provider: Hotel,
    car_rental: Car,
    trip_provider: Map,
    umrah_provider: Moon,
};

const AdminDashboard = () => {
    const { getVerificationRequests, getAllUsers } = useAuth();
    const navigate = useNavigate();

    const requests = getVerificationRequests();
    const allUsers = getAllUsers();

    const verificationStats = useMemo(() => ({
        total: requests.length,
        pending: requests.filter(r => r.status === 'pending').length,
        underReview: requests.filter(r => r.status === 'under_review').length,
        approved: requests.filter(r => r.status === 'approved').length,
        rejected: requests.filter(r => r.status === 'rejected').length,
    }), [requests]);

    // Category overview cards
    const categoryOverview = useMemo(() => {
        return Object.entries(ADMIN_CATEGORY_CONFIG).map(([key, cfg]) => {
            const listings = adminServiceListings[key] || [];
            const isCustomer = key === 'customer';
            return {
                key,
                label: cfg.label,
                gradient: cfg.gradient,
                lightBg: cfg.lightBg,
                textColor: cfg.textColor,
                description: cfg.description,
                icon: ICON_MAP[key] || Package,
                total: listings.length,
                active: listings.filter(l => l.status === 'active').length,
                revenue: isCustomer
                    ? listings.reduce((a, l) => a + (l.spent || 0), 0)
                    : listings.reduce((a, l) => a + (l.revenue || 0), 0),
                bookings: listings.reduce((a, l) => a + (l.bookings || 0), 0),
            };
        });
    }, []);

    const formatRevenue = (n) => n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : `${(n / 1000).toFixed(0)}K`;

    // Recent pending verifications
    const recentPending = requests
        .filter(r => r.status === 'pending' || r.status === 'under_review')
        .slice(0, 5);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-blue-600 font-medium mb-1">
                        <Zap className="w-4 h-4" />
                        Super Admin Panel
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-sm text-gray-500 mt-1">Complete overview of Bookooda platform</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Last updated: Just now</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
            </div>

            {/* ── Platform Stats ── */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <StatCard label="Total Revenue" value={`PKR ${formatRevenue(platformStats.totalRevenue)}`} icon={DollarSign} gradient="from-emerald-500 to-emerald-600" subtitle="+12% this month" />
                <StatCard label="Monthly Revenue" value={`PKR ${formatRevenue(platformStats.monthlyRevenue)}`} icon={TrendingUp} gradient="from-blue-500 to-indigo-500" subtitle="March 2026" />
                <StatCard label="Total Listings" value={platformStats.totalListings} icon={Package} gradient="from-violet-500 to-purple-600" subtitle="Across all categories" />
                <StatCard label="Total Bookings" value={platformStats.totalBookings.toLocaleString()} icon={BarChart3} gradient="from-cyan-500 to-blue-500" subtitle="All time" />
                <StatCard label="Avg Rating" value={platformStats.avgRating} icon={Star} gradient="from-amber-500 to-orange-500" subtitle="Platform average" />
                <StatCard label="Growth Rate" value={`${platformStats.growthRate}%`} icon={Activity} gradient="from-rose-500 to-pink-600" subtitle="Month over month" />
            </div>

            {/* ── Category Management Cards ── */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Category Management</h2>
                        <p className="text-xs text-gray-500">Manage all service categories from one place</p>
                    </div>
                    <span className="text-xs text-gray-400">{categoryOverview.length} categories</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {categoryOverview.map((cat) => {
                        const CatIcon = cat.icon;
                        return (
                            <button
                                key={cat.key}
                                onClick={() => navigate(`/dashboard/admin/category/${cat.key}`)}
                                className="bg-white rounded-2xl border border-gray-200 p-5 text-left hover:shadow-lg hover:border-blue-200 transition-all duration-300 group relative overflow-hidden"
                            >
                                {/* Subtle gradient accent */}
                                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${cat.gradient} opacity-5 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500`}></div>

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-r ${cat.gradient} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                                            <CatIcon className="w-5 h-5 text-white" />
                                        </div>
                                        <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                                    </div>

                                    <h3 className="font-bold text-gray-900 text-sm group-hover:text-blue-700 transition-colors">{cat.label}</h3>
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{cat.description}</p>

                                    {/* Mini Stats */}
                                    <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100">
                                        <div>
                                            <p className="text-lg font-bold text-gray-900">{cat.total}</p>
                                            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Total</p>
                                        </div>
                                        <div>
                                            <p className="text-lg font-bold text-emerald-600">{cat.active}</p>
                                            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Active</p>
                                        </div>
                                        <div>
                                            <p className="text-lg font-bold text-blue-600">{cat.bookings}</p>
                                            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Bookings</p>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ── Verification Requests Section ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Verification Stats */}
                <div className="lg:col-span-1 space-y-4">
                    <AdminCard title="Verification Overview" icon={Shield}>
                        <div className="p-4 space-y-3">
                            {[
                                { label: 'Pending Review', count: verificationStats.pending, color: 'amber', icon: Clock },
                                { label: 'Under Review', count: verificationStats.underReview, color: 'blue', icon: Eye },
                                { label: 'Approved', count: verificationStats.approved, color: 'green', icon: CheckCircle },
                                { label: 'Rejected', count: verificationStats.rejected, color: 'red', icon: XCircle },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-lg bg-${item.color}-100 flex items-center justify-center`}>
                                            <item.icon className={`w-4 h-4 text-${item.color}-600`} />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">{item.label}</span>
                                    </div>
                                    <span className="text-lg font-bold text-gray-900">{item.count}</span>
                                </div>
                            ))}
                            <button
                                onClick={() => navigate('/dashboard/admin/verifications')}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-700 font-medium rounded-xl hover:bg-blue-100 transition-colors text-sm mt-2"
                            >
                                View All Verifications
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </AdminCard>

                    {/* Quick Stats */}
                    <AdminCard title="Platform Health" icon={Activity}>
                        <div className="p-4 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Total Users</span>
                                <span className="text-sm font-bold text-gray-900">{allUsers.length}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Verified Providers</span>
                                <span className="text-sm font-bold text-green-600">{allUsers.filter(u => u.verificationStatus === 'approved').length}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Unverified</span>
                                <span className="text-sm font-bold text-amber-600">{allUsers.filter(u => u.verificationStatus !== 'approved').length}</span>
                            </div>
                        </div>
                    </AdminCard>
                </div>

                {/* Recent Pending Verifications */}
                <div className="lg:col-span-2">
                    <AdminCard title="Recent Pending Verifications" subtitle={`${recentPending.length} requiring attention`} icon={AlertTriangle}>
                        <div className="divide-y divide-gray-100">
                            {recentPending.length === 0 ? (
                                <div className="p-8 text-center">
                                    <CheckCircle className="w-10 h-10 text-green-300 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500">All verifications are up to date!</p>
                                </div>
                            ) : (
                                recentPending.map((req) => (
                                    <div key={req.id} className="flex items-center justify-between px-6 py-4 hover:bg-blue-50/30 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-semibold text-sm">
                                                {req.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{req.name}</p>
                                                <p className="text-xs text-gray-500">{ROLE_LABELS[req.role]} · {req.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <StatusBadge status={req.status} />
                                            <button
                                                onClick={() => navigate(`/dashboard/admin/review/${req.id}`)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </AdminCard>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
