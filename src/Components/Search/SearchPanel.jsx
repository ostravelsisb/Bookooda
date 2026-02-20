import React, { useState } from 'react';
import { FiSearch, FiX, FiChevronDown, FiStar, FiFilter } from 'react-icons/fi';
import AgentCard from './AgentCard';
import { cities, serviceTypes } from './searchData';

const SearchPanel = ({
    agents,
    searchQuery,
    onSearchChange,
    hoveredAgent,
    selectedAgent,
    onHoverAgent,
    onLeaveAgent,
    onSelectAgent,
    filters,
    onFilterChange,
}) => {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Header */}
            <div className="p-4 border-b border-gray-100">
                {/* Search Input */}
                <div className="relative mb-3">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search visa, study, insurance or country…"
                        className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-all duration-200"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => onSearchChange('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer"
                        >
                            <FiX className="w-3 h-3 text-gray-500" />
                        </button>
                    )}
                </div>

                {/* Filter Toggle */}
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${showFilters
                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                        : 'bg-gray-50 text-gray-500 border border-gray-100 hover:bg-gray-100'
                        }`}
                >
                    <FiFilter className="w-3.5 h-3.5" />
                    Filters
                    <FiChevronDown className={`w-3 h-3 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
                </button>

                {/* Filters */}
                {showFilters && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-3 animate-fadeIn">
                        {/* City Filter */}
                        <div>
                            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1 block">City</label>
                            <select
                                value={filters.city}
                                onChange={(e) => onFilterChange('city', e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:border-blue-400 cursor-pointer"
                            >
                                <option value="">All Cities</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>

                        {/* Service Type */}
                        <div>
                            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Service Type</label>
                            <select
                                value={filters.serviceType}
                                onChange={(e) => onFilterChange('serviceType', e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:border-blue-400 cursor-pointer"
                            >
                                <option value="">All Services</option>
                                {serviceTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        {/* Rating Filter */}
                        <div>
                            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Minimum Rating</label>
                            <div className="flex gap-1.5">
                                {[0, 4.0, 4.5, 4.7].map(rating => (
                                    <button
                                        key={rating}
                                        onClick={() => onFilterChange('minRating', rating)}
                                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${filters.minRating === rating
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white border border-gray-200 text-gray-600 hover:bg-blue-50'
                                            }`}
                                    >
                                        {rating === 0 ? 'All' : (
                                            <>
                                                <FiStar className="w-3 h-3" />
                                                {rating}+
                                            </>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div>
                            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                                Max Price: {filters.maxPrice === 100000 ? 'Any' : `PKR ${filters.maxPrice.toLocaleString()}`}
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="100000"
                                step="5000"
                                value={filters.maxPrice}
                                onChange={(e) => onFilterChange('maxPrice', parseInt(e.target.value))}
                                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                                <span>Free</span>
                                <span>100K+</span>
                            </div>
                        </div>

                        {/* Clear Filters */}
                        <button
                            onClick={() => {
                                onFilterChange('city', '');
                                onFilterChange('serviceType', '');
                                onFilterChange('minRating', 0);
                                onFilterChange('maxPrice', 100000);
                            }}
                            className="w-full py-2 rounded-lg text-xs font-medium text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}
            </div>

            {/* Results Count */}
            <div className="px-4 py-2.5 border-b border-gray-50 bg-gray-50/50">
                <p className="text-xs text-gray-500">
                    <span className="font-bold text-gray-800">{agents.length}</span> agents found
                    {searchQuery && <span> for "<span className="text-blue-600">{searchQuery}</span>"</span>}
                </p>
            </div>

            {/* Results List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5 scrollbar-hide">
                {agents.length > 0 ? (
                    agents.map(agent => (
                        <AgentCard
                            key={agent.id}
                            agent={agent}
                            isHovered={hoveredAgent === agent.id}
                            isSelected={selectedAgent?.id === agent.id}
                            onHover={onHoverAgent}
                            onLeave={onLeaveAgent}
                            onClick={onSelectAgent}
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                            <FiSearch className="w-7 h-7 text-gray-300" />
                        </div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">No agents found</p>
                        <p className="text-xs text-gray-400 max-w-[200px]">
                            Try adjusting your search or filters to find more agents.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPanel;
