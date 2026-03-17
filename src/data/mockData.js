// ── Static Credentials ──
export const credentials = [
    { email: 'user@bookooda.com', password: 'password123', role: 'user', name: 'Ali Hassan', avatar: null, verificationStatus: 'approved' },
    { email: 'agent@bookooda.com', password: 'password123', role: 'agent', name: 'Sarah Ahmed', avatar: null, verificationStatus: 'approved' },
    { email: 'agency@bookooda.com', password: 'password123', role: 'travel_agency', name: 'Falcon Travels', avatar: null, verificationStatus: 'approved' },
    { email: 'individual@bookooda.com', password: 'password123', role: 'individual_agent', name: 'Kamran Ali', avatar: null, verificationStatus: 'approved' },
    { email: 'carrental@bookooda.com', password: 'password123', role: 'car_rental', name: 'Prime Rentals', avatar: null, verificationStatus: 'approved' },
    { email: 'trips@bookooda.com', password: 'password123', role: 'trip_provider', name: 'Adventure Pakistan', avatar: null, verificationStatus: 'approved' },
    { email: 'umrah@bookooda.com', password: 'password123', role: 'umrah_provider', name: 'Al-Haramain Travels', avatar: null, verificationStatus: 'approved' },
    { email: 'customer@bookooda.com', password: 'password123', role: 'customer', name: 'Zainab Fatima', avatar: null, verificationStatus: 'approved' },
    { email: 'hotel@bookooda.com', password: 'password123', role: 'hotel_provider', name: 'Pearl Continental', avatar: null, verificationStatus: 'approved' },
    { email: 'admin@bookooda.com', password: 'admin123', role: 'admin', name: 'Super Admin', avatar: null, verificationStatus: 'approved' },
    // Test accounts with different verification statuses
    { email: 'pending@bookooda.com', password: 'password123', role: 'travel_agency', name: 'Pending Agency', avatar: null, verificationStatus: 'pending' },
    { email: 'rejected@bookooda.com', password: 'password123', role: 'car_rental', name: 'Rejected Rentals', avatar: null, verificationStatus: 'rejected' },
];

// ── Verification Requests (Admin View) ──
export const verificationRequests = [
    {
        id: 'VR-001',
        email: 'newagency@test.com',
        name: 'Star Travels',
        role: 'travel_agency',
        submittedDate: '2026-02-28',
        status: 'pending',
        phone: '+92 321 1234567',
        city: 'Lahore',
        verificationData: {
            agencyName: 'Star Travels',
            licenseNumber: 'LIC-2026-4567',
            officeAddress: '45-B, Main Boulevard, Gulberg III, Lahore',
            website: 'https://startravels.pk',
            socialMedia: '@startravels_pk',
            yearsOfOperation: '8',
            servicesOffered: 'Visa Processing, Flight Booking, Hotel Reservations, Tour Packages',
        },
        documents: ['Agency License', 'NTN Certificate', 'CNIC'],
        adminNotes: '',
    },
    {
        id: 'VR-002',
        email: 'hotelking@test.com',
        name: 'Hotel King Palace',
        role: 'hotel_provider',
        submittedDate: '2026-02-25',
        status: 'under_review',
        phone: '+92 300 9876543',
        city: 'Islamabad',
        verificationData: {
            hotelName: 'Hotel King Palace',
            hotelLocation: 'F-7 Markaz, Islamabad',
            businessAddress: 'Plot 23, F-7 Markaz, Islamabad',
            googleMapsLink: 'https://maps.google.com/...',
            hotelType: '4 Star',
            registrationNumber: 'HR-ISB-2024-789',
            yearsInOperation: '12',
            contactNumber: '+92 51 2345678',
            website: 'https://hotelkingpalace.pk',
            description: 'Luxury 4-star hotel in the heart of Islamabad with 120 rooms.',
        },
        documents: ['Business License', 'CNIC', 'Ownership Proof', 'Hotel Images'],
        adminNotes: '',
    },
    {
        id: 'VR-003',
        email: 'rejected@bookooda.com',
        name: 'Rejected Rentals',
        role: 'car_rental',
        submittedDate: '2026-02-20',
        status: 'rejected',
        phone: '+92 333 5551234',
        city: 'Karachi',
        verificationData: {
            companyName: 'Rejected Rentals',
            operatingCities: 'Karachi',
            officeAddress: '123 Shahrah-e-Faisal, Karachi',
            licenseNumber: 'CRL-KHI-2025-001',
            fleetSize: '5',
            yearsInBusiness: '1',
            contactDetails: '+92 333 5551234',
            website: '',
        },
        documents: ['License Copy', 'CNIC'],
        adminNotes: 'Missing office proof and vehicle registration. Please resubmit with complete documentation.',
    },
    {
        id: 'VR-004',
        email: 'umrahpilgrim@test.com',
        name: 'Pilgrim Umrah Services',
        role: 'umrah_provider',
        submittedDate: '2026-03-01',
        status: 'pending',
        phone: '+92 312 7778899',
        city: 'Rawalpindi',
        verificationData: {
            companyName: 'Pilgrim Umrah Services',
            ministryApprovalNumber: 'MIN-UMR-2025-456',
            officeAddress: '78-A, Commercial Market, Rawalpindi',
            saudiPartner: 'Al-Madina Services KSA',
            yearsOfExperience: '6',
            citiesServed: 'Rawalpindi, Islamabad, Lahore',
            contactInfo: '+92 312 7778899',
        },
        documents: ['Government Approval Certificate', 'CNIC', 'Office Proof'],
        adminNotes: '',
    },
    {
        id: 'VR-005',
        email: 'northerntrek@test.com',
        name: 'Northern Trek Adventures',
        role: 'trip_provider',
        submittedDate: '2026-03-02',
        status: 'pending',
        phone: '+92 345 6667788',
        city: 'Gilgit',
        verificationData: { companyName: 'Northern Trek Adventures', operatingCities: 'Gilgit, Hunza, Skardu', officeAddress: '12 Main Bazaar, Gilgit', yearsOfExperience: '10' },
        documents: ['Business Registration', 'CNIC', 'Tour Operator License'],
        adminNotes: '',
    },
    {
        id: 'VR-006',
        email: 'alisafar@test.com',
        name: 'Ali Safar',
        role: 'individual_agent',
        submittedDate: '2026-03-01',
        status: 'pending',
        phone: '+92 300 1112233',
        city: 'Lahore',
        verificationData: { fullName: 'Ali Safar', cnicNumber: '35202-XXXXXXX-X', specialization: 'Visa Processing', experience: '5 years' },
        documents: ['CNIC Front', 'CNIC Back', 'Experience Letter'],
        adminNotes: '',
    },
    {
        id: 'VR-007',
        email: 'grandhotel@test.com',
        name: 'Grand Hotel Lahore',
        role: 'hotel_provider',
        submittedDate: '2026-03-02',
        status: 'pending',
        phone: '+92 42 35678901',
        city: 'Lahore',
        verificationData: { hotelName: 'Grand Hotel Lahore', hotelLocation: 'Mall Road, Lahore', hotelType: '3 Star', registrationNumber: 'HR-LHR-2025-123' },
        documents: ['Business License', 'CNIC', 'Hotel Photos'],
        adminNotes: '',
    },
    {
        id: 'VR-008',
        email: 'skyline@test.com',
        name: 'Skyline Travels',
        role: 'travel_agency',
        submittedDate: '2026-02-27',
        status: 'under_review',
        phone: '+92 311 4445566',
        city: 'Karachi',
        verificationData: { agencyName: 'Skyline Travels', licenseNumber: 'LIC-2025-8901', officeAddress: 'Clifton Block 5, Karachi', yearsOfOperation: '12' },
        documents: ['Agency License', 'NTN Certificate', 'CNIC', 'Office Proof'],
        adminNotes: '',
    },
    {
        id: 'VR-009',
        email: 'fastcars@test.com',
        name: 'Fast Cars Rental',
        role: 'car_rental',
        submittedDate: '2026-03-02',
        status: 'pending',
        phone: '+92 322 9990011',
        city: 'Islamabad',
        verificationData: { companyName: 'Fast Cars Rental', operatingCities: 'Islamabad, Rawalpindi', fleetSize: '25', officeAddress: 'Blue Area, Islamabad' },
        documents: ['Business Registration', 'CNIC', 'Vehicle Registration'],
        adminNotes: '',
    },
    {
        id: 'VR-010',
        email: 'sahibumrah@test.com',
        name: 'Sahib Umrah Tours',
        role: 'umrah_provider',
        submittedDate: '2026-02-26',
        status: 'under_review',
        phone: '+92 333 2223344',
        city: 'Multan',
        verificationData: { companyName: 'Sahib Umrah Tours', ministryApprovalNumber: 'MIN-UMR-2025-789', saudiPartner: 'Makkah Tours KSA', yearsOfExperience: '15' },
        documents: ['Ministry License', 'CNIC', 'Saudi Partner Agreement'],
        adminNotes: '',
    },
    {
        id: 'VR-011',
        email: 'hiraagent@test.com',
        name: 'Hira Travel Consultant',
        role: 'individual_agent',
        submittedDate: '2026-03-03',
        status: 'pending',
        phone: '+92 301 5556677',
        city: 'Islamabad',
        verificationData: { fullName: 'Hira Batool', cnicNumber: '37405-XXXXXXX-X', specialization: 'Study Abroad, UK Visas', experience: '3 years' },
        documents: ['CNIC', 'Degree', 'Reference Letter'],
        adminNotes: '',
    },
    {
        id: 'VR-012',
        email: 'mountaineers@test.com',
        name: 'Pakistan Mountaineers',
        role: 'trip_provider',
        submittedDate: '2026-02-24',
        status: 'approved',
        phone: '+92 344 8889900',
        city: 'Skardu',
        verificationData: { companyName: 'Pakistan Mountaineers', operatingCities: 'Skardu, K2 Base, Fairy Meadows', officeAddress: 'Main Road, Skardu', yearsOfExperience: '18' },
        documents: ['Tour License', 'CNIC', 'Insurance Certificate'],
        adminNotes: '',
    },
];

// ── User Mock Data ──
export const userBookings = [
    { id: 'BK-1001', type: 'Visa', destination: 'Turkey', date: '2026-02-10', agent: 'Sarah Ahmed', status: 'Approved', amount: 15000 },
    { id: 'BK-1002', type: 'Flight', destination: 'Dubai', date: '2026-02-15', agent: 'Kamran Ali', status: 'Pending', amount: 45000 },
    { id: 'BK-1003', type: 'Hotel', destination: 'Istanbul', date: '2026-02-18', agent: 'Sarah Ahmed', status: 'In Progress', amount: 32000 },
    { id: 'BK-1004', type: 'Insurance', destination: 'Malaysia', date: '2026-01-22', agent: 'Ayesha Khan', status: 'Approved', amount: 8500 },
    { id: 'BK-1005', type: 'Study File', destination: 'Canada', date: '2026-01-28', agent: 'Bilal Siddiqui', status: 'Rejected', amount: 120000 },
    { id: 'BK-1006', type: 'Tours', destination: 'Bali', date: '2026-03-05', agent: 'Kamran Ali', status: 'Pending', amount: 75000 },
    { id: 'BK-1007', type: 'Visa', destination: 'UAE', date: '2026-02-20', agent: 'Ayesha Khan', status: 'In Progress', amount: 12000 },
    { id: 'BK-1008', type: 'Flight', destination: 'London', date: '2026-03-12', agent: 'Sarah Ahmed', status: 'Approved', amount: 95000 },
];

export const visaApplications = [
    { id: 'VA-2001', country: 'Turkey', type: 'Tourist Visa', appliedDate: '2026-01-15', status: 'Approved', processingTime: '7 days', agent: 'Sarah Ahmed' },
    { id: 'VA-2002', country: 'UAE', type: 'Visit Visa', appliedDate: '2026-02-01', status: 'In Progress', processingTime: '5 days', agent: 'Ayesha Khan' },
    { id: 'VA-2003', country: 'Malaysia', type: 'eVisa', appliedDate: '2026-02-10', status: 'Pending', processingTime: '3 days', agent: 'Kamran Ali' },
    { id: 'VA-2004', country: 'Canada', type: 'Study Visa', appliedDate: '2026-01-20', status: 'Rejected', processingTime: '30 days', agent: 'Bilal Siddiqui' },
    { id: 'VA-2005', country: 'Thailand', type: 'Tourist Visa', appliedDate: '2026-02-18', status: 'Pending', processingTime: '5 days', agent: 'Sarah Ahmed' },
];

export const savedAgents = [
    { id: 1, name: 'Sarah Ahmed', speciality: 'Visa & Travel', rating: 4.8, reviews: 156, location: 'Lahore', verified: true, services: ['Visa', 'Flight', 'Hotel'] },
    { id: 2, name: 'Kamran Ali', speciality: 'Flights & Tours', rating: 4.6, reviews: 98, location: 'Karachi', verified: true, services: ['Flight', 'Tours', 'Insurance'] },
    { id: 3, name: 'Ayesha Khan', speciality: 'Insurance & Visa', rating: 4.9, reviews: 210, location: 'Islamabad', verified: true, services: ['Visa', 'Insurance'] },
    { id: 4, name: 'Bilal Siddiqui', speciality: 'Study Abroad', rating: 4.5, reviews: 74, location: 'Rawalpindi', verified: false, services: ['Study File', 'Visa'] },
];

export const paymentHistory = [
    { id: 'PAY-3001', bookingId: 'BK-1001', date: '2026-02-10', amount: 15000, method: 'Bank Transfer', status: 'Completed' },
    { id: 'PAY-3002', bookingId: 'BK-1002', date: '2026-02-15', amount: 45000, method: 'JazzCash', status: 'Pending' },
    { id: 'PAY-3003', bookingId: 'BK-1003', date: '2026-02-18', amount: 32000, method: 'Credit Card', status: 'Completed' },
    { id: 'PAY-3004', bookingId: 'BK-1004', date: '2026-01-22', amount: 8500, method: 'EasyPaisa', status: 'Completed' },
    { id: 'PAY-3005', bookingId: 'BK-1005', date: '2026-01-28', amount: 120000, method: 'Bank Transfer', status: 'Refunded' },
    { id: 'PAY-3006', bookingId: 'BK-1006', date: '2026-03-05', amount: 75000, method: 'Credit Card', status: 'Pending' },
    { id: 'PAY-3007', bookingId: 'BK-1008', date: '2026-03-12', amount: 95000, method: 'Bank Transfer', status: 'Completed' },
];

export const userNotifications = [
    { id: 1, title: 'Visa Approved', message: 'Your Turkey tourist visa has been approved.', time: '2 hours ago', read: false, type: 'success' },
    { id: 2, title: 'Payment Received', message: 'Payment of PKR 45,000 for BK-1002 is confirmed.', time: '5 hours ago', read: false, type: 'info' },
    { id: 3, title: 'Booking Update', message: 'Your Istanbul hotel booking is being processed.', time: '1 day ago', read: true, type: 'warning' },
    { id: 4, title: 'Application Rejected', message: 'Your Canada study visa application was rejected.', time: '2 days ago', read: true, type: 'error' },
    { id: 5, title: 'New Agent Response', message: 'Sarah Ahmed has responded to your inquiry.', time: '3 days ago', read: true, type: 'info' },
    { id: 6, title: 'Tour Reminder', message: 'Your Bali tour departs in 10 days!', time: '3 days ago', read: true, type: 'info' },
];

export const activityTimeline = [
    { id: 1, action: 'Visa application submitted', detail: 'Thailand Tourist Visa via Sarah Ahmed', time: '2 hours ago', icon: 'file' },
    { id: 2, action: 'Payment completed', detail: 'PKR 32,000 for Istanbul Hotel', time: '1 day ago', icon: 'credit-card' },
    { id: 3, action: 'Booking confirmed', detail: 'London Flight – BK-1008', time: '2 days ago', icon: 'check-circle' },
    { id: 4, action: 'Agent saved', detail: 'Bilal Siddiqui added to favourites', time: '3 days ago', icon: 'heart' },
    { id: 5, action: 'Application rejected', detail: 'Canada Study Visa – VA-2004', time: '5 days ago', icon: 'x-circle' },
    { id: 6, action: 'Review posted', detail: '5 stars for Sarah Ahmed', time: '1 week ago', icon: 'star' },
];

// ── Agent Mock Data ──
export const incomingRequests = [
    { id: 'REQ-4001', client: 'Ahmed Raza', service: 'Visa', date: '2026-02-20', budget: 'PKR 20,000', status: 'New', email: 'ahmed@email.com' },
    { id: 'REQ-4002', client: 'Fatima Noor', service: 'Flight', date: '2026-02-21', budget: 'PKR 55,000', status: 'New', email: 'fatima@email.com' },
    { id: 'REQ-4003', client: 'Usman Tariq', service: 'Hotel', date: '2026-02-22', budget: 'PKR 40,000', status: 'Pending', email: 'usman@email.com' },
    { id: 'REQ-4004', client: 'Zainab Ali', service: 'Insurance', date: '2026-02-23', budget: 'PKR 12,000', status: 'New', email: 'zainab@email.com' },
    { id: 'REQ-4005', client: 'Hassan Malik', service: 'Study File', date: '2026-02-19', budget: 'PKR 150,000', status: 'Pending', email: 'hassan@email.com' },
    { id: 'REQ-4006', client: 'Ayesha Baig', service: 'Tours', date: '2026-02-24', budget: 'PKR 80,000', status: 'New', email: 'ayesha@email.com' },
];

export const activeClients = [
    { id: 1, name: 'Ahmed Raza', service: 'Turkey Visa', startDate: '2026-02-10', progress: 75, status: 'In Progress', email: 'ahmed@email.com', phone: '+92 300 1234567' },
    { id: 2, name: 'Fatima Noor', service: 'Dubai Flight', startDate: '2026-02-12', progress: 40, status: 'Processing', email: 'fatima@email.com', phone: '+92 301 2345678' },
    { id: 3, name: 'Usman Tariq', service: 'Istanbul Hotel', startDate: '2026-02-15', progress: 90, status: 'Almost Done', email: 'usman@email.com', phone: '+92 302 3456789' },
    { id: 4, name: 'Zainab Ali', service: 'Travel Insurance', startDate: '2026-02-18', progress: 20, status: 'Documents Pending', email: 'zainab@email.com', phone: '+92 303 4567890' },
];

export const completedCases = [
    { id: 'CC-5001', client: 'Imran Shah', service: 'UAE Visit Visa', completedDate: '2026-01-30', amount: 18000, rating: 5 },
    { id: 'CC-5002', client: 'Nadia Butt', service: 'London Flight', completedDate: '2026-01-25', amount: 92000, rating: 4 },
    { id: 'CC-5003', client: 'Ali Hamza', service: 'Bali Tour Package', completedDate: '2026-01-20', amount: 85000, rating: 5 },
    { id: 'CC-5004', client: 'Saba Qadir', service: 'Thailand Visa', completedDate: '2026-01-15', amount: 12000, rating: 4 },
    { id: 'CC-5005', client: 'Waqar Younis', service: 'Malaysia eVisa', completedDate: '2026-01-10', amount: 9500, rating: 5 },
    { id: 'CC-5006', client: 'Hira Rafiq', service: 'Study File – UK', completedDate: '2026-01-05', amount: 135000, rating: 3 },
    { id: 'CC-5007', client: 'Kashif Mehmood', service: 'Hotel Istanbul', completedDate: '2025-12-28', amount: 42000, rating: 5 },
    { id: 'CC-5008', client: 'Rabia Anwar', service: 'Travel Insurance', completedDate: '2025-12-20', amount: 7500, rating: 4 },
];

export const agentEarnings = {
    total: 485000,
    thisMonth: 78000,
    lastMonth: 65000,
    pending: 32000,
};

export const monthlyEarningsChart = [
    { month: 'Sep', earnings: 42000 },
    { month: 'Oct', earnings: 58000 },
    { month: 'Nov', earnings: 51000 },
    { month: 'Dec', earnings: 67000 },
    { month: 'Jan', earnings: 65000 },
    { month: 'Feb', earnings: 78000 },
];

export const weeklyRequestsChart = [
    { day: 'Mon', requests: 5 },
    { day: 'Tue', requests: 8 },
    { day: 'Wed', requests: 6 },
    { day: 'Thu', requests: 12 },
    { day: 'Fri', requests: 9 },
    { day: 'Sat', requests: 14 },
    { day: 'Sun', requests: 4 },
];

export const serviceDistribution = [
    { name: 'Visa', value: 35, color: '#3B82F6' },
    { name: 'Flight', value: 25, color: '#6366F1' },
    { name: 'Hotel', value: 15, color: '#8B5CF6' },
    { name: 'Insurance', value: 10, color: '#06B6D4' },
    { name: 'Study File', value: 8, color: '#10B981' },
    { name: 'Tours', value: 7, color: '#F59E0B' },
];

export const agentTransactions = [
    { id: 'TXN-6001', client: 'Imran Shah', service: 'UAE Visit Visa', date: '2026-01-30', amount: 18000, commission: 3600, status: 'Paid' },
    { id: 'TXN-6002', client: 'Nadia Butt', service: 'London Flight', date: '2026-01-25', amount: 92000, commission: 9200, status: 'Paid' },
    { id: 'TXN-6003', client: 'Ali Hamza', service: 'Bali Tour', date: '2026-01-20', amount: 85000, commission: 12750, status: 'Paid' },
    { id: 'TXN-6004', client: 'Saba Qadir', service: 'Thailand Visa', date: '2026-01-15', amount: 12000, commission: 2400, status: 'Paid' },
    { id: 'TXN-6005', client: 'Waqar Younis', service: 'Malaysia eVisa', date: '2026-01-10', amount: 9500, commission: 1900, status: 'Paid' },
    { id: 'TXN-6006', client: 'Hira Rafiq', service: 'Study File', date: '2026-01-05', amount: 135000, commission: 20250, status: 'Paid' },
    { id: 'TXN-6007', client: 'Ahmed Raza', service: 'Turkey Visa', date: '2026-02-10', amount: 20000, commission: 4000, status: 'Pending' },
    { id: 'TXN-6008', client: 'Fatima Noor', service: 'Dubai Flight', date: '2026-02-12', amount: 55000, commission: 5500, status: 'Pending' },
    { id: 'TXN-6009', client: 'Usman Tariq', service: 'Istanbul Hotel', date: '2026-02-15', amount: 40000, commission: 6000, status: 'Pending' },
    { id: 'TXN-6010', client: 'Zainab Ali', service: 'Insurance', date: '2026-02-18', amount: 12000, commission: 1800, status: 'Pending' },
];

export const agentReviews = [
    { id: 1, client: 'Imran Shah', rating: 5, comment: 'Excellent service! Got my UAE visa processed within 3 days. Highly recommended.', date: '2026-01-30', service: 'UAE Visit Visa' },
    { id: 2, client: 'Nadia Butt', rating: 4, comment: 'Good flight booking experience. Quick response and fair pricing.', date: '2026-01-25', service: 'London Flight' },
    { id: 3, client: 'Ali Hamza', rating: 5, comment: 'Amazing tour package! Everything was perfectly organized. Will book again.', date: '2026-01-20', service: 'Bali Tour' },
    { id: 4, client: 'Saba Qadir', rating: 4, comment: 'Smooth visa processing. Just took a bit longer than expected.', date: '2026-01-15', service: 'Thailand Visa' },
    { id: 5, client: 'Waqar Younis', rating: 5, comment: 'Super fast eVisa service. Very professional and helpful agent.', date: '2026-01-10', service: 'Malaysia eVisa' },
    { id: 6, client: 'Hira Rafiq', rating: 3, comment: 'Study file was prepared well but communication could be better.', date: '2026-01-05', service: 'Study File' },
];
