import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  MapPin, PlusCircle, Calendar, DollarSign, Share2, Compass,
  Sparkles, Luggage, Navigation, ArrowRight, Heart, Star,
  Clock, CheckCircle, Search, Shield, Plus, X,
  Bookmark, Check, Sun, Moon, Plane, Tag
} from 'lucide-react';
import { MultiStopSearchWidget } from '../components/MultiStopSearchWidget';
import { MultiStopResultsView } from '../components/MultiStopResultsView';
import { MultiStopPackages } from '../components/MultiStopPackages';
import { BookingVoucherModal } from '../components/BookingVoucherModal';
import { TrainBookingView } from '../components/TrainBookingView';
import { CabBookingView } from '../components/CabBookingView';
import { SupportChatWidget } from '../components/SupportChatWidget';
import { POPULAR_CITIES, CURRENCIES } from '../data/multiStopData';

const FEATURED_ROUTES = [
  {
    id: 'route-1',
    title: 'Amalfi Coast & Capri Scenic Drive',
    subtitle: 'Sorrento • Positano • Capri • Ravello',
    imageLight: '/traveler-bg-light.png',
    imageDark: '/traveler-bg-dark.png',
    duration: '6 Days • 4 Destinations',
    budget: '$1,850 est.',
    tag: 'Scenic Coastal',
    rating: '4.96 (184 reviews)',
    highlights: ['Cliffside coastal drives', 'Capri boat grottos', 'Limoncello & authentic dining']
  },
  {
    id: 'route-2',
    title: 'Kyoto to Tokyo Imperial Trail',
    subtitle: 'Tokyo • Hakone (Mt. Fuji) • Kyoto • Osaka',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
    duration: '9 Days • 4 Cities',
    budget: '$2,400 est.',
    tag: 'Culture & Shinkansen',
    rating: '4.98 (312 reviews)',
    highlights: ['Shinkansen Bullet Train', 'Fushimi Inari shrines', 'Gion traditional cuisine']
  },
  {
    id: 'route-3',
    title: 'Swiss Alps & Glacier Explorer',
    subtitle: 'Zurich • Lucerne • Interlaken • Zermatt',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&q=80',
    duration: '7 Days • 4 Regions',
    budget: '$2,150 est.',
    tag: 'Alpine Adventure',
    rating: '4.92 (96 reviews)',
    highlights: ['Matterhorn panoramas', 'Glacier Express train', 'Lake Lucerne boat ride']
  }
];

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const { isDark } = useTheme();

  // Multi-Stop GlobeTrotter Search & Itinerary Engine State
  const [currency, setCurrency] = useState('INR');
  const [activeTab, setActiveTab] = useState('flights'); // 'flights' | 'packages' | 'custom'
  const [activeSearch, setActiveSearch] = useState(null); // When set, displays MultiStopResultsView
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [currentBookingDetails, setCurrentBookingDetails] = useState(null);

  // Trips & Favorites state
  const [trips, setTrips] = useState([
    {
      id: 'trip-initial-1',
      title: 'Delhi to Paris Multi-City Grand Tour',
      destination: 'New Delhi → Dubai → Paris → Rome',
      duration: '8 Days',
      budget: '₹145,200',
      createdAt: 'Aug 20, 2026',
      status: 'Confirmed Multi-Stop'
    }
  ]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [savedFavorites, setSavedFavorites] = useState(['pkg-europe-grandeur', 'route-1']);
  const [copiedId, setCopiedId] = useState(null);

  // Manual Trip creation form state
  const [newTripName, setNewTripName] = useState('');
  const [newTripDestination, setNewTripDestination] = useState('');
  const [newTripDuration, setNewTripDuration] = useState('5');
  const [newTripBudget, setNewTripBudget] = useState('1500');

  // Handle Multi-Stop Search from widget
  const handleSearchMultiStop = (params) => {
    setActiveSearch(params);
    // Smooth scroll to results
    setTimeout(() => {
      window.scrollTo({ top: 460, behavior: 'smooth' });
    }, 100);
  };

  // Handle Package Selection (1-click loading into multi-stop engine)
  const handleSelectPackage = (pkg) => {
    const loadedStops = pkg.stops.map(s => ({
      from: s.from,
      to: s.to,
      fromCity: POPULAR_CITIES.find(c => c.code === s.from) || { code: s.from, name: s.from, airport: 'Airport', flag: '🌐' },
      toCity: POPULAR_CITIES.find(c => c.code === s.to) || { code: s.to, name: s.to, airport: 'Airport', flag: '🌐' },
      departureDate: s.departureDate || '2026-09-15',
      stayNights: s.stayNights,
      transportMode: 'flight'
    }));

    const searchParams = {
      tripType: 'multi-city',
      stops: loadedStops,
      travelers: { adults: 2, children: 0, infants: 0, cabinClass: 'Economy' },
      specialFare: 'regular',
      currency
    };

    setActiveSearch(searchParams);
    setActiveTab('flights');
    setTimeout(() => {
      window.scrollTo({ top: 460, behavior: 'smooth' });
    }, 100);
  };

  // Handle Booking flow
  const handleBookTrip = (bookingData) => {
    setCurrentBookingDetails(bookingData);
    setIsBookingModalOpen(true);

    // Also automatically add to planned trips
    const tripTitle = `${bookingData.stops[0]?.fromCity?.name} to ${bookingData.stops[bookingData.stops.length - 1]?.toCity?.name} Multi-City Tour`;
    const newTrip = {
      id: `trip-${Date.now()}`,
      title: tripTitle,
      destination: bookingData.stops.map(s => s.toCity?.name).join(' → '),
      duration: `${bookingData.stops.reduce((acc, s) => acc + (s.stayNights || 1), 0)} Days`,
      budget: `${CURRENCIES[currency]?.symbol}${Math.round(bookingData.totalPrice * (CURRENCIES[currency]?.rate || 1)).toLocaleString()}`,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Confirmed E-Ticket'
    };

    setTrips(prev => [newTrip, ...prev]);
  };

  const handleSaveToMyTrips = (tripObj) => {
    setTrips(prev => [tripObj, ...prev]);
  };

  const handleCreateTrip = (e) => {
    e.preventDefault();
    if (!newTripName.trim()) return;

    const newTrip = {
      id: `trip-${Date.now()}`,
      title: newTripName,
      destination: newTripDestination || 'Multi-City Route',
      duration: `${newTripDuration} Days`,
      budget: `$${Number(newTripBudget || 0).toLocaleString()}`,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Planning'
    };

    setTrips(prev => [newTrip, ...prev]);
    setNewTripName('');
    setNewTripDestination('');
    setIsCreateModalOpen(false);
  };

  const toggleFavorite = (id) => {
    setSavedFavorites(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleQuickAddRoute = (route) => {
    const newTrip = {
      id: `trip-${Date.now()}`,
      title: route.title,
      destination: route.subtitle,
      duration: route.duration.split('•')[0].trim(),
      budget: route.budget.replace(' est.', ''),
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Planning'
    };
    setTrips(prev => [newTrip, ...prev]);
    setCopiedId(route.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredRoutes = FEATURED_ROUTES.filter(r =>
    r.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    r.subtitle.toLowerCase().includes(searchFilter.toLowerCase()) ||
    r.tag.toLowerCase().includes(searchFilter.toLowerCase())
  );


  // Traveler Homepage View (GlobeTrotter Multi-Stop Experience with Theme Harmony)
  return (
    <div className="traveler-homepage-container">
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0.75rem 1.5rem 2.5rem 1.5rem' }}>
        
        {/* Theme-Compliant Traveler Hero Header */}
        <div className="traveler-hero-banner">
          <div className="hero-glow-ambient" />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem', position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: '760px' }}>
              {/* Dynamic Theme Mode Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
                <span className="badge badge-accent" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.35rem 0.85rem',
                  fontSize: '0.8rem',
                  backdropFilter: 'blur(8px)'
                }}>
                  {isDark ? (
                    <>
                      <Moon size={14} style={{ color: '#4ADE80' }} />
                      <span>Moonlit Night Engine • GlobeTrotter Multi-Stop Active</span>
                    </>
                  ) : (
                    <>
                      <Sun size={14} style={{ color: '#166534' }} />
                      <span>Golden Hour Sunset • GlobeTrotter Multi-Stop Active</span>
                    </>
                  )}
                </span>

                <span className="hero-pill">
                  <Plane size={13} style={{ color: 'var(--color-primary)' }} />
                  <span>Connecting 19+ Global City Hubs</span>
                </span>
              </div>

              {/* Dynamic Heading */}
              <h1 style={{
                fontSize: '2.4rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: '0.35rem'
              }}>
                {isDark ? (
                  <>Under the Starlit Skies, {currentUser?.name?.split(' ')[0] || 'Traveler'} ✨</>
                ) : (
                  <>Plan Your Multi-City Adventure, {currentUser?.name?.split(' ')[0] || 'Traveler'} 🌅</>
                )}
              </h1>

              {/* Editorial Caveat Quote */}
              <p className="handwritten-tag" style={{ margin: '0.2rem 0 0.85rem 0' }}>
                {isDark
                  ? '“From the canals of Venice to the neon lights of Tokyo, connect your dream stops in one seamless booking.”'
                  : '“Hop across continents, add layovers, and bundle flights, stays & sightseeing with GlobeTrotter multi-stop ease.”'
                }
              </p>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.975rem', lineHeight: 1.6, maxWidth: '640px' }}>
                Design multi-city itineraries, select flights with stopover hotel stays, add sightseeing passes, and download confirmed barcode e-tickets.
              </p>
            </div>

            {/* Quick Stats & Call to Action */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-end' }}>
              <button
                id="plan-new-trip-btn"
                onClick={() => {
                  setActiveSearch(null);
                  window.scrollTo({ top: 380, behavior: 'smooth' });
                }}
                className="btn btn-primary btn-lg"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  boxShadow: isDark ? '0 0 25px rgba(209, 130, 78, 0.35)' : 'var(--shadow-md)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <PlusCircle size={20} />
                Multi-City Search
              </button>

              {/* Floating Metric Badges */}
              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                <div className="hero-pill">
                  <Luggage size={15} style={{ color: 'var(--color-primary)' }} />
                  <span><strong>{trips.length}</strong> Saved Itineraries</span>
                </div>
                <div className="hero-pill">
                  <Bookmark size={15} style={{ color: 'var(--accent-text)' }} />
                  <span><strong>{savedFavorites.length}</strong> Saved Packages</span>
                </div>
                <div className="hero-pill">
                  <Tag size={15} style={{ color: isDark ? '#FBBF24' : '#D97706' }} />
                  <span>Up to 25% Multi-Stop Discount</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 1. GlobeTrotter Service Switcher Header */}
        <MultiStopSearchWidget
          onSearch={handleSearchMultiStop}
          currency={currency}
          setCurrency={setCurrency}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* 2. Standalone Train Booking View */}
        {activeTab === 'trains' && (
          <TrainBookingView currency={currency} />
        )}

        {/* 3. Standalone Cab & Taxi Booking View */}
        {activeTab === 'cabs' && (
          <CabBookingView currency={currency} />
        )}

        {/* 4. Interactive Multi-Stop Results View (When search is active and on flights tab) */}
        {activeTab !== 'trains' && activeTab !== 'cabs' && activeSearch && (
          <MultiStopResultsView
            searchParams={activeSearch}
            currency={currency}
            onModifySearch={() => setActiveSearch(null)}
            onBookTrip={handleBookTrip}
            onSaveToMyTrips={handleSaveToMyTrips}
          />
        )}

        {/* 5. Curated GlobeTrotter Multi-Stop Packages */}
        {activeTab !== 'trains' && activeTab !== 'cabs' && (
          <MultiStopPackages
            currency={currency}
            onSelectPackage={handleSelectPackage}
            savedFavorites={savedFavorites}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {/* 4. Quick Action Navigation Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {[
            {
              icon: <MapPin size={24} />,
              label: 'Multi-City Itinerary',
              desc: 'Add stops, travel dates & activities',
              color: 'var(--color-primary)',
              action: () => window.scrollTo({ top: 380, behavior: 'smooth' })
            },
            {
              icon: <DollarSign size={24} />,
              label: 'Fare & Cost Estimator',
              desc: 'Track transport, hotels & food in real time',
              color: 'var(--warning-text)',
              action: () => window.scrollTo({ top: 380, behavior: 'smooth' })
            },
            {
              icon: <Calendar size={24} />,
              label: 'Timeline & Layover Schedule',
              desc: 'Day-by-day interactive itinerary overview',
              color: 'var(--accent-text)',
              action: () => {}
            },
            {
              icon: <Share2 size={24} />,
              label: 'Share with Friends',
              desc: 'Collaborate & share trip links',
              color: 'var(--color-primary-hover)',
              action: () => {}
            },
          ].map((item) => (
            <div
              key={item.label}
              onClick={item.action}
              className="glass-panel"
              style={{
                padding: '1.5rem',
                cursor: 'pointer',
              }}
            >
              <div style={{
                color: item.color,
                backgroundColor: 'var(--bg-page)',
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                border: '1px solid var(--border)'
              }}>
                {item.icon}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                {item.label}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 5. User's Active / Planned Multi-Stop Trips Section */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Compass size={22} style={{ color: 'var(--color-primary)' }} />
                Your Multi-Stop Itineraries & Bookings
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {trips.length > 0 ? `You have ${trips.length} active journey(s)` : 'No active trips yet — create one or pick a featured road trip below!'}
              </p>
            </div>
            {trips.length > 0 && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="btn btn-sm btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <Plus size={16} /> Add Custom Plan
              </button>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {trips.map((trip) => (
              <div key={trip.id} className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <span className="badge badge-accent" style={{ fontSize: '0.75rem' }}>{trip.status}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Added {trip.createdAt}</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                  {trip.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  <MapPin size={15} style={{ color: 'var(--color-primary)' }} />
                  <span>{trip.destination}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid var(--border)',
                  fontSize: '0.85rem'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)' }}>
                    <Clock size={14} /> {trip.duration}
                  </span>
                  <span style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: '1.05rem' }}>
                    {trip.budget}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Featured Inspiration Routes & Roadtrips */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={22} style={{ color: 'var(--color-primary)' }} />
                Curated Multi-City Roadtrips & Scenic Drives
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Handpicked scenic itineraries complete with stops, activities, and budget estimates.
              </p>
            </div>

            {/* Quick Search */}
            <div style={{ position: 'relative', width: '280px' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input
                type="text"
                placeholder="Filter destinations..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.5rem', fontSize: '0.875rem', height: '40px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.75rem' }}>
            {filteredRoutes.map((route) => {
              const isFav = savedFavorites.includes(route.id);
              const isJustAdded = copiedId === route.id;

              return (
                <div
                  key={route.id}
                  className="glass-panel"
                  style={{
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 0
                  }}
                >
                  {/* Card Image Banner */}
                  <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                    <img
                      src={isDark ? (route.imageDark || route.image) : (route.imageLight || route.image)}
                      alt={route.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '0.75rem',
                      left: '0.75rem',
                      display: 'flex',
                      gap: '0.5rem'
                    }}>
                      <span className="badge badge-accent" style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(220, 252, 231, 0.92)' }}>
                        {route.tag}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleFavorite(route.id)}
                      aria-label="Save to favorites"
                      style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: 'var(--shadow-sm)',
                        color: isFav ? '#EF4444' : '#78716C'
                      }}
                      title={isFav ? 'Remove from favorites' : 'Save route'}
                    >
                      <Heart size={18} fill={isFav ? '#EF4444' : 'none'} />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#D97706', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                      <Star size={14} fill="#D97706" />
                      <span>{route.rating}</span>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                      {route.title}
                    </h3>

                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Navigation size={14} style={{ color: 'var(--color-primary)' }} />
                      {route.subtitle}
                    </p>

                    {/* Highlights */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                      {route.highlights.map((h) => (
                        <span key={h} style={{
                          fontSize: '0.75rem',
                          backgroundColor: 'var(--bg-page)',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '6px',
                          border: '1px solid var(--border)',
                          color: 'var(--text-secondary)'
                        }}>
                          ✓ {h}
                        </span>
                      ))}
                    </div>

                    {/* Card Footer */}
                    <div style={{
                      marginTop: 'auto',
                      paddingTop: '1rem',
                      borderTop: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{route.duration}</div>
                        <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-primary)' }}>{route.budget}</div>
                      </div>

                      <button
                        onClick={() => handleQuickAddRoute(route)}
                        className={`btn btn-sm ${isJustAdded ? 'btn-secondary' : 'btn-primary'}`}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                      >
                        {isJustAdded ? (
                          <>
                            <Check size={15} style={{ color: '#166534' }} />
                            <span>Added to Trips!</span>
                          </>
                        ) : (
                          <>
                            <span>Add to Planner</span>
                            <ArrowRight size={14} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Confirmed Booking E-Ticket Voucher Modal */}
      {isBookingModalOpen && currentBookingDetails && (
        <BookingVoucherModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          bookingDetails={currentBookingDetails}
          currency={CURRENCIES[currency]}
          travelers={activeSearch?.travelers || { adults: 1, children: 0 }}
        />
      )}

      {/* Plan Custom Trip Modal */}
      {isCreateModalOpen && (
        <div className="modal-overlay" onClick={() => setIsCreateModalOpen(false)}>
          <div className="modal-content animate-fade-in" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Plan a Custom Route 🗺️
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Configure your travel route, stops, and estimated budget.
                </p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.25rem' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateTrip}>
              <div className="form-group">
                <label className="form-label">Trip Name / Title *</label>
                <div className="form-input-wrapper">
                  <MapPin size={18} className="form-input-icon" />
                  <input
                    type="text"
                    required
                    placeholder="e.g., European Summer Multi-City 2026"
                    value={newTripName}
                    onChange={(e) => setNewTripName(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Destinations / Multi-City Stops</label>
                <div className="form-input-wrapper">
                  <Navigation size={18} className="form-input-icon" />
                  <input
                    type="text"
                    placeholder="e.g., Rome → Florence → Venice → Paris"
                    value={newTripDestination}
                    onChange={(e) => setNewTripDestination(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Duration (Days)</label>
                  <div className="form-input-wrapper">
                    <Calendar size={18} className="form-input-icon" />
                    <input
                      type="number"
                      min="1"
                      max="90"
                      value={newTripDuration}
                      onChange={(e) => setNewTripDuration(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Target Budget ($ USD)</label>
                  <div className="form-input-wrapper">
                    <DollarSign size={18} className="form-input-icon" />
                    <input
                      type="number"
                      min="100"
                      step="50"
                      value={newTripBudget}
                      onChange={(e) => setNewTripBudget(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <CheckCircle size={18} />
                  Save & Add to Trips
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 24/7 Live Support Concierge Floating Widget */}
      <SupportChatWidget />
    </div>
  );
};

export default UserDashboard;
