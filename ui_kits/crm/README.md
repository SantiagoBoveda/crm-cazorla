# CRM Cazorla — UI Kit

## Overview
High-fidelity click-through prototype of the CRM Corporativo used by Grupo Cazorla / Tomalar SA.
Recreated from the single-file PWA (`Cazorla/crm-cazorla-ia.html`).

## Screens
1. **Dashboard** — KPIs, stock bars, recent sales, alerts
2. **Clientes** — Client table with search & filter
3. **Cotizaciones** — Quote management table
4. **Pipeline** — Sales funnel stages + deal table
5. **Facturación** — Invoice list with status filters

## Components
| File | Description |
|---|---|
| `Sidebar.jsx` | Navigation sidebar with logo, nav items, user chip |
| `Badge.jsx` | Status badges, urgency dots, filter pills |
| `StatCard.jsx` | KPI stat cards with accent bar variants |
| `DataTable.jsx` | Sortable data table with badges & row actions |
| `index.html` | Main prototype — click-through all screens |

## Usage
Open `index.html` in a browser. Click nav items to switch screens.

## Design Notes
- Fonts: Instrument Sans (UI) + DM Mono (data)
- Primary: `#a7001d` (borravino crimson)
- Sidebar: `#722F37` (wine)
- Background: `#f5f0e6` (warm cream)
- See `../../colors_and_type.css` for full token reference
