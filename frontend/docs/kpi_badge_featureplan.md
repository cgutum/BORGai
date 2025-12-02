KPI Dashboard Badge - Design Specification & Implementation Plan

## Overview
The KPI badge is a collapsible section positioned at the top of the main dashboard, displaying 4 key performance indicators with navigation carousel and an alert summary chart.

## Layout Position & Structure

### Page Layout Hierarchy (Top to Bottom):
1. **Main Navigation Bar** (full width, at top)
2. **Two-Column Layout Below Navigation:**
   - **Left Column (80% width):**
     - KPI Badge Section (full width of 80% column)
     - Filter Badges Section (20% of 80% column = 16% of page)
     - Forecast Chart (80% of 80% column = 64% of page)
   - **Right Column (20% width):**
     - Critical Actions Panel (full height, fixed)

### Width Distribution:
- **Left Section:** 80% of page width
  - KPI Badge: Full width of left section
  - Below KPI Badge:
    - Filters: 20% (of left section)
    - Chart: 80% (of left section)
- **Right Section:** 20% of page width (Critical Actions - full height)

### KPI Badge Positioning:
- **Width:** Spans full width of left 80% column
- **Position:** Top of left column, below main navigation
- **Behavior:** Collapsible/Expandable (Ausklappbar/Einklappbar)
- **Separation:** Filter/chart split begins UNDER the KPI badge within left column

### Layout Visual Diagram:
```
┌──────────────────────────────────────────────────────────────────┐
│                    MAIN NAVIGATION BAR (100%)                    │
├───────────────────────────────────────────┬──────────────────────┤
│  KPI BADGE (80% width)                    │  CRITICAL ACTIONS    │
│  [▼] KPIs                                 │  (20% - Full Height) │
│  ┌────┬────┬────┬────┐  ◀ ▶  ┌────────┐ │                      │
│  │KPI1│KPI2│KPI3│KPI4│        │ Alert  │ │  - Stock Alerts      │
│  └────┴────┴────┴────┘        │Summary │ │  - Delivery Alerts   │
│                                └────────┘ │  - Calendar Widget   │
├──────────┬────────────────────────────────┤                      │
│ FILTERS  │  FORECAST CHART (64%)          │                      │
│ (16%)    │                                │                      │
│          │                                │                      │
│ Category │                                │                      │
│ Cores    │                                │                      │
│ Comps    │                                │                      │
└──────────┴────────────────────────────────┴──────────────────────┘
```

## KPI Badge Component Structure

### Header Section:
- **Title:** "KPIs" (black text, left-aligned)
- **Collapse/Expand Button:** [▼] or [▶] icon (black) next to title
- **Behavior:** Clicking toggles KPI badge visibility

### Content Layout (when expanded):
```
┌─────────────────────────────────────────────────────────────────────┐
│ [▼] KPIs                                                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   ┌──────────────┐  │
│  │  KPI 1 │ │  KPI 2 │ │  KPI 3 │ │  KPI 4 │   │    Alert     │  │
│  │        │ │        │ │        │ │        │   │   Summary    │  │
│  │ Chart  │ │ Chart  │ │ Chart  │ │ Chart  │   │              │  │
│  └────────┘ └────────┘ └────────┘ └────────┘   │    Chart     │  │
│                                                 │              │  │
│           ◀     Navigation Buttons     ▶        └──────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Left Section - KPI Carousel (4 visible cards):
- **Layout:** 4 KPI cards displayed horizontally
- **Navigation:** Center-positioned ◀ ▶ buttons below the 4 cards
- **Carousel Behavior:** 
  - 6 total items: 5 KPIs + "Create KPI" button
  - Clicking ▶ once: Shows KPI 5 (Core Inventory Coverage)
  - Clicking ▶ twice: Shows "Create KPI" button
  - Clicking ◀: Navigate back through carousel
- **Button Style:** Simple arrow buttons, consistent with chart navigation

### Right Section - Alert Summary (Always Visible):
- **Position:** Fixed on right side, independent of carousel navigation
- **Width:** ~25-30% of KPI badge width
- **Layout:** Alert Summary Chart (as described below)

## SCREENSHOT 1: Alert Summary Chart Design Reference

### Purpose: 
Shows current alert monitoring system (always visible on right)

### Layout & Structure:
- **Background:** White (matching dashboard cards)
- **Title:** "Alert Summary" (black text, left-aligned, font-semibold)
- **Subtitle:** "ALL ALERTS" with info icon (?) button
- **Large Metric:** "16" (black, bold, large - total alerts)
- **Area Chart:** Filled area graph below metric
- **Time Period:** "Last 30 days" (bottom left, small grey text)
- **Breakdown Section:**
  - "FORECAST ALERTS: 12" (TUM Blue #0065BD)
  - "MODEL PERFORMANCE ALERTS: 4" (TUM Blue #0065BD)

### Visual Details:
- Chart: Light blue/cyan fill with darker teal border
- Subtle grid lines
- Responsive height matching KPI card height

## SCREENSHOT 2: KPI Card Design Pattern

### Purpose: 
Individual KPI card design template (4 visible in carousel)

### Layout & Structure (Each KPI Card):

#### Header Row:
- **KPI Label:** Uppercase text (e.g., "RECENT MODEL ACCURACY")
- **Info Icon:** Small (?) button on right (tooltip on hover)
- **Styling:** Black text (#000000), font-semibold, text-xs

#### Metric Display:
- **Large Number:** Main metric value (e.g., "93%", "5%", "53 Days", "69%", "84%")
- **Font:** Large, bold (text-2xl or text-3xl)
- **Color:** TUM Blue (#0065BD) for primary metrics

#### Trend Indicator:
- **Arrow Icon:** ↑ (green) or ↓ (red/coral)
- **Change Value:** Percentage with sign (e.g., "+0.8%", "-0.5%", "-2.1%", "+0.8%", "+1%")
- **Colors:**
  - Positive (up): TUM Green (#A2AD00) 
  - Negative (down): Accent Red (#C01530)
- **Font:** Small text (text-sm), font-medium

#### Chart Visualization:
- **Type:** Area chart (Recharts)
- **Position:** Bottom 50-60% of card
- **Style:** 
  - Smooth curve rendering
  - Gradient fill from TUM Blue to transparent
  - No axis labels/grid
  - Subtle animation on load
- **Height:** ~80-100px

#### Time Period Label:
- **Text:** "Last 30 days", "Last 12 Months", "Next 30 days"
- **Position:** Bottom left of chart area
- **Styling:** Text-xs, grey (#6E685F)

### Card Styling:
- **Background:** White (#FFFFFF)
- **Border:** 1px solid #E5E5E5
- **Border Radius:** 8px (rounded-lg)
- **Shadow:** 0 1px 3px rgba(0, 0, 0, 0.08)
- **Padding:** 16px (p-4)
- **Hover:** Shadow increases to 0 4px 8px rgba(0, 0, 0, 0.12)

## KPI Data Specifications (Hardcoded MVP)

### KPI 1: Recent Model Accuracy
- **Label:** "RECENT MODEL ACCURACY"
- **Value:** 93%
- **Change:** +0.8% (positive, green arrow up)
- **Time Period:** "Last 30 days"
- **Chart Data:** 30 data points (mock accuracy trend 89%-95%)
- **Color Theme:** TUM Blue (#0065BD)

### KPI 2: AI Forecast vs. Legacy Forecast
- **Label:** "AI FORECAST VS. LEGACY FORECAST"
- **Value:** 5%
- **Change:** -0.5% (negative, red arrow down)
- **Time Period:** "Last 30 days"
- **Chart Data:** 30 data points (mock deviation trend 4%-7%)
- **Color Theme:** TUM Blue (#0065BD)

### KPI 3: Average Lead Time
- **Label:** "AVERAGE LEAD TIME"
- **Value:** 53 Days
- **Change:** -2.1% (negative, red arrow down - improvement in this case)
- **Time Period:** "Last 12 Months"
- **Chart Data:** 12 data points (mock lead time trend 48-58 days)
- **Color Theme:** TUM Blue (#0065BD)

### KPI 4: Average Return Rate
- **Label:** "AVERAGE RETURN RATE"
- **Value:** 69%
- **Change:** +0.8% (positive, green arrow up)
- **Time Period:** "Last 12 Months"
- **Chart Data:** 12 data points (mock return rate trend 65%-72%)
- **Color Theme:** TUM Blue (#0065BD)

### KPI 5: Core Inventory Coverage (Carousel Position 2)
- **Label:** "CORE INVENTORY COVERAGE"
- **Value:** 84%
- **Change:** +1% (positive, green arrow up)
- **Time Period:** "Next 30 days"
- **Chart Data:** 30 data points (mock forecast coverage trend 80%-87%)
- **Color Theme:** TUM Blue (#0065BD)

### KPI 6: Create KPI Button (Carousel Position 3)
- **Type:** Action card (not a metric card)
- **Icon:** Large + (plus) icon
- **Text:** "Create KPI"
- **Styling:** Dashed border, grey text (#6E685F)
- **Hover:** Background lightens slightly
- **Click Action:** Toast notification "Feature coming soon" (using sonner)

## Navigation & Carousel Behavior

### Navigation Buttons:
- **Position:** Centered below the 4 KPI cards
- **Buttons:** ◀ (Previous) and ▶ (Next)
- **Styling:**
  - Background: White with border (#E5E5E5)
  - Hover: Background grey-50
  - Disabled: 50% opacity when at start/end
  - Size: w-10 h-10, rounded-full
  - Icon: Black (#000000)

### Carousel States:
- **State 1 (Initial):** KPI 1, 2, 3, 4 visible | ◀ disabled, ▶ enabled
- **State 2 (After 1 click ▶):** KPI 2, 3, 4, 5 visible | Both ◀ ▶ enabled
- **State 3 (After 2 clicks ▶):** KPI 3, 4, 5, Create KPI visible | ◀ enabled, ▶ disabled

### Alert Summary (Always Visible):
- **Position:** Fixed on right, does NOT scroll with carousel
- **Width:** 1 card width (~25% of KPI badge area)

## Collapse/Expand Functionality

### Collapsed State:
- **Display:** Only header visible: "[▶] KPIs"
- **Height:** Single row (~40px)
- **Behavior:** Clicking ▶ expands the section

### Expanded State:
- **Display:** Full KPI badge with cards and navigation
- **Icon:** [▼] KPIs
- **Behavior:** Clicking ▼ collapses the section

### State Persistence:
- Use local state (useState) for collapse/expand
- Default: Expanded on initial page load

## Responsive Design

### Desktop (1024px+):
- 4 KPI cards + Alert Summary visible
- Full carousel navigation
- All features functional

### Tablet (768px-1023px):
- 3 KPI cards + Alert Summary
- Carousel adjusts (show 3 at a time)
- Navigation buttons remain

### Mobile (320px-767px):
- 2 KPI cards stacked
- Alert Summary below KPIs
- Swipe gestures for carousel (optional Phase 2)

## Technical Implementation Notes

### Components to Create:
1. **KPIBadge.tsx** - Main container with collapse/expand logic
2. **KPICard.tsx** - Reusable KPI card component
3. **KPICarousel.tsx** - Carousel container with navigation
4. **AlertSummaryChart.tsx** - Alert summary card component
5. **CreateKPICard.tsx** - Special card for "Create KPI" action

### Data Files:
- **lib/data/kpi-metrics.ts** - Hardcoded KPI data (values, trends, chart data)
- Update **lib/types.ts** - Add KPI interfaces

### Key Dependencies:
- Recharts (already installed) for area charts
- Sonner (already installed) for toast notifications
- Lucide React for icons (ArrowUp, ArrowDown, ChevronLeft, ChevronRight, Plus, Info)

### Styling:
- Use existing TUM color palette
- Match forecast chart card styling
- Consistent spacing with dashboard grid

## Acceptance Criteria

✅ KPI Badge positioned below main nav, above filter/chart split
✅ Collapsible with [▼]/[▶] button next to "KPIs" heading
✅ 4 KPI cards visible initially
✅ Alert Summary always visible on right
✅ Navigation buttons ◀ ▶ centered below KPI cards
✅ Carousel shows 3 states (6 items total: 5 KPIs + Create button)
✅ Create KPI button shows "Feature coming soon" toast
✅ All KPIs display: value, change, trend arrow, area chart, time period
✅ Charts render with smooth animations
✅ Responsive design (4/3/2 cards on desktop/tablet/mobile)
✅ No data filtering (hardcoded, independent of sidebar filters)
✅ Matches existing dashboard design language (colors, spacing, shadows)
