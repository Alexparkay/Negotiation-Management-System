import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MdOutlineAddCircle, 
  MdOutlineEdit, 
  MdOutlineDelete, 
  MdOutlineVisibility, 
  MdOutlineCategory, 
  MdOutlineAttachMoney, 
  MdOutlineBusinessCenter,
  MdOutlineSearch,
  MdOutlineFilterList,
  MdOutlineSort,
  MdOutlineVerified,
  MdOutlineWarning,
  MdOutlineMoreHoriz,
  MdOutlineAssessment,
  MdOutlineShoppingCart,
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineLocationOn,
  MdOutlineTrendingUp,
  MdOutlineTrendingDown,
  MdOutlineArrowForward
} from 'react-icons/md';
import { 
  HiOutlineDocumentText, 
  HiOutlineShieldCheck, 
  HiOutlineScale,
  HiOutlineChartBar
} from 'react-icons/hi2';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell 
} from 'recharts';
import ChatPopup from '../components/ChatPopup';

interface Vendor {
  id: number;
  name: string;
  category: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  status: 'active' | 'inactive' | 'pending' | 'blacklisted';
  contractCount: number;
  totalSpend: number;
  logoUrl: string;
  products: string[];
  savingsRate: number;
  onTimeDelivery: number;
  qualityScore: number;
  responseTime: string;
  lastNegotiation: string;
  yearlySpendData: Array<{year: string, spend: number}>;
  tags: string[];
}

// Function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const Vendors = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedVendor, setExpandedVendor] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for vendors with enhanced fields
  const vendors: Vendor[] = [
    {
      id: 1,
      name: 'TechVision Inc.',
      category: 'Electronics',
      contactPerson: 'John Richards',
      email: 'jrichards@techvision.com',
      phone: '+1-555-123-4567',
      country: 'USA',
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
      tags: ['Preferred', 'High Volume', 'Reliable']
    },
    {
      id: 2,
      name: 'NetWare Solutions',
      category: 'Networking',
      contactPerson: 'Sarah Connors',
      email: 'sconnors@netware.com',
      phone: '+44-20-1234-5678',
      country: 'UK',
      status: 'active',
      contractCount: 8,
      totalSpend: 980000,
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cisco/cisco-original.svg',
      products: ['Ethernet Cables', 'RJ45 Connectors', 'Network Switches'],
      savingsRate: 12.8,
      onTimeDelivery: 88,
      qualityScore: 95,
      responseTime: '48h',
      lastNegotiation: '2024-01-20',
      yearlySpendData: [
        {year: '2020', spend: 720000},
        {year: '2021', spend: 790000},
        {year: '2022', spend: 850000},
        {year: '2023', spend: 980000}
      ],
      tags: ['Technical Expertise', 'Premium Quality']
    },
    {
      id: 3,
      name: 'DataSphere Systems',
      category: 'Computer Hardware',
      contactPerson: 'Michael Chen',
      email: 'mchen@datasphere.com',
      phone: '+1-555-987-6543',
      country: 'USA',
      status: 'active',
      contractCount: 15,
      totalSpend: 1650000,
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
      products: ['Hard Drives', 'SSDs', 'Memory Modules'],
      savingsRate: 14.2,
      onTimeDelivery: 92,
      qualityScore: 85,
      responseTime: '36h',
      lastNegotiation: '2024-03-01',
      yearlySpendData: [
        {year: '2020', spend: 1200000},
        {year: '2021', spend: 1350000},
        {year: '2022', spend: 1500000},
        {year: '2023', spend: 1650000}
      ],
      tags: ['High Volume', 'Hardware Specialist']
    },
    {
      id: 4,
      name: 'GlobalConnect Ltd',
      category: 'Peripherals',
      contactPerson: 'Robert Wilson',
      email: 'rwilson@globalconnect.com',
      phone: '+61-2-9876-5432',
      country: 'Australia',
      status: 'inactive',
      contractCount: 5,
      totalSpend: 520000,
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firefox/firefox-original.svg',
      products: ['Keyboards', 'Mice', 'Monitors'],
      savingsRate: 10.5,
      onTimeDelivery: 94,
      qualityScore: 90,
      responseTime: '72h',
      lastNegotiation: '2023-11-15',
      yearlySpendData: [
        {year: '2020', spend: 380000},
        {year: '2021', spend: 420000},
        {year: '2022', spend: 480000},
        {year: '2023', spend: 520000}
      ],
      tags: ['International', 'Wide Range']
    },
    {
      id: 5,
      name: 'FiberTech',
      category: 'Networking',
      contactPerson: 'Lisa Green',
      email: 'lgreen@fibertech.com',
      phone: '+1-555-789-0123',
      country: 'Canada',
      status: 'pending',
      contractCount: 3,
      totalSpend: 350000,
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg',
      products: ['Fiber Optic Cables', 'Connector Assemblies', 'Patch Panels'],
      savingsRate: 9.8,
      onTimeDelivery: 90,
      qualityScore: 87,
      responseTime: '48h',
      lastNegotiation: '2024-02-28',
      yearlySpendData: [
        {year: '2020', spend: 0},
        {year: '2021', spend: 180000},
        {year: '2022', spend: 260000},
        {year: '2023', spend: 350000}
      ],
      tags: ['New Partner', 'Fiber Specialist']
    },
    {
      id: 6,
      name: 'SecureIT Solutions',
      category: 'Security',
      contactPerson: 'David Rivera',
      email: 'drivera@secureit.com',
      phone: '+49-30-1234-5678',
      country: 'Germany',
      status: 'active',
      contractCount: 7,
      totalSpend: 880000,
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
      products: ['Security Cameras', 'Access Control Systems', 'Alarm Systems'],
      savingsRate: 11.2,
      onTimeDelivery: 96,
      qualityScore: 91,
      responseTime: '24h',
      lastNegotiation: '2023-12-10',
      yearlySpendData: [
        {year: '2020', spend: 620000},
        {year: '2021', spend: 700000},
        {year: '2022', spend: 790000},
        {year: '2023', spend: 880000}
      ],
      tags: ['Security Certified', 'Reliable']
    },
    {
      id: 7,
      name: 'Quantum Supplies',
      category: 'Cables',
      contactPerson: 'Mark Johnson',
      email: 'mjohnson@quantumsupplies.com',
      phone: '+1-555-456-7890',
      country: 'USA',
      status: 'blacklisted',
      contractCount: 2,
      totalSpend: 155000,
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg',
      products: ['USB Cables', 'Display Cables', 'Audio Cables'],
      savingsRate: 0,
      onTimeDelivery: 65,
      qualityScore: 58,
      responseTime: '96h',
      lastNegotiation: '2023-09-05',
      yearlySpendData: [
        {year: '2020', spend: 0},
        {year: '2021', spend: 0},
        {year: '2022', spend: 95000},
        {year: '2023', spend: 155000}
      ],
      tags: ['Quality Issues', 'Late Deliveries']
    }
  ];

  // Calculate summary data
  const totalVendors = vendors.length;
  const activeVendors = vendors.filter(v => v.status === 'active').length;
  const totalSpend = vendors.reduce((sum, v) => sum + v.totalSpend, 0);
  const avgSavingsRate = vendors.filter(v => v.status === 'active')
    .reduce((sum, v) => sum + v.savingsRate, 0) / activeVendors;

  // Category distribution for chart
  const categoryData = vendors.reduce((acc, vendor) => {
    acc[vendor.category] = (acc[vendor.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryChartData = Object.entries(categoryData).map(([name, value]) => ({
    name, value
  }));

  const categoryColors = [
    '#3B82F6', // blue
    '#10B981', // green
    '#F59E0B', // amber
    '#EF4444', // red
    '#8B5CF6', // purple
    '#EC4899', // pink
    '#6B7280', // gray
  ];

  // Status distribution for chart
  const statusData = vendors.reduce((acc, vendor) => {
    acc[vendor.status] = (acc[vendor.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusChartData = Object.entries(statusData).map(([name, value]) => ({
    name, value
  }));

  const statusColors = {
    active: '#10B981',    // green
    inactive: '#F59E0B',  // amber
    pending: '#3B82F6',   // blue
    blacklisted: '#EF4444' // red
  };

  // Filter vendors based on selected status, category, and search query
  const filteredVendors = vendors.filter(vendor => 
    (selectedStatus === 'all' || vendor.status === selectedStatus) &&
    (selectedCategory === 'all' || vendor.category === selectedCategory) &&
    (searchQuery === '' || 
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      vendor.products.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  // Status options and categories for filters
  const statusOptions = ['all', 'active', 'inactive', 'pending', 'blacklisted'];
  const categories = [...new Set(vendors.map(v => v.category))];
  categories.unshift('all');

  // Function to get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'active': return 'badge-success';
      case 'inactive': return 'badge-warning';
      case 'pending': return 'badge-info';
      case 'blacklisted': return 'badge-error';
      default: return 'badge-ghost';
    }
  };

  // Function to toggle vendor details
  const toggleVendorDetails = (vendorId: number) => {
    if (expandedVendor === vendorId) {
      setExpandedVendor(null);
    } else {
      setExpandedVendor(vendorId);
    }
  };

  // Function to render vendor grid item
  const renderVendorGridItem = (vendor: Vendor) => (
    <Link to={`/vendors/${vendor.id}`} key={vendor.id} className="glass-panel p-0 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center overflow-hidden shadow-md p-2">
            <img src={vendor.logoUrl} alt={vendor.name} className="w-full h-full object-contain" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{vendor.name}</h3>
            <p className="text-sm text-text-muted">{vendor.category}</p>
          </div>
          <span className={`badge ${getStatusBadgeColor(vendor.status)} ml-auto`}>
            {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-xs text-text-muted mb-1">Savings Rate</p>
            <p className="text-xl font-semibold text-accent-secondary flex items-center">
              {vendor.savingsRate}% 
              <MdOutlineTrendingUp className="ml-1 text-accent-secondary" />
            </p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">Quality Score</p>
            <p className="text-xl font-semibold text-text-primary">{vendor.qualityScore}/100</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">On-Time Delivery</p>
            <p className="text-xl font-semibold text-text-primary">{vendor.onTimeDelivery}%</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">Response Time</p>
            <p className="text-xl font-semibold text-text-primary">{vendor.responseTime}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-xs text-text-muted mb-1">Products</p>
          <div className="flex flex-wrap gap-2">
            {vendor.products.map((product, index) => (
              <span key={index} className="badge badge-outline badge-sm">{product}</span>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-text-muted">
            <span className="flex items-center"><MdOutlineShoppingCart className="mr-1" /> {vendor.contractCount} contracts</span>
          </div>
          <button className="btn btn-sm btn-ghost text-accent-primary">
            View Details <MdOutlineArrowForward />
          </button>
        </div>
      </div>
      
      <div className="h-20 bg-base-300/30 p-4">
        <div className="flex justify-between items-center h-full">
          <div>
            <p className="text-xs text-text-muted">Total Spend (2023)</p>
            <p className="text-lg font-semibold text-text-primary">{formatCurrency(vendor.totalSpend)}</p>
          </div>
          <div className="h-full">
            <ResponsiveContainer width={120} height="100%">
              <BarChart data={vendor.yearlySpendData}>
                <Bar dataKey="spend" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="w-full p-0 m-0">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-text-primary">Vendor Directory</h1>
          <button className="btn btn-primary flex items-center gap-2">
            <MdOutlineAddCircle className="text-xl" />
            Add New Vendor
          </button>
        </div>

        {/* Vendor Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-text-muted mb-1">Total Vendors</p>
                <h3 className="text-3xl font-bold text-text-primary">{totalVendors}</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-accent-primary/20 flex items-center justify-center">
                <MdOutlineBusinessCenter className="text-accent-primary text-2xl" />
              </div>
            </div>
            <div className="flex items-center text-xs">
              <span className="flex items-center text-accent-secondary"><MdOutlineTrendingUp /> +5</span>
              <span className="text-text-muted ml-2">vs last quarter</span>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-text-muted mb-1">Active Vendors</p>
                <h3 className="text-3xl font-bold text-accent-secondary">{activeVendors}</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-accent-secondary/20 flex items-center justify-center">
                <MdOutlineVerified className="text-accent-secondary text-2xl" />
              </div>
            </div>
            <div className="flex items-center text-xs">
              <span className="flex items-center text-accent-secondary"><MdOutlineTrendingUp /> +2</span>
              <span className="text-text-muted ml-2">new this month</span>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-text-muted mb-1">Avg. Savings Rate</p>
                <h3 className="text-3xl font-bold text-text-primary">{avgSavingsRate.toFixed(1)}%</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-accent-primary/20 flex items-center justify-center">
                <MdOutlineAttachMoney className="text-accent-primary text-2xl" />
              </div>
            </div>
            <div className="flex items-center text-xs">
              <span className="flex items-center text-accent-secondary"><MdOutlineTrendingUp /> +1.2%</span>
              <span className="text-text-muted ml-2">vs last year</span>
            </div>
          </div>
          
          <div className="glass-panel p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-text-muted mb-1">Total Annual Spend</p>
                <h3 className="text-3xl font-bold text-text-primary">{formatCurrency(totalSpend)}</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <HiOutlineChartBar className="text-blue-500 text-2xl" />
              </div>
            </div>
            <div className="flex items-center text-xs">
              <span className="flex items-center text-accent-secondary"><MdOutlineTrendingUp /> +8.5%</span>
              <span className="text-text-muted ml-2">YoY increase</span>
            </div>
          </div>
        </div>

        {/* Chart Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Vendors by Category</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    label={({name}) => name}
                    labelLine={true}
                  >
                    {categoryChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={categoryColors[index % categoryColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [value, 'Vendors']}
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
          </div>
          
          <div className="glass-panel p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Vendors by Status</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={true}
                  >
                    {statusChartData.map((entry) => (
                      <Cell key={`cell-${entry.name}`} fill={statusColors[entry.name as keyof typeof statusColors]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [value, 'Vendors']}
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
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="glass-panel p-6 rounded-xl">
          <div className="flex flex-col lg:flex-row justify-between gap-4">
            <div className="relative flex-grow max-w-xl">
              <MdOutlineSearch className="absolute left-4 top-3 text-xl text-text-muted" />
              <input 
                type="text" 
                placeholder="Search vendors or products..." 
                className="input input-bordered pl-12 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-4 flex-wrap">
              <div className="flex gap-2 items-center bg-base-300/30 px-3 py-2 rounded-lg">
                <MdOutlineFilterList className="text-xl text-text-muted" />
            <select 
                  className="select select-ghost w-full max-w-xs focus:outline-none focus:bg-transparent text-sm" 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
              <div className="flex gap-2 items-center bg-base-300/30 px-3 py-2 rounded-lg">
                <MdOutlineCategory className="text-xl text-text-muted" />
            <select 
                  className="select select-ghost w-full max-w-xs focus:outline-none focus:bg-transparent text-sm" 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
              </div>
              
              <div className="flex gap-3">
                <button 
                  className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setViewMode('grid')}
                >
                  Grid View
                </button>
                <button 
                  className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setViewMode('list')}
                >
                  List View
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Vendor Grid/List Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
            {filteredVendors.map(vendor => renderVendorGridItem(vendor))}
          </div>
        ) : (
          <div className="overflow-x-auto mb-6">
            <table className="table w-full glass-panel rounded-xl">
            <thead>
              <tr>
                  <th>Vendor</th>
                <th>Category</th>
                  <th>Contact</th>
                <th>Status</th>
                  <th>Performance</th>
                  <th>Spend (2023)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.map(vendor => (
                  <tr key={vendor.id} className="hover">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center overflow-hidden shadow-md p-2">
                          <img src={vendor.logoUrl} alt={vendor.name} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <div className="font-semibold">{vendor.name}</div>
                          <div className="text-xs opacity-60">{vendor.products.length} products</div>
                        </div>
                      </div>
                    </td>
                    <td>{vendor.category}</td>
                    <td>
                      <div className="flex flex-col">
                        <span>{vendor.contactPerson}</span>
                        <span className="text-xs opacity-60">{vendor.email}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadgeColor(vendor.status)}`}>
                        {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <div className="badge badge-sm" style={{backgroundColor: vendor.qualityScore > 90 ? '#10B981' : vendor.qualityScore > 80 ? '#F59E0B' : '#EF4444'}}>
                          {vendor.qualityScore}%
                        </div>
                        <span className="text-xs opacity-60">quality</span>
                      </div>
                    </td>
                    <td>{formatCurrency(vendor.totalSpend)}</td>
                    <td>
                      <div className="flex gap-1">
                        <Link to={`/vendors/${vendor.id}`} className="btn btn-sm btn-ghost">
                          <MdOutlineVisibility className="text-lg" />
                        </Link>
                        <button className="btn btn-sm btn-ghost">
                          <MdOutlineEdit className="text-lg" />
                        </button>
                        <button className="btn btn-sm btn-ghost text-error">
                          <MdOutlineDelete className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
      <ChatPopup />
    </div>
  );
};

export default Vendors; 