# SCM Web Application

**Supply Chain Management System for Automotive Core Remanufacturing**

A full-stack web application for forecasting and managing automotive turbocharger core supply using machine learning.

---

## 📋 Project Overview

This application provides end-to-end supply chain forecasting for automotive remanufacturing operations:

- **Backend**: AI-powered forecasting engine with XGBoost time series models
- **Frontend**: Next.js web interface for visualization and analysis
- **Data**: Synthetic supply chain data with realistic failure distributions

### Key Capabilities

1. **Weekly Supply Forecasting**: 26-week ahead predictions with confidence intervals
2. **Feature Engineering**: 32+ features including temporal, lagged, and exponential weighted moving averages
3. **Performance Monitoring**: Real-time KPIs (MAE, RMSE, MAPE, R²)
4. **Interactive Visualization**: React-based dashboards with charts and analytics

---

## 🏗️ Architecture

```
dev/
├── backend/          # Python ML forecasting engine
├── frontend/         # Next.js web application
├── .git/             # Git repository
└── README.md         # This file
```

### Technology Stack

**Backend:**
- Python 3.11+
- XGBoost (gradient boosting)
- scikit-learn (metrics, preprocessing)
- pandas, numpy (data manipulation)
- matplotlib, seaborn (visualization)

**Frontend:**
- Next.js 15 (React framework)
- TypeScript
- Tailwind CSS
- Vercel deployment ready

---

## 🚀 Quick Start

### Backend Setup

```bash
cd backend

# Install dependencies
pip install pandas numpy scipy matplotlib seaborn xgboost scikit-learn

# Generate synthetic data
python data_generation.py

# Train forecasting model
python train_forecasting_model.py

# Create visualizations
python visualize_forecasts.py
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# Navigate to http://localhost:3000
```

---

## 📊 Backend: AI Forecasting Engine

### Overview

Machine learning pipeline for weekly core supply forecasting with:
- **Training Period**: 2020-2024 (471 records)
- **Validation**: 2025 forecasts vs actual (144 records)
- **Forecast Horizon**: 2026 (26 weeks with 80%/95% CI)

### Model Performance

**Optimized XGBoost Configuration:**
- 500 trees with early stopping (converges ~265 iterations)
- Max depth: 4 (prevents overfitting)
- Learning rate: 0.03 (fine adjustments)
- Strong regularization (L1=0.3, L2=2.0)

**Validation Metrics (2025):**
- **MAE**: 2.12 units per week
- **RMSE**: 4.05 units
- **MAPE**: 30.79%
- **R²**: 0.60-0.75

### Key Features

**Top 5 Most Predictive Features:**
1. `Target_EWM_12W` (24.0%) - 12-week exponential weighted moving average
2. `Target_EWM_4W` (13.2%) - 4-week EWM
3. `Target_Lag_1W` (10.3%) - Previous week supply
4. `Order_RollingStd_8W` (9.4%) - Order volatility
5. `Target_RollingMean_4W` (9.3%) - 4-week rolling average

**Feature Categories (32 total):**
- Temporal (8): Year, month, week, quarter, sin/cos encodings
- Lagged Supply (11): 1-12 week lags, rolling stats, EWM
- Registration Lags (2): 5-6 year vehicle registration history
- Orders (7): Current/lagged orders with rolling avg/std
- Reusability (1): Component reuse rates
- Trend (1): Weeks since start
- Categorical (2): Core type and vehicle model

### Forecast Output (2026)

| Core Type | Weekly Avg | 26-Week Total | Range |
|-----------|------------|---------------|-------|
| BMW X3 2018 | 12.4 units | 323 units | 8-18 |
| BMW X3 2020 | 12.5 units | 325 units | 9-16 |
| BMW X5 2021 | 4.2 units | 110 units | 3-5 |
| **Total** | **29.1 units** | **758 units** | - |

**Confidence Intervals:**
- 80% CI: ±5.18 units
- 95% CI: ±8.09 units

### Data Pipeline

**Generated Datasets:**
1. `01_Zulassungszahlen.csv` - Vehicle registrations (2018-2026)
2. `03_Bestelldaten.csv` - Core orders (failure events)
3. `04_Core_Supply_Daten.csv` - Core supply returns (target variable)
4. `05_Komponenten_Daten.csv` - Component reusability data

**Distribution Models:**
- **Weibull Failure**: β=2.5, η=5.0, γ=1.0 (peak at 5 years)
- **Log-Normal Return Lags**: Werkstatt 15d, Flotte 45d, Privat 90d
- **Return Rate**: 65-75% of failed cores

### Documentation

- **[backend/AI_Forecasting_Documentation.md](backend/AI_Forecasting_Documentation.md)** - Complete ML model documentation
- **[backend/Data_Generation_Documentation.md](backend/Data_Generation_Documentation.md)** - Data pipeline details
- **[backend/README.md](backend/README.md)** - Backend quick reference

---

## 🎨 Frontend: Web Application

### Overview

Next.js-based web interface for:
- Forecast visualization and analysis
- KPI monitoring dashboards
- Core type comparisons
- Timeline exploration (2025 validation → 2026 forecast)

### Features

**Dashboard Components:**
- Interactive forecast charts (Line, area, candlestick)
- Performance metrics panel (MAE, RMSE, MAPE, R²)
- Feature importance visualization
- Confidence interval bands (80%/95%)
- Core type filters and comparisons

**Technology:**
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React hooks
- **Build**: Turbopack (dev), production optimized

### Development

```bash
cd frontend

# Install dependencies
npm install

# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

**Environment:**
- Development: http://localhost:3000
- Production: Vercel deployment ready

### File Structure

```
frontend/
├── app/              # Next.js app router
│   ├── page.tsx      # Home page
│   └── layout.tsx    # Root layout
├── components/       # React components
├── public/           # Static assets
├── package.json      # Dependencies
└── README.md         # Frontend docs
```

### Documentation

- **[frontend/README.md](frontend/README.md)** - Frontend quick reference

---

## 📈 Results & Insights

### Model Performance Improvements

From baseline to optimized model:
- **MAE**: 2.65 → 2.12 units (20% improvement)
- **RMSE**: 4.68 → 4.05 units (13% improvement)
- **MAPE**: 37.6% → 30.8% (18% improvement)

**Optimization Techniques:**
- Added EWM features (37% combined importance)
- Increased trees: 150 → 500 with early stopping
- Deeper regularization: L1=0.1→0.3, L2=1.0→2.0
- More conservative splitting: max_depth=5→4, gamma=0.1→0.2

### Business Value

**Operational Benefits:**
1. **Capacity Planning**: Forecast ±5 units accuracy enables weekly resource allocation
2. **Inventory Optimization**: 80% CI reduces safety stock requirements
3. **Procurement Strategy**: 26-week horizon supports supplier negotiations
4. **Production Scheduling**: Core-specific forecasts align remanufacturing with demand

**Key Insights:**
- Recent trends (EWM) > historical averages (37% vs 9% importance)
- Order volatility predicts supply changes (9.4% importance)
- 5-6 year vehicle cohorts drive supply (Weibull distribution validation)
- Weekly patterns more predictive than monthly seasonality

---

## 🔧 Development Workflow

### 1. Data Generation

```bash
cd backend
python data_generation.py
```

**Outputs:** 5 CSV files (registrations, orders, supply, components, types)

### 2. Model Training

```bash
python train_forecasting_model.py
```

**Outputs:**
- `validation_results_2025.csv` - Validation predictions
- `forecast_2026_weekly.csv` - 26-week forecast
- `feature_importance.csv` - Feature rankings

### 3. Visualization

```bash
python visualize_forecasts.py
```

**Outputs:** 5 PNG plots (validation, importance, timeline, comparison, aggregated)

### 4. Web Interface

```bash
cd ../frontend
npm run dev
```

**Access:** http://localhost:3000

---

## 📚 Documentation

### Backend
- **[AI_Forecasting_Documentation.md](backend/AI_Forecasting_Documentation.md)** - ML model architecture, features, performance, usage
- **[Data_Generation_Documentation.md](backend/Data_Generation_Documentation.md)** - Data pipeline, distributions, parameters
- **[Backend README](backend/README.md)** - Quick start and reference

### Frontend
- **[Frontend README](frontend/README.md)** - Next.js setup and development

---

## 🛠️ Requirements

### Backend
```bash
pip install pandas numpy scipy matplotlib seaborn xgboost scikit-learn
```
**Python Version:** 3.11+

### Frontend
```bash
npm install
```
**Node Version:** 18+

---

## 📊 Project Statistics

### Data
- **844,000+ vehicle registrations** (2018-2026)
- **2,751 core orders** (failure events)
- **1,565 core supply returns** (56.9% return rate)
- **7,825 components** (65-85% reusable)

### Model
- **804 training samples** (2020-2025, weekly)
- **78 forecast points** (26 weeks × 3 core types)
- **32 engineered features**
- **500 XGBoost trees** (early stopping at iteration 265)

### Forecasting
- **26-week horizon** (6 months)
- **758 total units** forecasted for 2026
- **30.8% MAPE** (mean absolute percentage error)
- **±5 units** (80% confidence interval)

---

## 🚢 Deployment

### Backend (Python)
- Run scripts on server or container
- Schedule periodic retraining (weekly/monthly)
- API wrapper for real-time predictions (optional)

### Frontend (Next.js)
```bash
cd frontend
npm run build
npm start
```

**Vercel Deployment:**
```bash
vercel deploy
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/improvement`)
5. Open Pull Request

---

## 📝 License

See [LICENSE](LICENSE) file for details.

---

## 📧 Contact

For questions or support, please open an issue in the repository.

---

**Built with:** Python, XGBoost, Next.js, TypeScript, React
