import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiX, FiChevronUp, FiChevronDown, FiMapPin, FiStar, FiCheckCircle, FiExternalLink, FiMessageCircle } from 'react-icons/fi';

const MobileSheet = ({
    agents,
    searchQuery,
    onSearchChange,
    selectedAgent,
    onSelectAgent,
    onClosePopup,
}) => {
    const [sheetState, setSheetState] = useState('peek'); // 'collapsed' | 'peek' | 'full'
    const sheetRef = useRef(null);
    const startY = useRef(0);
    const currentY = useRef(0);

    const handleTouchStart = (e) => {
        startY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
        currentY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
        const diff = startY.current - currentY.current;
        if (diff > 50) {
            // Swiped up
            setSheetState(prev => prev === 'collapsed' ? 'peek' : 'full');
        } else if (diff < -50) {
            // Swiped down
            setSheetState(prev => prev === 'full' ? 'peek' : 'collapsed');
        }
    };

    const getSheetHeight = () => {
        switch (sheetState) {
            case 'collapsed': return 'h-[80px]';
            case 'peek': return 'h-[45vh]';
            case 'full': return 'h-[85vh]';
            default: return 'h-[45vh]';
        }
    };

    return (
        <>
            {/* Mobile Search Bar - Fixed Top */}
            <div className="fixed top-[70px] left-0 right-0 z-[1000] px-3 pt-2 md:hidden">
                <div className="relative bg-white rounded-xl shadow-lg border border-gray-100">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search visa, study, insurance…"
                        className="w-full pl-9 pr-9 py-3 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => onSearchChange('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
                        >
                            <FiX className="w-3 h-3 text-gray-500" />
                        </button>
                    )}
                </div>
            </div>

            {/* Bottom Sheet */}
            <div
                ref={sheetRef}
                className={`fixed bottom-0 left-0 right-0 z-[1000] bg-white rounded-t-3xl shadow-2xl transition-all duration-300 ease-out md:hidden ${getSheetHeight()}`}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* Drag Handle */}
                <div className="flex justify-center pt-2.5 pb-1">
                    <div className="w-10 h-1 rounded-full bg-gray-300" />
                </div>

                {/* Toggle buttons */}
                <div className="flex items-center justify-between px-4 pb-2 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-500">
                        {agents.length} agents found
                    </p>
                    <div className="flex gap-1">
                        <button onClick={() => setSheetState('full')} className="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <FiChevronUp className="w-4 h-4 text-gray-400" />
                        </button>
                        <button onClick={() => setSheetState('collapsed')} className="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <FiChevronDown className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Selected Agent Detail */}
                {selectedAgent && (
                    <div className="p-4 border-b border-gray-100 bg-blue-50/50">
                        <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                {selectedAgent.avatar}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-1.5 mb-0.5">
                                    <h3 className="text-sm font-bold text-gray-900">{selectedAgent.name}</h3>
                                    {selectedAgent.verified && <FiCheckCircle className="w-3.5 h-3.5 text-blue-500" />}
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="flex items-center gap-1 text-xs text-gray-500">
                                        <FiMapPin className="w-3 h-3" />{selectedAgent.city}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-amber-500 font-medium">
                                        <FiStar className="w-3 h-3 fill-amber-400" />{selectedAgent.rating}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-1 mb-3">
                                    {selectedAgent.services.map(s => (
                                        <span key={s} className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-medium">{s}</span>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <button className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold cursor-pointer">
                                        <FiExternalLink className="w-3 h-3" /> View Profile
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl border border-blue-200 text-blue-600 text-xs font-bold cursor-pointer">
                                        <FiMessageCircle className="w-3 h-3" /> Contact
                                    </button>
                                </div>
                            </div>
                            <button onClick={onClosePopup} className="p-1 cursor-pointer">
                                <FiX className="w-4 h-4 text-gray-400" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Agent List */}
                <div className="overflow-y-auto flex-1" style={{ height: 'calc(100% - 60px)' }}>
                    <div className="p-3 space-y-2">
                        {agents.map(agent => (
                            <div
                                key={agent.id}
                                onClick={() => onSelectAgent(agent)}
                                className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 ${selectedAgent?.id === agent.id
                                    ? 'bg-blue-50 border-blue-200'
                                    : 'bg-white border-gray-100 active:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                                        {agent.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1">
                                            <h4 className="text-sm font-bold text-gray-900 truncate">{agent.name}</h4>
                                            {agent.verified && <FiCheckCircle className="w-3 h-3 text-blue-500 flex-shrink-0" />}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-500">{agent.city}</span>
                                            <span className="flex items-center gap-0.5 text-xs text-amber-500"><FiStar className="w-3 h-3 fill-amber-400" />{agent.rating}</span>
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-xs font-bold text-gray-900">PKR {agent.startingPrice.toLocaleString()}</p>
                                        <p className="text-[10px] text-gray-400">{agent.tags[0]}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileSheet;
