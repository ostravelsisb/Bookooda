// Mock data for destinations
export const destinationsData = [
    {
        id: 1,
        name: "United States",
        flag: "🇺🇸",
        image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&q=80",
        description: "Land of opportunities with world-class education and career prospects",
        categories: ["Tourist", "Study", "Work"],
        startingPrice: "$160",
        rating: 4.8,
        agentsAvailable: 245,
        processingTime: "15-30 days",
        successRate: "92%",
        overview: "The United States offers diverse opportunities for tourism, education, and employment. With top universities and a thriving job market, it's a popular destination for international travelers.",
        requiredDocs: ["Valid Passport", "DS-160 Form", "Photo", "Financial Proof", "Interview Appointment"]
    },
    {
        id: 2,
        name: "United Kingdom",
        flag: "🇬🇧",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
        description: "Historic charm meets modern innovation in education and business",
        categories: ["Tourist", "Study", "Work", "Europe"],
        startingPrice: "$140",
        rating: 4.7,
        agentsAvailable: 198,
        processingTime: "10-20 days",
        successRate: "89%",
        overview: "The UK is renowned for its prestigious universities, rich history, and vibrant culture. It offers excellent opportunities for students and professionals alike.",
        requiredDocs: ["Valid Passport", "Application Form", "Photo", "Financial Documents", "TB Test Certificate"]
    },
    {
        id: 3,
        name: "Canada",
        flag: "🇨🇦",
        image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80",
        description: "Welcoming nation with excellent quality of life and immigration pathways",
        categories: ["Tourist", "Study", "Work", "eVisa"],
        startingPrice: "$100",
        rating: 4.9,
        agentsAvailable: 312,
        processingTime: "7-15 days",
        successRate: "94%",
        overview: "Canada is known for its friendly immigration policies, high standard of living, and multicultural society. Perfect for those seeking education or permanent residency.",
        requiredDocs: ["Valid Passport", "Online Application", "Photo", "Biometrics", "Proof of Funds"]
    },
    {
        id: 4,
        name: "Australia",
        flag: "🇦🇺",
        image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80",
        description: "Stunning landscapes with world-class education and work opportunities",
        categories: ["Tourist", "Study", "Work", "eVisa"],
        startingPrice: "$145",
        rating: 4.8,
        agentsAvailable: 176,
        processingTime: "10-25 days",
        successRate: "91%",
        overview: "Australia offers a high quality of life, excellent education system, and diverse job opportunities in a beautiful natural setting.",
        requiredDocs: ["Valid Passport", "ImmiAccount", "Health Insurance", "English Test", "Character Certificate"]
    },
    {
        id: 5,
        name: "Germany",
        flag: "🇩🇪",
        image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
        description: "Engineering excellence and tuition-free education in the heart of Europe",
        categories: ["Study", "Work", "Europe"],
        startingPrice: "$80",
        rating: 4.6,
        agentsAvailable: 143,
        processingTime: "8-12 weeks",
        successRate: "87%",
        overview: "Germany is a top destination for engineering and technical studies, offering many tuition-free programs and strong job prospects.",
        requiredDocs: ["Valid Passport", "Application Form", "Admission Letter", "Financial Proof", "Health Insurance"]
    },
    {
        id: 6,
        name: "Saudi Arabia",
        flag: "🇸🇦",
        image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80",
        description: "Sacred destination for Umrah and Hajj pilgrimage",
        categories: ["Tourist", "Umrah", "eVisa"],
        startingPrice: "$120",
        rating: 4.9,
        agentsAvailable: 289,
        processingTime: "3-7 days",
        successRate: "96%",
        overview: "Saudi Arabia welcomes millions of pilgrims annually for Umrah and Hajj. The eVisa system has made tourism more accessible.",
        requiredDocs: ["Valid Passport", "Online Application", "Photo", "Vaccination Certificate", "Return Ticket"]
    },
    {
        id: 7,
        name: "Dubai (UAE)",
        flag: "🇦🇪",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
        description: "Luxury tourism and business hub of the Middle East",
        categories: ["Tourist", "Work", "eVisa"],
        startingPrice: "$60",
        rating: 4.8,
        agentsAvailable: 267,
        processingTime: "2-5 days",
        successRate: "95%",
        overview: "Dubai offers world-class infrastructure, tax-free income, and a vibrant expatriate community. Perfect for business and leisure.",
        requiredDocs: ["Valid Passport", "Online Application", "Photo", "Hotel Booking", "Return Ticket"]
    },
    {
        id: 8,
        name: "France",
        flag: "🇫🇷",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
        description: "Cultural richness with excellent education and tourism",
        categories: ["Tourist", "Study", "Europe"],
        startingPrice: "$90",
        rating: 4.7,
        agentsAvailable: 134,
        processingTime: "10-15 days",
        successRate: "88%",
        overview: "France is renowned for its art, culture, cuisine, and prestigious educational institutions. A top destination for students and tourists.",
        requiredDocs: ["Valid Passport", "Schengen Application", "Travel Insurance", "Accommodation Proof", "Financial Proof"]
    },
    {
        id: 9,
        name: "Singapore",
        flag: "🇸🇬",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
        description: "Modern city-state with world-class business and education",
        categories: ["Tourist", "Work", "Study", "eVisa"],
        startingPrice: "$50",
        rating: 4.9,
        agentsAvailable: 156,
        processingTime: "3-5 days",
        successRate: "97%",
        overview: "Singapore offers a perfect blend of Eastern and Western cultures, excellent infrastructure, and strong economy. Ideal for business and education.",
        requiredDocs: ["Valid Passport", "Online Application", "Photo", "Travel Itinerary", "Financial Proof"]
    },
    {
        id: 10,
        name: "New Zealand",
        flag: "🇳🇿",
        image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80",
        description: "Breathtaking nature with quality education and work opportunities",
        categories: ["Tourist", "Study", "Work", "eVisa"],
        startingPrice: "$130",
        rating: 4.8,
        agentsAvailable: 98,
        processingTime: "15-20 days",
        successRate: "90%",
        overview: "New Zealand is known for its stunning landscapes, friendly people, and excellent quality of life. Popular for adventure tourism and education.",
        requiredDocs: ["Valid Passport", "Online Application", "Photo", "Health Certificate", "Character Certificate"]
    },
    {
        id: 11,
        name: "Japan",
        flag: "🇯🇵",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
        description: "Ancient traditions meet cutting-edge technology",
        categories: ["Tourist", "Study", "Work"],
        startingPrice: "$70",
        rating: 4.7,
        agentsAvailable: 187,
        processingTime: "5-10 days",
        successRate: "89%",
        overview: "Japan offers a unique cultural experience, advanced technology sector, and prestigious universities. Perfect for tech professionals and students.",
        requiredDocs: ["Valid Passport", "Application Form", "Photo", "Itinerary", "Financial Documents"]
    },
    {
        id: 12,
        name: "Turkey",
        flag: "🇹🇷",
        image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
        description: "Bridge between East and West with rich history",
        categories: ["Tourist", "Umrah", "eVisa"],
        startingPrice: "$35",
        rating: 4.6,
        agentsAvailable: 213,
        processingTime: "1-3 days",
        successRate: "95%",
        overview: "Turkey offers a unique blend of European and Asian cultures, historical sites, and easy eVisa process. Popular for tourism and religious travel.",
        requiredDocs: ["Valid Passport", "Online eVisa Application", "Photo", "Hotel Booking"]
    },
    {
        id: 13,
        name: "Malaysia",
        flag: "🇲🇾",
        image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
        description: "Diverse culture with affordable education and tourism",
        categories: ["Tourist", "Study", "eVisa"],
        startingPrice: "$30",
        rating: 4.7,
        agentsAvailable: 145,
        processingTime: "2-5 days",
        successRate: "93%",
        overview: "Malaysia is a multicultural nation offering affordable education, beautiful beaches, and vibrant cities. Great for students and tourists.",
        requiredDocs: ["Valid Passport", "eVisa Application", "Photo", "Return Ticket", "Accommodation Proof"]
    },
    {
        id: 14,
        name: "Netherlands",
        flag: "🇳🇱",
        image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80",
        description: "Progressive nation with excellent education system",
        categories: ["Study", "Work", "Europe"],
        startingPrice: "$85",
        rating: 4.8,
        agentsAvailable: 112,
        processingTime: "10-15 days",
        successRate: "91%",
        overview: "The Netherlands is known for its high-quality English-taught programs, innovative culture, and excellent work-life balance.",
        requiredDocs: ["Valid Passport", "MVV Application", "Admission Letter", "Financial Proof", "Health Insurance"]
    },
    {
        id: 15,
        name: "Spain",
        flag: "🇪🇸",
        image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=80",
        description: "Vibrant culture with beautiful cities and beaches",
        categories: ["Tourist", "Study", "Europe"],
        startingPrice: "$75",
        rating: 4.7,
        agentsAvailable: 156,
        processingTime: "10-20 days",
        successRate: "87%",
        overview: "Spain offers a rich cultural experience, beautiful weather, and affordable living costs. Popular for language studies and tourism.",
        requiredDocs: ["Valid Passport", "Schengen Visa Application", "Travel Insurance", "Accommodation", "Financial Proof"]
    },
    {
        id: 16,
        name: "South Korea",
        flag: "🇰🇷",
        image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&q=80",
        description: "K-culture hub with advanced technology and education",
        categories: ["Tourist", "Study", "Work"],
        startingPrice: "$65",
        rating: 4.8,
        agentsAvailable: 134,
        processingTime: "7-10 days",
        successRate: "92%",
        overview: "South Korea is a global leader in technology and entertainment, offering excellent universities and career opportunities in tech and creative industries.",
        requiredDocs: ["Valid Passport", "Application Form", "Photo", "Invitation Letter", "Financial Documents"]
    }
];

// Mock data for agents
export const agentsData = {
    1: [ // USA agents
        {
            id: 1,
            name: "John Smith",
            agency: "Global Visa Consultants",
            rating: 4.9,
            reviews: 156,
            city: "New York",
            services: ["Tourist", "Study", "Work"],
            experience: "8 years",
            successRate: "94%"
        },
        {
            id: 2,
            name: "Sarah Johnson",
            agency: "American Dream Visas",
            rating: 4.8,
            reviews: 142,
            city: "Los Angeles",
            services: ["Study", "Work"],
            experience: "6 years",
            successRate: "91%"
        },
        {
            id: 3,
            name: "Michael Chen",
            agency: "USA Immigration Experts",
            rating: 4.7,
            reviews: 98,
            city: "San Francisco",
            services: ["Tourist", "Work"],
            experience: "5 years",
            successRate: "89%"
        },
        {
            id: 101,
            name: "Jennifer Martinez",
            agency: "US Visa Professionals",
            rating: 4.9,
            reviews: 178,
            city: "Miami",
            services: ["Tourist", "Study", "Work"],
            experience: "9 years",
            successRate: "93%"
        }
    ],
    2: [ // UK agents
        {
            id: 4,
            name: "Emma Williams",
            agency: "British Visa Solutions",
            rating: 4.8,
            reviews: 134,
            city: "London",
            services: ["Tourist", "Study", "Work"],
            experience: "7 years",
            successRate: "92%"
        },
        {
            id: 5,
            name: "James Brown",
            agency: "UK Immigration Hub",
            rating: 4.6,
            reviews: 87,
            city: "Manchester",
            services: ["Study", "Work"],
            experience: "4 years",
            successRate: "88%"
        },
        {
            id: 102,
            name: "Oliver Taylor",
            agency: "London Visa Centre",
            rating: 4.7,
            reviews: 112,
            city: "London",
            services: ["Tourist", "Study"],
            experience: "6 years",
            successRate: "90%"
        }
    ],
    3: [ // Canada agents
        {
            id: 6,
            name: "Sophie Martin",
            agency: "Canada Pathway Consultants",
            rating: 4.9,
            reviews: 201,
            city: "Toronto",
            services: ["Tourist", "Study", "Work"],
            experience: "10 years",
            successRate: "95%"
        },
        {
            id: 7,
            name: "David Lee",
            agency: "Maple Immigration Services",
            rating: 4.8,
            reviews: 167,
            city: "Vancouver",
            services: ["Study", "Work"],
            experience: "7 years",
            successRate: "93%"
        },
        {
            id: 103,
            name: "Rachel Thompson",
            agency: "Canadian Dream Advisors",
            rating: 4.9,
            reviews: 189,
            city: "Montreal",
            services: ["Tourist", "Study", "Work"],
            experience: "8 years",
            successRate: "94%"
        },
        {
            id: 104,
            name: "Robert Wilson",
            agency: "True North Immigration",
            rating: 4.7,
            reviews: 145,
            city: "Calgary",
            services: ["Work", "Study"],
            experience: "5 years",
            successRate: "91%"
        }
    ],
    4: [ // Australia agents
        {
            id: 105,
            name: "Emily Anderson",
            agency: "Aussie Visa Experts",
            rating: 4.8,
            reviews: 156,
            city: "Sydney",
            services: ["Tourist", "Study", "Work"],
            experience: "7 years",
            successRate: "92%"
        },
        {
            id: 106,
            name: "Daniel Murphy",
            agency: "Down Under Immigration",
            rating: 4.7,
            reviews: 134,
            city: "Melbourne",
            services: ["Study", "Work"],
            experience: "6 years",
            successRate: "90%"
        },
        {
            id: 107,
            name: "Jessica White",
            agency: "Australian Pathways",
            rating: 4.9,
            reviews: 178,
            city: "Brisbane",
            services: ["Tourist", "Study", "Work"],
            experience: "9 years",
            successRate: "93%"
        }
    ],
    5: [ // Germany agents
        {
            id: 108,
            name: "Hans Mueller",
            agency: "Deutschland Visa Services",
            rating: 4.6,
            reviews: 98,
            city: "Berlin",
            services: ["Study", "Work"],
            experience: "5 years",
            successRate: "88%"
        },
        {
            id: 109,
            name: "Anna Schmidt",
            agency: "German Education Consultants",
            rating: 4.7,
            reviews: 112,
            city: "Munich",
            services: ["Study", "Work"],
            experience: "6 years",
            successRate: "89%"
        },
        {
            id: 110,
            name: "Klaus Weber",
            agency: "Europe Study Gateway",
            rating: 4.5,
            reviews: 87,
            city: "Frankfurt",
            services: ["Study"],
            experience: "4 years",
            successRate: "86%"
        }
    ],
    6: [ // Saudi Arabia agents
        {
            id: 8,
            name: "Ahmed Al-Rashid",
            agency: "Umrah Travel Experts",
            rating: 5.0,
            reviews: 289,
            city: "Jeddah",
            services: ["Umrah", "Tourist"],
            experience: "12 years",
            successRate: "98%"
        },
        {
            id: 9,
            name: "Fatima Hassan",
            agency: "Holy Journey Consultants",
            rating: 4.9,
            reviews: 245,
            city: "Riyadh",
            services: ["Umrah", "Tourist"],
            experience: "9 years",
            successRate: "97%"
        },
        {
            id: 111,
            name: "Mohammed Abdullah",
            agency: "Sacred Travels Agency",
            rating: 4.9,
            reviews: 267,
            city: "Mecca",
            services: ["Umrah", "Tourist"],
            experience: "11 years",
            successRate: "98%"
        },
        {
            id: 112,
            name: "Aisha Al-Saud",
            agency: "Pilgrimage Plus Services",
            rating: 4.8,
            reviews: 198,
            city: "Medina",
            services: ["Umrah", "Tourist"],
            experience: "7 years",
            successRate: "96%"
        }
    ],
    7: [ // Dubai agents
        {
            id: 113,
            name: "Khalid Al-Maktoum",
            agency: "Emirates Visa Solutions",
            rating: 4.8,
            reviews: 234,
            city: "Dubai",
            services: ["Tourist", "Work"],
            experience: "8 years",
            successRate: "95%"
        },
        {
            id: 114,
            name: "Layla Ahmed",
            agency: "Dubai Immigration Hub",
            rating: 4.7,
            reviews: 189,
            city: "Dubai",
            services: ["Tourist", "Work"],
            experience: "6 years",
            successRate: "93%"
        },
        {
            id: 115,
            name: "Omar Hassan",
            agency: "UAE Business Visas",
            rating: 4.9,
            reviews: 256,
            city: "Abu Dhabi",
            services: ["Work", "Tourist"],
            experience: "10 years",
            successRate: "96%"
        }
    ],
    8: [ // France agents
        {
            id: 116,
            name: "Pierre Dubois",
            agency: "France Visa Consultants",
            rating: 4.7,
            reviews: 145,
            city: "Paris",
            services: ["Tourist", "Study"],
            experience: "7 years",
            successRate: "89%"
        },
        {
            id: 117,
            name: "Marie Laurent",
            agency: "Schengen Experts France",
            rating: 4.6,
            reviews: 123,
            city: "Lyon",
            services: ["Tourist", "Study"],
            experience: "5 years",
            successRate: "87%"
        },
        {
            id: 118,
            name: "Jacques Martin",
            agency: "French Education Gateway",
            rating: 4.8,
            reviews: 167,
            city: "Paris",
            services: ["Study", "Tourist"],
            experience: "8 years",
            successRate: "90%"
        }
    ],
    9: [ // Singapore agents
        {
            id: 119,
            name: "Wei Chen",
            agency: "Singapore Visa Professionals",
            rating: 4.9,
            reviews: 178,
            city: "Singapore",
            services: ["Tourist", "Work", "Study"],
            experience: "9 years",
            successRate: "97%"
        },
        {
            id: 120,
            name: "Priya Sharma",
            agency: "Lion City Immigration",
            rating: 4.8,
            reviews: 156,
            city: "Singapore",
            services: ["Work", "Study"],
            experience: "7 years",
            successRate: "95%"
        },
        {
            id: 121,
            name: "Tan Wei Ming",
            agency: "Singapore Gateway Services",
            rating: 4.9,
            reviews: 189,
            city: "Singapore",
            services: ["Tourist", "Work", "Study"],
            experience: "10 years",
            successRate: "98%"
        }
    ],
    10: [ // New Zealand agents
        {
            id: 122,
            name: "James Wilson",
            agency: "Kiwi Visa Experts",
            rating: 4.8,
            reviews: 134,
            city: "Auckland",
            services: ["Tourist", "Study", "Work"],
            experience: "8 years",
            successRate: "91%"
        },
        {
            id: 123,
            name: "Sarah Thompson",
            agency: "NZ Immigration Advisors",
            rating: 4.7,
            reviews: 112,
            city: "Wellington",
            services: ["Study", "Work"],
            experience: "6 years",
            successRate: "89%"
        },
        {
            id: 124,
            name: "Michael Brown",
            agency: "Aotearoa Pathways",
            rating: 4.8,
            reviews: 145,
            city: "Christchurch",
            services: ["Tourist", "Study", "Work"],
            experience: "7 years",
            successRate: "90%"
        }
    ],
    11: [ // Japan agents
        {
            id: 125,
            name: "Yuki Tanaka",
            agency: "Japan Visa Solutions",
            rating: 4.7,
            reviews: 167,
            city: "Tokyo",
            services: ["Tourist", "Study", "Work"],
            experience: "8 years",
            successRate: "90%"
        },
        {
            id: 126,
            name: "Hiroshi Sato",
            agency: "Rising Sun Immigration",
            rating: 4.6,
            reviews: 134,
            city: "Osaka",
            services: ["Study", "Work"],
            experience: "6 years",
            successRate: "88%"
        },
        {
            id: 127,
            name: "Akiko Yamamoto",
            agency: "Tokyo Visa Centre",
            rating: 4.8,
            reviews: 189,
            city: "Tokyo",
            services: ["Tourist", "Study", "Work"],
            experience: "9 years",
            successRate: "91%"
        }
    ],
    12: [ // Turkey agents
        {
            id: 128,
            name: "Mehmet Yilmaz",
            agency: "Turkish Visa Experts",
            rating: 4.6,
            reviews: 156,
            city: "Istanbul",
            services: ["Tourist", "Umrah"],
            experience: "7 years",
            successRate: "94%"
        },
        {
            id: 129,
            name: "Ayse Demir",
            agency: "Bosphorus Immigration",
            rating: 4.7,
            reviews: 178,
            city: "Istanbul",
            services: ["Tourist", "Umrah"],
            experience: "8 years",
            successRate: "95%"
        },
        {
            id: 130,
            name: "Ahmet Kaya",
            agency: "Turkey Travel Services",
            rating: 4.5,
            reviews: 123,
            city: "Ankara",
            services: ["Tourist"],
            experience: "5 years",
            successRate: "93%"
        }
    ],
    13: [ // Malaysia agents
        {
            id: 131,
            name: "Ahmad Rahman",
            agency: "Malaysia Visa Hub",
            rating: 4.7,
            reviews: 145,
            city: "Kuala Lumpur",
            services: ["Tourist", "Study"],
            experience: "6 years",
            successRate: "92%"
        },
        {
            id: 132,
            name: "Siti Nurhaliza",
            agency: "KL Immigration Services",
            rating: 4.8,
            reviews: 167,
            city: "Kuala Lumpur",
            services: ["Tourist", "Study"],
            experience: "7 years",
            successRate: "94%"
        },
        {
            id: 133,
            name: "Lee Wei Ling",
            agency: "Malaysian Gateway",
            rating: 4.6,
            reviews: 134,
            city: "Penang",
            services: ["Tourist", "Study"],
            experience: "5 years",
            successRate: "91%"
        }
    ],
    14: [ // Netherlands agents
        {
            id: 134,
            name: "Jan van der Berg",
            agency: "Dutch Visa Consultants",
            rating: 4.8,
            reviews: 156,
            city: "Amsterdam",
            services: ["Study", "Work"],
            experience: "8 years",
            successRate: "92%"
        },
        {
            id: 135,
            name: "Sophie de Vries",
            agency: "Holland Immigration Hub",
            rating: 4.7,
            reviews: 134,
            city: "Rotterdam",
            services: ["Study", "Work"],
            experience: "6 years",
            successRate: "90%"
        },
        {
            id: 136,
            name: "Peter Jansen",
            agency: "Netherlands Study Gateway",
            rating: 4.9,
            reviews: 178,
            city: "Amsterdam",
            services: ["Study", "Work"],
            experience: "9 years",
            successRate: "93%"
        }
    ],
    15: [ // Spain agents
        {
            id: 137,
            name: "Carlos Rodriguez",
            agency: "Spain Visa Solutions",
            rating: 4.7,
            reviews: 167,
            city: "Madrid",
            services: ["Tourist", "Study"],
            experience: "7 years",
            successRate: "88%"
        },
        {
            id: 138,
            name: "Maria Garcia",
            agency: "Barcelona Immigration",
            rating: 4.6,
            reviews: 145,
            city: "Barcelona",
            services: ["Tourist", "Study"],
            experience: "6 years",
            successRate: "87%"
        },
        {
            id: 139,
            name: "Antonio Martinez",
            agency: "Spanish Education Advisors",
            rating: 4.8,
            reviews: 189,
            city: "Madrid",
            services: ["Study", "Tourist"],
            experience: "8 years",
            successRate: "89%"
        }
    ],
    16: [ // South Korea agents
        {
            id: 140,
            name: "Kim Min-jun",
            agency: "Korea Visa Professionals",
            rating: 4.8,
            reviews: 178,
            city: "Seoul",
            services: ["Tourist", "Study", "Work"],
            experience: "8 years",
            successRate: "93%"
        },
        {
            id: 141,
            name: "Park Ji-woo",
            agency: "Seoul Immigration Hub",
            rating: 4.7,
            reviews: 156,
            city: "Seoul",
            services: ["Study", "Work"],
            experience: "7 years",
            successRate: "91%"
        },
        {
            id: 142,
            name: "Lee Soo-jin",
            agency: "K-Visa Consultants",
            rating: 4.9,
            reviews: 198,
            city: "Busan",
            services: ["Tourist", "Study", "Work"],
            experience: "9 years",
            successRate: "94%"
        }
    ]
};
