import React, { useState, useEffect } from 'react';
import { X, User, Mail, Shield, CheckCircle } from 'lucide-react';

export const UserModal = ({ isOpen, onClose, onSaveUser, editUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Traveler');
  const [status, setStatus] = useState('Active');

  useEffect(() => {
    if (editUser) {
      setName(editUser.name || '');
      setEmail(editUser.email || '');
      setRole(editUser.role || 'Traveler');
      setStatus(editUser.status || 'Active');
    } else {
      setName('');
      setEmail('');
      setRole('Traveler');
      setStatus('Active');
    }
  }, [editUser, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    onSaveUser({
      id: editUser ? editUser.id : `usr-${Date.now().toString().slice(-4)}`,
      name,
      email,
      role,
      status,
      joinedDate: editUser ? editUser.joinedDate : new Date().toISOString().split('T')[0],
      tripsCount: editUser ? editUser.tripsCount : 0,
      avatar: editUser ? editUser.avatar : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {editUser ? 'Edit User Credentials & Access' : 'Add New GlobeTrotter User'}
          </h3>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="user-modal-name">Full Name</label>
            <div className="form-input-wrapper">
              <User className="form-input-icon" size={18} />
              <input
                id="user-modal-name"
                type="text"
                className="form-input"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="user-modal-email">Email Address</label>
            <div className="form-input-wrapper">
              <Mail className="form-input-icon" size={18} />
              <input
                id="user-modal-email"
                type="email"
                className="form-input"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">System Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="form-input no-icon"
                style={{ cursor: 'pointer' }}
              >
                <option value="Traveler">Traveler</option>
                <option value="Admin">Admin</option>
                <option value="Guide">Guide</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Account Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="form-input no-icon"
                style={{ cursor: 'pointer' }}
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <CheckCircle size={16} />
              <span>{editUser ? 'Save Changes' : 'Create User'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
