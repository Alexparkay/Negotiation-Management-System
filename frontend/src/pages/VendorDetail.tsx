import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MdOutlineArrowBack,
  MdOutlineEdit,
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineLocationOn,
  MdOutlineAttachMoney,
  MdOutlineInsights,
  MdOutlineAnalytics,
  MdOutlineTrendingUp,
  MdOutlineShoppingCart,
  MdOutlineVerified,
  MdOutlineWarning,
  MdOutlineAccessTime,
  MdOutlineArrowForward,
  MdOutlineCalendarToday,
  MdOutlineDescription,
  MdOutlineCategory,
  MdOutlinePerson,
  MdOutlineHandshake
} from 'react-icons/md';
import { 
  HiOutlineDocumentText, 
  HiOutlineChartBar,
  HiOutlineTag,
  HiOutlineChatBubbleLeftRight
} from 'react-icons/hi2';
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
  Legend
} from 'recharts';
import ChatPopup from '../components/ChatPopup';

const VendorDetail = () => {
  const { vendorId } = useParams<{ vendorId: string }>();
  const [activeTab, setActiveTab] = useState('overview');

  // This would be replaced with actual data fetching logic in a real app
  const vendor = {
    id: 1,
    name: 'TechVision Inc.',
    category: 'Electronics',
    contactPerson: 'John Richards',
    email: 'jrichards@techvision.com',
    phone: '+1-555-123-4567',
    country: 'USA',
    address: '1234 Tech Avenue, San Francisco, CA 94107',
    status: 'active',
    contractCount: 12,
    totalSpend: 1250000,
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg',
    products: ['HDMI Cables', 'USB-C Adapters', 'Power Supplies'],
    savingsRate: 16.5,
    onTimeDelivery: 95,
    qualityScore: 92,
    responseTime: '24h',
    lastNegotiation: '2024-02-15',
    yearlySpendData: [
      {year: '2020', spend: 850000},
      {year: '2021', spend: 920000},
      {year: '2022', spend: 1100000},
      {year: '2023', spend: 1250000}
    ],
    tags: ['Preferred', 'High Volume', 'Reliable'],
    description: 'TechVision Inc. is a leading supplier of electronic components and accessories. With over 15 years of industry experience, they provide high-quality products with excellent customer service.',
    contracts: [
      { id: 'C-2023-001', name: 'Annual Supply Agreement', startDate: '2023-01-15', endDate: '2024-01-14', value: 780000, status: 'active' },
      { id: 'C-2023-002', name: 'Special Project Supply', startDate: '2023-05-10', endDate: '2023-11-30', value: 320000, status: 'completed' },
      { id: 'C-2024-001', name: 'Annual Supply Agreement', startDate: '2024-01-15', endDate: '2025-01-14', value: 850000, status: 'active' }
    ],
    negotiations: [
      { id: 'N-2023-001', startDate: '2022-11-10', endDate: '2022-12-15', outcome: 'successful', savingsAchieved: 78000, products: ['HDMI Cables', 'USB-C Adapters'] },
      { id: 'N-2023-002', startDate: '2023-04-05', endDate: '2023-04-28', outcome: 'successful', savingsAchieved: 32000, products: ['Power Supplies'] },
      { id: 'N-2024-001', startDate: '2023-11-15', endDate: '2023-12-20', outcome: 'successful', savingsAchieved: 85000, products: ['HDMI Cables', 'USB-C Adapters', 'Power Supplies'] }
    ],
    priceHistory: [
      { product: 'HDMI Cables', data: [
        { date: '2022-01', price: 5.20 },
        { date: '2022-07', price: 5.10 },
        { date: '2023-01', price: 4.95 },
        { date: '2023-07', price: 4.80 },
        { date: '2024-01', price: 4.75 }
      ]},
      { product: 'USB-C Adapters', data: [
        { date: '2022-01', price: 9.50 },
        { date: '2022-07', price: 9.25 },
        { date: '2023-01', price: 9.00 },
        { date: '2023-07', price: 8.90 },
        { date: '2024-01', price: 8.75 }
      ]},
      { product: 'Power Supplies', data: [
        { date: '2022-01', price: 18.50 },
        { date: '2022-07', price: 18.20 },
        { date: '2023-01', price: 17.90 },
        { date: '2023-07', price: 17.50 },
        { date: '2024-01', price: 17.25 }
      ]}
    ],
    performanceHistory: [
      { metric: 'Quality', data: [
        { date: '2022-Q1', value: 88 },
        { date: '2022-Q2', value: 89 },
        { date: '2022-Q3', value: 90 },
        { date: '2022-Q4', value: 91 },
        { date: '2023-Q1', value: 91 },
        { date: '2023-Q2', value: 92 },
        { date: '2023-Q3', value: 92 },
        { date: '2023-Q4', value: 92 }
      ]},
      { metric: 'Delivery', data: [
        { date: '2022-Q1', value: 91 },
        { date: '2022-Q2', value: 92 },
        { date: '2022-Q3', value: 93 },
        { date: '2022-Q4', value: 94 },
        { date: '2023-Q1', value: 94 },
        { date: '2023-Q2', value: 95 },
        { date: '2023-Q3', value: 95 },
        { date: '2023-Q4', value: 95 }
      ]},
      { metric: 'Response Time', data: [
        { date: '2022-Q1', value: 36 },
        { date: '2022-Q2', value: 32 },
        { date: '2022-Q3', value: 28 },
        { date: '2022-Q4', value: 26 },
        { date: '2023-Q1', value: 26 },
        { date: '2023-Q2', value: 24 },
        { date: '2023-Q3', value: 24 },
        { date: '2023-Q4', value: 24 }
      ]}
    ]
  };

  // Function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Function to calculate total savings
  const calculateTotalSavings = () => {
    return vendor.negotiations.reduce((total, neg) => total + neg.savingsAchieved, 0);
  };

  // Colors for charts
  const colors = {
    primary: '#3B82F6',   // blue
    secondary: '#10B981', // green
    warning: '#F59E0B',   // amber
    error: '#EF4444',     // red
    info: '#8B5CF6',      // purple
  };

  // Render the overview tab content
  const renderOverviewTab = () => {
    return (
      <div className="space-y-6">
        {/* Vendor Header Card */}
        <div className="glass-panel p-6 rounded-xl">
          <div className="flex items-start">
            <div className="w-28 h-28 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center overflow-hidden mr-6 shadow-md p-3">
              <img src={vendor.logoUrl} alt={vendor.name} className="w-full h-full object-contain" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-2">
                {vendor.tags.map((tag, index) => (
                  <span key={index} className="badge badge-primary">{tag}</span>
                ))}
              </div>
              <p className="text-base text-text-secondary mb-3">{vendor.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <MdOutlinePerson className="text-text-muted mr-2" />
                  <span className="text-text-secondary">{vendor.contactPerson}</span>
                </div>
                <div className="flex items-center">
                  <MdOutlineEmail className="text-text-muted mr-2" />
                  <span className="text-text-secondary">{vendor.email}</span>
                </div>
                <div className="flex items-center">
                  <MdOutlinePhone className="text-text-muted mr-2" />
                  <span className="text-text-secondary">{vendor.phone}</span>
                </div>
                <div className="flex items-center">
                  <MdOutlineLocationOn className="text-text-muted mr-2" />
                  <span className="text-text-secondary">{vendor.address}</span>
                </div>
                <div className="flex items-center">
                  <MdOutlineCategory className="text-text-muted mr-2" />
                  <span className="text-text-secondary">{vendor.category}</span>
                </div>
                <div className="flex items-center">
                  <MdOutlineCalendarToday className="text-text-muted mr-2" />
                  <span className="text-text-secondary">Last Negotiation: {vendor.lastNegotiation}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-5 rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-text-muted mb-1">Total Spend (2023)</p>
                <h3 className="text-2xl font-bold text-text-primary">{formatCurrency(vendor.totalSpend)}</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-accent-primary/20 flex items-center justify-center">
                <MdOutlineAttachMoney className="text-accent-primary text-2xl" />
              </div>
            </div>
            <div className="flex items-center text-xs">
              <span className="flex items-center text-accent-secondary">
                <MdOutlineTrendingUp className="mr-1" /> 
                +{((vendor.totalSpend - vendor.yearlySpendData[2].spend) / vendor.yearlySpendData[2].spend * 100).toFixed(1)}%
              </span>
              <span className="text-text-muted ml-2">vs previous year</span>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-text-muted mb-1">Savings Rate</p>
                <h3 className="text-2xl font-bold text-accent-secondary">{vendor.savingsRate}%</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-accent-secondary/20 flex items-center justify-center">
                <MdOutlineInsights className="text-accent-secondary text-2xl" />
              </div>
            </div>
            <div className="flex items-center text-xs">
              <span className="text-text-muted">
                Total savings: {formatCurrency(calculateTotalSavings())}
              </span>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-text-muted mb-1">Quality Score</p>
                <h3 className="text-2xl font-bold text-text-primary">{vendor.qualityScore}/100</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <MdOutlineVerified className="text-blue-500 text-2xl" />
              </div>
            </div>
            <div className="flex items-center text-xs">
              <span className="flex items-center text-accent-secondary">
                <MdOutlineTrendingUp className="mr-1" /> +4
              </span>
              <span className="text-text-muted ml-2">over last 2 years</span>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-text-muted mb-1">On-Time Delivery</p>
                <h3 className="text-2xl font-bold text-text-primary">{vendor.onTimeDelivery}%</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <MdOutlineAccessTime className="text-purple-500 text-2xl" />
              </div>
            </div>
            <div className="flex items-center text-xs">
              <span className="text-text-muted">Response Time: {vendor.responseTime}</span>
            </div>
          </div>
        </div>

        {/* Annual Spend Chart */}
        <div className="glass-panel p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Annual Spend History</h3>
            <Link to="/spend-analysis" className="text-accent-primary hover:underline text-sm flex items-center gap-1">
              View Spend Analysis <MdOutlineArrowForward />
            </Link>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={vendor.yearlySpendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={colors.primary} stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Annual Spend']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(26, 26, 26, 0.8)', 
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '8px' 
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="spend" 
                  stroke={colors.primary} 
                  fillOpacity={1} 
                  fill="url(#colorSpend)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Products and Contracts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Products List */}
          <div className="glass-panel p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Products Supplied</h3>
              <Link to="/product-categories" className="text-accent-primary hover:underline text-sm flex items-center gap-1">
                View All Products <MdOutlineArrowForward />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Current Price</th>
                    <th>Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {vendor.priceHistory.map((product, index) => (
                    <tr key={index} className="hover">
                      <td>{product.product}</td>
                      <td>{`$${product.data[product.data.length - 1].price.toFixed(2)}`}</td>
                      <td>
                        <div className="flex items-center">
                          {product.data[0].price > product.data[product.data.length - 1].price ? (
                            <>
                              <span className="text-accent-secondary mr-1">
                                <MdOutlineTrendingUp />
                              </span>
                              <span className="text-xs text-accent-secondary">
                                -{(((product.data[0].price - product.data[product.data.length - 1].price) / product.data[0].price) * 100).toFixed(1)}%
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="text-error mr-1">
                                <MdOutlineTrendingUp className="transform rotate-180" />
                              </span>
                              <span className="text-xs text-error">
                                +{(((product.data[product.data.length - 1].price - product.data[0].price) / product.data[0].price) * 100).toFixed(1)}%
                              </span>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Contracts */}
          <div className="glass-panel p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Recent Contracts</h3>
              <Link to="/contracts" className="text-accent-primary hover:underline text-sm flex items-center gap-1">
                View All Contracts <MdOutlineArrowForward />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Contract ID</th>
                    <th>Period</th>
                    <th>Value</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {vendor.contracts.map((contract, index) => (
                    <tr key={index} className="hover">
                      <td>{contract.id}</td>
                      <td className="text-sm">{contract.startDate} - {contract.endDate}</td>
                      <td>{formatCurrency(contract.value)}</td>
                      <td>
                        <span className={`badge ${contract.status === 'active' ? 'badge-success' : 'badge-ghost'}`}>
                          {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Negotiations */}
        <div className="glass-panel p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Recent Negotiations</h3>
            <Link to="/active-negotiations" className="text-accent-primary hover:underline text-sm flex items-center gap-1">
              View All Negotiations <MdOutlineArrowForward />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Period</th>
                  <th>Products</th>
                  <th>Outcome</th>
                  <th>Savings</th>
                </tr>
              </thead>
              <tbody>
                {vendor.negotiations.map((negotiation, index) => (
                  <tr key={index} className="hover">
                    <td>{negotiation.id}</td>
                    <td className="text-sm">{negotiation.startDate} - {negotiation.endDate}</td>
                    <td className="text-sm">
                      <div className="flex flex-wrap gap-1">
                        {negotiation.products.map((product, idx) => (
                          <span key={idx} className="badge badge-sm badge-outline">{product}</span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${negotiation.outcome === 'successful' ? 'badge-success' : 'badge-warning'}`}>
                        {negotiation.outcome.charAt(0).toUpperCase() + negotiation.outcome.slice(1)}
                      </span>
                    </td>
                    <td className="text-accent-secondary font-medium">{formatCurrency(negotiation.savingsAchieved)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-end">
          <button className="btn btn-outline flex items-center gap-2">
            <HiOutlineChatBubbleLeftRight className="text-lg" />
            Contact Vendor
          </button>
          <button className="btn btn-primary flex items-center gap-2">
            <MdOutlineHandshake className="text-lg" />
            Start New Negotiation
          </button>
        </div>
      </div>
    );
  };

  // Render other tabs (simplified for now)
  const renderPlaceholderTab = (tabName: string) => {
    return (
      <div className="glass-panel p-8 rounded-xl text-center mb-6">
        <h2 className="text-2xl font-semibold text-text-primary mb-4">{vendor.name} - {tabName} Tab</h2>
        <p className="text-text-secondary mb-6">
          This is a placeholder for the {tabName} content. In a complete implementation, this would show detailed {tabName.toLowerCase()} data.
        </p>
        <div className="flex justify-center gap-4">
          <button className="btn btn-primary">View Details</button>
        </div>
      </div>
    );
  };

  // Render the appropriate tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'negotiations':
        return renderPlaceholderTab('Negotiations');
      case 'pricing':
        return renderPlaceholderTab('Pricing History');
      case 'performance':
        return renderPlaceholderTab('Performance');
      case 'contracts':
        return renderPlaceholderTab('Contracts');
      default:
        return renderOverviewTab();
    }
  };

  return (
    <div className="w-full">
      {/* Vendor Detail Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Link to="/vendors" className="btn btn-ghost btn-sm">
            <MdOutlineArrowBack className="text-xl" />
          </Link>
          <h1 className="text-3xl font-semibold text-text-primary">{vendor.name}</h1>
          <span className={`badge ${vendor.status === 'active' ? 'badge-success' : vendor.status === 'inactive' ? 'badge-warning' : 'badge-error'}`}>
            {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
          </span>
        </div>
        <button className="btn btn-primary btn-sm flex items-center gap-2">
          <MdOutlineEdit className="text-lg" /> Edit Vendor
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="tabs tabs-boxed mb-6 bg-base-200/50 p-1 rounded-xl w-fit">
        <button 
          className={`tab ${activeTab === 'overview' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'negotiations' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('negotiations')}
        >
          Negotiations
        </button>
        <button 
          className={`tab ${activeTab === 'pricing' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('pricing')}
        >
          Pricing History
        </button>
        <button 
          className={`tab ${activeTab === 'performance' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('performance')}
        >
          Performance
        </button>
        <button 
          className={`tab ${activeTab === 'contracts' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('contracts')}
        >
          Contracts
        </button>
      </div>

      {/* Main Content Area */}
      {renderTabContent()}

      <ChatPopup />
    </div>
  );
};

export default VendorDetail;
