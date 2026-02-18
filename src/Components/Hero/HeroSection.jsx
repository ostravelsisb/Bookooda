import React, { useState } from 'react';
import MiniNavBar from '../Hero/MiniNavBar';
import SearchCard from '../Hero/SearchCard';

const HeroSection = () => {
    const [activeNavOption, setActiveNavOption] = useState('find-agent');

    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Tropical Beach"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto space-y-8">
                {/* Headline */}
                <div className="text-center mb-12 animate-fadeIn">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
                        SEE THE WORLD WITH TRUSTED AGENTS
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 font-light drop-shadow-md">
                        Your journey begins with the right travel partner
                    </p>
                </div>

                {/* Mini Navigation Bar */}
                <div className="flex justify-center">
                    <MiniNavBar
                        activeOption={activeNavOption}
                        onOptionChange={setActiveNavOption}
                    />
                </div>

                {/* Search Card - Pass activeNavOption to determine which form to show */}
                <div className="transform translate-y-4">
                    <SearchCard activeNavOption={activeNavOption} />
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-5"></div>
        </section>
    );
};

export default HeroSection;
