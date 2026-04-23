// Sidebar.jsx — Cazorla CRM Sidebar Component
// Export: window.Sidebar

const sidebarStyles = {
  sidebar: {
    width: '220px', background: '#722F37', borderRight: '1px solid #5a1f28',
    display: 'flex', flexDirection: 'column', height: '100vh',
    position: 'fixed', top: 0, left: 0, zIndex: 100, overflowY: 'auto',
    scrollbarWidth: 'thin', scrollbarColor: '#5a1f28 transparent'
  },
  logoArea: {
    height: '80px', borderBottom: '1px solid #5a1f28', flexShrink: 0,
    display: 'flex', alignItems: 'center', padding: '0 16px'
  },
  logoPill: {
    background: '#fff', borderRadius: '8px', padding: '6px 14px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 1px 4px rgba(0,0,0,.2)', width: '100%'
  },
  logoImg: { height: '34px', objectFit: 'contain', width: '100%' },
  searchWrap: { padding: '8px 12px 4px', position: 'relative' },
  searchInput: {
    width: '100%', padding: '7px 10px 7px 28px',
    background: '#5a1f28', border: '1px solid rgba(255,255,255,.1)',
    borderRadius: '8px', color: '#fff', fontSize: '12px', outline: 'none',
    fontFamily: "'Instrument Sans', sans-serif"
  },
  searchIcon: {
    position: 'absolute', left: '20px', top: '50%',
    transform: 'translateY(-50%)', fontSize: '11px', pointerEvents: 'none'
  },
  navItem: (active) => ({
    display: 'flex', alignItems: 'center', gap: '10px',
    padding: '10px 20px', cursor: 'pointer', fontSize: '13px',
    color: active ? '#ffffff' : '#e8b4bc',
    background: active ? '#5a1f28' : 'transparent',
    borderLeft: `3px solid ${active ? '#db473c' : 'transparent'}`,
    transition: 'all .18s'
  }),
  navIcon: { fontSize: '15px', width: '20px', textAlign: 'center' },
  themeToggle: {
    display: 'flex', alignItems: 'center', gap: '8px',
    padding: '6px 12px', margin: '4px 12px 6px',
    borderRadius: '8px', border: '1px solid #5a1f28',
    background: '#5a1f28', cursor: 'pointer', fontSize: '11px', color: '#e8b4bc'
  },
  themeTrack: {
    width: '28px', height: '15px', borderRadius: '8px',
    background: 'rgba(255,255,255,.15)', position: 'relative', flexShrink: 0
  },
  themeThumb: {
    width: '11px', height: '11px', borderRadius: '50%',
    background: '#fff', position: 'absolute', top: '2px', left: '2px'
  },
  footer: { marginTop: 'auto', padding: '12px 16px', borderTop: '1px solid #5a1f28' },
  userChip: { display: 'flex', alignItems: 'center', gap: '8px' },
  avatar: {
    width: '30px', height: '30px', borderRadius: '50%',
    background: 'linear-gradient(135deg,#a7001d,#c8001f)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '11px', fontWeight: 700, color: '#fff', flexShrink: 0
  },
  storageBar: { padding: '6px 16px 10px', display: 'flex', flexDirection: 'column', gap: '6px' },
  backupBtns: { display: 'flex', gap: '5px' },
  btnBackup: {
    flex: 1, padding: '5px 4px', borderRadius: '7px',
    border: '1px solid #5a1f28', background: '#5a1f28',
    color: '#e8b4bc', fontSize: '10px', fontWeight: 600, cursor: 'pointer',
    textAlign: 'center', fontFamily: "'Instrument Sans', sans-serif"
  }
};

const NAV_ITEMS = [
  { id: 'dashboard',    icon: '📊', label: 'Dashboard' },
  { id: 'clientes',     icon: '👥', label: 'Clientes' },
  { id: 'contactos',    icon: '📇', label: 'Contactos' },
  { id: 'cotizaciones', icon: '📝', label: 'Cotizaciones' },
  { id: 'pipeline',     icon: '🔀', label: 'Pipeline' },
  { id: 'inventario',   icon: '📦', label: 'Inventario' },
  { id: 'ventas',       icon: '💰', label: 'Ventas' },
  { id: 'cargas',       icon: '🚛', label: 'Cargas' },
  { id: 'proyectos',    icon: '📁', label: 'Proyectos' },
  { id: 'prevision',    icon: '📈', label: 'Previsión' },
  { id: 'proveedores',  icon: '🚢', label: 'Proveedores' },
  { id: 'reclamos',     icon: '🚨', label: 'Reclamos' },
  { id: 'facturacion',  icon: '🧾', label: 'Facturación' },
  { id: 'calendario',   icon: '📅', label: 'Calendario' },
];

function Sidebar({ active, onNav, theme, onToggleTheme }) {
  const isDark = theme === 'dark';
  return (
    <div style={sidebarStyles.sidebar}>
      <div style={sidebarStyles.logoArea}>
        <div style={sidebarStyles.logoPill}>
          <img src="../../assets/logo_cazorla_new.png" style={sidebarStyles.logoImg}
            onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
          <div style={{ display:'none', color:'#a7001d', fontSize:'14px', fontWeight:800 }}>Aceitunas Cazorla</div>
        </div>
      </div>
      <div style={sidebarStyles.searchWrap}>
        <span style={sidebarStyles.searchIcon}>🔍</span>
        <input style={sidebarStyles.searchInput} placeholder="Buscar…" />
      </div>
      {NAV_ITEMS.map(item => (
        <div key={item.id}
          style={sidebarStyles.navItem(active === item.id)}
          onClick={() => onNav(item.id)}
          onMouseEnter={e => { if(active !== item.id) { e.currentTarget.style.background='#5a1f28'; e.currentTarget.style.color='#fff'; }}}
          onMouseLeave={e => { if(active !== item.id) { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#e8b4bc'; }}}
        >
          <span style={sidebarStyles.navIcon}>{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}
      <div style={sidebarStyles.themeToggle} onClick={onToggleTheme}>
        <div style={{...sidebarStyles.themeTrack, background: isDark ? '#e05040' : 'rgba(255,255,255,.15)'}}>
          <div style={{...sidebarStyles.themeThumb, left: isDark ? '15px' : '2px'}}></div>
        </div>
        <span>{isDark ? 'Modo claro' : 'Modo oscuro'}</span>
      </div>
      <div style={sidebarStyles.storageBar}>
        <div style={{ fontSize:'10px', color:'#e8b4bc', display:'flex', alignItems:'center', gap:'5px' }}>
          <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#6b7215', flexShrink:0 }}></div>
          localStorage activo
        </div>
        <div style={sidebarStyles.backupBtns}>
          <button style={sidebarStyles.btnBackup}>⬇ Export</button>
          <button style={sidebarStyles.btnBackup}>⬆ Import</button>
          <button style={{ ...sidebarStyles.btnBackup, borderColor:'rgba(22,163,74,.3)', color:'#16a34a' }}>☁ Sync</button>
        </div>
      </div>
      <div style={sidebarStyles.footer}>
        <div style={sidebarStyles.userChip}>
          <div style={sidebarStyles.avatar}>SB</div>
          <div style={{ fontSize:'12px', overflow:'hidden', flex:1 }}>
            <div style={{ fontWeight:600, color:'#fff' }}>Santiago Bóveda</div>
            <div style={{ fontSize:'10px', color:'#e8b4bc' }}>Conectado · Google</div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Sidebar, NAV_ITEMS });
