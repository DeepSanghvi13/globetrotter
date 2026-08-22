import React from 'react';
import { X, Calendar, DollarSign, MapPin, User, Tag, PieChart } from 'lucide-react';

export const TripDetailsModal = ({ isOpen, onClose, trip }) => {
  if (!isOpen || !trip) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fade-in" style={{ maxWidth: '640px' }}>
        {/* Cover Image Header */}
        <div style={{
          position: 'relative',
          height: '180px',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          marginBottom: '1.25rem'
        }}>
          <img
            src={trip.coverImage}
            alt={trip.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '1.25rem'
          }}>
            <h3 style={{ color: '#FFFFFF', fontSize: '1.4rem', fontWeight: 800 }}>{trip.name}</h3>
          </div>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Trip Summary Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Trip Owner</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem', color: 'var(--text-primary)', fontWeight: 600 }}>
              <User size={16} style={{ color: 'var(--color-primary)' }} />
              <span>{trip.owner}</span>
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Travel Dates</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem', color: 'var(--text-primary)', fontWeight: 600 }}>
              <Calendar size={16} style={{ color: 'var(--color-primary)' }} />
              <span>{trip.startDate} to {trip.endDate}</span>
            </div>
          </div>
        </div>

        {/* Destinations List */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Stops & Destinations ({trip.citiesCount})</span>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            {trip.destinations.map((dest, i) => (
              <span key={i} className="badge badge-neutral" style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}>
                <MapPin size={14} style={{ color: 'var(--color-primary)' }} />
                {dest}
              </span>
            ))}
          </div>
        </div>

        {/* Financial Breakdown */}
        <div style={{
          backgroundColor: 'var(--bg-page)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          border: '1px solid var(--border-strong)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <PieChart size={18} style={{ color: 'var(--color-primary)' }} />
              Budget Breakdown
            </span>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-primary)' }}>
              ${trip.estimatedBudget.toLocaleString()}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Transport</span>
              <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>${trip.breakdown.transport}</p>
            </div>
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Stay</span>
              <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>${trip.breakdown.stay}</p>
            </div>
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Activities</span>
              <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>${trip.breakdown.activities}</p>
            </div>
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Meals</span>
              <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>${trip.breakdown.meals}</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
          <button onClick={onClose} className="btn btn-primary">
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
