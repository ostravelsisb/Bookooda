import React from "react";

const MiniNavBar = ({ activeOption, onOptionChange }) => {
    const navOptions = [
        { id: "find-agent", label: "Find an Agent", icon: "🔎" },
        { id: "file-ready", label: "File Ready", icon: "📄" },
        { id: "apply-visa", label: "Apply Visa", icon: "🛂" },
        { id: "top-rated", label: "Top Rated Agents", icon: "⭐" },
        { id: "agents-near", label: "Agents Near You", icon: "📍" },
        { id: "book-flights", label: "Book Flights", icon: "✈️" },
        { id: "book-hotels", label: "Book Hotels", icon: "🏨" },

    ];

    return (
        <div className="w-full">
            {/* Outer container controls max width */}
            <div className="mx-auto max-w-7xl px-4">

                {/* Scroll wrapper */}
                <div className="relative">
                    <div className="
            flex
            gap-2
            overflow-x-auto
            scroll-smooth
            no-scrollbar
            py-2
          ">

                        {/* Inner flex container */}
                        <div className="
              flex
              gap-2
              min-w-max
              md:mx-auto
              bg-white
              md:rounded-full
              md:shadow-lg
              md:px-2
              md:py-2
            ">

                            {navOptions.map((option) => {
                                const isActive = activeOption === option.id;

                                return (
                                    <button
                                        key={option.id}
                                        onClick={() => onOptionChange(option.id)}
                                        className={`
                      flex
                      items-center
                      gap-2
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      font-medium
                      whitespace-nowrap
                      transition-all
                      duration-300
                      flex-shrink-0
                      ${isActive
                                                ? "bg-blue-600 text-white shadow-md scale-105"
                                                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                            }
                    `}
                                    >
                                        <span className="text-base">{option.icon}</span>
                                        <span>{option.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default MiniNavBar;
