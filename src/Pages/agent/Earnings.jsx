import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../Components/dashboard/StatusBadge';
import ChartWrapper from '../../Components/dashboard/ChartWrapper';
import { adminServiceListings } from '../../data/adminData';
import { DollarSign, TrendingUp, Clock, Wallet, Percent, CreditCard } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ROLE_CONFIG = {
    hotel_provider: { label: 'Hotel', gradient: 'from-rose-500 to-pink-600', barColor: '#F43F5E', commissionRate: 12 },
    car_rental: { label: 'Car Rental', gradient: 'from-emerald-500 to-emerald-600', barColor: '#10B981', commissionRate: 10 },
    trip_provider: { label: 'Trip', gradient: 'from-amber-500 to-orange-500', barColor: '#F59E0B', commissionRate: 15 },
    umrah_provider: { label: 'Umrah', gradient: 'from-teal-500 to-cyan-600', barColor: '#14B8A6', commissionRate: 8 },
    travel_agency: { label: 'Agency', gradient: 'from-blue-500 to-indigo-600', barColor: '#3B82F6', commissionRate: 15 },
    individual_agent: { label: 'Agent', gradient: 'from-indigo-500 to-indigo-600', barColor: '#6366F1', commissionRate: 20 },
};

// Generate role-specific transaction data
const generateTransactions = (role, listings) => {
    const txnTemplates = {
        hotel_provider: [
            { client: 'Ahmad Raza', service: 'Deluxe Room · 3 Nights' },
            { client: 'Fatima Noor', service: 'Premium Suite · 5 Nights' },
            { client: 'Usman Tariq', service: 'Standard Room · 2 Nights' },
            { client: 'Saba Mirza', service: 'Executive Room · 4 Nights' },
            { client: 'Ali Hassan', service: 'King Suite · Weekend' },
        ],
        car_rental: [
            { client: 'Bilal Khan', service: 'Toyota Corolla · 7 Days' },
            { client: 'Zainab Fatima', service: 'Land Cruiser · Weekend' },
            { client: 'Sara Javed', service: 'Suzuki Alto · Monthly' },
            { client: 'Ahmed Ali', service: 'Honda Civic · 3 Days' },
        ],
        trip_provider: [
            { client: 'Kamran Shah', service: 'Hunza Valley Tour · 5 Days' },
            { client: 'Hira Batool', service: 'Fairy Meadows Trek · 3 Days' },
            { client: 'Zain Sheikh', service: 'Skardu & Deosai · 7 Days' },
            { client: 'Omar Hayat', service: 'Neelum Valley · 2 Days' },
        ],
        umrah_provider: [
            { client: 'Haji Muhammad', service: 'Premium Umrah · 14 Days' },
            { client: 'Amina Bibi', service: 'Economy Package · 10 Days' },
            { client: 'Tariq Mehmood', service: 'Family Package · 12 Days' },
            { client: 'Khadija Nawaz', service: 'Ramadan Special · 15 Days' },
        ],
        travel_agency: [
            { client: 'Asad Mehmood', service: 'Turkey Visit Visa' },
            { client: 'Rabia Shafiq', service: 'UAE Visit Visa' },
            { client: 'Junaid Khan', service: 'London Flight Booking' },
            { client: 'Maria Ahmed', service: 'Thailand Tour + Visa' },
            { client: 'Hassan Raza', service: 'Travel Insurance' },
        ],
        individual_agent: [
            { client: 'Sana Malik', service: 'UAE Visa Assistance' },
            { client: 'Imran Shah', service: 'Malaysia eVisa' },
            { client: 'Nadia Bukhari', service: 'Travel Consultation' },
            { client: 'Waqas Ali', service: 'Flight Deal Finder' },
        ],
    };
    const config = ROLE_CONFIG[role] || ROLE_CONFIG.travel_agency;
    const templates = txnTemplates[role] || txnTemplates.travel_agency;
    const statuses = ['Completed', 'Completed', 'Completed', 'Pending', 'In Progress'];

    return templates.map((t, i) => {
        const amount = Math.round((15000 + Math.random() * 80000) / 100) * 100;
        return {
            id: `TXN-${String(i + 1).padStart(3, '0')}`,
            client: t.client,
            service: t.service,
            date: `2026-02-${String(28 - i * 4).padStart(2, '0')}`,
            amount,
            commission: Math.round(amount * config.commissionRate / 100),
            status: statuses[i % statuses.length],
        };
    });
};

const Earnings = () => {
    const { user } = useAuth();
    const role = user?.role || 'agent';
    const config = ROLE_CONFIG[role] || ROLE_CONFIG.travel_agency;
    const listings = adminServiceListings[role] || [];
    const transactions = generateTransactions(role, listings);

    // Calculate earnings from listings
    const totalRevenue = listings.reduce((a, l) => a + (l.revenue || 0), 0);
    const totalBookings = listings.reduce((a, l) => a + (l.bookings || 0), 0);
    const commission = Math.round(totalRevenue * config.commissionRate / 100);

    const earnings = {
        total: totalRevenue,
        thisMonth: Math.round(totalRevenue * 0.22),
        lastMonth: Math.round(totalRevenue * 0.18),
        pending: Math.round(totalRevenue * 0.08),
        commission: commission,
    };

    // Monthly chart
    const monthlyChart = [
        { month: 'Oct', earnings: Math.round(totalRevenue * 0.12) },
        { month: 'Nov', earnings: Math.round(totalRevenue * 0.15) },
        { month: 'Dec', earnings: Math.round(totalRevenue * 0.18) },
        { month: 'Jan', earnings: Math.round(totalRevenue * 0.16) },
        { month: 'Feb', earnings: Math.round(totalRevenue * 0.20) },
        { month: 'Mar', earnings: Math.round(totalRevenue * 0.22) },
    ];

    const formatCurrency = (n) => n >= 1000000 ? `PKR ${(n / 1000000).toFixed(1)}M` : `PKR ${(n / 1000).toFixed(0)}K`;

    const CustomTooltip = ({ active, payload, label }) => {
        if (!active || !payload?.length) return null;
        return (
            <div className="bg-white px-4 py-2.5 rounded-xl shadow-xl border border-gray-100 text-sm">
                <p className="font-medium text-gray-800">{label}</p>
                <p className="text-gray-600">Earnings: <span className="font-semibold">PKR {payload[0].value.toLocaleString()}</span></p>
            </div>
        );
    };

    return (
        <div className="space-y-6 max-w-7xl">
            <div>
                <h1 className="text-xl font-bold text-gray-900">{config.label} Earnings</h1>
                <p className="text-sm text-gray-500 mt-0.5">Track your {config.label.toLowerCase()} income and commissions</p>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                    { label: 'Total Revenue', value: formatCurrency(earnings.total), icon: DollarSign, bg: 'bg-emerald-50 text-emerald-600' },
                    { label: 'This Month', value: formatCurrency(earnings.thisMonth), icon: TrendingUp, bg: 'bg-blue-50 text-blue-600' },
                    { label: 'Last Month', value: formatCurrency(earnings.lastMonth), icon: Wallet, bg: 'bg-indigo-50 text-indigo-600' },
                    { label: 'Pending', value: formatCurrency(earnings.pending), icon: Clock, bg: 'bg-amber-50 text-amber-600' },
                    { label: `Commission (${config.commissionRate}%)`, value: formatCurrency(earnings.commission), icon: Percent, bg: 'bg-purple-50 text-purple-600' },
                ].map((s, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center`}>
                            <s.icon size={22} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">{s.label}</p>
                            <p className="text-xl font-bold text-gray-900">{s.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chart */}
            <ChartWrapper title={`${config.label} Earnings Overview`} subtitle="Monthly breakdown">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyChart} barSize={40}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="earnings" fill={config.barColor} radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </ChartWrapper>

            {/* Transactions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-base font-semibold text-gray-900">Recent {config.label} Transactions</h3>
                    <span className="text-xs text-gray-400">{transactions.length} transactions</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100">
                                {['Transaction', 'Client', 'Service', 'Date', 'Amount', 'Commission', 'Status'].map((h) => (
                                    <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {transactions.map((t) => (
                                <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-3 font-medium text-gray-800">{t.id}</td>
                                    <td className="px-6 py-3 text-gray-700">{t.client}</td>
                                    <td className="px-6 py-3 text-gray-600">{t.service}</td>
                                    <td className="px-6 py-3 text-gray-600">{t.date}</td>
                                    <td className="px-6 py-3 text-gray-900 font-semibold">PKR {t.amount.toLocaleString()}</td>
                                    <td className="px-6 py-3 text-emerald-600 font-semibold">PKR {t.commission.toLocaleString()}</td>
                                    <td className="px-6 py-3"><StatusBadge status={t.status} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Earnings;
