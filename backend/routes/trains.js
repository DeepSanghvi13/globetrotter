const express = require('express');
const router = express.Router();

const TRAINS_DATABASE = [
  {
    id: 'trn-1',
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
    id: 'trn-2',
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
  },
  {
    id: 'trn-3',
    trainName: 'Rajdhani Express',
    trainNumber: '12952 / RAJDHANI',
    from: { code: 'NDLS', name: 'New Delhi Central' },
    to: { code: 'MMCT', name: 'Mumbai Central' },
    depTime: '04:30 PM',
    arrTime: '08:35 AM (+1 Day)',
    duration: '16h 05m',
    speed: 'Superfast AC Sleeper 130 km/h',
    classes: [
      { type: '3rd AC (3A)', fare: 2100, status: 'AVAILABLE-064' },
      { type: '2nd AC (2A)', fare: 2950, status: 'RAC-008' },
      { type: '1st AC (1A)', fare: 4500, status: 'AVAILABLE-004' }
    ],
    rating: 4.85,
    punctuality: '98.5% On Time'
  }
];

// POST /api/trains/search
router.post('/search', (req, res) => {
  const { fromStation, toStation, travelDate, quota = 'GENERAL' } = req.body;
  res.json({
    fromStation,
    toStation,
    travelDate,
    quota,
    totalTrains: TRAINS_DATABASE.length,
    trains: TRAINS_DATABASE
  });
});

// POST /api/trains/book — Book train ticket & generate IRCTC PNR
router.post('/book', (req, res) => {
  const { trainId, passengerName = 'Aarav Sharma', classType = 'AC Chair Car (CC)', berthPref } = req.body;

  const train = TRAINS_DATABASE.find(t => t.id === trainId) || TRAINS_DATABASE[0];
  const pnr = `PNR-${Math.floor(2000000000 + Math.random() * 8000000000)}`;
  const ticketNo = `ETKT-TRN-${Math.floor(10000000 + Math.random() * 90000000)}`;
  const coach = classType.includes('EC') ? 'E1' : (classType.includes('1A') ? 'H1' : 'C3');
  const seatNo = Math.floor(12 + Math.random() * 48);

  res.status(201).json({
    message: 'Train ticket booked successfully',
    ticket: {
      pnr,
      ticketNo,
      trainName: train.trainName,
      trainNumber: train.trainNumber,
      from: train.from,
      to: train.to,
      passengerName,
      classType,
      coach,
      seatNo,
      berthPref: berthPref || 'Window Seat',
      status: 'CONFIRMED'
    }
  });
});

module.exports = router;
