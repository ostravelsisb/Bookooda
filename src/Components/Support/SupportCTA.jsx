import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMessageCircle } from 'react-icons/fi';

const SupportCTA = () => {
    return (
        <section className="py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-8 md:p-14"
                >
                    {/* Decorative */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl" />
                        <div
                            className="absolute inset-0 opacity-[0.04]"
                            style={{
                                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                                backgroundSize: '24px 24px',
                            }}
                        />
                    </div>

                    <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
                        {/* Text */}
                        <div className="text-center lg:text-left max-w-xl">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-4">
                                <FiMessageCircle className="text-blue-200 w-4 h-4" />
                                <span className="text-blue-100 text-sm font-medium">We're online now</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                                Still have questions?
                            </h2>
                            <p className="text-blue-100 text-base leading-relaxed">
                                Our support team is ready to help. Browse our detailed FAQ section or reach out directly — we respond within hours, not days.
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-7 py-3.5 rounded-xl text-sm font-bold hover:bg-blue-50 transition-all duration-300 shadow-lg shadow-blue-900/20 whitespace-nowrap"
                            >
                                Browse FAQs
                                <FiArrowRight className="w-4 h-4" />
                            </Link>
                            <button className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/25 text-white px-7 py-3.5 rounded-xl text-sm font-bold hover:bg-white/20 transition-all duration-300 cursor-pointer whitespace-nowrap">
                                <FiMessageCircle className="w-4 h-4" />
                                Start Live Chat
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SupportCTA;
