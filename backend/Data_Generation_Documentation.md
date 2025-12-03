# PoC v3.0: Automotive Turbocharger Core Supply Data Generation
## Comprehensive Technical Documentation

---

## Table of Contents
1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Vehicle Model Specifications](#vehicle-model-specifications)
4. [Component Type Data](#component-type-data)
5. [Data Generation Pipeline](#data-generation-pipeline)
6. [Statistical Distributions](#statistical-distributions)
7. [Validation and Quality Assurance](#validation-and-quality-assurance)

---

## Overview

### Purpose
This system generates realistic synthetic data for automotive turbocharger core supply chain analysis. It simulates the complete lifecycle from vehicle registrations through turbocharger failures, core returns, and component remanufacturing. The generated data serves as input for machine learning-based supply forecasting models.

### Domain Context
- **Industry**: Automotive aftermarket and remanufacturing
- **Component**: Turbochargers for BMW X3 and X5 vehicles
- **Time Period**: 2018-2026 (9-year analysis window)
- **Geographic Scope**: Single market (implied German/European)
- **Integration**: Data feeds into XGBoost forecasting model for 2026 predictions

### Key Assumptions
- **One turbocharger per vehicle** (single-turbo configurations)
- **2% failure rate** over vehicle lifetime
- **65-75% core return rate** (cores returned to remanufacturers)
- **8-year failure distribution window** after initial registration (months 12-96)
- **Proper Weibull normalization** ensures realistic failure timing distribution

---

## System Architecture

### Data Flow Pipeline

```
01_Zulassungszahlen.csv (Vehicle Registrations)
    ↓
    [Weibull Distribution: β=2.5, η=5, γ=1, Time Window=8 years]
    ↓
03_Bestelldaten.csv (Core Orders)
    ↓
    [Return Rate: 65-75% + Log-Normal Mixture Lag]
    ↓
    [Monthly Aggregation]
    ↓
    [Weekly Distribution: ±10%]
    ↓
04_Core_Supply_Daten.csv (Core Supply)
    ↓
    [Component Breakdown + Reusability Rates]
    ↓
05_Komponenten_Daten.csv (Component Data)
```

### Output Files

| File | Description | Granularity | Key Columns |
|------|-------------|-------------|-------------|
| `01_Zulassungszahlen.csv` | Vehicle registrations | Monthly | Datum, Fahrzeugmodell, Menge, Turbo_Typ |
| `02_Typ_Daten.csv` | Turbo type specifications | Type-level | Core_Art, Component presence & reusability |
| `03_Bestelldaten.csv` | Core orders | Monthly | Datum, Core_Typ, Fahrzeugmodell, Menge |
| `04_Core_Supply_Daten.csv` | Core supply deliveries | Weekly | Anlieferdatum, Core_Typ, Menge, Woche |
| `05_Komponenten_Daten.csv` | Component-level data | Weekly | Datum, Komponente, Menge_Wiederverwendbar |

---

## Vehicle Model Specifications

### Model: BMW_X3_2018

| Parameter | Value | Description |
|-----------|-------|-------------|
| **Production Period** | 2018-01 to 2026-12 | 108 months of production |
| **Peak Month** | 2019-06 | Maximum registrations occur in June 2019 |
| **Peak Registrations** | 5,000 units/month | Maximum monthly registration volume |
| **Turbo Type** | TBLBMWX32018 | Specific turbocharger model identifier |
| **Turbos per Vehicle** | 1 | Single-turbo configuration |

**Lifecycle Characteristics:**
- Ramp-up from 30% to 100% of peak over 12 months (2018-01 to 2019-06)
- Decline phase: 3% annual reduction after peak
- Minimum floor: 35% of peak value
- Total production: ~331,000 vehicles

### Model: BMW_X3_2020

| Parameter | Value | Description |
|-----------|-------|-------------|
| **Production Period** | 2020-01 to 2026-12 | 84 months of production |
| **Peak Month** | 2021-03 | Maximum registrations in March 2021 |
| **Peak Registrations** | 7,000 units/month | Higher volume successor model |
| **Turbo Type** | TBLBMWX32020 | Updated turbocharger design |
| **Turbos per Vehicle** | 1 | Single-turbo configuration |

**Lifecycle Characteristics:**
- Ramp-up from 30% to 100% of peak over 15 months (2020-01 to 2021-03)
- Decline phase: 3% annual reduction after peak
- Minimum floor: 35% of peak value
- Total production: ~380,000 vehicles

### Model: BMW_X5_2021

| Parameter | Value | Description |
|-----------|-------|-------------|
| **Production Period** | 2021-01 to 2026-12 | 72 months of production |
| **Peak Month** | 2024-09 | Late peak (3.75 years after launch) |
| **Peak Registrations** | 4,000 units/month | SUV segment, lower volume |
| **Turbo Type** | TBLBMWX52021 | Distinct turbocharger for X5 platform |
| **Turbos per Vehicle** | 1 | Single-turbo configuration |

**Lifecycle Characteristics:**
- Ramp-up from 30% to 100% of peak over 45 months (2021-01 to 2024-09)
- Decline phase: 3% annual reduction after peak
- Minimum floor: 35% of peak value
- Total production: ~133,000 vehicles

---

## Component Type Data

### Turbocharger Type: TBLBMWX32018

| Component | Present | Reusability Rate | Notes |
|-----------|---------|------------------|-------|
| **Gehäuse_1** | ✓ | 85% | Primary housing, high reuse |
| **Gehäuse_2** | ✗ | 0% | Not used in this design |
| **Verdichter_1** | ✓ | 70% | Compressor wheel assembly |
| **Dichtung_1** | ✓ | 45% | Seal/gasket, lower reuse |
| **Dichtung_2** | ✗ | 0% | Not used in this design |
| **Welle_1** | ✓ | 75% | Shaft assembly |
| **Ventil_1** | ✓ | 65% | Valve component |

**Total Components per Turbo**: 5 reusable components

### Turbocharger Type: TBLBMWX32020

| Component | Present | Reusability Rate | Notes |
|-----------|---------|------------------|-------|
| **Gehäuse_1** | ✗ | 0% | Replaced by Gehäuse_2 |
| **Gehäuse_2** | ✓ | 85% | Updated housing design |
| **Verdichter_1** | ✓ | 70% | Same compressor as 2018 |
| **Dichtung_1** | ✓ | 45% | Same seal as 2018 |
| **Dichtung_2** | ✗ | 0% | Not used |
| **Welle_1** | ✓ | 75% | Same shaft as 2018 |
| **Ventil_1** | ✓ | 65% | Same valve as 2018 |

**Total Components per Turbo**: 5 reusable components  
**Design Note**: Housing updated (Gehäuse_1 → Gehäuse_2), other components carried over

### Turbocharger Type: TBLBMWX52021

| Component | Present | Reusability Rate | Notes |
|-----------|---------|------------------|-------|
| **Gehäuse_1** | ✗ | 0% | Not used in X5 platform |
| **Gehäuse_3** | ✓ | 80% | New housing for X5 |
| **Verdichter_3** | ✓ | 70% | New compressor design |
| **Dichtung_1** | ✗ | 0% | Replaced by Dichtung_3 |
| **Dichtung_3** | ✓ | 50% | Updated seal design |
| **Welle_3** | ✓ | 75% | New shaft assembly |
| **Ventil_3** | ✓ | 65% | New valve component |

**Total Components per Turbo**: 5 reusable components  
**Design Note**: Completely new component family (suffix _3) for X5 platform

---

## Data Generation Pipeline

### STEP 1: Vehicle Registrations (Zulassungszahlen)

**Purpose**: Generate realistic monthly vehicle registration patterns with lifecycle dynamics

#### Mathematical Model

**Trend Factor Calculation:**

```
IF date ≤ peak_month:
    months_since_start = (date - production_start) in months
    months_to_peak = (peak_month - production_start) in months
    trend_factor = 0.30 + 0.70 × (months_since_start / months_to_peak)
    trend_factor = min(trend_factor, 1.0)

ELSE:
    years_after_peak = (date - peak_month) in years
    trend_factor = 1.0 - (0.03 × years_after_peak)
    trend_factor = max(trend_factor, 0.35)
```

**Seasonal Factor:**
```
IF month ∈ {March, April, May}:     seasonal_factor = 1.15  (+15% spring boost)
ELIF month ∈ {December, January, February}: seasonal_factor = 0.90  (-10% winter decline)
ELSE:                                  seasonal_factor = 1.0   (baseline)
```

**Noise Factor:**
```
noise_factor = Uniform(0.95, 1.05)    (±5% random variation)
```

**Final Calculation:**
```
monthly_registrations = peak_registrations × trend_factor × seasonal_factor × noise_factor
monthly_registrations = max(monthly_registrations, 100)    (minimum floor)
```

#### Output Columns
- **Datum**: First day of month (YYYY-MM-01)
- **Jahr**: Year (integer)
- **Monat**: Month (1-12)
- **Fahrzeugmodell**: Model name (BMW_X3_2018, BMW_X3_2020, BMW_X5_2021)
- **Menge**: Number of registrations (integer, ≥100)
- **Turbo_Typ**: Associated turbocharger type

#### Example Data
```
Datum         Jahr  Monat  Fahrzeugmodell   Menge  Turbo_Typ
2018-01-01    2018  1      BMW_X3_2018      1,521  TBLBMWX32018
2019-06-01    2019  6      BMW_X3_2018      5,134  TBLBMWX32018  (peak month)
2021-03-01    2021  3      BMW_X3_2020      7,213  TBLBMWX32020  (peak month)
```

---

### STEP 2: Type Data (Typ-Daten)

**Purpose**: Document component specifications for each turbocharger type

#### Data Structure

For each turbocharger type, create a flat record with:
- `Core_Art`: Turbocharger type identifier
- For each component:
  - `{Component}_Vorhanden`: Binary (1=present, 0=absent)
  - `{Component}_Wiederverwendbarkeit_%`: Reusability percentage (0-100)

#### Example Record
```
Core_Art: TBLBMWX32018
Gehäuse_1_Vorhanden: 1
Gehäuse_1_Wiederverwendbarkeit_%: 85
Gehäuse_2_Vorhanden: 0
Gehäuse_2_Wiederverwendbarkeit_%: 0
...
```

**Purpose in Pipeline**: Used as lookup table to decompose cores into reusable components

---

### STEP 3: Core Orders (Bestelldaten)

**Purpose**: Model turbocharger failures and resulting core orders over time

#### Failure Rate Model

**Base Parameter:**
- **Failure Rate**: 2% of registered vehicles will experience turbocharger failure
- **Timing Distribution**: Weibull distribution over 8 years following registration

#### Weibull Distribution Parameters

**Function:**
```
f(t; β, η, γ) = (β/η) × ((t-γ)/η)^(β-1) × exp(-((t-γ)/η)^β)

where:
  t = time since registration (in years)
  β = 2.5  (shape parameter)
  η = 5.0  (scale parameter, in years)
  γ = 1.0  (location parameter, in years)
```

**Parameter Interpretation:**

| Parameter | Value | Physical Meaning |
|-----------|-------|------------------|
| **β (beta)** | 2.5 | Shape - increasing failure rate over time (wear-out phase) |
| **η (eta)** | 5.0 years | Scale - characteristic life, mode near 3.5-4 years |
| **γ (gamma)** | 1.0 year | Location - failures start 1 year after registration (warranty period) |

**Time Window:**
- **Start**: Month 12 (1 year after registration)
- **End**: Month 96 (8 years after registration)
- **Total Duration**: 85 months (months 12-96 inclusive)

#### Implementation Algorithm

**Step 1: Pre-calculate Weibull Weights**
```python
month_offsets = [12, 13, 14, ..., 96]  # 85 time points

For each month_offset:
    t_years = month_offset / 12.0
    pdf_value = calculate_weibull_pdf(t_years, beta=2.5, eta=5.0, gamma=1.0)
    weibull_weights.append(pdf_value)

# Normalize to probability distribution
total_weight = sum(weibull_weights)
weibull_weights = [w / total_weight for w in weibull_weights]
```

**Step 2: Distribute Orders**
```python
For each registration event (month, model, quantity):
    total_cores = registrations × 0.02 × 1  # 2% failure rate, 1 turbo per vehicle
    
    For each month_offset in [12, 13, ..., 96]:
        cores_this_month = total_cores × weibull_weights[month_offset]
        order_date = registration_date + month_offset months
        
        IF order_date ≤ 2026-12-31:  # Cutoff for analysis window
            Record order (order_date, core_type, model, cores_this_month)
```

**Step 3: Aggregate by Month**
```python
Group by (Datum, Core_Typ, Fahrzeugmodell)
Sum(Menge)
Round to nearest integer
Filter out zero quantities
```

#### Example Calculation

**Scenario**: 1,000 BMW_X3_2018 vehicles registered in January 2018

```
Total expected failures: 1,000 × 0.02 = 20 cores

Distribution examples:
  Month 12 (Jan 2019): 20 × 0.0000 = 0.00 cores    (t=1.0, at gamma threshold)
  Month 24 (Jan 2020): 20 × 0.0037 = 0.07 cores    (t=2.0, early failures)
  Month 48 (Jan 2022): 20 × 0.0148 = 0.30 cores    (t=4.0, approaching peak)
  Month 60 (Jan 2023): 20 × 0.0170 = 0.34 cores    (t=5.0, peak failure rate)
  Month 72 (Jan 2024): 20 × 0.0155 = 0.31 cores    (t=6.0, declining)
  Month 96 (Jan 2026): 20 × 0.0069 = 0.14 cores    (t=8.0, tail)

These individual registration events are aggregated with all other
registrations from that month to produce monthly order totals.
```

#### Output Columns
- **Datum**: First day of month
- **Jahr**: Year
- **Monat**: Month (1-12)
- **Core_Typ**: Turbocharger type
- **Fahrzeugmodell**: Vehicle model
- **Menge**: Number of core orders (integer)

---

### STEP 4: Core Supply (Core_Supply_Daten)

**Purpose**: Model core returns with realistic lag distribution from order to delivery

#### Stage 1: Monthly Aggregation with Lag Distribution

**Return Rate:**
```
return_rate = Uniform(0.65, 0.75)    (65-75% of ordered cores are returned)
cores_returned = order_quantity × return_rate
```

**Log-Normal Mixture Distribution:**

Three customer channels with different return behaviors:

| Channel | Weight | Peak (days) | σ (shape) | Description |
|---------|--------|-------------|-----------|-------------|
| **Werkstatt** | 20% | 15 | 0.3 | Repair shops - fast returns |
| **Flotte** | 35% | 45 | 0.4 | Fleet operators - moderate returns |
| **Privat** | 45% | 90 | 0.5 | Private customers - slow returns |

**Log-Normal Parameters:**

For each channel with peak at `peak_days` and shape `σ`:
```
μ = ln(peak_days) + σ²

Distribution: LogNormal(μ, σ)

Werkstatt: μ = ln(15) + 0.3² = 2.799
Flotte:    μ = ln(45) + 0.4² = 3.970  
Privat:    μ = ln(90) + 0.5² = 4.749
```

**Mathematical Form:**
```
f(x; μ, σ) = (1 / (x × σ × √(2π))) × exp(-((ln(x) - μ)² / (2σ²)))

where:
  x = lag time in days
  μ = location parameter (calculated above)
  σ = shape parameter (0.3, 0.4, or 0.5)
```

**Implementation Algorithm:**

```python
For each order (date, quantity, type):
    return_rate = Uniform(0.65, 0.75)
    cores_returned = order_quantity × return_rate
    
    For each channel in [Werkstatt, Flotte, Privat]:
        weight = channel.weight          # 0.20, 0.35, or 0.45
        peak = channel.peak              # 15, 45, or 90 days
        sigma = channel.sigma            # 0.3, 0.4, or 0.5
        
        # Calculate log-normal parameters
        mu = ln(peak) + sigma²
        
        # Sample lag from log-normal distribution
        lag_days = sample from LogNormal(mu, sigma)
        
        # Calculate delivery date
        delivery_date = order_date + lag_days
        
        # Quantity in this channel
        qty_channel = cores_returned × weight
        
        Record supply entry (delivery_date, type, qty_channel, lag_days)
```

**Monthly Aggregation:**
```python
Group supply entries by (Year, Month, Core_Typ, Fahrzeugmodell)
Sum(Menge)
Mean(Return_Lag_Tage)
Create Datum as first day of month
```

#### Stage 2: Weekly Distribution

**Purpose**: Distribute monthly aggregate quantities to weekly deliveries with variation

**Algorithm:**
```python
For each monthly aggregate (date, quantity, type):
    For week in [1, 2, 3, 4]:
        multiplier = Uniform(0.9, 1.1)    # ±10% variation
        weekly_qty = (monthly_quantity / 4) × multiplier
        week_date = month_start_date + (week - 1) weeks
        
        IF weekly_qty > 0:
            Record weekly supply (week_date, type, weekly_qty, week)
```

**Note**: The four weekly quantities do NOT sum exactly to monthly total due to independent random multipliers. This models real-world delivery irregularity.

#### Output Columns
- **Anlieferdatum**: Delivery date (specific day)
- **Jahr**: Year
- **Monat**: Month (1-12)
- **Woche**: Week within month (1-4)
- **Core_Typ**: Turbocharger type
- **Fahrzeugmodell**: Vehicle model
- **Menge**: Quantity delivered (integer)

#### Example Lag Distribution

For 100 ordered cores with 70% return rate = 70 cores returned:

```
Werkstatt (20% × 70 = 14 cores):
  Lag distribution: LogNormal(μ=2.799, σ=0.3)
  Expected lag: ~15 days (mode)
  95% of returns: 8-30 days

Flotte (35% × 70 = 24.5 cores):
  Lag distribution: LogNormal(μ=3.970, σ=0.4)
  Expected lag: ~45 days (mode)
  95% of returns: 20-100 days

Privat (45% × 70 = 31.5 cores):
  Lag distribution: LogNormal(μ=4.749, σ=0.5)
  Expected lag: ~90 days (mode)
  95% of returns: 35-230 days
```

**Result**: Supply dates are shifted 15-230 days forward from order dates, causing temporal spread and potential month shifts.

---

### STEP 5: Component Data (Komponenten_Daten)

**Purpose**: Decompose core supply into individual reusable components

#### Algorithm

```python
For each weekly core supply entry (date, type, quantity):
    
    # Lookup component specifications for this turbo type
    components = turbo_type_data[type]
    
    For each component in components:
        IF component.Vorhanden == 1:    # Component exists in this design
            
            reuse_rate = component.Wiederverwendbarkeit_% / 100
            usable_qty = cores_arrived × reuse_rate
            
            Record component entry:
                Datum = delivery_date
                Jahr = delivery_year
                Monat = delivery_month
                Core_Typ = turbo_type
                Fahrzeugmodell = vehicle_model
                Komponente = component_name
                Menge_Cores = cores_arrived
                Menge_Wiederverwendbar = int(usable_qty)
                Wiederverwendbarkeit_% = component.Wiederverwendbarkeit_%
```

#### Example Decomposition

**Input**: 100 cores of type TBLBMWX32018 delivered

**Output Components:**

| Component | Cores Received | Reusability | Usable Quantity |
|-----------|----------------|-------------|-----------------|
| Gehäuse_1 | 100 | 85% | 85 |
| Verdichter_1 | 100 | 70% | 70 |
| Dichtung_1 | 100 | 45% | 45 |
| Welle_1 | 100 | 75% | 75 |
| Ventil_1 | 100 | 65% | 65 |
| **Total Usable** | **500** | **68% avg** | **340** |

**Interpretation**: From 100 cores, 340 reusable components are extracted (average 3.4 per core).

#### Output Columns
- **Datum**: Delivery date
- **Jahr**: Year
- **Monat**: Month
- **Core_Typ**: Turbocharger type
- **Fahrzeugmodell**: Vehicle model
- **Komponente**: Component name (e.g., "Gehäuse_1")
- **Menge_Cores**: Number of cores decomposed
- **Menge_Wiederverwendbar**: Number of reusable components extracted
- **Wiederverwendbarkeit_%**: Reusability percentage for this component

---

## Statistical Distributions

### Summary of All Distributions Used

| Stage | Distribution | Parameters | Purpose |
|-------|--------------|------------|---------|
| **Registrations** | Deterministic trend + Uniform noise | noise ∈ [0.95, 1.05] | Realistic lifecycle with variation |
| **Registrations** | Seasonal multiplier | {0.90, 1.0, 1.15} by month | Spring boost, winter decline |
| **Orders** | Weibull | β=2.5, η=5, γ=1, t∈[1,8] years | Increasing failure rate (wear-out) |
| **Supply** | Uniform return rate | rate ∈ [0.65, 0.75] | Variable core return behavior |
| **Supply** | Log-Normal mixture (3 channels) | See below | Multi-modal lag distribution |
| **Supply** | Uniform weekly variation | multiplier ∈ [0.9, 1.1] | Delivery irregularity |

### Detailed Distribution Specifications

#### Weibull Distribution for Failures

**Probability Density Function:**
```
f(t; β, η, γ) = (β/η) × ((t-γ)/η)^(β-1) × exp(-((t-γ)/η)^β)    for t ≥ γ
f(t; β, η, γ) = 0                                               for t < γ
```

**Cumulative Distribution Function:**
```
F(t; β, η, γ) = 1 - exp(-((t-γ)/η)^β)    for t ≥ γ
F(t; β, η, γ) = 0                         for t < γ
```

**Mode (Peak Failure Rate):**
```
Mode = γ + η × ((β-1)/β)^(1/β)
     = 1.0 + 5.0 × ((2.5-1)/2.5)^(1/2.5)
     = 1.0 + 5.0 × 0.6687
     ≈ 4.34 years
```

**Mean Time to Failure:**
```
Mean = γ + η × Γ(1 + 1/β)
     = 1.0 + 5.0 × Γ(1.4)
     ≈ 1.0 + 5.0 × 0.8873
     ≈ 5.44 years
```

**Percentiles:**
- **25th percentile**: ~2.6 years
- **50th percentile** (median): ~4.2 years
- **75th percentile**: ~6.0 years
- **90th percentile**: ~7.5 years

#### Log-Normal Distribution for Return Lags

**Probability Density Function:**
```
f(x; μ, σ) = (1 / (x × σ × √(2π))) × exp(-((ln(x) - μ)² / (2σ²)))    for x > 0
```

**Parameters for Each Channel:**

**Werkstatt (Repair Shops):**
```
σ = 0.3
peak = 15 days
μ = ln(15) + 0.3² = 2.708 + 0.09 = 2.799

Mode = 15 days
Mean = exp(μ + σ²/2) = exp(2.799 + 0.045) ≈ 17 days
Median = exp(μ) = exp(2.799) ≈ 16.4 days
Std Dev ≈ 5.2 days
```

**Flotte (Fleet Operators):**
```
σ = 0.4
peak = 45 days
μ = ln(45) + 0.4² = 3.807 + 0.16 = 3.970

Mode = 45 days
Mean = exp(μ + σ²/2) = exp(3.970 + 0.08) ≈ 52 days
Median = exp(μ) = exp(3.970) ≈ 53 days
Std Dev ≈ 22 days
```

**Privat (Private Customers):**
```
σ = 0.5
peak = 90 days
μ = ln(90) + 0.5² = 4.500 + 0.25 = 4.749

Mode = 90 days
Mean = exp(μ + σ²/2) = exp(4.749 + 0.125) ≈ 117 days
Median = exp(μ) = exp(4.749) ≈ 115 days
Std Dev ≈ 60 days
```

**Mixture Distribution:**
```
f_mixture(x) = 0.20 × f_werkstatt(x) + 0.35 × f_flotte(x) + 0.45 × f_privat(x)

Overall mean lag: 0.20×17 + 0.35×52 + 0.45×117 ≈ 74 days
Overall median lag: ~60 days (weighted mixture)
Range: 5-300+ days (long right tail from private customers)
```

---

## Validation and Quality Assurance

### Expected Data Volumes

**Registrations (2018-2026):**
- BMW_X3_2018: ~331,000 vehicles (96 months × ~3,450 avg/month)
- BMW_X3_2020: ~380,000 vehicles (84 months × ~4,520 avg/month)
- BMW_X5_2021: ~133,000 vehicles (72 months × ~1,850 avg/month)
- **Total**: ~844,000 vehicles

**Orders (Weibull distributed, 2% failure rate):**
- Expected raw: 844,000 × 0.02 = 16,880 cores
- Captured (within 2026 cutoff): ~2,750 cores (16% captured)
- **Reason for reduction**: 8-year distribution extends beyond 2026 for recent registrations

**Supply (65-75% return rate):**
- Expected: 2,750 × 0.70 = ~1,925 cores
- Actual: ~1,565 cores
- **Note**: Variation due to random return rates and lag distribution pushing some beyond 2026

**Components:**
- Cores × 5 components/core = 1,565 × 5 = 7,825 component records
- Reusable: ~4,000-5,000 (depending on reusability rates)

### Key Validation Checks

**1. Registration Lifecycle:**
```
CHECK: Peak month has maximum registrations
CHECK: Ramp-up phase shows increasing trend
CHECK: Decline phase shows 3% annual reduction
CHECK: No registrations outside production period
CHECK: Minimum 100 registrations per month maintained
```

**2. Order Timing:**
```
CHECK: No orders before registration date + 1 year (gamma=1)
CHECK: Order peak around 4-5 years after registration
CHECK: All orders ≤ 2026-12-31 (cutoff)
CHECK: Order total ≈ registrations × 0.02 × capture_rate
```

**3. Supply Timing:**
```
CHECK: Supply dates ≥ order dates (lag is always positive)
CHECK: Average lag ≈ 60-75 days
CHECK: Supply extends into 2027 (lag pushes some forward)
CHECK: Supply total ≈ orders × 0.70
```

**4. Component Breakdown:**
```
CHECK: Each core produces exactly 5 component records (one per present component)
CHECK: Reusable quantity ≤ core quantity
CHECK: Reusability percentages match type specifications
CHECK: No components for "Vorhanden=0" entries
```

### Statistical Properties Verification

**Weibull Distribution:**
```python
# Sample verification
orders_by_lag = group_orders_by(months_since_registration)
plot(orders_by_lag)  # Should show peak around month 52 (4.3 years)

# Verify normalization
sum(weibull_weights) ≈ 1.0
```

**Log-Normal Distribution:**
```python
# Sample verification
lags = extract_all_return_lags()
histogram(lags, bins=50)  # Should show three peaks around 15, 45, 90 days

# Verify mean
mean(lags) ≈ 60-80 days
```

### Data Quality Checks

**Missing Values:**
- No NULL values allowed in any output file
- All date fields must be valid dates
- All quantity fields must be ≥ 0

**Referential Integrity:**
- All Turbo_Typ values in orders must exist in type data
- All Fahrzeugmodell values must match vehicle specifications
- All component names must exist in type specifications

**Temporal Consistency:**
- Registration date ≤ Order date
- Order date ≤ Supply date
- All dates within [2018-01-01, 2027-12-31]

---

## Reproducibility

### Random Seed
```python
np.random.seed(42)
```
**Purpose**: Ensures identical output across runs for testing and validation

### Library Versions
- pandas: Data manipulation and CSV I/O
- numpy: Random number generation, array operations
- scipy.stats.lognorm: Log-normal distribution sampling

### Execution
```bash
python data_generation.py
```

**Runtime**: ~5-15 seconds on standard hardware  
**Memory**: ~100-200 MB peak usage

---

## Appendix: Mathematical Derivations

### Log-Normal Mode to μ Conversion

Given desired mode `m` and shape `σ`, calculate location parameter `μ`:

```
Mode of LogNormal(μ, σ) = exp(μ - σ²)

Therefore:
m = exp(μ - σ²)
ln(m) = μ - σ²
μ = ln(m) + σ²
```

**Example (Werkstatt channel):**
```
m = 15 days (desired mode)
σ = 0.3

μ = ln(15) + 0.3²
  = 2.708 + 0.09
  = 2.799
```

### Weibull Scale Parameter Interpretation

The scale parameter `η` relates to the characteristic life:

```
F(η) = 1 - exp(-1) ≈ 0.632

Meaning: 63.2% of failures occur by time η (measured from γ)
```

**For our system:**
```
η = 5 years (from γ=1)
F(6 years) ≈ 0.632

Interpretation: 63.2% of failures occur within 6 years of registration
```

---

## Document Metadata

- **Version**: 3.0
- **Last Updated**: 2025-11-28
- **Author**: Supply Chain Analytics Team
- **Purpose**: Technical documentation for data generation system
- **Intended Audience**: Data scientists, analysts, LLM systems for PDF generation

---

**End of Documentation**
