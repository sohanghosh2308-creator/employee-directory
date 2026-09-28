import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Sun, 
  Moon, 
  Download, 
  RotateCcw,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function Navbar({
  totalCount,
  filteredCount,
  onOpenAddModal,
  onResetData,
  theme,
  onToggleTheme,
  onExportCSV
}) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="glass-header">
      <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px', gap: '1rem' }}>
        
        {/* Brand / Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)',
            color: '#ffffff'
          }}>
            <Users size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(to right, #6366f1, #c084fc, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
                SG Enterprise
              </h1>
              <span style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem', borderRadius: '6px', background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', fontWeight: 600, border: '1px solid rgba(99, 102, 241, 0.25)' }}>
                DIRECTORY v3.0
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
              Workforce Personnel Hub
            </p>
          </div>
        </div>

        {/* Center Live Badge */}
        <div style={{ display: 'none', alignItems: 'center', gap: '0.75rem' }} className="d-md-flex">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.85rem',
            borderRadius: '9999px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--card-border)',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)'
          }}>
            <div className="status-dot status-dot-active" />
            <span>Live Directory</span>
            <span style={{ color: 'var(--text-muted)' }}>•</span>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>{currentTime}</span>
          </div>
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Export CSV */}
          <button 
            onClick={onExportCSV}
            className="btn-secondary"
            title="Export filtered records to CSV"
            style={{ fontSize: '0.85rem', padding: '0.55rem 0.9rem' }}
          >
            <Download size={16} />
            <span style={{ display: 'none' }} className="d-sm-inline">Export CSV</span>
          </button>

          {/* Reset Demo Data */}
          <button
            onClick={onResetData}
            className="btn-secondary"
            title="Reset to default Assignment 3 sample dataset"
            style={{ fontSize: '0.85rem', padding: '0.55rem 0.9rem' }}
          >
            <RotateCcw size={16} />
            <span style={{ display: 'none' }} className="d-sm-inline">Reset</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="btn-icon"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} style={{ color: '#fbbf24' }} /> : <Moon size={18} style={{ color: '#6366f1' }} />}
          </button>

          {/* Add Employee Button */}
          <button
            onClick={onOpenAddModal}
            className="btn-primary"
            style={{ padding: '0.55rem 1.15rem' }}
          >
            <UserPlus size={18} />
            <span>Add Employee</span>
          </button>
        </div>

      </div>
    </header>
  );
}
