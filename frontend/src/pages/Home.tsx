import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MdOutlineAnalytics,
  MdOutlineAttachMoney,
  MdOutlineWarning,
  MdOutlineShoppingCart,
  MdOutlineDescription,
  MdOutlineBusinessCenter,
  MdOutlineSchedule,
  MdOutlineCheck,
  MdOutlineError,
  MdOutlineInsights,
  MdOutlineInventory,
  MdOutlineArrowForward,
  MdOutlineAssignment,
  MdOutlineMoreHoriz,
  MdOutlineAnnouncement, 
  MdOutlineTrendingUp,
  MdOutlineFlag,
  MdOutlineStackedLineChart,
  MdOutlineLocalShipping,
  MdOutlineAccessTime,
  MdOutlineVerified,
  MdOutlineErrorOutline,
  MdOutlineCompare,
  MdOutlineEmail,
  MdOutlineHistory,
  MdOutlineCategory,
  MdOutlinePriceChange,
  MdOutlineHandshake,
  MdOutlineStorefront
} from 'react-icons/md';
import { HiOutlineUsers, HiOutlineClipboardDocumentList, HiOutlineShieldCheck, HiOutlineDocumentText, HiOutlineCalendarDays } from 'react-icons/hi2';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  CartesianGrid,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Scatter,
  ScatterChart,
  ZAxis
} from 'recharts';
import { motion } from 'framer-motion';
import ChatPopup from '../components/ChatPopup';

interface ChatMessage {
  type: 'user' | 'assistant';
  content: string;
}

// Mock vendor data for chat responses
const mockVendorData = {
  'techvision': {
    name: 'TechVision Inc.',
    lastNegotiation: {
      id: 'NEG-2024-1234',
      status: 'In Progress',
      deadline: '2024-03-15',
      products: [
        { name: 'HDMI Cables', quantity: 1000, price: 4.50 },
        { name: 'USB-C Adapters', quantity: 500, price: 8.75 }
      ]
    },
    performance: {
      deliveryRating: 95,
      qualityRating: 92,
      responseTime: '24h',
      lastReview: '2024-02-01'
    },
    priceHistory: [
      { date: '2023-09', price: 4.75 },
      { date: '2023-12', price: 4.60 },
      { date: '2024-01', price: 4.50 }
    ]
  },
  'netware': {
    name: 'NetWare Solutions',
    lastNegotiation: {
      id: 'NEG-2024-1235',
      status: 'Scheduled',
      deadline: '2024-03-20',
      products: [
        { name: 'Cat6 Cables', quantity: 2000, price: 5.25 },
        { name: 'RJ45 Connectors', quantity: 1500, price: 0.30 }
      ]
    },
    performance: {
      deliveryRating: 88,
      qualityRating: 95,
      responseTime: '48h',
      lastReview: '2024-01-15'
    },
    priceHistory: [
      { date: '2023-09', price: 5.50 },
      { date: '2023-12', price: 5.35 },
      { date: '2024-01', price: 5.25 }
    ]
  }
};

// Mock data for negotiation metrics
const negotiationMetrics = {
  activeNegotiations: 24,
  pendingReviews: 8,
  upcomingDeadlines: 5,
  avgSavingsRate: 12.4,
  totalVendors: 189,
  priceAlerts: 15,
};

// Enhanced mock data for charts
const priceTrendData = [
  { month: 'Jan', average: 4.84, market: 5.20, negotiated: 4.50, savings: 0.70 },
  { month: 'Feb', average: 4.86, market: 5.25, negotiated: 4.55, savings: 0.70 },
  { month: 'Mar', average: 4.85, market: 5.30, negotiated: 4.50, savings: 0.80 },
  { month: 'Apr', average: 4.88, market: 5.40, negotiated: 4.60, savings: 0.80 },
  { month: 'May', average: 4.92, market: 5.45, negotiated: 4.65, savings: 0.80 },
  { month: 'Jun', average: 4.97, market: 5.50, negotiated: 4.75, savings: 0.75 },
];

const categoryPriceData = [
  { month: 'Jan', cables: 220000, peripherals: 150000, accessories: 50000, total: 420000 },
  { month: 'Feb', cables: 190000, peripherals: 140000, accessories: 50000, total: 380000 },
  { month: 'Mar', cables: 230000, peripherals: 160000, accessories: 60000, total: 450000 },
  { month: 'Apr', cables: 200000, peripherals: 150000, accessories: 60000, total: 410000 },
  { month: 'May', cables: 180000, peripherals: 150000, accessories: 60000, total: 390000 },
  { month: 'Jun', cables: 240000, peripherals: 160000, accessories: 60000, total: 460000 },
];

const vendorComparisonData = [
  { name: 'TechVision Inc.', price: 4.50, quality: 92, delivery: 95, reliability: 94, sustainability: 88 },
  { name: 'NetWare Solutions', price: 5.25, quality: 95, delivery: 88, reliability: 90, sustainability: 92 },
  { name: 'DataSphere Systems', price: 4.75, quality: 85, delivery: 92, reliability: 88, sustainability: 85 },
  { name: 'GlobalConnect Ltd', price: 5.15, quality: 90, delivery: 94, reliability: 92, sustainability: 90 },
  { name: 'FiberTech', price: 4.85, quality: 87, delivery: 90, reliability: 89, sustainability: 86 },
];

const communicationData = [
  { name: 'Emails', value: 65, color: '#3B82F6' },
  { name: 'Calls', value: 15, color: '#10B981' },
  { name: 'Meetings', value: 20, color: '#F59E0B' },
];

const negotiationPhaseData = [
  { name: 'Initial', value: 8, color: '#8B5CF6' },
  { name: 'Discussion', value: 12, color: '#3B82F6' },
  { name: 'Proposal', value: 10, color: '#F59E0B' },
  { name: 'Final', value: 4, color: '#10B981' },
  { name: 'Completed', value: 16, color: '#6B7280' },
];

const marketTrendData = [
  { product: 'HDMI Cables', market: 5.50, negotiated: 4.75, savings: 0.75, volume: 28500 },
  { product: 'USB-C Adapters', market: 9.25, negotiated: 8.75, savings: 0.50, volume: 18500 },
  { product: 'Cat6 Cables', market: 6.00, negotiated: 5.25, savings: 0.75, volume: 22000 },
  { product: 'Wireless Mice', market: 12.50, negotiated: 11.00, savings: 1.50, volume: 15000 },
  { product: 'Keyboards', market: 22.00, negotiated: 19.50, savings: 2.50, volume: 9500 },
];

const upcomingDeadlines = [
  { 
    id: 1, 
    vendor: 'TechVision Inc.', 
    product: 'HDMI Cables',
    deadline: '2024-03-15',
    importance: 'high',
    color: '#EF4444',
    value: 125000,
    status: 'In Progress'
  },
  { 
    id: 2, 
    vendor: 'NetWare Solutions', 
    product: 'Cat6 Cables',
    deadline: '2024-03-20',
    importance: 'medium',
    color: '#F59E0B',
    value: 85000,
    status: 'Pending Review'
  },
  { 
    id: 3, 
    vendor: 'DataSphere Systems', 
    product: 'Wireless Mice',
    deadline: '2024-03-28',
    importance: 'medium',
    color: '#F59E0B',
    value: 65000,
    status: 'In Progress'
  },
  { 
    id: 4, 
    vendor: 'FiberTech', 
    product: 'Fiber Optic Cables',
    deadline: '2024-04-05',
    importance: 'low',
    color: '#10B981',
    value: 95000,
    status: 'Scheduled'
  },
];

const recentCommunications = [
  { 
    id: 1, 
    type: 'email', 
    subject: 'Price negotiation for Q2 HDMI cable orders', 
    vendor: 'TechVision Inc.',
    time: '2 hours ago',
    icon: MdOutlineEmail, 
    color: '#3B82F6',
    priority: 'high',
    status: 'unread'
  },
  { 
    id: 2, 
    type: 'meeting', 
    subject: 'Quarterly review with NetWare Solutions', 
    vendor: 'NetWare Solutions',
    time: '5 hours ago',
    icon: MdOutlineHandshake, 
    color: '#F59E0B',
    priority: 'medium',
    status: 'read'
  },
  { 
    id: 3, 
    type: 'email', 
    subject: 'Updated price list for peripherals', 
    vendor: 'GlobalConnect Ltd',
    time: 'Yesterday',
    icon: MdOutlineEmail, 
    color: '#3B82F6',
    priority: 'low',
    status: 'read'
  },
  { 
    id: 4, 
    type: 'email', 
    subject: 'Price increase notification for USB-C adapters', 
    vendor: 'DataSphere Systems',
    time: 'Yesterday',
    icon: MdOutlinePriceChange, 
    color: '#EF4444',
    priority: 'high',
    status: 'unread'
  },
];

const topNegotiatedProducts = [
  { name: 'HDMI Cables', savingsRate: 16.5, volume: 28500, trend: 'up', value: 125000 },
  { name: 'Cat6 Cables', savingsRate: 14.2, volume: 22000, trend: 'up', value: 85000 },
  { name: 'USB-C Adapters', savingsRate: 12.8, volume: 18500, trend: 'down', value: 65000 },
  { name: 'Wireless Mice', savingsRate: 11.5, volume: 15000, trend: 'up', value: 95000 },
  { name: 'Mechanical Keyboards', savingsRate: 10.2, volume: 9500, trend: 'stable', value: 75000 },
];

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label, formatter }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel px-4 py-2 rounded-lg">
        <p className="text-white font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color || entry.stroke }}>
            {entry.name}: {formatter ? formatter(entry.value) : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Home = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Format currency values
  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;
  
  return (
    <div className="w-full text-text-secondary">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-text-primary">Supplier Portal Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="glass-panel flex">
            <button 
              className={`px-4 py-2 rounded-l-lg ${activeTab === "overview" ? "bg-accent-primary/20 text-accent-primary" : "text-text-secondary"}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button 
              className={`px-4 py-2 ${activeTab === "negotiations" ? "bg-accent-primary/20 text-accent-primary" : "text-text-secondary"}`}
              onClick={() => setActiveTab("negotiations")}
            >
              Negotiations
            </button>
            <button 
              className={`px-4 py-2 rounded-r-lg ${activeTab === "market" ? "bg-accent-primary/20 text-accent-primary" : "text-text-secondary"}`}
              onClick={() => setActiveTab("market")}
            >
              Market
            </button>
          </div>
          <button className="btn btn-sm btn-primary">
            <MdOutlineInsights className="mr-1" /> Generate Report
          </button>
        </div>
      </div>

      {/* KPI Summary - Top Row Cards */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Active Negotiations */}
          <motion.div 
            className="glass-panel p-5 rounded-xl hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-text-muted mb-1">Active Negotiations</p>
                <h3 className="text-3xl font-bold text-text-primary">{negotiationMetrics.activeNegotiations}</h3>
                <div className="flex items-center text-xs text-accent-secondary mt-1">
                  <MdOutlineTrendingUp className="mr-1" /> +3 vs last month
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-accent-primary/20 flex items-center justify-center">
                <MdOutlineHandshake className="text-accent-primary text-2xl" />
              </div>
            </div>
          </motion.div>

          {/* Upcoming Deadlines */}
          <motion.div 
            className="glass-panel p-5 rounded-xl hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-text-muted mb-1">Upcoming Deadlines</p>
                <h3 className="text-3xl font-bold text-accent-warning">{negotiationMetrics.upcomingDeadlines}</h3>
                <div className="flex items-center text-xs text-accent-warning mt-1">
                  <MdOutlineTrendingUp className="mr-1" /> +2 due this week
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-accent-warning/20 flex items-center justify-center">
                <HiOutlineCalendarDays className="text-accent-warning text-2xl" />
              </div>
            </div>
          </motion.div>

          {/* Average Savings Rate */}
          <motion.div 
            className="glass-panel p-5 rounded-xl hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-text-muted mb-1">Avg. Savings Rate</p>
                <h3 className="text-3xl font-bold text-text-primary">{negotiationMetrics.avgSavingsRate}%</h3>
                <div className="flex items-center text-xs text-accent-secondary mt-1">
                  <MdOutlineTrendingUp className="mr-1" /> +1.2% vs last quarter
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-accent-secondary/20 flex items-center justify-center">
                <MdOutlineAttachMoney className="text-accent-secondary text-2xl" />
              </div>
            </div>
          </motion.div>

          {/* Price Alerts */}
          <motion.div 
            className="glass-panel p-5 rounded-xl hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-text-muted mb-1">Price Alerts</p>
                <h3 className="text-3xl font-bold text-text-primary">{negotiationMetrics.priceAlerts}</h3>
                <div className="flex items-center text-xs text-red-500 mt-1">
                  <MdOutlineTrendingUp className="mr-1" /> +5 new market changes
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <MdOutlinePriceChange className="text-red-500 text-2xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Dashboard Content */}
      {activeTab === "overview" && (
        <>
          {/* Main Content Area - Dual Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column - 2/3 Width */}
            <div className="lg:col-span-2 grid grid-cols-1 gap-6">
              {/* Negotiated vs Market Price Trend */}
              <motion.div 
                className="glass-panel p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">Negotiated vs Market Price Trend</h3>
                  <div className="flex items-center gap-4">
                    <select
                      className="bg-background-accent text-white pl-3 pr-8 py-2 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                    >
                      <option value="week">Last Week</option>
                      <option value="month">Last Month</option>
                      <option value="quarter">Last Quarter</option>
                      <option value="year">Last Year</option>
                    </select>
                    <Link to="/price-tracker" className="text-accent-primary hover:underline text-sm flex items-center gap-1">
                      Price Tracker <MdOutlineArrowForward />
                    </Link>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={priceTrendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <defs>
                        <linearGradient id="negotiatedGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" stroke="#666666" fontSize={12} />
                      <YAxis stroke="#666666" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(26, 26, 26, 0.8)', 
                          backdropFilter: 'blur(12px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)', 
                          borderRadius: '8px' 
                        }}
                        formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="market" 
                        stroke="#EF4444" 
                        strokeWidth={2}
                        dot={{ r: 5, strokeWidth: 2, fill: '#1A1A1A', stroke: '#EF4444' }}
                        name="Market Price"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="average" 
                        stroke="#F59E0B" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                        name="Industry Average"
                      />
                      <Line
                        type="monotone"
                        dataKey="negotiated"
                        name="Negotiated Price"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={{ r: 6, strokeWidth: 2, fill: '#1A1A1A', stroke: '#10B981' }}
                        activeDot={{ r: 8, strokeWidth: 0, fill: '#10B981' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="negotiated" 
                        fillOpacity={1} 
                        fill="url(#negotiatedGradient)" 
                        strokeWidth={0}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Vendor Comparison */}
              <motion.div 
                className="glass-panel p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">Vendor Performance Comparison</h3>
                  <div className="flex items-center gap-4">
                    <select
                      className="bg-background-accent text-white pl-3 pr-8 py-2 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="all">All Categories</option>
                      <option value="raw_materials">Raw Materials</option>
                      <option value="electronics">Electronics</option>
                      <option value="services">Services</option>
                    </select>
                    <Link to="/vendor-comparison" className="text-accent-primary hover:underline text-sm flex items-center gap-1">
                      Detailed Comparison <MdOutlineArrowForward />
                    </Link>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={vendorComparisonData}>
                      <PolarGrid stroke="rgba(255,255,255,0.1)" />
                      <PolarAngleAxis dataKey="name" stroke="#666666" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#666666" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(26, 26, 26, 0.8)', 
                          backdropFilter: 'blur(12px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)', 
                          borderRadius: '8px' 
                        }}
                      />
                      <Radar 
                        name="Quality" 
                        dataKey="quality" 
                        stroke="#3B82F6" 
                        fill="#3B82F6" 
                        fillOpacity={0.6} 
                      />
                      <Radar 
                        name="Delivery" 
                        dataKey="delivery" 
                        stroke="#10B981" 
                        fill="#10B981" 
                        fillOpacity={0.6} 
                      />
                      <Radar 
                        name="Reliability" 
                        dataKey="reliability" 
                        stroke="#F59E0B" 
                        fill="#F59E0B" 
                        fillOpacity={0.6} 
                      />
                      <Radar 
                        name="Sustainability" 
                        dataKey="sustainability" 
                        stroke="#8B5CF6" 
                        fill="#8B5CF6" 
                        fillOpacity={0.6} 
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>

            {/* Right Column - 1/3 Width */}
            <div className="grid grid-cols-1 gap-6">
              {/* Upcoming Deadlines */}
              <motion.div 
                className="glass-panel p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">Upcoming Deadlines</h3>
                  <Link to="/negotiation-calendar" className="text-accent-primary hover:underline text-sm flex items-center gap-1">
                    View Calendar <MdOutlineArrowForward />
                  </Link>
                </div>
                <div className="flow-root">
                  <ul role="list" className="divide-y divide-base-300">
                    {upcomingDeadlines.map((deadline) => (
                      <li key={deadline.id} className="py-3">
                        <div className="flex items-start">
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center`} style={{ backgroundColor: `${deadline.color}20` }}>
                            <HiOutlineCalendarDays className="text-lg" style={{ color: deadline.color }} />
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-text-primary">{deadline.vendor}</p>
                            <p className="text-xs text-text-secondary">{deadline.product}</p>
                            <p className="text-xs text-text-muted mt-1">Due {deadline.deadline}</p>
                            <p className="text-xs text-text-muted">Value: {formatCurrency(deadline.value)}</p>
                          </div>
                          <div className={`px-2 py-1 rounded text-xs`} style={{ backgroundColor: `${deadline.color}20`, color: deadline.color }}>
                            {deadline.status}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Recent Communications */}
              <motion.div 
                className="glass-panel p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">Recent Communications</h3>
                  <Link to="/communication-hub" className="text-accent-primary hover:underline text-sm flex items-center gap-1">
                    View All <MdOutlineArrowForward />
                  </Link>
                </div>
                <div className="flow-root">
                  <ul role="list" className="divide-y divide-base-300">
                    {recentCommunications.map((comm) => (
                      <li key={comm.id} className="py-3">
                        <div className="flex items-start">
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center`} style={{ backgroundColor: `${comm.color}20` }}>
                            <comm.icon className="text-lg" style={{ color: comm.color }} />
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-text-primary">{comm.subject}</p>
                            <p className="text-xs text-text-secondary">{comm.vendor}</p>
                            <p className="text-xs text-text-muted mt-1">{comm.time}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {comm.status === 'unread' && (
                              <span className="w-2 h-2 rounded-full bg-accent-primary"></span>
                            )}
                            <button className="text-text-muted hover:text-text-primary">
                              <MdOutlineMoreHoriz />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Negotiation Phases */}
              <motion.div 
                className="glass-panel p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">Negotiation Phases</h3>
                  <Link to="/active-negotiations" className="text-accent-primary hover:underline text-sm flex items-center gap-1">
                    Details <MdOutlineArrowForward />
                  </Link>
                </div>
                <div className="h-48 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={negotiationPhaseData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={3}
                        dataKey="value"
                        label={({ name, percent }) => `${name}`}
                        labelLine={false}
                      >
                        {negotiationPhaseData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
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
              </motion.div>
            </div>
          </div>

          {/* Bottom Row - Savings & Market Trends */}
          <section className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Communication Activity */}
              <motion.div 
                className="glass-panel p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">Communication Activity</h3>
                  <Link to="/communication-hub" className="text-accent-primary hover:underline text-sm flex items-center gap-1">
                    View All <MdOutlineArrowForward />
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-48 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={communicationData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {communicationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
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
                  <div className="flex flex-col justify-center">
                    {communicationData.map((item, idx) => (
                      <div key={idx} className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                        <div className="flex-1 text-sm text-text-secondary">{item.name}</div>
                        <div className="text-sm font-medium text-text-primary">{item.value}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Market Price Comparison */}
              <motion.div 
                className="glass-panel p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">Price Comparison</h3>
                  <Link to="/market-trends" className="text-accent-primary hover:underline text-sm flex items-center gap-1">
                    Market Details <MdOutlineArrowForward />
                  </Link>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={marketTrendData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        type="number" 
                        stroke="#666666" 
                        fontSize={12}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <YAxis 
                        type="category" 
                        dataKey="product" 
                        stroke="#666666" 
                        fontSize={12}
                        width={110}
                      />
                      <Tooltip
                        contentStyle={{ 
                          backgroundColor: 'rgba(26, 26, 26, 0.8)', 
                          backdropFilter: 'blur(12px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)', 
                          borderRadius: '8px' 
                        }}
                        formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
                      />
                      <Legend />
                      <Bar 
                        dataKey="market" 
                        name="Market Price" 
                        fill="#EF4444"
                        radius={[0, 0, 0, 0]}
                      />
                      <Bar 
                        dataKey="negotiated" 
                        name="Negotiated" 
                        fill="#10B981"
                        radius={[0, 0, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Top Negotiated Products */}
              <motion.div 
                className="glass-panel p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">Top Negotiated Products</h3>
                  <Link to="/product-categories" className="text-accent-primary hover:underline text-sm flex items-center gap-1">
                    View All <MdOutlineArrowForward />
                  </Link>
                </div>
                <div className="flow-root">
                  <ul role="list" className="divide-y divide-base-300">
                    {topNegotiatedProducts.map((product, idx) => (
                      <li key={idx} className="py-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-medium">
                            {idx + 1}
                          </div>
                          <span className="ml-3 text-sm text-text-primary">{product.name}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-sm font-medium text-accent-secondary">
                            {product.savingsRate}% savings
                          </span>
                          <span className="text-xs text-text-muted">
                            {formatCurrency(product.value)}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}

      {/* Negotiations Tab Content (simplified) */}
      {activeTab === "negotiations" && (
        <div className="glass-panel p-8 rounded-xl text-center">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Active Negotiations Management</h2>
          <p className="text-text-secondary mb-6">Detailed negotiation tracking and management will be displayed here.</p>
          <button className="btn btn-primary">View Negotiations</button>
        </div>
      )}

      {/* Market Tab Content (simplified) */}
      {activeTab === "market" && (
        <div className="glass-panel p-8 rounded-xl text-center">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Market Analysis</h2>
          <p className="text-text-secondary mb-6">Market trends, price analysis, and forecasting will be displayed here.</p>
          <button className="btn btn-primary">View Market Analysis</button>
        </div>
      )}
      
      {/* Add the ChatPopup component here */}
      <ChatPopup />
    </div>
  );
};

export default Home;
