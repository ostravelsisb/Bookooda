import { useAuth } from '../../context/AuthContext';
import Card from '../../Components/dashboard/Card';
import ChartWrapper from '../../Components/dashboard/ChartWrapper';
import {
    Inbox, Users, CheckCircle, DollarSign, Hotel, Car, Map, Moon,
    Plane, UserCircle, Package, Star, TrendingUp, Eye, CalendarCheck,
    Clock, FileText, Compass, Building, Wallet, BarChart3, Activity
} from 'lucide-react';
import {
    incomingRequests, activeClients, completedCases, agentEarnings,
} from '../../data/mockData';
import { adminServiceListings } from '../../data/adminData';
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

// ── Role-Specific Dashboard Configurations ──
const DASHBOARD_CONFIG = {
    travel_agency: {
        label: 'Travel Agency',
        emoji: '✈️',
        gradient: 'from-blue-600 to-indigo-600',
        subtitle: 'Manage your visas, flights, and tour services',
        statsPrefix: [
            { title: 'Active Listings', key: 'active', icon: Package },
            { title: 'Total Bookings', key: 'bookings', icon: CalendarCheck },
            { title: 'Total Revenue', key: 'revenue', icon: DollarSign, format: 'currency' },
            { title: 'Avg Rating', key: 'avgRating', icon: Star },
        ],
        chartTitle: 'Revenue by Service Type',
        pieColors: ['#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'],
        recentLabel: 'Recent Listings',
    },
    individual_agent: {
        label: 'Individual Agent',
        emoji: '👤',
        gradient: 'from-indigo-600 to-indigo-700',
        subtitle: 'Your personal travel consultancy at a glance',
        statsPrefix: [
            { title: 'Active Services', key: 'active', icon: Package },
            { title: 'Total Clients', key: 'bookings', icon: Users },
            { title: 'Total Earnings', key: 'revenue', icon: DollarSign, format: 'currency' },
            { title: 'Avg Rating', key: 'avgRating', icon: Star },
        ],
        chartTitle: 'Earnings by Service',
        pieColors: ['#6366F1', '#8B5CF6', '#3B82F6', '#10B981'],
        recentLabel: 'Your Services',
    },
    hotel_provider: {
        label: 'Hotel Provider',
        emoji: '🏨',
        gradient: 'from-rose-600 to-pink-600',
        subtitle: 'Manage your rooms, reservations, and guests',
        statsPrefix: [
            { title: 'Active Rooms', key: 'active', icon: Hotel },
            { title: 'Total Reservations', key: 'bookings', icon: CalendarCheck },
            { title: 'Total Revenue', key: 'revenue', icon: DollarSign, format: 'currency' },
            { title: 'Avg Rating', key: 'avgRating', icon: Star },
        ],
        chartTitle: 'Revenue by Room Type',
        pieColors: ['#F43F5E', '#EC4899', '#FB7185', '#FDA4AF', '#BE185D', '#9F1239'],
        recentLabel: 'Your Rooms',
    },
    car_rental: {
        label: 'Car Rental',
        emoji: '🚗',
        gradient: 'from-emerald-600 to-emerald-700',
        subtitle: 'Manage your fleet and rental bookings',
        statsPrefix: [
            { title: 'Active Vehicles', key: 'active', icon: Car },
            { title: 'Total Rentals', key: 'bookings', icon: CalendarCheck },
            { title: 'Total Revenue', key: 'revenue', icon: DollarSign, format: 'currency' },
            { title: 'Avg Rating', key: 'avgRating', icon: Star },
        ],
        chartTitle: 'Revenue by Vehicle Type',
        pieColors: ['#10B981', '#059669', '#34D399', '#6EE7B7', '#047857'],
        recentLabel: 'Your Vehicles',
    },
    trip_provider: {
        label: 'Trip Provider',
        emoji: '🏔️',
        gradient: 'from-amber-600 to-orange-600',
        subtitle: 'Manage your tour packages and adventure trips',
        statsPrefix: [
            { title: 'Active Packages', key: 'active', icon: Map },
            { title: 'Total Bookings', key: 'bookings', icon: CalendarCheck },
            { title: 'Total Revenue', key: 'revenue', icon: DollarSign, format: 'currency' },
            { title: 'Avg Rating', key: 'avgRating', icon: Star },
        ],
        chartTitle: 'Revenue by Trip Type',
        pieColors: ['#F59E0B', '#D97706', '#FBBF24', '#FCD34D', '#B45309'],
        recentLabel: 'Your Packages',
    },
    umrah_provider: {
        label: 'Umrah Provider',
        emoji: '🕋',
        gradient: 'from-teal-600 to-cyan-600',
        subtitle: 'Manage your Umrah packages and pilgrim services',
        statsPrefix: [
            { title: 'Active Packages', key: 'active', icon: Moon },
            { title: 'Total Pilgrims', key: 'bookings', icon: Users },
            { title: 'Total Revenue', key: 'revenue', icon: DollarSign, format: 'currency' },
            { title: 'Avg Rating', key: 'avgRating', icon: Star },
        ],
        chartTitle: 'Revenue by Package Type',
        pieColors: ['#14B8A6', '#0D9488', '#2DD4BF', '#5EEAD4', '#0F766E'],
        recentLabel: 'Your Packages',
    },
};

// Fallback for generic agent role
const DEFAULT_CONFIG = {
    label: 'Agent',
    emoji: '💼',
    gradient: 'from-indigo-600 to-purple-600',
    subtitle: 'Here\'s your business overview for today',
    statsPrefix: [
        { title: 'Total Requests', key: 'requests', icon: Inbox },
        { title: 'Active Clients', key: 'clients', icon: Users },
        { title: 'Completed', key: 'completed', icon: CheckCircle },
        { title: 'Total Earnings', key: 'earnings', icon: DollarSign, format: 'currency' },
    ],
    chartTitle: 'Service Distribution',
    pieColors: ['#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#F59E0B'],
    recentLabel: 'Recent Activity',
};

const formatCurrency = (n) => n >= 1000000 ? `PKR ${(n / 1000000).toFixed(1)}M` : `PKR ${(n / 1000).toFixed(0)}K`;

// ── Monthly chart data generator ──
const generateMonthlyData = (role) => {
    const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
    const multipliers = {
        hotel_provider: [2.1, 2.5, 3.0, 2.8, 3.2, 3.5],
        car_rental: [0.3, 0.35, 0.42, 0.38, 0.45, 0.5],
        trip_provider: [1.5, 2.0, 2.8, 1.8, 2.5, 3.2],
        umrah_provider: [5.0, 4.5, 6.0, 12.0, 8.0, 5.5],
        travel_agency: [3.0, 3.5, 4.0, 3.8, 4.5, 5.0],
        individual_agent: [0.2, 0.25, 0.3, 0.35, 0.4, 0.45],
    };
    const base = multipliers[role] || [1, 1.2, 1.5, 1.3, 1.6, 1.8];
    return months.map((month, i) => ({
        month,
        revenue: Math.round(base[i] * 1000000),
    }));
};

const AgentDashboard = () => {
    const { user } = useAuth();
    const role = user?.role || 'agent';
    const config = DASHBOARD_CONFIG[role] || DEFAULT_CONFIG;

    // Get role-specific listings
    const listings = adminServiceListings[role] || [];
    const isGenericAgent = !DASHBOARD_CONFIG[role];

    // Calculate role-specific stats
    const roleStats = {
        active: listings.filter(l => l.status === 'active').length,
        bookings: listings.reduce((a, l) => a + (l.bookings || 0), 0),
        revenue: listings.reduce((a, l) => a + (l.revenue || l.spent || 0), 0),
        avgRating: listings.length > 0
            ? (listings.reduce((a, l) => a + (l.rating || 0), 0) / listings.filter(l => l.rating).length).toFixed(1)
            : '0.0',
        requests: incomingRequests.length,
        clients: activeClients.length,
        completed: completedCases.length,
        earnings: agentEarnings.total,
    };

    const stats = config.statsPrefix.map(s => ({
        title: s.title,
        value: s.format === 'currency' ? formatCurrency(roleStats[s.key]) : roleStats[s.key],
        icon: s.icon,
        trend: 'up',
        trendValue: s.key === 'avgRating' ? 'out of 5.0' : '+12% this month',
    }));

    // Pie chart: breakdown by type
    const typeBreakdown = {};
    listings.forEach(l => {
        const t = l.type || 'Other';
        typeBreakdown[t] = (typeBreakdown[t] || 0) + (l.revenue || l.spent || l.bookings || 1);
    });
    const pieData = Object.entries(typeBreakdown).map(([name, value], i) => ({
        name,
        value,
        color: config.pieColors[i % config.pieColors.length],
    }));

    // Monthly chart data
    const monthlyData = generateMonthlyData(role);

    const CustomTooltip = ({ active, payload, label }) => {
        if (!active || !payload?.length) return null;
        return (
            <div className="bg-white px-4 py-2.5 rounded-xl shadow-xl border border-gray-100 text-sm">
                <p className="font-medium text-gray-800">{label}</p>
                {payload.map((p, i) => (
                    <p key={i} className="text-gray-600">{p.name}: <span className="font-semibold">{typeof p.value === 'number' && p.value > 100 ? `PKR ${p.value.toLocaleString()}` : p.value}</span></p>
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-6 max-w-7xl">
            {/* Welcome Banner */}
            <div className={`bg-gradient-to-r ${config.gradient} rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden`}>
                <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
                <div className="absolute right-20 bottom-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2" />
                <div className="relative z-10">
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl lg:text-2xl font-bold">Hello, {user?.name || 'Provider'} {config.emoji}</h1>
                    </div>
                    <p className="text-white/80 text-sm mt-1">{config.subtitle}</p>
                    <div className="flex items-center gap-3 mt-3">
                        <span className="px-2.5 py-1 bg-white/15 rounded-lg text-xs font-medium">{config.label}</span>
                        {user?.verificationStatus === 'approved' && (
                            <span className="px-2.5 py-1 bg-green-500/20 rounded-lg text-xs font-medium flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" /> Verified
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {stats.map((s, i) => (
                    <Card key={i} {...s} />
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Revenue */}
                <ChartWrapper title="Monthly Revenue" subtitle="Last 6 months">
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={monthlyData} barSize={36}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(v) => `${v / 1000000}M`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="revenue" fill="#3B82F6" radius={[8, 8, 0, 0]} name="Revenue" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartWrapper>

                {/* Type Distribution */}
                {pieData.length > 0 ? (
                    <ChartWrapper title={config.chartTitle} subtitle="Breakdown by type">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <ResponsiveContainer width="100%" height={240} className="max-w-[260px]">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={55}
                                        outerRadius={95}
                                        paddingAngle={4}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {pieData.map((entry, i) => (
                                            <Cell key={i} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                                {pieData.map((s, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                                        <span className="text-xs text-gray-600 truncate">{s.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ChartWrapper>
                ) : (
                    <ChartWrapper title={config.chartTitle} subtitle="No data yet">
                        <div className="flex items-center justify-center h-[240px]">
                            <p className="text-sm text-gray-400">Add listings to see your distribution</p>
                        </div>
                    </ChartWrapper>
                )}
            </div>

            {/* Recent Listings */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-base font-semibold text-gray-900">{config.recentLabel}</h2>
                    <a href="/dashboard/agent/add-package" className="text-xs font-semibold text-blue-600 hover:text-blue-700">+ Add New</a>
                </div>
                <div className="divide-y divide-gray-50">
                    {listings.length === 0 ? (
                        <div className="px-6 py-12 text-center">
                            <Package className="w-10 h-10 text-gray-200 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">No listings yet. Add your first one!</p>
                        </div>
                    ) : (
                        listings.slice(0, 5).map((item) => (
                            <div key={item.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${config.gradient} bg-opacity-10 flex items-center justify-center text-white shrink-0`}>
                                        {item.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">{item.name}</p>
                                        <p className="text-xs text-gray-500">{item.type} · {item.city}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-sm font-semibold text-gray-900">PKR {(item.price || 0).toLocaleString()}</p>
                                        <p className="text-xs text-gray-500">{item.bookings} bookings</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                        <span className="text-sm font-medium text-gray-700">{item.rating}</span>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${item.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                                        }`}>
                                        {item.status === 'active' ? 'Active' : 'Suspended'}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AgentDashboard;
