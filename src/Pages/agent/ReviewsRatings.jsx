import { useAuth } from '../../context/AuthContext';
import { Star, MessageSquare, Shield } from 'lucide-react';
import { adminServiceListings } from '../../data/adminData';

// ── Role-specific review data ──
const ROLE_REVIEWS = {
    hotel_provider: [
        { id: 'R1', client: 'Ahmad Raza', service: 'Deluxe Room Stay', rating: 5, date: '2026-02-28', comment: 'Absolutely loved the stay! Room was clean, staff was courteous, and the breakfast buffet was amazing. Will definitely come back.' },
        { id: 'R2', client: 'Fatima Noor', service: 'Premium Suite Booking', rating: 4, date: '2026-02-25', comment: 'Great suite with stunning view. Minor delay at check-in but overall an excellent experience.' },
        { id: 'R3', client: 'Usman Tariq', service: 'Standard Room', rating: 5, date: '2026-02-20', comment: 'Best value for money in the city. Clean rooms, perfect location, and friendly staff.' },
        { id: 'R4', client: 'Saba Mirza', service: 'Executive Room', rating: 4, date: '2026-02-15', comment: 'Beautiful room, great amenities. WiFi could be a bit faster. Otherwise perfect stay.' },
        { id: 'R5', client: 'Ali Hassan', service: 'King Suite Weekend', rating: 5, date: '2026-02-10', comment: 'The king suite was magnificent. Room service was prompt and the spa facilities were top-notch.' },
    ],
    car_rental: [
        { id: 'R1', client: 'Bilal Khan', service: 'Toyota Corolla Rental', rating: 5, date: '2026-02-28', comment: 'Very clean car, smooth ride. Pick-up and drop-off was super easy. Great service!' },
        { id: 'R2', client: 'Zainab Fatima', service: 'Land Cruiser Weekend', rating: 4, date: '2026-02-22', comment: 'Perfect SUV for our northern trip. Slight scratch was already noted. Trusted rental service.' },
        { id: 'R3', client: 'Ahmed Ali', service: 'Honda Civic Daily', rating: 5, date: '2026-02-18', comment: 'Best daily rental rate in town. Car was in perfect condition with full tank.' },
        { id: 'R4', client: 'Sara Javed', service: 'Suzuki Alto Weekly', rating: 4, date: '2026-02-12', comment: 'Budget-friendly and fuel-efficient. Perfect for city commute. Would rent again.' },
    ],
    trip_provider: [
        { id: 'R1', client: 'Kamran Shah', service: 'Hunza Valley Tour', rating: 5, date: '2026-02-28', comment: 'Incredible trip! The guide was knowledgeable, food was amazing, and the views were breathtaking. Best tour company!' },
        { id: 'R2', client: 'Hira Batool', service: 'Fairy Meadows Trek', rating: 5, date: '2026-02-20', comment: 'Life-changing experience! Everything was well-organized. Safety measures were excellent.' },
        { id: 'R3', client: 'Zain Sheikh', service: 'Skardu & Deosai Tour', rating: 4, date: '2026-02-15', comment: 'Amazing scenery and great camping spots. Would have liked warmer sleeping bags though.' },
        { id: 'R4', client: 'Nida Farooq', service: 'Swat Valley Trip', rating: 5, date: '2026-02-08', comment: 'Perfect family trip. Kids loved the river activities. Hotel arrangements were spot-on.' },
        { id: 'R5', client: 'Omar Hayat', service: 'Neelum Valley Tour', rating: 4, date: '2026-02-01', comment: 'Beautiful valley, comfortable jeep ride. Guide was very helpful and friendly.' },
    ],
    umrah_provider: [
        { id: 'R1', client: 'Haji Muhammad', service: 'Premium Umrah 14 Days', rating: 5, date: '2026-02-25', comment: 'MashaAllah, everything was perfectly arranged. Hotel was right next to Haram. The guide was extremely knowledgeable.' },
        { id: 'R2', client: 'Amina Bibi', service: 'Economy Umrah Package', rating: 5, date: '2026-02-18', comment: 'Affordable yet quality service. Transport in Saudi Arabia was comfortable and on time.' },
        { id: 'R3', client: 'Tariq Mehmood', service: 'Family Umrah Package', rating: 4, date: '2026-02-10', comment: 'Great family package. Kids were accommodated well. Minor delay in Madinah hotel check-in otherwise perfect.' },
        { id: 'R4', client: 'Khadija Nawaz', service: 'Ramadan Umrah Special', rating: 5, date: '2026-01-28', comment: 'SubhanAllah, the Ramadan experience was unforgettable. Iftar arrangements near Haram were excellent.' },
    ],
    travel_agency: [
        { id: 'R1', client: 'Asad Mehmood', service: 'Turkey Visit Visa', rating: 5, date: '2026-02-28', comment: 'Got my visa approved in just 5 days! Very professional and transparent process.' },
        { id: 'R2', client: 'Rabia Shafiq', service: 'UAE Visit Visa', rating: 4, date: '2026-02-22', comment: 'Smooth visa processing. Good communication throughout. Would recommend.' },
        { id: 'R3', client: 'Junaid Khan', service: 'London Flight Booking', rating: 5, date: '2026-02-15', comment: 'Best flight deal I found! Saved me PKR 30,000 compared to direct booking.' },
        { id: 'R4', client: 'Maria Ahmed', service: 'Thailand Tour + Visa', rating: 4, date: '2026-02-08', comment: 'Great tour package. Visa was hassle-free. Hotel could have been slightly better.' },
        { id: 'R5', client: 'Hassan Raza', service: 'Canada Study File', rating: 5, date: '2026-02-01', comment: 'Excellent guidance for study visa. Got my acceptance letter and visa both through them.' },
    ],
    individual_agent: [
        { id: 'R1', client: 'Sana Malik', service: 'UAE Visa Assistance', rating: 5, date: '2026-02-28', comment: 'Very responsive and helpful. Got my visa done quickly with complete guidance.' },
        { id: 'R2', client: 'Imran Shah', service: 'Malaysia eVisa Help', rating: 4, date: '2026-02-20', comment: 'Good service, reasonable fees. Document checklist was very helpful.' },
        { id: 'R3', client: 'Nadia Bukhari', service: 'Travel Consultation', rating: 5, date: '2026-02-12', comment: 'Excellent personalized advice. Saved me a lot of time and money on my trip planning.' },
        { id: 'R4', client: 'Waqas Ali', service: 'Flight Deal Finder', rating: 5, date: '2026-02-05', comment: 'Found me the cheapest PIA flights to London! Incredible service.' },
    ],
};

const ROLE_LABELS = {
    hotel_provider: 'Hotel',
    car_rental: 'Car Rental',
    trip_provider: 'Trip',
    umrah_provider: 'Umrah',
    travel_agency: 'Agency',
    individual_agent: 'Agent',
};

const ROLE_GRADIENTS = {
    hotel_provider: 'from-rose-500 to-pink-600',
    car_rental: 'from-emerald-500 to-emerald-600',
    trip_provider: 'from-amber-500 to-orange-500',
    umrah_provider: 'from-teal-500 to-cyan-600',
    travel_agency: 'from-blue-500 to-indigo-600',
    individual_agent: 'from-indigo-500 to-indigo-600',
};

const ReviewsRatings = () => {
    const { user } = useAuth();
    const role = user?.role || 'agent';
    const reviews = ROLE_REVIEWS[role] || ROLE_REVIEWS.travel_agency;
    const gradient = ROLE_GRADIENTS[role] || 'from-indigo-500 to-purple-600';
    const roleLabel = ROLE_LABELS[role] || 'Service';

    const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
    const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
        star,
        count: reviews.filter((r) => r.rating === star).length,
        percent: Math.round((reviews.filter((r) => r.rating === star).length / reviews.length) * 100),
    }));

    return (
        <div className="space-y-6 max-w-7xl">
            <div>
                <h1 className="text-xl font-bold text-gray-900">{roleLabel} Reviews & Ratings</h1>
                <p className="text-sm text-gray-500 mt-0.5">Client feedback for your {roleLabel.toLowerCase()} services</p>
            </div>

            {/* Rating summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className={`bg-gradient-to-r ${gradient} rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center text-center text-white`}>
                    <div className="text-5xl font-bold mb-2">{avgRating}</div>
                    <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={20} className={i < Math.round(avgRating) ? 'text-white fill-white' : 'text-white/30'} />
                        ))}
                    </div>
                    <p className="text-white/80 text-sm">Based on {reviews.length} reviews</p>
                    <span className="mt-2 px-2.5 py-1 bg-white/15 rounded-lg text-xs font-medium">{roleLabel} Reviews</span>
                </div>

                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-base font-semibold text-gray-900 mb-4">Rating Distribution</h3>
                    <div className="space-y-3">
                        {ratingCounts.map((r) => (
                            <div key={r.star} className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-600 w-6">{r.star}★</span>
                                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-400 rounded-full transition-all duration-700" style={{ width: `${r.percent}%` }} />
                                </div>
                                <span className="text-sm text-gray-500 w-16 text-right">{r.count} ({r.percent}%)</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Reviews list */}
            <div className="space-y-4">
                <h3 className="text-base font-semibold text-gray-900">Client Reviews</h3>
                {reviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-sm`}>
                                    {review.client.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900">{review.client}</h4>
                                    <p className="text-xs text-gray-500">{review.service} · {review.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} size={14} className={i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-200'} />
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewsRatings;
