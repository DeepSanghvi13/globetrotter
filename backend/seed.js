require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Booking = require('./models/Booking');
const Train = require('./models/Train');
const Cab = require('./models/Cab');
const SupportTicket = require('./models/SupportTicket');
const { bookings, users, supportTickets } = require('./data/mockDatabase');

const seedData = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/globetrotter';

  try {
    await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 5000 });
    console.log('🌱 Connected to MongoDB for Database Seeding...');

    // Seed Users
    await User.deleteMany({});
    await User.insertMany([
      { name: 'Aarav Sharma', email: 'aarav.sharma@example.com', password: 'password123', role: 'Traveler' },
      { name: 'Admin Master', email: 'admin@globetrotter.travel', password: 'adminpassword', role: 'Admin' }
    ]);
    console.log('✓ Seeded Users into MongoDB');

    // Seed Bookings
    await Booking.deleteMany({});
    await Booking.insertMany(bookings.map(b => ({
      pnr: b.pnr,
      title: b.title,
      status: b.status,
      departureDate: b.departureDate,
      travelers: b.travelers,
      primaryPassenger: b.primaryPassenger,
      totalPrice: b.totalPrice,
      currency: b.currency,
      stops: b.stops,
      selectedHotels: b.selectedHotels,
      selectedActivities: b.selectedActivities
    })));
    console.log('✓ Seeded Bookings into MongoDB');

    // Seed Trains
    await Train.deleteMany({});
    await Train.insertMany([
      {
        trainName: 'Vande Bharat Express',
        trainNumber: '20977 / VB-EXPRESS',
        from: { code: 'NDLS', name: 'New Delhi Central' },
        to: { code: 'JP', name: 'Jaipur Junction' },
        depTime: '06:00 AM',
        arrTime: '10:45 AM',
        duration: '4h 45m',
        speed: 'High Speed 160 km/h',
        classes: [
          { type: 'AC Chair Car (CC)', fare: 1450, status: 'AVAILABLE-042' },
          { type: 'Executive Class (EC)', fare: 2650, status: 'AVAILABLE-012' }
        ],
        rating: 4.9,
        punctuality: '99.4% On Time'
      },
      {
        trainName: 'Eurostar High-Speed International',
        trainNumber: 'EST-9014 / EUROSTAR',
        from: { code: 'PARIS-GL', name: 'Paris Gare de Lyon' },
        to: { code: 'ZRH-HB', name: 'Zurich Hauptbahnhof' },
        depTime: '08:15 AM',
        arrTime: '10:47 AM',
        duration: '2h 32m',
        speed: '300 km/h Bullet Train',
        classes: [
          { type: 'Standard Premier', fare: 4200, status: 'AVAILABLE-028' },
          { type: 'Business Premier', fare: 6800, status: 'AVAILABLE-008' }
        ],
        rating: 4.96,
        punctuality: '99.8% On Time'
      }
    ]);
    console.log('✓ Seeded Express Trains into MongoDB');

    // Seed Cabs
    await Cab.deleteMany({});
    await Cab.insertMany([
      {
        name: 'Sedan (Dzire / Etios)',
        category: 'Compact & Economical',
        seats: 4,
        bags: '2 Large Bags',
        basePrice: 1450,
        rating: 4.85,
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500&q=80',
        features: ['AC', 'GPS Live Tracking', 'Clean & Sanitized', 'Complimentary Water']
      },
      {
        name: 'Outstation SUV (Innova Crysta)',
        category: 'Spacious & Family Comfort',
        seats: 6,
        bags: '4 Large Bags',
        basePrice: 2850,
        rating: 4.92,
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&q=80',
        features: ['Reclining Seats', 'Extra Legroom', 'All State Tolls Included', 'Experienced Driver']
      }
    ]);
    console.log('✓ Seeded Cab Fleet into MongoDB');

    // Seed Support Tickets
    await SupportTicket.deleteMany({});
    await SupportTicket.insertMany(supportTickets.map(t => ({
      ticketId: t.ticketId,
      name: t.name,
      email: t.email,
      category: t.category,
      priority: t.priority,
      message: t.message,
      status: t.status
    })));
    console.log('✓ Seeded Support Tickets into MongoDB');

    console.log('✅ ALL SEED DATA SUCCESSFULLY STORED IN MONGODB DATABASE!');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
