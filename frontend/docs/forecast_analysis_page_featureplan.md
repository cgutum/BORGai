# Forecast Analysis Page - Feature Plan

**Project**: REMAN Dashboard  
**Feature**: Forecast Analysis Page Redesign  
**Date**: December 2, 2025  
**Status**: Planning Phase

---

## 1. Executive Summary

This document outlines the complete redesign of the Forecast Analysis page, transitioning from a single-column layout to a sophisticated three-panel structure. The new design removes the right-side Critical Actions Panel, introduces a left-side Filters Panel with constrained height, adds a Core Details Card, and restructures the main content area with enhanced control options.

**Key Changes:**
- Remove Critical Actions Panel (not needed on this page)
- Add left sidebar Filters Panel (20-25% width, 4x navigation bar height)
- Add Core Details Card at top right (same height as filters)
- Restructure main content with new tab structure and control buttons
- Replace three sub-views with two sub-headers
- Add Detailed/Aggregate view toggles
- Change dropdown from "Display Mode" to "Absolute/Relative Values"

---

## 2. Layout Structure

### 2.1 Page Grid Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ MAIN NAVIGATION BAR (inherited from dashboard layout)          │
├──────────────────┬──────────────────────────────────────────────┤
│ FILTERS PANEL    │ CORE DETAILS CARD                            │
│ (Left Sidebar)   │ (Top Right)                                  │
│                  │                                              │
│ - Preset Views   │ - Core Name & SKU                           │
│ - Cores Selection│ - Status Badges                             │
│                  │ - Metadata Icons                            │
│ Height: 4x nav   │ - Action Buttons                            │
│ Width: 20-25%    │ - Last Action Footer                        │
│                  │ Height: Same as filters                     │
├──────────────────┴──────────────────────────────────────────────┤
│ MAIN DATA TABLE CARD (Full width below both cards)             │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Tabs: [Forecast Overview] [Analysis*] [History]            │ │
│ ├─────────────────────────────────────────────────────────────┤ │
│ │                                                             │ │
│ │ Header: "Forecast Analysis" (H2, black)                    │ │
│ │                                                             │ │
│ │ Sub-headers:                                                │ │
│ │   • Forecast Data Analysis (preselected, underlined)       │ │
│ │   • Forecast Model Analysis (dummy, coming soon)           │ │
│ │                                                             │ │
│ │ Controls:                                                   │ │
│ │   [Detailed View*] [Aggregate View]                        │ │
│ │   Dropdown: [Absolute Values* | Relative Values]           │ │
│ │   [🔍 Filters] [Update] [⬇ Download]                       │ │
│ │                                                             │ │
│ ├─────────────────────────────────────────────────────────────┤ │
│ │ FEATURE CONTRIBUTION TABLE (Heatmap)                       │ │
│ │                                                             │ │
│ │ - AI Forecast row (blue background)                        │ │
│ │ - EXTERNAL DATA group (collapsible)                        │ │
│ │ - SALES ORDERS group (collapsible)                         │ │
│ │ - EVENTS group (collapsible)                               │ │
│ │                                                             │ │
│ │ - Legend at bottom                                         │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

* = Active/Selected state
```

### 2.2 Grid Specifications

**CSS Grid Structure:**
```css
.page-container {
  display: grid;
  grid-template-columns: minmax(20%, 25%) 1fr;
  grid-template-rows: auto 1fr;
  gap: 1.5rem;
  padding: 1.5rem;
}

.filters-panel {
  grid-column: 1;
  grid-row: 1;
  height: calc(var(--nav-bar-height) * 4); /* Fixed height */
}

.core-details-card {
  grid-column: 2;
  grid-row: 1;
  height: calc(var(--nav-bar-height) * 4); /* Same as filters */
}

.main-content-card {
  grid-column: 1 / -1; /* Span both columns */
  grid-row: 2;
}
```

---

## 3. Component Specifications

### 3.1 Filters Panel Component

**Component**: `ForecastFiltersPanel.tsx`  
**Location**: `components/features/forecast-analysis/`

#### 3.1.1 Structure

```tsx
<Card className="h-full border-[#D3D0CC] flex flex-col">
  <CardHeader>
    <h3>Filters</h3>
  </CardHeader>
  
  <CardContent className="flex-1 overflow-y-auto space-y-4">
    {/* Preset Views Dropdown */}
    <div>
      <label>Preset Views</label>
      <Select disabled value={presetView}>
        <option value="all">All (grayed out)</option>
        <option value="favorites">Favorites (highlighted, grayed out)</option>
        <option value="high-priority">High Priority (grayed out)</option>
        <option value="standard">Standard (grayed out)</option>
      </Select>
    </div>
    
    {/* Cores Multi-Select */}
    <div>
      <label>Cores</label>
      <MultiSelectDropdown
        disabled
        selectedIds={['TC_BMW_x3_2023']}
        options={coresWithFavorites}
        placeholder="Select cores..."
        searchable
      />
    </div>
  </CardContent>
</Card>
```

#### 3.1.2 Visual Design

- **Height**: Fixed at `calc(var(--nav-bar-height) * 4)` (~240-280px depending on nav bar)
- **Width**: 20-25% of viewport width
- **Border**: `#D3D0CC` (consistent grey)
- **Background**: White `#FFFFFF`
- **Overflow**: `overflow-y: auto` for content, hidden for card itself

#### 3.1.3 Preset Views Dropdown

**States:**
- All options are **grayed out** (disabled appearance)
- Current selection shown with grey text
- **"Favorites"** option has star icon and bold styling (even when disabled)
- Dropdown chevron visible but non-interactive

**Styling:**
```css
.preset-dropdown {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #F5F5F5;
}

.preset-option.favorites {
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
```

#### 3.1.4 Cores Multi-Select

**Behavior:**
- Shows **one pre-selected core**: `TC_BMW_x3_2023` (BMW x3 Turbocharger)
- Entire dropdown is **disabled** (grayed out)
- Clicking opens dropdown (same component as main dashboard) but no selection changes possible
- Search field visible but disabled
- Favorite cores still show star icon and highlighted background (but grayed)

**Visual State:**
```css
.cores-multiselect:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: #F5F5F5;
}

.core-option.favorite:disabled {
  background-color: rgba(0, 101, 189, 0.05); /* Very light blue */
}
```

#### 3.1.5 Data Requirements

**Hardcoded Data:**
- Preset view: `"favorites"` (preselected)
- Selected core: `TC_BMW_x3_2023`
- Available cores: Full list from `forecast-data.ts` with `isFavorite` flags

---

### 3.2 Core Details Card Component

**Component**: `CoreDetailsCard.tsx`  
**Location**: `components/features/forecast-analysis/`

#### 3.2.1 Structure

```tsx
<Card className="h-full border-[#D3D0CC] flex flex-col">
  <CardContent className="flex-1 flex flex-col justify-between p-6">
    {/* Top Section: Core Info + Status Badges */}
    <div className="flex items-start justify-between">
      <div>
        <h2 className="text-xl font-semibold text-[#000000]">
          Turboflow BMW x3 2025
        </h2>
        <p className="text-sm text-[#6E685F] mt-1">
          SKU: TCBMW_X3_2023_5
        </p>
      </div>
      
      <div className="flex gap-2">
        <Badge className="bg-[#E37222] text-white">Need Review</Badge>
        <Badge className="bg-[#22C55E] text-white">Open</Badge>
      </div>
    </div>
    
    {/* Middle Section: Action Buttons */}
    <div className="flex gap-3">
      <Button className="bg-[#0065BD] text-white hover:bg-[#004a8f]">
        Accept Forecast
      </Button>
      <Button variant="outline" className="border-[#D3D0CC]">
        Overwrite
      </Button>
    </div>
    
    {/* Bottom Section: Metadata Icons */}
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm text-[#6E685F]">
        <AlertCircle className="h-4 w-4" />
        <span>3 Alerts connected to this core</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-[#6E685F]">
        <Clock className="h-4 w-4" />
        <span>Generated 2 hours ago</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-[#6E685F]">
        <Lock className="h-4 w-4" />
        <span>Locked by M. Bie until Dec 5, 2025</span>
      </div>
    </div>
    
    {/* Footer: Last Action */}
    <div className="pt-4 border-t border-[#D3D0CC]">
      <p className="text-xs text-[#6E685F]">
        Last Action: <span className="font-medium">M. Bie</span> on{' '}
        <span className="font-medium">Nov 28, 2025 at 14:32</span>
      </p>
    </div>
  </CardContent>
</Card>
```

#### 3.2.2 Visual Design

- **Height**: Same as Filters Panel (`calc(var(--nav-bar-height) * 4)`)
- **Layout**: Flexbox column with `justify-between` for equal spacing
- **Border**: `#D3D0CC`
- **Padding**: `p-6` (24px)

#### 3.2.3 Core Information

**Core Name:**
- Font: 20px, font-semibold
- Color: Black `#000000`
- Example: "Turboflow BMW x3 2025"

**SKU:**
- Font: 14px, normal weight
- Color: Grey `#6E685F`
- Format: "SKU: TCBMW_X3_2023_5"
- Margin top: 4px

#### 3.2.4 Status Badges

**Position**: Top right corner, aligned with core name

**Badge 1: Need Review**
- Background: `#E37222` (TUM Orange)
- Text: White `#FFFFFF`
- Font: 12px, font-medium
- Padding: 4px 12px
- Border radius: 4px

**Badge 2: Open**
- Background: `#22C55E` (Green)
- Text: White `#FFFFFF`
- Same styling as Badge 1

#### 3.2.5 Action Buttons

**Accept Forecast Button:**
- Background: TUM Blue `#0065BD`
- Hover: Darker blue `#004a8f`
- Text: White `#FFFFFF`
- Font: 14px, font-medium
- Padding: 10px 20px
- **Interaction**: Shows toast "Feature coming soon" (dummy button)

**Overwrite Button:**
- Variant: Outline
- Border: Grey `#D3D0CC`
- Text: Black `#000000`
- Same size as Accept button
- **Interaction**: Shows toast "Feature coming soon" (dummy button)

#### 3.2.6 Metadata Icons

**Icon 1: Alerts**
- Icon: `AlertCircle` from lucide-react
- Size: 16px (h-4 w-4)
- Color: Grey `#6E685F`
- Text: "3 Alerts connected to this core"
- **Note**: Number should be dynamic based on actual alerts

**Icon 2: Generated Time**
- Icon: `Clock` from lucide-react
- Size: 16px
- Color: Grey `#6E685F`
- Text: "Generated 2 hours ago" (relative time)
- **Format**: Use relative time (e.g., "2 hours ago", "5 minutes ago", "1 day ago")

**Icon 3: Locked Status**
- Icon: `Lock` from lucide-react
- Size: 16px
- Color: Grey `#6E685F`
- Text: "Locked by [Username] until [Date]"
- **Format**: "Locked by M. Bie until Dec 5, 2025"

**Spacing:**
- Gap between icon and text: 8px (gap-2)
- Vertical spacing between rows: 8px (space-y-2)

#### 3.2.7 Last Action Footer

**Structure:**
- Border top: 1px solid `#D3D0CC`
- Padding top: 16px (pt-4)
- Font: 12px, normal weight
- Color: Grey `#6E685F`

**Format:**
```
Last Action: [Username] on [Date] at [Time]
Example: Last Action: M. Bie on Nov 28, 2025 at 14:32
```

**Styling:**
- Username and datetime are **font-medium** (slightly bolder)
- Rest of text is normal weight

#### 3.2.8 Data Requirements

**Hardcoded Data:**
```typescript
const coreDetails = {
  coreName: "Turboflow BMW x3 2025",
  sku: "TCBMW_X3_2023_5",
  statusBadges: [
    { label: "Need Review", color: "#E37222" },
    { label: "Open", color: "#22C55E" }
  ],
  metadata: {
    alertCount: 3,
    generatedTime: "2 hours ago",
    lockedBy: "M. Bie",
    lockedUntil: "Dec 5, 2025"
  },
  lastAction: {
    user: "M. Bie",
    date: "Nov 28, 2025",
    time: "14:32"
  }
};
```

---

### 3.3 Main Content Card Component

**Component**: `AnalysisMainContent.tsx`  
**Location**: `components/features/forecast-analysis/`

#### 3.3.1 Structure

```tsx
<Card className="border-[#D3D0CC]">
  {/* Tabs Row */}
  <Tabs defaultValue="analysis">
    <TabsList className="border-b border-[#D3D0CC]">
      <TabsTrigger value="overview">Forecast Overview</TabsTrigger>
      <TabsTrigger value="analysis">Analysis</TabsTrigger>
      <TabsTrigger value="history">History</TabsTrigger>
    </TabsList>
    
    <TabsContent value="analysis" className="p-6">
      {/* Header */}
      <h2 className="text-xl font-semibold text-[#000000] mb-4">
        Forecast Analysis
      </h2>
      
      {/* Sub-Headers (Button Style with Dot + Underline) */}
      <div className="flex gap-6 mb-6">
        <button className="flex items-center gap-2 text-sm font-medium text-[#000000] border-b-2 border-[#0065BD] pb-2">
          <div className="w-2 h-2 rounded-full bg-[#0065BD]" />
          Forecast Contribution Analysis
        </button>
        <button className="flex items-center gap-2 text-sm text-[#6E685F] pb-2">
          <div className="w-2 h-2 rounded-full bg-[#6E685F]" />
          Forecast Detail Analysis
        </button>
      </div>
      
      {/* Grey Line Separator */}
      <div className="border-t border-[#D3D0CC] mb-6" />
      
      {/* Control Buttons Box */}
      <div className="flex items-center gap-4 mb-6 p-4 bg-[#F5F5F5] rounded">
        {/* View Toggle */}
        <div className="flex border border-[#D3D0CC] rounded overflow-hidden">
          <button className="px-4 py-2 text-sm font-medium bg-[#0065BD] text-white">
            Detailed View
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-white text-[#000000]">
            Aggregate View
          </button>
        </div>
        
        {/* Dropdown */}
        <Select defaultValue="absolute">
          <option value="absolute">Absolute Values</option>
          <option value="relative">Relative Values</option>
        </Select>
        
        {/* Action Buttons */}
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
        <Button className="bg-[#0065BD]">Update</Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>
      
      {/* Feature Table */}
      <FeatureTable viewMode={viewMode} valueMode={valueMode} />
    </TabsContent>
    
    <TabsContent value="overview">
      {/* Placeholder - shows toast on tab click */}
    </TabsContent>
    
    <TabsContent value="history">
      {/* Placeholder - shows toast on tab click */}
    </TabsContent>
  </Tabs>
</Card>
```

#### 3.3.2 Tabs Section

**Tab Design:**
- Three tabs: **Forecast Overview**, **Analysis** (default), **History**
- Active tab: Blue background `#0065BD`, white text
- Inactive tabs: White background, grey text `#6E685F`
- Tab hover: Light grey background `#F5F5F5`
- Border bottom: 1px solid `#D3D0CC` below entire tab strip

**Tab Interactions:**
- **Analysis tab**: Shows full content (default active)
- **Forecast Overview tab**: Shows toast "Feature coming soon" when clicked
- **History tab**: Shows toast "Feature coming soon" when clicked

#### 3.3.3 Header Section

**"Forecast Analysis" Header:**
- Font: 20px (text-xl), font-semibold
- Color: Black `#000000`
- Margin bottom: 16px (mb-4)

#### 3.3.4 Sub-Headers (Navigation Buttons)

**Design Pattern:**
- Each sub-header is a button with:
  - Small dot (8px diameter) before text
  - Text label
  - Bottom border (2px) when active
  - No border when inactive

**Sub-Header 1: Forecast Data Analysis (Preselected)**
- Dot color: TUM Blue `#0065BD`
- Text color: Black `#000000`
- Text weight: font-medium
- Border bottom: 2px solid `#0065BD`
- **State**: Active by default

**Sub-Header 2: Forecast Detail Analysis**
- Dot color: TUM Blue `#0065BD` (when active)
- Text color: Black `#000000` (when active)
- Text weight: font-medium (when active)
- Border bottom: 2px solid `#0065BD` (when active)
- **Interaction**: Switches to Forecast Detail Analysis table
- **State**: Selectable, shows detail metrics table

**Layout:**
- Horizontal flex with 24px gap (gap-6)
- Aligned to left
- Padding bottom: 8px (pb-2) for consistent alignment with border

#### 3.3.5 Grey Line Separator

- Border: 1px solid `#D3D0CC`
- Margin: 24px bottom (mb-6)
- Full width of card content

#### 3.3.6 Control Buttons Box

**Container:**
- Background: Light grey `#F5F5F5`
- Padding: 16px (p-4)
- Border radius: 6px (rounded)
- Margin bottom: 24px (mb-6)
- Layout: Horizontal flex with 16px gap (gap-4)

**Button Group 1: View Toggle (Detailed/Aggregate)**

Two-button segmented control:

**Detailed View Button (Default Active):**
- Background: TUM Blue `#0065BD`
- Text: White `#FFFFFF`
- Font: 14px, font-medium
- Padding: 8px 16px (py-2 px-4)
- Border: None (connected to Aggregate View)
- Border radius: Left side only (rounded-l)

**Aggregate View Button:**
- Background: White `#FFFFFF`
- Text: Black `#000000`
- Font: 14px, font-medium
- Padding: 8px 16px
- Border: 1px solid `#D3D0CC` (except left edge)
- Border radius: Right side only (rounded-r)

**Toggle Behavior:**
- Clicking **Detailed View**: 
  - Expands all categories in table (if collapsed)
  - Shows individual feature rows
  - Visual state: Blue background on Detailed View button
  
- Clicking **Aggregate View**:
  - Collapses all categories in table
  - Shows only category summary rows with chevron icons
  - Categories can still be manually expanded/collapsed with chevron
  - Visual state: Blue background on Aggregate View button, white on Detailed View

**Dropdown: View Mode Selection**

**Structure:**
```tsx
<Select defaultValue="impact" className="border-[#D3D0CC]">
  <SelectTrigger className="w-[200px]">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="impact">Impact Factor</SelectItem>
    <SelectItem value="absolute">Absolute Values</SelectItem>
    <SelectItem value="relative">Relative Value</SelectItem>
  </SelectContent>
</Select>
```

**Functionality:**
- **Impact Factor** (default): Shows contribution impact from -50 to +50
- **Absolute Values**: Shows unit contribution to total forecast (sum equals AI Forecast)
- **Relative Value**: Shows percentage contribution to total forecast (AI Forecast row shows 100%)

**Value Calculation Logic:**

1. **Impact Factor** (stored/base value): Range -50 to +50
   - Represents the strength of contribution (positive or negative)
   - Color-coded by severity (5 grades)

2. **Absolute Value Calculation**:
   ```typescript
   // All absolute values must sum to AI Forecast for that week
   totalImpact = sum of all |impactFactors|
   absoluteValue = (|impactFactor| / totalImpact) * aiForecast
   // Apply sign based on impact factor direction
   ```

3. **Relative Percentage Calculation**:
   ```typescript
   relativePercentage = (absoluteValue / aiForecast) * 100
   // Example: If absolute = 12 and AI Forecast = 85, then relative = 14.1%
   ```

**Display Format:**
- Impact Factor: "+35", "-12", "0" (with + sign for positive, no decimals)
- Absolute: "+12.5", "-8.3", "0.0" (one decimal, units)
- Relative: "+14.1%", "-9.8%", "0.0%" (one decimal place, with + sign)

**Action Buttons (Dummy):**

All three buttons show toast "Feature coming soon" when clicked.

**Filters Button:**
- Variant: Outline
- Icon: `Filter` from lucide-react (16px, positioned left)
- Text: "Filters"
- Border: `#D3D0CC`

**Update Button:**
- Background: TUM Blue `#0065BD`
- Text: White `#FFFFFF`
- No icon

**Download Button:**
- Variant: Outline
- Icon: `Download` from lucide-react (16px, positioned left)
- Text: "Download"
- Border: `#D3D0CC`

#### 3.3.7 Feature Table Integration

**Props to Pass:**
```typescript
<FeatureTable 
  viewMode={viewMode}        // 'detailed' | 'aggregate'
  valueMode={valueMode}      // 'absolute' | 'relative'
/>
```

**Note:** FeatureTable component will be updated later to handle these props. For now, pass them as props even if not yet implemented.

---

### 3.4 Forecast Contribution Analysis Table Component

**Component**: `ForecastContributionTable.tsx` (Replaces FeatureTable.tsx)  
**Location**: `components/features/forecast-analysis/`

#### 3.4.1 Table Structure

**Header Row:**
- **AI Forecast Row** (light blue background `#E3F2FD`, blue top border `#0065BD`, always visible, not collapsible)
  - Background: Light blue (`#E3F2FD`)
  - Top border: 2px solid TUM Blue (`#0065BD`)
  - Text color: TUM Blue (`#0065BD`)
  - Values: 50-120 units range
  - 8 weeks of forecast data starting Dec 9, 2025

**Category Hierarchy:**

**INTERNAL** (Top-level collapsible)
- **Historic Supply** (Sub-category collapsible)
  - Core Condition Rate
  - Core Quantity
  - Delivery Date
  - Component 1 Condition Rate
  - Component 2 Condition Rate
  - Component 3 Condition Rate
  - Component 4 Condition Rate
  - Component 5 Condition Rate
- **Sales Orders** (Sub-category collapsible)
  - Core Type
  - Quantity
  - Order Date
  - Return Rate

**EXTERNAL** (Top-level collapsible)
- **Registration Data & Customer Trends** (Sub-category collapsible)
  - Vehicle Model
  - Quantity
  - Month
  - Total Fleet
  - Breakdown Rate
  - Region
- **Recall Data & Market Insights** (Sub-category collapsible)
  - Model
  - Quantity
  - Region
  - Part/Core Type
- **Macroeconomic Trends** (Sub-category collapsible)
  - Interest Rate
  - GDP
  - PMI
  - Used Car Market Trend

#### 3.4.2 Data Structure & Values

**AI Forecast (Week Values):**
```typescript
aiForecast = [85, 92, 78, 105, 88, 95, 110, 82] // Range: 50-120 units
weekDates = ['12/09', '12/16', '12/23', '12/30', '01/06', '01/13', '01/20', '01/27']
```

**Impact Factor Ranges by Category Type:**
- **Historic Supply** (high impact): -45 to +45
- **Sales Orders** (medium-high): -35 to +40
- **Registration Data & Customer Trends** (medium): -30 to +35
- **Recall Data & Market Insights** (low-medium): -20 to +25
- **Macroeconomic Trends** (low): -15 to +20

**Sample Impact Factor Data** (Week 1 example):
```typescript
internal: {
  historicSupply: {
    coreConditionRate: +42,
    coreQuantity: +38,
    deliveryDate: +28,
    component1ConditionRate: +35,
    component2ConditionRate: +32,
    component3ConditionRate: +30,
    component4ConditionRate: +25,
    component5ConditionRate: +22
  },
  salesOrders: {
    coreType: +35,
    quantity: +38,
    orderDate: +25,
    returnRate: -18
  }
},
external: {
  registrationData: {
    vehicleModel: +28,
    quantity: +25,
    month: +15,
    totalFleet: +20,
    breakdownRate: -12,
    region: +18
  },
  recallData: {
    model: +15,
    quantity: +12,
    region: +8,
    partCoreType: +10
  },
  macroeconomic: {
    interestRate: -8,
    gdp: +12,
    pmi: +10,
    usedCarMarket: +5
  }
}
```

**Aggregated Mean Impact Factors** (for Aggregate View):
- **Historic Supply**: Weighted average (35% Core Condition/Quantity, 15% each for others)
- **Sales Orders**: Weighted average (40% Quantity, 30% Core Type, 20% Order Date, 10% Return Rate)
- **Registration Data & Customer Trends**: Weighted average (30% Vehicle Model/Quantity, 10% others)
- **Recall Data & Market Insights**: Simple average of 4 features
- **Macroeconomic Trends**: Weighted average (30% GDP, 25% PMI, 25% Interest Rate, 20% Used Car Market)

#### 3.4.3 Color Coding System (5 Grades)

**Impact Factor Color Thresholds (TUM Color Palette with Transparency):**
- **Strong Positive** (`#A2AD00/25` bg, `#A2AD00` text): Impact Factor > +30 (TUM Green 25%)
- **Moderate Positive** (`#A2AD00/18` bg, `#6B7280` text): Impact Factor +10 to +30 (TUM Green 18%)
- **Neutral** (`#F5F5F5` bg, `#6E685F` text): Impact Factor -10 to +10 (Grey)
- **Moderate Negative** (`#E37222/18` bg, `#6B7280` text): Impact Factor -30 to -10 (TUM Orange 18%)
- **Strong Negative** (`#E37222/25` bg, `#E37222` text): Impact Factor < -30 (TUM Orange 25%)

**Color Application:**
- Full cell background colors with transparency levels (not solid colors)
- Colors apply to entire table cell based on impact factor value
- TUM brand colors: Green (#A2AD00) for positive, Orange (#E37222) for negative
- Transparency levels: 25% for strongest impact, 18% for moderate, solid grey for neutral
- Colored text on lighter backgrounds for optimal readability

#### 3.4.4 View Modes

**Props Interface:**
```typescript
interface ForecastContributionTableProps {
  viewMode: 'detailed' | 'aggregate';
  valueMode: 'impact' | 'absolute' | 'relative';
}
```

**View Mode: Impact Factor (Default)**
- Displays impact factor values (-50 to +50)
- Format: "+42", "-18", "0"
- Used as base for calculating other modes

**View Mode: Absolute Values**
- Shows unit contribution to total forecast
- All absolute values sum to AI Forecast for that week
- Calculation:
  ```typescript
  totalAbsoluteImpact = sum of |impactFactor| for all features
  absoluteValue = (|impactFactor| / totalAbsoluteImpact) * aiForecast * sign(impactFactor)
  ```
- Format: "+12.5", "-8.3", "0.0" (one decimal, units)

**View Mode: Relative Percentage**
- Shows percentage contribution to total forecast
- Calculation:
  ```typescript
  relativePercentage = (|absoluteValue| / aiForecast) * 100 * sign(absoluteValue)
  ```
- Format: "+14.7%", "-9.8%", "0.0%" (one decimal)

**Aggregate View Behavior:**
- Only shows mean impact factors (not absolute/relative)
- When category collapsed, shows weighted mean in aggregate row
- Clicking chevron expands to show individual features
- Color coding based on mean impact factor value

#### 3.4.5 Collapsible Behavior

**Three-Level Hierarchy:**
1. **Top Level**: INTERNAL, EXTERNAL (always visible headers)
2. **Mid Level**: Historic Supply, Sales Orders, Registration Data, Recall Data, Macroeconomic (collapsible sub-categories)
3. **Bottom Level**: Individual features (visible when mid-level expanded)

**Cascade Collapse Logic:**
- Collapsing top category (INTERNAL/EXTERNAL) automatically collapses all sub-categories beneath it
- Expanding top category shows sub-category headers (features remain collapsed until sub-category expanded)
- Sub-categories must be individually expanded to show features
- Collapsing sub-category only affects features beneath it

**Detailed View (Default):**
- All top categories expanded on initialization
- All sub-categories expanded on initialization
- Individual feature rows visible
- Chevrons point down (ChevronDown) when expanded
- User can manually collapse any level

**Aggregate View:**
- Top categories (INTERNAL, EXTERNAL) expanded to show sub-categories
- Sub-categories visible but collapsed (showing weighted mean values)
- Chevrons removed/disabled for top categories (always expanded)
- Sub-category chevrons point right (ChevronRight) when collapsed
- Sub-categories show weighted mean impact factors in colored cells
- User can manually expand sub-categories to see individual features
- Switching back to Detailed View expands all sub-categories

**View Toggle Behavior:**
- Clicking "Detailed View": Expands all categories and sub-categories automatically
- Clicking "Aggregate View": Collapses all categories and sub-categories automatically
- Manual expand/collapse state is reset when switching views

**Interaction:**
- Clicking category header toggles expansion
- State controlled by view mode (detailed vs aggregate)
- Smooth 200ms transition animation

#### 3.4.6 Legend

**Position**: Bottom of table, below grey separator line

**Structure:**
- Grey separator line (1px solid `#D3D0CC`) above legend
- Margin top: 24px before separator
- Margin top: 16px after separator

**Design - Gradient Bar:**
- Horizontal gradient bar from TUM Orange (left) → Grey (center) → TUM Green (right)
- Gradient: `linear-gradient(to right, rgba(227, 114, 34, 0.25) 0%, rgba(227, 114, 34, 0.25) 20%, #F5F5F5 45%, #F5F5F5 55%, rgba(162, 173, 0, 0.25) 80%, rgba(162, 173, 0, 0.25) 100%)`
- Bar height: 24px (h-6)
- Rounded corners (rounded-sm)
- Max width: 672px (max-w-2xl)
- Colors use 25% opacity (rgba) matching the strongest cell colors

**Labels:**
- Left: "Negative contributor" with subtext "(decreases forecast)"
- Right: "Positive contributor" with subtext "(increases forecast)"
- Label font size: 14px (text-sm)
- Subtext font size: 12px (text-xs)
- Text color: Grey `#6B7280`
- Subtext color: Light grey `#9CA3AF`

---

## 4. Interaction Flows

### 4.1 Page Load Flow

```
1. User navigates to /dashboard/forecast-analysis
2. System loads default state:
   ├─ Filters Panel: Preset "Favorites", Core "TC_BMW_x3_2023" (both grayed out)
   ├─ Core Details Card: Shows BMW x3 details, badges, metadata
   └─ Main Content:
      ├─ "Analysis" tab active
      ├─ "Forecast Contribution Analysis" sub-header active
      ├─ "Detailed View" button active (all categories expanded)
      ├─ "Impact Factor" dropdown selected (default view)
      └─ Feature table with all groups expanded
3. Page renders in ~300ms
```

### 4.2 Tab Switching Flow

**Analysis Tab (Active by Default):**
```
State: Active
Content: Full analysis view with sub-headers, controls, and table
Action: No action needed (already selected)
```

**Forecast Overview Tab:**
```
1. User clicks "Forecast Overview" tab
2. System shows toast: "Feature coming soon"
3. Tab remains inactive (doesn't switch)
4. Analysis tab stays active
```

**History Tab:**
```
1. User clicks "History" tab
2. System shows toast: "Feature coming soon"
3. Tab remains inactive (doesn't switch)
4. Analysis tab stays active
```

### 4.3 Sub-Header Navigation Flow

**Forecast Contribution Analysis (Active by Default):**
```
State: Active (blue dot, underline, bold text)
Content: Current feature contribution table
Action: No action needed (already selected)
```

**Forecast Detail Analysis:**
```
1. User clicks "Forecast Detail Analysis"
2. System shows toast: "Feature coming soon"
3. Sub-header remains inactive (grey dot, no underline)
4. "Forecast Contribution Analysis" stays active
5. No content change
```

### 4.4 View Toggle Flow

**Detailed View → Aggregate View:**
```
1. User clicks "Aggregate View" button
2. System:
   ├─ Updates button states (Aggregate becomes blue, Detailed becomes white)
   ├─ Collapses all category groups in table
   ├─ Shows only category summary rows with chevron icons
   └─ Keeps AI Forecast row visible at top
3. User can still manually expand individual categories by clicking chevron
4. Duration: 200ms smooth transition
```

**Aggregate View → Detailed View:**
```
1. User clicks "Detailed View" button
2. System:
   ├─ Updates button states (Detailed becomes blue, Aggregate becomes white)
   ├─ Expands all category groups in table
   ├─ Shows all individual feature rows
   └─ Keeps AI Forecast row visible at top
3. Duration: 200ms smooth transition
```

### 4.5 View Mode Dropdown Change Flow

**Impact Factor → Absolute Values:**
```
1. User clicks dropdown, selects "Absolute Values"
2. System:
   ├─ Calculates unit contribution for each feature
   ├─ Formula: (|impactFactor| / totalAbsImpact) * aiForecast * sign
   ├─ Ensures all values sum to AI Forecast for each week
   ├─ Updates all table cells with absolute format (+12.5, -8.3)
   ├─ Keeps color coding based on original impact factor
   └─ Legend remains same (explains color grades)
3. Duration: 100ms (instant cell update)
```

**Impact Factor → Relative Percentage:**
```
1. User clicks dropdown, selects "Relative Percentage"
2. System:
   ├─ First calculates absolute values (as above)
   ├─ Then converts to percentage: (|absolute| / aiForecast) * 100
   ├─ Updates all table cells with percentage format (+14.7%, -9.8%)
   ├─ Keeps color coding based on original impact factor
   └─ Legend remains same
3. Duration: 100ms
```

**Any Mode → Impact Factor:**
```
1. User clicks dropdown, selects "Impact Factor"
2. System:
   ├─ Restores original impact factor values (-50 to +50)
   ├─ Updates all table cells with impact format (+42, -18)
   ├─ Color coding based on impact factor thresholds
   └─ Default legend displayed
3. Duration: 100ms
```

**Note on Aggregate View:**
- When in Aggregate View, only Impact Factor mode is available
- Dropdown automatically switches to "Impact Factor" when Aggregate View is selected
- Dropdown is disabled (grayed out) in Aggregate View

### 4.6 Table Interaction Flows

**Expand/Collapse Category (Manual):**
```
1. User clicks category header (e.g., "EXTERNAL DATA")
2. System:
   ├─ Toggles chevron icon (Down → Right or Right → Down)
   ├─ Animates collapse/expand of feature rows
   ├─ Updates expandedGroups state
   └─ Preserves other categories' states
3. Duration: 200ms smooth transition
```

**Category Summary Row (Aggregate View):**
```
When Aggregate View is active:
- Category rows show weighted mean impact factors across all weeks
- Only Impact Factor mode available (dropdown disabled)
- Example row structure:
  ┌──────────────────────────┬────────┬────────┬────────┐
  │ > Historic Supply        │  +32   │  +35   │  +28   │
  │ > Registration Data...   │  +18   │  +20   │  +15   │
  └──────────────────────────┴────────┴────────┴────────┘
- Values are weighted averages of sub-features
- Clicking chevron expands to show individual features with their impact factors
- Color coding applies to mean values
```

### 4.7 Dummy Button Interactions

**All Dummy Buttons:**
- Accept Forecast
- Overwrite
- Filters
- Update
- Download

**Flow:**
```
1. User clicks dummy button
2. System:
   ├─ Shows toast notification at bottom right
   ├─ Message: "Feature coming soon"
   ├─ Duration: 3 seconds
   ├─ Toast type: Info (blue icon)
   └─ No other action taken
3. User can dismiss toast manually by clicking X
```

### 4.8 Filters Panel Interaction (Disabled State)

**Preset Views Dropdown:**
```
1. User clicks dropdown
2. System:
   ├─ Dropdown does not open (disabled)
   ├─ Cursor shows "not-allowed" icon
   ├─ No visual feedback beyond cursor change
   └─ Current selection remains visible (greyed text)
```

**Cores Multi-Select:**
```
1. User clicks dropdown
2. System:
   ├─ Dropdown opens (shows full list with search)
   ├─ All options are grayed out
   ├─ Checkboxes are disabled
   ├─ Current selection (TC_BMW_x3_2023) shows checkmark but greyed
   ├─ Clicking any option does nothing
   ├─ Search field is disabled (no typing allowed)
   └─ Cursor shows "not-allowed" on hover
3. User clicks outside to close dropdown
```

**Note:** The grayed-out state communicates "this filter is locked for this view" to the user.

---

## 5. Visual Design Specifications

### 5.1 Color Palette

**Primary Colors:**
- TUM Blue: `#0065BD` (buttons, active states, links)
- TUM Grey: `#6E685F` (body text, icons)
- TUM Orange: `#E37222` (Need Review badge, negative values)
- TUM Green: `#22C55E` (Open badge, positive values)

**Secondary Colors:**
- Border Grey: `#D3D0CC` (card borders, separators)
- Background Grey: `#F5F5F5` (disabled inputs, control box background)
- Light Blue: `#98C6EA` at 20% opacity (AI Forecast row background)
- Success Green: `#A2AD00` (positive contributions)
- White: `#FFFFFF` (card backgrounds)
- Black: `#000000` (headings, labels)

### 5.2 Typography

**Font Family:** 
- System font stack (inherited from Tailwind)

**Font Sizes:**
- H2 (Page headers): 20px (text-xl), font-semibold
- H3 (Section headers): 18px (text-lg), font-semibold
- Body: 14px (text-sm), font-normal
- Small text: 12px (text-xs), font-normal
- Button text: 14px (text-sm), font-medium
- Table headers: 14px (text-sm), font-semibold
- Table top categories: 14px (text-sm), font-semibold
- Table sub-categories: 14px (text-sm), font-medium
- Table feature rows: 14px (text-sm), font-normal
- Table cell values: 14px (text-sm), font-medium

### 5.3 Spacing System

**Padding:**
- Card padding: 24px (p-6)
- Control box padding: 16px (p-4)
- Button padding: 10px 20px (py-2.5 px-5)
- Small button padding: 8px 16px (py-2 px-4)
- Table cell padding: 8px 16px (py-2 px-4) - reduced for cleaner look

**Margins:**
- Section spacing: 24px (mb-6, mt-6)
- Element spacing: 16px (mb-4, mt-4)
- Inline spacing: 8px (gap-2), 12px (gap-3), 16px (gap-4)

**Grid Gaps:**
- Page grid gap: 24px (gap-6)
- Component gaps: 16px (gap-4)

### 5.4 Border Radius

- Cards: 8px (rounded-lg)
- Buttons: 6px (rounded-md)
- Badges: 4px (rounded)
- Inputs/Dropdowns: 6px (rounded-md)

### 5.5 Shadows

**Cards:**
```css
box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
```

**Hover States (Buttons):**
```css
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
```

### 5.6 Icons

**Source:** lucide-react

**Sizes:**
- Small icons (inline): 16px (h-4 w-4)
- Medium icons (buttons): 18px (h-4.5 w-4.5)
- Large icons (headers): 20px (h-5 w-5)

**Used Icons:**
- `AlertCircle`: Alert count indicator
- `Clock`: Generated time indicator
- `Lock`: Locked status indicator
- `Filter`: Filters button icon
- `Download`: Download button icon
- `ChevronDown`: Expanded category indicator
- `ChevronRight`: Collapsed category indicator

### 5.7 Responsive Behavior

**Breakpoints:**
- Desktop: ≥1280px (normal layout)
- Laptop: 1024px - 1279px (slight compression)
- Tablet: 768px - 1023px (stacked layout)

**Layout Adjustments:**

**Desktop (≥1280px):**
- Filters: 20% width
- Core Details: 80% width (minus filters and gap)
- Main Content: Full width span

**Laptop (1024px - 1279px):**
- Filters: 25% width (slightly wider)
- Core Details: 75% width
- Font sizes remain same

**Tablet (≤1023px):**
```css
.page-container {
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
}

.filters-panel {
  grid-column: 1;
  grid-row: 1;
  height: auto; /* Remove fixed height */
}

.core-details-card {
  grid-column: 1;
  grid-row: 2;
  height: auto;
}

.main-content-card {
  grid-column: 1;
  grid-row: 3;
}
```

**Note:** For initial implementation, focus on desktop (≥1280px). Responsive adjustments can be added in future iterations.

---

## 6. Data Requirements

### 6.1 Hardcoded Data (Initial Implementation)

**Core Details:**
```typescript
const selectedCore = {
  id: "TC_BMW_x3_2023",
  name: "Turboflow BMW x3 2025",
  sku: "TCBMW_X3_2023_5",
  category: "Turbocharger",
  brand: "BMW",
  model: "x3",
  year: 2023
};

const coreStatus = {
  badges: [
    { label: "Need Review", color: "#E37222", type: "warning" },
    { label: "Open", color: "#22C55E", type: "success" }
  ],
  metadata: {
    alertCount: 3,
    generatedTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    lockedBy: "M. Bie",
    lockedUntil: new Date("2025-12-05")
  },
  lastAction: {
    action: "Forecast accepted",
    user: "M. Bie",
    timestamp: new Date("2025-11-28T14:32:00")
  }
};
```

**Filter State:**
```typescript
const filterState = {
  presetView: "favorites",
  selectedCores: ["TC_BMW_x3_2023"],
  disabled: true // All filters disabled on this page
};
```

**Table Data:**
```typescript
// Already implemented in FeatureTable.tsx
const forecastData = {
  dates: ['03/01', '03/08', '03/15', '03/22', '03/29', '04/05', '04/12'],
  currentForecast: [586, 573, 615, 623, 557, 612, 645],
  features: {
    externalData: [...], // 7 features
    salesOrders: [...],  // 2 features
    events: [...]        // 2 features
  }
};
```

### 6.2 Data Comments (Future API Integration)

All components should include TODO comments for future API integration:

```typescript
// TODO: Replace with API call to /api/forecast-analysis?coreId=TC_BMW_x3_2023
// TODO: Fetch from /api/cores/{coreId}/status
// TODO: Get from /api/forecast-analysis/{coreId}/contributions
```

---

## 7. Component File Structure

```
frontend/
├── app/
│   └── dashboard/
│       └── forecast-analysis/
│           └── page.tsx                          # Main page (RESTRUCTURE)
│
├── components/
│   └── features/
│       └── forecast-analysis/
│           ├── ForecastFiltersPanel.tsx          # NEW: Left sidebar filters
│           ├── CoreDetailsCard.tsx               # NEW: Top right card
│           ├── AnalysisMainContent.tsx           # NEW: Main content with tabs/controls
│           ├── FeatureTable.tsx                  # EXISTING: Keep as-is
│           ├── AnalysisHeader.tsx                # DEPRECATE: Content moved to CoreDetailsCard
│           ├── AnalysisTabs.tsx                  # DEPRECATE: Integrated into AnalysisMainContent
│           └── TableControls.tsx                 # DEPRECATE: Integrated into AnalysisMainContent
│
└── lib/
    └── data/
        └── forecast-data.ts                      # EXISTING: Reuse core data
```

**Migration Notes:**
- `AnalysisHeader.tsx` → Content split between `CoreDetailsCard` and `AnalysisMainContent`
- `AnalysisTabs.tsx` → Tab structure moved into `AnalysisMainContent`
- `TableControls.tsx` → Control buttons integrated into `AnalysisMainContent`
- Old components can be deleted or kept as reference (recommend delete after testing)

---

## 8. Acceptance Criteria

### 8.1 Layout Requirements

- [ ] Page uses CSS Grid with 2 columns (20-25% / 75-80%)
- [ ] Filters Panel has fixed height = 4x navigation bar height
- [ ] Core Details Card has same height as Filters Panel
- [ ] Main Content Card spans full width below both panels
- [ ] 24px gap between all grid items
- [ ] No Critical Actions Panel visible on right side

### 8.2 Filters Panel Requirements

- [ ] Preset Views dropdown shows "Favorites" selected
- [ ] All dropdown options are grayed out (disabled appearance)
- [ ] Favorites option shows star icon and bold text (even when disabled)
- [ ] Cores dropdown shows "TC_BMW_x3_2023" preselected
- [ ] Cores dropdown is grayed out (disabled appearance)
- [ ] Clicking dropdown shows list but options are not selectable
- [ ] Cursor shows "not-allowed" icon on disabled elements
- [ ] Panel has white background with grey border (#D3D0CC)

### 8.3 Core Details Card Requirements

- [ ] Core name displays: "Turboflow BMW x3 2025"
- [ ] SKU displays: "SKU: TCBMW_X3_2023_5" in grey
- [ ] Two status badges visible: "Need Review" (orange), "Open" (green)
- [ ] Three metadata icons displayed with correct text:
  - "3 Alerts connected to this core"
  - "Generated 2 hours ago" (relative time)
  - "Locked by M. Bie until Dec 5, 2025"
- [ ] Two action buttons: "Accept Forecast" (blue), "Overwrite" (outline)
- [ ] Last Action footer: "Last Action: M. Bie on Nov 28, 2025 at 14:32"
- [ ] Card height matches Filters Panel exactly
- [ ] Accept and Overwrite buttons show toast "Feature coming soon" when clicked

### 8.4 Main Content Requirements

- [ ] Three tabs visible: Forecast Overview, Analysis, History
- [ ] Analysis tab is active by default (blue background)
- [ ] Forecast Overview and History tabs show toast when clicked
- [ ] "Forecast Analysis" header displays in black, 20px font
- [ ] Two sub-headers visible with dot indicators:
  - "Forecast Contribution Analysis" (active: blue dot, underlined)
  - "Forecast Detail Analysis" (inactive: grey dot, no underline)
- [ ] Forecast Detail Analysis shows toast when clicked
- [ ] Grey line separator below sub-headers

### 8.5 Control Buttons Requirements

- [ ] Control box has light grey background (#F5F5F5)
- [ ] Two-button toggle: "Detailed View" (active), "Aggregate View" (inactive)
- [ ] Detailed View button has blue background when active
- [ ] Dropdown shows "Impact Factor" selected by default
- [ ] Dropdown has three options: "Impact Factor", "Absolute Values", "Relative Percentage"
- [ ] Dropdown becomes disabled (grayed out) when Aggregate View is selected
- [ ] Dropdown automatically switches to "Impact Factor" when entering Aggregate View
- [ ] Three action buttons visible: Filters, Update, Download
- [ ] Filters button has filter icon on left
- [ ] Download button has download icon on left
- [ ] Update button has blue background
- [ ] All three action buttons show toast when clicked

### 8.6 View Toggle Requirements

- [ ] Clicking "Aggregate View" collapses all categories
- [ ] Clicking "Detailed View" expands all categories
- [ ] Active button has blue background, inactive has white
- [ ] Transition animation is smooth (200ms)
- [ ] Categories can still be manually expanded/collapsed after toggle

### 8.7 View Mode Dropdown Functionality Requirements

- [ ] Default selection is "Impact Factor" showing values -50 to +50
- [ ] Selecting "Absolute Values" shows unit contributions summing to AI Forecast
- [ ] Absolute values show format: "+12.5", "-8.3", "0.0" (one decimal)
- [ ] Selecting "Relative Percentage" shows percentage contributions
- [ ] Relative percentage shows format: "+14.7%", "-9.8%", "0.0%" (one decimal)
- [ ] Color coding preserved across all modes based on impact factor thresholds
- [ ] Dropdown change is instant (100ms transition)
- [ ] Dropdown becomes disabled when Aggregate View is active
- [ ] Only Impact Factor available in Aggregate View

### 8.8 Forecast Contribution Table Requirements

- [ ] AI Forecast row always visible at top (blue background, 50-120 units range)
- [ ] 8 weeks of forecast data displayed (starting Dec 9, 2025)
- [ ] Two top-level categories: INTERNAL, EXTERNAL
- [ ] Five sub-categories: Historic Supply, Sales Orders, Registration Data, Recall Data, Macroeconomic
- [ ] 27 individual feature rows total across all categories
- [ ] Each category has chevron icon (Down when expanded, Right when collapsed)
- [ ] Clicking category header toggles expansion
- [ ] All categories expanded by default in Detailed View
- [ ] 5-level color coding: Deep Green, Light Green, Neutral, Light Red, Deep Red
- [ ] Color thresholds: >+30, +10 to +30, -10 to +10, -30 to -10, <-30
- [ ] Legend displayed at bottom with all 5 color grades
- [ ] Table scrolls horizontally if needed (8 weeks + labels)
- [ ] Impact Factor mode shows values from -50 to +50
- [ ] Absolute Values mode shows unit contributions (sum equals AI Forecast)
- [ ] Relative Percentage mode shows % contribution (sum equals 100%)
- [ ] Aggregate View shows weighted mean impact factors only
- [ ] Dropdown disabled in Aggregate View (Impact Factor only)
- [ ] Smooth 200ms transition when expanding/collapsing categories

### 8.9 Toast Notifications Requirements

- [ ] All dummy buttons trigger toast with message "Feature coming soon"
- [ ] Toast appears at bottom right corner
- [ ] Toast auto-dismisses after 3 seconds
- [ ] Toast can be manually dismissed with X button
- [ ] Toast has info icon (blue)
- [ ] Multiple toasts stack vertically if triggered rapidly

### 8.10 Responsive Requirements

- [ ] Layout works at 1280px viewport width
- [ ] Layout works at 1920px viewport width
- [ ] Filters panel maintains 20-25% width at desktop sizes
- [ ] Table scrolls horizontally if viewport too narrow
- [ ] No horizontal scrollbar on page itself

### 8.11 Code Quality Requirements

- [ ] All new components use TypeScript with strict types
- [ ] All components follow existing code style conventions
- [ ] All hardcoded data includes TODO comments for API integration
- [ ] No TypeScript errors or warnings
- [ ] No console errors in browser
- [ ] Build completes successfully with no errors
- [ ] All imports use correct paths (@/components, @/lib, etc.)

### 8.12 Documentation Requirements

- [ ] Feature plan document created (this document)
- [ ] PRD updated with new layout specifications
- [ ] All TODO comments clearly marked for future work
- [ ] Component props documented with JSDoc comments

---

## 9. Implementation Order

### Phase 1: Setup & Layout (Tasks 1-2)
1. ✅ Create feature plan document (this document)
2. Update PRD with new specifications

### Phase 2: Component Creation (Tasks 3-5)
3. Create `ForecastFiltersPanel.tsx` component
4. Create `CoreDetailsCard.tsx` component
5. Create `AnalysisMainContent.tsx` component

### Phase 3: Integration (Tasks 6-7)
6. Restructure `page.tsx` with new layout
7. Add toast notifications for all dummy buttons

### Phase 4: Testing & Validation (Task 8)
8. Test all interactions, validate layout, check responsive behavior

---

## 10. Future Enhancements (Not in Initial Scope)

### 10.1 FeatureTable Enhancements
- Add aggregate summary rows when `viewMode === 'aggregate'`
- Implement percentage conversion for `valueMode === 'relative'`
- Add animation for row expand/collapse
- Add sorting by week/feature
- Add export functionality for individual weeks/features

### 10.2 Interactive Filters
- Enable Preset Views dropdown with functional preset changes
- Enable Cores multi-select with dynamic core switching
- Add "Compare Cores" feature (side-by-side comparison)
- Add date range picker for historical analysis

### 10.3 Functional Action Buttons
- Implement "Accept Forecast" workflow with confirmation modal
- Implement "Overwrite" feature with custom value input
- Add "Filters" modal with advanced filtering options
- Add "Update" functionality to refresh forecast data
- Implement "Download" with format options (CSV, Excel, PDF)

### 10.4 Enhanced Metadata
- Add real-time alert linking (click "3 Alerts" → Alert details modal)
- Add lock management (click Lock icon → Request unlock modal)
- Add history tracking (click Last Action → Full audit log)

### 10.5 Additional Tabs
- Implement "Forecast Overview" tab with charts and KPIs
- Implement "History" tab with version comparison
- Add drill-down capability from Overview to Analysis

### 10.6 Advanced Analytics
- Add "Forecast Model Analysis" sub-view with model performance metrics
- Add confidence intervals to forecast values
- Add scenario planning (what-if analysis)
- Add anomaly detection highlighting

---

## 11. Testing Plan

### 11.1 Component Unit Tests
- [ ] ForecastFiltersPanel renders with disabled state
- [ ] CoreDetailsCard displays all metadata correctly
- [ ] AnalysisMainContent tabs switch correctly
- [ ] AnalysisMainContent view toggle changes button states
- [ ] AnalysisMainContent dropdown changes value mode
- [ ] FeatureTable expands/collapses categories

### 11.2 Integration Tests
- [ ] Page layout renders three main sections
- [ ] Filters Panel height matches Core Details Card height
- [ ] Main Content spans full width
- [ ] Toast notifications appear for all dummy buttons
- [ ] View toggle affects table display
- [ ] Dropdown change affects table values

### 11.3 Visual Regression Tests
- [ ] Layout matches design specifications at 1280px
- [ ] Layout matches design specifications at 1920px
- [ ] Colors match TUM brand guidelines
- [ ] Spacing matches design system
- [ ] Typography matches design system

### 11.4 Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Safari (latest)

### 11.5 Performance Tests
- [ ] Page loads in <1 second
- [ ] Tab switching is instant (<100ms)
- [ ] View toggle animation is smooth (60fps)
- [ ] Dropdown change is instant (<100ms)
- [ ] Table collapse/expand is smooth

---

## 12. Dependencies

### 12.1 Existing Dependencies
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS v4
- shadcn/ui components (Tabs, Card, Button, Badge, Select)
- lucide-react (icons)
- sonner (toast notifications)

### 12.2 New Dependencies
None required - all features use existing dependencies.

### 12.3 Data Dependencies
- Reuse `cores` array from `lib/data/forecast-data.ts`
- Reuse `coreCategories` from same file
- Feature contribution data already in `FeatureTable.tsx`

---

## 13. Risk Assessment

### 13.1 Technical Risks

**Risk**: Fixed height calculation for Filters Panel  
**Impact**: High  
**Mitigation**: Use CSS custom property `--nav-bar-height` set in root layout. Calculate as `calc(var(--nav-bar-height) * 4)`.

**Risk**: Grid layout compatibility across browsers  
**Impact**: Medium  
**Mitigation**: CSS Grid has 97%+ browser support. Test in major browsers. Fallback to flexbox if needed.

**Risk**: Table overflow handling  
**Impact**: Low  
**Mitigation**: Use `overflow-x: auto` on table container. Tested in existing FeatureTable component.

### 13.2 UX Risks

**Risk**: Confusion about disabled filters  
**Impact**: Medium  
**Mitigation**: Clear visual indication (grayed out, cursor: not-allowed). Consider adding tooltip explaining why filters are locked.

**Risk**: Too many "coming soon" toasts  
**Impact**: Low  
**Mitigation**: Use rate limiting - only show one toast per 2 seconds. Clear messaging about feature roadmap.

**Risk**: Aggregate view not intuitive  
**Impact**: Medium  
**Mitigation**: Add help text or tooltip explaining difference between Detailed and Aggregate views.

### 13.3 Data Risks

**Risk**: Hardcoded data doesn't match real data structure  
**Impact**: High  
**Mitigation**: Add comprehensive TODO comments. Document expected API response format in separate API spec document.

**Risk**: Relative value calculations inaccurate  
**Impact**: Medium  
**Mitigation**: Document calculation formula clearly. Add unit tests for percentage conversion logic.

---

## 14. Success Metrics

### 14.1 Development Metrics
- [ ] All 8 tasks completed within timeline
- [ ] Zero TypeScript errors
- [ ] Zero console errors
- [ ] Build time <30 seconds
- [ ] All acceptance criteria met

### 14.2 Quality Metrics
- [ ] Code review approved
- [ ] All components properly typed
- [ ] No accessibility violations (WCAG AA)
- [ ] Responsive design validated at key breakpoints
- [ ] Cross-browser testing passed

### 14.3 User Experience Metrics
- [ ] Layout matches design specifications exactly
- [ ] All interactive elements provide clear feedback
- [ ] Disabled states are clearly communicated
- [ ] Smooth animations (60fps)
- [ ] Fast page load (<1 second)

---

## 15. Timeline Estimate

**Total Estimated Time**: 6-8 hours

- **Task 1**: Feature plan document - 1 hour (✅ Complete)
- **Task 2**: Update PRD - 30 minutes
- **Task 3**: ForecastFiltersPanel component - 1 hour
- **Task 4**: CoreDetailsCard component - 1.5 hours
- **Task 5**: AnalysisMainContent component - 2 hours
- **Task 6**: Restructure page layout - 1 hour
- **Task 7**: Toast notifications - 30 minutes
- **Task 8**: Testing & validation - 1.5 hours

---

## 16. Appendix

### 16.1 Glossary

- **Core**: Remanufactured automotive part (e.g., turbocharger, alternator)
- **SKU**: Stock Keeping Unit - unique product identifier
- **Impact Factor**: Contribution strength from -50 to +50 showing influence on forecast
- **Aggregate View**: Collapsed view showing weighted mean impact factors for categories
- **Detailed View**: Expanded view showing all individual features
- **Absolute Values**: Unit contribution to total forecast (sum equals AI Forecast)
- **Relative Percentage**: Percentage contribution to total forecast
- **Weighted Mean**: Average impact factor with higher weight on critical features

### 16.2 Design References

- **Main Dashboard**: `app/dashboard/page.tsx` (for filter component consistency)
- **Critical Actions Panel**: `components/features/dashboard/CriticalActionsPanel.tsx` (for card styling reference)
- **Existing Feature Table**: `components/features/forecast-analysis/FeatureTable.tsx`

### 16.3 Color Reference

| Name | Hex Code | Usage |
|------|----------|-------|
| TUM Blue | #0065BD | Primary buttons, active states, links, AI Forecast row |
| TUM Grey | #6E685F | Body text, icons, disabled text |
| TUM Orange | #E37222 | Warning badge, light negative impact |
| Deep Red | #DC2626 | Strong negative impact (< -30) |
| Deep Green | #22C55E | Strong positive impact (> +30) |
| Light Green | #A2AD00 | Moderate positive impact (+10 to +30) |
| Border Grey | #D3D0CC | Card borders, separators |
| Background Grey | #F5F5F5 | Disabled inputs, control box, neutral impact |
| White | #FFFFFF | Card backgrounds, button text |
| Black | #000000 | Headings, primary text |

### 16.4 Complete Data Structure for Forecast Contribution Table

**8-Week Forecast Dates (Starting Dec 3, 2025):**
```typescript
weekDates = ['12/09', '12/16', '12/23', '12/30', '01/06', '01/13', '01/20', '01/27']
```

**AI Forecast Values (50-120 range with realistic variation):**
```typescript
aiForecast = [85, 92, 78, 105, 88, 95, 110, 82]
```

**Complete Feature Hierarchy (27 features total):**

**INTERNAL Category:**
- **Historic Supply** (8 features) - High impact range: ±45
  - Core Condition Rate
  - Core Quantity
  - Delivery Date
  - Component 1 Condition Rate
  - Component 2 Condition Rate
  - Component 3 Condition Rate
  - Component 4 Condition Rate
  - Component 5 Condition Rate
  - *Weighted Mean*: 35% Core Condition/Quantity, 15% Delivery, 10% each Component

- **Sales Orders** (4 features) - Medium-high impact: ±40
  - Core Type
  - Quantity
  - Order Date
  - Return Rate
  - *Weighted Mean*: 40% Quantity, 30% Core Type, 20% Order Date, 10% Return Rate

**EXTERNAL Category:**
- **Registration Data & Customer Trends** (6 features) - Medium impact: ±35
  - Vehicle Model
  - Quantity
  - Month
  - Total Fleet
  - Breakdown Rate
  - Region
  - *Weighted Mean*: 30% Vehicle Model/Quantity, 10% each other

- **Recall Data & Market Insights** (4 features) - Low-medium impact: ±25
  - Model
  - Quantity
  - Region
  - Part/Core Type
  - *Simple Average* of all 4 features

- **Macroeconomic Trends** (4 features) - Low impact: ±20
  - Interest Rate
  - GDP
  - PMI
  - Used Car Market Trend
  - *Weighted Mean*: 30% GDP, 25% PMI, 25% Interest Rate, 20% Used Car Market

**Sample Impact Factor Patterns (Week 1 = 85 units):**
- Historic Supply features: Volatile with mix of strong positive and negative spikes
- Sales Orders: Mostly positive except Return Rate (consistently negative)
- Registration Data: Mixed with seasonal variations and regional differences
- Recall Data: Event-driven with sporadic positive and negative spikes
- Macroeconomic: Interest Rate consistently negative, others moderately positive

**Data Characteristics:**
- More negative values throughout for realism
- Each feature has distinct "personality" (patterns/trends)
- Week-to-week variation creates appealing visual heatmap
- Mix of volatile and stable features across categories

---

## 4. Forecast Detail Analysis Table

**Sub-Header**: "Forecast Detail Analysis" (second option in sub-header navigation)

### 4.1 Purpose & Overview

Shows operational and supply chain metrics with performance-based color coding. Unlike Forecast Contribution Analysis (which shows feature impacts on forecast), this table displays absolute performance metrics like inbound core volumes, component recovery rates, and supply chain KPIs.

**Key Differences from Forecast Contribution Analysis:**
- No value mode dropdown (absolute/relative/impact) - shows actual metric values only
- Performance-based color coding (good/warning/poor based on metric-specific thresholds)
- Different data structure (operational metrics vs. forecast contributions)
- Still has Detailed/Aggregate view toggle with cascade collapse logic

### 4.2 Table Structure & Hierarchy

**Three-Level Collapsible Hierarchy:**

**1. Supplier Key Numbers** (Top Category)
- **Inbound Cores - Dealer Network** (Sub-category)
  - Total Inbound Cores - Dealer Network (units)
  - Average Lead Time - Dealer Network (weeks)
- **Inbound Cores - Direct Customers** (Sub-category)
  - Total Inbound Cores - Direct Customers (units)
  - Average Lead Time - Direct Customers (weeks)
- **Inbound Cores - OEM/Service Partners** (Sub-category)
  - Total Inbound Cores - OEM/Service Partners (units)
  - Average Lead Time - OEM/Service Partners (weeks)

**2. Supply - Component Level** (Top Category)
- **Component 1** (Sub-category)
  - Quantity Component 1 (units)
  - Recovery Rate 1 (%)
- **Component 2** (Sub-category)
  - Quantity Component 2 (units)
  - Recovery Rate 2 (%)
- **Component 3** (Sub-category)
  - Quantity Component 3 (units)
  - Recovery Rate 3 (%)
- **Component 4** (Sub-category)
  - Quantity Component 4 (units)
  - Recovery Rate 4 (%)
- **Component 5** (Sub-category)
  - Quantity Component 5 (units)
  - Recovery Rate 5 (%)

**3. Core Supply Chain KPIs** (Top Category - Flat, No Sub-categories)
- Recent Model Accuracy (%)
- Average Lead Time (days)
- Core Return Rate (%)
- Core Inventory on Hand ($)
- Core Inventory Coverage (%)
- Recovery Rate - Scraped Cores (%)
- Avg Recoverable Components per Core Type (units)

### 4.3 Data Specifications

**Time Period**: Same 8 weeks as Forecast Contribution Analysis
- Week dates: `['12/09', '12/16', '12/23', '12/30', '01/06', '01/13', '01/20', '01/27']`

**Value Ranges & Calculation Logic:**

#### 4.3.1 Supplier Key Numbers

**Total Inbound Cores Calculation:**
- Shown when "Supplier Key Numbers" is collapsed (aggregate view)
- Calculation: Sum of Dealer Network + Direct Customers + OEM/Service Partners
- Total Range: 80-120 units per week

**Dealer Network:**
- Quantity Range: 20-30 units (approximately 25% of total)
- Lead Time Range: 24-48 weeks (6-12 months)
- Week-to-week variation: ±15% noise on quantity, ±2 weeks on lead time
- Sample Week 1 values: 25 units, 36w

**Direct Customers:**
- Quantity Range: 12-18 units (approximately 15% of total)
- Lead Time Range: 0-96 weeks (0-24 months, highly variable)
- Week-to-week variation: ±20% noise on quantity, ±4 weeks on lead time
- Sample Week 1 values: 15 units, 48w

**OEM/Service Partners:**
- Quantity Range: 48-72 units (approximately 60% of total)
- Lead Time Range: 12-36 weeks (3-9 months)
- Week-to-week variation: ±10% noise on quantity, ±2 weeks on lead time
- Sample Week 1 values: 60 units, 24w

#### 4.3.2 Supply - Component Level

**Component 1 (High performer):**
- Quantity Range: 180-220 units
- Recovery Rate Range: 85-95%
- Week-to-week variation: ±5% on quantity, ±1% on recovery rate
- Sample Week 1 values: 200 units, 90.0%

**Component 2 (Stable):**
- Quantity Range: 80-120 units
- Recovery Rate Range: 80-90%
- Week-to-week variation: ±8% on quantity, ±1.5% on recovery rate
- Sample Week 1 values: 100 units, 85.0%

**Component 3 (Moderate):**
- Quantity Range: 50-80 units
- Recovery Rate Range: 60-70%
- Week-to-week variation: ±10% on quantity, ±2% on recovery rate
- Sample Week 1 values: 65 units, 65.0%

**Component 4 (Highly volatile):**
- Quantity Range: 20-80 units (wide range)
- Recovery Rate Range: 20-70% (wide range)
- Week-to-week variation: ±15% on quantity, ±3% on recovery rate
- Sample Week 1 values: 50 units, 45.0%

**Component 5 (Challenging):**
- Quantity Range: 60-80 units
- Recovery Rate Range: 30-75%
- Week-to-week variation: ±10% on quantity, ±2.5% on recovery rate
- Sample Week 1 values: 70 units, 52.5%

#### 4.3.3 Core Supply Chain KPIs

**Recent Model Accuracy:**
- Range: 80-100%
- Format: Percentage with 1 decimal (e.g., "92.5%")
- Week-to-week variation: ±2%
- Performance: Higher is better
- Sample Week 1 value: 92.5%

**Average Lead Time:**
- Range: 60-365 days
- Format: Integer with "d" suffix (e.g., "180d")
- Week-to-week variation: ±10 days
- Performance: Lower is better (target < 120 days)
- Sample Week 1 value: 180d

**Core Return Rate:**
- Range: 60-70%
- Format: Percentage with 1 decimal (e.g., "65.0%")
- Week-to-week variation: ±1.5%
- Performance: Higher is better
- Sample Week 1 value: 65.0%

**Core Inventory on Hand:**
- Range: $200,000 - $2,000,000
- Format: "$1.2M", "$500K" (abbreviated with K/M, one decimal)
- Week-to-week variation: ±$50K
- Performance: Moderate is better (target $800K-$1.2M)
- Sample Week 1 value: $1.0M

**Core Inventory Coverage:**
- Range: 80-300%
- Format: Percentage with 1 decimal (e.g., "150.0%")
- Week-to-week variation: ±10%
- Performance: Moderate is better (target 100-180%)
- Sample Week 1 value: 150.0%

**Recovery Rate (Scraped Cores):**
- Range: 60-80%
- Format: Percentage with 1 decimal (e.g., "72.0%")
- Week-to-week variation: ±2%
- Performance: Higher is better
- Sample Week 1 value: 72.0%

**Avg Recoverable Components:**
- Range: 50-200 units
- Format: Integer (e.g., "125")
- Week-to-week variation: ±10 units
- Performance: Higher is better
- Sample Week 1 value: 125

### 4.4 Color Coding System (Performance-Based)

**Color Palette**: Same TUM colors with transparency as Forecast Contribution Analysis
- Strong Positive: `bg-[#A2AD00]/25 text-[#A2AD00]` (TUM Green 25%)
- Moderate Positive: `bg-[#A2AD00]/18 text-[#6B7280]` (TUM Green 18%)
- Neutral: `bg-[#F5F5F5] text-[#6E685F]` (Grey)
- Moderate Negative: `bg-[#E37222]/18 text-[#6B7280]` (TUM Orange 18%)
- Strong Negative: `bg-[#E37222]/25 text-[#E37222]` (TUM Orange 25%)

**Performance Logic by Metric Type:**

#### Higher is Better Metrics:

**Recovery Rates (Components 1-5, Core Return Rate, Recovery Rate Scraped):**
- Strong Positive (Green 25%): Value ≥ 90% of range max
- Moderate Positive (Green 18%): Value ≥ 70% of range max
- Neutral (Grey): Value 40-70% of range max
- Moderate Negative (Orange 18%): Value 20-40% of range max
- Strong Negative (Orange 25%): Value < 20% of range max

**Model Accuracy:**
- Strong Positive: ≥ 95%
- Moderate Positive: 90-95%
- Neutral: 85-90%
- Moderate Negative: 80-85%
- Strong Negative: < 80%

**Avg Recoverable Components:**
- Strong Positive: ≥ 160 units
- Moderate Positive: 130-160 units
- Neutral: 90-130 units
- Moderate Negative: 60-90 units
- Strong Negative: < 60 units

#### Lower is Better Metrics:

**Average Lead Time (days):**
- Strong Positive (Green 25%): < 120 days (target zone)
- Moderate Positive (Green 18%): 120-180 days
- Neutral (Grey): 180-250 days
- Moderate Negative (Orange 18%): 250-320 days
- Strong Negative (Orange 25%): > 320 days

**Channel Lead Times (weeks):**

*Dealer Network:*
- Strong Positive: < 30 weeks
- Moderate Positive: 30-36 weeks
- Neutral: 36-42 weeks
- Moderate Negative: 42-46 weeks
- Strong Negative: > 46 weeks

*Direct Customers:*
- Strong Positive: < 40 weeks
- Moderate Positive: 40-55 weeks
- Neutral: 55-70 weeks
- Moderate Negative: 70-85 weeks
- Strong Negative: > 85 weeks

*OEM/Service Partners:*
- Strong Positive: < 20 weeks
- Moderate Positive: 20-25 weeks
- Neutral: 25-30 weeks
- Moderate Negative: 30-34 weeks
- Strong Negative: > 34 weeks

#### Optimal Range Metrics (Middle is Better):

**Core Inventory on Hand:**
- Strong Positive (Green 25%): $800K-$1.2M (target zone)
- Moderate Positive (Green 18%): $600K-$800K or $1.2M-$1.5M
- Neutral (Grey): $400K-$600K or $1.5M-$1.7M
- Moderate Negative (Orange 18%): $250K-$400K or $1.7M-$1.9M
- Strong Negative (Orange 25%): < $250K or > $1.9M

**Core Inventory Coverage:**
- Strong Positive (Green 25%): 100-180% (target zone)
- Moderate Positive (Green 18%): 85-100% or 180-220%
- Neutral (Grey): 70-85% or 220-260%
- Moderate Negative (Orange 18%): 60-70% or 260-280%
- Strong Negative (Orange 25%): < 60% or > 280%

#### Quantity Metrics:

**Inbound Cores (Dealer/Direct/OEM) and Component Quantities:**
- Strong Positive: ≥ 85% of range max
- Moderate Positive: 70-85% of range max
- Neutral: 40-70% of range max
- Moderate Negative: 25-40% of range max
- Strong Negative: < 25% of range max

### 4.5 Formatting Specifications

**Number Formats:**
```typescript
// Units (integers with thousands separator)
"125"        // < 1,000
"1,200"      // ≥ 1,000

// Percentages (one decimal place)
"92.5%"

// Currency (abbreviated)
"$850K"      // < $1M
"$1.2M"      // ≥ $1M

// Time - Days (integer with suffix)
"180d"

// Time - Weeks (integer with suffix)
"24w"
```

**Display Rules:**
- No +/- signs (just raw values)
- Always include unit symbols (%, $, d, w)
- Thousands separator for large integers
- One decimal place for percentages and currency millions

### 4.6 Controls & Interactions

**Available Controls:**
- [Detailed View*] [Aggregate View] toggle (same as Forecast Contribution)
- ~~Value Mode Dropdown~~ **REMOVED** - not applicable for this table
- [🔍 Filters] [Update] [⬇ Download] buttons (same dummy functionality)

**Control Box Layout:**
```
┌────────────────────────────────────────────────────────────┐
│ [Detailed View*][Aggregate View]  [Filters] [Update] [↓]  │
└────────────────────────────────────────────────────────────┘
```

**Detailed View Behavior:**
- All three top categories expanded on initialization
- All sub-categories expanded
- All individual metrics visible
- Full hierarchy with chevrons pointing down (ChevronDown)

**Aggregate View Behavior:**
- **Supplier Key Numbers**: Collapsed to show "Total Inbound Cores" (sum of 3 channels)
- **Supply - Component Level**: Collapsed to show "Average Recovery Rate" (weighted average)
- **Core Supply Chain KPIs**: Always shows all 7 metrics (no sub-categories, cannot collapse)

**Cascade Collapse Logic:**
- Collapsing "Supplier Key Numbers" hides all 3 channel sub-categories
- Collapsing "Supply - Component Level" hides all 5 component sub-categories
- Collapsing individual sub-category (e.g., "Component 1") hides quantity and recovery rate metrics
- "Core Supply Chain KPIs" is flat (no cascade behavior)

### 4.7 Aggregate Calculations

**Supplier Key Numbers → Total Inbound Cores:**
```typescript
totalInboundCores[week] = 
  dealerNetwork[week] + 
  directCustomers[week] + 
  oemServicePartners[week];
```
- Shows single aggregated row when collapsed
- Color based on total quantity performance (80-120 range)

**Supply - Component Level → Average Recovery Rate:**
```typescript
weightedRecoveryRate[week] = 
  Σ(component_i.recoveryRate[week] × component_i.quantity[week]) / 
  Σ(component_i.quantity[week]);
```
- Shows single aggregated row when collapsed
- Color based on recovery rate performance (higher is better)
- Format: "72.5%" (one decimal)

**Core Supply Chain KPIs:**
- No aggregation (always shows all 7 individual metrics)
- Cannot be collapsed further (flat structure)

### 4.8 Sub-Header Navigation Integration

**Switching Between Tables:**

When user clicks "Forecast Contribution Analysis":
- Component: `<ForecastContributionTable />`
- Value mode dropdown: **Visible** and enabled
- Data: Impact factors, absolute values, or relative percentages
- Color logic: Contribution-based (positive/negative impact)

When user clicks "Forecast Detail Analysis":
- Component: `<ForecastDetailTable />`
- Value mode dropdown: **Hidden** (not applicable)
- Data: Performance metrics (units, %, $, days, weeks)
- Color logic: Performance-based (good/warning/poor)

**Shared State:**
- View mode (Detailed/Aggregate) persists across both tables
- Time period remains same (8 weeks: Dec 9 - Jan 27)
- Control buttons remain in same positions

### 4.9 Legend Design

**Legend Type**: Same gradient bar style as Forecast Contribution Analysis

**Visual Design:**
```
┌──────────────────────────────────────────────────────────────┐
│  Poor performance    [████████░░░░░░░░░░░░░░░░████████]    Good performance │
│  (below target)              (neutral zone)             (at/above target)  │
│                      -50%      0%      +50%                  │
└──────────────────────────────────────────────────────────────┘
```

**Gradient Bar:**
- Same gradient as Forecast Contribution: `linear-gradient(to right, rgba(227, 114, 34, 0.25) 0%, rgba(227, 114, 34, 0.18) 25%, #F5F5F5 45%, #F5F5F5 55%, rgba(162, 173, 0, 0.18) 75%, rgba(162, 173, 0, 0.25) 100%)`
- Height: 32px (h-8)
- Border: 1px solid `#D3D0CC`
- Rounded corners

**Labels:**
- Left side:
  - Title: "Poor performance" (14px, font-medium, `#E37222`)
  - Subtitle: "(below target)" (12px, `#9CA3AF`)
- Right side:
  - Title: "Good performance" (14px, font-medium, `#A2AD00`)
  - Subtitle: "(at/above target)" (12px, `#9CA3AF`)
- Scale markers: Show relative performance (-50%, 0%, +50%)

### 4.10 Component Structure

**Component File**: `ForecastDetailTable.tsx`  
**Location**: `components/features/dashboard/`

**Data File**: `forecast-detail-data.ts`  
**Location**: `lib/data/`

**Props Interface:**
```typescript
interface ForecastDetailTableProps {
  viewMode: 'detailed' | 'aggregate';
  isAggregateView: boolean; // Convenience prop
  // Note: No valueMode prop (removed for this table)
}
```

**Data Interfaces:**
```typescript
interface MetricRow {
  name: string;
  unit: 'units' | 'percentage' | 'currency' | 'days' | 'weeks';
  values: number[]; // 8 weeks of data
  performanceType: 'higherIsBetter' | 'lowerIsBetter' | 'optimalRange';
  thresholds: {
    strongPositive: number | [number, number]; // Single value or [min, max] for optimal range
    moderatePositive: number | [number, number];
    neutral: [number, number]; // Always a range
    moderateNegative: number | [number, number];
    strongNegative: number | [number, number];
  };
}

interface SubCategory {
  name: string;
  metrics: MetricRow[];
}

interface TopCategory {
  name: string;
  type: 'hierarchical' | 'flat'; // Hierarchical has sub-categories, flat doesn't
  subCategories?: SubCategory[]; // For Supplier/Component categories
  metrics?: MetricRow[]; // For KPIs (flat structure)
}

export const weekDates = ['12/09', '12/16', '12/23', '12/30', '01/06', '01/13', '01/20', '01/27'];

export const forecastDetailData: TopCategory[] = [
  {
    name: 'Supplier Key Numbers',
    type: 'hierarchical',
    subCategories: [
      {
        name: 'Inbound Cores - Dealer Network',
        metrics: [
          { name: 'Total Inbound Cores - Dealer Network', unit: 'units', ... },
          { name: 'Average Lead Time - Dealer Network', unit: 'weeks', ... }
        ]
      },
      // ... more sub-categories
    ]
  },
  // ... more top categories
];
```

### 4.11 Implementation Functions

**Color Function:**
```typescript
function getPerformanceColorClass(
  value: number,
  metric: MetricRow
): string {
  const { performanceType, thresholds } = metric;
  
  if (performanceType === 'higherIsBetter') {
    if (value >= thresholds.strongPositive) return 'bg-[#A2AD00]/25 text-[#A2AD00]';
    if (value >= thresholds.moderatePositive) return 'bg-[#A2AD00]/18 text-[#6B7280]';
    if (value >= thresholds.neutral[0] && value <= thresholds.neutral[1]) return 'bg-[#F5F5F5] text-[#6E685F]';
    if (value >= thresholds.moderateNegative) return 'bg-[#E37222]/18 text-[#6B7280]';
    return 'bg-[#E37222]/25 text-[#E37222]';
  }
  
  if (performanceType === 'lowerIsBetter') {
    if (value <= thresholds.strongPositive) return 'bg-[#A2AD00]/25 text-[#A2AD00]';
    if (value <= thresholds.moderatePositive) return 'bg-[#A2AD00]/18 text-[#6B7280]';
    if (value >= thresholds.neutral[0] && value <= thresholds.neutral[1]) return 'bg-[#F5F5F5] text-[#6E685F]';
    if (value <= thresholds.moderateNegative) return 'bg-[#E37222]/18 text-[#6B7280]';
    return 'bg-[#E37222]/25 text-[#E37222]';
  }
  
  if (performanceType === 'optimalRange') {
    const [targetMin, targetMax] = thresholds.strongPositive as [number, number];
    if (value >= targetMin && value <= targetMax) return 'bg-[#A2AD00]/25 text-[#A2AD00]';
    // ... similar logic for other ranges
  }
  
  return 'bg-[#F5F5F5] text-[#6E685F]'; // Default neutral
}
```

**Format Function:**
```typescript
function formatMetricValue(value: number, unit: string): string {
  switch (unit) {
    case 'units':
      return value >= 1000 
        ? `${(value / 1000).toFixed(1)}K`.replace('.0K', 'K')
        : Math.round(value).toLocaleString();
    
    case 'percentage':
      return `${value.toFixed(1)}%`;
    
    case 'currency':
      if (value >= 1_000_000) {
        return `$${(value / 1_000_000).toFixed(1)}M`;
      }
      return `$${Math.round(value / 1000)}K`;
    
    case 'days':
      return `${Math.round(value)}d`;
    
    case 'weeks':
      return `${Math.round(value)}w`;
    
    default:
      return value.toFixed(1);
  }
}
```

**Aggregate Calculation Functions:**
```typescript
function calculateTotalInboundCores(
  dealerNetwork: number[],
  directCustomers: number[],
  oemService: number[]
): number[] {
  return weekDates.map((_, idx) => 
    dealerNetwork[idx] + directCustomers[idx] + oemService[idx]
  );
}

function calculateWeightedRecoveryRate(
  components: Array<{ quantity: number[]; recoveryRate: number[] }>
): number[] {
  return weekDates.map((_, weekIdx) => {
    const totalQuantity = components.reduce(
      (sum, c) => sum + c.quantity[weekIdx], 0
    );
    const weightedSum = components.reduce(
      (sum, c) => sum + c.quantity[weekIdx] * c.recoveryRate[weekIdx], 0
    );
    return weightedSum / totalQuantity;
  });
}
```

### 4.12 Data Generation Strategy

**Principles:**
1. Values stay within specified ranges
2. Week-to-week variation adds realism (noise/volatility)
3. Some metrics show trends (improving/declining over 8 weeks)
4. Relationships maintained (e.g., Total Inbound = sum of channels)

**Sample Data Pattern (Week 1-8):**
```typescript
// Dealer Network Quantity (range 20-30, ±15% variation)
[25, 27, 23, 26, 28, 24, 26, 25]

// Component 1 Recovery Rate (range 85-95%, ±1% variation, trending up)
[88.5, 89.0, 89.5, 90.0, 90.5, 91.0, 91.5, 92.0]

// Core Inventory on Hand (range $200K-$2M, ±$50K variation, hovering near target)
[1000000, 1050000, 980000, 1020000, 1100000, 1080000, 1050000, 1020000]
```

---

**End of Forecast Detail Analysis Specification**

---

**End of Feature Plan Document**

**Next Steps:**
1. Review and approve Forecast Detail Analysis specification
2. Create `forecast-detail-data.ts` with all metrics and 8 weeks of data
3. Implement `ForecastDetailTable.tsx` component
4. Update `AnalysisMainContent.tsx` to switch between tables
5. Test both tables with view mode toggles
6. Validate color coding and aggregate calculations
