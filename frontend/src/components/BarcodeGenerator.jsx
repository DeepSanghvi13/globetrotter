import React from 'react';
import { QrCode, Scan, ShieldCheck, CheckCircle, Hotel } from 'lucide-react';

/**
 * Generates an SVG 1D aviation-style barcode (Code-128 aesthetic)
 */
export const FlightBarcode = ({
  ticketNumber = 'ETKT 098-7712398412',
  pnr = 'GT-94821',
  passenger = 'AARAV SHARMA',
  flightNumber = 'AI-502',
  seat = '14A',
  gate = 'B22'
}) => {
  // Generate consistent bar widths from ticket string
  const generateBars = (seedStr) => {
    const bars = [];
    let isBar = true;
    for (let i = 0; i < seedStr.length; i++) {
      const code = seedStr.charCodeAt(i);
      const width = (code % 3) + 1.2;
      bars.push({ width, isBar });
      isBar = !isBar;
    }
    // Add standard framing sync bars
    const fixedPattern = [2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1, 2, 1, 3, 1, 2, 1, 2, 3, 1, 1, 2, 3, 2, 1, 3, 1, 2, 1, 3, 2, 1, 2, 1, 3, 1, 2, 1, 3, 2];
    return fixedPattern.map((w, idx) => ({ width: w * 1.6, isBar: idx % 2 === 0 }));
  };

  const pattern = generateBars(ticketNumber + pnr);

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      color: '#1C1917',
      padding: '1rem 1.25rem',
      borderRadius: 'var(--radius-md)',
      border: '1.5px dashed #D8CCC0',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
      width: '100%',
      maxWidth: '480px',
      margin: '0 auto'
    }}>
      {/* Flight & Kiosk Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        fontSize: '0.725rem',
        fontWeight: 700,
        letterSpacing: '0.04em',
        color: '#44403C',
        textTransform: 'uppercase',
        borderBottom: '1px solid #E7E1DB',
        paddingBottom: '0.35rem'
      }}>
        <span>Flight: <strong>{flightNumber}</strong></span>
        <span>Seat: <strong>{seat}</strong></span>
        <span>Gate: <strong>{gate}</strong></span>
        <span style={{ color: '#166534', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
          <CheckCircle size={12} /> Kiosk Ready
        </span>
      </div>

      {/* SVG 1D Barcode Graphic */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', overflow: 'hidden', padding: '0.35rem 0' }}>
        <svg
          viewBox="0 0 360 48"
          style={{ width: '100%', height: '48px', maxWidth: '340px' }}
          preserveAspectRatio="none"
        >
          {pattern.map((bar, i) => {
            let xOffset = 0;
            for (let j = 0; j < i; j++) {
              xOffset += pattern[j].width + 1.2;
            }
            return bar.isBar ? (
              <rect
                key={i}
                x={xOffset + 8}
                y={0}
                width={bar.width}
                height={48}
                fill="#1C1917"
              />
            ) : null;
          })}
        </svg>
      </div>

      {/* Barcode Number & Passenger String */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        fontSize: '0.75rem',
        fontFamily: 'monospace',
        fontWeight: 700,
        color: '#1C1917',
        letterSpacing: '0.08em'
      }}>
        <span>{ticketNumber}</span>
        <span style={{ fontSize: '0.7rem', color: '#78716C' }}>PNR: {pnr}</span>
      </div>
    </div>
  );
};

/**
 * Generates a styled 2D QR Code SVG matrix for Hotel check-ins
 */
export const HotelCheckinQRCode = ({
  confirmationId = 'HTL-CONF-PAR-4821',
  hotelName = 'Grand Palace Hotel',
  guestName = 'Aarav Sharma',
  roomType = 'Deluxe King Room',
  checkInDate = 'Sep 15, 2026',
  checkOutDate = 'Sep 18, 2026',
  size = 140
}) => {
  // Generate deterministic QR grid matrix
  const gridSize = 21;
  const generateMatrix = (seedStr) => {
    const matrix = Array(gridSize).fill(null).map(() => Array(gridSize).fill(false));

    // Fill standard 3 corner finder patterns (7x7)
    const setFinder = (startX, startY) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          if (
            r === 0 || r === 6 || c === 0 || c === 6 ||
            (r >= 2 && r <= 4 && c >= 2 && c <= 4)
          ) {
            matrix[startY + r][startX + c] = true;
          }
        }
      }
    };

    setFinder(0, 0); // Top-left
    setFinder(gridSize - 7, 0); // Top-right
    setFinder(0, gridSize - 7); // Bottom-left

    // Seed pseudorandom data modules
    let hash = 0;
    for (let i = 0; i < seedStr.length; i++) {
      hash = ((hash << 5) - hash) + seedStr.charCodeAt(i);
      hash |= 0;
    }

    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        // Skip corner finder zones
        if ((r < 8 && c < 8) || (r < 8 && c >= gridSize - 8) || (r >= gridSize - 8 && c < 8)) {
          continue;
        }
        // Center icon zone (3x3)
        if (r >= 9 && r <= 11 && c >= 9 && c <= 11) {
          matrix[r][c] = false;
          continue;
        }
        const pseudoVal = Math.sin((r * gridSize + c) * 45.23 + hash) * 10000;
        matrix[r][c] = (pseudoVal - Math.floor(pseudoVal)) > 0.46;
      }
    }
    return matrix;
  };

  const matrix = generateMatrix(confirmationId + hotelName);
  const cellSize = size / gridSize;

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 'var(--radius-lg)',
      padding: '1.25rem',
      border: '1px solid #D8CCC0',
      boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.75rem',
      color: '#1C1917',
      maxWidth: '300px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.35rem',
        fontSize: '0.75rem',
        fontWeight: 800,
        color: 'var(--color-primary)',
        textTransform: 'uppercase',
        letterSpacing: '0.04em'
      }}>
        <Hotel size={14} /> Express Hotel Check-In
      </div>

      {/* Scalable QR Matrix */}
      <div style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        padding: '6px',
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        border: '1px solid #E7E1DB'
      }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {matrix.map((row, r) =>
            row.map((val, c) =>
              val ? (
                <rect
                  key={`${r}-${c}`}
                  x={c * cellSize}
                  y={r * cellSize}
                  width={cellSize}
                  height={cellSize}
                  fill="#1C1917"
                />
              ) : null
            )
          )}
        </svg>

        {/* Center Hotel Icon Overlay */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '26px',
          height: '26px',
          backgroundColor: '#FFFFFF',
          borderRadius: '50%',
          border: '2px solid var(--color-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-primary)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
        }}>
          <Hotel size={14} />
        </div>
      </div>

      {/* Confirmation ID & Details */}
      <div style={{ width: '100%' }}>
        <div style={{
          fontSize: '0.85rem',
          fontWeight: 800,
          fontFamily: 'monospace',
          color: '#1C1917',
          letterSpacing: '0.08em',
          backgroundColor: '#F4EEE5',
          padding: '0.25rem 0.5rem',
          borderRadius: '4px',
          marginBottom: '0.35rem'
        }}>
          {confirmationId}
        </div>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1C1917' }}>{hotelName}</div>
        <div style={{ fontSize: '0.725rem', color: '#78716C' }}>Guest: {guestName} • {roomType}</div>
        <div style={{ fontSize: '0.7rem', color: '#166534', fontWeight: 700, marginTop: '0.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}>
          <ShieldCheck size={12} /> Instant Key Verification Verified
        </div>
      </div>
    </div>
  );
};
