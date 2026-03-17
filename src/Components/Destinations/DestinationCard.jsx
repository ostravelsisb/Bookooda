import React from 'react';
import { HiStar, HiUserGroup } from 'react-icons/hi';

const DestinationCard = ({ destination, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
        >
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* Flag Badge */}
                <div className="absolute top-4 left-4 text-4xl drop-shadow-lg">
                    {destination.flag}
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                    <HiStar className="text-amber-500 text-sm" />
                    <span className="font-bold text-sm text-gray-900">{destination.rating}</span>
                </div>

                {/* Country Name */}
                <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                        {destination.name}
                    </h3>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-5">
                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {destination.description}
                </p>

                {/* Categories Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {destination.categories.map((category, idx) => (
                        <span
                            key={idx}
                            className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                        >
                            {category}
                        </span>
                    ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-gray-600">
                        <HiUserGroup className="text-lg" />
                        <span className="text-sm font-medium">{destination.agentsAvailable} Agents</span>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500 mb-0.5">Starting from</p>
                        <p className="text-lg font-bold text-blue-600">{destination.startingPrice}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DestinationCard;
