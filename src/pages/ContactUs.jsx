import React, { useState } from 'react';
import {
  Mail, Phone, MapPin, Clock, Send, MessageSquare,
  ShieldCheck, HelpCircle, ChevronDown, ChevronUp, CheckCircle,
  Headphones, Sparkles, MessageCircle, AlertCircle
} from 'lucide-react';

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    pnr: '',
    category: 'itinerary',
    priority: 'normal',
    message: ''
  });

  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.message.trim()) return;

    const ticketId = `TKT-${Math.floor(10000 + Math.random() * 90000)}`;
    setSubmittedTicket({
      ticketId,
      ...formData,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  };

  const FAQS = [
    {
      q: 'How does GlobeTrotter handle multi-stop flight layovers and baggage?',
      a: 'All flights booked via GlobeTrotter include automated luggage through-checkin whenever non-stop or interline airline agreements apply. In your E-Ticket voucher, every leg clearly displays cabin and check-in baggage allowances along with terminal gates.'
    },
    {
      q: 'Where do I find my hotel check-in QR codes?',
      a: 'Once you book any multi-stop journey, your hotel check-in QR codes are immediately available in the "History & Itineraries" section. Simply present the QR code at the front desk for instant contactless check-in.'
    },
    {
      q: 'Can I add or swap stopover cities after booking?',
      a: 'Yes! Our 24/7 concierge can modify layovers and stop dates. Simply submit a ticket with your PNR or reach out directly to our live chat support team.'
    },
    {
      q: 'What is covered under the GlobeTrotter Multi-Stop Travel Protection?',
      a: 'Our travel protection plan includes medical emergencies overseas, flight delay compensation, baggage loss/theft coverage, and free trip rescheduling due to airline cancellations.'
    }
  ];

  return (
    <div className="traveler-homepage-container" style={{ padding: '2.5rem 1.5rem', minHeight: 'calc(100vh - 120px)' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        {/* Header Hero Banner */}
        <div className="traveler-hero-banner" style={{ padding: '2.5rem 2.25rem', marginBottom: '2.5rem' }}>
          <div className="hero-glow-ambient" />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '780px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.65rem' }}>
              <span className="badge badge-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Headphones size={14} /> 24/7 Global Traveler Concierge
              </span>
              <span className="badge badge-warning" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <ShieldCheck size={14} /> 100% Verified Support Guarantee
              </span>
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0' }}>
              We’re Here for Every Leg of Your Journey 🗺️
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>
              Need assistance with your multi-city booking, flight barcodes, hotel QR check-ins, or custom itinerary planning? Our global concierge team is on standby 24/7.
            </p>
          </div>
        </div>

        {/* 3 Quick Contact Channel Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {[
            {
              title: '24/7 Phone Concierge',
              value: '+1 (800) 555-GLOBE',
              sub: 'Toll-free worldwide • 24/7 live assistance',
              icon: <Phone size={24} />,
              color: 'var(--color-primary)'
            },
            {
              title: 'Email Concierge',
              value: 'support@globetrotter.travel',
              sub: 'Average response time: Under 15 mins',
              icon: <Mail size={24} />,
              color: 'var(--accent-text)'
            },
            {
              title: 'WhatsApp Priority Help',
              value: '+91 98765 43210',
              sub: 'Instant barcode & voucher re-delivery',
              icon: <MessageCircle size={24} />,
              color: 'var(--warning-text)'
            }
          ].map((ch, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '1.75rem', borderRadius: 'var(--radius-xl)' }}>
              <div style={{
                color: ch.color,
                backgroundColor: 'var(--bg-page)',
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                border: '1px solid var(--border)'
              }}>
                {ch.icon}
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                {ch.title}
              </h3>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
                {ch.value}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                {ch.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Main Two-Column Layout: Left (Support Ticket Form) & Right (Global Offices & Live Hours) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: '2.5rem', marginBottom: '3.5rem' }}>
          
          {/* Left Column: Interactive Contact Form */}
          <div className="glass-panel" style={{ padding: '2.25rem', borderRadius: 'var(--radius-xl)' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="badge badge-accent" style={{ marginBottom: '0.4rem' }}>Submit Inquiry or Support Ticket</span>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Send Us a Message
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Fill in the details below and a dedicated travel specialist will reply shortly.
              </p>
            </div>

            {submittedTicket ? (
              <div style={{
                backgroundColor: 'var(--accent-bg)',
                color: 'var(--accent-text)',
                padding: '1.75rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(74, 222, 128, 0.3)',
                textAlign: 'center'
              }}>
                <CheckCircle size={44} style={{ color: '#166534', margin: '0 auto 0.75rem auto' }} />
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>
                  Support Ticket Created!
                </h3>
                <div style={{
                  display: 'inline-block',
                  backgroundColor: '#FFFFFF',
                  color: '#1C1917',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                  fontWeight: 800,
                  fontSize: '1rem',
                  marginBottom: '0.85rem'
                }}>
                  Ticket ID: {submittedTicket.ticketId}
                </div>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                  Thank you, <strong>{submittedTicket.name}</strong>. Our priority concierge has received your request regarding <em>{submittedTicket.category.toUpperCase()}</em> and will reach out to <strong>{submittedTicket.email}</strong> within 15 minutes.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmittedTicket(null)}
                  className="btn btn-primary btn-sm"
                  style={{ marginTop: '1.25rem' }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input no-icon"
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input no-icon"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Booking Reference / PNR (Optional)</label>
                    <input
                      type="text"
                      value={formData.pnr}
                      onChange={(e) => setFormData({ ...formData, pnr: e.target.value.toUpperCase() })}
                      className="form-input no-icon"
                      placeholder="e.g. GT-94821"
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="form-input no-icon"
                      style={{ cursor: 'pointer' }}
                    >
                      <option value="itinerary">Multi-Stop Route Planning</option>
                      <option value="hotel-qr">Hotel Check-In & QR Passes</option>
                      <option value="flight-barcode">Flight Barcodes & Boarding</option>
                      <option value="reschedule">Trip Rescheduling / Change</option>
                      <option value="refund">Cancellation & Refunds</option>
                      <option value="general">General Traveler Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Message / Details *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-input no-icon"
                    style={{ height: 'auto', padding: '0.75rem 1rem', resize: 'vertical' }}
                    placeholder="Describe your question, flight changes, or layover request..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: 'var(--shadow-glow)' }}
                >
                  <Send size={18} />
                  <span>Submit Priority Support Ticket</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Global Office Hubs & Working Hours */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Global Offices Card */}
            <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: 'var(--radius-xl)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={20} style={{ color: 'var(--color-primary)' }} />
                Global Office Locations
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  {
                    city: 'New Delhi HQ (India)',
                    address: 'DLF Cyber City, Tower 10B, 8th Floor, Gurugram, Delhi NCR',
                    phone: '+91 11 4982 7100'
                  },
                  {
                    city: 'Dubai Hub (Middle East)',
                    address: 'Downtown Boulevard Plaza, Tower 2, Level 14, Dubai, UAE',
                    phone: '+971 4 391 8200'
                  },
                  {
                    city: 'Paris Office (Europe)',
                    address: 'Boulevard Saint-Germain, 6th Arrondissement, 75006 Paris, France',
                    phone: '+33 1 42 68 55 00'
                  }
                ].map((off, idx) => (
                  <div key={idx} style={{ paddingBottom: idx < 2 ? '1rem' : 0, borderBottom: idx < 2 ? '1px solid var(--border)' : 'none' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{off.city}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{off.address}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 700, marginTop: '0.2rem' }}>{off.phone}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Concierge Assurance Card */}
            <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.65rem' }}>
                <ShieldCheck size={22} style={{ color: 'var(--accent-text)' }} />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  GlobeTrotter Support Promise
                </h4>
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                ✓ Dedicated travel agents for in-transit flight delays<br />
                ✓ Instant hotel rebooking guarantees<br />
                ✓ Real-time barcode & e-ticket replacement
              </p>
            </div>

          </div>

        </div>

        {/* Frequently Asked Questions Accordion */}
        <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: 'var(--radius-xl)', marginBottom: '3rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            <span className="badge badge-accent" style={{ marginBottom: '0.4rem' }}>Self-Serve Assistance</span>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxWidth: '920px', margin: '0 auto' }}>
            {FAQS.map((faq, fIdx) => {
              const isOpen = expandedFaq === fIdx;

              return (
                <div
                  key={fIdx}
                  style={{
                    backgroundColor: 'var(--bg-page)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isOpen ? -1 : fIdx)}
                    style={{
                      width: '100%',
                      padding: '1.15rem 1.25rem',
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: 'var(--text-primary)',
                      fontWeight: 700,
                      fontSize: '0.95rem'
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={18} style={{ color: 'var(--color-primary)' }} /> : <ChevronDown size={18} style={{ color: 'var(--text-secondary)' }} />}
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: '0 1.25rem 1.25rem 1.25rem',
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      borderTop: '1px solid var(--border)',
                      paddingTop: '0.85rem'
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;
