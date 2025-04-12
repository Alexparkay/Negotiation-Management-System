import { useState } from 'react';
import {
  MdOutlineAnalytics,
  MdOutlineAttachMoney,
  MdOutlineShoppingCart,
  MdOutlineWarning,
  MdOutlineSchedule,
  MdOutlineLocalShipping,
  MdOutlineInventory,
  MdOutlineAssessment,
} from 'react-icons/md';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const SupplierPerformance = () => {
  const [timeRange, setTimeRange] = useState('6m');

  // Mock performance metrics
  const performanceMetrics = {
    onTimeDelivery: 94,
    qualityScore: 92,
    responseTime: 96,
    costEfficiency: 88,
    totalOrders: 1250,
    totalDefects: 18,
    averageLeadTime: 12,
    complianceScore: 95,
  };

  // Mock performance trend data
  const performanceTrendData = [
    { month: 'Jan', delivery: 92, quality: 90, response: 94, cost: 86 },
    { month: 'Feb', delivery: 93, quality: 91, response: 95, cost: 87 },
    { month: 'Mar', delivery: 94, quality: 92, response: 96, cost: 88 },
    { month: 'Apr', delivery: 94, quality: 92, response: 96, cost: 88 },
    { month: 'May', delivery: 95, quality: 93, response: 97, cost: 89 },
    { month: 'Jun', delivery: 94, quality: 92, response: 96, cost: 88 },
  ];

  // Mock quality issues data
  const qualityIssuesData = [
    { name: 'Defective', value: 45 },
    { name: 'Packaging', value: 25 },
    { name: 'Shipping', value: 20 },
    { name: 'Other', value: 10 },
  ];

  // Mock delivery performance data
  const deliveryPerformanceData = [
    { month: 'Jan', onTime: 120, delayed: 8 },
    { month: 'Feb', onTime: 135, delayed: 10 },
    { month: 'Mar', onTime: 128, delayed: 6 },
    { month: 'Apr', onTime: 142, delayed: 9 },
    { month: 'May', onTime: 138, delayed: 7 },
    { month: 'Jun', onTime: 145, delayed: 8 },
  ];

  const COLORS = ['#FF8042', '#FFBB28', '#00C49F', '#0088FE'];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Supplier Performance Analytics</h1>
        <select 
          className="select select-bordered select-sm"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="1m">Last Month</option>
          <option value="3m">Last 3 Months</option>
          <option value="6m">Last 6 Months</option>
          <option value="1y">Last Year</option>
        </select>
      </div>

      {/* Performance Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">On-Time Delivery</p>
              <h3 className="text-2xl font-bold">{performanceMetrics.onTimeDelivery}%</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <MdOutlineLocalShipping className="text-primary text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Quality Score</p>
              <h3 className="text-2xl font-bold">{performanceMetrics.qualityScore}%</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
              <MdOutlineAssessment className="text-success text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Response Time</p>
              <h3 className="text-2xl font-bold">{performanceMetrics.responseTime}%</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-info/20 flex items-center justify-center">
              <MdOutlineSchedule className="text-info text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Cost Efficiency</p>
              <h3 className="text-2xl font-bold">{performanceMetrics.costEfficiency}%</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center">
              <MdOutlineAttachMoney className="text-warning text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Performance Trend Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Performance Trends</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceTrendData}>
                <XAxis dataKey="month" />
                <YAxis domain={[80, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="delivery" stroke="#8884d8" name="Delivery" />
                <Line type="monotone" dataKey="quality" stroke="#82ca9d" name="Quality" />
                <Line type="monotone" dataKey="response" stroke="#ffc658" name="Response" />
                <Line type="monotone" dataKey="cost" stroke="#ff7300" name="Cost" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Quality Issues Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={qualityIssuesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {qualityIssuesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Delivery Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Delivery Performance</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deliveryPerformanceData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="onTime" name="On Time" fill="#82ca9d" stackId="a" />
                <Bar dataKey="delayed" name="Delayed" fill="#ff7300" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Performance Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-2 bg-base-200 dark:bg-slate-700 rounded-lg">
              <div className="flex items-center gap-2">
                <MdOutlineShoppingCart className="text-primary" />
                <span>Total Orders</span>
              </div>
              <span className="font-bold">{performanceMetrics.totalOrders}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-base-200 dark:bg-slate-700 rounded-lg">
              <div className="flex items-center gap-2">
                <MdOutlineWarning className="text-warning" />
                <span>Quality Defects</span>
              </div>
              <span className="font-bold">{performanceMetrics.totalDefects}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-base-200 dark:bg-slate-700 rounded-lg">
              <div className="flex items-center gap-2">
                <MdOutlineSchedule className="text-info" />
                <span>Average Lead Time</span>
              </div>
              <span className="font-bold">{performanceMetrics.averageLeadTime} days</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-base-200 dark:bg-slate-700 rounded-lg">
              <div className="flex items-center gap-2">
                <MdOutlineInventory className="text-success" />
                <span>Compliance Score</span>
              </div>
              <span className="font-bold">{performanceMetrics.complianceScore}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierPerformance; 