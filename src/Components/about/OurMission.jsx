import React from 'react';
import { motion } from 'framer-motion';
import { FaGlobeAmericas, FaHandshake, FaShieldAlt } from 'react-icons/fa';

const OurMission = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h4 className="text-blue-600 font-bold tracking-wider uppercase mb-2">Our Mission</h4>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            To find the best agents at the best rates for the best customers.
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            At Bookooda, our mission is to democratize the travel and consultancy industry. We exist to bridge the gap between travelers and verified service providers, ensuring that every journey is backed by trust, transparency, and value.
                        </p>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            We are not just a booking platform; we are a global ecosystem that empowers travel agents to reach a wider audience while giving customers access to premium services without the premium price tag. From visa filing to study abroad programs, we simplify the complex.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                                        <FaGlobeAmericas className="text-xl" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">Global Connectivity</h3>
                                    <p className="mt-2 text-base text-gray-500">Connecting users with agents worldwide.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                                        <FaHandshake className="text-xl" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">Trusted Partnerships</h3>
                                    <p className="mt-2 text-base text-gray-500">Verified agents you can rely on.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
                            {/* Placeholder for a mission-related image */}
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80"
                                alt="Team planning"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="absolute -bottom-6 -left-6 bg-blue-600 p-6 rounded-lg shadow-xl hidden md:block">
                            <p className="text-3xl font-bold text-white">100%</p>
                            <p className="text-blue-100 text-sm">Verified Agents</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default OurMission;
