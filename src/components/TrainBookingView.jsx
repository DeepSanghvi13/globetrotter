import React, { useState, useEffect } from 'react';
import {
  Train, Calendar, Search, CheckCircle, ShieldCheck, Clock,
  MapPin, Tag, Users, ArrowRightLeft, Sparkles, Filter, ChevronRight, X, Printer, RefreshCw
} from 'lucide-react';
import { CURRENCIES } from '../data/multiStopData';
import { FlightBarcode } from './BarcodeGenerator';

const POPULAR_STATIONS = [
  { code: 'NDLS', name: 'New Delhi Central Railway Station', city: 'New Delhi', country: 'India', flag: '🇮🇳' },
  { code: 'JP', name: 'Jaipur Junction Railway Station', city: 'Jaipur', country: 'India', flag: '🇮🇳' },
  { code: 'MMCT', name: 'Mumbai Central Railway Station', city: 'Mumbai', country: 'India', flag: '🇮🇳' },
  { code: 'SBC', name: 'Bengaluru City Railway Station', city: 'Bengaluru', country: 'India', flag: '🇮🇳' },
  { code: 'UDZ', name: 'Udaipur City Railway Station', city: 'Udaipur', country: 'India', flag: '🇮🇳' },
  { code: 'PARIS-GL', name: 'Paris Gare de Lyon', city: 'Paris', country: 'France', flag: '🇫🇷' },
  { code: 'ZRH-HB', name: 'Zurich Hauptbahnhof Central', city: 'Zurich', country: 'Switzerland', flag: '🇨🇭' }
];

const INITIAL_TRAINS = [
  {
    id: 'trn-1',
    trainName: 'Vande Bharat Express',
    trainNumber: '20977 / VB-EXPRESS',
    from: { code: 'NDLS', name: 'New Delhi Central', city: 'New Delhi' },
    to: { code: 'JP', name: 'Jaipur Junction', city: 'Jaipur' },
    depTime: '06:00 AM',
    arrTime: '10:45 AM',
    duration: '4h 45m',
    speed: 'High Speed 160 km/h',
    classes: [
      { type: 'AC Chair Car (CC)', fare: 1450, status: 'AVAILABLE-042', statusColor: '#166534' },
      { type: 'Executive Class (EC)', fare: 2650, status: 'AVAILABLE-012', statusColor: '#166534' }
    ],
    rating: 4.9,
    foodIncluded: true,
    punctuality: '99.4% On Time'
  },
  {
    id: 'trn-2',
    trainName: 'Eurostar High-Speed International',
    trainNumber: 'EST-9014 / EUROSTAR',
    from: { code: 'PARIS-GL', name: 'Paris Gare de Lyon', city: 'Paris' },
    to: { code: 'ZRH-HB', name: 'Zurich Hauptbahnhof', city: 'Zurich' },
    depTime: '08:15 AM',
    arrTime: '10:47 AM',
    duration: '2h 32m',
    speed: '300 km/h Bullet Train',
    classes: [
      { type: 'Standard Premier', fare: 4200, status: 'AVAILABLE-028', statusColor: '#166534' },
      { type: 'Business Premier', fare: 6800, status: 'AVAILABLE-008', statusColor: '#166534' }
    ],
    rating: 4.96,
    foodIncluded: true,
    punctuality: '99.8% On Time'
  },
  {
    id: 'trn-3',
    trainName: 'Rajdhani Superfast Express',
    trainNumber: '12952 / RAJDHANI',
    from: { code: 'NDLS', name: 'New Delhi Central', city: 'New Delhi' },
    to: { code: 'MMCT', name: 'Mumbai Central', city: 'Mumbai' },
    depTime: '04:30 PM',
    arrTime: '08:35 AM (+1 Day)',
    duration: '16h 05m',
    speed: 'Superfast AC Sleeper 130 km/h',
    classes: [
      { type: '3rd AC (3A)', fare: 2100, status: 'AVAILABLE-064', statusColor: '#166534' },
      { type: '2nd AC (2A)', fare: 2950, status: 'RAC-008', statusColor: '#D97706' },
      { type: '1st AC (1A)', fare: 4500, status: 'AVAILABLE-004', statusColor: '#166534' }
    ],
    rating: 4.85,
    foodIncluded: true,
    punctuality: '98.5% On Time'
  },
  {
    id: 'trn-4',
    trainName: 'Shatabdi Express',
    trainNumber: '12005 / SHATABDI',
    from: { code: 'NDLS', name: 'New Delhi Central', city: 'New Delhi' },
    to: { code: 'JP', name: 'Jaipur Junction', city: 'Jaipur' },
    depTime: '06:10 AM',
    arrTime: '10:40 AM',
    duration: '4h 30m',
    speed: 'Superfast 140 km/h',
    classes: [
      { type: 'AC Chair Car (CC)', fare: 1150, status: 'AVAILABLE-018', statusColor: '#166534' },
      { type: 'Executive Class (EC)', fare: 2100, status: 'WL-004', statusColor: '#DC2626' }
    ],
    rating: 4.8,
    foodIncluded: true,
    punctuality: '97.9% On Time'
  }
];

export const TrainBookingView = ({ currency = 'INR' }) => {
  const [fromStation, setFromStation] = useState('NDLS');
  const [toStation, setToStation] = useState('JP');
  const [travelDate, setTravelDate] = useState('2026-09-15');
  const [quota, setQuota] = useState('GENERAL');

  // Loaded Trains State & Loading State
  const [trainsList, setTrainsList] = useState(INITIAL_TRAINS);
  const [isSearching, setIsSearching] = useState(false);

  // Booking Modal State
  const [bookingModal, setBookingModal] = useState({ open: false, train: null, selectedClass: null });
  const [passengerName, setPassengerName] = useState('Aarav Sharma');
  const [berthPref, setBerthPref] = useState('Window Seat / Lower Berth');
  const [confirmedVoucher, setConfirmedVoucher] = useState(null);

  const currSym = CURRENCIES[currency]?.symbol || '₹';
  const currRate = CURRENCIES[currency]?.rate || 1;
  const formatPrice = (inr) => `${currSym}${Math.round(inr * currRate).toLocaleString()}`;

  // Fetch Live Trains from Backend API or Filter Local Data
  const searchTrains = async () => {
    setIsSearching(true);
    try {
      const response = await fetch('http://localhost:5000/api/trains/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fromStation, toStation, travelDate, quota })
      });
      const data = await response.json();
      if (data.trains && data.trains.length > 0) {
        setTrainsList(data.trains);
      } else {
        setTrainsList(INITIAL_TRAINS);
      }
    } catch (err) {
      console.warn('Train search API warning, using client train list:', err);
      setTrainsList(INITIAL_TRAINS);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    searchTrains();
  }, []);

  const handleSwapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  const handleOpenBooking = (train, cls) => {
    setBookingModal({ open: true, train, selectedClass: cls });
    setConfirmedVoucher(null);
  };

  const handleConfirmTrainBooking = async (e) => {
    e.preventDefault();
    const pnr = `PNR-${Math.floor(2000000000 + Math.random() * 8000000000)}`;
    const ticketNo = `ETKT-TRN-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const coach = `${bookingModal.selectedClass.type.includes('EC') ? 'E1' : (bookingModal.selectedClass.type.includes('1A') ? 'H1' : 'C3')}`;
    const seatNo = Math.floor(12 + Math.random() * 48);

    setConfirmedVoucher({
      pnr,
      ticketNo,
      trainName: bookingModal.train.trainName,
      trainNumber: bookingModal.train.trainNumber,
      from: bookingModal.train.from,
      to: bookingModal.train.to,
      depTime: bookingModal.train.depTime,
      arrTime: bookingModal.train.arrTime,
      date: travelDate,
      classType: bookingModal.selectedClass.type,
      fare: bookingModal.selectedClass.fare,
      passengerName,
      coach,
      seatNo,
      berthPref
    });
  };

  return (
    <div style={{ marginTop: '1rem', marginBottom: '2.5rem' }}>
      
      {/* Standalone Train Search Widget - Clean & Tightly Aligned */}
      <div className="glass-panel" style={{
        padding: '1.5rem',
        borderRadius: 'var(--radius-xl)',
        border: '1.5px solid var(--border-strong)',
        boxShadow: 'var(--shadow-lg)',
        marginBottom: '2rem'
      }}>
        
        {/* Section Header Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span className="badge badge-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.35rem 0.85rem' }}>
              <Train size={14} /> High-Speed Express & IRCTC Trains
            </span>
            <span className="badge badge-warning" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <ShieldCheck size={14} /> Instant PNR Confirmation
            </span>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Vande Bharat • Eurostar • Rajdhani
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr 180px 180px auto', gap: '1rem', alignItems: 'center' }}>
          
          {/* From Station */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>From Station</label>
            <select
              value={fromStation}
              onChange={(e) => setFromStation(e.target.value)}
              className="form-input no-icon"
              style={{ fontWeight: 700, fontSize: '0.95rem' }}
            >
              {POPULAR_STATIONS.map((st) => (
                <option key={st.code} value={st.code}>
                  {st.flag} {st.name} ({st.code})
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <button
            type="button"
            onClick={handleSwapStations}
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--color-primary)',
              backgroundColor: 'var(--bg-surface)',
              marginTop: '1.25rem'
            }}
          >
            <ArrowRightLeft size={16} />
          </button>

          {/* To Station */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>To Station</label>
            <select
              value={toStation}
              onChange={(e) => setToStation(e.target.value)}
              className="form-input no-icon"
              style={{ fontWeight: 700, fontSize: '0.95rem' }}
            >
              {POPULAR_STATIONS.map((st) => (
                <option key={st.code} value={st.code}>
                  {st.flag} {st.name} ({st.code})
                </option>
              ))}
            </select>
          </div>

          {/* Travel Date */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Travel Date</label>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="form-input no-icon"
              style={{ fontWeight: 600, fontSize: '0.875rem' }}
            />
          </div>

          {/* Quota */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quota</label>
            <select
              value={quota}
              onChange={(e) => setQuota(e.target.value)}
              className="form-input no-icon"
              style={{ fontWeight: 600, fontSize: '0.875rem' }}
            >
              <option value="GENERAL">General Quota</option>
              <option value="TATKAL">Tatkal Priority</option>
              <option value="SENIOR">Senior Citizen Concession</option>
              <option value="LADIES">Ladies Quota</option>
            </select>
          </div>

          {/* Search Trains CTA Button */}
          <div style={{ marginTop: '1.25rem' }}>
            <button
              type="button"
              onClick={searchTrains}
              disabled={isSearching}
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', height: '42px', padding: '0 1.25rem' }}
            >
              {isSearching ? <RefreshCw size={18} className="animate-spin" /> : <Search size={18} />}
              <span>{isSearching ? 'Searching...' : 'Search Trains'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Live Train Results List */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Available Train Connections ({trainsList.length})
          </h3>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Quota: <strong>{quota}</strong> • Free Gourmet Meal Included on Vande Bharat
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {trainsList.map((trn) => (
            <div
              key={trn.id || trn._id || trn.trainNumber}
              className="glass-panel"
              style={{
                padding: '1.75rem',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-strong)'
              }}
            >
              {/* Train Top Info */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                paddingBottom: '1.25rem',
                borderBottom: '1px solid var(--border)',
                marginBottom: '1.25rem'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.2rem' }}>
                    <span className="badge badge-accent" style={{ fontSize: '0.75rem' }}>
                      ★ {trn.rating || 4.9} • {trn.punctuality || '99.4% On Time'}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 700 }}>
                      ⚡ {trn.speed || 'Express'}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    {trn.trainName} <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>({trn.trainNumber})</span>
                  </h4>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', textAlign: 'center' }}>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>{trn.depTime || '06:00 AM'}</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{trn.from?.name || 'Station'}</div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '100px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{trn.duration || '4h 45m'}</span>
                    <div style={{ width: '100%', height: '2px', backgroundColor: 'var(--border-strong)', margin: '0.35rem 0', position: 'relative' }}>
                      <Train size={14} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--color-primary)' }} />
                    </div>
                    <span style={{ fontSize: '0.7rem', color: '#166534', fontWeight: 700 }}>Non-Stop Daily</span>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>{trn.arrTime || '10:45 AM'}</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{trn.to?.name || 'Destination'}</div>
                  </div>
                </div>
              </div>

              {/* Available Classes & Pricing Badges */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                  {(trn.classes || []).map((cls, cIdx) => (
                    <div
                      key={cIdx}
                      onClick={() => handleOpenBooking(trn, cls)}
                      style={{
                        backgroundColor: 'var(--bg-page)',
                        border: '1.5px solid var(--border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '0.75rem 1.15rem',
                        cursor: 'pointer',
                        minWidth: '160px',
                        transition: 'border-color 0.2s ease, transform 0.2s ease'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'var(--color-primary)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'var(--border)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>{cls.type}</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-primary)', margin: '0.15rem 0' }}>
                        {formatPrice(cls.fare)}
                      </div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: cls.statusColor || '#166534' }}>
                        ✓ {cls.status}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenBooking(trn, trn.classes?.[0] || { type: 'AC Chair Car (CC)', fare: 1450, status: 'AVAILABLE' })}
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: 'var(--shadow-glow)' }}
                >
                  <span>Book Train Ticket</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Train Ticket Booking & Barcode E-Voucher Modal */}
      {bookingModal.open && (
        <div className="modal-overlay" onClick={() => setBookingModal({ open: false, train: null, selectedClass: null })} style={{ zIndex: 1200 }}>
          <div
            className="modal-content animate-fade-in"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '640px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Confirm Train Ticket Reservation
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  IRCTC & Railway Authorized Instant Booking
                </div>
              </div>
              <button
                type="button"
                onClick={() => setBookingModal({ open: false, train: null, selectedClass: null })}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {confirmedVoucher ? (
              /* Confirmed Ticket Pass with 1D Barcode */
              <div style={{ textAlign: 'center' }}>
                <div className="badge badge-accent" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle size={16} /> IRCTC Train Ticket Confirmed
                </div>

                <div style={{
                  backgroundColor: '#FFFFFF',
                  color: '#1C1917',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  border: '2px dashed #C1440E',
                  boxShadow: 'var(--shadow-lg)',
                  textAlign: 'left',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E7E1DB', paddingBottom: '0.85rem', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#C1440E' }}>{confirmedVoucher.trainName}</div>
                      <div style={{ fontSize: '0.8rem', color: '#78716C' }}>{confirmedVoucher.trainNumber}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem', color: '#78716C' }}>IRCTC PNR</div>
                      <div style={{ fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 900, color: '#1C1917' }}>
                        {confirmedVoucher.pnr}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#78716C', textTransform: 'uppercase' }}>Passenger</div>
                      <div style={{ fontWeight: 800 }}>{confirmedVoucher.passengerName}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#78716C', textTransform: 'uppercase' }}>Coach / Berth</div>
                      <div style={{ fontWeight: 800, color: '#C1440E' }}>Coach {confirmedVoucher.coach} • Seat {confirmedVoucher.seatNo}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#78716C', textTransform: 'uppercase' }}>Class</div>
                      <div style={{ fontWeight: 800 }}>{confirmedVoucher.classType}</div>
                    </div>
                  </div>

                  {/* Train Barcode */}
                  <div style={{ backgroundColor: '#FBF8F4', padding: '1rem', borderRadius: '10px', textAlign: 'center', border: '1px solid #E7E1DB' }}>
                    <div style={{ fontSize: '0.7rem', color: '#78716C', marginBottom: '0.35rem', fontWeight: 700 }}>
                      TICKET NUMBER: {confirmedVoucher.ticketNo}
                    </div>
                    <FlightBarcode barcodeText={confirmedVoucher.pnr} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="btn btn-outline"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <Printer size={16} /> Print Train Ticket
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingModal({ open: false, train: null, selectedClass: null })}
                    className="btn btn-primary"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Passenger Booking Form */
              <form onSubmit={handleConfirmTrainBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ backgroundColor: 'var(--bg-page)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>
                    {bookingModal.train?.trainName} ({bookingModal.train?.trainNumber})
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    Class: <strong>{bookingModal.selectedClass?.type}</strong> • Fare: <strong style={{ color: 'var(--color-primary)' }}>{formatPrice(bookingModal.selectedClass?.fare || 1450)}</strong>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Passenger Full Name *</label>
                  <input
                    type="text"
                    required
                    value={passengerName}
                    onChange={(e) => setPassengerName(e.target.value)}
                    className="form-input no-icon"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Seat / Berth Preference</label>
                  <select
                    value={berthPref}
                    onChange={(e) => setBerthPref(e.target.value)}
                    className="form-input no-icon"
                  >
                    <option value="Window Seat / Lower Berth">Window Seat / Lower Berth</option>
                    <option value="Aisle Seat / Middle Berth">Aisle Seat / Middle Berth</option>
                    <option value="Upper Berth">Upper Berth</option>
                    <option value="Side Lower">Side Lower</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: 'var(--shadow-glow)' }}
                >
                  <Train size={18} />
                  <span>Pay {formatPrice(bookingModal.selectedClass?.fare || 1450)} & Issue Train PNR Ticket</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default TrainBookingView;
