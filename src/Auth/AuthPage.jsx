import React, { useState } from 'react';
import UserLogin from './User/UserLogin';
import UserSignup from './User/UserSignup';
import AgentLogin from './Agent/AgentLogin';
import AgentSignup from './Agent/AgentSignup';
import AdminLogin from './Admin/AdminLogin';
import '../index.css';

const AuthPage = () => {
    const [activeTab, setActiveTab] = useState('user'); // 'user', 'agent', 'admin'
    const [authMode, setAuthMode] = useState({
        user: 'login',
        agent: 'login'
    });

    const toggleAuthMode = (role) => {
        setAuthMode(prev => ({
            ...prev,
            [role]: prev[role] === 'login' ? 'signup' : 'login'
        }));
    };

    const tabs = [
        { id: 'user', label: 'User', icon: '👤' },
        { id: 'agent', label: 'Agent', icon: '💼' },
        { id: 'admin', label: 'Admin', icon: '🔐' }
    ];

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 font-sans relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            {/* Main Container */}
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-6xl min-h-[700px] flex flex-col z-10">

                {/* Logo Header */}
                <div className="flex items-center justify-center py-6 px-4 border-b border-gray-100">
                    <img src="/mainlogo.png" alt="Bookooda Logo" className="h-10 w-10 mr-3" />
                    <h1 className="text-2xl font-bold text-blue-600">Bookooda</h1>
                </div>

                {/* Tab Navigation */}
                <div className="flex justify-center items-center px-4 pt-6 pb-2">
                    <div className="inline-flex bg-gray-100 rounded-xl p-1 space-x-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center space-x-2 ${activeTab === tab.id
                                        ? 'bg-white text-blue-600 shadow-md'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <span className="text-lg">{tab.icon}</span>
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">

                    {/* Form Section */}
                    <div className="w-full md:w-1/2 flex items-center justify-center p-4 overflow-y-auto">
                        <div className="w-full transition-all duration-500 ease-in-out">
                            {/* User Auth */}
                            {activeTab === 'user' && (
                                <div className="animate-fadeIn">
                                    {authMode.user === 'login' ? (
                                        <UserLogin onToggle={() => toggleAuthMode('user')} />
                                    ) : (
                                        <UserSignup onToggle={() => toggleAuthMode('user')} />
                                    )}
                                </div>
                            )}

                            {/* Agent Auth */}
                            {activeTab === 'agent' && (
                                <div className="animate-fadeIn">
                                    {authMode.agent === 'login' ? (
                                        <AgentLogin onToggle={() => toggleAuthMode('agent')} />
                                    ) : (
                                        <AgentSignup onToggle={() => toggleAuthMode('agent')} />
                                    )}
                                </div>
                            )}

                            {/* Admin Auth */}
                            {activeTab === 'admin' && (
                                <div className="animate-fadeIn">
                                    <AdminLogin />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Image/Info Section - Hidden on mobile, visible on desktop */}
                    <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-600 relative overflow-hidden">
                        {/* Background Image */}
                        <img
                            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                            alt="Travel Background"
                            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
                        />

                        {/* Overlay Content */}
                        <div className="relative z-10 flex flex-col items-center justify-center text-white p-12 text-center">
                            <div className="space-y-6">
                                {activeTab === 'user' && (
                                    <>
                                        <h2 className="text-4xl font-bold tracking-tight">
                                            {authMode.user === 'login' ? 'Welcome Back!' : 'Start Your Journey'}
                                        </h2>
                                        <p className="text-lg font-light opacity-90">
                                            {authMode.user === 'login'
                                                ? 'Sign in to access your bookings and explore amazing destinations.'
                                                : 'Create an account and discover the world with Bookooda.'}
                                        </p>
                                        <div className="flex items-center justify-center space-x-8 pt-4">
                                            <div className="text-center">
                                                <div className="text-3xl font-bold">1000+</div>
                                                <div className="text-sm opacity-80">Destinations</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-3xl font-bold">50K+</div>
                                                <div className="text-sm opacity-80">Happy Travelers</div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {activeTab === 'agent' && (
                                    <>
                                        <h2 className="text-4xl font-bold tracking-tight">
                                            {authMode.agent === 'login' ? 'Agent Portal' : 'Join Our Network'}
                                        </h2>
                                        <p className="text-lg font-light opacity-90">
                                            {authMode.agent === 'login'
                                                ? 'Access your agent dashboard and manage bookings efficiently.'
                                                : 'Become a Bookooda partner and grow your travel business.'}
                                        </p>
                                        <div className="flex items-center justify-center space-x-8 pt-4">
                                            <div className="text-center">
                                                <div className="text-3xl font-bold">500+</div>
                                                <div className="text-sm opacity-80">Active Agents</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-3xl font-bold">24/7</div>
                                                <div className="text-sm opacity-80">Support</div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {activeTab === 'admin' && (
                                    <>
                                        <div className="flex justify-center mb-6">
                                            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <h2 className="text-4xl font-bold tracking-tight">Secure Access</h2>
                                        <p className="text-lg font-light opacity-90">
                                            Administrative portal with enhanced security protocols.
                                        </p>
                                        <div className="pt-4 space-y-2">
                                            <div className="flex items-center justify-center space-x-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-sm">Multi-factor Authentication</span>
                                            </div>
                                            <div className="flex items-center justify-center space-x-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-sm">Activity Logging</span>
                                            </div>
                                            <div className="flex items-center justify-center space-x-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-sm">Encrypted Data Transfer</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
