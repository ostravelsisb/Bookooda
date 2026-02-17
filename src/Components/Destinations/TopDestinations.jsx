import React, { useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import DestinationCard from './DestinationCard';
import DestinationModal from './DestinationModal';
import { destinationsData } from '../../data/destinationsData';

const TopDestinations = () => {
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = (destination) => {
        setSelectedDestination(destination);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedDestination(null), 300);
    };

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Top Visa & Travel Destinations
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                        Explore countries for tourism, study, work & immigration
                    </p>
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                        View All Destinations
                        <HiArrowRight className="text-lg" />
                    </button>
                </div>

                {/* Destinations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {destinationsData.map((destination) => (
                        <DestinationCard
                            key={destination.id}
                            destination={destination}
                            onClick={() => handleCardClick(destination)}
                        />
                    ))}
                </div>
            </div>

            {/* Modal */}
            <DestinationModal
                destination={selectedDestination}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </section>
    );
};

export default TopDestinations;
