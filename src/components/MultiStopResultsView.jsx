import React, { useState } from 'react';
import {
  Plane, Hotel, Sparkles, MapPin, Calendar, CheckCircle,
  ShieldCheck, Plus, Check, ArrowLeft,
  ChevronDown, ChevronUp, Star, Award, Heart
} from 'lucide-react';
import {
  HOTELS_BY_CITY,
  ACTIVITIES_BY_CITY,
  PROMO_COUPONS,
  CURRENCIES
} from '../data/multiStopData';

export const MultiStopResultsView = ({
  searchParams,
  onModifySearch,
  onBookTrip,
  currency,
  onSaveToMyTrips
}) => {
  const { stops = [], travelers = { adults: 1, children: 0, infants: 0, cabinClass: 'Economy' }, specialFare = 'regular' } = searchParams;
  const totalTravelers = travelers.adults + travelers.children;
  const currSym = CURRENCIES[currency]?.symbol || '₹';
  const currRate = CURRENCIES[currency]?.rate || 1;

  const formatPrice = (inr) => `${currSym}${Math.round(inr * currRate).toLocaleString()}`;

  // Default base flight pricing per leg generator
  const getInitialFlights = () => {
    const flightMap = {};
    stops.forEach((stop, idx) => {
      const isDomestic = (stop.fromCity?.country === 'India' && stop.toCity?.country === 'India');
      const baseFare = isDomestic ? 4800 : (idx === 0 ? 16500 : 12200);
      flightMap[idx] = {
        airline: idx % 2 === 0 ? 'Emirates' : (isDomestic ? 'IndiGo' : 'Air France'),
        flightNumber: `${idx % 2 === 0 ? 'EK' : (isDomestic ? '6E' : 'AF')}-${410 + idx * 28}`,
        depTime: '08:45 AM',
        arrTime: '01:15 PM',
        duration: isDomestic ? '2h 30m' : '5h 45m',
        baseFare: baseFare * totalTravelers,
        refundable: true,
        mealsIncluded: true,
        baggage: '25kg Check-in + 7kg Cabin'
      };
    });
    return flightMap;
  };

  const [selectedFlights, setSelectedFlights] = useState(getInitialFlights());
  const [expandedFlightOptions, setExpandedFlightOptions] = useState({});

  // Hotel selections per stop
  const getInitialHotels = () => {
    const hotels = {};
    stops.forEach((stop) => {
      if (stop.stayNights > 0 && stop.toCity?.code) {
        const cityHotels = HOTELS_BY_CITY[stop.toCity.code] || [
          {
            name: `Grand Palace Hotel ${stop.toCity.name}`,
            stars: 5,
            rating: 4.85,
            reviews: 950,
            pricePerNight: 11500,
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
            area: `${stop.toCity.name} Central Boulevard`,
            amenities: ['Breakfast Included', 'Pool & Spa', 'Free High-Speed WiFi']
          }
        ];
        hotels[stop.toCity.code] = {
          ...cityHotels[0],
          roomType: 'Deluxe King Room',
          nights: stop.stayNights
        };
      }
    });
    return hotels;
  };

  const [selectedHotels] = useState(getInitialHotels());

  // Selected sightseeing activities
  const [selectedActivities, setSelectedActivities] = useState([
    {
      id: 'dxb-1',
      title: 'Burj Khalifa 124th + 125th Floor & Dubai Aquarium',
      duration: '3 Hours',
      rating: 4.95,
      price: 3800,
      cityCode: 'DXB'
    }
  ]);

  // Insurance & Promo
  const [includeInsurance, setIncludeInsurance] = useState(true);
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(PROMO_COUPONS[0]); // default MMT discount active
  const [promoError, setPromoError] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Toggle activity
  const toggleActivity = (act, cityCode) => {
    setSelectedActivities(prev => {
      const exists = prev.some(a => a.id === act.id);
      if (exists) {
        return prev.filter(a => a.id !== act.id);
      } else {
        return [...prev, { ...act, cityCode }];
      }
    });
  };

  // Apply Coupon
  const handleApplyPromo = (code) => {
    const found = PROMO_COUPONS.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (found) {
      setAppliedPromo(found);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try MMTHACKATHON or GLOBETROTTER');
    }
  };

  // Cost Calculations
  const totalFlightCost = Object.values(selectedFlights).reduce((sum, f) => sum + (f.baseFare || 0), 0);
  
  const totalHotelCost = Object.entries(selectedHotels).reduce((sum, [_, h]) => {
    return sum + (h.pricePerNight * (h.nights || 1));
  }, 0);

  const totalActivitiesCost = selectedActivities.reduce((sum, a) => sum + (a.price * totalTravelers), 0);
  const insuranceCost = includeInsurance ? (999 * totalTravelers) : 0;
  const taxesCost = Math.round((totalFlightCost + totalHotelCost) * 0.12); // 12% GST/Taxes
  const multiCityBundleDiscount = Math.round((totalFlightCost + totalHotelCost) * 0.08); // 8% Multi-city bundle saving

  let couponDiscount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountPercent) {
      couponDiscount = Math.min(appliedPromo.maxDiscount, Math.round((totalFlightCost + totalHotelCost) * (appliedPromo.discountPercent / 100)));
    } else if (appliedPromo.discountFlat) {
      couponDiscount = appliedPromo.discountFlat;
    }
  }

  const grandTotal = Math.max(0, (totalFlightCost + totalHotelCost + totalActivitiesCost + insuranceCost + taxesCost) - multiCityBundleDiscount - couponDiscount);

  // Handle Book Action
  const handleProceedBooking = () => {
    const bookingPayload = {
      pnr: `MMT-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      stops,
      selectedFlights,
      selectedHotels,
      selectedActivities,
      totalPrice: grandTotal,
      couponApplied: appliedPromo?.code,
      insuranceIncluded: includeInsurance,
      cabinClass: travelers.cabinClass,
      primaryPassenger: 'Aarav Sharma',
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    onBookTrip(bookingPayload);
  };

  // Handle Save to My Trips
  const handleSave = () => {
    const tripTitle = `${stops[0]?.fromCity?.name} to ${stops[stops.length - 1]?.toCity?.name} Multi-City Tour`;
    const newTrip = {
      id: `trip-${Date.now()}`,
      title: tripTitle,
      destination: stops.map(s => s.toCity?.name).join(' → '),
      duration: `${stops.reduce((acc, s) => acc + (s.stayNights || 1), 0)} Days`,
      budget: formatPrice(grandTotal),
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Custom Multi-Stop Plan'
    };
    onSaveToMyTrips(newTrip);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="mmt-results-container animate-fade-in" style={{ marginBottom: '3.5rem' }}>
      
      {/* Route Journey Path Header Stepper */}
      <div className="glass-panel" style={{
        padding: '1.5rem 1.75rem',
        marginBottom: '2rem',
        border: '1px solid var(--border-strong)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <span className="badge badge-accent" style={{ marginBottom: '0.35rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <Award size={13} /> GlobeTrotter Multi-Stop Route Optimizer Active
            </span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              {stops[0]?.fromCity?.name} ➔ {stops.map(s => s.toCity?.name).join(' ➔ ')}
            </h2>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              {stops.length} Connecting Multi-City Legs • {totalTravelers} Traveler{totalTravelers > 1 ? 's' : ''} ({travelers.cabinClass}) • Special Fare: {specialFare.toUpperCase()}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={onModifySearch}
              className="btn btn-outline"
              style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem' }}
            >
              <ArrowLeft size={16} /> Modify Route & Dates
            </button>

            <button
              onClick={handleSave}
              className={`btn ${savedSuccess ? 'btn-secondary' : 'btn-outline'}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem' }}
            >
              {savedSuccess ? (
                <>
                  <Check size={16} style={{ color: '#166534' }} /> Saved to My Trips!
                </>
              ) : (
                <>
                  <Heart size={16} /> Save Itinerary
                </>
              )}
            </button>
          </div>
        </div>

        {/* Visual Connecting Stepper Flow */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          overflowX: 'auto',
          padding: '0.75rem 0',
          gap: '0.5rem'
        }}>
          {stops.map((stop, idx) => (
            <React.Fragment key={idx}>
              {/* City Node */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                backgroundColor: 'var(--bg-page)',
                padding: '0.5rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
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
                    {stop.fromCity?.code} → {stop.toCity?.code}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                    {stop.departureDate} {stop.stayNights > 0 ? `• ${stop.stayNights}N Stay` : ''}
                  </div>
                </div>
              </div>

              {/* Connecting Flight Indicator */}
              {idx < stops.length - 1 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  color: 'var(--color-primary)',
                  padding: '0 0.25rem',
                  flexShrink: 0
                }}>
                  <div style={{ width: '20px', height: '2px', backgroundColor: 'var(--border-strong)' }} />
                  <Plane size={14} />
                  <div style={{ width: '20px', height: '2px', backgroundColor: 'var(--border-strong)' }} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Two-Column Layout: Left (Stop Cards) & Right (Fare Breakdown Sticky Sidebar) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '2rem', alignItems: 'flex-start' }}>
        
        {/* Left Column: Stop-by-Stop Leg Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {stops.map((stop, idx) => {
            const flight = selectedFlights[idx] || {};
            const toCode = stop.toCity?.code;
            const hotel = selectedHotels[toCode];
            const cityActivities = ACTIVITIES_BY_CITY[toCode] || [];
            const isOptionsExpanded = expandedFlightOptions[idx];

            return (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '1.75rem',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-strong)'
                }}
              >
                {/* Leg Header Banner */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  paddingBottom: '1rem',
                  marginBottom: '1.25rem',
                  borderBottom: '1px solid var(--border)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{
                      backgroundColor: 'var(--color-primary)',
                      color: '#FFFFFF',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '6px',
                      fontWeight: 800,
                      fontSize: '0.8rem'
                    }}>
                      STOP #{idx + 1}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                      {stop.fromCity?.name} ({stop.fromCity?.code}) to {stop.toCity?.name} ({stop.toCity?.code})
                    </h3>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <Calendar size={15} style={{ color: 'var(--color-primary)' }} />
                    <span style={{ fontWeight: 600 }}>{stop.departureDate}</span>
                  </div>
                </div>

                {/* Selected Transport (Flight, Train, or Cab) */}
                {stop.transportMode === 'train' ? (
                  <div style={{
                    backgroundColor: 'var(--bg-page)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border)',
                    padding: '1.25rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.25rem' }}>🚆</span>
                        <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Vande Bharat / Eurostar Express</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>EST-9014 (Superfast High-Speed)</span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <span className="badge badge-accent" style={{ fontSize: '0.7rem' }}>✓ Free Hot Meals</span>
                        <span className="badge badge-accent" style={{ fontSize: '0.7rem' }}>✓ AC Executive Class</span>
                      </div>
                    </div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr auto 1fr auto',
                      alignItems: 'center',
                      gap: '1.25rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>07:00 AM</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{stop.fromCity?.code} Central Station</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '100px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>3h 15m (160 km/h)</span>
                        <div style={{ width: '100%', height: '2px', backgroundColor: 'var(--border-strong)', margin: '0.35rem 0' }} />
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>10:15 AM</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{stop.toCity?.code} Terminal Station</div>
                      </div>
                      <div style={{ textAlign: 'right', minWidth: '120px' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Train Ticket</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>{formatPrice(1850 * totalTravelers)}</div>
                      </div>
                    </div>
                  </div>
                ) : stop.transportMode === 'cab' ? (
                  <div style={{
                    backgroundColor: 'var(--bg-page)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border)',
                    padding: '1.25rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.25rem' }}>🚖</span>
                        <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Airport Transfer / Intercity Cab</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Dzire / Innova SUV</span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <span className="badge badge-accent" style={{ fontSize: '0.7rem' }}>✓ Chauffeur Included</span>
                        <span className="badge badge-accent" style={{ fontSize: '0.7rem' }}>✓ Doorstep Pick-Up</span>
                      </div>
                    </div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr auto 1fr auto',
                      alignItems: 'center',
                      gap: '1.25rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>Flexible Pick-Up</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{stop.fromCity?.name}</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '100px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Intercity Drive</span>
                        <div style={{ width: '100%', height: '2px', backgroundColor: 'var(--border-strong)', margin: '0.35rem 0' }} />
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>Doorstep Drop</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{stop.toCity?.name}</div>
                      </div>
                      <div style={{ textAlign: 'right', minWidth: '120px' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Cab Fare</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>{formatPrice(2400)}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    backgroundColor: 'var(--bg-page)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border)',
                    padding: '1.25rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.25rem' }}>✈️</span>
                        <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{flight.airline}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{flight.flightNumber}</span>
                      </div>

                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <span className="badge badge-accent" style={{ fontSize: '0.7rem' }}>
                          ✓ {flight.baggage}
                        </span>
                        <span className="badge badge-accent" style={{ fontSize: '0.7rem' }}>
                          ✓ Free Hot Meal
                        </span>
                      </div>
                    </div>

                    {/* Flight Timing Schedule Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr auto 1fr auto',
                      alignItems: 'center',
                      gap: '1.25rem',
                      textAlign: 'center'
                    }}>
                      {/* Departure */}
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {flight.depTime}
                        </div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {stop.fromCity?.code}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                          {stop.fromCity?.airport}
                        </div>
                      </div>

                      {/* Duration Graphic */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '100px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                          {flight.duration}
                        </span>
                        <div style={{
                          width: '100%',
                          height: '2px',
                          backgroundColor: 'var(--border-strong)',
                          position: 'relative',
                          margin: '0.35rem 0'
                        }}>
                          <Plane size={14} style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: 'var(--color-primary)'
                          }} />
                        </div>
                        <span style={{ fontSize: '0.7rem', color: '#166534', fontWeight: 700 }}>
                          Non-Stop
                        </span>
                      </div>

                      {/* Arrival */}
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {flight.arrTime}
                        </div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {stop.toCity?.code}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                          {stop.toCity?.airport}
                        </div>
                      </div>

                      {/* Fare */}
                      <div style={{ textAlign: 'right', paddingLeft: '1rem', borderLeft: '1px solid var(--border)' }}>
                        <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                          {formatPrice(flight.baseFare)}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                          for {totalTravelers} pax
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Hotel Stay at this Stop (if nights > 0) */}
                {hotel && (
                  <div style={{
                    backgroundColor: 'var(--bg-page)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border)',
                    padding: '1.25rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Hotel size={18} style={{ color: 'var(--color-primary)' }} />
                        <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                          Stay in {stop.toCity?.name} ({hotel.nights} Nights)
                        </h4>
                      </div>
                      <span className="badge badge-accent" style={{ fontSize: '0.75rem' }}>
                        Free Cancellation • Pay at Hotel
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr auto', gap: '1rem', alignItems: 'center' }}>
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        style={{ width: '100%', height: '100px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                      />

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.2rem' }}>
                          <div style={{ display: 'flex', color: '#D97706' }}>
                            {[...Array(hotel.stars || 5)].map((_, s) => (
                              <Star key={s} size={13} fill="#D97706" />
                            ))}
                          </div>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#D97706' }}>
                            {hotel.rating} ({hotel.reviews} reviews)
                          </span>
                        </div>

                        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {hotel.name}
                        </div>

                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0.5rem 0' }}>
                          <MapPin size={12} style={{ display: 'inline', marginRight: '3px' }} />
                          {hotel.area}
                        </div>

                        {/* Amenities */}
                        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                          {hotel.amenities?.map((am) => (
                            <span key={am} style={{
                              fontSize: '0.68rem',
                              backgroundColor: 'var(--bg-surface)',
                              padding: '0.15rem 0.5rem',
                              borderRadius: '4px',
                              border: '1px solid var(--border)',
                              color: 'var(--text-secondary)'
                            }}>
                              ✓ {am}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Hotel Price */}
                      <div style={{ textAlign: 'right', minWidth: '110px' }}>
                        <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                          {formatPrice(hotel.pricePerNight * hotel.nights)}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                          {formatPrice(hotel.pricePerNight)} / night
                        </div>
                        <div style={{ fontSize: '0.68rem', color: '#166534', fontWeight: 700, marginTop: '0.2rem' }}>
                          Breakfast Included
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Top Sightseeing Activities at this Stop */}
                {cityActivities.length > 0 && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Sparkles size={16} style={{ color: 'var(--color-primary)' }} />
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                          Curated Sightseeing in {stop.toCity?.name} (Recommended by MMT)
                        </h4>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Add passes directly to your e-ticket</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.85rem' }}>
                      {cityActivities.map((act) => {
                        const isAdded = selectedActivities.some(a => a.id === act.id);

                        return (
                          <div
                            key={act.id}
                            style={{
                              backgroundColor: 'var(--bg-page)',
                              border: isAdded ? '1.5px solid var(--color-primary)' : '1px solid var(--border)',
                              borderRadius: 'var(--radius-md)',
                              padding: '0.85rem',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.65rem' }}>
                              <img
                                src={act.image}
                                alt={act.title}
                                style={{ width: '60px', height: '60px', borderRadius: '6px', objectFit: 'cover' }}
                              />
                              <div>
                                <span className="badge badge-accent" style={{ fontSize: '0.65rem', marginBottom: '0.2rem', display: 'inline-block' }}>
                                  {act.tag}
                                </span>
                                <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                                  {act.title}
                                </div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                                  Duration: {act.duration} • ★ {act.rating}
                                </div>
                              </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
                              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                                {formatPrice(act.price)} / person
                              </span>

                              <button
                                type="button"
                                onClick={() => toggleActivity(act, toCode)}
                                className={`btn btn-sm ${isAdded ? 'btn-secondary' : 'btn-outline'}`}
                                style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                              >
                                {isAdded ? (
                                  <>
                                    <Check size={12} style={{ color: '#166534' }} /> Added
                                  </>
                                ) : (
                                  <>
                                    <Plus size={12} /> Add Pass
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* Right Column: Sticky MakeMyTrip Fare Breakdown Sidebar */}
        <div style={{ position: 'sticky', top: '5.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Fare Summary Card */}
          <div className="glass-panel" style={{
            padding: '1.5rem',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-strong)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Fare Summary</span>
              <span className="badge badge-accent" style={{ fontSize: '0.7rem' }}>
                {stops.length} Cities Bundle
              </span>
            </h3>

            {/* Breakdown Lines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Base Airfare ({stops.length} Legs • {totalTravelers} Pax)</span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formatPrice(totalFlightCost)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Multi-City Hotels ({Object.values(selectedHotels).reduce((a, h) => a + (h.nights || 1), 0)} Nights)</span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formatPrice(totalHotelCost)}</span>
              </div>

              {selectedActivities.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Experiences ({selectedActivities.length} Activities)</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formatPrice(totalActivitiesCost)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Taxes & Aviation Fees (12%)</span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formatPrice(taxesCost)}</span>
              </div>

              {/* Multi-city bundle discount */}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-text)', fontWeight: 700 }}>
                <span>Multi-City Route Discount (8%)</span>
                <span>- {formatPrice(multiCityBundleDiscount)}</span>
              </div>

              {/* Promo Coupon Discount */}
              {appliedPromo && couponDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#166534', fontWeight: 700, backgroundColor: 'var(--accent-bg)', padding: '0.35rem 0.65rem', borderRadius: '6px' }}>
                  <span>Coupon: {appliedPromo.code}</span>
                  <span>- {formatPrice(couponDiscount)}</span>
                </div>
              )}
            </div>

            {/* Travel Insurance Checkbox Toggle */}
            <div style={{
              margin: '1.25rem 0',
              padding: '0.85rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-page)',
              border: '1px solid var(--border)'
            }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={includeInsurance}
                  onChange={(e) => setIncludeInsurance(e.target.checked)}
                  style={{ accentColor: 'var(--color-primary)', marginTop: '3px' }}
                />
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <ShieldCheck size={14} style={{ color: '#166534' }} /> Add Multi-Trip Travel Insurance
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>
                    Medical emergencies, flight delay & baggage loss cover ({formatPrice(999)} / pax)
                  </div>
                </div>
              </label>
            </div>

            {/* Promo Code Input & Badges */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Enter Promo Code..."
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="form-input"
                  style={{ fontSize: '0.8rem', height: '36px', textTransform: 'uppercase' }}
                />
                <button
                  type="button"
                  onClick={() => handleApplyPromo(promoInput)}
                  className="btn btn-sm btn-outline"
                  style={{ whiteSpace: 'nowrap', fontSize: '0.8rem' }}
                >
                  Apply
                </button>
              </div>

              {promoError && (
                <div style={{ fontSize: '0.7rem', color: '#EF4444', marginBottom: '0.35rem' }}>{promoError}</div>
              )}

              {/* Clickable Promo Badges */}
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                {PROMO_COUPONS.map((coupon) => (
                  <button
                    key={coupon.code}
                    type="button"
                    onClick={() => {
                      setPromoInput(coupon.code);
                      handleApplyPromo(coupon.code);
                    }}
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      border: appliedPromo?.code === coupon.code ? '1px solid var(--color-primary)' : '1px dashed var(--border-strong)',
                      backgroundColor: appliedPromo?.code === coupon.code ? 'var(--bg-surface)' : 'transparent',
                      color: appliedPromo?.code === coupon.code ? 'var(--color-primary)' : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    🏷️ {coupon.code}
                  </button>
                ))}
              </div>
            </div>

            {/* Grand Total Bar */}
            <div style={{
              paddingTop: '1rem',
              borderTop: '2px dashed var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '1.25rem'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 600 }}>Grand Total</div>
                <div style={{ fontSize: '0.7rem', color: '#166534', fontWeight: 600 }}>All Taxes & Stays Included</div>
              </div>
              <div style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--color-primary)', lineHeight: 1 }}>
                {formatPrice(grandTotal)}
              </div>
            </div>

            {/* Big Action CTA Buttons */}
            <button
              type="button"
              onClick={handleProceedBooking}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '0.85rem',
                fontSize: '1rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-glow)'
              }}
            >
              <CheckCircle size={18} />
              <span>Book Multi-City Tour & Get E-Ticket</span>
            </button>
          </div>

          {/* MMT Trust Badges */}
          <div className="glass-panel" style={{ padding: '1rem 1.25rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
              <ShieldCheck size={18} style={{ color: 'var(--color-primary)' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                GlobeTrotter Booking Assurance
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
              ✓ Instant confirmation & barcode passes<br />
              ✓ Free 24/7 concierge for multi-city layovers<br />
              ✓ 100% price guarantee with real-time sync
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default MultiStopResultsView;
