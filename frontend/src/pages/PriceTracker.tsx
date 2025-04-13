import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Paper, Grid, TextField, MenuItem, Button, Chip, IconButton, Tooltip } from '@mui/material';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar, ComposedChart, Scatter
} from 'recharts';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import dayjs from 'dayjs';
import { FiDownload, FiAlertCircle, FiArrowUp, FiArrowDown, FiFilter, FiAlertTriangle, FiCheckCircle, FiSliders } from 'react-icons/fi';

// Custom date formatter
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
};

// Mock price data for different materials
const generatePriceData = (baseTrend: 'up' | 'down' | 'volatile' | 'stable', basePrice: number) => {
  const today = new Date();
  const data = [];
  
  for (let i = 180; i >= 0; i -= 10) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    let randomFactor = 0;
    let trendFactor = 0;
    
    if (baseTrend === 'up') {
      trendFactor = (180 - i) / 360 * 0.5; // Gradual upward trend
      randomFactor = Math.random() * 0.1 - 0.05; // Small randomness
    } else if (baseTrend === 'down') {
      trendFactor = -(180 - i) / 360 * 0.3; // Gradual downward trend
      randomFactor = Math.random() * 0.15 - 0.075; // Small randomness
    } else if (baseTrend === 'volatile') {
      trendFactor = Math.sin(i / 20) * 0.2; // Sine wave pattern
      randomFactor = Math.random() * 0.3 - 0.15; // High randomness
    } else {
      trendFactor = 0; // No trend
      randomFactor = Math.random() * 0.05 - 0.025; // Minimal randomness
    }
    
    const price = basePrice * (1 + trendFactor + randomFactor);
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(price.toFixed(2)),
      marketAverage: parseFloat((price * (1 + Math.random() * 0.2 - 0.1)).toFixed(2)),
      predictedPrice: i < 30 ? null : parseFloat((price * (1 + (baseTrend === 'up' ? 0.1 : baseTrend === 'down' ? -0.1 : 0) + Math.random() * 0.1 - 0.05)).toFixed(2))
    });
  }
  
  // Add future predictions
  for (let i = 10; i <= 60; i += 10) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    
    let trendFactor = 0;
    let varianceFactor = Math.random() * 0.05 - 0.025;
    
    if (baseTrend === 'up') {
      trendFactor = (180 + i) / 360 * 0.5;
    } else if (baseTrend === 'down') {
      trendFactor = -(180 + i) / 360 * 0.3;
    } else if (baseTrend === 'volatile') {
      trendFactor = Math.sin((180 + i) / 20) * 0.2;
      varianceFactor = Math.random() * 0.2 - 0.1;
    }
    
    const lastPrice = data[data.length - 1].price;
    const predictedPrice = lastPrice * (1 + trendFactor + varianceFactor);
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: null,
      marketAverage: null,
      predictedPrice: parseFloat(predictedPrice.toFixed(2))
    });
  }
  
  return data;
};

// Mock data for materials
const materialsData = [
  {
    id: 'steel',
    name: 'Steel',
    unit: 'per ton',
    currentPrice: 750,
    previousPrice: 720,
    trend: 'up',
    changePercent: 4.17,
    data: generatePriceData('up', 750),
    forecast: 'increasing',
    forecastConfidence: 0.85,
    volatility: 'low',
    suppliers: [
      { name: 'Steel Dynamics', price: 760, delivery: '2-3 weeks' },
      { name: 'ArcelorMittal', price: 745, delivery: '3-4 weeks' },
      { name: 'Nucor Corporation', price: 752, delivery: '1-2 weeks' },
    ]
  },
  {
    id: 'aluminum',
    name: 'Aluminum',
    unit: 'per ton',
    currentPrice: 2150,
    previousPrice: 2380,
    trend: 'down',
    changePercent: -9.66,
    data: generatePriceData('down', 2150),
    forecast: 'decreasing',
    forecastConfidence: 0.7,
    volatility: 'medium',
    suppliers: [
      { name: 'Alcoa', price: 2140, delivery: '2-3 weeks' },
      { name: 'Rio Tinto', price: 2165, delivery: '4-5 weeks' },
      { name: 'Century Aluminum', price: 2155, delivery: '3-4 weeks' },
    ]
  },
  {
    id: 'copper',
    name: 'Copper',
    unit: 'per pound',
    currentPrice: 3.85,
    previousPrice: 3.65,
    trend: 'up',
    changePercent: 5.48,
    data: generatePriceData('volatile', 3.85),
    forecast: 'volatile',
    forecastConfidence: 0.6,
    volatility: 'high',
    suppliers: [
      { name: 'Freeport-McMoRan', price: 3.82, delivery: '2-3 weeks' },
      { name: 'Southern Copper', price: 3.88, delivery: '1-2 weeks' },
      { name: 'BHP Group', price: 3.86, delivery: '3-4 weeks' },
    ]
  },
  {
    id: 'plastic',
    name: 'Plastic Resin',
    unit: 'per pound',
    currentPrice: 1.25,
    previousPrice: 1.24,
    trend: 'stable',
    changePercent: 0.81,
    data: generatePriceData('stable', 1.25),
    forecast: 'stable',
    forecastConfidence: 0.9,
    volatility: 'low',
    suppliers: [
      { name: 'Dow Chemical', price: 1.24, delivery: '1-2 weeks' },
      { name: 'LyondellBasell', price: 1.26, delivery: '2-3 weeks' },
      { name: 'BASF', price: 1.25, delivery: '1-2 weeks' },
    ]
  },
  {
    id: 'silicon',
    name: 'Silicon',
    unit: 'per kg',
    currentPrice: 2.35,
    previousPrice: 2.10,
    trend: 'up',
    changePercent: 11.9,
    data: generatePriceData('up', 2.35),
    forecast: 'rapidly increasing',
    forecastConfidence: 0.8,
    volatility: 'high',
    suppliers: [
      { name: 'Ferroglobe', price: 2.40, delivery: '3-4 weeks' },
      { name: 'Elkem', price: 2.32, delivery: '2-3 weeks' },
      { name: 'REC Silicon', price: 2.38, delivery: '4-5 weeks' },
    ]
  },
  {
    id: 'rubber',
    name: 'Natural Rubber',
    unit: 'per pound',
    currentPrice: 0.95,
    previousPrice: 1.05,
    trend: 'down',
    changePercent: -9.52,
    data: generatePriceData('down', 0.95),
    forecast: 'decreasing',
    forecastConfidence: 0.75,
    volatility: 'medium',
    suppliers: [
      { name: 'Thailand Rubber', price: 0.94, delivery: '5-6 weeks' },
      { name: 'Sinochem', price: 0.96, delivery: '4-5 weeks' },
      { name: 'Halcyon Agri', price: 0.95, delivery: '3-4 weeks' },
    ]
  }
];

// Mock price alerts data
const priceAlerts = [
  {
    id: 1,
    material: 'Silicon',
    threshold: 2.50,
    condition: 'above',
    status: 'active',
    created: '2023-09-05'
  },
  {
    id: 2,
    material: 'Aluminum',
    threshold: 2000,
    condition: 'below',
    status: 'triggered',
    created: '2023-08-15',
    triggered: '2023-09-01'
  },
  {
    id: 3,
    material: 'Copper',
    threshold: 4.00,
    condition: 'above',
    status: 'active',
    created: '2023-09-10'
  },
  {
    id: 4,
    material: 'Steel',
    threshold: 700,
    condition: 'below',
    status: 'active',
    created: '2023-08-28'
  }
];

const ChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background-secondary p-3 border border-white/10 shadow-lg rounded-lg">
        <p className="text-sm font-semibold mb-1">{formatDate(label)}</p>
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
            <p className="text-xs">
              {item.name === 'price' ? 'Actual Price' : 
               item.name === 'marketAverage' ? 'Market Average' : 
               'Forecast'}: 
              <span className="font-bold ml-1">${item.value}</span>
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Component for price insights
const PriceInsights = ({ data }: { data: any }) => {
  const recentData = data.slice(-18);
  const actualData = recentData.filter((item: any) => item.price !== null);
  const forecastData = recentData.filter((item: any) => item.predictedPrice !== null);
  
  // Calculate trends
  const latestPrice = actualData[actualData.length - 1]?.price;
  const oldestPrice = actualData[0]?.price;
  const priceDiff = latestPrice - oldestPrice;
  const percentChange = (priceDiff / oldestPrice) * 100;
  
  // Volatility calculation (simple standard deviation)
  const prices = actualData.map((item: any) => item.price);
  const avg = prices.reduce((sum: number, val: number) => sum + val, 0) / prices.length;
  const squareDiffs = prices.map((price: number) => Math.pow(price - avg, 2));
  const avgSquareDiff = squareDiffs.reduce((sum: number, val: number) => sum + val, 0) / squareDiffs.length;
  const stdDev = Math.sqrt(avgSquareDiff);
  const volatilityPercentage = (stdDev / avg) * 100;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="glass-panel p-4 rounded-xl">
        <h3 className="text-text-secondary text-sm mb-2">Price Trend (30d)</h3>
        <div className="flex items-center">
          {percentChange > 0 ? (
            <FiArrowUp className="text-red-500 mr-2" size={20} />
          ) : percentChange < 0 ? (
            <FiArrowDown className="text-green-500 mr-2" size={20} />
          ) : (
            <FiArrowUp className="text-gray-500 mr-2 transform rotate-90" size={20} />
          )}
          <div>
            <p className="text-xl font-semibold">
              {percentChange > 0 ? '+' : ''}{percentChange.toFixed(2)}%
            </p>
            <p className="text-xs text-text-muted">
              ${priceDiff > 0 ? '+' : ''}{priceDiff.toFixed(2)} per unit
            </p>
          </div>
        </div>
      </div>
      
      <div className="glass-panel p-4 rounded-xl">
        <h3 className="text-text-secondary text-sm mb-2">Volatility</h3>
        <div className="flex items-center">
          {volatilityPercentage > 5 ? (
            <FiAlertTriangle className="text-yellow-500 mr-2" size={20} />
          ) : (
            <FiCheckCircle className="text-green-500 mr-2" size={20} />
          )}
          <div>
            <p className="text-xl font-semibold">
              {volatilityPercentage < 2 ? 'Low' : volatilityPercentage < 5 ? 'Medium' : 'High'}
            </p>
            <p className="text-xs text-text-muted">
              ±{volatilityPercentage.toFixed(2)}% variation
            </p>
          </div>
        </div>
      </div>
      
      <div className="glass-panel p-4 rounded-xl">
        <h3 className="text-text-secondary text-sm mb-2">Forecast (60d)</h3>
        <div className="flex items-center">
          {forecastData[forecastData.length - 1]?.predictedPrice > latestPrice ? (
            <FiArrowUp className="text-red-500 mr-2" size={20} />
          ) : forecastData[forecastData.length - 1]?.predictedPrice < latestPrice ? (
            <FiArrowDown className="text-green-500 mr-2" size={20} />
          ) : (
            <FiArrowUp className="text-gray-500 mr-2 transform rotate-90" size={20} />
          )}
          <div>
            <p className="text-xl font-semibold">
              {forecastData[forecastData.length - 1]?.predictedPrice > latestPrice ? 
                `+${(((forecastData[forecastData.length - 1]?.predictedPrice / latestPrice) - 1) * 100).toFixed(2)}%` : 
                forecastData[forecastData.length - 1]?.predictedPrice < latestPrice ?
                `-${(((latestPrice / forecastData[forecastData.length - 1]?.predictedPrice) - 1) * 100).toFixed(2)}%` :
                'Stable'}
            </p>
            <p className="text-xs text-text-muted">
              Confidence: {(Math.random() * 30 + 70).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PriceTracker = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<string>(materialsData[0].id);
  const [timeRange, setTimeRange] = useState<string>('6m');
  const [chartType, setChartType] = useState<string>('line');
  const [viewMode, setViewMode] = useState<string>('price');
  const [showBenchmark, setShowBenchmark] = useState<boolean>(true);
  const [showForecast, setShowForecast] = useState<boolean>(true);
  const [showAlerts, setShowAlerts] = useState<boolean>(false);
  const [newAlert, setNewAlert] = useState<{
    material: string;
    threshold: string;
    condition: string;
  }>({
    material: selectedMaterial,
    threshold: '',
    condition: 'above'
  });
  
  const material = materialsData.find(m => m.id === selectedMaterial);
  
  // Update form when selected material changes
  useEffect(() => {
    setNewAlert(prev => ({
      ...prev,
      material: selectedMaterial
    }));
  }, [selectedMaterial]);
  
  // Filter data based on timeRange
  const getFilteredData = () => {
    if (!material) return [];
    
    const today = new Date();
    const data = [...material.data];
    
    switch(timeRange) {
      case '1m':
        return data.filter(d => {
          const date = new Date(d.date);
          return date >= new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        });
      case '3m':
        return data.filter(d => {
          const date = new Date(d.date);
          return date >= new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
        });
      case '6m':
      default:
        return data;
    }
  };
  
  // Get the appropriate change class based on trend
  const getChangeClass = (trend: string) => {
    if (trend === 'up') return 'text-red-500';
    if (trend === 'down') return 'text-green-500';
    return 'text-gray-400';
  };
  
  // Get the appropriate change icon based on trend
  const getChangeIcon = (trend: string) => {
    if (trend === 'up') return <FiArrowUp size={16} className="text-red-500" />;
    if (trend === 'down') return <FiArrowDown size={16} className="text-green-500" />;
    return null;
  };
  
  // Create a new price alert
  const handleCreateAlert = () => {
    // In real application, would send to backend
    console.log('Creating alert:', newAlert);
    setShowAlerts(true);
    setNewAlert({
      material: selectedMaterial,
      threshold: '',
      condition: 'above'
    });
  };
  
  const filteredData = getFilteredData();
  
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold">Price Tracker</h1>
        
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <button 
            className="btn btn-sm bg-slate-700 border-slate-600 hover:bg-slate-600 gap-1"
            onClick={() => setShowAlerts(!showAlerts)}
          >
            <FiAlertTriangle size={16} />
            {showAlerts ? 'Hide Alerts' : 'Manage Alerts'}
          </button>
          <button className="btn btn-sm bg-slate-700 border-slate-600 hover:bg-slate-600 gap-1">
            <FiDownload size={16} />
            Export Data
          </button>
          <button className="btn btn-sm bg-slate-700 border-slate-600 hover:bg-slate-600 gap-1">
            <FiSliders size={16} />
            Options
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Materials list */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="glass-panel p-4 rounded-xl mb-6">
            <h2 className="text-lg font-semibold mb-3">Materials</h2>
            <div className="space-y-3">
              {materialsData.map(material => (
                <motion.div 
                  key={material.id}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedMaterial === material.id 
                      ? 'bg-accent-primary bg-opacity-20 border border-accent-primary/30' 
                      : 'bg-background-accent/50 border border-white/5 hover:border-white/10'
                  }`}
                  onClick={() => setSelectedMaterial(material.id)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{material.name}</h3>
                    <div className="flex items-center">
                      {getChangeIcon(material.trend)}
                      <span className={`text-sm font-medium ml-1 ${getChangeClass(material.trend)}`}>
                        {material.trend === 'up' ? '+' : material.trend === 'down' ? '-' : ''}
                        {Math.abs(material.changePercent).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-lg font-bold text-text-primary">
                      ${material.currentPrice.toFixed(2)}
                      <span className="text-xs text-text-muted font-normal ml-1">
                        {material.unit}
                      </span>
                    </p>
                    
                    <div className="flex items-center">
                      <div 
                        className={`w-2 h-2 rounded-full mr-1 ${
                          material.volatility === 'low' ? 'bg-green-500' : 
                          material.volatility === 'medium' ? 'bg-yellow-500' : 
                          'bg-red-500'
                        }`}
                      ></div>
                      <span className="text-xs text-text-muted">
                        {material.volatility.charAt(0).toUpperCase() + material.volatility.slice(1)} volatility
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Price Alerts */}
          {showAlerts && (
            <div className="glass-panel p-4 rounded-xl">
              <h2 className="text-lg font-semibold mb-3">Price Alerts</h2>
              
              <div className="mb-4 bg-background-accent/30 p-3 rounded-lg border border-white/10">
                <h3 className="text-sm font-medium mb-2">Create New Alert</h3>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-text-muted block mb-1">Material</label>
                    <select 
                      className="select select-sm w-full bg-background-secondary border-white/10"
                      value={newAlert.material}
                      onChange={(e) => setNewAlert({...newAlert, material: e.target.value})}
                    >
                      {materialsData.map(m => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-xs text-text-muted block mb-1">Condition</label>
                      <select 
                        className="select select-sm w-full bg-background-secondary border-white/10"
                        value={newAlert.condition}
                        onChange={(e) => setNewAlert({...newAlert, condition: e.target.value})}
                      >
                        <option value="above">Above</option>
                        <option value="below">Below</option>
                      </select>
                    </div>
                    
                    <div className="flex-1">
                      <label className="text-xs text-text-muted block mb-1">Threshold ($)</label>
                      <input 
                        type="number" 
                        className="input input-sm w-full bg-background-secondary border-white/10"
                        value={newAlert.threshold}
                        onChange={(e) => setNewAlert({...newAlert, threshold: e.target.value})}
                        placeholder="Enter price"
                      />
                    </div>
                  </div>
                  
                  <button 
                    className="btn btn-sm btn-block bg-accent-primary hover:bg-accent-primary/80 border-accent-primary/50 mt-2"
                    onClick={handleCreateAlert}
                    disabled={!newAlert.threshold}
                  >
                    Create Alert
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                {priceAlerts.map(alert => (
                  <div 
                    key={alert.id}
                    className={`p-3 rounded-lg border ${
                      alert.status === 'triggered' 
                        ? 'bg-red-500/10 border-red-500/30' 
                        : 'bg-background-accent/20 border-white/10'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-sm">{alert.material}</h3>
                      <div className={`badge badge-sm ${
                        alert.status === 'triggered' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                      }`}>
                        {alert.status}
                      </div>
                    </div>
                    
                    <div className="text-sm mt-1">
                      {alert.condition === 'above' ? 'Above' : 'Below'} ${alert.threshold.toFixed(2)}
                    </div>
                    
                    <div className="flex justify-between items-center mt-2 text-xs text-text-muted">
                      <div>Created: {formatDate(alert.created)}</div>
                      {alert.triggered && <div>Triggered: {formatDate(alert.triggered)}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Main chart */}
        <div className="lg:col-span-3 order-1 lg:order-2">
          {material && (
            <>
              <div className="glass-panel p-4 rounded-xl mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">{material.name} Prices</h2>
                    <p className="text-text-muted text-sm">${material.currentPrice.toFixed(2)} {material.unit}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                    <div className="btn-group">
                      <button 
                        className={`btn btn-sm ${timeRange === '1m' ? 'btn-active' : ''}`}
                        onClick={() => setTimeRange('1m')}
                      >
                        1M
                      </button>
                      <button 
                        className={`btn btn-sm ${timeRange === '3m' ? 'btn-active' : ''}`}
                        onClick={() => setTimeRange('3m')}
                      >
                        3M
                      </button>
                      <button 
                        className={`btn btn-sm ${timeRange === '6m' ? 'btn-active' : ''}`}
                        onClick={() => setTimeRange('6m')}
                      >
                        6M
                      </button>
                    </div>
                    
                    <div className="btn-group">
                      <button 
                        className={`btn btn-sm ${chartType === 'line' ? 'btn-active' : ''}`}
                        onClick={() => setChartType('line')}
                      >
                        Line
                      </button>
                      <button 
                        className={`btn btn-sm ${chartType === 'area' ? 'btn-active' : ''}`}
                        onClick={() => setChartType('area')}
                      >
                        Area
                      </button>
                      <button 
                        className={`btn btn-sm ${chartType === 'bar' ? 'btn-active' : ''}`}
                        onClick={() => setChartType('bar')}
                      >
                        Bar
                      </button>
                    </div>
                    
                    <div className="dropdown dropdown-end">
                      <label tabIndex={0} className="btn btn-sm gap-1">
                        <FiSliders size={14} />
                        Options
                      </label>
                      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                          <label className="flex justify-between">
                            <span>Show Benchmark</span>
                            <input 
                              type="checkbox" 
                              className="toggle toggle-sm toggle-primary" 
                              checked={showBenchmark}
                              onChange={() => setShowBenchmark(!showBenchmark)}
                            />
                          </label>
                        </li>
                        <li>
                          <label className="flex justify-between">
                            <span>Show Forecast</span>
                            <input 
                              type="checkbox" 
                              className="toggle toggle-sm toggle-primary" 
                              checked={showForecast}
                              onChange={() => setShowForecast(!showForecast)}
                            />
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'line' ? (
                      <LineChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis 
                          dataKey="date" 
                          stroke="#666"
                          tick={{ fill: '#999' }}
                          tickFormatter={formatDate}
                        />
                        <YAxis 
                          stroke="#666"
                          tick={{ fill: '#999' }}
                          domain={['auto', 'auto']}
                        />
                        <Tooltip content={<ChartTooltip />} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="price" 
                          stroke="#3B82F6" 
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 6 }}
                          name="Actual Price"
                        />
                        {showBenchmark && (
                          <Line 
                            type="monotone" 
                            dataKey="marketAverage" 
                            stroke="#10B981" 
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            dot={false}
                            name="Market Average"
                          />
                        )}
                        {showForecast && (
                          <Line 
                            type="monotone" 
                            dataKey="predictedPrice" 
                            stroke="#F59E0B" 
                            strokeWidth={2}
                            strokeDasharray="3 3"
                            dot={false}
                            name="Price Forecast"
                          />
                        )}
                      </LineChart>
                    ) : chartType === 'area' ? (
                      <AreaChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis 
                          dataKey="date" 
                          stroke="#666"
                          tick={{ fill: '#999' }}
                          tickFormatter={formatDate}
                        />
                        <YAxis 
                          stroke="#666"
                          tick={{ fill: '#999' }}
                          domain={['auto', 'auto']}
                        />
                        <Tooltip content={<ChartTooltip />} />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="price" 
                          stroke="#3B82F6" 
                          fill="#3B82F6" 
                          fillOpacity={0.2}
                          strokeWidth={2}
                          name="Actual Price"
                        />
                        {showBenchmark && (
                          <Area 
                            type="monotone" 
                            dataKey="marketAverage" 
                            stroke="#10B981" 
                            fill="#10B981"
                            fillOpacity={0.1}
                            strokeWidth={2}
                            name="Market Average"
                          />
                        )}
                        {showForecast && (
                          <Area 
                            type="monotone" 
                            dataKey="predictedPrice" 
                            stroke="#F59E0B" 
                            fill="#F59E0B"
                            fillOpacity={0.1}
                            strokeWidth={2}
                            name="Price Forecast"
                          />
                        )}
                      </AreaChart>
                    ) : (
                      <ComposedChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis 
                          dataKey="date" 
                          stroke="#666"
                          tick={{ fill: '#999' }}
                          tickFormatter={formatDate}
                        />
                        <YAxis 
                          stroke="#666"
                          tick={{ fill: '#999' }}
                          domain={['auto', 'auto']}
                        />
                        <Tooltip content={<ChartTooltip />} />
                        <Legend />
                        <Bar 
                          dataKey="price" 
                          fill="#3B82F6" 
                          fillOpacity={0.8}
                          name="Actual Price"
                        />
                        {showBenchmark && (
                          <Line 
                            type="monotone" 
                            dataKey="marketAverage" 
                            stroke="#10B981" 
                            strokeWidth={2}
                            dot={false}
                            name="Market Average"
                          />
                        )}
                        {showForecast && (
                          <Line 
                            type="monotone" 
                            dataKey="predictedPrice" 
                            stroke="#F59E0B" 
                            strokeWidth={2}
                            dot={false}
                            name="Price Forecast"
                          />
                        )}
                      </ComposedChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel p-4 rounded-xl">
                  <h2 className="text-lg font-semibold mb-4">Price Insights</h2>
                  <PriceInsights data={material.data} />
                </div>
                
                <div className="glass-panel p-4 rounded-xl">
                  <h2 className="text-lg font-semibold mb-4">Current Supplier Pricing</h2>
                  <div className="overflow-x-auto">
                    <table className="table table-zebra-zebra w-full">
                      <thead>
                        <tr>
                          <th className="text-xs font-medium text-text-muted">Supplier</th>
                          <th className="text-xs font-medium text-text-muted">Price ({material.unit})</th>
                          <th className="text-xs font-medium text-text-muted">Lead Time</th>
                          <th className="text-xs font-medium text-text-muted">Diff</th>
                        </tr>
                      </thead>
                      <tbody>
                        {material.suppliers.map((supplier, index) => {
                          const diff = ((supplier.price / material.currentPrice - 1) * 100).toFixed(2);
                          return (
                            <tr key={index}>
                              <td className="font-medium">{supplier.name}</td>
                              <td>${supplier.price.toFixed(2)}</td>
                              <td>{supplier.delivery}</td>
                              <td className={Number(diff) > 0 ? 'text-red-500' : Number(diff) < 0 ? 'text-green-500' : 'text-gray-400'}>
                                {Number(diff) > 0 ? '+' : ''}{diff}%
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceTracker; 