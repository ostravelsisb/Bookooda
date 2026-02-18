import React from 'react';
import HeroSection from "../Components/Hero/HeroSection";
import TopDestinations from "../Components/Destinations/TopDestinations";
import HowItWorks from "../Components/Home/HowItWorks";
import PlatformRules from "../Components/Home/PlatformRules";


const Home = () => {
    return (
        <div className="min-h-screen">

            <HeroSection />

            {/* Top Destinations Section */}
            <TopDestinations />

            {/* How It Works Section */}
            <HowItWorks />

            {/* Platform Rules Section */}
            <PlatformRules />


            {/* Additional sections can be added here */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                        Why Choose <span className='text-primary text-blue-600 font-bold'>Book</span><span className='text-primary font-bold  text-orange-600 font-bold'>ooda</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="text-5xl mb-4">🌟</div>
                            <h3 className="text-xl font-semibold mb-2">Trusted Agents</h3>
                            <p className="text-gray-600">Connect with verified travel agents worldwide</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="text-5xl mb-4">⚡</div>
                            <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
                            <p className="text-gray-600">Quick visa applications and approvals</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="text-5xl mb-4">💼</div>
                            <h3 className="text-xl font-semibold mb-2">All-in-One Platform</h3>
                            <p className="text-gray-600">Flights, hotels, visas, and packages in one place</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
