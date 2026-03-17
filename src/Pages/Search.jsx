import React, { useState, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import SearchPanel from '../Components/Search/SearchPanel';
import MapView from '../Components/Search/MapView';
import MobileSheet from '../Components/Search/MobileSheet';
import { agents as allAgents } from '../Components/Search/searchData';

import 'leaflet/dist/leaflet.css';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [hoveredAgent, setHoveredAgent] = useState(null);
    const [filters, setFilters] = useState({
        city: '',
        serviceType: '',
        minRating: 0,
        maxPrice: 100000,
    });

    // Filter agents based on search query and filters
    const filteredAgents = useMemo(() => {
        return allAgents.filter(agent => {
            // Search query
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesName = agent.name.toLowerCase().includes(query);
                const matchesCity = agent.city.toLowerCase().includes(query);
                const matchesServices = agent.services.some(s => s.toLowerCase().includes(query));
                const matchesTags = agent.tags.some(t => t.toLowerCase().includes(query));
                if (!matchesName && !matchesCity && !matchesServices && !matchesTags) return false;
            }

            // City filter
            if (filters.city && agent.city !== filters.city) return false;

            // Service type filter
            if (filters.serviceType && !agent.tags.includes(filters.serviceType)) return false;

            // Rating filter
            if (filters.minRating && agent.rating < filters.minRating) return false;

            // Price filter
            if (filters.maxPrice < 100000 && agent.startingPrice > filters.maxPrice) return false;

            return true;
        });
    }, [searchQuery, filters]);

    const handleSearchChange = useCallback((value) => {
        setSearchQuery(value);
        setSelectedAgent(null);
    }, []);

    const handleFilterChange = useCallback((key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setSelectedAgent(null);
    }, []);

    const handleHoverAgent = useCallback((id) => {
        setHoveredAgent(id);
    }, []);

    const handleLeaveAgent = useCallback(() => {
        setHoveredAgent(null);
    }, []);

    const handleSelectAgent = useCallback((agent) => {
        setSelectedAgent(prev => prev?.id === agent.id ? null : agent);
    }, []);

    const handleClosePopup = useCallback(() => {
        setSelectedAgent(null);
    }, []);

    return (
        <>
            <Helmet>
                <title>Find Travel Agents | Bookooda - Search Visa, Study & Travel Experts</title>
                <meta name="description" content="Find verified travel agents near you on Bookooda. Search for visa experts, study consultants, flight booking, hotel reservation, and travel insurance agents across Pakistan." />
            </Helmet>

            <div className="h-screen flex flex-col">
                {/* Desktop Layout */}
                <div className="flex-1 flex relative overflow-hidden">
                    {/* Left Panel – Desktop only */}
                    <div className="hidden md:flex w-[380px] flex-shrink-0 border-r border-gray-200 shadow-[2px_0_8px_rgba(0,0,0,0.04)] z-10 flex-col">
                        <SearchPanel
                            agents={filteredAgents}
                            searchQuery={searchQuery}
                            onSearchChange={handleSearchChange}
                            hoveredAgent={hoveredAgent}
                            selectedAgent={selectedAgent}
                            onHoverAgent={handleHoverAgent}
                            onLeaveAgent={handleLeaveAgent}
                            onSelectAgent={handleSelectAgent}
                            filters={filters}
                            onFilterChange={handleFilterChange}
                        />
                    </div>

                    {/* Right Panel – Map */}
                    <div className="flex-1 relative">
                        <MapView
                            agents={filteredAgents}
                            hoveredAgent={hoveredAgent}
                            selectedAgent={selectedAgent}
                            onHoverAgent={handleHoverAgent}
                            onLeaveAgent={handleLeaveAgent}
                            onSelectAgent={handleSelectAgent}
                            onClosePopup={handleClosePopup}
                        />
                    </div>
                </div>

                {/* Mobile Sheet */}
                <MobileSheet
                    agents={filteredAgents}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    selectedAgent={selectedAgent}
                    onSelectAgent={handleSelectAgent}
                    onClosePopup={handleClosePopup}
                />
            </div>
        </>
    );
};

export default Search;
