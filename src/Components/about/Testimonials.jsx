import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "Digital Nomad",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        text: "Bookooda made finding a reliable visa consultant for my Europe trip incredibly easy. The agent was verified and professional."
    },
    {
        name: "Ahmed Khan",
        role: "Travel Agency Owner",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        text: "As an agent, this platform has transformed my business. The dashboard is intuitive and I get quality leads every day."
    },
    {
        name: "Emily Chen",
        role: "Student",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        text: "I was overwhelmed with study abroad options until I found Bookooda. The comparison tools helped me make the right choice."
    }
];

const Testimonials = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What People Say</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5 }}
                            className="bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-100"
                        >
                            <div className="flex items-center mb-6">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full mr-4 border-2 border-blue-500"
                                />
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">"{testimonial.text}"</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
