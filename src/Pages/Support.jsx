import React from 'react';
import { Helmet } from 'react-helmet-async';
import SupportHero from '../Components/Support/SupportHero';
import SupportChannels from '../Components/Support/SupportChannels';
import KnowledgeBase from '../Components/Support/KnowledgeBase';
import PopularFAQs from '../Components/Support/PopularFAQs';
import SupportProcess from '../Components/Support/SupportProcess';
import SubmitTicket from '../Components/Support/SubmitTicket';
import SupportCTA from '../Components/Support/SupportCTA';

const Support = () => {
    return (
        <>
            <Helmet>
                <title>Support | Bookooda - Help & Customer Service</title>
                <meta name="description" content="Get help with your Bookooda bookings, visa applications, flights, hotels, and more. Browse our knowledge base, submit a ticket, or chat with our 24/7 support team." />
                <meta name="keywords" content="Bookooda Support, Customer Service, Help Center, Travel Support, Visa Help, Booking Support, Ticket" />
                <link rel="canonical" href="https://bookooda.com/support" />
                <meta property="og:title" content="Support | Bookooda Help Center" />
                <meta property="og:description" content="24/7 customer support for all your Bookooda bookings and services." />
                <meta property="og:type" content="website" />
            </Helmet>

            <div className="min-h-screen bg-[#f5f7fa]">
                <SupportHero />
                <SupportChannels />
                <KnowledgeBase />
                <SupportProcess />
                <PopularFAQs />
                <SubmitTicket />
                <SupportCTA />
            </div>
        </>
    );
};

export default Support;
