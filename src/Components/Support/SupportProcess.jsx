import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiClock, FiShield, FiZap, FiGlobe, FiUsers } from 'react-icons/fi';

const steps = [
    {
        icon: FiCheckCircle,
        title: 'Describe Your Issue',
        description: 'Tell us what you need help with. Provide your booking ID or account details for faster assistance.',
        color: 'from-blue-500 to-blue-600',
        bgLight: 'bg-blue-50',
        iconColor: 'text-blue-600',
    },
    {
        icon: FiClock,
        title: 'Choose Your Channel',
        description: 'Select live chat for instant help, email for detailed queries, or phone for urgent matters.',
        color: 'from-indigo-500 to-indigo-600',
        bgLight: 'bg-indigo-50',
        iconColor: 'text-indigo-600',
    },
    {
        icon: FiZap,
        title: 'Get Resolved',
        description: 'Our expert team resolves your issue promptly. Most queries are solved within the first interaction.',
        color: 'from-emerald-500 to-emerald-600',
        bgLight: 'bg-emerald-50',
        iconColor: 'text-emerald-600',
    },
];

const promises = [
    { icon: FiClock, text: 'Average response under 2 hours', color: 'text-blue-600' },
    { icon: FiShield, text: 'Your data is always secure', color: 'text-emerald-600' },
    { icon: FiGlobe, text: 'Support in English, Urdu & Arabic', color: 'text-purple-600' },
    { icon: FiUsers, text: 'Trained travel industry experts', color: 'text-orange-600' },
];

const SupportProcess = () => {
    return (
        <section className="py-16 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                        How Our Support Works
                    </h2>
                    <p className="text-gray-500 text-base max-w-xl mx-auto">
                        Getting help is easy. Follow these simple steps and we'll take care of the rest.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.15 }}
                                className="relative text-center group"
                            >
                                {/* Step Number */}
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold bg-gradient-to-r ${step.color} shadow-lg`}>
                                        {index + 1}
                                    </span>
                                </div>

                                {/* Card */}
                                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8 pt-10 hover:shadow-md hover:border-gray-200 transition-all duration-300">
                                    <div className={`w-14 h-14 rounded-2xl ${step.bgLight} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className={`w-7 h-7 ${step.iconColor}`} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                                </div>

                                {/* Connector Arrow (not on last) */}
                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                                        <div className="w-8 h-[2px] bg-gray-200" />
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Promise Badges */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-r from-gray-50 to-gray-50 rounded-2xl border border-gray-100 p-8"
                >
                    <h3 className="text-center text-lg font-bold text-gray-900 mb-6">Our Support Promise</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {promises.map((promise, index) => {
                            const Icon = promise.icon;
                            return (
                                <motion.div
                                    key={promise.text}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.08 }}
                                    className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100"
                                >
                                    <Icon className={`w-5 h-5 ${promise.color} flex-shrink-0`} />
                                    <span className="text-sm font-medium text-gray-700">{promise.text}</span>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SupportProcess;
