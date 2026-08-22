import React, { useState } from 'react';
import {
  Car, Calendar, Clock, Search, CheckCircle, ShieldCheck,
  MapPin, Users, Phone, Award, Sparkles, X, Printer, ChevronRight
} from 'lucide-react';
import { CURRENCIES } from '../data/multiStopData';
import { HotelCheckinQRCode } from './BarcodeGenerator';

const CAB_TYPES = [
  {
    id: 'hatch-sedan',
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
    id: 'suv-crysta',
    name: 'Outstation SUV (Innova Crysta)',
    category: 'Spacious & Family Comfort',
    seats: 6,
    bags: '4 Large Bags',
    basePrice: 2850,
    rating: 4.92,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&q=80',
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
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=500&q=80',
    features: ['Uniformed VIP Chauffeur', 'Flight Delay Auto-Tracking', 'High-Speed WiFi', 'Luxury Refreshments']
  }
];

export const CabBookingView = ({ currency = 'INR' }) => {
  const [cabServiceType, setCabServiceType] = useState('airport'); // 'airport' | 'outstation' | 'rental'
  const [pickupLocation, setPickupLocation] = useState('Indira Gandhi Intl Airport (DEL) T3');
  const [dropLocation, setDropLocation] = useState('DLF Cyber City, Gurugram');
  const [pickupDate, setPickupDate] = useState('2026-09-15');
  const [pickupTime, setPickupTime] = useState('10:30 AM');

  // Booking Modal State
  const [bookingModal, setBookingModal] = useState({ open: false, cab: null });
  const [passengerName, setPassengerName] = useState('Aarav Sharma');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [flightNo, setFlightNo] = useState('EK-512');
  const [confirmedVoucher, setConfirmedVoucher] = useState(null);

  const currSym = CURRENCIES[currency]?.symbol || '₹';
  const currRate = CURRENCIES[currency]?.rate || 1;
  const formatPrice = (inr) => `${currSym}${Math.round(inr * currRate).toLocaleString()}`;

  const handleOpenBooking = (cab) => {
    setBookingModal({ open: true, cab });
    setConfirmedVoucher(null);
  };

  const handleConfirmCabBooking = (e) => {
    e.preventDefault();
    const bookingId = `CAB-${Math.floor(100000 + Math.random() * 900000)}`;
    const driverName = 'Rajesh Kumar (★ 4.95)';
    const vehiclePlate = `DL-01-AB-${Math.floor(1000 + Math.random() * 9000)}`;

    setConfirmedVoucher({
      bookingId,
      cabName: bookingModal.cab.name,
      category: bookingModal.cab.category,
      pickupLocation,
      dropLocation,
      pickupDate,
      pickupTime,
      fare: bookingModal.cab.basePrice,
      passengerName,
      phone,
      flightNo,
      driverName,
      vehiclePlate
    });
  };

  return (
    <div className="traveler-homepage-container" style={{ padding: '2rem 1.5rem', minHeight: 'calc(100vh - 120px)' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        {/* Header Hero Banner */}
        <div className="traveler-hero-banner" style={{ padding: '2.5rem 2.25rem', marginBottom: '2rem' }}>
          <div className="hero-glow-ambient" />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Car size={14} /> Doorstep Airport Transfers & Outstation Cabs
              </span>
              <span className="badge badge-warning" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <ShieldCheck size={14} /> Zero Flight Delay Cancellation Penalty
              </span>
            </div>

            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0' }}>
              Chauffeur Cabs & Airport Taxi Rides 🚖
            </h1>
            <p className="handwritten-tag" style={{ margin: '0.2rem 0 0.75rem 0', fontSize: '1.6rem' }}>
              “On-time pickup, sanitized cars, and experienced drivers at your service.”
            </p>
          </div>
        </div>

        {/* Cab Service Type Switcher & Search Panel */}
        <div className="glass-panel" style={{
          padding: '1.75rem',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-strong)',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '2.5rem'
        }}>
          
          {/* Service Tabs */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { id: 'airport', label: '✈️ Airport Transfers' },
              { id: 'outstation', label: '🚗 Outstation One-Way & Round-Trip' },
              { id: 'rental', label: '⏱️ Hourly Local Rentals' }
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setCabServiceType(st.id)}
                className={`btn ${cabServiceType === st.id ? 'btn-primary' : 'btn-outline'}`}
                style={{ borderRadius: '999px', padding: '0.5rem 1.25rem' }}
              >
                {st.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 160px 140px auto', gap: '1rem', alignItems: 'center' }}>
            {/* Pickup Location */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pickup Location</label>
              <input
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="form-input no-icon"
                style={{ fontWeight: 600, fontSize: '0.9rem' }}
                placeholder="Airport, Hotel, or Station Name..."
              />
            </div>

            {/* Drop Location */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Drop Destination</label>
              <input
                type="text"
                value={dropLocation}
                onChange={(e) => setDropLocation(e.target.value)}
                className="form-input no-icon"
                style={{ fontWeight: 600, fontSize: '0.9rem' }}
                placeholder="Hotel, City, or Residence..."
              />
            </div>

            {/* Pickup Date */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="form-input no-icon"
                style={{ fontWeight: 600, fontSize: '0.85rem' }}
              />
            </div>

            {/* Pickup Time */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Time</label>
              <input
                type="text"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="form-input no-icon"
                style={{ fontWeight: 600, fontSize: '0.85rem' }}
              />
            </div>

            {/* Search Cabs Button */}
            <div style={{ marginTop: '1.25rem' }}>
              <button
                type="button"
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', height: '42px', padding: '0 1.25rem' }}
              >
                <Search size={18} />
                <span>Search Cabs</span>
              </button>
            </div>
          </div>
        </div>

        {/* Cab Fleet Options Grid */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Available Vehicle Fleet ({CAB_TYPES.length})
            </h3>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Service: <strong>{cabServiceType.toUpperCase()}</strong> • Taxes & Tolls Included
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
            {CAB_TYPES.map((cab) => (
              <div
                key={cab.id}
                className="glass-panel"
                style={{
                  padding: '1.75rem',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-strong)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <img
                    src={cab.image}
                    alt={cab.name}
                    style={{ width: '100%', height: '160px', borderRadius: 'var(--radius-lg)', objectFit: 'cover', marginBottom: '1rem' }}
                  />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span className="badge badge-accent" style={{ fontSize: '0.7rem' }}>
                      {cab.category}
                    </span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#D97706' }}>
                      ★ {cab.rating} (Verified Driver)
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    {cab.name}
                  </h4>

                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    <span>👥 {cab.seats} Seats</span>
                    <span>🧳 {cab.bags}</span>
                  </div>

                  {/* Features */}
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                    {cab.features.map((f, fIdx) => (
                      <span
                        key={fIdx}
                        style={{
                          fontSize: '0.7rem',
                          backgroundColor: 'var(--bg-page)',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '4px',
                          border: '1px solid var(--border)',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Flat Estimate</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--color-primary)' }}>
                      {formatPrice(cab.basePrice)}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenBooking(cab)}
                    className="btn btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', boxShadow: 'var(--shadow-glow)' }}
                  >
                    <span>Confirm Ride</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Cab Booking & QR Voucher Modal */}
      {bookingModal.open && (
        <div className="modal-overlay" onClick={() => setBookingModal({ open: false, cab: null })} style={{ zIndex: 1200 }}>
          <div
            className="modal-content animate-fade-in"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '600px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Confirm Cab Booking
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Doorstep Pick-Up & Flight Delay Guarantee
                </div>
              </div>
              <button
                type="button"
                onClick={() => setBookingModal({ open: false, cab: null })}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {confirmedVoucher ? (
              /* Confirmed Cab Voucher with QR Code */
              <div style={{ textAlign: 'center' }}>
                <div className="badge badge-accent" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle size={16} /> Cab Confirmed • Driver Assigned
                </div>

                <div style={{
                  backgroundColor: '#FFFFFF',
                  color: '#1C1917',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  border: '2px solid #C1440E',
                  boxShadow: 'var(--shadow-lg)',
                  textAlign: 'left',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E7E1DB', paddingBottom: '0.85rem', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#C1440E' }}>{confirmedVoucher.cabName}</div>
                      <div style={{ fontSize: '0.8rem', color: '#78716C' }}>{confirmedVoucher.category}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem', color: '#78716C' }}>CONFIRMATION ID</div>
                      <div style={{ fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 900, color: '#1C1917' }}>
                        {confirmedVoucher.bookingId}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#78716C', textTransform: 'uppercase' }}>Passenger Name</div>
                      <div style={{ fontWeight: 800 }}>{confirmedVoucher.passengerName} ({confirmedVoucher.phone})</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#78716C', textTransform: 'uppercase' }}>Driver & Vehicle</div>
                      <div style={{ fontWeight: 800, color: '#C1440E' }}>{confirmedVoucher.driverName} • {confirmedVoucher.vehiclePlate}</div>
                    </div>
                  </div>

                  {/* Pick-Up Pass QR Code */}
                  <div style={{ backgroundColor: '#FBF8F4', padding: '1rem', borderRadius: '10px', textAlign: 'center', border: '1px solid #E7E1DB', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.7rem', color: '#78716C', marginBottom: '0.35rem', fontWeight: 700 }}>
                      SHOW QR TO CHAUFFEUR ON PICKUP
                    </div>
                    <HotelCheckinQRCode qrText={confirmedVoucher.bookingId} hotelName="GlobeTrotter Chauffeur" />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="btn btn-outline"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <Printer size={16} /> Print Cab Pass
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingModal({ open: false, cab: null })}
                    className="btn btn-primary"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Passenger Booking Form */
              <form onSubmit={handleConfirmCabBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ backgroundColor: 'var(--bg-page)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>
                    {bookingModal.cab?.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    Fare: <strong style={{ color: 'var(--color-primary)' }}>{formatPrice(bookingModal.cab?.basePrice)}</strong> (All Tolls & Driver Included)
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Passenger Name *</label>
                    <input
                      type="text"
                      required
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      className="form-input no-icon"
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-input no-icon"
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Flight Number for Delay Tracking (Optional)</label>
                  <input
                    type="text"
                    value={flightNo}
                    onChange={(e) => setFlightNo(e.target.value.toUpperCase())}
                    className="form-input no-icon"
                    placeholder="e.g. EK-512 or AI-101"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: 'var(--shadow-glow)' }}
                >
                  <Car size={18} />
                  <span>Pay {formatPrice(bookingModal.cab?.basePrice)} & Dispatch Chauffeur</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default CabBookingView;
