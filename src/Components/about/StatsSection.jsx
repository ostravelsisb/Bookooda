import React from 'react';

const stats = [
    { label: "Happy Travelers", value: "100k+" },
    { label: "Verified Agents", value: "500+" },
    { label: "Destinations Covered", value: "150+" },
    { label: "Customer Support", value: "24/7" },
];

const StatsSection = () => {
    return (
        <section className="py-16 bg-blue-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <div key={index}>
                            <div className="text-4xl md:text-5xl font-extrabold mb-2">{stat.value}</div>
                            <div className="text-blue-200 font-medium uppercase tracking-wide text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
