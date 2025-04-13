import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MdOutlineCategory,
  MdOutlineDashboard,
  MdOutlineSearch,
  MdOutlineFilterList,
  MdOutlineSort,
  MdOutlineAttachMoney,
  MdOutlineTrendingUp,
  MdOutlineTrendingDown,
  MdOutlineInsights,
  MdOutlineWarning,
  MdOutlineInfo,
  MdOutlineInventory,
  MdOutlineLocalOffer,
  MdOutlineDescription,
  MdOutlineArrowForward
} from 'react-icons/md';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import ChatPopup from '../components/ChatPopup';

interface CategoryData {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  averagePrice: number;
  priceChange: number;
  priceChangePercent: number;
  volatility: 'high' | 'medium' | 'low';
  trend: 'increasing' | 'decreasing' | 'stable';
  subcategories: string[];
  specs: Array<{name: string; value: number}>;
  icon: React.ReactNode;
}

const ProductCategories: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Mock categories data
  const categories: CategoryData[] = [
    {
      id: 'electronics',
      name: 'Electronics',
      description: 'Electronic components, finished products, and accessories',
      itemCount: 328,
      averagePrice: 1250,
      priceChange: 85,
      priceChangePercent: 7.3,
      volatility: 'medium',
      trend: 'increasing',
      subcategories: ['Semiconductors', 'Displays', 'PCB Components', 'Batteries', 'Connectors'],
      specs: [
        { name: 'Quality', value: 85 },
        { name: 'Supply', value: 72 },
        { name: 'Pricing', value: 65 },
        { name: 'Volatility', value: 58 },
        { name: 'Suppliers', value: 80 }
      ],
      icon: <MdOutlineInventory />
    },
    {
      id: 'raw_materials',
      name: 'Raw Materials',
      description: 'Base materials for manufacturing and production',
      itemCount: 156,
      averagePrice: 850,
      priceChange: 120,
      priceChangePercent: 16.4,
      volatility: 'high',
      trend: 'increasing',
      subcategories: ['Metals', 'Plastics', 'Chemicals', 'Wood', 'Textiles'],
      specs: [
        { name: 'Quality', value: 75 },
        { name: 'Supply', value: 60 },
        { name: 'Pricing', value: 55 },
        { name: 'Volatility', value: 85 },
        { name: 'Suppliers', value: 70 }
      ],
      icon: <MdOutlineLocalOffer />
    },
    {
      id: 'packaging',
      name: 'Packaging',
      description: 'Materials and supplies for product packaging',
      itemCount: 94,
      averagePrice: 420,
      priceChange: 48,
      priceChangePercent: 12.9,
      volatility: 'medium',
      trend: 'increasing',
      subcategories: ['Cardboard', 'Plastic Packaging', 'Glass', 'Labels', 'Foam'],
      specs: [
        { name: 'Quality', value: 80 },
        { name: 'Supply', value: 75 },
        { name: 'Pricing', value: 70 },
        { name: 'Volatility', value: 60 },
        { name: 'Suppliers', value: 85 }
      ],
      icon: <MdOutlineInventory />
    },
    {
      id: 'machinery',
      name: 'Machinery',
      description: 'Industrial machinery and equipment',
      itemCount: 67,
      averagePrice: 15800,
      priceChange: -320,
      priceChangePercent: -1.9,
      volatility: 'low',
      trend: 'stable',
      subcategories: ['Production Equipment', 'Tools', 'Automation', 'Testing Equipment', 'Spare Parts'],
      specs: [
        { name: 'Quality', value: 90 },
        { name: 'Supply', value: 65 },
        { name: 'Pricing', value: 45 },
        { name: 'Volatility', value: 40 },
        { name: 'Suppliers', value: 60 }
      ],
      icon: <MdOutlineInventory />
    },
    {
      id: 'logistics',
      name: 'Logistics',
      description: 'Transportation and shipping services',
      itemCount: 38,
      averagePrice: 680,
      priceChange: -75,
      priceChangePercent: -9.9,
      volatility: 'high',
      trend: 'decreasing',
      subcategories: ['Ocean Freight', 'Air Freight', 'Ground Transport', 'Warehousing', 'Last Mile'],
      specs: [
        { name: 'Quality', value: 75 },
        { name: 'Supply', value: 65 },
        { name: 'Pricing', value: 60 },
        { name: 'Volatility', value: 75 },
        { name: 'Suppliers', value: 70 }
      ],
      icon: <MdOutlineLocalOffer />
    },
    {
      id: 'office',
      name: 'Office Supplies',
      description: 'General office materials and equipment',
      itemCount: 215,
      averagePrice: 120,
      priceChange: 5,
      priceChangePercent: 4.3,
      volatility: 'low',
      trend: 'stable',
      subcategories: ['Paper Goods', 'Writing Implements', 'Organization', 'Furniture', 'Technology'],
      specs: [
        { name: 'Quality', value: 80 },
        { name: 'Supply', value: 90 },
        { name: 'Pricing', value: 85 },
        { name: 'Volatility', value: 30 },
        { name: 'Suppliers', value: 95 }
      ],
      icon: <MdOutlineDescription />
    }
  ];
  
  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    searchTerm === '' ||
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.subcategories.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Sort categories
  const sortedCategories = [...filteredCategories].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price_asc':
        return a.averagePrice - b.averagePrice;
      case 'price_desc':
        return b.averagePrice - a.averagePrice;
      case 'items':
        return b.itemCount - a.itemCount;
      case 'change':
        return b.priceChangePercent - a.priceChangePercent;
      default:
        return 0;
    }
  });
  
  // Get the selected category data
  const selectedCategoryData = selectedCategory ? categories.find(c => c.id === selectedCategory) : null;
  
  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Pie chart data for category distribution
  const categoryDistributionData = categories.map(cat => ({
    name: cat.name,
    value: cat.itemCount
  }));
  
  // Colors for charts
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
  
  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary">Product Categories</h1>
          <p className="text-text-secondary mt-1">Browse and analyze product categories and pricing data</p>
        </div>
        <div className="flex gap-2">
          <Link to="/price-tracker" className="btn btn-outline btn-sm flex items-center gap-2">
            <MdOutlineAttachMoney className="text-lg" /> Price Tracker
          </Link>
          <Link to="/market-trends" className="btn btn-primary btn-sm flex items-center gap-2">
            <MdOutlineTrendingUp className="text-lg" /> Market Trends
          </Link>
        </div>
      </div>

      {/* Search and filters */}
      <div className="glass-panel p-4 rounded-xl mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MdOutlineSearch className="text-text-muted text-lg" />
            </div>
            <input
              type="text"
              className="input input-bordered w-full pl-10"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-outline btn-sm flex items-center gap-2">
              <MdOutlineSort className="text-lg" /> Sort by: {sortBy.replace('_', ' ')}
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow glass-panel rounded-box w-52">
              <li><button onClick={() => setSortBy('name')}>Name</button></li>
              <li><button onClick={() => setSortBy('price_asc')}>Price (Low to High)</button></li>
              <li><button onClick={() => setSortBy('price_desc')}>Price (High to Low)</button></li>
              <li><button onClick={() => setSortBy('items')}>Item Count</button></li>
              <li><button onClick={() => setSortBy('change')}>Price Change</button></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Overview Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Category Distribution */}
        <div className="glass-panel p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Category Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} items`, 'Count']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(26, 26, 26, 0.8)', 
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '8px' 
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Average Price Comparison */}
        <div className="glass-panel p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Average Price by Category</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categories}
                margin={{ top: 5, right: 20, left: 10, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                <YAxis />
                <Tooltip
                  formatter={(value) => [formatCurrency(value as number), 'Average Price']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(26, 26, 26, 0.8)', 
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '8px' 
                  }}
                />
                <Bar 
                  dataKey="averagePrice" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]}
                  name="Average Price"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {sortedCategories.map((category) => (
          <div 
            key={category.id} 
            className={`glass-panel rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer ${
              selectedCategory === category.id ? 'ring-2 ring-accent-primary' : ''
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-background-accent flex items-center justify-center text-accent-primary text-xl">
                    {category.icon}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-text-primary">{category.name}</h3>
                    <p className="text-sm text-text-muted">{category.itemCount} items</p>
                  </div>
                </div>
                <div className={`badge ${
                  category.trend === 'increasing' ? 'badge-warning' : 
                  category.trend === 'decreasing' ? 'badge-info' : 
                  'badge-ghost'
                }`}>
                  {category.trend}
                </div>
              </div>
              
              <p className="text-text-secondary mb-4">{category.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <span className="text-text-muted text-sm">Avg. Price</span>
                  <span className="text-text-primary font-semibold">{formatCurrency(category.averagePrice)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-text-muted text-sm">Price Change</span>
                  <span className={`font-semibold ${
                    category.priceChange > 0 ? 'text-accent-warning' : 
                    category.priceChange < 0 ? 'text-accent-secondary' : 
                    'text-text-primary'
                  }`}>
                    {category.priceChange > 0 ? '+' : ''}{formatCurrency(category.priceChange)} ({category.priceChangePercent > 0 ? '+' : ''}{category.priceChangePercent}%)
                  </span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {category.subcategories.map((subcat, index) => (
                  <span key={index} className="badge badge-sm">{subcat}</span>
                ))}
              </div>
              
              <div className="flex justify-between items-center">
                <span className={`flex items-center text-sm ${
                  category.volatility === 'high' ? 'text-accent-warning' : 
                  category.volatility === 'medium' ? 'text-accent-primary' : 
                  'text-accent-secondary'
                }`}>
                  <MdOutlineInsights className="mr-1" />
                  {category.volatility.charAt(0).toUpperCase() + category.volatility.slice(1)} volatility
                </span>
                <Link 
                  to={`/price-tracker?category=${category.id}`} 
                  className="btn btn-sm btn-ghost"
                  onClick={(e) => e.stopPropagation()}
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Category Detail */}
      {selectedCategoryData && (
        <div className="glass-panel p-6 rounded-xl mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-background-accent flex items-center justify-center text-accent-primary text-2xl">
                {selectedCategoryData.icon}
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-semibold text-text-primary">{selectedCategoryData.name}</h2>
                <p className="text-text-secondary">{selectedCategoryData.description}</p>
              </div>
            </div>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setSelectedCategory(null)}
            >
              Close
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="glass-panel p-4 rounded-lg">
              <h3 className="text-lg font-medium text-text-primary mb-2">Price Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-muted">Average Price:</span>
                  <span className="text-text-primary font-semibold">{formatCurrency(selectedCategoryData.averagePrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Price Change:</span>
                  <span className={`font-semibold ${
                    selectedCategoryData.priceChange > 0 ? 'text-accent-warning' : 
                    selectedCategoryData.priceChange < 0 ? 'text-accent-secondary' : 
                    'text-text-primary'
                  }`}>
                    {selectedCategoryData.priceChange > 0 ? '+' : ''}{formatCurrency(selectedCategoryData.priceChange)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Percentage Change:</span>
                  <span className={`font-semibold ${
                    selectedCategoryData.priceChangePercent > 0 ? 'text-accent-warning' : 
                    selectedCategoryData.priceChangePercent < 0 ? 'text-accent-secondary' : 
                    'text-text-primary'
                  }`}>
                    {selectedCategoryData.priceChangePercent > 0 ? '+' : ''}{selectedCategoryData.priceChangePercent}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Volatility:</span>
                  <span className={`font-semibold ${
                    selectedCategoryData.volatility === 'high' ? 'text-accent-warning' : 
                    selectedCategoryData.volatility === 'medium' ? 'text-accent-primary' : 
                    'text-accent-secondary'
                  }`}>
                    {selectedCategoryData.volatility.charAt(0).toUpperCase() + selectedCategoryData.volatility.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Trend:</span>
                  <span className={`font-semibold ${
                    selectedCategoryData.trend === 'increasing' ? 'text-accent-warning' : 
                    selectedCategoryData.trend === 'decreasing' ? 'text-accent-secondary' : 
                    'text-text-primary'
                  }`}>
                    {selectedCategoryData.trend.charAt(0).toUpperCase() + selectedCategoryData.trend.slice(1)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="glass-panel p-4 rounded-lg">
              <h3 className="text-lg font-medium text-text-primary mb-2">Subcategories</h3>
              <div className="space-y-2">
                {selectedCategoryData.subcategories.map((subcat, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-text-secondary">{subcat}</span>
                    <Link to={`/price-tracker?subcategory=${subcat.toLowerCase()}`} className="btn btn-xs btn-ghost">
                      View <MdOutlineArrowForward className="ml-1" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glass-panel p-4 rounded-lg">
              <h3 className="text-lg font-medium text-text-primary mb-2">Category Metrics</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart 
                    outerRadius={60} 
                    data={selectedCategoryData.specs}
                  >
                    <PolarGrid stroke="rgba(255,255,255,0.3)" />
                    <PolarAngleAxis dataKey="name" tick={{ fill: '#B3B3B3', fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#B3B3B3' }} />
                    <Radar 
                      name={selectedCategoryData.name} 
                      dataKey="value" 
                      stroke="#3B82F6" 
                      fill="#3B82F6" 
                      fillOpacity={0.6} 
                    />
                    <Tooltip 
                      formatter={(value) => [`${value}/100`, 'Score']}
                      contentStyle={{ 
                        backgroundColor: 'rgba(26, 26, 26, 0.8)', 
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)', 
                        borderRadius: '8px' 
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center text-text-secondary">
              <MdOutlineInfo className="mr-1" />
              <span>Last updated: April 15, 2024</span>
            </div>
            
            <div className="flex gap-2">
              <Link to={`/price-tracker?category=${selectedCategoryData.id}`} className="btn btn-outline btn-sm">
                <MdOutlineAttachMoney className="mr-1" /> Price History
              </Link>
              <Link to={`/price-forecasting?category=${selectedCategoryData.id}`} className="btn btn-primary btn-sm">
                <MdOutlineInsights className="mr-1" /> Price Forecast
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* Additional Resources */}
      <div className="glass-panel p-6 rounded-xl mb-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Additional Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/price-tracker" className="glass-panel p-4 rounded-lg hover:bg-background-accent/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center">
                <MdOutlineAttachMoney className="text-accent-primary text-xl" />
              </div>
              <div>
                <h3 className="font-medium text-text-primary">Price Tracker</h3>
                <p className="text-text-secondary text-sm">Real-time price monitoring</p>
              </div>
            </div>
          </Link>
          
          <Link to="/price-forecasting" className="glass-panel p-4 rounded-lg hover:bg-background-accent/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent-secondary/20 flex items-center justify-center">
                <MdOutlineInsights className="text-accent-secondary text-xl" />
              </div>
              <div>
                <h3 className="font-medium text-text-primary">Price Forecasting</h3>
                <p className="text-text-secondary text-sm">Predictive pricing models</p>
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
        </div>
      </div>
      
      <ChatPopup />
    </div>
  );
};

export default ProductCategories; 