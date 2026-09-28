import React, { useEffect } from 'react';
import { 
  X, 
  Phone, 
  MapPin, 
  Mail, 
  Building2, 
  Calendar, 
  Edit3, 
  Trash2, 
  Home, 
  Compass, 
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function EmployeeDetailModal({
  isOpen,
  onClose,
  employee,
  onEdit,
  onDelete
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !employee) return null;

  const getInitials = (name) => {
    if (!name) return '??';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '2rem', maxWidth: '680px' }}
      >
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--accent-primary)',
              background: 'rgba(99, 102, 241, 0.1)',
              padding: '0.2rem 0.6rem',
              borderRadius: '6px',
              border: '1px solid rgba(99, 102, 241, 0.2)'
            }}>
              Personnel Record
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>
              {employee.id}
            </span>
          </div>

          <button onClick={onClose} className="btn-icon">
            <X size={18} />
          </button>
        </div>

        {/* Profile Card Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          padding: '1.5rem',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(168, 85, 247, 0.05))',
          border: '1px solid var(--card-border)',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1.6rem',
            color: '#ffffff',
            boxShadow: '0 8px 24px rgba(99, 102, 241, 0.35)',
            flexShrink: 0
          }}>
            {getInitials(employee.name)}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {employee.name}
              </h2>
              <span className={`badge ${getDeptBadgeClass(employee.department)}`}>
                {employee.department}
              </span>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0 0 0.4rem 0' }}>
              {employee.role || 'Enterprise Associate'}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <span>Gender: <strong style={{ color: 'var(--text-secondary)' }}>{employee.gender}</strong></span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span className={`status-dot ${employee.status === 'Active' ? 'status-dot-active' : employee.status === 'Remote' ? 'status-dot-remote' : 'status-dot-leave'}`} />
                Status: <strong style={{ color: 'var(--text-secondary)' }}>{employee.status || 'Active'}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          
          {/* Contact Details */}
          <div style={{
            padding: '1.15rem',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--card-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Contact Information
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.875rem' }}>
              <Phone size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Work Phone</div>
                <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{employee.phone}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.875rem' }}>
              <Mail size={16} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Corporate Email</div>
                <div style={{ color: 'var(--text-primary)' }}>{employee.email || `${employee.name.toLowerCase().replace(/\s+/g, '.')}@sgenterprise.com`}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.875rem' }}>
              <Calendar size={16} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Onboarding Date</div>
                <div style={{ color: 'var(--text-primary)' }}>{employee.joinDate || '2022-01-15'}</div>
              </div>
            </div>
          </div>

          {/* Addresses Card (Local & Permanent) */}
          <div style={{
            padding: '1.15rem',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--card-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Residential & Permanent Domicile
            </span>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.875rem' }}>
              <MapPin size={16} style={{ color: 'var(--accent-pink)', marginTop: '3px', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Local Residential Address</div>
                <div style={{ color: 'var(--text-primary)', lineHeight: 1.35 }}>
                  {employee.localAddress || employee.location}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.875rem' }}>
              <Home size={16} style={{ color: 'var(--accent-amber)', marginTop: '3px', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Permanent Domicile Address</div>
                <div style={{ color: 'var(--text-primary)', lineHeight: 1.35 }}>
                  {employee.permanentAddress || 'Not registered / Same as local'}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Skills & Competencies (if present) */}
        {employee.skills && employee.skills.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              Verified Core Competencies
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {employee.skills.map((skill, i) => (
                <span key={i} style={{
                  fontSize: '0.78rem',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--card-border)',
                  color: 'var(--text-secondary)'
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Modal Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--card-border)', paddingTop: '1.25rem' }}>
          <button
            onClick={() => {
              onClose();
              onDelete(employee.id);
            }}
            className="btn-danger"
            style={{ fontSize: '0.85rem' }}
          >
            <Trash2 size={16} />
            <span>Delete Employee</span>
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={onClose} className="btn-secondary">
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onEdit(employee);
              }}
              className="btn-primary"
            >
              <Edit3 size={16} />
              <span>Edit Record</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
