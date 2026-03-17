import React from 'react';
import { motion } from 'framer-motion';

const AboutHero = () => {
    return (
        <div className="relative bg-gradient-to-r from-blue-900 to-slate-900 text-white overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2300&q=80')] bg-cover bg-center" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        Connecting the World with <span className="text-blue-400">Verified Travel Excellence</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light leading-relaxed">
                        Bookooda is the premier marketplace connecting travelers with trusted agents. We are redefining the journey with transparency, technology, and trust.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-lg shadow-lg transition-colors"
                        >
                            Explore Our Services
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-transparent border-2 border-white/30 hover:bg-white/10 rounded-lg font-semibold text-lg transition-colors backdrop-blur-sm"
                        >
                            Join as a Partner
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-12 md:h-24 fill-white opacity-10">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
                </svg>
            </div>
        </div>
    );
};

export default AboutHero;
