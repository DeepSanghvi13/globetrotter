// In-Memory Database for GlobeTrotter Backend API

const POPULAR_CITIES = [
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

const PACKAGES = [
  {
    id: 'pkg-europe-grandeur',
    title: 'European Grandeur: Dubai, Paris & Rome',
    subtitle: 'Delhi → Dubai → Paris → Rome',
    duration: '8 Days • 3 Destinations',
    nights: '2N Dubai • 3N Paris • 2N Rome',
    price: 168400,
    originalPrice: 198000,
    discount: '15% OFF Multi-City Bundle',
    rating: '4.95 (240+ Booked)',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80',
    stops: [
      { from: 'DEL', to: 'DXB', stayNights: 2 },
      { from: 'DXB', to: 'CDG', stayNights: 3 },
      { from: 'CDG', to: 'FCO', stayNights: 2 }
    ],
    inclusions: ['Emirates & Air France Flights', '5★ Hotels Included', 'Louvre & Burj Khalifa VIP Passes']
  },
  {
    id: 'pkg-asia-bliss',
    title: 'Southeast Asia Wonders: Singapore & Kuala Lumpur',
    subtitle: 'Bengaluru → Singapore → Kuala Lumpur',
    duration: '6 Days • 2 Destinations',
    nights: '3N Singapore • 2N Kuala Lumpur',
    price: 112000,
    originalPrice: 135000,
    discount: '17% OFF Multi-City Bundle',
    rating: '4.92 (180+ Booked)',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80',
    stops: [
      { from: 'BLR', to: 'SIN', stayNights: 3 },
      { from: 'SIN', to: 'KUL', stayNights: 2 }
    ],
    inclusions: ['Singapore Airlines Flights', 'Marina Bay Sands Stay', 'Universal Studios Express']
  },
  {
    id: 'pkg-rajasthan-heritage',
    title: 'Royal Rajasthan Heritage Circuit',
    subtitle: 'Delhi → Jaipur → Udaipur',
    duration: '5 Days • 2 Destinations',
    nights: '2N Jaipur • 2N Udaipur',
    price: 46800,
    originalPrice: 58000,
    discount: '20% OFF Domestic Multi-Stop',
    rating: '4.98 (310+ Booked)',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80',
    stops: [
      { from: 'DEL', to: 'JAI', stayNights: 2 },
      { from: 'JAI', to: 'UDR', stayNights: 2 }
    ],
    inclusions: ['IndiGo Flights', 'Taj & Rambagh Palace Stays', 'Fort Elephant & Sunset Boat Pass']
  }
];

const INITIAL_BOOKINGS = [
  {
    id: 'bk-94821',
    pnr: 'GT-94821',
    title: 'Delhi ➔ Dubai ➔ Paris ➔ Rome Multi-City Grand Tour',
    status: 'Confirmed E-Ticket',
    createdAt: 'Aug 21, 2026',
    departureDate: 'Sep 15, 2026',
    travelers: { adults: 2, children: 0, infants: 0, cabinClass: 'Economy' },
    primaryPassenger: 'Aarav Sharma',
    totalPrice: 168400,
    currency: 'INR',
    stops: [
      {
        fromCity: { code: 'DEL', name: 'New Delhi', airport: 'Indira Gandhi Intl', country: 'India' },
        toCity: { code: 'DXB', name: 'Dubai', airport: 'Dubai Intl', country: 'UAE' },
        departureDate: '2026-09-15',
        stayNights: 2,
        flight: { airline: 'Emirates', flightNumber: 'EK-512', depTime: '09:15 AM', arrTime: '11:45 AM', duration: '4h 00m' }
      },
      {
        fromCity: { code: 'DXB', name: 'Dubai', airport: 'Dubai Intl', country: 'UAE' },
        toCity: { code: 'CDG', name: 'Paris', airport: 'Charles de Gaulle', country: 'France' },
        departureDate: '2026-09-17',
        stayNights: 3,
        flight: { airline: 'Air France', flightNumber: 'AF-226', depTime: '01:30 PM', arrTime: '06:15 PM', duration: '6h 45m' }
      },
      {
        fromCity: { code: 'CDG', name: 'Paris', airport: 'Charles de Gaulle', country: 'France' },
        toCity: { code: 'FCO', name: 'Rome', airport: 'Fiumicino Leonardo da Vinci', country: 'Italy' },
        departureDate: '2026-09-20',
        stayNights: 2,
        flight: { airline: 'ITA Airways', flightNumber: 'AZ-318', depTime: '10:00 AM', arrTime: '12:05 PM', duration: '2h 05m' }
      }
    ],
    selectedHotels: {
      DXB: {
        name: 'Atlantis The Palm Dubai',
        stars: 5,
        rating: 4.9,
        reviews: 1420,
        pricePerNight: 22000,
        nights: 2,
        roomType: 'Ocean King Suite',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80',
        amenities: ['Private Beach Access', 'Aquaventure Waterpark Included', 'Free WiFi']
      },
      CDG: {
        name: 'Pullman Paris Tour Eiffel',
        stars: 5,
        rating: 4.85,
        reviews: 980,
        pricePerNight: 18500,
        nights: 3,
        roomType: 'Eiffel View Deluxe',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80',
        amenities: ['Eiffel Tower Balcony', 'Buffet Breakfast', 'Spa & Fitness']
      },
      FCO: {
        name: 'Hotel Eden Rome Dorchester',
        stars: 5,
        rating: 4.92,
        reviews: 730,
        pricePerNight: 16000,
        nights: 2,
        roomType: 'Classic Roman Suite',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80',
        amenities: ['Rooftop Dining', 'Colosseum Concierge Pass', 'Free High-Speed WiFi']
      }
    },
    selectedActivities: [
      { id: 'dxb-1', title: 'Burj Khalifa 124th + 125th Floor & Dubai Aquarium', duration: '3 Hours', price: 3800 }
    ]
  }
];

const INITIAL_USERS = [
  { id: 'usr-1', name: 'Aarav Sharma', email: 'aarav.sharma@example.com', role: 'Traveler', createdAt: '2026-08-01' },
  { id: 'usr-2', name: 'Priya Iyer', email: 'priya.guide@globetrotter.travel', role: 'Guide', createdAt: '2026-07-15' },
  { id: 'usr-3', name: 'Admin Master', email: 'admin@globetrotter.travel', role: 'Admin', createdAt: '2026-01-01' }
];

const SUPPORT_TICKETS = [
  {
    ticketId: 'TKT-82914',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    category: 'Multi-Stop Route Planning',
    priority: 'Normal',
    message: 'Can I add an additional 2-day layover in Zurich on my Paris trip?',
    status: 'In Progress',
    createdAt: 'Aug 22, 2026'
  }
];

module.exports = {
  POPULAR_CITIES,
  PACKAGES,
  bookings: INITIAL_BOOKINGS,
  users: INITIAL_USERS,
  supportTickets: SUPPORT_TICKETS
};
