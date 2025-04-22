import React, { useState, useEffect } from 'react';
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
  MdOutlineArrowForward,
  MdOutlineLocationOn
} from 'react-icons/md';
import { CircularProgress } from '@mui/material';
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
import { motion } from 'framer-motion';
import ChatPopup from '../components/ChatPopup';
import { loadTenderData, TenderData, getUniqueCategories, getProductsByCategory, categoryMetadata } from '../utils/dataLoader';
import { FiSearch } from 'react-icons/fi';

// Function to generate category and product metrics from tender data
const generateCategoryData = (tenderData: TenderData[]) => {
  const categories = getUniqueCategories(tenderData);
  
  return categories.map(category => {
    const categoryProducts = getProductsByCategory(tenderData, category);
    const uniqueProducts = Array.from(new Set(categoryProducts.map(p => p.product)));
    
    // Calculate mock price data
    const basePrice = 50 + Math.random() * 150;
    const previousPrice = basePrice * (1 + (Math.random() * 0.2 - 0.1));
    const priceChange = basePrice - previousPrice;
    const priceChangePercent = (priceChange / previousPrice) * 100;
    
    // Get metadata about trend and volatility
    const metaData = (categoryMetadata as any)[category] || { 
      trend: priceChangePercent > 0 ? 'increasing' : 'decreasing',
      volatility: 'medium'
    };
    
    // Generate subcategories - in this case we'll use product traits
    const subcategories = Array.from(new Set(categoryProducts.map(p => p.trait)));
    
    // Generate mock specifications data
    const specs = [
      { name: 'Quality', value: 60 + Math.floor(Math.random() * 30) },
      { name: 'Supply', value: 60 + Math.floor(Math.random() * 30) },
      { name: 'Pricing', value: 60 + Math.floor(Math.random() * 30) },
      { name: 'Volatility', value: metaData.volatility === 'high' ? 80 : metaData.volatility === 'medium' ? 60 : 40 },
      { name: 'Suppliers', value: 70 + Math.floor(Math.random() * 20) }
    ];
    
    // Pick an appropriate icon based on category
    let icon;
    switch (category) {
      case 'Fruits & Vegetables':
        icon = <img src="/icons/fruits-vegetables.svg" alt="Fruits & Vegetables" className="w-8 h-8" onError={(e)=>{(e.target as HTMLImageElement).src="/icons/fallback.svg"; (e.target as HTMLImageElement).onerror=null}} />;
        break;
      case 'Deli & Chilled Meats':
        icon = <img src="/icons/deli-meats.svg" alt="Deli & Chilled Meats" className="w-8 h-8" onError={(e)=>{(e.target as HTMLImageElement).src="/icons/fallback.svg"; (e.target as HTMLImageElement).onerror=null}} />;
        break;
      case 'Dairy, Eggs & Fridge':
        icon = <img src="/icons/dairy.svg" alt="Dairy & Eggs" className="w-8 h-8" onError={(e)=>{(e.target as HTMLImageElement).src="/icons/fallback.svg"; (e.target as HTMLImageElement).onerror=null}} />;
        break;
      case 'Health & Beauty':
        icon = <img src="/icons/beauty.svg" alt="Health & Beauty" className="w-8 h-8" onError={(e)=>{(e.target as HTMLImageElement).src="/icons/fallback.svg"; (e.target as HTMLImageElement).onerror=null}} />;
        break;
      case 'Pantry':
        icon = <img src="/icons/pantry.svg" alt="Pantry" className="w-8 h-8" onError={(e)=>{(e.target as HTMLImageElement).src="/icons/fallback.svg"; (e.target as HTMLImageElement).onerror=null}} />;
        break;
      case 'Freezer':
        icon = <img src="/icons/freezer.svg" alt="Freezer" className="w-8 h-8" onError={(e)=>{(e.target as HTMLImageElement).src="/icons/fallback.svg"; (e.target as HTMLImageElement).onerror=null}} />;
        break;
      case 'Drinks':
        icon = <img src="/icons/drinks.svg" alt="Drinks" className="w-8 h-8" onError={(e)=>{(e.target as HTMLImageElement).src="/icons/fallback.svg"; (e.target as HTMLImageElement).onerror=null}} />;
        break;
      default:
        icon = <MdOutlineCategory className="w-6 h-6 text-[#1dc3f0]" />;
    }
    
    return {
      id: category,
      name: (categoryMetadata as any)[category]?.display || category,
      description: `${category} products and supplies`,
      itemCount: uniqueProducts.length,
      averagePrice: parseFloat(basePrice.toFixed(2)),
      priceChange: parseFloat(priceChange.toFixed(2)),
      priceChangePercent: parseFloat(priceChangePercent.toFixed(2)),
      volatility: metaData.volatility,
      trend: metaData.trend,
      subcategories,
      specs,
      icon,
      origins: Array.from(new Set(categoryProducts.map(p => p.origin))).slice(0, 5),
      storage: Array.from(new Set(categoryProducts.map(p => p.storage))),
      packaging: Array.from(new Set(categoryProducts.map(p => p.salesPackaging))),
      products: uniqueProducts
    };
  });
};

// Function to get category color
const getCategoryColor = (category: string): string => {
  const categoryColorMap: Record<string, string> = {
    'Fruits & Vegetables': '#10B981', // green
    'Deli & Chilled Meats': '#da0000', // red (ALDI)
    'Dairy, Eggs & Fridge': '#1dc3f0', // light blue (ALDI)
    'Health & Beauty': '#fe7300', // orange (ALDI)
    'Pantry': '#ffc801', // yellow (ALDI)
    'Freezer': '#3B82F6', // blue
    'Drinks': '#031f5e', // dark blue (ALDI)
  };
  
  return categoryColorMap[category] || '#3B82F6';
};

const ProductCategories: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tenderData, setTenderData] = useState<TenderData[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  
  // Load data from CSV
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await loadTenderData();
        setTenderData(data);
        
        // Generate category data
        const categoryData = generateCategoryData(data);
        setCategories(categoryData);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    searchTerm === '' ||
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.subcategories.some((sub: string) => sub.toLowerCase().includes(searchTerm.toLowerCase()))
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
      maximumFractionDigits: 2
    }).format(value);
  };
  
  // Pie chart data for category distribution
  const categoryDistributionData = categories.map(cat => ({
    name: cat.name,
    value: cat.itemCount,
    color: getCategoryColor(cat.id)
  }));
  
  // ALDI color palette
  const COLORS = ['#031f5e', '#1dc3f0', '#da0000', '#fe7300', '#ffc801'];
  
  // Filter products based on search
  const filteredProducts = selectedCategoryData?.products.map((product: string) => ({
    ...selectedCategoryData,
    product,
    productCode: 'CODE-' + Math.floor(Math.random() * 10000),
    productDescription: 'Description of ' + product,
    trait: selectedCategoryData.subcategories.find((sub: string) => sub === product) || 'Unknown',
    storage: selectedCategoryData.storage.find((s: string) => s === product) || 'Unknown',
    origin: selectedCategoryData.origins.find((o: string) => o === product) || 'Unknown'
  }));
  
  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-[#031f5e]">Product Categories</h1>
          <p className="text-text-secondary mt-1">Browse and analyze product categories and pricing data</p>
        </div>
        <div className="flex gap-2">
          <Link to="/price-tracker" className="btn btn-outline btn-sm flex items-center gap-2 border-[#1dc3f0] text-[#1dc3f0] hover:bg-[#1dc3f0] hover:text-white">
            <MdOutlineAttachMoney className="text-lg" /> Price Tracker
          </Link>
          <Link to="/market-trends" className="btn btn-sm flex items-center gap-2 bg-[#031f5e] border-[#031f5e] text-white hover:bg-[#031f5e]/80">
            <MdOutlineTrendingUp className="text-lg" /> Market Trends
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="text-center">
            <CircularProgress size={60} className="mb-4" sx={{ color: '#1dc3f0' }} />
            <p className="text-text-secondary">Loading product categories...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Search and filters */}
          <div className="glass-panel p-4 rounded-xl mb-3 border border-[#1dc3f0]/20 bg-gradient-to-br from-white/80 to-[#1dc3f0]/5">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdOutlineSearch className="text-[#031f5e] text-lg" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10 border-[#1dc3f0]/30 focus:border-[#1dc3f0] focus:ring-[#1dc3f0]"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-outline btn-sm flex items-center gap-2 border-[#031f5e] text-[#031f5e]">
                  <MdOutlineSort className="text-lg" /> Sort by: {sortBy.replace('_', ' ')}
                </label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow glass-panel rounded-box w-52 bg-white/90 backdrop-blur-md border border-[#1dc3f0]/20">
                  <li><button onClick={() => setSortBy('name')} className="hover:bg-[#1dc3f0]/10">Name</button></li>
                  <li><button onClick={() => setSortBy('price_asc')} className="hover:bg-[#1dc3f0]/10">Price (Low to High)</button></li>
                  <li><button onClick={() => setSortBy('price_desc')} className="hover:bg-[#1dc3f0]/10">Price (High to Low)</button></li>
                  <li><button onClick={() => setSortBy('items')} className="hover:bg-[#1dc3f0]/10">Item Count</button></li>
                  <li><button onClick={() => setSortBy('change')} className="hover:bg-[#1dc3f0]/10">Price Change</button></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Overview Charts and Categories Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-0 h-full">
            {/* Charts - 2 columns */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Category Distribution */}
                <div className="glass-panel p-6 rounded-xl border border-[#1dc3f0]/20 bg-gradient-to-br from-white/80 to-[#1dc3f0]/5">
                  <h2 className="text-lg font-semibold text-[#031f5e] mb-4 flex items-center">
                    <MdOutlineCategory className="mr-2 text-[#1dc3f0]" />
                    Category Distribution
                  </h2>
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
                            <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value} items`, 'Count']}
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(29, 195, 240, 0.2)', 
                            borderRadius: '8px' 
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Average Price Comparison */}
                <div className="glass-panel p-6 rounded-xl border border-[#1dc3f0]/20 bg-gradient-to-br from-white/80 to-[#1dc3f0]/5">
                  <h2 className="text-lg font-semibold text-[#031f5e] mb-4 flex items-center">
                    <MdOutlineAttachMoney className="mr-2 text-[#1dc3f0]" />
                    Average Price by Category
                  </h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={categories}
                        margin={{ top: 5, right: 20, left: 10, bottom: 50 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(3, 31, 94, 0.1)" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                        <YAxis 
                          tickFormatter={(value) => `$${value}`}
                          label={{ 
                            value: 'Price (USD)', 
                            angle: -90, 
                            position: 'insideLeft',
                            style: { textAnchor: 'middle', fill: '#031f5e' }
                          }}
                        />
                        <Tooltip
                          formatter={(value) => [formatCurrency(value as number), 'Average Price']}
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(29, 195, 240, 0.2)', 
                            borderRadius: '8px' 
                          }}
                        />
                        <Bar 
                          dataKey="averagePrice" 
                          name="Average Price"
                          radius={[4, 4, 0, 0]}
                        >
                          {categories.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getCategoryColor(entry.id)} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Category Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {sortedCategories.map((category) => (
                  <motion.div 
                    key={category.id} 
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className={`glass-panel rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer border ${
                      selectedCategory === category.id ? 'ring-2 ring-[#1dc3f0] border-[#1dc3f0]/30' : 'border-[#1dc3f0]/20'
                    } bg-gradient-to-br from-white/80 to-[${getCategoryColor(category.id)}]/5`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-[#031f5e]/10 flex items-center justify-center" style={{ color: getCategoryColor(category.id) }}>
                            {category.icon}
                          </div>
                          <div className="ml-3">
                            <h3 className="text-lg font-medium text-[#031f5e]">{category.name}</h3>
                            <p className="text-sm text-text-muted">{category.itemCount} products</p>
                          </div>
                        </div>
                        <div className={`badge ${
                          category.trend === 'increasing' ? 'bg-[#fe7300]/20 text-[#fe7300] border-[#fe7300]/30' : 
                          category.trend === 'decreasing' ? 'bg-[#1dc3f0]/20 text-[#1dc3f0] border-[#1dc3f0]/30' : 
                          'badge-ghost'
                        }`}>
                          {category.trend}
                        </div>
                      </div>
                      
                      <p className="text-text-secondary mb-4">{category.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex flex-col">
                          <span className="text-text-muted text-sm">Avg. Price</span>
                          <span className="text-[#031f5e] font-semibold">{formatCurrency(category.averagePrice)}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-text-muted text-sm">Price Change</span>
                          <span className={`font-semibold ${
                            category.priceChange > 0 ? 'text-[#fe7300]' : 
                            category.priceChange < 0 ? 'text-[#1dc3f0]' : 
                            'text-text-primary'
                          }`}>
                            {category.priceChange > 0 ? '+' : ''}{formatCurrency(category.priceChange)} ({category.priceChangePercent > 0 ? '+' : ''}{category.priceChangePercent}%)
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {category.subcategories.slice(0, 3).map((subcat: string, index: number) => (
                          <span key={index} className="badge badge-sm bg-[#031f5e]/10 text-[#031f5e] border-[#031f5e]/20">{subcat}</span>
                        ))}
                        {category.subcategories.length > 3 && (
                          <span className="badge badge-sm bg-[#031f5e]/10 text-[#031f5e] border-[#031f5e]/20">+{category.subcategories.length - 3} more</span>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className={`flex items-center text-sm ${
                          category.volatility === 'high' ? 'text-[#da0000]' : 
                          category.volatility === 'medium' ? 'text-[#fe7300]' : 
                          'text-[#1dc3f0]'
                        }`}>
                          <MdOutlineInsights className="mr-1" />
                          {category.volatility.charAt(0).toUpperCase() + category.volatility.slice(1)} volatility
                        </span>
                        <Link 
                          to={`/price-tracker?category=${category.id}`} 
                          className="btn btn-sm btn-ghost text-[#1dc3f0] hover:bg-[#1dc3f0]/10"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Categories list - 1 column, full height */}
            <div className="glass-panel p-3 rounded-xl mb-3 flex flex-col h-[calc(100vh-100px)] border border-[#1dc3f0]/20 bg-gradient-to-br from-white/80 to-[#1dc3f0]/5">
              <h2 className="text-lg font-semibold mb-2 text-[#031f5e] flex items-center">
                <MdOutlineCategory className="mr-2 text-[#1dc3f0]" />
                Categories
              </h2>
              
              <div className="flex mb-2">
                <div className="relative flex-1">
                  <FiSearch className="absolute left-3 top-3 text-[#031f5e]/60" />
                  <input
                    type="text"
                    className="input input-bordered w-full pl-10 border-[#1dc3f0]/30 focus:border-[#1dc3f0] focus:ring-[#1dc3f0]"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`px-3 py-1 rounded-lg text-sm transition-all ${
                      selectedCategory === category.id 
                        ? 'bg-[#031f5e] text-white' 
                        : `bg-[${getCategoryColor(category.id)}]/10 text-[${getCategoryColor(category.id)}] hover:bg-[${getCategoryColor(category.id)}]/20`
                    }`}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setSearchTerm('');
                    }}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              
              <div className="space-y-1 flex-1 overflow-y-auto">
                {selectedCategory ? (
                  filteredProducts && filteredProducts.length === 0 ? (
                    <div className="text-center py-4 text-text-muted">
                      {searchTerm ? 'No products match your search' : 'No products in this category'}
                    </div>
                  ) : (
                    filteredProducts && filteredProducts.map((product: any) => (
                      <motion.div 
                        key={`${product.id}-${product.product}`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        className={`p-2 rounded-lg cursor-pointer transition-all ${
                          selectedProduct === product.product 
                            ? 'bg-[#1dc3f0]/20 border border-[#1dc3f0]/30' 
                            : 'bg-white/50 border border-white/5 hover:border-[#1dc3f0]/20'
                        }`}
                        onClick={() => setSelectedProduct(product.product)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-sm text-[#031f5e]">{product.product}</h3>
                            <p className="text-xs text-text-muted">{product.productCode}</p>
                          </div>
                          <div className="text-xs px-1 py-0.5 rounded bg-[#031f5e]/10 text-[#031f5e]">
                            {product.trait}
                          </div>
                        </div>
                        
                        <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">{product.productDescription}</p>
                        
                        <div className="flex justify-between items-center mt-1">
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
                  )
                ) : (
                  <div className="text-center py-4 text-text-muted">
                    Please select a category to view products
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Selected Category Detail */}
          {selectedCategoryData && (
            <div className="glass-panel p-6 rounded-xl mb-6 border border-[#1dc3f0]/20 bg-gradient-to-br from-white/80 to-[#1dc3f0]/5">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#031f5e]/10 flex items-center justify-center" style={{ color: getCategoryColor(selectedCategoryData.id) }}>
                    {selectedCategoryData.icon}
                  </div>
                  <div className="ml-4">
                    <h2 className="text-2xl font-semibold text-[#031f5e]">{selectedCategoryData.name}</h2>
                    <p className="text-text-secondary">{selectedCategoryData.description}</p>
                  </div>
                </div>
                <button
                  className="btn btn-sm btn-ghost text-[#031f5e] hover:bg-[#031f5e]/10"
                  onClick={() => setSelectedCategory(null)}
                >
                  Close
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="glass-panel p-4 rounded-lg bg-white/70 border border-[#1dc3f0]/20">
                  <h3 className="text-lg font-medium text-[#031f5e] mb-2 flex items-center">
                    <MdOutlineAttachMoney className="mr-2 text-[#1dc3f0]" />
                    Price Metrics
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-text-muted">Average Price:</span>
                      <span className="text-[#031f5e] font-semibold">{formatCurrency(selectedCategoryData.averagePrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Price Change:</span>
                      <span className={`font-semibold ${
                        selectedCategoryData.priceChange > 0 ? 'text-[#fe7300]' : 
                        selectedCategoryData.priceChange < 0 ? 'text-[#1dc3f0]' : 
                        'text-[#031f5e]'
                      }`}>
                        {selectedCategoryData.priceChange > 0 ? '+' : ''}{formatCurrency(selectedCategoryData.priceChange)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Percentage Change:</span>
                      <span className={`font-semibold ${
                        selectedCategoryData.priceChangePercent > 0 ? 'text-[#fe7300]' : 
                        selectedCategoryData.priceChangePercent < 0 ? 'text-[#1dc3f0]' : 
                        'text-[#031f5e]'
                      }`}>
                        {selectedCategoryData.priceChangePercent > 0 ? '+' : ''}{selectedCategoryData.priceChangePercent}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Volatility:</span>
                      <span className={`font-semibold ${
                        selectedCategoryData.volatility === 'high' ? 'text-[#da0000]' : 
                        selectedCategoryData.volatility === 'medium' ? 'text-[#fe7300]' : 
                        'text-[#1dc3f0]'
                      }`}>
                        {selectedCategoryData.volatility.charAt(0).toUpperCase() + selectedCategoryData.volatility.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Trend:</span>
                      <span className={`font-semibold ${
                        selectedCategoryData.trend === 'increasing' ? 'text-[#fe7300]' : 
                        selectedCategoryData.trend === 'decreasing' ? 'text-[#1dc3f0]' : 
                        'text-[#031f5e]'
                      }`}>
                        {selectedCategoryData.trend.charAt(0).toUpperCase() + selectedCategoryData.trend.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="glass-panel p-4 rounded-lg bg-white/70 border border-[#1dc3f0]/20">
                  <h3 className="text-lg font-medium text-[#031f5e] mb-2 flex items-center">
                    <MdOutlineInventory className="mr-2 text-[#1dc3f0]" />
                    Products
                  </h3>
                  <div className="space-y-2 h-full overflow-y-auto">
                    {selectedCategoryData.products.slice(0, 8).map((product: string, index: number) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-text-secondary">{product}</span>
                        <Link to={`/price-tracker?product=${encodeURIComponent(product)}`} className="btn btn-xs bg-[#031f5e]/10 hover:bg-[#031f5e]/20 border-[#031f5e]/20 text-[#031f5e]">
                          View <MdOutlineArrowForward className="ml-1" />
                        </Link>
                      </div>
                    ))}
                    {selectedCategoryData.products.length > 8 && (
                      <div className="text-center text-text-muted text-sm mt-2">
                        +{selectedCategoryData.products.length - 8} more products
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="glass-panel p-4 rounded-lg bg-white/70 border border-[#1dc3f0]/20">
                  <h3 className="text-lg font-medium text-[#031f5e] mb-2 flex items-center">
                    <MdOutlineLocationOn className="mr-2 text-[#1dc3f0]" />
                    Top Origins
                  </h3>
                  <div className="space-y-2">
                    {selectedCategoryData.origins.map((origin: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <MdOutlineLocationOn className="text-[#1dc3f0]" />
                        <span className="text-text-secondary">{origin}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-[#031f5e] mb-2">Storage Types</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedCategoryData.storage.map((storage: string, index: number) => (
                        <span key={index} className="badge bg-[#031f5e]/10 text-[#031f5e] border-[#031f5e]/20">{storage}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="glass-panel p-4 rounded-lg bg-white/70 border border-[#1dc3f0]/20">
                  <h3 className="text-lg font-medium text-[#031f5e] mb-4 flex items-center">
                    <MdOutlineInsights className="mr-2 text-[#1dc3f0]" />
                    Category Metrics
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart 
                        outerRadius={90} 
                        data={selectedCategoryData.specs}
                      >
                        <PolarGrid stroke="rgba(3, 31, 94, 0.2)" />
                        <PolarAngleAxis dataKey="name" tick={{ fill: '#031f5e', fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#031f5e' }} />
                        <Radar 
                          name={selectedCategoryData.name} 
                          dataKey="value" 
                          stroke={getCategoryColor(selectedCategoryData.id)}
                          fill={getCategoryColor(selectedCategoryData.id)}
                          fillOpacity={0.6} 
                        />
                        <Tooltip 
                          formatter={(value) => [`${value}/100`, 'Score']}
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(29, 195, 240, 0.2)', 
                            borderRadius: '8px' 
                          }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="glass-panel p-4 rounded-lg bg-white/70 border border-[#1dc3f0]/20">
                  <h3 className="text-lg font-medium text-[#031f5e] mb-2 flex items-center">
                    <MdOutlineInfo className="mr-2 text-[#1dc3f0]" />
                    Category Insights
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="bg-[#031f5e]/5 p-3 rounded-lg border border-[#031f5e]/10">
                      <div className="flex items-center mb-1">
                        <MdOutlineInfo className="text-[#1dc3f0] mr-2" />
                        <h4 className="font-medium text-[#031f5e]">Market Overview</h4>
                      </div>
                      <p className="text-sm text-text-secondary">
                        {selectedCategoryData.name} shows {
                          selectedCategoryData.trend === 'increasing' ? 'rising' : 
                          selectedCategoryData.trend === 'decreasing' ? 'falling' : 'stable'
                        } prices with {selectedCategoryData.volatility} volatility in the market. 
                        {selectedCategoryData.itemCount} distinct products tracked.
                      </p>
                    </div>
                    
                    <div className="bg-[#031f5e]/5 p-3 rounded-lg border border-[#031f5e]/10">
                      <div className="flex items-center mb-1">
                        <MdOutlineWarning className={`mr-2 ${
                          selectedCategoryData.volatility === 'high' ? 'text-[#da0000]' : 'text-[#ffc801]'
                        }`} />
                        <h4 className="font-medium text-[#031f5e]">Supply Status</h4>
                      </div>
                      <p className="text-sm text-text-secondary">
                        {selectedCategoryData.volatility === 'high' 
                          ? `Potential supply constraints may affect ${selectedCategoryData.name.toLowerCase()} availability.`
                          : `Supply chain for ${selectedCategoryData.name.toLowerCase()} currently stable with good reliability.`
                        }
                      </p>
                    </div>
                    
                    <div className="bg-[#031f5e]/5 p-3 rounded-lg border border-[#031f5e]/10">
                      <div className="flex items-center mb-1">
                        <MdOutlineTrendingUp className="text-[#fe7300] mr-2" />
                        <h4 className="font-medium text-[#031f5e]">Sourcing Recommendation</h4>
                      </div>
                      <p className="text-sm text-text-secondary">
                        {selectedCategoryData.trend === 'increasing'
                          ? `Consider locking in long-term contracts for ${selectedCategoryData.name.toLowerCase()} to hedge against rising prices.`
                          : selectedCategoryData.trend === 'decreasing'
                            ? `Good timing for renegotiating contracts as ${selectedCategoryData.name.toLowerCase()} prices are trending downward.`
                            : `Maintain regular procurement strategy as prices remain stable.`
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center text-text-secondary">
                  <MdOutlineInfo className="mr-1" />
                  <span>Last updated: {new Date().toLocaleDateString()}</span>
                </div>
                
                <div className="flex gap-2">
                  <Link to={`/price-tracker?category=${selectedCategoryData.id}`} className="btn btn-outline btn-sm border-[#1dc3f0] text-[#1dc3f0] hover:bg-[#1dc3f0] hover:text-white">
                    <MdOutlineAttachMoney className="mr-1" /> Price History
                  </Link>
                  <Link to={`/price-forecasting?category=${selectedCategoryData.id}`} className="btn btn-sm bg-[#031f5e] border-[#031f5e] text-white hover:bg-[#031f5e]/80">
                    <MdOutlineInsights className="mr-1" /> Price Forecast
                  </Link>
                </div>
              </div>
            </div>
          )}
          
          {/* Additional Resources */}
          <div className="glass-panel p-6 rounded-xl mb-6 border border-[#1dc3f0]/20 bg-gradient-to-br from-white/80 to-[#1dc3f0]/5">
            <h2 className="text-lg font-semibold text-[#031f5e] mb-4 flex items-center">
              <MdOutlineCategory className="mr-2 text-[#1dc3f0]" />
              Additional Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/price-tracker" className="glass-panel p-4 rounded-lg hover:bg-[#1dc3f0]/10 transition-colors bg-white/70 border border-[#1dc3f0]/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#031f5e]/10 flex items-center justify-center">
                    <MdOutlineAttachMoney className="text-[#1dc3f0] text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#031f5e]">Price Tracker</h3>
                    <p className="text-text-secondary text-sm">Real-time price monitoring</p>
                  </div>
                </div>
              </Link>
              
              <Link to="/price-forecasting" className="glass-panel p-4 rounded-lg hover:bg-[#1dc3f0]/10 transition-colors bg-white/70 border border-[#1dc3f0]/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#031f5e]/10 flex items-center justify-center">
                    <MdOutlineInsights className="text-[#fe7300] text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#031f5e]">Price Forecasting</h3>
                    <p className="text-text-secondary text-sm">Predictive pricing models</p>
                  </div>
                </div>
              </Link>
              
              <Link to="/market-trends" className="glass-panel p-4 rounded-lg hover:bg-[#1dc3f0]/10 transition-colors bg-white/70 border border-[#1dc3f0]/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#031f5e]/10 flex items-center justify-center">
                    <MdOutlineTrendingUp className="text-[#ffc801] text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#031f5e]">Market Trends</h3>
                    <p className="text-text-secondary text-sm">Long-term trend analysis</p>
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

export default ProductCategories; 