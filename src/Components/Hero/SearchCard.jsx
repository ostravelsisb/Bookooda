import React from 'react';
import AgentSearch from './SearchOptions/AgentSearch';
import VisaSearch from './SearchOptions/VisaSearch';
import FlightSearch from './SearchOptions/FlightSearch';
import HotelSearch from './SearchOptions/HotelSearch';
import PackageSearch from './SearchOptions/PackageSearch';
import CarSearch from './SearchOptions/CarSearch';
import InsuranceSearch from './SearchOptions/InsuranceSearch';
import GuideSearch from './SearchOptions/GuideSearch';

const SearchCard = ({ activeNavOption = 'find-agent' }) => {
    // Map MiniNavBar options to search components
    const renderSearchForm = () => {
        switch (activeNavOption) {
            case 'find-agent':
                return <AgentSearch />;
            case 'apply-visa':
            case 'file-ready':
                return <VisaSearch />;
            case 'book-flights':
                return <FlightSearch />;
            case 'book-hotels':
                return <HotelSearch />;
            case 'rent-a-car':
                return <CarSearch />;
            case 'insurance':
                return <InsuranceSearch />;
            case 'travel-guide':
                return <GuideSearch />;
            default:
                return <AgentSearch />;
        }
    };

    // Get dynamic title based on active option
    const getTitle = () => {
        const titles = {
            'find-agent': 'Find Your Perfect Travel Agent',
            'file-ready': 'Quick Visa File Processing',
            'apply-visa': 'Apply for Your Visa Online',
            'book-flights': 'Book Your World-Class Flight',
            'book-hotels': 'Book Your Premium Stay',
            'rent-a-car': 'Rent a Car for Your Journey',
            'insurance': 'Secure Your Trip with Insurance',
            'travel-guide': 'Find Trusted Local Tour Guides',
        };
        return titles[activeNavOption] || 'Search';
    };

    return (
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-5xl mx-auto transform hover:shadow-3xl transition-all duration-300">
            {/* Dynamic Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {getTitle()}
            </h2>

            {/* Dynamic Search Form with fade animation */}
            <div className="animate-fadeIn" key={activeNavOption}>
                {renderSearchForm()}
            </div>
        </div>
    );
};

export default SearchCard;
