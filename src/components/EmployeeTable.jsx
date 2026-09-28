import React from 'react';
import { 
  Phone, 
  MapPin, 
  Eye, 
  Edit3, 
  Trash2, 
  Building2,
  Home
} from 'lucide-react';

export default function EmployeeTable({ employees, onEdit, onDelete, onView }) {
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
    <div className="glass-panel" style={{ overflowX: 'auto', marginBottom: '2rem' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '850px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--card-border)', background: 'rgba(255, 255, 255, 0.02)' }}>
            <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ID</th>
            <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Employee</th>
            <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Department</th>
            <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Gender</th>
            <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone</th>
            <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Location & Addresses</th>
            <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
            <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, idx) => (
            <tr 
              key={employee.id} 
              style={{ 
                borderBottom: idx === employees.length - 1 ? 'none' : '1px solid var(--card-border)',
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              
              {/* ID */}
              <td style={{ padding: '1rem 1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>
                {employee.id}
              </td>

              {/* Employee Name & Avatar */}
              <td style={{ padding: '1rem 1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    color: '#ffffff',
                    flexShrink: 0
                  }}>
                    {getInitials(employee.name)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.925rem' }}>
                      {employee.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {employee.role || employee.email}
                    </div>
                  </div>
                </div>
              </td>

              {/* Department */}
              <td style={{ padding: '1rem 1.25rem' }}>
                <span className={`badge ${getDeptBadgeClass(employee.department)}`}>
                  {employee.department}
                </span>
              </td>

              {/* Gender */}
              <td style={{ padding: '1rem 1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {employee.gender}
              </td>

              {/* Phone */}
              <td style={{ padding: '1rem 1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {employee.phone}
              </td>

              {/* Location & Address */}
              <td style={{ padding: '1rem 1.25rem', fontSize: '0.825rem', color: 'var(--text-secondary)', maxWidth: '240px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={employee.localAddress || employee.location}>
                  <MapPin size={13} style={{ color: 'var(--accent-pink)', flexShrink: 0 }} />
                  <span>{employee.location || employee.localAddress}</span>
                </div>
                {employee.permanentAddress && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={employee.permanentAddress}>
                    <Home size={12} style={{ color: 'var(--accent-amber)', flexShrink: 0 }} />
                    <span>{employee.permanentAddress}</span>
                  </div>
                )}
              </td>

              {/* Status */}
              <td style={{ padding: '1rem 1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <div className={`status-dot ${employee.status === 'Active' ? 'status-dot-active' : employee.status === 'Remote' ? 'status-dot-remote' : 'status-dot-leave'}`} />
                  <span>{employee.status || 'Active'}</span>
                </div>
              </td>

              {/* Actions */}
              <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <button
                    onClick={() => onView(employee)}
                    className="btn-icon"
                    title="View details"
                    style={{ width: '30px', height: '30px' }}
                  >
                    <Eye size={14} />
                  </button>
                  <button
                    onClick={() => onEdit(employee)}
                    className="btn-icon"
                    title="Edit record"
                    style={{ width: '30px', height: '30px' }}
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(employee.id)}
                    className="btn-icon"
                    title="Delete record"
                    style={{ width: '30px', height: '30px', color: '#f87171' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
