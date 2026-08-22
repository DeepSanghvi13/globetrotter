import React, { useState } from 'react';
import {
  CheckCircle, Plane, Hotel,
  Printer, X, ShieldCheck, QrCode, Clock, Tag, User, Sparkles,
  Barcode, MapPin, Download, Share2
} from 'lucide-react';
import { FlightBarcode, HotelCheckinQRCode } from './BarcodeGenerator';

export const BookingVoucherModal = ({
  isOpen,
  onClose,
  bookingDetails,
  currency,
  travelers
}) => {
  const [activeVoucherTab, setActiveVoucherTab] = useState('all'); // 'all' | 'flights' | 'hotels'

  if (!isOpen || !bookingDetails) return null;

  const { pnr, stops, selectedHotels, selectedActivities, totalPrice, insuranceIncluded, createdAt } = bookingDetails;
  const currSym = currency?.symbol || '₹';
  const currRate = currency?.rate || 1;

  const formatPrice = (p) => `${currSym}${Math.round(p * currRate).toLocaleString()}`;

  const handlePrint = () => {
    window.print();
  };

  const passengerName = bookingDetails.primaryPassenger || 'Aarav Sharma';
  const seats = ['14A (Window)', '16C (Aisle)', '18F (Window)', '12B (Middle)', '19A (Window)'];
  const gates = ['T3 - Gate B22', 'T2 - Gate A15', 'T1 - Gate C08', 'T4 - Gate D12'];

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
      <div
        className="modal-content animate-fade-in printable-voucher-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '920px',
          width: '95%',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '0',
          borderRadius: 'var(--radius-xl)',
          backgroundColor: 'var(--bg-page)',
          border: '1px solid var(--border-strong)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Voucher Header Banner */}
        <div style={{
          background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)',
          color: '#FFFFFF',
          padding: '2rem 2.25rem',
          position: 'relative',
          borderTopLeftRadius: 'var(--radius-xl)',
          borderTopRightRadius: 'var(--radius-xl)'
        }}>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.35)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
          >
            <X size={20} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.65rem', flexWrap: 'wrap' }}>
            <span style={{
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              padding: '0.25rem 0.75rem',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}>
              <CheckCircle size={14} /> Confirmed Multi-City E-Ticket Pass
            </span>
            <span style={{ fontSize: '0.85rem', opacity: 0.9 }}>
              Issued on {createdAt || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.85rem', fontWeight: 800, lineHeight: 1.2, margin: 0 }}>
                GlobeTrotter Multi-Stop Journey Pass
              </h2>
              <p style={{ margin: '0.35rem 0 0 0', opacity: 0.9, fontSize: '0.925rem' }}>
                Your complete itinerary across {stops?.length || 2} destinations is secured with verified flight barcodes & hotel QR codes.
              </p>
            </div>

            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              padding: '0.75rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              backdropFilter: 'blur(8px)',
              textAlign: 'right'
            }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.85 }}>Booking Ref / PNR</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '0.1em', fontFamily: 'monospace' }}>{pnr || 'MMT-GT-94821'}</div>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs inside Modal */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          padding: '1rem 2.25rem',
          backgroundColor: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border)',
          overflowX: 'auto'
        }}>
          {[
            { id: 'all', label: 'Full Itinerary & Passes', icon: <QrCode size={15} /> },
            { id: 'flights', label: `Flight Barcodes (${stops?.length || 0})`, icon: <Plane size={15} /> },
            { id: 'hotels', label: `Hotel QR Check-Ins (${Object.keys(selectedHotels || {}).length})`, icon: <Hotel size={15} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveVoucherTab(tab.id)}
              className={`btn btn-sm ${activeVoucherTab === tab.id ? 'btn-primary' : 'btn-outline'}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Voucher Body Content */}
        <div style={{ padding: '2rem 2.25rem' }}>
          
          {/* Passenger & Fare Summary Pill Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem',
            backgroundColor: 'var(--bg-surface)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <User size={14} style={{ color: 'var(--color-primary)' }} /> Primary Passenger
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                {passengerName} ({travelers?.adults || 1} Adult{travelers?.adults > 1 ? 's' : ''})
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={14} style={{ color: 'var(--color-primary)' }} /> Cabin & Class
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                {bookingDetails.cabinClass || 'Economy'} • Verified
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <ShieldCheck size={14} style={{ color: '#166534' }} /> Travel Insurance
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: insuranceIncluded ? 'var(--accent-text)' : 'var(--text-secondary)', marginTop: '0.2rem' }}>
                {insuranceIncluded ? 'Comprehensive Active' : 'Not Opted'}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Tag size={14} style={{ color: 'var(--color-primary)' }} /> Total Paid
              </div>
              <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-primary)', marginTop: '0.1rem' }}>
                {formatPrice(totalPrice)}
              </div>
            </div>
          </div>

          {/* FLIGHT SEGMENTS WITH BARCODES */}
          {(activeVoucherTab === 'all' || activeVoucherTab === 'flights') && (
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plane size={20} style={{ color: 'var(--color-primary)' }} />
                Flight E-Tickets & Kiosk Barcodes ({stops?.length || 0} Segments)
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {stops?.map((stop, idx) => {
                  const flightNum = stop.flight?.flightNumber || `AI-${410 + idx * 32}`;
                  const ticketNum = `ETKT 098-${7421900000 + idx * 83214}`;
                  const seat = seats[idx % seats.length];
                  const gate = gates[idx % gates.length];

                  return (
                    <div
                      key={idx}
                      className="glass-panel"
                      style={{
                        padding: '1.5rem',
                        borderRadius: 'var(--radius-xl)',
                        border: '1px solid var(--border-strong)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.25rem'
                      }}
                    >
                      {/* Segment Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{
                            backgroundColor: 'var(--color-primary)',
                            color: '#FFFFFF',
                            padding: '0.2rem 0.55rem',
                            borderRadius: '4px',
                            fontWeight: 800,
                            fontSize: '0.75rem'
                          }}>
                            LEG {idx + 1}
                          </span>
                          <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>
                            {stop.fromCity?.name} ({stop.fromCity?.code}) → {stop.toCity?.name} ({stop.toCity?.code})
                          </span>
                        </div>

                        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                          <span className="badge badge-accent" style={{ fontSize: '0.725rem' }}>
                            ✓ {stop.flight?.airline || 'Air India'} {flightNum}
                          </span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            Date: {stop.departureDate}
                          </span>
                        </div>
                      </div>

                      {/* Flight Timetable Row */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr auto 1fr',
                        alignItems: 'center',
                        gap: '1rem',
                        textAlign: 'center'
                      }}>
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                            {stop.fromCity?.code || 'DEL'}
                          </div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                            {stop.fromCity?.name || 'New Delhi'}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            Dep: {stop.flight?.depTime || '08:30 AM'} • {gate.split(' - ')[0]}
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                            {stop.flight?.duration || '3h 40m'}
                          </span>
                          <div style={{
                            width: '120px',
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
                          <span style={{ fontSize: '0.7rem', color: 'var(--accent-text)', fontWeight: 700 }}>
                            Non-Stop Confirmed
                          </span>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                            {stop.toCity?.code || 'DXB'}
                          </div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                            {stop.toCity?.name || 'Dubai'}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            Arr: {stop.flight?.arrTime || '11:10 AM'}
                          </div>
                        </div>
                      </div>

                      {/* 1D Flight Barcode Graphic */}
                      <FlightBarcode
                        ticketNumber={ticketNum}
                        pnr={pnr || 'MMT-GT-94821'}
                        passenger={passengerName.toUpperCase()}
                        flightNumber={flightNum}
                        seat={seat}
                        gate={gate}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* HOTEL STAYS WITH QR CODES */}
          {(activeVoucherTab === 'all' || activeVoucherTab === 'hotels') && Object.keys(selectedHotels || {}).length > 0 && (
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Hotel size={20} style={{ color: 'var(--color-primary)' }} />
                Hotel Stays & Front-Desk Check-In QR Passes
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
                {Object.entries(selectedHotels || {}).map(([cityCode, hotel], hIdx) => {
                  const confId = `HTL-${cityCode}-${9140 + hIdx * 24}`;

                  return (
                    <div
                      key={cityCode}
                      className="glass-panel"
                      style={{
                        padding: '1.5rem',
                        borderRadius: 'var(--radius-xl)',
                        border: '1px solid var(--border-strong)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                            <span className="badge badge-accent" style={{ fontSize: '0.65rem' }}>
                              {hotel.nights || 2} Nights Stay
                            </span>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                              ★ {hotel.rating || 4.8}
                            </span>
                          </div>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                            {hotel.name}
                          </h4>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                            <MapPin size={12} style={{ display: 'inline', marginRight: '2px' }} />
                            {cityCode} • {hotel.roomType || 'Deluxe King Room'}
                          </div>
                        </div>
                      </div>

                      {/* Scannable Hotel QR Pass */}
                      <HotelCheckinQRCode
                        confirmationId={confId}
                        hotelName={hotel.name}
                        guestName={passengerName}
                        roomType={hotel.roomType || 'Deluxe King Room'}
                        size={140}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SIGHTSEEING EXPERIENCES */}
          {(activeVoucherTab === 'all') && selectedActivities?.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Sparkles size={18} style={{ color: 'var(--color-primary)' }} />
                Confirmed Sightseeing & Activity Passes
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
                {selectedActivities.map((act) => (
                  <div
                    key={act.id}
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.85rem 1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{act.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Duration: {act.duration} • VIP Pass</div>
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                      {formatPrice(act.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Barcode & Print Action Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.25rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{
                width: '54px',
                height: '54px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-strong)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)'
              }}>
                <Barcode size={36} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>Official GlobeTrotter E-Voucher</div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>Scannable barcodes & QR passes for boarding & check-in</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={handlePrint}
                className="btn btn-outline"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <Printer size={16} /> Print Passes & Vouchers
              </button>
              <button
                onClick={onClose}
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <CheckCircle size={16} /> Done
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
