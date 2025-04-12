import { useState } from 'react';
import {
  MdOutlineInsights,
  MdOutlineTrendingUp,
  MdOutlineTrendingDown,
  MdOutlineInventory,
  MdOutlineShoppingCart,
  MdOutlineCategory,
  MdOutlineWarning,
  MdOutlineSchedule,
} from 'react-icons/md';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from 'recharts';

interface ForecastMetrics {
  totalSKUs: number;
  accuracyRate: number;
  stockoutRisk: number;
  excessInventory: number;
  averageLead: number;
  forecastHorizon: number;
}

const DemandForecasting = () => {
  const [timeRange, setTimeRange] = useState('6m');
  const [category, setCategory] = useState('all');

  // Mock forecast metrics
  const metrics: ForecastMetrics = {
    totalSKUs: 1250,
    accuracyRate: 92,
    stockoutRisk: 15,
    excessInventory: 8,
    averageLead: 14,
    forecastHorizon: 90,
  };

  // Mock forecast trend data
  const forecastTrendData = [
    { month: 'Jan', actual: 1200, forecast: 1180, lower: 1100, upper: 1260 },
    { month: 'Feb', actual: 1150, forecast: 1160, lower: 1080, upper: 1240 },
    { month: 'Mar', actual: 1300, forecast: 1250, lower: 1170, upper: 1330 },
    { month: 'Apr', actual: 1250, forecast: 1270, lower: 1190, upper: 1350 },
    { month: 'May', actual: 1280, forecast: 1290, lower: 1210, upper: 1370 },
    { month: 'Jun', actual: null, forecast: 1310, lower: 1230, upper: 1390 },
  ];

  // Mock seasonal patterns data
  const seasonalPatternsData = [
    { month: 'Jan', value: 0.9 },
    { month: 'Feb', value: 0.85 },
    { month: 'Mar', value: 1.1 },
    { month: 'Apr', value: 1.0 },
    { month: 'May', value: 1.05 },
    { month: 'Jun', value: 1.15 },
    { month: 'Jul', value: 1.2 },
    { month: 'Aug', value: 1.1 },
    { month: 'Sep', value: 1.0 },
    { month: 'Oct', value: 0.95 },
    { month: 'Nov', value: 1.1 },
    { month: 'Dec', value: 1.3 },
  ];

  // Mock category forecast data
  const categoryForecastData = [
    { category: 'Electronics', current: 450, forecast: 480, growth: 6.7 },
    { category: 'Raw Materials', current: 380, forecast: 420, growth: 10.5 },
    { category: 'Packaging', current: 220, forecast: 240, growth: 9.1 },
    { category: 'Services', current: 150, forecast: 160, growth: 6.7 },
    { category: 'Office Supplies', current: 80, forecast: 85, growth: 6.3 },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Demand Forecasting</h1>
        <div className="flex gap-2">
          <select
            className="select select-bordered select-sm"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="3m">Next 3 Months</option>
            <option value="6m">Next 6 Months</option>
            <option value="12m">Next 12 Months</option>
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

      {/* Forecast Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Forecast Accuracy</p>
              <h3 className="text-2xl font-bold">{metrics.accuracyRate}%</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last 30 Days
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <MdOutlineInsights className="text-primary text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Stockout Risk</p>
              <h3 className="text-2xl font-bold">{metrics.stockoutRisk} SKUs</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                High Risk Items
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-error/20 flex items-center justify-center">
              <MdOutlineWarning className="text-error text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Excess Inventory</p>
              <h3 className="text-2xl font-bold">{metrics.excessInventory}%</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Of Total Stock
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center">
              <MdOutlineInventory className="text-warning text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Forecast Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Demand Forecast</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="upper"
                  stackId="1"
                  stroke="none"
                  fill="#8884d8"
                  fillOpacity={0.2}
                />
                <Area
                  type="monotone"
                  dataKey="lower"
                  stackId="2"
                  stroke="none"
                  fill="#8884d8"
                  fillOpacity={0.2}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Seasonal Patterns</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={seasonalPatternsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0.5, 1.5]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Category Forecast Table */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Category Forecast</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-base-300 dark:border-slate-700">
                <th className="text-left p-2">Category</th>
                <th className="text-right p-2">Current Demand</th>
                <th className="text-right p-2">Forecast</th>
                <th className="text-right p-2">Growth</th>
                <th className="text-left p-2">Trend</th>
              </tr>
            </thead>
            <tbody>
              {categoryForecastData.map((item, index) => (
                <tr key={index} className="border-b border-base-300 dark:border-slate-700">
                  <td className="p-2 font-medium">{item.category}</td>
                  <td className="text-right p-2">{item.current}</td>
                  <td className="text-right p-2">{item.forecast}</td>
                  <td className="text-right p-2">
                    <span className="text-success">+{item.growth}%</span>
                  </td>
                  <td className="p-2">
                    <MdOutlineTrendingUp className="text-success text-xl" />
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

export default DemandForecasting; 