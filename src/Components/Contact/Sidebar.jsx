import React from 'react';
import { categories } from '../Contact/contactData';
import { motion } from 'framer-motion';

const Sidebar = ({ activeCategory, onCategoryChange }) => {
    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-[280px] flex-shrink-0">
                <div className="bg-white rounded-2xl shadow-md overflow-hidden sticky top-24">
                    <div className="px-5 py-4 border-b border-gray-100">
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                            Help Topics
                        </h3>
                    </div>
                    <nav className="py-2">
                        {categories.map((cat) => {
                            const isActive = activeCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => onCategoryChange(cat.id)}
                                    className={`w-full flex items-center gap-3 px-5 py-[14px] text-left transition-all duration-300 cursor-pointer relative group ${isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                                        }`}
                                >
                                    {/* Active indicator bar */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400 rounded-r"
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <cat.icon className={`w-[18px] h-[18px] flex-shrink-0 transition-colors duration-300 ${isActive ? 'text-blue-100' : 'text-gray-400 group-hover:text-blue-500'
                                        }`} />
                                    <span className={`text-[14px] transition-all duration-300 ${isActive ? 'font-semibold' : 'font-medium'
                                        }`}>
                                        {cat.label}
                                    </span>
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Mobile Horizontal Scroll */}
            <div className="lg:hidden mb-4 -mx-4 px-4">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map((cat) => {
                        const isActive = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => onCategoryChange(cat.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-300 cursor-pointer flex-shrink-0 ${isActive
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'
                                    }`}
                            >
                                <cat.icon className="w-4 h-4" />
                                <span>{cat.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Sidebar;
