import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ROLE_LABELS } from '../../data/verificationConfig';
import {
    Package, Plus, Image, DollarSign, Calendar, MapPin, Clock, Star,
    Hotel, Car, Map, Moon, Plane, FileText, CheckCircle, AlertCircle
} from 'lucide-react';

// Role-specific package form configs
const PACKAGE_CONFIGS = {
    hotel_provider: {
        title: 'Add Hotel Listing',
        icon: Hotel,
        fields: [
            { name: 'roomType', label: 'Room Type', type: 'text', placeholder: 'Deluxe Double Room' },
            { name: 'pricePerNight', label: 'Price per Night (PKR)', type: 'number', placeholder: '8500' },
            { name: 'amenities', label: 'Amenities', type: 'text', placeholder: 'WiFi, AC, Breakfast, Mini Bar, Room Service' },
            { name: 'maxGuests', label: 'Max Guests', type: 'number', placeholder: '2' },
            { name: 'bedType', label: 'Bed Type', type: 'select', options: ['Single', 'Double', 'Twin', 'King', 'Queen', 'Suite'] },
            { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe the room features, view, and special amenities...' },
        ],
    },
    car_rental: {
        title: 'Add Vehicle',
        icon: Car,
        fields: [
            { name: 'carName', label: 'Car Name / Model', type: 'text', placeholder: 'Toyota Corolla 2024' },
            { name: 'dailyPrice', label: 'Daily Price (PKR)', type: 'number', placeholder: '5000' },
            { name: 'weeklyPrice', label: 'Weekly Price (PKR)', type: 'number', placeholder: '28000' },
            { name: 'features', label: 'Features', type: 'text', placeholder: 'AC, Automatic, GPS, Bluetooth' },
            { name: 'fuelType', label: 'Fuel Type', type: 'select', options: ['Petrol', 'Diesel', 'Hybrid', 'Electric', 'CNG'] },
            { name: 'seatingCapacity', label: 'Seating Capacity', type: 'number', placeholder: '5' },
            { name: 'insuranceInfo', label: 'Insurance Info', type: 'text', placeholder: 'Fully insured with comprehensive coverage' },
            { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe the vehicle condition, features...' },
        ],
    },
    trip_provider: {
        title: 'Add Trip Package',
        icon: Map,
        fields: [
            { name: 'tripTitle', label: 'Trip Title', type: 'text', placeholder: '5 Days Hunza Valley Tour' },
            { name: 'duration', label: 'Duration', type: 'text', placeholder: '5 Days / 4 Nights' },
            { name: 'citiesCovered', label: 'Cities Covered', type: 'text', placeholder: 'Islamabad, Naran, Hunza, Attabad Lake' },
            { name: 'price', label: 'Price (PKR)', type: 'number', placeholder: '35000' },
            { name: 'included', label: "What's Included", type: 'textarea', placeholder: 'Transport, Accommodation, Meals, Guide...' },
            { name: 'excluded', label: "What's Excluded", type: 'textarea', placeholder: 'Personal expenses, Entry tickets, Tips...' },
            { name: 'itinerary', label: 'Itinerary', type: 'textarea', placeholder: 'Day 1: Departure from Islamabad...' },
            { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe the trip highlights...' },
        ],
    },
    umrah_provider: {
        title: 'Add Umrah Package',
        icon: Moon,
        fields: [
            { name: 'packageName', label: 'Package Name', type: 'text', placeholder: 'Premium Umrah Package' },
            { name: 'days', label: 'Total Days', type: 'number', placeholder: '14' },
            { name: 'makkahHotel', label: 'Hotel in Makkah', type: 'text', placeholder: 'Hilton Makkah Convention' },
            { name: 'madinahHotel', label: 'Hotel in Madinah', type: 'text', placeholder: 'Pullman Madinah' },
            { name: 'flightsIncluded', label: 'Flights Included?', type: 'select', options: ['Yes', 'No'] },
            { name: 'visaIncluded', label: 'Visa Included?', type: 'select', options: ['Yes', 'No'] },
            { name: 'price', label: 'Price (PKR)', type: 'number', placeholder: '350000' },
            { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe the package details, transport, meals...' },
        ],
    },
    travel_agency: {
        title: 'Add Service Package',
        icon: Plane,
        fields: [
            { name: 'serviceName', label: 'Service Name', type: 'text', placeholder: 'Turkey Visit Visa Processing' },
            { name: 'serviceType', label: 'Service Type', type: 'select', options: ['Visa', 'Flight', 'Hotel', 'Tour', 'Insurance', 'Study File'] },
            { name: 'price', label: 'Price (PKR)', type: 'number', placeholder: '15000' },
            { name: 'processingTime', label: 'Processing Time', type: 'text', placeholder: '5-7 working days' },
            { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe the service, requirements, process...' },
        ],
    },
    individual_agent: {
        title: 'Add Service Listing',
        icon: FileText,
        fields: [
            { name: 'serviceName', label: 'Service Name', type: 'text', placeholder: 'UAE Visit Visa Assistance' },
            { name: 'serviceType', label: 'Service Type', type: 'select', options: ['Visa', 'Flight', 'Hotel', 'Tour', 'Insurance', 'Study File', 'Consultation'] },
            { name: 'price', label: 'Starting Price (PKR)', type: 'number', placeholder: '10000' },
            { name: 'deliveryTime', label: 'Delivery Time', type: 'text', placeholder: '3-5 business days' },
            { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe what you offer...' },
        ],
    },
};

const AddPackagePage = () => {
    const { user } = useAuth();
    const config = PACKAGE_CONFIGS[user?.role] || PACKAGE_CONFIGS.travel_agency;
    const Icon = config.icon;

    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);
            setFormData({});
            setTimeout(() => setShowSuccess(false), 3000);
        }, 1000);
    };

    return (
        <div className="space-y-6 max-w-3xl">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                    </div>
                    {config.title}
                </h1>
                <p className="text-sm text-gray-500 mt-1">Fill in the details to create a new listing</p>
            </div>

            {showSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 animate-fadeIn">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <div>
                        <p className="text-sm font-medium text-green-800">Listing created successfully!</p>
                        <p className="text-xs text-green-600">Your listing is now live and visible to customers.</p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <Package className="w-5 h-5 text-blue-500" />
                        Listing Details
                    </h3>
                </div>
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {config.fields.map((field) => (
                        <div key={field.name} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                {field.label}
                            </label>
                            {field.type === 'textarea' ? (
                                <textarea
                                    name={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none hover:border-gray-300 transition-colors"
                                />
                            ) : field.type === 'select' ? (
                                <select
                                    name={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white hover:border-gray-300 transition-colors"
                                >
                                    <option value="">Select {field.label}</option>
                                    {field.options.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none hover:border-gray-300 transition-colors"
                                />
                            )}
                        </div>
                    ))}

                    {/* Image Upload */}
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Images</label>
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer">
                            <input type="file" className="hidden" id="package-images" multiple />
                            <label htmlFor="package-images" className="cursor-pointer">
                                <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">Click to upload images</p>
                                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB each</p>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Creating...
                            </>
                        ) : (
                            <>
                                <Plus className="w-4 h-4" />
                                Create Listing
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPackagePage;
