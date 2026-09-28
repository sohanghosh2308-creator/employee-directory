import React, { useRef, useEffect } from 'react';
import { 
  Search, 
  X, 
  Filter, 
  LayoutGrid, 
  Table as TableIcon, 
  ArrowUpDown, 
  Users,
  Sparkles
} from 'lucide-react';
import { DEPARTMENTS } from '../data/initialEmployees';

export default function FilterBar({
  searchTerm,
  setSearchTerm,
  selectedDept,
  setSelectedDept,
  selectedGender,
  setSelectedGender,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  filteredCount,
  totalCount,
  onResetFilters
}) {
  const searchInputRef = useRef(null);

  // Global keyboard shortcut: Ctrl+K or / to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === '/' && document.activeElement !== searchInputRef.current && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const hasActiveFilters = searchTerm !== '' || selectedDept !== 'All' || selectedGender !== 'All' || sortBy !== 'id-asc';

  return (
    <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.75rem' }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        
        {/* Search Bar */}
        <div style={{ flex: '1 1 280px', position: 'relative', minWidth: '240px' }}>
          <Search 
            size={18} 
            style={{ 
              position: 'absolute', 
              left: '0.85rem', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: 'var(--text-muted)' 
            }} 
          />
          <input
            ref={searchInputRef}
            type="text"
            className="glass-input"
            style={{ 
              width: '100%', 
              paddingLeft: '2.5rem', 
              paddingRight: searchTerm ? '4.8rem' : '3.8rem' 
            }}
            placeholder="Search by name or employee ID (e.g. EMP-101)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm ? (
            <button
              onClick={() => setSearchTerm('')}
              style={{
                position: 'absolute',
                right: '2.6rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '4px'
              }}
              title="Clear search"
            >
              <X size={15} />
            </button>
          ) : null}
          <div style={{
            position: 'absolute',
            right: '0.65rem',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            fontSize: '0.68rem',
            fontFamily: 'var(--font-mono)',
            padding: '0.15rem 0.4rem',
            borderRadius: '4px',
            background: 'rgba(255, 255, 255, 0.08)',
            color: 'var(--text-muted)',
            border: '1px solid var(--card-border)'
          }}>
            Ctrl K
          </div>
        </div>

        {/* Filter Controls Row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
          
          {/* Department Filter */}
          <div style={{ position: 'relative' }}>
            <select
              className="glass-select"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              title="Filter by Department"
            >
              <option value="All">All Departments</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Gender Filter */}
          <div style={{ position: 'relative' }}>
            <select
              className="glass-select"
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              title="Filter by Gender"
            >
              <option value="All">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
            </select>
          </div>

          {/* Sort Selector */}
          <div style={{ position: 'relative' }}>
            <select
              className="glass-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              title="Sort Records"
            >
              <option value="id-asc">Sort: ID (Low to High)</option>
              <option value="id-desc">Sort: ID (High to Low)</option>
              <option value="name-asc">Sort: Name (A - Z)</option>
              <option value="name-desc">Sort: Name (Z - A)</option>
              <option value="dept-asc">Sort: Department</option>
            </select>
          </div>

          {/* View Mode Toggle: Grid vs Table */}
          <div style={{
            display: 'flex',
            background: 'var(--input-bg)',
            border: '1px solid var(--input-border)',
            borderRadius: '10px',
            padding: '3px'
          }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '34px',
                height: '32px',
                borderRadius: '7px',
                border: 'none',
                background: viewMode === 'grid' ? 'var(--accent-primary)' : 'transparent',
                color: viewMode === 'grid' ? '#ffffff' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              title="Card Grid View"
            >
              <LayoutGrid size={17} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '34px',
                height: '32px',
                borderRadius: '7px',
                border: 'none',
                background: viewMode === 'table' ? 'var(--accent-primary)' : 'transparent',
                color: viewMode === 'table' ? '#ffffff' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              title="Data Table View"
            >
              <TableIcon size={17} />
            </button>
          </div>

          {/* Reset Filters button if any active */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="btn-secondary"
              style={{ padding: '0.6rem 0.85rem', fontSize: '0.825rem' }}
              title="Reset all search & filter options"
            >
              <X size={14} />
              <span>Clear</span>
            </button>
          )}

        </div>
      </div>

      {/* Live Active Filter Summary Strip */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '1rem',
        paddingTop: '0.85rem',
        borderTop: '1px solid var(--card-border)',
        fontSize: '0.825rem',
        color: 'var(--text-secondary)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--text-muted)' }}>Showing:</span>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            color: 'var(--accent-primary)',
            fontWeight: 600,
            fontFamily: 'var(--font-mono)'
          }}>
            <Users size={13} />
            {filteredCount} of {totalCount} Employees
          </span>

          {selectedDept !== 'All' && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.2rem 0.55rem',
              borderRadius: '6px',
              background: 'rgba(168, 85, 247, 0.12)',
              border: '1px solid rgba(168, 85, 247, 0.25)',
              color: 'var(--accent-secondary)'
            }}>
              Dept: {selectedDept}
              <button 
                onClick={() => setSelectedDept('All')}
                style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex' }}
              >
                <X size={12} />
              </button>
            </span>
          )}

          {searchTerm && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.2rem 0.55rem',
              borderRadius: '6px',
              background: 'rgba(6, 182, 212, 0.12)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              color: 'var(--accent-cyan)'
            }}>
              Query: "{searchTerm}"
              <button 
                onClick={() => setSearchTerm('')}
                style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex' }}
              >
                <X size={12} />
              </button>
            </span>
          )}
        </div>

        <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
          Real-time input filtering active
        </div>
      </div>
    </div>
  );
}
