import React, { useRef, useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const AccordionItem = ({ item, isOpen, onToggle }) => {
    const contentRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (isOpen && contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        } else {
            setHeight(0);
        }
    }, [isOpen]);

    return (
        <div
            className={`rounded-xl mb-3 overflow-hidden transition-all duration-300 ${isOpen
                ? 'bg-blue-50 border border-blue-100 shadow-sm'
                : 'bg-gray-50 border border-gray-100 hover:bg-gray-100 hover:border-gray-200'
                }`}
        >
            {/* Question */}
            <button
                onClick={() => onToggle(item.id)}
                className="w-full flex items-center justify-between px-5 py-[18px] text-left cursor-pointer group"
            >
                <span className={`text-[15px] font-medium pr-4 transition-colors duration-300 ${isOpen ? 'text-blue-700' : 'text-gray-800 group-hover:text-blue-600'
                    }`}>
                    {item.question}
                </span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="flex-shrink-0"
                >
                    <FiChevronDown
                        className={`w-5 h-5 transition-colors duration-300 ${isOpen ? 'text-blue-600' : 'text-gray-400'
                            }`}
                    />
                </motion.span>
            </button>

            {/* Answer */}
            <div
                style={{ maxHeight: `${height}px` }}
                className="transition-all duration-400 ease-in-out overflow-hidden"
            >
                <div ref={contentRef} className="px-5 pb-5">
                    <div className="pt-1 border-t border-blue-100">
                        <p className="text-gray-600 text-[14px] leading-relaxed pt-3">
                            {item.answer}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccordionItem;
