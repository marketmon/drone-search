# Syndicate 708 - Demo Site

A lean, frontend-only demo showcasing the Syndicate 708 Collection App concept for market intelligence in defense technology.

## Pages

### Main Pages
- **Home** (`/`) - Simple landing page
- **Collection App** (`/collection`) - Hub showing all SKUs and their artifacts
- **Portfolio** (`/portfolio`) - Investment thesis and portfolio companies
- **About** (`/about`) - Organization info and team profiles

### USV Domain (First SKU)
- **USV Market Landscape** (`/usv-market`) - Company directory with collapsible details
- **USV System Breakdown** (`/usv-systems`) - Technical publication on USV architecture
- **Market Scouting** (`/market-scouting`) - Demand signal collection form
- **Company Feedback** (`/feedback`) - Submit missing companies (legacy)

## Key Features

### Content Validation Widget
- Appears on content pages (USV Market, USV Systems)
- Simple survey: 1-5 star rating + optional feedback
- After submission, offers to take user to Market Scouting
- Demonstrates the validation loop concept

### Market Scouting
- Comprehensive demand signal collection
- Organization info, requirements, procurement details
- Component interest multi-select
- All data logged to console (frontend only)

### Portfolio Display
- 10 portfolio companies with logos
- Investment thesis (3 focus areas)
- Partnership philosophy
- Clean grid layout

## Technology

- **Next.js 15** with App Router
- **shadcn/ui** components
- **Tailwind CSS** for styling
- **Frontend only** - no backend/database (demo purposes)

## Running the Demo

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

## Design System

- **Colors**: Black/white with gray accents
- **Typography**: Bold headings, mono font for labels
- **Borders**: Thick (2px) black borders
- **Buttons**: Shadow effect on hover (brutalist style)
- **Background**: Subtle grid pattern

## Demo Flow

1. User visits home → clicks **COLLECTION APP**
2. Collection hub shows **USV Domain** with artifacts + future SKUs
3. User explores content (Market Landscape, System Breakdown)
4. **Market Scouting** button always visible (black button in nav)
5. User clicks "WHAT'S MISSING?" → provides feedback on content gaps
6. After feedback → offered to share requirements via Market Scouting
7. All data logged to console for demo purposes

## Architecture

```
Home (/)
├── Collection App (/collection) ← Hub for all SKUs
│   ├── USV Domain
│   │   ├── Market Landscape (/usv-market)
│   │   ├── System Breakdown (/usv-systems)
│   │   └── Market Scouting (/market-scouting)
│   └── Future Domains
│       ├── Electric Stack (coming soon)
│       ├── Air Drones (coming soon)
│       └── Energy Systems (coming soon)
├── Portfolio (/portfolio)
└── About (/about)
```

## Architecture Notes

This implements the Collection App framework for the USV domain:
- Content artifacts that capture attention ✓
- Embedded feedback/validation mechanisms ✓
- Market scouting for demand aggregation ✓
- Modular design (can duplicate for Electric Stack, etc.) ✓

Frontend-only for rapid iteration on layout and UX. Backend integration (Neon PostgreSQL) can be added later.
