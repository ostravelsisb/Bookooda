import React from 'react';
import { motion } from 'framer-motion';

const steps = [
    {
        number: "01",
        title: "Search & Discover",
        description: "Browse thousands of verified agents, flight options, universities, and visa consultancy services tailored to your needs."
    },
    {
        number: "02",
        title: "Compare & Select",
        description: "View detailed profiles, read real reviews, and compare rates to find the perfect match for your requirements."
    },
    {
        number: "03",
        title: "Connect & Book",
        description: "Directly connect with agents or book services instantly through our secure platform with full payment protection."
    },
    {
        number: "04",
        title: "Travel with Confidence",
        description: "Embark on your journey knowing that Bookooda's support and guarantees are with you every step of the way."
    }
];

const HowItWorks = () => {
    return (
        <section className="py-20 bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">How Bookooda Works</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        A seamless process designed to get you from planning to destination with zero stress.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="relative"
                        >
                            <div className="text-6xl font-black text-blue-800/20 absolute -top-8 -left-2 z-0">
                                {step.number}
                            </div>
                            <div className="relative z-10 bg-slate-800/50 p-6 rounded-lg backdrop-blur-sm border border-slate-700 h-full hover:border-blue-500 transition-colors">
                                <h3 className="text-2xl font-bold mb-4 text-blue-400">{step.title}</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-blue-800/50 z-0 content-['']" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
