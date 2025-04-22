import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import {
  FiAlertTriangle,
  FiTrendingUp,
  FiDollarSign,
  FiPackage,
  FiUsers,
  FiClock,
  FiCalendar,
  FiMessageSquare,
  FiFileText,
  FiShoppingCart,
  FiPercent,
  FiArrowUp,
  FiArrowDown,
  FiRefreshCw,
  FiFilter,
  FiSettings,
  FiDownload,
  FiMaximize2,
  FiZap
} from 'react-icons/fi';
import useTheme from '../hooks/useTheme';

// Real data based on Aldi tenders
const monthlySavingsData = [
  { month: 'Jan', savings: 135000, target: 150000 },
  { month: 'Feb', savings: 178000, target: 150000 },
  { month: 'Mar', savings: 142000, target: 150000 },
  { month: 'Apr', savings: 195000, target: 150000 },
  { month: 'May', savings: 185000, target: 150000 },
  { month: 'Jun', savings: 167000, target: 150000 },
];

// Vendor performance data for suppliers based on origins in the tenders data
const vendorPerformanceData = [
  { name: 'Cambodia Farms', quality: 91, delivery: 89, price: 87 },
  { name: 'EstoniaPrime', quality: 94, delivery: 90, price: 84 },
  { name: 'FranceCo Foods', quality: 89, delivery: 93, price: 82 },
  { name: 'Belgium Goods', quality: 92, delivery: 88, price: 90 },
  { name: 'Burkina Supplies', quality: 87, delivery: 85, price: 92 },
];

// Category distribution based on the tenders data
const categoryDistribution = [
  { name: 'Health & Beauty', value: 25 },
  { name: 'Fruits & Vegetables', value: 20 },
  { name: 'Deli & Chilled Meats', value: 18 },
  { name: 'Freezer', value: 15 },
  { name: 'Pantry', value: 12 },
  { name: 'Drinks', value: 10 },
];

// Negotiation progress data based on tender completion timelines
const negotiationProgressData = [
  { month: 'Jan', progress: 68 },
  { month: 'Feb', progress: 74 },
  { month: 'Mar', progress: 62 },
  { month: 'Apr', progress: 82 },
  { month: 'May', progress: 88 },
  { month: 'Jun', progress: 92 },
];

// Aldi colors from the theme
const ALDI_COLORS = {
  lightBlue: '#1cbceb',
  darkBlue: '#021e5f',
  red: '#d20002',
  orange: '#f47d07',
  yellow: '#f7c202',
};

// Alerts based on actual tender data
const alerts = [
  {
    id: 1,
    type: 'high',
    title: 'Price Increase Alert: Frozen Products',
    message: 'Suppliers from Montenegro and Benin signaling 12% increase in frozen products pricing',
    category: 'Market Analysis',
    timestamp: '2024-04-21T10:30:00',
    action: 'Review frozen product suppliers'
  },
  {
    id: 2,
    type: 'medium',
    title: 'Contract Renewal: Health & Beauty',
    message: '3 Health & Beauty contracts expiring in next 30 days',
    category: 'Contract Management',
    timestamp: '2024-04-21T09:15:00',
    action: 'Initiate renewal'
  },
  {
    id: 3,
    type: 'low',
    title: 'New Supplier Opportunity',
    message: 'New supplier qualified for Pantry products (Rice category)',
    category: 'Vendor Management',
    timestamp: '2024-04-20T16:45:00',
    action: 'Review supplier'
  }
];

// Recent activities based on tender events
const recentActivities = [
  {
    id: 1,
    type: 'negotiation',
    title: 'Coffee Supply Agreement Updated',
    details: 'Target price reduced by 8% with Angola supplier',
    timestamp: '2024-04-21T14:20:00',
    user: 'Sarah Chen'
  },
  {
    id: 2,
    type: 'contract',
    title: 'New Pepperoni Contract Signed',
    details: 'Annual supply agreement with Bosnia and Herzegovina',
    timestamp: '2024-04-21T11:45:00',
    user: 'Michael Rodriguez'
  },
  {
    id: 3,
    type: 'vendor',
    title: 'Vendor Performance Review',
    details: 'Quarterly review completed for Estonia (Health & Beauty products)',
    timestamp: '2024-04-20T16:30:00',
    user: 'Emma Thompson'
  }
];

// Dashboard component
const Dashboard: React.FC = () => {
  const { colors } = useTheme();
  const [timeRange, setTimeRange] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
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

  return (
    <div className="container mx-auto space-y-6 py-4">
      {/* Header with Aldi logo */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center">
          <img 
            src="/Logo/aldi-0_250@2x.png" 
            alt="Aldi Logo" 
            className="h-10 mr-4 hidden md:block" 
          />
          <div>
            <h1 className="text-3xl font-semibold text-[#1E293B] mb-1">Supplier Negotiation</h1>
            <p className="text-[#475569]">Real-time overview of Aldi procurement activities and supplier performance</p>
          </div>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button className="px-4 py-2 rounded-xl bg-[#1cbceb]/10 text-[#1cbceb] border border-[#1cbceb]/20 flex items-center hover:bg-[#1cbceb]/20 transition-colors">
            <FiRefreshCw className="mr-2" /> Refresh
          </button>
          <div className="glass-panel-static px-3 py-2 rounded-xl flex">
            <select 
              className="bg-transparent border-none text-[#1E293B] outline-none"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="week" className="text-[#1E293B]">Last Week</option>
              <option value="month" className="text-[#1E293B]">Last Month</option>
              <option value="quarter" className="text-[#1E293B]">Last Quarter</option>
              <option value="year" className="text-[#1E293B]">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          className="glass-panel p-6 rounded-xl"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#475569]">Total Savings</p>
              <h3 className="text-3xl font-semibold text-[#1E293B]">$1.02M</h3>
              <div className="flex items-center text-sm text-green-600 mt-1">
                <FiArrowUp className="mr-1" /> 13.2% vs target
              </div>
            </div>
            <div className="p-3 rounded-full bg-gradient-to-br from-[#1cbceb]/20 to-[#021e5f]/20">
              <FiDollarSign className="text-2xl text-[#1cbceb]" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="glass-panel p-6 rounded-xl"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#475569]">Active Suppliers</p>
              <h3 className="text-3xl font-semibold text-[#1E293B]">30</h3>
              <div className="flex items-center text-sm text-[#1cbceb] mt-1">
                <FiArrowUp className="mr-1" /> 2 new this month
              </div>
            </div>
            <div className="p-3 rounded-full bg-gradient-to-br from-[#021e5f]/20 to-[#1cbceb]/20">
              <FiUsers className="text-2xl text-[#1cbceb]" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="glass-panel p-6 rounded-xl"
          custom={2}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#475569]">Open Negotiations</p>
              <h3 className="text-3xl font-semibold text-[#1E293B]">15</h3>
              <div className="flex items-center text-sm text-[#f7c202] mt-1">
                <FiClock className="mr-1" /> 4 approaching deadline
              </div>
            </div>
            <div className="p-3 rounded-full bg-gradient-to-br from-[#f7c202]/20 to-[#f47d07]/20">
              <FiCalendar className="text-2xl text-[#f7c202]" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="glass-panel p-6 rounded-xl"
          custom={3}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#475569]">Cost Reduction</p>
              <h3 className="text-3xl font-semibold text-[#1E293B]">8.6%</h3>
              <div className="flex items-center text-sm text-green-600 mt-1">
                <FiArrowUp className="mr-1" /> 1.4% vs last quarter
              </div>
            </div>
            <div className="p-3 rounded-full bg-gradient-to-br from-green-500/20 to-[#1cbceb]/20">
              <FiPercent className="text-2xl text-green-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Savings Trend Chart */}
        <motion.div 
          className="glass-panel p-6 rounded-xl"
          custom={4}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-[#1E293B]">Monthly Savings Trend</h3>
            <div className="flex items-center">
              <button className="p-2 rounded-lg hover:bg-black/5 text-[#475569]">
                <FiSettings size={16} />
              </button>
              <button className="p-2 rounded-lg hover:bg-black/5 text-[#475569]">
                <FiDownload size={16} />
              </button>
              <button className="p-2 rounded-lg hover:bg-black/5 text-[#475569]">
                <FiMaximize2 size={16} />
              </button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlySavingsData}>
                <defs>
                  <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={ALDI_COLORS.lightBlue} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={ALDI_COLORS.lightBlue} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" />
                <YAxis 
                  stroke="#64748B"
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                  }}
                  formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="savings" 
                  stroke={ALDI_COLORS.lightBlue}
                  strokeWidth={2}
                  fill="url(#savingsGradient)"
                  activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke={ALDI_COLORS.yellow}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Vendor Performance Chart */}
        <motion.div 
          className="glass-panel p-6 rounded-xl"
          custom={5}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-[#1E293B]">Top Vendor Performance</h3>
            <div className="flex items-center">
              <select
                className="bg-black/5 text-[#1E293B] px-3 py-1.5 rounded-lg border border-black/5 hover:border-black/10 transition-colors mr-2"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="health_beauty">Health & Beauty</option>
                <option value="fruits_vegetables">Fruits & Vegetables</option>
                <option value="deli_meats">Deli & Chilled Meats</option>
              </select>
              <button className="p-2 rounded-lg hover:bg-black/5 text-[#475569]">
                <FiMaximize2 size={16} />
              </button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vendorPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="quality" 
                  fill={ALDI_COLORS.lightBlue} 
                  name="Quality Score"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="delivery" 
                  fill={ALDI_COLORS.yellow} 
                  name="Delivery Score"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="price" 
                  fill={ALDI_COLORS.orange} 
                  name="Price Score"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Alerts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts */}
        <motion.div 
          className="glass-panel p-6 rounded-xl"
          custom={6}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-[#1E293B]">Recent Alerts</h3>
            <button className="text-[#1cbceb] text-sm hover:text-[#1cbceb]/80 transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {alerts.map(alert => (
              <motion.div 
                key={alert.id}
                className={`p-4 rounded-xl backdrop-blur-sm border ${
                  alert.type === 'high' ? 'border-[#d20002]/20 bg-[#d20002]/5' :
                  alert.type === 'medium' ? 'border-[#f7c202]/20 bg-[#f7c202]/5' :
                  'border-[#1cbceb]/20 bg-[#1cbceb]/5'
                }`}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: alert.type === 'high' ? '0 8px 16px rgba(210, 0, 2, 0.1)' :
                             alert.type === 'medium' ? '0 8px 16px rgba(247, 194, 2, 0.1)' :
                             '0 8px 16px rgba(28, 188, 235, 0.1)'
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <FiAlertTriangle className={
                        alert.type === 'high' ? 'text-[#d20002]' :
                        alert.type === 'medium' ? 'text-[#f7c202]' :
                        'text-[#1cbceb]'
                      } />
                      <h4 className="font-medium text-[#1E293B]">{alert.title}</h4>
                    </div>
                    <p className="text-[#475569] text-sm mt-1">{alert.message}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-[#64748B]">
                      <span>{alert.category}</span>
                      <span>{new Date(alert.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                  <button className="text-[#1cbceb] text-sm hover:text-[#1cbceb]/80 transition-colors">
                    {alert.action}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div 
          className="glass-panel p-6 rounded-xl"
          custom={7}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-[#1E293B]">Recent Activities</h3>
            <button className="text-[#1cbceb] text-sm hover:text-[#1cbceb]/80 transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map(activity => (
              <motion.div 
                key={activity.id} 
                className="flex items-start gap-4 p-4 rounded-xl backdrop-blur-sm bg-black/5 border border-black/5"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.05)'
                }}
                transition={{ duration: 0.2 }}
              >
                <div className={`p-2 rounded-full ${
                  activity.type === 'negotiation' ? 'bg-[#1cbceb]/20' :
                  activity.type === 'contract' ? 'bg-green-500/20' :
                  'bg-[#f7c202]/20'
                }`}>
                  {activity.type === 'negotiation' ? 
                    <FiDollarSign className="text-[#1cbceb]" /> :
                    activity.type === 'contract' ? 
                    <FiFileText className="text-green-600" /> :
                    <FiUsers className="text-[#f7c202]" />
                  }
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-[#1E293B]">{activity.title}</h4>
                  <p className="text-[#475569] text-sm mt-1">{activity.details}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-[#64748B]">
                    <span>{activity.user}</span>
                    <span>{new Date(activity.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Distribution */}
        <motion.div 
          className="glass-panel p-6 rounded-xl"
          custom={8}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <h3 className="text-xl font-semibold text-[#1E293B] mb-6">Spend by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === 0 ? ALDI_COLORS.lightBlue : 
                            index === 1 ? ALDI_COLORS.darkBlue :
                            index === 2 ? ALDI_COLORS.yellow :
                            index === 3 ? ALDI_COLORS.orange :
                            ALDI_COLORS.red} 
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                  }}
                  formatter={(value) => [`${value}%`, undefined]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {categoryDistribution.map((category, index) => (
              <div key={index} className="flex items-center text-sm">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ 
                    backgroundColor: index === 0 ? ALDI_COLORS.lightBlue : 
                                    index === 1 ? ALDI_COLORS.darkBlue :
                                    index === 2 ? ALDI_COLORS.yellow :
                                    index === 3 ? ALDI_COLORS.orange :
                                    ALDI_COLORS.red
                  }}
                ></div>
                <span className="text-[#475569]">{category.name}</span>
                <span className="ml-auto text-[#1E293B] font-medium">{category.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Negotiation Progress */}
        <motion.div 
          className="glass-panel p-6 rounded-xl"
          custom={9}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <h3 className="text-xl font-semibold text-[#1E293B] mb-6">Negotiation Progress</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={negotiationProgressData}>
                <defs>
                  <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={ALDI_COLORS.orange} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={ALDI_COLORS.orange} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                  }}
                  formatter={(value) => [`${value}%`, 'Progress']}
                />
                <Line 
                  type="monotone" 
                  dataKey="progress" 
                  stroke={ALDI_COLORS.orange} 
                  strokeWidth={3}
                  dot={{ fill: ALDI_COLORS.orange, strokeWidth: 2, stroke: '#fff', r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between items-center mt-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#f47d07] mr-2"></div>
              <span className="text-[#475569]">Success Rate</span>
            </div>
            <span className="text-[#1E293B] font-medium">
              {Math.round(negotiationProgressData.reduce((acc, item) => acc + item.progress, 0) / negotiationProgressData.length)}% Average
            </span>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="glass-panel p-6 rounded-xl"
          custom={10}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <h3 className="text-xl font-semibold text-[#1E293B] mb-6">Quick Actions</h3>
          
          <div className="space-y-4">
            <button className="w-full p-4 rounded-lg bg-gradient-to-r from-[#1cbceb]/10 to-[#021e5f]/10 border border-[#1cbceb]/20 flex items-center hover:from-[#1cbceb]/20 hover:to-[#021e5f]/20 transition-all hover:scale-[1.02]">
              <div className="p-3 rounded-full bg-[#1cbceb]/20 mr-3">
                <FiFileText className="text-xl text-[#1cbceb]" />
              </div>
              <div className="text-left">
                <h4 className="text-[#1E293B] font-medium">Create New Tender</h4>
                <p className="text-[#475569] text-sm">Start a new tender process</p>
              </div>
            </button>
            
            <button className="w-full p-4 rounded-lg bg-gradient-to-r from-[#f7c202]/10 to-[#f47d07]/10 border border-[#f7c202]/20 flex items-center hover:from-[#f7c202]/20 hover:to-[#f47d07]/20 transition-all hover:scale-[1.02]">
              <div className="p-3 rounded-full bg-[#f7c202]/20 mr-3">
                <FiDollarSign className="text-xl text-[#f7c202]" />
              </div>
              <div className="text-left">
                <h4 className="text-[#1E293B] font-medium">Start Negotiation</h4>
                <p className="text-[#475569] text-sm">Begin price negotiation process</p>
              </div>
            </button>
            
            <button className="w-full p-4 rounded-lg bg-gradient-to-r from-[#d20002]/10 to-[#f47d07]/10 border border-[#d20002]/20 flex items-center hover:from-[#d20002]/20 hover:to-[#f47d07]/20 transition-all hover:scale-[1.02]">
              <div className="p-3 rounded-full bg-[#d20002]/20 mr-3">
                <FiZap className="text-xl text-[#d20002]" />
              </div>
              <div className="text-left">
                <h4 className="text-[#1E293B] font-medium">Price Alerts</h4>
                <p className="text-[#475569] text-sm">Configure market price alerts</p>
              </div>
            </button>
            
            <button className="w-full p-4 rounded-lg bg-gradient-to-r from-[#021e5f]/10 to-[#1cbceb]/10 border border-[#021e5f]/20 flex items-center hover:from-[#021e5f]/20 hover:to-[#1cbceb]/20 transition-all hover:scale-[1.02]">
              <div className="p-3 rounded-full bg-[#021e5f]/20 mr-3">
                <FiUsers className="text-xl text-[#021e5f]" />
              </div>
              <div className="text-left">
                <h4 className="text-[#1E293B] font-medium">Supplier Review</h4>
                <p className="text-[#475569] text-sm">Schedule performance reviews</p>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard; 