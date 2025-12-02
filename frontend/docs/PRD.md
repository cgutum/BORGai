EXECUTIVE SUMMARY
Vision Statement

A modern, clean AI-powered supply chain forecasting dashboard designed for supply chain professionals like Morten Bie who need transparency, actionability, and visual clarity. The dashboard transforms complex forecasting data into intuitive visualizations, enabling supply chain managers to understand core supply predictions, validate AI model decisions through explainability analysis, and take immediate action on critical inventory alerts.
Primary User

Supply Chain Planner

    Requirements: Clean, modern, appealing design that balances sophistication with usability

    Goals: Quickly assess forecast accuracy, understand what drives predictions, respond to critical alerts, drill into specific core types

    User Journey: Login → Dashboard Overview → Specific Core Type Drill-Down → Forecast Analysis Transparency

Product Goal

Deliver an MVP dashboard that:

    Provides immediate visibility into AI core supply forecasts and critical inventory actions

    Enables drill-down into specific core types with detailed analysis

    Reveals model transparency through feature contribution analysis (why the forecast is what it is)

    Provides secure access for supply chain planners (multi-role support planned for Phase 2)

Key Success Metrics

    Usability: Dashboard load time < 2 seconds, critical actions visible within 3 seconds

    Clarity: 100% of forecasts include explainability data (feature drivers visible)

    Adoption: Supply chain team uses dashboard daily for forecast-informed decisions

    Trust: Transparency of AI model increases user confidence (measured via feature contribution clarity)

2. TARGET USERS & PRIMARY PERSONA
Persona: Supply Chain Planner

Profile:

    Experienced supply chain professional with strategic planning responsibilities

    Tech-comfortable but values simplicity and clarity over feature complexity

    Works across strategic planning and operational decisions

    Needs quick decision-making support backed by transparent data

Goals:

    Understand core supply forecasts at a glance

    Validate AI predictions by seeing which data sources drive them

    Respond rapidly to stock-outs, delivery issues, and supply spikes

    Make confident reorder and safety stock decisions

    Access transparent, explainable forecasting data

Pain Points:

    Current systems hide model logic; difficult to trust "black box" forecasts

    Alerts are scattered; hard to prioritize critical actions

    Can't easily drill into what drives forecast changes

    Time-consuming to investigate anomalies

Design Preferences:

    Clean, modern aesthetic (not cluttered or overly complex)

    Appealing visual hierarchy (important data prominent)

    Professional color palette reflecting corporate identity

    Intuitive navigation that feels natural, not overwhelming

User Journey (MVP):

    Login → Secure access with demo credentials

    Dashboard Overview → See KPIs, current forecast summary, critical alerts, CTA buttons

    Drill into Core Type → Select specific component (e.g., turbochargers) for focused view

    Review Forecast Analysis → Understand which data sources impact the prediction (macroeconomics, seasonality, weather, sales orders, etc.)

    Take Action → Accept forecast, request manual override, or schedule follow-up review

Future Users (Phase 2)

    Warehouse Operator: Focus on inventory levels, incoming shipments, stock status

    Logistics Coordinator: Focus on orders, lead times, delivery scheduling

    Executive: Periodic access for high-level strategic reviews

Note: MVP focuses on single planner role; multi-role support with differentiated views planned for Phase 2.

3. CORE FEATURES & DETAILED SPECIFICATIONS
Feature 1: User Authentication & Login Page

Status: ✅ Already implemented (no changes required)

Overview: Secure login system with clean, modern design

Current Implementation Details:

    Brand: BORGai - Intelligent Core Supply Forecasting Platform

    Role: Single 'planner' role (multi-role support planned for Phase 2)

    Demo Credentials:
        Email: demo@borgai.platform
        Password: demo1234
        (Legacy credentials planner@borg.com / demo123 also supported)

    Features:
        Email + password validation
        Show/hide password toggle
        Remember me checkbox
        Demo credentials display with auto-fill and copy buttons
        Error messaging with orange accent (#E37222)
        Loading state during authentication

    Design:
        Background: Light grey (#FAFAFA)
        Primary button: Black with hover effect
        Form validation and error states
        Responsive layout for mobile/tablet/desktop
        Footer with Team 66 branding, TUM and REMAN logos

    Technical:
        localStorage-based session management (will upgrade to JWT in Phase 2)
        Session persists on page refresh
        AuthContext for state management
        Auto-logout: Planned for Phase 2

    Attribution:
        Team 66: Christian Güttler and Robert Hoffmann
        REMAN Challenge 2025 - Unlocking the Power of AI for Circular Industries

Feature 2: Main Dashboard - Forecast Overview & Critical Alerts

User Stories:

    As a supply chain planner, I want to see my forecasts and critical alerts at a glance so I can assess supply chain health and prioritize actions

    As a supply chain planner, I want to see incoming stock levels and low-stock warnings so I can manage inventory operations efficiently

2.1 Overall Dashboard Spatial Layout

**Layout Overview:**

The dashboard uses an 80-20 split below the main navigation:
- **Left Section (80%):** Contains KPI Badge, Filters, and Main Chart
- **Right Section (20%):** Critical Actions Panel (full height)

Header Section (Full Width, Top)

    Left: BORGai logo + "Core Forecast Dashboard" title

    Center: Primary navigation (Dashboard, Forecast Analysis, [Coming Soon] Circular Transparency, [Coming Soon] Scenario Planning)

    Right: User profile, settings, logout controls

**KPI Badge Section (80% Width, Below Header) - NEW FEATURE**

    Position: Top of left 80% column, spans full width of left section

    Layout Structure:

        Left: 4 KPI cards (carousel with navigation)

        Right: Alert Summary chart (always visible, independent of carousel)

    Collapsible Functionality:

        Collapse/Expand button: [▼]/[▶] next to "KPIs" heading (black text)

        Expanded: Shows full KPI cards, charts, and navigation (~180-200px height)

        Collapsed: Only header visible (~40px height)

        Default State: Expanded on page load

    Carousel Navigation:

        6 Total Items: 5 KPI metrics + 1 "Create KPI" action button

        4 Items Visible: At any given time

        Navigation Buttons: ◀ ▶ centered below KPI cards

        States: 3 carousel positions (Initial → +1 click → +2 clicks)

    KPI Cards (5 metrics):

        1. Recent Model Accuracy: 93% (+0.8%, Last 30 days)

        2. AI Forecast vs. Legacy Forecast: 5% (-0.5%, Last 30 days)

        3. Average Lead Time: 53 Days (-2.1%, Last 12 Months)

        4. Average Return Rate: 69% (+0.8%, Last 12 Months)

        5. Core Inventory Coverage: 84% (+1%, Next 30 days)

    Alert Summary Chart:

        Always visible on right side

        Shows: Total alerts (16), Forecast Alerts (12), Model Performance Alerts (4)

        Time Period: Last 30 days

        Area chart visualization with breakdown

    Data Behavior:

        Hardcoded metrics (MVP)

        Independent of filter sidebar selections

        No dynamic filtering based on core/component selection

    Visual Design:

        Matches existing dashboard card styling

        TUM Blue (#0065BD) for metrics

        Green/Red arrows for positive/negative trends

        Area charts for each KPI

        White background, subtle shadows

Left Sidebar (20% of left section = 16% of page width)

    Position: Starts BELOW KPI Badge section, left column

    Title: "Filters"

    Filtering & Configuration:

        Collapsible sections for forecast hierarchy levels (L1/L2/L3/L4/L5)

        Category dropdown for system-wide filtering

        Multi-select capability for comparing multiple product lines

        Expand/collapse all sections functionality

    Purpose: Drive forecast chart content updates based on selection (NOT KPI Badge)

    Interactions: Clicking a level filters forecast chart data to show that product line

Main Content Area (80% of left section = 64% of page width)

    Position: Starts BELOW KPI Badge section, right of Filter sidebar, within left 80% column

Section A: Upper Half - Forecast Chart

    Title: "Forecast Analysis"

    Chart Type: Multi-line time series visualization

        Blue Line (#0065BD): AI Forecast (model prediction, typically more volatile)

        Red Line (#C01530): Consensus Forecast or Historical Consumption (baseline)

        Shaded Confidence Band: Light blue area showing 80% prediction interval

        Black Vertical Markers: Anomalies, data issues, or forecast recalibration points

        X-Axis: Time-based (dates at regular intervals, e.g., weekly)

        Y-Axis: Units/volume

        Interactive Tooltips: Show exact values, % change, contributor information on hover

        Grid Background: Subtle grey (#CCCCCC) for readability

    Time Range Controls:

        Quick select buttons: "2 Week", "1 Month", "3 Month", "6 Month", "Custom"

        Default view: 2-week rolling window

        Date range picker for custom periods

        Zoom controls for detailed inspection

    Legend & Controls:

        Legend below chart identifying blue (AI), red (Consensus), and confidence bands

        "Download Chart" button for exporting

        Comparison toggle (show/hide consensus line)

        Component breakdown dropdown (select specific core type)

Section B: Lower Half - KPI Cards & Alert Summary

    KPI Card Grid (4 cards on desktop, responsive on mobile):

        Card 1: Recent Model Accuracy (MAPE %)

            Value: Large, bold, TUM Blue (#0065BD)

            Trend: ↑↓ arrow + percentage change (green for improvement, orange for decline)

            Mini sparkline: Last 30 days trend

        Card 2: Last Forecast Offset (%)

            Shows deviation of forecast from actual

            Indicates model recency/reliability

        Card 3: AI Forecast vs. Historical Demand (%)

            Highlights divergence from historical baseline

            Helps assess if supply surge/drop is unusual

        Card 4: Model Data Freshness

            Shows when last forecast was generated

            Indicates data update frequency

    Alert Summary Section (Left of KPI cards):

        Title: "Alert Summary"

        Total Alert Count: "ALL ALERTS: [N]"

        Alert Breakdown:

            Forecast Alerts: [count]

            Model Performance Alerts: [count]

        Last 30 Days Trend: Mini bar chart showing alert frequency over time

        Visual: Red background for urgency, badge styling

Critical Actions Panel (Right-side callout, fixed position, 20% width)

    **Overview:** Independent scrolling panel with 4 sections
    - Independent scroll: Panel scrolls without affecting main dashboard
    - Custom scrollbar: Thin TUM Blue (#0065BD) styling
    - Title: "Critical Actions" (scrolls with content, not fixed)

    **Section 1: One-Page Summary Button**

        Full-width button with icon and text
        - Icon: FileText (lucide-react), TUM Blue (#0065BD)
        - Text: "1-Page Summary"
        - Style: White background, TUM Blue border, hover light blue
        - Click: Opens modal overlay

    **One-Page Summary Modal:**
        - Overlay: Semi-transparent black backdrop with blur effect
        - Modal: 80% viewport width, 85% height, centered
        - Close: X button (top-right) or click outside
        - Content: 6 hardcoded sections with timestamp
            1. Supply Overview (Last 30 Days) - KPIs with trends
            2. Critical Alerts (Immediate Action Required)
            3. Forecast Performance (Last 7 Days)
            4. Pending Actions (Requires Attention)
            5. Upcoming Deliveries (Next 7 Days)
            6. Weekly Trends
        - Styling: TUM Blue headers, clean typography, trend indicators

    **Section 2: Alerts**

        Container: White card with border, shadow
        - 3 Alert Cards (hardcoded examples):

        Alert 1: "STOCK LOW"
            - Icon: AlertTriangle (lucide-react), TUM Red (#C01530)
            - Header: TUM Red (#C01530), uppercase, 12px font-semibold
            - Body: SKU details, demand/supply status
            - Details button: Shows "Feature coming soon" toast

        Alert 2: "DELIVERY COMING"
            - Icon: Truck (lucide-react), TUM Red (#C01530)
            - Header: TUM Red (#C01530), uppercase, 12px font-semibold
            - Body: 2 pallets, Dec 12, 3-6pm, 2 SKUs affected
            - Details button: Shows "Feature coming soon" toast

        Alert 3: "SUPPLY DISRUPTION"
            - Icon: AlertCircle (lucide-react), TUM Red (#C01530)
            - Header: TUM Red (#C01530), uppercase, 12px font-semibold
            - Body: Multiple cores not delivered, 3 SKUs affected
            - Details button: Shows "Feature coming soon" toast

        "Acknowledge All" button (bottom): Ghost button, shows toast

    **Section 3: Action Recommendations**

        Separator: Horizontal grey line (#E5E5E5)
        Container: White card with border, shadow
        - 3 Recommendation Cards (hardcoded examples):

        Recommendation 1: "INCENTIVIZE SUPPLY"
            - Icon: TrendingUp (lucide-react), TUM Green (#22C55E)
            - Header: TUM Green (#22C55E), uppercase, 12px font-semibold
            - Body: Increase supply for critical SKUs, 3 SKUs affected
            - Details button: Shows "Feature coming soon" toast

        Recommendation 2: "RESEARCH MARKET TREND"
            - Icon: TrendingUp (lucide-react), TUM Green (#22C55E)
            - Header: TUM Green (#22C55E), uppercase, 12px font-semibold
            - Body: BMW X5 unexpected demand, 15 SKUs affected
            - Details button: Shows "Feature coming soon" toast

        Recommendation 3: "CONTACT SUPPLIER"
            - Icon: Phone (lucide-react), TUM Green (#22C55E)
            - Header: TUM Green (#22C55E), uppercase, 12px font-semibold
            - Body: Supplier WHMUC02 has cores ready
            - Details button: Shows "Feature coming soon" toast

        "Mark All Complete" button (bottom): Ghost button, shows toast

    **Section 4: Calendar Widget**

        Header: "DECEMBER 2025" with navigation buttons (◀ ▶)
        - Month/Year: 14px, font-semibold, centered
        - Navigation: ChevronLeft/Right icons, border buttons
        - Behavior: Navigate prev/next month, doesn't remember selection

        Calendar Grid:
        - Day headers: Su Mo Tu We Th Fr Sa (11px, grey)
        - Date cells: 32px × 32px, centered
        - Today (Dec 2): TUM Blue (#0065BD) background, white text

        Event Indicators (icons, not emojis):
        - Critical events: AlertCircle icon, TUM Red (#C01530)
        - Regular events: Calendar icon, Grey (#6E685F)
        - Delivery events: Package icon, Grey (#6E685F)

        Tooltips (on hover):
        - Black background, white text
        - Shows event details
        - Examples: "Delivery: 1 pallet, 4 SKUs", "Critical: Stock review"

        Hardcoded Events (December 2025):
        - Dec 3: Delivery (grey package)
        - Dec 5: Critical (red alert) + Delivery
        - Dec 7: Delivery (grey package)
        - Dec 10: Regular event (grey calendar)
        - Dec 12: Delivery (grey package)
        - Dec 15: Regular event (grey calendar)
        - Dec 18: Critical event (red alert)
        - Dec 20: Delivery (grey package)
        - Dec 22: Regular event (grey calendar)

        Purpose: Timeline visualization of when actions occur

2.2 UI Design Specifications for Dashboard

Color Palette (Adapted from Morten's Requirements):

    Primary Blue: #0065BD — Headers, primary metric values, main CTAs, chart lines (AI forecast)

    Secondary Grey: #6E685F — Secondary headers, labels, muted text

    Black: #000000 — Primary text, dark elements, structure

    White: #FFFFFF — Backgrounds, card surfaces, clean spaces

    Accent Green: #A2AD00 — Positive trends, in-stock status, success states

    Accent Orange: #E37222 — Warnings, caution states, declining trends

    Accent Red: #C01530 — Critical alerts, stock-out, urgent actions

    Border/Shadow Grey: #D3D0CC — Subtle borders, shadow effects

    Chart Consensus Red: #C01530 — Historical/consensus forecast line

Typography:

    Font Stack: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Montserrat, sans-serif

    Dashboard Title (H1): 32px, weight 600, TUM Blue (#0065BD)

    Section Headers (H2): 20px, weight 600, TUM Blue (#0065BD)

    Card Titles (H3): 14px, weight 600, Secondary Grey (#6E685F)

    KPI Values: 28px, weight 600, TUM Blue (#0065BD)

    Body Text: 14px, weight 400, Black (#000000)

    Labels/Captions: 12px, weight 500, Secondary Grey (#6E685F)

    Chart Axis Labels: 11px, weight 400, Secondary Grey (#6E685F)

Spacing:

    Sidebar Width: 280px (fixed)

    Card Padding: 20px

    Gap Between Cards: 16px

    Section Margins: 24px top/bottom

    Border Radius: 8px (standard cards), 4px (buttons/inputs)

    Box Shadow: 0 1px 3px rgba(0, 0, 0, 0.08) (subtle), 0 4px 8px rgba(0, 0, 0, 0.12) (on hover)

Responsive Breakpoints:

    Desktop (1024px+): Full layout (sidebar + main + right panel)

    Tablet (768px-1023px): Sidebar collapses to icon mode, main content expands

    Mobile (320px-767px): Stack vertically, drawer for sidebar, actions panel slides up

2.3 Component Interaction Flow

Left Sidebar Selection → Dashboard Update:

    User clicks product line in left sidebar (e.g., "L2 Turbochargers")

    Selected item highlights (blue background)

    Main forecast chart updates to show that product's data

    KPI metrics refresh with selected product's performance

    Critical actions filter to show relevant alerts for that product

    Time range resets to default (2 weeks) or maintains previous selection

Chart Interactions:

    User hovers over chart line → Tooltip appears with exact values

    User clicks on date range → Dashboard can optionally zoom to that period

    User drags to select date range → Fine-grain analysis of specific period

    User clicks legend item → Toggle that data series visibility

Critical Action Interaction:

    User clicks red alert box (e.g., "STOCK LOW <Y")

    Dashboard filters/highlights affected SKUs in sidebar

    Chart updates to show that product's forecast

    Right panel expands to show detailed inventory breakdown by location

    Calendar highlights affected dates

Time Range Selection:

    User clicks quick select (e.g., "1 Month")

    Chart X-axis adjusts to show 1-month window

    KPI metrics recalculate for that period

    Forecast bands update to show 1-month ahead predictions

Feature 3: Forecast Analysis Page - Model Transparency & Feature Contribution

**Status**: Redesigned December 2025  
**Feature Plan**: See `docs/forecast_analysis_page_featureplan.md` for detailed specifications

User Stories:

    As a supply chain planner, I want to see exactly which data sources drive each week's forecast so I can understand and validate the model's logic

    As a supply chain planner, I want to review feature contributions over time so I can detect model drift or unusual patterns

    As a supply chain planner, I want to focus on a single core's analysis with locked filters to maintain context

3.1 Page Layout Structure

**Layout Type**: Three-panel grid layout (no Critical Actions Panel on right side)

```
┌─────────────────────────────────────────────────────────────┐
│ MAIN NAVIGATION BAR                                         │
├────────────────┬────────────────────────────────────────────┤
│ FILTERS PANEL  │ CORE DETAILS CARD                          │
│ (Left, 20-25%) │ (Top Right, 75-80%)                        │
│ Height: 4x nav │ Same height as filters                     │
├────────────────┴────────────────────────────────────────────┤
│ MAIN DATA TABLE CARD (Full width)                          │
│ - Tabs, sub-headers, controls, feature table               │
└─────────────────────────────────────────────────────────────┘
```

**3.1.1 Filters Panel (Left Sidebar)**

Purpose: Locked filter context for focused analysis

    Width: 20-25% of viewport

    Height: Fixed at 4x navigation bar height (~240-280px)

    Background: White card with grey border (#D3D0CC)

    Components:

        Preset Views Dropdown (Disabled)

            Current value: "Favorites" (preselected)

            All options grayed out and non-interactive

            Options: All, Favorites (highlighted), High Priority, Standard

            Visual state: opacity 0.5, cursor: not-allowed

        Cores Multi-Select (Disabled)

            Current value: "TC_BMW_x3_2023" (BMW x3 Turbocharger)

            Dropdown opens but all options grayed out

            Search field disabled

            Favorite cores still show star icon but non-interactive

            Communicates: "Analysis is locked to this specific core"

    Overflow: Vertical scroll if content exceeds fixed height

**3.1.2 Core Details Card (Top Right)**

Purpose: Display selected core information and actions

    Height: Same as Filters Panel (synchronized)

    Layout: Flexbox column with space-between for equal spacing

    Background: White card with grey border (#D3D0CC)

    Padding: 24px (p-6)

    Components:

        Core Information (Top Section)

            Core Name: "Turboflow BMW x3 2025" (20px, font-semibold, black)

            SKU: "SKU: TCBMW_X3_2023_5" (14px, grey #6E685F)

        Status Badges (Top Right)

            "Need Review" badge: Orange background (#E37222), white text

            "Open" badge: Green background (#22C55E), white text

        Action Buttons (Middle Section)

            "Accept Forecast" button: TUM Blue (#0065BD), white text

            "Overwrite" button: Outline variant, grey border (#D3D0CC)

            Both buttons show toast "Feature coming soon" (dummy)

        Metadata Icons (Bottom Section - 3 rows)

            AlertCircle icon: "3 Alerts connected to this core"

            Clock icon: "Generated 2 hours ago" (relative time)

            Lock icon: "Locked by M. Bie until Dec 5, 2025"

            All icons: 16px (h-4 w-4), grey color (#6E685F)

        Last Action Footer

            Border top: 1px solid grey (#D3D0CC)

            Text: "Last Action: M. Bie on Nov 28, 2025 at 14:32"

            Font: 12px, username and timestamp bold

**3.1.3 Main Data Table Card (Below Both Panels)**

Purpose: Display feature contribution analysis with controls

    Width: Full width (spans both columns)

    Position: Below Filters Panel and Core Details Card

    Background: White card with grey border (#D3D0CC)

    Structure: Tabs → Header → Sub-headers → Controls → Feature Table

3.2 Navigation Tabs

Three Main Tabs (Top of Main Card):

    Analysis (Default Active)

        Shows full feature contribution analysis

        Blue background (#0065BD) when active, white text

        Contains all sub-headers, controls, and table

    Forecast Overview (Dummy)

        Shows toast "Feature coming soon" when clicked

        Does not switch tab, remains on Analysis

        White background, grey text (#6E685F)

    History (Dummy)

        Shows toast "Feature coming soon" when clicked

        Does not switch tab, remains on Analysis

        White background, grey text (#6E685F)

Tab Design:

    Active: bg-[#0065BD] text-white

    Inactive: bg-white text-[#6E685F]

    Hover: bg-[#F5F5F5] (inactive only)

    Border bottom: 1px solid grey (#D3D0CC) below tab strip

3.3 Analysis Tab - Content Structure

**Header Section**

    Title: "Forecast Analysis"

        Font: 20px (text-xl), font-semibold

        Color: Black (#000000)

        Margin bottom: 16px (mb-4)

**Sub-Headers Section**

Two sub-header buttons with dot indicators:

    Forecast Data Analysis (Preselected)

        Blue dot (8px diameter) before text

        Text color: Black (#000000), font-medium

        Border bottom: 2px solid blue (#0065BD)

        State: Active, shows feature contribution table

    Forecast Model Analysis (Dummy)

        Grey dot (8px diameter) before text

        Text color: Grey (#6E685F), font-normal

        No border bottom

        Shows toast "Feature coming soon" when clicked

        State: Inactive, not yet implemented

Layout: Horizontal flex with 24px gap (gap-6)

**Grey Line Separator**

    Border: 1px solid grey (#D3D0CC)

    Full width, 24px margin bottom (mb-6)

**Control Buttons Box**

Container:

    Background: Light grey (#F5F5F5)

    Padding: 16px (p-4)

    Border radius: 6px (rounded)

    Layout: Horizontal flex with 16px gap (gap-4)

Components (Left to Right):

1. View Toggle (Segmented Control)

    Detailed View Button (Default Active)

        Background: TUM Blue (#0065BD)

        Text: White (#FFFFFF), 14px, font-medium

        Padding: 8px 16px (py-2 px-4)

        Border radius: Left side only (rounded-l)

        Click behavior: Expands all categories in table

    Aggregate View Button

        Background: White (#FFFFFF)

        Text: Black (#000000), 14px, font-medium

        Padding: 8px 16px

        Border: 1px solid grey (#D3D0CC, except left edge)

        Border radius: Right side only (rounded-r)

        Click behavior: Collapses all categories, shows summary rows

2. Value Mode Dropdown

    Options:

        "Absolute Values" (Default): Shows raw contribution numbers (+64, -30)

        "Relative Values": Shows percentage contribution (+10.9%, -4.8%)

    Width: 200px

    Border: 1px solid grey (#D3D0CC)

    Calculation (Relative): (featureValue / totalForecast) × 100

3. Action Buttons (All Dummy)

    Filters Button

        Variant: Outline, grey border (#D3D0CC)

        Icon: Filter (lucide-react, 16px, positioned left)

        Text: "Filters"

        Shows toast: "Feature coming soon"

    Update Button

        Background: TUM Blue (#0065BD)

        Text: White (#FFFFFF)

        No icon

        Shows toast: "Feature coming soon"

    Download Button

        Variant: Outline, grey border (#D3D0CC)

        Icon: Download (lucide-react, 16px, positioned left)

        Text: "Download"

        Shows toast: "Feature coming soon"

3.4 Feature Contribution Table (Current Implementation)

**Component**: FeatureTable.tsx (Keep existing implementation)

**Structure**:

**Table Structure:**

Columns (Time Periods):

    Each column represents a forecast period (weekly intervals)

    Column header shows date: "03/01", "03/08", "03/15", "03/22", "03/29", "04/05", "04/12"

    Column width: Minimum 80px, centered content

Rows (Forecast Components & Features):

1. AI Forecast Row (Always Visible)

        Label: "AI Forecast"

        Values: 586, 573, 615, 623, 557, 612, 645 (example)

        Background: Light blue (#0065BD at 10% opacity)

        Text: TUM Blue (#0065BD), font-semibold

        This is the final forecast that appears on main dashboard

2. EXTERNAL DATA Group (Collapsible)

    7 features with contribution values:

        Macroeconomic Trends: -64, -30, -76, +9, -34, -12, -45

        Customer Trends: -80, +3, -87, -21, -79, +15, -34

        Google Trends: +17, -89, -47, -67, -82, +23, +56

        Market Insights: +48, -67, +5, +64, -8, -23, +12

        Point of Sale: -2, -66, -132, -80, -69, -45, -89

        Seasonality: +50, +179, +164, +4, +73, +98, +134

        Weather: +67, +127, +13, -71, -46, +34, -12

    Category Header:

        Button with ChevronDown (expanded) or ChevronRight (collapsed)

        Text: "EXTERNAL DATA" (uppercase, font-semibold, black)

        Hover: Light grey background (#F5F5F5)

        Collapsible: Click to toggle feature rows visibility

3. SALES ORDERS Group (Collapsible)

    2 features:

        Open Sales Orders: -60, +183, +27, -20, -15, +45, +78

        Historical Sales Orders: +43, -64, -29, +36, -72, -23, +12

    Same category header styling as EXTERNAL DATA

4. EVENTS Group (Collapsible)

    2 features:

        Holidays: +2, +197, +158, 0, 0, +23, +45

        Marketing Campaigns: -53, -67, -83, +37, +28, -12, +34

    Same category header styling as EXTERNAL DATA

**Default State**: All three groups expanded (ChevronDown icons showing)

**Cell Styling & Color Coding**:

Absolute Values Mode (Default):

    Positive values: "+64", "+179" (with + prefix)

    Negative values: "-30", "-87" (with - prefix)

    Zero values: "—" (em dash)

Relative Values Mode:

    Positive values: "+10.9%", "+31.3%" (percentage of total forecast)

    Negative values: "-4.8%", "-15.2%"

    Zero values: "0.0%"

Color Coding (Both Modes):

    Positive Impact (Green Cells)

        Background: #A2AD00 at 15% opacity

        Text: #A2AD00 (Success Green)

        Meaning: This feature increases the forecast

    Negative Impact (Orange Cells)

        Background: #E37222 at 15% opacity

        Text: #E37222 (TUM Orange)

        Meaning: This feature decreases the forecast

    Neutral Impact (Grey Cells)

        Background: #F5F5F5 (Light Grey)

        Text: #6E685F (TUM Grey)

        Meaning: Zero or minimal impact

**Collapsible Behavior:**

Category Headers:

    Clickable button spanning full width

    Left side: Chevron icon + category label (uppercase, font-semibold)

        ChevronDown (h-4 w-4): Category expanded

        ChevronRight (h-4 w-4): Category collapsed

    Hover: Light grey background (#F5F5F5)

    Click: Toggle visibility of all feature rows in category

Feature Rows:

    Indented 32px (pl-8) from left edge

    Border top: 1px solid grey (#D3D0CC at 30% opacity)

    Visible when category is expanded

    Hidden when category is collapsed

Aggregate View Mode (Future):

    All categories show collapsed state (ChevronRight)

    Category rows show aggregated totals (sum of all features in category)

    User can still manually expand categories to see individual features

**Table Footer (Legend):**

    Border top: 1px solid grey (#D3D0CC)

    Padding top: 16px (pt-4)

    Margin top: 24px (mt-6)

    Layout: Horizontal flex with 24px gap (gap-6)

    Font: 12px (text-xs), grey (#6E685F)

    Two legend items:

        Green box (16px × 16px, border #A2AD00) + "Positive contributor (increases forecast)"

        Orange box (16px × 16px, border #E37222) + "Negative contributor (decreases forecast)"

**Horizontal Scroll:**

    Container: overflow-x-auto on card wrapper

    Minimum table width enforced by column min-widths

    Browser default scrollbar

**Cell Interaction (Future Enhancement):**

    Hover: Tooltip with detailed value and explanation

        Example: "Seasonality (Winter peak): +127 units | Contributes 20% to weekly forecast"

    Click: Opens detailed explanation modal

        Shows: Historical context, trend analysis, why this feature contributes

3.5 Interaction Flows

**Page Load Flow:**

1. User navigates to `/dashboard/forecast-analysis`

2. System loads default state:

    Filters Panel: Preset "Favorites", Core "TC_BMW_x3_2023" (both disabled/grayed out)

    Core Details Card: Shows BMW x3 details, badges, metadata

    Main Content: "Analysis" tab active, "Forecast Data Analysis" sub-header active

    Controls: "Detailed View" active, "Absolute Values" selected

    Feature Table: All three category groups expanded

3. Page renders in ~300ms

**Tab Switching Flow:**

    Analysis Tab (Active): Shows full content

    Forecast Overview Tab (Dummy): Shows toast "Feature coming soon", stays on Analysis

    History Tab (Dummy): Shows toast "Feature coming soon", stays on Analysis

**Sub-Header Navigation Flow:**

    Forecast Data Analysis (Active): Shows feature contribution table

    Forecast Model Analysis (Dummy): Shows toast "Feature coming soon", stays on Forecast Data Analysis

**View Toggle Flow:**

    Detailed View → Aggregate View:

        Updates button states (Aggregate becomes blue, Detailed becomes white)

        Collapses all category groups

        Shows only category summary rows (future: with aggregated totals)

        Duration: 200ms smooth transition

    Aggregate View → Detailed View:

        Updates button states (Detailed becomes blue, Aggregate becomes white)

        Expands all category groups

        Shows all individual feature rows

        Duration: 200ms smooth transition

**Dropdown Change Flow:**

    Absolute Values → Relative Values:

        Calculates percentage contribution: (featureValue / totalForecast) × 100

        Updates all table cells with percentage format (+10.9%, -4.8%)

        Keeps color coding (green/orange)

        Duration: 100ms (instant update)

    Relative Values → Absolute Values:

        Restores original contribution values

        Updates cells with absolute format (+64, -30)

        Duration: 100ms

**Dummy Button Interactions:**

All dummy buttons show toast "Feature coming soon" (3 second duration, dismissible):

    Accept Forecast button

    Overwrite button

    Filters button

    Update button

    Download button

**Filter Panel Interactions (Disabled State):**

    Preset Views Dropdown:

        Dropdown does not open (disabled)

        Cursor shows "not-allowed" icon

        Current selection visible but grayed out

    Cores Multi-Select:

        Dropdown opens but all options grayed out

        Checkboxes disabled, no selection changes possible

        Search field disabled

        Current selection (TC_BMW_x3_2023) shows checkmark but grayed

3.6 Data Requirements

**Hardcoded Data (Initial Implementation):**

```typescript
// Selected core details
const selectedCore = {
  id: "TC_BMW_x3_2023",
  name: "Turboflow BMW x3 2025",
  sku: "TCBMW_X3_2023_5",
  category: "Turbocharger"
};

// Core status and metadata
const coreStatus = {
  badges: [
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
    timestamp: "Nov 28, 2025 at 14:32"
  }
};

// Filter state (disabled)
const filterState = {
  presetView: "favorites",
  selectedCores: ["TC_BMW_x3_2023"],
  disabled: true
};

// Feature contribution data (already in FeatureTable.tsx)
const forecastData = {
  dates: ['03/01', '03/08', '03/15', '03/22', '03/29', '04/05', '04/12'],
  currentForecast: [586, 573, 615, 623, 557, 612, 645],
  features: {
    externalData: [/* 7 features */],
    salesOrders: [/* 2 features */],
    events: [/* 2 features */]
  }
};
```

**Future API Integration (Add TODO Comments):**

```typescript
// TODO: Replace with API call
// GET /api/forecast-analysis?coreId=TC_BMW_x3_2023
// GET /api/cores/{coreId}/status
// GET /api/forecast-analysis/{coreId}/contributions
```

3.7 Component Architecture

**New Components:**

    `ForecastFiltersPanel.tsx`: Left sidebar with disabled filters

    `CoreDetailsCard.tsx`: Top right card with core info and actions

    `AnalysisMainContent.tsx`: Main card with tabs, sub-headers, controls, and table

**Deprecated Components:**

    `AnalysisHeader.tsx`: Content moved to CoreDetailsCard

    `AnalysisTabs.tsx`: Integrated into AnalysisMainContent

    `TableControls.tsx`: Integrated into AnalysisMainContent

**Existing Components (Keep):**

    `FeatureTable.tsx`: Current table implementation (will enhance later)

3.8 Responsive Design

**Desktop (≥1280px):**

    Filters Panel: 20% width

    Core Details Card: 80% width (minus gap)

    All features visible

**Laptop (1024px - 1279px):**

    Filters Panel: 25% width

    Core Details Card: 75% width

    Slightly compressed but functional

**Tablet (≤1023px) - Future Enhancement:**

    Stack vertically: Filters → Core Details → Main Content

    Remove fixed heights

    Full-width cards

3.9 Design Specs Summary

**Color Palette:**
- TUM Blue: `#0065BD` (primary buttons, active states)
- TUM Grey: `#6E685F` (body text, icons)
- TUM Orange: `#E37222` (warning badge, negative values)
- TUM Green: `#22C55E` (success badge)
- Border Grey: `#D3D0CC` (card borders, separators)
- Success Green: `#A2AD00` (positive contributions)

**Typography:**
- H2: 20px, font-semibold (page headers)
- H3: 18px, font-semibold (section headers)
- Body: 14px, font-normal
- Small: 12px, font-normal

**Spacing:**
- Card padding: 24px (p-6)
- Section spacing: 24px (mb-6)
- Element spacing: 16px (mb-4)
- Grid gap: 24px (gap-6)

**Shadows:**
- Cards: `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)`
- Hover: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`

**Icons:**
- Small (inline): 16px (h-4 w-4)
- Medium (buttons): 18px
- Large (headers): 20px (h-5 w-5)

---

**End of Feature 3 Specifications**

Feature 4: Coming Soon Placeholder Features

These features are NOT implemented in MVP but are visible in navigation with "Coming Soon" indicator and transparency effect.
Feature 4a: Circular Transparency (Coming Soon)

Navigation Button:

    Location: Top navigation bar, right side after "Forecast Analysis"

    Label: "Circular Transparency"

    Status Badge: "Coming Soon" (small red badge, top-right corner of button)

    Styling: 50% opacity (transparency effect, "matter" look - appears greyed out)

    Hover Tooltip: "Quellen-Senken Analyse of Supply Chain" (German for Source-Sink Analysis)

    Interaction: Click disabled, shows toast notification "This feature is under development"

Feature 4b: Scenario Planning (Coming Soon)

Navigation Button:

    Location: Top navigation bar, right side after "Circular Transparency"

    Label: "Scenario Planning"

    Status Badge: "Coming Soon" (small red badge, top-right corner of button)

    Styling: 50% opacity (transparency effect, "matter" look)

    Hover Tooltip: "Scenario based planning with what-if scenarios and more"

    Interaction: Click disabled, shows toast notification "This feature is under development"

Planned Functionality (for reference, not implemented):

    What-if scenario builder

    Adjust key drivers (registrations, seasonality, weather) and see forecast impact

    Compare multiple scenarios side-by-side

    Export scenario analysis reports

4. TECHNICAL ARCHITECTURE
Frontend Stack

    Framework: Next.js 15 with App Router

    Language: TypeScript (strict mode)

    Styling: Tailwind CSS v4

    UI Components: shadcn/ui (customized with TUM color palette)

    Charts: Recharts (multi-line time series with tooltips)

    Forms: React Hook Form + Zod validation

    Icons: Lucide React

    State Management: React Context API + Hooks

    Authentication: localStorage sessions (MVP)

    Deployment: Vercel (automatic CI/CD)

Data Layer (MVP - All Hardcoded)

All data is hardcoded in TypeScript files to enable rapid MVP development:

lib/data/:

    forecast-metrics.ts - KPI values, alert counts, model accuracy

    forecast-chart.ts - Time series data (AI forecast, consensus, confidence bands)

    feature-contributions.ts - Feature impact table data (organized by category)

    inventory.ts - Stock levels, reorder points, locations

    orders.ts - Order status, lead times, deliveries

    users.ts - Test user accounts with roles

    critical-actions.ts - Alerts, delivery schedules, stock warnings

    calendar-events.ts - Upcoming delivery dates, action dates

lib/types.ts - TypeScript interfaces for all data models

lib/contexts/:

    AuthContext.tsx - Authentication state, session handling (role management planned for Phase 2)

Component Architecture

text
components/
├── ui/                          # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   ├── table.tsx
│   ├── tabs.tsx
│   └── badge.tsx
│
├── layout/
│   ├── Header.tsx               # Top navigation
│   ├── Sidebar.tsx              # Left sidebar with core forecast filter
│   └── CriticalActionsPanel.tsx # Right-side alerts panel
│
└── features/
    ├── dashboard/
    │   ├── KPIGrid.tsx          # KPI card grid
    │   ├── ForecastChart.tsx    # Main multi-line chart
    │   ├── AlertSummary.tsx     # Alert count and trend
    │   └── CalendarWidget.tsx   # Delivery date calendar
    │
    ├── forecast-analysis/
    │   ├── AnalysisHeader.tsx   # SKU info, status, buttons
    │   ├── AnalysisTabs.tsx     # Tab navigation
    │   ├── FeatureTable.tsx     # Feature contribution table
    │   ├── TableControls.tsx    # Display options
    │   └── FeatureExplainer.tsx # Detail panel for cell drill-down
    │
    └── auth/
        └── LoginForm.tsx        # Already implemented

Page Routes

text
app/
├── page.tsx                     # Landing → redirects to /login or /dashboard
├── login/
│   └── page.tsx                 # Login page (existing)
└── dashboard/
    ├── layout.tsx               # Main dashboard layout
    ├── page.tsx                 # Main dashboard (KPIs, chart, alerts)
    └── forecast-analysis/
        └── page.tsx             # Forecast analysis page (feature contributions)

Component Interaction Flow

Sidebar Selection → Dashboard Update:

text
User clicks sidebar item (L2 Turbochargers)
  ↓ (setSelectedProduct)
Dashboard Context updates
  ↓
ForecastChart filters data by selected product
KPIGrid recalculates metrics for that product
AlertSummary refreshes alert counts
CriticalActionsPanel filters relevant alerts

Chart Hover → Tooltip:

text
User hovers over chart line
  ↓
Recharts tooltip displays
  ↓
Shows: [Date, AI Forecast Value, Consensus Value, % Diff]

Critical Action Click → Drill-Down:

text
User clicks "STOCK LOW <Y" alert
  ↓
Modal/drawer opens showing:
  - Affected SKUs and locations
  - Current vs. reorder point quantities
  - Recommended action
  - Option to view forecast for affected product

Time Range Selection → Chart Zoom:

text
User clicks "1 Month" button
  ↓
Chart X-axis adjusts to 1-month window
KPI metrics recalculate for that period
Forecast bands update accordingly

5. DESIGN SYSTEM & VISUAL SPECIFICATIONS
Color Palette (Morten's Requirements - Final)

Primary Colors:

    Primary Blue (#0065BD): Page headers (H1/H2), KPI values, primary buttons, AI forecast line (chart)

    White (#FFFFFF): Page background, card surfaces, clean spacing

    Black (#000000): Primary text body, critical elements

Secondary Colors:

    Secondary Grey (#6E685F): Section headers (H3), labels, secondary text, descriptions

    Border/Shadow Grey (#D3D0CC): Subtle borders, card shadows, dividers

Accent Colors:

    Accent Green (#A2AD00): Positive trends, in-stock status, success badges

    Accent Orange (#E37222): Warnings, caution states, declining trends, some alert types

    Accent Red (#C01530): Critical alerts, stock-outs, urgent actions, consensus line (chart)

Typography

Font Stack:

text
-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Montserrat, sans-serif

Font Sizes & Weights:
Element	Size	Weight	Color
Page Title (H1)	32px	600	#0065BD
Section Header (H2)	20px	600	#0065BD
Card Title (H3)	14px	600	#6E685F
Body Text	14px	400	#000000
Labels/Captions	12px	500	#6E685F
Small Text	11px	400	#6E685F
KPI Value	28px	600	#0065BD
Chart Axis Labels	11px	400	#6E685F
Spacing & Layout

Base Unit: 4px (multiples: 4, 8, 12, 16, 20, 24, 32)
Element	Value
Sidebar Width	280px (fixed)
Card Padding	20px
Gap Between Cards	16px
Section Margin	24px (top/bottom)
Chart Height	400px (desktop), 300px (mobile)
Chart Padding	16px
KPI Card Height	Auto (min 140px)

Border Radius:

    Cards: 8px

    Buttons: 4px

    Badges: 12px (pill-shaped)

    Inputs: 4px

Shadows & Effects
Situation	Shadow
Card Default	0 1px 3px rgba(0, 0, 0, 0.08)
Card Hover	0 4px 8px rgba(0, 0, 0, 0.12)
Chart Container	0 1px 3px rgba(0, 0, 0, 0.08)
Alert Box	0 2px 4px rgba(0, 0, 0, 0.1)

Effects:

    Card Hover: Slight shadow elevation + 1px scale-up (matter design)

    Button Hover: Subtle background shade shift (Secondary Blue #005293 for blue buttons)

    Disabled State: 50% opacity + cursor: not-allowed

Component Styling

Buttons:

    Primary (Blue):

        Background: #0065BD

        Text: White

        Padding: 10px 20px

        Hover: Background #005293

        Disabled: Opacity 50%

    Secondary (Grey outline):

        Background: Transparent

        Border: 1px solid #D3D0CC

        Text: #6E685F

        Padding: 10px 20px

        Hover: Background #F5F5F5

    Alert Button (Red):

        Background: #C01530

        Text: White

        Padding: 10px 20px

        Hover: Background #A01228

        Cursor: Pointer

Cards:

    Background: #FFFFFF

    Border: 1px solid #D3D0CC

    Border-radius: 8px

    Padding: 20px

    Shadow: 0 1px 3px rgba(0, 0, 0, 0.08)

    Hover: Shadow increases to 0 4px 8px rgba(0, 0, 0, 0.12)

Input Fields:

    Background: #FFFFFF

    Border: 1px solid #D3D0CC

    Padding: 10px 12px

    Border-radius: 4px

    Focus: Border #0065BD, outline 2px solid #0065BD (20% opacity)

    Font: 14px, #000000

Badges:

    Status Badges (Success): Background #A2AD00 (15% opacity), Text #A2AD00

    Status Badges (Warning): Background #E37222 (15% opacity), Text #E37222

    Status Badges (Critical): Background #C01530 (15% opacity), Text #C01530

    Font: 11px, weight 600

    Padding: 4px 8px

    Border-radius: 12px

Tables:

    Header Background: #F5F5F5

    Header Text: #6E685F, weight 600

    Row Background: Alternating #FFFFFF and #FAFAFA

    Row Hover: #F5F5F5

    Border: 1px solid #D3D0CC

    Cell Padding: 12px

Charts:

    Background: #FFFFFF

    Border: 1px solid #D3D0CC

    Grid Lines: #D3D0CC (20% opacity)

    AI Forecast Line: #0065BD (2px)

    Consensus Line: #C01530 (2px, dashed)

    Confidence Band: #0065BD (10% opacity fill)

    Tooltip Background: #000000

    Tooltip Text: #FFFFFF

Responsive Design

Breakpoints:
Device	Width	Layout
Mobile	320px-767px	Stack vertically; sidebar becomes drawer; actions panel slides up
Tablet	768px-1023px	Sidebar collapses to icons; main content expands; actions panel stays
Desktop	1024px+	Full layout: sidebar + main + actions panel all visible

Key Responsive Changes:

    KPI Grid: 1 column (mobile), 2 columns (tablet), 4 columns (desktop)

    Chart Height: 250px (mobile), 300px (tablet), 400px (desktop)

    Font Sizes: 12px body (mobile), 13px (tablet), 14px (desktop)

    Padding: 12px (mobile), 16px (tablet), 20px (desktop)

Accessibility

Color Contrast:

    Primary text vs. white background: ≥ 4.5:1 (AAA)

    Secondary text vs. white background: ≥ 3:1 (AA)

    Chart lines vs. white background: ≥ 3:1 (AA)

    Alert boxes: ≥ 4.5:1 (AAA)

Interactive Elements:

    Minimum touch target: 44px × 44px

    Focus visible: 2px outline, #0065BD

    All buttons keyboard accessible (Tab key)

    All form inputs have <label> or aria-label

Semantic HTML:

    Page structure: <header>, <nav>, <main>, <aside>, <footer>

    Headings: <h1> (page title), <h2> (sections), <h3> (cards)

    Lists: <ul> (alerts), <ol> (ranked items)

    Tables: <table> with <thead>, <tbody>

    Forms: <form>, <input>, <label>, <button>

ARIA Attributes:

    aria-label on icon buttons

    aria-describedby on complex components

    role="status" on alert summaries

    aria-expanded on collapsible sections

    aria-selected on tabs

    aria-hidden="true" on decorative elements

6. DATA FLOW & HARDCODED DATA STRATEGY
Data Structure Overview

KPI Metrics:

typescript
interface KPIMetric {
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: number;          // % change
  sparklineData: number[];      // Last 30 days
  status: 'good' | 'warning' | 'critical';
}

Forecast Data:

typescript
interface ForecastDataPoint {
  date: string;
  aiForecas: number;
  consensusForecas: number;
  confidenceLower: number;
  confidenceUpper: number;
}

const forecastData: ForecastDataPoint[] = [
  { date: '04/01', aiForecas: 586, consensusForecas: 550, confidenceLower: 480, confidenceUpper: 650 },
  { date: '04/08', aiForecas: 573, consensusForecas: 560, confidenceLower: 470, confidenceUpper: 640 },
  // ... more data points
]

Feature Contributions:

typescript
interface FeatureContribution {
  featureName: string;
  category: 'ExternalData' | 'SalesOrders' | 'Events';
  contributions: Record<string, number>; // { date: value, ...}
}

const featureContributions: FeatureContribution[] = [
  { 
    featureName: 'Macroeconomic Trends',
    category: 'ExternalData',
    contributions: { '03/01': -64, '03/08': -30, '03/15': -76, ... }
  },
  // ... more features
]

Critical Actions:

typescript
interface CriticalAction {
  id: string;
  type: 'STOCK_LOW_SINGLE' | 'STOCK_LOW_MULTI' | 'DELIVERY_COMING';
  title: string;
  description: string;
  severity: 'warning' | 'critical';
  affectedSKUs: string[];
  actionDate: string;
  icon: string;
}

const criticalActions: CriticalAction[] = [
  {
    id: 'alert_001',
    type: 'STOCK_LOW_SINGLE',
    title: 'STOCK LOW <Y',
    description: 'Turbocharger stock below reorder point',
    severity: 'critical',
    affectedSKUs: ['CORE-TURBO-001'],
    actionDate: '2025-11-30',
    icon: '⚠️'
  },
  // ... more actions
]

Data Files to Create

lib/data/:

    forecast-metrics.ts - All KPI values, alert summaries

    forecast-chart.ts - Time series data for main chart

    feature-contributions.ts - Feature impact values organized by category

    critical-actions.ts - Alert boxes, delivery alerts, stock warnings

    inventory.ts - SKU list, stock levels (reference for sidebar filter)

    orders.ts - Order data (for future reference)

    users.ts - Test user accounts with roles (already exists)

    calendar-events.ts - Delivery dates, action dates for calendar widget

lib/types.ts - All TypeScript interfaces
Hardcoded Data Pattern

Every component has a comment marking where API calls would go:

typescript
// TODO: Replace with API call to /api/forecast/metrics
const metrics = hardcodedForecastMetrics;

This enables easy replacement in Phase 2 when backend is available.
7. USER JOURNEY & INTERACTION SCENARIOS
Scenario 1: Planner Reviews Supply Chain Health (Main Dashboard)

Step 1: Login

    Navigate to app

    Enter credentials (demo@borgai.platform / demo1234)

    Redirected to /dashboard

Step 2: Dashboard Overview

    See KPI cards showing model accuracy (85%), forecast offset (24%)

    View main chart: Blue line (AI forecast) trends upward, red line (consensus) flatter

    Notice critical actions on right: "STOCK LOW ×Y" (red alert)

    Scan alert summary: 16 total alerts, 12 forecast-related, 4 model performance

Step 3: Investigate Specific Product

    Click "Turbochargers" in left sidebar

    Chart updates to show turbocharger-specific forecast

    Alert panel filters to show turbocharger-specific alerts

    KPI cards refresh with turbocharger metrics

Step 4: Check Critical Alert

    Click "STOCK LOW ×Y" alert on right panel

    Modal/drawer opens showing:

        Affected locations: Warehouse A (142 units), Warehouse B (18 units)

        Reorder point: 200 units

        Recommendation: Expedite delivery or reduce forecast-based demand

    Option: Click "View Forecast for This SKU" → Navigate to /dashboard/forecast-analysis

Step 5: Review Forecast Analysis

    On /dashboard/forecast-analysis page

    See turbocharger SKU selected

    Review feature contribution table

    Notice "Seasonality +179" for March (high) and "Macroeconomic -64" (low)

    Hover over cells to understand drivers

    Decision: Accept forecast or override

Step 6: Accept Forecast

    Click [Accept AI Forecast] button

    Status updates to "Accepted"

    Timestamp shows: "Accepted by [User Name] on Nov 30, 2025 at 09:22"

    Return to dashboard (either via navigation or back button)

Scenario 2: Planner Checks Upcoming Deliveries

Step 1: Login

    Credentials: sarah@borg.com / password123

    Role: Operator

Step 2: Operator Dashboard View

    Dashboard shows operator-specific view

    Inventory cards prominent (limited forecast detail)

    Critical actions: stock levels, incoming deliveries

    Chart: Simplified view (no detailed feature analysis)

Step 3: Check Incoming Delivery

    Calendar widget shows "🚚 Dec 2" (delivery date highlighted in red)

    Click calendar date

    Details: "2 pallets turbochargers arriving Dec 2, 3 PM"

    Quantity: 500 units

    Expected impact: Resolve "STOCK LOW ×Y" alert

Step 4: Prepare for Delivery

    Click "DELIVERY COMING" alert

    See delivery details and expected impact on inventory

    Review affected SKUs and forecast adjustments

    Plan warehouse capacity and receiving logistics

Scenario 3: Future Multi-Role Implementation (Phase 2)

Step 1: Login

    Credentials: executive@borg.com / password123

    Role: Executive

Step 2: Executive Dashboard View

    High-level KPI dashboard only

    4 main metrics: forecast accuracy, inventory health, lead time, cost impact

    No detailed tables, no drill-down into individual SKUs

    Monthly trend view (not weekly)

Step 3: View Performance Trend

    Chart shows last 90 days aggregate performance

    Green line trending up (positive)

    Alert summary: 3 critical alerts (vs. 16 in manager view)

    PDF export option available

8. ACCEPTANCE CRITERIA & TESTING STRATEGY
MVP Definition - What Constitutes "Done"
Feature Completeness

✅ Login Page: Functional with test credentials
✅ Main Dashboard: All components render correctly

    Header with navigation

    Left sidebar with product filter (L1-L5)

    KPI card grid (4 cards minimum)

    Forecast chart (multi-line with tooltips)

    Alert summary box

    Critical actions panel (red alert boxes)

    Calendar widget (with delivery dates)

✅ Forecast Analysis Page: Feature contribution table

    Header with SKU info and action buttons

    Tabs: Forecast Overview, Analysis, History

    Feature contribution table with color-coded cells

    Display options (absolute/signed, color scheme, filters)

    Collapsible feature categories

    Cell hover tooltips

✅ Coming Soon Placeholders: Disabled navigation buttons

    "Circular Transparency" button (50% opacity, tooltip)

    "Scenario Planning" button (50% opacity, tooltip)

Functional Requirements

✅ Page Load Performance: < 2 seconds (P95)
✅ Responsive Design:

    Desktop (1024px+): Full layout renders correctly

    Tablet (768px-1023px): Sidebar collapses to icons, layout adjusts

    Mobile (320px-767px): Stack vertically, no horizontal scroll

✅ Chart Interactions:

    Hover tooltip displays correct values

    Time range buttons update chart window

    Legend toggle works

    Component dropdown filters data

✅ Sidebar Filter:

    Click product line → dashboard updates

    Selected item highlights

    All data (chart, KPI, alerts) filters to product

    Can expand/collapse L1-L5 hierarchy

✅ Table Interactions:

    Hover cell → tooltip appears

    Click cell → explanation panel opens (if implemented)

    Collapse/expand feature groups

    Display options update table

✅ Data Accuracy:

    KPI values match hardcoded data

    Chart values align with forecast data

    Feature contributions sum to final forecast

    No data formatting errors

✅ Authentication:

    Planner role: All features accessible

    Valid credentials redirect to dashboard

    Invalid credentials show error message

    Session persists on page refresh

    (Multi-role access control planned for Phase 2)

✅ No Errors:

    Zero console errors

    Zero console warnings

    All links functional

    All buttons respond to clicks

Non-Functional Requirements

✅ Code Quality:

    TypeScript strict mode (no any types)

    Components reusable and well-documented

    Comments mark hardcoded data locations (// TODO: Replace with API call)

    Consistent naming conventions

✅ Accessibility (WCAG AA):

    Color contrast ≥ 4.5:1 for normal text

    Color contrast ≥ 3:1 for large text

    Interactive elements ≥ 44px × 44px

    Keyboard navigation: Tab, Enter, Escape all work

    Focus indicators visible on all interactive elements

    Semantic HTML used

    ARIA labels present where needed

✅ Design System Adherence:

    Colors match palette (TUM Blue #0065BD, Grey #6E685F, etc.)

    Typography matches spec (font sizes, weights, colors)

    Spacing consistent (16px gaps, 20px padding, etc.)

    Component styling matches design spec

    No off-brand colors or fonts

✅ Browser Compatibility:

    Chrome (latest): Fully functional

    Firefox (latest): Fully functional

    Safari (latest): Fully functional

    Edge (latest): Fully functional

Deployment

✅ GitHub Repository: Code pushed, committed with clear messages
✅ Vercel Deployment: Auto-deployed, live URL accessible
✅ No Deployment Errors: Build successful, no runtime errors
✅ All Pages Accessible: Each route navigable from UI
Testing Checklist
Functional Testing

Dashboard Page:

    Header renders with logo, navigation, user menu

    Left sidebar displays product hierarchy (L1-L5)

    Clicking sidebar item updates all dashboard data

    KPI cards display with correct values

    KPI cards show trend arrows and sparklines

    Forecast chart renders with blue (AI) and red (Consensus) lines

    Chart shows confidence band (shaded area)

    Tooltip appears on chart hover with exact values

    Time range buttons change chart window

    Alert summary box shows total and breakdown counts

    Critical actions panel shows red alert boxes

    Calendar widget displays with highlighted dates

    Right panel alerts are clickable (open details)

Forecast Analysis Page:

    Header shows SKU name, ID, status, alerts

    [Accept AI Forecast] button works

    [Overwrite] button works (or opens override modal)

    Tabs navigate between Forecast Overview, Analysis, History

    Feature contribution table displays all rows

    Cells color-coded correctly (green for positive, red for negative)

    Feature groups collapse/expand

    Display options (Absolute/Signed) toggle correctly

    Color scheme selector changes cell colors

    Feature filter shows/hides rows

    [Update] button refreshes table with selections

    Cell hover tooltip displays explanation

    Table scrolls horizontally on small screens

Login Page:

    Email input validates (requires @ symbol)

    Password input validates (not empty)

    Valid credentials (demo@borgai.platform / demo1234) redirect to dashboard

    Invalid credentials show error message

    Remember Me checkbox works

    Show/hide password toggle works

    Demo credentials auto-fill works

    Copy credentials buttons work

    Logout clears session and redirects to login

Navigation:

    Dashboard link navigates to /dashboard

    Forecast Analysis link navigates to /dashboard/forecast-analysis

    Coming Soon buttons disabled with tooltip

    User menu shows profile + logout

    Logout clears session

Responsive Design Testing

Mobile (320px):

    All text readable without zoom

    No horizontal scroll (except tables with built-in scroll)

    Buttons at least 44x44px (tap-friendly)

    Sidebar becomes drawer/modal

    KPI cards stack vertically

    Chart readable on small screen

    Alerts panel slides up from bottom or shows in modal

Tablet (768px):

    Sidebar collapses to icons

    Main content expands to fill width

    KPI grid: 2 columns

    Chart readable at tablet size

    Dropdowns and selects work with touch

Desktop (1024px+):

    Full layout visible (sidebar + main + actions panel)

    No scaling or zoom needed

    All components properly spaced

    Chart shows full detail

Accessibility Testing

Keyboard Navigation:

    Tab moves through all interactive elements in logical order

    Enter activates buttons

    Escape closes modals

    Focus visible on all focusable elements (2px outline)

    Dropdown menus accessible via keyboard

Color Contrast:

    Primary text vs. white background ≥ 4.5:1

    Secondary text vs. white background ≥ 3:1

    Chart lines vs. white background ≥ 3:1

    Alert boxes have sufficient contrast

Screen Reader (if testing with NVDA/JAWS):

    Page structure announced correctly (headings, sections)

    Form labels associated with inputs

    Button purpose clear ("Accept AI Forecast", not just "Button")

    Chart description available (table alternative or aria-label)

    Alerts announced as alerts (role="status" or aria-live)

Form Labels:

    All inputs have <label> or aria-label

    Placeholder text not substitute for labels

    Error messages associated with inputs

Performance Testing

Page Load:

    Dashboard loads in < 2 seconds

    No jank or stuttering

    Images load progressively

    Lighthouse score ≥ 85

Interactivity:

    Chart interactions instant (no lag)

    Sidebar filter updates immediately

    Table sort/filter fast

    No loading spinners unless data actually loading

Chart Rendering:

    Recharts renders smoothly

    Tooltip appears instantly on hover

    No flickering or layout shifts

Data Accuracy Testing

KPI Cards:

    Values match hardcoded data

    Trends calculated correctly (↑ for improvement, ↓ for decline)

    Sparklines render with last 30 days data

Chart Data:

    Blue line matches AI forecast values

    Red line matches consensus values

    Confidence band calculated correctly

    X-axis labels correct (dates)

    Y-axis scale appropriate for data range

Feature Contributions:

    Each cell value matches hardcoded contributions

    Feature groups sum correctly

    Color coding matches contribution direction

    Column totals match final AI forecast value

Critical Alerts:

    Alert count matches data

    Alert text matches data

    Affected SKUs correct

    Calendar dates match alert dates

Browser Compatibility Testing
Browser	Version	Status
Chrome	Latest	[ ] Pass
Firefox	Latest	[ ] Pass
Safari	Latest	[ ] Pass
Edge	Latest	[ ] Pass
Manual Testing Scenarios
Test Case 1: Planner's Daily Forecast Review

Steps:

    Open app, log in as demo@borgai.platform / demo1234

    Dashboard loads (< 2 sec)

    KPI cards visible: Model Accuracy 85%, Offset 24%

    Click "Turbochargers" in sidebar

    Chart updates to turbocharger forecast

    Click "STOCK LOW ×Y" alert on right

    Details modal shows affected locations

    Click "View Forecast" in modal

    Navigate to /dashboard/forecast-analysis

    See feature contribution table

    Hover over "Seasonality +179" cell

    Tooltip explains March spring break peak

    Review all features, identify top 3 drivers

    Click [Accept AI Forecast]

    Status updates to "Accepted"

    Timestamp shows: "Accepted by [User Name] on Nov 30, 2025 at 09:22"

    Navigate back to dashboard

Expected Result: All steps complete < 3 minutes, no errors
Test Case 2: Responsive Mobile View

Steps:

    Open dashboard on mobile (320px width or zoom to 50%)

    Header and navigation visible

    Sidebar becomes hamburger menu (or drawer)

    KPI cards stack vertically

    Chart visible (may scroll horizontally for interaction)

    Tap chart to see tooltip

    Tap alert box

    Modal or sheet slides up with details

    Navigate to forecast analysis

    Table scrolls horizontally

    Feature groups visible, can collapse/expand

    All text readable without zoom

Expected Result: Full functionality on mobile, no horizontal scroll except for tables
Test Case 3: Coming Soon Feature Interaction

Steps:

    Dashboard loads

    Hover over "Circular Transparency" button

    Tooltip shows: "Quellen-Senken Analyse of Supply Chain"

    Button appears 50% opacity (disabled look)

    Click button

    Toast message: "This feature is under development"

    Same for "Scenario Planning" button

Expected Result: Disabled buttons show tooltip and toast, no navigation
9. FEATURE COMPLETENESS MATRIX
MVP Features (To Be Built)
Feature	Dashboard	Forecast Analysis	Comments
Login Page	✅	✅	Already complete
Header & Navigation	✅	✅	Standard header across all pages
Left Sidebar Filter	✅	—	Dashboard only
KPI Cards	✅	—	Dashboard KPIs only
Forecast Chart	✅	—	Multi-line with confidence band
Alert Summary	✅	—	Dashboard alert count
Critical Actions Panel	✅	—	Red alert boxes, calendar
Feature Contribution Table	—	✅	Analysis page core component
Display Controls	—	✅	Absolute/Signed, color, filter
Cell Tooltips	—	✅	Hover explanations
Authentication	✅	✅	Secure login (multi-role Phase 2)
Responsive Design	✅	✅	Mobile, tablet, desktop
Accessibility	✅	✅	WCAG AA compliance
Coming Soon Features (Not Implemented)
Feature	Status	Notes
Circular Transparency	🔜 Coming Soon	Disabled button with tooltip
Scenario Planning	🔜 Coming Soon	Disabled button with tooltip
10. GLOSSARY & DEFINITIONS

AI Forecast: Machine learning model prediction of core supply volume

Consensus Forecast: Baseline or historical average, used for comparison

Confidence Band: 80% prediction interval showing forecast uncertainty range

Feature Contribution: Impact of individual data source (feature) on final forecast value

Supply Chain Planner: Primary user persona requiring clean, modern design and full forecast transparency

BORGai: Intelligent Core Supply Forecasting Platform (Team 66 - REMAN Challenge 2025)

L1-L5: Hierarchical levels of forecast (product family → SKU level)

SOFA: System Of Forecast Analysis or category filter (exact definition TBD)

Stock LOW <Y: Alert when inventory below threshold Y

Stock LOW ×Y: Alert when multiple products critically low (multiplicative factor)

Delivery COMING: Alert when scheduled delivery arriving within 48-72 hours

Quellen-Senken Analyse: German for Source-Sink Analysis (supply chain flow mapping)
11. DEVELOPMENT APPROACH - VIBE CODING WITH GITHUB COPILOT
Workflow

Step 1: Copy Feature Section

    Copy relevant section from this PRD (e.g., "Feature 2: Main Dashboard")

Step 2: Paste to GitHub Copilot Chat

    Paste section with prompt:

    text
    Implement this feature according to the PRD section.
    Generate React components using Next.js, TypeScript, Tailwind CSS.
    Use colors from Design System section (Primary Blue #0065BD, Grey #6E685F, etc.).
    Create hardcoded data in lib/data/ files marked with TODO comments.
    Ensure accessibility (WCAG AA).
    Include comments marking where API calls would go.

Step 3: Generate Components

    Copilot generates component code

    You copy into project structure

    Run npm run dev to test locally

Step 4: Iterate & Refine

    Test on mobile/tablet/desktop

    Adjust colors, spacing, typography as needed

    Ask Copilot for refinements

    Commit to GitHub

Step 5: Deploy

    Push to GitHub main branch

    Vercel auto-deploys

    Share live URL with stakeholders

12. IMPLEMENTATION STATUS (November 30, 2025)

## Phase 1: Core Dashboard - ✅ COMPLETE

### Feature 1: Login Page
**Status:** ✅ Complete  
**Implementation Date:** November 2025  
**Details:**
- Secure authentication with demo credentials
- BORGai branding integrated
- Form validation and error handling
- Responsive design (mobile/tablet/desktop)
- File: `app/login/page.tsx`

### Feature 2: Main Dashboard
**Status:** 🔄 In Progress (KPI Badge being added)
**Implementation Date:** November 30, 2025 (Forecast Chart complete), December 2, 2025 (KPI Badge in progress)
**Details:**

- **KPI Badge Section:** 🔄 In Development
  - Collapsible section below main navigation
  - 4 visible KPI cards with carousel navigation (6 total items)
  - Alert Summary chart (always visible on right)
  - Navigation buttons (◀ ▶) for carousel
  - 5 KPIs: Model Accuracy, AI vs Legacy, Lead Time, Return Rate, Inventory Coverage
  - "Create KPI" action button with toast notification
  - Hardcoded data, independent of filter sidebar
  - Feature plan: `docs/kpi_badge_featureplan.md`

- **Forecast Chart:** ✅ Fully implemented
  - 80 weeks of data (May 2025 - Dec 2026)
  - 1,920 core forecasts + 9,600 component forecasts
  - Time range controls: 1 Month, 3 Months, 6 Months, 1 Year
  - Historical supply bars (solid blue, 100% opacity)
  - Confirmed supply bars (semi-transparent blue, 70% opacity)
  - AI forecast line (solid past, dashed future)
  - Previous AI forecast line (grey dashed, future only)
  - 95% confidence band (light blue shading)
  - Today line (centered, vertical dashed)
  - Interactive tooltip with breakdown
  - Download button (dummy with toast)
  - Sync to ERP button (dummy with toast)
  - Full legend with 6 elements
  - Filter integration (sidebar selection updates chart)
  - Files: `components/features/dashboard/ForecastChart.tsx`, `ChartControls.tsx`, `ChartLegend.tsx`, `ChartTooltip.tsx`, `lib/hooks/useChartData.ts`

- **KPI Metrics Grid:** ✅ Complete (placeholder data)
  - 4 metric cards with icons
  - Trend indicators
  - Color-coded status
  - File: `components/features/dashboard/MetricGrid.tsx`, `KPICard.tsx`

- **Critical Alerts Summary:** ✅ Complete (placeholder data)
  - Alert cards with severity levels
  - Action buttons
  - Color-coded status
  - File: `components/features/dashboard/AlertSummary.tsx`

- **Forecast Selection Sidebar:** ✅ Complete
  - Preset selector (All, Favorites, High Priority, Standard)
  - Multi-select category dropdown (8 categories)
  - Multi-select core dropdown (24 cores with full IDs)
  - Multi-select component dropdown (120 components, two-line display)
  - Immediate filter application (no Apply button)
  - Selected items tags with removal
  - Clear All button in header
  - Cascade logic (category → cores → components)
  - Files: `components/features/filters/ForecastSelection.tsx`, `PresetDropdown.tsx`, `MultiSelectDropdown.tsx`, `TagList.tsx`, `Tag.tsx`, `lib/contexts/FilterContext.tsx`

### Feature 3: Forecast Analysis Page
**Status:** ✅ Complete (placeholder data)  
**Implementation Date:** November 2025  
**Details:**
- Feature contribution table
- Data source visualization
- Placeholder for explainability analysis
- File: `app/dashboard/forecast-analysis/page.tsx`

### Data Layer
**Status:** ✅ Complete  
**Implementation Date:** November 30, 2025  
**Details:**
- 8 core categories defined
- 24 cores generated (TC_BMW_x3_2023 format)
- 120 components generated programmatically (5 per core)
- 1,920 core forecast records (24 cores × 80 weeks)
- 9,600 component forecast records (120 components × 80 weeks)
- Preset configurations (All, Favorites, High Priority, Standard)
- Helper functions for filtering and searching
- Files: `lib/data/forecast-data.ts`, `lib/types.ts`

### Infrastructure
**Status:** ✅ Complete  
**Details:**
- Next.js 15 with App Router
- TypeScript strict mode
- Tailwind CSS v4
- Recharts for data visualization
- Sonner for toast notifications
- shadcn/ui components
- TUM color palette integration
- FilterContext for state management
- Responsive layouts (mobile/tablet/desktop)
- Vercel deployment pipeline
- Git repository with clear commit history

## Phase 2: Advanced Features - 📋 PLANNED

### Real-Time Data Integration
- API connections to backend services
- Live forecast updates
- Real-time alert notifications

### Multi-Role Support
- Warehouse Operator dashboard
- Logistics Coordinator view
- Executive summary dashboard
- Role-based access control

### Advanced Analytics
- Historical trend analysis
- Forecast accuracy tracking
- Custom report generation
- Export functionality (PNG, CSV, PDF)

### ERP Integration
- Real ERP sync functionality
- Inventory management integration
- Order processing workflows

### Enhanced Explainability
- Interactive feature contribution analysis
- What-if scenario modeling
- Confidence interval customization

---

13. DOCUMENT CONTROL

Document Version: 2.1 (MVP - Updated for Current Implementation)
Date: November 30, 2025
Status: ✅ MVP COMPLETE - Ready for Phase 2
Primary User: Supply Chain Planner
Design Target: Clean, modern, appealing interface
Branding: BORGai - Intelligent Core Supply Forecasting Platform
Authentication: Single planner role (multi-role in Phase 2)
Team: Team 66 (Christian Güttler and Robert Hoffmann)
Challenge: REMAN Challenge 2025 - Unlocking the Power of AI for Circular Industries

Key Sections for Copilot:

    Feature 2 (Main Dashboard) → Full layout specifications

    Feature 3 (Forecast Analysis) → Feature contribution table specs

    Section 5 (Design System) → Colors, typography, spacing

    Section 7 (Testing) → Acceptance criteria to validate

END OF PRD VERSION 2.1
How to Use This PRD with GitHub Copilot

    For Main Dashboard → Copy "Feature 2: Main Dashboard - Forecast Overview & Critical Alerts" section + "Design System" section

    For Forecast Analysis → Copy "Feature 3: Forecast Analysis Page" section + design specs

    For Testing → Reference "Acceptance Criteria & Testing Strategy" while building

    For Data → Review "Data Flow & Hardcoded Data Strategy" to structure files

    For Layout Details → Check spatial diagrams in sections 2.1 and 3.6

Each major feature is self-contained and can be implemented independently. Start with Login (already done) → Main Dashboard → Forecast Analysis.