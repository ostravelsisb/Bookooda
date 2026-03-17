import React from 'react';
import { motion } from 'framer-motion';
import { FiHeadphones, FiSearch } from 'react-icons/fi';

const SupportHero = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-700 to-blue-800">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-blue-400/15 rounded-full blur-3xl" />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-500/10 rounded-full blur-3xl" />
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
                    >
                        <FiHeadphones className="text-blue-200 w-4 h-4" />
                        <span className="text-blue-100 text-sm font-medium">24/7 Customer Support</span>
                    </motion.div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                        How can we help you today?
                    </h1>
                    <p className="text-blue-100 text-base md:text-lg mb-8 max-w-2xl mx-auto">
                        Search our knowledge base or browse support topics below. Our team is always ready to assist you with anything you need.
                    </p>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="max-w-xl mx-auto"
                    >
                        <div className="relative flex items-center bg-white/10 backdrop-blur-sm border border-white/25 rounded-2xl p-1.5 hover:border-white/40 transition-all duration-300 focus-within:border-white/50 focus-within:bg-white/15">
                            <FiSearch className="w-5 h-5 text-blue-200 ml-4 flex-shrink-0" />
                            <input
                                type="text"
                                placeholder="Search for help articles, guides, FAQs..."
                                className="flex-1 bg-transparent text-white placeholder-blue-200/70 px-4 py-3 text-[15px] focus:outline-none"
                            />
                            <button className="bg-white text-blue-700 px-6 py-3 rounded-xl text-sm font-bold hover:bg-blue-50 transition-all duration-300 cursor-pointer whitespace-nowrap">
                                Search
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default SupportHero;
