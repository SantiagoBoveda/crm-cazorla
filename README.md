# Cazorla Design System

## Company Overview

**Grupo Cazorla / Tomalar SA** is an Argentine company that produces and commercializes olives (*aceitunas*) and tomato-derived products (pasta, passata, sauces, crushed). The brand operates under the **Aceitunas Cazorla** label.

The design system covers the internal CRM web app used by the commercial team for sales tracking, forecasting, invoicing, inventory, client management, and logistics.

---

## Sources

| Source | Path / URL |
|---|---|
| Main CRM codebase | `Cazorla/crm-cazorla-ia.html` (7291 lines, single-file PWA) |
| GitHub repo | `SantiagoBoveda/crm-cazorla` (main branch) |
| Logo (white bg) | `assets/logo_cazorla_white.png` |
| Logo (dark bg) | `assets/logo_cazorla.png` |

---

## Products / Surfaces

### CRM Corporativo (single product)
A single-page PWA (`crm-cazorla-ia.html`) with the following sections:

- **Dashboard** — KPIs, charts, alerts
- **Clientes** — Client records with interaction history
- **Contactos** — Contact directory
- **Proyectos** — Project tracking (Kanban)
- **Cotizaciones** — Sales quotes / proposals
- **Pipeline** — Sales funnel (Cotización → Confirmada → Despachada → Cobrada)
- **Inventario** — Stock for olives (Bombonas, Fermentadores) and tomato products
- **Ventas** — Sales log with line items
- **Cargas** — Shipment / load tracking
- **Previsión** — Monthly sales forecast by product/country/client
- **Proveedores** — Supplier directory
- **Reclamos** — Claims and complaints management
- **Facturación** — Invoice management
- **Calendario** — Event calendar linking sales, clients, invoices

**Tech**: Vanilla HTML/CSS/JS, Chart.js, Google Sheets sync, localStorage, PWA (installable).

---

## CONTENT FUNDAMENTALS

### Language & Tone
- **Language**: Spanish (es-AR, Argentina)
- **Tone**: Professional, concise, direct — this is an internal business tool, not consumer-facing
- **Voice**: Uses "vos"-implied neutral professional (no casual tuteo), no emojis in body copy
- **Casing**: Section titles in title case ("Pipeline de Ventas"), table headers in ALL CAPS with letter-spacing ("CLIENTE", "ESTADO")
- **Numbers**: Monetary values use `font-family: DM Mono` for tabular alignment; USD amounts with $ prefix
- **Labels**: Short, uppercase, letter-spaced for metadata fields (e.g. `PAÍS`, `FECHA`, `ESTADO`)
- **Emoji**: Used only in navigation icons and section headers as functional pictograms, not decorative

### Copy Examples
- Section label: `📊 Dashboard`
- Header subtitle: `Grupo Cazorla · Resumen ejecutivo`
- Table header: `CLIENTE`, `ESTADO`, `MONTO (USD)`
- Badge: `cobrada`, `pendiente`, `vencida`
- Empty state: `Sin cotizaciones`
- Action button: `+ Nueva cotización`, `☁ Sync`
- Metadata: `▸ click en celda · Tab para avanzar`

---

## VISUAL FOUNDATIONS

### Colors
See `colors_and_type.css` for full CSS custom properties.

**Primary palette (Light theme)**
- Background: `#f5f0e6` — warm cream/parchment
- Surface: `#ffffff`, `#f0ebe0`, `#ebe4d8` (layered surfaces)
- Accent (borravino/crimson): `#a7001d`
- Sidebar: `#722F37` (wine/borravino)
- Olive green: `#6b7215`
- Amber/ochre: `#b45309`
- Danger red: `#db473c`
- Text: `#1a0f09` (near-black with warm undertone)
- Muted: `#6e5f4e`, `#5c4e3a`, `#9e8e78`
- Borders: `#dad0be`, `#c4b8a5`

**Dark "warm" theme**
- Background: `#0f1008` (very dark olive-black)
- Surface: `#191b0d`, `#212410`
- Accent: `#e05040` (shifted warmer in dark mode)
- Green: `#8a9830`
- Sidebar: `#5a1228`

**Color vibe**: Earthy, warm, Mediterranean. The palette evokes the olive grove — deep crimson, olive green, amber ochre — on warm cream parchment. Never cool blues or neutral grays.

### Typography
- **Display/UI**: `Instrument Sans` (400, 500, 600, 700, italic) — Google Fonts
- **Data/Mono**: `DM Mono` (400, 500) — Google Fonts; used for all numeric data, codes, labels, timestamps

### Spacing & Layout
- **Base radius**: `12px` (cards, modals); `8px` (buttons, inputs, smaller chips); `20px` (large modal)
- **Sidebar width**: `220px` (fixed)
- **Main padding**: `28px` desktop, `16px` mobile
- **Grid gaps**: `16px` standard, `12px` compact
- **Card padding**: `20px`

### Cards
- `background: var(--surface)`, `border: 1px solid var(--border)`, `border-radius: 12px`
- Shadow: `box-shadow: 0 1px 4px rgba(167,0,29,.06)` (barely-there, tinted crimson)
- Hover state: `transform: translateY(-2px)` + slightly stronger border
- Top accent bar on some stat cards: `2px` gradient line at top (crimson/green/amber)

### Buttons
- **Primary**: `background: var(--accent)` (#a7001d), white text, hover → `--accent2` (#c8001f)
- **Outline**: transparent bg, `1px solid var(--border)`, hover → accent border + accent text
- **Colored variants**: green export btn, yellow suppliers btn — each uses `rgba` bg + matching border
- **Size**: Default `8px 16px`, small `5px 12px`

### Shadows & Depth
- Cards: `0 1px 4px rgba(167,0,29,.06)` — ultra-subtle crimson tint
- Modals: `0 20px 60px rgba(44,13,28,.18)` — deep wine shadow
- Tooltips: `0 16px 48px rgba(44,13,28,.18)`

### Borders
- Default: `1px solid #dad0be` (warm beige)
- Active/focused: `1px solid var(--accent)` (#a7001d)
- Sidebar: `1px solid #5a1f28`

### Animation
- Transitions: `all .2s` or `all .18s` (fast, snappy)
- Modal entrance: `translateY(20px) scale(.97)` → `translateY(0) scale(1)` over `.22s`
- Hover on cards: `transform: translateY(-2px)` over `.18s`
- Spin: `.7s linear infinite` (loading spinner)
- Flash cell: `.4s ease` (green flash on save)
- No bounces or spring; all `ease` or `cubic-bezier(.4,0,.2,1)` (Material-style)

### Hover/Press States
- Tables: `background: rgba(167,0,29,.04)` (subtle crimson blush)
- Nav items: `background: var(--sidebar-active-bg)` (#5a1f28)
- Buttons: opacity change or `background` shift; never shrink
- Row actions (edit/delete): hidden until row hover, then `opacity: 1`

### Sidebar
- Deep wine background `#722F37`
- White text, muted pink `#e8b4bc`
- Active item: `#5a1f28` bg + left border accent `#db473c`
- Logo area: full-bleed image with `gradient overlay` from transparent to `rgba(30,4,10,.55)`

### Backgrounds & Textures
- No patterns, textures, or images in UI backgrounds
- Logo area in sidebar uses cover image with gradient protection
- Charts use `rgba` fills (no gradients in data bars)

### Imagery
- No decorative imagery in the app
- Logo is typographic wordmark with olive motif (the 'o' in Cazorla = olive)
- Color imagery vibe: warm, earthy, low-saturation

### Transparency & Blur
- Modal overlays: `rgba(44,13,28,.5)` — wine-tinted scrim
- Backdrop filter `blur(6px)` on product/proveedor modals
- Search results: no blur; solid surface

### Corner Radii Summary
| Element | Radius |
|---|---|
| Cards, modals | 12px |
| Buttons, inputs, chips | 8px |
| Large modals | 16–20px |
| Avatar | 50% (circular) or 12px (square) |
| Badges | 20px (pill) or 6px |
| Mini elements | 4–6px |

---

## ICONOGRAPHY

Icons in the CRM are **emoji** used as functional pictograms in the navigation sidebar and section headers. There is no custom icon font or SVG icon set.

| Context | Example |
|---|---|
| Navigation | 📊 Dashboard, 👥 Clientes, 📦 Inventario, 💰 Ventas |
| Section headers | 🏭 Fermentadores, 🛢 Bombonas, 🍅 Pasta de Tomate |
| Empty states | font-size 40px emoji centered |
| Status indicators | Colored dot elements (CSS), not icons |
| Alerts | ⚠️ in table headers |

**No SVG icon system, no icon font.** For future design work, a stroke-based icon set (e.g. Lucide Icons) at 16px would align well with the compact data-dense UI style.

---

## File Index

```
README.md                        ← This file
SKILL.md                         ← Agent skill manifest
colors_and_type.css              ← All CSS custom properties + base styles
assets/
  logo_cazorla_white.png         ← Logo on white background
  logo_cazorla.png               ← Logo (dark background version)
  logo_cazorla_alt.png           ← Logo alternate
preview/
  colors-primary.html            ← Primary color swatches
  colors-surfaces.html           ← Surface / background colors
  colors-semantic.html           ← Semantic / status colors
  colors-dark.html               ← Dark theme palette
  type-scale.html                ← Typography scale specimen
  type-mono.html                 ← DM Mono data type specimen
  spacing-tokens.html            ← Spacing, radius, shadow tokens
  comp-buttons.html              ← Button variants
  comp-badges.html               ← Badge variants
  comp-inputs.html               ← Form inputs
  comp-cards.html                ← Stat cards & table cards
  comp-sidebar.html              ← Sidebar navigation
  comp-modals.html               ← Modal patterns
  comp-table.html                ← Table patterns
  brand-logo.html                ← Logo display
ui_kits/
  crm/
    README.md                    ← CRM UI kit notes
    index.html                   ← Full CRM prototype (click-thru)
    Sidebar.jsx                  ← Sidebar component
    StatCard.jsx                 ← KPI stat card
    DataTable.jsx                ← Data table component
    Modal.jsx                    ← Modal shell
    Badge.jsx                    ← Badge / status indicator
```
