import React from 'react';

const TabSwitcher = ({ activeRole, onSwitch }) => {
    const tabs = [
        { id: 'user', label: 'User' },
        { id: 'agent', label: 'Agent' },
        { id: 'admin', label: 'Admin' },
    ];

    return (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/30 backdrop-blur-md p-1.5 rounded-full shadow-lg border border-white/40 flex space-x-1">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onSwitch(tab.id)}
                    className={`
                        px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                        ${activeRole === tab.id
                            ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-white/50'}
                    `}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default TabSwitcher;
