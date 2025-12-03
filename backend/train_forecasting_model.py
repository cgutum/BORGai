import pandas as pd
import numpy as np
import xgboost as xgb
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error, mean_squared_error, mean_absolute_percentage_error
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)

print("="*70)
print("AI Forecasting Model Training & Validation")
print("XGBoost for Weekly Core Supply Prediction")
print("Training: 2020-2024 | Validation: 2025 | Forecast: 2026")
print("="*70)

# ===================================================================
# STEP 1: Load Generated Data
# ===================================================================

print("\n📂 Step 1: Loading generated data...")

df_registrations = pd.read_csv('01_Zulassungszahlen.csv', encoding='utf-8-sig')
df_orders = pd.read_csv('03_Bestelldaten.csv', encoding='utf-8-sig')
df_supply = pd.read_csv('04_Core_Supply_Daten.csv', encoding='utf-8-sig')
df_components = pd.read_csv('05_Komponenten_Daten.csv', encoding='utf-8-sig')

# Convert dates
df_registrations['Datum'] = pd.to_datetime(df_registrations['Datum'])
df_orders['Datum'] = pd.to_datetime(df_orders['Datum'])
df_supply['Anlieferdatum'] = pd.to_datetime(df_supply['Anlieferdatum'])
df_components['Datum'] = pd.to_datetime(df_components['Datum'])

print(f"✓ Loaded {len(df_registrations)} registration records")
print(f"✓ Loaded {len(df_orders)} order records")
print(f"✓ Loaded {len(df_supply)} supply records")
print(f"✓ Loaded {len(df_components)} component records")

# ===================================================================
# STEP 2: Feature Engineering
# ===================================================================

print("\n🔧 Step 2: Feature engineering...")

# Aggregate supply to weekly level by Core Type and Date
df_supply['Week_Start'] = df_supply['Anlieferdatum'] - pd.to_timedelta(
    df_supply['Anlieferdatum'].dt.dayofweek, unit='D'
)

df_weekly = df_supply.groupby(['Week_Start', 'Core_Typ', 'Fahrzeugmodell']).agg({
    'Menge': 'sum'
}).reset_index()

df_weekly.columns = ['Datum', 'Core_Typ', 'Fahrzeugmodell', 'Target']

print(f"✓ Created {len(df_weekly)} weekly records")

# ===================================================================
# STEP 3: Create Comprehensive Features
# ===================================================================

print("\n🎯 Step 3: Creating features...")

# Initialize feature DataFrame
df_features = df_weekly.copy()

# 1. TEMPORAL FEATURES
df_features['Year'] = df_features['Datum'].dt.year
df_features['Month'] = df_features['Datum'].dt.month
df_features['Week'] = df_features['Datum'].dt.isocalendar().week
df_features['Quarter'] = df_features['Datum'].dt.quarter

# Cyclical encoding
df_features['Month_Sin'] = np.sin(2 * np.pi * df_features['Month'] / 12)
df_features['Month_Cos'] = np.cos(2 * np.pi * df_features['Month'] / 12)
df_features['Week_Sin'] = np.sin(2 * np.pi * df_features['Week'] / 52)
df_features['Week_Cos'] = np.cos(2 * np.pi * df_features['Week'] / 52)

print("✓ Added temporal features (year, month, week, cyclical encodings)")

# 2. LAGGED SUPPLY FEATURES (recent history)
def add_lag_features(df, col, lags):
    """Add lagged features for a specific column"""
    for lag in lags:
        df[f'{col}_Lag_{lag}W'] = df.groupby(['Core_Typ', 'Fahrzeugmodell'])[col].shift(lag)
    return df

# Add lags: 1, 2, 3, 4, 8, 12 weeks ago
df_features = add_lag_features(df_features, 'Target', [1, 2, 3, 4, 8, 12])

# Rolling statistics (Simple Moving Average)
df_features['Target_RollingMean_4W'] = df_features.groupby(['Core_Typ', 'Fahrzeugmodell'])['Target'].transform(
    lambda x: x.rolling(window=4, min_periods=1).mean()
)
df_features['Target_RollingStd_4W'] = df_features.groupby(['Core_Typ', 'Fahrzeugmodell'])['Target'].transform(
    lambda x: x.rolling(window=4, min_periods=1).std()
)
df_features['Target_RollingMean_12W'] = df_features.groupby(['Core_Typ', 'Fahrzeugmodell'])['Target'].transform(
    lambda x: x.rolling(window=12, min_periods=1).mean()
)

# Exponential Weighted Moving Average (captures recent trends better)
df_features['Target_EWM_4W'] = df_features.groupby(['Core_Typ', 'Fahrzeugmodell'])['Target'].transform(
    lambda x: x.ewm(span=4, adjust=False).mean()
)
df_features['Target_EWM_12W'] = df_features.groupby(['Core_Typ', 'Fahrzeugmodell'])['Target'].transform(
    lambda x: x.ewm(span=12, adjust=False).mean()
)

print("✓ Added lagged supply features (1, 2, 3, 4, 8, 12 weeks + EWM)")

# 3. REGISTRATION FEATURES (5-6 year lags)
def get_lagged_registrations(row, df_reg, lag_years):
    """Get registration quantity from lag_years ago"""
    target_date = row['Datum'] - pd.DateOffset(years=lag_years)
    
    # Get month start
    target_month = pd.Timestamp(year=target_date.year, month=target_date.month, day=1)
    
    match = df_reg[
        (df_reg['Datum'] == target_month) &
        (df_reg['Fahrzeugmodell'] == row['Fahrzeugmodell'])
    ]
    return match['Menge'].values[0] if len(match) > 0 else 0

print("  Computing lagged registrations (5-6 years)...")
df_features['Lagged_Reg_5Y'] = df_features.apply(
    lambda row: get_lagged_registrations(row, df_registrations, 5), axis=1
)
df_features['Lagged_Reg_6Y'] = df_features.apply(
    lambda row: get_lagged_registrations(row, df_registrations, 6), axis=1
)

print("✓ Added registration features (5-6 year lags)")

# 4. ORDER FEATURES (recent orders)
# Aggregate orders to weekly
df_orders['Week_Start'] = df_orders['Datum'] - pd.to_timedelta(
    df_orders['Datum'].dt.dayofweek, unit='D'
)

df_orders_weekly = df_orders.groupby(['Week_Start', 'Core_Typ', 'Fahrzeugmodell']).agg({
    'Menge': 'sum'
}).reset_index()
df_orders_weekly.columns = ['Datum', 'Core_Typ', 'Fahrzeugmodell', 'Order_Qty']

# Merge with features
df_features = df_features.merge(
    df_orders_weekly,
    on=['Datum', 'Core_Typ', 'Fahrzeugmodell'],
    how='left'
)
df_features['Order_Qty'] = df_features['Order_Qty'].fillna(0)

# Lagged orders (4, 8, 12 weeks ago - typical return lag)
df_features = add_lag_features(df_features, 'Order_Qty', [4, 8, 12])

# Enhanced rolling order statistics
df_features['Order_RollingMean_8W'] = df_features.groupby(['Core_Typ', 'Fahrzeugmodell'])['Order_Qty'].transform(
    lambda x: x.rolling(window=8, min_periods=1).mean()
)
df_features['Order_RollingMean_12W'] = df_features.groupby(['Core_Typ', 'Fahrzeugmodell'])['Order_Qty'].transform(
    lambda x: x.rolling(window=12, min_periods=1).mean()
)
df_features['Order_RollingStd_8W'] = df_features.groupby(['Core_Typ', 'Fahrzeugmodell'])['Order_Qty'].transform(
    lambda x: x.rolling(window=8, min_periods=1).std().fillna(0)
)

print("✓ Added order features (current + lagged 4, 8, 12 weeks + rolling stats)")

# 5. COMPONENT REUSABILITY FEATURES
# Calculate average reusability rate per core type from components data
component_reuse = df_components.groupby('Core_Typ').agg({
    'Wiederverwendbarkeit_%': 'mean'
}).reset_index()
component_reuse.columns = ['Core_Typ', 'Avg_Reusability_Rate']

df_features = df_features.merge(component_reuse, on='Core_Typ', how='left')

print("✓ Added component reusability features")

# 6. TREND FEATURES
# Time since start (weeks)
min_date = df_features['Datum'].min()
df_features['Weeks_Since_Start'] = (df_features['Datum'] - min_date).dt.days / 7

print("✓ Added trend features")

# 7. CATEGORICAL ENCODING
le_core = LabelEncoder()
le_model = LabelEncoder()

df_features['Core_Type_Encoded'] = le_core.fit_transform(df_features['Core_Typ'])
df_features['Vehicle_Model_Encoded'] = le_model.fit_transform(df_features['Fahrzeugmodell'])

print("✓ Encoded categorical features")

print(f"\n✓ Total features created: {len(df_features.columns)}")

# ===================================================================
# STEP 4: Define Feature Columns & Split Data
# ===================================================================

print("\n📊 Step 4: Preparing training/validation data...")

feature_cols = [
    # Temporal
    'Year', 'Month', 'Week', 'Quarter',
    'Month_Sin', 'Month_Cos', 'Week_Sin', 'Week_Cos',
    
    # Lagged supply
    'Target_Lag_1W', 'Target_Lag_2W', 'Target_Lag_3W', 'Target_Lag_4W',
    'Target_Lag_8W', 'Target_Lag_12W',
    'Target_RollingMean_4W', 'Target_RollingStd_4W', 'Target_RollingMean_12W',
    'Target_EWM_4W', 'Target_EWM_12W',
    
    # Registration lags
    'Lagged_Reg_5Y', 'Lagged_Reg_6Y',
    
    # Orders
    'Order_Qty', 'Order_Qty_Lag_4W', 'Order_Qty_Lag_8W', 'Order_Qty_Lag_12W',
    'Order_RollingMean_8W', 'Order_RollingMean_12W', 'Order_RollingStd_8W',
    
    # Reusability
    'Avg_Reusability_Rate',
    
    # Trend
    'Weeks_Since_Start',
    
    # Categorical
    'Core_Type_Encoded', 'Vehicle_Model_Encoded'
]

# Clean data
df_clean = df_features[feature_cols + ['Target', 'Datum', 'Core_Typ', 'Fahrzeugmodell']].copy()
df_clean = df_clean.dropna()

print(f"✓ Clean dataset: {len(df_clean)} records")
print(f"✓ Features: {len(feature_cols)}")

# Split: Train (< 2025), Validation (2025), Forecast (2026)
df_train = df_clean[df_clean['Datum'] < '2025-01-01'].copy()
df_val = df_clean[(df_clean['Datum'] >= '2025-01-01') & (df_clean['Datum'] < '2026-01-01')].copy()

X_train = df_train[feature_cols]
y_train = df_train['Target']
X_val = df_val[feature_cols]
y_val = df_val['Target']

print(f"\n✓ Training set: {len(X_train)} records ({df_train['Datum'].min()} to {df_train['Datum'].max()})")
print(f"✓ Validation set: {len(X_val)} records ({df_val['Datum'].min()} to {df_val['Datum'].max()})")

# ===================================================================
# STEP 5: Train XGBoost Model with Hyperparameter Tuning
# ===================================================================

print("\n🤖 Step 5: Training XGBoost model with optimization...")

# Improved hyperparameters for better generalization
model = xgb.XGBRegressor(
    n_estimators=500,              # More trees for better learning
    max_depth=4,                   # Reduced depth to prevent overfitting
    learning_rate=0.03,            # Lower learning rate for finer adjustments
    subsample=0.7,                 # More aggressive subsampling
    colsample_bytree=0.7,          # Reduced feature sampling
    colsample_bylevel=0.7,         # Additional feature sampling per level
    min_child_weight=5,            # Higher to prevent overfitting on small data
    gamma=0.2,                     # More conservative splitting
    reg_alpha=0.3,                 # Stronger L1 regularization
    reg_lambda=2.0,                # Stronger L2 regularization
    random_state=42,
    n_jobs=-1,
    early_stopping_rounds=50       # Stop if no improvement
)

model.fit(
    X_train, y_train,
    eval_set=[(X_train, y_train), (X_val, y_val)],
    verbose=False
)

print(f"✓ Model training completed (best iteration: {model.best_iteration})")

# ===================================================================
# STEP 6: Validation & Metrics
# ===================================================================

print("\n📈 Step 6: Model validation...")

y_pred_train = model.predict(X_train)
y_pred_val = model.predict(X_val)

# Metrics
mae_train = mean_absolute_error(y_train, y_pred_train)
rmse_train = np.sqrt(mean_squared_error(y_train, y_pred_train))

# Calculate MAPE manually, excluding zero or near-zero values to avoid division errors
def safe_mape(y_true, y_pred, threshold=1.0):
    """Calculate MAPE excluding values below threshold to avoid division by near-zero"""
    mask = np.abs(y_true) >= threshold
    if mask.sum() == 0:
        return 0.0
    return np.mean(np.abs((y_true[mask] - y_pred[mask]) / y_true[mask])) * 100

mape_train = safe_mape(y_train.values, y_pred_train)

mae_val = mean_absolute_error(y_val, y_pred_val)
rmse_val = np.sqrt(mean_squared_error(y_val, y_pred_val))
mape_val = safe_mape(y_val.values, y_pred_val)

print("\n📊 Model Performance:")
print(f"  Training:")
print(f"    MAE:  {mae_train:.2f} units")
print(f"    RMSE: {rmse_train:.2f} units")
print(f"    MAPE: {mape_train:.2f}%")
print(f"\n  Validation (2025):")
print(f"    MAE:  {mae_val:.2f} units")
print(f"    RMSE: {rmse_val:.2f} units")
print(f"    MAPE: {mape_val:.2f}%")

# Add predictions to validation set
df_val['Predicted'] = y_pred_val
df_val['Residual'] = df_val['Target'] - df_val['Predicted']

# Save validation results
df_val[['Datum', 'Core_Typ', 'Fahrzeugmodell', 'Target', 'Predicted', 'Residual']].to_csv(
    'validation_results_2025.csv', index=False, encoding='utf-8-sig'
)
print("\n✓ Saved validation_results_2025.csv")

# ===================================================================
# STEP 7: Feature Importance Analysis
# ===================================================================

print("\n🎯 Step 7: Feature importance analysis...")

importance_df = pd.DataFrame({
    'Feature': feature_cols,
    'Importance': model.feature_importances_
}).sort_values('Importance', ascending=False)

print("\nTop 10 Most Important Features:")
for idx, row in importance_df.head(10).iterrows():
    print(f"  {row['Feature']:30s}: {row['Importance']:.4f}")

importance_df.to_csv('feature_importance.csv', index=False, encoding='utf-8-sig')
print("\n✓ Saved feature_importance.csv")

# ===================================================================
# STEP 8: Generate 2026 Forecast (6 months, weekly)
# ===================================================================

print("\n🔮 Step 8: Generating 2026 forecast (26 weeks)...")

# Create forecast dates (first 26 weeks of 2026)
forecast_start = pd.Timestamp('2026-01-05')  # First Monday of 2026
forecast_dates = [forecast_start + pd.Timedelta(weeks=i) for i in range(26)]

# Get unique combinations
core_types = df_clean['Core_Typ'].unique()
vehicle_models = df_clean['Fahrzeugmodell'].unique()

forecast_records = []

for date in forecast_dates:
    for core_type in core_types:
        for vehicle_model in vehicle_models:
            # Filter historical data for this combination
            hist_data = df_clean[
                (df_clean['Core_Typ'] == core_type) &
                (df_clean['Fahrzeugmodell'] == vehicle_model) &
                (df_clean['Datum'] < date)
            ].sort_values('Datum')
            
            if len(hist_data) < 12:  # Need at least 12 weeks of history
                continue
            
            # Build features for this forecast point
            features = {}
            
            # Temporal
            features['Year'] = date.year
            features['Month'] = date.month
            features['Week'] = date.isocalendar().week
            features['Quarter'] = date.quarter
            features['Month_Sin'] = np.sin(2 * np.pi * date.month / 12)
            features['Month_Cos'] = np.cos(2 * np.pi * date.month / 12)
            features['Week_Sin'] = np.sin(2 * np.pi * date.isocalendar().week / 52)
            features['Week_Cos'] = np.cos(2 * np.pi * date.isocalendar().week / 52)
            
            # Lagged supply (use last available values)
            for lag in [1, 2, 3, 4, 8, 12]:
                if len(hist_data) >= lag:
                    features[f'Target_Lag_{lag}W'] = hist_data.iloc[-lag]['Target']
                else:
                    features[f'Target_Lag_{lag}W'] = 0
            
            # Rolling statistics
            if len(hist_data) >= 4:
                features['Target_RollingMean_4W'] = hist_data.tail(4)['Target'].mean()
                features['Target_RollingStd_4W'] = hist_data.tail(4)['Target'].std()
                # EWM with span=4
                features['Target_EWM_4W'] = hist_data.tail(8)['Target'].ewm(span=4, adjust=False).mean().iloc[-1]
            else:
                features['Target_RollingMean_4W'] = hist_data['Target'].mean()
                features['Target_RollingStd_4W'] = 0
                features['Target_EWM_4W'] = hist_data['Target'].mean()
            
            if len(hist_data) >= 12:
                features['Target_RollingMean_12W'] = hist_data.tail(12)['Target'].mean()
                # EWM with span=12
                features['Target_EWM_12W'] = hist_data.tail(24)['Target'].ewm(span=12, adjust=False).mean().iloc[-1]
            else:
                features['Target_RollingMean_12W'] = hist_data['Target'].mean()
                features['Target_EWM_12W'] = hist_data['Target'].mean()
            
            # Registration lags
            features['Lagged_Reg_5Y'] = get_lagged_registrations(
                pd.Series({'Datum': date, 'Fahrzeugmodell': vehicle_model}),
                df_registrations, 5
            )
            features['Lagged_Reg_6Y'] = get_lagged_registrations(
                pd.Series({'Datum': date, 'Fahrzeugmodell': vehicle_model}),
                df_registrations, 6
            )
            
            # Order features (use historical average as proxy)
            order_hist = df_orders_weekly[
                (df_orders_weekly['Core_Typ'] == core_type) &
                (df_orders_weekly['Fahrzeugmodell'] == vehicle_model)
            ]
            features['Order_Qty'] = order_hist['Order_Qty'].tail(4).mean() if len(order_hist) > 0 else 0
            features['Order_Qty_Lag_4W'] = order_hist['Order_Qty'].tail(8).head(4).mean() if len(order_hist) > 4 else 0
            features['Order_Qty_Lag_8W'] = order_hist['Order_Qty'].tail(12).head(4).mean() if len(order_hist) > 8 else 0
            features['Order_Qty_Lag_12W'] = order_hist['Order_Qty'].tail(16).head(4).mean() if len(order_hist) > 12 else 0
            features['Order_RollingMean_8W'] = order_hist['Order_Qty'].tail(8).mean() if len(order_hist) > 0 else 0
            features['Order_RollingMean_12W'] = order_hist['Order_Qty'].tail(12).mean() if len(order_hist) > 0 else 0
            features['Order_RollingStd_8W'] = order_hist['Order_Qty'].tail(8).std() if len(order_hist) > 0 else 0
            
            # Reusability
            features['Avg_Reusability_Rate'] = component_reuse[
                component_reuse['Core_Typ'] == core_type
            ]['Avg_Reusability_Rate'].values[0] if len(component_reuse[component_reuse['Core_Typ'] == core_type]) > 0 else 70
            
            # Trend
            features['Weeks_Since_Start'] = (date - min_date).days / 7
            
            # Categorical
            features['Core_Type_Encoded'] = le_core.transform([core_type])[0]
            features['Vehicle_Model_Encoded'] = le_model.transform([vehicle_model])[0]
            
            forecast_records.append({
                'Datum': date,
                'Core_Typ': core_type,
                'Fahrzeugmodell': vehicle_model,
                **features
            })

df_forecast = pd.DataFrame(forecast_records)

print(f"✓ Created {len(df_forecast)} forecast records")

# Make predictions
X_forecast = df_forecast[feature_cols]
y_forecast = model.predict(X_forecast)

df_forecast['Forecast'] = y_forecast.astype(int)
df_forecast['Forecast'] = df_forecast['Forecast'].clip(lower=0)  # No negative predictions

# ===================================================================
# STEP 9: Prediction Intervals (Confidence Bands)
# ===================================================================

print("\n📊 Step 9: Calculating prediction intervals...")

# Use validation residuals to estimate prediction uncertainty
residuals = df_val['Residual'].values
residual_std = np.std(residuals)

# 95% confidence intervals (approximately ±2 standard deviations)
df_forecast['Lower_95'] = (df_forecast['Forecast'] - 2 * residual_std).clip(lower=0).astype(int)
df_forecast['Upper_95'] = (df_forecast['Forecast'] + 2 * residual_std).astype(int)

# 80% confidence intervals (approximately ±1.28 standard deviations)
df_forecast['Lower_80'] = (df_forecast['Forecast'] - 1.28 * residual_std).clip(lower=0).astype(int)
df_forecast['Upper_80'] = (df_forecast['Forecast'] + 1.28 * residual_std).astype(int)

print(f"✓ Residual standard deviation: {residual_std:.2f} units")
print(f"✓ 95% CI width: ±{2*residual_std:.2f} units")
print(f"✓ 80% CI width: ±{1.28*residual_std:.2f} units")

# Save forecast
df_forecast_output = df_forecast[['Datum', 'Core_Typ', 'Fahrzeugmodell', 'Forecast', 
                                   'Lower_80', 'Upper_80', 'Lower_95', 'Upper_95']]
df_forecast_output.to_csv('forecast_2026_weekly.csv', index=False, encoding='utf-8-sig')
print("\n✓ Saved forecast_2026_weekly.csv")

# ===================================================================
# STEP 10: Summary Statistics
# ===================================================================

print("\n" + "="*70)
print("FORECAST SUMMARY")
print("="*70)

print("\n📈 Forecast Statistics (2026, 26 weeks):")
for core_type in core_types:
    forecast_subset = df_forecast[df_forecast['Core_Typ'] == core_type]
    print(f"\n  {core_type}:")
    print(f"    Mean forecast: {forecast_subset['Forecast'].mean():.1f} units/week")
    print(f"    Total forecast: {forecast_subset['Forecast'].sum():,} units (26 weeks)")
    print(f"    Min: {forecast_subset['Forecast'].min()}, Max: {forecast_subset['Forecast'].max()}")

print("\n📊 Files Generated:")
print("  1. validation_results_2025.csv - Validation predictions vs actual")
print("  2. feature_importance.csv - Feature importance rankings")
print("  3. forecast_2026_weekly.csv - 26-week forecast with confidence intervals")

print("\n✓ AI Forecasting completed successfully!")
print("="*70)
