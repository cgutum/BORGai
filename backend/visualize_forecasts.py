import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime

# Set style
sns.set_style("whitegrid")
plt.rcParams['figure.figsize'] = (14, 8)
plt.rcParams['font.size'] = 10

print("="*70)
print("Creating Forecast Visualizations")
print("="*70)

# Load data
df_val = pd.read_csv('validation_results_2025.csv', encoding='utf-8-sig')
df_forecast = pd.read_csv('forecast_2026_weekly.csv', encoding='utf-8-sig')
df_importance = pd.read_csv('feature_importance.csv', encoding='utf-8-sig')

# Convert dates
df_val['Datum'] = pd.to_datetime(df_val['Datum'])
df_forecast['Datum'] = pd.to_datetime(df_forecast['Datum'])

# ===================================================================
# PLOT 1: Validation Performance (2024) with KPIs
# ===================================================================

print("\n📊 Creating Plot 1: Validation Performance...")

# Calculate KPIs
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

# Safe MAPE calculation (same as in training script)
def safe_mape(y_true, y_pred, threshold=1.0):
    """Calculate MAPE excluding values below threshold to avoid division by near-zero."""
    y_true = np.array(y_true)
    y_pred = np.array(y_pred)
    mask = np.abs(y_true) >= threshold
    if mask.sum() == 0:
        return 0.0
    return np.mean(np.abs((y_true[mask] - y_pred[mask]) / y_true[mask])) * 100

mae = mean_absolute_error(df_val['Target'], df_val['Predicted'])
rmse = np.sqrt(mean_squared_error(df_val['Target'], df_val['Predicted']))
mape = safe_mape(df_val['Target'], df_val['Predicted'])
r2 = r2_score(df_val['Target'], df_val['Predicted'])
avg_actual = df_val['Target'].mean()
avg_predicted = df_val['Predicted'].mean()
avg_deviation = np.mean(df_val['Residual'])
std_deviation = np.std(df_val['Residual'])

fig, axes = plt.subplots(2, 2, figsize=(16, 10))
fig.suptitle('Model Validation Performance (2025) - Training Period: 2020-2024', fontsize=16, fontweight='bold')

# Aggregate by week for cleaner visualization
df_val_agg = df_val.groupby('Datum').agg({
    'Target': 'sum',
    'Predicted': 'sum'
}).reset_index()

# Plot 1a: Actual vs Predicted
ax = axes[0, 0]
ax.plot(df_val_agg['Datum'], df_val_agg['Target'], 
        label='Actual', color='#2E86AB', linewidth=2, marker='o', markersize=3)
ax.plot(df_val_agg['Datum'], df_val_agg['Predicted'], 
        label='Predicted', color='#A23B72', linewidth=2, marker='s', markersize=3, linestyle='--')
ax.set_xlabel('Date (2025)')
ax.set_ylabel('Weekly Supply Quantity')
ax.set_title('Actual vs Predicted Supply (Aggregated)')
ax.legend()
ax.grid(True, alpha=0.3)

# Plot 1b: KPI Summary
ax = axes[0, 1]
ax.axis('off')

kpi_text = f"""
MODEL PERFORMANCE METRICS

Accuracy Metrics:
  MAE (Mean Absolute Error):     {mae:.2f} units
  RMSE (Root Mean Squared Error): {rmse:.2f} units
  MAPE (Mean Abs % Error):       {mape:.1f}%
  R² Score:                      {r2:.3f}

Central Tendency:
  Average Actual:                {avg_actual:.2f} units/week
  Average Predicted:             {avg_predicted:.2f} units/week
  Average Deviation:             {avg_deviation:.2f} units

Residual Statistics:
  Mean Residual:                 {avg_deviation:.2f} units
  Std Dev of Residuals:          {std_deviation:.2f} units
  
Interpretation:
  • Model explains {r2*100:.1f}% of variance
  • Typical error: ±{rmse:.1f} units per week
  • Prediction bias: {avg_deviation:.2f} units
"""

ax.text(0.1, 0.95, kpi_text, transform=ax.transAxes, 
        fontsize=11, verticalalignment='top', family='monospace',
        bbox=dict(boxstyle='round', facecolor='#f0f0f0', alpha=0.8, pad=1))

# Plot 1c: Residuals over time
ax = axes[1, 0]
df_val_agg['Residual'] = df_val_agg['Target'] - df_val_agg['Predicted']
ax.plot(df_val_agg['Datum'], df_val_agg['Residual'], 
        color='#C73E1D', linewidth=2, marker='o', markersize=3)
ax.axhline(y=0, color='black', linestyle='--', linewidth=1)
ax.fill_between(df_val_agg['Datum'], 0, df_val_agg['Residual'], 
                alpha=0.3, color='#C73E1D')
ax.set_xlabel('Date (2025)')
ax.set_ylabel('Residual (Actual - Predicted)')
ax.set_title('Residuals Over Time')
ax.grid(True, alpha=0.3)

# Plot 1d: Residual distribution
ax = axes[1, 1]
ax.hist(df_val['Residual'], bins=30, color='#6A994E', alpha=0.7, edgecolor='black')
ax.axvline(x=0, color='red', linestyle='--', linewidth=2)
ax.set_xlabel('Residual (Actual - Predicted)')
ax.set_ylabel('Frequency')
ax.set_title('Residual Distribution')
mean_residual = df_val['Residual'].mean()
std_residual = df_val['Residual'].std()
ax.text(0.05, 0.95, f'Mean: {mean_residual:.2f}\nStd: {std_residual:.2f}', 
        transform=ax.transAxes, fontsize=10, verticalalignment='top',
        bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.5))
ax.grid(True, alpha=0.3, axis='y')

plt.tight_layout()
plt.savefig('forecast_plot_1_validation.png', dpi=300, bbox_inches='tight')
print("✓ Saved: forecast_plot_1_validation.png")
plt.close()

# ===================================================================
# PLOT 2: Feature Importance
# ===================================================================

print("📊 Creating Plot 2: Feature Importance...")

fig, axes = plt.subplots(1, 2, figsize=(16, 8))
fig.suptitle('Feature Importance Analysis', fontsize=16, fontweight='bold')

# Plot 2a: Top 15 features
top_features = df_importance.head(15)
ax = axes[0]
colors = plt.cm.viridis(np.linspace(0.3, 0.9, len(top_features)))
bars = ax.barh(range(len(top_features)), top_features['Importance'], color=colors)
ax.set_yticks(range(len(top_features)))
ax.set_yticklabels(top_features['Feature'])
ax.invert_yaxis()
ax.set_xlabel('Importance Score')
ax.set_title('Top 15 Most Important Features')
ax.grid(True, alpha=0.3, axis='x')

# Add value labels
for i, (idx, row) in enumerate(top_features.iterrows()):
    ax.text(row['Importance'], i, f" {row['Importance']:.4f}", 
            va='center', fontsize=9)

# Plot 2b: Feature categories
def categorize_feature(feat_name):
    if 'Lag' in feat_name or 'Rolling' in feat_name:
        return 'Lagged/Rolling'
    elif 'Sin' in feat_name or 'Cos' in feat_name:
        return 'Cyclical Time'
    elif 'Year' in feat_name or 'Month' in feat_name or 'Week' in feat_name or 'Quarter' in feat_name:
        return 'Temporal'
    elif 'Reg' in feat_name:
        return 'Registrations'
    elif 'Order' in feat_name:
        return 'Orders'
    elif 'Reusability' in feat_name:
        return 'Reusability'
    elif 'Encoded' in feat_name:
        return 'Categorical'
    else:
        return 'Other'

df_importance['Category'] = df_importance['Feature'].apply(categorize_feature)
category_importance = df_importance.groupby('Category')['Importance'].sum().sort_values(ascending=False)

ax = axes[1]
colors_cat = ['#2E86AB', '#A23B72', '#F18F01', '#C73E1D', '#6A994E', '#9D4EDD', '#06FFA5']
wedges, texts, autotexts = ax.pie(category_importance.values, 
                                    labels=category_importance.index,
                                    autopct='%1.1f%%',
                                    colors=colors_cat[:len(category_importance)],
                                    startangle=90)
ax.set_title('Feature Importance by Category')

# Make percentage text more readable
for autotext in autotexts:
    autotext.set_color('white')
    autotext.set_fontsize(10)
    autotext.set_fontweight('bold')

plt.tight_layout()
plt.savefig('forecast_plot_2_importance.png', dpi=300, bbox_inches='tight')
print("✓ Saved: forecast_plot_2_importance.png")
plt.close()

# ===================================================================
# PLOT 3: Validation Only (2025) with Confidence Bands - By Core Type
# ===================================================================

print("📊 Creating Plot 3: Validation with Confidence Bands (By Core Type)...")

fig = plt.figure(figsize=(20, 14))
gs = fig.add_gridspec(3, 4, width_ratios=[2.55, 2.55, 2.55, 2.35], hspace=0.3, wspace=0.3)
fig.suptitle('Model Validation Performance (2025) - Actual vs Predicted with Confidence by Core Type', 
             fontsize=16, fontweight='bold')

core_types = df_val['Core_Typ'].unique()
colors_cores = ['#2E86AB', '#A23B72', '#F18F01']

for idx, core_type in enumerate(core_types[:3]):
    ax = fig.add_subplot(gs[idx, :3])
    ax.set_xlim(df_val['Datum'].min(), df_val['Datum'].max())
    ax.margins(x=0.15)  # Add 15% margin to compress x-axis
    
    # Get validation data for this core type
    df_val_core = df_val[df_val['Core_Typ'] == core_type].copy()
    
    # Calculate confidence intervals per core type
    residual_std_core = df_val_core['Residual'].std()
    df_val_core_agg = df_val_core.groupby('Datum').agg({'Target': 'sum', 'Predicted': 'sum'}).reset_index()
    df_val_core_agg['Lower_80'] = df_val_core_agg['Predicted'] - 1.282 * residual_std_core  # 80% CI
    df_val_core_agg['Upper_80'] = df_val_core_agg['Predicted'] + 1.282 * residual_std_core
    
    # Plot confidence band (very subtle)
    ax.fill_between(df_val_core_agg['Datum'], df_val_core_agg['Lower_80'], df_val_core_agg['Upper_80'],
                    alpha=0.08, color=colors_cores[idx], label='80% Confidence Interval')
    
    # Plot actual and predicted
    ax.plot(df_val_core_agg['Datum'], df_val_core_agg['Target'], 
            label='Actual', color=colors_cores[idx], linewidth=2.5, marker='o', markersize=5, zorder=3, alpha=0.9)
    ax.plot(df_val_core_agg['Datum'], df_val_core_agg['Predicted'], 
            label='Predicted', color=colors_cores[idx], linewidth=2, marker='s', markersize=4, 
            linestyle='--', zorder=3, alpha=0.7)
    
    ax.set_xlabel('Date (2025)', fontsize=11)
    ax.set_ylabel('Weekly Supply Quantity', fontsize=11)
    ax.set_title(f'{core_type}')
    ax.legend(loc='upper left', fontsize=10)
    ax.grid(True, alpha=0.3)
    
    # Add core-specific statistics
    mae_core = mean_absolute_error(df_val_core['Target'], df_val_core['Predicted'])
    rmse_core = np.sqrt(mean_squared_error(df_val_core['Target'], df_val_core['Predicted']))
    r2_core = r2_score(df_val_core['Target'], df_val_core['Predicted'])
    
    stats_text = f'MAE: {mae_core:.1f} | RMSE: {rmse_core:.1f} | R²: {r2_core:.3f}'
    ax.text(0.98, 0.98, stats_text, transform=ax.transAxes, 
            fontsize=9, verticalalignment='top', horizontalalignment='right',
            bbox=dict(boxstyle='round', facecolor='white', alpha=0.85))

# Add overall KPI panel on the right
ax_kpi = fig.add_subplot(gs[:, 3])
ax_kpi.axis('off')

kpi_text = f"""
OVERALL MODEL PERFORMANCE

Accuracy Metrics:
  MAE:     {mae:.2f} units
  RMSE:    {rmse:.2f} units
  MAPE:    {mape:.1f}%
  R² Score: {r2:.3f}

Central Tendency:
  Avg Actual:    {avg_actual:.2f}
  Avg Predicted: {avg_predicted:.2f}
  Avg Deviation: {avg_deviation:.2f}

Residual Statistics:
  Mean Residual: {avg_deviation:.2f}
  Std Deviation: {std_deviation:.2f}
  
Validation Period:
  Start: {df_val['Datum'].min().strftime('%Y-%m-%d')}
  End:   {df_val['Datum'].max().strftime('%Y-%m-%d')}
  Weeks: {len(df_val.groupby('Datum'))}
  
Interpretation:
  • Explains {r2*100:.1f}% of variance
  • Typical error: ±{rmse:.1f}
  • Bias: {avg_deviation:.2f} units
  • 80% CI: ±{1.282*std_deviation:.1f}
"""

ax_kpi.text(0.05, 0.98, kpi_text, transform=ax_kpi.transAxes, 
            fontsize=10, verticalalignment='top', family='monospace',
            bbox=dict(boxstyle='round', facecolor='#f0f0f0', alpha=0.8, pad=1))

plt.savefig('forecast_plot_3_validation_confidence.png', dpi=300, bbox_inches='tight')
print("✓ Saved: forecast_plot_3_validation_confidence.png")
plt.close()

# ===================================================================
# PLOT 4: Seamless Timeline - Validation (2025) + Forecast (2026)
# ===================================================================

print("📊 Creating Plot 4: Seamless Timeline...")

fig, axes = plt.subplots(3, 1, figsize=(18, 14))
fig.suptitle('Seamless Timeline: Validation (2025) → Forecast (2026)', 
             fontsize=16, fontweight='bold')

core_types = df_forecast['Core_Typ'].unique()
colors_cores = ['#2E86AB', '#A23B72', '#F18F01']

for idx, core_type in enumerate(core_types[:3]):
    ax = axes[idx]
    
    # Get validation data (2025)
    df_val_core = df_val[df_val['Core_Typ'] == core_type].groupby('Datum').agg({
        'Target': 'sum',
        'Predicted': 'sum'
    }).reset_index()
    
    # Get forecast data (2026)
    df_forecast_core = df_forecast[df_forecast['Core_Typ'] == core_type].groupby('Datum').agg({
        'Forecast': 'sum',
        'Lower_80': 'sum',
        'Upper_80': 'sum'
    }).reset_index()
    
    # Plot validation period (2025) - actual vs predicted
    ax.plot(df_val_core['Datum'], df_val_core['Target'], 
            color=colors_cores[idx], linewidth=2.5, marker='o', markersize=4,
            label='2025 Actual', alpha=0.9)
    ax.plot(df_val_core['Datum'], df_val_core['Predicted'], 
            color=colors_cores[idx], linewidth=2, marker='s', markersize=4,
            linestyle='--', label='2025 Predicted', alpha=0.7)
    
    # Plot forecast with confidence bands (2026)
    ax.fill_between(df_forecast_core['Datum'], df_forecast_core['Lower_80'], 
                     df_forecast_core['Upper_80'],
                     alpha=0.25, color='#E85D04', label='2026 Forecast 80% CI')
    ax.plot(df_forecast_core['Datum'], df_forecast_core['Forecast'], 
            color='#E85D04', linewidth=3, marker='D', markersize=5, 
            label='2026 Forecast')
    
    # Add vertical separator
    if len(df_val_core) > 0:
        sep_2025_2026 = pd.Timestamp('2026-01-01')
        ax.axvline(x=sep_2025_2026, color='gray', linestyle=':', linewidth=2, alpha=0.5)
        ax.text(sep_2025_2026, ax.get_ylim()[1]*0.95, ' 2026', fontsize=10, color='gray', fontweight='bold')
    
    ax.set_xlabel('Date')
    ax.set_ylabel('Weekly Supply Quantity')
    ax.set_title(f'{core_type}')
    ax.legend(loc='upper left', fontsize=9, ncol=2)
    ax.grid(True, alpha=0.3)
    
    # Add statistics
    if len(df_forecast_core) > 0:
        mean_forecast = df_forecast_core['Forecast'].mean()
        total_forecast = df_forecast_core['Forecast'].sum()
        ax.text(0.98, 0.98, f'2026 Forecast\nMean: {mean_forecast:.1f}/week\nTotal: {total_forecast:,.0f} (26w)',
                transform=ax.transAxes, fontsize=9, verticalalignment='top', horizontalalignment='right',
                bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))

plt.tight_layout()
plt.savefig('forecast_plot_4_seamless_timeline.png', dpi=300, bbox_inches='tight')
print("✓ Saved: forecast_plot_4_seamless_timeline.png")
plt.close()

# ===================================================================
# PLOT 5: Core Type Comparison
# ===================================================================

print("📊 Creating Plot 5: Core Type Comparison...")

fig, axes = plt.subplots(2, 2, figsize=(16, 10))
fig.suptitle('Forecast Comparison by Core Type', fontsize=16, fontweight='bold')

# Aggregate forecasts by core type
df_forecast_by_core = df_forecast.groupby(['Core_Typ', 'Datum']).agg({
    'Forecast': 'sum',
    'Lower_80': 'sum',
    'Upper_80': 'sum'
}).reset_index()

# Plot 4a: Stacked area chart
ax = axes[0, 0]
pivot_data = df_forecast_by_core.pivot(index='Datum', columns='Core_Typ', values='Forecast')
pivot_data.plot.area(ax=ax, alpha=0.7, color=colors_cores)
ax.set_xlabel('Week (2027)')
ax.set_ylabel('Weekly Supply Quantity')
ax.set_title('Forecast by Core Type (Stacked)')
ax.legend(title='Core Type', loc='upper left')
ax.grid(True, alpha=0.3)

# Plot 4b: Line chart
ax = axes[0, 1]
for idx, core_type in enumerate(core_types):
    df_core = df_forecast_by_core[df_forecast_by_core['Core_Typ'] == core_type]
    ax.plot(df_core['Datum'], df_core['Forecast'], 
            label=core_type, color=colors_cores[idx], linewidth=2, marker='o', markersize=4)
ax.set_xlabel('Week (2027)')
ax.set_ylabel('Weekly Supply Quantity')
ax.set_title('Forecast by Core Type (Lines)')
ax.legend(title='Core Type')
ax.grid(True, alpha=0.3)

# Plot 4c: Box plot of forecast distribution
ax = axes[1, 0]
forecast_data = [df_forecast[df_forecast['Core_Typ'] == ct]['Forecast'].values for ct in core_types]
bp = ax.boxplot(forecast_data, labels=core_types, patch_artist=True)
for patch, color in zip(bp['boxes'], colors_cores):
    patch.set_facecolor(color)
    patch.set_alpha(0.7)
ax.set_xlabel('Core Type')
ax.set_ylabel('Weekly Supply Quantity')
ax.set_title('Forecast Distribution by Core Type')
ax.grid(True, alpha=0.3, axis='y')

# Plot 4d: Total forecast bar chart
ax = axes[1, 1]
total_by_core = df_forecast.groupby('Core_Typ')['Forecast'].sum().sort_values(ascending=False)
bars = ax.bar(range(len(total_by_core)), total_by_core.values, color=colors_cores)
ax.set_xticks(range(len(total_by_core)))
ax.set_xticklabels(total_by_core.index, rotation=45, ha='right')
ax.set_ylabel('Total Forecast (26 Weeks)')
ax.set_title('Total Forecast Volume by Core Type')
ax.grid(True, alpha=0.3, axis='y')

# Add value labels on bars
for i, (core, value) in enumerate(total_by_core.items()):
    ax.text(i, value, f'{value:,.0f}', ha='center', va='bottom', fontweight='bold')

plt.tight_layout()
plt.savefig('forecast_plot_5_core_comparison.png', dpi=300, bbox_inches='tight')
print("✓ Saved: forecast_plot_5_core_comparison.png")
plt.close()

# ===================================================================
# PLOT 6: Aggregated Timeline with All Core Types
# ===================================================================

print("📊 Creating Plot 6: Aggregated Timeline...")

fig, ax = plt.subplots(figsize=(18, 8))
fig.suptitle('Total Supply: Validation (2025) → Forecast (2026)', 
             fontsize=16, fontweight='bold')

# Aggregate all data
df_val_total = df_val.groupby('Datum').agg({'Target': 'sum', 'Predicted': 'sum'}).reset_index()
df_forecast_total = df_forecast.groupby('Datum').agg({
    'Forecast': 'sum', 'Lower_80': 'sum', 'Upper_80': 'sum'
}).reset_index()

# Plot validation (2025)
ax.plot(df_val_total['Datum'], df_val_total['Target'], 
        label='2025 Actual', color='#2E86AB', linewidth=2.5, marker='o', markersize=5)
ax.plot(df_val_total['Datum'], df_val_total['Predicted'], 
        label='2025 Predicted', color='#A23B72', linewidth=2.5, marker='s', markersize=5, linestyle='--')

# Plot forecast (2026) with confidence bands
ax.fill_between(df_forecast_total['Datum'], df_forecast_total['Lower_80'], df_forecast_total['Upper_80'],
                 alpha=0.25, color='#E85D04', label='2026 Forecast 80% CI')
ax.plot(df_forecast_total['Datum'], df_forecast_total['Forecast'], 
        label='2026 Forecast', color='#E85D04', linewidth=3, marker='D', markersize=6)

# Add vertical separator
ax.axvline(x=pd.Timestamp('2026-01-01'), color='gray', linestyle=':', linewidth=2, alpha=0.5)
ax.text(pd.Timestamp('2026-01-01'), ax.get_ylim()[1]*0.98, ' 2026', fontsize=11, color='gray', fontweight='bold')

ax.set_xlabel('Date', fontsize=12)
ax.set_ylabel('Weekly Supply Quantity (All Core Types)', fontsize=12)
ax.legend(loc='upper left', fontsize=11)
ax.grid(True, alpha=0.3)

# Add summary statistics
stats_text = f"""2025 Validation:
  Avg: {df_val_total['Target'].mean():.1f}/week
  Total: {df_val_total['Target'].sum():,.0f}

2026 Forecast:
  Avg: {df_forecast_total['Forecast'].mean():.1f}/week
  Total: {df_forecast_total['Forecast'].sum():,.0f}"""

ax.text(0.02, 0.98, stats_text, transform=ax.transAxes, 
        fontsize=10, verticalalignment='top', family='monospace',
        bbox=dict(boxstyle='round', facecolor='white', alpha=0.9))

plt.tight_layout()
plt.savefig('forecast_plot_6_aggregated_timeline.png', dpi=300, bbox_inches='tight')
print("✓ Saved: forecast_plot_6_aggregated_timeline.png")
plt.close()

# ===================================================================
# Summary
# ===================================================================

print("\n" + "="*70)
print("Visualization Complete!")
print("="*70)
print("\nGenerated Plots:")
print("  1. forecast_plot_1_validation.png - Validation performance (2025) with KPIs")
print("  2. forecast_plot_2_importance.png - Feature importance analysis")
print("  3. forecast_plot_3_validation_confidence.png - Validation (2025) with confidence bands & KPIs")
print("  4. forecast_plot_4_seamless_timeline.png - By core type: 2025→2026")
print("  5. forecast_plot_5_core_comparison.png - Core type comparisons")
print("  6. forecast_plot_6_aggregated_timeline.png - Aggregated: 2025→2026")
print("="*70)
