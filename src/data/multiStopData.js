// Multi-Stop Cities & Airport Data (MakeMyTrip Style)
export const POPULAR_CITIES = [
  { code: 'DEL', name: 'New Delhi', airport: 'Indira Gandhi International Airport', country: 'India', flag: '🇮🇳', region: 'Domestic' },
  { code: 'BOM', name: 'Mumbai', airport: 'Chhatrapati Shivaji Maharaj International', country: 'India', flag: '🇮🇳', region: 'Domestic' },
  { code: 'BLR', name: 'Bengaluru', airport: 'Kempegowda International Airport', country: 'India', flag: '🇮🇳', region: 'Domestic' },
  { code: 'GOI', name: 'Goa', airport: 'Dabolim Airport / Mopa Intl', country: 'India', flag: '🇮🇳', region: 'Domestic' },
  { code: 'JAI', name: 'Jaipur', airport: 'Jaipur International Airport', country: 'India', flag: '🇮🇳', region: 'Domestic' },
  { code: 'UDR', name: 'Udaipur', airport: 'Maharana Pratap Airport', country: 'India', flag: '🇮🇳', region: 'Domestic' },
  { code: 'COK', name: 'Kochi', airport: 'Cochin International Airport', country: 'India', flag: '🇮🇳', region: 'Domestic' },
  { code: 'DXB', name: 'Dubai', airport: 'Dubai International Airport', country: 'United Arab Emirates', flag: '🇦🇪', region: 'International' },
  { code: 'CDG', name: 'Paris', airport: 'Charles de Gaulle Airport', country: 'France', flag: '🇫🇷', region: 'International' },
  { code: 'FCO', name: 'Rome', airport: 'Leonardo da Vinci–Fiumicino Airport', country: 'Italy', flag: '🇮🇹', region: 'International' },
  { code: 'LHR', name: 'London', airport: 'Heathrow Airport', country: 'United Kingdom', flag: '🇬🇧', region: 'International' },
  { code: 'ZRH', name: 'Zurich', airport: 'Zurich Airport', country: 'Switzerland', flag: '🇨🇭', region: 'International' },
  { code: 'SIN', name: 'Singapore', airport: 'Singapore Changi Airport', country: 'Singapore', flag: '🇸🇬', region: 'International' },
  { code: 'BKK', name: 'Bangkok', airport: 'Suvarnabhumi Airport', country: 'Thailand', flag: '🇹🇭', region: 'International' },
  { code: 'HKT', name: 'Phuket', airport: 'Phuket International Airport', country: 'Thailand', flag: '🇹🇭', region: 'International' },
  { code: 'KUL', name: 'Kuala Lumpur', airport: 'Kuala Lumpur International Airport', country: 'Malaysia', flag: '🇲🇾', region: 'International' },
  { code: 'HND', name: 'Tokyo', airport: 'Haneda / Narita International', country: 'Japan', flag: '🇯🇵', region: 'International' },
  { code: 'DPS', name: 'Bali', airport: 'Ngurah Rai International Airport', country: 'Indonesia', flag: '🇮🇩', region: 'International' },
  { code: 'JFK', name: 'New York', airport: 'John F. Kennedy International', country: 'United States', flag: '🇺🇸', region: 'International' }
];

export const CURRENCIES = {
  INR: { symbol: '₹', rate: 1, label: 'INR (₹)' },
  USD: { symbol: '$', rate: 0.012, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.011, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.0094, label: 'GBP (£)' }
};

export const SPECIAL_FARES = [
  { id: 'regular', label: 'Regular Fare', badge: 'Standard', desc: 'Standard baggage & cancellation rules' },
  { id: 'student', label: 'Student Fare', badge: 'Extra 10kg', desc: 'Free extra 10kg baggage + student discount' },
  { id: 'senior', label: 'Senior Citizen', badge: 'Up to ₹600 Off', desc: 'Special concession for 60+ travelers' },
  { id: 'armed', label: 'Armed Forces', badge: '50% Off Base', desc: 'Serving & veteran defense personnel' },
  { id: 'doctor', label: 'Doctors & Nurses', badge: 'Special Aid', desc: 'Medical healthcare appreciation concession' }
];

export const PROMO_COUPONS = [
  { code: 'GTHACKATHON', discountPercent: 15, maxDiscount: 4500, desc: '15% Off on Multi-City Bookings (up to ₹4,500)' },
  { code: 'GLOBETROTTER', discountFlat: 2500, desc: 'Flat ₹2,500 Off on 3+ Stop International Tours' },
  { code: 'ODODEAL', discountPercent: 10, maxDiscount: 3000, desc: '10% Instant Discount for Hackathon Members' }
];

export const MOCK_TRAIN_DATA = [
  {
    id: 'trn-1',
    name: 'Vande Bharat Express',
    trainNumber: '20977 / VB-EXPRESS',
    type: 'Superfast AC Chair Car',
    speed: 'High Speed 160 km/h',
    classes: ['AC Chair Car (CC)', 'Executive Class (EC)'],
    rating: 4.9,
    baseFare: 1450,
    depTime: '06:00 AM',
    arrTime: '10:45 AM',
    duration: '4h 45m',
    foodIncluded: true
  },
  {
    id: 'trn-2',
    name: 'Eurostar High-Speed Express',
    trainNumber: 'EST-9014 / EUROSTAR',
    type: 'International Bullet Train',
    speed: '300 km/h',
    classes: ['Standard Premier', 'Business Premier'],
    rating: 4.95,
    baseFare: 4200,
    depTime: '08:15 AM',
    arrTime: '10:47 AM',
    duration: '2h 32m',
    foodIncluded: true
  },
  {
    id: 'trn-3',
    name: 'Shinkansen Nozomi Bullet Train',
    trainNumber: 'SHK-NOZOMI-40',
    type: 'Japanese Bullet Train',
    speed: '320 km/h',
    classes: ['Ordinary Car', 'Green Car (First Class)'],
    rating: 4.98,
    baseFare: 5600,
    depTime: '09:00 AM',
    arrTime: '11:15 AM',
    duration: '2h 15m',
    foodIncluded: true
  },
  {
    id: 'trn-4',
    name: 'Rajdhani Express',
    trainNumber: '12952 / RAJDHANI',
    type: 'Superfast AC Sleeper Train',
    speed: '130 km/h',
    classes: ['3rd AC', '2nd AC', '1st AC'],
    rating: 4.85,
    baseFare: 2100,
    depTime: '04:30 PM',
    arrTime: '11:55 PM',
    duration: '7h 25m',
    foodIncluded: true
  }
];

export const MOCK_CAB_DATA = [
  {
    id: 'cab-1',
    type: 'Airport Transfer Sedan',
    vehicle: 'Dzire / Etios or equivalent',
    seats: 4,
    luggage: '2 Large Bags',
    rating: 4.85,
    features: ['AC', 'GPS Tracked', 'Uniformed Chauffeur', 'Flight Delay Tracking'],
    baseFare: 1200,
    estDuration: '1h 15m Doorstep'
  },
  {
    id: 'cab-2',
    type: 'Outstation Luxury SUV',
    vehicle: 'Innova Crysta / Ertiga SUV',
    seats: 6,
    luggage: '4 Large Bags',
    rating: 4.92,
    features: ['Extra Legroom', 'Reclining Seats', 'Tolls & Parking Included'],
    baseFare: 2800,
    estDuration: '3h 30m Intercity Drive'
  },
  {
    id: 'cab-3',
    type: 'Executive Luxury Chauffeur',
    vehicle: 'Mercedes E-Class / BMW 5-Series',
    seats: 4,
    luggage: '3 Large Bags',
    rating: 4.98,
    features: ['VIP Concierge', 'Complimentary Bottled Water & High-Speed WiFi'],
    baseFare: 5500,
    estDuration: 'Chauffeur On Call'
  }
];

// Hotels database for stops
export const HOTELS_BY_CITY = {
  DEL: [
    { name: 'The Leela Palace New Delhi', stars: 5, rating: 4.9, reviews: 1420, pricePerNight: 12500, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', area: 'Chanakyapuri (Diplomatic Enclave)', amenities: ['Breakfast Included', 'Infinity Pool', 'Luxury Spa', 'Free High-Speed WiFi'] },
    { name: 'Taj Mahal Hotel Delhi', stars: 5, rating: 4.8, reviews: 980, pricePerNight: 10800, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80', area: 'Mansingh Road, Central Delhi', amenities: ['Heritage Lounge', 'Fine Dining', 'Airport Shuttle', 'Gym'] }
  ],
  BOM: [
    { name: 'The Taj Mahal Palace Mumbai', stars: 5, rating: 4.95, reviews: 2150, pricePerNight: 16000, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80', area: 'Colaba, Gateway of India', amenities: ['Sea View Rooms', 'Iconic Heritage', 'Pool & Spa', 'Complimentary High Tea'] },
    { name: 'Trident Nariman Point', stars: 5, rating: 4.75, reviews: 1120, pricePerNight: 9500, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80', area: 'Marine Drive Queen’s Necklace', amenities: ['Ocean Views', 'Fitness Center', 'Free Breakfast'] }
  ],
  DXB: [
    { name: 'Atlantis, The Palm Dubai', stars: 5, rating: 4.92, reviews: 3400, pricePerNight: 24000, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80', area: 'Palm Jumeirah Island', amenities: ['Aquaventure Waterpark Pass', 'Private Beach', 'Underwater Suite Access', 'Free Breakfast'] },
    { name: 'JW Marriott Marquis Hotel Dubai', stars: 5, rating: 4.85, reviews: 1890, pricePerNight: 14500, image: 'https://images.unsplash.com/photo-1580977276076-ae4b7c933018?w=600&q=80', area: 'Business Bay & Burj Khalifa View', amenities: ['Rooftop Lounge', 'Heated Pool', 'Spa & Wellness', 'Luxury Valet'] }
  ],
  CDG: [
    { name: 'Pullman Paris Tour Eiffel', stars: 4, rating: 4.88, reviews: 1720, pricePerNight: 21000, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80', area: 'Champ de Mars (Eiffel Tower View)', amenities: ['Balcony with Eiffel View', 'French Bistro', '24/7 Concierge', 'Free High-Speed WiFi'] },
    { name: 'Hôtel Plaza Athénée Paris', stars: 5, rating: 4.96, reviews: 890, pricePerNight: 35000, image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=600&q=80', area: 'Avenue Montaigne, 8th Arr.', amenities: ['Haute Cuisine by Ducasse', 'Dior Spa', 'Balcony Garden'] }
  ],
  FCO: [
    { name: 'Hotel Raphael - Relais & Châteaux', stars: 5, rating: 4.9, reviews: 860, pricePerNight: 19500, image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80', area: 'Piazza Navona & Pantheon', amenities: ['Rooftop Terrace', 'Organic Restaurant', 'Historic Ivy Facade', 'Free Breakfast'] },
    { name: 'NH Collection Roma Fori Imperiali', stars: 5, rating: 4.84, reviews: 740, pricePerNight: 16800, image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&q=80', area: 'Roman Forum & Colosseum View', amenities: ['Panoramic Bar', 'Italian Breakfast', 'Boutique Suites'] }
  ],
  ZRH: [
    { name: 'The Dolder Grand Zurich', stars: 5, rating: 4.94, reviews: 1100, pricePerNight: 28000, image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&q=80', area: 'Adlisberg & Lake Zurich View', amenities: ['4,000 m² Luxury Spa', 'Michelin Star Dining', 'Art Collection', 'Limousine Service'] },
    { name: 'Hotel Schweizerhof Zurich', stars: 4, rating: 4.82, reviews: 650, pricePerNight: 18500, image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80', area: 'Bahnhofstrasse (City Center)', amenities: ['Motorized Adjustable Beds', 'Free Soundproof Rooms', 'Swiss Breakfast'] }
  ],
  SIN: [
    { name: 'Marina Bay Sands', stars: 5, rating: 4.96, reviews: 4200, pricePerNight: 32000, image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80', area: 'Marina Bay Waterfront', amenities: ['World Famous Infinity Pool', 'SkyPark Observation Deck', 'Celebrity Restaurants', 'Casino & Mall Access'] },
    { name: 'The Fullerton Hotel Singapore', stars: 5, rating: 4.88, reviews: 1540, pricePerNight: 19000, image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=600&q=80', area: 'Singapore River & Marina View', amenities: ['Heritage Landmark', 'Riverside Pool', 'Fullerton Spa', 'Afternoon Tea'] }
  ],
  JAI: [
    { name: 'Rambagh Palace Jaipur', stars: 5, rating: 4.98, reviews: 1980, pricePerNight: 26000, image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80', area: 'Bhawani Singh Road, Jaipur', amenities: ['Former Royal Palace', 'Peacock Gardens', 'Royal Butler Service', 'Vintage Car Transfer'] },
    { name: 'ITC Rajputana, A Luxury Collection', stars: 5, rating: 4.8, reviews: 1350, pricePerNight: 8500, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80', area: 'Palace Road, Gopalbari', amenities: ['Royal Courtyards', 'Peshawri Dining', 'Kaya Kalp Spa', 'Pool'] }
  ],
  LHR: [
    { name: 'The Savoy London', stars: 5, rating: 4.95, reviews: 2300, pricePerNight: 31000, image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80', area: 'Strand, Covent Garden', amenities: ['Thames River View', 'Butler Service', 'Historic Savoy Grill', 'Luxury Spa'] }
  ]
};

// Sightseeing activities by city
export const ACTIVITIES_BY_CITY = {
  DEL: [
    { id: 'del-1', title: 'Old Delhi Street Food & Heritage Rickshaw Tour', duration: '3.5 Hours', rating: 4.9, price: 1499, tag: 'Food & Heritage', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80' }
  ],
  DXB: [
    { id: 'dxb-1', title: 'Burj Khalifa 124th + 125th Floor & Dubai Aquarium', duration: '3 Hours', rating: 4.95, price: 3800, tag: 'Iconic View', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80' },
    { id: 'dxb-2', title: 'Desert 4x4 Dune Bashing Safari with BBQ Buffet & Fire Show', duration: '6 Hours', rating: 4.92, price: 2900, tag: 'Adventure', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80' }
  ],
  CDG: [
    { id: 'cdg-1', title: 'Skip-the-Line Louvre Museum Guided Masterpieces Tour', duration: '3 Hours', rating: 4.94, price: 4200, tag: 'Art & Culture', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80' },
    { id: 'cdg-2', title: 'Eiffel Tower Summit Access + Seine River Cruise', duration: '4 Hours', rating: 4.91, price: 4800, tag: 'Must See', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80' }
  ],
  FCO: [
    { id: 'fco-1', title: 'Colosseum Underground & Roman Forum VIP Access', duration: '3.5 Hours', rating: 4.97, price: 4500, tag: 'Ancient Rome', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80' }
  ],
  ZRH: [
    { id: 'zrh-1', title: 'Mount Titlis Glacier Paradise & Ice Flyer Excursion', duration: '8 Hours', rating: 4.96, price: 9200, tag: 'Alpine Alps', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=400&q=80' }
  ],
  LHR: [
    { id: 'lhr-1', title: 'Tower of London & Crown Jewels Early Access', duration: '3 Hours', rating: 4.93, price: 3800, tag: 'Royal History', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80' }
  ],
  SIN: [
    { id: 'sin-1', title: 'Gardens by the Bay & Cloud Forest Flower Dome Pass', duration: '3 Hours', rating: 4.92, price: 2600, tag: 'Nature Wonder', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&q=80' }
  ]
};

// Curated MakeMyTrip-Style Multi-Stop Packages
export const CURATED_MULTI_STOP_PACKAGES = [
  {
    id: 'pkg-europe-grandeur',
    title: 'European Grandeur: 4 Iconic Capitals',
    route: 'London (2N) → Paris (3N) → Zurich (2N) → Rome (3N)',
    stops: [
      { from: 'DEL', to: 'LHR', stayNights: 2, departureDate: '2026-09-10' },
      { from: 'LHR', to: 'CDG', stayNights: 3, departureDate: '2026-09-12' },
      { from: 'CDG', to: 'ZRH', stayNights: 2, departureDate: '2026-09-15' },
      { from: 'ZRH', to: 'FCO', stayNights: 3, departureDate: '2026-09-17' },
      { from: 'FCO', to: 'DEL', stayNights: 0, departureDate: '2026-09-20' }
    ],
    duration: '11 Days • 10 Nights • 4 Countries',
    tag: 'Bestseller Multi-Country',
    badge: 'Save ₹14,200',
    basePriceINR: 145000,
    rating: '4.96 (420+ Bookings)',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80',
    highlights: ['Eurostar high-speed rail experience', 'Eiffel Tower summit + Seine cruise', 'Swiss Alps Titlis excursion', 'Colosseum VIP underground access']
  },
  {
    id: 'pkg-royal-rajasthan',
    title: 'Royal Rajasthan Heritage Circuit',
    route: 'Delhi → Jaipur (2N) → Udaipur (2N) → Delhi',
    stops: [
      { from: 'DEL', to: 'JAI', stayNights: 2, departureDate: '2026-10-05' },
      { from: 'JAI', to: 'UDR', stayNights: 2, departureDate: '2026-10-07' },
      { from: 'UDR', to: 'DEL', stayNights: 0, departureDate: '2026-10-09' }
    ],
    duration: '5 Days • 4 Nights • 2 Royal Cities',
    tag: 'Domestic Classic',
    badge: 'Popular Family Pick',
    basePriceINR: 32000,
    rating: '4.92 (680+ Bookings)',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80',
    highlights: ['Amer Fort Jeep ride', 'Lake Pichola sunset boat cruise', 'Private heritage palace stays', 'Rajasthani cultural folk dinner']
  },
  {
    id: 'pkg-middle-east-wonders',
    title: 'Middle East & Arabian Luxury Trail',
    route: 'Mumbai → Dubai (3N) → Muscat (2N) → Mumbai',
    stops: [
      { from: 'BOM', to: 'DXB', stayNights: 3, departureDate: '2026-11-12' },
      { from: 'DXB', to: 'DEL', stayNights: 0, departureDate: '2026-11-15' }
    ],
    duration: '4 Days • 3 Nights • Luxury Hub',
    tag: 'Desert & Skyline',
    badge: 'Instant Visa Included',
    basePriceINR: 48500,
    rating: '4.94 (310+ Bookings)',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    highlights: ['Burj Khalifa 124th floor entry', 'Desert safari with 4x4 dune bashing', 'Sheikh Zayed Grand Mosque tour', 'Luxury Marina Dhow cruise']
  },
  {
    id: 'pkg-southeast-asia-bliss',
    title: 'Southeast Asia Triple City Combo',
    route: 'Bengaluru → Singapore (3N) → Kuala Lumpur (2N) → Bangkok (3N) → Bengaluru',
    stops: [
      { from: 'BLR', to: 'SIN', stayNights: 3, departureDate: '2026-10-18' },
      { from: 'SIN', to: 'KUL', stayNights: 2, departureDate: '2026-10-21' },
      { from: 'KUL', to: 'BKK', stayNights: 3, departureDate: '2026-10-23' },
      { from: 'BKK', to: 'BLR', stayNights: 0, departureDate: '2026-10-26' }
    ],
    duration: '9 Days • 8 Nights • 3 Capitals',
    tag: 'Island & City Escapes',
    badge: 'Visa Free Entry',
    basePriceINR: 76000,
    rating: '4.95 (540+ Bookings)',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80',
    highlights: ['Gardens by the Bay & Supertree Grove', 'Petronas Twin Towers sky bridge', 'Chao Phraya Princess dinner cruise', 'Universal Studios 1-day pass']
  }
];
