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
          Forecast Data Analysis
        </button>
        <button className="flex items-center gap-2 text-sm text-[#6E685F] pb-2">
          <div className="w-2 h-2 rounded-full bg-[#6E685F]" />
          Forecast Model Analysis
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

**Sub-Header 2: Forecast Model Analysis (Dummy)**
- Dot color: Grey `#6E685F`
- Text color: Grey `#6E685F`
- Text weight: font-normal
- Border bottom: None
- **Interaction**: Shows toast "Feature coming soon" when clicked
- **State**: Inactive, not selectable yet

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

**Dropdown: Absolute Values / Relative Values**

**Structure:**
```tsx
<Select defaultValue="absolute" className="border-[#D3D0CC]">
  <SelectTrigger className="w-[200px]">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="absolute">Absolute Values</SelectItem>
    <SelectItem value="relative">Relative Values</SelectItem>
  </SelectContent>
</Select>
```

**Functionality:**
- **Absolute Values** (default): Shows raw contribution numbers (e.g., +64, -30, -76)
- **Relative Values**: Shows percentage contribution to total forecast (e.g., +10.9%, -4.8%, -12.3%)

**Relative Value Calculation:**
```typescript
relativeValue = (featureContribution / totalForecastValue) * 100
// Example: (-64 / 586) * 100 = -10.92%
```

**Display Format:**
- Absolute: "+64", "-30", "0" (with + sign for positive)
- Relative: "+10.9%", "-4.8%", "0.0%" (one decimal place, with + sign)

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

### 3.4 Feature Table Component (Existing)

**Component**: `FeatureTable.tsx` (Keep current implementation)  
**Location**: `components/features/forecast-analysis/`

#### 3.4.1 Current Implementation Summary

**Structure:**
- AI Forecast row (blue background, always visible)
- Three collapsible category groups:
  - **EXTERNAL DATA**: 7 features (Macroeconomic, Customer Trends, Google Trends, etc.)
  - **SALES ORDERS**: 2 features (Open, Historical)
  - **EVENTS**: 2 features (Holidays, Marketing Campaigns)
- Legend at bottom (positive/negative color coding)

**Collapsible Behavior:**
- Each category has chevron icon (ChevronDown when expanded, ChevronRight when collapsed)
- Clicking category header toggles expansion
- Default state: All categories expanded

**Color Coding:**
- Positive values: Light green background `#A2AD00/15`, green text `#A2AD00`
- Negative values: Light orange background `#E37222/15`, orange text `#E37222`
- Zero values: Grey background `#F5F5F5`, grey text `#6E685F`

#### 3.4.2 Future Enhancements (To Be Implemented Later)

**Props to Add:**
```typescript
interface FeatureTableProps {
  viewMode: 'detailed' | 'aggregate';
  valueMode: 'absolute' | 'relative';
}
```

**Aggregate View Enhancements:**
- When `viewMode === 'aggregate'`:
  - Collapse all categories by default
  - Show category summary rows:
    - EXTERNAL DATA: Sum of all 7 features
    - SALES ORDERS: Sum of 2 features
    - EVENTS: Sum of 2 features
  - Category headers still clickable to expand/collapse individual features

**Relative Values Display:**
- When `valueMode === 'relative'`:
  - Convert all contribution values to percentages
  - Formula: `(value / totalForecast) * 100`
  - Display format: "+10.9%", "-4.8%", "0.0%"
  - Keep same color coding logic (positive = green, negative = orange)

**Note:** These enhancements are documented for future implementation but not required for initial redesign.

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
      ├─ "Forecast Data Analysis" sub-header active
      ├─ "Detailed View" button active (all categories expanded)
      ├─ "Absolute Values" dropdown selected
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

**Forecast Data Analysis (Active by Default):**
```
State: Active (blue dot, underline, bold text)
Content: Current feature contribution table
Action: No action needed (already selected)
```

**Forecast Model Analysis:**
```
1. User clicks "Forecast Model Analysis"
2. System shows toast: "Feature coming soon"
3. Sub-header remains inactive (grey dot, no underline)
4. "Forecast Data Analysis" stays active
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

### 4.5 Dropdown Change Flow

**Absolute Values → Relative Values:**
```
1. User clicks dropdown, selects "Relative Values"
2. System:
   ├─ Calculates percentage contribution for each cell
   ├─ Formula: (featureValue / totalForecast) * 100
   ├─ Updates all table cells with percentage format (+10.9%, -4.8%)
   ├─ Keeps color coding (positive = green, negative = orange)
   └─ Updates legend text to explain percentages
3. Duration: 100ms (instant cell update)
```

**Relative Values → Absolute Values:**
```
1. User clicks dropdown, selects "Absolute Values"
2. System:
   ├─ Restores original contribution values
   ├─ Updates all table cells with absolute format (+64, -30)
   ├─ Keeps color coding
   └─ Restores original legend text
3. Duration: 100ms
```

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
- Category rows show aggregated totals across all weeks
- Example row structure:
  ┌─────────────────┬────────┬────────┬────────┐
  │ > EXTERNAL DATA │  +135  │  +174  │  +32   │
  └─────────────────┴────────┴────────┴────────┘
- Clicking chevron expands to show individual features
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
- Table cells: 14px (text-sm), font-medium

### 5.3 Spacing System

**Padding:**
- Card padding: 24px (p-6)
- Control box padding: 16px (p-4)
- Button padding: 10px 20px (py-2.5 px-5)
- Small button padding: 8px 16px (py-2 px-4)
- Table cell padding: 12px (p-3)

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
  - "Forecast Data Analysis" (active: blue dot, underlined)
  - "Forecast Model Analysis" (inactive: grey dot, no underline)
- [ ] Forecast Model Analysis shows toast when clicked
- [ ] Grey line separator below sub-headers

### 8.5 Control Buttons Requirements

- [ ] Control box has light grey background (#F5F5F5)
- [ ] Two-button toggle: "Detailed View" (active), "Aggregate View" (inactive)
- [ ] Detailed View button has blue background when active
- [ ] Dropdown shows "Absolute Values" selected by default
- [ ] Dropdown has "Relative Values" option
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

### 8.7 Dropdown Functionality Requirements

- [ ] Selecting "Relative Values" converts all numbers to percentages
- [ ] Relative values show format: "+10.9%", "-4.8%", "0.0%"
- [ ] Color coding preserved (green for positive, orange for negative)
- [ ] Selecting "Absolute Values" restores original numbers
- [ ] Dropdown change is instant (100ms transition)

### 8.8 Feature Table Requirements

- [ ] AI Forecast row always visible at top (blue background)
- [ ] Three category groups: EXTERNAL DATA, SALES ORDERS, EVENTS
- [ ] Each category has chevron icon (Down when expanded, Right when collapsed)
- [ ] Clicking category header toggles expansion
- [ ] All categories expanded by default
- [ ] Color coding: Green for positive, Orange for negative
- [ ] Legend displayed at bottom
- [ ] Table scrolls horizontally if needed

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
- **Feature Contribution**: Impact of a data source on forecast prediction
- **Aggregate View**: Collapsed view showing category summaries
- **Detailed View**: Expanded view showing individual features
- **Absolute Values**: Raw contribution numbers (e.g., +64, -30)
- **Relative Values**: Percentage contribution to total forecast (e.g., +10.9%)

### 16.2 Design References

- **Main Dashboard**: `app/dashboard/page.tsx` (for filter component consistency)
- **Critical Actions Panel**: `components/features/dashboard/CriticalActionsPanel.tsx` (for card styling reference)
- **Existing Feature Table**: `components/features/forecast-analysis/FeatureTable.tsx`

### 16.3 Color Reference

| Name | Hex Code | Usage |
|------|----------|-------|
| TUM Blue | #0065BD | Primary buttons, active states, links |
| TUM Grey | #6E685F | Body text, icons, disabled text |
| TUM Orange | #E37222 | Warning badge, negative values |
| TUM Green | #22C55E | Success badge, positive indicators |
| Border Grey | #D3D0CC | Card borders, separators |
| Background Grey | #F5F5F5 | Disabled inputs, control box |
| Success Green | #A2AD00 | Positive contributions (table) |
| White | #FFFFFF | Card backgrounds, button text |
| Black | #000000 | Headings, primary text |

---

**End of Feature Plan Document**

**Next Steps:**
1. Review and approve this feature plan
2. Update PRD (Task 2)
3. Begin component implementation (Tasks 3-5)
4. Test and validate (Task 8)
