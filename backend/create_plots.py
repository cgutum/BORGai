import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from datetime import datetime

# Set style for better-looking plots
sns.set_style("whitegrid")
plt.rcParams['figure.figsize'] = (14, 8)
plt.rcParams['font.size'] = 10

print("="*70)
print("Data Visualization Script")
print("="*70)

# Load all data files
print("\nLoading data files...")
df_registrations = pd.read_csv('01_Zulassungszahlen.csv', encoding='utf-8-sig')
df_orders = pd.read_csv('03_Bestelldaten.csv', encoding='utf-8-sig')
df_supply = pd.read_csv('04_Core_Supply_Daten.csv', encoding='utf-8-sig')
df_components = pd.read_csv('05_Komponenten_Daten.csv', encoding='utf-8-sig')

# Convert date columns
df_registrations['Datum'] = pd.to_datetime(df_registrations['Datum'])
df_orders['Datum'] = pd.to_datetime(df_orders['Datum'])
df_supply['Anlieferdatum'] = pd.to_datetime(df_supply['Anlieferdatum'])
df_components['Datum'] = pd.to_datetime(df_components['Datum'])

print(f"Loaded {len(df_registrations)} registration records")
print(f"Loaded {len(df_orders)} order records")
print(f"Loaded {len(df_supply)} supply records")
print(f"Loaded {len(df_components)} component records")

# ===================================================================
# PLOT 1: Vehicle Registrations (2023-2026, Monthly)
# ===================================================================

print("\nCreating Plot 1: Vehicle Registrations (2023-2026)...")

# Filter data for 2023-2026
df_reg_filtered = df_registrations[
    (df_registrations['Jahr'] >= 2023) & 
    (df_registrations['Jahr'] <= 2026)
].copy()

# Create month-year label
df_reg_filtered['MonthYear'] = df_reg_filtered['Datum'].dt.strftime('%Y-%m')

# Pivot for plotting
df_reg_pivot = df_reg_filtered.pivot_table(
    index='MonthYear', 
    columns='Fahrzeugmodell', 
    values='Menge', 
    aggfunc='sum'
).fillna(0)

# Plot
fig, ax = plt.subplots(figsize=(16, 8))
x_positions = np.arange(len(df_reg_pivot.index))
width = 0.25

colors = ['#1f77b4', '#ff7f0e', '#2ca02c']
for i, model in enumerate(df_reg_pivot.columns):
    ax.bar(x_positions + i*width, df_reg_pivot[model], width, 
           label=model, color=colors[i], alpha=0.8)

ax.set_xlabel('Monat', fontsize=12, fontweight='bold')
ax.set_ylabel('Anzahl Zulassungen', fontsize=12, fontweight='bold')
ax.set_title('Fahrzeugzulassungen 2023-2026 (Monatlich)', fontsize=14, fontweight='bold')
ax.set_xticks(x_positions + width)
ax.set_xticklabels(df_reg_pivot.index, rotation=45, ha='right')
ax.legend(loc='upper left', framealpha=0.9)
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('plot_01_registrations_2023-2026.png', dpi=300, bbox_inches='tight')
print("Saved: plot_01_registrations_2023-2026.png")
plt.close()

# ===================================================================
# PLOT 2: Core Orders (2023-2026, Monthly by Core Type)
# ===================================================================

print("\nCreating Plot 2: Core Orders (2023-2026)...")

# Filter orders for 2023-2026
df_orders_filtered = df_orders[
    (df_orders['Jahr'] >= 2023) & 
    (df_orders['Jahr'] <= 2026)
].copy()

df_orders_filtered['MonthYear'] = df_orders_filtered['Datum'].dt.strftime('%Y-%m')

# Aggregate by month and core type
df_orders_agg = df_orders_filtered.groupby(['MonthYear', 'Core_Typ'])['Menge'].sum().reset_index()

# Pivot for plotting
df_orders_pivot = df_orders_agg.pivot_table(
    index='MonthYear',
    columns='Core_Typ',
    values='Menge',
    aggfunc='sum'
).fillna(0)

# Plot
fig, ax = plt.subplots(figsize=(16, 8))
x_positions = np.arange(len(df_orders_pivot.index))
width = 0.25

colors = ['#d62728', '#9467bd', '#8c564b']
for i, core_type in enumerate(df_orders_pivot.columns):
    ax.bar(x_positions + i*width, df_orders_pivot[core_type], width,
           label=core_type, color=colors[i], alpha=0.8)

ax.set_xlabel('Monat', fontsize=12, fontweight='bold')
ax.set_ylabel('Anzahl Bestellungen', fontsize=12, fontweight='bold')
ax.set_title('Core Bestellungen 2023-2026 (Monatlich nach Core-Typ)', fontsize=14, fontweight='bold')
ax.set_xticks(x_positions + width)
ax.set_xticklabels(df_orders_pivot.index, rotation=45, ha='right')
ax.legend(loc='upper left', framealpha=0.9)
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('plot_02_orders_2023-2026.png', dpi=300, bbox_inches='tight')
print("Saved: plot_02_orders_2023-2026.png")
plt.close()

# ===================================================================
# PLOT 3: Core Supply (2023-2026, Weekly by Core Type)
# ===================================================================

print("\nCreating Plot 3: Core Supply (2023-2026, Weekly)...")

# Filter supply for 2023-2026
df_supply_filtered = df_supply[
    (df_supply['Jahr'] >= 2023) & 
    (df_supply['Jahr'] <= 2026)
].copy()

# Create week-year label
df_supply_filtered['WeekYear'] = df_supply_filtered['Anlieferdatum'].dt.strftime('%Y-%m-W') + \
                                  df_supply_filtered['Woche'].astype(str)

# Aggregate by week and core type
df_supply_agg = df_supply_filtered.groupby(['WeekYear', 'Core_Typ'])['Menge'].sum().reset_index()

# Sort by actual date for proper ordering
df_supply_filtered_sorted = df_supply_filtered.sort_values('Anlieferdatum')
week_order = df_supply_filtered_sorted['WeekYear'].unique()

# Pivot for plotting
df_supply_pivot = df_supply_agg.pivot_table(
    index='WeekYear',
    columns='Core_Typ',
    values='Menge',
    aggfunc='sum'
).reindex(week_order).fillna(0)

# Plot (sample every 4th week for readability)
fig, ax = plt.subplots(figsize=(18, 8))
x_positions = np.arange(len(df_supply_pivot.index))
width = 0.25

colors = ['#e377c2', '#7f7f7f', '#bcbd22']
for i, core_type in enumerate(df_supply_pivot.columns):
    ax.bar(x_positions + i*width, df_supply_pivot[core_type], width,
           label=core_type, color=colors[i], alpha=0.8)

ax.set_xlabel('Woche', fontsize=12, fontweight='bold')
ax.set_ylabel('Anzahl Core Supply', fontsize=12, fontweight='bold')
ax.set_title('Core Supply 2023-2026 (Wöchentlich nach Core-Typ)', fontsize=14, fontweight='bold')

# Show every 8th label to avoid overcrowding
tick_spacing = 8
ax.set_xticks(x_positions[::tick_spacing] + width)
ax.set_xticklabels(df_supply_pivot.index[::tick_spacing], rotation=45, ha='right', fontsize=8)

ax.legend(loc='upper left', framealpha=0.9)
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('plot_03_supply_2023-2026_weekly.png', dpi=300, bbox_inches='tight')
print("Saved: plot_03_supply_2023-2026_weekly.png")
plt.close()

# ===================================================================
# PLOT 3.5: Core Supply (2024-2025, Weekly - Compact)
# ===================================================================

print("\nCreating Plot 3.5: Core Supply (2024-2025, Weekly - Compact)...")

# Filter supply for 2024-2025 only
df_supply_compact = df_supply[
    (df_supply['Jahr'] >= 2024) & 
    (df_supply['Jahr'] <= 2025)
].copy()

# Create week-year label
df_supply_compact['WeekYear'] = df_supply_compact['Anlieferdatum'].dt.strftime('%Y-%m-W') + \
                                 df_supply_compact['Woche'].astype(str)

# Aggregate by week and core type
df_supply_compact_agg = df_supply_compact.groupby(['WeekYear', 'Core_Typ'])['Menge'].sum().reset_index()

# Sort by actual date for proper ordering
df_supply_compact_sorted = df_supply_compact.sort_values('Anlieferdatum')
week_order_compact = df_supply_compact_sorted['WeekYear'].unique()

# Pivot for plotting
df_supply_compact_pivot = df_supply_compact_agg.pivot_table(
    index='WeekYear',
    columns='Core_Typ',
    values='Menge',
    aggfunc='sum'
).reindex(week_order_compact).fillna(0)

# Plot with narrower bars for more compact appearance
fig, ax = plt.subplots(figsize=(12, 16))  # 3:4 aspect ratio
x_positions = np.arange(len(df_supply_compact_pivot.index))
width = 0.20  # Narrower bars for more compact look

colors = ['#e377c2', '#7f7f7f', '#bcbd22']
for i, core_type in enumerate(df_supply_compact_pivot.columns):
    ax.bar(x_positions + i*width, df_supply_compact_pivot[core_type], width,
           label=core_type, color=colors[i], alpha=0.8)

ax.set_xlabel('Week', fontsize=12, fontweight='bold')
ax.set_ylabel('Quantity', fontsize=12, fontweight='bold')
ax.set_title('Exemplary Core Supply 2024-2025', fontsize=14, fontweight='bold')

# Show every 4th label for better readability
tick_spacing = 4
ax.set_xticks(x_positions[::tick_spacing] + width)
ax.set_xticklabels(df_supply_compact_pivot.index[::tick_spacing], rotation=45, ha='right', fontsize=8)

ax.legend(loc='upper left', framealpha=0.9)
ax.grid(True, alpha=0.3)

# Make x-axis much more compact - only 75% of current span
ax.set_xlim(-0.5, len(x_positions) * 0.75 - 0.5)

plt.tight_layout()
plt.savefig('plot_03_5_supply_2024-2025_weekly_compact.png', dpi=300, bbox_inches='tight')
print("Saved: plot_03_5_supply_2024-2025_weekly_compact.png")
plt.close()

# ===================================================================
# PLOT 3.5-V2: Core Supply Stacked Bar (2024-2025) — thesis quality
# ===================================================================
# Approach A: Stacked bar chart per week — addresses narrow-bar feedback

print("\nCreating Plot 3.5-V2: Stacked Bar (thesis quality)...")

fig, ax = plt.subplots(figsize=(16, 8))
ax.set_title('Exemplary Core Supply 2024-2025 (Stacked)', fontsize=14, fontweight='bold')
df_supply_compact_pivot.plot.bar(
    stacked=True, ax=ax, alpha=0.85,
    color=['#e377c2', '#7f7f7f', '#bcbd22']
)
ax.set_xlabel('Week', fontsize=12, fontweight='bold')
ax.set_ylabel('Quantity (Units)', fontsize=12, fontweight='bold')

tick_spacing = 4
tick_positions = range(0, len(df_supply_compact_pivot.index), tick_spacing)
ax.set_xticks(list(tick_positions))
ax.set_xticklabels(
    [df_supply_compact_pivot.index[i] for i in tick_positions],
    rotation=45, ha='right', fontsize=10
)
ax.yaxis.set_tick_params(labelsize=11)
ax.legend(title='Core Type', loc='upper left', framealpha=0.9, fontsize=11)
ax.grid(True, alpha=0.3, axis='y')

plt.tight_layout()
plt.savefig('plot_03_5_supply_2024-2025_stacked_v2.png', dpi=300, bbox_inches='tight')
print("Saved: plot_03_5_supply_2024-2025_stacked_v2.png")
plt.close()

# ===================================================================
# PLOT 3.5-V3: Core Supply Line Chart (2024-2025) — trend-focused
# ===================================================================
# Approach B: Line chart with markers — best for reading per-type trends

print("\nCreating Plot 3.5-V3: Line Chart (trend-focused)...")

fig, ax = plt.subplots(figsize=(16, 7))
ax.set_title('Exemplary Core Supply 2024-2025 (Trends by Core Type)', fontsize=14, fontweight='bold')

line_styles = ['-', '--', '-.']
markers_v3 = ['o', 's', '^']
colors_v3 = ['#e377c2', '#7f7f7f', '#bcbd22']

# Use integer x positions to avoid string-axis / integer-tick misalignment
x_pos_v3 = np.arange(len(df_supply_compact_pivot))
for i, col in enumerate(df_supply_compact_pivot.columns):
    ax.plot(
        x_pos_v3, df_supply_compact_pivot[col].values,
        linestyle=line_styles[i], marker=markers_v3[i], markersize=4,
        color=colors_v3[i], linewidth=1.8, label=col, alpha=0.9
    )

tick_spacing = 4
tick_idx = list(range(0, len(df_supply_compact_pivot.index), tick_spacing))
ax.set_xticks(tick_idx)
ax.set_xticklabels(
    [df_supply_compact_pivot.index[i] for i in tick_idx],
    rotation=45, ha='right', fontsize=10
)
ax.set_xlabel('Week', fontsize=12, fontweight='bold')
ax.set_ylabel('Quantity (Units)', fontsize=12, fontweight='bold')
ax.tick_params(axis='y', labelsize=11)
ax.legend(title='Core Type', loc='upper left', framealpha=0.9, fontsize=11)
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('plot_03_5_supply_2024-2025_lines_v3.png', dpi=300, bbox_inches='tight')
print("Saved: plot_03_5_supply_2024-2025_lines_v3.png")
plt.close()

# ===================================================================
# PLOT 3.5-V4: Core Supply Stacked Bar + Trend Line (2024-2025)
# ===================================================================
# Approach C: Stacked bar + total trend line overlay — richest view

print("\nCreating Plot 3.5-V4: Stacked Bar + Total Trend Line...")

fig, ax = plt.subplots(figsize=(16, 8))
ax.set_title('Exemplary Core Supply 2024-2025 (Stacked + Total Trend)', fontsize=14, fontweight='bold')

df_supply_compact_pivot.plot.bar(
    stacked=True, ax=ax, alpha=0.75,
    color=['#e377c2', '#7f7f7f', '#bcbd22']
)

total_per_week = df_supply_compact_pivot.sum(axis=1)
x_pos_v4 = range(len(total_per_week))
ax.plot(x_pos_v4, total_per_week.values, color='black', linewidth=2,
        marker='o', markersize=3, label='Total', zorder=5, linestyle='-')

tick_spacing = 4
tick_positions_v4 = list(range(0, len(df_supply_compact_pivot.index), tick_spacing))
ax.set_xticks(tick_positions_v4)
ax.set_xticklabels(
    [df_supply_compact_pivot.index[i] for i in tick_positions_v4],
    rotation=45, ha='right', fontsize=10
)
ax.set_xlabel('Week', fontsize=12, fontweight='bold')
ax.set_ylabel('Quantity (Units)', fontsize=12, fontweight='bold')
ax.tick_params(axis='y', labelsize=11)
ax.legend(title='Core Type', loc='upper left', framealpha=0.9, fontsize=11, ncol=2)
ax.grid(True, alpha=0.3, axis='y')

plt.tight_layout()
plt.savefig('plot_03_5_supply_2024-2025_stacked_trend_v4.png', dpi=300, bbox_inches='tight')
print("Saved: plot_03_5_supply_2024-2025_stacked_trend_v4.png")
plt.close()

# ===================================================================
# PLOT 3.5-V5: Stacked + Trend, year labels only, xlim compaction
# ===================================================================
# V4 style, minimal x labels (2024 / 2025 / Dec '25), 70% xlim crop

print("\nCreating Plot 3.5-V5: Stacked + Trend, year labels, xlim compact...")

fig, ax = plt.subplots(figsize=(16, 8))
ax.set_title('Exemplary Core Supply 2024-2025', fontsize=14, fontweight='bold')

df_supply_compact_pivot.plot.bar(
    stacked=True, ax=ax, alpha=0.75,
    color=['#e377c2', '#7f7f7f', '#bcbd22']
)

total_per_week_v5 = df_supply_compact_pivot.sum(axis=1)
ax.plot(range(len(total_per_week_v5)), total_per_week_v5.values,
        color='black', linewidth=2, marker='o', markersize=3,
        label='Total', zorder=5, linestyle='-')

# Minimal x labels: first week of each year + last week
idx_list_v5 = list(df_supply_compact_pivot.index)
year_tick_pos = {}
for i, label in enumerate(idx_list_v5):
    year = label[:4]
    if year not in year_tick_pos:
        year_tick_pos[year] = i

tick_pos_v5 = sorted(year_tick_pos.values()) + [len(idx_list_v5) - 1]
tick_labels_v5 = []
for pos in tick_pos_v5:
    label = idx_list_v5[pos]
    year = label[:4]
    if pos == len(idx_list_v5) - 1:
        tick_labels_v5.append("Dec '25")
    else:
        tick_labels_v5.append(year)

ax.set_xticks(tick_pos_v5)
ax.set_xticklabels(tick_labels_v5, rotation=0, ha='center', fontsize=12)
ax.set_xlabel('', fontsize=12)
ax.set_ylabel('Quantity (Units)', fontsize=12, fontweight='bold')
ax.tick_params(axis='y', labelsize=11)
ax.legend(title='Core Type', loc='upper left', framealpha=0.9, fontsize=11, ncol=2)
ax.grid(True, alpha=0.3, axis='y')

# Crop to 70% of bars — keeps spacing tight, cuts trailing whitespace
n_bars_v5 = len(df_supply_compact_pivot.index)
ax.set_xlim(-0.5, n_bars_v5 * 0.70 - 0.5)

plt.tight_layout()
plt.savefig('plot_03_5_supply_2024-2025_stacked_v5_compact.png', dpi=300, bbox_inches='tight')
print("Saved: plot_03_5_supply_2024-2025_stacked_v5_compact.png")
plt.close()

# ===================================================================
# PLOT 3.5-V6: Stacked + Trend, year labels only, narrow bars
# ===================================================================
# Alternative compaction: all bars visible but narrower width + tighter figure

print("\nCreating Plot 3.5-V6: Stacked + Trend, year labels, narrow bars...")

fig, ax = plt.subplots(figsize=(20, 7))
ax.set_title('Exemplary Core Supply 2024-2025', fontsize=14, fontweight='bold')

# Narrower bars so all 104 weeks fit without cropping
df_supply_compact_pivot.plot.bar(
    stacked=True, ax=ax, alpha=0.75,
    color=['#e377c2', '#7f7f7f', '#bcbd22'],
    width=0.6
)

total_per_week_v6 = df_supply_compact_pivot.sum(axis=1)
ax.plot(range(len(total_per_week_v6)), total_per_week_v6.values,
        color='black', linewidth=1.8, marker='o', markersize=2.5,
        label='Total', zorder=5, linestyle='-')

# Same minimal labels as V5
idx_list_v6 = list(df_supply_compact_pivot.index)
year_tick_pos_v6 = {}
for i, label in enumerate(idx_list_v6):
    year = label[:4]
    if year not in year_tick_pos_v6:
        year_tick_pos_v6[year] = i

tick_pos_v6 = sorted(year_tick_pos_v6.values()) + [len(idx_list_v6) - 1]
tick_labels_v6 = []
for pos in tick_pos_v6:
    if pos == len(idx_list_v6) - 1:
        tick_labels_v6.append("Dec '25")
    else:
        tick_labels_v6.append(idx_list_v6[pos][:4])

ax.set_xticks(tick_pos_v6)
ax.set_xticklabels(tick_labels_v6, rotation=0, ha='center', fontsize=12)
ax.set_xlabel('', fontsize=12)
ax.set_ylabel('Quantity (Units)', fontsize=12, fontweight='bold')
ax.tick_params(axis='y', labelsize=11)
ax.legend(title='Core Type', loc='upper left', framealpha=0.9, fontsize=11, ncol=2)
ax.grid(True, alpha=0.3, axis='y')

plt.tight_layout()
plt.savefig('plot_03_5_supply_2024-2025_stacked_v6_narrow.png', dpi=300, bbox_inches='tight')
print("Saved: plot_03_5_supply_2024-2025_stacked_v6_narrow.png")
plt.close()

# ===================================================================
# PLOT 4: Component Supply for 6 Example Months
# ===================================================================

print("\nCreating Plot 4: Component Supply (6 Example Months)...")

# Select 6 example months from 2024-2025
example_months = ['2024-06', '2024-12', '2025-05', '2025-11', '2024-03', '2025-03']

# Filter components for these months
df_comp_filtered = df_components[
    df_components['Datum'].dt.strftime('%Y-%m').isin(example_months)
].copy()

df_comp_filtered['MonthYear'] = df_comp_filtered['Datum'].dt.strftime('%Y-%m')

# Aggregate by month, core type, and component
df_comp_agg = df_comp_filtered.groupby(
    ['MonthYear', 'Core_Typ', 'Komponente']
)['Menge_Wiederverwendbar'].sum().reset_index()

# Create subplots for each month
fig, axes = plt.subplots(2, 3, figsize=(20, 12))
fig.suptitle('Wiederverwendbare Komponenten nach Core-Typ (6 Beispiel-Monate)', 
             fontsize=14, fontweight='bold')

for idx, month in enumerate(example_months):
    ax = axes.flatten()[idx]
    
    # Get data for this month
    month_data = df_comp_agg[df_comp_agg['MonthYear'] == month]
    
    if len(month_data) == 0:
        ax.text(0.5, 0.5, 'Keine Daten', ha='center', va='center', fontsize=12)
        ax.set_title(f'{month}')
        continue
    
    # Pivot for plotting
    pivot_data = month_data.pivot_table(
        index='Komponente',
        columns='Core_Typ',
        values='Menge_Wiederverwendbar',
        aggfunc='sum'
    ).fillna(0)
    
    # Plot grouped bar chart
    x_positions = np.arange(len(pivot_data.index))
    width = 0.25
    
    colors_comp = ['#17becf', '#ff9896', '#98df8a']
    for i, core_type in enumerate(pivot_data.columns):
        ax.bar(x_positions + i*width, pivot_data[core_type], width,
               label=core_type, color=colors_comp[i % len(colors_comp)], alpha=0.8)
    
    ax.set_xlabel('Komponente', fontsize=10, fontweight='bold')
    ax.set_ylabel('Menge Wiederverwendbar', fontsize=10, fontweight='bold')
    ax.set_title(f'{month}', fontsize=12, fontweight='bold')
    ax.set_xticks(x_positions + width)
    ax.set_xticklabels(pivot_data.index, rotation=45, ha='right', fontsize=8)
    
    if idx == 0:  # Only show legend on first subplot
        ax.legend(loc='upper right', framealpha=0.9, fontsize=8)
    
    ax.grid(True, alpha=0.3, axis='y')

plt.tight_layout()
plt.savefig('plot_04_components_6months.png', dpi=300, bbox_inches='tight')
print("Saved: plot_04_components_6months.png")
plt.close()



# ===================================================================
# PLOT 6: Component Reusability Rates by Type
# ===================================================================

print("\nCreating Plot 6: Component Reusability Rates...")

# Calculate overall reusability by component across all months
df_comp_summary = df_components.groupby(['Core_Typ', 'Komponente']).agg({
    'Menge_Cores': 'sum',
    'Menge_Wiederverwendbar': 'sum',
    'Wiederverwendbarkeit_%': 'first'  # This is constant per component
}).reset_index()

# Create subplots for each core type
fig, axes = plt.subplots(1, 3, figsize=(18, 6))
fig.suptitle('Wiederverwendbarkeitsraten nach Komponente und Core-Typ', 
             fontsize=14, fontweight='bold')

core_types = df_comp_summary['Core_Typ'].unique()

for idx, core_type in enumerate(sorted(core_types)):
    ax = axes[idx]
    
    # Get data for this core type
    core_data = df_comp_summary[df_comp_summary['Core_Typ'] == core_type].sort_values('Komponente')
    
    # Plot
    colors_bar = plt.cm.viridis(np.linspace(0.3, 0.9, len(core_data)))
    bars = ax.bar(range(len(core_data)), core_data['Wiederverwendbarkeit_%'], 
                  color=colors_bar, alpha=0.8, edgecolor='black', linewidth=0.5)
    
    # Add value labels on bars
    for i, (bar, value) in enumerate(zip(bars, core_data['Wiederverwendbarkeit_%'])):
        height = bar.get_height()
        ax.text(bar.get_x() + bar.get_width()/2., height,
                f'{int(value)}%', ha='center', va='bottom', fontsize=9, fontweight='bold')
    
    ax.set_xlabel('Komponente', fontsize=10, fontweight='bold')
    ax.set_ylabel('Wiederverwendbarkeit (%)', fontsize=10, fontweight='bold')
    ax.set_title(f'{core_type}', fontsize=11, fontweight='bold')
    ax.set_xticks(range(len(core_data)))
    ax.set_xticklabels(core_data['Komponente'], rotation=45, ha='right', fontsize=8)
    ax.set_ylim(0, 100)
    ax.grid(True, alpha=0.3, axis='y')

plt.tight_layout()
plt.savefig('plot_06_reusability_rates.png', dpi=300, bbox_inches='tight')
print("Saved: plot_06_reusability_rates.png")
plt.close()

# ===================================================================
# Summary Statistics
# ===================================================================

print("\n" + "="*70)
print("VISUALIZATION SUMMARY")
print("="*70)
print("\nGenerated Plots:")
print("  1. plot_01_registrations_2023-2026.png - Vehicle registrations by model")
print("  2. plot_02_orders_2023-2026.png - Core orders by type")
print("  3. plot_03_supply_2023-2026_weekly.png - Core supply weekly")
print("  3.5 plot_03_5_supply_2024-2025_weekly_compact.png - Core supply 2024-2025 (compact)")
print("  4. plot_04_components_6months.png - Component breakdown for 6 months")
print("  6. plot_06_reusability_rates.png - Component reusability rates")
print("\nAll visualizations created successfully!")
print("="*70)
