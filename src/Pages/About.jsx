import React from 'react';
import { Helmet } from 'react-helmet-async';
import AboutHero from '../components/about/AboutHero';
import OurMission from '../components/about/OurMission';
import OurVision from '../components/about/OurVision';
import WhyChooseUs from '../components/about/WhyChooseUs';
import HowItWorks from '../components/about/HowItWorks';
import ServicesOverview from '../components/about/ServicesOverview';
import AgentMarketplace from '../components/about/AgentMarketplace';
import TrustSafety from '../components/about/TrustSafety';
import StatsSection from '../components/about/StatsSection';
import Testimonials from '../components/about/Testimonials';
import CallToAction from '../components/about/CallToAction';

const About = () => {
    return (
        <>
            <Helmet>
                <title>About Us | Bookooda - Global Travel & Visa Marketplace</title>
                <meta name="description" content="Learn about Bookooda, the leading marketplace connecting travelers with verified agents for flights, visas, study abroad, and more. Trust, transparency, and technology." />
                <meta name="keywords" content="Bookooda, About Bookooda, Travel Marketplace, Visa Consulatants, Study Abroad, Travel Agents, Flight Booking" />
                <link rel="canonical" href="https://bookooda.com/about" />
                <meta property="og:title" content="About Us | Bookooda" />
                <meta property="og:description" content="Discover how Bookooda is redefining travel with verified agents and best rates." />
                <meta property="og:type" content="website" />
            </Helmet>

            <div className="bg-white min-h-screen">
                <AboutHero />
                <StatsSection />
                <OurMission />
                <ServicesOverview />
                <AgentMarketplace />
                <WhyChooseUs />
                <OurVision />
                <HowItWorks />
                <TrustSafety />
                <Testimonials />
                <CallToAction />
            </div>
        </>
    );
};

export default About;
