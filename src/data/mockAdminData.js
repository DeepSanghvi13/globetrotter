export const initialUsers = [
  {
    id: 'usr-101',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    role: 'Admin',
    status: 'Active',
    joinedDate: '2026-01-15',
    tripsCount: 14,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-102',
    name: 'Sophia Chen',
    email: 'sophia.chen@example.com',
    role: 'Traveler',
    status: 'Active',
    joinedDate: '2026-02-04',
    tripsCount: 8,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-103',
    name: 'Mateo Rossi',
    email: 'mateo.rossi@example.com',
    role: 'Guide',
    status: 'Active',
    joinedDate: '2026-02-18',
    tripsCount: 22,
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-104',
    name: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    role: 'Traveler',
    status: 'Pending',
    joinedDate: '2026-03-01',
    tripsCount: 3,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-105',
    name: 'Liam Vance',
    email: 'liam.vance@example.com',
    role: 'Traveler',
    status: 'Suspended',
    joinedDate: '2025-11-12',
    tripsCount: 1,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-106',
    name: 'Maya Patel',
    email: 'maya.patel@example.com',
    role: 'Traveler',
    status: 'Active',
    joinedDate: '2026-03-10',
    tripsCount: 6,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  }
];

export const initialTrips = [
  {
    id: 'trip-201',
    name: 'Euro Summer Expedition',
    owner: 'Aarav Sharma',
    ownerEmail: 'aarav.sharma@example.com',
    startDate: '2026-09-01',
    endDate: '2026-09-18',
    citiesCount: 4,
    destinations: ['Paris', 'Rome', 'Barcelona', 'Amsterdam'],
    estimatedBudget: 3450,
    breakdown: { transport: 1200, stay: 1350, activities: 550, meals: 350 },
    status: 'Upcoming',
    coverImage: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'trip-202',
    name: 'Cherry Blossom & Tokyo Lights',
    owner: 'Sophia Chen',
    ownerEmail: 'sophia.chen@example.com',
    startDate: '2026-04-05',
    endDate: '2026-04-16',
    citiesCount: 3,
    destinations: ['Tokyo', 'Kyoto', 'Osaka'],
    estimatedBudget: 4200,
    breakdown: { transport: 1400, stay: 1600, activities: 700, meals: 500 },
    status: 'Active',
    coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'trip-203',
    name: 'Bali Spiritual & Adventure Retreat',
    owner: 'Mateo Rossi',
    ownerEmail: 'mateo.rossi@example.com',
    startDate: '2026-10-10',
    endDate: '2026-10-22',
    citiesCount: 2,
    destinations: ['Ubud', 'Canggu'],
    estimatedBudget: 1850,
    breakdown: { transport: 450, stay: 750, activities: 400, meals: 250 },
    status: 'Planning',
    coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'trip-204',
    name: 'New York Autumn Wanderlust',
    owner: 'Maya Patel',
    ownerEmail: 'maya.patel@example.com',
    startDate: '2026-11-01',
    endDate: '2026-11-07',
    citiesCount: 1,
    destinations: ['New York City'],
    estimatedBudget: 2900,
    breakdown: { transport: 800, stay: 1250, activities: 450, meals: 400 },
    status: 'Planning',
    coverImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&auto=format&fit=crop&q=80'
  }
];

export const topCitiesData = [
  {
    name: 'Paris',
    country: 'France',
    tripsCount: 420,
    popularity: 98,
    avgBudget: '$2,400',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&auto=format&fit=crop&q=80'
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    tripsCount: 385,
    popularity: 96,
    avgBudget: '$3,100',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&auto=format&fit=crop&q=80'
  },
  {
    name: 'Rome',
    country: 'Italy',
    tripsCount: 310,
    popularity: 92,
    avgBudget: '$1,950',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300&auto=format&fit=crop&q=80'
  },
  {
    name: 'Bali',
    country: 'Indonesia',
    tripsCount: 295,
    popularity: 90,
    avgBudget: '$1,400',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&auto=format&fit=crop&q=80'
  },
  {
    name: 'New York',
    country: 'United States',
    tripsCount: 260,
    popularity: 88,
    avgBudget: '$2,850',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300&auto=format&fit=crop&q=80'
  }
];

export const topActivitiesData = [
  { title: 'Louvre Museum Guided Skip-the-Line Tour', category: 'Culture', cost: '$65', duration: '3 hrs', rating: 4.9 },
  { title: 'Shibuya Night Street Food & Sake Tasting', category: 'Culinary', cost: '$85', duration: '3.5 hrs', rating: 4.8 },
  { title: 'Mount Batur Volcano Sunrise Trek', category: 'Adventure', cost: '$45', duration: '6 hrs', rating: 4.9 },
  { title: 'Colosseum Underground & Forum Tour', category: 'History', cost: '$75', duration: '3 hrs', rating: 4.7 }
];

export const monthlyTrends = [
  { month: 'Jan', trips: 120, users: 85 },
  { month: 'Feb', trips: 185, users: 130 },
  { month: 'Mar', trips: 240, users: 190 },
  { month: 'Apr', trips: 310, users: 245 },
  { month: 'May', trips: 420, users: 310 },
  { month: 'Jun', trips: 560, users: 450 },
  { month: 'Jul', trips: 680, users: 520 },
  { month: 'Aug', trips: 740, users: 610 }
];

export const systemActivityLogs = [
  { id: 1, text: 'User Sophia Chen created trip "Cherry Blossom & Tokyo Lights"', time: '12 mins ago', type: 'trip' },
  { id: 2, text: 'New user registration: Maya Patel (maya.patel@example.com)', time: '45 mins ago', type: 'user' },
  { id: 3, text: 'Admin Aarav Sharma updated user roles for Mateo Rossi', time: '2 hours ago', type: 'admin' },
  { id: 4, text: 'System automatic backup completed successfully', time: '5 hours ago', type: 'system' }
];
