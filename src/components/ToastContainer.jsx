import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 200,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.65rem',
      maxWidth: '380px',
      width: '100%',
      pointerEvents: 'none'
    }}>
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isInfo = toast.type === 'info';

        return (
          <div
            key={toast.id}
            className="toast-enter glass-panel"
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.85rem 1rem',
              borderRadius: '12px',
              background: isSuccess 
                ? 'rgba(16, 185, 129, 0.15)' 
                : isError 
                  ? 'rgba(239, 68, 68, 0.15)' 
                  : 'rgba(99, 102, 241, 0.15)',
              border: `1px solid ${
                isSuccess 
                  ? 'rgba(16, 185, 129, 0.35)' 
                  : isError 
                    ? 'rgba(239, 68, 68, 0.35)' 
                    : 'rgba(99, 102, 241, 0.35)'
              }`,
              boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.4)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              {isSuccess && <CheckCircle2 size={18} style={{ color: '#34d399', flexShrink: 0 }} />}
              {isError && <AlertCircle size={18} style={{ color: '#f87171', flexShrink: 0 }} />}
              {isInfo && <Info size={18} style={{ color: '#818cf8', flexShrink: 0 }} />}
              <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                {toast.message}
              </span>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                padding: '4px',
                marginLeft: '0.5rem'
              }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
