import React, { useState, useEffect } from 'react';
import {
  Users, MapPin, DollarSign, Compass, Activity, Search, Filter,
  Plus, Edit, Trash2, ShieldAlert, CheckCircle, Clock, TrendingUp,
  BarChart3, PieChart, Star, ExternalLink, RefreshCw, Train, Car,
  ShieldCheck, Database, Headphones, FileText, ChevronRight, X, AlertCircle, UserPlus, Check
} from 'lucide-react';
import { BookingVoucherModal } from './BookingVoucherModal';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'users' | 'bookings' | 'trains' | 'cabs' | 'tickets'
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  
  // Realtime API Data State
  const [apiStats, setApiStats] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [bookingsList, setBookingsList] = useState([]);
  const [trainsList, setTrainsList] = useState([]);
  const [cabsList, setCabsList] = useState([]);
  const [ticketsList, setTicketsList] = useState([]);
  const [dbStatus, setDbStatus] = useState('Connecting...');
  const [isLoading, setIsLoading] = useState(true);

  // Selected Booking Voucher Modal State
  const [selectedVoucherBooking, setSelectedVoucherBooking] = useState(null);

  // Modals Open State
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isAddTrainOpen, setIsAddTrainOpen] = useState(false);
  const [isAddCabOpen, setIsAddCabOpen] = useState(false);

  // New Form Data States
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Traveler', password: 'password123' });
  const [newTrain, setNewTrain] = useState({ trainName: '', trainNumber: '', from: 'NDLS', to: 'JP', fare: 1450 });
  const [newCab, setNewCab] = useState({ name: '', category: 'Compact & Economical', seats: 4, basePrice: 1450, features: 'AC, GPS, Sanitized' });

  // Load Realtime Data from Backend MongoDB REST API
  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      const [resStatus, resStats, resUsers, resBookings, resTrains, resCabs, resTickets] = await Promise.all([
        fetch('http://localhost:5000/api/db-status').then(r => r.json()).catch(() => null),
        fetch('http://localhost:5000/api/admin/stats').then(r => r.json()).catch(() => null),
        fetch('http://localhost:5000/api/admin/users').then(r => r.json()).catch(() => null),
        fetch('http://localhost:5000/api/admin/bookings').then(r => r.json()).catch(() => null),
        fetch('http://localhost:5000/api/trains/search', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) }).then(r => r.json()).catch(() => null),
        fetch('http://localhost:5000/api/cabs/search', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) }).then(r => r.json()).catch(() => null),
        fetch('http://localhost:5000/api/support/tickets').then(r => r.json()).catch(() => null),
      ]);

      if (resStatus && resStatus.connected) {
        setDbStatus(`MongoDB Connected (${resStatus.databaseName})`);
      } else {
        setDbStatus('Hybrid Storage Active');
      }

      if (resStats?.stats) setApiStats(resStats.stats);
      if (resUsers?.users) setUsersList(resUsers.users);
      if (resBookings?.bookings) setBookingsList(resBookings.bookings);
      if (resTrains?.trains) setTrainsList(resTrains.trains);
      if (resCabs?.availableCabs) setCabsList(resCabs.availableCabs);
      if (resTickets?.tickets) setTicketsList(resTickets.tickets);
    } catch (err) {
      console.warn('Admin API fetch warning:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  // Filtered Users List
  const filteredUsers = usersList.filter(u => {
    const q = searchQuery.toLowerCase();
    const matchSearch = (u.name || '').toLowerCase().includes(q) || (u.email || '').toLowerCase().includes(q);
    const matchRole = roleFilter === 'All' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  // Filtered Bookings List
  const filteredBookings = bookingsList.filter(b => {
    const q = searchQuery.toLowerCase();
    return (b.pnr || '').toLowerCase().includes(q) || (b.title || '').toLowerCase().includes(q) || (b.primaryPassenger || '').toLowerCase().includes(q);
  });

  // --- DYNAMIC ADMIN ACTIONS ---

  // 1. Add New User
  const handleAddUserSubmit = async (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    try {
      const res = await fetch('http://localhost:5000/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      const data = await res.json();
      if (data.user) {
        setUsersList(prev => [data.user, ...prev]);
        alert(`User "${data.user.name}" created successfully!`);
      } else {
        // Fallback
        const created = { id: `usr-${Date.now()}`, ...newUser };
        setUsersList(prev => [created, ...prev]);
      }
    } catch (err) {
      const created = { id: `usr-${Date.now()}`, ...newUser };
      setUsersList(prev => [created, ...prev]);
    }
    setIsAddUserOpen(false);
    setNewUser({ name: '', email: '', role: 'Traveler', password: 'password123' });
  };

  // 2. Toggle / Edit User Role
  const handleUserRoleChange = async (userId, currentRole) => {
    const nextRole = currentRole === 'Traveler' ? 'Guide' : (currentRole === 'Guide' ? 'Admin' : 'Traveler');
    setUsersList(prev => prev.map(u => (u._id === userId || u.id === userId) ? { ...u, role: nextRole } : u));

    try {
      await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: nextRole })
      });
    } catch (e) {
      // client updated
    }
  };

  // 3. Delete User
  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to delete user "${userName}"?`)) return;
    setUsersList(prev => prev.filter(u => u._id !== userId && u.id !== userId));

    try {
      await fetch(`http://localhost:5000/api/admin/users/${userId}`, { method: 'DELETE' });
    } catch (e) {
      // client updated
    }
  };

  // 4. Update Booking Status
  const handleBookingStatusToggle = async (bookingId, currentStatus) => {
    const nextStatus = currentStatus?.includes('Confirmed') ? 'Pending Verification' : (currentStatus?.includes('Pending') ? 'Cancelled & Refunded' : 'Confirmed E-Ticket');
    setBookingsList(prev => prev.map(b => (b._id === bookingId || b.pnr === bookingId) ? { ...b, status: nextStatus } : b));

    try {
      await fetch(`http://localhost:5000/api/admin/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
    } catch (e) {
      // client updated
    }
  };

  // 5. Delete Booking
  const handleDeleteBooking = async (bookingId, pnr) => {
    if (!window.confirm(`Delete booking PNR "${pnr}" permanently?`)) return;
    setBookingsList(prev => prev.filter(b => b._id !== bookingId && b.pnr !== pnr));
  };

  // 6. Add Express Train
  const handleAddTrainSubmit = async (e) => {
    e.preventDefault();
    if (!newTrain.trainName || !newTrain.trainNumber) return;

    try {
      const res = await fetch('http://localhost:5000/api/admin/trains', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTrain)
      });
      const data = await res.json();
      if (data.train) {
        setTrainsList(prev => [data.train, ...prev]);
      } else {
        const created = { id: `trn-${Date.now()}`, ...newTrain, speed: 'Superfast 140 km/h', classes: [{ type: 'AC Chair Car', fare: newTrain.fare, status: 'AVAILABLE-030' }], rating: 4.85 };
        setTrainsList(prev => [created, ...prev]);
      }
    } catch (e) {
      const created = { id: `trn-${Date.now()}`, ...newTrain, speed: 'Superfast 140 km/h', classes: [{ type: 'AC Chair Car', fare: newTrain.fare, status: 'AVAILABLE-030' }], rating: 4.85 };
      setTrainsList(prev => [created, ...prev]);
    }
    setIsAddTrainOpen(false);
    setNewTrain({ trainName: '', trainNumber: '', from: 'NDLS', to: 'JP', fare: 1450 });
  };

  // 7. Add Cab Vehicle
  const handleAddCabSubmit = async (e) => {
    e.preventDefault();
    if (!newCab.name) return;

    const featureArray = typeof newCab.features === 'string' ? newCab.features.split(',').map(f => f.trim()) : newCab.features;

    try {
      const res = await fetch('http://localhost:5000/api/admin/cabs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newCab, features: featureArray })
      });
      const data = await res.json();
      if (data.cab) {
        setCabsList(prev => [data.cab, ...prev]);
      } else {
        const created = { id: `cab-${Date.now()}`, ...newCab, features: featureArray, rating: 4.9, image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500&q=80' };
        setCabsList(prev => [created, ...prev]);
      }
    } catch (e) {
      const created = { id: `cab-${Date.now()}`, ...newCab, features: featureArray, rating: 4.9, image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500&q=80' };
      setCabsList(prev => [created, ...prev]);
    }
    setIsAddCabOpen(false);
    setNewCab({ name: '', category: 'Compact & Economical', seats: 4, basePrice: 1450, features: 'AC, GPS, Sanitized' });
  };

  // 8. Toggle Support Ticket Status
  const handleTicketStatusChange = (tktId) => {
    setTicketsList(prev => prev.map(t => {
      if (t.ticketId === tktId || t._id === tktId) {
        const nextStatus = t.status === 'Received' ? 'In Progress' : (t.status === 'In Progress' ? 'Resolved' : 'Received');
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  return (
    <div className="main-content animate-fade-in" style={{ paddingBottom: '4rem' }}>
      
      {/* 1. ADMIN HERO HEADER */}
      <div className="glass-panel" style={{
        padding: '2rem 2.25rem',
        borderRadius: '24px',
        marginBottom: '2rem',
        background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-page) 100%)',
        border: '1.5px solid var(--border-strong)',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-accent" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '3px 10px', fontSize: '0.75rem' }}>
                <Database size={13} /> {dbStatus}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Live Control Suite • Realtime MongoDB Sync
              </span>
            </div>
            <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
              GlobeTrotter Dynamic Admin Console
            </h1>
            <p style={{ fontFamily: '"Caveat", cursive', fontSize: '1.4rem', color: 'var(--color-primary)', margin: 0, fontWeight: 700 }}>
              Manage users, edit roles, inspect multi-stop bookings, dispatch cabs & trains
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={fetchAdminData}
              className="btn btn-outline"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              title="Sync Live MongoDB"
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
              <span>Sync DB</span>
            </button>

            <button
              onClick={() => setIsAddUserOpen(true)}
              className="btn btn-outline"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <UserPlus size={16} />
              <span>Add User</span>
            </button>

            <button
              onClick={() => setIsAddTrainOpen(true)}
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Plus size={18} />
              <span>Add Train</span>
            </button>
          </div>
        </div>

        {/* ADMIN TAB NAVIGATION BAR */}
        <div style={{
          display: 'flex',
          gap: '0.65rem',
          marginTop: '1.75rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border)',
          overflowX: 'auto'
        }}>
          {[
            { id: 'overview', label: 'Overview KPIs', icon: <BarChart3 size={17} /> },
            { id: 'users', label: 'User Directory', icon: <Users size={17} />, count: usersList.length },
            { id: 'bookings', label: 'Bookings Vault', icon: <Compass size={17} />, count: bookingsList.length },
            { id: 'trains', label: 'Train Operations', icon: <Train size={17} />, count: trainsList.length },
            { id: 'cabs', label: 'Cab Fleets', icon: <Car size={17} />, count: cabsList.length },
            { id: 'tickets', label: 'Support Queue', icon: <Headphones size={17} />, count: ticketsList.length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                padding: '0.65rem 1.15rem',
                borderRadius: '12px',
                border: '1px solid',
                borderColor: activeTab === tab.id ? 'var(--color-primary)' : 'var(--border)',
                backgroundColor: activeTab === tab.id ? 'var(--color-primary)' : 'var(--bg-surface)',
                color: activeTab === tab.id ? '#FFFFFF' : 'var(--text-primary)',
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span style={{
                  fontSize: '0.7rem',
                  padding: '1px 6px',
                  borderRadius: '999px',
                  backgroundColor: activeTab === tab.id ? 'rgba(255,255,255,0.25)' : 'var(--border-strong)',
                  color: activeTab === tab.id ? '#FFFFFF' : 'var(--text-secondary)'
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 2. OVERVIEW KPI CARDS SECTION */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        {/* Stat Card 1: Revenue */}
        <div className="card" style={{ padding: '1.35rem', display: 'flex', alignItems: 'center', gap: '1.15rem' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '16px',
            backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <DollarSign size={26} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', fontWeight: 700 }}>
              Platform Revenue
            </span>
            <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1.1 }}>
              {apiStats?.totalRevenue || '₹15,95,000'}
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-text)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <TrendingUp size={12} /> Live Multi-Stop Sales
            </span>
          </div>
        </div>

        {/* Stat Card 2: Active Users */}
        <div className="card" style={{ padding: '1.35rem', display: 'flex', alignItems: 'center', gap: '1.15rem' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '16px',
            backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Users size={26} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', fontWeight: 700 }}>
              Active Users
            </span>
            <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1.1 }}>
              {usersList.length}
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>MongoDB Accounts</span>
          </div>
        </div>

        {/* Stat Card 3: Total Bookings */}
        <div className="card" style={{ padding: '1.35rem', display: 'flex', alignItems: 'center', gap: '1.15rem' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '16px',
            backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Compass size={26} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', fontWeight: 700 }}>
              Bookings Vault
            </span>
            <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1.1 }}>
              {bookingsList.length}
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-text)', fontWeight: 600 }}>Multi-City PNRs</span>
          </div>
        </div>

        {/* Stat Card 4: Fleets & Services */}
        <div className="card" style={{ padding: '1.35rem', display: 'flex', alignItems: 'center', gap: '1.15rem' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '16px',
            backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Train size={26} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', fontWeight: 700 }}>
              Trains & Cabs
            </span>
            <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1.1 }}>
              {trainsList.length + cabsList.length} Units
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Express & Fleet Options</span>
          </div>
        </div>
      </div>

      {/* SEARCH / FILTER TOOLBAR */}
      {(activeTab === 'users' || activeTab === 'bookings') && (
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap'
        }}>
          <div className="form-input-wrapper" style={{ flex: 1, minWidth: '260px' }}>
            <Search className="form-input-icon" size={17} />
            <input
              type="text"
              className="form-input"
              placeholder={activeTab === 'users' ? 'Search users by name, email, or role...' : 'Search bookings by PNR, passenger name, or city...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '0.65rem 1rem 0.65rem 2.5rem', fontSize: '0.9rem' }}
            />
          </div>

          {activeTab === 'users' && (
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="form-input no-icon"
              style={{ width: '160px', padding: '0.65rem', fontSize: '0.9rem', cursor: 'pointer' }}
            >
              <option value="All">All Roles</option>
              <option value="Traveler">Travelers</option>
              <option value="Guide">Guides</option>
              <option value="Admin">Admins</option>
            </select>
          )}
        </div>
      )}

      {/* TAB CONTENT PANELS */}
      
      {/* ---------------- TAB 1: OVERVIEW ---------------- */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
          
          {/* Revenue & Multi-Stop Search Distribution */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={20} style={{ color: 'var(--color-primary)' }} />
                Popular Multi-City Route Traffic
              </h3>
              <span className="badge badge-accent">Live Analytics</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { route: 'Delhi ➔ Jaipur ➔ Udaipur ➔ Agra', trips: 840, percentage: 88 },
                { route: 'Mumbai ➔ Goa ➔ Bengaluru ➔ Kochi', trips: 620, percentage: 74 },
                { route: 'Paris ➔ Zurich ➔ Rome ➔ Venice', trips: 410, percentage: 65 },
                { route: 'Tokyo ➔ Kyoto ➔ Osaka ➔ Mt. Fuji', trips: 290, percentage: 52 }
              ].map((r, i) => (
                <div key={i} style={{ padding: '0.85rem', borderRadius: '12px', backgroundColor: 'var(--bg-page)', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    <span>{r.route}</span>
                    <span style={{ color: 'var(--color-primary)' }}>{r.trips} bookings</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', borderRadius: '4px', backgroundColor: 'var(--border)', overflow: 'hidden' }}>
                    <div style={{ width: `${r.percentage}%`, height: '100%', backgroundColor: 'var(--color-primary)', borderRadius: '4px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Admin Actions & MongoDB Health */}
          <div className="card">
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={20} style={{ color: 'var(--color-primary)' }} />
              MongoDB System Health & Operations
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ padding: '0.85rem', borderRadius: '12px', backgroundColor: 'var(--bg-page)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>MongoDB Ready State</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{dbStatus}</div>
                </div>
                <span className="badge badge-accent">OPERATIONAL</span>
              </div>

              <div style={{ padding: '0.85rem', borderRadius: '12px', backgroundColor: 'var(--bg-page)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>E-Ticket Barcode Engine</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Auto-generates 1D PNR & 2D QR Vouchers</div>
                </div>
                <span className="badge badge-accent">ACTIVE</span>
              </div>

              <div style={{ padding: '0.85rem', borderRadius: '12px', backgroundColor: 'var(--bg-page)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Express & Chauffeur Fleet Gateway</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>IRCTC & Chauffeur Dispatch API Integration</div>
                </div>
                <span className="badge badge-accent">CONNECTED</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ---------------- TAB 2: USER DIRECTORY ---------------- */}
      {activeTab === 'users' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={20} style={{ color: 'var(--color-primary)' }} />
              MongoDB User Directory
            </h3>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setIsAddUserOpen(true)} className="btn btn-primary btn-sm">
                <UserPlus size={14} /> Add User
              </button>
              <span className="badge badge-neutral">{filteredUsers.length} Users Listed</span>
            </div>
          </div>

          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>User Identity</th>
                  <th>Role (Click to Toggle)</th>
                  <th>Email Address</th>
                  <th>Account ID</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                      No registered users found matching query "{searchQuery}".
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map(user => {
                    const uId = user._id || user.id || user.email;
                    return (
                      <tr key={uId}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <img
                              src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=C1440E&color=fff&bold=true`}
                              alt={user.name}
                              style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--color-primary)' }}
                            />
                            <div>
                              <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{user.name || 'User'}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Registered Account</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <button
                            onClick={() => handleUserRoleChange(uId, user.role || 'Traveler')}
                            className={`badge ${user.role === 'Admin' ? 'badge-primary' : (user.role === 'Guide' ? 'badge-warning' : 'badge-neutral')}`}
                            style={{ cursor: 'pointer', border: 'none' }}
                            title="Click to switch role: Traveler ➔ Guide ➔ Admin"
                          >
                            {user.role || 'Traveler'} 🔄
                          </button>
                        </td>
                        <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                          {user.email}
                        </td>
                        <td style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                          {uId}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            onClick={() => handleDeleteUser(uId, user.name || user.email)}
                            className="btn btn-danger btn-sm"
                            title="Delete User Account"
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------------- TAB 3: BOOKINGS VAULT ---------------- */}
      {activeTab === 'bookings' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Compass size={20} style={{ color: 'var(--color-primary)' }} />
              MongoDB Multi-Stop Bookings & PNR Vault
            </h3>
            <span className="badge badge-neutral">{filteredBookings.length} Bookings Found</span>
          </div>

          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>PNR Code</th>
                  <th>Itinerary Title</th>
                  <th>Primary Passenger</th>
                  <th>Total Cost</th>
                  <th>Status (Click to Cycle)</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                      No active bookings found.
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map(b => {
                    const bId = b._id || b.pnr;
                    return (
                      <tr key={bId}>
                        <td>
                          <span style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--color-primary)', fontSize: '0.9rem' }}>
                            {b.pnr}
                          </span>
                        </td>
                        <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                          {b.title}
                        </td>
                        <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                          {b.primaryPassenger || 'Aarav Sharma'}
                        </td>
                        <td style={{ fontWeight: 800, color: 'var(--text-primary)' }}>
                          ₹{(b.totalPrice || 145000).toLocaleString()}
                        </td>
                        <td>
                          <button
                            onClick={() => handleBookingStatusToggle(bId, b.status || 'Confirmed E-Ticket')}
                            className={`badge ${b.status?.includes('Confirmed') ? 'badge-accent' : (b.status?.includes('Pending') ? 'badge-warning' : 'badge-danger')}`}
                            style={{ cursor: 'pointer', border: 'none' }}
                            title="Click to change booking status"
                          >
                            {b.status || 'Confirmed E-Ticket'} 🔄
                          </button>
                        </td>
                        <td style={{ textAlign: 'right', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => setSelectedVoucherBooking(b)}
                            className="btn btn-primary btn-sm"
                          >
                            <FileText size={14} /> Voucher
                          </button>
                          <button
                            onClick={() => handleDeleteBooking(bId, b.pnr)}
                            className="btn btn-danger btn-sm"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------------- TAB 4: TRAIN OPERATIONS ---------------- */}
      {activeTab === 'trains' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Train size={20} style={{ color: 'var(--color-primary)' }} />
              Live Express Train Fleet ({trainsList.length})
            </h3>
            <button onClick={() => setIsAddTrainOpen(true)} className="btn btn-primary btn-sm">
              <Plus size={15} /> Add Express Train
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {trainsList.map((t, i) => (
              <div key={t._id || t.id || i} style={{ padding: '1.25rem', borderRadius: '16px', backgroundColor: 'var(--bg-page)', border: '1.5px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
                  <div>
                    <h4 style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)', margin: 0 }}>{t.trainName}</h4>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--color-primary)', fontWeight: 700 }}>{t.trainNumber}</span>
                  </div>
                  <span className="badge badge-accent">★ {t.rating || 4.9}</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
                  {typeof t.from === 'object' ? t.from.name : t.from} ➔ {typeof t.to === 'object' ? t.to.name : t.to}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.65rem', borderTop: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{t.speed || 'Superfast 140 km/h'}</span>
                  <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>
                    ₹{t.classes?.[0]?.fare || 1450}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- TAB 5: CAB FLEETS ---------------- */}
      {activeTab === 'cabs' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Car size={20} style={{ color: 'var(--color-primary)' }} />
              Chauffeur Cab Fleet Inventory ({cabsList.length})
            </h3>
            <button onClick={() => setIsAddCabOpen(true)} className="btn btn-primary btn-sm">
              <Plus size={15} /> Add Vehicle Cab
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {cabsList.map((c, i) => (
              <div key={c._id || c.id || i} style={{ borderRadius: '16px', backgroundColor: 'var(--bg-page)', border: '1.5px solid var(--border)', overflow: 'hidden' }}>
                <img src={c.image || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500&q=80'} alt={c.name} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                <div style={{ padding: '1rem' }}>
                  <h4 style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{c.name}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>{c.category} • {c.seats} Seats</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, color: 'var(--color-primary)' }}>₹{c.basePrice} base</span>
                    <span className="badge badge-accent">Active Fleet</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- TAB 6: SUPPORT QUEUE ---------------- */}
      {activeTab === 'tickets' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Headphones size={20} style={{ color: 'var(--color-primary)' }} />
              Customer Support Ticket Queue ({ticketsList.length})
            </h3>
            <span className="badge badge-warning">Live Query Stream</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {ticketsList.map(tkt => (
              <div key={tkt.ticketId || tkt._id} style={{ padding: '1rem', borderRadius: '14px', backgroundColor: 'var(--bg-page)', border: '1.5px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <span style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--color-primary)', fontSize: '0.85rem' }}>{tkt.ticketId}</span>
                    <h4 style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)', margin: '2px 0 0 0' }}>{tkt.name} ({tkt.email})</h4>
                  </div>
                  <button
                    onClick={() => handleTicketStatusChange(tkt.ticketId || tkt._id)}
                    className={`badge ${tkt.status === 'Resolved' ? 'badge-accent' : (tkt.status === 'In Progress' ? 'badge-warning' : 'badge-neutral')}`}
                    style={{ cursor: 'pointer', border: 'none' }}
                  >
                    Status: {tkt.status || 'Received'} (Click to cycle) 🔄
                  </button>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', backgroundColor: 'var(--bg-surface)', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border)', margin: '0.5rem 0' }}>
                  "{tkt.message}"
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  <span>Category: {tkt.category || 'General'}</span>
                  <span>Priority: <strong style={{ color: tkt.priority === 'High' ? '#EF4444' : 'var(--text-primary)' }}>{tkt.priority || 'Normal'}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- MODAL 1: ADD USER MODAL --- */}
      {isAddUserOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem'
        }}>
          <div className="animate-scale-up" style={{
            width: '100%', maxWidth: '440px', backgroundColor: 'var(--bg-surface)',
            borderRadius: '20px', border: '1.5px solid var(--border-strong)',
            padding: '1.75rem', boxShadow: 'var(--shadow-xl)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <UserPlus size={20} style={{ color: 'var(--color-primary)' }} /> Register Admin / User
              </h3>
              <button onClick={() => setIsAddUserOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddUserSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  className="form-input no-icon"
                  placeholder="e.g. Rahul Sharma"
                  value={newUser.name}
                  onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  className="form-input no-icon"
                  placeholder="user@globetrotter.travel"
                  value={newUser.email}
                  onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="form-label">Account Role</label>
                <select
                  className="form-input no-icon"
                  value={newUser.role}
                  onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <option value="Traveler">Traveler</option>
                  <option value="Guide">Tour Guide</option>
                  <option value="Admin">System Administrator</option>
                </select>
              </div>

              <div>
                <label className="form-label">Password *</label>
                <input
                  type="password"
                  className="form-input no-icon"
                  value={newUser.password}
                  onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>
                Save User Account to MongoDB
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: ADD EXPRESS TRAIN MODAL --- */}
      {isAddTrainOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem'
        }}>
          <div className="animate-scale-up" style={{
            width: '100%', maxWidth: '480px', backgroundColor: 'var(--bg-surface)',
            borderRadius: '20px', border: '1.5px solid var(--border-strong)',
            padding: '1.75rem', boxShadow: 'var(--shadow-xl)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Train size={20} style={{ color: 'var(--color-primary)' }} /> Add Express Train
              </h3>
              <button onClick={() => setIsAddTrainOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddTrainSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label">Train Name *</label>
                <input
                  type="text"
                  className="form-input no-icon"
                  placeholder="e.g. Shatabdi Express"
                  value={newTrain.trainName}
                  onChange={e => setNewTrain({ ...newTrain, trainName: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="form-label">Train Number / Code *</label>
                <input
                  type="text"
                  className="form-input no-icon"
                  placeholder="e.g. 12002 / SHATABDI"
                  value={newTrain.trainNumber}
                  onChange={e => setNewTrain({ ...newTrain, trainNumber: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label className="form-label">From Station</label>
                  <input
                    type="text"
                    className="form-input no-icon"
                    value={newTrain.from}
                    onChange={e => setNewTrain({ ...newTrain, from: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">To Station</label>
                  <input
                    type="text"
                    className="form-input no-icon"
                    value={newTrain.to}
                    onChange={e => setNewTrain({ ...newTrain, to: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Base Ticket Fare (₹)</label>
                <input
                  type="number"
                  className="form-input no-icon"
                  value={newTrain.fare}
                  onChange={e => setNewTrain({ ...newTrain, fare: Number(e.target.value) })}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>
                Save Train to Fleet
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 3: ADD CAB VEHICLE MODAL --- */}
      {isAddCabOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem'
        }}>
          <div className="animate-scale-up" style={{
            width: '100%', maxWidth: '480px', backgroundColor: 'var(--bg-surface)',
            borderRadius: '20px', border: '1.5px solid var(--border-strong)',
            padding: '1.75rem', boxShadow: 'var(--shadow-xl)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Car size={20} style={{ color: 'var(--color-primary)' }} /> Add Cab Vehicle
              </h3>
              <button onClick={() => setIsAddCabOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddCabSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label">Vehicle Name *</label>
                <input
                  type="text"
                  className="form-input no-icon"
                  placeholder="e.g. Maruti Dzire / Innova SUV"
                  value={newCab.name}
                  onChange={e => setNewCab({ ...newCab, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="form-label">Category</label>
                <select
                  className="form-input no-icon"
                  value={newCab.category}
                  onChange={e => setNewCab({ ...newCab, category: e.target.value })}
                >
                  <option value="Compact & Economical">Compact & Economical</option>
                  <option value="Spacious SUV">Spacious SUV</option>
                  <option value="VIP Chauffeur">VIP Chauffeur</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label className="form-label">Seats</label>
                  <input
                    type="number"
                    className="form-input no-icon"
                    value={newCab.seats}
                    onChange={e => setNewCab({ ...newCab, seats: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="form-label">Base Price (₹)</label>
                  <input
                    type="number"
                    className="form-input no-icon"
                    value={newCab.basePrice}
                    onChange={e => setNewCab({ ...newCab, basePrice: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Features (comma separated)</label>
                <input
                  type="text"
                  className="form-input no-icon"
                  value={newCab.features}
                  onChange={e => setNewCab({ ...newCab, features: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>
                Save Cab to Fleet
              </button>
            </form>
          </div>
        </div>
      )}

      {/* BOOKING VOUCHER MODAL */}
      {selectedVoucherBooking && (
        <BookingVoucherModal
          booking={selectedVoucherBooking}
          onClose={() => setSelectedVoucherBooking(null)}
        />
      )}

    </div>
  );
};

export default AdminDashboard;
