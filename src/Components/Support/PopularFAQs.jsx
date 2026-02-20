import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi';

const faqs = [
    {
        id: 1,
        question: 'What is Bookooda and how does it work?',
        answer: 'Bookooda is a marketplace connecting travelers with verified travel agents and consultants. You can browse agents, compare their services and reviews, book appointments, file for visas, purchase travel insurance, and book flights and hotels — all in one platform. Agents compete to offer you the best prices and service quality.',
    },
    {
        id: 2,
        question: 'How do I know if an agent is trustworthy?',
        answer: 'All agents on Bookooda go through a strict verification process. We verify their business registration, travel industry credentials, and customer reviews. Verified agents display a badge on their profile. You can also check their ratings, reviews from past customers, response time, and success rate before booking.',
    },
    {
        id: 3,
        question: 'What should I do if I have a dispute with an agent?',
        answer: 'If you have a dispute with an agent, first try to resolve it directly through the in-platform messaging system. If unresolved, file a dispute through your dashboard under "My Bookings" → "Report Issue." Our dispute resolution team will review the case and mediate between you and the agent within 48 hours.',
    },
    {
        id: 4,
        question: 'How do refunds work on Bookooda?',
        answer: 'Refund policies depend on the type of service and the specific agent\'s terms. Generally, cancellations made within the free cancellation window qualify for a full refund. For visa filing services, refunds may be partial if processing has already begun. Refunds are processed within 5–10 business days to your original payment method.',
    },
    {
        id: 5,
        question: 'Is my personal data safe on Bookooda?',
        answer: 'Yes, we take data security very seriously. All personal data and documents are encrypted using industry-standard AES-256 encryption. We comply with data protection regulations and never share your information with third parties without your consent. Documents uploaded for visa applications are stored securely and can be deleted upon request.',
    },
    {
        id: 6,
        question: 'Can I use Bookooda from outside Pakistan?',
        answer: 'Absolutely! Bookooda is available worldwide. While many of our agents are based in Pakistan, we serve customers globally. You can browse agents, book services, and manage your bookings from anywhere in the world. Payment options are tailored to support international transactions.',
    },
    {
        id: 7,
        question: 'How do I become a verified agent on Bookooda?',
        answer: 'To become a verified agent, click "List Your Agency" in the footer or navigate to the Agent Signup page. Submit your business registration documents, travel industry certifications, and agency details. Our verification team reviews applications within 3–5 business days. Once approved, you\'ll receive a verified badge and can start listing your services.',
    },
    {
        id: 8,
        question: 'Does Bookooda charge any service fees?',
        answer: 'Bookooda does not charge travelers any additional service fees. The prices you see are the final prices set by the agents. Agents pay a small platform commission which is included in their listed price. This ensures complete transparency with no hidden costs for you.',
    },
];

const PopularFAQs = () => {
    const [openId, setOpenId] = useState(null);

    const handleToggle = (id) => {
        setOpenId(prev => (prev === id ? null : id));
    };

    return (
        <section className="py-16 md:py-20">
            <div className="max-w-4xl mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-500 text-base max-w-xl mx-auto">
                        Quick answers to the most common questions about using Bookooda.
                    </p>
                </motion.div>

                {/* FAQ List */}
                <div className="space-y-3">
                    {faqs.map((faq, index) => {
                        const isOpen = openId === faq.id;
                        return (
                            <motion.div
                                key={faq.id}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className={`rounded-2xl overflow-hidden transition-all duration-300 ${isOpen
                                    ? 'bg-blue-50 border border-blue-100 shadow-sm'
                                    : 'bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm'
                                    }`}
                            >
                                <button
                                    onClick={() => handleToggle(faq.id)}
                                    className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer group"
                                >
                                    <div className="flex items-center gap-3 pr-4">
                                        <FiHelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${isOpen ? 'text-blue-600' : 'text-gray-300 group-hover:text-blue-400'}`} />
                                        <span className={`text-[15px] font-medium transition-colors duration-300 ${isOpen ? 'text-blue-700' : 'text-gray-800 group-hover:text-blue-600'}`}>
                                            {faq.question}
                                        </span>
                                    </div>
                                    <motion.span
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="flex-shrink-0"
                                    >
                                        <FiChevronDown className={`w-5 h-5 transition-colors duration-300 ${isOpen ? 'text-blue-600' : 'text-gray-400'}`} />
                                    </motion.span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-5 pl-14">
                                                <div className="pt-1 border-t border-blue-100">
                                                    <p className="text-gray-600 text-[14px] leading-relaxed pt-3">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PopularFAQs;
