import { useParams } from 'react-router-dom';
import { useState } from 'react';
import {
  MdOutlineLocationOn,
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineDescription,
  MdOutlineAttachMoney,
  MdOutlineAnalytics,
  MdOutlineWarning,
  MdOutlineShoppingCart,
  MdOutlineReceiptLong,
  MdOutlineSchedule,
  MdOutlineEdit,
  MdOutlineDelete,
} from 'react-icons/md';
import { HiOutlineShieldCheck } from 'react-icons/hi2';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

// Types from Suppliers.tsx
type SupplierStatus = 'active' | 'pending' | 'high-risk';
type RiskLevel = 'low' | 'medium' | 'high';
type OnboardingStage = 'application' | 'vetting' | 'approval' | 'completed';

interface Supplier {
  id: number;
  name: string;
  category: string;
  status: SupplierStatus;
  performance: number;
  spend: number;
  location: string;
  contact: string;
  onboardingStage: OnboardingStage;
  riskLevel: RiskLevel;
}

const SupplierDetail = () => {
  const { supplierId } = useParams();

  // Mock supplier data (in a real app, this would come from an API)
  const supplier: Supplier = {
    id: parseInt(supplierId || '1'),
    name: 'Acme Electronics',
    category: 'Electronics',
    status: 'active',
    performance: 92,
    spend: 1250000,
    location: 'San Francisco, CA',
    contact: 'john.doe@acme.com',
    onboardingStage: 'completed',
    riskLevel: 'low',
  };

  // Mock performance data
  const performanceData = [
    { month: 'Jan', score: 88 },
    { month: 'Feb', score: 85 },
    { month: 'Mar', score: 90 },
    { month: 'Apr', score: 92 },
    { month: 'May', score: 89 },
    { month: 'Jun', score: 94 },
  ];

  // Mock spend data
  const spendData = [
    { month: 'Jan', amount: 98000 },
    { month: 'Feb', amount: 115000 },
    { month: 'Mar', amount: 102000 },
    { month: 'Apr', amount: 108000 },
    { month: 'May', amount: 125000 },
    { month: 'Jun', amount: 118000 },
  ];

  // Mock orders data
  const recentOrders = [
    { id: 1, date: '2024-03-05', items: 12, total: 45000, status: 'Delivered' },
    { id: 2, date: '2024-03-03', items: 8, total: 32000, status: 'In Transit' },
    { id: 3, date: '2024-02-28', items: 15, total: 58000, status: 'Delivered' },
    { id: 4, date: '2024-02-25', items: 10, total: 41000, status: 'Delivered' },
  ];

  // Mock compliance data
  const complianceItems = [
    { name: 'Quality Certification', status: 'Valid', expiry: '2025-12-31' },
    { name: 'Insurance Coverage', status: 'Valid', expiry: '2024-12-31' },
    { name: 'Safety Standards', status: 'Valid', expiry: '2024-09-30' },
    { name: 'Environmental Compliance', status: 'Valid', expiry: '2024-12-31' },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{supplier.name}</h1>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <MdOutlineLocationOn />
            <span>{supplier.location}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline btn-sm">
            <MdOutlineEdit className="mr-1" /> Edit
          </button>
          <button className="btn btn-error btn-sm">
            <MdOutlineDelete className="mr-1" /> Delete
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Performance Score</p>
              <h3 className="text-2xl font-bold">{supplier.performance}%</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <MdOutlineAnalytics className="text-primary text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Annual Spend</p>
              <h3 className="text-2xl font-bold">${supplier.spend.toLocaleString()}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
              <MdOutlineAttachMoney className="text-success text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Risk Level</p>
              <h3 className="text-2xl font-bold capitalize">{supplier.riskLevel}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center">
              <MdOutlineWarning className="text-warning text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
              <h3 className="text-2xl font-bold">{supplier.category}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-info/20 flex items-center justify-center">
              <MdOutlineDescription className="text-info text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Performance Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <XAxis dataKey="month" />
                <YAxis domain={[60, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  dot={{ stroke: '#8884d8', strokeWidth: 2, r: 4, fill: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Monthly Spend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spendData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#36d399" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Orders and Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-base-300 dark:border-slate-700">
                  <th className="text-left p-2">Date</th>
                  <th className="text-right p-2">Items</th>
                  <th className="text-right p-2">Total</th>
                  <th className="text-left p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-base-300 dark:border-slate-700">
                    <td className="p-2">{order.date}</td>
                    <td className="text-right p-2">{order.items}</td>
                    <td className="text-right p-2">${order.total.toLocaleString()}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Compliance & Certifications</h2>
          <div className="space-y-4">
            {complianceItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-base-200 dark:bg-slate-700 rounded-lg">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Expires: {item.expiry}</p>
                </div>
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetail; 