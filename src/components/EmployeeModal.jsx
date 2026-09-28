import React, { useState, useEffect } from 'react';
import { 
  X, 
  UserPlus, 
  Check, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Briefcase, 
  Home, 
  User,
  AlertCircle
} from 'lucide-react';
import { DEPARTMENTS, GENDERS } from '../data/initialEmployees';

export default function EmployeeModal({
  isOpen,
  onClose,
  onSubmit,
  employeeToEdit,
  nextDefaultId
}) {
  const isEdit = Boolean(employeeToEdit);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    department: 'Engineering',
    gender: 'Male',
    phone: '',
    location: '',
    localAddress: '',
    permanentAddress: '',
    role: '',
    email: '',
    status: 'Active'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employeeToEdit) {
      setFormData({
        id: employeeToEdit.id || '',
        name: employeeToEdit.name || '',
        department: employeeToEdit.department || 'Engineering',
        gender: employeeToEdit.gender || 'Male',
        phone: employeeToEdit.phone || '',
        location: employeeToEdit.location || '',
        localAddress: employeeToEdit.localAddress || employeeToEdit.location || '',
        permanentAddress: employeeToEdit.permanentAddress || '',
        role: employeeToEdit.role || '',
        email: employeeToEdit.email || '',
        status: employeeToEdit.status || 'Active'
      });
    } else {
      setFormData({
        id: nextDefaultId || `EMP-${Math.floor(100 + Math.random() * 900)}`,
        name: '',
        department: 'Engineering',
        gender: 'Male',
        phone: '',
        location: '',
        localAddress: '',
        permanentAddress: '',
        role: '',
        email: '',
        status: 'Active'
      });
    }
    setErrors({});
  }, [employeeToEdit, isOpen, nextDefaultId]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.id.trim()) newErrors.id = 'Employee ID is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.localAddress.trim()) newErrors.localAddress = 'Local residential address is required';
    if (!formData.permanentAddress.trim()) newErrors.permanentAddress = 'Permanent address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...formData,
      location: formData.location || formData.localAddress.split(',').slice(-2).join(',').trim() || 'Headquarters',
      email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '.')}@sgenterprise.com`,
      role: formData.role || `${formData.department} Specialist`,
      joinDate: employeeToEdit?.joinDate || new Date().toISOString().split('T')[0]
    };

    onSubmit(payload, isEdit);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '2rem' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: isEdit ? 'linear-gradient(135deg, #06b6d4, #3b82f6)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              {isEdit ? <Briefcase size={20} /> : <UserPlus size={20} />}
            </div>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                {isEdit ? 'Edit Employee Details' : 'Add New SG Enterprise Employee'}
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                {isEdit ? `Updating records for ${formData.id}` : 'Fill in the comprehensive personnel record form'}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="btn-icon"
            style={{ width: '36px', height: '36px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Row 1: ID & Full Name */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                Employee ID <span style={{ color: '#f43f5e' }}>*</span>
              </label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="e.g. EMP-105"
                className="glass-input"
                style={{ width: '100%', fontFamily: 'var(--font-mono)' }}
                disabled={isEdit}
              />
              {errors.id && <span style={{ color: '#f43f5e', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.id}</span>}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                Full Professional Name <span style={{ color: '#f43f5e' }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Jane Doe"
                className="glass-input"
                style={{ width: '100%' }}
                autoFocus
              />
              {errors.name && <span style={{ color: '#f43f5e', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.name}</span>}
            </div>
          </div>

          {/* Row 2: Department, Gender & Status */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                Department <span style={{ color: '#f43f5e' }}>*</span>
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="glass-select"
                style={{ width: '100%' }}
              >
                {DEPARTMENTS.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                Gender <span style={{ color: '#f43f5e' }}>*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="glass-select"
                style={{ width: '100%' }}
              >
                {GENDERS.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                Work Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="glass-select"
                style={{ width: '100%' }}
              >
                <option value="Active">Active</option>
                <option value="Remote">Remote</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
          </div>

          {/* Row 3: Phone & Job Role */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                Phone Number <span style={{ color: '#f43f5e' }}>*</span>
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="glass-input"
                style={{ width: '100%', fontFamily: 'var(--font-mono)' }}
              />
              {errors.phone && <span style={{ color: '#f43f5e', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.phone}</span>}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                Role / Title
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Senior Software Engineer"
                className="glass-input"
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Row 4: Addresses (Core Model Requirement) */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid var(--card-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Contact & Address Verification
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                Local Residential Address <span style={{ color: '#f43f5e' }}>*</span>
              </label>
              <input
                type="text"
                name="localAddress"
                value={formData.localAddress}
                onChange={handleChange}
                placeholder="Street, Apartment / Suite, City, State ZIP"
                className="glass-input"
                style={{ width: '100%' }}
              />
              {errors.localAddress && <span style={{ color: '#f43f5e', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.localAddress}</span>}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                Permanent Address <span style={{ color: '#f43f5e' }}>*</span>
              </label>
              <input
                type="text"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleChange}
                placeholder="Permanent family or domicile address"
                className="glass-input"
                style={{ width: '100%' }}
              />
              {errors.permanentAddress && <span style={{ color: '#f43f5e', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.permanentAddress}</span>}
            </div>
          </div>

          {/* Modal Actions Footer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              <Check size={18} />
              <span>{isEdit ? 'Save Changes' : 'Create Record'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
