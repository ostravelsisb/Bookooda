import { useState, useRef, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, LogOut, User, Settings, ChevronDown, MapPin, Filter, X } from 'lucide-react';
import { userNotifications } from '../../data/mockData';

// Role-aware search config
const SEARCH_CONFIG = {
    admin: { placeholder: 'Search users, verifications, settings...', suggestions: ['Pending verifications', 'All users', 'Hotel providers', 'Car rentals', 'Trip providers', 'Umrah providers', 'Platform settings'] },
    hotel_provider: { placeholder: 'Search hotels, rooms, bookings...', suggestions: ['My rooms', 'Active reservations', 'Pending bookings', 'Revenue report', 'Guest reviews'] },
    car_rental: { placeholder: 'Search vehicles, rentals, bookings...', suggestions: ['My vehicles', 'Active rentals', 'Available cars', 'Rental history', 'Customer reviews'] },
    trip_provider: { placeholder: 'Search trips, packages, bookings...', suggestions: ['My packages', 'Active tours', 'Upcoming trips', 'Trip bookings', 'Traveler reviews'] },
    umrah_provider: { placeholder: 'Search umrah packages, pilgrims...', suggestions: ['My packages', 'Active pilgrimages', 'Upcoming groups', 'Pilgrim bookings', 'Reviews'] },
    travel_agency: { placeholder: 'Search visas, flights, clients...', suggestions: ['Pending visas', 'Flight bookings', 'Active clients', 'Hotel reservations', 'Study files'] },
    individual_agent: { placeholder: 'Search clients, visas, services...', suggestions: ['My clients', 'Visa applications', 'Active cases', 'Earnings', 'Client reviews'] },
    customer: { placeholder: 'Search hotels, trips, car rentals...', suggestions: ['Hotels near me', 'Tour packages', 'Car rentals', 'Umrah packages', 'Flight deals', 'Visa services'] },
    user: { placeholder: 'Search destinations, bookings...', suggestions: ['My bookings', 'Saved agents', 'Payment history', 'Visa applications'] },
};

const TopNavbar = ({ onMenuToggle }) => {
    const { user, logout, getVerificationRequests } = useAuth();
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const notifRef = useRef(null);
    const profileRef = useRef(null);
    const searchRef = useRef(null);

    const role = user?.role || 'user';
    const searchConfig = SEARCH_CONFIG[role] || SEARCH_CONFIG.user;

    // Admin: count pending verification requests
    const adminPendingCount = useMemo(() => {
        if (role !== 'admin') return 0;
        try {
            const reqs = getVerificationRequests();
            return reqs.filter(r => r.status === 'pending').length;
        } catch { return 0; }
    }, [role]);

    const unreadCount = userNotifications.filter((n) => !n.read).length;

    // Admin gets verification notifications merged in
    const adminNotifications = useMemo(() => {
        if (role !== 'admin') return userNotifications;
        const verifNotifs = adminPendingCount > 0 ? [{
            id: 'admin-verif',
            title: `${adminPendingCount} New Verification Request${adminPendingCount > 1 ? 's' : ''}`,
            message: 'New providers have registered and uploaded documents for verification.',
            time: 'Just now',
            read: false,
            isAdmin: true,
        }] : [];
        return [...verifNotifs, ...userNotifications.slice(0, 4)];
    }, [role, adminPendingCount]);

    const totalUnread = role === 'admin' ? (adminPendingCount > 0 ? unreadCount + 1 : unreadCount) : unreadCount;

    useEffect(() => {
        const handleClick = (e) => {
            if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
            if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
            if (searchRef.current && !searchRef.current.contains(e.target)) setShowSuggestions(false);
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const handleLogout = () => { logout(); navigate('/auth'); };

    const getProfilePath = () => {
        if (role === 'admin') return '/dashboard/admin/settings';
        if (role === 'user' || role === 'customer') return '/dashboard/user/profile';
        return '/dashboard/agent/profile';
    };

    const getSettingsPath = () => {
        if (role === 'admin') return '/dashboard/admin/settings';
        if (role === 'user' || role === 'customer') return '/dashboard/user/profile';
        return '/dashboard/agent/profile';
    };

    const getNotifPath = () => {
        if (role === 'admin') return '/dashboard/admin/verifications';
        if (role === 'user' || role === 'customer') return '/dashboard/user/notifications';
        return '/dashboard/agent/requests';
    };

    const filteredSuggestions = searchConfig.suggestions.filter(s =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const ROLE_LABELS_SHORT = {
        admin: 'Super Admin',
        hotel_provider: 'Hotel Provider',
        car_rental: 'Car Rental',
        trip_provider: 'Trip Provider',
        umrah_provider: 'Umrah Provider',
        travel_agency: 'Travel Agency',
        individual_agent: 'Agent',
        customer: 'Customer',
        user: 'User',
    };

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 shrink-0 sticky top-0 z-30">
            {/* Left — hamburger + smart search */}
            <div className="flex items-center gap-3 flex-1">
                <button
                    onClick={onMenuToggle}
                    className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors"
                >
                    <Menu size={20} />
                </button>
                <div ref={searchRef} className="hidden sm:block relative flex-1 max-w-md">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3.5 py-2">
                        <Search size={16} className="text-gray-400 shrink-0" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                            onFocus={() => setShowSuggestions(true)}
                            placeholder={searchConfig.placeholder}
                            className="bg-transparent text-sm outline-none w-full placeholder:text-gray-400"
                        />
                        {searchQuery && (
                            <button onClick={() => { setSearchQuery(''); setShowSuggestions(false); }} className="text-gray-400 hover:text-gray-600">
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    {/* Search Suggestions Dropdown */}
                    {showSuggestions && filteredSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                            <div className="px-3 py-2 border-b border-gray-100">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    {role === 'admin' ? 'Quick Actions' : `Search ${ROLE_LABELS_SHORT[role]} Services`}
                                </p>
                            </div>
                            {filteredSuggestions.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => { setSearchQuery(s); setShowSuggestions(false); }}
                                    className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-left"
                                >
                                    <Search size={13} className="text-gray-300" />
                                    {s}
                                </button>
                            ))}
                            {role !== 'admin' && (
                                <button
                                    onClick={() => { navigate('/search'); setShowSuggestions(false); }}
                                    className="w-full px-3.5 py-2.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 transition-colors border-t border-gray-100 flex items-center justify-center gap-1"
                                >
                                    <MapPin size={12} />
                                    Open Map Search
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Right — notifs + profile */}
            <div className="flex items-center gap-2">
                {/* Notifications */}
                <div ref={notifRef} className="relative">
                    <button
                        onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
                        className="relative p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors"
                    >
                        <Bell size={20} />
                        {totalUnread > 0 && (
                            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                {totalUnread > 9 ? '9+' : totalUnread}
                            </span>
                        )}
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                                {totalUnread > 0 && (
                                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full">{totalUnread} new</span>
                                )}
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                                {adminNotifications.slice(0, 5).map((n) => (
                                    <div
                                        key={n.id}
                                        onClick={() => {
                                            if (n.isAdmin) { navigate('/dashboard/admin/verifications'); setShowNotifications(false); }
                                        }}
                                        className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${!n.read ? 'bg-blue-50/40' : ''} ${n.isAdmin ? 'bg-amber-50/60' : ''}`}
                                    >
                                        <p className="text-sm font-medium text-gray-800">{n.title}</p>
                                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{n.message}</p>
                                        <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="px-4 py-2.5 text-center border-t border-gray-100">
                                <button
                                    onClick={() => { navigate(getNotifPath()); setShowNotifications(false); }}
                                    className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                                >
                                    View all notifications
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile dropdown */}
                <div ref={profileRef} className="relative">
                    <button
                        onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
                        className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="hidden md:block text-left">
                            <p className="text-sm font-medium text-gray-800 leading-tight">{user?.name}</p>
                            <p className="text-xs text-gray-500">{ROLE_LABELS_SHORT[role] || role}</p>
                        </div>
                        <ChevronDown size={14} className="text-gray-400 hidden md:block" />
                    </button>

                    {showProfile && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                            <div className="px-4 py-3 border-b border-gray-100">
                                <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                                <p className="text-xs text-gray-500">{user?.email}</p>
                            </div>
                            <div className="py-1">
                                <button
                                    onClick={() => { navigate(getProfilePath()); setShowProfile(false); }}
                                    className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <User size={16} />
                                    Profile
                                </button>
                                <button
                                    onClick={() => { navigate(getSettingsPath()); setShowProfile(false); }}
                                    className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <Settings size={16} />
                                    Settings
                                </button>
                            </div>
                            <div className="border-t border-gray-100 py-1">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default TopNavbar;
