import React from 'react';
import { motion } from 'framer-motion';
import { serviceCards } from './contactData';

const HeroSection = ({ activeService, onServiceChange }) => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
                {/* Dot pattern */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '30px 30px',
                    }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Need help? We're here for you!
                    </h1>
                    <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto">
                        Select a service below and browse our help center to find the answers you need.
                    </p>
                </motion.div>

                {/* Service Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 md:gap-4"
                >
                    {serviceCards.map((card, index) => {
                        const isActive = activeService === card.id;
                        const Icon = card.icon;
                        return (
                            <motion.button
                                key={card.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 * index }}
                                whileHover={{ scale: 1.05, y: -4 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => onServiceChange(card.id)}
                                className={`flex flex-col items-center justify-center gap-2 px-6 py-5 md:px-8 md:py-6 rounded-2xl transition-all duration-300 cursor-pointer min-w-[120px] md:min-w-[140px] ${isActive
                                    ? 'bg-white text-blue-700 shadow-xl shadow-blue-900/30'
                                    : 'bg-white/15 text-white backdrop-blur-sm border border-white/20 hover:bg-white/25 hover:border-white/30'
                                    }`}
                            >
                                <Icon className={`w-7 h-7 md:w-8 md:h-8 ${isActive ? 'text-blue-600' : 'text-white'}`} />
                                <span className={`text-sm md:text-[15px] font-semibold whitespace-nowrap ${isActive ? 'text-blue-700' : 'text-white'}`}>
                                    {card.label}
                                </span>
                            </motion.button>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
