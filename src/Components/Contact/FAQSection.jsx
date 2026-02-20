import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHelpCircle, FiArrowRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import AccordionItem from './AccordionItem';
import { faqData, categories } from '../Contact/contactData';

const FAQSection = ({ activeCategory }) => {
    const [openAccordion, setOpenAccordion] = useState(null);

    const currentCategory = categories.find(c => c.id === activeCategory);
    const currentFaqs = faqData[activeCategory] || [];

    const handleToggle = (id) => {
        setOpenAccordion(prev => (prev === id ? null : id));
    };

    // Reset open accordion when category changes
    React.useEffect(() => {
        setOpenAccordion(null);
    }, [activeCategory]);

    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            {/* Blue Info Banner */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-100 px-6 py-5 md:px-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <FiHelpCircle className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-blue-900 font-semibold text-[15px]">Need help?</p>
                            <p className="text-blue-700 text-sm">Contact Bookooda Customer Service</p>
                        </div>
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 active:bg-blue-800 transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer whitespace-nowrap">
                        Contact Bookooda Support
                        <FiArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* FAQ Content */}
            <div className="px-6 py-8 md:px-8">
                {/* Category Title */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            {currentCategory && (
                                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                    <currentCategory.icon className="w-5 h-5 text-blue-600" />
                                </div>
                            )}
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                                {currentCategory?.label}
                            </h2>
                        </div>

                        <p className="text-gray-500 text-sm mb-6">
                            Find answers to commonly asked questions about {currentCategory?.label?.toLowerCase()}.
                        </p>

                        {/* Accordion Items */}
                        <div>
                            {currentFaqs.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    item={item}
                                    isOpen={openAccordion === item.id}
                                    onToggle={handleToggle}
                                />
                            ))}
                        </div>

                        {/* Bottom Help */}
                        <div className="mt-8 p-5 bg-gray-50 rounded-xl border border-gray-100 text-center">
                            <p className="text-gray-600 text-sm">
                                Still need help?{' '}
                                <Link to="/contact" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                                    Chat with our support team
                                </Link>
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default FAQSection;
