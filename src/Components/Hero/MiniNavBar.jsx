import React, { useState } from "react";

const MiniNavBar = ({ activeOption, onOptionChange }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const navOptions = [
        { id: "find-agent", label: "Find Agent", icon: "🔎" },
        { id: "file-ready", label: "File Ready", icon: "📄" },
        { id: "apply-visa", label: "Apply Visa", icon: "🛂" },
        { id: "top-rated", label: "Top Rated", icon: "⭐" },
        { id: "agents-near", label: "Near You", icon: "📍" },
        { id: "book-flights", label: "Flights", icon: "✈️" },
        { id: "book-hotels", label: "Hotels", icon: "🏨" },
    ];

    // Logic to determine which items to show on mobile
    // If expanded, show all. If not, show first 3 items.
    const mobileOptions = isExpanded ? navOptions : navOptions.slice(0, 3);

    return (
        <div className="w-full bg-gray-50 py-4 md:bg-transparent md:py-0">
            <div className="mx-auto max-w-7xl px-4">

                {/* ==============================
            MOBILE VIEW (Grid Layout)
           ============================== */}
                <div className="md:hidden">
                    <div className="grid grid-cols-2 gap-3">

                        {/* Render Visible Options */}
                        {mobileOptions.map((option) => {
                            const isActive = activeOption === option.id;
                            return (
                                <button
                                    key={option.id}
                                    onClick={() => onOptionChange(option.id)}
                                    className={`
                    flex flex-col items-center justify-center
                    p-4 rounded-xl shadow-sm border
                    transition-all duration-300
                    ${isActive
                                            ? "bg-blue-600 border-blue-600 text-white shadow-blue-200"
                                            : "bg-white border-gray-100 text-gray-700 hover:bg-blue-50 hover:border-blue-200"
                                        }
                  `}
                                >
                                    <span className="text-2xl mb-2">{option.icon}</span>
                                    <span className="text-sm font-semibold">{option.label}</span>
                                </button>
                            );
                        })}

                        {/* Explore / Collapse Button */}
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="
                flex flex-col items-center justify-center
                p-4 rounded-xl border border-dashed border-blue-300
                bg-blue-50 text-blue-600
                hover:bg-blue-100 transition-all duration-300
              "
                        >
                            <span className="text-2xl mb-2">
                                {isExpanded ? "🔼" : "🚀"}
                            </span>
                            <span className="text-sm font-bold">
                                {isExpanded ? "Show Less" : "Explore"}
                            </span>
                        </button>

                    </div>
                </div>

                {/* ==============================
            DESKTOP VIEW (Pill Scroller)
           ============================== */}
                <div className="hidden md:flex justify-center mt-2">
                    <div className="
            flex gap-2 p-2 
            bg-white rounded-full shadow-lg border border-gray-100
          ">
                        {navOptions.map((option) => {
                            const isActive = activeOption === option.id;
                            return (
                                <button
                                    key={option.id}
                                    onClick={() => onOptionChange(option.id)}
                                    className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-full
                    text-sm font-medium transition-all duration-300
                    ${isActive
                                            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md transform scale-105"
                                            : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                                        }
                  `}
                                >
                                    <span>{option.icon}</span>
                                    <span>{option.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MiniNavBar;