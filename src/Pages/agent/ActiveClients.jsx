import { useAuth } from '../../context/AuthContext';
import { adminServiceListings } from '../../data/adminData';
import { Mail, Phone, Clock, CalendarCheck, Users, DollarSign, Star, MapPin, Package } from 'lucide-react';

const ROLE_CONFIG = {
    hotel_provider: { label: 'Hotel', gradient: 'from-rose-500 to-pink-600', clientLabel: 'Guests', bookingLabel: 'Reservations' },
    car_rental: { label: 'Car Rental', gradient: 'from-emerald-500 to-emerald-600', clientLabel: 'Renters', bookingLabel: 'Active Rentals' },
    trip_provider: { label: 'Trip', gradient: 'from-amber-500 to-orange-500', clientLabel: 'Travelers', bookingLabel: 'Active Trips' },
    umrah_provider: { label: 'Umrah', gradient: 'from-teal-500 to-cyan-600', clientLabel: 'Pilgrims', bookingLabel: 'Active Packages' },
    travel_agency: { label: 'Agency', gradient: 'from-blue-500 to-indigo-600', clientLabel: 'Clients', bookingLabel: 'Active Cases' },
    individual_agent: { label: 'Agent', gradient: 'from-indigo-500 to-indigo-600', clientLabel: 'Clients', bookingLabel: 'Active Cases' },
};

// Generate role-specific client data from listings
const generateClients = (role, listings) => {
    const clientNames = {
        hotel_provider: [
            { name: 'Ahmad Raza', service: 'Deluxe Room · 3 Nights', status: 'Checked In', progress: 60 },
            { name: 'Fatima Noor', service: 'Premium Suite · 5 Nights', status: 'Arriving Tomorrow', progress: 10 },
            { name: 'Usman Tariq', service: 'Standard Room · 2 Nights', status: 'Checked In', progress: 80 },
            { name: 'Saba Mirza', service: 'Executive Room · 4 Nights', status: 'Confirmed', progress: 25 },
        ],
        car_rental: [
            { name: 'Bilal Khan', service: 'Toyota Corolla · 7 Days', status: 'Active Rental', progress: 70 },
            { name: 'Zainab Fatima', service: 'Land Cruiser · Weekend', status: 'Active Rental', progress: 50 },
            { name: 'Sara Javed', service: 'Suzuki Alto · Monthly', status: 'Active Rental', progress: 30 },
            { name: 'Ahmed Ali', service: 'Honda Civic · 3 Days', status: 'Returning Today', progress: 95 },
        ],
        trip_provider: [
            { name: 'Kamran Shah', service: 'Hunza Valley Tour · 5 Days', status: 'On Trip', progress: 60 },
            { name: 'Hira Batool', service: 'Fairy Meadows Trek · 3 Days', status: 'On Trip', progress: 40 },
            { name: 'Zain Sheikh', service: 'Skardu & Deosai · 7 Days', status: 'Departing Soon', progress: 15 },
            { name: 'Omar Hayat', service: 'Neelum Valley · 2 Days', status: 'Returning', progress: 90 },
        ],
        umrah_provider: [
            { name: 'Haji Muhammad', service: 'Premium Umrah · 14 Days', status: 'In Makkah', progress: 50 },
            { name: 'Amina Bibi', service: 'Economy Package · 10 Days', status: 'In Madinah', progress: 70 },
            { name: 'Tariq Mehmood', service: 'Family Package · 12 Days', status: 'Flight Tomorrow', progress: 10 },
            { name: 'Khadija Nawaz', service: 'Ramadan Special · 15 Days', status: 'Returning', progress: 90 },
        ],
        travel_agency: [
            { name: 'Asad Mehmood', service: 'Turkey Visit Visa', status: 'Documents Submitted', progress: 60 },
            { name: 'Rabia Shafiq', service: 'UAE Visit Visa', status: 'Under Processing', progress: 40 },
            { name: 'Junaid Khan', service: 'London Flight Booking', status: 'Ticket Issued', progress: 95 },
            { name: 'Maria Ahmed', service: 'Thailand Tour + Visa', status: 'Visa Pending', progress: 30 },
            { name: 'Hassan Raza', service: 'Canada Study File', status: 'File Preparation', progress: 20 },
        ],
        individual_agent: [
            { name: 'Sana Malik', service: 'UAE Visa Assistance', status: 'Under Processing', progress: 55 },
            { name: 'Imran Shah', service: 'Malaysia eVisa', status: 'Documents Ready', progress: 75 },
            { name: 'Nadia Bukhari', service: 'Travel Consultation', status: 'In Progress', progress: 40 },
            { name: 'Waqas Ali', service: 'Flight Deal Finder', status: 'Searching', progress: 30 },
        ],
    };

    return (clientNames[role] || clientNames.travel_agency).map((c, i) => ({
        id: `CL-${String(i + 1).padStart(3, '0')}`,
        ...c,
        email: `${c.name.split(' ')[0].toLowerCase()}@email.com`,
        phone: `+92 3${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)} ${Math.floor(1000000 + Math.random() * 9000000)}`,
        startDate: `2026-02-${String(28 - i * 3).padStart(2, '0')}`,
    }));
};

const ActiveClients = () => {
    const { user } = useAuth();
    const role = user?.role || 'agent';
    const config = ROLE_CONFIG[role] || ROLE_CONFIG.travel_agency;
    const listings = adminServiceListings[role] || [];
    const clients = generateClients(role, listings);

    return (
        <div className="space-y-6 max-w-7xl">
            <div>
                <h1 className="text-xl font-bold text-gray-900">{config.clientLabel}</h1>
                <p className="text-sm text-gray-500 mt-0.5">Currently active {config.bookingLabel.toLowerCase()}</p>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: `Active ${config.clientLabel}`, value: clients.length, icon: Users, bg: 'bg-blue-50 text-blue-600' },
                    { label: config.bookingLabel, value: clients.filter(c => c.progress > 0 && c.progress < 100).length, icon: CalendarCheck, bg: 'bg-emerald-50 text-emerald-600' },
                    { label: 'Completing Today', value: clients.filter(c => c.progress >= 90).length, icon: Clock, bg: 'bg-amber-50 text-amber-600' },
                    { label: 'New This Week', value: clients.filter(c => c.progress < 30).length, icon: Package, bg: 'bg-purple-50 text-purple-600' },
                ].map((s, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                            <s.icon size={18} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">{s.label}</p>
                            <p className="text-lg font-bold text-gray-900">{s.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {clients.map((client) => (
                    <div key={client.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white font-bold text-lg`}>
                                    {client.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-gray-900">{client.name}</h3>
                                    <p className="text-sm text-gray-500">{client.service}</p>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${client.progress >= 80 ? 'bg-emerald-50 text-emerald-700' :
                                client.progress >= 50 ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>
                                {client.status}
                            </span>
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between text-xs mb-1.5">
                                <span className="text-gray-500">Progress</span>
                                <span className="font-semibold text-gray-700">{client.progress}%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full bg-gradient-to-r ${config.gradient} transition-all duration-500`}
                                    style={{ width: `${client.progress}%` }} />
                            </div>
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                                <Clock size={14} className="text-gray-400" />
                                <span>Started: {client.startDate}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Mail size={14} className="text-gray-400" />
                                <span>{client.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Phone size={14} className="text-gray-400" />
                                <span>{client.phone}</span>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                            <button className={`flex-1 py-2 rounded-xl bg-gradient-to-r ${config.gradient} text-white text-sm font-medium hover:opacity-90 transition-opacity`}>
                                View Details
                            </button>
                            <button className="flex-1 py-2 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
                                Contact
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActiveClients;
