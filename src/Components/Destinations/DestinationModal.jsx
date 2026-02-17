import React, { useEffect } from 'react';
import { HiX, HiStar, HiClock, HiCheckCircle, HiDocument } from 'react-icons/hi';
import AgentCard from './AgentCard';
import { agentsData } from '../../data/destinationsData';

const DestinationModal = ({ destination, isOpen, onClose }) => {
    // Close modal on ESC key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !destination) return null;

    const agents = agentsData[destination.id] || [];

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
                onClick={onClose}
            ></div>

            {/* Modal/Drawer */}
            <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[600px] lg:w-[700px] bg-white shadow-2xl transform transition-transform duration-300 overflow-y-auto">
                {/* Header with Banner Image */}
                <div className="relative h-64 md:h-72">
                    <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg group"
                    >
                        <HiX className="text-xl text-gray-700 group-hover:text-gray-900" />
                    </button>

                    {/* Flag and Title */}
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-5xl drop-shadow-lg">{destination.flag}</span>
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                                    {destination.name}
                                </h2>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-lg">
                                        <HiStar className="text-amber-500 text-sm" />
                                        <span className="font-bold text-sm">{destination.rating}</span>
                                    </div>
                                    <span className="text-white text-sm drop-shadow">
                                        {destination.agentsAvailable} Agents Available
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {destination.categories.map((category, idx) => (
                            <span
                                key={idx}
                                className="px-4 py-2 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full"
                            >
                                {category}
                            </span>
                        ))}
                    </div>

                    {/* Overview */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Overview</h3>
                        <p className="text-gray-600 leading-relaxed">{destination.overview}</p>
                    </div>

                    {/* Key Information Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div className="bg-blue-50 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <HiClock className="text-blue-600 text-xl" />
                                <span className="text-xs text-gray-600 font-medium">Processing Time</span>
                            </div>
                            <p className="font-bold text-gray-900">{destination.processingTime}</p>
                        </div>
                        <div className="bg-green-50 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <HiCheckCircle className="text-green-600 text-xl" />
                                <span className="text-xs text-gray-600 font-medium">Success Rate</span>
                            </div>
                            <p className="font-bold text-gray-900">{destination.successRate}</p>
                        </div>
                        <div className="bg-orange-50 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-orange-600 text-xl">💰</span>
                                <span className="text-xs text-gray-600 font-medium">Starting Price</span>
                            </div>
                            <p className="font-bold text-gray-900">{destination.startingPrice}</p>
                        </div>
                    </div>

                    {/* Required Documents */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <HiDocument className="text-blue-600" />
                            Required Documents
                        </h3>
                        <ul className="space-y-2">
                            {destination.requiredDocs.map((doc, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-gray-700">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                                    {doc}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Available Agents */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            Available Agents ({agents.length})
                        </h3>
                        {agents.length > 0 ? (
                            <div className="space-y-4">
                                {agents.map((agent) => (
                                    <AgentCard key={agent.id} agent={agent} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-gray-50 rounded-xl">
                                <p className="text-gray-500">No agents available for this destination yet.</p>
                                <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    Request Agent
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DestinationModal;
