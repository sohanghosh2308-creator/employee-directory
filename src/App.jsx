import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  initialEmployeeData, 
  DEPARTMENTS, 
  GENDERS 
} from './data/initialEmployees';

// Components
import Navbar from './components/Navbar';
import StatsOverview from './components/StatsOverview';
import FilterBar from './components/FilterBar';
import EmployeeCard from './components/EmployeeCard';
import EmployeeTable from './components/EmployeeTable';
import EmployeeModal from './components/EmployeeModal';
import EmployeeDetailModal from './components/EmployeeDetailModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import EmptyState from './components/EmptyState';
import ToastContainer from './components/ToastContainer';

// Icons
import { Sparkles } from 'lucide-react';

export default function App() {
  // -------------------------------------------------------------
  // Core State Management Implementation (Matches Assignment Spec)
  // -------------------------------------------------------------
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('sg_employee_directory') || localStorage.getItem('nexus_employee_directory');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading saved employees', e);
      }
    }
    return initialEmployeeData;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  // Secondary Filter & UI States
  const [selectedGender, setSelectedGender] = useState('All');
  const [sortBy, setSortBy] = useState('id-asc');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [theme, setTheme] = useState('dark');
  const [toasts, setToasts] = useState([]);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [employeeToView, setEmployeeToView] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('sg_employee_directory', JSON.stringify(employees));
  }, [employees]);

  // Sync theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Toast notification helper
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // -------------------------------------------------------------
  // Core Handlers
  // -------------------------------------------------------------

  // Add Employee Handler (per specification: setEmployees([newEmp, ...employees]))
  const handleAddEmployee = (newEmp) => {
    setEmployees([newEmp, ...employees]);
    setIsModalOpen(false);
    addToast(`Employee ${newEmp.name} (${newEmp.id}) added successfully!`, 'success');

    // Trigger modern confetti effect
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#6366f1', '#a855f7', '#06b6d4', '#10b981']
      });
    } catch (e) {
      // ignore in non-browser environments
    }
  };

  // Edit Employee Handler
  const handleEditEmployee = (updatedEmp) => {
    setEmployees(employees.map(emp => emp.id === updatedEmp.id ? updatedEmp : emp));
    setIsModalOpen(false);
    setEmployeeToEdit(null);
    addToast(`Employee ${updatedEmp.name} updated successfully!`, 'info');
  };

  // Delete Employee Handler (per specification: setEmployees(employees.filter(e => e.id !== id)))
  const handleDelete = (id) => {
    const target = employees.find(e => e.id === id);
    setEmployees(employees.filter(e => e.id !== id));
    setEmployeeToDelete(null);
    addToast(`Record ${target ? target.name : id} deleted from directory.`, 'error');
  };

  // Reset to initial sample data
  const handleResetData = () => {
    setEmployees(initialEmployeeData);
    setSearchTerm('');
    setSelectedDept('All');
    setSelectedGender('All');
    addToast('Restored default Assignment 3 sample dataset.', 'info');
  };

  // Reset search and filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedDept('All');
    setSelectedGender('All');
    setSortBy('id-asc');
  };

  // Toggle dark/light theme
  const handleToggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredEmployees.length === 0) {
      addToast('No records to export!', 'error');
      return;
    }

    const headers = ["Employee ID", "Name", "Department", "Gender", "Phone", "Location", "Local Address", "Permanent Address", "Role", "Status"];
    const rows = filteredEmployees.map(emp => [
      `"${emp.id}"`,
      `"${emp.name}"`,
      `"${emp.department}"`,
      `"${emp.gender}"`,
      `"${emp.phone}"`,
      `"${emp.location || ''}"`,
      `"${emp.localAddress || ''}"`,
      `"${emp.permanentAddress || ''}"`,
      `"${emp.role || ''}"`,
      `"${emp.status || ''}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Employee_Directory_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast(`Exported ${filteredEmployees.length} records to CSV.`, 'success');
  };

  // Compute Next Default ID (e.g. EMP-105)
  const nextDefaultId = useMemo(() => {
    const nums = employees
      .map(e => parseInt(e.id.replace(/\D/g, ''), 10))
      .filter(n => !isNaN(n));
    const maxNum = nums.length > 0 ? Math.max(...nums) : 100;
    return `EMP-${maxNum + 1}`;
  }, [employees]);

  // -------------------------------------------------------------
  // Filtered List Computation (Matches Assignment Spec + Enhancements)
  // -------------------------------------------------------------
  const filteredEmployees = useMemo(() => {
    return employees
      .filter(emp => {
        const matchesSearch = 
          emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
        const matchesGender = selectedGender === 'All' || emp.gender === selectedGender;
        return matchesSearch && matchesDept && matchesGender;
      })
      .sort((a, b) => {
        if (sortBy === 'id-asc') return a.id.localeCompare(b.id, undefined, { numeric: true });
        if (sortBy === 'id-desc') return b.id.localeCompare(a.id, undefined, { numeric: true });
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
        if (sortBy === 'dept-asc') return a.department.localeCompare(b.department);
        return 0;
      });
  }, [employees, searchTerm, selectedDept, selectedGender, sortBy]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Dynamic Radial Gradient & Floating Orbs Ambient Backdrop */}
      <div className="ambient-background">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="ambient-grid" />
      </div>

      {/* Glassmorphic Sticky Header */}
      <Navbar
        totalCount={employees.length}
        filteredCount={filteredEmployees.length}
        onOpenAddModal={() => {
          setEmployeeToEdit(null);
          setIsModalOpen(true);
        }}
        onResetData={handleResetData}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onExportCSV={handleExportCSV}
      />

      {/* Main Content Area */}
      <main className="app-container" style={{ flex: 1, paddingBottom: '3rem' }}>
        
        {/* KPI Summary Cards */}
        <StatsOverview
          totalEmployees={employees.length}
          filteredCount={filteredEmployees.length}
          employees={employees}
        />

        {/* Real-time Filter & Search Toolbar */}
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedDept={selectedDept}
          setSelectedDept={setSelectedDept}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          filteredCount={filteredEmployees.length}
          totalCount={employees.length}
          onResetFilters={handleResetFilters}
        />

        {/* Conditional Rendering Section */}
        {employees.length === 0 ? (
          <EmptyState
            type="directory-empty"
            onResetData={handleResetData}
            onOpenAddModal={() => {
              setEmployeeToEdit(null);
              setIsModalOpen(true);
            }}
          />
        ) : filteredEmployees.length === 0 ? (
          <EmptyState
            type="no-results"
            searchTerm={searchTerm}
            selectedDept={selectedDept}
            onResetFilters={handleResetFilters}
          />
        ) : viewMode === 'grid' ? (
          /* Card Grid View with Glassmorphism */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2rem'
          }}>
            {filteredEmployees.map(emp => (
              <EmployeeCard
                key={emp.id}
                employee={emp}
                onView={(employee) => setEmployeeToView(employee)}
                onEdit={(employee) => {
                  setEmployeeToEdit(employee);
                  setIsModalOpen(true);
                }}
                onDelete={(id) => {
                  const target = employees.find(e => e.id === id);
                  setEmployeeToDelete(target);
                }}
              />
            ))}
          </div>
        ) : (
          /* Enterprise Table View */
          <EmployeeTable
            employees={filteredEmployees}
            onView={(employee) => setEmployeeToView(employee)}
            onEdit={(employee) => {
              setEmployeeToEdit(employee);
              setIsModalOpen(true);
            }}
            onDelete={(id) => {
              const target = employees.find(e => e.id === id);
              setEmployeeToDelete(target);
            }}
          />
        )}

      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '1.5rem',
        borderTop: '1px solid var(--card-border)',
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
        zIndex: 10,
        position: 'relative'
      }}>
        SG Enterprise Directory • Built with React 19, useState Hooks, and Modern Glassmorphism
      </footer>

      {/* Modals & Dialogs */}
      
      {/* Add / Edit Modal */}
      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEmployeeToEdit(null);
        }}
        onSubmit={(data, isEdit) => {
          if (isEdit) {
            handleEditEmployee(data);
          } else {
            handleAddEmployee(data);
          }
        }}
        employeeToEdit={employeeToEdit}
        nextDefaultId={nextDefaultId}
      />

      {/* Detail Profile Modal */}
      <EmployeeDetailModal
        isOpen={Boolean(employeeToView)}
        onClose={() => setEmployeeToView(null)}
        employee={employeeToView}
        onEdit={(emp) => {
          setEmployeeToView(null);
          setEmployeeToEdit(emp);
          setIsModalOpen(true);
        }}
        onDelete={(id) => {
          setEmployeeToView(null);
          const target = employees.find(e => e.id === id);
          setEmployeeToDelete(target);
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(employeeToDelete)}
        onClose={() => setEmployeeToDelete(null)}
        onConfirm={() => {
          if (employeeToDelete) {
            handleDelete(employeeToDelete.id);
          }
        }}
        employee={employeeToDelete}
      />

      {/* Interactive Toast Notifications */}
      <ToastContainer
        toasts={toasts}
        onDismiss={removeToast}
      />

    </div>
  );
}
