import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiUser, FiMail, FiMessageSquare, FiAlertCircle } from 'react-icons/fi';

const issueTypes = [
    'Visa Application Issue',
    'Appointment Problem',
    'Flight Booking Issue',
    'Hotel Reservation Issue',
    'Insurance Claim',
    'Payment / Refund',
    'Agent Complaint',
    'Account Issue',
    'Other',
];

const SubmitTicket = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        issueType: '',
        bookingId: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setFormData({ name: '', email: '', issueType: '', bookingId: '', message: '' });
    };

    return (
        <section className="py-16 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                    {/* Left – Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            Submit a Support Ticket
                        </h2>
                        <p className="text-gray-500 text-base mb-8 leading-relaxed">
                            Can't find the answer you're looking for? Fill out this form and our dedicated support team will get back to you within 24 hours. Please provide as much detail as possible to help us resolve your issue quickly.
                        </p>

                        {/* Tips */}
                        <div className="space-y-4">
                            {[
                                { title: 'Include your Booking ID', desc: 'This helps us locate your transaction and provide faster assistance.' },
                                { title: 'Be specific', desc: 'Describe the issue clearly with dates, amounts, and screenshots if possible.' },
                                { title: 'Check your email', desc: 'We\'ll send updates and resolution details to the email address you provide.' },
                            ].map((tip, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                                        <span className="text-blue-600 text-xs font-bold">{i + 1}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">{tip.title}</p>
                                        <p className="text-sm text-gray-500">{tip.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Emergency Notice */}
                        <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3">
                            <FiAlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-semibold text-amber-800">Urgent Issue?</p>
                                <p className="text-sm text-amber-700">For time-sensitive matters, use our Live Chat for immediate assistance instead of submitting a ticket.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right – Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl border border-gray-100 p-6 md:p-8 space-y-5">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                                <div className="relative">
                                    <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your full name"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                                <div className="relative">
                                    <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="you@example.com"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
                                    />
                                </div>
                            </div>

                            {/* Issue Type */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Issue Type</label>
                                <select
                                    name="issueType"
                                    value={formData.issueType}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 appearance-none cursor-pointer"
                                >
                                    <option value="" disabled>Select issue type</option>
                                    {issueTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Booking ID */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Booking ID <span className="text-gray-400 font-normal">(optional)</span>
                                </label>
                                <input
                                    type="text"
                                    name="bookingId"
                                    value={formData.bookingId}
                                    onChange={handleChange}
                                    placeholder="e.g. BKD-2026-XXXXX"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Describe Your Issue</label>
                                <div className="relative">
                                    <FiMessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        placeholder="Please describe your issue in detail..."
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 resize-none"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className={`w-full py-3.5 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 shadow-md ${submitted
                                    ? 'bg-emerald-500 shadow-emerald-200'
                                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-blue-200'
                                    }`}
                            >
                                {submitted ? (
                                    <>✓ Ticket Submitted Successfully!</>
                                ) : (
                                    <>
                                        Submit Ticket
                                        <FiSend className="w-4 h-4" />
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SubmitTicket;
