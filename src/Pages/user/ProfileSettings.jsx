import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, MapPin, Camera, Save } from 'lucide-react';

const ProfileSettings = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-6 max-w-3xl">
            <div>
                <h1 className="text-xl font-bold text-gray-900">Profile Settings</h1>
                <p className="text-sm text-gray-500 mt-0.5">Manage your account information</p>
            </div>

            {/* Avatar section */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-5">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors">
                            <Camera size={14} />
                        </button>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">{user?.name}</h2>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                        <p className="text-xs text-emerald-600 font-medium mt-1">● Active Account</p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-5">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                        { label: 'Full Name', icon: User, value: user?.name || '', placeholder: 'Enter full name' },
                        { label: 'Email', icon: Mail, value: user?.email || '', placeholder: 'Enter email' },
                        { label: 'Phone', icon: Phone, value: '+92 300 1234567', placeholder: 'Enter phone' },
                        { label: 'Location', icon: MapPin, value: 'Lahore, Pakistan', placeholder: 'Enter city' },
                    ].map((field, i) => (
                        <div key={i}>
                            <label className="text-sm font-medium text-gray-700 mb-1.5 block">{field.label}</label>
                            <div className="relative">
                                <field.icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    defaultValue={field.value}
                                    placeholder={field.placeholder}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex justify-end">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors">
                        <Save size={16} /> Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
