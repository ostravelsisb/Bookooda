import React from 'react';
import { motion } from 'framer-motion';

const OurVision = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto"
                >
                    <h4 className="text-blue-600 font-bold tracking-wider uppercase mb-2">Our Vision</h4>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                        Empowering the Future of Global Mobility
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed mb-10">
                        "To become the world's most trusted ecosystem for travel and education consultancy, where geographical borders are no longer barriers to opportunity. We envision a world where anyone, anywhere, can access the best travel and study solutions with a single click."
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                    {[
                        {
                            title: "Global Expansion",
                            desc: "Extending our network to cover over 150+ countries, offering localized support and expert guidance."
                        },
                        {
                            title: "Technological Innovation",
                            desc: "Leveraging AI and data analytics to provide personalized recommendations and seamless booking experiences."
                        },
                        {
                            title: "Community Growth",
                            desc: "Building a thriving community of over 1 million satisfied travelers and thousands of successful agents."
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                        >
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                            <p className="text-gray-600">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurVision;
