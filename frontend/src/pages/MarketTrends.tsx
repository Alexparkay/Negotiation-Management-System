import React, { useState } from 'react';
import { 
  MdOutlineTrendingUp,
  MdOutlineDownload,
  MdOutlineInsights,
  MdOutlineFilterList,
  MdOutlineCategory,
  MdOutlineSearch,
  MdOutlineCalendarToday,
  MdOutlineInfo,
  MdOutlineWarning,
  MdOutlineTrendingDown,
  MdOutlineAttachMoney,
  MdOutlineShoppingCart,
  MdOutlineAnalytics
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
  Cell
} from 'recharts';
import ChatPopup from '../components/ChatPopup';
import { 
  FiTrendingUp, FiTrendingDown, FiAlertCircle, 
  FiDollarSign, FiBarChart2, FiGlobe
} from 'react-icons/fi';

interface MarketTrendData {
  id: string;
  category: string;
  name: string;
  trends: {
    date: string;
    value: number;
    changePercent: number;
  }[];
  impactFactors: {
    factor: string;
    impact: number; // Scale from -100 to 100
    description: string;
  }[];
  forecast: {
    date: string;
    value: number;
    min: number;
    max: number;
  }[];
  insights: {
    title: string;
    description: string;
    type: 'positive' | 'negative' | 'neutral' | 'warning';
    date: string;
  }[];
  relatedCategories: string[];
}

// Calculate sentiment score from impact factors
const calculateSentiment = (factors: { factor: string; impact: number; description: string }[]) => {
  if (factors.length === 0) return 0;
  
  const totalImpact = factors.reduce((sum, factor) => sum + factor.impact, 0);
  return totalImpact / factors.length;
};

// Mock data for market trends
const marketTrendData = [
  { month: 'Jan', electronics: 4200, metals: 3800, plastics: 2900, chemicals: 3400 },
  { month: 'Feb', electronics: 4300, metals: 3700, plastics: 3100, chemicals: 3300 },
  { month: 'Mar', electronics: 4100, metals: 3900, plastics: 3000, chemicals: 3500 },
  { month: 'Apr', electronics: 4500, metals: 4100, plastics: 3200, chemicals: 3700 },
  { month: 'May', electronics: 4700, metals: 4200, plastics: 3400, chemicals: 3800 },
  { month: 'Jun', electronics: 4600, metals: 4300, plastics: 3600, chemicals: 3600 },
  { month: 'Jul', electronics: 4800, metals: 4500, plastics: 3800, chemicals: 3900 },
  { month: 'Aug', electronics: 5100, metals: 4400, plastics: 3700, chemicals: 4100 },
  { month: 'Sep', electronics: 5200, metals: 4600, plastics: 3900, chemicals: 4300 },
  { month: 'Oct', electronics: 5000, metals: 4700, plastics: 4100, chemicals: 4500 },
  { month: 'Nov', electronics: 5300, metals: 4800, plastics: 4200, chemicals: 4600 },
  { month: 'Dec', electronics: 5500, metals: 5000, plastics: 4300, chemicals: 4800 },
];

// Disruption risk data
const disruptionRiskData = [
  { name: 'Supply Chain', value: 35, color: '#3B82F6' },
  { name: 'Geopolitical', value: 25, color: '#F59E0B' },
  { name: 'Economic', value: 20, color: '#10B981' },
  { name: 'Environmental', value: 15, color: '#EF4444' },
  { name: 'Technological', value: 5, color: '#8B5CF6' },
];

// Commodity inflation data
const commodityInflationData = [
  { name: 'Copper', rate: 4.3 },
  { name: 'Aluminum', rate: 3.2 },
  { name: 'Steel', rate: 5.1 },
  { name: 'Plastics', rate: 6.7 },
  { name: 'Semiconductors', rate: 8.2 },
  { name: 'Gold', rate: 2.1 },
  { name: 'Silver', rate: 1.7 },
  { name: 'Oil', rate: 7.4 },
];

// News and insights data
const marketInsights = [
  {
    id: 1,
    title: 'Semiconductor Shortage Expected to Ease by Q3',
    impact: 'Positive',
    summary: 'Industry analysts predict the global semiconductor shortage will show signs of improvement by Q3 as new production capacity comes online.',
    date: '2023-08-15',
  },
  {
    id: 2,
    title: 'Rising Shipping Costs Impact Global Supply Chains',
    impact: 'Negative',
    summary: 'Container shipping rates have increased by 45% since January, affecting procurement costs across multiple categories.',
    date: '2023-08-12',
  },
  {
    id: 3,
    title: 'New Trade Agreement to Reduce Tariffs on Electronics',
    impact: 'Positive',
    summary: 'A newly signed trade agreement between major economies will reduce tariffs on electronic components by up to 18% starting next quarter.',
    date: '2023-08-08',
  },
  {
    id: 4,
    title: 'Aluminum Production Disruption Due to Energy Crisis',
    impact: 'Negative',
    summary: 'Several major aluminum producers have reduced output by 30% due to ongoing energy shortages in key manufacturing regions.',
    date: '2023-08-05',
  },
];

const MarketTrends: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('1y');
  const [selectedTrend, setSelectedTrend] = useState<string>('Electronics');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [timeRange, setTimeRange] = useState('12m');

  // Mock data for market trends
  const marketTrends: MarketTrendData[] = [
    {
      id: 'trend-001',
      category: 'Electronics',
      name: 'Consumer Electronics',
      trends: [
        { date: '2023-Q1', value: 100, changePercent: 0 },
        { date: '2023-Q2', value: 103, changePercent: 3 },
        { date: '2023-Q3', value: 107, changePercent: 3.9 },
        { date: '2023-Q4', value: 112, changePercent: 4.7 },
        { date: '2024-Q1', value: 115, changePercent: 2.7 }
      ],
      impactFactors: [
        { 
          factor: 'Semiconductor Shortage', 
          impact: -60, 
          description: 'Ongoing semiconductor shortages affecting production and increasing component costs' 
        },
        { 
          factor: 'Consumer Demand', 
          impact: 70, 
          description: 'Strong consumer demand for electronics post-pandemic' 
        },
        { 
          factor: 'Supply Chain Disruptions', 
          impact: -40, 
          description: 'Lingering supply chain issues affecting delivery times and costs' 
        },
        { 
          factor: 'New Product Launches', 
          impact: 50, 
          description: 'Major manufacturers planning significant new product launches in Q3' 
        }
      ],
      forecast: [
        { date: '2024-Q2', value: 119, min: 116, max: 122 },
        { date: '2024-Q3', value: 124, min: 120, max: 128 },
        { date: '2024-Q4', value: 130, min: 125, max: 135 }
      ],
      insights: [
        {
          title: 'Price Stabilization Expected',
          description: 'Component prices are expected to stabilize in Q3 2024 as production capacity increases.',
          type: 'positive',
          date: '2024-03-15'
        },
        {
          title: 'Supply Chain Risks',
          description: 'Geopolitical tensions pose continued risks to global electronics supply chains.',
          type: 'warning',
          date: '2024-03-10'
        },
        {
          title: 'Increased Competition',
          description: 'New market entrants are increasing competition in the mid-range segment.',
          type: 'neutral',
          date: '2024-02-28'
        }
      ],
      relatedCategories: ['Computer Hardware', 'Telecommunications', 'Electronic Components']
    },
    {
      id: 'trend-002',
      category: 'Networking',
      name: 'Network Equipment',
      trends: [
        { date: '2023-Q1', value: 100, changePercent: 0 },
        { date: '2023-Q2', value: 104, changePercent: 4 },
        { date: '2023-Q3', value: 110, changePercent: 5.8 },
        { date: '2023-Q4', value: 118, changePercent: 7.3 },
        { date: '2024-Q1', value: 123, changePercent: 4.2 }
      ],
      impactFactors: [
        { 
          factor: 'Remote Work Demands', 
          impact: 80, 
          description: 'Continued remote work driving demand for better networking equipment' 
        },
        { 
          factor: 'Cloud Infrastructure Growth', 
          impact: 75, 
          description: 'Expansion of cloud services requiring more network capacity' 
        },
        { 
          factor: 'Chip Shortages', 
          impact: -50, 
          description: 'Semiconductor shortages affecting production capacity' 
        },
        { 
          factor: 'Technology Upgrades', 
          impact: 60, 
          description: '5G and WiFi 6 driving equipment replacement cycles' 
        }
      ],
      forecast: [
        { date: '2024-Q2', value: 128, min: 125, max: 131 },
        { date: '2024-Q3', value: 134, min: 130, max: 138 },
        { date: '2024-Q4', value: 140, min: 135, max: 145 }
      ],
      insights: [
        {
          title: 'Enterprise Upgrades Accelerating',
          description: 'Enterprises are accelerating network upgrades to support hybrid work environments.',
          type: 'positive',
          date: '2024-03-18'
        },
        {
          title: 'Supply Constraints Easing',
          description: 'Manufacturing capacity is gradually improving, easing some supply constraints.',
          type: 'positive',
          date: '2024-03-05'
        },
        {
          title: 'Price Pressures Continue',
          description: 'Despite improving supply, prices remain elevated due to strong demand.',
          type: 'negative',
          date: '2024-02-20'
        }
      ],
      relatedCategories: ['Telecommunications', 'IT Infrastructure', 'Data Center Equipment']
    },
    {
      id: 'trend-003',
      category: 'Computer Hardware',
      name: 'Storage Solutions',
      trends: [
        { date: '2023-Q1', value: 100, changePercent: 0 },
        { date: '2023-Q2', value: 98, changePercent: -2 },
        { date: '2023-Q3', value: 95, changePercent: -3.1 },
        { date: '2023-Q4', value: 92, changePercent: -3.2 },
        { date: '2024-Q1', value: 90, changePercent: -2.2 }
      ],
      impactFactors: [
        { 
          factor: 'Technology Advancements', 
          impact: 65, 
          description: 'Advancements in SSD technology improving capacity and reducing costs' 
        },
        { 
          factor: 'Competitive Market', 
          impact: 45, 
          description: 'Increasing competition among major storage manufacturers' 
        },
        { 
          factor: 'Data Center Expansion', 
          impact: 70, 
          description: 'Growing data center deployments increasing demand for high-capacity storage' 
        },
        { 
          factor: 'Manufacturing Efficiency', 
          impact: 55, 
          description: 'Improved manufacturing processes leading to higher output and lower costs' 
        }
      ],
      forecast: [
        { date: '2024-Q2', value: 88, min: 86, max: 90 },
        { date: '2024-Q3', value: 85, min: 83, max: 87 },
        { date: '2024-Q4', value: 83, min: 80, max: 86 }
      ],
      insights: [
        {
          title: 'Price Declines Expected to Continue',
          description: 'Storage prices are projected to continue declining as manufacturing capacity expands.',
          type: 'positive',
          date: '2024-03-12'
        },
        {
          title: 'Enterprise Demand Remains Strong',
          description: 'Enterprise spending on high-capacity storage solutions remains robust despite price pressures.',
          type: 'neutral',
          date: '2024-03-01'
        },
        {
          title: 'Innovation Accelerating',
          description: 'New storage technologies are being introduced at a faster pace, potentially disrupting current market trends.',
          type: 'warning',
          date: '2024-02-15'
        }
      ],
      relatedCategories: ['Data Center Equipment', 'Cloud Infrastructure', 'Enterprise Hardware']
    }
  ];

  // Time ranges for filter
  const timeRanges = [
    { value: '6m', label: '6 Months' },
    { value: '1y', label: 'Last Year' },
    { value: '2y', label: 'Last 2 Years' },
    { value: 'all', label: 'All Time' }
  ];

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(marketTrends.map(t => t.category)))];

  // Filter market trends
  const filteredTrends = marketTrends.filter(trend => 
    (selectedCategory === 'all' || trend.category === selectedCategory) &&
    (searchQuery === '' || 
      trend.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      trend.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Get selected trend data
  const selectedTrendData = marketTrends.find(t => t.name === selectedTrend);

  // Filter time series data based on selected time range
  const filterTimeSeriesData = (data: any[]) => {
    if (selectedTimeRange === 'all' || data.length <= 4) return data;
    
    const numPoints = selectedTimeRange === '6m' ? 2 : (selectedTimeRange === '1y' ? 4 : 8);
    return data.slice(-numPoints);
  };

  // Prepare forecast data for chart
  const prepareForecastData = () => {
    if (!selectedTrendData) return [];
    
    // Get historical data
    const historicalData = selectedTrendData.trends.map(point => ({
      date: point.date,
      value: point.value,
      min: null,
      max: null
    }));
    
    // Combine with forecast data
    return [...historicalData, ...selectedTrendData.forecast];
  };

  // Prepare impact factor data for chart
  const prepareImpactFactorData = () => {
    if (!selectedTrendData) return [];
    
    return selectedTrendData.impactFactors.map(factor => ({
      name: factor.factor,
      value: Math.abs(factor.impact),
      impact: factor.impact,
      description: factor.description
    }));
  };

  // Calculate the overall market sentiment from impact factors
  const calculateMarketSentiment = () => {
    if (!selectedTrendData) return { score: 0, label: 'Neutral' };
    
    const score = calculateSentiment(selectedTrendData.impactFactors);
    
    let label = 'Neutral';
    if (score > 30) label = 'Positive';
    else if (score > 10) label = 'Slightly Positive';
    else if (score < -30) label = 'Negative';
    else if (score < -10) label = 'Slightly Negative';
    
    return { score, label };
  };

  // Colors for charts
  const colors = {
    primary: '#3B82F6',   // blue
    secondary: '#10B981', // green
    warning: '#F59E0B',   // amber
    error: '#EF4444',     // red
    purple: '#8B5CF6',    // purple
    positive: '#10B981',  // green
    negative: '#EF4444',  // red
    neutral: '#6B7280',   // gray
  };

  // Get color for impact factor based on its value
  const getImpactFactorColor = (impact: number) => {
    if (impact > 50) return colors.positive;
    if (impact > 0) return colors.primary;
    if (impact > -50) return colors.warning;
    return colors.negative;
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-semibold text-white mb-8">Market Trends</h1>
      
      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-panel rounded-xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg text-white">Price Index</h3>
            <FiTrendingUp className="text-accent-primary text-xl" />
          </div>
          <p className="text-3xl font-semibold text-white mt-2">127.8</p>
          <p className="text-sm text-green-500">+2.3% from last month</p>
        </div>
        
        <div className="glass-panel rounded-xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg text-white">Volatility</h3>
            <FiBarChart2 className="text-accent-primary text-xl" />
          </div>
          <p className="text-3xl font-semibold text-white mt-2">Medium</p>
          <p className="text-sm text-yellow-500">Increased in 3 categories</p>
        </div>
        
        <div className="glass-panel rounded-xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg text-white">Supply Constraints</h3>
            <FiAlertCircle className="text-accent-primary text-xl" />
          </div>
          <p className="text-3xl font-semibold text-white mt-2">12</p>
          <p className="text-sm text-red-500">Critical in semiconductors</p>
        </div>
        
        <div className="glass-panel rounded-xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg text-white">Market Leaders</h3>
            <FiGlobe className="text-accent-primary text-xl" />
          </div>
          <p className="text-3xl font-semibold text-white mt-2">18</p>
          <p className="text-sm text-blue-500">Added 2 new suppliers</p>
        </div>
      </div>
      
      {/* Market price trends */}
      <div className="glass-panel rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Price Trends by Category</h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => setTimeRange('3m')}
              className={`px-3 py-1 rounded-lg ${timeRange === '3m' ? 'bg-accent-primary text-white' : 'bg-background-accent text-text-secondary'}`}
            >
              3M
            </button>
            <button 
              onClick={() => setTimeRange('6m')}
              className={`px-3 py-1 rounded-lg ${timeRange === '6m' ? 'bg-accent-primary text-white' : 'bg-background-accent text-text-secondary'}`}
            >
              6M
            </button>
            <button 
              onClick={() => setTimeRange('12m')}
              className={`px-3 py-1 rounded-lg ${timeRange === '12m' ? 'bg-accent-primary text-white' : 'bg-background-accent text-text-secondary'}`}
            >
              12M
            </button>
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={marketTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#B3B3B3" />
              <YAxis stroke="#B3B3B3" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(26, 26, 26, 0.9)', 
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF'
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="electronics" 
                stroke="#3B82F6" 
                strokeWidth={2} 
                dot={{ r: 2 }} 
                activeDot={{ r: 6 }} 
              />
              <Line 
                type="monotone" 
                dataKey="metals" 
                stroke="#10B981" 
                strokeWidth={2} 
                dot={{ r: 2 }} 
                activeDot={{ r: 6 }} 
              />
              <Line 
                type="monotone" 
                dataKey="plastics" 
                stroke="#F59E0B" 
                strokeWidth={2} 
                dot={{ r: 2 }} 
                activeDot={{ r: 6 }} 
              />
              <Line 
                type="monotone" 
                dataKey="chemicals" 
                stroke="#8B5CF6" 
                strokeWidth={2} 
                dot={{ r: 2 }} 
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Disruption risk and Commodity inflation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="glass-panel rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">Disruption Risk Factors</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={disruptionRiskData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {disruptionRiskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(26, 26, 26, 0.9)', 
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="glass-panel rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">Commodity Inflation Rates</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={commodityInflationData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" stroke="#B3B3B3" />
                <YAxis dataKey="name" type="category" scale="band" stroke="#B3B3B3" />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Inflation Rate']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(26, 26, 26, 0.9)', 
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF'
                  }} 
                />
                <Bar dataKey="rate" fill="#3B82F6" barSize={20} radius={[0, 4, 4, 0]}>
                  {commodityInflationData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.rate > 5 ? '#EF4444' : entry.rate > 3 ? '#F59E0B' : '#10B981'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Market insights */}
      <div className="glass-panel rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-6">Market Insights</h2>
        <div className="space-y-4">
          {marketInsights.map(insight => (
            <div key={insight.id} className="bg-background-accent p-4 rounded-lg border border-white/10 hover:border-accent-primary/50 transition-all duration-300">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium text-white">{insight.title}</h3>
                <span 
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    insight.impact === 'Positive' ? 'bg-green-900/40 text-green-400' : 
                    insight.impact === 'Negative' ? 'bg-red-900/40 text-red-400' :
                    'bg-yellow-900/40 text-yellow-400'
                  }`}
                >
                  {insight.impact}
                </span>
              </div>
              <p className="text-text-secondary mt-2">{insight.summary}</p>
              <p className="text-text-muted text-sm mt-2">{insight.date}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Strategic recommendations */}
      <div className="glass-panel rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-white mb-6">Strategic Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-background-accent p-4 rounded-lg border border-white/10">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                <FiTrendingUp className="text-blue-400" />
              </div>
              <h3 className="text-lg font-medium text-white">Forward Buying</h3>
            </div>
            <p className="text-text-secondary">Consider 3-month forward contracts for semiconductors to hedge against anticipated price increases in Q4. Expected savings of 8-12%.</p>
          </div>
          
          <div className="bg-background-accent p-4 rounded-lg border border-white/10">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                <FiDollarSign className="text-green-400" />
              </div>
              <h3 className="text-lg font-medium text-white">Sourcing Diversification</h3>
            </div>
            <p className="text-text-secondary">Expand aluminum supplier base to include Southeast Asian manufacturers to mitigate the impact of current production disruptions.</p>
          </div>
          
          <div className="bg-background-accent p-4 rounded-lg border border-white/10">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center mr-3">
                <FiAlertCircle className="text-yellow-400" />
              </div>
              <h3 className="text-lg font-medium text-white">Risk Monitoring</h3>
            </div>
            <p className="text-text-secondary">Implement weekly monitoring of plastic resin markets due to high volatility. Set up price alerts for 5%+ movements.</p>
          </div>
          
          <div className="bg-background-accent p-4 rounded-lg border border-white/10">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                <FiGlobe className="text-purple-400" />
              </div>
              <h3 className="text-lg font-medium text-white">Contract Renegotiation</h3>
            </div>
            <p className="text-text-secondary">Initiate renegotiation of fixed-price agreements for electronic components to leverage the expected market stabilization in Q3.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketTrends; 