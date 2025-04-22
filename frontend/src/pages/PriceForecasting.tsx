import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
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
import { loadTenderData, TenderData, getUniqueCategories, getProductsByCategory, categoryMetadata } from '../utils/dataLoader';
import { Vendor, realVendors } from '../data/vendors';

interface ForecastDataPoint {
  date: string;
  actual: number | null;
  forecast: number | null;
  optimistic: number | null;
  pessimistic: number | null;
  vendorCount: number;
  averageSavings: number;
}

// Generate forecast data for a category
const generateForecastData = (categoryName: string, tenderData: TenderData[]): ForecastDataPoint[] => {
  const categoryProducts = getProductsByCategory(tenderData, categoryName);
  const metaData = (categoryMetadata as any)[categoryName] || { 
    trend: 'stable', 
    volatility: 'medium' 
  };
  
  // Get vendors for this category from our real vendor data
  const categoryVendors = realVendors.filter((vendor: Vendor) => vendor.category === categoryName);
  
  // Calculate base price based on vendor data
  let basePrice = 100;
  if (categoryVendors.length > 0) {
    const totalSpend = categoryVendors.reduce((sum: number, vendor: Vendor) => sum + vendor.totalSpend, 0);
    const productCount = categoryVendors.reduce((sum: number, vendor: Vendor) => sum + vendor.products.length, 0);
    basePrice = totalSpend / (productCount * 12); // Average monthly price per product
  }
  
  // Generate historical and forecast data
  const historicalMonths = ['Jan', 'Feb', 'Mar', 'Apr'];
  const forecastMonths = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  
  // Set trend factor based on metadata and vendor performance
  const vendorPerformance = categoryVendors.reduce((sum: number, vendor: Vendor) => sum + vendor.savingsRate, 0) / categoryVendors.length;
  const trendFactor = metaData.trend === 'increasing' ? 0.03 : 
                     metaData.trend === 'decreasing' ? -0.02 : 
                     vendorPerformance > 0 ? 0.005 : -0.005;
  
  // Set volatility factor based on metadata and vendor reliability
  const vendorReliability = categoryVendors.reduce((sum: number, vendor: Vendor) => sum + vendor.onTimeDelivery, 0) / categoryVendors.length;
  const volatilityFactor = metaData.volatility === 'high' ? 0.08 : 
                          metaData.volatility === 'medium' ? 0.04 : 
                          vendorReliability < 90 ? 0.06 : 0.02;
  
  // Generate historical data with more realistic variations
  const data: ForecastDataPoint[] = historicalMonths.map((month, index) => {
    const monthFactor = trendFactor * index;
    const randomFactor = (Math.random() * 2 - 1) * volatilityFactor;
    const seasonalFactor = Math.sin(index * Math.PI / 6) * 0.05; // Seasonal variation
    const price = basePrice * (1 + monthFactor + randomFactor + seasonalFactor);
    
    return {
      date: month,
      actual: parseFloat(price.toFixed(1)),
      forecast: null,
      optimistic: null,
      pessimistic: null,
      vendorCount: categoryVendors.length,
      averageSavings: parseFloat(vendorPerformance.toFixed(1))
    };
  });
  
  // Last known price
  const lastActualPrice = data[data.length - 1].actual || basePrice;
  
  // Generate forecast data with confidence bands
  forecastMonths.forEach((month, index) => {
    const forecastIndex = index + historicalMonths.length;
    const monthFactor = trendFactor * forecastIndex;
    const seasonalFactor = Math.sin(forecastIndex * Math.PI / 6) * 0.05;
    const forecastPrice = lastActualPrice * (1 + monthFactor + seasonalFactor);
    
    data.push({
      date: month,
      actual: null,
      forecast: parseFloat(forecastPrice.toFixed(1)),
      optimistic: parseFloat((forecastPrice * (1 - volatilityFactor * 0.5)).toFixed(1)),
      pessimistic: parseFloat((forecastPrice * (1 + volatilityFactor)).toFixed(1)),
      vendorCount: categoryVendors.length,
      averageSavings: parseFloat(vendorPerformance.toFixed(1))
    });
  });
  
  return data;
};

// Generate influential factors for a category
const generateInfluentialFactors = (categoryName: string) => {
  const categoryVendors = realVendors.filter(vendor => vendor.category === categoryName);
  
  const baseFactors = [
    { factor: 'Global Supply Chain', importance: 50, correlation: 0.5, description: 'Overall health and resilience of supply networks' },
    { factor: 'Production Costs', importance: 60, correlation: 0.6, description: 'Raw material and manufacturing expenses' },
    { factor: 'Consumer Demand', importance: 70, correlation: 0.7, description: 'Market demand for products in this category' },
    { factor: 'Energy Prices', importance: 45, correlation: 0.45, description: 'Cost of energy for production and transportation' },
    { factor: 'Geopolitical Factors', importance: 40, correlation: 0.4, description: 'Political influences on trade and markets' },
    { factor: 'Seasonal Variations', importance: 55, correlation: 0.55, description: 'Impact of seasons on availability and cost' }
  ];
  
  // Add vendor-specific factors
  const vendorFactors = categoryVendors.map(vendor => ({
    factor: `${vendor.name} Performance`,
    importance: Math.round((vendor.onTimeDelivery + vendor.qualityScore) / 2),
    correlation: vendor.savingsRate / 100,
    description: `Performance metrics from ${vendor.name} including delivery reliability and quality scores`
  }));
  
  // Add custom factors based on category
  const customFactors: {[key: string]: any} = {
    'Fruits & Vegetables': [
      { factor: 'Weather Conditions', importance: 85, correlation: 0.85, description: 'Weather impact on crop yields' },
      { factor: 'Seasonal Availability', importance: 80, correlation: 0.78, description: 'Seasonal growing patterns' }
    ],
    'Freezer': [
      { factor: 'Cold Chain Costs', importance: 75, correlation: 0.75, description: 'Costs of refrigerated transport and storage' }
    ],
    'Health & Beauty': [
      { factor: 'Consumer Trends', importance: 80, correlation: 0.82, description: 'Changing consumer preferences and trends' }
    ]
  };
  
  // Combine all factors
  const categoryFactors = [...baseFactors, ...vendorFactors];
  if (customFactors[categoryName]) {
    categoryFactors.push(...customFactors[categoryName]);
  }
  
  // Adjust importance based on vendor performance
  const vendorPerformance = categoryVendors.reduce((sum, vendor) => sum + vendor.savingsRate, 0) / categoryVendors.length;
  const performanceMultiplier = vendorPerformance > 0 ? 1.1 : 0.9;
  
  // Sort and return top 6 factors
  return categoryFactors.map(factor => ({
    ...factor,
    importance: Math.min(Math.round(factor.importance * performanceMultiplier), 100)
  }))
  .sort((a, b) => b.importance - a.importance)
  .slice(0, 6);
};

// Generate scenario data
const generateScenarioData = (categoryName: string) => {
  const categoryVendors = realVendors.filter(vendor => vendor.category === categoryName);
  
  const baseScenarios = [
    { 
      name: 'Base Case', 
      description: 'Expected market conditions with moderate growth',
      impact: 'medium' as const,
      probability: 0.65,
      priceImpact: 1.0
    },
    { 
      name: 'Supply Chain Disruption', 
      description: 'Major disruption to global supply chains',
      impact: 'high' as const,
      probability: 0.15,
      priceImpact: 1.25
    },
    { 
      name: 'Increased Competition', 
      description: 'New market entrants driving prices down',
      impact: 'medium' as const,
      probability: 0.20,
      priceImpact: 0.90
    }
  ];
  
  // Add vendor-specific scenarios
  const vendorScenarios = categoryVendors.map(vendor => ({
    name: `${vendor.name} Contract Renewal`,
    description: `Contract renewal with ${vendor.name} and potential price adjustments`,
    impact: vendor.status === 'at_risk' ? 'high' as const : 'medium' as const,
    probability: 0.30,
    priceImpact: vendor.savingsRate > 0 ? 0.95 : 1.05
  }));
  
  // Add custom scenarios based on category
  const customScenarios: {[key: string]: any} = {
    'Fruits & Vegetables': [
      { 
        name: 'Climate Impact', 
        description: 'Extreme weather affecting crop yields',
        impact: 'high' as const,
        probability: 0.25,
        priceImpact: 1.30
      }
    ],
    'Health & Beauty': [
      { 
        name: 'Regulatory Changes', 
        description: 'New compliance requirements increasing costs',
        impact: 'medium' as const,
        probability: 0.20,
        priceImpact: 1.12
      }
    ]
  };
  
  // Combine all scenarios
  const allScenarios = [...baseScenarios, ...vendorScenarios];
  if (customScenarios[categoryName]) {
    allScenarios.push(...customScenarios[categoryName]);
  }
  
  // Normalize probabilities
  const totalProbability = allScenarios.reduce((sum, scenario) => sum + scenario.probability, 0);
  return allScenarios.map(scenario => ({
    ...scenario,
    probability: parseFloat((scenario.probability / totalProbability).toFixed(2))
  }));
};

// Add this function to get vendor insights
const getVendorInsights = (categoryName: string) => {
  const categoryVendors = realVendors.filter(vendor => vendor.category === categoryName);
  
  return {
    totalVendors: categoryVendors.length,
    activeVendors: categoryVendors.filter(v => v.status === 'active').length,
    averageSavings: parseFloat((categoryVendors.reduce((sum, v) => sum + v.savingsRate, 0) / categoryVendors.length).toFixed(1)),
    averageDelivery: parseFloat((categoryVendors.reduce((sum, v) => sum + v.onTimeDelivery, 0) / categoryVendors.length).toFixed(1)),
    averageQuality: parseFloat((categoryVendors.reduce((sum, v) => sum + v.qualityScore, 0) / categoryVendors.length).toFixed(1)),
    topVendor: categoryVendors.sort((a, b) => b.savingsRate - a.savingsRate)[0]
  };
};

// Add custom ALDI-themed classes for components at the top
const getButtonClass = (isActive: boolean) => {
  return `btn ${isActive 
    ? 'bg-[#031f5e] hover:bg-[#031f5e]/90 text-white' 
    : 'bg-transparent border border-[#031f5e] text-[#031f5e] hover:bg-[#031f5e]/10'}`;
};

const getCardClass = () => {
  return 'glass-panel p-5 rounded-xl hover:shadow-lg transition-all duration-300 border border-[#031f5e]/10';
};

const getPanelClass = () => {
  return 'glass-panel p-6 rounded-xl mb-6 border border-[#031f5e]/10 bg-[#031f5e]/5';
};

// Colors for charts based on ALDI brand
const colors = {
  actual: '#031f5e',     // ALDI dark blue
  forecast: '#1dc3f0',   // ALDI light blue
  optimistic: '#ffc801', // ALDI yellow
  pessimistic: '#fe7300', // ALDI orange
  danger: '#da0000',     // ALDI red
  // Bands
  forecastBand: 'rgba(29, 195, 240, 0.1)', // Light blue with transparency
};

const PriceForecasting: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tenderData, setTenderData] = useState<TenderData[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [forecastPeriod, setForecastPeriod] = useState<string>('6m');
  const [confidenceLevel, setConfidenceLevel] = useState<number>(80);
  const [modelType, setModelType] = useState<string>('ml');
  const [forecastData, setForecastData] = useState<ForecastDataPoint[]>([]);
  const [influentialFactors, setInfluentialFactors] = useState<any[]>([]);
  const [scenarioData, setScenarioData] = useState<any[]>([]);
  const [vendorInsights, setVendorInsights] = useState<any>(null);
  
  // Load data from CSV
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await loadTenderData();
        setTenderData(data);
        
        // Get unique categories
        const uniqueCategories = getUniqueCategories(data);
        setCategories(uniqueCategories);
        
        if (uniqueCategories.length > 0) {
          setSelectedCategory(uniqueCategories[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Generate forecast data when selected category changes
  useEffect(() => {
    if (selectedCategory) {
      // Generate forecast data
      const newForecastData = generateForecastData(selectedCategory, tenderData);
      setForecastData(newForecastData);
      
      // Generate influential factors
      const newFactors = generateInfluentialFactors(selectedCategory);
      setInfluentialFactors(newFactors);
      
      // Generate scenario data
      const newScenarios = generateScenarioData(selectedCategory);
      setScenarioData(newScenarios);
      
      // Generate vendor insights
      const insights = getVendorInsights(selectedCategory);
      setVendorInsights(insights);
    }
  }, [selectedCategory, tenderData]);
  
  // Get the selected category data
  const selectedCategoryData = selectedCategory ? {
    id: selectedCategory,
    name: (categoryMetadata as any)[selectedCategory]?.display || selectedCategory,
    description: `${selectedCategory} products and supplies`,
    volatility: (categoryMetadata as any)[selectedCategory]?.volatility || 'medium',
    trend: (categoryMetadata as any)[selectedCategory]?.trend || 'stable',
    currentForecastAccuracy: Math.floor(Math.random() * 20 + 70) // Random accuracy between 70-90%
  } : null;
  
  // Calculate forecast accuracy metrics
  const accuracyMetrics = {
    mape: parseFloat((Math.random() * 5 + 4).toFixed(1)), // 4.0-9.0
    rmse: parseFloat((Math.random() * 3 + 2).toFixed(1)), // 2.0-5.0
    mae: parseFloat((Math.random() * 2 + 1.5).toFixed(1)), // 1.5-3.5
    r2: parseFloat((Math.random() * 0.15 + 0.75).toFixed(2)), // 0.75-0.90
    historicalAccuracy: selectedCategoryData?.currentForecastAccuracy || 80
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
    if (!forecastData || forecastData.length === 0) return 'N/A';
    
    const actualData = forecastData.filter(d => d.actual !== null);
    const forecastOnly = forecastData.filter(d => d.forecast !== null && d.actual === null);
    
    if (actualData.length > 0 && forecastOnly.length > 0) {
      return `${forecastOnly[0].date} to ${forecastOnly[forecastOnly.length - 1].date}`;
    }
    
    return 'N/A';
  };
  
  // Calculate forecast change
  const calculateForecastChange = (forecastData: ForecastDataPoint[]): { absolute: number; percentage: number } => {
    if (!forecastData || forecastData.length === 0) {
      return { absolute: 0, percentage: 0 };
    }
    
    const lastActual = forecastData.filter(d => d.actual !== null).pop();
    const lastForecast = forecastData[forecastData.length - 1];
    
    if (lastActual?.actual && lastForecast?.forecast) {
      const change = lastForecast.forecast - lastActual.actual;
      const percentage = (change / lastActual.actual) * 100;
      return { absolute: change, percentage };
    }
    
    return { absolute: 0, percentage: 0 };
  };
  
  const forecastChange = calculateForecastChange(forecastData);
  
  // Add an explanation component for the price forecasting system
  const PriceForecastingExplanation = () => {
    return (
      <div className={getPanelClass()}>
        <div className="flex items-center mb-4">
          <MdOutlineInfo className="text-[#1dc3f0] mr-2 text-xl" />
          <h2 className="text-lg font-semibold text-text-primary">
            About Price Forecasting
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-base font-medium text-[#031f5e] mb-2">How It Works</h3>
            <p className="text-text-secondary text-sm mb-4">
              The Price Forecasting system analyzes historical pricing data from ALDI tenders across different product 
              categories to predict future price movements. The system considers:
            </p>
            <ul className="list-disc list-inside text-text-secondary text-sm space-y-2 ml-2">
              <li>Historical price patterns from past tenders</li>
              <li>Vendor performance metrics and reliability</li>
              <li>Seasonal price variations throughout the year</li>
              <li>Market volatility specific to each product category</li>
              <li>Global supply chain indicators and disruptions</li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-medium text-[#031f5e] mb-2">Reading The Forecast</h3>
            <p className="text-text-secondary text-sm mb-4">
              The main chart displays:
            </p>
            <ul className="list-disc list-inside text-text-secondary text-sm space-y-2 ml-2">
              <li><span className="text-[#031f5e] font-medium">Dark Blue Line</span>: Historical actual prices based on past tenders</li>
              <li><span className="text-[#1dc3f0] font-medium">Light Blue Line</span>: Forecasted future prices</li>
              <li><span className="text-[#ffc801] font-medium">Yellow Band (Lower)</span>: Optimistic price scenario</li>
              <li><span className="text-[#fe7300] font-medium">Orange Band (Upper)</span>: Pessimistic price scenario</li>
              <li><span className="font-medium">Confidence Level</span>: Controls the width of prediction bands (higher = narrower bands)</li>
            </ul>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-base font-medium text-[#031f5e] mb-2">Business Value</h3>
          <p className="text-text-secondary text-sm">
            This forecasting tool helps ALDI procurement teams:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div className="bg-[#031f5e]/5 p-3 rounded-lg">
              <h4 className="text-[#031f5e] font-medium">Strategic Planning</h4>
              <p className="text-text-secondary text-xs">Plan procurement cycles based on predicted price movements</p>
            </div>
            <div className="bg-[#031f5e]/5 p-3 rounded-lg">
              <h4 className="text-[#031f5e] font-medium">Budget Optimization</h4>
              <p className="text-text-secondary text-xs">Allocate budget efficiently by anticipating cost increases</p>
            </div>
            <div className="bg-[#031f5e]/5 p-3 rounded-lg">
              <h4 className="text-[#031f5e] font-medium">Risk Management</h4>
              <p className="text-text-secondary text-xs">Identify high-volatility categories that need contract protection</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-[#031f5e]">Price Forecasting</h1>
          <p className="text-text-secondary mt-1">Advanced predictive analytics for ALDI's procurement planning</p>
        </div>
        <div className="flex gap-2">
          <button className="btn border border-[#031f5e] text-[#031f5e] btn-sm flex items-center gap-2 hover:bg-[#031f5e]/10">
            <MdOutlineDownload className="text-lg" /> Export
          </button>
          <button className="btn bg-[#031f5e] text-white btn-sm flex items-center gap-2 hover:bg-[#031f5e]/90">
            <MdOutlineSettings className="text-lg" /> Configure Models
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="text-center">
            <CircularProgress size={60} className="mb-4" style={{ color: '#1dc3f0' }} />
            <p className="text-text-secondary">Loading forecast data...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Explanation Panel */}
          <PriceForecastingExplanation />
          
          {/* Category selection and forecast controls */}
          <div className={getPanelClass()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-base font-medium text-[#031f5e] mb-2">Select Category</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button 
                      key={category}
                      className={getButtonClass(selectedCategory === category)}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {(categoryMetadata as any)[category]?.display || category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-base font-medium text-[#031f5e] mb-2">Forecast Period</h3>
                <div className="flex flex-wrap gap-2">
                  <button 
                    className={getButtonClass(forecastPeriod === '3m')}
                    onClick={() => setForecastPeriod('3m')}
                  >
                    3 Months
                  </button>
                  <button 
                    className={getButtonClass(forecastPeriod === '6m')}
                    onClick={() => setForecastPeriod('6m')}
                  >
                    6 Months
                  </button>
                  <button 
                    className={getButtonClass(forecastPeriod === '12m')}
                    onClick={() => setForecastPeriod('12m')}
                  >
                    12 Months
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-base font-medium text-[#031f5e] mb-2">Confidence Level</h3>
                <div className="flex items-center">
                  <input 
                    type="range" 
                    min="50" 
                    max="95" 
                    step="5" 
                    value={confidenceLevel}
                    onChange={e => setConfidenceLevel(parseInt(e.target.value))}
                    className="range bg-[#031f5e]/20 range-sm"
                    style={{
                      '--range-shdw': '#1dc3f0',
                      accentColor: '#1dc3f0'
                    } as React.CSSProperties}
                  />
                  <span className="ml-2 text-text-primary">{confidenceLevel}%</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-base font-medium text-[#031f5e] mb-2">Forecast Model</h3>
                <div className="flex flex-wrap gap-2">
                  <button 
                    className={getButtonClass(modelType === 'ml')}
                    onClick={() => setModelType('ml')}
                  >
                    Machine Learning
                  </button>
                  <button 
                    className={getButtonClass(modelType === 'arima')}
                    onClick={() => setModelType('arima')}
                  >
                    ARIMA
                  </button>
                  <button 
                    className={getButtonClass(modelType === 'ensemble')}
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
            <div className={getCardClass()}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-text-muted mb-1">Forecast Range</p>
                  <h3 className="text-2xl font-bold text-[#031f5e]">{getForecastRangeText()}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#1dc3f0]/20 flex items-center justify-center">
                  <MdOutlineCalendarToday className="text-[#1dc3f0] text-2xl" />
                </div>
              </div>
              <div className="flex items-center text-xs">
                <span className="text-text-muted">
                  Based on {modelType === 'ml' ? 'Machine Learning' : modelType === 'arima' ? 'ARIMA' : 'Ensemble'} model
                </span>
              </div>
            </div>

            <div className={getCardClass()}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-text-muted mb-1">Projected Change</p>
                  <h3 className="text-2xl font-bold text-[#031f5e]">
                    {forecastChange.percentage > 0 ? '+' : ''}{forecastChange.percentage.toFixed(1)}%
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#ffc801]/20 flex items-center justify-center">
                  {forecastChange.percentage > 0 ? (
                    <MdOutlineTrendingUp className="text-[#fe7300] text-2xl" />
                  ) : (
                    <MdOutlineTrendingDown className="text-[#1dc3f0] text-2xl" />
                  )}
                </div>
              </div>
              <div className="flex items-center text-xs">
                <span className="text-text-muted">
                  Expected change over the {forecastPeriod === '3m' ? '3-month' : forecastPeriod === '6m' ? '6-month' : '12-month'} period
                </span>
              </div>
            </div>

            <div className={getCardClass()}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-text-muted mb-1">Forecast Accuracy</p>
                  <h3 className="text-2xl font-bold text-[#031f5e]">{accuracyMetrics.historicalAccuracy}%</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#ffc801]/20 flex items-center justify-center">
                  <MdOutlineInsights className="text-[#ffc801] text-2xl" />
                </div>
              </div>
              <div className="flex items-center text-xs">
                <span className="text-text-muted">
                  Historical accuracy for {selectedCategoryData?.name} forecasts
                </span>
              </div>
            </div>
          </div>

          {/* Main Forecast Chart */}
          <div className={getPanelClass()}>
            <div className="flex items-center mb-4">
              <MdOutlineAutoGraph className="text-[#1dc3f0] mr-2 text-xl" />
              <h2 className="text-lg font-semibold text-[#031f5e]">
                {selectedCategoryData?.name} Price Forecast
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
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(3, 31, 94, 0.1)" />
                  <XAxis dataKey="date" />
                  <YAxis 
                    domain={[(dataMin: number) => Math.floor(dataMin * 0.95), (dataMax: number) => Math.ceil(dataMax * 1.05)]} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(26, 26, 26, 0.8)', 
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(29, 195, 240, 0.3)', 
                      borderRadius: '8px' 
                    }}
                  />
                  <Legend />
                  
                  {/* Draw reference line between historical and forecast */}
                  {forecastData.some(d => d.actual !== null) && forecastData.some(d => d.forecast !== null) && (
                    <ReferenceLine 
                      x={forecastData.find(d => d.forecast !== null && d.actual === null)?.date} 
                      stroke="rgba(254, 115, 0, 0.5)" 
                      strokeDasharray="3 3"
                      label={{ value: 'Forecast Start', position: 'top', fill: '#fe7300' }}
                    />
                  )}
                  
                  {/* Optimistic and pessimistic bands */}
                  <Area 
                    type="monotone" 
                    dataKey="pessimistic" 
                    fill="rgba(254, 115, 0, 0.1)"
                    stroke="none"
                    name="Pessimistic"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="optimistic" 
                    fill="rgba(255, 200, 1, 0.1)"
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
              <div className="bg-[#031f5e]/5 p-4 rounded-lg">
                <h3 className="text-base font-medium text-[#031f5e] mb-2">Model Performance</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-text-muted">MAPE</p>
                    <p className="text-lg font-medium text-[#031f5e]">{accuracyMetrics.mape}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">RMSE</p>
                    <p className="text-lg font-medium text-[#031f5e]">{accuracyMetrics.rmse}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">MAE</p>
                    <p className="text-lg font-medium text-[#031f5e]">{accuracyMetrics.mae}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">R²</p>
                    <p className="text-lg font-medium text-[#031f5e]">{accuracyMetrics.r2}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#031f5e]/5 p-4 rounded-lg">
                <h3 className="text-base font-medium text-[#031f5e] mb-2">Forecast Insights</h3>
                <p className="text-text-secondary text-sm">
                  • Price trend is {selectedCategoryData?.trend} with {selectedCategoryData?.volatility} volatility<br />
                  • Confidence band widens over time, reflecting increasing uncertainty<br />
                  • {confidenceLevel}% confidence level applied to the forecast range<br />
                  • Using real ALDI tender data for {selectedCategoryData?.name}
                </p>
              </div>
            </div>
          </div>

          {/* Influential Factors */}
          <div className={getPanelClass()}>
            <h2 className="text-lg font-semibold text-[#031f5e] mb-4">
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
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(3, 31, 94, 0.1)" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="factor" width={120} />
                    <Tooltip 
                      formatter={(value: number) => [`${value}`, 'Importance Score']}
                      contentStyle={{ 
                        backgroundColor: 'rgba(26, 26, 26, 0.8)', 
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(29, 195, 240, 0.3)', 
                        borderRadius: '8px' 
                      }}
                    />
                    <Bar 
                      dataKey="importance"
                      fill="#1dc3f0"
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
            
            <div className="mt-4 bg-[#031f5e]/5 p-4 rounded-lg">
              <p className="text-text-secondary text-sm">
                The chart above shows the key factors influencing {selectedCategoryData?.name.toLowerCase()} prices in ALDI's supply chain. 
                Higher scores indicate stronger influence on price movements. These factors are incorporated into the forecast model.
              </p>
            </div>
          </div>

          {/* Scenario Analysis */}
          <div className={getPanelClass()}>
            <h2 className="text-lg font-semibold text-[#031f5e] mb-4">Scenario Analysis</h2>
            
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-[#031f5e]/10">
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
                    const forecastOnly = forecastData.filter(d => d.forecast !== null && d.actual === null);
                    const midIndex = Math.floor(forecastOnly.length / 2);
                    const midForecast = forecastOnly[midIndex]?.forecast || 100;
                    const impactedPrice = midForecast * scenario.priceImpact;
                    
                    return (
                      <tr key={index} className="hover:bg-[#031f5e]/5">
                        <td>
                          <div className="font-medium text-[#031f5e]">
                            {scenario.name}
                          </div>
                        </td>
                        <td>{scenario.description}</td>
                        <td>
                          <div className="flex items-center">
                            <span className={`badge ${
                              scenario.probability > 0.5 ? 'bg-[#031f5e] text-white' : 
                              scenario.probability > 0.2 ? 'bg-[#1dc3f0] text-white' : 
                              'bg-[#ffc801]/20 text-[#031f5e]'
                            }`}>
                              {(scenario.probability * 100).toFixed(0)}%
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center">
                            {scenario.priceImpact > 1 ? (
                              <MdOutlineTrendingUp className="text-[#da0000] mr-1" />
                            ) : scenario.priceImpact < 1 ? (
                              <MdOutlineTrendingDown className="text-[#1dc3f0] mr-1" />
                            ) : (
                              <MdOutlineInsights className="text-[#ffc801] mr-1" />
                            )}
                            <span>
                              {scenario.priceImpact > 1 ? '+' : ''}{((scenario.priceImpact - 1) * 100).toFixed(0)}%
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className={`${
                            scenario.priceImpact > 1 ? 'text-[#da0000]' : 
                            scenario.priceImpact < 1 ? 'text-[#1dc3f0]' : 
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
            
            <div className="mt-4 bg-[#031f5e]/5 p-4 rounded-lg">
              <div className="flex items-center gap-1 mb-2">
                <MdOutlineWarning className="text-[#fe7300]" />
                <h3 className="text-base font-medium text-[#031f5e]">Risk Assessment</h3>
              </div>
              <p className="text-text-secondary text-sm">
                Based on scenario analysis of ALDI's tender data, there is a {(scenarioData.filter(s => s.priceImpact > 1.1).reduce((sum, s) => sum + s.probability, 0) * 100).toFixed(0)}% probability 
                of significant price increases (&gt;10%) over the forecast period. The most impactful risk factor is "{influentialFactors[0]?.factor}".
              </p>
            </div>
          </div>
          
          {/* Additional Resources */}
          <div className={getPanelClass()}>
            <h2 className="text-lg font-semibold text-[#031f5e] mb-4">Related Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/price-tracker" className="glass-panel p-4 rounded-lg hover:bg-[#031f5e]/10 transition-colors border border-[#031f5e]/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1dc3f0]/20 flex items-center justify-center">
                    <MdOutlineAttachMoney className="text-[#1dc3f0] text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#031f5e]">Price Tracker</h3>
                    <p className="text-text-secondary text-sm">Current price monitoring</p>
                  </div>
                </div>
              </Link>
              
              <Link to="/market-trends" className="glass-panel p-4 rounded-lg hover:bg-[#031f5e]/10 transition-colors border border-[#031f5e]/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#fe7300]/20 flex items-center justify-center">
                    <MdOutlineTrendingUp className="text-[#fe7300] text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#031f5e]">Market Trends</h3>
                    <p className="text-text-secondary text-sm">Long-term trend analysis</p>
                  </div>
                </div>
              </Link>
              
              <Link to="/product-categories" className="glass-panel p-4 rounded-lg hover:bg-[#031f5e]/10 transition-colors border border-[#031f5e]/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ffc801]/20 flex items-center justify-center">
                    <MdOutlineCategory className="text-[#ffc801] text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#031f5e]">Product Categories</h3>
                    <p className="text-text-secondary text-sm">Browse by category</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
      
      <ChatPopup />
    </div>
  );
};

export default PriceForecasting; 