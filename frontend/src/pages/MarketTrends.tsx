import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress, Tooltip as MUITooltip, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { 
  MdOutlineTrendingUp,
  MdOutlineDownload,
  MdOutlineInsights,
  MdOutlineFilterList,
  MdOutlineCategory,
  MdOutlineSearch as MdSearch,
  MdOutlineCalendarToday,
  MdOutlineInfo,
  MdOutlineWarning,
  MdOutlineTrendingDown,
  MdOutlineAttachMoney,
  MdOutlineShoppingCart,
  MdOutlineAnalytics,
  MdOutlineCompare,
  MdOutlineLocationOn,
  MdOutlinePriceChange,
  MdTimeline,
  MdMoreHoriz,
  MdOutlineRefresh,
  MdOutlineFileDownload
} from 'react-icons/md';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Scatter
} from 'recharts';
import ChatPopup from '../components/ChatPopup';
import { motion } from 'framer-motion';
import { 
  FiTrendingUp, 
  FiTrendingDown, 
  FiAlertCircle, 
  FiDollarSign, 
  FiBarChart2, 
  FiGlobe,
  FiChevronDown
} from 'react-icons/fi';
import { loadTenderData, getUniqueCategories, getProductsByCategory, categoryMetadata } from '../utils/dataLoader';
import { Button, IconButton } from '@/components/ui';
import { styled } from '@mui/material/styles';
import { TextField, InputAdornment } from '@mui/material';

// Import types from dataLoader but rename to avoid conflicts
import type { TenderData as ImportedTenderData } from '../utils/dataLoader';

// Interface definitions with a different name to avoid conflicts
interface MarketTenderData {
  id: string;
  vendor: string;
  category: string;
  product: string;
  date: string;
  amount: number;
  status: string;
}

interface CategoryData {
  id: string;
  display: string;
  volatility: 'low' | 'medium' | 'high';
  trend: 'up' | 'stable' | 'down';
}

interface MarketTrendPoint {
  month: string;
  [key: string]: number | string;
}

interface VendorData {
  id: string;
  name: string;
  reliability: number;
  categories: string[];
}

interface DisruptionRiskPoint {
  name: string;
  value: number;
  color: string;
}

interface CommodityInflationPoint {
  name: string;
  rate: number;
}

interface MarketInsight {
  id: string;
  title: string;
  summary: string;
  date: string;
  impact: 'Positive' | 'Neutral' | 'Negative';
  category?: string;
}

// Color constants for ALDI brand
const COLORS = {
  PRIMARY: '#031f5e',    // Dark blue
  SECONDARY: '#1dc3f0',  // Light blue
  ACCENT1: '#da0000',    // Red
  ACCENT2: '#fe7300',    // Orange
  ACCENT3: '#ffc801',    // Yellow
  // Lighter variations
  PRIMARY_LIGHT: '#1a34a3',
  SECONDARY_LIGHT: '#7adff7',
  ACCENT1_LIGHT: '#ff5252',
  ACCENT2_LIGHT: '#ffa152',
  ACCENT3_LIGHT: '#ffe066',
  // Darker variations
  PRIMARY_DARK: '#021542',
  SECONDARY_DARK: '#0e99bd',
  ACCENT1_DARK: '#b50000',
  ACCENT2_DARK: '#cc5c00',
  ACCENT3_DARK: '#d4a500',
  // Additional variations for more data points
  PRIMARY_20: 'rgba(3, 31, 94, 0.2)',
  PRIMARY_40: 'rgba(3, 31, 94, 0.4)',
  PRIMARY_60: 'rgba(3, 31, 94, 0.6)',
  PRIMARY_80: 'rgba(3, 31, 94, 0.8)',
  SECONDARY_20: 'rgba(29, 195, 240, 0.2)',
  SECONDARY_40: 'rgba(29, 195, 240, 0.4)',
  SECONDARY_60: 'rgba(29, 195, 240, 0.6)',
  SECONDARY_80: 'rgba(29, 195, 240, 0.8)',
  ACCENT1_20: 'rgba(218, 0, 0, 0.2)',
  ACCENT1_40: 'rgba(218, 0, 0, 0.4)',
  ACCENT1_60: 'rgba(218, 0, 0, 0.6)',
  ACCENT1_80: 'rgba(218, 0, 0, 0.8)',
  ACCENT2_20: 'rgba(254, 115, 0, 0.2)',
  ACCENT2_40: 'rgba(254, 115, 0, 0.4)',
  ACCENT2_60: 'rgba(254, 115, 0, 0.6)',
  ACCENT2_80: 'rgba(254, 115, 0, 0.8)',
  ACCENT3_20: 'rgba(255, 200, 1, 0.2)',
  ACCENT3_40: 'rgba(255, 200, 1, 0.4)',
  ACCENT3_60: 'rgba(255, 200, 1, 0.6)',
  ACCENT3_80: 'rgba(255, 200, 1, 0.8)',
};

// Group tender data by category
const groupByCategory = (data: ImportedTenderData[]) => {
  const categoryMap = new Map<string, number>();
  
  data.forEach(item => {
    const count = categoryMap.get(item.category) || 0;
    categoryMap.set(item.category, count + 1);
  });
  
  return Array.from(categoryMap.entries()).map(([category, count]) => ({
    category,
    count,
    display: (categoryMetadata as any)[category]?.display || category,
    trend: (categoryMetadata as any)[category]?.trend || 'stable',
    volatility: (categoryMetadata as any)[category]?.volatility || 'medium'
  }));
};

// Calculate average prices by category per month
const calculatePricesByCategory = (data: ImportedTenderData[]) => {
  // Mock price data by category for last 12 months
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const categories = getUniqueCategories(data);
  
  // Generate random price trends based on category metadata
  return months.map(month => {
    const result: any = { month };
    
    categories.forEach(category => {
      const meta = (categoryMetadata as any)[category] || { trend: 'stable', volatility: 'medium' };
      const baseValue = Math.floor(Math.random() * 1000) + 3000;
      
      // Apply trend factor
      let trendFactor = 0;
      if (meta.trend === 'up') {
        trendFactor = 0.05; // 5% increase on average
      } else if (meta.trend === 'down') {
        trendFactor = -0.03; // 3% decrease on average
      }
      
      // Apply volatility
      let volatilityFactor = 0;
      if (meta.volatility === 'high') {
        volatilityFactor = Math.random() * 0.2 - 0.1; // ±10%
      } else if (meta.volatility === 'medium') {
        volatilityFactor = Math.random() * 0.1 - 0.05; // ±5%
      } else {
        volatilityFactor = Math.random() * 0.04 - 0.02; // ±2%
      }
      
      // Calculate index for this month (assume months.indexOf is the time progression)
      const monthIndex = months.indexOf(month);
      const value = baseValue * (1 + trendFactor * monthIndex + volatilityFactor);
      
      // Calculate price benchmark and forecast values
      const benchmark = value * (1 - 0.02 - Math.random() * 0.04); // Benchmark is typically 2-6% lower
      const forecast = value * (1 + (monthIndex > 9 ? (0.01 + Math.random() * 0.05) : 0)); // Forecast for future months
      
      // Use category display name as the key
      const key = (categoryMetadata as any)[category]?.display?.toLowerCase().replace(/[^a-z0-9]/g, '_') || 
                 category.toLowerCase().replace(/[^a-z0-9]/g, '_');
      
      result[key] = Math.round(value);
      result[`${key}_benchmark`] = Math.round(benchmark);
      result[`${key}_forecast`] = Math.round(forecast);
    });
    
    return result;
  });
};

// Calculate disruption risk data
const calculateDisruptionRisk = (data: ImportedTenderData[]) => {
  // Count traits to assess risk factors
  const traitCount: {[key: string]: number} = {
    'Imported': 0,
    'Value': 0,
    'Premium': 0,
    'Organic': 0
  };
  
  data.forEach(item => {
    // Check if the item has a trait property and it's one of our tracked traits
    const trait = (item as any).trait;
    if (trait && trait in traitCount) {
      traitCount[trait]++;
    }
  });
  
  // Map traits to risk factors
  const riskFactors = [
    { 
      name: 'Supply Chain', 
      value: 30 + Math.floor((traitCount['Imported'] / (data.length || 1)) * 100), 
      color: COLORS.SECONDARY,
      prevValue: 25 + Math.floor((traitCount['Imported'] / (data.length || 1)) * 80)
    },
    { 
      name: 'Geopolitical', 
      value: 20 + Math.floor((traitCount['Premium'] / (data.length || 1)) * 50), 
      color: COLORS.ACCENT2,
      prevValue: 22 + Math.floor((traitCount['Premium'] / (data.length || 1)) * 40)
    },
    { 
      name: 'Economic', 
      value: 15 + Math.floor((traitCount['Value'] / (data.length || 1)) * 40), 
      color: COLORS.ACCENT3,
      prevValue: 18 + Math.floor((traitCount['Value'] / (data.length || 1)) * 35)
    },
    { 
      name: 'Environmental', 
      value: 10 + Math.floor((traitCount['Organic'] / (data.length || 1)) * 70), 
      color: COLORS.ACCENT1,
      prevValue: 8 + Math.floor((traitCount['Organic'] / (data.length || 1)) * 60)
    },
    { 
      name: 'Technological', 
      value: 5 + Math.floor(Math.random() * 10), 
      color: COLORS.PRIMARY,
      prevValue: 4 + Math.floor(Math.random() * 8)
    },
    {
      name: 'Regulatory',
      value: 8 + Math.floor(Math.random() * 12),
      color: COLORS.PRIMARY_LIGHT,
      prevValue: 6 + Math.floor(Math.random() * 10)
    },
    {
      name: 'Labor',
      value: 7 + Math.floor(Math.random() * 8),
      color: COLORS.SECONDARY_LIGHT,
      prevValue: 9 + Math.floor(Math.random() * 7)
    }
  ];
  
  // Normalize values to make sure they sum to 100
  const total = riskFactors.reduce((sum, factor) => sum + factor.value, 0);
  const prevTotal = riskFactors.reduce((sum, factor) => sum + factor.prevValue, 0);
  
  return riskFactors.map(factor => ({
    ...factor,
    value: Math.round((factor.value / total) * 100),
    prevValue: Math.round((factor.prevValue / prevTotal) * 100)
  }));
};

// Calculate commodity inflation based on categories
const calculateCommodityInflation = (data: ImportedTenderData[]) => {
  const uniqueProducts = new Map<string, { count: number, trait: string }>();
  
  // Count products and get their traits
  data.forEach(item => {
    const product = item.product;
    const trait = (item as any).trait || 'Standard';
    
    const existing = uniqueProducts.get(product);
    if (existing) {
      existing.count++;
    } else {
      uniqueProducts.set(product, { count: 1, trait });
    }
  });
  
  // Generate inflation rates based on trait and randomness
  return Array.from(uniqueProducts.entries())
    .filter((_, index) => index < 10) // Take top 10 products
    .map(([product, info]) => {
      let baseRate = 0;
      let trendDirection = Math.random() > 0.5 ? 1 : -1;
      
      // Different base rates by trait
      switch (info.trait) {
        case 'Premium':
          baseRate = 4 + Math.random() * 3;
          break;
        case 'Value':
          baseRate = 1 + Math.random() * 3;
          break;
        case 'Organic':
          baseRate = 5 + Math.random() * 4;
          break;
        case 'Imported':
          baseRate = 6 + Math.random() * 2;
          break;
        default:
          baseRate = 2 + Math.random() * 2;
      }
      
      const currentRate = parseFloat(baseRate.toFixed(1));
      const previousRate = parseFloat((baseRate - (trendDirection * (0.5 + Math.random() * 1.5))).toFixed(1));
      const forecastRate = parseFloat((baseRate + (trendDirection * (0.3 + Math.random() * 1.2))).toFixed(1));
      
      return {
        name: product,
        rate: currentRate,
        prevRate: previousRate,
        forecastRate: forecastRate,
        trend: trendDirection > 0 ? 'up' : 'down'
      };
    });
};

// Generate category insights data for the pie chart
const generateCategoryInsights = (data: ImportedTenderData[]) => {
  const categories = getUniqueCategories(data);
  const marketShareData = categories.map(category => {
    const meta = (categoryMetadata as any)[category] || { display: category };
    const baseValue = 5 + Math.floor(Math.random() * 25);
    
    return {
      name: meta.display || category,
      value: baseValue,
      color: getColorForCategory(category, categories.indexOf(category))
    };
  });
  
  // Normalize to ensure total is 100%
  const total = marketShareData.reduce((sum, item) => sum + item.value, 0);
  return marketShareData.map(item => ({
    ...item,
    percentage: Math.round((item.value / total) * 100),
    value: Math.round((item.value / total) * 100)
  }));
};

// Helper function to get color for categories
const getColorForCategory = (category: string, index: number) => {
  const colorKeys = Object.keys(COLORS).filter(key => 
    !key.includes('_LIGHT') && !key.includes('_DARK') && 
    !key.includes('_20') && !key.includes('_40') && 
    !key.includes('_60') && !key.includes('_80')
  );
  
  // Cycle through the main colors
  const colorKey = colorKeys[index % colorKeys.length];
  return COLORS[colorKey as keyof typeof COLORS];
};

// Styled components for light-themed UI
const GlassPanel = styled('div')({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(0, 0, 0, 0.05)',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.07)',
  borderRadius: '16px',
  padding: '24px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.01)',
    boxShadow: '0 12px 28px rgba(59, 130, 246, 0.1)',
  }
});

const MetricCard = styled(GlassPanel)({
  padding: '20px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const TabButton = styled(Button)<{ active: boolean; theme?: any }>(({ theme, active }) => ({
  backgroundColor: active ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
  color: active ? '#3B82F6' : '#555555',
  borderBottom: active ? '2px solid #3B82F6' : '2px solid transparent',
  borderRadius: '4px 4px 0 0',
  padding: '10px 16px',
  marginRight: '8px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    borderBottom: active ? '2px solid #3B82F6' : '2px solid rgba(59, 130, 246, 0.3)',
  }
}));

const ChartContainer = styled(GlassPanel)({
  padding: '20px',
  height: '100%',
  minHeight: '320px',
});

const InsightCard = styled(motion.div)({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(0, 0, 0, 0.05)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  borderRadius: '12px',
  padding: '16px',
  marginBottom: '16px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 24px rgba(59, 130, 246, 0.1)',
  }
});

const MarketTrends: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tenderData, setTenderData] = useState<ImportedTenderData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedVendor, setSelectedVendor] = useState<string>('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('1y');
  const [selectedTrend, setSelectedTrend] = useState<string>('price');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [timeRange, setTimeRange] = useState('12M');
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [marketTrendData, setMarketTrendData] = useState<any[]>([]);
  const [disruptionRiskData, setDisruptionRiskData] = useState<any[]>([]);
  const [commodityInflationData, setCommodityInflationData] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [categoryInsightsData, setCategoryInsightsData] = useState<any[]>([]);

  // Extract unique vendors from tender data
  const uniqueVendors = useMemo(() => {
    if (!tenderData || tenderData.length === 0) return [];
    
    // Mock vendor data based on product origins
    const origins = Array.from(new Set(tenderData.map(item => (item as any).origin || 'Unknown')));
    return origins.map(origin => ({
      id: typeof origin === 'string' ? origin.toLowerCase().replace(/\s+/g, '_') : 'unknown',
      name: origin,
      productCount: tenderData.filter(item => (item as any).origin === origin).length,
      reliability: Math.random() * 100,
      categories: ['Various']
    }));
  }, [tenderData]);

  // Load data from CSV
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await loadTenderData();
        setTenderData(data);
        
        // Process data for charts
        setCategoryData(groupByCategory(data));
        setMarketTrendData(calculatePricesByCategory(data));
        setDisruptionRiskData(calculateDisruptionRisk(data));
        setCommodityInflationData(calculateCommodityInflation(data));
        setCategoryInsightsData(generateCategoryInsights(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // News and insights data
  const marketInsights: MarketInsight[] = [
    {
      id: "1",
      title: 'Semiconductor Shortage Expected to Ease by Q3',
      impact: 'Positive',
      summary: 'Industry analysts predict the global semiconductor shortage will show signs of improvement by Q3 as new production capacity comes online.',
      date: '2023-08-15',
    },
    {
      id: "2",
      title: 'Rising Shipping Costs Impact Global Supply Chains',
      impact: 'Negative',
      summary: 'Container shipping rates have increased by 45% since January, affecting procurement costs across multiple categories.',
      date: '2023-08-12',
    },
    {
      id: "3",
      title: 'New Trade Agreement to Reduce Tariffs on Electronics',
      impact: 'Positive',
      summary: 'A newly signed trade agreement between major economies will reduce tariffs on electronic components by up to 18% starting next quarter.',
      date: '2023-08-08',
    },
    {
      id: "4",
      title: 'Aluminum Production Disruption Due to Energy Crisis',
      impact: 'Negative',
      summary: 'Several major aluminum producers have reduced output by 30% due to ongoing energy shortages in key manufacturing regions.',
      date: '2023-08-05',
    },
  ];

  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: (i: number) => ({ 
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  // Render functions for different tabs
  const renderOverview = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <CircularProgress color="primary" size={60} />
        </div>
      );
    }
    
    return (
      <div className="flex flex-col gap-6">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div 
            custom={0} 
            variants={cardVariants} 
            initial="hidden" 
            animate="visible"
          >
            <MetricCard>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <MdOutlinePriceChange className="text-blue-600 mr-2" size={24} />
                  <h3 className="text-xl font-semibold text-gray-800">Market Price Index</h3>
                </div>
                <MUITooltip title="Overall market price index based on weighted average of all categories">
                  <IconButton size="small">
                    <MdOutlineInfo className="text-gray-500" />
                  </IconButton>
                </MUITooltip>
              </div>
              
              <div className="mt-2">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-800">127.8</span>
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-600 rounded text-sm font-medium flex items-center">
                    <FiTrendingUp className="mr-1" /> +12.4% YTD
                  </span>
                </div>
                <p className="text-gray-600 mt-2 text-sm">
                  Base 100 (Jan 2023) | Last updated: June 2024
                </p>
              </div>
            </MetricCard>
          </motion.div>
          
          <motion.div 
            custom={1} 
            variants={cardVariants} 
            initial="hidden" 
            animate="visible"
          >
            <MetricCard>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <FiBarChart2 className="text-orange-500 mr-2" size={24} />
                  <h3 className="text-xl font-semibold text-gray-800">Price Volatility</h3>
                </div>
                <MUITooltip title="Overall market volatility measured across all categories">
                  <IconButton size="small">
                    <MdOutlineInfo className="text-gray-500" />
                  </IconButton>
                </MUITooltip>
              </div>
              
              <div className="mt-2">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-orange-500">Medium</span>
                </div>
                <p className="text-gray-600 mt-2 text-sm">
                  Increased volatility in Drinks, Fruits & Vegetables
                </p>
                <div className="flex items-center mt-3">
                  <span className="flex items-center text-xs bg-red-100 text-red-600 px-2 py-1 rounded mr-2">
                    Drinks
                  </span>
                  <span className="flex items-center text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                    Fruits & Veg
                  </span>
                </div>
              </div>
            </MetricCard>
          </motion.div>
          
          <motion.div 
            custom={2} 
            variants={cardVariants} 
            initial="hidden" 
            animate="visible"
          >
            <MetricCard>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <FiAlertCircle className="text-purple-600 mr-2" size={24} />
                  <h3 className="text-xl font-semibold text-gray-800">Supply Risk Score</h3>
                </div>
                <MUITooltip title="Aggregate supply risk based on high volatility categories">
                  <IconButton size="small">
                    <MdOutlineInfo className="text-gray-500" />
                  </IconButton>
                </MUITooltip>
              </div>
              
              <div className="mt-2">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-gray-800">6.2</span>
                  <span className="text-xl font-medium text-gray-500 ml-1">/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
                  <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '62%' }}></div>
                </div>
                <p className="text-gray-600 mt-2 text-sm">
                  Moderate risk with increased concerns in coffee and fresh produce
                </p>
              </div>
            </MetricCard>
          </motion.div>
          
          <motion.div 
            custom={3} 
            variants={cardVariants} 
            initial="hidden" 
            animate="visible"
          >
            <MetricCard>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <MdOutlineCompare className="text-green-600 mr-2" size={24} />
                  <h3 className="text-xl font-semibold text-gray-800">Active Tenders</h3>
                </div>
                <MUITooltip title="Currently active procurement tenders across all categories">
                  <IconButton size="small">
                    <MdOutlineInfo className="text-gray-500" />
                  </IconButton>
                </MUITooltip>
              </div>
              
              <div className="mt-2">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-800">7</span>
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 rounded text-sm font-medium">
                    5 vendors
                  </span>
                </div>
                <p className="text-gray-600 mt-2 text-sm">
                  Across 5 categories and 7 suppliers
                </p>
                <button className="mt-3 text-sm text-blue-600 hover:text-blue-700 flex items-center">
                  View all tenders <MdOutlineAnalytics className="ml-1" />
                </button>
              </div>
            </MetricCard>
          </motion.div>
        </div>

        {/* Chart section with price trend */}
        <ChartContainer>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">Price Trends by Category</h3>
              <p className="text-gray-600 mt-1">Indexed prices (Base 100 = Jan 2023)</p>
            </div>
            <div className="flex items-center">
              <div className="flex space-x-2 mr-4">
                <button className="px-3 py-1 text-sm border border-gray-200 rounded bg-white text-gray-700 hover:bg-gray-50">3M</button>
                <button className="px-3 py-1 text-sm border border-blue-500 rounded bg-blue-50 text-blue-600">6M</button>
                <button className="px-3 py-1 text-sm border border-gray-200 rounded bg-white text-gray-700 hover:bg-gray-50">12M</button>
              </div>
              <IconButton className="text-gray-600 hover:text-blue-600">
                <MdOutlineDownload />
              </IconButton>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={marketTrendData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#555555' }} 
                  axisLine={{ stroke: 'rgba(0,0,0,0.2)' }} 
                />
                <YAxis 
                  tick={{ fill: '#555555' }} 
                  axisLine={{ stroke: 'rgba(0,0,0,0.2)' }} 
                  domain={[90, 140]} 
                  ticks={[90, 100, 110, 120, 130, 140]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  }} 
                />
                <Legend 
                  verticalAlign="top" 
                  wrapperStyle={{ paddingBottom: '10px' }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="drinks" 
                  name="Drinks"
                  stroke={COLORS.SECONDARY} 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="drinks_benchmark" 
                  name="Drinks (Benchmark)"
                  stroke={COLORS.SECONDARY_DARK} 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="drinks_forecast" 
                  name="Drinks (Forecast)"
                  stroke={COLORS.SECONDARY}
                  strokeWidth={2}
                  strokeDasharray="2 2"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="health_beauty" 
                  name="Health & Beauty"
                  stroke={COLORS.ACCENT2} 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="fruits_vegetables" 
                  name="Fruits & Vegetables"
                  stroke={COLORS.ACCENT3} 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="dairy" 
                  name="Dairy"
                  stroke={COLORS.PRIMARY} 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>

        {/* Insights & Top Movers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartContainer>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <MdOutlineInsights className="mr-2 text-blue-600" size={20} />
              Key Insights
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <h4 className="text-blue-600 font-medium">Price Trend Analysis</h4>
                </div>
                <p className="text-gray-700 text-sm">Drinks category showing steepest price increases at +30% YoY, primarily driven by coffee prices.</p>
              </div>
              
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  <h4 className="text-orange-600 font-medium">Supply Concerns</h4>
                </div>
                <p className="text-gray-700 text-sm">3 major suppliers have indicated potential delivery delays for Q3 due to logistics challenges.</p>
              </div>
              
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <h4 className="text-green-600 font-medium">Opportunity Alerts</h4>
                </div>
                <p className="text-gray-700 text-sm">Freezer category showing price declines of 5% - potential opportunity for long-term contracts.</p>
              </div>
            </div>
          </ChartContainer>
          
          <ChartContainer>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <MdTimeline className="mr-2 text-purple-600" size={20} />
              Top Movers (Last 30 Days)
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center">
                  <MdOutlineTrendingUp className="text-red-600 mr-3" size={20} />
                  <div>
                    <h4 className="text-gray-800 font-medium">Coffee</h4>
                    <p className="text-gray-600 text-xs">Drinks Category</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-red-600 font-bold">+8.2%</span>
                  <p className="text-gray-600 text-xs">Supply constraints</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center">
                  <MdOutlineTrendingUp className="text-red-600 mr-3" size={20} />
                  <div>
                    <h4 className="text-gray-800 font-medium">Oranges</h4>
                    <p className="text-gray-600 text-xs">Fruits & Vegetables</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-red-600 font-bold">+7.1%</span>
                  <p className="text-gray-600 text-xs">Weather disruptions</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center">
                  <MdOutlineTrendingDown className="text-green-600 mr-3" size={20} />
                  <div>
                    <h4 className="text-gray-800 font-medium">Frozen Vegetables</h4>
                    <p className="text-gray-600 text-xs">Freezer Category</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-green-600 font-bold">-3.2%</span>
                  <p className="text-gray-600 text-xs">Increased availability</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center">
                  <MdOutlineTrendingDown className="text-green-600 mr-3" size={20} />
                  <div>
                    <h4 className="text-gray-800 font-medium">Rice</h4>
                    <p className="text-gray-600 text-xs">Grains Category</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-green-600 font-bold">-2.1%</span>
                  <p className="text-gray-600 text-xs">Good harvest season</p>
                </div>
              </div>
            </div>
          </ChartContainer>
        </div>
        
        {/* Risk Analysis & Commodity Inflation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartContainer>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <MdOutlineWarning className="mr-2 text-orange-600" size={20} />
              Supply Chain Risk Factors
            </h3>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={disruptionRiskData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                  barGap={0}
                  barCategoryGap="20%"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                  <XAxis type="number" domain={[0, 30]} tick={{ fill: "#555555" }} />
                  <YAxis type="category" dataKey="name" tick={{ fill: "#555555" }} width={100} />
                  <Tooltip
                    cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                    contentStyle={{
                      backgroundColor: 'rgba(255,255,255,0.95)',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px'
                    }}
                    formatter={(value, name, props) => {
                      if (name === "Current Risk") {
                        return [`${value}%`, "Current Risk"];
                      }
                      return [`${value}%`, "Previous Period"];
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="prevValue" 
                    name="Previous Period" 
                    fill={COLORS.PRIMARY_40}
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar 
                    dataKey="value" 
                    name="Current Risk" 
                    fill={COLORS.ACCENT2}
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-2 text-sm text-gray-600">
              <p>Supply chain disruptions remain the largest risk factor at 31%, followed by geopolitical tensions at 24%.</p>
            </div>
          </ChartContainer>
          
          <ChartContainer>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiDollarSign className="mr-2 text-green-600" size={20} />
              Commodity Inflation Rates (%, YoY)
            </h3>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={commodityInflationData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                  <XAxis 
                    type="number"
                    domain={[0, 10]}
                    tick={{ fill: '#555555' }} 
                    axisLine={{ stroke: 'rgba(0,0,0,0.2)' }} 
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category"
                    tick={{ fill: '#555555' }} 
                    axisLine={{ stroke: 'rgba(0,0,0,0.2)' }} 
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    }}
                    formatter={(value) => [`${value}%`, 'Inflation Rate']}
                  />
                  <Bar dataKey="rate" name="Current Rate" radius={[0, 4, 4, 0]}>
                    {commodityInflationData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.rate > 5 ? COLORS.ACCENT1 : entry.rate > 3 ? COLORS.ACCENT2 : COLORS.SECONDARY} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-2 text-sm text-gray-600">
              <p>Coffee and citrus fruits continue to experience high inflation, while dairy and grains have stabilized.</p>
            </div>
          </ChartContainer>
        </div>

        {/* Category Insights Chart */}
        <ChartContainer>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <MdOutlineCategory className="mr-2 text-blue-600" size={20} />
            Category Insights
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryInsightsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryInsightsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color || getColorForCategory('default', index)} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}%`, 'Market Share']}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex flex-col justify-center">
              <h4 className="text-lg font-medium text-gray-800 mb-4">Category Market Share</h4>
              <div className="space-y-3">
                {categoryInsightsData.slice(0, 5).map((category, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: category.color }}></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">{category.name}</span>
                        <span className="font-medium">{category.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div className="h-1.5 rounded-full" style={{ width: `${category.percentage}%`, backgroundColor: category.color }}></div>
                      </div>
                    </div>
                  </div>
                ))}
                {categoryInsightsData.length > 5 && (
                  <button className="text-sm text-blue-600 hover:text-blue-700 mt-2 flex items-center">
                    Show more categories <MdMoreHoriz className="ml-1" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </ChartContainer>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-6 bg-gray-50">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-800">Market Trends</h1>
          
          <div className="flex items-center">
            <TextField
              placeholder="Search insights..."
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdSearch className="text-gray-500" />
                  </InputAdornment>
                ),
                style: { 
                  color: '#333',
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '8px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                },
              }}
              sx={{
                width: '250px',
                mr: 2,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.1)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.2)',
                },
              }}
            />
            
            <IconButton 
              className="bg-blue-50 text-blue-600 hover:bg-blue-100 mr-2"
              onClick={() => console.log('Refresh data')}
            >
              <MdOutlineRefresh />
            </IconButton>
            
            <IconButton 
              className="bg-blue-50 text-blue-600 hover:bg-blue-100"
              onClick={() => console.log('Download report')}
            >
              <MdOutlineFileDownload />
            </IconButton>
          </div>
        </div>
        
        <div className="border-b border-gray-200 mb-4">
          <div className="flex">
            <TabButton
              active={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </TabButton>
            <TabButton
              active={activeTab === 'price-analytics'}
              onClick={() => setActiveTab('price-analytics')}
            >
              Price Analytics
            </TabButton>
            <TabButton
              active={activeTab === 'supply-risk'}
              onClick={() => setActiveTab('supply-risk')}
            >
              Supply Risk
            </TabButton>
            <TabButton
              active={activeTab === 'vendor-analysis'}
              onClick={() => setActiveTab('vendor-analysis')}
            >
              Vendor Analysis
            </TabButton>
            <TabButton
              active={activeTab === 'forecasts'}
              onClick={() => setActiveTab('forecasts')}
            >
              Forecasts
            </TabButton>
          </div>
        </div>
        
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'price-analytics' && (
          <div className="grid grid-cols-1 gap-6">
            <ChartContainer>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Price Analytics</h3>
              
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-2">
                  <button className="px-3 py-2 text-sm border border-gray-200 rounded-md bg-white text-gray-700 hover:bg-gray-50">
                    All Categories
                  </button>
                  <button className="px-3 py-2 text-sm border border-blue-500 rounded-md bg-blue-50 text-blue-600">
                    Drinks
                  </button>
                  <button className="px-3 py-2 text-sm border border-gray-200 rounded-md bg-white text-gray-700 hover:bg-gray-50">
                    Fruits & Vegetables
                  </button>
                </div>
                
                <div className="flex space-x-2">
                  <button className="px-3 py-2 text-sm border border-gray-200 rounded-md bg-white text-gray-700 flex items-center">
                    <MdOutlineFilterList className="mr-1" /> Filter
                  </button>
                  <button className="px-3 py-2 text-sm border border-gray-200 rounded-md bg-white text-gray-700 flex items-center">
                    <MdOutlineDownload className="mr-1" /> Export
                  </button>
                </div>
              </div>
              
              <div className="h-96 flex justify-center items-center text-gray-500">
                <div className="text-center p-8">
                  <MdOutlineAnalytics className="mx-auto mb-4 text-gray-400" size={48} />
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">Price Analytics Dashboard</h4>
                  <p className="max-w-md mx-auto">
                    Detailed price analytics visualization will be displayed here. 
                    Select categories and date ranges to analyze price trends in depth.
                  </p>
                </div>
              </div>
            </ChartContainer>
          </div>
        )}
        {activeTab === 'supply-risk' && (
          <div className="grid grid-cols-1 gap-6">
            <ChartContainer>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Supply Risk Analysis</h3>
              
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-2">
                  <button className="px-3 py-2 text-sm border border-blue-500 rounded-md bg-blue-50 text-blue-600">
                    Global View
                  </button>
                  <button className="px-3 py-2 text-sm border border-gray-200 rounded-md bg-white text-gray-700 hover:bg-gray-50">
                    By Category
                  </button>
                  <button className="px-3 py-2 text-sm border border-gray-200 rounded-md bg-white text-gray-700 hover:bg-gray-50">
                    By Supplier
                  </button>
                </div>
                
                <div className="flex space-x-2">
                  <button className="px-3 py-2 text-sm border border-gray-200 rounded-md bg-white text-gray-700 flex items-center">
                    <MdOutlineDownload className="mr-1" /> Export
                  </button>
                </div>
              </div>
              
              <div className="h-96 flex justify-center items-center text-gray-500">
                <div className="text-center p-8">
                  <MdOutlineWarning className="mx-auto mb-4 text-gray-400" size={48} />
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">Supply Risk Dashboard</h4>
                  <p className="max-w-md mx-auto">
                    Comprehensive supply chain risk analysis will be displayed here.
                    Monitor potential disruptions and get proactive alerts.
                  </p>
                </div>
              </div>
            </ChartContainer>
          </div>
        )}
        {activeTab === 'vendor-analysis' && (
          <div className="grid grid-cols-1 gap-6">
            <ChartContainer>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Vendor Performance Analysis</h3>
              
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-2">
                  <button className="px-3 py-2 text-sm border border-blue-500 rounded-md bg-blue-50 text-blue-600">
                    All Vendors
                  </button>
                  <button className="px-3 py-2 text-sm border border-gray-200 rounded-md bg-white text-gray-700 hover:bg-gray-50">
                    Top Performers
                  </button>
                  <button className="px-3 py-2 text-sm border border-gray-200 rounded-md bg-white text-gray-700 hover:bg-gray-50">
                    Risk Assessment
                  </button>
                </div>
                
                <div>
                  <button className="px-3 py-2 text-sm border border-gray-200 rounded-md bg-white text-gray-700 flex items-center">
                    <MdOutlineDownload className="mr-1" /> Export
                  </button>
                </div>
              </div>
              
              <div className="h-96 flex justify-center items-center text-gray-500">
                <div className="text-center p-8">
                  <MdOutlineCompare className="mx-auto mb-4 text-gray-400" size={48} />
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">Vendor Analysis Dashboard</h4>
                  <p className="max-w-md mx-auto">
                    Compare vendor performance across categories with comprehensive metrics 
                    on pricing, reliability, and quality.
                  </p>
                </div>
              </div>
            </ChartContainer>
          </div>
        )}
        {activeTab === 'forecasts' && (
          <div className="grid grid-cols-1 gap-6">
            <ChartContainer>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Price Forecasting</h3>
              
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-2">
                  <button className="px-3 py-2 text-sm border border-blue-500 rounded-md bg-blue-50 text-blue-600">
                    3-Month
                  </button>
                  <button className="px-3 py-2 text-sm border border-gray-200 rounded-md bg-white text-gray-700 hover:bg-gray-50">
                    6-Month
                  </button>
                  <button className="px-3 py-2 text-sm border border-gray-200 rounded-md bg-white text-gray-700 hover:bg-gray-50">
                    12-Month
                  </button>
                </div>
                
                <div>
                  <button className="px-3 py-2 text-sm border border-gray-200 rounded-md bg-white text-gray-700 flex items-center">
                    <MdOutlineDownload className="mr-1" /> Export
                  </button>
                </div>
              </div>
              
              <div className="h-96 flex justify-center items-center text-gray-500">
                <div className="text-center p-8">
                  <MdOutlineTrendingUp className="mx-auto mb-4 text-gray-400" size={48} />
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">Price Forecast Dashboard</h4>
                  <p className="max-w-md mx-auto">
                    AI-powered price forecasting models will display projected price movements
                    for different categories and time horizons.
                  </p>
                </div>
              </div>
            </ChartContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketTrends; 