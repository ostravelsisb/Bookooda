import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard, CalendarCheck, FileText, Heart, CreditCard, Bell, UserCircle, LogOut,
    Inbox, Users, CheckCircle, DollarSign, Star, ChevronLeft, ChevronRight, Plane,
    Shield, Package, Plus, Hotel, Car, Map, Moon, ShieldCheck, Eye, Settings
} from 'lucide-react';

// ── Customer / User menu ──
const userMenuItems = [
    { label: 'Dashboard', path: '/dashboard/user', icon: LayoutDashboard },
    { label: 'My Bookings', path: '/dashboard/user/bookings', icon: CalendarCheck },
    { label: 'Visa Applications', path: '/dashboard/user/visa', icon: FileText },
    { label: 'Saved Agents', path: '/dashboard/user/agents', icon: Heart },
    { label: 'Payment History', path: '/dashboard/user/payments', icon: CreditCard },
    { label: 'Notifications', path: '/dashboard/user/notifications', icon: Bell },
    { label: 'Profile Settings', path: '/dashboard/user/profile', icon: UserCircle },
];

// ── Provider / Agent menu - role-specific ──
const getAgentMenuItems = (role, verificationStatus) => {
    const baseItems = [
        { label: 'Dashboard', path: '/dashboard/agent', icon: LayoutDashboard },
    ];

    // If not approved, show verification status link only
    if (verificationStatus !== 'approved') {
        return [
            ...baseItems,
            { label: 'Verification Status', path: '/verification', icon: ShieldCheck },
        ];
    }

    // Role-specific items for approved users
    const roleItems = {
        hotel_provider: [
            { label: 'My Hotels', path: '/dashboard/agent/requests', icon: Hotel },
            { label: 'Add Room', path: '/dashboard/agent/add-package', icon: Plus },
            { label: 'Bookings', path: '/dashboard/agent/clients', icon: CalendarCheck },
            { label: 'Earnings', path: '/dashboard/agent/earnings', icon: DollarSign },
            { label: 'Reviews', path: '/dashboard/agent/reviews', icon: Star },
        ],
        car_rental: [
            { label: 'My Vehicles', path: '/dashboard/agent/requests', icon: Car },
            { label: 'Add Vehicle', path: '/dashboard/agent/add-package', icon: Plus },
            { label: 'Active Rentals', path: '/dashboard/agent/clients', icon: CalendarCheck },
            { label: 'Earnings', path: '/dashboard/agent/earnings', icon: DollarSign },
            { label: 'Reviews', path: '/dashboard/agent/reviews', icon: Star },
        ],
        trip_provider: [
            { label: 'My Trips', path: '/dashboard/agent/requests', icon: Map },
            { label: 'Add Trip', path: '/dashboard/agent/add-package', icon: Plus },
            { label: 'Bookings', path: '/dashboard/agent/clients', icon: CalendarCheck },
            { label: 'Earnings', path: '/dashboard/agent/earnings', icon: DollarSign },
            { label: 'Reviews', path: '/dashboard/agent/reviews', icon: Star },
        ],
        umrah_provider: [
            { label: 'My Packages', path: '/dashboard/agent/requests', icon: Moon },
            { label: 'Add Package', path: '/dashboard/agent/add-package', icon: Plus },
            { label: 'Bookings', path: '/dashboard/agent/clients', icon: CalendarCheck },
            { label: 'Earnings', path: '/dashboard/agent/earnings', icon: DollarSign },
            { label: 'Reviews', path: '/dashboard/agent/reviews', icon: Star },
        ],
        travel_agency: [
            { label: 'Incoming Requests', path: '/dashboard/agent/requests', icon: Inbox },
            { label: 'Add Service', path: '/dashboard/agent/add-package', icon: Plus },
            { label: 'Active Clients', path: '/dashboard/agent/clients', icon: Users },
            { label: 'Completed Cases', path: '/dashboard/agent/completed', icon: CheckCircle },
            { label: 'Earnings', path: '/dashboard/agent/earnings', icon: DollarSign },
            { label: 'Reviews & Ratings', path: '/dashboard/agent/reviews', icon: Star },
        ],
        individual_agent: [
            { label: 'Incoming Requests', path: '/dashboard/agent/requests', icon: Inbox },
            { label: 'Add Listing', path: '/dashboard/agent/add-package', icon: Plus },
            { label: 'Active Clients', path: '/dashboard/agent/clients', icon: Users },
            { label: 'Completed Cases', path: '/dashboard/agent/completed', icon: CheckCircle },
            { label: 'Earnings', path: '/dashboard/agent/earnings', icon: DollarSign },
            { label: 'Reviews & Ratings', path: '/dashboard/agent/reviews', icon: Star },
        ],
    };

    const items = roleItems[role] || [
        { label: 'Incoming Requests', path: '/dashboard/agent/requests', icon: Inbox },
        { label: 'Active Clients', path: '/dashboard/agent/clients', icon: Users },
        { label: 'Completed Cases', path: '/dashboard/agent/completed', icon: CheckCircle },
        { label: 'Earnings', path: '/dashboard/agent/earnings', icon: DollarSign },
        { label: 'Reviews & Ratings', path: '/dashboard/agent/reviews', icon: Star },
    ];

    return [
        ...baseItems,
        ...items,
        { label: 'Profile Management', path: '/dashboard/agent/profile', icon: UserCircle },
    ];
};

// ── Admin menu ──
const adminMenuItems = [
    { label: 'Dashboard', path: '/dashboard/admin', icon: LayoutDashboard },
    { label: 'Verifications', path: '/dashboard/admin/verifications', icon: Shield },
    { label: 'All Users', path: '/dashboard/admin/users', icon: Users },
    { type: 'divider', label: 'Categories' },
    { label: 'Customers', path: '/dashboard/admin/category/customer', icon: Users },
    { label: 'Travel Agencies', path: '/dashboard/admin/category/travel_agency', icon: Plane },
    { label: 'Individual Agents', path: '/dashboard/admin/category/individual_agent', icon: UserCircle },
    { label: 'Hotels', path: '/dashboard/admin/category/hotel_provider', icon: Hotel },
    { label: 'Car Rentals', path: '/dashboard/admin/category/car_rental', icon: Car },
    { label: 'Trips', path: '/dashboard/admin/category/trip_provider', icon: Map },
    { label: 'Umrah', path: '/dashboard/admin/category/umrah_provider', icon: Moon },
    { type: 'divider', label: 'System' },
    { label: 'Settings', path: '/dashboard/admin/settings', icon: Settings },
];

const Sidebar = ({ collapsed, setCollapsed }) => {
    const { role, verificationStatus, logout } = useAuth();
    const navigate = useNavigate();

    // Determine menu items based on role
    let menuItems;
    if (role === 'admin') {
        menuItems = adminMenuItems;
    } else if (role === 'user' || role === 'customer') {
        menuItems = userMenuItems;
    } else {
        menuItems = getAgentMenuItems(role, verificationStatus);
    }

    const handleLogout = () => {
        logout();
        navigate('/auth');
    };

    // Role badge
    const roleBadges = {
        admin: { label: 'Admin', bg: 'bg-red-100', text: 'text-red-700' },
        hotel_provider: { label: 'Hotel', bg: 'bg-rose-100', text: 'text-rose-700' },
        car_rental: { label: 'Car Rental', bg: 'bg-emerald-100', text: 'text-emerald-700' },
        trip_provider: { label: 'Trips', bg: 'bg-amber-100', text: 'text-amber-700' },
        umrah_provider: { label: 'Umrah', bg: 'bg-teal-100', text: 'text-teal-700' },
        travel_agency: { label: 'Agency', bg: 'bg-blue-100', text: 'text-blue-700' },
        individual_agent: { label: 'Agent', bg: 'bg-indigo-100', text: 'text-indigo-700' },
        customer: { label: 'Customer', bg: 'bg-violet-100', text: 'text-violet-700' },
        user: { label: 'User', bg: 'bg-purple-100', text: 'text-purple-700' },
    };
    const badge = roleBadges[role] || { label: role, bg: 'bg-gray-100', text: 'text-gray-700' };

    return (
        <>
            {/* Mobile overlay */}
            {!collapsed && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setCollapsed(true)}
                />
            )}

            <aside
                className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 flex flex-col transition-all duration-300 ease-in-out
        ${collapsed ? 'w-[72px]' : 'w-64'}
        ${collapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}
            >
                {/* Logo */}
                <div className="h-16 flex items-center px-4 border-b border-gray-100 shrink-0">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                        <Plane size={18} className="text-white" />
                    </div>
                    {!collapsed && (
                        <span className="ml-3 text-lg font-bold text-blue-600 whitespace-nowrap">Bookooda</span>
                    )}
                </div>

                {/* Role Badge */}
                {!collapsed && (
                    <div className="px-4 py-3 border-b border-gray-100">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
                            {badge.label}
                        </span>
                    </div>
                )}

                {/* Nav items */}
                <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto scrollbar-hide">
                    {menuItems.map((item, idx) => {
                        if (item.type === 'divider') {
                            if (collapsed) return null;
                            return (
                                <div key={item.label} className="pt-4 pb-1 px-3">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
                                </div>
                            );
                        }
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === '/dashboard/user' || item.path === '/dashboard/agent' || item.path === '/dashboard/admin'}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                    ${isActive
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`
                                }
                                onClick={() => { if (window.innerWidth < 1024) setCollapsed(true); }}
                            >
                                <item.icon size={20} className="shrink-0" />
                                {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="p-3 border-t border-gray-100 shrink-0">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all w-full"
                    >
                        <LogOut size={20} className="shrink-0" />
                        {!collapsed && <span>Logout</span>}
                    </button>
                </div>

                {/* Collapse toggle — desktop */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-white border border-gray-200 shadow-sm items-center justify-center text-gray-500 hover:text-gray-700 hover:shadow transition-all"
                >
                    {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>
            </aside>
        </>
    );
};

export default Sidebar;
