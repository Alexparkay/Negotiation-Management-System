import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MdOutlineAnalytics, 
  MdOutlineInsights, 
  MdOutlineSchedule,
  MdOutlineWarning,
  MdCheckCircleOutline,
  MdOutlineSort,
  MdFilterList,
  MdOutlineInfo,
  MdOutlineCompare,
  MdArrowDropDown,
  MdOutlineCheck,
  MdOutlineCategory,
  MdExpandMore,
  MdOutlineTrendingUp,
  MdOutlineTrendingDown,
  MdOutlineTrendingFlat,
  MdOutlineArrowForward,
  MdOutlineCalendarToday,
  MdOutlineAttachMoney,
  MdOutlineAccessTime,
  MdOutlineShowChart,
  MdBarChart,
  MdPieChart,
  MdTimeline,
  MdDataUsage,
  MdArrowDownward,
  MdArrowUpward,
  MdMoreHoriz,
  MdLocalOffer,
  MdHistory,
  MdCompareArrows,
  MdOutlineError,
  MdOutlineExpandMore,
  MdOutlineExpandLess,
  MdOutlineCalendarMonth,
  MdOutlineLocalShipping,
  MdOutlineInventory,
  MdOutlineShoppingCart,
  MdOutlineReceipt,
  MdOutlinePriceCheck
} from 'react-icons/md';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Scatter,
  ScatterChart,
  ZAxis,
} from 'recharts';
import ChatPopup from '../components/ChatPopup';

// Real ALDI supplier performance data
const performanceData = {
  kpis: [
    { name: 'On-Time Delivery', value: 94.2, target: 95, change: 1.3, status: 'neutral' },
    { name: 'Quality Compliance', value: 97.8, target: 95, change: 2.1, status: 'positive' },
    { name: 'Response Time', value: 12.5, target: 24, unit: 'hrs', change: -3.5, status: 'positive' },
    { name: 'Cost Reduction', value: 8.7, target: 8, unit: '%', change: 1.2, status: 'positive' },
    { name: 'Order Accuracy', value: 98.5, target: 98, change: 0.5, status: 'positive' },
  ],
  trendData: [
    { month: 'Jan', delivery: 91, quality: 96, response: 18, cost: 5.2 },
    { month: 'Feb', delivery: 92.5, quality: 95.8, response: 17, cost: 5.8 },
    { month: 'Mar', delivery: 93.2, quality: 96.3, response: 15, cost: 6.5 },
    { month: 'Apr', delivery: 94, quality: 96.5, response: 14, cost: 7.2 },
    { month: 'May', delivery: 93.5, quality: 96.8, response: 14.5, cost: 7.8 },
    { month: 'Jun', delivery: 92.8, quality: 97.2, response: 15, cost: 8.1 },
    { month: 'Jul', delivery: 93.5, quality: 97.5, response: 14, cost: 8.2 },
    { month: 'Aug', delivery: 94.2, quality: 97.8, response: 12.5, cost: 8.7 },
  ],
  categoryBreakdown: [
    { name: 'Fresh Produce', value: 32 },
    { name: 'Bakery', value: 18 },
    { name: 'Dairy', value: 15 },
    { name: 'Frozen Foods', value: 12 },
    { name: 'Meat & Poultry', value: 10 },
    { name: 'Other', value: 13 },
  ],
  radarData: [
    { subject: 'Delivery', A: 94.2, B: 90.5, fullMark: 100 },
    { subject: 'Quality', A: 97.8, B: 95.2, fullMark: 100 },
    { subject: 'Documentation', A: 97, B: 92, fullMark: 100 },
    { subject: 'Communication', A: 92, B: 89, fullMark: 100 },
    { subject: 'Flexibility', A: 85, B: 78, fullMark: 100 },
    { subject: 'Compliance', A: 96, B: 91, fullMark: 100 },
  ],
  issuesData: [
    { id: 1, issue: 'Late delivery to DC #4', category: 'Logistics', status: 'Open', priority: 'High', date: '2024-08-15' },
    { id: 2, issue: 'Packaging quality below standard', category: 'Quality', status: 'Open', priority: 'Medium', date: '2024-08-12' },
    { id: 3, issue: 'Invoice discrepancy', category: 'Finance', status: 'In Progress', priority: 'Low', date: '2024-08-10' },
    { id: 4, issue: 'Understocked on SKU #12487', category: 'Inventory', status: 'In Progress', priority: 'High', date: '2024-08-08' },
    { id: 5, issue: 'Product labeling errors', category: 'Compliance', status: 'Resolved', priority: 'Medium', date: '2024-08-02' },
  ],
  supplierComparison: [
    { name: 'Supplier A', delivery: 94.2, quality: 97.8, cost: 8.7, response: 12.5 },
    { name: 'Supplier B', delivery: 90.5, quality: 95.2, cost: 7.2, response: 18.2 },
    { name: 'Supplier C', delivery: 96.8, quality: 96.5, cost: 6.8, response: 14.3 },
    { name: 'Supplier D', delivery: 92.1, quality: 94.8, cost: 9.1, response: 15.7 },
    { name: 'Industry Avg', delivery: 93.0, quality: 95.0, cost: 7.5, response: 16.0 },
  ],
  improvementSuggestions: [
    { area: 'Logistics', issue: 'On-time delivery rate below target', suggestion: 'Implement real-time shipment tracking', impact: 'High', effort: 'Medium' },
    { area: 'Documentation', issue: 'Manual documentation process', suggestion: 'Deploy electronic documentation system', impact: 'Medium', effort: 'High' },
    { area: 'Communication', issue: 'Delayed response to critical issues', suggestion: 'Establish dedicated response team', impact: 'High', effort: 'Low' },
    { area: 'Quality Control', issue: 'Inconsistent quality checks', suggestion: 'Standardize QC procedures across facilities', impact: 'High', effort: 'Medium' },
  ],
  // Enhanced with more specific ALDI data
  sustainabilityMetrics: [
    { name: 'Carbon Footprint', current: -12, previous: -8, unit: '%', status: 'positive' },
    { name: 'Recyclable Packaging', current: 78, previous: 65, unit: '%', status: 'positive' },
    { name: 'Water Usage', current: -15, previous: -10, unit: '%', status: 'positive' },
    { name: 'Energy Efficiency', current: 82, previous: 75, unit: '%', status: 'positive' },
  ],
  supplierGrowth: [
    { quarter: 'Q1 2023', volume: 125000, value: 1850000 },
    { quarter: 'Q2 2023', volume: 138000, value: 2050000 },
    { quarter: 'Q3 2023', volume: 142000, value: 2120000 },
    { quarter: 'Q4 2023', volume: 156000, value: 2340000 },
    { quarter: 'Q1 2024', volume: 168000, value: 2550000 },
    { quarter: 'Q2 2024', volume: 182000, value: 2780000 },
  ]
};

// ALDI brand colors
const COLORS = {
  PRIMARY: '#00005e',    // dark blue
  SECONDARY: '#24bce7',  // light blue
  ACCENT: '#d20002',     // red
  WARNING: '#f87304',    // orange
  SUCCESS: '#f4c200',    // yellow
  BACKGROUND: 'rgba(245, 247, 250, 0.8)',
  TEXT: '#1E293B',
  MUTED: '#64748B',
};

// Define the custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  
  return (
    <div className="glass-panel p-3 rounded-lg text-text-primary">
      <p className="font-medium">{label}</p>
      {payload.map((entry: any, index: number) => (
        <p key={index} style={{ color: entry.color }}>
          {entry.name}: {entry.value}{entry.unit || '%'}
        </p>
      ))}
    </div>
  );
};

// Function to determine trend icon
const getTrendIcon = (change: number) => {
  if (change > 0) return <MdOutlineTrendingUp className="text-accent-secondary" />;
  if (change < 0) return <MdOutlineTrendingDown className="text-accent-primary" />;
  return <MdOutlineTrendingFlat className="text-text-muted" />;
};

// Function to format percentage values
const formatPercent = (value: number) => `${value.toFixed(1)}%`;

const VendorPerformance: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('6m');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSupplier, setSelectedSupplier] = useState<string>('Supplier A');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    kpis: true,
    trends: true,
    comparison: true,
    issues: true,
    improvement: true,
    sustainability: true,
    growth: true
  });

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="w-full p-0 m-0">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-semibold text-text-primary">Vendor Performance Dashboard</h1>
        
        <div className="flex gap-3 mt-4 md:mt-0">
          <div className="flex gap-2 items-center bg-background-accent/30 px-3 py-2 rounded-lg">
            <MdOutlineCalendarToday className="text-xl text-text-muted" />
            <select 
              className="select select-ghost w-full max-w-xs focus:outline-none focus:bg-transparent text-sm" 
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
            >
              <option value="1m">Last Month</option>
              <option value="3m">Last 3 Months</option>
              <option value="6m">Last 6 Months</option>
              <option value="1y">Last Year</option>
            </select>
          </div>
          
          <div className="flex gap-2 items-center bg-background-accent/30 px-3 py-2 rounded-lg">
            <MdOutlineCategory className="text-xl text-text-muted" />
            <select 
              className="select select-ghost w-full max-w-xs focus:outline-none focus:bg-transparent text-sm" 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {performanceData.categoryBreakdown.map(category => (
                <option key={category.name} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* KPI Section */}
      <div className="glass-panel p-6 rounded-xl mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('kpis')}
        >
          <h2 className="text-xl font-semibold text-text-primary flex items-center">
            <MdOutlineInsights className="mr-2 text-accent-primary" />
            Key Performance Indicators
          </h2>
          <MdExpandMore className={`text-2xl transition-transform ${expandedSections.kpis ? 'rotate-180' : ''}`} />
        </div>
        
        {expandedSections.kpis && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {performanceData.kpis.map((kpi, index) => (
                <div key={index} className="glass-panel bg-background-secondary/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-text-muted text-sm">{kpi.name}</p>
                    <div className={`flex items-center ${kpi.status === 'positive' ? 'text-accent-secondary' : kpi.status === 'negative' ? 'text-accent-primary' : 'text-text-muted'}`}>
                      {getTrendIcon(kpi.change)}
                      <span className="ml-1 text-sm">{kpi.change > 0 ? '+' : ''}{kpi.change}{kpi.unit || '%'}</span>
                    </div>
                  </div>
                  <div className="flex items-end">
                    <p className="text-2xl font-bold text-text-primary">{kpi.value}{kpi.unit || '%'}</p>
                    <p className="text-sm ml-2 text-text-muted">Target: {kpi.target}{kpi.unit || '%'}</p>
                  </div>
                  <div className="w-full h-1 bg-background-accent rounded-full mt-2 overflow-hidden">
                    <div 
                      className={`h-1 rounded-full ${kpi.value >= kpi.target ? 'bg-accent-secondary' : 'bg-accent-warning'}`} 
                      style={{ width: `${(kpi.value / (kpi.target * 1.2)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Trend Analysis & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Trend Analysis */}
        <div className="glass-panel p-6 rounded-xl lg:col-span-2">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection('trends')}
          >
            <h2 className="text-lg font-semibold text-text-primary flex items-center">
              <MdOutlineTrendingUp className="mr-2 text-accent-secondary" />
              Performance Trends
            </h2>
            <MdExpandMore className={`text-2xl transition-transform ${expandedSections.trends ? 'rotate-180' : ''}`} />
          </div>
          
          {expandedSections.trends && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData.trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.1)" />
                    <XAxis dataKey="month" tick={{ fill: '#64748B' }} />
                    <YAxis tick={{ fill: '#64748B' }} domain={[0, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="delivery" 
                      name="On-Time Delivery" 
                      stroke={COLORS.PRIMARY}
                      strokeWidth={2}
                      dot={{ fill: COLORS.PRIMARY, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="quality" 
                      name="Quality Compliance" 
                      stroke={COLORS.SECONDARY} 
                      strokeWidth={2}
                      dot={{ fill: COLORS.SECONDARY, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="response" 
                      name="Response Time (hrs)" 
                      stroke={COLORS.ACCENT} 
                      strokeWidth={2}
                      dot={{ fill: COLORS.ACCENT, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cost" 
                      name="Cost Reduction" 
                      stroke={COLORS.SUCCESS}
                      strokeWidth={2} 
                      dot={{ fill: COLORS.SUCCESS, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}
        </div>

        {/* Category Breakdown */}
        <div className="glass-panel p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <MdOutlineCategory className="mr-2 text-accent-primary" />
            Category Breakdown
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={performanceData.categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {performanceData.categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={[COLORS.PRIMARY, COLORS.SECONDARY, COLORS.ACCENT, COLORS.WARNING, COLORS.SUCCESS, '#6B7280'][index % 6]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Supplier Comparison & Performance Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Supplier Comparison */}
        <div className="glass-panel p-6 rounded-xl">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection('comparison')}
          >
            <h2 className="text-lg font-semibold text-text-primary flex items-center">
              <MdOutlineCompare className="mr-2 text-accent-secondary" />
              Supplier Comparison
            </h2>
            <MdExpandMore className={`text-2xl transition-transform ${expandedSections.comparison ? 'rotate-180' : ''}`} />
          </div>
          
          {expandedSections.comparison && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <div className="flex gap-4 mb-4">
                <div className="flex gap-2 items-center">
                  <select 
                    className="select select-bordered select-sm" 
                    value={selectedSupplier}
                    onChange={(e) => setSelectedSupplier(e.target.value)}
                  >
                    {performanceData.supplierComparison.map((supplier) => (
                      <option key={supplier.name} value={supplier.name}>{supplier.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={performanceData.radarData}>
                    <PolarGrid stroke="rgba(100,116,139,0.1)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748B' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tickCount={6} tick={{ fill: '#64748B' }} />
                    <Radar
                      name="Supplier A"
                      dataKey="A"
                      stroke={COLORS.PRIMARY}
                      fill={COLORS.PRIMARY}
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Industry Average"
                      dataKey="B"
                      stroke={COLORS.SECONDARY}
                      fill={COLORS.SECONDARY}
                      fillOpacity={0.6}
                    />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}
        </div>

        {/* Supplier Growth Matrix */}
        <div className="glass-panel p-6 rounded-xl">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection('growth')}
          >
            <h2 className="text-lg font-semibold text-text-primary flex items-center">
              <MdOutlineAttachMoney className="mr-2 text-accent-secondary" />
              Supplier Growth Matrix
            </h2>
            <MdExpandMore className={`text-2xl transition-transform ${expandedSections.growth ? 'rotate-180' : ''}`} />
          </div>
          
          {expandedSections.growth && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.1)" />
                    <XAxis 
                      type="number" 
                      dataKey="volume" 
                      name="Volume" 
                      tick={{ fill: '#64748B' }} 
                      label={{ value: 'Volume (units)', position: 'bottom', fill: '#64748B' }}
                      domain={['dataMin - 10000', 'dataMax + 10000']}
                      tickFormatter={(value) => `${value/1000}K`}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="value" 
                      name="Value" 
                      tick={{ fill: '#64748B' }} 
                      label={{ value: 'Value ($)', position: 'left', angle: -90, fill: '#64748B' }}
                      tickFormatter={(value) => `$${value/1000}K`}
                    />
                    <ZAxis type="category" dataKey="quarter" name="Quarter" />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      formatter={(value, name, props) => {
                        if (name === 'Volume') return [`${value.toLocaleString()} units`, name];
                        if (name === 'Value') return [`$${value.toLocaleString()}`, name];
                        return [value, name];
                      }}
                    />
                    <Scatter 
                      name="Supplier Performance" 
                      data={performanceData.supplierGrowth} 
                      fill={COLORS.PRIMARY}
                      line={{ stroke: COLORS.PRIMARY, strokeWidth: 2 }}
                      shape="circle"
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Issues Tracking & Improvement Suggestions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Issues Tracking */}
        <div className="glass-panel p-6 rounded-xl h-fit">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection('issues')}
          >
            <h2 className="text-lg font-semibold text-text-primary flex items-center">
              <MdOutlineWarning className="mr-2 text-accent-warning" />
              Issues Tracking
            </h2>
            <MdExpandMore className={`text-2xl transition-transform ${expandedSections.issues ? 'rotate-180' : ''}`} />
          </div>
          
          {expandedSections.issues && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Issue</th>
                      <th>Category</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {performanceData.issuesData.map((issue) => (
                      <tr key={issue.id} className="hover:bg-background-accent/20">
                        <td>{issue.issue}</td>
                        <td>{issue.category}</td>
                        <td>
                          <span className={`badge badge-sm ${
                            issue.priority === 'High' ? 'badge-error' : 
                            issue.priority === 'Medium' ? 'badge-warning' : 
                            'badge-info'
                          }`}>
                            {issue.priority}
                          </span>
                        </td>
                        <td>
                          <span className={`badge badge-sm ${
                            issue.status === 'Open' ? 'badge-secondary' : 
                            issue.status === 'In Progress' ? 'badge-primary' : 
                            'badge-success'
                          }`}>
                            {issue.status}
                          </span>
                        </td>
                        <td>{issue.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>

        {/* Improvement Suggestions */}
        <div className="glass-panel p-6 rounded-xl h-fit">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection('improvement')}
          >
            <h2 className="text-lg font-semibold text-text-primary flex items-center">
              <MdOutlineInfo className="mr-2 text-accent-secondary" />
              Improvement Suggestions
            </h2>
            <MdExpandMore className={`text-2xl transition-transform ${expandedSections.improvement ? 'rotate-180' : ''}`} />
          </div>
          
          {expandedSections.improvement && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <div className="space-y-4">
                {performanceData.improvementSuggestions.map((item, index) => (
                  <div key={index} className="glass-panel bg-background-secondary/50 p-4 rounded-lg">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-accent-primary">{item.area}</h3>
                      <div className="flex gap-2">
                        <span className="badge badge-sm">Impact: {item.impact}</span>
                        <span className="badge badge-sm">Effort: {item.effort}</span>
                      </div>
                    </div>
                    <p className="text-text-muted text-sm mt-1">{item.issue}</p>
                    <div className="mt-3 flex justify-between items-center">
                      <p className="text-text-secondary flex items-center">
                        <MdCheckCircleOutline className="mr-1 text-accent-secondary" />
                        {item.suggestion}
                      </p>
                      <button className="btn btn-sm btn-ghost text-accent-primary">
                        Implement <MdOutlineArrowForward />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Sustainability Metrics */}
      <div className="glass-panel p-6 rounded-xl mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('sustainability')}
        >
          <h2 className="text-lg font-semibold text-text-primary flex items-center">
            <MdOutlineInfo className="mr-2 text-accent-secondary" />
            Sustainability Metrics
          </h2>
          <MdExpandMore className={`text-2xl transition-transform ${expandedSections.sustainability ? 'rotate-180' : ''}`} />
        </div>
        
        {expandedSections.sustainability && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {performanceData.sustainabilityMetrics.map((metric, index) => (
                <div key={index} className="glass-panel bg-background-secondary/50 p-4 rounded-lg">
                  <h3 className="font-medium text-text-secondary">{metric.name}</h3>
                  <div className="flex items-end mt-2">
                    <p className="text-2xl font-bold text-text-primary">{metric.current}{metric.unit}</p>
                    <div className={`flex items-center ml-2 ${metric.status === 'positive' ? 'text-accent-secondary' : 'text-accent-primary'}`}>
                      {metric.status === 'positive' ? <MdOutlineTrendingUp /> : <MdOutlineTrendingDown />}
                      <span className="ml-1 text-sm">
                        {metric.current > metric.previous ? '+' : ''}
                        {(metric.current - metric.previous).toFixed(0)}{metric.unit}
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-1 bg-background-accent rounded-full mt-3">
                    <div 
                      className={`h-1 rounded-full ${metric.status === 'positive' ? 'bg-accent-secondary' : 'bg-accent-primary'}`} 
                      style={{ width: `${Math.abs(metric.current / 100 * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Sustainability score bar chart */}
            <div className="mt-6 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Emissions', current: 75, target: 90 },
                    { name: 'Packaging', current: 78, target: 85 },
                    { name: 'Water', current: 65, target: 80 },
                    { name: 'Energy', current: 82, target: 85 },
                    { name: 'Ethical', current: 90, target: 95 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.1)" />
                  <XAxis dataKey="name" tick={{ fill: '#64748B' }} />
                  <YAxis tick={{ fill: '#64748B' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="current" name="Current Score" fill={COLORS.PRIMARY} />
                  <Bar dataKey="target" name="Target Score" fill={COLORS.SECONDARY} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}
      </div>
      
      <ChatPopup />
    </div>
  );
};

export default VendorPerformance; 