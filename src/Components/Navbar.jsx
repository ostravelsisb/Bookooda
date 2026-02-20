import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { RiMenu4Line, RiCloseLine } from 'react-icons/ri';
import { TbArrowUpRight } from 'react-icons/tb';
import {
    HiOutlineHome,
    HiOutlineSearch,
    HiOutlineUserGroup,
    HiOutlinePhone,
    HiOutlineSupport,
    HiOutlineCalendar,
    HiOutlineInformationCircle
} from "react-icons/hi";
function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState('home');
    const navigate = useNavigate();
    const menuRef = useRef(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') setIsOpen(false); };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, []);

    const close = () => setIsOpen(false);


    const navLinks = [
        {
            id: 'home',
            label: 'Home',
            href: '/',
            icon: <HiOutlineHome className="text-base" />
        },
        {
            id: 'search',
            label: 'Search',
            href: '/search',
            icon: <HiOutlineSearch className="text-base" />
        },
        {
            id: 'aboutus',
            label: 'About Us',
            href: '/about',
            icon: <HiOutlineInformationCircle className="text-base" />
        },
        {
            id: 'contactus',
            label: 'Contact Us',
            href: '/contact',
            icon: <HiOutlinePhone className="text-base" />
        },
        {
            id: 'support',
            label: 'Support',
            href: '/support',
            icon: <HiOutlineSupport className="text-base" />
        },
        {
            id: 'bookings',
            label: 'Bookings',
            href: '#bookings',
            icon: <HiOutlineCalendar className="text-base" />
        },
    ];


    return (
        <nav
            ref={menuRef}
            className={`w-full z-50 sticky top-0 transition-all duration-300 ${scrolled
                ? 'bg-white/80 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] border-b border-white/20'
                : 'bg-white shadow-sm border-b border-gray-50'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-[68px] items-center gap-4">

                    {/* ── Logo ── */}
                    <Link
                        to="/"
                        className="flex-shrink-0 flex items-center gap-3 group"
                        onClick={() => setActiveLink('home')}
                    >
                        {/* Logo Image */}
                        <img
                            src="/mainlogo.png"
                            alt="Bookooda Logo"
                            className="h-11 w-auto transition-all duration-300 group-hover:scale-105 drop-shadow-sm"
                        />
                        <span className="font-black text-[24px] tracking-tight leading-none text-blue-600 transition-all duration-300 group-hover:text-blue-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Book<span className="text-orange-500 group-hover:text-orange-600 transition-colors duration-300">ooda</span>
                        </span>
                    </Link>

                    {/* ── Desktop Nav ── */}
                    <div className="hidden md:flex items-center gap-0.5 bg-gray-50 rounded-2xl px-1.5 py-1.5 border border-gray-100">
                        {navLinks.map((link) => (
                            <Link
                                key={link.id}
                                to={link.href}
                                onClick={() => setActiveLink(link.id)}
                                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-[14px] font-medium transition-all duration-200 whitespace-nowrap ${activeLink === link.id
                                    ? 'bg-white text-blue-600 shadow-sm shadow-gray-200 border border-gray-100'
                                    : 'text-gray-500 hover:text-gray-800 hover:bg-white/70'
                                    }`}
                            >
                                {link.icon}
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* ── Desktop CTA ── */}
                    <div className="hidden md:flex items-center gap-2 flex-shrink-0">
                        <Link
                            to="/auth"
                            className="text-gray-600 hover:text-blue-600 font-semibold text-[14.5px] px-4 py-2 rounded-xl hover:bg-blue-50 transition-all duration-200"
                        >
                            Login
                        </Link>
                        <Link
                            to="/auth"
                            className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white px-5 py-2.5 rounded-2xl text-[14px] font-bold transition-all duration-300 shadow-md shadow-orange-200 hover:shadow-lg hover:shadow-orange-300 hover:-translate-y-0.5 transform"
                        >
                            Signup now
                            <TbArrowUpRight className="text-base" />
                        </Link>
                    </div>

                    {/* ── Mobile Hamburger ── */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isOpen}
                        className={`md:hidden flex items-center justify-center w-10 h-10 rounded-2xl border transition-all duration-200 focus:outline-none ${isOpen
                            ? 'bg-blue-50 border-blue-200 text-blue-600'
                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600'
                            }`}
                    >
                        {isOpen
                            ? <RiCloseLine className="text-xl" />
                            : <RiMenu4Line className="text-xl" />
                        }
                    </button>

                </div>
            </div>

            {/* ── Mobile Dropdown ── */}
            <div
                className={`md:hidden absolute w-full bg-white border-t border-gray-100 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
            >
                <div className="px-4 pt-3 pb-6">

                    {/* Mobile nav links */}
                    <div className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.id}
                                to={link.href}
                                onClick={() => { setActiveLink(link.id); close(); }}
                                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-[15px] font-medium transition-all duration-200 ${activeLink === link.id
                                    ? 'bg-blue-50 text-blue-600 border border-blue-100'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                                    }`}
                            >
                                {/* Icon badge */}
                                <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0 ${activeLink === link.id
                                    ? 'bg-blue-100 text-blue-600'
                                    : 'bg-gray-100 text-gray-500'
                                    }`}>
                                    {link.icon}
                                </span>
                                {link.label}
                                {activeLink === link.id && (
                                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="my-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                    {/* CTA buttons */}
                    <div className="flex flex-col gap-2.5">
                        <Link
                            to="/auth"
                            onClick={close}
                            className="flex items-center justify-center gap-2 w-full text-center py-3 px-4 rounded-2xl text-[15px] font-semibold text-blue-600 border-2 border-blue-100 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                        >
                            Login to your account
                        </Link>
                        <Link
                            to="/auth"
                            onClick={close}
                            className="flex items-center justify-center gap-2 w-full text-center bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white py-3 px-4 rounded-2xl text-[15px] font-bold transition-all duration-200 shadow-md shadow-orange-200"
                        >
                            Signup now
                            <TbArrowUpRight className="text-base" />
                        </Link>
                    </div>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;