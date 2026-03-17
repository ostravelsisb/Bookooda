import React from 'react';
import { motion } from 'framer-motion';
import {
    FaCheckCircle,
    FaTimesCircle,
    FaExclamationTriangle,
    FaGavel,
    FaShieldAlt,
    FaFileContract
} from 'react-icons/fa';

const PlatformRules = () => {

    const dos = [
        "Transactions MUST be inside Bookooda platform (Visa, Study, Flights, Hotels, etc.)",
        "Provide genuine, verified, and accurate documents",
        "Agents must provide honest service details and timelines",
        "Report suspicious activity or harassment immediately",
        "Use Bookooda's secure messaging for all communications",
        "Respect the privacy and data of all users"
    ];

    const donts = [
        "NO personal dealing or payments outside Bookooda",
        "NO sharing of personal contact details before booking",
        "NO fake, forged, or misleading documents",
        "NO fake promises of guaranteed visas (embassy decision is final)",
        "NO harassment, abuse, or unprofessional behavior",
        "NO bypassing Bookooda fees or commissions"
    ];

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <FaShieldAlt className="text-4xl text-blue-600" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                            Platform Rules & Guidelines
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            To ensure a safe and trusted environment, all users must adhere to Bookooda's core policies.
                            Transparency and security are our top priorities.
                        </p>
                    </motion.div>
                </div>

                {/* Rules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">

                    {/* What To Do (Green) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-green-50 rounded-2xl p-8 border border-green-100 shadow-sm"
                    >
                        <div className="flex items-center gap-3 mb-6 border-b border-green-200 pb-4">
                            <FaCheckCircle className="text-3xl text-green-600" />
                            <h3 className="text-2xl font-bold text-green-800">What You Must Do</h3>
                        </div>
                        <ul className="space-y-4">
                            {dos.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* What Not To Do (Red) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-red-50 rounded-2xl p-8 border border-red-100 shadow-sm"
                    >
                        <div className="flex items-center gap-3 mb-6 border-b border-red-200 pb-4">
                            <FaTimesCircle className="text-3xl text-red-600" />
                            <h3 className="text-2xl font-bold text-red-800">Strictly Prohibited</h3>
                        </div>
                        <ul className="space-y-4">
                            {donts.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <FaTimesCircle className="text-red-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Critical Warnings & Liability */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

                    {/* Zero Tolerance Policy */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-600"
                    >
                        <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <FaBan className="text-red-600" /> Zero Tolerance Policy
                        </h4>
                        <p className="text-sm text-gray-600">
                            <strong>Fraud & Misconduct:</strong> Fake documents, misleading pricing, or harassment results in
                            <span className="text-red-600 font-bold"> immediate account termination</span> and permanent ban.
                        </p>
                    </motion.div>

                    {/* Liability Disclaimer */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500"
                    >
                        <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <FaFileContract className="text-orange-500" /> Platform Liability
                        </h4>
                        <p className="text-sm text-gray-600">
                            Bookooda is a marketplace. We facilitate secure connections but are
                            <strong> NOT responsible</strong> for visa decisions (embassy's discretion) or off-platform deals.
                        </p>
                    </motion.div>

                    {/* Visa Rejection Policy */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600"
                    >
                        <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <FaGavel className="text-blue-600" /> Visa Rejection Policy
                        </h4>
                        <p className="text-sm text-gray-600">
                            <strong>Refunds</strong> are applicable ONLY if rejection is due to agent error.
                            No refunds for client data errors or document forgery.
                        </p>
                    </motion.div>
                </div>

                {/* Final Strong Warning */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gray-900 rounded-xl p-8 text-center"
                >
                    <div className="flex justify-center mb-4">
                        <FaExclamationTriangle className="text-yellow-400 text-3xl animate-pulse" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        Compliance Warning
                    </h3>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Violation of platform policies, especially regarding off-platform dealings or fraud,
                        will result in <span className="text-white font-bold underline">immediate suspension</span>,
                        total loss of funds/commissions, and legal action where applicable.
                    </p>
                </motion.div>

            </div>
        </section>
    );
};

// Helper Icon for Warning Section (if needed additionally)
const FaBan = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" /></svg>
);

export default PlatformRules;
