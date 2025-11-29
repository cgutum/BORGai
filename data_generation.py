import pandas as pd
import numpy as np
from scipy.stats import lognorm
from datetime import datetime, timedelta
#from sklearn.preprocessing import LabelEncoder
#import xgboost as xgb
#from sklearn.metrics import mean_absolute_percentage_error, mean_squared_error
#import warnings
#warnings.filterwarnings('ignore')

np.random.seed(42)
print("="*70)
print("PoC v3.0: Core Supply Forecasting")
print("1 Turbo/Auto + Weibull Orders + Log-Normal Supply")
print("="*70)

# ===================================================================
# TEIL 1: FAHRZEUGMODELLE & TYPDATEN
# ===================================================================

vehicle_specs = {
    "BMW_X3_2018": {
        "peak_month": "2019-06",
        "peak_registrations": 5000,
        "production_start": "2018-01",
        "production_end": "2026-12",
        "turbo_type": "TBLBMWX32018",
        "turbos_per_vehicle": 1  # CHANGED: 1 instead of 3
    },
    "BMW_X3_2020": {
        "peak_month": "2021-03",
        "peak_registrations": 7000,
        "production_start": "2020-01",
        "production_end": "2026-12",
        "turbo_type": "TBLBMWX32020",
        "turbos_per_vehicle": 1
    },
    "BMW_X5_2021": {
        "peak_month": "2024-09",
        "peak_registrations": 4000,
        "production_start": "2021-01",
        "production_end": "2026-12",
        "turbo_type": "TBLBMWX52021",
        "turbos_per_vehicle": 1
    }
}

turbo_type_data = {
    "TBLBMWX32018": {
        "Gehäuse_1": {"Vorhanden": 1, "Wiederverwendbarkeit_%": 85},
        "Gehäuse_2": {"Vorhanden": 0, "Wiederverwendbarkeit_%": 0},
        "Verdichter_1": {"Vorhanden": 1, "Wiederverwendbarkeit_%": 70},
        "Dichtung_1": {"Vorhanden": 1, "Wiederverwendbarkeit_%": 45},
        "Dichtung_2": {"Vorhanden": 0, "Wiederverwendbarkeit_%": 0},
        "Welle_1": {"Vorhanden": 1, "Wiederverwendbarkeit_%": 75},
        "Ventil_1": {"Vorhanden": 1, "Wiederverwendbarkeit_%": 65}
    },
    "TBLBMWX32020": {
        "Gehäuse_1": {"Vorhanden": 0, "Wiederverwendbarkeit_%": 85},
        "Gehäuse_2": {"Vorhanden": 1, "Wiederverwendbarkeit_%": 0},
        "Verdichter_1": {"Vorhanden": 1, "Wiederverwendbarkeit_%": 70},
        "Dichtung_1": {"Vorhanden": 1, "Wiederverwendbarkeit_%": 45},
        "Dichtung_2": {"Vorhanden": 0, "Wiederverwendbarkeit_%": 0},
        "Welle_1": {"Vorhanden": 1, "Wiederverwendbarkeit_%": 75},
        "Ventil_1": {"Vorhanden": 1, "Wiederverwendbarkeit_%": 65}
    },
    "TBLBMWX52021": {
        "Gehäuse_1": {"Vorhanden": 0, "Wiederverwendbarkeit_%": 0},
        "Gehäuse_3": {"Vorhanden": 1, "Wiederverwendbarkeit_%": 80},
        "Verdichter_3": {"Vorhanden": 1, "Wiederverwendbarkeit_%": 70},
        "Dichtung_1": {"Vorhanden": 0, "Wiederverwendbarkeit_%": 0},
        "Dichtung_3": {"Vorhanden": 1, "Wiederverwendbarkeit_%": 50},
        "Welle_3": {"Vorhanden": 1, "Wiederverwendbarkeit_%": 75},
        "Ventil_3": {"Vorhanden": 1, "Wiederverwendbarkeit_%": 65}
    }
}

print("✓ Spezifikationen geladen")

# ===================================================================
# SCHRITT 1: ZULASSUNGSZAHLEN MIT TREND-MODELL (unchanged)
# ===================================================================

def generate_registrations_v2(vehicle_specs, start_date="2018-01-01", end_date="2026-12-31"):
    date_range = pd.date_range(start=start_date, end=end_date, freq='MS')
    registration_data = []
    
    for model_name, specs in vehicle_specs.items():
        peak_month = pd.to_datetime(specs['peak_month'])
        peak_value = specs['peak_registrations']
        prod_start = pd.to_datetime(specs['production_start'])
        prod_end = pd.to_datetime(specs['production_end'])
        
        for date in date_range:
            if date < prod_start or date > prod_end:
                continue
            
            months_since_start = (date.year - prod_start.year) * 12 + (date.month - prod_start.month)
            months_to_peak = (peak_month.year - prod_start.year) * 12 + (peak_month.month - prod_start.month)
            
            if date <= peak_month:
                if months_to_peak > 0:
                    trend_factor = 0.30 + 0.70 * (months_since_start / months_to_peak)
                else:
                    trend_factor = 1.0
                trend_factor = min(trend_factor, 1.0)
            else:
                years_after_peak = (date.year - peak_month.year) + (date.month - peak_month.month) / 12
                trend_factor = 1.0 - (0.03 * years_after_peak)
                trend_factor = max(trend_factor, 0.35)
            
            month = date.month
            seasonal_factor = 1.15 if month in [3, 4, 5] else 0.90 if month in [12, 1, 2] else 1.0
            noise_factor = np.random.uniform(0.95, 1.05)
            
            monthly_registrations = int(peak_value * trend_factor * seasonal_factor * noise_factor)
            
            registration_data.append({
                'Datum': date, 'Jahr': date.year, 'Monat': date.month,
                'Fahrzeugmodell': model_name,
                'Menge': max(monthly_registrations, 100),
                'Turbo_Typ': specs['turbo_type']
            })
    
    return pd.DataFrame(registration_data)

df_registrations = generate_registrations_v2(vehicle_specs)
df_registrations.to_csv('01_Zulassungszahlen.csv', index=False, encoding='utf-8-sig')
print(f"✓ SCHRITT 1: Zulassungszahlen ({len(df_registrations)} Zeilen)")

# ===================================================================
# SCHRITT 2: TYP-DATEN (unchanged)
# ===================================================================

type_records = []
for turbo_type, components in turbo_type_data.items():
    row = {"Core_Art": turbo_type}
    for comp_name, comp_data in components.items():
        row[f"{comp_name}_Vorhanden"] = comp_data["Vorhanden"]
        row[f"{comp_name}_Wiederverwendbarkeit_%"] = comp_data["Wiederverwendbarkeit_%"]
    type_records.append(row)

df_types = pd.DataFrame(type_records)
df_types.to_csv('02_Typ_Daten.csv', index=False, encoding='utf-8-sig')
print(f"✓ SCHRITT 2: Typ-Daten ({len(df_types)} Turbolader-Typen)")

# ===================================================================
# SCHRITT 3: BESTELLDATEN MIT WEIBULL DISTRIBUTION (NEW v3.0)
# ===================================================================

def calculate_weibull_pdf(t, beta=2.5, eta=5.0, gamma=1.0):
    """Calculate Weibull PDF at time t"""
    t_scaled = (t - gamma) / eta
    if t_scaled <= 0:
        return 0
    return (beta / eta) * (t_scaled ** (beta - 1)) * np.exp(-(t_scaled ** beta))

def generate_core_orders_v3(df_registrations, failure_rate=0.02):
    """
    Generate orders using Weibull distribution
    
    For each registration: distribute over 10 years following Weibull(beta=2.5, eta=5, gamma=1)
    Each registration event creates orders distributed according to Weibull over future months.
    """
    core_orders = []
    
    # Pre-calculate Weibull distribution weights for 8 years
    month_offsets = list(range(12, 97))  # Months 12-96 (1-8 years)
    weibull_weights = []
    
    for month_offset in month_offsets:
        t_years = month_offset / 12.0
        pdf_value = calculate_weibull_pdf(t_years, beta=2.5, eta=5.0, gamma=1.0)
        weibull_weights.append(pdf_value)
    
    # Normalize weights to sum to 1
    total_weight = sum(weibull_weights)
    weibull_weights = [w / total_weight for w in weibull_weights]
    
    # For each registration, distribute orders according to Weibull
    for _, reg_row in df_registrations.iterrows():
        reg_date = reg_row['Datum']
        vehicles = reg_row['Menge']
        turbo_type = reg_row['Turbo_Typ']
        model_name = reg_row['Fahrzeugmodell']
        
        # Total cores to distribute: Vehicles × Failure_Rate × 1 Turbo/Vehicle
        total_cores = vehicles * failure_rate * 1
        
        # Distribute according to Weibull weights
        for month_offset, weight in zip(month_offsets, weibull_weights):
            cores_this_month = total_cores * weight
            
            order_date = reg_date + pd.DateOffset(months=month_offset)
            
            # Only include orders up to cutoff date
            if order_date <= pd.to_datetime('2026-12-31'):
                core_orders.append({
                    'Datum': order_date,
                    'Jahr': order_date.year,
                    'Monat': order_date.month,
                    'Core_Typ': turbo_type,
                    'Fahrzeugmodell': model_name,
                    'Menge': cores_this_month
                })
    
    df_orders = pd.DataFrame(core_orders)
    
    # Aggregate: GROUP BY Datum, Core_Typ, Fahrzeugmodell and SUM Menge
    df_orders_agg = df_orders.groupby(['Datum', 'Jahr', 'Monat', 'Core_Typ', 'Fahrzeugmodell'])['Menge'].sum().reset_index()
    
    # Round to integers and filter out very small values
    df_orders_agg['Menge'] = df_orders_agg['Menge'].round().astype(int)
    df_orders_agg = df_orders_agg[df_orders_agg['Menge'] > 0]
    
    return df_orders_agg

df_core_orders = generate_core_orders_v3(df_registrations)
df_core_orders.to_csv('03_Bestelldaten.csv', index=False, encoding='utf-8-sig')
print(f"✓ SCHRITT 3: Bestelldaten Weibull ({len(df_core_orders)} Zeilen)")

# ===================================================================
# SCHRITT 4: CORE SUPPLY MIT LOG-NORMAL MIXTURE (NEW v3.0)
# ===================================================================

def generate_core_supply_stage1_v3(df_core_orders):
    """
    Stage 1: Generate supply with Log-Normal Mixture lags, aggregate to monthly
    
    For each order:
    1. Apply return rate (65-75%)
    2. Apply lag distribution (3-channel log-normal mixture) to shift delivery date
    3. Aggregate by month and core type
    """
    
    supply = []
    
    for _, order_row in df_core_orders.iterrows():
        order_date = order_row['Datum']
        order_qty = order_row['Menge']
        core_type = order_row['Core_Typ']
        model_name = order_row['Fahrzeugmodell']
        
        # Return Rate: 65-75%
        return_rate = np.random.uniform(0.65, 0.75)
        cores_returned = order_qty * return_rate
        
        # Log-Normal Mixture: 3 Channels
        channels = [
            {'weight': 0.20, 'peak': 15, 'sigma': 0.3},    # Werkstatt
            {'weight': 0.35, 'peak': 45, 'sigma': 0.4},    # Flotte
            {'weight': 0.45, 'peak': 90, 'sigma': 0.5}     # Privat
        ]
        
        for channel in channels:
            weight = channel['weight']
            sigma = channel['sigma']
            peak = channel['peak']
            
            # Log-Normal Parameter: mu so dass Peak bei peak_days
            mu = np.log(peak) + sigma**2
            
            # Sample lag from log-normal distribution
            lag_days = lognorm.rvs(s=sigma, scale=np.exp(mu), size=1)[0]
            
            # Delivery date = Order date + lag
            delivery_date = order_date + pd.Timedelta(days=lag_days)
            
            # Quantity in this channel
            qty_channel = cores_returned * weight
            
            supply.append({
                'Anlieferdatum': delivery_date,
                'Core_Typ': core_type,
                'Fahrzeugmodell': model_name,
                'Menge': qty_channel,
                'Return_Lag_Tage': lag_days
            })
    
    df_supply = pd.DataFrame(supply)
    
    # Extract Year, Month
    df_supply['Jahr'] = df_supply['Anlieferdatum'].dt.year
    df_supply['Monat'] = df_supply['Anlieferdatum'].dt.month
    
    # Aggregate: GROUP BY Jahr, Monat, Core_Typ - sum quantities for same month
    df_supply_monthly = df_supply.groupby(['Jahr', 'Monat', 'Core_Typ', 'Fahrzeugmodell']).agg({
        'Menge': 'sum',
        'Return_Lag_Tage': 'mean'
    }).reset_index()
    
    # Create first-of-month date
    df_supply_monthly['Datum'] = pd.to_datetime(
        df_supply_monthly.assign(Day=1)[['Jahr', 'Monat', 'Day']].rename(columns={'Jahr': 'year', 'Monat': 'month', 'Day': 'day'})
    )
    
    return df_supply_monthly

def distribute_supply_to_weeks_v3(df_supply_monthly):
    """
    Stage 2: Distribute monthly quantities to 4 weeks with ±10% multiplier
    """
    
    supply_weekly = []
    
    for _, row in df_supply_monthly.iterrows():
        monthly_qty = row['Menge']
        delivery_date = row['Datum']
        core_type = row['Core_Typ']
        model_name = row['Fahrzeugmodell']
        
        # 4 Weeks
        for week in range(4):
            multiplier = np.random.uniform(0.9, 1.1)
            weekly_qty = (monthly_qty / 4) * multiplier
            
            week_date = delivery_date + pd.DateOffset(weeks=week)
            
            if weekly_qty > 0:
                supply_weekly.append({
                    'Anlieferdatum': week_date,
                    'Jahr': week_date.year,
                    'Monat': week_date.month,
                    'Woche': week + 1,
                    'Core_Typ': core_type,
                    'Fahrzeugmodell': model_name,
                    'Menge': int(weekly_qty)
                })
    
    return pd.DataFrame(supply_weekly)

df_supply_monthly = generate_core_supply_stage1_v3(df_core_orders)
df_supply_weekly = distribute_supply_to_weeks_v3(df_supply_monthly)
df_supply_weekly.to_csv('04_Core_Supply_Daten.csv', index=False, encoding='utf-8-sig')
print(f"✓ SCHRITT 4: Core Supply Log-Normal ({len(df_supply_weekly)} Zeilen)")

# ===================================================================
# SCHRITT 5: KOMPONENTEN-BREAKDOWN (unchanged)
# ===================================================================

def generate_component_data_v3(df_core_supply, turbo_type_data):
    component_data = []
    
    for _, supply_row in df_core_supply.iterrows():
        core_type = supply_row['Core_Typ']
        cores_arrived = supply_row['Menge']
        delivery_date = supply_row['Anlieferdatum']
        components = turbo_type_data[core_type]
        
        for comp_name, comp_specs in components.items():
            if comp_specs['Vorhanden'] == 1:
                reuse_rate = comp_specs['Wiederverwendbarkeit_%'] / 100
                usable_qty = cores_arrived * reuse_rate
                
                component_data.append({
                    'Datum': delivery_date,
                    'Jahr': delivery_date.year,
                    'Monat': delivery_date.month,
                    'Core_Typ': core_type,
                    'Fahrzeugmodell': supply_row['Fahrzeugmodell'],
                    'Komponente': comp_name,
                    'Menge_Cores': cores_arrived,
                    'Menge_Wiederverwendbar': int(usable_qty),
                    'Wiederverwendbarkeit_%': comp_specs['Wiederverwendbarkeit_%']
                })
    
    return pd.DataFrame(component_data)

df_components = generate_component_data_v3(df_supply_weekly, turbo_type_data)
df_components.to_csv('05_Komponenten_Daten.csv', index=False, encoding='utf-8-sig')
print(f"✓ SCHRITT 5: Komponenten-Daten ({len(df_components)} Zeilen)")


'''
# ===================================================================
# FEATURE ENGINEERING (same structure as v2.0)
# ===================================================================

df_monthly = df_supply_weekly.groupby(
    ['Jahr', 'Monat', 'Core_Typ', 'Fahrzeugmodell']
).agg({'Menge': 'sum', 'Return_Lag_Tage': 'mean'}).reset_index()

df_monthly['Datum'] = pd.to_datetime(df_monthly[['Jahr', 'Monat']].assign(DAY=1))

def get_lagged_registrations(row, df_registrations, lag_years):
    target_date = row['Datum'] - pd.DateOffset(years=lag_years)
    match = df_registrations[
        (df_registrations['Jahr'] == target_date.year) &
        (df_registrations['Monat'] == target_date.month) &
        (df_registrations['Fahrzeugmodell'] == row['Fahrzeugmodell'])
    ]
    return match['Menge'].values[0] if len(match) > 0 else 0

df_monthly['Lagged_Reg_5Y'] = df_monthly.apply(
    lambda row: get_lagged_registrations(row, df_registrations, 5), axis=1
)
df_monthly['Lagged_Reg_6Y'] = df_monthly.apply(
    lambda row: get_lagged_registrations(row, df_registrations, 6), axis=1
)

df_monthly['Month_Sin'] = np.sin(2 * np.pi * df_monthly['Monat'] / 12)
df_monthly['Month_Cos'] = np.cos(2 * np.pi * df_monthly['Monat'] / 12)

le = LabelEncoder()
df_monthly['Core_Type_Encoded'] = le.fit_transform(df_monthly['Core_Typ'])
df_monthly['Year'] = df_monthly['Jahr']
df_monthly['Target'] = df_monthly['Menge']

df_monthly.to_csv('06_Feature_Matrix.csv', index=False, encoding='utf-8-sig')
print(f"✓ SCHRITT 6: Feature Matrix ({len(df_monthly)} Zeilen)")

# ===================================================================
# XGBOOST TRAINING & FORECAST
# ===================================================================

feature_cols = ['Lagged_Reg_5Y', 'Lagged_Reg_6Y', 'Month_Sin', 'Month_Cos', 'Core_Type_Encoded', 'Year']

df_clean = df_monthly.dropna(subset=feature_cols + ['Target'])

X_train = df_clean[df_clean['Jahr'] < 2025][feature_cols]
y_train = df_clean[df_clean['Jahr'] < 2025]['Target']
X_val = df_clean[df_clean['Jahr'] == 2025][feature_cols]
y_val = df_clean[df_clean['Jahr'] == 2025]['Target']

model = xgb.XGBRegressor(n_estimators=100, max_depth=4, learning_rate=0.1,
                         subsample=0.8, colsample_bytree=0.8, random_state=42)
model.fit(X_train, y_train, verbose=False)

if len(y_val) > 0:
    y_pred_val = model.predict(X_val)
    mape = mean_absolute_percentage_error(y_val, y_pred_val)
    print(f"✓ SCHRITT 7: XGBoost Training (MAPE: {mape:.2%})")
else:
    print(f"✓ SCHRITT 7: XGBoost Training (no validation data)")

# Forecast 2026
forecast_data = []
for month in range(1, 13):
    date = pd.to_datetime(f'2026-{month:02d}-01')
    for model_name in df_registrations['Fahrzeugmodell'].unique():
        lag_5y_date = date - pd.DateOffset(years=5)
        lag_6y_date = date - pd.DateOffset(years=6)
        
        reg_5y = df_registrations[
            (df_registrations['Jahr'] == lag_5y_date.year) &
            (df_registrations['Monat'] == lag_5y_date.month) &
            (df_registrations['Fahrzeugmodell'] == model_name)
        ]
        reg_6y = df_registrations[
            (df_registrations['Jahr'] == lag_6y_date.year) &
            (df_registrations['Monat'] == lag_6y_date.month) &
            (df_registrations['Fahrzeugmodell'] == model_name)
        ]
        
        lagged_5y = reg_5y['Menge'].values[0] if len(reg_5y) > 0 else 0
        lagged_6y = reg_6y['Menge'].values[0] if len(reg_6y) > 0 else 0
        
        turbo_type = df_registrations[df_registrations['Fahrzeugmodell'] == model_name]['Turbo_Typ'].values[0]
        
        forecast_data.append({
            'Datum': date, 'Monat': month, 'Jahr': 2026,
            'Fahrzeugmodell': model_name, 'Core_Typ': turbo_type,
            'Lagged_Reg_5Y': lagged_5y, 'Lagged_Reg_6Y': lagged_6y,
            'Month_Sin': np.sin(2 * np.pi * month / 12),
            'Month_Cos': np.cos(2 * np.pi * month / 12),
            'Core_Type_Encoded': le.transform([turbo_type])[0],
            'Year': 2026
        })

df_forecast = pd.DataFrame(forecast_data)
df_forecast['Forecast'] = model.predict(df_forecast[feature_cols]).astype(int)
df_forecast.to_csv('07_Forecast_2026.csv', index=False, encoding='utf-8-sig')
print(f"✓ SCHRITT 8: Forecast 2026")

print("\n" + "="*70)
print("✓ PoC v3.0 ABGESCHLOSSEN")
print("="*70)
print("Generierte Dateien:")
print("  1. 01_Zulassungszahlen.csv")
print("  2. 02_Typ_Daten.csv")
print("  3. 03_Bestelldaten.csv (Weibull-verteilt)")
print("  4. 04_Core_Supply_Daten.csv (Log-Normal Mixture)")
print("  5. 05_Komponenten_Daten.csv")
print("  6. 06_Feature_Matrix.csv")
print("  7. 07_Forecast_2026.csv")
print("="*70)
'''