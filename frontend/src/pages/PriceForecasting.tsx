import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MdOutlineInsights,
  MdOutlineShowChart,
  MdOutlineTrendingUp,
  MdOutlineTrendingDown,
  MdOutlineCalendarToday,
  MdOutlineTimer,
  MdOutlineCategory,
  MdOutlineFilterList,
  MdOutlineSearch,
  MdOutlineDownload,
  MdOutlineAutoGraph,
  MdOutlineSettings,
  MdOutlineInfo,
  MdOutlineWarning,
  MdOutlineAttachMoney
} from 'react-icons/md';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  Scatter,
  ScatterChart,
  ZAxis,
  ReferenceArea,
  ReferenceLine
} from 'recharts';
import ChatPopup from '../components/ChatPopup';

interface PriceData {
  date: string;
  actual: number;
  forecast: number | null;
  optimistic: number | null;
  pessimistic: number | null;
}

interface CategoryData {
  id: string;
  name: string;
  description: string;
  volatility: 'high' | 'medium' | 'low';
  trend: 'increasing' | 'decreasing' | 'stable';
  currentForecastAccuracy: number;
}

interface ScenarioData {
  name: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  probability: number;
  priceImpact: number;
}

interface FactorData {
  factor: string;
  importance: number;
  correlation: number;
  description: string;
}

const PriceForecasting: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('electronics');
  const [forecastPeriod, setForecastPeriod] = useState<string>('6m');
  const [confidenceLevel, setConfidenceLevel] = useState<number>(80);
  const [modelType, setModelType] = useState<string>('ml');
  
  // Mock categories data
  const categories: CategoryData[] = [
    { 
      id: 'electronics', 
      name: 'Electronics', 
      description: 'Electronic components and finished products',
      volatility: 'medium',
      trend: 'increasing',
      currentForecastAccuracy: 87
    },
    { 
      id: 'raw_materials', 
      name: 'Raw Materials', 
      description: 'Base materials for manufacturing',
      volatility: 'high',
      trend: 'increasing',
      currentForecastAccuracy: 74
    },
    { 
      id: 'packaging', 
      name: 'Packaging', 
      description: 'Packaging materials and supplies',
      volatility: 'medium',
      trend: 'increasing',
      currentForecastAccuracy: 82
    },
    { 
      id: 'logistics', 
      name: 'Logistics', 
      description: 'Transportation and shipping',
      volatility: 'high',
      trend: 'decreasing',
      currentForecastAccuracy: 78
    },
    { 
      id: 'energy', 
      name: 'Energy', 
      description: 'Utilities and energy sources',
      volatility: 'high',
      trend: 'stable',
      currentForecastAccuracy: 68
    }
  ];
  
  // Get the selected category data
  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory) || categories[0];
  
  // Mock forecast data for different periods
  const getForecastData = (): PriceData[] => {
    if (selectedCategory === 'electronics') {
      switch(forecastPeriod) {
        case '3m':
          return [
            { date: 'Apr', actual: 106, forecast: null, optimistic: null, pessimistic: null },
            { date: 'May', actual: null, forecast: 108, optimistic: 107, pessimistic: 109 },
            { date: 'Jun', actual: null, forecast: 110, optimistic: 108, pessimistic: 112 },
            { date: 'Jul', actual: null, forecast: 112, optimistic: 109, pessimistic: 115 }
          ];
        case '6m':
          return [
            { date: 'Jan', actual: 100, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Feb', actual: 102, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Mar', actual: 104, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Apr', actual: 106, forecast: null, optimistic: null, pessimistic: null },
            { date: 'May', actual: null, forecast: 108, optimistic: 107, pessimistic: 109 },
            { date: 'Jun', actual: null, forecast: 110, optimistic: 108, pessimistic: 112 },
            { date: 'Jul', actual: null, forecast: 112, optimistic: 109, pessimistic: 115 },
            { date: 'Aug', actual: null, forecast: 114, optimistic: 110, pessimistic: 118 },
            { date: 'Sep', actual: null, forecast: 116, optimistic: 112, pessimistic: 120 },
            { date: 'Oct', actual: null, forecast: 118, optimistic: 114, pessimistic: 123 }
          ];
        case '12m':
          return [
            { date: 'Apr 23', actual: 90, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Jun 23', actual: 93, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Aug 23', actual: 95, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Oct 23', actual: 98, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Dec 23', actual: 102, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Feb 24', actual: 104, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Apr 24', actual: 106, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Jun 24', actual: null, forecast: 110, optimistic: 108, pessimistic: 112 },
            { date: 'Aug 24', actual: null, forecast: 114, optimistic: 110, pessimistic: 118 },
            { date: 'Oct 24', actual: null, forecast: 118, optimistic: 114, pessimistic: 123 },
            { date: 'Dec 24', actual: null, forecast: 122, optimistic: 116, pessimistic: 128 },
            { date: 'Feb 25', actual: null, forecast: 125, optimistic: 120, pessimistic: 132 },
            { date: 'Apr 25', actual: null, forecast: 128, optimistic: 122, pessimistic: 135 }
          ];
        default:
          return [];
      }
    } else if (selectedCategory === 'raw_materials') {
      switch(forecastPeriod) {
        case '3m':
          return [
            { date: 'Apr', actual: 110, forecast: null, optimistic: null, pessimistic: null },
            { date: 'May', actual: null, forecast: 113, optimistic: 111, pessimistic: 115 },
            { date: 'Jun', actual: null, forecast: 116, optimistic: 113, pessimistic: 119 },
            { date: 'Jul', actual: null, forecast: 120, optimistic: 116, pessimistic: 124 }
          ];
        case '6m':
          // Similar data pattern but different values for raw_materials
          return [
            { date: 'Jan', actual: 100, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Feb', actual: 103, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Mar', actual: 107, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Apr', actual: 110, forecast: null, optimistic: null, pessimistic: null },
            { date: 'May', actual: null, forecast: 113, optimistic: 111, pessimistic: 115 },
            { date: 'Jun', actual: null, forecast: 116, optimistic: 113, pessimistic: 119 },
            { date: 'Jul', actual: null, forecast: 120, optimistic: 116, pessimistic: 124 },
            { date: 'Aug', actual: null, forecast: 123, optimistic: 119, pessimistic: 128 },
            { date: 'Sep', actual: null, forecast: 127, optimistic: 122, pessimistic: 132 },
            { date: 'Oct', actual: null, forecast: 130, optimistic: 125, pessimistic: 136 }
          ];
        case '12m':
          // 12-month data for raw_materials
          return [
            { date: 'Apr 23', actual: 85, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Jun 23', actual: 90, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Aug 23', actual: 95, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Oct 23', actual: 98, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Dec 23', actual: 102, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Feb 24', actual: 106, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Apr 24', actual: 110, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Jun 24', actual: null, forecast: 116, optimistic: 113, pessimistic: 119 },
            { date: 'Aug 24', actual: null, forecast: 123, optimistic: 119, pessimistic: 128 },
            { date: 'Oct 24', actual: null, forecast: 130, optimistic: 125, pessimistic: 136 },
            { date: 'Dec 24', actual: null, forecast: 136, optimistic: 130, pessimistic: 142 },
            { date: 'Feb 25', actual: null, forecast: 142, optimistic: 135, pessimistic: 150 },
            { date: 'Apr 25', actual: null, forecast: 148, optimistic: 140, pessimistic: 158 }
          ];
        default:
          return [];
      }
    } else {
      // Default data for other categories
      switch(forecastPeriod) {
        case '3m':
          return [
            { date: 'Apr', actual: 100, forecast: null, optimistic: null, pessimistic: null },
            { date: 'May', actual: null, forecast: 102, optimistic: 101, pessimistic: 103 },
            { date: 'Jun', actual: null, forecast: 104, optimistic: 102, pessimistic: 106 },
            { date: 'Jul', actual: null, forecast: 106, optimistic: 103, pessimistic: 109 }
          ];
        case '6m':
          return [
            { date: 'Jan', actual: 94, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Feb', actual: 96, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Mar', actual: 98, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Apr', actual: 100, forecast: null, optimistic: null, pessimistic: null },
            { date: 'May', actual: null, forecast: 102, optimistic: 101, pessimistic: 103 },
            { date: 'Jun', actual: null, forecast: 104, optimistic: 102, pessimistic: 106 },
            { date: 'Jul', actual: null, forecast: 106, optimistic: 103, pessimistic: 109 },
            { date: 'Aug', actual: null, forecast: 108, optimistic: 105, pessimistic: 112 },
            { date: 'Sep', actual: null, forecast: 110, optimistic: 107, pessimistic: 114 },
            { date: 'Oct', actual: null, forecast: 112, optimistic: 108, pessimistic: 116 }
          ];
        case '12m':
          return [
            { date: 'Apr 23', actual: 88, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Jun 23', actual: 90, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Aug 23', actual: 92, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Oct 23', actual: 94, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Dec 23', actual: 96, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Feb 24', actual: 98, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Apr 24', actual: 100, forecast: null, optimistic: null, pessimistic: null },
            { date: 'Jun 24', actual: null, forecast: 104, optimistic: 102, pessimistic: 106 },
            { date: 'Aug 24', actual: null, forecast: 108, optimistic: 105, pessimistic: 112 },
            { date: 'Oct 24', actual: null, forecast: 112, optimistic: 108, pessimistic: 116 },
            { date: 'Dec 24', actual: null, forecast: 116, optimistic: 112, pessimistic: 120 },
            { date: 'Feb 25', actual: null, forecast: 120, optimistic: 115, pessimistic: 125 },
            { date: 'Apr 25', actual: null, forecast: 124, optimistic: 118, pessimistic: 130 }
          ];
        default:
          return [];
      }
    }
  };
  
  const forecastData = getForecastData();
  
  // Mock influential factors
  const influentialFactors: FactorData[] = [
    { factor: 'Global Supply Chain', importance: 85, correlation: 0.78, description: 'Overall supply chain health and resilience' },
    { factor: 'Raw Material Costs', importance: 80, correlation: 0.82, description: 'Cost of component materials' },
    { factor: 'Energy Prices', importance: 75, correlation: 0.64, description: 'Oil, gas, and electricity costs' },
    { factor: 'Labor Costs', importance: 70, correlation: 0.58, description: 'Manufacturing workforce expenses' },
    { factor: 'Currency Exchange', importance: 65, correlation: 0.52, description: 'Fluctuations in exchange rates' },
    { factor: 'Regulatory Changes', importance: 60, correlation: 0.42, description: 'Government policies affecting industry' }
  ];
  
  // Mock scenario data
  const scenarioData: ScenarioData[] = [
    { 
      name: 'Base Case', 
      description: 'Expected market conditions with moderate growth',
      impact: 'medium',
      probability: 0.65,
      priceImpact: 1.0
    },
    { 
      name: 'Supply Chain Disruption', 
      description: 'Major disruption to global supply chains',
      impact: 'high',
      probability: 0.15,
      priceImpact: 1.25
    },
    { 
      name: 'Technological Breakthrough', 
      description: 'Innovation reducing production costs',
      impact: 'high',
      probability: 0.10,
      priceImpact: 0.85
    },
    { 
      name: 'Regulatory Changes', 
      description: 'New compliance requirements increasing costs',
      impact: 'medium',
      probability: 0.20,
      priceImpact: 1.12
    },
    { 
      name: 'Economic Downturn', 
      description: 'Reduced demand from economic recession',
      impact: 'high',
      probability: 0.12,
      priceImpact: 0.95
    }
  ];
  
  // Calculate forecast accuracy metrics
  const accuracyMetrics = {
    mape: 6.2, // Mean Absolute Percentage Error
    rmse: 3.8, // Root Mean Square Error
    mae: 2.9,  // Mean Absolute Error
    r2: 0.84,  // R-squared
    historicalAccuracy: selectedCategoryData.currentForecastAccuracy
  };
  
  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Get the forecast range text
  const getForecastRangeText = (): string => {
    const lastActualData = forecastData.filter(d => d.actual !== null).pop();
    const lastActualIndex = lastActualData ? forecastData.indexOf(lastActualData) : -1;
    
    if (lastActualIndex >= 0 && lastActualIndex < forecastData.length - 1) {
      return `${forecastData[lastActualIndex + 1].date} to ${forecastData[forecastData.length - 1].date}`;
    }
    
    return 'N/A';
  };
  
  // Calculate forecast change
  const calculateForecastChange = (): { absolute: number; percentage: number } => {
    if (forecastData.length === 0) {
      return { absolute: 0, percentage: 0 };
    }
    
    const lastActual = forecastData.filter(d => d.actual !== null).pop();
    const lastForecast = forecastData[forecastData.length - 1];
    
    if (lastActual && lastForecast.forecast) {
      const change = lastForecast.forecast - lastActual.actual;
      const percentage = (change / lastActual.actual) * 100;
      return { absolute: change, percentage };
    }
    
    return { absolute: 0, percentage: 0 };
  };
  
  const forecastChange = calculateForecastChange();
  
  // Colors for charts
  const colors = {
    actual: '#3B82F6',
    forecast: '#10B981',
    optimistic: '#10B981',
    pessimistic: '#F59E0B',
    // Bands
    forecastBand: 'rgba(16, 185, 129, 0.1)',
  };

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary">Price Forecasting</h1>
          <p className="text-text-secondary mt-1">Advanced predictive analytics for future price movements</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline btn-sm flex items-center gap-2">
            <MdOutlineDownload className="text-lg" /> Export
          </button>
          <button className="btn btn-primary btn-sm flex items-center gap-2">
            <MdOutlineSettings className="text-lg" /> Configure Models
          </button>
        </div>
      </div>

      {/* Category selection and forecast controls */}
      <div className="glass-panel p-4 rounded-xl mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="text-base font-medium text-text-primary mb-2">Select Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button 
                  key={category.id}
                  className={`btn ${selectedCategory === category.id ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-base font-medium text-text-primary mb-2">Forecast Period</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                className={`btn ${forecastPeriod === '3m' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setForecastPeriod('3m')}
              >
                3 Months
              </button>
              <button 
                className={`btn ${forecastPeriod === '6m' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setForecastPeriod('6m')}
              >
                6 Months
              </button>
              <button 
                className={`btn ${forecastPeriod === '12m' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setForecastPeriod('12m')}
              >
                12 Months
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-base font-medium text-text-primary mb-2">Confidence Level</h3>
            <div className="flex items-center">
              <input 
                type="range" 
                min="50" 
                max="95" 
                step="5" 
                value={confidenceLevel}
                onChange={e => setConfidenceLevel(parseInt(e.target.value))}
                className="range range-primary range-sm"
              />
              <span className="ml-2 text-text-primary">{confidenceLevel}%</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-base font-medium text-text-primary mb-2">Forecast Model</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                className={`btn ${modelType === 'ml' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setModelType('ml')}
              >
                Machine Learning
              </button>
              <button 
                className={`btn ${modelType === 'arima' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setModelType('arima')}
              >
                ARIMA
              </button>
              <button 
                className={`btn ${modelType === 'ensemble' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setModelType('ensemble')}
              >
                Ensemble
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="glass-panel p-5 rounded-xl hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-text-muted mb-1">Forecast Range</p>
              <h3 className="text-2xl font-bold text-text-primary">{getForecastRangeText()}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-accent-primary/20 flex items-center justify-center">
              <MdOutlineCalendarToday className="text-accent-primary text-2xl" />
            </div>
          </div>
          <div className="flex items-center text-xs">
            <span className="text-text-muted">
              Based on {modelType === 'ml' ? 'Machine Learning' : modelType === 'arima' ? 'ARIMA' : 'Ensemble'} model
            </span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-xl hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-text-muted mb-1">Projected Change</p>
              <h3 className="text-2xl font-bold text-text-primary">
                {forecastChange.percentage > 0 ? '+' : ''}{forecastChange.percentage.toFixed(1)}%
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-accent-secondary/20 flex items-center justify-center">
              {forecastChange.percentage > 0 ? (
                <MdOutlineTrendingUp className="text-accent-secondary text-2xl" />
              ) : (
                <MdOutlineTrendingDown className="text-accent-secondary text-2xl" />
              )}
            </div>
          </div>
          <div className="flex items-center text-xs">
            <span className="text-text-muted">
              Expected change over the {forecastPeriod === '3m' ? '3-month' : forecastPeriod === '6m' ? '6-month' : '12-month'} period
            </span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-xl hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-text-muted mb-1">Forecast Accuracy</p>
              <h3 className="text-2xl font-bold text-text-primary">{accuracyMetrics.historicalAccuracy}%</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-accent-warning/20 flex items-center justify-center">
              <MdOutlineInsights className="text-accent-warning text-2xl" />
            </div>
          </div>
          <div className="flex items-center text-xs">
            <span className="text-text-muted">
              Historical accuracy for {selectedCategoryData.name} forecasts
            </span>
          </div>
        </div>
      </div>

      {/* Main Forecast Chart */}
      <div className="glass-panel p-6 rounded-xl mb-6">
        <div className="flex items-center mb-4">
          <MdOutlineAutoGraph className="text-accent-primary mr-2 text-xl" />
          <h2 className="text-lg font-semibold text-text-primary">
            {selectedCategoryData.name} Price Forecast
          </h2>
          <span className="ml-2 tooltip" data-tip="Forecast based on historical trends, market indicators, and machine learning models">
            <MdOutlineInfo className="text-text-muted" />
          </span>
        </div>
        
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={forecastData}
              margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" />
              <YAxis 
                domain={[(dataMin: number) => Math.floor(dataMin * 0.95), (dataMax: number) => Math.ceil(dataMax * 1.05)]} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(26, 26, 26, 0.8)', 
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)', 
                  borderRadius: '8px' 
                }}
              />
              <Legend />
              
              {/* Draw reference line between historical and forecast */}
              {forecastData.some(d => d.actual !== null) && forecastData.some(d => d.forecast !== null) && (
                <ReferenceLine 
                  x={forecastData.find(d => d.forecast !== null)?.date} 
                  stroke="rgba(255, 255, 255, 0.3)" 
                  strokeDasharray="3 3"
                  label={{ value: 'Forecast Start', position: 'top', fill: '#B3B3B3' }}
                />
              )}
              
              {/* Optimistic and pessimistic bands */}
              <Area 
                type="monotone" 
                dataKey="pessimistic" 
                fill={colors.forecastBand}
                stroke="none"
                name="Pessimistic"
              />
              <Area 
                type="monotone" 
                dataKey="optimistic" 
                fill={colors.forecastBand}
                stroke="none" 
                name="Optimistic"
              />
              
              {/* Actual and forecast lines */}
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke={colors.actual} 
                strokeWidth={2}
                name="Actual Price"
                dot={{ stroke: colors.actual, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                stroke={colors.forecast} 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Forecast"
                dot={{ stroke: colors.forecast, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 8 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-background-secondary p-4 rounded-lg">
            <h3 className="text-base font-medium text-text-primary mb-2">Model Performance</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-text-muted">MAPE</p>
                <p className="text-lg font-medium text-text-primary">{accuracyMetrics.mape}%</p>
              </div>
              <div>
                <p className="text-sm text-text-muted">RMSE</p>
                <p className="text-lg font-medium text-text-primary">{accuracyMetrics.rmse}</p>
              </div>
              <div>
                <p className="text-sm text-text-muted">MAE</p>
                <p className="text-lg font-medium text-text-primary">{accuracyMetrics.mae}</p>
              </div>
              <div>
                <p className="text-sm text-text-muted">R²</p>
                <p className="text-lg font-medium text-text-primary">{accuracyMetrics.r2}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-background-secondary p-4 rounded-lg">
            <h3 className="text-base font-medium text-text-primary mb-2">Forecast Insights</h3>
            <p className="text-text-secondary text-sm">
              • Price trend is {selectedCategoryData.trend} with {selectedCategoryData.volatility} volatility<br />
              • Confidence band widens over time, reflecting increasing uncertainty<br />
              • {confidenceLevel}% confidence level applied to the forecast range<br />
              • Updated weekly based on latest market data
            </p>
          </div>
        </div>
      </div>

      {/* Influential Factors */}
      <div className="glass-panel p-6 rounded-xl mb-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Key Influential Factors
        </h2>
        
        <div className="overflow-x-auto">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={influentialFactors}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 130, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="factor" width={120} />
                <Tooltip 
                  formatter={(value: number) => [`${value}`, 'Importance Score']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(26, 26, 26, 0.8)', 
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '8px' 
                  }}
                />
                <Bar 
                  dataKey="importance"
                  fill="#3B82F6"
                  radius={[0, 4, 4, 0]}
                  label={{ 
                    position: 'right', 
                    formatter: (value: number) => `${value}`,
                    fill: '#FFFFFF'
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="mt-4 bg-background-secondary p-4 rounded-lg">
          <p className="text-text-secondary text-sm">
            The chart above shows the key factors influencing {selectedCategoryData.name.toLowerCase()} prices. 
            Higher scores indicate stronger influence on price movements. These factors are incorporated into the forecast model.
          </p>
        </div>
      </div>

      {/* Scenario Analysis */}
      <div className="glass-panel p-6 rounded-xl mb-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Scenario Analysis</h2>
        
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Scenario</th>
                <th>Description</th>
                <th>Probability</th>
                <th>Price Impact</th>
                <th>Exp. Outcome</th>
              </tr>
            </thead>
            <tbody>
              {scenarioData.map((scenario, index) => {
                // Get the baseline forecast from the middle of the forecast period
                const midForecast = forecastData.find(d => d.forecast !== null)?.forecast || 100;
                const impactedPrice = midForecast * scenario.priceImpact;
                
                return (
                  <tr key={index}>
                    <td>
                      <div className="font-medium">
                        {scenario.name}
                      </div>
                    </td>
                    <td>{scenario.description}</td>
                    <td>
                      <div className="flex items-center">
                        <span className={`badge ${
                          scenario.probability > 0.5 ? 'badge-primary' : 
                          scenario.probability > 0.2 ? 'badge-info' : 
                          'badge-ghost'
                        }`}>
                          {(scenario.probability * 100).toFixed(0)}%
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center">
                        {scenario.priceImpact > 1 ? (
                          <MdOutlineTrendingUp className="text-accent-warning mr-1" />
                        ) : scenario.priceImpact < 1 ? (
                          <MdOutlineTrendingDown className="text-accent-secondary mr-1" />
                        ) : (
                          <MdOutlineInsights className="text-accent-primary mr-1" />
                        )}
                        <span>
                          {scenario.priceImpact > 1 ? '+' : ''}{((scenario.priceImpact - 1) * 100).toFixed(0)}%
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className={`${
                        scenario.priceImpact > 1 ? 'text-accent-warning' : 
                        scenario.priceImpact < 1 ? 'text-accent-secondary' : 
                        'text-text-primary'
                      }`}>
                        Index: {impactedPrice.toFixed(1)}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 bg-background-secondary p-4 rounded-lg">
          <div className="flex items-center gap-1 mb-2">
            <MdOutlineWarning className="text-accent-warning" />
            <h3 className="text-base font-medium text-text-primary">Risk Assessment</h3>
          </div>
          <p className="text-text-secondary text-sm">
            Based on scenario analysis, there is a {(scenarioData.filter(s => s.priceImpact > 1.1).reduce((sum, s) => sum + s.probability, 0) * 100).toFixed(0)}% probability 
            of significant price increases (&gt;10%) over the forecast period. The most impactful risk factor is "{influentialFactors[0].factor}".
          </p>
        </div>
      </div>
      
      {/* Additional Resources */}
      <div className="glass-panel p-6 rounded-xl mb-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Related Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/price-tracker" className="glass-panel p-4 rounded-lg hover:bg-background-accent/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center">
                <MdOutlineAttachMoney className="text-accent-primary text-xl" />
              </div>
              <div>
                <h3 className="font-medium text-text-primary">Price Tracker</h3>
                <p className="text-text-secondary text-sm">Current price monitoring</p>
              </div>
            </div>
          </Link>
          
          <Link to="/market-trends" className="glass-panel p-4 rounded-lg hover:bg-background-accent/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent-warning/20 flex items-center justify-center">
                <MdOutlineTrendingUp className="text-accent-warning text-xl" />
              </div>
              <div>
                <h3 className="font-medium text-text-primary">Market Trends</h3>
                <p className="text-text-secondary text-sm">Long-term trend analysis</p>
              </div>
            </div>
          </Link>
          
          <Link to="/product-categories" className="glass-panel p-4 rounded-lg hover:bg-background-accent/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent-secondary/20 flex items-center justify-center">
                <MdOutlineCategory className="text-accent-secondary text-xl" />
              </div>
              <div>
                <h3 className="font-medium text-text-primary">Product Categories</h3>
                <p className="text-text-secondary text-sm">Browse by category</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      
      <ChatPopup />
    </div>
  );
};

export default PriceForecasting; 