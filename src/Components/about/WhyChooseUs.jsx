import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaUserShield, FaTag, FaHeadset } from 'react-icons/fa';

const features = [
    {
        icon: <FaUserShield />,
        title: "Verified Agents Only",
        description: "Every agent on Bookooda undergoes a rigorous verification process. We check licenses, reviews, and track records so you don't have to."
    },
    {
        icon: <FaTag />,
        title: "Best Price Guarantee",
        description: "Our marketplace model encourages competition, ensuring you get the most competitive rates for flights, visas, and study programs."
    },
    {
        icon: <FaCheckCircle />,
        title: "Transparency First",
        description: "No hidden fees. No comprehensive jargon. We believe in clear, upfront pricing and honest service descriptions."
    },
    {
        icon: <FaHeadset />,
        title: "24/7 Global Support",
        description: "Whether you're in London or Lahore, our dedicated support team is always available to assist you with your queries."
    }
];

const WhyChooseUs = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    >
                        Why Choose Bookooda?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-600 max-w-2xl mx-auto"
                    >
                        We are redefining the travel industry by putting trust and quality at the forefront of everything we do.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-50 p-8 rounded-xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100"
                        >
                            <div className="text-4xl text-blue-600 mb-6 bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
