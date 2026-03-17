import React, { useState, lazy, Suspense } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RoleLoginForm from './forms/RoleLoginForm';
import '../index.css';

const SignupForm = lazy(() => import('./forms/SignupForm'));

const ROLES = [
    {
        id: 'customer',
        name: 'Customer',
        description: 'Browse verified providers, book hotels, tours, cars, visas and more.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
            </svg>
        ),
        color: 'from-violet-500 to-purple-600',
        lightBg: 'bg-violet-100',
        lightText: 'text-violet-700',
    },
    {
        id: 'travel_tours',
        name: 'Travel & Tours',
        description: 'Register as an Independent Agent or a complete Travel Agency.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
        ),
        color: 'from-blue-500 to-indigo-600',
        lightBg: 'bg-blue-100',
        lightText: 'text-blue-700',
    },
    {
        id: 'hotel_provider',
        name: 'Hotel Provider',
        description: 'List your rooms, manage bookings and grow your business.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
            </svg>
        ),
        color: 'from-rose-500 to-pink-600',
        lightBg: 'bg-rose-100',
        lightText: 'text-rose-700',
    },
    {
        id: 'car_rental',
        name: 'Car Rental',
        description: 'List your fleet and provide rental vehicles across Pakistan.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
        ),
        color: 'from-emerald-500 to-emerald-600',
        lightBg: 'bg-emerald-100',
        lightText: 'text-emerald-700',
    },
    {
        id: 'trip_provider',
        name: 'Trip Provider',
        description: 'Create and sell tour packages to thousands of eager travelers.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
            </svg>
        ),
        color: 'from-amber-500 to-orange-500',
        lightBg: 'bg-amber-100',
        lightText: 'text-amber-700',
    },
    {
        id: 'umrah_provider',
        name: 'Umrah Provider',
        description: 'Offer trusted Umrah packages and help pilgrims on their journey.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
        ),
        color: 'from-teal-500 to-cyan-600',
        lightBg: 'bg-teal-100',
        lightText: 'text-teal-700',
    },
];

const RIGHT_PANEL_DATA = {
    customer: { title: 'Explore the World', subtitle: 'Book flights, visas, tours, and more — all in one platform.', stats: [{ val: '1000+', label: 'Destinations' }, { val: '50K+', label: 'Happy Travelers' }] },
    travel_tours: { title: 'Grow Your Travel Business', subtitle: "Join Pakistan's largest travel marketplace as an Individual or Agency.", stats: [{ val: '500+', label: 'Active Providers' }, { val: '50K+', label: 'Monthly Bookings' }] },
    hotel_provider: { title: 'Fill Your Rooms', subtitle: 'Reach thousands of travelers searching for quality accommodations across Pakistan.', stats: [{ val: '300+', label: 'Hotels Listed' }, { val: '98%', label: 'Occupancy Rate' }] },
    car_rental: { title: 'List Your Fleet', subtitle: 'Reach customers looking for rental vehicles across Pakistan.', stats: [{ val: '150+', label: 'Vehicles Listed' }, { val: '95%', label: 'Satisfaction' }] },
    trip_provider: { title: 'Share Your Adventures', subtitle: 'Create and sell tour packages to thousands of eager travelers.', stats: [{ val: '100+', label: 'Active Tours' }, { val: '10K+', label: 'Travelers' }] },
    umrah_provider: { title: 'Serve the Faithful', subtitle: 'Offer trusted Umrah packages and help pilgrims on their sacred journey.', stats: [{ val: '80+', label: 'Packages' }, { val: '4.9★', label: 'Avg Rating' }] },
};

const FormLoader = () => (
    <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-slate-500">Preparing your workspace...</p>
        </div>
    </div>
);

const AuthPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Pre-select role & mode when navigated from hotel onboarding's Sign in link
    const incomingRole = location.state?.role || null;
    const incomingMode = location.state?.mode || 'login';

    const [selectedRole, setSelectedRole] = useState(incomingRole);
    const [authMode, setAuthMode] = useState(incomingMode);

    const toggleAuthMode = () => setAuthMode(prev => prev === 'login' ? 'signup' : 'login');

    const currentRole = ROLES.find(r => r.id === selectedRole);
    const panelData = selectedRole ? RIGHT_PANEL_DATA[selectedRole] : null;

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 font-sans selection:bg-blue-200">
            {/* Main Container - Added max height constraint for better desktop feel */}
            <div className="relative bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden w-full max-w-6xl min-h-[720px] max-h-[90vh] flex flex-col z-10 border border-slate-100">

                {/* Content Area */}
                <div className="flex-1 flex flex-col md:flex-row h-full">

                    {/* Left: Form Section */}
                    <div className="w-full md:w-[55%] flex flex-col h-full bg-white relative">
                        {/* Static Header inside Left Panel */}
                        <div className="absolute top-0 w-full flex items-center justify-start py-6 px-8 z-20 bg-white/80 backdrop-blur-md">
                            <img src="/mainlogo.png" alt="Bookooda Logo" className="h-8 w-8 mr-3 object-contain" />
                            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Bookooda</h1>
                        </div>

                        {/* Scrollable Content Area */}
                        <div className="flex-1 overflow-y-auto pt-24 pb-8 px-6 md:px-12 flex flex-col">
                            {!selectedRole ? (
                                /* ── Role Selection ── */
                                <div className="transition-all duration-500 ease-out flex-1 flex flex-col justify-center">
                                    <div className="mb-8">
                                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome to Bookooda</h2>
                                        <p className="text-base text-slate-500 mt-2">Select your account type to continue</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
                                        {ROLES.map((role) => (
                                            <button
                                                key={role.id}
                                                onClick={() => {
                                                    if (role.id === 'hotel_provider') {
                                                        navigate('/onboarding/hotel');
                                                    } else if (role.id === 'travel_tours') {
                                                        navigate('/onboarding/travel');
                                                    } else if (role.id === 'car_rental') {
                                                        navigate('/onboarding/car');
                                                    } else {
                                                        setSelectedRole(role.id);
                                                    }
                                                }}
                                                className="group relative flex items-start gap-4 p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 text-left focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                                            >
                                                <div className={`shrink-0 w-12 h-12 rounded-xl ${role.lightBg} ${role.lightText} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                                                    {role.icon}
                                                </div>
                                                <div className="flex-1 min-w-0 pt-0.5">
                                                    <h3 className="font-semibold text-slate-900 text-sm md:text-base leading-tight group-hover:text-blue-600 transition-colors">{role.name}</h3>
                                                    <p className="text-xs md:text-sm text-slate-500 mt-1.5 leading-relaxed line-clamp-2">{role.description}</p>
                                                </div>
                                                <div className="absolute top-5 right-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-blue-500">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                                    </svg>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                /* ── Login / Signup Form ── */
                                <div className="transition-all duration-500 ease-out flex-1 flex flex-col">
                                    {/* Back button */}
                                    <button
                                        onClick={() => { setSelectedRole(null); setAuthMode('login'); }}
                                        className="inline-flex items-center w-fit gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors group"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 transition-transform group-hover:-translate-x-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                        </svg>
                                        Back to roles
                                    </button>

                                    {/* Selected role badge */}
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className={`w-10 h-10 rounded-lg ${currentRole.lightBg} ${currentRole.lightText} flex items-center justify-center`}>
                                            {currentRole.icon}
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Selected Role</p>
                                            <h3 className="text-lg font-bold text-slate-900">{currentRole.name}</h3>
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        {authMode === 'login' ? (
                                            <RoleLoginForm selectedRole={selectedRole} onToggle={toggleAuthMode} />
                                        ) : (
                                            <Suspense fallback={<FormLoader />}>
                                                <SignupForm selectedRole={selectedRole} onToggle={toggleAuthMode} />
                                            </Suspense>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Info Panel — desktop only */}
                    <div className="hidden md:flex md:w-[45%] relative bg-slate-900 overflow-hidden">
                        {/* High-quality Unsplash Image */}
                        <img
                            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                            alt="Travel Background"
                            className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 hover:scale-105"
                        />

                        {/* Gradient Overlay for Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/20"></div>

                        {/* Overlay Content */}
                        <div className="relative z-10 flex flex-col items-start justify-end text-white p-12 h-full w-full">

                            {/* Glassmorphism Card Info Area */}
                            <div className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl transition-all duration-500">
                                {!selectedRole ? (
                                    <>
                                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                            </svg>
                                        </div>
                                        <h2 className="text-3xl font-bold tracking-tight mb-3">Pakistan's #1 Travel Platform</h2>
                                        <p className="text-base font-light text-slate-200 mb-8 leading-relaxed">
                                            Connect with verified travel agents, book tours, rent cars, and plan your perfect journey with absolute peace of mind.
                                        </p>
                                        <div className="grid grid-cols-3 gap-4 border-t border-white/20 pt-6">
                                            <div>
                                                <div className="text-2xl font-bold">1000+</div>
                                                <div className="text-xs font-medium text-slate-300 uppercase tracking-wide mt-1">Destinations</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold">50K+</div>
                                                <div className="text-xs font-medium text-slate-300 uppercase tracking-wide mt-1">Travelers</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold">500+</div>
                                                <div className="text-xs font-medium text-slate-300 uppercase tracking-wide mt-1">Agents</div>
                                            </div>
                                        </div>
                                    </>
                                ) : panelData && (
                                    <>
                                        <h2 className="text-3xl font-bold tracking-tight mb-3">{panelData.title}</h2>
                                        <p className="text-base font-light text-slate-200 mb-8 leading-relaxed">{panelData.subtitle}</p>
                                        <div className="flex items-center space-x-12 border-t border-white/20 pt-6">
                                            {panelData.stats.map((s, i) => (
                                                <div key={i}>
                                                    <div className="text-2xl font-bold">{s.val}</div>
                                                    <div className="text-xs font-medium text-slate-300 uppercase tracking-wide mt-1">{s.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Trust badges underneath */}
                            <div className="flex flex-wrap items-center gap-6 mt-8">
                                {['Verified Providers', 'Secure Payments', '24/7 Support'].map((text, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="bg-emerald-500/20 rounded-full p-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3 text-emerald-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium text-slate-300">{text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;