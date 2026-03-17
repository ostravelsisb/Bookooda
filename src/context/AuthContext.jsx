import { createContext, useContext, useState, useEffect } from 'react';
import { credentials, verificationRequests as mockVerificationRequests } from '../data/mockData';

const AuthContext = createContext(null);

// ── Helper: LocalStorage keys ──
const STORAGE_KEYS = {
    user: 'bookooda_user',
    verifications: 'bookooda_verifications',
    registeredUsers: 'bookooda_registered_users',
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize verification requests in localStorage from mock data
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEYS.user);
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                localStorage.removeItem(STORAGE_KEYS.user);
            }
        }

        // Seed verification data if not present or if source has more entries
        const storedVerifications = localStorage.getItem(STORAGE_KEYS.verifications);
        if (!storedVerifications || JSON.parse(storedVerifications).length < mockVerificationRequests.length) {
            localStorage.setItem(STORAGE_KEYS.verifications, JSON.stringify(mockVerificationRequests));
        }

        setIsLoading(false);
    }, []);

    // ── Login ──
    const login = (email, password) => {
        // Check static credentials first
        let found = credentials.find(
            (c) => c.email === email && c.password === password
        );

        // Also check dynamically registered users
        if (!found) {
            const registered = JSON.parse(localStorage.getItem(STORAGE_KEYS.registeredUsers) || '[]');
            found = registered.find(
                (c) => c.email === email && c.password === password
            );
        }

        if (!found) return { success: false, message: 'Invalid email or password' };

        // Check current verification status (could have been updated by admin)
        let verificationStatus = found.verificationStatus || 'unverified';

        // For dynamically registered users, check if admin has updated their verification
        const allVerifications = JSON.parse(localStorage.getItem(STORAGE_KEYS.verifications) || '[]');
        const userVerification = allVerifications.find(v => v.email === email);
        if (userVerification) {
            if (userVerification.status === 'approved') verificationStatus = 'approved';
            else if (userVerification.status === 'rejected') verificationStatus = 'rejected';
            else if (userVerification.status === 'under_review') verificationStatus = 'under_review';
            else if (userVerification.status === 'pending') verificationStatus = 'pending';
        }

        const userData = {
            email: found.email,
            name: found.name,
            role: found.role,
            phone: found.phone || '',
            city: found.city || '',
            verificationStatus: verificationStatus,
        };
        localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(userData));
        setUser(userData);
        return { success: true, role: found.role, verificationStatus };
    };

    // ── Register (simple signup) ──
    const register = (formData) => {
        const isCustomer = formData.role === 'customer';
        const userData = {
            email: formData.email,
            name: formData.fullName,
            role: formData.role,
            phone: formData.phoneNumber,
            city: formData.city,
            verificationStatus: isCustomer ? 'approved' : 'unverified',
        };

        // Store in registered users list
        const registered = JSON.parse(localStorage.getItem(STORAGE_KEYS.registeredUsers) || '[]');
        // Check if email already exists
        if (registered.some(u => u.email === formData.email) || credentials.some(c => c.email === formData.email)) {
            return { success: false, message: 'Email already registered' };
        }
        registered.push({ ...userData, password: formData.password });
        localStorage.setItem(STORAGE_KEYS.registeredUsers, JSON.stringify(registered));

        // Set current user
        localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(userData));
        setUser(userData);
        return { success: true, role: formData.role, verificationStatus: userData.verificationStatus };
    };

    // ── Submit Verification ──
    const submitVerification = (verificationData, documents) => {
        if (!user) return { success: false };

        const verifications = JSON.parse(localStorage.getItem(STORAGE_KEYS.verifications) || '[]');

        // Check if already submitted — update existing or add new
        const existingIndex = verifications.findIndex(v => v.email === user.email);
        const submission = {
            id: existingIndex >= 0 ? verifications[existingIndex].id : `VR-${String(verifications.length + 1).padStart(3, '0')}`,
            email: user.email,
            name: user.name,
            role: user.role,
            phone: user.phone,
            city: user.city,
            submittedDate: new Date().toISOString().split('T')[0],
            status: 'pending',
            verificationData,
            documents: documents || [],
            adminNotes: '',
        };

        if (existingIndex >= 0) {
            verifications[existingIndex] = submission;
        } else {
            verifications.push(submission);
        }

        localStorage.setItem(STORAGE_KEYS.verifications, JSON.stringify(verifications));

        // Update user status
        const updatedUser = { ...user, verificationStatus: 'pending' };
        localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(updatedUser));
        setUser(updatedUser);

        // Also update registered users
        const registered = JSON.parse(localStorage.getItem(STORAGE_KEYS.registeredUsers) || '[]');
        const userIndex = registered.findIndex(u => u.email === user.email);
        if (userIndex >= 0) {
            registered[userIndex].verificationStatus = 'pending';
            localStorage.setItem(STORAGE_KEYS.registeredUsers, JSON.stringify(registered));
        }

        return { success: true };
    };

    // ── Get Verification Data for current user ──
    const getMyVerification = () => {
        if (!user) return null;
        const verifications = JSON.parse(localStorage.getItem(STORAGE_KEYS.verifications) || '[]');
        return verifications.find(v => v.email === user.email) || null;
    };

    // ── Admin: Get all verification requests ──
    const getVerificationRequests = () => {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.verifications) || '[]');
    };

    // ── Admin: Update verification status ──
    const updateVerificationStatus = (requestId, newStatus, notes = '') => {
        const verifications = JSON.parse(localStorage.getItem(STORAGE_KEYS.verifications) || '[]');
        const index = verifications.findIndex(v => v.id === requestId);
        if (index < 0) return { success: false };

        verifications[index].status = newStatus;
        verifications[index].adminNotes = notes;
        verifications[index].reviewedDate = new Date().toISOString().split('T')[0];

        localStorage.setItem(STORAGE_KEYS.verifications, JSON.stringify(verifications));

        // If the currently logged-in user's verification was updated
        if (user && verifications[index].email === user.email) {
            const updatedUser = { ...user, verificationStatus: newStatus };
            localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(updatedUser));
            setUser(updatedUser);
        }

        // Also update registered users if they exist
        const registered = JSON.parse(localStorage.getItem(STORAGE_KEYS.registeredUsers) || '[]');
        const userIndex = registered.findIndex(u => u.email === verifications[index].email);
        if (userIndex >= 0) {
            registered[userIndex].verificationStatus = newStatus;
            localStorage.setItem(STORAGE_KEYS.registeredUsers, JSON.stringify(registered));
        }

        return { success: true };
    };

    // ── Admin: Get all users ──
    const getAllUsers = () => {
        const staticUsers = credentials.filter(c => c.role !== 'admin').map(c => ({
            email: c.email,
            name: c.name,
            role: c.role,
            verificationStatus: c.verificationStatus,
            source: 'static',
        }));
        const dynamicUsers = JSON.parse(localStorage.getItem(STORAGE_KEYS.registeredUsers) || '[]').map(u => ({
            email: u.email,
            name: u.name,
            role: u.role,
            verificationStatus: u.verificationStatus,
            source: 'registered',
        }));
        return [...staticUsers, ...dynamicUsers];
    };

    // ── Logout ──
    const logout = () => {
        localStorage.removeItem(STORAGE_KEYS.user);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                role: user?.role || null,
                verificationStatus: user?.verificationStatus || null,
                isAuthenticated: !!user,
                isLoading,
                login,
                register,
                logout,
                submitVerification,
                getMyVerification,
                getVerificationRequests,
                updateVerificationStatus,
                getAllUsers,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
