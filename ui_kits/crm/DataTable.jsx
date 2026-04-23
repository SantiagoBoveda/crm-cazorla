// DataTable.jsx — Cazorla CRM Data Table Component
// Export: window.DataTable, window.EmptyState, window.Modal

function DataTable({ columns, rows, onEdit, onDelete }) {
  return (
    <div style={{
      background: '#fff', border: '1px solid #dad0be', borderRadius: '12px',
      overflow: 'hidden', boxShadow: '0 1px 4px rgba(167,0,29,.06)'
    }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key} style={{
                  background: '#f0ebe0', padding: '10px 16px', textAlign: 'left',
                  fontSize: '11px', color: '#a7001d', textTransform: 'uppercase',
                  letterSpacing: '.5px', fontWeight: 700, whiteSpace: 'nowrap',
                  fontFamily: "'Instrument Sans', sans-serif"
                }}>{col.label}</th>
              ))}
              {(onEdit || onDelete) && <th style={{ background: '#f0ebe0', width: '70px' }}></th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}
                onMouseEnter={e => e.currentTarget.querySelectorAll('td').forEach(td => td.style.background = 'rgba(167,0,29,.04)')}
                onMouseLeave={e => e.currentTarget.querySelectorAll('td').forEach(td => td.style.background = '')}
              >
                {columns.map(col => (
                  <td key={col.key} style={{
                    padding: '11px 16px', fontSize: '13px', borderTop: i > 0 ? '1px solid #dad0be' : 'none',
                    color: col.accent ? '#a7001d' : '#1a0f09', fontWeight: col.accent ? 600 : 400,
                    fontFamily: col.mono ? "'DM Mono', monospace" : "'Instrument Sans', sans-serif",
                    whiteSpace: 'nowrap', borderLeft: row._overdue && col.first ? '2px solid #db473c' : undefined,
                    background: row._overdue ? 'rgba(239,68,68,.03)' : undefined
                  }}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td style={{ padding: '8px 12px', borderTop: i > 0 ? '1px solid #dad0be' : 'none', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    {onEdit && <button onClick={() => onEdit(row)} style={{ width:'28px',height:'28px',borderRadius:'6px',border:'1px solid transparent',background:'transparent',fontSize:'13px',cursor:'pointer',transition:'all .15s' }} title="Editar">✏️</button>}
                    {onDelete && <button onClick={() => onDelete(row)} style={{ width:'28px',height:'28px',borderRadius:'6px',border:'1px solid transparent',background:'transparent',fontSize:'13px',cursor:'pointer',transition:'all .15s' }} title="Eliminar">🗑️</button>}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TableHeader({ title, children }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 18px', borderBottom: '1px solid #dad0be',
      background: '#fff', borderRadius: '12px 12px 0 0'
    }}>
      <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#a7001d', fontFamily: "'Instrument Sans', sans-serif" }}>{title}</h3>
      <div style={{ display: 'flex', gap: '8px' }}>{children}</div>
    </div>
  );
}

function EmptyState({ icon = '📋', message = 'Sin datos' }) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 24px', color: '#9e8e78' }}>
      <div style={{ fontSize: '40px', marginBottom: '12px' }}>{icon}</div>
      <p style={{ fontSize: '13px', fontFamily: "'Instrument Sans', sans-serif" }}>{message}</p>
    </div>
  );
}

function Modal({ open, title, onClose, children, maxWidth = '560px' }) {
  if (!open) return null;
  return (
    <div onClick={e => { if(e.target === e.currentTarget) onClose(); }} style={{
      position: 'fixed', inset: 0, background: 'rgba(44,13,28,.5)',
      zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        background: '#fff', border: '1px solid #dad0be', borderRadius: '16px',
        padding: '28px', width: '90%', maxWidth, maxHeight: '90vh', overflowY: 'auto',
        boxShadow: '0 20px 60px rgba(44,13,28,.18)', fontFamily: "'Instrument Sans', sans-serif"
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#a7001d' }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#9e8e78', lineHeight: 1 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function FormGroup({ label, children }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.3px', color: '#6e5f4e', marginBottom: '6px', fontFamily: "'Instrument Sans', sans-serif" }}>{label}</label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = 'text', mono }) {
  return (
    <input type={type} value={value} onChange={onChange} placeholder={placeholder}
      style={{
        width: '100%', padding: '9px 12px', background: '#f0ebe0',
        border: '1px solid #dad0be', borderRadius: '8px', color: '#1a0f09',
        fontFamily: mono ? "'DM Mono', monospace" : "'Instrument Sans', sans-serif",
        fontSize: '13px', outline: 'none', boxSizing: 'border-box'
      }}
      onFocus={e => e.target.style.borderColor = '#a7001d'}
      onBlur={e => e.target.style.borderColor = '#dad0be'}
    />
  );
}

function Select({ value, onChange, options }) {
  return (
    <select value={value} onChange={onChange} style={{
      width: '100%', padding: '9px 12px', background: '#f0ebe0',
      border: '1px solid #dad0be', borderRadius: '8px', color: '#1a0f09',
      fontFamily: "'Instrument Sans', sans-serif", fontSize: '13px',
      outline: 'none', cursor: 'pointer', appearance: 'none'
    }}>
      {options.map(o => <option key={o.value || o} value={o.value || o}>{o.label || o}</option>)}
    </select>
  );
}

Object.assign(window, { DataTable, TableHeader, EmptyState, Modal, FormGroup, Input, Select });
