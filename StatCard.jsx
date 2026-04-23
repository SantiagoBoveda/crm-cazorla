// StatCard.jsx — Cazorla CRM Stat Card Component
// Export: window.StatCard, window.PageHeader

function StatCard({ label, value, sub, subColor, barColor }) {
  return (
    <div style={{
      background: '#fff', border: '1px solid #dad0be', borderRadius: '12px',
      padding: '20px', boxShadow: '0 1px 4px rgba(167,0,29,.06)',
      position: 'relative', overflow: 'hidden', minWidth: '150px'
    }}>
      {barColor && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: `linear-gradient(90deg, ${barColor}, transparent)`
        }} />
      )}
      <div style={{ fontSize: '12px', color: '#6e5f4e', marginBottom: '8px' }}>{label}</div>
      <div style={{ fontSize: '26px', fontWeight: 700, color: barColor || '#a7001d', lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: '12px', color: subColor || '#6b7215', marginTop: '4px' }}>{sub}</div>}
    </div>
  );
}

function PageHeader({ title, subtitle, actions }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      marginBottom: '24px', flexWrap: 'wrap', gap: '12px'
    }}>
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#a7001d', letterSpacing: '-.3px' }}>{title}</h1>
        {subtitle && <p style={{ fontSize: '13px', color: '#6e5f4e', marginTop: '4px' }}>{subtitle}</p>}
      </div>
      {actions && <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>{actions}</div>}
    </div>
  );
}

function Btn({ variant = 'primary', size = 'md', onClick, children, style: extraStyle }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600, cursor: 'pointer',
    border: 'none', borderRadius: '8px', transition: 'all .18s', whiteSpace: 'nowrap'
  };
  const sizes = { sm: { padding: '5px 12px', fontSize: '12px' }, md: { padding: '8px 16px', fontSize: '13px' } };
  const variants = {
    primary: { background: '#a7001d', color: '#fff' },
    outline: { background: 'transparent', border: '1px solid #dad0be', color: '#1a0f09' },
    green:   { background: 'rgba(107,114,21,.12)', border: '1px solid rgba(107,114,21,.3)', color: '#6b7215' },
    yellow:  { background: 'rgba(180,83,9,.1)', border: '1px solid rgba(180,83,9,.3)', color: '#b45309' },
    ghost:   { background: 'transparent', border: '1px solid #dad0be', color: '#6e5f4e' },
  };
  return (
    <button onClick={onClick} style={{ ...base, ...sizes[size], ...variants[variant], ...extraStyle }}>
      {children}
    </button>
  );
}

function SearchBar({ placeholder = 'Buscar…', value, onChange }) {
  return (
    <div style={{ position: 'relative' }}>
      <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '12px', pointerEvents: 'none' }}>🔍</span>
      <input
        value={value} onChange={onChange} placeholder={placeholder}
        style={{
          padding: '8px 12px 8px 32px', background: '#f0ebe0',
          border: '1px solid #dad0be', borderRadius: '8px', color: '#1a0f09',
          fontSize: '13px', outline: 'none', fontFamily: "'Instrument Sans', sans-serif",
          width: '220px'
        }}
      />
    </div>
  );
}

Object.assign(window, { StatCard, PageHeader, Btn, SearchBar });
