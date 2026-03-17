import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Maps each role to its dashboard path
const ROLE_DASHBOARD_MAP = {
    user: '/dashboard/user',
    customer: '/dashboard/user',
    agent: '/dashboard/agent',
    travel_agency: '/dashboard/agent',
    individual_agent: '/dashboard/agent',
    car_rental: '/dashboard/agent',
    trip_provider: '/dashboard/agent',
    umrah_provider: '/dashboard/agent',
    hotel_provider: '/dashboard/agent',
    admin: '/dashboard/admin',
};

const ProtectedRoute = ({ children, allowedRoles, requireVerification = true }) => {
    const { isAuthenticated, role, verificationStatus, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-gray-500">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    // Role check
    if (allowedRoles && !allowedRoles.includes(role)) {
        const dashboardPath = ROLE_DASHBOARD_MAP[role] || '/auth';
        return <Navigate to={dashboardPath} replace />;
    }

    // Verification check — skip for customer, user, admin
    if (requireVerification && !['customer', 'user', 'admin'].includes(role)) {
        if (verificationStatus !== 'approved') {
            return <Navigate to="/verification" replace />;
        }
    }

    return children;
};

export { ROLE_DASHBOARD_MAP };
export default ProtectedRoute;
