import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  employee
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !employee) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '440px', padding: '1.75rem', textAlign: 'center' }}
      >
        <div style={{
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          background: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#ef4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem auto'
        }}>
          <AlertTriangle size={28} />
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Delete Employee Record?
        </h3>

        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
          Are you sure you want to remove <strong style={{ color: 'var(--text-primary)' }}>{employee.name}</strong> (<span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>{employee.id}</span>)? This action is managed via React state and will delete the record immediately.
        </p>

        <div style={{
          display: 'flex',
          gap: '0.75rem',
          justifyContent: 'center'
        }}>
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
            style={{ flex: 1 }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="btn-danger"
            style={{ flex: 1 }}
          >
            <Trash2 size={16} />
            <span>Confirm Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
