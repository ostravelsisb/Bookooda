import React from 'react';
import { motion } from 'framer-motion';
import {
    FaSearch,
    FaCreditCard,
    FaUserTie,
    FaCheckCircle,
    FaHandHoldingUsd,
    FaShieldAlt,
    FaUndo,
    FaBan,
    FaExclamationTriangle,
    FaArrowRight,
    FaLock
} from 'react-icons/fa';

const HowItWorks = () => {
    const steps = [
        {
            id: 1,
            title: "Choose Verified Agent",
            desc: "Browse profiles of 100% verified agents. Check reviews, ratings, and past performance.",
            icon: <FaSearch className="text-3xl text-white" />,
            color: "bg-blue-500"
        },
        {
            id: 2,
            title: "Place Order & Secure Payment",
            desc: "Select your service and pay. Your money is held securely in Bookooda Escrow, not sent to the agent.",
            icon: <FaCreditCard className="text-3xl text-white" />,
            color: "bg-indigo-500"
        },
        {
            id: 3,
            title: "Agent Works on Service",
            desc: "The agent processes your visa, booking, or consultancy. Track progress in real-time.",
            icon: <FaUserTie className="text-3xl text-white" />,
            color: "bg-purple-500"
        },
        {
            id: 4,
            title: "Completion & Approval",
            desc: "Review the completed work. If everything is correct, approve the service.",
            icon: <FaCheckCircle className="text-3xl text-white" />,
            color: "bg-green-500"
        },
        {
            id: 5,
            title: "Payment Released",
            desc: "Only after your approval, money is released to the agent (minus platform fee).",
            icon: <FaHandHoldingUsd className="text-3xl text-white" />,
            color: "bg-teal-500"
        }
    ];

    const trustBadges = [
        { icon: <FaShieldAlt />, title: "100% Verified Agents" },
        { icon: <FaLock />, title: "Secure Escrow Payment" },
        { icon: <FaHandHoldingUsd />, title: "Transparent Pricing" },
        { icon: <FaCheckCircle />, title: "10% Fixed Commission" },
    ];

    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4">
                            How Bookooda Works
                        </h2>
                        <p className="text-xl md:text-2xl font-medium text-blue-600">
                            Safe. Verified. Transparent.
                        </p>
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                            We've built a platform that protects both customers and agents.
                            Your money is safe until the work is done.
                        </p>
                    </motion.div>
                </div>

                {/* Step-by-Step Flow */}
                <div className="relative mb-20">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col items-center text-center group"
                            >
                                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                                    {step.icon}
                                </div>
                                <div className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-full mb-3">
                                    STEP {step.id}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {step.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Refund Policy & Escrow Explanation */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">

                    {/* Refund Policy Box */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                    >
                        <div className="bg-red-50 p-6 border-b border-red-100">
                            <h3 className="text-2xl font-bold text-red-600 flex items-center gap-3">
                                <FaUndo />
                                Refund Protection Policy
                            </h3>
                            <p className="text-red-800 mt-2 text-sm">
                                We guarantee your money back if things go wrong due to agent error.
                            </p>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-start gap-4">
                                <FaCheckCircle className="text-green-500 text-xl mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-gray-900">Full Refund for Agent Mistakes</h4>
                                    <p className="text-sm text-gray-600">If the agent fails to deliver or makes a critical error.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <FaCheckCircle className="text-green-500 text-xl mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-gray-900">Visa Rejection Refund</h4>
                                    <p className="text-sm text-gray-600">Eligible if rejection is caused by agent negligence.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <FaExclamationTriangle className="text-orange-500 text-xl mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-gray-900">Refund Not Applicable</h4>
                                    <p className="text-sm text-gray-600">If rejection/failure is due to client's wrong info or fake documents.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <FaBan className="text-red-500 text-xl mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-gray-900">Fraud Protection</h4>
                                    <p className="text-sm text-gray-600">Any fraud attempt results in immediate account blocking.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Escrow & Trust Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                Why Bookooda is Safer
                            </h3>
                            <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                Unlike direct transfers where your money is gone instantly, Bookooda holds your funds in a
                                <span className="font-bold text-blue-600"> secure escrow account</span>.
                                The agent sees that you have paid, but they don't get the money until the job is done.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                We charge a <span className="font-bold text-blue-600">10% commission</span> per service for standard bookings.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed mt-4">
                                For <span className="font-bold text-blue-600">Work & Study Consultants</span>, we offer a fixed platform fee or subscription model (5-10 order packs), rewarding high-quality work and positive reviews.
                            </p>
                        </div>

                        {/* Trust Badges Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {trustBadges.map((badge, index) => (
                                <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                                    <span className="text-blue-500 text-xl">{badge.icon}</span>
                                    <span className="font-semibold text-gray-800 text-sm">{badge.title}</span>
                                </div>
                            ))}
                        </div>

                        <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center gap-2 group">
                            Start Booking Securely
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
