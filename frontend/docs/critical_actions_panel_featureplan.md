# Critical Actions Panel - Feature Specification

## Overview
The Critical Actions Panel is a fixed right-side panel (20% width) containing four main sections: One-Page Summary button, Alerts, Action Recommendations, and Calendar. The panel has independent scrolling while the main dashboard remains static.

## Panel Structure

### Overall Layout:
```
┌─────────────────────────────┐
│ Critical Actions            │
│                             │
│ [📄 1-Page Summary]         │ ← Button Section
│                             │
├─────────────────────────────┤
│ ALERTS                      │ ← Alerts Section
│ • Stock Low                 │   (Red headers/icons)
│ • Delivery Coming           │
│ • Supply Disruption         │
│ [Acknowledge All]           │
├─────────────────────────────┤ ← Horizontal line separator
│ ACTION RECOMMENDATIONS      │ ← Recommendations Section
│ • Incentivize Supply        │   (Green headers/icons)
│ • Research Market Trend     │
│ • Contact Supplier          │
│ [Mark All Complete]         │
├─────────────────────────────┤
│ DECEMBER 2025          ◀ ▶ │ ← Calendar Section
│ Su Mo Tu We Th Fr Sa        │
│  1  2  3  4  5  6  7        │
│  8  9 10 11 12 🔴 14        │
│ ...                         │
└─────────────────────────────┘
```

## Section 1: One-Page Summary Button

### Visual Design:
- **Position:** Top of panel, below "Critical Actions" header
- **Style:** Full-width button with icon and text
- **Background:** White with TUM Blue (#0065BD) border
- **Hover:** Light blue background (#F0F7FF)
- **Icon:** FileText from lucide-react (TUM Blue)
- **Text:** "1-Page Summary" (font-semibold, 14px, TUM Blue)
- **Padding:** 16px vertical, 12px horizontal

### Modal Window Specifications:

#### Overlay:
- **Background:** Semi-transparent black (rgba(0, 0, 0, 0.6))
- **Blur Effect:** backdrop-blur-sm
- **z-index:** 50

#### Modal Container:
- **Width:** 80% of viewport (max 900px)
- **Height:** 85% of viewport (scrollable content)
- **Background:** White (#FFFFFF)
- **Border Radius:** 12px
- **Shadow:** 0 20px 60px rgba(0, 0, 0, 0.3)
- **Padding:** 32px
- **Position:** Centered on screen

#### Close Button:
- **Position:** Top-right corner, 16px from edge
- **Icon:** X from lucide-react
- **Size:** 24px × 24px
- **Color:** #6E685F (grey)
- **Hover:** #000000 (black)
- **Click:** Close modal
- **Click outside modal:** Also closes modal

### One-Page Summary Content:

#### Header:
```
BORGai Supply Chain Summary
Last Updated: December 2, 2025 - 14:30
```
- **Title:** 24px, font-bold, TUM Blue (#0065BD)
- **Timestamp:** 12px, font-normal, grey (#6E685F)
- **Border Bottom:** 2px solid #E5E5E5

#### Content Sections (Hardcoded):

**1. SUPPLY OVERVIEW (Last 30 Days)**
- **Total Cores Processed:** 2,847 units (↑ 12% vs. previous month)
- **Average Lead Time:** 53 days (↓ 2.1% improvement)
- **Forecast Accuracy:** 93% (↑ 0.8%)
- **Active SKUs:** 120 components across 24 cores

**2. CRITICAL ALERTS (Immediate Action Required)**
- **Stock Low Situations:** 1 SKU (TC_BMW_X3_2023_C001)
- **Delivery Arrivals:** 2 pallets expected Dec 12, 15:00-18:00
- **Supply Disruptions:** 3 SKUs affected by delayed core deliveries

**3. FORECAST PERFORMANCE (Last 7 Days)**
- **AI vs. Legacy Forecast:** 5% deviation (within acceptable range)
- **Model Confidence:** 89% average across all predictions
- **Prediction Accuracy:** On track for 93%+ monthly target

**4. PENDING ACTIONS (Requires Attention)**
- **Supply Incentive Needed:** 3 SKUs with critical supply levels
- **Market Research:** BMW X5 showing unexpected demand (15 SKUs)
- **Supplier Contact:** WHMUC02 has cores ready for pickup

**5. UPCOMING DELIVERIES (Next 7 Days)**
- **Dec 3:** 1 pallet (Supplier WHMUC01) - 4 SKUs
- **Dec 5:** 3 pallets (Supplier WHMUC03) - 8 SKUs
- **Dec 7:** 2 pallets (Supplier WHMUC02) - 6 SKUs
- **Dec 12:** 2 pallets (Supplier WHMUC04) - 2 SKUs

**6. WEEKLY TRENDS**
- **Demand Surge:** BMW X5 components (+23% this week)
- **Supply Improvement:** Lead times decreasing consistently
- **Quality Metrics:** 97% of returned cores meet quality standards

#### Content Styling:
- **Section Headers:** 16px, font-semibold, TUM Blue (#0065BD), uppercase
- **Body Text:** 14px, font-normal, Black (#000000)
- **Metrics:** 14px, font-semibold, Black (#000000)
- **Trend Indicators:** Green (#22C55E) for positive, Red (#EF4444) for negative
- **Section Spacing:** 20px between sections
- **Line Height:** 1.6 for readability

## Section 2: Alerts

### Container Styling:
- **Background:** White (#FFFFFF)
- **Border:** 1px solid #E5E5E5
- **Border Radius:** 8px
- **Padding:** 16px
- **Margin:** 12px 0
- **Box Shadow:** 0 1px 3px rgba(0, 0, 0, 0.08)

### Alert Cards:

#### Alert 1: Stock Low
```
[🔴] STOCK LOW
SKU: TC_BMW_X3_2023_C001
Demand > Stock + Expected Supply
```
- **Icon:** AlertTriangle (lucide-react), TUM Red (#C01530), white background circle
- **Header:** "STOCK LOW" - 12px, font-semibold, TUM Red (#C01530), uppercase
- **Body Text:** 11px, font-normal, Black (#000000)
- **SKU:** 11px, font-medium, TUM Blue (#0065BD)
- **Spacing:** 8px between lines

#### Alert 2: Delivery Coming
```
[🚚] DELIVERY COMING
2 pallets arriving Dec 12, 3-6 pm
2 SKUs affected
```
- **Icon:** Truck (lucide-react), TUM Red (#C01530), white background circle
- **Header:** "DELIVERY COMING" - 12px, font-semibold, TUM Red (#C01530), uppercase
- **Body Text:** 11px, font-normal, Black (#000000)
- **Spacing:** 8px between lines

#### Alert 3: Supply Disruption
```
[⚠️] SUPPLY DISRUPTION
Multiple cores not delivered
3 SKUs affected
```
- **Icon:** AlertCircle (lucide-react), TUM Red (#C01530), white background circle
- **Header:** "SUPPLY DISRUPTION" - 12px, font-semibold, TUM Red (#C01530), uppercase
- **Body Text:** 11px, font-normal, Black (#000000)
- **Spacing:** 8px between lines

### Alert Layout:
- **Spacing between alerts:** 12px
- **Icon size:** 20px × 20px
- **Icon background:** White circle, 32px diameter
- **Icon placement:** Left-aligned, 8px from card edge
- **Text alignment:** Left, 8px padding from icon

### Acknowledge All Button:
- **Position:** Bottom of alerts container
- **Style:** Ghost button (no background)
- **Text:** "Acknowledge All" - 12px, font-medium, grey (#6E685F)
- **Hover:** Background grey-50
- **Padding:** 8px 12px
- **Border Radius:** 6px
- **Functionality:** Toast "Feature coming soon" (sonner)

### Details Button (per alert):
- **Position:** Right side of each alert card
- **Style:** Small outline button
- **Text:** "Details" - 11px, font-medium, grey (#6E685F)
- **Hover:** Background grey-50
- **Padding:** 4px 8px
- **Border:** 1px solid #E5E5E5
- **Border Radius:** 4px
- **Functionality:** Toast "Feature coming soon" (sonner)

## Section 3: Action Recommendations

### Separator:
- **Style:** Horizontal line
- **Color:** #E5E5E5
- **Height:** 1px
- **Margin:** 16px 0

### Container Styling:
- **Background:** White (#FFFFFF)
- **Border:** 1px solid #E5E5E5
- **Border Radius:** 8px
- **Padding:** 16px
- **Margin:** 12px 0
- **Box Shadow:** 0 1px 3px rgba(0, 0, 0, 0.08)

### Recommendation Cards:

#### Recommendation 1: Incentivize Supply
```
[💰] INCENTIVIZE SUPPLY
Increase supply of SKUs with critical stock
3 SKUs affected
```
- **Icon:** TrendingUp (lucide-react), TUM Green (#22C55E), white background circle
- **Header:** "INCENTIVIZE SUPPLY" - 12px, font-semibold, TUM Green (#22C55E), uppercase
- **Body Text:** 11px, font-normal, Black (#000000)
- **Spacing:** 8px between lines

#### Recommendation 2: Research Market Trend
```
[📊] RESEARCH MARKET TREND
New BMW X5 unexpected spare part demand
15 SKUs affected
```
- **Icon:** TrendingUp (lucide-react), TUM Green (#22C55E), white background circle
- **Header:** "RESEARCH MARKET TREND" - 12px, font-semibold, TUM Green (#22C55E), uppercase
- **Body Text:** 11px, font-normal, Black (#000000)
- **Spacing:** 8px between lines

#### Recommendation 3: Contact Supplier
```
[📞] CONTACT SUPPLIER
Supplier WHMUC02 piling cores ready to supply
Action required
```
- **Icon:** Phone (lucide-react), TUM Green (#22C55E), white background circle
- **Header:** "CONTACT SUPPLIER" - 12px, font-semibold, TUM Green (#22C55E), uppercase
- **Body Text:** 11px, font-normal, Black (#000000)
- **Spacing:** 8px between lines

### Recommendation Layout:
- **Spacing between cards:** 12px
- **Icon size:** 20px × 20px
- **Icon background:** White circle, 32px diameter
- **Icon placement:** Left-aligned, 8px from card edge
- **Text alignment:** Left, 8px padding from icon

### Mark All Complete Button:
- **Position:** Bottom of recommendations container
- **Style:** Ghost button (no background)
- **Text:** "Mark All Complete" - 12px, font-medium, grey (#6E685F)
- **Hover:** Background grey-50
- **Padding:** 8px 12px
- **Border Radius:** 6px
- **Functionality:** Toast "Feature coming soon" (sonner)

### Details Button (per recommendation):
- **Position:** Right side of each card
- **Style:** Small outline button
- **Text:** "Details" - 11px, font-medium, grey (#6E685F)
- **Hover:** Background grey-50
- **Padding:** 4px 8px
- **Border:** 1px solid #E5E5E5
- **Border Radius:** 4px
- **Functionality:** Toast "Feature coming soon" (sonner)

## Section 4: Calendar

### Header:
```
DECEMBER 2025          ◀ ▶
```
- **Month/Year:** 14px, font-semibold, Black (#000000), centered
- **Navigation Buttons:** ChevronLeft, ChevronRight icons
- **Button Style:** 24px × 24px, rounded, border #E5E5E5
- **Button Hover:** Background grey-50
- **Spacing:** Month title centered, buttons on left/right edges

### Calendar Grid:

#### Day Headers:
```
Su Mo Tu We Th Fr Sa
```
- **Font:** 11px, font-medium, grey (#6E685F)
- **Spacing:** Equal width columns
- **Alignment:** Center

#### Date Cells:
- **Size:** 32px × 32px
- **Font:** 12px, font-normal
- **Border Radius:** 4px
- **Alignment:** Center

#### Cell States:

**Regular Day:**
- **Color:** Black (#000000)
- **Background:** White

**Today (December 2):**
- **Color:** White (#FFFFFF)
- **Background:** TUM Blue (#0065BD)
- **Font Weight:** font-semibold

**Critical Event Day:**
- **Icon:** AlertCircle (lucide-react), 12px
- **Color:** TUM Red (#C01530)
- **Position:** Top-right corner of cell (absolute)
- **Background:** White

**Regular Event Day:**
- **Icon:** Calendar (lucide-react), 12px
- **Color:** Grey (#6E685F)
- **Position:** Top-right corner of cell (absolute)
- **Background:** White

**Delivery Day:**
- **Icon:** Package (lucide-react), 12px
- **Color:** Grey (#6E685F)
- **Position:** Bottom-right corner of cell (absolute)
- **Background:** White

#### Tooltip (on hover):
- **Trigger:** Hover over day with event
- **Background:** Black (#000000)
- **Text Color:** White (#FFFFFF)
- **Font:** 11px, font-normal
- **Padding:** 8px 12px
- **Border Radius:** 6px
- **Max Width:** 200px

**Example Tooltips:**
- **Dec 3:** "Delivery: 1 pallet, 4 SKUs (WHMUC01)"
- **Dec 5:** "Critical: Stock review meeting"
- **Dec 12:** "Delivery: 2 pallets, 2 SKUs (WHMUC04)"
- **Dec 15:** "Meeting: Supplier negotiation"

### Hardcoded Events:

**December 2025:**
- **Dec 2 (Today):** No events
- **Dec 3:** Delivery event (grey package icon)
- **Dec 5:** Critical event (red alert icon) + Delivery event
- **Dec 7:** Delivery event (grey package icon)
- **Dec 10:** Regular event (grey calendar icon)
- **Dec 12:** Delivery event (grey package icon)
- **Dec 15:** Regular event (grey calendar icon)
- **Dec 18:** Critical event (red alert icon)
- **Dec 20:** Delivery event (grey package icon)
- **Dec 22:** Regular event (grey calendar icon)

### Navigation Behavior:
- **Next Month:** Shows January 2026 calendar
- **Previous Month:** Shows November 2025 calendar
- **Does NOT remember:** Returns to December 2025 when navigating away and back

## Panel Scroll Behavior

### Container:
- **Overflow:** overflow-y-auto
- **Scrollbar:** Custom styled (thin, TUM Blue thumb)
- **Scroll Independence:** Panel scrolls independently from main dashboard
- **Header Scroll:** "Critical Actions" title scrolls with content (not fixed)

### Scrollbar Styling:
```css
scrollbar-width: thin;
scrollbar-color: #0065BD #F0F0F0;

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #F0F0F0;
}

::-webkit-scrollbar-thumb {
  background: #0065BD;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #004A8F;
}
```

## Technical Implementation

### Components to Create:
1. **CriticalActionsPanel.tsx** - Main container (already exists, needs refactor)
2. **OnePageSummaryModal.tsx** - Modal with one-page summary
3. **AlertCard.tsx** - Reusable alert card component
4. **RecommendationCard.tsx** - Reusable recommendation card
5. **CalendarWidget.tsx** - Calendar with navigation and events (already exists, needs updates)

### Data Files:
- **lib/data/critical-alerts.ts** - Hardcoded alerts
- **lib/data/action-recommendations.ts** - Hardcoded recommendations
- **lib/data/one-page-summary.ts** - Hardcoded summary content
- **lib/data/calendar-events.ts** - Hardcoded calendar events (update existing)

### Key Dependencies:
- **lucide-react:** Icons (AlertTriangle, Truck, AlertCircle, TrendingUp, Phone, Package, Calendar, FileText, X, ChevronLeft, ChevronRight)
- **sonner:** Toast notifications for "Feature coming soon"
- **@radix-ui/react-tooltip:** Tooltips for calendar events

## Color Reference

| Element | Color | Hex |
|---------|-------|-----|
| Alert Headers | TUM Red | #C01530 |
| Alert Icons | TUM Red | #C01530 |
| Recommendation Headers | TUM Green | #22C55E |
| Recommendation Icons | TUM Green | #22C55E |
| Critical Events | TUM Red | #C01530 |
| Regular Events | Grey | #6E685F |
| Delivery Icons | Grey | #6E685F |
| Today Highlight | TUM Blue | #0065BD |
| Body Text | Black | #000000 |
| Secondary Text | Grey | #6E685F |
| Borders | Light Grey | #E5E5E5 |

## Acceptance Criteria

✅ Panel has independent scrolling
✅ One-Page Summary button opens modal with backdrop blur
✅ Modal closes on X button or outside click
✅ Modal content shows all 6 sections with proper formatting
✅ Alerts section shows 3 alerts with red headers and icons
✅ Recommendations section shows 3 recommendations with green headers and icons
✅ "Acknowledge All" and "Mark All Complete" buttons show toast
✅ "Details" buttons on each card show toast
✅ Calendar shows December 2025 with today (Dec 2) highlighted in blue
✅ Calendar events shown with appropriate icons (red/grey/package)
✅ Calendar navigation buttons work (prev/next month)
✅ Calendar tooltips show on hover with event details
✅ All colors match TUM palette
✅ Spacing and typography consistent with dashboard design
✅ Responsive design (panel collapses on tablet/mobile)
