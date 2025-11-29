Product Requirements Document (PRD)
BORGai - Core Supply Forecasting AI Dashboard MVP

BORG Automotive Remanufacturing Challenge 2025
1. EXECUTIVE SUMMARY
Vision Statement

BORGai is a real-time, AI-powered supply chain forecasting dashboard that enables BORG Automotive's supply chain planning teams to predict core supply volumes, optimize inventory levels, and make data-driven decisions about remanufacturing operations. The platform integrates multi-source data (internal historical records, external registrations, market trends, recall databases) with an ensemble machine learning model to forecast component availability 3-12 months ahead.
Product Goal

Build an MVP dashboard (BORGai) that visualizes AI core supply forecasts, model performance metrics, and actionable insights—transforming raw predictions into strategic supply chain intelligence for supply chain managers, warehouse operators, and logistics coordinators.
Key Success Metrics

    Forecast Accuracy: ≤ 20% MAPE (Mean Absolute Percentage Error) for 3-month horizon on test data

    Dashboard Performance: Load time < 2 seconds (P95)

    User Adoption: 95%+ of supply chain team members actively use dashboard daily

    Decision Impact: 15-20% reduction in stockouts, 10% improvement in inventory turnover

    Model Explainability: 100% of forecasts include feature importance and driver explanation

2. MARKET CONTEXT & PROBLEM STATEMENT
Business Context

BORG Automotive operates a critical remanufacturing supply chain serving European automotive markets. Core components (turbochargers, transmissions, engines, batteries, starters) arrive unpredictably—driven by vehicle age cohorts, failure patterns, seasonal repair peaks, and regulatory changes. Currently, BORG lacks visibility into future core supply, resulting in:

    Stockouts: Missing cores block remanufacturing workflows

    Excess Inventory: Carrying costs and working capital strain

    Inefficient Planning: Supply chain decisions rely on intuition, not data

    Missed Opportunities: Inability to identify supply spikes driven by recalls or seasonal patterns

Competitive Context

Industry leaders (e.g., C3.ai customers in remanufacturing) achieve:

    100%+ forecasting error reduction vs. baseline

    $100M-$300M in direct savings through improved inventory planning

    Real-time KPI dashboards for supply chain visibility

BORG's MVP dashboard (BORGai) will establish foundational capability to compete.
Data Opportunity

BORG has untapped data sources:

    Internal: 5+ years of core return history by type, geography, customer segment

    External (Public): German KBA registration data, TÜV defect statistics, weather patterns, recall databases

    External (Partner): OEM warranty claims, customer segment data, service repair histories

The ensemble model architecture (TFT + XGBoost + SARIMAX) leverages these heterogeneous sources to achieve superior forecasts.
3. TARGET USERS & PERSONAS
Persona 1: Michael (Supply Chain Manager)

Profile: 40s, 15+ years in supply chain/logistics, Excel power user, strategic thinker

    Tools Used: Excel, SAP, occasional BI dashboards

    Responsibility: Optimize inventory levels, forecast supply bottlenecks, make strategic sourcing decisions

    Goals: Understand supply chain health, predict shortages, justify budget allocation

    Pain Points: Data scattered across systems, no single view of truth, slow ad-hoc reporting

    User Journey:

        Login → Dashboard

        Review KPI cards: total inventory, critical alerts, lead time trends

        Drill into specific core category (e.g., "Turbo supply trending down")

        Check driver analysis: "Vehicle registrations down 12%, weather impacting returns"

        Decide: Accelerate supplier sourcing or adjust safety stock

    Success Criteria: Decision made in < 10 minutes with confidence in drivers

Persona 2: Sarah (Warehouse Operator)

Profile: 30s, 8 years warehouse experience, operational focus, moderate tech comfort

    Tools Used: Warehouse Management System (WMS), email, paper logs

    Responsibility: Receive cores, update inventory, maintain storage, process shipments

    Goals: Know real-time inventory, process incoming efficiently, understand supply trends

    Pain Points: Multiple system lookups, unclear reorder triggers, delayed notifications

    User Journey:

        Login → Dashboard (Operator view, focus on inventory)

        Check "Current Inventory" table for today's quantities

        See "Low Stock Alert" for turbochargers

        Review "Incoming Shipments" widget

        Update received quantities in table

    Success Criteria: Operational tasks completed 30% faster, less guesswork

Persona 3: David (Logistics Coordinator)

Profile: 25, tech-savvy, 4 years in logistics, works with multiple tools, data-oriented

    Tools Used: Shipping software, CRM, messaging apps, SQL queries (self-taught)

    Responsibility: Coordinate shipments, manage logistics network, track orders

    Goals: Real-time visibility into orders/shipments, anticipate logistics bottlenecks, coordinate with warehouse

    Pain Points: Limited warehouse visibility, manual tracking, reactive problem-solving

    User Journey:

        Login → Dashboard (Logistics view)

        Check active shipments and order status

        See forecast: "High demand expected Q2, plan for +40% shipment volume"

        Review lead time trends to adjust planning

        Coordinate with warehouse on anticipated volume surge

    Success Criteria: Anticipate logistics needs 30+ days ahead, reduce expedited shipping

Secondary User: Executive (CFO/COO)

    Periodic Access: Weekly/monthly dashboards for strategic decisions

    Focus: High-level KPIs, ROI justification, performance vs. targets

    Success Criteria: Board-ready insights and trend analysis

4. CORE REQUIREMENTS & FEATURES
Feature 1: Forecast Dashboard & KPI Overview

User Stories:

    As a supply chain manager, I want to see core supply forecasts at a glance so I can assess overall supply health

    As an executive, I want to see key performance indicators and trends so I can track supply chain performance vs. targets

Functionality:

    KPI Cards: Display top-level metrics in a card grid

        Total Forecasted Core Supply (units, 3-month horizon)

        Current Inventory Value (€)

        Average Lead Time (days)

        Model Accuracy (MAPE %)

        Critical Low Stock Items (count)

        Forecast vs. Historical Demand (trend indicator: ↑↓)

    Each KPI Card Includes:

        Primary metric value (large, readable)

        Secondary information (trend arrow, % change, period)

        Status indicator (green/yellow/red)

        Optional: mini sparkline (7-30 day trend)

        Click to drill into detail page

    Critical Alerts Section:

        Ranked list of anomalies detected by model

        Examples: "Turbo supply forecast down 35% vs. 3-month average (reason: vehicle registrations -12%)"

        Each alert includes: severity, reason, recommended action

        Dismiss or acknowledge alert

    Quick Action Buttons:

        View Detailed Forecast

        Export Report

        Schedule Alert Notification

        Adjust Safety Stock Parameters

UI Design:

    Grid Layout: 4 columns on desktop (1920px), 2 on tablet (1024px), 1 on mobile (320px)

    Colors (TUM Design System):

        KPI Card background: White (#FFFFFF) with subtle border (Grey 20% #CCCCCC)

        KPI Value text: TUM Blue (#0065BD) for primary metric, Grey 80% (#333333) for secondary

        Positive trend (↑): Accent Green (#A2AD00)

        Negative trend (↓): Accent Orange (#E37222)

        Warning status: Accent Orange (#E37222)

        Critical status: Accent Orange (#E37222) with red background overlay

        Border/shadow: Subtle grey (Grey 20% #CCCCCC)

        Card hover: Light grey background (Grey 20% #CCCCCC at 50% opacity)

    Typography:

        KPI Label: Montserrat/Inter, 12px, Grey 80% (#333333), weight 500

        KPI Value: Montserrat/Inter, 32px, TUM Blue (#0065BD), weight 600

        Trend Text: 14px, Grey 50% (#808080), weight 400

        Card Title: 16px, TUM Blue (#0065BD), weight 600

    Spacing & Layout:

        Card padding: 20px

        Gap between cards: 16px

        Section margin-bottom: 32px

Data Source:

typescript
// TODO: Replace with API call to /api/forecast/metrics
// const response = await fetch('/api/forecast/metrics?horizon=3_month')
const metrics = hardcodedForecastMetrics; // lib/data/forecast-metrics.ts

Acceptance Criteria:

    ✓ KPI cards display correctly on all screen sizes

    ✓ Cards update without page reload (real-time simulation)

    ✓ Clicking card drills to detail page

    ✓ Alerts display with clear priority ranking

    ✓ Color coding matches status (no accessibility issues)

Feature 2: Forecast Detail Chart & Timeline

User Stories:

    As a supply chain manager, I want to see a detailed forecast timeline so I can understand supply patterns month by month

    As a warehouse operator, I want to see upcoming supply weeks so I can plan receiving operations

Functionality:

    Main Forecast Chart: Combined bar + line chart showing

        Historical core supplies (bars, blue, past 12 months)

        AI forecast (bars, lighter blue, next 3-12 months)

        Consensus forecast comparison (line, dashed, secondary source)

        Lag-2 previous forecast overlay (line, dotted grey, model improvement tracking)

        Quantile bands (light blue shaded area, confidence intervals)

        Vertical "today" line marking current date

        Interactive tooltips on hover

    Component-Level Breakdown:

        Dropdown to select core type (e.g., "Turbochargers", "Transmissions", "Engines")

        Shows component-specific forecast below main chart

        Color-coded by component type

        Stacked area view option

    Time Period Selector:

        Quick buttons: "3 Month", "6 Month", "12 Month", "Custom"

        Date range picker for custom periods

        Zoom in/out on chart

    Driver Explanation Panel (Key Feature for Explainability):

        Below chart: List of top 3-5 factors driving the forecast

        Each factor shows: name, contribution %, direction (↑↓), recent value

        Examples:

            "Vehicle Registrations" +12%, ↑ (KBA data shows +12% new cars registered)

            "Seasonal Peak" +8%, ↑ (March tire change season approaching)

            "Weather Events" +5%, ↑ (Winter damage predictions from insurance data)

            "Recall Campaigns" -3%, ↓ (No major active recalls this period)

        Feature importance bars (SHAP values from model)

    Scenario Analysis Widget (Advanced):

        "What if" sliders for key drivers

        Example: "If registrations increase 10%, forecast becomes..."

        Real-time forecast recalculation

        Export scenario analysis

UI Design:

    Chart Container:

        Width: 100% of page (max 1400px)

        Height: 400px on desktop, 300px on mobile

        Background: White (#FFFFFF)

        Border: 1px Grey 20% (#CCCCCC)

        Border-radius: 8px

        Padding: 16px

    Color Scheme:

        Historical supply bars: TUM Blue (#0065BD) at full opacity

        Forecast bars: Accent Light Blue (#98C6EA)

        Confidence interval shading: TUM Blue (#0065BD) at 10% opacity

        Consensus forecast line: Accent Medium Blue (#64A0C8)

        Previous forecast line: Grey 50% (#808080) dashed

        Today line: Accent Orange (#E37222)

        Component colors: TUM Blue, Secondary Blue 1 (#005293), Secondary Blue 2 (#003359)

    Axis Labels:

        X-axis (dates): Format "Jan 2024", "Feb 2024", etc.

        Y-axis (quantity): Format "0", "100", "200", "300"

        Font: Inter/Montserrat, 12px, Grey 80% (#333333)

    Driver Explanation Panel:

        Position: Below main chart

        Background: Light beige (#DAD7CB) at 20% opacity

        List items with small icons and percentages

        Font: 13px, Grey 80% (#333333)

        Icon: Lucide TrendingUp / TrendingDown

Data Source:

typescript
// TODO: Replace with API call to /api/forecast/detail?core_type=turbocharger&horizon=12_month
const forecastData = hardcodedForecastDetail; // lib/data/forecast-detail.ts
const driverExplanation = hardcodedDrivers; // Calculated from model SHAP values

Libraries:

    Chart library: Recharts (lightweight, React-native)

    Tooltip: Recharts built-in + custom formatting

    Date handling: date-fns or Day.js

Acceptance Criteria:

    ✓ Chart displays historical + forecast data

    ✓ Interactive tooltip shows exact values on hover

    ✓ Component dropdown changes chart data correctly

    ✓ Time period selector zooms/pans chart

    ✓ Driver explanation renders with correct percentages

    ✓ Scenario sliders update forecast in real-time

    ✓ Mobile: Chart responsive, labels readable

Feature 3: Inventory Management & Stock Levels

User Stories:

    As a warehouse operator, I want to see current inventory levels so I can know what's in stock

    As a supply chain manager, I want to identify low-stock cores so I can trigger replenishment

Functionality:

    Inventory Table:

        Columns: Core ID, Part Number, Description, Current Qty, Reorder Point, Status, Location, Last Updated, Unit Price, Supplier

        50+ rows (paginated, 10 per page)

        Sortable by any column (click header)

        Status badges: ✓ In Stock (green), ⚠ Low Stock (orange), ✗ Out of Stock (red)

        Status logic:

            In Stock: Qty ≥ Reorder Point

            Low Stock: Qty < Reorder Point AND Qty > 0

            Out of Stock: Qty = 0

        Row highlighting for low stock / out of stock

    Filters & Search:

        Search box: Real-time filter by Part Number, Description, Supplier

        Status filter: All / In Stock / Low Stock / Out of Stock

        Location filter: Dropdown of warehouse locations

        Date range filter: Last Updated within X days

        Price range slider: $0-$10,000

        "Advanced Filters" collapsed section

        "Clear All Filters" button

    Bulk Actions:

        Select multiple rows (checkbox column)

        Bulk update status

        Bulk export to CSV

        Bulk update reorder points

    Alerts & Warnings:

        Banner above table: "⚠️ 12 cores below reorder point" with link to filter

        Recommendation: "Cores expected to run out in X days based on forecast"

    Stock Level Visual Indicator:

        Each row includes progress bar: [==== ] showing Qty / Reorder Point

        Color: Green if above reorder point, orange if below

UI Design:

    Table Container:

        Width: 100% (scrollable on mobile)

        Background: White (#FFFFFF)

        Border: 1px Grey 20% (#CCCCCC)

        Border-radius: 8px

    Table Header:

        Background: Grey 20% (#CCCCCC)

        Font: Inter/Montserrat, 12px, weight 600, Grey 80% (#333333)

        Sortable columns show ↑ or ↓ indicator

    Table Rows:

        Alternating background: White, Grey 20% at 30% opacity

        Hover: Grey 20% at 50% opacity

        Height: 44px per row

        Padding: 12px left/right

    Status Badges:

        Background: Color-coded (green/orange/red) at 20% opacity

        Text: Color-coded (green/orange/red) at full

        Font: 11px, weight 600, border-radius 12px

        Padding: 4px 8px

    Filters:

        Position: Above table, sticky (stays visible when scrolling)

        Background: Light beige (#DAD7CB) at 10% opacity

        Display: Flex row, gap 12px

        Search box: Border 1px Grey 50%, padding 8px

        Dropdowns: Bordered, light background

Data Source:

typescript
// TODO: Replace with API call to /api/inventory/cores
const inventory = hardcodedInventoryData; // lib/data/inventory.ts

Acceptance Criteria:

    ✓ Table displays 10+ rows with correct data

    ✓ Sort works on all columns

    ✓ Filters update table in real-time

    ✓ Search finds cores by part number or description

    ✓ Status badges display with correct colors

    ✓ Mobile: Horizontal scroll or column selection

    ✓ Bulk select/export functions work

Feature 4: Orders, Shipments & Lead Time Tracking

User Stories:

    As a logistics coordinator, I want to see all active orders so I can track shipment status

    As a supply chain manager, I want to monitor lead times so I can identify bottlenecks

Functionality:

    Order Status Pipeline View:

        Horizontal timeline showing order states: Placed → Processing → Shipped → In Transit → Delivered

        Cards for each order showing:

            Order ID / Order Number

            Status (visual state on timeline)

            Creation Date

            Estimated Delivery Date

            Actual Delivery Date (if delivered)

            Lead Time (days)

            Supplier Name

            Core Type(s)

            Quantity

            Comments / Notes field

    Filters & Search:

        Status filter: All / Placed / Processing / Shipped / In Transit / Delivered

        Date range: Created within X days

        Supplier filter: Dropdown

        Search: Order ID or core type

        Lead time filter: Orders > X days

    Lead Time Analytics:

        Average lead time (days)

        Trend: Compare to previous month

        Distribution chart: How many orders take 0-7, 8-14, 15-21, 22+ days

        Supplier comparison: Which suppliers fastest/slowest

    Alerts:

        Banner: "⚠️ 3 orders delayed" (estimated delivery passed)

        Recommendations: Contact supplier, escalate

        Auto-escalation workflows (for future)

    Action Buttons (Per Order):

        View Details

        Update Status

        Send Reminder (to supplier/customer)

        Generate Invoice

        Export Shipment Label

UI Design:

    Timeline View:

        Horizontal flow: [Placed] → [Processing] → [Shipped] → [In Transit] → [Delivered]

        Current state highlighted (TUM Blue #0065BD)

        Completed states (✓ checkmark, green #A2AD00)

        Pending states (circle outline, grey #808080)

        Each order is a row with timeline + metadata

    Card Layout (Alternative to Timeline):

        Card per order

        Grid: 2 columns on desktop, 1 on mobile

        Card background: White (#FFFFFF)

        Border: 1px Grey 20% (#CCCCCC)

        Border-left: 4px TUM Blue (#0065BD)

        Padding: 16px

        Shadow: Subtle (Grey 50% at 10% opacity)

    Status Badge:

        Colors: Placed (grey), Processing (yellow), Shipped (blue), In Transit (light blue), Delivered (green)

        Font: 12px, weight 600, border-radius 4px

        Padding: 4px 8px

    Lead Time Color:

        < 10 days: Green (#A2AD00)

        10-20 days: Orange (#E37222)

            20 days: Red warning

Data Source:

typescript
// TODO: Replace with API call to /api/orders
const orders = hardcodedOrderData; // lib/data/orders.ts

Acceptance Criteria:

    ✓ Orders display in correct status on timeline

    ✓ Filters work correctly

    ✓ Lead time calculations accurate

    ✓ Delayed orders flagged with alert

    ✓ Supplier comparison chart renders

    ✓ Mobile: Cards stack vertically

Feature 5: Model Performance & Accuracy Monitoring

User Stories:

    As a supply chain manager, I want to see model accuracy metrics so I can trust the forecasts

    As a data team, I want to monitor model performance so I can retrain when needed

Functionality:

    Overall Model Metrics Card:

        Model Accuracy: MAPE % (Mean Absolute Percentage Error)

        Prediction Intervals: 80% CI coverage

        Last Training: Date/time of last model retrain

        Data Points Used: Number of historical records

        Feature Count: Number of features in model

    Accuracy by Component Type:

        Table: Component, MAPE, MAE, RMSE, # Forecasts, Status (✓ Good / ⚠ Drift Detected)

        Each component row links to detailed performance page

        Sparkline per component showing accuracy over last 10 retrains

    Model Drift Detection:

        If MAPE increases > 10% threshold, flag "Drift Detected"

        Recommendations: Check data quality, retrain model

        Recent data anomaly examples

    Forecast Performance Tracking:

        Chart: Actual vs. Forecast over time (last 90 days)

        Residuals plot: Shows prediction errors

        Histogram: Distribution of errors (should be normal)

    Feature Importance Ranking:

        Table: Top 20 features by SHAP importance value

        Shows contribution % to forecast

        Changes highlighted if top features shift

UI Design:

    Metrics Cards:

        2x3 grid layout

        Each card shows metric + small trend indicator

        Background: White (#FFFFFF)

        Border: 1px Grey 20% (#CCCCCC)

        Metric value: Large, TUM Blue (#0065BD)

    Alert Styling (If Drift Detected):

        Background: Light orange (#DAD7CB tinted orange)

        Border-left: 4px Accent Orange (#E37222)

        Text: Grey 80% (#333333)

        Icon: Alert triangle (Lucide)

Data Source:

typescript
// TODO: Replace with API call to /api/model/performance
const modelMetrics = hardcodedModelMetrics; // lib/data/model-metrics.ts

Acceptance Criteria:

    ✓ MAPE metric displays correctly

    ✓ Component accuracy table shows all components

    ✓ Drift detection triggers alert when MAPE > 10%

    ✓ Charts render accurately

    ✓ Feature importance ranked by SHAP values

Feature 6: User Authentication & Role-Based Access

User Stories:

    As a supply chain team member, I want to log in securely so only authorized people access data

    As a manager, I want different views for different roles so team members see relevant information

Functionality:

    Login Page:

        Email input field with validation

        Password input field

        "Remember me" checkbox (localStorage)

        "Forgot Password" link (placeholder for future)

        Login button (disabled while loading)

        Error message display (invalid credentials, account locked, etc.)

        Test credentials hint (for development)

        Logo/branding at top

    Role-Based Views:

        Manager: Full dashboard access (forecasts, inventory, orders, analytics, performance)

        Operator: Focused on inventory and incoming shipments (limited orders view)

        Coordinator: Focused on orders and shipments (limited inventory view)

        Executive: High-level KPI dashboard only (monthly views)

        Admin: System settings, user management (future)

    Session Management:

        JWT token (or localStorage session for MVP)

        Auto-logout after 30 minutes inactivity (with warning at 25 min)

        Logout button in header

        Session persists on refresh (until token expires)

    User Profile:

        Dropdown in top-right corner showing user name, email, role

        Settings link (preferences, password change—future)

        Logout link

UI Design:

    Login Page:

        Full-screen centered layout

        Logo at top: 100px

        Form width: 360px

        Background: White (#FFFFFF)

        Form card: White with 1px border (Grey 20% #CCCCCC)

        Input fields: Border 1px Grey 50% (#808080), padding 12px, border-radius 4px

        Login button: Background TUM Blue (#0065BD), text white, padding 12px 24px, border-radius 4px

        Button hover: Background Secondary Blue 1 (#005293)

        Error message: Accent Orange (#E37222) text, padding 12px, background tinted orange at 10%

        Link color: Accent Medium Blue (#64A0C8)

    Header User Section:

        Position: Top-right

        User avatar (initials in circle, TUM Blue background)

        Name and role displayed

        Dropdown menu with logout

Data Source:

typescript
// TODO: Replace with actual OAuth2/JWT authentication
const users = hardcodedUsers; // lib/data/users.ts
// validateCredentials function checks against hardcoded users

Acceptance Criteria:

    ✓ Login form validates input (email format, password > 6 chars)

    ✓ Valid credentials redirect to /dashboard

    ✓ Invalid credentials show error

    ✓ Role-based views restrict features correctly

    ✓ Logout clears session

    ✓ Auto-logout warning displays at 25 min

Feature 7: Analytics & Insights (Advanced)

User Stories:

    As a supply chain manager, I want to see trends and insights so I can plan strategically

    As an executive, I want to see performance dashboards so I can track supply chain effectiveness

Functionality:

    Trend Charts:

        Inventory levels trend (90 days): Line chart showing total inventory over time

        Order fulfillment rate trend (90 days): % of orders delivered on time

        Average lead time trend: Days trending up/down

        Forecast accuracy improvement: MAPE trending down (model improving)

    Performance Benchmarks:

        Best-performing core types (lowest variability, highest forecast accuracy)

        Worst-performing core types (highest variability, attention needed)

        Supplier performance scorecard: On-time %, quantity accuracy, lead time consistency

    Geographic Analysis (If applicable):

        Map or regional breakdown showing inventory distribution

        Top returning locations / highest shortage risk regions

    Seasonal Patterns:

        Heatmap: Month × Day of Week showing average cores returned

        Identify peak seasons (tire change, winter damage, etc.)

        Plan staffing and inventory around peaks

    Forecasting Performance Improvement:

        Chart: Previous forecast vs. actual vs. current forecast (showing model learning)

        Quarterly accuracy improvements (e.g., "Model improved 8% in Q1 vs Q4")

UI Design:

    Chart Grid: 2 columns on desktop, 1 on mobile

    Each Chart:

        Title at top (bold, TUM Blue #0065BD)

        Interactive tooltip on hover

        Legend below chart

        "Download as PNG" button (future)

        Background: White (#FFFFFF)

        Border: 1px Grey 20% (#CCCCCC)

        Padding: 16px

    Colors:

        Trend UP: Green (#A2AD00)

        Trend DOWN: Orange/Red (#E37222)

        Neutral: Grey (#808080)

        Secondary data lines: Light blue, dashed

Data Source:

typescript
// TODO: Replace with API call to /api/analytics/trends
const analyticsData = hardcodedAnalytics; // lib/data/analytics.ts

Acceptance Criteria:

    ✓ Trend charts display correct historical data

    ✓ Benchmarks ranked by performance

    ✓ Seasonal heatmap shows patterns clearly

    ✓ Forecast improvement chart demonstrates model learning

5. TECHNICAL ARCHITECTURE
System Architecture Overview

text
┌─────────────────────────────────────────────────────────────┐
│                    User Interface (React/Next.js)            │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Pages: login, dashboard, inventory, orders, analytics  │ │
│  │  Components: Dashboard, Charts, Tables, Filters         │ │
│  │  State: React Context (Auth, UI State)                  │ │
│  └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                    Data Layer (MVP: Hardcoded)              │
│  lib/data/                                                   │
│  ├── forecast-metrics.ts       (KPI card data)              │
│  ├── forecast-detail.ts        (Chart data)                 │
│  ├── inventory.ts              (Table data)                 │
│  ├── orders.ts                 (Order data)                 │
│  ├── users.ts                  (User credentials)           │
│  ├── model-metrics.ts          (Model performance)          │
│  └── analytics.ts              (Trend data)                 │
├─────────────────────────────────────────────────────────────┤
│                    API Layer (TODO for Phase 2)             │
│  Endpoints (to be built):                                   │
│  ├── /api/forecast/metrics                                  │
│  ├── /api/forecast/detail                                   │
│  ├── /api/inventory/cores                                   │
│  ├── /api/orders                                            │
│  ├── /api/model/performance                                 │
│  └── /api/analytics/trends                                  │
├─────────────────────────────────────────────────────────────┤
│              Backend (Future: Python + FastAPI)             │
│  ├── Data Pipeline: Extract, Transform, Load               │
│  ├── Model Training: XGBoost, TFT, SARIMAX ensemble        │
│  ├── Forecast Generation: 3-12 month horizons              │
│  └── SHAP Explainability: Feature importance & drivers     │
├─────────────────────────────────────────────────────────────┤
│           Data Sources (Historical & Real-time)             │
│  ├── BORG Internal: Core return history (5+ years)         │
│  ├── KBA: German vehicle registrations, recalls            │
│  ├── TÜV: Defect statistics by age cohort                  │
│  ├── Weather: Historical and forecast data                 │
│  └── Economic: PMI, interest rates, inflation indices      │
└─────────────────────────────────────────────────────────────┘

Frontend Stack

    Framework: Next.js 15 (App Router, TypeScript)

    Styling: Tailwind CSS v4 + custom components

    UI Component Library: shadcn/ui (pre-built, customizable)

    Charts: Recharts (lightweight React charts)

    Forms: React Hook Form + Zod validation

    Icons: Lucide React

    State Management: React Context API + Hooks (no Redux needed for MVP)

    Authentication: localStorage sessions (MVP), JWT in Phase 2

    Deployment: Vercel (automatic CI/CD on git push)

Data Layer (MVP)

All data hardcoded in TypeScript files to enable rapid development without backend:

lib/types.ts — Type definitions:

typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: 'manager' | 'operator' | 'coordinator' | 'executive' | 'admin';
}

interface Core {
  id: string;
  part_number: string;
  description: string;
  quantity: number;
  reorder_point: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

interface Order {
  id: string;
  order_number: string;
  status: 'placed' | 'processing' | 'shipped' | 'in_transit' | 'delivered';
  created_at: string;
  estimated_delivery: string;
  actual_delivery?: string;
}

interface Forecast {
  date: string;
  historical_quantity: number;
  forecast_quantity: number;
  confidence_lower: number;
  confidence_upper: number;
}

interface ModelMetric {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  threshold?: number;
}

lib/data/*.ts — Hardcoded data:

    forecast-metrics.ts: KPI values (totals, averages, counts)

    forecast-detail.ts: 36-month forecast time series per core type

    inventory.ts: 50+ core items with quantities and status

    orders.ts: 20+ orders with status and dates

    users.ts: Test user accounts with credentials

    model-metrics.ts: MAPE, accuracy by component, drift alerts

    analytics.ts: Historical trends for charts

Component Architecture

text
components/
├── ui/                          # shadcn/ui base components
│   ├── button.tsx
│   ├── card.tsx
│   ├── table.tsx
│   ├── input.tsx
│   ├── select.tsx
│   ├── badge.tsx
│   └── ...
│
├── layout/                      # Shared layout
│   ├── Header.tsx               # Top navigation + user menu
│   ├── Sidebar.tsx              # Left navigation with collapse
│   └── Footer.tsx               # Footer (optional)
│
├── features/
│   ├── dashboard/
│   │   ├── KPICard.tsx           # Single metric card
│   │   ├── MetricGrid.tsx        # Grid of KPI cards
│   │   ├── CriticalAlerts.tsx    # Alert list component
│   │   └── QuickActions.tsx      # Action buttons
│   │
│   ├── forecast/
│   │   ├── ForecastChart.tsx     # Main chart (bar + line)
│   │   ├── ComponentSelector.tsx # Dropdown to select core type
│   │   ├── DriverExplanation.tsx # Feature importance list
│   │   ├── ScenarioAnalysis.tsx  # What-if sliders
│   │   └── TimeSelector.tsx      # Period buttons + picker
│   │
│   ├── inventory/
│   │   ├── InventoryTable.tsx    # Main table
│   │   ├── InventoryFilters.tsx  # Filter controls
│   │   ├── StockBadge.tsx        # Status badge component
│   │   └── BulkActions.tsx       # Select/export buttons
│   │
│   ├── orders/
│   │   ├── OrderTimeline.tsx     # Order status timeline
│   │   ├── OrderCard.tsx         # Individual order card
│   │   ├── OrderFilters.tsx      # Filter controls
│   │   ├── LeadTimeChart.tsx     # Lead time distribution
│   │   └── SupplierScore.tsx     # Supplier performance
│   │
│   ├── analytics/
│   │   ├── TrendChart.tsx        # Multi-line trend
│   │   ├── BenchmarkTable.tsx    # Top/bottom performers
│   │   ├── HeatmapChart.tsx      # Seasonal patterns
│   │   └── PerformanceGauge.tsx  # Visual progress indicator
│   │
│   └── auth/
│       ├── LoginForm.tsx         # Login form
│       └── UserMenu.tsx          # User profile dropdown

Page Routes

text
app/
├── page.tsx                     # Landing page (redirects to /login or /dashboard)
├── login/
│   └── page.tsx                 # Login page
├── dashboard/
│   ├── layout.tsx               # Dashboard main layout
│   ├── page.tsx                 # KPI overview page
│   ├── forecast/
│   │   └── page.tsx             # Detailed forecast page
│   ├── inventory/
│   │   └── page.tsx             # Inventory table page
│   ├── orders/
│   │   └── page.tsx             # Orders timeline page
│   ├── analytics/
│   │   └── page.tsx             # Analytics & insights page
│   └── performance/
│       └── page.tsx             # Model performance page
├── api/
│   ├── auth/
│   │   └── route.ts             # Login endpoint (MVP: local validation)
│   └── [feature]/
│       └── route.ts             # Future API endpoints
└── globals.css                  # Tailwind + custom styles

Development Workflow (Vibe Coding)

    Define PRD (this document) with clear user stories and feature specs

    Feature Planning: Use Claude to break down each feature into components

    Component Implementation:

        Create type definitions (TypeScript interfaces)

        Create hardcoded data file (lib/data/*.ts)

        Build React component (components/features/*/Component.tsx)

        Wire up to page (app/dashboard/*/page.tsx)

    Testing: Manual testing + accessibility checks

    Commit & Deploy: Push to GitHub → auto-deploy to Vercel

    Iterate: Gather feedback → refine component → commit → redeploy

Deployment Pipeline

text
Local Development
    ↓ (git push origin main)
GitHub Repository
    ↓ (webhook trigger)
Vercel Build
    ↓ (npm run build + next build)
Production Deployment
    ↓
Live URL: https://scmwebapp.vercel.app

6. DESIGN SYSTEM & BRANDING
Color Palette (TUM Corporate Design)

Primary Colors:

    TUM Blue (Primary): #0065BD — Main brand color, CTAs, active states

    White: #FFFFFF — Background, card surfaces

    Black: #000000 — Text, dark elements (minimal use)

Secondary Blues:

    Secondary Blue 1 (Pantone 301): #005293 — Hover states, secondary highlights

    Secondary Blue 2 (Pantone 540): #003359 — Dark accents, borders

Neutral Greys:

    Grey 80%: #333333 — Primary text color

    Grey 50%: #808080 — Secondary text, disabled states

    Grey 20%: #CCCCCC — Borders, dividers, subtle backgrounds

Accent Colors:

    Accent Light Beige (Pantone 7527): #DAD7CB — Light backgrounds, info sections

    Accent Orange (Pantone 158): #E37222 — Warnings, alerts, trending down

    Accent Green (Pantone 383): #A2AD00 — Success, positive trends, in stock

    Accent Light Blue (Pantone 283): #98C6EA — Information, secondary highlights

    Accent Medium Blue (Pantone 542): #64A0C8 — Charts, secondary lines

Status Color Mapping

    Good / In Stock / Active: Green #A2AD00

    Warning / Low Stock / Caution: Orange #E37222

    Critical / Out of Stock / Error: Red (use Orange with increased opacity as fallback) #E37222

    Neutral / Processing: Grey #808080

    Success / Positive Trend: Green #A2AD00

    Negative Trend / Decline: Orange #E37222

Typography

Font Families:

    Primary: Inter, Montserrat, or system sans-serif (-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)

    Monospace (for data/code): Courier New, Menlo, or Monaco

Font Sizes & Weights:

    Page Title (H1): 32px, weight 600, TUM Blue #0065BD

    Section Title (H2): 24px, weight 600, TUM Blue #0065BD

    Card Title (H3): 16px, weight 600, TUM Blue #0065BD

    Label / Overline: 12px, weight 500, Grey 80% #333333

    Body Text: 14px, weight 400, Grey 80% #333333

    Small Text / Caption: 12px, weight 400, Grey 50% #808080

    Button Text: 14px, weight 600, white on TUM Blue

    KPI Value: 32px, weight 600, TUM Blue #0065BD

Spacing System

    Base unit: 4px

    Padding: 8px, 12px, 16px, 20px, 24px, 32px

    Margin: 8px, 12px, 16px, 20px, 32px, 40px

    Gap (between grid items): 12px, 16px, 20px

    Border Radius: 4px (small), 8px (standard), 12px (pill), 9999px (full circle)

    Box Shadow: Subtle (0 2px 4px rgba(0,0,0,0.1)) to prominent (0 10px 20px rgba(0,0,0,0.15))

Border & Shadow

    Borders: 1px solid Grey 20% #CCCCCC (standard), 1px solid Grey 50% #808080 (input focus)

    Shadows:

        Subtle: 0 1px 3px rgba(0, 0, 0, 0.08)

        Standard: 0 4px 6px rgba(0, 0, 0, 0.1)

        Prominent: 0 10px 25px rgba(0, 0, 0, 0.15)

Component Styles
Buttons

    Primary Button:

        Background: TUM Blue #0065BD

        Text: White

        Padding: 10px 20px

        Border: None

        Border-radius: 4px

        Font: 14px, weight 600

        Hover: Background Secondary Blue 1 #005293

        Active: Background Secondary Blue 2 #003359

        Disabled: Opacity 50%, cursor not-allowed

    Secondary Button:

        Background: Grey 20% #CCCCCC at 50% opacity

        Text: Grey 80% #333333

        Border: 1px solid Grey 50% #808080

        Hover: Background Grey 20% #CCCCCC

    Outline Button:

        Background: Transparent

        Border: 1px solid Grey 50% #808080

        Text: TUM Blue #0065BD

        Hover: Background Grey 20% #CCCCCC at 20% opacity

Cards

    Background: White #FFFFFF

    Border: 1px solid Grey 20% #CCCCCC

    Border-radius: 8px

    Padding: 16px or 20px

    Shadow: Subtle (0 2px 4px)

    Hover Shadow: Standard (0 4px 8px)

Input Fields

    Background: White #FFFFFF

    Border: 1px solid Grey 50% #808080

    Border-radius: 4px

    Padding: 10px 12px

    Focus: Border TUM Blue #0065BD, outline 2px solid #0065BD at 30% opacity

    Placeholder: Grey 50% #808080

    Font: 14px, weight 400, Grey 80% #333333

Badges & Status Indicators

    Background: Color-coded (green/orange/red) at 20% opacity

    Text: Color-coded (green/orange/red) at full opacity

    Padding: 4px 8px

    Border-radius: 12px

    Font: 11px, weight 600

Tables

    Header Background: Grey 20% #CCCCCC

    Header Text: Grey 80% #333333, weight 600

    Row Background: White (alternating white / Grey 20% at 30% opacity)

    Row Hover: Grey 20% #CCCCCC at 50% opacity

    Border: 1px solid Grey 20% #CCCCCC

    Cell Padding: 12px

Charts

    Background: White #FFFFFF

    Border: 1px solid Grey 20% #CCCCCC

    Text (axis labels): Grey 80% #333333, 12px

    Grid lines: Grey 20% #CCCCCC at 50% opacity

    Line colors: TUM Blue #0065BD, Secondary Blues, Accent colors

    Tooltip: Black background, white text, subtle shadow

Responsive Breakpoints

    Mobile: 320px - 639px (1 column, stacked layout)

    Tablet: 640px - 1023px (2 columns, collapsed sidebar)

    Desktop: 1024px - 1919px (3-4 columns, expanded sidebar)

    Large Desktop: 1920px+ (max-width 1400px for content)

Accessibility

    Color Contrast: Minimum 4.5:1 for normal text, 3:1 for large text

    Font Size: Minimum 12px (readable without zoom)

    Touch Targets: Minimum 44px × 44px for interactive elements

    Keyboard Navigation: Tab order logical, focus visible on all interactive elements

    ARIA Labels: Semantic HTML + ARIA attributes where needed

    Focus Indicators: 2px outline, TUM Blue #0065BD

7. DATA STRUCTURES & MODELS
Core Data Models (TypeScript)

User Model:

typescript
interface User {
  id: string;                  // UUID
  email: string;              // Unique
  password_hash?: string;     // Never send to frontend
  name: string;
  role: UserRole;
  department: string;
  created_at: Date;
  last_login?: Date;
  is_active: boolean;
}

type UserRole = 'manager' | 'operator' | 'coordinator' | 'executive' | 'admin';

Core / Component Model:

typescript
interface Core {
  id: string;                      // Unique ID
  part_number: string;            // e.g., "CORE-TURBO-001"
  description: string;            // e.g., "Turbocharger, 3.0L Diesel"
  component_type: ComponentType;  // Turbo, Engine, Transmission, etc.
  quantity: number;               // Current inventory
  reorder_point: number;          // Trigger for low stock alert
  unit_price: number;             // €
  location: WarehouseLocation;
  supplier_id: string;
  status: StockStatus;
  last_updated: Date;
  yield_rate: number;            // % of returned cores usable
  lead_time_days: number;        // Average from supplier
  turn_rate: number;             // Turnover rate (times per year)
}

type ComponentType = 'turbo' | 'engine' | 'transmission' | 'battery' | 'starter' | 'alternator';
type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';
type WarehouseLocation = 'Warehouse A' | 'Warehouse B' | 'Warehouse C';

Order Model:

typescript
interface Order {
  id: string;
  order_number: string;           // Human-readable, e.g., "ORD-2024-001234"
  supplier_id: string;
  core_items: OrderLine[];        // Array of cores in this order
  total_quantity: number;
  total_value: number;            // €
  status: OrderStatus;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  created_at: Date;
  placed_at?: Date;
  processing_at?: Date;
  shipped_at?: Date;
  in_transit_at?: Date;
  delivered_at?: Date;
  estimated_delivery: Date;
  lead_time_days: number;         // Actual or estimated
  notes: string;
}

interface OrderLine {
  order_id: string;
  core_id: string;
  quantity: number;
  unit_price: number;
}

type OrderStatus = 'placed' | 'processing' | 'shipped' | 'in_transit' | 'delivered' | 'cancelled';

Forecast Model:

typescript
interface Forecast {
  id: string;
  core_id: string;
  forecast_date: Date;           // Date forecast was generated
  horizon_days: number;          // 90 (3 months), 180 (6 months), 365 (12 months)
  
  forecasts: ForecastPoint[];    // Time series
  model_version: string;         // e.g., "ensemble_v2.1"
  accuracy_mape: number;         // % error on validation set
  
  drivers: FeatureDriver[];      // Top factors driving forecast
  scenarios?: Scenario[];        // Optional what-if scenarios
}

interface ForecastPoint {
  date: Date;
  quantity_mean: number;         // Point estimate
  quantity_std: number;          // Standard deviation for uncertainty
  confidence_lower: number;      // 10th percentile (for 80% CI)
  confidence_upper: number;      // 90th percentile
  component_state?: ComponentState[];  // Breakdown by condition
}

interface ComponentState {
  state: 'working' | 'minor_repair' | 'major_repair' | 'scrap';
  percentage: number;            // % of returned cores in this state
}

interface FeatureDriver {
  feature_name: string;          // e.g., "Vehicle Registrations"
  shap_value: number;            // Contribution to forecast
  current_value?: string;        // e.g., "+12% registrations"
  direction: 'up' | 'down' | 'neutral';
}

interface Scenario {
  name: string;                  // e.g., "Economic Downturn"
  adjusted_quantity: number;     // What forecast becomes
  adjustments: Record<string, number>;  // Feature value changes
}

Model Performance Model:

typescript
interface ModelMetrics {
  model_version: string;
  trained_at: Date;
  mape: number;                  // Mean Absolute Percentage Error (%)
  mae: number;                   // Mean Absolute Error (units)
  rmse: number;                  // Root Mean Squared Error
  
  component_metrics: ComponentMetric[];  // Accuracy per component type
  drift_detected: boolean;       // MAPE increased > threshold
  
  feature_importance: FeatureImportance[];
  data_points_used: number;
}

interface ComponentMetric {
  component_type: ComponentType;
  mape: number;
  mae: number;
  forecast_count: number;
  status: 'good' | 'drift_detected' | 'insufficient_data';
}

interface FeatureImportance {
  rank: number;                  // 1-20
  feature_name: string;
  importance_score: number;      // SHAP or similar
  trend: 'increasing' | 'stable' | 'decreasing';
}

Analytics Model:

typescript
interface AnalyticsTrend {
  metric_name: string;          // e.g., "Average Inventory Level"
  data_points: TrendPoint[];
}

interface TrendPoint {
  date: Date;
  value: number;
  change_percent: number;        // % change from previous period
}

interface PerformanceBenchmark {
  rank: number;
  entity_name: string;           // Component type or Supplier name
  metric_value: number;
  performance_score: number;     // 0-100
  change_vs_previous: number;    // % change
}

8. ACCEPTANCE CRITERIA & TESTING STRATEGY
MVP Definition (What Constitutes "Done")

✅ All 7 Core Features Implemented:

    Dashboard KPI overview with 5+ metrics

    Forecast detail chart with driver explanation

    Inventory table with filters and search

    Orders timeline view with lead time analytics

    Model performance monitoring page

    User authentication with role-based views

    Analytics & insights page with 4+ trend charts

✅ Functional Requirements:

    All pages load in < 2 seconds (P95)

    Responsive design: Mobile (320px) to Desktop (1920px)

    Filters and search work correctly (real-time)

    Charts render without errors

    No console errors or warnings

    All data displays correctly (no formatting issues)

    Role-based access control enforced

    Logout and session management working

✅ Non-Functional Requirements:

    Code is TypeScript (strict mode, no any types except justified cases)

    Components reusable and well-documented

    Accessibility: WCAG AA compliance

    Color contrast: 4.5:1 for normal text

    All interactive elements keyboard navigable

    Focus indicators visible

    Semantic HTML used throughout

    Comments mark data placeholders (// TODO: Replace with API call)

✅ Deployment:

    Code pushed to GitHub

    Auto-deployed to Vercel

    Live URL shareable

    No deployment errors

    All pages accessible from live URL

Testing Checklist
Functional Testing

    Login page: Valid/invalid credentials

    Role-based views: Manager sees all features, Operator sees limited views

    Dashboard: All KPI cards display with correct values

    Forecast chart: Data displays, interactive tooltips work

    Inventory table: Sorts, filters, search works

    Orders timeline: Status displays correctly, lead time calculated

    Model metrics: MAPE and component accuracy displayed

    Analytics: Trends chart renders with historical data

    Logout: Session cleared, redirects to login

Responsive Design Testing

    Mobile (320px): All pages stack vertically, readable without horizontal scroll

    Tablet (768px): 2-column layout works, sidebar collapses

    Desktop (1024px+): 3-4 column layout, sidebar expands

    Touch interactions: Buttons, filters work on touch devices

    Font sizing: Readable at all breakpoints

    Images/charts: Scale appropriately

Accessibility Testing

    Keyboard navigation: Tab through all interactive elements

    Focus indicators: Visible on all focusable elements

    Screen reader: Page structure semantic, ARIA labels present

    Color contrast: Text ≥ 4.5:1, large text ≥ 3:1

    Form labels: All inputs labeled (for attribute or aria-label)

    Alt text: Images/icons have descriptions

    Zoom: Page works at 200% zoom

Performance Testing

    Page load time: < 2 seconds (Chrome DevTools, throttled to "Fast 3G")

    Time to Interactive: < 3 seconds

    Lighthouse score: ≥ 85 performance

    No layout shifts: CLS (Cumulative Layout Shift) < 0.1

    Chart rendering: Charts appear within 1 second

Browser Compatibility

    Chrome (latest): All features work

    Firefox (latest): All features work

    Safari (latest): All features work

    Edge (latest): All features work

Manual Testing Scenarios

Scenario 1: Manager Reviews Supply Chain Health

    Navigate to login page

    Enter manager credentials

    Should see full dashboard

    Click forecast chart → should drill to detail page

    Change time period to 6 months → chart updates

    Adjust scenario slider → forecast recalculates

    Return to dashboard

    Click inventory tab → should see full table

    Filter for low stock items → table updates

    All actions should complete < 2 seconds

Scenario 2: Warehouse Operator Checks Stock

    Log in as operator

    Dashboard should show operator-focused view (limited orders)

    Navigate to inventory

    Search for "turbo" → results display

    Filter for "In Stock" → shows only in-stock items

    Should NOT see model performance or analytics pages

Scenario 3: Executive Views Monthly Report

    Log in as executive

    Dashboard shows high-level KPIs only (no detailed tables)

    Can view trends and benchmarks

    Cannot access detail pages

    Can logout and return to login

Automated Testing (Future Phase 2)

    Unit tests: Components, utilities, type validation

    Integration tests: Data loading, filtering, sorting

    E2E tests: User flows (login → dashboard → drill-down)

    Performance tests: Lighthouse automation

9. DEVELOPMENT PHASES & TIMELINE
Phase 1: Foundation & Core Features (Weeks 1-2)

Deliverables:

    ✅ Project setup (Next.js, TypeScript, Tailwind, shadcn/ui)

    ✅ GitHub repository + local development environment

    ✅ Authentication flow (login page, session management)

    ✅ Dashboard layout (header, sidebar, main content area)

    ✅ KPI cards (dashboard overview)

    ✅ Hardcoded data structures (all .ts files)

Sprints:

    Sprint 1: Setup, auth, layout, KPI cards

    Sprint 2: Forecast chart, inventory table, orders timeline (basic)

Phase 2: Advanced Features & Polish (Week 3)

Deliverables:

    ✅ Forecast detail page with driver explanation

    ✅ Model performance monitoring page

    ✅ Analytics & insights page (trends, benchmarks)

    ✅ Inventory filters and search

    ✅ Orders lead time analysis

    ✅ Mobile responsiveness

    ✅ Accessibility compliance

Phase 3: Deployment & Optimization (Week 4, if applicable)

Deliverables:

    ✅ Vercel deployment

    ✅ Performance optimization (< 2s load time)

    ✅ Documentation & README

    ✅ Final testing & bug fixes

10. FUTURE ROADMAP (Beyond MVP)
Phase 2: Backend Integration (Months 2-3)

    Build Python backend with FastAPI

    Implement actual ML model (TFT + XGBoost + SARIMAX ensemble)

    Connect to real BORG data sources (ERP, WMS)

    Implement real authentication (OAuth2, JWT)

    Add real-time WebSocket updates

    Build model retraining pipeline

Phase 3: Advanced Features (Months 4-6)

    Real-time alerts & notifications

    Email notification system

    Advanced scenario analysis & optimization

    Mobile app (React Native)

    Integration with external APIs (KBA, TÜV, weather)

    User management & admin panel

Phase 4: Scale & Optimization (Months 7+)

    Multi-region deployment

    Distributed model training

    Advanced analytics (root cause analysis)

    Supply chain optimization algorithms

    Integration with supplier systems

    Audit logging & compliance

11. ASSUMPTIONS & CONSTRAINTS
Assumptions

    MVP uses hardcoded data: No backend API yet (enables rapid prototyping)

    Simple authentication: localStorage sessions (will upgrade to JWT in Phase 2)

    No real ML model: Dashboard displays mock forecasts (actual model in Phase 2)

    German market focus: Data sources focus on DACH region initially

    Internal users only: Not customer-facing in MVP

    Browser-based: No mobile app (considered for Phase 3)

    Single deployment: Vercel free tier (single region)

Constraints

    Development time: 3-4 weeks to MVP

    Team size: 1-2 developers (with AI assistance via GitHub Copilot)

    Budget: Free/low-cost tools (Vercel, GitHub, shadcn/ui, Recharts)

    Data: Only internal BORG data (no new procurement required)

    Real-time: MVP uses static snapshots (not true real-time)

    Scale: MVP tested with 50-100 users (will scale in Phase 2)

12. SUCCESS CRITERIA & KPIs
Business KPIs
KPI	Target	Measurement
Forecast Accuracy (MAPE)	< 20%	Quarterly model evaluation
Dashboard Adoption	95% of supply team	Usage analytics
Inventory Turnover	+10% improvement	Monthly KPI tracking
Stockout Reduction	15-20% fewer stockouts	Operational metrics
Lead Time Reduction	5-10% faster turnaround	Order fulfillment analytics
Technical KPIs
KPI	Target	Measurement
Page Load Time (P95)	< 2 seconds	Lighthouse, Chrome DevTools
Uptime	99%+	Vercel analytics
Error Rate	< 0.1%	Sentry/monitoring
Accessibility Score	WCAG AA	Axe, WAVE tools
Performance Score	≥ 85/100	Lighthouse
User Experience KPIs
KPI	Target	Measurement
Time to Insight	< 10 minutes	User testing
Feature Discoverability	80% of users find all features	Analytics tracking
User Satisfaction	≥ 4/5 NPS	Post-launch survey
Forecast Explainability	100% of forecasts have drivers	Dashboard validation
13. DEPENDENCIES & RISKS
Key Dependencies

    GitHub: Repository hosting and Copilot integration

    Vercel: Deployment and hosting

    Node.js / npm: Build toolchain

    Recharts: Chart rendering

    shadcn/ui: Pre-built components

    BORG data sources: Historical core return data

Identified Risks & Mitigation
Risk	Probability	Impact	Mitigation
Data quality issues	High	High	Validate data early, use mock data for MVP
Model accuracy too low	Medium	High	Use ensemble approach, test on historical data
Deployment issues	Low	Medium	Use Vercel templates, test locally first
Performance degradation	Low	Medium	Profile with Lighthouse, optimize early
Scope creep	Medium	High	Strict MVP definition, defer features
Team availability	Low	Medium	Clear documentation, use AI assistance
14. GLOSSARY & DEFINITIONS

Core: Returned automotive component (turbocharger, transmission, engine, etc.) sent to BORG for remanufacturing

Remanufacturing: Process of disassembling, inspecting, cleaning, and reassembling cores to like-new condition

Lead Time: Time from placing an order to receiving delivered cores (days)

Forecast Horizon: Time period ahead being forecasted (3 months, 6 months, 12 months)

MAPE (Mean Absolute Percentage Error): Average percentage error between predicted and actual values; lower is better

SHAP (SHapley Additive exPlanations): Model-agnostic method for explaining feature importance

Ensemble Model: Combination of multiple ML models (TFT, XGBoost, SARIMAX) for improved accuracy

TFT (Temporal Fusion Transformer): Deep learning model for multivariate time series forecasting

XGBoost: Gradient boosting algorithm for tabular data with built-in feature importance

SARIMAX: Statistical model for univariate time series with seasonality and exogenous variables

Quantile Regression: Regression that outputs prediction intervals instead of point estimates

Feature Importance: Measure of how much a feature (variable) influences model predictions

Drift Detection: Identifying when model performance degrades (MAPE increases) signaling need for retraining
15. DOCUMENT CONTROL & APPROVAL

Document Version: 1.0 MVP PRD
Last Updated: November 29, 2025
Author: AI Assistant + Team
Status: Ready for Development

Stakeholders:

    Supply Chain Team (end users)

    BORG Management (sponsors)

    Development Team (implementers)

APPENDIX: Code Setup Commands
Environment Setup

bash
# Clone repository
git clone https://github.com/YOUR-USERNAME/scmwebapp.git
cd scmwebapp

# Install dependencies
npm install

# Install additional packages
npm install tailwindcss-animate class-variance-authority clsx tailwind-merge lucide-react
npm install recharts

# Initialize shadcn/ui
npx shadcn@latest init
npx shadcn@latest add button card table input select tabs badge

# Start development server
npm run dev  # Visit http://localhost:3000

Data File Templates

lib/types.ts:

typescript
// Define all TypeScript interfaces here
export interface User { /* ... */ }
export interface Core { /* ... */ }
// ... other types

lib/data/forecast-metrics.ts:

typescript
// Export hardcoded KPI metrics
export const forecastMetrics = [
  { label: 'Total Forecast Supply', value: 102046, unit: 'units', trend: 'up' },
  // ... more metrics
]

lib/contexts/AuthContext.tsx:

typescript
// React Context for authentication state
export const AuthProvider = ({ children }) => { /* ... */ }
export const useAuth = () => { /* ... */ }

Git Workflow

bash
# Create feature branch
git checkout -b feature/forecast-chart

# Make changes, then commit
git add .
git commit -m "feat: add forecast detail chart with driver explanation"

# Push to GitHub
git push origin feature/forecast-chart

# Create Pull Request on GitHub, merge to main
# Vercel auto-deploys when main branch updates

END OF DOCUMENT
How to Use This PRD

    For Development: Reference specific feature sections while coding components

    For Design: Use Design System section (#6) for all styling decisions

    For Testing: Check Acceptance Criteria (#8) to verify feature completion

    For Deployment: Follow phases (#9) and success criteria (#12)

    For AI Code Generation: Paste relevant feature section into GitHub Copilot as context

Pro Tip: Each feature section is self-contained. You can copy a feature (e.g., "Feature 2: Forecast Detail Chart") and paste into Copilot Chat with prompt: "Implement this feature according to this PRD section. Generate React components with TypeScript and Tailwind CSS styling using colors specified in section 6."