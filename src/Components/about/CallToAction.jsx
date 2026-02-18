import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
    const navigate = useNavigate();

    return (
        <section className="py-20 bg-gradient-to-br from-blue-900 to-indigo-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Start Your Journey?</h2>
                <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                    Whether you're looking for your next adventure or looking to grow your travel business, Bookooda is the place to be.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/')}
                        className="px-10 py-4 bg-white text-blue-900 font-bold rounded-lg shadow-xl hover:bg-gray-100 transition-colors"
                    >
                        Find an Agent
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/auth')}
                        className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
                    >
                        Become a Partner
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
