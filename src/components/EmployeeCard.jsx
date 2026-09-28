import React from 'react';
import { 
  Phone, 
  MapPin, 
  Building2, 
  Eye, 
  Edit3, 
  Trash2, 
  Mail, 
  Home, 
  Compass,
  Sparkles
} from 'lucide-react';

export default function EmployeeCard({ employee, onEdit, onDelete, onView }) {
  const getDeptBadgeClass = (dept) => {
    switch (dept?.toLowerCase()) {
      case 'engineering': return 'badge-engineering';
      case 'human resources': return 'badge-hr';
      case 'finance': return 'badge-finance';
      case 'operations': return 'badge-operations';
      case 'design': return 'badge-design';
      case 'marketing': return 'badge-marketing';
      default: return 'badge-generic';
    }
  };

  const getInitials = (name) => {
    if (!name) return '??';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="glass-panel-interactive" style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      
      {/* Top Header Row */}
      <div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
          
          {/* Avatar & Identifiers */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: employee.avatarBg ? `linear-gradient(135deg, ${employee.avatarBg})` : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '1.1rem',
              color: '#ffffff',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.25)',
              position: 'relative'
            }}>
              {getInitials(employee.name)}
              <div 
                className={`status-dot ${employee.status === 'Active' ? 'status-dot-active' : employee.status === 'Remote' ? 'status-dot-remote' : 'status-dot-leave'}`}
                style={{
                  position: 'absolute',
                  bottom: '-2px',
                  right: '-2px',
                  border: '2px solid var(--bg-secondary)'
                }}
                title={`Status: ${employee.status || 'Active'}`}
              />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span style={{
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  color: 'var(--accent-cyan)',
                  background: 'rgba(6, 182, 212, 0.1)',
                  padding: '0.12rem 0.45rem',
                  borderRadius: '5px',
                  border: '1px solid rgba(6, 182, 212, 0.2)'
                }}>
                  {employee.id}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {employee.gender}
                </span>
              </div>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                margin: '0.2rem 0 0.1rem 0',
                letterSpacing: '-0.01em'
              }}>
                {employee.name}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                {employee.role || 'Enterprise Associate'}
              </p>
            </div>
          </div>

          {/* Department Badge */}
          <span className={`badge ${getDeptBadgeClass(employee.department)}`}>
            {employee.department}
          </span>
        </div>

        {/* Contact & Address Details */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.55rem',
          padding: '0.9rem',
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--card-border)',
          fontSize: '0.825rem',
          marginTop: '0.75rem'
        }}>
          {/* Phone */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)' }}>
            <Phone size={14} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-mono)' }}>{employee.phone}</span>
          </div>

          {/* Location / Local Address */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'var(--text-secondary)' }}>
            <MapPin size={14} style={{ color: 'var(--accent-pink)', marginTop: '2px', flexShrink: 0 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={employee.localAddress || employee.location}>
              {employee.location || employee.localAddress}
            </span>
          </div>

          {/* Permanent Address Tag */}
          {employee.permanentAddress && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
              <Home size={13} style={{ color: 'var(--accent-amber)', flexShrink: 0 }} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={employee.permanentAddress}>
                Perm: {employee.permanentAddress}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Card Action Footer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '1.25rem',
        paddingTop: '0.85rem',
        borderTop: '1px solid var(--card-border)'
      }}>
        {/* Status tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span style={{
            display: 'inline-block',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: employee.status === 'Active' ? '#10b981' : employee.status === 'Remote' ? '#06b6d4' : '#f59e0b'
          }} />
          <span>{employee.status || 'Active'}</span>
        </div>

        {/* Buttons: View Details, Edit, Delete */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <button
            onClick={() => onView(employee)}
            className="btn-icon"
            title="View Full Profile & Addresses"
            style={{ width: '32px', height: '32px' }}
          >
            <Eye size={15} />
          </button>

          <button
            onClick={() => onEdit(employee)}
            className="btn-icon"
            title="Edit Employee Information"
            style={{ width: '32px', height: '32px' }}
          >
            <Edit3 size={15} />
          </button>

          <button
            onClick={() => onDelete(employee.id)}
            className="btn-icon"
            title="Delete Record"
            style={{ width: '32px', height: '32px', color: '#f87171' }}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

    </div>
  );
}
