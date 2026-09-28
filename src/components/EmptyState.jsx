import React from 'react';
import { SearchX, Users, UserPlus, RotateCcw, FilterX } from 'lucide-react';

export default function EmptyState({
  type = 'no-results', // 'no-results' | 'directory-empty'
  searchTerm = '',
  selectedDept = 'All',
  onResetFilters,
  onResetData,
  onOpenAddModal
}) {
  if (type === 'directory-empty') {
    return (
      <div className="glass-panel" style={{
        padding: '3.5rem 2rem',
        textAlign: 'center',
        margin: '2rem 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '20px',
          background: 'rgba(99, 102, 241, 0.12)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent-primary)',
          marginBottom: '1.25rem'
        }}>
          <Users size={32} />
        </div>

        <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Employee Directory is Empty
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '420px', lineHeight: 1.5, marginBottom: '1.75rem' }}>
          All personnel records have been deleted from local state. You can restore the pre-populated sample dataset or create a new employee record.
        </p>

        <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={onResetData} className="btn-secondary">
            <RotateCcw size={16} />
            <span>Restore Sample Employees</span>
          </button>
          <button onClick={onOpenAddModal} className="btn-primary">
            <UserPlus size={16} />
            <span>Add First Employee</span>
          </button>
        </div>
      </div>
    );
  }

  // Type: 'no-results'
  return (
    <div className="glass-panel" style={{
      padding: '3.5rem 2rem',
      textAlign: 'center',
      margin: '2rem 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '20px',
        background: 'rgba(236, 72, 153, 0.12)',
        border: '1px solid rgba(236, 72, 153, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--accent-pink)',
        marginBottom: '1.25rem'
      }}>
        <SearchX size={32} />
      </div>

      <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
        No Matching Employees Found
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '420px', lineHeight: 1.5, marginBottom: '1.75rem' }}>
        No records match {searchTerm ? <span>search term <strong style={{ color: 'var(--text-primary)' }}>"{searchTerm}"</strong></span> : ''}
        {searchTerm && selectedDept !== 'All' ? ' in ' : ''}
        {selectedDept !== 'All' ? <span>department <strong style={{ color: 'var(--text-primary)' }}>"{selectedDept}"</strong></span> : ''}.
      </p>

      <button onClick={onResetFilters} className="btn-primary">
        <FilterX size={16} />
        <span>Clear Filters & Show All</span>
      </button>
    </div>
  );
}
