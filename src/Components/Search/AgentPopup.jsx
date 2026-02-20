import React from 'react';
import { FiStar, FiMapPin, FiCheckCircle, FiExternalLink, FiMessageCircle, FiX } from 'react-icons/fi';

const AgentPopup = ({ agent, onClose }) => {
    if (!agent) return null;

    return (
        <div className="w-[300px] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fadeIn">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
                <button
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer"
                >
                    <FiX className="w-3.5 h-3.5" />
                </button>
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-sm border border-white/30">
                        {agent.avatar}
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <h3 className="text-white font-bold text-sm">{agent.name}</h3>
                            {agent.verified && <FiCheckCircle className="w-3.5 h-3.5 text-blue-200" />}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="flex items-center gap-1 text-blue-100 text-xs">
                                <FiMapPin className="w-3 h-3" />
                                {agent.city}
                            </span>
                            <span className="flex items-center gap-1 text-yellow-300 text-xs font-medium">
                                <FiStar className="w-3 h-3 fill-yellow-300" />
                                {agent.rating}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="p-4">
                {/* Experience + Reviews */}
                <div className="flex items-center gap-4 mb-3">
                    <div className="text-center">
                        <p className="text-sm font-bold text-gray-900">{agent.experience}</p>
                        <p className="text-[11px] text-gray-400">Experience</p>
                    </div>
                    <div className="w-px h-8 bg-gray-100" />
                    <div className="text-center">
                        <p className="text-sm font-bold text-gray-900">{agent.reviews}</p>
                        <p className="text-[11px] text-gray-400">Reviews</p>
                    </div>
                    <div className="w-px h-8 bg-gray-100" />
                    <div className="text-center">
                        <p className="text-sm font-bold text-gray-900">PKR {agent.startingPrice.toLocaleString()}</p>
                        <p className="text-[11px] text-gray-400">Starting</p>
                    </div>
                </div>

                {/* Services */}
                <div className="mb-4">
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Services</p>
                    <div className="flex flex-wrap gap-1.5">
                        {agent.services.map(service => (
                            <span key={service} className="px-2 py-1 rounded-lg bg-blue-50 text-blue-600 text-[11px] font-medium">
                                {service}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer">
                        <FiExternalLink className="w-3.5 h-3.5" />
                        View Profile
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 border-blue-100 text-blue-600 text-xs font-bold hover:bg-blue-50 transition-colors cursor-pointer">
                        <FiMessageCircle className="w-3.5 h-3.5" />
                        Contact
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AgentPopup;
