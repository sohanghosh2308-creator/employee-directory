import React from 'react';
import { Users, Filter, Briefcase, Globe, TrendingUp } from 'lucide-react';

export default function StatsOverview({ totalEmployees, filteredCount, employees }) {
  // Compute unique departments
  const uniqueDepts = new Set(employees.map(e => e.department)).size;
  const activeCount = employees.filter(e => e.status === 'Active').length;
  const remoteCount = employees.filter(e => e.status === 'Remote').length;

  const stats = [
    {
      label: "Total Personnel",
      value: totalEmployees,
      badge: "Core Roster",
      badgeColor: "rgba(99, 102, 241, 0.2)",
      textColor: "var(--accent-primary)",
      icon: Users,
      gradient: "linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.05))"
    },
    {
      label: "Filtered Results",
      value: filteredCount,
      badge: totalEmployees > 0 ? `${Math.round((filteredCount / totalEmployees) * 100)}% match` : "0%",
      badgeColor: "rgba(6, 182, 212, 0.2)",
      textColor: "var(--accent-cyan)",
      icon: Filter,
      gradient: "linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.05))"
    },
    {
      label: "Departments",
      value: uniqueDepts,
      badge: "Active Units",
      badgeColor: "rgba(168, 85, 247, 0.2)",
      textColor: "var(--accent-secondary)",
      icon: Briefcase,
      gradient: "linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.05))"
    },
    {
      label: "Workplace Distribution",
      value: `${activeCount} Onsite / ${remoteCount} Remote`,
      badge: "Healthy Mix",
      badgeColor: "rgba(16, 185, 129, 0.2)",
      textColor: "var(--accent-emerald)",
      icon: Globe,
      gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.05))",
      isCustomValue: true
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '1rem',
      marginTop: '1.75rem',
      marginBottom: '1.75rem'
    }}>
      {stats.map((stat, idx) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={idx}
            className="glass-panel"
            style={{
              padding: '1.25rem 1.4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: stat.gradient,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  {stat.label}
                </span>
                <span style={{
                  fontSize: '0.65rem',
                  padding: '0.1rem 0.45rem',
                  borderRadius: '9999px',
                  background: stat.badgeColor,
                  color: stat.textColor,
                  fontWeight: 600
                }}>
                  {stat.badge}
                </span>
              </div>
              <div style={{
                fontSize: stat.isCustomValue ? '1.1rem' : '1.85rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                fontFamily: stat.isCustomValue ? 'var(--font-sans)' : 'var(--font-mono)',
                lineHeight: 1.2
              }}>
                {stat.value}
              </div>
            </div>

            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--card-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: stat.textColor,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}>
              <IconComponent size={22} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
