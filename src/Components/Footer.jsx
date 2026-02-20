import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
    FaTiktok
} from 'react-icons/fa';
import {
    HiOutlineMail,
    HiOutlinePhone,
    HiOutlineLocationMarker,
    HiOutlineArrowRight,
    HiOutlineGlobeAlt,
    HiOutlineShieldCheck,
    HiOutlineUserGroup,
    HiOutlineStar,
    HiOutlineBadgeCheck,
} from 'react-icons/hi';
import { motion } from 'framer-motion';

/* ───── Data ───── */
const footerLinks = {
    marketplace: [
        { label: 'Browse Agents', href: '#search' },
        { label: 'Top Destinations', href: '#destinations' },
        { label: 'Visa Services', href: '#visa' },
        { label: 'Compare Agents', href: '#compare' },
        { label: 'Verified Reviews', href: '#reviews' },
    ],
    forAgents: [
        { label: 'List Your Agency', href: '#list-agency' },
        { label: 'Agent Dashboard', href: '#agent-dashboard' },
        { label: 'Pricing & Plans', href: '#pricing' },
        { label: 'Success Stories', href: '#stories' },
        { label: 'Agent Guidelines', href: '#guidelines' },
    ],
    company: [
        { label: 'About Bookooda', href: '/about' },
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Trust & Safety', href: '#trust' },
        { label: 'Careers', href: '#careers' },
        { label: 'Press & Media', href: '#press' },
    ],
    support: [
        { label: 'Help Center', href: '/contact' },
        { label: 'FAQs', href: '/contact' },
        { label: 'Dispute Resolution', href: '#dispute' },
        { label: 'Report an Agent', href: '#report' },
        { label: 'Contact Us', href: '/contact' },
    ],
};

const socialLinks = [
    { icon: FaFacebookF, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: FaTwitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: FaInstagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: FaLinkedinIn, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700' },
    { icon: FaYoutube, href: '#', label: 'YouTube', color: 'hover:bg-red-600' },
    { icon: FaTiktok, href: '#', label: 'TikTok', color: 'hover:bg-gray-800' },
];

const stats = [
    { value: '500+', label: 'Travel Agents', icon: HiOutlineUserGroup },
    { value: '50+', label: 'Countries', icon: HiOutlineGlobeAlt },
    { value: '10K+', label: 'Happy Travelers', icon: HiOutlineStar },
    { value: '100%', label: 'Verified Agents', icon: HiOutlineBadgeCheck },
];

/* ───── Link Column ───── */
const LinkColumn = ({ title, links }) => (
    <div>
        <h4 className="text-white font-semibold text-[13px] uppercase tracking-widest mb-5 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-gradient-to-r from-orange-500 to-orange-300 rounded-full" />
            {title}
        </h4>
        <ul className="space-y-2.5">
            {links.map((link) => (
                <li key={link.label}>
                    <Link
                        to={link.href}
                        className="text-gray-400 hover:text-white text-[13.5px] transition-all duration-200 hover:translate-x-1 inline-flex items-center gap-1.5 group"
                    >
                        <span className="w-0 group-hover:w-2 h-[2px] bg-orange-400 rounded-full transition-all duration-200" />
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

/* ───── Footer ───── */
const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    return (
        <footer className="relative overflow-hidden">

            {/* ──────────── Stats Bar ──────────── */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
                {/* Decorative blobs */}
                <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
                    <div className="absolute -top-20 left-1/4 w-72 h-72 bg-white rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-orange-400 rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative z-10">
                    {/* Stats Row */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10 sm:mb-14">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="flex flex-col items-center text-center gap-2 bg-white/[0.06] backdrop-blur-sm rounded-2xl py-5 px-3 border border-white/10"
                            >
                                <stat.icon className="text-orange-300 text-2xl mb-1" />
                                <span className="text-white text-2xl sm:text-3xl font-extrabold tracking-tight">{stat.value}</span>
                                <span className="text-blue-200 text-xs font-medium">{stat.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA + Newsletter */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left max-w-lg">
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                                Find Your Perfect Travel Agent
                            </h3>
                            <p className="text-blue-100 text-sm sm:text-base">
                                Join thousands of travelers who discover trusted agents on Bookooda. Get exclusive deals and travel tips straight to your inbox.
                            </p>
                        </div>
                        <form onSubmit={handleSubscribe} className="flex w-full max-w-md">
                            <div className="relative flex w-full bg-white/10 backdrop-blur-sm rounded-2xl p-1.5 border border-white/20">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="flex-1 bg-transparent text-white placeholder-blue-200 px-4 py-3 text-sm focus:outline-none min-w-0"
                                    required
                                />
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 whitespace-nowrap shadow-lg shadow-orange-500/25 cursor-pointer"
                                >
                                    {subscribed ? (
                                        <>✓ Subscribed!</>
                                    ) : (
                                        <>
                                            Subscribe
                                            <HiOutlineArrowRight className="text-base" />
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* ──────────── Main Footer ──────────── */}
            <div className="bg-gray-900 relative">
                {/* Subtle radial overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800/50 via-gray-900 to-gray-900 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8 relative z-10">

                    {/* ── Grid: Brand + 4 Link Columns ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-gray-800">

                        {/* Brand Column */}
                        <div className="lg:col-span-4">
                            <Link to="/" className="inline-flex items-center gap-3 group mb-5">
                                <img
                                    src="/mainlogo.png"
                                    alt="Bookooda Logo"
                                    className="h-11 w-auto transition-all duration-300 group-hover:scale-105 brightness-0 invert drop-shadow-sm"
                                />
                                <span
                                    className="font-black text-[26px] tracking-tight leading-none text-blue-600"
                                    style={{ fontFamily: 'Poppins, sans-serif' }}
                                >
                                    Book<span className="text-orange-400">ooda</span>
                                </span>
                            </Link>
                            <p className="text-gray-400 text-[13.5px] leading-relaxed mb-6 max-w-xs">
                                The marketplace where travelers find trusted travel agents & agencies. Compare, book, and travel with confidence — all on one platform.
                            </p>

                            {/* Contact */}
                            <div className="space-y-2.5">
                                <a
                                    href="mailto:info@bookooda.com"
                                    className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors duration-200 text-[13px] group"
                                >
                                    <span className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center group-hover:bg-orange-500/10 group-hover:border-orange-500/30 transition-all duration-200 flex-shrink-0">
                                        <HiOutlineMail className="text-sm" />
                                    </span>
                                    hello@bookooda.com
                                </a>

                                <div className="flex items-center gap-3 text-gray-400 text-[13px]">
                                    <span className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center flex-shrink-0">
                                        <HiOutlineLocationMarker className="text-sm" />
                                    </span>
                                    Islamabad, Pakistan
                                </div>
                            </div>
                        </div>

                        {/* Link Columns */}
                        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
                            <LinkColumn title="Marketplace" links={footerLinks.marketplace} />
                            <LinkColumn title="For Agents" links={footerLinks.forAgents} />
                            <LinkColumn title="Company" links={footerLinks.company} />
                            <LinkColumn title="Support" links={footerLinks.support} />
                        </div>
                    </div>

                    {/* ── Trust Badges ── */}
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-7 border-b border-gray-800">
                        {[
                            { icon: HiOutlineShieldCheck, text: 'Verified Agents Only', color: 'text-green-400' },
                            { icon: HiOutlineGlobeAlt, text: '50+ Countries', color: 'text-blue-400' },
                            { icon: HiOutlineStar, text: 'Traveler-Rated', color: 'text-yellow-400' },
                            { icon: HiOutlineBadgeCheck, text: 'Secure Platform', color: 'text-purple-400' },
                        ].map((badge) => (
                            <div key={badge.text} className="flex items-center gap-2 text-gray-500 text-xs">
                                <badge.icon className={`${badge.color} text-lg`} />
                                <span>{badge.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* ── Bottom Bar ── */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-7">
                        {/* Social Icons */}
                        <div className="flex items-center gap-2">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white ${social.color} hover:border-transparent transition-all duration-200 hover:scale-110`}
                                >
                                    <social.icon className="text-xs" />
                                </a>
                            ))}
                        </div>

                        {/* Copyright */}
                        <p className="text-gray-500 text-xs text-center order-last sm:order-none">
                            © {new Date().getFullYear()}{' '}
                            <span className="text-white font-semibold">Book</span>
                            <span className="text-orange-400 font-semibold">ooda</span>
                            {' '}— The Travel Agent Marketplace. All rights reserved.
                        </p>

                        {/* Legal */}
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                            <Link to="#terms" className="hover:text-gray-300 transition-colors duration-200">Terms</Link>
                            <span className="w-1 h-1 rounded-full bg-gray-700" />
                            <Link to="#privacy" className="hover:text-gray-300 transition-colors duration-200">Privacy</Link>
                            <span className="w-1 h-1 rounded-full bg-gray-700" />
                            <Link to="#cookies" className="hover:text-gray-300 transition-colors duration-200">Cookies</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
