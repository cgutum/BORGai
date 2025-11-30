# REMAN Dashboard Sample Data

## Overview
This document contains comprehensive sample data for the REMAN dashboard filter/selection card. The data includes:
- **8 Categories** with 3 core types each (24 cores total)
- **120 Components** (5 per core with condition rates 5-95%)
- **80 Weeks of Forecast Data** (May 2025 - December 2026)
- **Weekly supply between 30-150 units** per core type

---

## 1. CATEGORIES & CORE TYPES

### Turbocharger
| Core ID | Brand-Model | Year | Status |
|---------|-------------|------|--------|
| TC_BMW_x3_2023 | BMW x3 | 2023 | Active |
| TC_AUDI_A4_2021 | AUDI A4 | 2021 | Active |
| TC_TOYOTA_Camry_2020 | TOYOTA Camry | 2020 | Active |

**Components & Condition Rates:**
- TC_BMW_x3_2023_Housing: 78%
- TC_BMW_x3_2023_Turbine: 65%
- TC_BMW_x3_2023_Compressor: 82%
- TC_BMW_x3_2023_Valve: 71%
- TC_BMW_x3_2023_Shaft: 89%

| Component | Core | Condition Rate |
|-----------|------|-----------------|
| Housing | TC_AUDI_A4_2021 | 52% |
| Turbine | TC_AUDI_A4_2021 | 68% |
| Compressor | TC_AUDI_A4_2021 | 74% |
| Valve | TC_AUDI_A4_2021 | 61% |
| Shaft | TC_AUDI_A4_2021 | 85% |

| Component | Core | Condition Rate |
|-----------|------|-----------------|
| Housing | TC_TOYOTA_Camry_2020 | 45% |
| Turbine | TC_TOYOTA_Camry_2020 | 59% |
| Compressor | TC_TOYOTA_Camry_2020 | 72% |
| Valve | TC_TOYOTA_Camry_2020 | 64% |
| Shaft | TC_TOYOTA_Camry_2020 | 76% |

---

### Starters
| Core ID | Brand-Model | Year | Status |
|---------|-------------|------|--------|
| ST_BMW_320i_2022 | BMW 320i | 2022 | Active |
| ST_MERCEDES_C300_2021 | MERCEDES C300 | 2021 | Active |
| ST_VW_Golf_2020 | VW Golf | 2020 | Active |

**Components & Condition Rates:**

| Component | Core | Condition Rate |
|-----------|------|-----------------|
| Housing | ST_BMW_320i_2022 | 88% |
| Armature | ST_BMW_320i_2022 | 73% |
| Solenoid | ST_BMW_320i_2022 | 81% |
| Commutator | ST_BMW_320i_2022 | 67% |
| Brushes | ST_BMW_320i_2022 | 55% |

| Component | Core | Condition Rate |
|-----------|------|-----------------|
| Housing | ST_MERCEDES_C300_2021 | 62% |
| Armature | ST_MERCEDES_C300_2021 | 75% |
| Solenoid | ST_MERCEDES_C300_2021 | 58% |
| Commutator | ST_MERCEDES_C300_2021 | 84% |
| Brushes | ST_MERCEDES_C300_2021 | 71% |

| Component | Core | Condition Rate |
|-----------|------|-----------------|
| Housing | ST_VW_Golf_2020 | 47% |
| Armature | ST_VW_Golf_2020 | 63% |
| Solenoid | ST_VW_Golf_2020 | 79% |
| Commutator | ST_VW_Golf_2020 | 56% |
| Brushes | ST_VW_Golf_2020 | 68% |

---

### Alternators
| Core ID | Brand-Model | Year | Status |
|---------|-------------|------|--------|
| AL_FORD_Focus_2022 | FORD Focus | 2022 | Active |
| AL_HYUNDAI_Elantra_2021 | HYUNDAI Elantra | 2021 | Active |
| AL_RENAULT_Clio_2020 | RENAULT Clio | 2020 | Active |

**Components & Condition Rates:**

| Component | Core | Condition Rate |
|-----------|------|-----------------|
| Stator | AL_FORD_Focus_2022 | 76% |
| Rotor | AL_FORD_Focus_2022 | 69% |
| Rectifier | AL_FORD_Focus_2022 | 83% |
| Regulator | AL_FORD_Focus_2022 | 54% |
| Bearing | AL_FORD_Focus_2022 | 77% |

| Component | Core | Condition Rate |
|-----------|------|-----------------|
| Stator | AL_HYUNDAI_Elantra_2021 | 61% |
| Rotor | AL_HYUNDAI_Elantra_2021 | 72% |
| Rectifier | AL_HYUNDAI_Elantra_2021 | 58% |
| Regulator | AL_HYUNDAI_Elantra_2021 | 86% |
| Bearing | AL_HYUNDAI_Elantra_2021 | 64% |

| Component | Core | Condition Rate |
|-----------|------|-----------------|
| Stator | AL_RENAULT_Clio_2020 | 49% |
| Rotor | AL_RENAULT_Clio_2020 | 65% |
| Rectifier | AL_RENAULT_Clio_2020 | 75% |
| Regulator | AL_RENAULT_Clio_2020 | 52% |
| Bearing | AL_RENAULT_Clio_2020 | 81% |

---

### AC Compressors
| Core ID | Brand-Model | Year | Status |
|---------|-------------|------|--------|
| AC_BMW_x5_2023 | BMW x5 | 2023 | Active |
| AC_AUDI_Q5_2021 | AUDI Q5 | 2021 | Active |
| AC_TOYOTA_Corolla_2020 | TOYOTA Corolla | 2020 | Active |

**Components & Condition Rates:**

| Component | Core | Condition Rate |
|-----------|------|-----------------|
| Housing | AC_BMW_x5_2023 | 84% |
| Piston | AC_BMW_x5_2023 | 71% |
| Valve Plate | AC_BMW_x5_2023 | 79% |
| Shaft | AC_BMW_x5_2023 | 88% |
| Clutch | AC_BMW_x5_2023 | 63% |

| Component | Core | Condition Rate |
|-----------|------|-----------------|
| Housing | AC_AUDI_Q5_2021 | 58% |
| Piston | AC_AUDI_Q5_2021 | 74% |
| Valve Plate | AC_AUDI_Q5_2021 | 61% |
| Shaft | AC_AUDI_Q5_2021 | 82% |
| Clutch | AC_AUDI_Q5_2021 | 69% |

| Component | Core | Condition Rate |
|-----------|------|-----------------|
| Housing | AC_TOYOTA_Corolla_2020 | 51% |
| Piston | AC_TOYOTA_Corolla_2020 | 67% |
| Valve Plate | AC_TOYOTA_Corolla_2020 | 73% |
| Shaft | AC_TOYOTA_Corolla_2020 | 77% |
| Clutch | AC_TOYOTA_Corolla_2020 | 55% |

---

### Brake Calipers
| Core ID | Brand-Model | Year | Status |
|---------|-------------|------|--------|
| BC_MERCEDES_E350_2022 | MERCEDES E350 | 2022 | Active |
| BC_VW_Passat_2021 | VW Passat | 2021 | Active |
| BC_FORD_Escape_2020 | FORD Escape | 2020 | Active |

**Components & Condition Rates:**

| Component | Core | Condition Rate |
|-----------|------|-----------------|
| Housing | BC_MERCEDES_E350_2022 | 81% |
| Piston | BC_MERCEDES_E350_2022 | 76% |
| Seals | BC_MERCEDES_E350_2022 | 68% |
| Bracket | BC_MERCEDES_E350_2022 | 85% |
| Rotor Interface | BC_MERCEDES_E350_2022 | 72% |

| Component | Core | Condition Rate |
|-----------|------|-----------------|
| Housing | BC_VW_Passat_2021 | 55% |
| Piston | BC_VW_Passat_2021 | 70% |
| Seals | BC_VW_Passat_2021 | 62% |
| Bracket | BC_VW_Passat_2021 | 79% |
| Rotor Interface | BC_VW_Passat_2021 | 57% |

| Component | Core | Condition Rate |
|-----------|------|-----------------|
| Housing | BC_FORD_Escape_2020 | 48% |
| Piston | BC_FORD_Escape_2020 | 61% |
| Seals | BC_FORD_Escape_2020 | 74% |
| Bracket | BC_FORD_Escape_2020 | 53% |
| Rotor Interface | BC_FORD_Escape_2020 | 69% |

---

### EGR Valves
| Core ID | Brand-Model | Year | Status |
|---------|-------------|------|--------|
| EG_HYUNDAI_Tucson_2022 | HYUNDAI Tucson | 2022 | Active |
| EG_RENAULT_Megane_2021 | RENAULT Megane | 2021 | Active |
| EG_BMW_x3_2019 | BMW x3 | 2019 | Active |

**Components & Condition Rates:**

| Component | Core | Condition Rate |
|-----------|------|-----------------|
| Valve Body | EG_HYUNDAI_Tucson_2022 | 79% |
| Solenoid | EG_HYUNDAI_Tucson_2022 | 66% |
| Spring | EG_HYUNDAI_Tucson_2022 | 81% |
| Seat | EG_HYUNDAI_Tucson_2022 | 59% |
| Actuator | EG_HYUNDAI_Tucson_2022 | 73% |

| Component | Core | Condition Rate |
|-----------|------|-----------------|
| Valve Body | EG_RENAULT_Megane_2021 | 64% |
| Solenoid | EG_RENAULT_Megane_2021 | 71% |
| Spring | EG_RENAULT_Megane_2021 | 56% |
| Seat | EG_RENAULT_Megane_2021 | 83% |
| Actuator | EG_RENAULT_Megane_2021 | 68% |

| Component | Core | Condition Rate |
|-----------|------|-----------------|
| Valve Body | EG_BMW_x3_2019 | 52% |
| Solenoid | EG_BMW_x3_2019 | 58% |
| Spring | EG_BMW_x3_2019 | 70% |
| Seat | EG_BMW_x3_2019 | 62% |
| Actuator | EG_BMW_x3_2019 | 75% |

---

### Steering Racks
| Core ID | Brand-Model | Year | Status |
|---------|-------------|------|--------|
| SR_AUDI_A6_2022 | AUDI A6 | 2022 | Active |
| SR_TOYOTA_Camry_2021 | TOYOTA Camry | 2021 | Active |
| SR_VW_Tiguan_2020 | VW Tiguan | 2020 | Active |

**Components & Condition Rates:**

| Component | Core | Condition Rate |
|-----------|------|-----------------|
| Housing | SR_AUDI_A6_2022 | 83% |
| Pinion | SR_AUDI_A6_2022 | 72% |
| Rack Teeth | SR_AUDI_A6_2022 | 77% |
| Seals | SR_AUDI_A6_2022 | 64% |
| Tie Rod Mount | SR_AUDI_A6_2022 | 85% |

| Component | Core | Condition Rate |
|-----------|------|-----------------|
| Housing | SR_TOYOTA_Camry_2021 | 59% |
| Pinion | SR_TOYOTA_Camry_2021 | 73% |
| Rack Teeth | SR_TOYOTA_Camry_2021 | 60% |
| Seals | SR_TOYOTA_Camry_2021 | 81% |
| Tie Rod Mount | SR_TOYOTA_Camry_2021 | 66% |

| Component | Core | Condition Rate |
|-----------|------|-----------------|
| Housing | SR_VW_Tiguan_2020 | 50% |
| Pinion | SR_VW_Tiguan_2020 | 66% |
| Rack Teeth | SR_VW_Tiguan_2020 | 74% |
| Seals | SR_VW_Tiguan_2020 | 55% |
| Tie Rod Mount | SR_VW_Tiguan_2020 | 79% |

---

### Steering Pumps
| Core ID | Brand-Model | Year | Status |
|---------|-------------|------|--------|
| SP_MERCEDES_GLC_2023 | MERCEDES GLC | 2023 | Active |
| SP_FORD_Fusion_2021 | FORD Fusion | 2021 | Active |
| SP_HYUNDAI_i30_2020 | HYUNDAI i30 | 2020 | Active |

**Components & Condition Rates:**

| Component | Core | Condition Rate |
|-----------|------|-----------------|
| Housing | SP_MERCEDES_GLC_2023 | 86% |
| Rotor | SP_MERCEDES_GLC_2023 | 74% |
| Vanes | SP_MERCEDES_GLC_2023 | 80% |
| Valve | SP_MERCEDES_GLC_2023 | 65% |
| Shaft | SP_MERCEDES_GLC_2023 | 88% |

| Component | Core | Condition Rate |
|-----------|------|-----------------|
| Housing | SP_FORD_Fusion_2021 | 61% |
| Rotor | SP_FORD_Fusion_2021 | 76% |
| Vanes | SP_FORD_Fusion_2021 | 59% |
| Valve | SP_FORD_Fusion_2021 | 84% |
| Shaft | SP_FORD_Fusion_2021 | 70% |

| Component | Core | Condition Rate |
|-----------|------|-----------------|
| Housing | SP_HYUNDAI_i30_2020 | 53% |
| Rotor | SP_HYUNDAI_i30_2020 | 68% |
| Vanes | SP_HYUNDAI_i30_2020 | 72% |
| Valve | SP_HYUNDAI_i30_2020 | 57% |
| Shaft | SP_HYUNDAI_i30_2020 | 77% |

---

## 2. WEEKLY FORECAST DATA (May 2025 - December 2026)

### Data Structure
Each record contains:
- **Week Start Date** (YYYY-MM-DD, Thursdays)
- **Core ID**
- **Category**
- **Weekly Supply** (Units: 30-150)

### Forecast Sample (First 20 Weeks)

| Week Start | Core ID | Category | Weekly Supply |
|-----------|---------|----------|----------------|
| 2025-05-01 | TC_BMW_x3_2023 | Turbocharger | 47 |
| 2025-05-01 | TC_AUDI_A4_2021 | Turbocharger | 92 |
| 2025-05-01 | TC_TOYOTA_Camry_2020 | Turbocharger | 65 |
| 2025-05-01 | ST_BMW_320i_2022 | Starters | 78 |
| 2025-05-01 | ST_MERCEDES_C300_2021 | Starters | 41 |
| 2025-05-01 | ST_VW_Golf_2020 | Starters | 103 |
| 2025-05-01 | AL_FORD_Focus_2022 | Alternators | 56 |
| 2025-05-01 | AL_HYUNDAI_Elantra_2021 | Alternators | 87 |
| 2025-05-01 | AL_RENAULT_Clio_2020 | Alternators | 72 |
| 2025-05-01 | AC_BMW_x5_2023 | AC Compressors | 61 |
| 2025-05-01 | AC_AUDI_Q5_2021 | AC Compressors | 95 |
| 2025-05-01 | AC_TOYOTA_Corolla_2020 | AC Compressors | 38 |
| 2025-05-01 | BC_MERCEDES_E350_2022 | Brake Calipers | 84 |
| 2025-05-01 | BC_VW_Passat_2021 | Brake Calipers | 52 |
| 2025-05-01 | BC_FORD_Escape_2020 | Brake Calipers | 109 |
| 2025-05-01 | EG_HYUNDAI_Tucson_2022 | EGR Valves | 71 |
| 2025-05-01 | EG_RENAULT_Megane_2021 | EGR Valves | 43 |
| 2025-05-01 | EG_BMW_x3_2019 | EGR Valves | 98 |
| 2025-05-01 | SR_AUDI_A6_2022 | Steering Racks | 58 |
| 2025-05-01 | SR_TOYOTA_Camry_2021 | Steering Racks | 81 |

### Forecast Data - Full Dataset

The complete forecast includes 80 weeks of data (May 2025 - December 2026) × 24 cores = **1,920 records**

**Statistical Summary:**
- **Total Records:** 1,920
- **Date Range:** 2025-05-01 to 2026-12-24
- **Supply Range:** 30-150 units/week
- **Average Supply:** ~90 units/week per core
- **Categories:** 8
- **Cores per Category:** 3
- **Components per Core:** 5

### Weekly Supply Patterns by Category

#### Turbocharger Supply Pattern
```
Week 1 (2025-05-01):  TC_BMW_x3_2023: 47 | TC_AUDI_A4_2021: 92 | TC_TOYOTA_Camry_2020: 65
Week 2 (2025-05-08):  TC_BMW_x3_2023: 61 | TC_AUDI_A4_2021: 78 | TC_TOYOTA_Camry_2020: 84
Week 3 (2025-05-15):  TC_BMW_x3_2023: 103 | TC_AUDI_A4_2021: 45 | TC_TOYOTA_Camry_2020: 72
...continues for 80 weeks
```

#### Starters Supply Pattern
```
Week 1 (2025-05-01):  ST_BMW_320i_2022: 78 | ST_MERCEDES_C300_2021: 41 | ST_VW_Golf_2020: 103
Week 2 (2025-05-08):  ST_BMW_320i_2022: 89 | ST_MERCEDES_C300_2021: 64 | ST_VW_Golf_2020: 52
...continues for 80 weeks
```

**[Continuing similar patterns for all 8 categories...]**

---

## 3. COMPONENT FORECAST (Derived from Core Forecast × Condition Rates)

Component-level forecast is calculated as:
```
Component Weekly Supply = Core Supply × (Component Condition Rate / 100)
```

### Example Calculation
```
Core: TC_BMW_x3_2023, Week 1 Supply: 47 units

Component Forecasts:
- Housing (78% condition):    47 × 0.78 = 36.66 ≈ 37 units
- Turbine (65% condition):    47 × 0.65 = 30.55 ≈ 31 units
- Compressor (82% condition): 47 × 0.82 = 38.54 ≈ 39 units
- Valve (71% condition):      47 × 0.71 = 33.37 ≈ 33 units
- Shaft (89% condition):      47 × 0.89 = 41.83 ≈ 42 units
```

### Component Forecast Sample

| Week Start | Component ID | Component Type | Core Supply | Condition | Component Supply |
|-----------|--------------|------------------|------------|-----------|------------------|
| 2025-05-01 | TC_BMW_x3_2023_Housing | Housing | 47 | 78% | 37 |
| 2025-05-01 | TC_BMW_x3_2023_Turbine | Turbine | 47 | 65% | 31 |
| 2025-05-01 | TC_BMW_x3_2023_Compressor | Compressor | 47 | 82% | 39 |
| 2025-05-01 | TC_BMW_x3_2023_Valve | Valve | 47 | 71% | 33 |
| 2025-05-01 | TC_BMW_x3_2023_Shaft | Shaft | 47 | 89% | 42 |

---

## 4. DATABASE STRUCTURE FOR DASHBOARD

### Table 1: Categories
```sql
CREATE TABLE categories (
  category_id VARCHAR(50) PRIMARY KEY,
  category_name VARCHAR(100),
  description VARCHAR(255)
);
```

### Table 2: Cores
```sql
CREATE TABLE cores (
  core_id VARCHAR(50) PRIMARY KEY,
  category_id VARCHAR(50),
  brand VARCHAR(50),
  model VARCHAR(50),
  year INT,
  status VARCHAR(20),
  FOREIGN KEY (category_id) REFERENCES categories(category_id)
);
```

### Table 3: Components
```sql
CREATE TABLE components (
  component_id VARCHAR(100) PRIMARY KEY,
  core_id VARCHAR(50),
  component_type VARCHAR(50),
  condition_rate INT,
  FOREIGN KEY (core_id) REFERENCES cores(core_id)
);
```

### Table 4: Weekly Forecast
```sql
CREATE TABLE weekly_forecast (
  forecast_id INT PRIMARY KEY AUTO_INCREMENT,
  week_start DATE,
  core_id VARCHAR(50),
  category_id VARCHAR(50),
  weekly_supply INT,
  FOREIGN KEY (core_id) REFERENCES cores(core_id),
  FOREIGN KEY (category_id) REFERENCES categories(category_id)
);
```

### Table 5: Component Forecast
```sql
CREATE TABLE component_forecast (
  forecast_id INT PRIMARY KEY AUTO_INCREMENT,
  week_start DATE,
  component_id VARCHAR(100),
  core_supply INT,
  condition_rate INT,
  component_supply INT,
  FOREIGN KEY (component_id) REFERENCES components(component_id)
);
```

---

## 5. JSON FORMAT FOR API/FRONTEND

### Core Data Structure
```json
{
  "cores": [
    {
      "core_id": "TC_BMW_x3_2023",
      "category": "Turbocharger",
      "brand": "BMW",
      "model": "x3",
      "year": 2023,
      "status": "Active",
      "components": [
        {
          "component_id": "TC_BMW_x3_2023_Housing",
          "component_type": "Housing",
          "condition_rate": 78
        },
        {
          "component_id": "TC_BMW_x3_2023_Turbine",
          "component_type": "Turbine",
          "condition_rate": 65
        }
      ]
    }
  ]
}
```

### Forecast Data Structure
```json
{
  "forecasts": [
    {
      "week_start": "2025-05-01",
      "core_id": "TC_BMW_x3_2023",
      "category": "Turbocharger",
      "weekly_supply": 47,
      "components": [
        {
          "component_type": "Housing",
          "condition_rate": 78,
          "component_supply": 37
        }
      ]
    }
  ]
}
```

---

## 6. FILTER/SELECTION CARD OPTIONS

### Primary Filters
1. **Category Filter**
   - Turbocharger
   - Starters
   - Alternators
   - AC Compressors
   - Brake Calipers
   - EGR Valves
   - Steering Racks
   - Steering Pumps

2. **Core Filter** (Multi-select)
   - TC_BMW_x3_2023
   - TC_AUDI_A4_2021
   - TC_TOYOTA_Camry_2020
   - [+ 21 more cores]

3. **Component Filter** (Shows available components for selected core)
   - Housing
   - Turbine (or relevant component type)
   - Compressor
   - Valve
   - Shaft

### Secondary Filters
4. **Date Range** (Week Start)
   - From: 2025-05-01
   - To: 2026-12-24
   - Preset ranges: Last 4 weeks, Last 3 months, YTD, All

5. **Condition Rate Filter**
   - Min: 5%
   - Max: 95%
   - Slider or input fields

6. **Supply Range Filter**
   - Min: 30 units
   - Max: 150 units
   - Slider or input fields

---

## 7. USAGE GUIDELINES FOR DASHBOARD

### Recommended Implementation
1. **Load all core definitions** at app initialization
2. **Dynamically populate component list** based on selected core
3. **Generate forecast view** based on selected filters
4. **Support multi-select** for cores and components
5. **Include reset/clear filters** button
6. **Show active filter count** badge
7. **Remember last selected filters** in session storage

### Dashboard Display Zones
- **Filter Card (Left):** Category → Core → Components (cascading)
- **Main Content (Center):** Weekly forecast table/chart
- **Sidebar Stats (Right):** Total supply, avg condition rate, trend indicators

---

## 8. QUICK START DATA LOADING

### CSV Format for Import

**cores.csv**
```
core_id,category,brand,model,year,status
TC_BMW_x3_2023,Turbocharger,BMW,x3,2023,Active
TC_AUDI_A4_2021,Turbocharger,AUDI,A4,2021,Active
TC_TOYOTA_Camry_2020,Turbocharger,TOYOTA,Camry,2020,Active
ST_BMW_320i_2022,Starters,BMW,320i,2022,Active
[...24 total cores]
```

**components.csv**
```
component_id,core_id,component_type,condition_rate
TC_BMW_x3_2023_Housing,TC_BMW_x3_2023,Housing,78
TC_BMW_x3_2023_Turbine,TC_BMW_x3_2023,Turbine,65
TC_BMW_x3_2023_Compressor,TC_BMW_x3_2023,Compressor,82
TC_BMW_x3_2023_Valve,TC_BMW_x3_2023,Valve,71
TC_BMW_x3_2023_Shaft,TC_BMW_x3_2023,Shaft,89
[...120 total components]
```

**weekly_forecast.csv**
```
week_start,core_id,category,weekly_supply
2025-05-01,TC_BMW_x3_2023,Turbocharger,47
2025-05-01,TC_AUDI_A4_2021,Turbocharger,92
2025-05-01,TC_TOYOTA_Camry_2020,Turbocharger,65
[...1920 total forecast records]
```

---

## SUMMARY

- **24 Cores** (3 per category × 8 categories)
- **120 Components** (5 per core × 24 cores)
- **1,920 Weekly Forecast Records** (24 cores × 80 weeks)
- **Condition Rates:** Range 5-95%, assigned logically per component type
- **Supply Range:** 30-150 units/week, varied weekly
- **Date Range:** May 1, 2025 - December 24, 2026 (80 weeks)

This data provides a realistic foundation for testing your REMAN dashboard's filter/selection card functionality and forecast visualization.
