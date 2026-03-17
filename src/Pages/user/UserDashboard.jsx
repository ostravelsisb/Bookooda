import { useAuth } from '../../context/AuthContext';
import Card from '../../Components/dashboard/Card';
import StatusBadge from '../../Components/dashboard/StatusBadge';
import { CalendarCheck, FileText, Heart, CreditCard, FileIcon, CheckCircle, XCircle, Star, Clock } from 'lucide-react';
import { userBookings, activityTimeline } from '../../data/mockData';

const iconMap = {
    file: FileIcon,
    'credit-card': CreditCard,
    'check-circle': CheckCircle,
    heart: Heart,
    'x-circle': XCircle,
    star: Star,
};

const UserDashboard = () => {
    const { user } = useAuth();

    const stats = [
        { title: 'Active Bookings', value: userBookings.filter((b) => b.status === 'In Progress' || b.status === 'Pending').length, icon: CalendarCheck, trend: 'up', trendValue: '+2 this week' },
        { title: 'Pending Applications', value: 3, icon: FileText, trend: 'up', trendValue: '+1 today' },
        { title: 'Saved Agents', value: 4, icon: Heart, trend: 'up', trendValue: '+1 this month' },
        { title: 'Total Payments', value: `PKR ${(390500).toLocaleString()}`, icon: CreditCard, trend: 'up', trendValue: '+12% vs last month' },
    ];

    return (
        <div className="space-y-6 max-w-7xl">
            {/* Welcome */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
                <div className="absolute right-20 bottom-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2" />
                <div className="relative z-10">
                    <h1 className="text-xl lg:text-2xl font-bold">Welcome back, {user?.name || 'User'} 👋</h1>
                    <p className="text-blue-100 text-sm mt-1">Here's what's happening with your travel plans today.</p>
                </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {stats.map((s, i) => (
                    <Card key={i} {...s} />
                ))}
            </div>

            {/* Recent bookings + Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent bookings */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="text-base font-semibold text-gray-900">Recent Bookings</h2>
                        <a href="/dashboard/user/bookings" className="text-xs font-semibold text-blue-600 hover:text-blue-700">View all</a>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {userBookings.slice(0, 5).map((b) => (
                            <div key={b.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                        <CalendarCheck size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">{b.type} — {b.destination}</p>
                                        <p className="text-xs text-gray-500">{b.id} · {b.agent}</p>
                                    </div>
                                </div>
                                <StatusBadge status={b.status} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Activity timeline */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h2 className="text-base font-semibold text-gray-900">Activity</h2>
                    </div>
                    <div className="px-6 py-4 space-y-5">
                        {activityTimeline.map((a) => {
                            const IconComp = iconMap[a.icon] || Clock;
                            return (
                                <div key={a.id} className="flex gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shrink-0 mt-0.5">
                                        <IconComp size={14} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">{a.action}</p>
                                        <p className="text-xs text-gray-500">{a.detail}</p>
                                        <p className="text-xs text-gray-400 mt-1">{a.time}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
