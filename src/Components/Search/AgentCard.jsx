import React from 'react';
import { FiStar, FiMapPin, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const AgentCard = ({ agent, isHovered, isSelected, onHover, onLeave, onClick }) => {
    return (
        <div
            onMouseEnter={() => onHover(agent.id)}
            onMouseLeave={onLeave}
            onClick={() => onClick(agent)}
            className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 group ${isSelected
                ? 'bg-blue-50 border-blue-200 shadow-md shadow-blue-100'
                : isHovered
                    ? 'bg-blue-50/50 border-blue-100 shadow-sm'
                    : 'bg-white border-gray-100 hover:border-blue-100 hover:shadow-sm'
                }`}
        >
            <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors duration-300 ${isSelected
                    ? 'bg-blue-600 text-white'
                    : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                    }`}>
                    {agent.avatar}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                        <h3 className="text-sm font-bold text-gray-900 truncate">
                            {agent.name}
                        </h3>
                        {agent.verified && (
                            <FiCheckCircle className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                        )}
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                            <FiMapPin className="w-3 h-3" />
                            {agent.city}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span className="flex items-center gap-1 text-xs text-amber-500 font-medium">
                            <FiStar className="w-3 h-3 fill-amber-400" />
                            {agent.rating}
                        </span>
                        <span className="text-xs text-gray-400">({agent.reviews})</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                        {agent.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[11px] font-semibold">
                                {tag}
                            </span>
                        ))}
                        <span className="px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 text-[11px] font-medium">
                            {agent.experience}
                        </span>
                    </div>

                    {/* Services */}
                    <p className="text-xs text-gray-400 mb-3 truncate">
                        {agent.services.join(' • ')}
                    </p>

                    {/* Bottom row */}
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-xs text-gray-400">From </span>
                            <span className="text-sm font-bold text-gray-900">
                                PKR {agent.startingPrice.toLocaleString()}
                            </span>
                        </div>
                        <button className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 group-hover:gap-1.5 cursor-pointer">
                            View Details
                            <FiArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentCard;
