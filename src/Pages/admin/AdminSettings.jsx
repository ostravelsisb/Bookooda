import React, { useState } from 'react';
import {
    Settings, Globe, Shield, CreditCard, Bell, Users, Lock,
    Mail, Palette, Database, ChevronRight, Save, ToggleLeft,
    ToggleRight, Eye, EyeOff, Copy, Check, AlertTriangle,
    Zap, FileText, Percent, Clock, MapPin, Phone, Link2,
    Upload, RefreshCw, Smartphone, Key, Server, HelpCircle
} from 'lucide-react';

// ── Settings Sections ──
const TABS = [
    { key: 'general', label: 'General', icon: Globe },
    { key: 'verification', label: 'Verification', icon: Shield },
    { key: 'payments', label: 'Payments & Commission', icon: CreditCard },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'security', label: 'Security', icon: Lock },
    { key: 'users', label: 'User Management', icon: Users },
    { key: 'appearance', label: 'Appearance', icon: Palette },
    { key: 'integrations', label: 'Integrations', icon: Link2 },
];

// Toggle component
const Toggle = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
        <div>
            <p className="text-sm font-medium text-gray-900">{label}</p>
            {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
        </div>
        <button
            onClick={() => onChange(!enabled)}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${enabled ? 'bg-blue-600' : 'bg-gray-300'}`}
        >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${enabled ? 'translate-x-5' : ''}`} />
        </button>
    </div>
);

// Input field
const SettingInput = ({ label, value, onChange, type = 'text', placeholder, helpText, icon: Icon }) => (
    <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="relative">
            {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />}
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white`}
            />
        </div>
        {helpText && <p className="text-xs text-gray-400">{helpText}</p>}
    </div>
);

// Select field
const SettingSelect = ({ label, value, onChange, options, helpText }) => (
    <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white"
        >
            {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        {helpText && <p className="text-xs text-gray-400">{helpText}</p>}
    </div>
);

// Settings card
const SettingsCard = ({ title, description, icon: Icon, children, danger }) => (
    <div className={`bg-white rounded-2xl border ${danger ? 'border-red-200' : 'border-gray-200'} shadow-sm overflow-hidden`}>
        <div className={`px-6 py-4 border-b ${danger ? 'border-red-100 bg-red-50/30' : 'border-gray-100'}`}>
            <div className="flex items-center gap-3">
                {Icon && (
                    <div className={`w-9 h-9 rounded-xl ${danger ? 'bg-red-100' : 'bg-blue-50'} flex items-center justify-center`}>
                        <Icon className={`w-4.5 h-4.5 ${danger ? 'text-red-600' : 'text-blue-600'}`} />
                    </div>
                )}
                <div>
                    <h3 className={`font-semibold ${danger ? 'text-red-900' : 'text-gray-900'}`}>{title}</h3>
                    {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
                </div>
            </div>
        </div>
        <div className="px-6 py-5 space-y-4">{children}</div>
    </div>
);

const AdminSettings = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [saveLoading, setSaveLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    // ── General Settings State ──
    const [general, setGeneral] = useState({
        siteName: 'Bookooda',
        tagline: 'Pakistan\'s #1 Travel & Visa Marketplace',
        siteUrl: 'https://bookooda.com',
        supportEmail: 'support@bookooda.com',
        supportPhone: '+92 42 35678901',
        address: 'Office 301, Arfa Tower, Lahore, Pakistan',
        timezone: 'Asia/Karachi',
        language: 'en',
        currency: 'PKR',
    });

    // ── Verification Settings ──
    const [verification, setVerification] = useState({
        autoApproveCustomers: true,
        requireDocuments: true,
        maxDocumentSize: '10',
        allowedFormats: 'jpg,png,pdf',
        reviewDeadlineDays: '3',
        enableResubmission: true,
        notifyOnSubmission: true,
        notifyOnStatusChange: true,
        requireCNIC: true,
        requireBusinessLicense: true,
    });

    // ── Payment Settings ──
    const [payments, setPayments] = useState({
        defaultCommission: '15',
        hotelCommission: '12',
        carCommission: '10',
        tripCommission: '15',
        umrahCommission: '8',
        agencyCommission: '15',
        agentCommission: '20',
        paymentGateway: 'stripe',
        enableEasyPaisa: true,
        enableJazzCash: true,
        enableBankTransfer: true,
        enableCreditCard: true,
        payoutSchedule: 'weekly',
        minimumPayout: '5000',
        taxRate: '5',
    });

    // ── Notification Settings ──
    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        smsNotifications: true,
        pushNotifications: false,
        adminAlertNewUser: true,
        adminAlertNewVerification: true,
        adminAlertPayment: true,
        userWelcomeEmail: true,
        userBookingConfirmation: true,
        userVerificationUpdate: true,
        providerNewBooking: true,
        providerPayoutNotification: true,
        digestFrequency: 'daily',
        smtpHost: 'smtp.bookooda.com',
        smtpPort: '587',
        senderName: 'Bookooda',
        senderEmail: 'noreply@bookooda.com',
    });

    // ── Security Settings ──
    const [security, setSecurity] = useState({
        twoFactorAuth: false,
        sessionTimeout: '60',
        maxLoginAttempts: '5',
        lockoutDuration: '30',
        passwordMinLength: '8',
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialChars: false,
        enableCaptcha: true,
        ipWhitelist: '',
        forceHttps: true,
        enableAuditLog: true,
    });

    // ── User Management ──
    const [userMgmt, setUserMgmt] = useState({
        enableRegistration: true,
        defaultRole: 'customer',
        requireEmailVerification: true,
        enableSocialLogin: false,
        maxActiveSessionsPerUser: '3',
        enableUserSuspension: true,
        autoSuspendInactive: false,
        inactiveDays: '180',
        enableProfileDeletion: true,
    });

    // ── Appearance ──
    const [appearance, setAppearance] = useState({
        primaryColor: '#2563EB',
        accentColor: '#6366F1',
        darkMode: false,
        showFooterBranding: true,
        heroStyle: 'gradient',
        defaultDashboardView: 'cards',
        enableAnimations: true,
        compactSidebar: false,
    });

    // ── Integrations ──
    const [integrations, setIntegrations] = useState({
        googleMapsKey: '',
        stripePublicKey: '',
        stripeSecretKey: '',
        twilioSid: '',
        twilioToken: '',
        firebaseProjectId: '',
        googleAnalyticsId: '',
        facebookPixelId: '',
        whatsappBusinessId: '',
        enableWhatsapp: false,
    });

    const handleSave = () => {
        setSaveLoading(true);
        setTimeout(() => {
            setSaveLoading(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        }, 800);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'general':
                return (
                    <div className="space-y-6">
                        <SettingsCard title="Platform Information" description="Basic details about your marketplace" icon={Globe}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <SettingInput label="Site Name" value={general.siteName} onChange={(v) => setGeneral(p => ({ ...p, siteName: v }))} icon={Globe} />
                                <SettingInput label="Site URL" value={general.siteUrl} onChange={(v) => setGeneral(p => ({ ...p, siteUrl: v }))} icon={Link2} />
                            </div>
                            <SettingInput label="Tagline" value={general.tagline} onChange={(v) => setGeneral(p => ({ ...p, tagline: v }))} placeholder="Short description of your platform" />
                        </SettingsCard>

                        <SettingsCard title="Contact Information" description="Support channels for users" icon={Phone}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <SettingInput label="Support Email" value={general.supportEmail} onChange={(v) => setGeneral(p => ({ ...p, supportEmail: v }))} icon={Mail} type="email" />
                                <SettingInput label="Support Phone" value={general.supportPhone} onChange={(v) => setGeneral(p => ({ ...p, supportPhone: v }))} icon={Phone} />
                            </div>
                            <SettingInput label="Office Address" value={general.address} onChange={(v) => setGeneral(p => ({ ...p, address: v }))} icon={MapPin} />
                        </SettingsCard>

                        <SettingsCard title="Regional Settings" description="Timezone, language and currency" icon={MapPin}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <SettingSelect label="Timezone" value={general.timezone} onChange={(v) => setGeneral(p => ({ ...p, timezone: v }))} options={[
                                    { value: 'Asia/Karachi', label: 'Pakistan (UTC+5)' },
                                    { value: 'Asia/Dubai', label: 'UAE (UTC+4)' },
                                    { value: 'Asia/Riyadh', label: 'Saudi Arabia (UTC+3)' },
                                    { value: 'UTC', label: 'UTC' },
                                ]} />
                                <SettingSelect label="Language" value={general.language} onChange={(v) => setGeneral(p => ({ ...p, language: v }))} options={[
                                    { value: 'en', label: 'English' },
                                    { value: 'ur', label: 'Urdu' },
                                    { value: 'ar', label: 'Arabic' },
                                ]} />
                                <SettingSelect label="Currency" value={general.currency} onChange={(v) => setGeneral(p => ({ ...p, currency: v }))} options={[
                                    { value: 'PKR', label: 'PKR (₨)' },
                                    { value: 'USD', label: 'USD ($)' },
                                    { value: 'SAR', label: 'SAR (﷼)' },
                                    { value: 'AED', label: 'AED (د.إ)' },
                                ]} />
                            </div>
                        </SettingsCard>
                    </div>
                );

            case 'verification':
                return (
                    <div className="space-y-6">
                        <SettingsCard title="Verification Rules" description="Configure how provider verification works" icon={Shield}>
                            <Toggle label="Auto-approve Customers" description="Customers skip the verification process entirely" enabled={verification.autoApproveCustomers} onChange={(v) => setVerification(p => ({ ...p, autoApproveCustomers: v }))} />
                            <Toggle label="Require Document Uploads" description="Providers must upload supporting documents" enabled={verification.requireDocuments} onChange={(v) => setVerification(p => ({ ...p, requireDocuments: v }))} />
                            <Toggle label="Require CNIC" description="All providers must submit CNIC copy" enabled={verification.requireCNIC} onChange={(v) => setVerification(p => ({ ...p, requireCNIC: v }))} />
                            <Toggle label="Require Business License" description="Agencies and companies must provide business license" enabled={verification.requireBusinessLicense} onChange={(v) => setVerification(p => ({ ...p, requireBusinessLicense: v }))} />
                            <Toggle label="Allow Resubmission" description="Rejected applicants can resubmit with corrected info" enabled={verification.enableResubmission} onChange={(v) => setVerification(p => ({ ...p, enableResubmission: v }))} />
                        </SettingsCard>

                        <SettingsCard title="Document Settings" description="File upload requirements" icon={FileText}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <SettingInput label="Max Document Size (MB)" value={verification.maxDocumentSize} onChange={(v) => setVerification(p => ({ ...p, maxDocumentSize: v }))} type="number" helpText="Maximum file size per upload" />
                                <SettingInput label="Allowed Formats" value={verification.allowedFormats} onChange={(v) => setVerification(p => ({ ...p, allowedFormats: v }))} helpText="Comma-separated extensions" />
                                <SettingInput label="Review Deadline (Days)" value={verification.reviewDeadlineDays} onChange={(v) => setVerification(p => ({ ...p, reviewDeadlineDays: v }))} type="number" helpText="SLA for admin review" icon={Clock} />
                            </div>
                        </SettingsCard>

                        <SettingsCard title="Verification Notifications" description="Alert admins and users about verification events" icon={Bell}>
                            <Toggle label="Notify Admin on New Submission" description="Send email to admin when a new request comes in" enabled={verification.notifyOnSubmission} onChange={(v) => setVerification(p => ({ ...p, notifyOnSubmission: v }))} />
                            <Toggle label="Notify User on Status Change" description="Send email when verification is approved/rejected" enabled={verification.notifyOnStatusChange} onChange={(v) => setVerification(p => ({ ...p, notifyOnStatusChange: v }))} />
                        </SettingsCard>
                    </div>
                );

            case 'payments':
                return (
                    <div className="space-y-6">
                        <SettingsCard title="Commission Rates" description="Platform fee per service category" icon={Percent}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <SettingInput label="Default Commission (%)" value={payments.defaultCommission} onChange={(v) => setPayments(p => ({ ...p, defaultCommission: v }))} type="number" icon={Percent} />
                                <SettingInput label="Hotel Commission (%)" value={payments.hotelCommission} onChange={(v) => setPayments(p => ({ ...p, hotelCommission: v }))} type="number" icon={Percent} />
                                <SettingInput label="Car Rental Commission (%)" value={payments.carCommission} onChange={(v) => setPayments(p => ({ ...p, carCommission: v }))} type="number" icon={Percent} />
                                <SettingInput label="Trip Commission (%)" value={payments.tripCommission} onChange={(v) => setPayments(p => ({ ...p, tripCommission: v }))} type="number" icon={Percent} />
                                <SettingInput label="Umrah Commission (%)" value={payments.umrahCommission} onChange={(v) => setPayments(p => ({ ...p, umrahCommission: v }))} type="number" icon={Percent} />
                                <SettingInput label="Agency Commission (%)" value={payments.agencyCommission} onChange={(v) => setPayments(p => ({ ...p, agencyCommission: v }))} type="number" icon={Percent} />
                                <SettingInput label="Individual Agent Commission (%)" value={payments.agentCommission} onChange={(v) => setPayments(p => ({ ...p, agentCommission: v }))} type="number" icon={Percent} />
                                <SettingInput label="Tax Rate (%)" value={payments.taxRate} onChange={(v) => setPayments(p => ({ ...p, taxRate: v }))} type="number" icon={Percent} helpText="Applied to all transactions" />
                            </div>
                        </SettingsCard>

                        <SettingsCard title="Payment Methods" description="Enabled payment channels" icon={CreditCard}>
                            <Toggle label="Credit / Debit Cards" description="Accept Visa, Mastercard, UnionPay" enabled={payments.enableCreditCard} onChange={(v) => setPayments(p => ({ ...p, enableCreditCard: v }))} />
                            <Toggle label="EasyPaisa" description="Mobile wallet payments via EasyPaisa" enabled={payments.enableEasyPaisa} onChange={(v) => setPayments(p => ({ ...p, enableEasyPaisa: v }))} />
                            <Toggle label="JazzCash" description="Mobile wallet payments via JazzCash" enabled={payments.enableJazzCash} onChange={(v) => setPayments(p => ({ ...p, enableJazzCash: v }))} />
                            <Toggle label="Bank Transfer" description="Direct bank wire transfers" enabled={payments.enableBankTransfer} onChange={(v) => setPayments(p => ({ ...p, enableBankTransfer: v }))} />
                        </SettingsCard>

                        <SettingsCard title="Payout Settings" description="How and when providers get paid" icon={CreditCard}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <SettingSelect label="Payout Schedule" value={payments.payoutSchedule} onChange={(v) => setPayments(p => ({ ...p, payoutSchedule: v }))} options={[
                                    { value: 'daily', label: 'Daily' },
                                    { value: 'weekly', label: 'Weekly' },
                                    { value: 'biweekly', label: 'Bi-Weekly' },
                                    { value: 'monthly', label: 'Monthly' },
                                ]} />
                                <SettingInput label="Minimum Payout (PKR)" value={payments.minimumPayout} onChange={(v) => setPayments(p => ({ ...p, minimumPayout: v }))} type="number" icon={CreditCard} helpText="Minimum amount for payout" />
                            </div>
                        </SettingsCard>
                    </div>
                );

            case 'notifications':
                return (
                    <div className="space-y-6">
                        <SettingsCard title="Notification Channels" description="Enable or disable notification types" icon={Bell}>
                            <Toggle label="Email Notifications" description="Send notifications via email" enabled={notifications.emailNotifications} onChange={(v) => setNotifications(p => ({ ...p, emailNotifications: v }))} />
                            <Toggle label="SMS Notifications" description="Send notifications via SMS (charges apply)" enabled={notifications.smsNotifications} onChange={(v) => setNotifications(p => ({ ...p, smsNotifications: v }))} />
                            <Toggle label="Push Notifications" description="Browser push notifications for real-time alerts" enabled={notifications.pushNotifications} onChange={(v) => setNotifications(p => ({ ...p, pushNotifications: v }))} />
                        </SettingsCard>

                        <SettingsCard title="Admin Alerts" description="What admins get notified about" icon={Zap}>
                            <Toggle label="New User Registration" description="Alert when a new user signs up" enabled={notifications.adminAlertNewUser} onChange={(v) => setNotifications(p => ({ ...p, adminAlertNewUser: v }))} />
                            <Toggle label="New Verification Request" description="Alert when a provider submits verification" enabled={notifications.adminAlertNewVerification} onChange={(v) => setNotifications(p => ({ ...p, adminAlertNewVerification: v }))} />
                            <Toggle label="Payment Received" description="Alert on successful payment" enabled={notifications.adminAlertPayment} onChange={(v) => setNotifications(p => ({ ...p, adminAlertPayment: v }))} />
                            <SettingSelect label="Digest Frequency" value={notifications.digestFrequency} onChange={(v) => setNotifications(p => ({ ...p, digestFrequency: v }))} options={[
                                { value: 'realtime', label: 'Real-time' },
                                { value: 'hourly', label: 'Hourly Digest' },
                                { value: 'daily', label: 'Daily Digest' },
                                { value: 'weekly', label: 'Weekly Digest' },
                            ]} />
                        </SettingsCard>

                        <SettingsCard title="User Notifications" description="Notifications sent to end users" icon={Users}>
                            <Toggle label="Welcome Email" description="Send welcome email on registration" enabled={notifications.userWelcomeEmail} onChange={(v) => setNotifications(p => ({ ...p, userWelcomeEmail: v }))} />
                            <Toggle label="Booking Confirmation" description="Confirm bookings via email" enabled={notifications.userBookingConfirmation} onChange={(v) => setNotifications(p => ({ ...p, userBookingConfirmation: v }))} />
                            <Toggle label="Verification Status Updates" description="Notify on approval/rejection" enabled={notifications.userVerificationUpdate} onChange={(v) => setNotifications(p => ({ ...p, userVerificationUpdate: v }))} />
                        </SettingsCard>

                        <SettingsCard title="Email Configuration" description="SMTP server settings" icon={Mail}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <SettingInput label="SMTP Host" value={notifications.smtpHost} onChange={(v) => setNotifications(p => ({ ...p, smtpHost: v }))} icon={Server} />
                                <SettingInput label="SMTP Port" value={notifications.smtpPort} onChange={(v) => setNotifications(p => ({ ...p, smtpPort: v }))} />
                                <SettingInput label="Sender Name" value={notifications.senderName} onChange={(v) => setNotifications(p => ({ ...p, senderName: v }))} />
                                <SettingInput label="Sender Email" value={notifications.senderEmail} onChange={(v) => setNotifications(p => ({ ...p, senderEmail: v }))} icon={Mail} />
                            </div>
                        </SettingsCard>
                    </div>
                );

            case 'security':
                return (
                    <div className="space-y-6">
                        <SettingsCard title="Authentication" description="Login and session security" icon={Lock}>
                            <Toggle label="Two-Factor Authentication (2FA)" description="Require 2FA for admin accounts" enabled={security.twoFactorAuth} onChange={(v) => setSecurity(p => ({ ...p, twoFactorAuth: v }))} />
                            <Toggle label="Force HTTPS" description="Redirect all traffic to HTTPS" enabled={security.forceHttps} onChange={(v) => setSecurity(p => ({ ...p, forceHttps: v }))} />
                            <Toggle label="Enable CAPTCHA" description="Show CAPTCHA on login / signup forms" enabled={security.enableCaptcha} onChange={(v) => setSecurity(p => ({ ...p, enableCaptcha: v }))} />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <SettingInput label="Session Timeout (min)" value={security.sessionTimeout} onChange={(v) => setSecurity(p => ({ ...p, sessionTimeout: v }))} type="number" icon={Clock} />
                                <SettingInput label="Max Login Attempts" value={security.maxLoginAttempts} onChange={(v) => setSecurity(p => ({ ...p, maxLoginAttempts: v }))} type="number" />
                                <SettingInput label="Lockout Duration (min)" value={security.lockoutDuration} onChange={(v) => setSecurity(p => ({ ...p, lockoutDuration: v }))} type="number" icon={Clock} />
                            </div>
                        </SettingsCard>

                        <SettingsCard title="Password Policy" description="Requirements for user passwords" icon={Key}>
                            <SettingInput label="Minimum Length" value={security.passwordMinLength} onChange={(v) => setSecurity(p => ({ ...p, passwordMinLength: v }))} type="number" />
                            <Toggle label="Require Uppercase Letters" description="At least one capital letter" enabled={security.requireUppercase} onChange={(v) => setSecurity(p => ({ ...p, requireUppercase: v }))} />
                            <Toggle label="Require Numbers" description="At least one digit" enabled={security.requireNumbers} onChange={(v) => setSecurity(p => ({ ...p, requireNumbers: v }))} />
                            <Toggle label="Require Special Characters" description="At least one special character (!@#$...)" enabled={security.requireSpecialChars} onChange={(v) => setSecurity(p => ({ ...p, requireSpecialChars: v }))} />
                        </SettingsCard>

                        <SettingsCard title="Audit & Monitoring" description="Track admin and user activity" icon={Eye}>
                            <Toggle label="Enable Audit Log" description="Log all admin actions for compliance" enabled={security.enableAuditLog} onChange={(v) => setSecurity(p => ({ ...p, enableAuditLog: v }))} />
                            <SettingInput label="IP Whitelist" value={security.ipWhitelist} onChange={(v) => setSecurity(p => ({ ...p, ipWhitelist: v }))} placeholder="e.g. 192.168.1.0/24, 10.0.0.1" helpText="Comma-separated, leave blank to allow all" />
                        </SettingsCard>
                    </div>
                );

            case 'users':
                return (
                    <div className="space-y-6">
                        <SettingsCard title="Registration" description="Control who can sign up" icon={Users}>
                            <Toggle label="Enable Public Registration" description="Allow new users to sign up without invitation" enabled={userMgmt.enableRegistration} onChange={(v) => setUserMgmt(p => ({ ...p, enableRegistration: v }))} />
                            <Toggle label="Require Email Verification" description="Users must verify email before logging in" enabled={userMgmt.requireEmailVerification} onChange={(v) => setUserMgmt(p => ({ ...p, requireEmailVerification: v }))} />
                            <Toggle label="Enable Social Login" description="Allow Google / Facebook sign-in" enabled={userMgmt.enableSocialLogin} onChange={(v) => setUserMgmt(p => ({ ...p, enableSocialLogin: v }))} />
                            <SettingSelect label="Default Role for New Users" value={userMgmt.defaultRole} onChange={(v) => setUserMgmt(p => ({ ...p, defaultRole: v }))} options={[
                                { value: 'customer', label: 'Customer' },
                                { value: 'travel_agency', label: 'Travel Agency' },
                                { value: 'individual_agent', label: 'Individual Agent' },
                            ]} />
                        </SettingsCard>

                        <SettingsCard title="Session & Activity" description="User session management" icon={Smartphone}>
                            <SettingInput label="Max Active Sessions" value={userMgmt.maxActiveSessionsPerUser} onChange={(v) => setUserMgmt(p => ({ ...p, maxActiveSessionsPerUser: v }))} type="number" helpText="Per user, across all devices" />
                        </SettingsCard>

                        <SettingsCard title="Account Lifecycle" description="Suspension and deletion policies" icon={AlertTriangle} danger>
                            <Toggle label="Allow Admin Suspension" description="Admins can suspend user accounts" enabled={userMgmt.enableUserSuspension} onChange={(v) => setUserMgmt(p => ({ ...p, enableUserSuspension: v }))} />
                            <Toggle label="Auto-Suspend Inactive Users" description="Automatically suspend inactive accounts" enabled={userMgmt.autoSuspendInactive} onChange={(v) => setUserMgmt(p => ({ ...p, autoSuspendInactive: v }))} />
                            {userMgmt.autoSuspendInactive && (
                                <SettingInput label="Inactivity Period (Days)" value={userMgmt.inactiveDays} onChange={(v) => setUserMgmt(p => ({ ...p, inactiveDays: v }))} type="number" helpText="Days before auto-suspension" />
                            )}
                            <Toggle label="Allow Profile Deletion" description="Users can permanently delete their account" enabled={userMgmt.enableProfileDeletion} onChange={(v) => setUserMgmt(p => ({ ...p, enableProfileDeletion: v }))} />
                        </SettingsCard>
                    </div>
                );

            case 'appearance':
                return (
                    <div className="space-y-6">
                        <SettingsCard title="Theme & Colors" description="Customize the look of your platform" icon={Palette}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-700">Primary Color</label>
                                    <div className="flex items-center gap-3">
                                        <input type="color" value={appearance.primaryColor} onChange={(e) => setAppearance(p => ({ ...p, primaryColor: e.target.value }))} className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer" />
                                        <input type="text" value={appearance.primaryColor} onChange={(e) => setAppearance(p => ({ ...p, primaryColor: e.target.value }))} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-mono" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-700">Accent Color</label>
                                    <div className="flex items-center gap-3">
                                        <input type="color" value={appearance.accentColor} onChange={(e) => setAppearance(p => ({ ...p, accentColor: e.target.value }))} className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer" />
                                        <input type="text" value={appearance.accentColor} onChange={(e) => setAppearance(p => ({ ...p, accentColor: e.target.value }))} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-mono" />
                                    </div>
                                </div>
                            </div>
                            {/* Preview */}
                            <div className="mt-4 p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                                <p className="text-xs text-gray-500 mb-2">Preview</p>
                                <div className="flex items-center gap-3">
                                    <div className="px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: appearance.primaryColor }}>Primary Button</div>
                                    <div className="px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: appearance.accentColor }}>Accent Button</div>
                                    <div className="px-4 py-2 rounded-lg border text-sm font-medium" style={{ borderColor: appearance.primaryColor, color: appearance.primaryColor }}>Outline</div>
                                </div>
                            </div>
                        </SettingsCard>

                        <SettingsCard title="Layout Preferences" description="Dashboard display options" icon={Settings}>
                            <Toggle label="Dark Mode" description="Enable dark theme for admin dashboard" enabled={appearance.darkMode} onChange={(v) => setAppearance(p => ({ ...p, darkMode: v }))} />
                            <Toggle label="Enable Animations" description="Smooth transitions and micro-animations" enabled={appearance.enableAnimations} onChange={(v) => setAppearance(p => ({ ...p, enableAnimations: v }))} />
                            <Toggle label="Compact Sidebar" description="Use a narrower sidebar by default" enabled={appearance.compactSidebar} onChange={(v) => setAppearance(p => ({ ...p, compactSidebar: v }))} />
                            <Toggle label="Show Footer Branding" description="Display 'Powered by Bookooda' in footer" enabled={appearance.showFooterBranding} onChange={(v) => setAppearance(p => ({ ...p, showFooterBranding: v }))} />
                            <SettingSelect label="Default Dashboard View" value={appearance.defaultDashboardView} onChange={(v) => setAppearance(p => ({ ...p, defaultDashboardView: v }))} options={[
                                { value: 'cards', label: 'Card View' },
                                { value: 'table', label: 'Table View' },
                                { value: 'compact', label: 'Compact View' },
                            ]} />
                        </SettingsCard>
                    </div>
                );

            case 'integrations':
                return (
                    <div className="space-y-6">
                        <SettingsCard title="Maps" description="Google Maps integration for location services" icon={MapPin}>
                            <SettingInput label="Google Maps API Key" value={integrations.googleMapsKey} onChange={(v) => setIntegrations(p => ({ ...p, googleMapsKey: v }))} icon={Key} placeholder="AIza..." helpText="Required for map features" />
                        </SettingsCard>

                        <SettingsCard title="Payment Gateway" description="Stripe payment processing" icon={CreditCard}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <SettingInput label="Stripe Public Key" value={integrations.stripePublicKey} onChange={(v) => setIntegrations(p => ({ ...p, stripePublicKey: v }))} icon={Key} placeholder="pk_live_..." />
                                <SettingInput label="Stripe Secret Key" value={integrations.stripeSecretKey} onChange={(v) => setIntegrations(p => ({ ...p, stripeSecretKey: v }))} icon={Key} placeholder="sk_live_..." type="password" />
                            </div>
                        </SettingsCard>

                        <SettingsCard title="SMS & Messaging" description="Twilio and WhatsApp integrations" icon={Smartphone}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <SettingInput label="Twilio Account SID" value={integrations.twilioSid} onChange={(v) => setIntegrations(p => ({ ...p, twilioSid: v }))} icon={Key} />
                                <SettingInput label="Twilio Auth Token" value={integrations.twilioToken} onChange={(v) => setIntegrations(p => ({ ...p, twilioToken: v }))} icon={Key} type="password" />
                            </div>
                            <Toggle label="Enable WhatsApp Notifications" description="Send booking updates via WhatsApp Business" enabled={integrations.enableWhatsapp} onChange={(v) => setIntegrations(p => ({ ...p, enableWhatsapp: v }))} />
                            {integrations.enableWhatsapp && (
                                <SettingInput label="WhatsApp Business ID" value={integrations.whatsappBusinessId} onChange={(v) => setIntegrations(p => ({ ...p, whatsappBusinessId: v }))} icon={Smartphone} />
                            )}
                        </SettingsCard>

                        <SettingsCard title="Analytics & Tracking" description="Monitor traffic and conversions" icon={Database}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <SettingInput label="Google Analytics ID" value={integrations.googleAnalyticsId} onChange={(v) => setIntegrations(p => ({ ...p, googleAnalyticsId: v }))} placeholder="G-XXXXXXXXXX" />
                                <SettingInput label="Facebook Pixel ID" value={integrations.facebookPixelId} onChange={(v) => setIntegrations(p => ({ ...p, facebookPixelId: v }))} placeholder="123456789..." />
                                <SettingInput label="Firebase Project ID" value={integrations.firebaseProjectId} onChange={(v) => setIntegrations(p => ({ ...p, firebaseProjectId: v }))} placeholder="bookooda-prod" />
                            </div>
                        </SettingsCard>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                        <Settings className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                        <p className="text-sm text-gray-500 mt-0.5">Configure your platform preferences</p>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saveLoading}
                    className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm shadow-lg transition-all duration-200 ${saved
                            ? 'bg-green-600 text-white shadow-green-500/25'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/25 hover:shadow-xl'
                        } disabled:opacity-70`}
                >
                    {saveLoading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : saved ? (
                        <Check className="w-4 h-4" />
                    ) : (
                        <Save className="w-4 h-4" />
                    )}
                    {saveLoading ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
                </button>
            </div>

            {/* Layout: Sidebar Tabs + Content */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Tab Sidebar */}
                <div className="lg:w-56 shrink-0">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-2 lg:sticky lg:top-6">
                        <nav className="space-y-0.5">
                            {TABS.map(tab => {
                                const TabIcon = tab.icon;
                                const isActive = activeTab === tab.key;
                                return (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveTab(tab.key)}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left
                                            ${isActive
                                                ? 'bg-blue-50 text-blue-700'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        <TabIcon className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                                        <span className="whitespace-nowrap">{tab.label}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 min-w-0">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
