import React from 'react';
import { motion } from 'framer-motion';
import { FaPlane, FaUniversity, FaPassport, FaBriefcase, FaKaaba, FaHotel, FaFileContract, FaShieldAlt } from 'react-icons/fa';

const services = [
    { icon: <FaPlane />, title: "Flight Bookings", desc: "Global flight connections at unbeatable rates." },
    { icon: <FaUniversity />, title: "Study Abroad", desc: "Expert consultancy for UK, USA, Canada, Australia & Europe." },
    { icon: <FaPassport />, title: "Visa Filing", desc: "Professional assistance for all visa types and countries." },
    { icon: <FaBriefcase />, title: "Work Consultant", desc: "Career guidance and work visa processing services." },
    { icon: <FaKaaba />, title: "Umrah & Hajj", desc: "Spiritual journeys managed by certified operators." },
    { icon: <FaHotel />, title: "Hotel Bookings", desc: "Luxury to budget accommodations worldwide." },
    { icon: <FaFileContract />, title: "Travel Insurance", desc: "Comprehensive coverage for peace of mind." },
    { icon: <FaShieldAlt />, title: "Travel Agency Marketplace", desc: "Connect with top-rated local agencies." }
];

const ServicesOverview = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Comprehensive Services</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Everything you need for your journey, all in one place.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all text-center flex flex-col items-center"
                        >
                            <div className="text-4xl text-blue-500 mb-4">
                                {service.icon}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                            <p className="text-sm text-gray-500">{service.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesOverview;
