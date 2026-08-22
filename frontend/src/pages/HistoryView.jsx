import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  History, Calendar, Plane, Hotel, QrCode, Barcode,
  CheckCircle, ArrowRight, Clock, PlusCircle, Compass,
  MapPin, Tag, Download, Printer, ShieldCheck, Sparkles, Filter
} from 'lucide-react';
import { BookingVoucherModal } from '../components/BookingVoucherModal';
import { CURRENCIES, POPULAR_CITIES } from '../data/multiStopData';

const INITIAL_TRIP_HISTORY = [
  {
    id: 'hist-1',
    pnr: 'MMT-GT-94821',
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
      { id: 'dxb-1', title: 'Burj Khalifa 124th + 125th Floor & Dubai Aquarium', duration: '3 Hours', price: 3800 },
      { id: 'par-1', title: 'Louvre Museum Priority Access & Mona Lisa Guided Tour', duration: '3 Hours', price: 4200 },
      { id: 'fco-1', title: 'Colosseum, Roman Forum & Palatine Hill Priority VIP Tour', duration: '3.5 Hours', price: 3900 }
    ],
    insuranceIncluded: true
  },
  {
    id: 'hist-2',
    pnr: 'MMT-GT-71044',
    title: 'Bengaluru ➔ Singapore ➔ Kuala Lumpur Multi-Stop',
    status: 'Confirmed E-Ticket',
    createdAt: 'Aug 14, 2026',
    departureDate: 'Oct 05, 2026',
    travelers: { adults: 2, children: 1, infants: 0, cabinClass: 'Economy' },
    primaryPassenger: 'Aarav Sharma',
    totalPrice: 112000,
    currency: 'INR',
    stops: [
      {
        fromCity: { code: 'BLR', name: 'Bengaluru', airport: 'Kempegowda Intl', country: 'India' },
        toCity: { code: 'SIN', name: 'Singapore', airport: 'Changi Airport', country: 'Singapore' },
        departureDate: '2026-10-05',
        stayNights: 3,
        flight: { airline: 'Singapore Airlines', flightNumber: 'SQ-501', depTime: '11:00 PM', arrTime: '06:10 AM', duration: '4h 40m' }
      },
      {
        fromCity: { code: 'SIN', name: 'Singapore', airport: 'Changi Airport', country: 'Singapore' },
        toCity: { code: 'KUL', name: 'Kuala Lumpur', airport: 'Kuala Lumpur Intl', country: 'Malaysia' },
        departureDate: '2026-10-08',
        stayNights: 2,
        flight: { airline: 'Malaysia Airlines', flightNumber: 'MH-608', depTime: '02:15 PM', arrTime: '03:20 PM', duration: '1h 05m' }
      }
    ],
    selectedHotels: {
      SIN: {
        name: 'Marina Bay Sands Singapore',
        stars: 5,
        rating: 4.95,
        reviews: 2100,
        pricePerNight: 28000,
        nights: 3,
        roomType: 'Sands Premier Room',
        image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80',
        amenities: ['SkyPark Infinity Pool', 'Breakfast at Spago', 'Gardens by the Bay Pass']
      },
      KUL: {
        name: 'Mandarin Oriental Kuala Lumpur',
        stars: 5,
        rating: 4.88,
        reviews: 840,
        pricePerNight: 12500,
        nights: 2,
        roomType: 'Twin Towers View Room',
        image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&q=80',
        amenities: ['Petronas Tower View', 'Infinity Pool', 'Free WiFi']
      }
    },
    selectedActivities: [
      { id: 'sin-1', title: 'Universal Studios Singapore VIP Express Pass', duration: 'Full Day', price: 6200 },
      { id: 'kul-1', title: 'Petronas Twin Towers Skybridge & Observation Deck', duration: '2 Hours', price: 2100 }
    ],
    insuranceIncluded: true
  },
  {
    id: 'hist-3',
    pnr: 'MMT-GT-38491',
    title: 'Delhi ➔ Jaipur ➔ Udaipur Royal Heritage Circuit',
    status: 'Completed',
    createdAt: 'Jul 10, 2026',
    departureDate: 'Jul 22, 2026',
    travelers: { adults: 2, children: 0, infants: 0, cabinClass: 'Economy' },
    primaryPassenger: 'Aarav Sharma',
    totalPrice: 46800,
    currency: 'INR',
    stops: [
      {
        fromCity: { code: 'DEL', name: 'New Delhi', airport: 'Indira Gandhi Intl', country: 'India' },
        toCity: { code: 'JAI', name: 'Jaipur', airport: 'Jaipur Intl', country: 'India' },
        departureDate: '2026-07-22',
        stayNights: 2,
        flight: { airline: 'IndiGo', flightNumber: '6E-412', depTime: '07:30 AM', arrTime: '08:35 AM', duration: '1h 05m' }
      },
      {
        fromCity: { code: 'JAI', name: 'Jaipur', airport: 'Jaipur Intl', country: 'India' },
        toCity: { code: 'UDR', name: 'Udaipur', airport: 'Maharana Pratap Airport', country: 'India' },
        departureDate: '2026-07-24',
        stayNights: 2,
        flight: { airline: 'IndiGo', flightNumber: '6E-809', depTime: '01:10 PM', arrTime: '02:05 PM', duration: '0h 55m' }
      }
    ],
    selectedHotels: {
      JAI: {
        name: 'Rambagh Palace Jaipur',
        stars: 5,
        rating: 4.96,
        reviews: 820,
        pricePerNight: 24000,
        nights: 2,
        roomType: 'Royal Suite',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80',
        amenities: ['Heritage Palace Tour', 'Royal Peacock Garden', 'Free Breakfast']
      },
      UDR: {
        name: 'Taj Lake Palace Udaipur',
        stars: 5,
        rating: 4.98,
        reviews: 950,
        pricePerNight: 26000,
        nights: 2,
        roomType: 'Lake Pichola Grand View',
        image: 'https://images.unsplash.com/photo-1585822765313-0bb6b7e6ee32?w=600&q=80',
        amenities: ['Private Boat Transfer', 'Jharokha Sunset Dining', 'Heritage Spa']
      }
    },
    selectedActivities: [
      { id: 'jai-1', title: 'Amer Fort Private Elephant Carriage & Light Show', duration: '3 Hours', price: 1800 },
      { id: 'udr-1', title: 'Sunset Private Boat Cruise on Lake Pichola', duration: '2 Hours', price: 2400 }
    ],
    insuranceIncluded: true
  }
];

export const HistoryView = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [filterTab, setFilterTab] = useState('all'); // 'all' | 'active' | 'completed'
  const [selectedBookingForModal, setSelectedBookingForModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredHistory = INITIAL_TRIP_HISTORY.filter(item => {
    if (filterTab === 'active') return item.status === 'Confirmed E-Ticket';
    if (filterTab === 'completed') return item.status === 'Completed';
    return true;
  });

  const handleOpenVoucher = (booking) => {
    setSelectedBookingForModal(booking);
    setIsModalOpen(true);
  };

  return (
    <div className="traveler-homepage-container" style={{ padding: '2rem 1.5rem', minHeight: 'calc(100vh - 120px)' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        {/* Header Glass Banner */}
        <div className="traveler-hero-banner" style={{ padding: '2rem 2.25rem', marginBottom: '2rem' }}>
          <div className="hero-glow-ambient" />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem' }}>
                <span className="badge badge-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <History size={13} /> Verified Travel Vault
                </span>
                <span className="badge badge-warning" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <QrCode size={13} /> Hotel QR & Flight Barcodes Ready
                </span>
              </div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0' }}>
                Booking & Itinerary History
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', margin: 0 }}>
                View all your past and upcoming multi-city reservations, download confirmed e-tickets, and scan hotel check-in QR passes.
              </p>
            </div>

            <button
              onClick={() => navigate('/dashboard')}
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <PlusCircle size={18} />
              <span>Plan New Multi-Stop Route</span>
            </button>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.75rem'
        }}>
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
            {[
              { id: 'all', label: `All Journeys (${INITIAL_TRIP_HISTORY.length})` },
              { id: 'active', label: `Confirmed & Upcoming (${INITIAL_TRIP_HISTORY.filter(t => t.status === 'Confirmed E-Ticket').length})` },
              { id: 'completed', label: `Completed Stays (${INITIAL_TRIP_HISTORY.filter(t => t.status === 'Completed').length})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterTab(tab.id)}
                className={`btn btn-sm ${filterTab === tab.id ? 'btn-primary' : 'btn-outline'}`}
                style={{ borderRadius: '999px', padding: '0.45rem 1rem' }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Showing <strong>{filteredHistory.length}</strong> recorded booking(s)
          </div>
        </div>

        {/* Booking History Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '3.5rem' }}>
          {filteredHistory.map((trip) => {
            const isConfirmed = trip.status === 'Confirmed E-Ticket';

            return (
              <div
                key={trip.id}
                className="glass-panel"
                style={{
                  padding: '1.75rem',
                  borderRadius: 'var(--radius-xl)',
                  border: isConfirmed ? '1px solid var(--border-strong)' : '1px solid var(--border)',
                  boxShadow: 'var(--shadow-md)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease'
                }}
              >
                {/* Trip Card Top Header */}
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <span className={isConfirmed ? 'badge badge-accent' : 'badge badge-neutral'} style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}>
                      {isConfirmed ? <CheckCircle size={13} style={{ marginRight: '3px' }} /> : <Clock size={13} style={{ marginRight: '3px' }} />}
                      {trip.status}
                    </span>

                    <div style={{
                      backgroundColor: 'var(--bg-page)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border)',
                      fontFamily: 'monospace',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      color: 'var(--text-primary)'
                    }}>
                      PNR: {trip.pnr}
                    </div>

                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      Booked on {trip.createdAt}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Total Paid</div>
                      <div style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--color-primary)', lineHeight: 1 }}>
                        ₹{trip.totalPrice.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Trip Title & Route Nodes */}
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                  {trip.title}
                </h3>

                {/* Connecting Stepper Flow */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  overflowX: 'auto',
                  padding: '0.5rem 0',
                  gap: '0.5rem',
                  marginBottom: '1.5rem'
                }}>
                  {trip.stops.map((stop, idx) => (
                    <React.Fragment key={idx}>
                      <div style={{
                        backgroundColor: 'var(--bg-page)',
                        padding: '0.65rem 0.95rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.65rem',
                        flexShrink: 0
                      }}>
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--color-primary)',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '0.75rem'
                        }}>
                          {idx + 1}
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                            {stop.fromCity.code} → {stop.toCity.code}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                            {stop.flight?.airline} • {stop.stayNights}N Hotel Stay
                          </div>
                        </div>
                      </div>

                      {idx < trip.stops.length - 1 && (
                        <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-primary)', padding: '0 0.25rem', flexShrink: 0 }}>
                          <div style={{ width: '16px', height: '2px', backgroundColor: 'var(--border-strong)' }} />
                          <Plane size={14} style={{ margin: '0 2px' }} />
                          <div style={{ width: '16px', height: '2px', backgroundColor: 'var(--border-strong)' }} />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Inclusions Summary (Flights, Hotels, Passes) */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1rem',
                  backgroundColor: 'var(--bg-page)',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border)',
                  marginBottom: '1.5rem',
                  fontSize: '0.85rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <Plane size={18} style={{ color: 'var(--color-primary)' }} />
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{trip.stops.length} Flight Segments</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Barcodes & Kiosk E-Tickets Generated</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <Hotel size={18} style={{ color: 'var(--color-primary)' }} />
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{Object.keys(trip.selectedHotels).length} Hotel Stays</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Front-Desk QR Passes Ready</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <Sparkles size={18} style={{ color: 'var(--color-primary)' }} />
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{trip.selectedActivities?.length || 0} Sightseeing Passes</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Priority VIP Entry Included</div>
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  paddingTop: '0.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <ShieldCheck size={16} style={{ color: '#166534' }} />
                    <span>Travel Insurance & 24/7 Concierge Protection Active</span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => handleOpenVoucher(trip)}
                      className="btn btn-outline"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                      <QrCode size={16} />
                      <span>Show Hotel QR Check-Ins</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenVoucher(trip)}
                      className="btn btn-primary"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', boxShadow: 'var(--shadow-glow)' }}
                    >
                      <Barcode size={16} />
                      <span>View Full E-Ticket & Barcodes</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Confirmed Booking E-Ticket Voucher Modal */}
      {isModalOpen && selectedBookingForModal && (
        <BookingVoucherModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          bookingDetails={selectedBookingForModal}
          currency={CURRENCIES[selectedBookingForModal.currency || 'INR']}
          travelers={selectedBookingForModal.travelers}
        />
      )}
    </div>
  );
};

export default HistoryView;
