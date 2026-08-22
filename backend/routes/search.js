const express = require('express');
const router = express.Router();
const { POPULAR_CITIES, PACKAGES } = require('../data/mockDatabase');

// GET /api/search/cities — Searchable airports & hubs
router.get('/cities', (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.json({ cities: POPULAR_CITIES });
  }

  const q = query.toLowerCase();
  const filtered = POPULAR_CITIES.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.code.toLowerCase().includes(q) ||
    c.country.toLowerCase().includes(q) ||
    c.airport.toLowerCase().includes(q)
  );

  res.json({ cities: filtered });
});

// GET /api/search/packages — Pre-packaged multi-city tours
router.get('/packages', (req, res) => {
  res.json({ packages: PACKAGES });
});

// POST /api/search/multi-stop — GlobeTrotter Multi-Stop Optimizer Calculation Engine
router.post('/multi-stop', (req, res) => {
  const { stops = [], travelers = { adults: 1, children: 0 }, specialFare = 'regular', currency = 'INR' } = req.body;

  if (!stops || stops.length === 0) {
    return res.status(400).json({ error: 'At least 1 leg / stop parameter is required.' });
  }

  const totalTravelers = (travelers.adults || 1) + (travelers.children || 0);

  // Compute mock flights per leg
  const calculatedLegs = stops.map((stop, idx) => {
    const fromCity = POPULAR_CITIES.find(c => c.code === (stop.fromCity?.code || stop.from)) || stop.fromCity || { code: 'DEL', name: 'New Delhi' };
    const toCity = POPULAR_CITIES.find(c => c.code === (stop.toCity?.code || stop.to)) || stop.toCity || { code: 'DXB', name: 'Dubai' };
    const isDomestic = fromCity.country === 'India' && toCity.country === 'India';
    const baseFare = isDomestic ? 4800 : (idx === 0 ? 16500 : 12200);

    return {
      legIndex: idx + 1,
      fromCity,
      toCity,
      departureDate: stop.departureDate || '2026-09-15',
      stayNights: stop.stayNights || 1,
      flight: {
        airline: idx % 2 === 0 ? 'Emirates' : (isDomestic ? 'IndiGo' : 'Air France'),
        flightNumber: `${idx % 2 === 0 ? 'EK' : (isDomestic ? '6E' : 'AF')}-${410 + idx * 28}`,
        depTime: '08:45 AM',
        arrTime: '01:15 PM',
        duration: isDomestic ? '2h 30m' : '5h 45m',
        baseFare: baseFare * totalTravelers,
        baggage: '25kg Check-in + 7kg Cabin'
      }
    };
  });

  const totalFlightCost = calculatedLegs.reduce((sum, leg) => sum + leg.flight.baseFare, 0);
  const totalHotelCost = calculatedLegs.reduce((sum, leg) => sum + (leg.stayNights * 11500), 0);
  const taxesCost = Math.round((totalFlightCost + totalHotelCost) * 0.12);
  const bundleDiscount = Math.round((totalFlightCost + totalHotelCost) * 0.08);
  const grandTotal = totalFlightCost + totalHotelCost + taxesCost - bundleDiscount;

  res.json({
    route: `${calculatedLegs[0].fromCity.name} ➔ ${calculatedLegs.map(l => l.toCity.name).join(' ➔ ')}`,
    stopsCount: calculatedLegs.length,
    travelersCount: totalTravelers,
    currency,
    calculatedLegs,
    pricing: {
      totalFlightCost,
      totalHotelCost,
      taxesCost,
      bundleDiscount,
      grandTotal
    }
  });
});

module.exports = router;
