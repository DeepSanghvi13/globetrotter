import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass, Globe, Sparkles, Award, ShieldCheck, Heart,
  Users, MapPin, Plane, Hotel, CheckCircle, ArrowRight,
  Zap, Star, Clock, Briefcase
} from 'lucide-react';

export const AboutUs = () => {
  const navigate = useNavigate();

  const PLATFORM_STATS = [
    { label: 'Multi-City Journeys Booked', value: '150,000+', icon: <Plane size={24} />, color: 'var(--color-primary)' },
    { label: 'Global & Domestic Airport Hubs', value: '19+ Hubs', icon: <Globe size={24} />, color: 'var(--accent-text)' },
    { label: 'Traveler Satisfaction Score', value: '4.98 / 5.0', icon: <Star size={24} />, color: 'var(--warning-text)' },
    { label: 'Instant Barcode & QR Verification', value: '99.9%', icon: <ShieldCheck size={24} />, color: 'var(--color-primary-hover)' }
  ];

  const CORE_VALUES = [
    {
      icon: <Sparkles size={26} />,
      title: 'MakeMyTrip-Grade Multi-Stop Power',
      desc: 'Connect 2 to 6+ cities into a singular, cohesive itinerary with smart layover calculations and automated bundle savings.'
    },
    {
      icon: <ShieldCheck size={26} />,
      title: 'Unified Digital Travel Passes',
      desc: 'No more switching between separate airline and hotel apps. Every leg includes a scannable 1D flight barcode and 2D hotel check-in QR code.'
    },
    {
      icon: <Hotel size={26} />,
      title: 'Curated 4★ & 5★ Accommodations',
      desc: 'Handpicked partner hotels at each stopover destination with verified ratings, free breakfast, and priority check-in guarantees.'
    },
    {
      icon: <Zap size={26} />,
      title: 'Real-Time Global Currency Engine',
      desc: 'Instant dynamic price conversion across INR, USD, EUR, and GBP with transparent tax itemization and zero hidden surcharges.'
    }
  ];

  const TEAM_MEMBERS = [
    {
      name: 'Aarav Sharma',
      role: 'Founder & Head of Product',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
      bio: 'Ex-Aviation strategist and avid traveler dedicated to making multi-destination journeys effortless.',
      badge: 'Product Visionary'
    },
    {
      name: 'Priya Iyer',
      role: 'VP of Global Hospitality & Stays',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
      bio: 'Over a decade curating luxury stopover hotel partnerships across Europe, Middle East, and Asia.',
      badge: 'Hospitality Lead'
    },
    {
      name: 'Rohan Mehta',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      bio: 'Architect of GlobeTrotter’s high-speed route optimization engine and digital e-ticket verification.',
      badge: 'Tech Architect'
    }
  ];

  return (
    <div className="traveler-homepage-container" style={{ padding: '2.5rem 1.5rem', minHeight: 'calc(100vh - 120px)' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        {/* Hero Section */}
        <div className="traveler-hero-banner" style={{ padding: '3rem 2.5rem', marginBottom: '3rem' }}>
          <div className="hero-glow-ambient" />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '820px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
              <span className="badge badge-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Award size={14} /> Redefining Global Travel Planning
              </span>
              <span className="hero-pill">
                <Compass size={14} style={{ color: 'var(--color-primary)' }} />
                <span>Born for Odoo Hackathon 2026</span>
              </span>
            </div>

            <h1 style={{
              fontSize: '2.75rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              marginBottom: '0.5rem'
            }}>
              Crafting Connected Journeys Across Continents 🌍
            </h1>

            <p className="handwritten-tag" style={{ margin: '0.35rem 0 1rem 0', fontSize: '1.75rem' }}>
              “From wanderlust dreams to seamless multi-stop journeys — travel without borders.”
            </p>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.65, maxWidth: '720px' }}>
              GlobeTrotter was founded to eliminate the friction of planning complex multi-destination trips. We unite flight routing, luxury stopover stays, curated experiences, and scannable boarding passes into one intuitive, MakeMyTrip-grade platform.
            </p>
          </div>
        </div>

        {/* Platform Milestones KPI Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
          {PLATFORM_STATS.map((kpi, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '1.75rem', borderRadius: 'var(--radius-xl)' }}>
              <div style={{
                color: kpi.color,
                backgroundColor: 'var(--bg-page)',
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                border: '1px solid var(--border)'
              }}>
                {kpi.icon}
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>{kpi.value}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '0.25rem' }}>
                {kpi.label}
              </div>
            </div>
          ))}
        </div>

        {/* What Sets Us Apart */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 2.5rem auto' }}>
            <span className="badge badge-accent" style={{ marginBottom: '0.5rem' }}>Why Travelers Choose GlobeTrotter</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Built from the Ground Up for Multi-City Travelers
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Every feature is engineered to simplify complex logistics and elevate your journey.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
            {CORE_VALUES.map((item, i) => (
              <div
                key={i}
                className="glass-panel"
                style={{
                  padding: '2rem',
                  borderRadius: 'var(--radius-xl)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{
                  color: 'var(--color-primary)',
                  backgroundColor: 'var(--bg-page)',
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                  border: '1px solid var(--border)'
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4-Step Journey Blueprint */}
        <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: 'var(--radius-xl)', marginBottom: '3.5rem' }}>
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <span className="badge badge-warning" style={{ marginBottom: '0.4rem' }}>How It Works</span>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              The 4-Step MakeMyTrip Multi-Stop Experience
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {[
              { step: '01', title: 'Pick Your City Stops', desc: 'Add 2 to 6+ domestic or global airport stops with desired layover nights.' },
              { step: '02', title: 'Compare Flights & Stays', desc: 'Browse airlines, meal inclusions, baggage, and verified 4★/5★ hotels.' },
              { step: '03', title: 'Add Sightseeing Passes', desc: 'Attach VIP attraction passes and curated city tours with 1-click toggles.' },
              { step: '04', title: 'Get Barcode E-Tickets', desc: 'Download your unified pass with flight barcodes & hotel check-in QR codes.' }
            ].map((st, sIdx) => (
              <div key={sIdx} style={{
                backgroundColor: 'var(--bg-page)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                position: 'relative'
              }}>
                <div style={{
                  fontSize: '1.85rem',
                  fontWeight: 900,
                  color: 'var(--color-primary)',
                  fontFamily: 'monospace',
                  marginBottom: '0.5rem',
                  opacity: 0.8
                }}>
                  {st.step}
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  {st.title}
                </h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership & Team Section */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            <span className="badge badge-accent" style={{ marginBottom: '0.5rem' }}>Passionate Team</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Meet the Visionaries Behind GlobeTrotter
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Engineers, hospitality veterans, and wanderlust explorers building the future of travel.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem' }}>
            {TEAM_MEMBERS.map((member, mIdx) => (
              <div
                key={mIdx}
                className="glass-panel"
                style={{
                  padding: '2rem',
                  borderRadius: 'var(--radius-xl)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid var(--color-primary)',
                    marginBottom: '1rem',
                    boxShadow: 'var(--shadow-md)'
                  }}
                />
                <span className="badge badge-accent" style={{ fontSize: '0.7rem', marginBottom: '0.4rem' }}>
                  {member.badge}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                  {member.name}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '0.75rem' }}>
                  {member.role}
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Ready to Explore CTA Bar */}
        <div className="glass-panel" style={{
          padding: '2.5rem',
          borderRadius: 'var(--radius-xl)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          border: '1px solid var(--border-strong)',
          background: 'linear-gradient(135deg, rgba(244, 238, 229, 0.9) 0%, rgba(251, 248, 244, 0.8) 100%)'
        }}>
          <div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
              Ready to Plan Your Multi-City Adventure? ✈️
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
              Build dynamic stops, compare flights, bundle hotels, and download verified e-tickets in minutes.
            </p>
          </div>

          <button
            onClick={() => navigate('/dashboard')}
            className="btn btn-primary btn-lg"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: 'var(--shadow-glow)' }}
          >
            <span>Launch Multi-City Planner</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
