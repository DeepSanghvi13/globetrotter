import React from 'react';
import {
  Sparkles, ArrowRight, Heart, Star,
  Navigation, Award, Tag
} from 'lucide-react';
import { CURATED_MULTI_STOP_PACKAGES, CURRENCIES } from '../data/multiStopData';

export const MultiStopPackages = ({
  onSelectPackage,
  currency,
  savedFavorites,
  onToggleFavorite
}) => {
  const currSym = CURRENCIES[currency]?.symbol || '₹';
  const currRate = CURRENCIES[currency]?.rate || 1;

  const formatPrice = (inr) => `${currSym}${Math.round(inr * currRate).toLocaleString()}`;

  return (
    <div style={{ marginBottom: '3.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="badge badge-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Award size={13} /> MakeMyTrip Signature Holidays
            </span>
            <span className="badge badge-warning" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Tag size={13} /> Multi-Stop Bundle Savings
            </span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={24} style={{ color: 'var(--color-primary)' }} />
            Curated Multi-City Holiday Packages
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            All-inclusive multi-destination journeys with flights, 4★/5★ luxury stays, transfers & curated sightseeing.
          </p>
        </div>
      </div>

      {/* Package Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
        {CURATED_MULTI_STOP_PACKAGES.map((pkg) => {
          const isFav = savedFavorites.includes(pkg.id);

          return (
            <div
              key={pkg.id}
              className="glass-panel"
              style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                padding: 0,
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-md)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
            >
              {/* Image Banner */}
              <div style={{ position: 'relative', height: '190px', overflow: 'hidden' }}>
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                
                {/* Floating Badges */}
                <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', gap: '0.4rem' }}>
                  <span className="badge badge-accent" style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(220, 252, 231, 0.94)' }}>
                    {pkg.tag}
                  </span>
                  <span className="badge badge-warning" style={{ backdropFilter: 'blur(8px)' }}>
                    {pkg.badge}
                  </span>
                </div>

                {/* Favorite Heart Button */}
                <button
                  type="button"
                  onClick={() => onToggleFavorite(pkg.id)}
                  aria-label="Save to favorites"
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '0.75rem',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.92)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)',
                    color: isFav ? '#EF4444' : '#78716C',
                    transition: 'transform 0.15s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <Heart size={18} fill={isFav ? '#EF4444' : 'none'} />
                </button>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#D97706', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  <Star size={14} fill="#D97706" />
                  <span>{pkg.rating}</span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  {pkg.title}
                </h3>

                {/* Route Path */}
                <div style={{
                  fontSize: '0.825rem',
                  color: 'var(--color-primary)',
                  fontWeight: 700,
                  marginBottom: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}>
                  <Navigation size={14} />
                  <span>{pkg.route}</span>
                </div>

                {/* Highlights List */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                  {pkg.highlights.map((h, i) => (
                    <span key={i} style={{
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

                {/* Footer Action & Price */}
                <div style={{
                  marginTop: 'auto',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{pkg.duration}</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                      {formatPrice(pkg.basePriceINR)} <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>/ person</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectPackage(pkg)}
                    className="btn btn-primary btn-sm"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.5rem 0.9rem'
                    }}
                  >
                    <span>Customize & Book</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
