import { useState } from 'react';
import {
  MdOutlineAttachMoney,
  MdOutlineCategory,
  MdOutlineStorefront,
  MdOutlineShoppingCart,
  MdOutlineTrendingUp,
  MdOutlineTrendingDown,
  MdOutlineSchedule,
  MdOutlineAnalytics,
} from 'react-icons/md';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const SpendAnalysis = () => {
  const [timeRange, setTimeRange] = useState('6m');
  const [category, setCategory] = useState('all');

  // Mock spend metrics
  const spendMetrics = {
    totalSpend: 5670000,
    budgetVariance: -8.5,
    averageOrderValue: 45600,
    activeSuppliers: 247,
    savingsAchieved: 420000,
    complianceRate: 94,
  };

  // Mock spend by category data
  const spendByCategory = [
    { name: 'Electronics', value: 35 },
    { name: 'Raw Materials', value: 25 },
    { name: 'Packaging', value: 15 },
    { name: 'Services', value: 10 },
    { name: 'Office Supplies', value: 8 },
    { name: 'Other', value: 7 },
  ];

  // Mock spend trend data
  const spendTrendData = [
    { month: 'Jan', actual: 420000, budget: 450000 },
    { month: 'Feb', actual: 380000, budget: 400000 },
    { month: 'Mar', actual: 450000, budget: 430000 },
    { month: 'Apr', actual: 410000, budget: 420000 },
    { month: 'May', actual: 390000, budget: 410000 },
    { month: 'Jun', actual: 460000, budget: 440000 },
  ];

  // Mock top suppliers data
  const topSuppliers = [
    { name: 'Acme Electronics', spend: 1250000, change: 12 },
    { name: 'Global Materials Inc', spend: 980000, change: -5 },
    { name: 'FastShip Logistics', spend: 920000, change: 8 },
    { name: 'PackRight Solutions', spend: 750000, change: 15 },
    { name: 'Quality Parts Co', spend: 620000, change: -3 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Spend Analysis</h1>
        <div className="flex gap-2">
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
          <select
            className="select select-bordered select-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="raw_materials">Raw Materials</option>
            <option value="packaging">Packaging</option>
            <option value="services">Services</option>
          </select>
        </div>
      </div>

      {/* Spend Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Spend</p>
              <h3 className="text-2xl font-bold">${(spendMetrics.totalSpend / 1000000).toFixed(2)}M</h3>
              <div className="flex items-center gap-1 text-sm">
                <MdOutlineTrendingDown className="text-red-500" />
                <span className="text-red-500">{spendMetrics.budgetVariance}%</span>
                <span className="text-gray-500 dark:text-gray-400">vs budget</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <MdOutlineAttachMoney className="text-primary text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Savings Achieved</p>
              <h3 className="text-2xl font-bold">${(spendMetrics.savingsAchieved / 1000).toFixed(1)}K</h3>
              <div className="flex items-center gap-1 text-sm">
                <MdOutlineTrendingUp className="text-green-500" />
                <span className="text-green-500">12%</span>
                <span className="text-gray-500 dark:text-gray-400">vs last period</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
              <MdOutlineAnalytics className="text-success text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg Order Value</p>
              <h3 className="text-2xl font-bold">${(spendMetrics.averageOrderValue / 1000).toFixed(1)}K</h3>
              <div className="flex items-center gap-1 text-sm">
                <MdOutlineTrendingUp className="text-green-500" />
                <span className="text-green-500">5%</span>
                <span className="text-gray-500 dark:text-gray-400">vs last period</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-info/20 flex items-center justify-center">
              <MdOutlineShoppingCart className="text-info text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Spend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Spend vs Budget Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={spendTrendData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  name="Actual Spend"
                />
                <Line 
                  type="monotone" 
                  dataKey="budget" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  name="Budget"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Spend by Category</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {spendByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Suppliers Table */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Top Suppliers by Spend</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-base-300 dark:border-slate-700">
                <th className="text-left p-2">Supplier</th>
                <th className="text-right p-2">Total Spend</th>
                <th className="text-right p-2">% of Total</th>
                <th className="text-right p-2">YoY Change</th>
              </tr>
            </thead>
            <tbody>
              {topSuppliers.map((supplier, index) => (
                <tr key={index} className="border-b border-base-300 dark:border-slate-700">
                  <td className="p-2">{supplier.name}</td>
                  <td className="text-right p-2">${supplier.spend.toLocaleString()}</td>
                  <td className="text-right p-2">
                    {((supplier.spend / spendMetrics.totalSpend) * 100).toFixed(1)}%
                  </td>
                  <td className="text-right p-2">
                    <span className={supplier.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                      {supplier.change >= 0 ? '+' : ''}{supplier.change}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SpendAnalysis; 