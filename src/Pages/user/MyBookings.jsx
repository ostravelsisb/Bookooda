import StatusBadge from '../../Components/dashboard/StatusBadge';
import { userBookings } from '../../data/mockData';
import { Plane, Building2, Shield, GraduationCap, MapPin, FileText, CalendarDays } from 'lucide-react';

const typeIcons = {
    Visa: FileText,
    Flight: Plane,
    Hotel: Building2,
    Insurance: Shield,
    'Study File': GraduationCap,
    Tours: MapPin,
};

const typeColors = {
    Visa: 'bg-blue-50 text-blue-600',
    Flight: 'bg-indigo-50 text-indigo-600',
    Hotel: 'bg-purple-50 text-purple-600',
    Insurance: 'bg-emerald-50 text-emerald-600',
    'Study File': 'bg-amber-50 text-amber-600',
    Tours: 'bg-pink-50 text-pink-600',
};

const MyBookings = () => {
    return (
        <div className="space-y-6 max-w-7xl">
            {/* Header */}
            <div>
                <h1 className="text-xl font-bold text-gray-900">My Bookings</h1>
                <p className="text-sm text-gray-500 mt-0.5">Track all your travel bookings in one place</p>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 flex-wrap">
                {['All', 'Visa', 'Flight', 'Hotel', 'Insurance', 'Study File', 'Tours'].map((tab) => (
                    <button
                        key={tab}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${tab === 'All'
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Booking cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                {userBookings.map((booking) => {
                    const Icon = typeIcons[booking.type] || FileText;
                    const colorClass = typeColors[booking.type] || 'bg-gray-50 text-gray-600';

                    return (
                        <div key={booking.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                            {/* Top bar */}
                            <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="p-5">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-11 h-11 rounded-xl ${colorClass} flex items-center justify-center`}>
                                        <Icon size={20} />
                                    </div>
                                    <StatusBadge status={booking.status} />
                                </div>

                                <h3 className="text-base font-semibold text-gray-900 mb-1">{booking.type} — {booking.destination}</h3>
                                <p className="text-xs text-gray-500 mb-4">{booking.id}</p>

                                <div className="space-y-2.5">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500 flex items-center gap-1.5">
                                            <CalendarDays size={14} /> Date
                                        </span>
                                        <span className="font-medium text-gray-700">{booking.date}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Agent</span>
                                        <span className="font-medium text-gray-700">{booking.agent}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Amount</span>
                                        <span className="font-semibold text-gray-900">PKR {booking.amount.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyBookings;
