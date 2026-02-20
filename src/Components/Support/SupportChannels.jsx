import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMessageCircle, FiPhone, FiClock } from 'react-icons/fi';

const channels = [
    {
        icon: FiMessageCircle,
        title: 'Live Chat',
        description: 'Chat with our support agents in real-time for instant help with your bookings and queries.',
        detail: 'Available 24/7',
        buttonText: 'Start Chat',
        color: 'from-blue-500 to-blue-600',
        bgLight: 'bg-blue-50',
        iconColor: 'text-blue-600',
        borderColor: 'border-blue-100',
        hoverShadow: 'hover:shadow-blue-100',
    },
    {
        icon: FiMail,
        title: 'Email Support',
        description: 'Send us a detailed message and our team will respond with a thorough solution within hours.',
        detail: 'support@bookooda.com',
        buttonText: 'Send Email',
        color: 'from-indigo-500 to-indigo-600',
        bgLight: 'bg-indigo-50',
        iconColor: 'text-indigo-600',
        borderColor: 'border-indigo-100',
        hoverShadow: 'hover:shadow-indigo-100',
    },
    {
        icon: FiPhone,
        title: 'Phone Support',
        description: 'Speak directly with a support representative for urgent issues or complex queries.',
        detail: 'Mon–Sat, 9 AM – 8 PM',
        buttonText: 'Call Us',
        color: 'from-emerald-500 to-emerald-600',
        bgLight: 'bg-emerald-50',
        iconColor: 'text-emerald-600',
        borderColor: 'border-emerald-100',
        hoverShadow: 'hover:shadow-emerald-100',
    },
    {
        icon: FiClock,
        title: 'Ticket System',
        description: 'Submit a support ticket for non-urgent issues. Track your ticket status in real-time from your dashboard.',
        detail: 'Response within 24 hrs',
        buttonText: 'Create Ticket',
        color: 'from-amber-500 to-amber-600',
        bgLight: 'bg-amber-50',
        iconColor: 'text-amber-600',
        borderColor: 'border-amber-100',
        hoverShadow: 'hover:shadow-amber-100',
    },
];

const SupportChannels = () => {
    return (
        <section className="py-16 md:py-20">
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
                        Get in Touch
                    </h2>
                    <p className="text-gray-500 text-base max-w-xl mx-auto">
                        Choose the support channel that works best for you. We're here to help across every platform.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {channels.map((channel, index) => {
                        const Icon = channel.icon;
                        return (
                            <motion.div
                                key={channel.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className={`bg-white rounded-2xl border ${channel.borderColor} p-6 hover:shadow-lg ${channel.hoverShadow} transition-all duration-300 group cursor-pointer flex flex-col`}
                            >
                                {/* Icon */}
                                <div className={`w-12 h-12 rounded-xl ${channel.bgLight} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className={`w-6 h-6 ${channel.iconColor}`} />
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{channel.title}</h3>

                                {/* Description */}
                                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
                                    {channel.description}
                                </p>

                                {/* Detail */}
                                <div className="flex items-center gap-2 mb-5">
                                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${channel.color}`} />
                                    <span className="text-xs font-semibold text-gray-400">{channel.detail}</span>
                                </div>

                                {/* Button */}
                                <button className={`w-full py-2.5 rounded-xl bg-gradient-to-r ${channel.color} text-white text-sm font-semibold hover:opacity-90 transition-all duration-300 cursor-pointer shadow-sm`}>
                                    {channel.buttonText}
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default SupportChannels;
