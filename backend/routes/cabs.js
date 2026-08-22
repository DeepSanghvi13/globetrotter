const express = require('express');
const router = express.Router();

const CABS_DATABASE = [
  {
    id: 'hatch-sedan',
    name: 'Sedan (Dzire / Etios)',
    category: 'Compact & Economical',
    seats: 4,
    bags: '2 Large Bags',
    basePrice: 1450,
    rating: 4.85,
    features: ['AC', 'GPS Live Tracking', 'Clean & Sanitized', 'Complimentary Water']
  },
  {
    id: 'suv-crysta',
    name: 'Outstation SUV (Innova Crysta)',
    category: 'Spacious & Family Comfort',
    seats: 6,
    bags: '4 Large Bags',
    basePrice: 2850,
    rating: 4.92,
    features: ['Reclining Seats', 'Extra Legroom', 'All State Tolls Included', 'Experienced Driver']
  },
  {
    id: 'luxury-merc',
    name: 'Executive Chauffeur (Mercedes / BMW)',
    category: 'VIP Luxury & Concierge',
    seats: 4,
    bags: '3 Large Bags',
    basePrice: 5800,
    rating: 4.98,
    features: ['Uniformed VIP Chauffeur', 'Flight Delay Auto-Tracking', 'High-Speed WiFi', 'Luxury Refreshments']
  }
];

// POST /api/cabs/search
router.post('/search', (req, res) => {
  const { serviceType = 'airport', pickupLocation, dropLocation, pickupDate, pickupTime } = req.body;

  res.json({
    serviceType,
    pickupLocation: pickupLocation || 'Airport Terminal 3',
    dropLocation: dropLocation || 'City Center',
    pickupDate: pickupDate || '2026-09-15',
    pickupTime: pickupTime || '10:30 AM',
    availableCabs: CABS_DATABASE
  });
});

// POST /api/cabs/book — Confirm ride & assign chauffeur
router.post('/book', (req, res) => {
  const { cabId, passengerName = 'Aarav Sharma', phone = '+91 98765 43210', flightNo } = req.body;

  const cab = CABS_DATABASE.find(c => c.id === cabId) || CABS_DATABASE[0];
  const bookingId = `CAB-${Math.floor(100000 + Math.random() * 900000)}`;
  const driverName = 'Rajesh Kumar (★ 4.95)';
  const vehiclePlate = `DL-01-AB-${Math.floor(1000 + Math.random() * 9000)}`;

  res.status(201).json({
    message: 'Cab ride confirmed and chauffeur dispatched',
    cabVoucher: {
      bookingId,
      cabName: cab.name,
      category: cab.category,
      passengerName,
      phone,
      flightNo,
      driverName,
      vehiclePlate,
      fare: cab.basePrice,
      status: 'DISPATCHED'
    }
  });
});

module.exports = router;
