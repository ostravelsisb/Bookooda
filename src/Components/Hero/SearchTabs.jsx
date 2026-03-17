import React from 'react';

const SearchTabs = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'agents', label: 'Agents', icon: '👥' },
        { id: 'visa', label: 'Visa', icon: '🛂' },
        { id: 'flights', label: 'Flights', icon: '✈️' },
        { id: 'hotels', label: 'Hotels', icon: '🏨' },
        { id: 'packages', label: 'Packages', icon: '🎒' }
    ];

    return (
        <div className="flex border-b border-gray-200 mb-6">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-all duration-300 relative ${activeTab === tab.id
                            ? 'text-blue-600'
                            : 'text-gray-600 hover:text-blue-600'
                        }`}
                >
                    <span className="text-lg">{tab.icon}</span>
                    <span>{tab.label}</span>
                    {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>
                    )}
                </button>
            ))}
        </div>
    );
};

export default SearchTabs;
