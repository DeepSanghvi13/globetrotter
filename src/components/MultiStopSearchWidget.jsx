import React, { useState } from 'react';
import {
  Plane, Calendar, Plus, X, ArrowRightLeft, Users, ChevronDown,
  Search, Package, Layers, Tag, Train, Car
} from 'lucide-react';
import { POPULAR_CITIES, SPECIAL_FARES, CURRENCIES, MOCK_TRAIN_DATA, MOCK_CAB_DATA } from '../data/multiStopData';

export const MultiStopSearchWidget = ({
  onSearch,
  currency,
  setCurrency,
  activeTab,
  setActiveTab
}) => {
  const [tripType, setTripType] = useState('multi-city'); // 'multi-city' | 'one-way' | 'round-trip'
  const [specialFare, setSpecialFare] = useState('regular');
  const [isTravelerDropdownOpen, setIsTravelerDropdownOpen] = useState(false);
  const [citySelectorModal, setCitySelectorModal] = useState({ open: false, stopIndex: null, field: null }); // { open, stopIndex, field: 'from' | 'to' }
  const [citySearchQuery, setCitySearchQuery] = useState('');

  // Travelers state
  const [travelers, setTravelers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    cabinClass: 'Economy'
  });

  // Multi-Stop Legs state (defaults to 3 stops)
  const [stops, setStops] = useState([
    {
      from: 'DEL',
      to: 'DXB',
      departureDate: '2026-09-15',
      stayNights: 2,
      transportMode: 'flight'
    },
    {
      from: 'DXB',
      to: 'CDG',
      departureDate: '2026-09-17',
      stayNights: 3,
      transportMode: 'flight'
    },
    {
      from: 'CDG',
      to: 'FCO',
      departureDate: '2026-09-20',
      stayNights: 2,
      transportMode: 'flight'
    }
  ]);

  const getCity = (code) => POPULAR_CITIES.find(c => c.code === code) || { code, name: code, airport: 'Airport', flag: '🌐' };

  // Add stop leg
  const handleAddStop = () => {
    if (stops.length >= 6) return;
    const lastStop = stops[stops.length - 1];
    const newFrom = lastStop ? lastStop.to : 'FCO';
    const nextCandidates = ['ZRH', 'LHR', 'SIN', 'DEL', 'BOM'];
    const newTo = nextCandidates.find(c => c !== newFrom) || 'DEL';

    // Calculate next date (2 days after previous)
    let nextDate = '2026-09-22';
    if (lastStop && lastStop.departureDate) {
      const d = new Date(lastStop.departureDate);
      d.setDate(d.getDate() + (lastStop.stayNights || 2));
      nextDate = d.toISOString().split('T')[0];
    }

    setStops(prev => [
      ...prev,
      {
        from: newFrom,
        to: newTo,
        departureDate: nextDate,
        stayNights: 2,
        transportMode: 'flight'
      }
    ]);
  };

  // Remove stop leg
  const handleRemoveStop = (idx) => {
    if (stops.length <= 2) return;
    setStops(prev => prev.filter((_, i) => i !== idx));
  };

  // Swap From and To for a specific leg
  const handleSwap = (idx) => {
    setStops(prev => prev.map((stop, i) => {
      if (i === idx) {
        return { ...stop, from: stop.to, to: stop.from };
      }
      return stop;
    }));
  };

  // Update specific field on a stop
  const handleUpdateStop = (idx, field, value) => {
    setStops(prev => prev.map((stop, i) => {
      if (i === idx) {
        return { ...stop, [field]: value };
      }
      return stop;
    }));
  };

  // Open city picker modal
  const openCityPicker = (stopIndex, field) => {
    setCitySelectorModal({ open: true, stopIndex, field });
    setCitySearchQuery('');
  };

  // Select city from picker
  const selectCity = (cityCode) => {
    if (citySelectorModal.stopIndex !== null && citySelectorModal.field) {
      handleUpdateStop(citySelectorModal.stopIndex, citySelectorModal.field, cityCode);
    }
    setCitySelectorModal({ open: false, stopIndex: null, field: null });
  };

  // Handle Search Submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch({
      tripType,
      stops: stops.map(s => ({
        ...s,
        fromCity: getCity(s.from),
        toCity: getCity(s.to)
      })),
      travelers,
      specialFare,
      currency
    });
  };

  // Filter cities for modal
  const filteredCities = POPULAR_CITIES.filter(c =>
    c.name.toLowerCase().includes(citySearchQuery.toLowerCase()) ||
    c.code.toLowerCase().includes(citySearchQuery.toLowerCase()) ||
    c.country.toLowerCase().includes(citySearchQuery.toLowerCase()) ||
    c.airport.toLowerCase().includes(citySearchQuery.toLowerCase())
  );

  const totalTravelers = travelers.adults + travelers.children + travelers.infants;

  return (
    <div className="mmt-search-card" style={{
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-lg)',
      overflow: 'visible',
      marginBottom: '2.5rem',
      position: 'relative'
    }}>
      {/* MMT Style Top Service Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        padding: '0.85rem 1.5rem',
        borderBottom: '1px solid var(--border)',
        backgroundColor: 'var(--bg-page)',
        borderTopLeftRadius: 'var(--radius-xl)',
        borderTopRightRadius: 'var(--radius-xl)'
      }}>
        {/* Navigation Categories */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[
            { id: 'flights', label: 'Multi-City Flights', icon: <Plane size={16} /> },
            { id: 'trains', label: 'Express & Bullet Trains', icon: <Train size={16} /> },
            { id: 'cabs', label: 'Airport & Intercity Cabs', icon: <Car size={16} /> },
            { id: 'packages', label: 'Curated Multi-Stop Tours', icon: <Package size={16} /> },
            { id: 'custom', label: 'Custom Itinerary Builder', icon: <Layers size={16} /> }
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '999px',
                  border: isSelected ? '1px solid var(--color-primary)' : '1px solid transparent',
                  backgroundColor: isSelected ? 'var(--bg-surface)' : 'transparent',
                  color: isSelected ? 'var(--color-primary)' : 'var(--text-secondary)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Currency Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Currency:</span>
          <div style={{ display: 'flex', gap: '0.25rem', backgroundColor: 'var(--bg-surface)', padding: '3px', borderRadius: '8px', border: '1px solid var(--border)' }}>
            {Object.keys(CURRENCIES).map((curKey) => (
              <button
                key={curKey}
                type="button"
                onClick={() => setCurrency(curKey)}
                style={{
                  padding: '3px 8px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: currency === curKey ? 'var(--color-primary)' : 'transparent',
                  color: currency === curKey ? '#FFFFFF' : 'var(--text-secondary)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {curKey}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Search Panel Form */}
      <form onSubmit={handleSearchSubmit} style={{ padding: '1.75rem' }}>
        {/* Trip Type Selector & Headline */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { id: 'multi-city', label: 'Multi-City / Multi-Stops (Recommended)' },
              { id: 'one-way', label: 'One Way' },
              { id: 'round-trip', label: 'Round Trip' }
            ].map((type) => (
              <label
                key={type.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: tripType === type.id ? 700 : 500,
                  color: tripType === type.id ? 'var(--color-primary)' : 'var(--text-secondary)'
                }}
              >
                <input
                  type="radio"
                  name="tripType"
                  value={type.id}
                  checked={tripType === type.id}
                  onChange={(e) => setTripType(e.target.value)}
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                <span>{type.label}</span>
              </label>
            ))}
          </div>

          {/* Travelers & Cabin Class Selector Button */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setIsTravelerDropdownOpen(!isTravelerDropdownOpen)}
              className="btn btn-outline"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.45rem 1rem',
                fontSize: '0.85rem'
              }}
            >
              <Users size={16} style={{ color: 'var(--color-primary)' }} />
              <span>{totalTravelers} Traveler{totalTravelers > 1 ? 's' : ''}, {travelers.cabinClass}</span>
              <ChevronDown size={14} />
            </button>

            {/* Travelers Popover */}
            {isTravelerDropdownOpen && (
              <div
                className="animate-fade-in"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '110%',
                  width: '320px',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-strong)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem',
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 200
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Select Travelers & Class</span>
                  <button
                    type="button"
                    onClick={() => setIsTravelerDropdownOpen(false)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Adults */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Adults</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>12+ yrs</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <button
                      type="button"
                      disabled={travelers.adults <= 1}
                      onClick={() => setTravelers(t => ({ ...t, adults: Math.max(1, t.adults - 1) }))}
                      className="btn btn-sm btn-outline"
                      style={{ width: '28px', height: '28px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >-</button>
                    <span style={{ fontWeight: 700, minWidth: '16px', textAlign: 'center' }}>{travelers.adults}</span>
                    <button
                      type="button"
                      disabled={travelers.adults >= 9}
                      onClick={() => setTravelers(t => ({ ...t, adults: t.adults + 1 }))}
                      className="btn btn-sm btn-outline"
                      style={{ width: '28px', height: '28px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >+</button>
                  </div>
                </div>

                {/* Children */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Children</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>2-12 yrs</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <button
                      type="button"
                      disabled={travelers.children <= 0}
                      onClick={() => setTravelers(t => ({ ...t, children: Math.max(0, t.children - 1) }))}
                      className="btn btn-sm btn-outline"
                      style={{ width: '28px', height: '28px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >-</button>
                    <span style={{ fontWeight: 700, minWidth: '16px', textAlign: 'center' }}>{travelers.children}</span>
                    <button
                      type="button"
                      disabled={travelers.children >= 6}
                      onClick={() => setTravelers(t => ({ ...t, children: t.children + 1 }))}
                      className="btn btn-sm btn-outline"
                      style={{ width: '28px', height: '28px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >+</button>
                  </div>
                </div>

                {/* Cabin Class */}
                <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '0.85rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Cabin Class</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.4rem' }}>
                    {['Economy', 'Premium Economy', 'Business'].map((cClass) => (
                      <button
                        key={cClass}
                        type="button"
                        onClick={() => setTravelers(t => ({ ...t, cabinClass: cClass }))}
                        style={{
                          textAlign: 'left',
                          padding: '0.45rem 0.75rem',
                          borderRadius: '6px',
                          border: travelers.cabinClass === cClass ? '1px solid var(--color-primary)' : '1px solid var(--border)',
                          backgroundColor: travelers.cabinClass === cClass ? 'var(--bg-page)' : 'transparent',
                          color: travelers.cabinClass === cClass ? 'var(--color-primary)' : 'var(--text-primary)',
                          fontWeight: travelers.cabinClass === cClass ? 700 : 500,
                          fontSize: '0.8rem',
                          cursor: 'pointer'
                        }}
                      >
                        {cClass}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsTravelerDropdownOpen(false)}
                  className="btn btn-sm btn-primary"
                  style={{ width: '100%', marginTop: '1rem' }}
                >
                  Apply Travelers
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Multi-Stop Leg Builder */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          {stops.map((stop, idx) => {
            const fromCity = getCity(stop.from);
            const toCity = getCity(stop.to);

            return (
              <div
                key={idx}
                className="multi-stop-leg-card"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto 1fr 180px 130px auto',
                  alignItems: 'center',
                  gap: '0.85rem',
                  backgroundColor: 'var(--bg-page)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1rem 1.25rem',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                {/* Stop Tag / Stepper Badge & Transport Mode Toggle */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                    color: '#FFFFFF',
                    fontSize: '0.8rem',
                    fontWeight: 800
                  }}>
                    {idx + 1}
                  </div>
                  <div style={{ display: 'flex', gap: '2px', backgroundColor: 'var(--bg-surface)', padding: '2px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                    {[
                      { mode: 'flight', label: '✈️', title: 'Flight' },
                      { mode: 'train', label: '🚆', title: 'Train' },
                      { mode: 'cab', label: '🚖', title: 'Cab' }
                    ].map((m) => (
                      <button
                        key={m.mode}
                        type="button"
                        onClick={() => handleUpdateStop(idx, 'transportMode', m.mode)}
                        title={m.title}
                        style={{
                          border: 'none',
                          backgroundColor: (stop.transportMode || 'flight') === m.mode ? 'var(--color-primary)' : 'transparent',
                          color: (stop.transportMode || 'flight') === m.mode ? '#FFFFFF' : 'var(--text-secondary)',
                          fontSize: '0.7rem',
                          padding: '1px 5px',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* From City Selector */}
                <div
                  onClick={() => openCityPicker(idx, 'from')}
                  style={{
                    cursor: 'pointer',
                    padding: '0.45rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    minWidth: '150px'
                  }}
                >
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>From</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.1rem' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{fromCity.code}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{fromCity.name}</span>
                    <span style={{ fontSize: '0.9rem' }}>{fromCity.flag}</span>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {fromCity.airport}
                  </div>
                </div>

                {/* Swap Icon */}
                <button
                  type="button"
                  onClick={() => handleSwap(idx)}
                  title="Swap Departure and Destination"
                  style={{
                    background: 'none',
                    border: '1px solid var(--border)',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--color-primary)',
                    backgroundColor: 'var(--bg-surface)',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'rotate(180deg)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'rotate(0deg)'}
                >
                  <ArrowRightLeft size={14} />
                </button>

                {/* To City Selector */}
                <div
                  onClick={() => openCityPicker(idx, 'to')}
                  style={{
                    cursor: 'pointer',
                    padding: '0.45rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    minWidth: '150px'
                  }}
                >
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>To</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.1rem' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{toCity.code}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{toCity.name}</span>
                    <span style={{ fontSize: '0.9rem' }}>{toCity.flag}</span>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {toCity.airport}
                  </div>
                </div>

                {/* Departure Date */}
                <div style={{
                  padding: '0.45rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border)'
                }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Departure</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.1rem' }}>
                    <Calendar size={14} style={{ color: 'var(--color-primary)' }} />
                    <input
                      type="date"
                      value={stop.departureDate}
                      onChange={(e) => handleUpdateStop(idx, 'departureDate', e.target.value)}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        color: 'var(--text-primary)',
                        fontSize: '0.825rem',
                        fontWeight: 600,
                        outline: 'none',
                        cursor: 'pointer',
                        width: '100%'
                      }}
                    />
                  </div>
                </div>

                {/* Stay Duration / Nights */}
                <div style={{
                  padding: '0.45rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border)'
                }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Stay</div>
                  <select
                    value={stop.stayNights}
                    onChange={(e) => handleUpdateStop(idx, 'stayNights', Number(e.target.value))}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      color: 'var(--text-primary)',
                      fontSize: '0.825rem',
                      fontWeight: 600,
                      outline: 'none',
                      cursor: 'pointer',
                      width: '100%',
                      marginTop: '0.1rem'
                    }}
                  >
                    <option value={0} style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)' }}>Layover / Same Day</option>
                    <option value={1} style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)' }}>1 Night Stay</option>
                    <option value={2} style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)' }}>2 Nights Stay</option>
                    <option value={3} style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)' }}>3 Nights Stay</option>
                    <option value={4} style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)' }}>4 Nights Stay</option>
                    <option value={5} style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)' }}>5 Nights Stay</option>
                  </select>
                </div>

                {/* Remove Stop Button */}
                <div>
                  {stops.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveStop(idx)}
                      title="Remove this stop"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        padding: '0.4rem',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'color 0.2s ease, background-color 0.2s ease'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = '#EF4444';
                        e.currentTarget.style.backgroundColor = 'var(--danger-bg)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Another Stop Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
          <button
            type="button"
            onClick={handleAddStop}
            disabled={stops.length >= 6}
            className="btn btn-outline"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontWeight: 700,
              fontSize: '0.85rem'
            }}
          >
            <Plus size={16} />
            <span>+ Add Another City / Stop {stops.length >= 6 ? '(Max 6)' : ''}</span>
          </button>

          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            💡 Tip: Adding 3+ stops unlocks exclusive multi-city bundle discounts up to 25%!
          </span>
        </div>

        {/* Special Fare Categories (MakeMyTrip Feature) */}
        <div style={{
          backgroundColor: 'var(--bg-page)',
          borderRadius: 'var(--radius-lg)',
          padding: '1rem 1.25rem',
          marginBottom: '1.75rem',
          border: '1px solid var(--border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Tag size={15} style={{ color: 'var(--color-primary)' }} />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Special Fare Categories (Select one for exclusive benefits)
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {SPECIAL_FARES.map((fare) => {
              const isSelected = specialFare === fare.id;
              return (
                <label
                  key={fare.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? '1.5px solid var(--color-primary)' : '1px solid var(--border)',
                    backgroundColor: isSelected ? 'var(--bg-surface)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <input
                    type="radio"
                    name="specialFare"
                    value={fare.id}
                    checked={isSelected}
                    onChange={(e) => setSpecialFare(e.target.value)}
                    style={{ accentColor: 'var(--color-primary)' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: isSelected ? 700 : 500, color: isSelected ? 'var(--color-primary)' : 'var(--text-primary)' }}>
                      {fare.label}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
                      {fare.badge}
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Big Glow Search Button */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{
              padding: '0.9rem 3rem',
              fontSize: '1.1rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              borderRadius: '999px',
              boxShadow: 'var(--shadow-glow)',
              letterSpacing: '0.02em',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Search size={22} />
            <span>Search Multi-City Flights & Build Route</span>
          </button>
        </div>
      </form>

      {/* City Selector Modal / Dropdown */}
      {citySelectorModal.open && (
        <div className="modal-overlay" onClick={() => setCitySelectorModal({ open: false, stopIndex: null, field: null })} style={{ zIndex: 1200 }}>
          <div
            className="modal-content animate-fade-in"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '520px', padding: '1.75rem', maxHeight: '80vh', overflowY: 'auto' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Select {citySelectorModal.field === 'from' ? 'Departure' : 'Destination'} City
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Choose from popular international hubs and domestic airports
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCitySelectorModal({ open: false, stopIndex: null, field: null })}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* City Search Bar */}
            <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input
                type="text"
                autoFocus
                placeholder="Search city name, airport, or code (e.g. Paris, CDG, Dubai)..."
                value={citySearchQuery}
                onChange={(e) => setCitySearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.5rem', fontSize: '0.875rem' }}
              />
            </div>

            {/* City List Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {filteredCities.map((city) => (
                <div
                  key={city.code}
                  onClick={() => selectCity(city.code)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-page)',
                    border: '1px solid var(--border)',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease, border-color 0.15s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-page)';
                    e.currentTarget.style.borderColor = 'var(--border)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.3rem' }}>{city.flag}</span>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {city.name}, {city.country}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {city.airport}
                      </div>
                    </div>
                  </div>

                  <span className="badge badge-accent" style={{ fontSize: '0.75rem', fontWeight: 800 }}>
                    {city.code}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
