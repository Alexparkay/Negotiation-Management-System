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
  Cell
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
  FiFilter
} from 'react-icons/fi';

// Mock data for charts
const monthlySavingsData = [
  { month: 'Jan', savings: 125000, target: 150000 },
  { month: 'Feb', savings: 180000, target: 150000 },
  { month: 'Mar', savings: 145000, target: 150000 },
  { month: 'Apr', savings: 210000, target: 150000 },
  { month: 'May', savings: 175000, target: 150000 },
  { month: 'Jun', savings: 195000, target: 150000 },
];

const vendorPerformanceData = [
  { name: 'Global Steel', quality: 92, delivery: 88, price: 85 },
  { name: 'TechCore', quality: 95, delivery: 90, price: 82 },
  { name: 'MaintenancePro', quality: 88, delivery: 85, price: 90 },
  { name: 'FastTrack', quality: 90, delivery: 92, price: 88 },
  { name: 'PrecisionTech', quality: 94, delivery: 87, price: 86 },
];

const categoryDistribution = [
  { name: 'Raw Materials', value: 35 },
  { name: 'Electronics', value: 25 },
  { name: 'Services', value: 20 },
  { name: 'Logistics', value: 15 },
  { name: 'Equipment', value: 5 },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#6366F1', '#EC4899'];

const alerts = [
  {
    id: 1,
    type: 'high',
    title: 'Critical Price Increase Alert',
    message: 'Steel prices expected to rise by 15% in Q2',
    category: 'Market Analysis',
    timestamp: '2024-02-21T10:30:00',
    action: 'Review alternative suppliers'
  },
  {
    id: 2,
    type: 'medium',
    title: 'Contract Renewal Reminder',
    message: '3 contracts expiring in next 30 days',
    category: 'Contract Management',
    timestamp: '2024-02-21T09:15:00',
    action: 'Initiate renewal process'
  },
  {
    id: 3,
    type: 'low',
    title: 'New Supplier Opportunity',
    message: '2 new suppliers qualified in Electronics category',
    category: 'Vendor Management',
    timestamp: '2024-02-20T16:45:00',
    action: 'Review supplier profiles'
  }
];

const recentActivities = [
  {
    id: 1,
    type: 'negotiation',
    title: 'Raw Materials Agreement Updated',
    details: 'Target price reduced by 8%',
    timestamp: '2024-02-21T14:20:00',
    user: 'Sarah Chen'
  },
  {
    id: 2,
    type: 'contract',
    title: 'New Contract Signed',
    details: 'Annual maintenance services with MaintenancePro',
    timestamp: '2024-02-21T11:45:00',
    user: 'Michael Rodriguez'
  },
  {
    id: 3,
    type: 'vendor',
    title: 'Vendor Performance Review',
    details: 'Quarterly review completed for TechCore Electronics',
    timestamp: '2024-02-20T16:30:00',
    user: 'Emma Thompson'
  }
];

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-4xl font-semibold text-white mb-2">Supplier Portal Dashboard</h1>
          <p className="text-text-secondary">Overview of supplier management and procurement activities</p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <button className="px-4 py-2 bg-background-accent rounded-lg text-white flex items-center hover:bg-background-accent/80 transition-colors">
            <FiRefreshCw className="mr-2" /> Refresh Data
          </button>
          <button className="px-4 py-2 bg-background-accent rounded-lg text-white flex items-center hover:bg-background-accent/80 transition-colors">
            <FiFilter className="mr-2" /> Filter
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          className="glass-panel p-6 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary">Total Savings</p>
              <h3 className="text-3xl font-semibold text-white">$1.03M</h3>
              <div className="flex items-center text-sm text-green-400 mt-1">
                <FiArrowUp className="mr-1" /> 12.5% vs target
              </div>
            </div>
            <div className="p-3 rounded-full bg-green-500/20">
              <FiTrendingUp className="text-2xl text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="glass-panel p-6 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary">Active Suppliers</p>
              <h3 className="text-3xl font-semibold text-white">48</h3>
              <div className="flex items-center text-sm text-blue-400 mt-1">
                <FiArrowUp className="mr-1" /> 3 new this month
              </div>
            </div>
            <div className="p-3 rounded-full bg-blue-500/20">
              <FiUsers className="text-2xl text-blue-400" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="glass-panel p-6 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary">Open Negotiations</p>
              <h3 className="text-3xl font-semibold text-white">12</h3>
              <div className="flex items-center text-sm text-yellow-400 mt-1">
                <FiClock className="mr-1" /> 3 approaching deadline
              </div>
            </div>
            <div className="p-3 rounded-full bg-yellow-500/20">
              <FiCalendar className="text-2xl text-yellow-400" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="glass-panel p-6 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary">Average Cost Reduction</p>
              <h3 className="text-3xl font-semibold text-white">8.2%</h3>
              <div className="flex items-center text-sm text-purple-400 mt-1">
                <FiPercent className="mr-1" /> +1.2% vs last quarter
              </div>
            </div>
            <div className="p-3 rounded-full bg-purple-500/20">
              <FiShoppingCart className="text-2xl text-purple-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Savings Trend Chart */}
        <motion.div 
          className="glass-panel p-6 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">Monthly Savings Trend</h3>
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
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlySavingsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                <XAxis dataKey="month" stroke="#B3B3B3" />
                <YAxis stroke="#B3B3B3" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A1A1A',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="savings" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Vendor Performance Chart */}
        <motion.div 
          className="glass-panel p-6 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">Top Vendor Performance</h3>
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
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vendorPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                <XAxis dataKey="name" stroke="#B3B3B3" />
                <YAxis stroke="#B3B3B3" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A1A1A',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="quality" fill="#3B82F6" name="Quality Score" />
                <Bar dataKey="delivery" fill="#10B981" name="Delivery Score" />
                <Bar dataKey="price" fill="#F59E0B" name="Price Score" />
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">Recent Alerts</h3>
            <button className="text-accent-primary hover:text-accent-primary/80 transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {alerts.map(alert => (
              <div 
                key={alert.id}
                className={`p-4 rounded-lg border ${
                  alert.type === 'high' ? 'border-red-500/20 bg-red-500/10' :
                  alert.type === 'medium' ? 'border-yellow-500/20 bg-yellow-500/10' :
                  'border-blue-500/20 bg-blue-500/10'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <FiAlertTriangle className={`text-${
                        alert.type === 'high' ? 'red' :
                        alert.type === 'medium' ? 'yellow' :
                        'blue'
                      }-400`} />
                      <h4 className="font-medium text-white">{alert.title}</h4>
                    </div>
                    <p className="text-text-secondary text-sm mt-1">{alert.message}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-text-muted">
                      <span>{alert.category}</span>
                      <span>{new Date(alert.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                  <button className="text-accent-primary text-sm hover:text-accent-primary/80 transition-colors">
                    {alert.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div 
          className="glass-panel p-6 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">Recent Activities</h3>
            <button className="text-accent-primary hover:text-accent-primary/80 transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg bg-background-accent/50">
                <div className={`p-2 rounded-full ${
                  activity.type === 'negotiation' ? 'bg-blue-500/20' :
                  activity.type === 'contract' ? 'bg-green-500/20' :
                  'bg-purple-500/20'
                }`}>
                  {activity.type === 'negotiation' ? <FiDollarSign className="text-blue-400" /> :
                   activity.type === 'contract' ? <FiFileText className="text-green-400" /> :
                   <FiUsers className="text-purple-400" />}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white">{activity.title}</h4>
                  <p className="text-text-secondary text-sm mt-1">{activity.details}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-text-muted">
                    <span>{activity.user}</span>
                    <span>{new Date(activity.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Category Distribution */}
      <motion.div 
        className="glass-panel p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <h3 className="text-xl font-semibold text-white mb-6">Spend Distribution by Category</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1A1A1A',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard; 