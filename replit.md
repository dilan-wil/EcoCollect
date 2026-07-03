# EcoCollect AI

Prototype SaaS français de gestion intelligente des déchets urbains, propulsé par l'IA. Application frontend uniquement avec données mock réalistes.

## Run & Operate

- `pnpm --filter @workspace/ecocollect-ai run dev` — run the frontend (port assigned by workflow)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000) — not used by this prototype

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- React + Vite, TailwindCSS, shadcn/ui
- Routing: wouter
- State: zustand
- Charts: Recharts
- Maps: Leaflet + react-leaflet (Lyon, France)
- Animations: Framer Motion
- Forms: React Hook Form
- No backend, no database, no auth — all mock data

## Where things live

- `artifacts/ecocollect-ai/src/` — full frontend app
- `artifacts/ecocollect-ai/src/data/mockData.ts` — all mock JSON data
- `artifacts/ecocollect-ai/src/components/` — reusable components (layout, ui)
- `artifacts/ecocollect-ai/src/pages/` — all page components (citoyen/, admin/, agent/)
- `artifacts/ecocollect-ai/src/store.ts` — zustand store (role switcher)

## Architecture decisions

- Frontend-only prototype — no backend, no API calls, no authentication
- Three user roles (Citoyen, Admin, Agent) switchable via navbar dropdown
- All GPS coordinates centered around Lyon, France
- Leaflet markers use L.divIcon with custom HTML (no external PNG assets)
- Status values are singular in data: 'Validé', 'Assigné', 'Complété', 'Rejeté' — UI maps plural labels to singular values

## Product

Three role experiences:
1. **Citoyen** — signaler des dépôts sauvages, suivre ses signalements, voir l'analyse IA
2. **Administrateur** — tableau de bord KPI, gestion signalements/agents/véhicules, carte, analytics, clustering IA
3. **Agent de Collecte** — missions du jour, carte route, marquer missions complétées

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Leaflet requires `import 'leaflet/dist/leaflet.css'` in MapComponent
- Status filter tabs use plural French labels but filter against singular internal status values — always use the `tabStatusMap` pattern
- Leaflet PNG marker imports require `declare module "*.png"` in `src/vite-env.d.ts`
- zustand must be installed separately (`pnpm add zustand` in the artifact)
- leaflet + react-leaflet + @types/leaflet must be installed separately

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
