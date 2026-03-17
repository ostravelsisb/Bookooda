import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FiFileText, FiCalendar, FiBookOpen, FiShield, FiNavigation, FiHome, FiArrowRight
} from 'react-icons/fi';

const topics = [
    {
        icon: FiFileText,
        title: 'Visa Filing',
        description: 'Application process, required documents, tracking, processing times, and rejections.',
        articles: 12,
        color: 'bg-blue-50',
        iconColor: 'text-blue-600',
        borderColor: 'hover:border-blue-200',
    },
    {
        icon: FiCalendar,
        title: 'Appointment Booking',
        description: 'Scheduling, rescheduling, cancellations, consultation types, and agent selection.',
        articles: 8,
        color: 'bg-purple-50',
        iconColor: 'text-purple-600',
        borderColor: 'hover:border-purple-200',
    },
    {
        icon: FiBookOpen,
        title: 'Study Consultancy',
        description: 'University selection, applications, scholarships, student visas, and accommodation.',
        articles: 10,
        color: 'bg-teal-50',
        iconColor: 'text-teal-600',
        borderColor: 'hover:border-teal-200',
    },
    {
        icon: FiShield,
        title: 'Travel Insurance',
        description: 'Coverage plans, claims process, policy management, medical emergencies, and refunds.',
        articles: 9,
        color: 'bg-emerald-50',
        iconColor: 'text-emerald-600',
        borderColor: 'hover:border-emerald-200',
    },
    {
        icon: FiNavigation,
        title: 'Flights Booking',
        description: 'Flight search, booking modifications, cancellations, boarding passes, and group travel.',
        articles: 11,
        color: 'bg-orange-50',
        iconColor: 'text-orange-600',
        borderColor: 'hover:border-orange-200',
    },
    {
        icon: FiHome,
        title: 'Hotel Reservations',
        description: 'Hotel booking, check-in/check-out, special requests, cancellations, and group bookings.',
        articles: 7,
        color: 'bg-rose-50',
        iconColor: 'text-rose-600',
        borderColor: 'hover:border-rose-200',
    },
];

const KnowledgeBase = () => {
    return (
        <section className="py-16 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                        Knowledge Base
                    </h2>
                    <p className="text-gray-500 text-base max-w-xl mx-auto">
                        Browse help articles organized by service. Find step-by-step guides and answers to common questions.
                    </p>
                </motion.div>

                {/* Topics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {topics.map((topic, index) => {
                        const Icon = topic.icon;
                        return (
                            <motion.div
                                key={topic.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                            >
                                <Link
                                    to="/contact"
                                    className={`block bg-white rounded-2xl border border-gray-100 ${topic.borderColor} p-6 hover:shadow-lg transition-all duration-300 group h-full`}
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Icon */}
                                        <div className={`w-12 h-12 rounded-xl ${topic.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className={`w-5 h-5 ${topic.iconColor}`} />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1.5">
                                                <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                                    {topic.title}
                                                </h3>
                                                <FiArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                                            </div>
                                            <p className="text-gray-500 text-sm leading-relaxed mb-3">
                                                {topic.description}
                                            </p>
                                            <span className="text-xs font-semibold text-gray-400">
                                                {topic.articles} articles
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default KnowledgeBase;
