import React from 'react';
import { motion } from 'framer-motion';

const AgentMarketplace = () => {
    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <motion.div
                        className="lg:w-1/2"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            The Bookooda Agent Marketplace
                        </h2>
                        <h3 className="text-xl text-blue-600 font-semibold mb-4">
                            Empowering Agents, Delightening Customers
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Bookooda isn't just a booking site; it's a revolutionary marketplace. We provide a digital stage for vetted travel agents, consultants, and tour operators to showcase their expertise and packages.
                        </p>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            For agents, we offer a suite of tools to manage bookings, payments, and client communications. For customers, we offer the transparency of a marketplace with the reliability of a trusted platform. It's a win-win ecosystem designed for the modern travel industry.
                        </p>

                        <ul className="space-y-4 mb-8">
                            {[
                                "Direct communication with expert agents",
                                "Secure payment escrow system",
                                "Real-time booking management",
                                "Verified reviews and ratings",
                                "Flexible Pricing (Commission or Subscription)"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center text-gray-700">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                            Join as an Agent
                        </button>
                    </motion.div>

                    <motion.div
                        className="lg:w-1/2 relative"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80"
                                alt="Agents working"
                                className="w-full h-auto"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                <div className="text-white">
                                    <p className="text-3xl font-bold">5,000+</p>
                                    <p className="text-gray-200">Active Agents on Platform</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AgentMarketplace;
