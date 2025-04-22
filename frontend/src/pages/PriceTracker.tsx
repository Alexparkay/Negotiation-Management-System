import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, Paper, Grid, TextField, MenuItem, Button, Chip, IconButton, Tooltip, CircularProgress } from '@mui/material';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar, ComposedChart, Scatter
} from 'recharts';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FiDownload, FiAlertCircle, FiArrowUp, FiArrowDown, FiFilter, FiAlertTriangle, FiCheckCircle, FiSliders, FiSearch, FiInfo, FiShoppingCart } from 'react-icons/fi';
import { loadTenderData, TenderData, generatePriceData, generateSupplierData, getUniqueCategories, getProductsByCategory, categoryMetadata } from '../utils/dataLoader';

// Custom date formatter
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
};

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
const PriceInsights = ({ data }: { data: any[] }) => {
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

// Component for category insights
const CategoryInsights = ({ category }: { category: string }) => {
  const metaData = (categoryMetadata as any)[category] || { trend: 'stable', volatility: 'medium' };
  const insightData = [
    {
      title: "Seasonal Impact",
      content: "Category shows seasonal patterns. Prices typically rise during Q3-Q4.",
      icon: <FiInfo className="text-blue-500" size={16} />
    },
    {
      title: "Supply Chain Status",
      content: metaData.volatility === 'high' ? 
        "Warning: Supply chain disruptions affecting deliveries." : 
        "Supply chain stable with normal lead times.",
      icon: metaData.volatility === 'high' ? 
        <FiAlertTriangle className="text-yellow-500" size={16} /> : 
        <FiCheckCircle className="text-green-500" size={16} />
    },
    {
      title: "Competitive Landscape",
      content: metaData.trend === 'up' ? 
        "Market shows consolidation with decreasing number of suppliers." : 
        "Highly competitive market with stable or increasing supplier count.",
      icon: <FiShoppingCart className="text-purple-500" size={16} />
    }
  ];

  return (
    <div className="glass-panel p-4 rounded-xl">
      <h2 className="text-lg font-semibold mb-3">Category Insights</h2>
      <div className="space-y-3">
        {insightData.map((insight, index) => (
          <div key={index} className="bg-background-accent/30 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              {insight.icon}
              <h3 className="font-medium ml-2">{insight.title}</h3>
            </div>
            <p className="text-sm text-text-secondary">{insight.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const PriceTracker = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tenderData, setTenderData] = useState<TenderData[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [products, setProducts] = useState<TenderData[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [timeRange, setTimeRange] = useState<string>('6m');
  const [chartType, setChartType] = useState<string>('line');
  const [viewMode, setViewMode] = useState<string>('price');
  const [showBenchmark, setShowBenchmark] = useState<boolean>(true);
  const [showForecast, setShowForecast] = useState<boolean>(true);
  const [showAlerts, setShowAlerts] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [newAlert, setNewAlert] = useState<{
    material: string;
    threshold: string;
    condition: string;
  }>({
    material: '',
    threshold: '',
    condition: 'above'
  });
  
  // Load data from CSV
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await loadTenderData();
        setTenderData(data);
        
        const categoryList = getUniqueCategories(data);
        setCategories(categoryList);
        
        if (categoryList.length > 0) {
          setSelectedCategory(categoryList[0]);
          const productsByCategory = getProductsByCategory(data, categoryList[0]);
          setProducts(productsByCategory);
          
          if (productsByCategory.length > 0) {
            setSelectedProduct(productsByCategory[0].product);
            setNewAlert(prev => ({
              ...prev,
              material: productsByCategory[0].product
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Update products when category changes
  useEffect(() => {
    if (selectedCategory && tenderData.length > 0) {
      const productsByCategory = getProductsByCategory(tenderData, selectedCategory);
      setProducts(productsByCategory);
      
      if (productsByCategory.length > 0) {
        setSelectedProduct(productsByCategory[0].product);
        setNewAlert(prev => ({
          ...prev,
          material: productsByCategory[0].product
        }));
      }
    }
  }, [selectedCategory, tenderData]);
  
  // Current selected tender data
  const currentTender = tenderData.find(item => 
    item.category === selectedCategory && item.product === selectedProduct
  );
  
  // Mock price alerts data
  const priceAlerts = [
    {
      id: 1,
      material: 'Coffee',
      threshold: 110,
      condition: 'above',
      status: 'active',
      created: '2023-09-05'
    },
    {
      id: 2,
      material: 'Conditioner',
      threshold: 50,
      condition: 'below',
      status: 'triggered',
      created: '2023-08-15',
      triggered: '2023-09-01'
    },
    {
      id: 3,
      material: 'Oranges',
      threshold: 75,
      condition: 'above',
      status: 'active',
      created: '2023-09-10'
    },
    {
      id: 4,
      material: 'Shampoo',
      threshold: 60,
      condition: 'below',
      status: 'active',
      created: '2023-08-28'
    }
  ];
  
  // Get price data for the current product
  const getPriceData = () => {
    if (!currentTender) return [];
    return generatePriceData(currentTender);
  };
  
  // Get supplier data for the current product
  const getSupplierData = () => {
    if (!currentTender) return [];
    return generateSupplierData(currentTender);
  };
  
  // Filter data based on timeRange
  const getFilteredData = () => {
    const data = getPriceData();
    if (data.length === 0) return [];
    
    const today = new Date();
    
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
      material: selectedProduct,
      threshold: '',
      condition: 'above'
    });
  };
  
  // Filter products based on search term
  const filteredProducts = products.filter(item => 
    item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.productDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Generate filtered price data
  const filteredData = getFilteredData();
  
  // Get supplier data
  const supplierData = getSupplierData();
  
  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Price Tracker</h1>
          <p className="text-text-secondary">Monitor and analyze product prices and market trends</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <button 
            className="btn btn-sm btn-primary gap-1"
            onClick={() => setShowAlerts(!showAlerts)}
          >
            <FiAlertTriangle size={16} />
            {showAlerts ? 'Hide Alerts' : 'Manage Alerts'}
          </button>
          <button className="btn btn-sm btn-outline gap-1">
            <FiDownload size={16} />
            Export Data
          </button>
          <button className="btn btn-sm btn-outline gap-1">
            <FiSliders size={16} />
            Options
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="text-center">
            <CircularProgress size={60} className="mb-4" />
            <p className="text-text-secondary">Loading price data...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" style={{ height: "calc(100vh - 200px)" }}>
          {/* Categories & Products list */}
          <div className="lg:col-span-1 order-2 lg:order-1 h-full">
            <div className="glass-panel p-4 rounded-xl h-full">
              <h2 className="text-lg font-semibold mb-3">Categories</h2>
              
              <div className="flex mb-4">
                <div className="relative flex-1">
                  <FiSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    className="input input-bordered w-full pl-10"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      selectedCategory === category 
                        ? 'bg-accent-primary text-white' 
                        : 'bg-background-accent text-text-secondary'
                    }`}
                    onClick={() => {
                      setSelectedCategory(category);
                      setSearchTerm('');
                    }}
                  >
                    {(categoryMetadata as any)[category]?.display || category}
                  </button>
                ))}
              </div>
              
              <div className="space-y-2">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-4 text-text-muted">
                    {searchTerm ? 'No products match your search' : 'No products in this category'}
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <motion.div 
                      key={`${product.tenderId}-${product.product}`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        selectedProduct === product.product 
                          ? 'bg-accent-primary bg-opacity-20 border border-accent-primary/30' 
                          : 'bg-background-accent/50 border border-white/5 hover:border-white/10'
                      }`}
                      onClick={() => setSelectedProduct(product.product)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{product.product}</h3>
                          <p className="text-sm text-text-muted">{product.productCode}</p>
                        </div>
                        <div className="text-xs px-2 py-1 rounded bg-background-accent">
                          {product.trait}
                        </div>
                      </div>
                      
                      <p className="text-sm text-text-secondary mt-1 line-clamp-2">{product.productDescription}</p>
                      
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center">
                          <span className="text-xs text-text-muted">
                            {product.storage}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-text-muted">
                            {product.origin}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
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
                      <label className="text-xs text-text-muted block mb-1">Product</label>
                      <select 
                        className="select select-sm w-full bg-background-secondary border-white/10"
                        value={newAlert.material}
                        onChange={(e) => setNewAlert({...newAlert, material: e.target.value})}
                      >
                        {filteredProducts.map(p => (
                          <option key={p.tenderId} value={p.product}>{p.product}</option>
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
            {currentTender ? (
              <>
                <div className="glass-panel p-4 rounded-xl mb-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div>
                      <div className="flex items-center">
                        <h2 className="text-xl font-semibold">{currentTender.product} Prices</h2>
                        <span className="ml-2 badge badge-sm">{currentTender.trait}</span>
                      </div>
                      <p className="text-text-muted text-sm">
                        {currentTender.productDescription} ({currentTender.productCode})
                      </p>
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
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow glass-panel rounded-box w-52">
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
                  
                  {/* Product Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-4">
                    <div className="glass-panel p-2 rounded-lg">
                      <p className="text-xs text-text-muted">Origin</p>
                      <p className="font-medium">{currentTender.origin}</p>
                    </div>
                    <div className="glass-panel p-2 rounded-lg">
                      <p className="text-xs text-text-muted">Case Size</p>
                      <p className="font-medium">{currentTender.caseSize}</p>
                    </div>
                    <div className="glass-panel p-2 rounded-lg">
                      <p className="text-xs text-text-muted">Unit Size</p>
                      <p className="font-medium">{currentTender.unitSize}</p>
                    </div>
                    <div className="glass-panel p-2 rounded-lg">
                      <p className="text-xs text-text-muted">Storage</p>
                      <p className="font-medium">{currentTender.storage}</p>
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
                          <RechartsTooltip content={<ChartTooltip />} />
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
                          <RechartsTooltip content={<ChartTooltip />} />
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
                          <RechartsTooltip content={<ChartTooltip />} />
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
                    <PriceInsights data={filteredData} />
                  </div>
                  
                  <div className="glass-panel p-4 rounded-xl">
                    <h2 className="text-lg font-semibold mb-4">Supplier Pricing</h2>
                    <div className="overflow-x-auto">
                      <table className="table w-full">
                        <thead>
                          <tr>
                            <th className="text-xs font-medium text-text-muted">Supplier</th>
                            <th className="text-xs font-medium text-text-muted">Price</th>
                            <th className="text-xs font-medium text-text-muted">Lead Time</th>
                            <th className="text-xs font-medium text-text-muted">Diff</th>
                          </tr>
                        </thead>
                        <tbody>
                          {supplierData.map((supplier, index) => {
                            const marketPrice = filteredData.find(d => d.price !== null)?.price || supplier.price;
                            const diff = ((supplier.price / marketPrice - 1) * 100).toFixed(2);
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
                
                <div className="glass-panel p-4 rounded-xl mt-6">
                  <h2 className="text-lg font-semibold mb-4">Tender Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="glass-panel p-3 rounded-lg">
                      <p className="text-xs text-text-muted">Tender Period</p>
                      <p className="font-medium">
                        {formatDate(currentTender.tenderStart)} - {formatDate(currentTender.tenderEnd)}
                      </p>
                    </div>
                    <div className="glass-panel p-3 rounded-lg">
                      <p className="text-xs text-text-muted">Delivery Period</p>
                      <p className="font-medium">
                        {formatDate(currentTender.deliveryStart)} - {formatDate(currentTender.deliveryEnd)}
                      </p>
                    </div>
                    <div className="glass-panel p-3 rounded-lg">
                      <p className="text-xs text-text-muted">Packaging</p>
                      <p className="font-medium">{currentTender.salesPackaging}</p>
                    </div>
                    <div className="glass-panel p-3 rounded-lg">
                      <p className="text-xs text-text-muted">Tender ID</p>
                      <p className="font-medium">{currentTender.tenderId}</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-background-accent/30 rounded-lg">
                    <p className="text-xs text-text-muted mb-1">Additional Notes</p>
                    <p className="text-sm">{currentTender.tenderComment}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <CategoryInsights category={selectedCategory} />
                </div>
              </>
            ) : (
              <div className="glass-panel p-4 rounded-xl flex items-center justify-center h-96">
                <div className="text-center">
                  <FiAlertCircle size={48} className="text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold">No Product Selected</h3>
                  <p className="text-text-secondary mt-2">
                    Please select a category and product from the list on the left.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceTracker; 