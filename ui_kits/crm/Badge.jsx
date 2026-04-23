// Badge.jsx — Cazorla CRM Badge & Status Components
// Exports: window.Badge, window.UrgencyDot, window.FilterPill

const BADGE_STYLES = {
  cobrada:    { background: 'rgba(16,185,129,.15)',  color: '#6b7215' },
  resuelto:   { background: 'rgba(16,185,129,.15)',  color: '#6b7215' },
  confirmada: { background: 'rgba(107,114,21,.13)',  color: '#5a6012' },
  enviada:    { background: 'rgba(167,0,29,.15)',    color: '#a7001d' },
  pendiente:  { background: 'rgba(167,0,29,.12)',    color: '#a7001d' },
  despachada: { background: 'rgba(180,83,9,.12)',    color: '#b45309' },
  gestion:    { background: 'rgba(180,83,9,.12)',    color: '#b45309' },
  emitida:    { background: 'rgba(100,116,139,.15)', color: '#6e5f4e' },
  cerrado:    { background: 'rgba(100,116,139,.15)', color: '#6e5f4e' },
  vencida:    { background: 'rgba(239,68,68,.15)',   color: '#db473c' },
  abierto:    { background: 'rgba(239,68,68,.15)',   color: '#db473c' },
  cancelada:  { background: 'rgba(239,68,68,.15)',   color: '#db473c' },
  anulada:    { background: 'rgba(100,116,139,.1)',  color: '#9e8e78', textDecoration: 'line-through' },
  nacional:   { background: 'rgba(16,185,129,.12)',  color: '#6b7215', border: '1px solid rgba(16,185,129,.2)' },
  internacional:{ background: 'rgba(167,0,29,.1)',   color: '#a7001d', border: '1px solid rgba(167,0,29,.2)' },
};

function Badge({ status, children }) {
  const label = (children || status || '').toLowerCase().replace(' ', '');
  const style = BADGE_STYLES[label] || { background: 'rgba(100,116,139,.15)', color: '#6e5f4e' };
  return (
    <span style={{
      display: 'inline-block', padding: '3px 10px', borderRadius: '20px',
      fontSize: '11px', fontWeight: 600, fontFamily: "'Instrument Sans', sans-serif",
      ...style
    }}>
      {children || status}
    </span>
  );
}

function UrgencyDot({ level }) {
  const dots = {
    critica: { background: '#ff00aa', boxShadow: '0 0 8px #ff00aa' },
    alta:    { background: '#db473c', boxShadow: '0 0 6px #db473c' },
    media:   { background: '#b45309' },
    baja:    { background: '#6b7215' },
  };
  const s = dots[level?.toLowerCase()] || dots.baja;
  return <span style={{ width:'8px', height:'8px', borderRadius:'50%', display:'inline-block', flexShrink:0, ...s }} />;
}

function FilterPill({ label, active, onClick }) {
  return (
    <span onClick={onClick} style={{
      padding: '5px 14px', borderRadius: '20px', cursor: 'pointer',
      fontSize: '12px', fontFamily: "'Instrument Sans', sans-serif",
      border: active ? '1px solid #a7001d' : '1px solid #dad0be',
      background: active ? 'rgba(167,0,29,.1)' : '#f0ebe0',
      color: active ? '#a7001d' : '#6e5f4e', transition: 'all .15s',
      userSelect: 'none', whiteSpace: 'nowrap'
    }}>
      {label}
    </span>
  );
}

Object.assign(window, { Badge, UrgencyDot, FilterPill });
