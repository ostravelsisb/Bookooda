import React from 'react';
import { HiStar, HiUserGroup, HiX } from 'react-icons/hi';
import { HiPhone, HiEnvelope } from 'react-icons/hi2';

const AgentCard = ({ agent }) => {
    return (
        <div className="bg-white rounded-xl p-5 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-lg mb-1">{agent.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{agent.agency}</p>
                    <p className="text-xs text-gray-500">📍 {agent.city}</p>
                </div>
                <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg mb-2">
                        <HiStar className="text-amber-500 text-sm" />
                        <span className="font-bold text-sm text-gray-900">{agent.rating}</span>
                        <span className="text-xs text-gray-500">({agent.reviews})</span>
                    </div>
                    <div className="text-xs text-gray-600">{agent.experience}</div>
                </div>
            </div>

            {/* Services Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
                {agent.services.map((service, idx) => (
                    <span
                        key={idx}
                        className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                    >
                        {service}
                    </span>
                ))}
            </div>

            {/* Success Rate */}
            <div className="mb-4 p-3 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Success Rate</span>
                    <span className="font-bold text-green-700">{agent.successRate}</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md">
                    <HiPhone className="text-base" />
                    Contact
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200">
                    View Profile
                </button>
            </div>
        </div>
    );
};

export default AgentCard;
