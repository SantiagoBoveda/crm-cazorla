// Screens.jsx — All CRM screen components
// Depends on: Badge.jsx, StatCard.jsx, DataTable.jsx (loaded first)

/* ─── Real data from codebase ─── */
const REAL_PROVEEDORES = [
  {id:'p1',nombre:'Logística del Sur S.A.',cat:'nacional',contacto:'Carlos Méndez',tel:'+54 9 261 400-1234',email:'cmendez@logsur.com.ar',rutas:['Argentina','Mendoza','Buenos Aires','Córdoba'],notas:'Especialistas en carga frigorífica. Tarifa Mendoza-BsAs ~$180/ton. Tiempo 24-48hs.'},
  {id:'p2',nombre:'Maersk Argentina',cat:'internacional',contacto:'Paula Ríos',tel:'+54 11 4320-5500',email:'paula.rios@maersk.com',rutas:['Argentina','España','Italia','Países Bajos','Marruecos'],notas:'Servicios FCL/LCL. Buenos Aires → Valencia ~35 días. Cotización vigente hasta Jun 2026.'},
  {id:'p3',nombre:'Puerto Seco Mendoza',cat:'almacen',contacto:'Roberto Funes',tel:'+54 261 423-0000',email:'rfunes@puertoseco.com.ar',rutas:['Mendoza','San Juan','San Luis'],notas:'Capacidad 2.000 ton. Temperatura controlada disponible. Tarifa estiva $8/ton/día.'},
  {id:'p4',nombre:'Transatlántica Carga',cat:'multimodal',contacto:'Ana Gómez',tel:'+54 11 5555-7890',email:'agomez@transatlantica.com',rutas:['Argentina','Brasil','México','España','EEUU'],notas:'Combinación camión+barco. Especialistas en productos agroindustriales. Requiere 21 días de anticipación.'},
];

const REAL_CONTACTOS = [
  {nombre:'Luis García',cargo:'Gerente Comercial',empresa:'García & Hijos SRL',tel:'+54 261 412-3456',email:'lgarcia@garciaehijos.com.ar',pais:'Argentina'},
  {nombre:'Marco Bianchi',cargo:'Director de Compras',empresa:'Olivetti SpA',tel:'+39 02 1234-5678',email:'mbianchi@olivetti.it',pais:'Italia'},
  {nombre:'Ana Torres',cargo:'Jefa de Logística',empresa:'Mercado Central',tel:'+56 9 9876-5432',email:'atorres@mccentral.cl',pais:'Chile'},
  {nombre:'João Silva',cargo:'Comprador Senior',empresa:'Azeite Portugal Lda',tel:'+351 21 345-6789',email:'jsilva@azeiteportugal.pt',pais:'Portugal'},
  {nombre:'Carmen López',cargo:'Directora',empresa:'Conservas Sevilla',tel:'+34 95 234-5678',email:'clopez@conservassevilla.es',pais:'España'},
  {nombre:'Fabián Ruiz',cargo:'Representante',empresa:'Distribuciones Sur',tel:'+54 11 4567-8901',email:'fruiz@dissur.com.ar',pais:'Argentina'},
];

const REAL_VENTAS = [
  {num:'V-2026-042',fecha:'2026-04-20',cliente:'García & Hijos SRL',producto:'Aceituna Verde Comercial',pais:'ARG',ton:'24.5',monto:'$12,250',etapa:'Cobrada'},
  {num:'V-2026-041',fecha:'2026-04-18',cliente:'Azeite Portugal Lda',producto:'Passata',pais:'POR',ton:'18.0',monto:'$9,000',etapa:'Despachada'},
  {num:'V-2026-040',fecha:'2026-04-15',cliente:'Olivetti SpA',producto:'Pasta de Tomate',pais:'ITA',ton:'15.2',monto:'$7,600',etapa:'Confirmada'},
  {num:'V-2026-038',fecha:'2026-04-10',cliente:'Conservas Sevilla',producto:'Aceituna Negra Natural',pais:'ESP',ton:'30.0',monto:'$15,000',etapa:'Cobrada'},
  {num:'V-2026-036',fecha:'2026-03-28',cliente:'Distribuciones Sur',producto:'Aceituna Verde Comercial',pais:'ARG',ton:'20.0',monto:'$10,000',etapa:'Cobrada'},
  {num:'V-2026-033',fecha:'2026-03-15',cliente:'Mercado Central',producto:'Aceituna Negra Acética',pais:'CHI',ton:'12.0',monto:'$6,000',etapa:'Confirmada',_overdue:true},
];

const REAL_RECLAMOS = [
  {num:'REC-2026-008',fecha:'2026-04-19',cliente:'Olivetti SpA',asunto:'Error en etiquetado lote #24B',urgencia:'Alta',estado:'Abierto'},
  {num:'REC-2026-007',fecha:'2026-04-12',cliente:'Mercado Central',asunto:'Demora en despacho — 8 días hábiles',urgencia:'Media',estado:'En gestión'},
  {num:'REC-2026-006',fecha:'2026-04-05',cliente:'García & Hijos SRL',asunto:'Diferencia de peso en contenedor',urgencia:'Baja',estado:'Resuelto'},
  {num:'REC-2026-005',fecha:'2026-03-28',cliente:'Azeite Portugal Lda',asunto:'Documentación incompleta DUA',urgencia:'Alta',estado:'Resuelto'},
  {num:'REC-2026-004',fecha:'2026-03-15',cliente:'Conservas Sevilla',asunto:'Calidad aceitunas negras — oxidación',urgencia:'Crítica',estado:'Cerrado'},
];

const MESES_CORTOS = ['Dic','Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov'];
const PREV_DATA = {
  'Argentina': [
    {nombre:'García & Hijos SRL', proy:[0,20,22,24,25,28,30,0,0,0,0,0], real:[0,18,20,22,24,0,0,0,0,0,0,0]},
    {nombre:'Distribuciones Sur',  proy:[0,15,15,18,20,22,22,0,0,0,0,0], real:[0,14,16,0,0,0,0,0,0,0,0,0]},
  ],
  'Italia': [
    {nombre:'Olivetti SpA', proy:[0,10,12,14,15,15,18,0,0,0,0,0], real:[0,8,10,12,0,0,0,0,0,0,0,0]},
  ],
  'España': [
    {nombre:'Conservas Sevilla', proy:[0,8,10,10,12,12,14,0,0,0,0,0], real:[0,7,9,10,0,0,0,0,0,0,0,0]},
  ],
};

const CAT_LABELS = {nacional:'🇦🇷 Nacional',internacional:'🌐 Internacional',almacen:'🏭 Almacén',multimodal:'⚓ Multimodal'};
const CAT_COLORS = {nacional:{bg:'rgba(16,185,129,.12)',color:'#6b7215',border:'rgba(16,185,129,.2)'},internacional:{bg:'rgba(167,0,29,.1)',color:'#a7001d',border:'rgba(167,0,29,.2)'},almacen:{bg:'rgba(155,126,255,.12)',color:'#722F37',border:'rgba(155,126,255,.2)'},multimodal:{bg:'rgba(245,183,49,.12)',color:'#b45309',border:'rgba(245,183,49,.2)'}};

/* ─── Shared mini helpers ─── */
function S(t,style){return React.createElement('span',{style},t);}
function MonoVal({v,color}){return <span style={{fontFamily:"'DM Mono',monospace",fontSize:'12px',fontWeight:600,color:color||'#a7001d'}}>{v}</span>;}
function SectionDivider(){return <hr style={{border:'none',borderTop:'1px solid var(--border,#dad0be)',margin:'20px 0'}}/>;}

/* ══ CONTACTOS ══ */
function ContactosScreen({theme}) {
  const [search,setSearch]=React.useState('');
  const filtered=REAL_CONTACTOS.filter(c=>c.nombre.toLowerCase().includes(search.toLowerCase())||c.empresa.toLowerCase().includes(search.toLowerCase()));
  const initials=n=>n.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  const bg=theme==='dark'?'#191b0d':'#fff';
  const border=theme==='dark'?'#2e3018':'#dad0be';
  const textPrimary=theme==='dark'?'#e5e0d0':'#1a0f09';
  const textMuted=theme==='dark'?'#707558':'#6e5f4e';
  return(
    <div>
      <PageHeader title="📇 Contactos" subtitle="Directorio de contactos comerciales"
        actions={<><SearchBar value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar contacto…"/><Btn>+ Nuevo contacto</Btn></>}
      />
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'14px'}}>
        {filtered.map((c,i)=>(
          <div key={i} style={{background:bg,border:`1px solid ${border}`,borderRadius:'14px',padding:'18px',boxShadow:'0 1px 4px rgba(167,0,29,.06)',transition:'box-shadow .2s'}}
            onMouseEnter={e=>e.currentTarget.style.boxShadow='0 4px 16px rgba(167,0,29,.12)'}
            onMouseLeave={e=>e.currentTarget.style.boxShadow='0 1px 4px rgba(167,0,29,.06)'}
          >
            <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'12px'}}>
              <div style={{width:'44px',height:'44px',borderRadius:'12px',background:'linear-gradient(135deg,#a7001d,#c8001f)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px',fontWeight:800,color:'#fff',flexShrink:0}}>{initials(c.nombre)}</div>
              <div>
                <div style={{fontSize:'15px',fontWeight:700,color:'#a7001d'}}>{c.nombre}</div>
                <div style={{fontSize:'12px',color:textMuted,marginTop:'2px'}}>{c.cargo}</div>
                <div style={{fontSize:'11px',color:'#a7001d',fontWeight:600,marginTop:'2px'}}>{c.empresa}</div>
              </div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
              {[['📱',c.tel],['✉️',c.email],['🌍',c.pais]].map(([icon,val],j)=>(
                <div key={j} style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'12px'}}>
                  <div style={{width:'26px',height:'26px',borderRadius:'7px',background:theme==='dark'?'#212410':'#f0ebe0',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',flexShrink:0}}>{icon}</div>
                  <span style={{color:textPrimary,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══ INVENTARIO ══ */
function InventarioScreen({theme}) {
  const [tab,setTab]=React.useState('aceitunas');
  const [subTab,setSubTab]=React.useState('verde');
  const bg=theme==='dark'?'#191b0d':'#fff';
  const border=theme==='dark'?'#2e3018':'#dad0be';
  const surface2=theme==='dark'?'#212410':'#f0ebe0';
  const OLIVE_TABS=[['verde','🟢 Verde Comercial',218],['natural','⚫ Negra Natural',146],['acetica','🟤 Negra Acética',118]];
  const TOM_ROWS=[['🍅 Pasta de Tomate','320 u','41,600 kg'],['🥫 Passata','145 u','18,850 kg'],['🌶 Salsas','88 u','11,440 kg'],['🔶 Triturado','52 u','6,760 kg']];
  const tabBtn=(id,label,active)=>(
    <button onClick={()=>setTab(id)} style={{padding:'8px 20px',borderRadius:'10px',border:`1px solid ${active?'#a7001d':border}`,background:active?'#a7001d':bg,color:active?'#fff':theme==='dark'?'#8a9060':'#5c4e3a',fontSize:'13px',fontWeight:600,cursor:'pointer',transition:'all .18s'}}>{label}</button>
  );
  const subTabBtn=(id,label,active)=>(
    <button onClick={()=>setSubTab(id)} style={{padding:'6px 16px',borderRadius:'8px',border:`1px solid ${active?'#a7001d':border}`,background:active?'rgba(167,0,29,.1)':surface2,color:active?'#a7001d':theme==='dark'?'#8a9060':'#5c4e3a',fontSize:'12px',fontWeight:600,cursor:'pointer',transition:'all .15s'}}>{label}</button>
  );
  return(
    <div>
      <PageHeader title="📦 Inventario" subtitle="Stock de aceitunas y productos de tomate"
        actions={<Btn>＋ Agregar stock</Btn>}
      />
      <div style={{display:'flex',gap:'8px',marginBottom:'18px'}}>
        {tabBtn('aceitunas','🫒 Aceitunas',tab==='aceitunas')}
        {tabBtn('tomate','🍅 Tomate',tab==='tomate')}
        {tabBtn('otros','📦 Otros',tab==='otros')}
      </div>

      {tab==='aceitunas'&&(
        <div>
          <div style={{display:'flex',gap:'8px',marginBottom:'14px'}}>
            {OLIVE_TABS.map(([id,lbl])=>subTabBtn(id,lbl,subTab===id))}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px',marginBottom:'18px'}}>
            {OLIVE_TABS.map(([id,lbl,val])=>(
              <StatCard key={id} label={lbl.replace(/^[^ ]+ /,'')} value={`${val} t`} barColor={id==='verde'?'#6b7215':id==='natural'?'#722F37':'#b45309'} sub={`${subTab===id?'▸ seleccionado':'disponible'}`} subColor="#9e8e78"/>
            ))}
          </div>
          {/* Bombonas mock table */}
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',color:'#9e8e78',marginBottom:'8px'}}>▸ click en celda · Tab para avanzar</div>
          <div style={{background:bg,border:`1px solid ${border}`,borderRadius:'12px',overflow:'hidden',boxShadow:'0 1px 4px rgba(167,0,29,.06)'}}>
            <div style={{overflowX:'auto'}}>
              <table style={{borderCollapse:'collapse',fontFamily:"'DM Mono',monospace",fontSize:'11px',minWidth:'600px',width:'100%'}}>
                <thead>
                  <tr style={{background:surface2}}>
                    <th style={{padding:'8px 14px',textAlign:'left',fontWeight:700,color:'#a7001d',fontSize:'10px',textTransform:'uppercase',letterSpacing:'.5px',borderBottom:`1px solid ${border}`,position:'sticky',left:0,background:surface2}}>Bombona</th>
                    {['Ene','Feb','Mar','Abr','May','Jun'].map(m=><th key={m} style={{padding:'8px 10px',textAlign:'center',fontWeight:700,color:'#6e5f4e',fontSize:'10px',borderBottom:`1px solid ${border}`}}>{m}</th>)}
                    <th style={{padding:'8px 12px',textAlign:'right',fontWeight:700,color:'#a7001d',fontSize:'10px',borderBottom:`1px solid ${border}`,position:'sticky',right:0,background:surface2}}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {[['B-01',12,14,10,16,0,0],['B-02',8,10,12,14,0,0],['B-03',0,0,14,12,18,0],['B-04',0,0,0,8,10,12]].map(([b,...vals],ri)=>(
                    <tr key={b} onMouseEnter={e=>e.currentTarget.querySelectorAll('td').forEach(td=>td.style.background='rgba(167,0,29,.04)')} onMouseLeave={e=>e.currentTarget.querySelectorAll('td').forEach(td=>td.style.background='')}>
                      <td style={{padding:'7px 14px',fontFamily:"'Instrument Sans',sans-serif",fontWeight:600,fontSize:'12px',color:'#a7001d',borderTop:`1px solid ${border}`,position:'sticky',left:0,background:bg}}>{b}</td>
                      {vals.map((v,ci)=><td key={ci} style={{padding:'7px 10px',textAlign:'center',borderTop:`1px solid ${border}`,color:v>0?'#5c4e3a':'#c4b8a5'}}>{v>0?v:'—'}</td>)}
                      <td style={{padding:'7px 12px',textAlign:'right',fontWeight:700,color:'#1a3a6b',background:'rgba(220,233,247,.5)',borderTop:`1px solid ${border}`,position:'sticky',right:0}}>{vals.reduce((a,b)=>a+b,0)}</td>
                    </tr>
                  ))}
                  <tr style={{background:surface2}}>
                    <td style={{padding:'7px 14px',fontFamily:"'Instrument Sans',sans-serif",fontWeight:700,fontSize:'11px',color:'#a7001d',textTransform:'uppercase',letterSpacing:'.5px',position:'sticky',left:0,background:surface2}}>Total</td>
                    {[20,24,36,50,28,12].map((v,i)=><td key={i} style={{padding:'7px 10px',textAlign:'center',fontWeight:700,color:'#a7001d'}}>{v}</td>)}
                    <td style={{padding:'7px 12px',textAlign:'right',fontWeight:800,color:'#c00000',position:'sticky',right:0}}>170</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab==='tomate'&&(
        <div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px',marginBottom:'18px'}}>
            {TOM_ROWS.map(([lbl,u,kg])=>(
              <StatCard key={lbl} label={lbl} value={u} sub={kg} barColor="#b45309" subColor="#9e8e78"/>
            ))}
          </div>
          <TableHeader title="🍅 Stock de Tomate — detalle"><Btn variant="green" size="sm">⬇ Exportar</Btn></TableHeader>
          <DataTable
            columns={[{key:'producto',label:'Producto',accent:true},{key:'unidades',label:'Unidades',mono:true},{key:'kg',label:'Kg equiv.',mono:true},{key:'lote',label:'Lote',mono:true},{key:'vence',label:'Vence',mono:true}]}
            rows={[
              {producto:'Pasta de Tomate 28/30°Brix',unidades:'320',kg:'41,600',lote:'L-2026-04',vence:'2027-04-01'},
              {producto:'Passata Rustica',unidades:'145',kg:'18,850',lote:'L-2026-03',vence:'2027-03-15'},
              {producto:'Salsa Tradicional',unidades:'88',kg:'11,440',lote:'L-2026-02',vence:'2027-02-28'},
              {producto:'Tomate Triturado',unidades:'52',kg:'6,760',lote:'L-2026-01',vence:'2027-01-10'},
            ]}
          />
        </div>
      )}

      {tab==='otros'&&(
        <div>
          <TableHeader title="📦 Otros productos"><Btn size="sm">＋ Nuevo producto</Btn></TableHeader>
          <DataTable
            columns={[{key:'producto',label:'Producto',accent:true},{key:'cat',label:'Categoría'},{key:'stock',label:'Stock actual',mono:true},{key:'min',label:'Stock mín.',mono:true},{key:'unidad',label:'Unidad'},{key:'precio',label:'Precio',mono:true}]}
            rows={[
              {producto:'Aceite de Oliva Virgen Extra',cat:'Aceite',stock:'48',min:'20',unidad:'litros',precio:'$8.50/L'},
              {producto:'Sal fina industrial',cat:'Insumo',stock:'2,400',min:'500',unidad:'kg',precio:'$0.12/kg'},
            ]}
            onEdit={()=>{}} onDelete={()=>{}}
          />
        </div>
      )}
    </div>
  );
}

/* ══ VENTAS ══ */
function VentasScreen({theme}) {
  const [filter,setFilter]=React.useState('todos');
  const ETAPAS=['todos','Confirmada','Despachada','Cobrada','Cancelada'];
  const filtered=filter==='todos'?REAL_VENTAS:REAL_VENTAS.filter(v=>v.etapa===filter);
  return(
    <div>
      <PageHeader title="💰 Ventas" subtitle="Registro de operaciones comerciales"
        actions={<Btn>＋ Nueva venta</Btn>}
      />
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px',marginBottom:'20px'}}>
        <StatCard label="Ventas del mes" value="$60,850" sub="▲ +8% vs abril 2025" barColor="#a7001d"/>
        <StatCard label="Toneladas" value="119.7 t" sub="Aceituna + Tomate" barColor="#6b7215" subColor="#9e8e78"/>
        <StatCard label="Confirmadas" value="3" sub="$22,600 en proceso" barColor="#b45309" subColor="#9e8e78"/>
        <StatCard label="Cobradas" value="12" sub="$97,300 YTD" barColor="#722F37" subColor="#6b7215"/>
      </div>
      <div style={{display:'flex',gap:'8px',marginBottom:'14px',flexWrap:'wrap'}}>
        {ETAPAS.map(e=><FilterPill key={e} label={e==='todos'?'Todos':e} active={filter===e} onClick={()=>setFilter(e)}/>)}
      </div>
      <TableHeader title="Registro de ventas"><Btn variant="green" size="sm">⬇ Exportar</Btn></TableHeader>
      <DataTable
        columns={[
          {key:'num',label:'Nº Venta',mono:true,accent:true,first:true},
          {key:'fecha',label:'Fecha',mono:true},
          {key:'cliente',label:'Cliente',accent:true},
          {key:'producto',label:'Producto'},
          {key:'pais',label:'País',mono:true},
          {key:'ton',label:'Ton.',mono:true},
          {key:'monto',label:'Monto (USD)',mono:true},
          {key:'etapa',label:'Etapa',render:v=><Badge status={v.toLowerCase()}>{v}</Badge>},
        ]}
        rows={filtered}
        onEdit={()=>{}} onDelete={()=>{}}
      />
    </div>
  );
}

/* ══ PREVISIÓN (editable) ══ */
function PrevisionScreen({theme}) {
  const [product,setProduct]=React.useState('aceituna_natural');
  // State: { 'pais__cliente__mesIdx': value }
  const [vals,setVals]=React.useState(()=>{
    const init={};
    Object.entries(PREV_DATA).forEach(([pais,clientes])=>{
      clientes.forEach(c=>{
        c.proy.forEach((v,mi)=>{if(v>0)init[`${pais}__${c.nombre}__${mi}`]=v;});
      });
    });
    return init;
  });
  const [editing,setEditing]=React.useState(null); // 'pais__nombre__mi'
  const [flash,setFlash]=React.useState(null);

  const border=theme==='dark'?'#2e3018':'#dad0be';
  const surface2=theme==='dark'?'#212410':'#f0ebe0';
  const surface3=theme==='dark'?'#1e210e':'#ebe4d8';
  const bg=theme==='dark'?'#191b0d':'#fff';
  const textMuted=theme==='dark'?'#707558':'#6e5f4e';

  const PRODS=[{id:'aceituna_verde',e:'🟢',l:'Verde Comercial'},{id:'aceituna_natural',e:'⚫',l:'Negra Natural'},{id:'aceituna_acetica',e:'🟤',l:'Negra Acética'},{id:'pasta',e:'🍅',l:'Pasta Tomate'},{id:'passata',e:'🥫',l:'Passata'},{id:'salsa',e:'🌶',l:'Salsas'}];

  function saveCell(key,raw){
    const num=parseFloat(raw)||0;
    setVals(v=>({...v,[key]:num}));
    setEditing(null);
    setFlash(key);
    setTimeout(()=>setFlash(null),600);
  }

  function EditableCell({pais,nombre,mi,isReal}){
    const key=`${pais}__${nombre}__${mi}`;
    const realKey=`real__${pais}__${nombre}__${mi}`;
    if(isReal){
      const rv=PREV_DATA[pais]?.find(c=>c.nombre===nombre)?.real[mi]||0;
      const pv=vals[key]||0;
      const col=rv>0?(rv>=pv?'#6b7215':'#db473c'):'#c4b8a5';
      return <td style={{padding:'7px 6px',textAlign:'center',borderTop:`1px solid ${border}`,fontSize:'11px',color:col,fontWeight:rv>0?600:400}}>{rv>0?rv:'—'}</td>;
    }
    const val=vals[key]||0;
    const isEdit=editing===key;
    const isFlash=flash===key;
    return(
      <td onClick={()=>!isEdit&&setEditing(key)}
        style={{padding:'4px 3px',textAlign:'center',borderTop:`1px solid ${border}`,borderLeft:`1px solid ${border}`,cursor:'pointer',background:isFlash?'rgba(16,185,129,.2)':undefined,transition:'background .4s'}}
      >
        {isEdit?(
          <input autoFocus defaultValue={val||''}
            onBlur={e=>saveCell(key,e.target.value)}
            onKeyDown={e=>{if(e.key==='Enter'||e.key==='Tab'){e.preventDefault();saveCell(key,e.target.value);}if(e.key==='Escape')setEditing(null);}}
            style={{width:'46px',background:'transparent',border:'none',borderBottom:`2px solid #a7001d`,outline:'none',fontSize:'12px',fontFamily:"'DM Mono',monospace",textAlign:'center',color:'#a7001d',padding:'2px 0',borderRadius:'4px 4px 0 0'}}
          />
        ):(
          <span style={{fontSize:'11px',color:val>0?'#a7001d':'#c4b8a5',fontFamily:"'DM Mono',monospace"}}>{val>0?val:'—'}</span>
        )}
      </td>
    );
  }

  return(
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'24px',flexWrap:'wrap',gap:'12px'}}>
        <div>
          <h1 style={{fontSize:'22px',fontWeight:700,color:theme==='dark'?'#e05040':'#a7001d',letterSpacing:'-.3px'}}>📈 Previsión de Ventas 2026</h1>
          <p style={{fontSize:'12px',color:textMuted,marginTop:'4px',fontFamily:"'DM Mono',monospace"}}>Dic 2025 → Nov 2026 · Toneladas · <span style={{color:'#9e8e78'}}>▸ click en celda para editar</span></p>
        </div>
        <div style={{display:'flex',gap:'10px',alignItems:'center',flexWrap:'wrap'}}>
          <span style={{display:'inline-flex',alignItems:'center',gap:'5px',fontSize:'11px',color:textMuted,fontFamily:"'DM Mono',monospace"}}><span style={{width:'8px',height:'8px',borderRadius:'2px',background:theme==='dark'?'#e05040':'#a7001d',display:'block'}}></span>Proyectado</span>
          <span style={{display:'inline-flex',alignItems:'center',gap:'5px',fontSize:'11px',color:textMuted,fontFamily:"'DM Mono',monospace"}}><span style={{width:'8px',height:'8px',borderRadius:'2px',background:theme==='dark'?'#8a9830':'#6b7215',display:'block'}}></span>Realizado</span>
          <Btn variant="green" size="sm">⬇ Exportar</Btn>
        </div>
      </div>

      <div style={{display:'flex',gap:'8px',marginBottom:'18px',flexWrap:'wrap'}}>
        {PRODS.map(p=>(
          <button key={p.id} onClick={()=>setProduct(p.id)} style={{padding:'7px 16px',borderRadius:'8px',border:`1px solid ${product===p.id?(theme==='dark'?'#e05040':'#a7001d'):border}`,background:product===p.id?`rgba(${theme==='dark'?'224,80,64':'167,0,29'},.1)`:surface2,color:product===p.id?(theme==='dark'?'#e05040':'#a7001d'):textMuted,fontSize:'13px',fontWeight:600,cursor:'pointer',transition:'all .18s',display:'flex',alignItems:'center',gap:'6px'}}>
            {p.e} {p.l}
          </button>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px',marginBottom:'18px'}}>
        <StatCard label="Proyectado Anual" value="480 t" barColor={theme==='dark'?'#e05040':'#a7001d'}/>
        <StatCard label="Realizado YTD" value="182 t" barColor={theme==='dark'?'#8a9830':'#6b7215'}/>
        <StatCard label="Cumplimiento" value="38%" sub="Dic–Nov" barColor="#b45309"/>
        <StatCard label="Proyectado YTD" value="210 t" sub="Diferencia: −28 t" barColor="#722F37" subColor="#db473c"/>
      </div>

      <div style={{background:bg,border:`1px solid ${border}`,borderRadius:'14px',overflow:'hidden',boxShadow:'0 1px 4px rgba(167,0,29,.06)'}}>
        <div style={{overflowX:'auto'}}>
          <table style={{borderCollapse:'collapse',width:'100%',minWidth:'900px',fontFamily:"'DM Mono',monospace"}}>
            <thead>
              <tr style={{background:surface3}}>
                <th style={{padding:'10px 16px',textAlign:'left',fontSize:'10px',color:textMuted,textTransform:'uppercase',letterSpacing:'.6px',position:'sticky',left:0,background:surface3,borderBottom:`1px solid ${border}`,minWidth:'180px'}}>Cliente</th>
                {MESES_CORTOS.map(m=>(
                  <th key={m} colSpan={2} style={{padding:'8px 4px',textAlign:'center',fontSize:'10px',color:textMuted,borderBottom:`1px solid ${border}`,borderLeft:`1px solid ${border}`}}>{m}</th>
                ))}
              </tr>
              <tr style={{background:surface2}}>
                <th style={{padding:'5px 16px',position:'sticky',left:0,background:surface2,borderBottom:`2px solid ${border}`}}></th>
                {MESES_CORTOS.map(m=>[
                  <th key={m+'p'} style={{padding:'4px 5px',textAlign:'center',fontSize:'9px',color:theme==='dark'?'#e05040':'#a7001d',borderBottom:`2px solid ${border}`,borderLeft:`1px solid ${border}`,width:'44px'}}>Proy</th>,
                  <th key={m+'r'} style={{padding:'4px 5px',textAlign:'center',fontSize:'9px',color:theme==='dark'?'#8a9830':'#6b7215',borderBottom:`2px solid ${border}`,width:'44px'}}>Real</th>
                ])}
              </tr>
            </thead>
            <tbody>
              {Object.entries(PREV_DATA).map(([pais,clientes])=>[
                <tr key={pais}>
                  <td colSpan={25} style={{padding:'6px 16px',background:surface2,fontSize:'10px',textTransform:'uppercase',letterSpacing:'1px',color:'#9e8e78',borderTop:`1px solid ${border}`,fontFamily:"'Instrument Sans',sans-serif",fontWeight:700}}>{pais}</td>
                </tr>,
                ...clientes.map((c)=>(
                  <tr key={c.nombre}>
                    <td style={{padding:'7px 16px',fontFamily:"'Instrument Sans',sans-serif",fontWeight:600,fontSize:'12px',color:theme==='dark'?'#e05040':'#a7001d',borderTop:`1px solid ${border}`,position:'sticky',left:0,background:bg}}>{c.nombre}</td>
                    {MESES_CORTOS.map((_,mi)=>[
                      <EditableCell key={mi+'p'} pais={pais} nombre={c.nombre} mi={mi} isReal={false}/>,
                      <EditableCell key={mi+'r'} pais={pais} nombre={c.nombre} mi={mi} isReal={true}/>
                    ])}
                  </tr>
                ))
              ])}
            </tbody>
          </table>
        </div>
      </div>
      <p style={{fontSize:'11px',color:'#9e8e78',marginTop:'10px',fontFamily:"'DM Mono',monospace"}}>▸ click en celda Proy · Enter o Tab para confirmar · Esc para cancelar</p>
    </div>
  );
}

/* ══ RECLAMOS ══ */
function ReclamosScreen({theme}) {
  const [filter,setFilter]=React.useState('todos');
  const ESTADOS=['todos','Abierto','En gestión','Resuelto','Cerrado'];
  const filtered=filter==='todos'?REAL_RECLAMOS:REAL_RECLAMOS.filter(r=>r.estado===filter);
  const urgMap={Crítica:{bg:'rgba(255,0,170,.08)',dot:'#ff00aa',shadow:'0 0 8px #ff00aa'},Alta:{bg:'rgba(219,71,60,.06)',dot:'#db473c',shadow:'0 0 6px #db473c'},Media:{bg:'rgba(180,83,9,.06)',dot:'#b45309',shadow:'none'},Baja:{bg:'transparent',dot:'#6b7215',shadow:'none'}};
  return(
    <div>
      <PageHeader title="🚨 Reclamos" subtitle="Gestión de reclamos y no conformidades"
        actions={<Btn variant="red" style={{background:'rgba(219,71,60,.1)',border:'1px solid rgba(219,71,60,.3)',color:'#db473c'}}>＋ Nuevo reclamo</Btn>}
      />
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px',marginBottom:'20px'}}>
        <StatCard label="Abiertos" value="1" barColor="#db473c"/>
        <StatCard label="En gestión" value="1" barColor="#b45309"/>
        <StatCard label="Resueltos (mes)" value="2" barColor="#6b7215"/>
        <StatCard label="Tiempo prom." value="4.2 d" sub="Resolución promedio" barColor="#722F37" subColor="#9e8e78"/>
      </div>
      <div style={{display:'flex',gap:'8px',marginBottom:'14px',flexWrap:'wrap'}}>
        {ESTADOS.map(e=><FilterPill key={e} label={e==='todos'?'Todos':e} active={filter===e} onClick={()=>setFilter(e)}/>)}
      </div>
      <DataTable
        columns={[
          {key:'num',label:'Nº Reclamo',mono:true,accent:true,first:true},
          {key:'fecha',label:'Fecha',mono:true},
          {key:'cliente',label:'Cliente',accent:true},
          {key:'asunto',label:'Asunto'},
          {key:'urgencia',label:'Urgencia',render:(v)=>{const s=urgMap[v]||urgMap.Baja;return<span style={{display:'inline-flex',alignItems:'center',gap:'5px',fontSize:'12px'}}><span style={{width:'8px',height:'8px',borderRadius:'50%',background:s.dot,boxShadow:s.shadow,flexShrink:0,display:'block'}}></span>{v}</span>;}},
          {key:'estado',label:'Estado',render:v=><Badge status={v.toLowerCase().replace(' ','')}>{v}</Badge>},
        ]}
        rows={filtered}
        onEdit={()=>{}} onDelete={()=>{}}
      />
    </div>
  );
}

/* ══ PROVEEDORES ══ */
function ProveedoresScreen({theme}) {
  const [catFilter,setCatFilter]=React.useState('all');
  const bg=theme==='dark'?'#191b0d':'#fff';
  const border=theme==='dark'?'#2e3018':'#dad0be';
  const surface2=theme==='dark'?'#212410':'#f0ebe0';
  const textPrimary=theme==='dark'?'#e5e0d0':'#1a0f09';
  const textMuted=theme==='dark'?'#707558':'#6e5f4e';
  const filtered=catFilter==='all'?REAL_PROVEEDORES:REAL_PROVEEDORES.filter(p=>p.cat===catFilter);
  const CATS=[['all','Todos'],['nacional','🇦🇷 Nacional'],['internacional','🌐 Internacional'],['almacen','🏭 Almacén'],['multimodal','⚓ Multimodal']];
  return(
    <div>
      <PageHeader title="🚢 Proveedores" subtitle="Directorio de logística y proveedores"
        actions={<Btn variant="yellow">＋ Nuevo proveedor</Btn>}
      />
      <div style={{display:'flex',gap:'8px',marginBottom:'18px',flexWrap:'wrap',alignItems:'center'}}>
        {CATS.map(([id,lbl])=>(
          <span key={id} onClick={()=>setCatFilter(id)} style={{padding:'5px 14px',borderRadius:'20px',cursor:'pointer',fontSize:'12px',fontFamily:"'DM Mono',monospace",border:catFilter===id?`1px solid #b45309`:`1px solid ${border}`,background:catFilter===id?'rgba(180,83,9,.1)':surface2,color:catFilter===id?'#b45309':textMuted,transition:'all .15s',userSelect:'none'}}>{lbl}</span>
        ))}
        <div style={{marginLeft:'auto'}}><SearchBar placeholder="Buscar proveedor…"/></div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:'14px'}}>
        {filtered.map(p=>{
          const catStyle=CAT_COLORS[p.cat]||{};
          return(
            <div key={p.id} style={{background:bg,border:`1px solid ${border}`,borderRadius:'14px',padding:'18px',display:'flex',flexDirection:'column',gap:'12px',transition:'all .18s',boxShadow:'0 1px 4px rgba(167,0,29,.06)'}}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.borderColor=border==='#dad0be'?'#c4b8a5':'#3a3e20';}}
              onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.borderColor=border;}}
            >
              <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:'10px'}}>
                <div style={{fontSize:'15px',fontWeight:700,color:textPrimary,lineHeight:1.3}}>{p.nombre}</div>
                <span style={{fontSize:'10px',padding:'3px 10px',borderRadius:'10px',background:catStyle.bg,color:catStyle.color,border:`1px solid ${catStyle.border}`,whiteSpace:'nowrap',flexShrink:0,fontFamily:"'DM Mono',monospace"}}>{CAT_LABELS[p.cat]}</span>
              </div>
              {[['Contacto',p.contacto],['Teléfono',p.tel],['Email',p.email]].map(([lbl,val])=>val&&(
                <div key={lbl} style={{display:'flex',flexDirection:'column',gap:'2px'}}>
                  <div style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'.8px',color:'#9e8e78',fontFamily:"'DM Mono',monospace"}}>{lbl}</div>
                  <div style={{fontSize:'12px',color:textMuted,fontFamily:"'DM Mono',monospace"}}>{val}</div>
                </div>
              ))}
              <div style={{display:'flex',flexWrap:'wrap',gap:'4px'}}>
                {p.rutas.map(r=><span key={r} style={{fontSize:'10px',padding:'2px 8px',borderRadius:'5px',background:surface2,color:textMuted,fontFamily:"'DM Mono',monospace",border:`1px solid ${border}`}}>{r}</span>)}
              </div>
              {p.notas&&<div style={{fontSize:'11px',color:textMuted,lineHeight:1.5,borderTop:`1px solid ${border}`,paddingTop:'10px'}}>{p.notas}</div>}
              <div style={{display:'flex',gap:'6px',borderTop:`1px solid ${border}`,paddingTop:'10px',marginTop:'auto'}}>
                <button style={{flex:1,padding:'7px',borderRadius:'7px',border:`1px solid ${border}`,background:surface2,color:textMuted,fontSize:'11px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'4px'}}>✏️ Editar</button>
                <button style={{flex:1,padding:'7px',borderRadius:'7px',border:'1px solid transparent',background:'transparent',color:'#db473c',fontSize:'11px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'4px'}}>🗑 Eliminar</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ══ CARGAS ══ */
function CargasScreen({theme}) {
  const [filter,setFilter]=React.useState('todos');
  const ESTADOS=['todos','En tránsito','Despachada','En puerto','Entregada','Cancelada'];
  const bg=theme==='dark'?'#191b0d':'#fff';
  const border=theme==='dark'?'#2e3018':'#dad0be';
  const CARGAS=[
    {num:'CRG-2026-014',fecha:'2026-04-18',cliente:'Olivetti SpA',producto:'Pasta de Tomate',contenedor:'MSCU7412836',origen:'Buenos Aires',destino:'Valencia',naviera:'MSC',eta:'2026-05-22',estado:'En tránsito'},
    {num:'CRG-2026-013',fecha:'2026-04-10',cliente:'Azeite Portugal Lda',producto:'Aceituna Verde',contenedor:'MAEU6238741',origen:'Buenos Aires',destino:'Lisboa',naviera:'Maersk',eta:'2026-05-18',estado:'En tránsito'},
    {num:'CRG-2026-012',fecha:'2026-04-02',cliente:'Conservas Sevilla',producto:'Aceituna Negra',contenedor:'HLXU4019283',origen:'Buenos Aires',destino:'Sevilla',naviera:'Hapag-Lloyd',eta:'2026-05-05',estado:'En puerto'},
    {num:'CRG-2026-011',fecha:'2026-03-20',cliente:'García & Hijos SRL',producto:'Aceituna Verde',contenedor:'CMAU8374619',origen:'Mendoza',destino:'Buenos Aires',naviera:'Logística del Sur',eta:'2026-03-22',estado:'Entregada'},
    {num:'CRG-2026-010',fecha:'2026-03-15',cliente:'Distribuciones Sur',producto:'Passata',contenedor:'TCKU1928374',origen:'Buenos Aires',destino:'Montevideo',naviera:'Transatlántica',eta:'2026-03-18',estado:'Entregada'},
    {num:'CRG-2026-009',fecha:'2026-03-01',cliente:'Mercado Central',producto:'Aceituna Negra Acética',contenedor:'MSCU3847261',origen:'Buenos Aires',destino:'Valparaíso',naviera:'MSC',eta:'2026-03-08',estado:'Cancelada'},
  ];
  const filtered=filter==='todos'?CARGAS:CARGAS.filter(c=>c.estado===filter);
  const statusColor={
    'En tránsito':{bg:'rgba(167,0,29,.1)',color:'#a7001d'},
    'Despachada':{bg:'rgba(180,83,9,.12)',color:'#b45309'},
    'En puerto':{bg:'rgba(107,114,21,.13)',color:'#6b7215'},
    'Entregada':{bg:'rgba(16,185,129,.15)',color:'#6b7215'},
    'Cancelada':{bg:'rgba(100,116,139,.15)',color:'#9e8e78'},
  };
  return(
    <div>
      <PageHeader title="🚛 Cargas" subtitle="Seguimiento de despachos y contenedores"
        actions={<Btn>＋ Nueva carga</Btn>}
      />
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px',marginBottom:'20px'}}>
        <StatCard label="En tránsito" value="2" sub="2 contenedores" barColor="#a7001d"/>
        <StatCard label="En puerto" value="1" sub="Esperando descarga" barColor="#6b7215"/>
        <StatCard label="Entregadas (mes)" value="2" barColor="#722F37"/>
        <StatCard label="ETA próxima" value="22 may" sub="Olivetti SpA · Valencia" barColor="#b45309" subColor="#9e8e78"/>
      </div>
      <div style={{display:'flex',gap:'8px',marginBottom:'14px',flexWrap:'wrap'}}>
        {ESTADOS.map(e=><FilterPill key={e} label={e==='todos'?'Todos':e} active={filter===e} onClick={()=>setFilter(e)}/>)}
      </div>
      <DataTable
        columns={[
          {key:'num',label:'Nº Carga',mono:true,accent:true,first:true},
          {key:'fecha',label:'Fecha',mono:true},
          {key:'cliente',label:'Cliente',accent:true},
          {key:'producto',label:'Producto'},
          {key:'contenedor',label:'Contenedor',mono:true},
          {key:'origen',label:'Origen'},
          {key:'destino',label:'Destino'},
          {key:'naviera',label:'Naviera'},
          {key:'eta',label:'ETA',mono:true},
          {key:'estado',label:'Estado',render:v=>{const s=statusColor[v]||{bg:'rgba(100,116,139,.15)',color:'#9e8e78'};return<span style={{display:'inline-block',padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:600,...s}}>{v}</span>;}},
        ]}
        rows={filtered}
        onEdit={()=>{}} onDelete={()=>{}}
      />
    </div>
  );
}

/* ══ PROYECTOS (Kanban con drag & drop) ══ */
const RESPONSABLES=[
  {id:'santiago',nombre:'Santiago Bóveda',initials:'SB',color:'#a7001d'},
  {id:'hebe',nombre:'Hebe Sotomayor',initials:'HS',color:'#6b7215'},
];
const INITIAL_COLS=[
  {id:'prospecto',label:'Prospecto',color:'#94a3b8',cards:[
    {id:'p1',title:'Expansión Brasil — Aceitunas',cliente:'Distribuidor Nordeste SA',valor:28000,producto:'Aceituna Verde Comercial',incoterm:'FOB',notas:'Primer contacto en feria SIAL. Interés en 40-60 ton/año.',resp:'santiago'},
    {id:'p2',title:'Salsas gourmet — Canal HORECA',cliente:'Rest. Cadena SRL',valor:12000,producto:'Salsas',incoterm:'EXW',notas:'Canal HORECA Buenos Aires. Requiere muestra antes de cotizar.',resp:'hebe'},
  ]},
  {id:'negociacion',label:'En negociación',color:'#a7001d',cards:[
    {id:'p3',title:'Aceituna Verde a Marruecos',cliente:'Maroc Import SARL',valor:45000,producto:'Aceituna Verde Comercial',incoterm:'CIF',notas:'Negociación precio FOB vs CIF. Cliente solicita certificación halal.',resp:'santiago'},
  ]},
  {id:'cotizacion',label:'Cotización enviada',color:'#b45309',cards:[
    {id:'p4',title:'Pasta Tomate — Cadena italiana',cliente:'Olivetti SpA',valor:31500,producto:'Pasta de Tomate',incoterm:'FOB',notas:'COT-2026-040 enviada. Esperando respuesta del área de compras.',resp:'santiago'},
    {id:'p5',title:'Pack mixto aceitunas',cliente:'Conservas Sevilla',valor:18200,producto:'Aceituna Verde + Negra',incoterm:'EXW',notas:'Solicitan pack con 3 variedades. Cotización en EUR.',resp:'hebe'},
  ]},
  {id:'confirmado',label:'Confirmado',color:'#6b7215',cards:[
    {id:'p6',title:'Passata 2026 — Portugal',cliente:'Azeite Portugal Lda',valor:24800,producto:'Passata',incoterm:'CIF',notas:'Contrato firmado. Despacho previsto mayo 2026.',resp:'santiago'},
  ]},
  {id:'cerrado',label:'Cerrado',color:'#9e8e78',cards:[
    {id:'p7',title:'Negra Natural temporada 2025',cliente:'García & Hijos SRL',valor:52300,producto:'Aceituna Negra Natural',incoterm:'FOB',notas:'Operación exitosa. Renovar para 2026.',resp:'hebe'},
  ]},
];

function ProyectosScreen({theme}) {
  const [cols,setCols]=React.useState(INITIAL_COLS);
  const [dragCard,setDragCard]=React.useState(null); // {cardId, fromColId}
  const [dragOver,setDragOver]=React.useState(null); // colId
  const [modal,setModal]=React.useState(null); // card object
  const [newCardCol,setNewCardCol]=React.useState(null); // colId for inline add
  const [newTitle,setNewTitle]=React.useState('');
  const [newCliente,setNewCliente]=React.useState('');
  const [newResp,setNewResp]=React.useState('santiago');

  const bg=theme==='dark'?'#191b0d':'#fff';
  const border=theme==='dark'?'#2e3018':'#dad0be';
  const surface2=theme==='dark'?'#212410':'#f0ebe0';
  const textPrimary=theme==='dark'?'#e5e0d0':'#1a0f09';
  const textMuted=theme==='dark'?'#707558':'#6e5f4e';
  const accent=theme==='dark'?'#e05040':'#a7001d';

  const fmtVal=v=>'$'+Number(v).toLocaleString('es');
  const colTotal=col=>col.cards.reduce((s,c)=>s+(c.valor||0),0);
  const respById=id=>RESPONSABLES.find(r=>r.id===id)||RESPONSABLES[0];

  /* ── Drag handlers ── */
  function onDragStart(e,cardId,fromColId){
    setDragCard({cardId,fromColId});
    e.dataTransfer.effectAllowed='move';
  }
  function onDragOver(e,colId){
    e.preventDefault();
    e.dataTransfer.dropEffect='move';
    setDragOver(colId);
  }
  function onDrop(e,toColId){
    e.preventDefault();
    if(!dragCard||dragCard.fromColId===toColId){setDragCard(null);setDragOver(null);return;}
    setCols(prev=>{
      const next=prev.map(col=>({...col,cards:[...col.cards]}));
      const fromCol=next.find(c=>c.id===dragCard.fromColId);
      const toCol=next.find(c=>c.id===toColId);
      const idx=fromCol.cards.findIndex(c=>c.id===dragCard.cardId);
      const [card]=fromCol.cards.splice(idx,1);
      toCol.cards.push(card);
      return next;
    });
    setDragCard(null);setDragOver(null);
  }
  function onDragEnd(){setDragCard(null);setDragOver(null);}

  /* ── Add card ── */
  function addCard(colId){
    if(!newTitle.trim())return;
    const id='p'+Date.now();
    setCols(prev=>prev.map(col=>col.id===colId?{...col,cards:[...col.cards,{id,title:newTitle,cliente:newCliente,valor:0,producto:'',incoterm:'FOB',notas:'',resp:newResp}]}:col));
    setNewCardCol(null);setNewTitle('');setNewCliente('');setNewResp('santiago');
  }

  /* ── Edit from modal ── */
  function saveModal(updated){
    setCols(prev=>prev.map(col=>({...col,cards:col.cards.map(c=>c.id===updated.id?updated:c)})));
    setModal(updated);
  }

  return(
    <div>
      <PageHeader title="📁 Proyectos" subtitle="Proyectos comerciales activos"
        actions={<><Btn variant="outline" size="sm">Vista tabla</Btn><Btn>＋ Nuevo proyecto</Btn></>}
      />
      {/* KPI row */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'12px',marginBottom:'20px'}}>
        {cols.map(col=>(
          <div key={col.id} style={{background:bg,border:`1px solid ${border}`,borderRadius:'12px',padding:'16px',position:'relative',overflow:'hidden',boxShadow:'0 1px 4px rgba(167,0,29,.06)'}}>
            <div style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:`linear-gradient(90deg,${col.color},transparent)`}}/>
            <div style={{fontSize:'10px',textTransform:'uppercase',letterSpacing:'.6px',color:textMuted,marginBottom:'6px',fontFamily:"'DM Mono',monospace"}}>{col.label}</div>
            <div style={{fontSize:'24px',fontWeight:800,color:col.color,lineHeight:1}}>{col.cards.length}</div>
            <div style={{fontSize:'11px',fontFamily:"'DM Mono',monospace",color:textMuted,marginTop:'3px'}}>{fmtVal(colTotal(col))}</div>
          </div>
        ))}
      </div>

      {/* Kanban board */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'12px'}}>
        {cols.map(col=>(
          <div key={col.id}
            onDragOver={e=>onDragOver(e,col.id)}
            onDrop={e=>onDrop(e,col.id)}
            style={{background:dragOver===col.id?`${col.color}10`:bg,border:`1px solid ${dragOver===col.id?col.color:border}`,borderRadius:'12px',padding:'12px',minWidth:'0',transition:'all .18s',minHeight:'200px'}}
          >
            {/* Column header */}
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'12px',paddingBottom:'8px',borderBottom:`1px solid ${border}`}}>
              <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                <div style={{width:'8px',height:'8px',borderRadius:'50%',background:col.color}}/>
                <span style={{fontSize:'11px',textTransform:'uppercase',letterSpacing:'.5px',color:textMuted,fontWeight:700}}>{col.label}</span>
              </div>
              <span style={{fontSize:'11px',fontFamily:"'DM Mono',monospace",color:col.color,fontWeight:700,background:`${col.color}18`,padding:'1px 7px',borderRadius:'10px'}}>{col.cards.length}</span>
            </div>

            {/* Cards */}
            {col.cards.map(card=>{
              const resp=respById(card.resp);
              const isDragging=dragCard?.cardId===card.id;
              return(
                <div key={card.id}
                  draggable
                  onDragStart={e=>onDragStart(e,card.id,col.id)}
                  onDragEnd={onDragEnd}
                  onClick={()=>setModal(card)}
                  style={{background:isDragging?`${col.color}18`:surface2,border:`1px solid ${isDragging?col.color:border}`,borderRadius:'8px',padding:'11px',marginBottom:'8px',cursor:'grab',transition:'all .15s',opacity:isDragging?.5:1,userSelect:'none'}}
                  onMouseEnter={e=>{if(!isDragging){e.currentTarget.style.borderColor=col.color;e.currentTarget.style.transform='translateY(-1px)';}}}
                  onMouseLeave={e=>{if(!isDragging){e.currentTarget.style.borderColor=border;e.currentTarget.style.transform='';}}}
                >
                  <div style={{fontSize:'12px',fontWeight:600,color:textPrimary,marginBottom:'5px',lineHeight:1.4}}>{card.title}</div>
                  <div style={{fontSize:'11px',color:accent,fontWeight:600,marginBottom:'8px'}}>{card.cliente}</div>
                  {card.producto&&<div style={{fontSize:'10px',color:textMuted,marginBottom:'6px',fontFamily:"'DM Mono',monospace"}}>{card.producto}</div>}
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <span style={{fontFamily:"'DM Mono',monospace",fontSize:'12px',fontWeight:700,color:col.color}}>{fmtVal(card.valor)}</span>
                    <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
                      <span style={{fontSize:'10px',color:textMuted}}>{resp.nombre.split(' ')[0]}</span>
                      <div style={{width:'24px',height:'24px',borderRadius:'50%',background:resp.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'9px',fontWeight:700,color:'#fff',flexShrink:0}}>{resp.initials}</div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Inline add form or button */}
            {newCardCol===col.id?(
              <div style={{background:surface2,border:`1px solid ${col.color}`,borderRadius:'8px',padding:'10px',marginTop:'4px'}}>
                <input autoFocus value={newTitle} onChange={e=>setNewTitle(e.target.value)} placeholder="Título del proyecto…"
                  style={{width:'100%',padding:'6px 8px',background:bg,border:`1px solid ${border}`,borderRadius:'6px',color:textPrimary,fontSize:'12px',fontFamily:"'Instrument Sans',sans-serif",outline:'none',marginBottom:'6px'}}
                  onFocus={e=>e.target.style.borderColor=col.color} onBlur={e=>e.target.style.borderColor=border}
                />
                <input value={newCliente} onChange={e=>setNewCliente(e.target.value)} placeholder="Cliente…"
                  style={{width:'100%',padding:'6px 8px',background:bg,border:`1px solid ${border}`,borderRadius:'6px',color:textPrimary,fontSize:'12px',fontFamily:"'Instrument Sans',sans-serif",outline:'none',marginBottom:'6px'}}
                />
                <select value={newResp} onChange={e=>setNewResp(e.target.value)}
                  style={{width:'100%',padding:'6px 8px',background:bg,border:`1px solid ${border}`,borderRadius:'6px',color:textPrimary,fontSize:'12px',fontFamily:"'Instrument Sans',sans-serif",outline:'none',marginBottom:'8px',cursor:'pointer'}}
                >
                  {RESPONSABLES.map(r=><option key={r.id} value={r.id}>{r.nombre}</option>)}
                </select>
                <div style={{display:'flex',gap:'6px'}}>
                  <button onClick={()=>addCard(col.id)} style={{flex:1,padding:'6px',borderRadius:'6px',background:col.color,color:'#fff',border:'none',fontSize:'11px',fontWeight:700,cursor:'pointer'}}>Agregar</button>
                  <button onClick={()=>setNewCardCol(null)} style={{padding:'6px 8px',borderRadius:'6px',background:'transparent',border:`1px solid ${border}`,color:textMuted,fontSize:'11px',cursor:'pointer'}}>✕</button>
                </div>
              </div>
            ):(
              <button onClick={()=>setNewCardCol(col.id)}
                style={{width:'100%',padding:'7px',border:`1px dashed ${border}`,borderRadius:'8px',background:'transparent',color:textMuted,fontSize:'11px',cursor:'pointer',transition:'all .15s',marginTop:'4px'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=col.color;e.currentTarget.style.color=col.color;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=border;e.currentTarget.style.color=textMuted;}}
              >＋ Agregar</button>
            )}
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {modal&&(
        <div onClick={e=>{if(e.target===e.currentTarget)setModal(null);}} style={{position:'fixed',inset:0,background:'rgba(44,13,28,.5)',zIndex:500,display:'flex',alignItems:'center',justifyContent:'center',padding:'16px'}}>
          <div style={{background:bg,border:`1px solid ${border}`,borderRadius:'16px',padding:'24px',width:'90%',maxWidth:'520px',maxHeight:'90vh',overflowY:'auto',boxShadow:'0 20px 60px rgba(44,13,28,.18)',fontFamily:"'Instrument Sans',sans-serif"}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'18px'}}>
              <div>
                <input value={modal.title} onChange={e=>saveModal({...modal,title:e.target.value})}
                  style={{fontSize:'16px',fontWeight:700,color:accent,background:'transparent',border:'none',outline:'none',width:'100%',fontFamily:"'Instrument Sans',sans-serif",padding:0}}
                />
                <div style={{fontSize:'12px',color:textMuted,marginTop:'2px'}}>{modal.cliente}</div>
              </div>
              <button onClick={()=>setModal(null)} style={{background:'none',border:'none',fontSize:'18px',cursor:'pointer',color:textMuted,lineHeight:1,flexShrink:0}}>✕</button>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'14px'}}>
              {[['Cliente',modal.cliente,'cliente'],['Producto',modal.producto,'producto'],['Valor (USD)',modal.valor,'valor'],['Incoterm',modal.incoterm,'incoterm']].map(([lbl,val,key])=>(
                <div key={key}>
                  <div style={{fontSize:'10px',fontWeight:700,textTransform:'uppercase',letterSpacing:'.5px',color:textMuted,marginBottom:'4px'}}>{lbl}</div>
                  <input value={val||''} onChange={e=>saveModal({...modal,[key]:key==='valor'?Number(e.target.value)||0:e.target.value})}
                    style={{width:'100%',padding:'7px 10px',background:surface2,border:`1px solid ${border}`,borderRadius:'7px',color:textPrimary,fontSize:'13px',fontFamily:"'Instrument Sans',sans-serif",outline:'none'}}
                    onFocus={e=>e.target.style.borderColor=accent} onBlur={e=>e.target.style.borderColor=border}
                  />
                </div>
              ))}
            </div>
            <div style={{marginBottom:'14px'}}>
              <div style={{fontSize:'10px',fontWeight:700,textTransform:'uppercase',letterSpacing:'.5px',color:textMuted,marginBottom:'4px'}}>Responsable</div>
              <div style={{display:'flex',gap:'8px'}}>
                {RESPONSABLES.map(r=>(
                  <div key={r.id} onClick={()=>saveModal({...modal,resp:r.id})}
                    style={{display:'flex',alignItems:'center',gap:'8px',padding:'8px 12px',borderRadius:'8px',border:`1px solid ${modal.resp===r.id?r.color:border}`,background:modal.resp===r.id?`${r.color}15`:surface2,cursor:'pointer',transition:'all .15s',flex:1}}
                  >
                    <div style={{width:'28px',height:'28px',borderRadius:'50%',background:r.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'10px',fontWeight:700,color:'#fff',flexShrink:0}}>{r.initials}</div>
                    <div style={{fontSize:'12px',fontWeight:600,color:modal.resp===r.id?r.color:textPrimary}}>{r.nombre}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{marginBottom:'18px'}}>
              <div style={{fontSize:'10px',fontWeight:700,textTransform:'uppercase',letterSpacing:'.5px',color:textMuted,marginBottom:'4px'}}>Notas</div>
              <textarea value={modal.notas||''} onChange={e=>saveModal({...modal,notas:e.target.value})}
                rows={3} style={{width:'100%',padding:'9px 12px',background:surface2,border:`1px solid ${border}`,borderRadius:'8px',color:textPrimary,fontSize:'13px',fontFamily:"'Instrument Sans',sans-serif",outline:'none',resize:'vertical',lineHeight:1.6}}
                onFocus={e=>e.target.style.borderColor=accent} onBlur={e=>e.target.style.borderColor=border}
              />
            </div>
            <div style={{display:'flex',gap:'8px',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{fontSize:'11px',color:textMuted,fontFamily:"'DM Mono',monospace"}}>Mover a etapa:</div>
              <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
                {cols.map(col=>(
                  <button key={col.id} onClick={()=>{
                    setCols(prev=>{
                      const next=prev.map(c=>({...c,cards:[...c.cards]}));
                      const srcCol=next.find(c=>c.cards.some(card=>card.id===modal.id));
                      const dstCol=next.find(c=>c.id===col.id);
                      if(srcCol?.id===dstCol?.id)return next;
                      const idx=srcCol.cards.findIndex(c=>c.id===modal.id);
                      const [card]=srcCol.cards.splice(idx,1);
                      dstCol.cards.push(card);
                      return next;
                    });
                    setModal(null);
                  }} style={{padding:'4px 10px',borderRadius:'6px',border:`1px solid ${col.color}`,background:`${col.color}15`,color:col.color,fontSize:'11px',fontWeight:600,cursor:'pointer'}}>
                    {col.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══ CALENDARIO ══ */
function CalendarioScreen({theme}) {
  const [currentDate,setCurrentDate]=React.useState(new Date(2026,3,1)); // April 2026
  const bg=theme==='dark'?'#191b0d':'#fff';
  const border=theme==='dark'?'#2e3018':'#dad0be';
  const surface2=theme==='dark'?'#212410':'#f0ebe0';
  const textPrimary=theme==='dark'?'#e5e0d0':'#1a0f09';
  const textMuted=theme==='dark'?'#707558':'#6e5f4e';

  const EVENTS={
    '2026-04-10':[{type:'venta',label:'Venta · García & Hijos',color:'#a7001d'}],
    '2026-04-14':[{type:'vencimiento',label:'FAC-012 vence',color:'#e11d48'}],
    '2026-04-18':[{type:'venta',label:'Venta · Azeite Portugal',color:'#a7001d'},{type:'factura',label:'FAC-017 emitida',color:'#d97706'}],
    '2026-04-20':[{type:'cliente',label:'Reunión · Olivetti SpA',color:'#6b7215'}],
    '2026-04-22':[{type:'factura',label:'FAC-018 emitida',color:'#d97706'}],
    '2026-04-28':[{type:'cliente',label:'Llamada · Conservas Sevilla',color:'#6b7215'}],
    '2026-05-01':[{type:'vencimiento',label:'FAC-015 vence',color:'#e11d48'}],
    '2026-05-22':[{type:'carga',label:'ETA · CRG-014 Valencia',color:'#722F37'}],
  };

  const year=currentDate.getFullYear();
  const month=currentDate.getMonth();
  const monthName=currentDate.toLocaleString('es',{month:'long',year:'numeric'});
  const firstDay=new Date(year,month,1).getDay();
  const daysInMonth=new Date(year,month+1,0).getDate();
  const prevMonth=()=>setCurrentDate(new Date(year,month-1,1));
  const nextMonth=()=>setCurrentDate(new Date(year,month+1,1));

  const today=new Date(2026,3,23); // April 23 2026
  const isToday=(d)=>d===today.getDate()&&month===today.getMonth()&&year===today.getFullYear();

  const cells=[];
  for(let i=0;i<(firstDay===0?6:firstDay-1);i++) cells.push(null);
  for(let d=1;d<=daysInMonth;d++) cells.push(d);

  const DOW=['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];

  return(
    <div>
      <PageHeader title="📅 Calendario" subtitle="Eventos, vencimientos y reuniones"/>
      <div style={{display:'flex',gap:'16px',alignItems:'flex-start'}}>
        {/* Calendar */}
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'14px',flexWrap:'wrap'}}>
            <button onClick={prevMonth} style={{padding:'6px 14px',borderRadius:'8px',border:`1px solid ${border}`,background:bg,color:textPrimary,fontSize:'13px',cursor:'pointer'}}>‹</button>
            <h2 style={{fontSize:'17px',fontWeight:700,color:theme==='dark'?'#e05040':'#a7001d',flex:1,textAlign:'center',textTransform:'capitalize'}}>{monthName}</h2>
            <button onClick={nextMonth} style={{padding:'6px 14px',borderRadius:'8px',border:`1px solid ${border}`,background:bg,color:textPrimary,fontSize:'13px',cursor:'pointer'}}>›</button>
            <button onClick={()=>setCurrentDate(new Date(2026,3,1))} style={{padding:'6px 14px',borderRadius:'8px',border:'none',background:theme==='dark'?'#e05040':'#a7001d',color:'#fff',fontSize:'12px',fontWeight:600,cursor:'pointer'}}>Hoy</button>
          </div>
          <div style={{border:`1px solid ${border}`,borderRadius:'12px',overflow:'hidden'}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',background:surface2}}>
              {DOW.map(d=><div key={d} style={{padding:'8px 4px',textAlign:'center',fontSize:'10px',fontWeight:700,color:textMuted,textTransform:'uppercase',letterSpacing:'.5px'}}>{d}</div>)}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)'}}>
              {cells.map((day,i)=>{
                const dateStr=day?`${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`:null;
                const events=dateStr?EVENTS[dateStr]||[]:[];
                return(
                  <div key={i} style={{minHeight:'80px',padding:'5px',borderRight:`1px solid ${border}`,borderBottom:`1px solid ${border}`,background:!day?surface2:undefined,cursor:day?'pointer':undefined,transition:'background .12s'}}
                    onMouseEnter={e=>{if(day)e.currentTarget.style.background=theme==='dark'?'rgba(224,80,64,.04)':'rgba(167,0,29,.04)';}}
                    onMouseLeave={e=>{e.currentTarget.style.background='';}}
                  >
                    {day&&<div style={{width:'22px',height:'22px',borderRadius:'50%',background:isToday(day)?(theme==='dark'?'#e05040':'#a7001d'):'transparent',color:isToday(day)?'#fff':textPrimary,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:isToday(day)?700:500,marginBottom:'3px'}}>{day}</div>}
                    {events.map((ev,ei)=>(
                      <div key={ei} style={{display:'flex',alignItems:'center',gap:'3px',padding:'2px 4px',borderRadius:'4px',fontSize:'9px',fontWeight:600,marginBottom:'2px',background:`${ev.color}18`,color:ev.color,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',maxWidth:'100%'}}>
                        <span style={{width:'5px',height:'5px',borderRadius:'50%',background:ev.color,flexShrink:0}}></span>
                        <span style={{overflow:'hidden',textOverflow:'ellipsis'}}>{ev.label}</span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Agenda panel */}
        <div style={{width:'240px',flexShrink:0,background:bg,border:`1px solid ${border}`,borderRadius:'12px',padding:'14px',maxHeight:'520px',overflowY:'auto'}}>
          <h4 style={{fontSize:'11px',fontWeight:700,color:textMuted,textTransform:'uppercase',letterSpacing:'.5px',marginBottom:'12px'}}>Próximos eventos</h4>
          {Object.entries(EVENTS).sort().map(([date,events])=>(
            <div key={date} style={{marginBottom:'12px'}}>
              <div style={{fontSize:'10px',fontWeight:700,color:textMuted,textTransform:'uppercase',letterSpacing:'.5px',marginBottom:'4px',fontFamily:"'DM Mono',monospace"}}>{date}</div>
              {events.map((ev,i)=>(
                <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'7px',padding:'5px 7px',borderRadius:'6px',marginBottom:'3px',cursor:'pointer',transition:'background .12s'}}
                  onMouseEnter={e=>e.currentTarget.style.background=surface2}
                  onMouseLeave={e=>e.currentTarget.style.background=''}
                >
                  <span style={{width:'7px',height:'7px',borderRadius:'50%',background:ev.color,flexShrink:0,marginTop:'3px'}}></span>
                  <div style={{fontSize:'11px',fontWeight:600,color:textPrimary,lineHeight:1.4}}>{ev.label}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  ContactosScreen, InventarioScreen, VentasScreen,
  PrevisionScreen, ReclamosScreen, ProveedoresScreen,
  CargasScreen, ProyectosScreen, CalendarioScreen,
  REAL_PROVEEDORES, REAL_CONTACTOS, REAL_VENTAS, REAL_RECLAMOS
});
