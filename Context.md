PoC v3.0 - Data Generation Logic & Architecture
CRITICAL CHANGES from v2.0 to v3.0
1. TURBOS PER VEHICLE

OLD: 3 Turbos pro Auto
NEW: 1 Turbo pro Auto

Impact:

    Order quantities: Registrations × Failure_Rate × 1 (statt × 3)

    Simplifies logic but same structure

SCHRITT-FÜR-SCHRITT LOGIK v3.0
SCHRITT 1: Zulassungszahlen (unchanged)

    Input: vehicle_specs, 2018-2025

    Output: 01_Zulassungszahlen.csv

    Trend: 30% → 100% (1 Jahr), -3%/Jahr Rückgang

    NO CHANGES - leave as is

SCHRITT 2: BESTELLDATEN (NEW LOGIC v3.0)
CONCEPT

Jede monatliche Zulassung triggert eine Verteilung von Bestellungen über 10 Jahre.
Diese Verteilung folgt der Weibull-Verteilung mit:

    γ = 1 Jahr (Location): Erste Order 1 Jahr später

    β = 2.5 (Shape): Zunehmende Ausfallrate

    η = 5 Jahre (Scale): Peak bei ~3.5-5 Jahren

BEISPIEL DURCHRECHNUNG

Input: BMW X3 2018, Januar 2018: 1.000 Zulassungen
Ausfallquote: 1% → 10 Fahrzeuge mit Fehler
Menge pro Order: 10 Fahrzeuge × 1 Turbo = 10 Cores (statt 30)

Zeitliche Verteilung (Weibull):

text
Weibull PDF: f(t) = (beta/eta) × ((t-gamma)/eta)^(beta-1) × exp(-((t-gamma)/eta)^beta)

t=1 Jahr (Jan 2019):   f(1) ≈ 0.006
t=5 Jahre (Jan 2023):  f(5) ≈ 0.045 (PEAK!)
t=10 Jahre (Jan 2028): f(10) ≈ 0.002

Summe über alle 120 Monate: integral f(t)dt von 1-10 Jahren ≈ 1.0
IMPLEMENTIERUNG LOGIK

text
FOR each registration row:
  vehicles_registered = row['Menge']
  failure_rate = 0.01
  vehicles_failed = vehicles_registered × failure_rate × 1 turbo per vehicle
  
  FOR month_offset in range(12, 121):  # 1-10 Jahre
    t_years = month_offset / 12.0
    weibull_pdf = calculate_weibull_pdf(t_years, beta=2.5, eta=5, gamma=1)
    cores_this_month = int(vehicles_failed × (weibull_pdf / 12))
    
    IF cores_this_month > 0:
      order_date = registration_date + month_offset
      APPEND (order_date, core_type, cores_this_month)

THEN: GROUP BY (Datum, Core_Typ) and SUM(Menge)
OUTPUT: 03_Bestelldaten.csv (monatlich aggregiert)

KEY: Menge ist einfach Zulassungen × 0.01 × 1, aber Timing folgt Weibull!
SCHRITT 3: TYP-DATEN (unchanged)

    Leave exactly as v2.0

    02_Typ_Daten.csv unchanged

SCHRITT 4: CORE SUPPLY (MODIFIED LOGIC v3.0)
CONCEPT

text
Core Supply Menge = Bestellmenge × Return_Rate(65-75%)
Core Supply Datum = Bestelldatum + Lag (from Log-Normal Mixture)

LOG-NORMAL MIXTURE IMPLEMENTATION

Mixture Distribution (3 Komponenten):

text
f_lag(t) = w1 × LogN(15d, sigma=0.3) 
         + w2 × LogN(45d, sigma=0.4) 
         + w3 × LogN(90d, sigma=0.5)

w1=0.20 (Werkstatt), w2=0.35 (Flotten), w3=0.45 (Privat)

Parameter Berechnung für Log-Normal:

text
mu = ln(peak_days) + sigma^2

Werkstatt: mu1 = ln(15) + 0.3^2 = 2.77
Flotte:    mu2 = ln(45) + 0.4^2 = 3.87
Privat:    mu3 = ln(90) + 0.5^2 = 4.69

IMPLEMENTIERUNG LOGIK (2-Stage Process)

STAGE 1: Calculate Monthly Aggregation

text
FOR each order:
  return_rate = Uniform(0.65, 0.75)
  cores_returned = order_qty × return_rate
  
  FOR each of 3 channels:
    weight = channel_weight (0.2, 0.35, 0.45)
    sigma = channel_sigma (0.3, 0.4, 0.5)
    peak = channel_peak_days (15, 45, 90)
    
    mu = ln(peak) + sigma^2
    lag_samples = sample from LogNormal(mu, sigma) × 100 times
    avg_lag_days = mean(lag_samples)
    
    delivery_date = order_date + avg_lag_days
    qty_in_channel = cores_returned × weight
    
    APPEND (delivery_date, core_type, qty_in_channel)

THEN: GROUP BY (Year, Month, Core_Typ) and SUM(Menge)
OUTPUT: Monthly aggregated (intermediate)

STAGE 2: Distribute to Weeks

text
FOR each monthly aggregated row:
  monthly_qty = row['Menge']
  delivery_date_month = row['Anlieferdatum']
  
  FOR week = 1 to 4:
    multiplier = Uniform(0.9, 1.1)
    weekly_qty = (monthly_qty / 4) × multiplier
    week_date = delivery_date_month + (week × 7 days)
    
    APPEND (week_date, core_type, weekly_qty, week)

OUTPUT: 04_Core_Supply_Daten.csv (wöchentlich)

KEY POINTS:

    Mixture Lags verschieben Anlieferdaten (nicht Order Dates!)

    Monatliche Aggregation VOR Wochenverteilung

    Wochenverteilung ist nur für Realismus (Summe pro Monat gleich)

SCHRITT 5: KOMPONENTEN (UNCHANGED)

Same as v2.0:

    Input: 04_Core_Supply_Daten.csv (weekly)

    5 Komponenten pro Core

    Wiederverwendbarkeitsraten: 45-85%

    Output: 05_Komponenten_Daten.csv

DATENFLUSS v3.0

text
01_Zulassungszahlen (unchanged)
    ↓
    Weibull Distribution (β=2.5, η=5J, γ=1J)
    ↓
03_Bestelldaten (Weibull-verteilt, monatlich aggregiert)
    ↓
    Return Rate (65-75%) + Log-Normal Mixture
    ↓
    Monthly Aggregation
    ↓
    Weekly Distribution (±10%)
    ↓
04_Core_Supply (wöchentlich)
    ↓
05_Komponenten (5 pro Core, Wiederverwendbarkeit)

KEY DIFFERENCES v2.0 → v3.0
Aspekt	v2.0	v3.0
Turbos/Auto	3	1
Order Menge	Direct Weibull	Registrations × 0.01 × 1
Order Timing	Weibull Direct	Weibull Distribution über 10J
Supply Lags	Simple 15/45/90d	Log-Normal Mixture Sampling
Supply Aggregation	Monatlich	Monatlich → Wochen
HELPER FUNCTIONS NEEDED
calculate_weibull_pdf(t, beta, eta, gamma)

text
Input: t (years), beta, eta, gamma
Output: PDF value at t

Formula: (beta/eta) × ((t-gamma)/eta)^(beta-1) × exp(-((t-gamma)/eta)^beta)
Special: Return 0 if t <= gamma

get_lognormal_lag(peak_days, sigma)

text
Input: peak_days, sigma
Output: lag_days (scalar)

mu = ln(peak_days) + sigma^2
Sample from Lognormal(mu, sigma)
Return average of 100 samples

VALIDATION CHECKS v3.0

Bestellungen Total ≈ (Registrations × 0.01)

    Weibull integral from gamma to infinity ≈ 1.0

Supply Total ≈ (Orders × 0.70)

    Average Return Rate ≈ 70%

Supply Datums shifted by Lags

    Not original Order Dates

Components Total = Supply × 5

    Wiederverwendbar < Total

Features Lagged_Reg_5Y plausibel

    Registrations von vor 5 Jahren
