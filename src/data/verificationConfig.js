// ── Role-based Verification Field Configurations ──
// Each role has a set of text fields and upload requirements for the verification form

export const VERIFICATION_CONFIGS = {
    hotel_provider: {
        title: 'Hotel Provider Verification',
        subtitle: 'Complete your hotel business verification to start listing rooms',
        icon: '🏨',
        fields: [
            { name: 'hotelName', label: 'Hotel Name', type: 'text', placeholder: 'Pearl Continental', required: true },
            { name: 'hotelLocation', label: 'Hotel Location (City + Area)', type: 'text', placeholder: 'F-7 Markaz, Islamabad', required: true },
            { name: 'businessAddress', label: 'Business Address', type: 'text', placeholder: 'Full registered address', required: true },
            { name: 'googleMapsLink', label: 'Google Maps Link', type: 'url', placeholder: 'https://maps.google.com/...', required: false },
            { name: 'hotelType', label: 'Hotel Type', type: 'select', options: ['1 Star', '2 Star', '3 Star', '4 Star', '5 Star', 'Boutique', 'Guest House', 'Motel'], required: true },
            { name: 'registrationNumber', label: 'Business Registration Number', type: 'text', placeholder: 'HR-ISB-2024-001', required: true },
            { name: 'yearsInOperation', label: 'Years in Operation', type: 'number', placeholder: '5', required: true },
            { name: 'contactNumber', label: 'Contact Number', type: 'tel', placeholder: '+92 51 1234567', required: true },
            { name: 'website', label: 'Website (Optional)', type: 'url', placeholder: 'https://yourhotel.com', required: false },
            { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Tell us about your hotel, facilities, and what makes it unique...', required: true },
        ],
        uploads: [
            { name: 'businessLicense', label: 'Business License', required: true },
            { name: 'cnic', label: 'CNIC (Front & Back)', required: true },
            { name: 'ownershipProof', label: 'Ownership Proof', required: true },
            { name: 'hotelImages', label: 'Hotel Images (Optional)', required: false },
        ],
    },

    car_rental: {
        title: 'Car Rental Verification',
        subtitle: 'Verify your rental business to list your fleet',
        icon: '🚗',
        fields: [
            { name: 'companyName', label: 'Company Name', type: 'text', placeholder: 'Prime Rentals', required: true },
            { name: 'operatingCities', label: 'Operating Cities', type: 'text', placeholder: 'Lahore, Islamabad, Karachi', required: true },
            { name: 'officeAddress', label: 'Office Address', type: 'text', placeholder: 'Full registered address', required: true },
            { name: 'licenseNumber', label: 'License Number', type: 'text', placeholder: 'CRL-LHR-2024-001', required: true },
            { name: 'fleetSize', label: 'Fleet Size', type: 'number', placeholder: '25', required: true },
            { name: 'yearsInBusiness', label: 'Years in Business', type: 'number', placeholder: '5', required: true },
            { name: 'contactDetails', label: 'Contact Details', type: 'tel', placeholder: '+92 300 1234567', required: true },
            { name: 'website', label: 'Website / Social Media', type: 'url', placeholder: 'https://yourcompany.com', required: false },
        ],
        uploads: [
            { name: 'licenseCopy', label: 'License Copy', required: true },
            { name: 'cnic', label: 'CNIC (Front & Back)', required: true },
            { name: 'officeProof', label: 'Office Proof', required: true },
            { name: 'vehicleRegistration', label: 'Vehicle Registration Samples', required: false },
        ],
    },

    umrah_provider: {
        title: 'Umrah Provider Verification',
        subtitle: 'Verify your credentials to offer Umrah packages',
        icon: '🕋',
        fields: [
            { name: 'companyName', label: 'Company Name', type: 'text', placeholder: 'Al-Haramain Travels', required: true },
            { name: 'ministryApprovalNumber', label: 'Ministry Approval Number', type: 'text', placeholder: 'MIN-UMR-2024-001', required: true },
            { name: 'officeAddress', label: 'Office Address', type: 'text', placeholder: 'Full registered address', required: true },
            { name: 'saudiPartner', label: 'Saudi Partner (if any)', type: 'text', placeholder: 'Partner company name in KSA', required: false },
            { name: 'yearsOfExperience', label: 'Years of Experience', type: 'number', placeholder: '5', required: true },
            { name: 'citiesServed', label: 'Cities Served', type: 'text', placeholder: 'Lahore, Islamabad, Rawalpindi', required: true },
            { name: 'contactInfo', label: 'Contact Info', type: 'tel', placeholder: '+92 300 1234567', required: true },
        ],
        uploads: [
            { name: 'govApproval', label: 'Government Approval Certificate', required: true },
            { name: 'cnic', label: 'CNIC (Front & Back)', required: true },
            { name: 'officeProof', label: 'Office Proof', required: true },
        ],
    },

    trip_provider: {
        title: 'Trip Provider Verification',
        subtitle: 'Verify your tourism business to create tour packages',
        icon: '🌍',
        fields: [
            { name: 'companyName', label: 'Company Name', type: 'text', placeholder: 'Adventure Pakistan', required: true },
            { name: 'areasCovered', label: 'Areas Covered (Pakistan / International)', type: 'text', placeholder: 'Northern Areas, AJK, International', required: true },
            { name: 'facebookPage', label: 'Facebook Page', type: 'url', placeholder: 'https://facebook.com/yourpage', required: false },
            { name: 'websiteLink', label: 'Website Link', type: 'url', placeholder: 'https://yourcompany.com', required: false },
            { name: 'officeAddress', label: 'Office Address', type: 'text', placeholder: 'Full registered address', required: true },
            { name: 'yearsOfExperience', label: 'Years of Experience', type: 'number', placeholder: '5', required: true },
            { name: 'contactInfo', label: 'Contact Info', type: 'tel', placeholder: '+92 300 1234567', required: true },
        ],
        uploads: [
            { name: 'registrationCert', label: 'Registration Certificate', required: true },
            { name: 'cnic', label: 'CNIC (Front & Back)', required: true },
            { name: 'officeProof', label: 'Office Proof', required: true },
        ],
    },

    individual_agent: {
        title: 'Individual Agent Verification',
        subtitle: 'Verify your credentials to offer travel services',
        icon: '👤',
        fields: [
            { name: 'workingAgency', label: 'Working With Which Agency', type: 'text', placeholder: 'Falcon Travels (or Independent)', required: true },
            { name: 'experienceYears', label: 'Experience Years', type: 'number', placeholder: '3', required: true },
            { name: 'city', label: 'City', type: 'text', placeholder: 'Lahore', required: true },
            { name: 'servicesOffered', label: 'Services Offered', type: 'text', placeholder: 'Visa Processing, Flight Booking, Tours', required: true },
            { name: 'referenceContact', label: 'Reference Agency Contact', type: 'tel', placeholder: '+92 300 1234567', required: true },
        ],
        uploads: [
            { name: 'cnic', label: 'CNIC (Front & Back)', required: true },
            { name: 'recommendation', label: 'Recommendation Letter (Optional)', required: false },
        ],
    },

    travel_agency: {
        title: 'Travel Agency Verification',
        subtitle: 'Verify your agency to access the full marketplace',
        icon: '🏢',
        fields: [
            { name: 'agencyName', label: 'Agency Name', type: 'text', placeholder: 'Falcon Travels', required: true },
            { name: 'licenseNumber', label: 'License Number', type: 'text', placeholder: 'LIC-2024-001', required: true },
            { name: 'officeAddress', label: 'Office Address', type: 'text', placeholder: 'Full registered address', required: true },
            { name: 'website', label: 'Website', type: 'url', placeholder: 'https://youragency.com', required: false },
            { name: 'socialMedia', label: 'Social Media', type: 'text', placeholder: '@youragency on Instagram/Facebook', required: false },
            { name: 'yearsOfOperation', label: 'Years of Operation', type: 'number', placeholder: '10', required: true },
            { name: 'servicesOffered', label: 'Services Offered', type: 'text', placeholder: 'Visa, Flights, Hotels, Tours, Study Abroad', required: true },
        ],
        uploads: [
            { name: 'agencyLicense', label: 'Agency License', required: true },
            { name: 'ntnCertificate', label: 'NTN Certificate', required: true },
            { name: 'cnic', label: 'CNIC (Front & Back)', required: true },
        ],
    },
};

// Roles that require verification (NOT customer)
export const ROLES_REQUIRING_VERIFICATION = [
    'travel_agency',
    'individual_agent',
    'car_rental',
    'trip_provider',
    'umrah_provider',
    'hotel_provider',
];

// Role display labels
export const ROLE_LABELS = {
    travel_agency: 'Travel Agency',
    individual_agent: 'Individual Agent',
    car_rental: 'Car Rental Provider',
    trip_provider: 'Trip Provider',
    umrah_provider: 'Umrah Service Provider',
    hotel_provider: 'Hotel Provider',
    customer: 'Customer',
    admin: 'Super Admin',
    user: 'User',
    agent: 'Agent',
};
