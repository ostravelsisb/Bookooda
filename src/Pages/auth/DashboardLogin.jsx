import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLE_DASHBOARD_MAP } from '../../Components/layout/ProtectedRoute';
import { Mail, Lock, Eye, EyeOff, Plane, ArrowRight } from 'lucide-react';

const DashboardLogin = () => {
    const { login, isAuthenticated, role } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (isAuthenticated) {
        const dashboardPath = ROLE_DASHBOARD_MAP[role] || '/auth';
        return <Navigate to={dashboardPath} replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate loading
        await new Promise((r) => setTimeout(r, 800));

        const result = login(email, password);
        if (result.success) {
            const dashboardPath = ROLE_DASHBOARD_MAP[result.role] || '/auth';
            navigate(dashboardPath);
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    const fillDemo = (type) => {
        setEmail(type === 'user' ? 'user@bookooda.com' : 'agent@bookooda.com');
        setPassword('password123');
        setError('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 relative overflow-hidden">
            {/* BG blobs */}
            <div className="absolute top-[-120px] left-[-100px] w-[400px] h-[400px] bg-blue-200/40 rounded-full blur-3xl" />
            <div className="absolute bottom-[-120px] right-[-100px] w-[400px] h-[400px] bg-indigo-200/40 rounded-full blur-3xl" />

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 mb-4 shadow-lg shadow-blue-600/20">
                        <Plane size={24} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Welcome to Bookooda</h1>
                    <p className="text-sm text-gray-500 mt-1">Sign in to your dashboard</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Password</label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                    className="w-full pl-11 pr-11 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-100">
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    Sign In <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Demo credentials */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <p className="text-xs text-gray-500 text-center mb-3">Quick access with demo accounts</p>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => fillDemo('user')}
                                className="py-2.5 px-4 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
                            >
                                👤 User Login
                            </button>
                            <button
                                onClick={() => fillDemo('agent')}
                                className="py-2.5 px-4 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
                            >
                                💼 Agent Login
                            </button>
                        </div>
                    </div>
                </div>

                <p className="text-xs text-gray-400 text-center mt-6">
                    © 2026 Bookooda. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default DashboardLogin;
