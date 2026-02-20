import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../Components/Contact/HeroSection';
import Sidebar from '../Components/Contact/Sidebar';
import FAQSection from '../Components/Contact/FAQSection';

const Contact = () => {
    const [activeService, setActiveService] = useState('visa');
    const [activeCategory, setActiveCategory] = useState('visa');

    return (
        <>
            <Helmet>
                <title>Contact Us | Bookooda - Help Center</title>
                <meta name="description" content="Need help? Contact Bookooda customer service for support with bookings, visas, flights, hotels, and more. Browse our FAQ or reach out directly." />
                <meta name="keywords" content="Bookooda Contact, Help Center, Customer Support, FAQ, Booking Help, Visa Support" />
                <link rel="canonical" href="https://bookooda.com/contact" />
                <meta property="og:title" content="Contact Us | Bookooda Help Center" />
                <meta property="og:description" content="Get help with your Bookooda bookings, payments, cancellations, and more." />
                <meta property="og:type" content="website" />
            </Helmet>

            <div className="min-h-screen bg-[#f5f7fa]">
                {/* Hero Section */}
                <HeroSection
                    activeService={activeService}
                    onServiceChange={setActiveService}
                />

                {/* Main Content: Sidebar + FAQ */}
                <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                        {/* Sidebar */}
                        <Sidebar
                            activeCategory={activeCategory}
                            onCategoryChange={setActiveCategory}
                        />

                        {/* FAQ Content */}
                        <div className="flex-1 min-w-0">
                            <FAQSection activeCategory={activeCategory} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
