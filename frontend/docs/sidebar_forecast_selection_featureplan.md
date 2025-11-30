# Sidebar Forecast Selection - Feature Plan

## Document Information
- **Feature**: Sidebar Forecast Selection Component
- **Version**: 1.0
- **Date**: November 30, 2025
- **Status**: Design Specification
- **Related PRD Section**: Feature 2.1 - Left Sidebar

---

## 1. OVERVIEW

### Purpose
A sophisticated, multi-level filtering system that allows supply chain planners to select and filter forecast data by core categories, specific core types, and individual components. The selection drives all dashboard content including the forecast chart, KPI metrics, and critical alerts.

### User Value
- Quick access to predefined views (All Categories, Planner's Favorites, High Priority, Standard)
- Granular filtering from category level down to individual component level
- Visual feedback showing all active selections
- Clean, modern interface matching BORGai design system

### Key Principles
- Progressive disclosure: Start broad (categories), drill down to specifics (components)
- Visual clarity: All active selections visible as removable tags
- Responsive filtering: Cascade filters (category selection limits core options, core selection limits component options)
- Persistent state: Selections remain active during session

---

## 2. SPATIAL LAYOUT & STRUCTURE

### Overall Container
```
┌─────────────────────────────────────┐
│  Forecast Selection                 │  ← Header (20px padding, TUM Blue #0065BD)
├─────────────────────────────────────┤
│  CORE CATEGORIES                    │  ← Section Label (grey #6E685F, 12px, uppercase)
│  ┌───────────────────────────────┐ │
│  │ ▼ All Categories              │ │  ← Preset Dropdown
│  └───────────────────────────────┘ │
│                                     │
│  FILTER SELECTION                   │  ← Section Label
│  ┌───────────────────────────────┐ │
│  │ ▼ Core Category               │ │  ← Multi-select dropdown
│  └───────────────────────────────┘ │
│  ┌─────────┐ ┌──────────┐         │
│  │ Turbo × │ │ Altern. ×│         │  ← Selected tags (rounded, removable)
│  └─────────┘ └──────────┘         │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ ▼ Core Selection              │ │  ← Multi-select dropdown (filtered by category)
│  └───────────────────────────────┘ │
│  ┌─────────────┐ ┌──────────────┐ │
│  │ CORE-001 × │ │ CORE-005 ×  │ │  ← Selected core tags
│  └─────────────┘ └──────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ ▼ Component Selection         │ │  ← Multi-select dropdown (filtered by core)
│  └───────────────────────────────┘ │
│  ┌──────────────┐                  │
│  │ Bearing-A × │                  │  ← Selected component tags
│  └──────────────┘                  │
│                                     │
│  ┌───────────────────────────────┐ │
│  │     Apply Filters             │ │  ← Primary action button
│  └───────────────────────────────┘ │
│  ┌───────────────────────────────┐ │
│  │     Clear All                 │ │  ← Secondary action button
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Positioning
- **Location**: Left sidebar, below header
- **Width**: 280px (fixed, matches PRD)
- **Position**: Sticky/fixed to left edge
- **Spacing from Header**: 16px margin top
- **Spacing from Main Content**: 24px margin right
- **Container**: Rounded box (border-radius: 12px), NOT connected to top bar
- **Background**: White (#FFFFFF)
- **Border**: 1px solid #D3D0CC
- **Shadow**: 0 2px 4px rgba(0, 0, 0, 0.08)

---

## 3. COMPONENT SPECIFICATIONS

### 3.1 Container Box
```typescript
interface SidebarContainer {
  width: '280px';
  background: '#FFFFFF';
  borderRadius: '12px';
  border: '1px solid #D3D0CC';
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)';
  padding: '20px';
  marginTop: '16px';
  marginRight: '24px';
}
```

**Visual Specifications**:
- Floating appearance (not attached to any edges except left alignment)
- Smooth shadow for depth
- Consistent internal padding (20px all sides)

---

### 3.2 Header Section

**Text**: "Forecast Selection"

**Styling**:
- Font: 18px, weight 600
- Color: TUM Blue (#0065BD)
- Padding bottom: 16px
- Border bottom: 1px solid #D3D0CC
- Margin bottom: 20px

---

### 3.3 Core Categories Section (Preset Dropdown)

#### Section Label
**Text**: "CORE CATEGORIES"

**Styling**:
- Font: 12px, weight 600, uppercase
- Color: Secondary Grey (#6E685F)
- Letter spacing: 0.5px
- Margin bottom: 8px

#### Preset Dropdown
**Type**: Single-select dropdown

**Options**:
1. All Categories (default)
2. Planner's Favorites
3. High Priority
4. Standard

**Dropdown Styling**:
- Width: 100% (fills container width minus padding)
- Height: 40px
- Background: #FFFFFF
- Border: 1px solid #D3D0CC
- Border-radius: 8px
- Padding: 10px 12px
- Font: 14px, weight 400
- Color: Black (#000000)
- Chevron icon: Right-aligned, 16px, Secondary Grey
- Hover: Border color changes to #0065BD
- Focus: Border #0065BD, outline 2px solid #0065BD at 20% opacity

**Dropdown List**:
- Background: #FFFFFF
- Border: 1px solid #D3D0CC
- Border-radius: 8px
- Box shadow: 0 4px 8px rgba(0, 0, 0, 0.12)
- Max height: 200px (scrollable if more options)
- Z-index: 100

**Option Styling** (each row):
- Padding: 10px 12px
- Font: 14px, weight 400
- Hover background: #F5F5F5
- Selected background: #0065BD at 10% opacity
- Selected text: #0065BD, weight 500

**Behavior**:
- Click opens dropdown
- Select option: Dropdown closes, selected value shows
- Selection triggers predefined filter preset:
  - **All Categories**: No filters applied, shows all data
  - **Planner's Favorites**: Pre-configured list of frequently viewed categories/cores (saved in user preferences)
  - **High Priority**: Cores marked as critical (e.g., low stock, high demand)
  - **Standard**: Default production cores (excludes experimental or deprecated items)
- Preset selection overrides manual filter selections below
- If user makes manual selections below, preset changes to "Custom" (displayed but not in list)

**Section Margin**: 20px bottom (before next section)

---

### 3.4 Filter Selection Section

#### Section Label
**Text**: "FILTER SELECTION"

**Styling**:
- Font: 12px, weight 600, uppercase
- Color: Secondary Grey (#6E685F)
- Letter spacing: 0.5px
- Margin bottom: 12px

---

### 3.5 Core Category Multi-Select

#### Label
**Text**: "Core Category"

**Styling**:
- Font: 12px, weight 500
- Color: Secondary Grey (#6E685F)
- Margin bottom: 6px

#### Dropdown Button
**Type**: Multi-select trigger button

**Styling**:
- Width: 100%
- Height: 40px
- Background: #FFFFFF
- Border: 1px solid #D3D0CC
- Border-radius: 8px
- Padding: 10px 12px
- Font: 14px, weight 400
- Color: Black (#000000) when selections exist, placeholder color (#6E685F) when empty
- Placeholder text: "Select core categories..."
- Chevron icon: Right-aligned, 16px, rotates 180° when dropdown open
- Hover: Border color #0065BD
- Focus: Border #0065BD, outline 2px solid #0065BD at 20% opacity

**Dropdown List**:
- Background: #FFFFFF
- Border: 1px solid #D3D0CC
- Border-radius: 8px
- Box shadow: 0 4px 8px rgba(0, 0, 0, 0.12)
- Max height: 240px (scrollable)
- Z-index: 100
- Opens below button (or above if insufficient space)

**Options** (Core Types - from REMAN data):
1. Turbocharger
2. Starters
3. Alternators
4. AC Compressors
5. Brake Calipers
6. EGR Valves
7. Steering Racks
8. Steering Pumps

**Option Row Styling**:
- Padding: 10px 12px
- Font: 14px, weight 400
- Display: Flex (checkbox + label)
- Hover background: #F5F5F5
- Checkbox: 18px × 18px, TUM Blue (#0065BD) when checked
- Checkbox border: 1px solid #D3D0CC
- Checkmark: White, weight 600

**Multi-Select Behavior**:
- Click checkbox or row to toggle selection
- Multiple selections allowed
- Dropdown remains open while selecting
- Click outside or press Escape to close
- Selected items show in tag list below (see 3.6)

**Search Bar** (inside dropdown):
- Position: Top of dropdown list, sticky
- Background: #FAFAFA
- Border bottom: 1px solid #D3D0CC
- Padding: 8px 12px
- Font: 14px
- Placeholder: "Search categories..."
- Icon: Magnifying glass, left-aligned, 16px, grey
- Live filtering: Options filter as user types

**Section Margin**: 12px bottom (before tag list)

---

### 3.6 Selected Category Tags

#### Container
**Styling**:
- Display: Flex, wrap
- Gap: 8px (between tags)
- Margin top: 12px (below dropdown)
- Margin bottom: 20px (before next filter)
- Min height: 32px (empty state shows nothing)

#### Tag Styling
**Each Tag**:
- Display: Inline-flex, align-items center
- Background: #0065BD at 10% opacity
- Border: 1px solid #0065BD at 30% opacity
- Border-radius: 16px (pill shape)
- Padding: 6px 12px
- Font: 12px, weight 500
- Color: #0065BD
- Gap: 6px (between text and X icon)

**Remove Icon (X)**:
- Size: 14px × 14px
- Color: #0065BD
- Cursor: pointer
- Hover: Color darkens to #004A8D, scale 1.1
- Click: Removes tag, deselects option in dropdown, updates filter

**Empty State**:
- No tags shown if no selections
- Container collapses (height: 0, no margin)

**Interaction**:
- Hover over tag: Slight scale up (1.02), cursor pointer
- Click X: Smooth fade-out animation (200ms), tag removed
- Removal triggers filter update cascade (affects Core Selection options)

---

### 3.7 Core Selection Multi-Select

#### Label
**Text**: "Core Selection"

**Styling**:
- Font: 12px, weight 500
- Color: Secondary Grey (#6E685F)
- Margin bottom: 6px

#### Dropdown Button
**Type**: Multi-select trigger button

**Styling**: (Same as Core Category Multi-Select, see 3.5)
- Placeholder text: "Select cores..."
- Disabled state: If no Core Categories selected
  - Background: #F5F5F5
  - Border: 1px solid #D3D0CC
  - Color: #9E9E9E
  - Cursor: not-allowed
  - Tooltip on hover: "Select core categories first"

**Dropdown List**:
- Same styling as Core Category dropdown (see 3.5)
- Search bar included

**Options** (Dynamic, filtered by selected Core Categories):
- If "Turbocharger" selected: Shows all turbocharger cores (TC_BMW_x3_2023, TC_AUDI_A4_2021, TC_TOYOTA_Camry_2020)
- If "Alternators" selected: Shows alternator cores (AL_FORD_Focus_2022, AL_HYUNDAI_Elantra_2021, AL_RENAULT_Clio_2020)
- If multiple categories selected: Shows all cores from all selected categories
- Format: `[Brand] [Model] [Year]` with full ID in tooltip
  - Example: "BMW x3 2023" (tooltip shows: TC_BMW_x3_2023)

**Option Row Styling**: (Same as Core Category, see 3.5)

**Multi-Select Behavior**: (Same as Core Category, see 3.5)

**Section Margin**: 12px bottom (before tag list)

---

### 3.8 Selected Core Tags

#### Container & Tag Styling
**Same as Selected Category Tags (see 3.6)**

**Tag Content**:
- Display: Short format (e.g., "BMW x3 2023")
- Full ID in tooltip on hover (e.g., "TC_BMW_x3_2023")
- Color scheme: Same TUM Blue (#0065BD)

**Empty State**: (Same as Category Tags, see 3.6)

**Section Margin**: 20px bottom (before Component Selection)

---

### 3.9 Component Selection Multi-Select

#### Label
**Text**: "Component Selection"

**Styling**:
- Font: 12px, weight 500
- Color: Secondary Grey (#6E685F)
- Margin bottom: 6px

#### Dropdown Button
**Type**: Multi-select trigger button

**Styling**: (Same as Core Selection, see 3.7)
- Placeholder text: "Select components..."
- Disabled state: If no Cores selected
  - Tooltip on hover: "Select cores first"

**Dropdown List**:
- Same styling as previous dropdowns
- Search bar included

**Options** (Dynamic, filtered by selected Cores):
- If "TC_BMW_x3_2023" selected: Shows components for that core (Housing 78%, Turbine 65%, Compressor 82%, Valve 71%, Shaft 89%)
- If multiple cores selected: Shows all components from all selected cores
- Format: `[Component Type] ([Condition Rate]%)`
  - Example: "Housing (78%)"
- Grouped by core (if multiple cores selected):
  - **BMW x3 2023**
    - Housing (78%)
    - Turbine (65%)
    - Compressor (82%)
    - Valve (71%)
    - Shaft (89%)
    - Bearing Assembly
    - Seal Kit
    - Housing
  - **CORE-TURBO-002**
    - Bearing Assembly
    - Impeller

**Option Row Styling**: (Same as previous, see 3.5)
- Group headers (core names): Bold, non-selectable, background #FAFAFA

**Multi-Select Behavior**: (Same as previous, see 3.5)

**Section Margin**: 12px bottom (before tag list)

---

**Tag Content**:
- Display: Component type with condition rate (e.g., "Housing (78%)")
- Core name in tooltip on hover (e.g., "TC_BMW_x3_2023_Housing")
- Color scheme: Same TUM Blue (#0065BD)6)**

**Tag Content**:
- Display: Component ID (e.g., "COMP-TURBO-001-A")
- Full name in tooltip on hover
- Color scheme: Same TUM Blue (#0065BD)

**Empty State**: (Same as previous, see 3.6)

**Section Margin**: 24px bottom (before action buttons)

---

### 3.11 Apply Filters Button

**Type**: Primary action button

**Styling**:
- Width: 100%
- Height: 44px
- Background: #0065BD (TUM Blue)
- Border: None
- Border-radius: 8px
- Font: 14px, weight 600
- Color: White (#FFFFFF)
- Text: "Apply Filters"
- Cursor: pointer
- Transition: All 200ms ease

**Hover State**:
- Background: #004A8D (darker blue)
- Box shadow: 0 4px 8px rgba(0, 101, 189, 0.3)
- Transform: translateY(-1px)

**Active State** (while clicking):
- Background: #003D73
- Transform: translateY(0)

**Disabled State**:
- Background: #D3D0CC
- Color: #6E685F
- Cursor: not-allowed
- Condition: No selections made (all filters empty)

**Loading State** (after click, while data loads):
- Background: #0065BD
- Text: "Loading..."
- Spinner icon: 16px, white, rotating animation
- Cursor: wait
- Button disabled during loading

**Behavior**:
- Click triggers filter application
- Dispatches filter state to dashboard context
- Dashboard updates: Chart, KPIs, Alerts all refresh with filtered data
- Success: Button briefly shows checkmark (✓), then returns to "Apply Filters"
- Error: Button briefly shows error icon (⚠), tooltip shows error message

**Section Margin**: 12px bottom (before Clear All button)

---

### 3.12 Clear All Button

**Type**: Secondary action button

**Styling**:
- Width: 100%
- Height: 44px
- Background: Transparent
- Border: 1px solid #D3D0CC
- Border-radius: 8px
- Font: 14px, weight 600
- Color: #6E685F (Secondary Grey)
- Text: "Clear All"
- Cursor: pointer
- Transition: All 200ms ease

**Hover State**:
- Background: #F5F5F5
- Border color: #6E685F
- Color: #000000

**Active State**:
- Background: #EEEEEE

**Disabled State**:
- Border: 1px solid #EEEEEE
- Color: #CCCCCC
- Cursor: not-allowed
- Condition: No selections made (all filters empty)

**Behavior**:
- Click removes all selections:
  - Preset dropdown resets to "All Categories"
  - All category tags removed
  - All core tags removed
  - All component tags removed
  - Filter state resets to default
- Animation: Tags fade out sequentially (50ms stagger)
- Dashboard resets to show all data
- Confirmation dialog (optional, for safety): "Clear all filters? This will reset your selection."

**Section Margin**: 0 bottom (last element in container)

---

## 4. INTERACTION FLOWS

### 4.1 Basic Selection Flow

**Step 1: User Opens Sidebar**
- Sidebar visible by default on desktop (280px left side)
- On mobile/tablet: Hamburger menu opens drawer

**Step 2: User Selects Preset (Optional)**
- Click "Core Categories" dropdown
**Step 3: User Makes Manual Category Selection**
- Click "Core Category" dropdown
- Dropdown opens, shows 8 options with checkboxes
- User checks "Turbocharger" and "Alternators"
- Dropdown remains open
- User clicks outside or presses Escape → Dropdown closes
- Tags appear below: [Turbocharger ×] [Alternators ×]
- Preset changes to "Custom" (if was on preset)es
- User checks "Turbochargers" and "Alternators"
- Dropdown remains open
- User clicks outside or presses Escape → Dropdown closes
- Tags appear below: [Turbo ×] [Altern. ×]
- Preset changes to "Custom" (if was on preset)

**Step 4: User Selects Cores**
- "Core Selection" dropdown now enabled (was disabled before category selection)
- Click "Core Selection" dropdown
- Dropdown shows all turbocharger and alternator cores (filtered by category selection)
- User types "BMW" in search bar
- List filters to show only cores with "BMW" in brand/model
- User checks "BMW x3 2023" and "FORD Focus 2022"
- Dropdown closes
- Tags appear below: [BMW x3 2023 ×] [FORD Focus 2022 ×]

**Step 5: User Selects Components (Optional)**
- "Component Selection" dropdown now enabled
- Click dropdown
- Shows components grouped by selected cores
- User selects "Housing (78%)" from BMW x3 2023
- Tag appears: [Housing (78%) ×]

**Step 6: User Applies Filters**
- Click "Apply Filters" button
- Button shows loading state (spinner)
- Dashboard context updates filter state
- Forecast chart, KPI cards, and alerts refresh with filtered data
- Button shows success checkmark briefly (500ms)
- Button returns to "Apply Filters" state

---

### 4.2 Cascade Filter Logic

**Rule 1: Category → Core Dependency**
- Core Selection dropdown is disabled until at least one Category is selected
- Available cores are filtered to show only cores belonging to selected categories
- If user deselects all categories, Core Selection resets and disables

**Rule 2: Core → Component Dependency**
- Component Selection dropdown is disabled until at least one Core is selected
- Available components are filtered to show only components belonging to selected cores
- If user deselects all cores, Component Selection resets and disables

**Rule 3: Removing Category Cascades Down**
- User has selected: Categories [Turbo, Altern], Cores [CORE-TURBO-001, CORE-ALT-002], Components [COMP-TURBO-001-A]
- User removes "Turbochargers" category tag
- Cascade effect:
  - "CORE-TURBO-001" core tag automatically removed
  - "COMP-TURBO-001-A" component tag automatically removed
  - Only "Alternators" category and "CORE-ALT-002" core remain
  - Component dropdown now shows only components from CORE-ALT-002

**Rule 4: Removing Core Cascades Down**
- User removes "BMW x3 2023" core tag
- All components belonging to that core (Housing, Turbine, etc.) are automatically removed
- Component dropdown updates to show only components from remaining cores

**Rule 5: Preset Overrides Manual Selections**
- User has manual selections active
- User selects preset "High Priority"
- Manual selections are overridden with preset configuration
- User can still modify after preset is applied

---

### 4.3 Clear All Flow

**Step 1: User Clicks "Clear All"**
- All tags fade out sequentially (50ms stagger, left-to-right, top-to-bottom)
- Dropdowns reset to placeholder state
- Component and Core Selection dropdowns disable

**Step 2: Dashboard Resets**
- Filter state clears in context
- Dashboard shows all data (equivalent to "All Categories" preset)
- Chart and KPIs update to show aggregate data

**Step 3: UI Returns to Default State**
- Preset dropdown shows "All Categories"
- All multi-select dropdowns show placeholders
- No tags visible
- "Apply Filters" and "Clear All" buttons disabled

---

### 4.4 Search Within Dropdown Flow

**Step 1: User Opens Dropdown (e.g., Core Selection)**
- Search bar visible at top of dropdown list
- Search input focused automatically
- Placeholder: "Search cores..."

**Step 2: User Types Search Query**
- Input: "3.0L Diesel"
- List filters in real-time (debounced 200ms)
- Only matching options remain visible
- Non-matching options hidden (not removed from data)

**Step 3: User Selects Filtered Options**
- User checks options from filtered list
- Selections apply normally
- User clears search → Full list returns, selected items remain checked

**Step 4: No Results State**
- User types "xyz123" (no matches)
- Dropdown shows: "No results found for 'xyz123'" (centered, grey text)
- User can clear search or close dropdown

---

## 5. DATA STRUCTURE & MOCK DATA STRATEGY

### 5.1 Filter State Interface

```typescript
interface FilterState {
  preset: 'all' | 'favorites' | 'high-priority' | 'standard' | 'custom';
  categories: string[];      // Array of category IDs: ['turbochargers', 'alternators']
  cores: string[];           // Array of core IDs: ['CORE-TURBO-001', 'CORE-ALT-002']
  components: string[];      // Array of component IDs: ['COMP-TURBO-001-A']
}
```

### 5.2 Data Hierarchy

```typescript
interface CoreCategory {
  id: string;                // 'turbochargers'
  name: string;              // 'Turbochargers'
  icon?: string;             // Optional icon
  priority: 'high' | 'standard' | 'low';
}

interface Core {
  id: string;                // 'CORE-TURBO-001'
  name: string;              // 'Turbocharger, 3.0L Diesel'
  categoryId: string;        // 'turbochargers'
  stockLevel: number;
  reorderPoint: number;
  isFavorite: boolean;       // For "Planner's Favorites" preset
}

interface Component {
  id: string;                // 'COMP-TURBO-001-A'
  name: string;              // 'Bearing Assembly'
  coreId: string;            // 'CORE-TURBO-001'
  stockLevel: number;
  price: number;
}
```

### 5.3 Hardcoded Data Files (To Be Created)

**File**: `frontend/lib/data/filter-options.ts`

```typescript
// TODO: Replace with API call to /api/filters/categories
export const hardcodedCoreCategories: CoreCategory[] = [
  { id: 'turbochargers', name: 'Turbochargers', priority: 'high' },
  { id: 'alternators', name: 'Alternators', priority: 'standard' },
  { id: 'starters', name: 'Starters', priority: 'standard' },
  { id: 'engines', name: 'Engines', priority: 'high' },
  { id: 'transmissions', name: 'Transmissions', priority: 'high' },
  { id: 'batteries', name: 'Batteries', priority: 'standard' },
];

// TODO: Replace with API call to /api/filters/cores
export const hardcodedCores: Core[] = [
  {
    id: 'CORE-TURBO-001',
    name: 'Turbocharger, 3.0L Diesel',
    categoryId: 'turbochargers',
    stockLevel: 142,
    reorderPoint: 200,
    isFavorite: true,
  },
  {
    id: 'CORE-TURBO-002',
    name: 'Turbocharger, 2.0L Gasoline',
    categoryId: 'turbochargers',
    stockLevel: 89,
    reorderPoint: 150,
    isFavorite: false,
  },
  {
    id: 'CORE-ALT-001',
    name: 'Alternator, 12V 90A',
    categoryId: 'alternators',
    stockLevel: 234,
    reorderPoint: 180,
    isFavorite: true,
  },
  // ... more cores (20-30 total)
];

// TODO: Replace with API call to /api/filters/components
export const hardcodedComponents: Component[] = [
  {
    id: 'COMP-TURBO-001-A',
    name: 'Bearing Assembly',
    coreId: 'CORE-TURBO-001',
    stockLevel: 450,
    price: 85.50,
  },
  {
    id: 'COMP-TURBO-001-B',
    name: 'Seal Kit',
    coreId: 'CORE-TURBO-001',
    stockLevel: 320,
    price: 45.00,
  },
  // ... more components (50-100 total)
];

// Preset configurations
export const presetConfigs = {
  'all': {
    categories: [],
    cores: [],
    components: [],
  },
  'favorites': {
    categories: [],
    cores: hardcodedCores.filter(c => c.isFavorite).map(c => c.id),
    components: [],
  },
  'high-priority': {
    categories: hardcodedCoreCategories.filter(c => c.priority === 'high').map(c => c.id),
    cores: [],
    components: [],
  },
  'standard': {
    categories: hardcodedCoreCategories.filter(c => c.priority === 'standard').map(c => c.id),
    cores: [],
    components: [],
  },
};
```

### 5.4 Filter Logic Functions

```typescript
// Filter cores based on selected categories
export function getFilteredCores(selectedCategories: string[]): Core[] {
  if (selectedCategories.length === 0) return [];
  return hardcodedCores.filter(core => 
    selectedCategories.includes(core.categoryId)
  );
}

// Filter components based on selected cores
export function getFilteredComponents(selectedCores: string[]): Component[] {
  if (selectedCores.length === 0) return [];
  return hardcodedComponents.filter(component => 
    selectedCores.includes(component.coreId)
  );
}

// Search function (case-insensitive, matches name or ID)
export function searchOptions<T extends { id: string; name: string }>(
  options: T[],
  query: string
): T[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return options;
  
  return options.filter(option =>
    option.id.toLowerCase().includes(lowerQuery) ||
    option.name.toLowerCase().includes(lowerQuery)
  );
}
```

---

## 6. RESPONSIVE BEHAVIOR

### Desktop (1024px+)
- Full sidebar visible (280px fixed width)
- All dropdowns expand inline
- Tags wrap within container (max 2 rows visible before scroll)

### Tablet (768px - 1023px)
- Sidebar collapses to icon-only mode (60px width)
- Click icon opens full filter panel as slide-out drawer (320px width)
- Drawer overlays main content with backdrop blur
- Close button (X) in top-right of drawer

### Mobile (320px - 767px)
- Sidebar hidden by default
- Hamburger menu icon in header
- Click hamburger opens full-screen filter modal
- Modal fills screen, scrollable
- "Apply Filters" button sticks to bottom of screen
- Close button (X) in top-left of modal

---

## 7. ACCESSIBILITY (WCAG AA)

### Keyboard Navigation
- **Tab**: Move through dropdowns, tags, buttons in logical order
- **Space/Enter**: Open dropdown, toggle checkbox
- **Escape**: Close open dropdown
- **Arrow Up/Down**: Navigate dropdown options when open
- **Backspace**: Remove last tag (when no dropdown is focused)
- **Delete**: Remove focused tag

### Screen Reader Support
- All dropdowns have `aria-label`: "Select core categories"
- Selected count announced: "3 categories selected"
- Tag removal announced: "Turbochargers removed"
- Dropdown state announced: "Dropdown opened" / "Dropdown closed"
- Loading state announced: "Applying filters, please wait"
- Success/error states announced

### Focus Management
- All interactive elements have visible focus indicator (2px blue outline)
- Focus trap in dropdown when open (Tab cycles through options)
- Focus returns to trigger button after dropdown closes
- Focus moves to "Apply Filters" button after last tag removal

### Color Contrast
- All text vs. background ≥ 4.5:1 (WCAG AA)
- Tag text vs. tag background ≥ 3:1 (WCAG AA large text)
- Disabled state text ≥ 3:1 vs. background

---

## 8. PERFORMANCE CONSIDERATIONS

### Rendering Optimization
- Dropdown lists virtualized for 100+ options (react-window or similar)
- Search debounced (200ms delay before filtering)
- Tag list uses React.memo to prevent unnecessary re-renders
- Filter application debounced (300ms after last selection change)

### Data Loading
- Categories loaded on component mount (cached in context)
- Cores loaded on first category selection (cached per category)
- Components loaded on first core selection (cached per core)
- Loading states shown during data fetch

### State Management
- Filter state managed in React Context (FilterContext)
- Selections persisted in sessionStorage (restored on page refresh)
- Dashboard components subscribe to filter changes via context
- Memoized selectors to prevent unnecessary re-calculations

---

## 9. ERROR STATES & EDGE CASES

### No Data Available
- **Scenario**: API returns empty array for cores
- **UI**: Dropdown shows "No cores available" (grey text, centered)
- **Behavior**: Dropdown disabled, tooltip explains "No data available"

### API Error
- **Scenario**: Network error while loading cores
- **UI**: Dropdown shows "Error loading data. Try again." (red text)
- **Behavior**: Retry button appears in dropdown
- **Fallback**: Use cached data if available

### Selection Conflict
- **Scenario**: User selects preset, then manually changes filters
- **UI**: Preset dropdown changes to "Custom" (greyed out in list)
- **Behavior**: Manual selections take precedence

### Filter Produces No Results
- **Scenario**: User filters to 1 core with 0 components
- **UI**: Dashboard shows "No data available for selected filters" (empty state)
- **Behavior**: "Clear All" button suggestion shown

---

## 10. TESTING CHECKLIST

### Functional Tests
- [ ] Preset selection applies correct filters
- [ ] Category selection enables Core Selection dropdown
- [ ] Core selection enables Component Selection dropdown
- [ ] Tag removal updates child dropdowns correctly
- [ ] Cascade removal works (category → core → component)
- [ ] "Apply Filters" triggers dashboard update
- [ ] "Clear All" resets all selections
- [ ] Search filters dropdown options correctly
- [ ] Multi-select allows multiple selections
- [ ] Disabled state prevents interaction

### Visual Tests
- [ ] Container has rounded corners and shadow
- [ ] Dropdowns align vertically
- [ ] Tags wrap properly in container
- [ ] Remove icons (X) are properly aligned
- [ ] Hover states apply correct colors
- [ ] Focus indicators visible on all elements
- [ ] Responsive layout works on mobile/tablet/desktop

### Accessibility Tests
- [ ] Keyboard navigation works (Tab, Enter, Escape, Arrows)
- [ ] Screen reader announces all state changes
- [ ] Focus management correct (dropdown open/close)
- [ ] Color contrast meets WCAG AA
- [ ] All interactive elements have labels

### Performance Tests
- [ ] Dropdown opens in < 100ms
- [ ] Search filters in < 200ms
- [ ] Tag removal animates smoothly (60fps)
- [ ] Filter application triggers data load in < 500ms
- [ ] Large lists (100+ options) scroll smoothly

---

## 11. IMPLEMENTATION PHASES

### Phase 1: Static UI (Week 1)
- Build container box with header
- Create preset dropdown (static options)
- Build all three multi-select dropdowns (static, no functionality)
- Create tag components (static display)
- Build "Apply Filters" and "Clear All" buttons (static)

### Phase 2: Dropdown Interactions (Week 2)
- Implement dropdown open/close logic
- Add checkbox toggle functionality
- Create search bar with filtering
- Implement tag removal
- Add cascade disable logic (category → core → component)

### Phase 3: Filter Logic (Week 3)
- Create FilterContext with state management
- Implement preset configurations
- Build cascade filter functions (getFilteredCores, getFilteredComponents)
- Connect "Apply Filters" to dashboard update
- Implement "Clear All" functionality

### Phase 4: Data Integration (Week 4)
- Create hardcoded data files (filter-options.ts)
- Replace static options with hardcoded data
- Implement loading states
- Add error handling
- Connect to dashboard components (chart, KPIs)

### Phase 5: Polish & Testing (Week 5)
- Add animations (tag removal, dropdown transitions)
- Optimize performance (virtualization, debouncing)
- Implement sessionStorage persistence
- Full accessibility audit
- Responsive testing on all devices
- User acceptance testing

---

## 12. FUTURE ENHANCEMENTS (Post-MVP)

### Advanced Features
1. **Saved Filter Presets**
   - User can save custom filter combinations
   - Named presets (e.g., "My Weekly Review")
   - Share presets with team members

2. **Recent Selections History**
   - Dropdown shows 5 most recently selected items at top
   - Quick re-selection without searching

3. **Smart Suggestions**
   - AI-powered filter suggestions based on current alerts
   - "You might want to filter to: [High Priority Cores]"

4. **Bulk Actions**
   - "Select All" button in dropdown
   - "Deselect All" button
   - Invert selection

5. **Visual Indicators**
   - Stock level icons next to core names (green/orange/red)
   - Alert count badges on categories with issues
   - Trend arrows showing forecast direction

6. **Export Selections**
   - Export current filter configuration as JSON
   - Import saved filter configurations

---

## 13. DEPENDENCIES & INTEGRATIONS

### Component Dependencies
- `shadcn/ui` Checkbox component
- `shadcn/ui` Dropdown Menu component
- Custom Tag component (to be built)
- Lucide React icons (ChevronDown, X, Search)

### Context Dependencies
- FilterContext (to be created)
- DashboardContext (existing, to be updated)

### Data Dependencies
- `lib/data/filter-options.ts` (to be created)
- `lib/types.ts` (to be updated with filter interfaces)

### Dashboard Integration Points
- `app/dashboard/page.tsx` - Subscribes to filter state
- `components/features/dashboard/ForecastChart.tsx` - Filters time series data
- `components/features/dashboard/MetricGrid.tsx` - Calculates KPIs for filtered data
- `components/features/dashboard/CriticalActionsPanel.tsx` - Filters alerts by selection

---

## 14. DESIGN TOKENS SUMMARY

```typescript
export const sidebarTokens = {
  container: {
    width: '280px',
    background: '#FFFFFF',
    borderRadius: '12px',
    border: '1px solid #D3D0CC',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
    padding: '20px',
  },
  header: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#0065BD', // TUM Blue
    paddingBottom: '16px',
    borderBottom: '1px solid #D3D0CC',
  },
  sectionLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#6E685F', // Secondary Grey
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  dropdown: {
    height: '40px',
    borderRadius: '8px',
    border: '1px solid #D3D0CC',
    fontSize: '14px',
    hoverBorderColor: '#0065BD',
    focusBorderColor: '#0065BD',
    focusOutline: '2px solid rgba(0, 101, 189, 0.2)',
  },
  tag: {
    background: 'rgba(0, 101, 189, 0.1)',
    border: '1px solid rgba(0, 101, 189, 0.3)',
    borderRadius: '16px',
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: 500,
    color: '#0065BD',
    gap: '6px',
  },
  primaryButton: {
    height: '44px',
    background: '#0065BD',
    hoverBackground: '#004A8D',
    color: '#FFFFFF',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
  },
  secondaryButton: {
    height: '44px',
    background: 'transparent',
    border: '1px solid #D3D0CC',
    hoverBackground: '#F5F5F5',
    hoverBorderColor: '#6E685F',
    color: '#6E685F',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
  },
};
```

---

## 15. COMPONENT FILE STRUCTURE

```
frontend/
├── components/
│   ├── features/
│   │   └── filters/
│   │       ├── ForecastSelection.tsx          // Main container component
│   │       ├── PresetDropdown.tsx             // Preset selector
│   │       ├── MultiSelectDropdown.tsx        // Reusable multi-select
│   │       ├── TagList.tsx                    // Tag display container
│   │       ├── Tag.tsx                        // Individual tag component
│   │       ├── ActionButtons.tsx              // Apply/Clear buttons
│   │       └── SearchBar.tsx                  // Dropdown search component
│   │
│   └── ui/
│       └── dropdown-menu.tsx                  // shadcn/ui dropdown (if not exists)
│
├── lib/
│   ├── contexts/
│   │   └── FilterContext.tsx                  // Filter state management
│   │
│   ├── data/
│   │   └── filter-options.ts                  // Hardcoded filter data
│   │
│   ├── hooks/
│   │   ├── useFilterCascade.ts                // Cascade filter logic
│   │   └── useFilterSearch.ts                 // Search functionality
│   │
│   └── types.ts                               // Filter interfaces (update existing)
│
└── docs/
    └── sidebar_forecast_selection_featureplan.md  // This document
```

---

## 16. ACCEPTANCE CRITERIA

### Must Have (MVP)
✅ Container box floats independently (not connected to top bar)
✅ Header reads "Forecast Selection" (TUM Blue, 18px, weight 600)
✅ Preset dropdown with 4 options (All, Favorites, High Priority, Standard)
✅ Three cascading multi-select dropdowns (Category → Core → Component)
✅ Selected items display as removable tags with X icon
✅ Tag removal triggers cascade effect (removes child selections)
✅ Dropdowns disable until parent selection made
✅ "Apply Filters" button triggers dashboard update
✅ "Clear All" button resets all selections
✅ Search functionality in all dropdowns
✅ Responsive behavior (desktop/tablet/mobile)
✅ Keyboard accessible (Tab, Enter, Escape, Arrows)
✅ Screen reader compatible (ARIA labels, announcements)
✅ Color contrast meets WCAG AA (≥ 4.5:1)

### Should Have (Near-term)
⏳ Loading states for data fetching
⏳ Error handling for API failures
⏳ SessionStorage persistence (filter state survives refresh)
⏳ Tag animations (fade out on removal)
⏳ Tooltip on disabled states explaining why
⏳ Empty state messages ("No cores available")

### Could Have (Future)
🔮 Saved custom presets
🔮 Recent selections history
🔮 Smart filter suggestions
🔮 Bulk select/deselect actions
🔮 Visual indicators (stock levels, alerts)
🔮 Export/import filter configurations

---

## 17. MOCKUP REFERENCES

### Visual Layout
```
┌─────────────────────────────────────┐
│  🔵 Forecast Selection              │  ← Header (TUM Blue #0065BD, 18px, weight 600)
├─────────────────────────────────────┤
│  CORE CATEGORIES                    │  ← Section (Grey #6E685F, 12px, uppercase)
│  ┌───────────────────────────────┐ │
│  │ All Categories             ▼  │ │  ← Preset Dropdown (40px height)
│  └───────────────────────────────┘ │
│                                     │
│  FILTER SELECTION                   │  ← Section (20px margin-top)
│  Core Category                      │  ← Label (12px, weight 500, grey)
│  ┌───────────────────────────────┐ │
│  │ Select core categories...  ▼  │ │  ← Multi-select (40px height)
│  └───────────────────────────────┘ │
│  ┌───────────────┐ ┌────────────┐  │
│  │ Turbochar. × │ │ Altern. × │  │  ← Tags (rounded pills, blue)
│  └───────────────┘ └────────────┘  │
│                                     │
│  Core Selection                     │  ← Label (20px margin-top)
│  ┌───────────────────────────────┐ │
│  │ Select cores...            ▼  │ │  ← Multi-select (40px, disabled if no category)
│  └───────────────────────────────┘ │
│  ┌──────────────┐ ┌──────────────┐ │
│  │ CORE-001 ×  │ │ CORE-005 ×  │ │  ← Core tags
│  └──────────────┘ └──────────────┘ │
│                                     │
│  Component Selection                │  ← Label (20px margin-top)
│  ┌───────────────────────────────┐ │
│  │ Select components...       ▼  │ │  ← Multi-select (40px, disabled if no core)
│  └───────────────────────────────┘ │
│  ┌───────────────┐                  │
│  │ Bearing-A ×  │                  │  ← Component tags
│  └───────────────┘                  │
│                                     │
│  ┌───────────────────────────────┐ │
│  │      Apply Filters            │ │  ← Primary button (44px, TUM Blue)
│  └───────────────────────────────┘ │
│  ┌───────────────────────────────┐ │
│  │      Clear All                │ │  ← Secondary button (44px, grey border)
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Color Reference
- **Container Background**: #FFFFFF (White)
- **Container Border**: #D3D0CC (Grey)
- **Header Text**: #0065BD (TUM Blue)
- **Section Labels**: #6E685F (Secondary Grey)
- **Dropdown Border**: #D3D0CC (Grey) → #0065BD (Blue) on hover
- **Tag Background**: rgba(0, 101, 189, 0.1) (Light Blue)
- **Tag Border**: rgba(0, 101, 189, 0.3) (Blue)
- **Tag Text**: #0065BD (TUM Blue)
- **Primary Button**: #0065BD (TUM Blue) → #004A8D (Dark Blue) on hover
- **Secondary Button Border**: #D3D0CC (Grey) → #6E685F (Grey) on hover

---

## 18. NEXT STEPS

1. **Review & Approval**: Team reviews this feature plan
2. **Data Strategy**: Define mock data structure with realistic values (separate planning session)
3. **Component Development**: Start Phase 1 (Static UI)
4. **Integration Planning**: Define how sidebar updates dashboard context
5. **API Contract Design**: Define future API endpoints for real data (Phase 2)

---

## APPENDIX: Example Dropdown States

### Dropdown Open (Core Category)
```
┌───────────────────────────────┐
│ 🔍 Search categories...       │ ← Search bar (sticky)
├───────────────────────────────┤
│ ☐ Turbochargers               │ ← Option (unchecked)
│ ☑ Alternators                 │ ← Option (checked, blue background)
│ ☐ Starters                    │
│ ☐ Engines                     │
│ ☐ Transmissions               │
│ ☐ Batteries                   │
└───────────────────────────────┘
```

### Dropdown with Search Results
```
┌───────────────────────────────┐
│ 🔍 3.0L                       │ ← User typed "3.0L"
├───────────────────────────────┤
│ ☐ CORE-TURBO-001              │ ← Matching result
│    Turbocharger, 3.0L Diesel  │
│ ☐ CORE-ENG-003                │ ← Matching result
│    Engine, 3.0L V6            │
└───────────────────────────────┘
```

### Dropdown Empty State
```
┌───────────────────────────────┐
│ 🔍 xyz123                     │ ← No matches
├───────────────────────────────┤
│                               │
│   No results found            │ ← Empty state message (grey, centered)
│                               │
└───────────────────────────────┘
```

---

**END OF FEATURE PLAN**

---

## Document Control
- **Version**: 1.0
- **Last Updated**: November 30, 2025
- **Author**: Team 66 (Christian Güttler, Robert Hoffmann)
- **Approved By**: [Pending]
- **Next Review**: [After Phase 1 Completion]
