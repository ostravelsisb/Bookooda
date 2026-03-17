import { useAuth } from '../../context/AuthContext';
import { adminServiceListings } from '../../data/adminData';
import {
    User, Mail, Phone, MapPin, Briefcase, Camera, Save, Globe, Shield,
    Hotel, Car, Map, Moon, Plane, UserCircle, Star, CheckCircle, Package
} from 'lucide-react';

const ROLE_CONFIG = {
    hotel_provider: {
        label: 'Hotel Provider',
        gradient: 'from-rose-500 to-pink-600',
        icon: Hotel,
        businessLabel: 'Hotel Details',
        businessFields: [
            { label: 'Hotel Name', key: 'hotelName', placeholder: 'Enter hotel name' },
            { label: 'Hotel Type', key: 'hotelType', placeholder: 'e.g., 4 Star, Boutique' },
            { label: 'Total Rooms', key: 'totalRooms', placeholder: 'Number of rooms' },
            { label: 'Check-in Time', key: 'checkIn', placeholder: 'e.g., 2:00 PM' },
        ],
        specialities: ['Standard Rooms', 'Deluxe Rooms', 'Suites', 'Banquet Hall', 'Restaurant', 'Spa'],
    },
    car_rental: {
        label: 'Car Rental Provider',
        gradient: 'from-emerald-500 to-emerald-600',
        icon: Car,
        businessLabel: 'Fleet Details',
        businessFields: [
            { label: 'Company Name', key: 'companyName', placeholder: 'Enter company name' },
            { label: 'Fleet Size', key: 'fleetSize', placeholder: 'Total vehicles' },
            { label: 'Operating Cities', key: 'cities', placeholder: 'e.g., Islamabad, Lahore' },
            { label: 'License Number', key: 'license', placeholder: 'Rental license #' },
        ],
        specialities: ['Sedan', 'SUV', 'Hatchback', 'Luxury', 'Van', 'With Driver'],
    },
    trip_provider: {
        label: 'Trip Provider',
        gradient: 'from-amber-500 to-orange-500',
        icon: Map,
        businessLabel: 'Tour Operations',
        businessFields: [
            { label: 'Company Name', key: 'companyName', placeholder: 'Enter company name' },
            { label: 'Operating Regions', key: 'regions', placeholder: 'e.g., Northern Pakistan' },
            { label: 'Tour License', key: 'license', placeholder: 'Tour operator license #' },
            { label: 'Years Experience', key: 'experience', placeholder: 'Years of operation' },
        ],
        specialities: ['Mountain Tours', 'Valley Trips', 'Adventure', 'Trekking', 'Camping', 'Family Tours'],
    },
    umrah_provider: {
        label: 'Umrah Provider',
        gradient: 'from-teal-500 to-cyan-600',
        icon: Moon,
        businessLabel: 'Umrah Operations',
        businessFields: [
            { label: 'Company Name', key: 'companyName', placeholder: 'Enter company name' },
            { label: 'Ministry Approval #', key: 'approvalNo', placeholder: 'Government approval' },
            { label: 'Saudi Partner', key: 'saudiPartner', placeholder: 'KSA partner company' },
            { label: 'Years Experience', key: 'experience', placeholder: 'Years of service' },
        ],
        specialities: ['Economy Package', 'Premium Package', 'Family Package', 'Ramadan Special', 'VIP Service'],
    },
    travel_agency: {
        label: 'Travel Agency',
        gradient: 'from-blue-500 to-indigo-600',
        icon: Plane,
        businessLabel: 'Agency Details',
        businessFields: [
            { label: 'Agency Name', key: 'agencyName', placeholder: 'Enter agency name' },
            { label: 'License Number', key: 'license', placeholder: 'IATA / License #' },
            { label: 'Website', key: 'website', placeholder: 'https://' },
            { label: 'Years of Operation', key: 'years', placeholder: 'Years in business' },
        ],
        specialities: ['Visa Processing', 'Flight Booking', 'Hotel Reservations', 'Tour Packages', 'Study Files', 'Travel Insurance'],
    },
    individual_agent: {
        label: 'Individual Agent',
        gradient: 'from-indigo-500 to-indigo-600',
        icon: UserCircle,
        businessLabel: 'Professional Details',
        businessFields: [
            { label: 'Specialization', key: 'specialization', placeholder: 'e.g., Visa Processing' },
            { label: 'CNIC Number', key: 'cnic', placeholder: 'XXXXX-XXXXXXX-X' },
            { label: 'Experience', key: 'experience', placeholder: 'Years of experience' },
            { label: 'Portfolio/LinkedIn', key: 'portfolio', placeholder: 'URL' },
        ],
        specialities: ['Visa Assistance', 'Flight Deals', 'Travel Consultation', 'eVisa Processing'],
    },
};

const AgentProfile = () => {
    const { user } = useAuth();
    const role = user?.role || 'agent';
    const config = ROLE_CONFIG[role] || ROLE_CONFIG.travel_agency;
    const RoleIcon = config.icon || Briefcase;
    const listings = adminServiceListings[role] || [];

    // Calculate profile stats
    const totalBookings = listings.reduce((a, l) => a + (l.bookings || 0), 0);
    const avgRating = listings.length > 0
        ? (listings.reduce((a, l) => a + (l.rating || 0), 0) / listings.filter(l => l.rating).length).toFixed(1)
        : '0.0';
    const totalRevenue = listings.reduce((a, l) => a + (l.revenue || 0), 0);

    return (
        <div className="space-y-6 max-w-3xl">
            <div>
                <h1 className="text-xl font-bold text-gray-900">{config.label} Profile</h1>
                <p className="text-sm text-gray-500 mt-0.5">Manage your {config.label.toLowerCase()} profile and business details</p>
            </div>

            {/* Avatar + Stats section */}
            <div className={`bg-gradient-to-r ${config.gradient} rounded-2xl shadow-sm p-6 text-white`}>
                <div className="flex items-center gap-5 mb-5">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-white text-2xl font-bold border border-white/20">
                            {user?.name?.charAt(0) || 'A'}
                        </div>
                        <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white text-gray-700 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors">
                            <Camera size={14} />
                        </button>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold">{user?.name}</h2>
                        <p className="text-white/80 text-sm">{user?.email}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                            <span className="px-2.5 py-1 bg-white/15 rounded-lg text-xs font-medium flex items-center gap-1">
                                <RoleIcon size={12} /> {config.label}
                            </span>
                            {user?.verificationStatus === 'approved' && (
                                <span className="px-2.5 py-1 bg-green-500/20 rounded-lg text-xs font-medium flex items-center gap-1">
                                    <CheckCircle size={12} /> Verified
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                        <p className="text-2xl font-bold">{listings.length}</p>
                        <p className="text-xs text-white/70">Active Listings</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                        <p className="text-2xl font-bold">{totalBookings}</p>
                        <p className="text-xs text-white/70">Total Bookings</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                        <p className="text-2xl font-bold flex items-center justify-center gap-1"><Star size={16} className="fill-white" /> {avgRating}</p>
                        <p className="text-xs text-white/70">Avg Rating</p>
                    </div>
                </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-5">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                        { label: 'Full Name', icon: User, value: user?.name || '', placeholder: 'Enter full name' },
                        { label: 'Email', icon: Mail, value: user?.email || '', placeholder: 'Enter email' },
                        { label: 'Phone', icon: Phone, value: user?.phone || '+92 321 9876543', placeholder: 'Enter phone' },
                        { label: 'City', icon: MapPin, value: user?.city || 'Karachi', placeholder: 'Enter city' },
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
            </div>

            {/* Role-Specific Business Details */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-5 flex items-center gap-2">
                    <RoleIcon size={18} className="text-blue-500" />
                    {config.businessLabel}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {config.businessFields.map((field, i) => (
                        <div key={i}>
                            <label className="text-sm font-medium text-gray-700 mb-1.5 block">{field.label}</label>
                            <input
                                type="text"
                                placeholder={field.placeholder}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Services / Specialities - Role Specific */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4">
                    {role === 'hotel_provider' ? 'Facilities & Amenities' :
                        role === 'car_rental' ? 'Vehicle Types' :
                            role === 'trip_provider' ? 'Trip Categories' :
                                role === 'umrah_provider' ? 'Package Types' :
                                    'Services Offered'}
                </h3>
                <div className="flex flex-wrap gap-2">
                    {config.specialities.map((s) => (
                        <span key={s} className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 text-xs font-medium">
                            {s}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex justify-end">
                <button className={`flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r ${config.gradient} text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity shadow-lg`}>
                    <Save size={16} /> Save Changes
                </button>
            </div>
        </div>
    );
};

export default AgentProfile;
