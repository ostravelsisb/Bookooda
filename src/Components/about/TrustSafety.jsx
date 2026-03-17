import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaLock, FaUserCheck } from 'react-icons/fa';

const TrustSafety = () => {
    return (
        <section className="py-20 bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Trust & Safety First</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Your safety is our priority. We employ state-of-the-art security measures to ensure your data and transactions are protected.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="p-8 bg-gray-800 rounded-lg border border-gray-700"
                    >
                        <FaUserCheck className="text-5xl text-green-500 mx-auto mb-6" />
                        <h3 className="text-xl font-bold mb-4">Rigorous Agent Vetting</h3>
                        <p className="text-gray-400">
                            We verify every agent's identity, business license, and track record before they can join our marketplace.
                        </p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -10 }}
                        className="p-8 bg-gray-800 rounded-lg border border-gray-700"
                    >
                        <FaLock className="text-5xl text-blue-500 mx-auto mb-6" />
                        <h3 className="text-xl font-bold mb-4">Secure Transactions</h3>
                        <p className="text-gray-400">
                            Advanced encryption protocols protect your payments. Funds are held in escrow until services are confirmed.
                        </p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -10 }}
                        className="p-8 bg-gray-800 rounded-lg border border-gray-700"
                    >
                        <FaShieldAlt className="text-5xl text-purple-500 mx-auto mb-6" />
                        <h3 className="text-xl font-bold mb-4">Data Privacy</h3>
                        <p className="text-gray-400">
                            Your personal information is sacred. We adhere to global data protection standards giving you full control.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TrustSafety;
