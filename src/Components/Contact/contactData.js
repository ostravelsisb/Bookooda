import {
    FiFileText, FiCalendar, FiBookOpen, FiShield, FiNavigation, FiHome
} from 'react-icons/fi';
import {
    MdFlightTakeoff, MdHotel, MdHealthAndSafety, MdSupportAgent, MdOutlineDescription
} from 'react-icons/md';

// Hero service cards (top hero area)
export const serviceCards = [
    { id: 'visa', label: 'Visa Filing', icon: MdOutlineDescription },
    { id: 'appointment', label: 'Appointment Booking', icon: MdSupportAgent },
    { id: 'study', label: 'Study Consultancy', icon: FiBookOpen },
    { id: 'insurance', label: 'Travel Insurance', icon: MdHealthAndSafety },
    { id: 'flights', label: 'Flights Booking', icon: MdFlightTakeoff },
    { id: 'hotels', label: 'Hotel Reservations', icon: MdHotel },
];

// Sidebar categories (left sidebar – same as hero services for consistency)
export const categories = [
    { id: 'visa', label: 'Visa Filing', icon: FiFileText },
    { id: 'appointment', label: 'Appointment Booking', icon: FiCalendar },
    { id: 'study', label: 'Study Consultancy', icon: FiBookOpen },
    { id: 'insurance', label: 'Travel Insurance', icon: FiShield },
    { id: 'flights', label: 'Flights Booking', icon: FiNavigation },
    { id: 'hotels', label: 'Hotel Reservations', icon: FiHome },
];

// FAQ data keyed by category id
export const faqData = {
    visa: [
        { id: 'v1', question: 'How do I apply for a visa through Bookooda?', answer: 'Browse our verified visa agents by selecting your destination country on the homepage. Choose an agent with the best reviews and pricing, submit your documents, and our agent will handle the entire filing process for you.' },
        { id: 'v2', question: 'What documents are required for a visa application?', answer: 'Document requirements vary by country but typically include a valid passport (minimum 6 months validity), passport-sized photos, bank statements (last 3–6 months), employment/business letter, travel itinerary, and hotel reservations. Your assigned agent will provide a complete checklist specific to your destination.' },
        { id: 'v3', question: 'How long does the visa process take?', answer: 'Processing times vary by country — typically 5–15 business days for most tourist visas. Some countries offer express processing for an additional fee. Your Bookooda agent will give you an estimated timeline at the time of application submission.' },
        { id: 'v4', question: 'What happens if my visa application is rejected?', answer: 'If your visa is rejected, your Bookooda agent will explain the reason for rejection and advise on next steps. Depending on the agent\'s policy, a partial refund of the service fee may be available. Some agents offer a re-application service at a discounted rate.' },
        { id: 'v5', question: 'Can I track my visa application status?', answer: 'Yes, once your application is submitted, you can track its status in real-time from your Bookooda dashboard under "My Applications." You\'ll also receive email and SMS notifications at each stage of the process.' },
        { id: 'v6', question: 'Which countries can I apply for visas through Bookooda?', answer: 'Bookooda supports visa applications for 50+ countries across Asia, Europe, the Middle East, and beyond. Popular destinations include UAE, Saudi Arabia, Turkey, Malaysia, Thailand, UK, and Schengen countries. Check our visa search page for the full list.' },
    ],
    appointment: [
        { id: 'a1', question: 'How do I book an appointment with an agent on Bookooda?', answer: 'Visit the agent\'s profile page and click "Book Appointment." Select a convenient date and time from their available slots, provide a brief description of your query, and confirm the booking. You\'ll receive a confirmation email with all details.' },
        { id: 'a2', question: 'Can I reschedule or cancel my appointment?', answer: 'Yes, you can reschedule or cancel an appointment from your Bookooda dashboard under "My Appointments." Free rescheduling is available up to 24 hours before the appointment. Cancellations made less than 12 hours before may incur a small fee.' },
        { id: 'a3', question: 'Are appointments in-person or online?', answer: 'Both options are available depending on the agent. Many agents offer in-person meetings at their office, phone consultations, and video calls via Zoom or Google Meet. You can filter agents by consultation type when searching.' },
        { id: 'a4', question: 'Is there a fee for booking an appointment?', answer: 'Appointment fees depend on the agent. Some offer free initial consultations, while others charge a nominal consultation fee that may be adjusted against the service cost if you proceed with their services. Fee details are shown on each agent\'s profile.' },
        { id: 'a5', question: 'How do I know which agent is right for me?', answer: 'Use Bookooda\'s agent comparison feature to review ratings, reviews, specializations, pricing, and response times. You can also filter agents by destination country, service type, and language spoken to find the best match for your needs.' },
    ],
    study: [
        { id: 's1', question: 'What study consultancy services does Bookooda offer?', answer: 'Bookooda connects you with verified study abroad consultants who assist with university selection, application preparation, scholarship guidance, student visa filing, accommodation arrangements, and pre-departure orientations for destinations worldwide.' },
        { id: 's2', question: 'Which countries are popular for study abroad through Bookooda?', answer: 'Our consultants specialize in top study destinations including the UK, USA, Canada, Australia, Germany, Turkey, China, Malaysia, and New Zealand. Each consultant has expertise in specific countries and universities.' },
        { id: 's3', question: 'How much does a study consultancy session cost?', answer: 'Many consultants on Bookooda offer a free initial assessment session. Full-service consultancy packages (including university application, visa filing, and post-arrival support) vary by destination and are clearly listed on each consultant\'s profile.' },
        { id: 's4', question: 'Can Bookooda help with scholarship applications?', answer: 'Yes, our study consultants can guide you on available scholarships, eligibility criteria, and application procedures. Some consultants specialize in merit-based, need-based, and fully-funded scholarship programs for international students.' },
        { id: 's5', question: 'What documents do I need for a student visa?', answer: 'Typical student visa documents include an admission/offer letter, valid passport, academic transcripts, English proficiency test scores (IELTS/TOEFL), financial proof (bank statements or sponsor letter), medical certificate, and passport photos. Your Bookooda consultant will provide a country-specific checklist.' },
    ],
    insurance: [
        { id: 'i1', question: 'What types of travel insurance are available on Bookooda?', answer: 'Bookooda offers comprehensive travel insurance plans including trip cancellation coverage, medical emergency coverage, baggage & personal belongings protection, flight delay compensation, and accidental death & disability coverage. Plans can be customized based on your destination and trip duration.' },
        { id: 'i2', question: 'Is travel insurance mandatory for visa applications?', answer: 'Yes, many countries (especially Schengen zone, UAE, and Saudi Arabia) require valid travel/medical insurance as part of the visa application. Bookooda agents can bundle insurance with your visa filing for a seamless experience.' },
        { id: 'i3', question: 'How do I purchase travel insurance through Bookooda?', answer: 'You can purchase insurance directly from the Bookooda platform during the booking process. Simply select your destination, travel dates, and coverage level. You\'ll receive your policy document instantly via email and in your dashboard.' },
        { id: 'i4', question: 'How do I file a claim on my travel insurance?', answer: 'To file a claim, log into your Bookooda account, go to "My Insurance," and click "File a Claim." Upload the required supporting documents (medical bills, police reports, boarding passes, etc.) and our insurance partner will process your claim within 7–14 business days.' },
        { id: 'i5', question: 'Can I cancel my travel insurance and get a refund?', answer: 'Yes, you can cancel your travel insurance within 14 days of purchase for a full refund, provided no claims have been made. After 14 days, cancellation may be subject to a processing fee. Contact our support team for assistance.' },
    ],
    flights: [
        { id: 'f1', question: 'How do I book a flight through Bookooda?', answer: 'Use the Flights search on our homepage to enter your departure city, destination, travel dates, and number of passengers. Browse available options from our verified travel agents, compare prices, and book directly. You\'ll receive your e-ticket via email after confirmation.' },
        { id: 'f2', question: 'Can I cancel or change my flight booking?', answer: 'Yes, flight modification and cancellation policies depend on the airline and fare type. Log into your Bookooda dashboard, go to "My Bookings," and select the flight you wish to modify. Our agent will assist you with changes, and any applicable fees will be communicated upfront.' },
        { id: 'f3', question: 'Are Bookooda flight prices competitive?', answer: 'Absolutely. Bookooda aggregates prices from multiple verified agents who have access to wholesale and negotiated fares. You can compare prices across agents to ensure you\'re getting the best deal. We also offer a Best Price Guarantee on select routes.' },
        { id: 'f4', question: 'How do I get my boarding pass?', answer: 'For most airlines, online check-in opens 24–48 hours before departure. Your Bookooda agent may assist with web check-in, or you can check in directly on the airline\'s website/app using your booking reference. Boarding passes can also be collected at the airport counter.' },
        { id: 'f5', question: 'Can I book group or corporate flights?', answer: 'Yes, many agents on Bookooda specialize in group and corporate travel with discounted bulk fares. Use the "Agent Search" to filter by group booking expertise, or contact our support team for personalized assistance with large bookings.' },
    ],
    hotels: [
        { id: 'h1', question: 'How do I reserve a hotel through Bookooda?', answer: 'Use the Hotel search on our homepage to enter your destination, check-in/check-out dates, and number of guests. Browse available hotels through our verified agents, compare prices and reviews, and book your stay. You\'ll receive a confirmation voucher via email.' },
        { id: 'h2', question: 'Can I cancel my hotel reservation?', answer: 'Cancellation policies vary by hotel and rate type. Many bookings offer free cancellation up to 24–48 hours before check-in. Check the cancellation policy shown during booking, or go to "My Bookings" in your dashboard to view terms and initiate cancellation.' },
        { id: 'h3', question: 'How do I request early check-in or late check-out?', answer: 'You can add special requests (early check-in, late check-out, extra bed, room preference, etc.) during the booking process or through your booking details page. These requests are forwarded to the hotel but are subject to availability.' },
        { id: 'h4', question: 'Are Bookooda hotel prices the same as booking directly?', answer: 'Bookooda agents often have access to negotiated corporate and wholesale hotel rates that can be lower than direct booking prices. Compare prices on our platform to find the best deal. Our Best Price Guarantee covers select properties.' },
        { id: 'h5', question: 'Can I book hotels for groups or events?', answer: 'Yes, several agents on Bookooda specialize in group hotel bookings for events, weddings, corporate retreats, and conferences. They can arrange block bookings at discounted rates. Use the agent search to find specialists or contact our support team.' },
    ],
};
