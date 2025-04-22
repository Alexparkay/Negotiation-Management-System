import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MdOutlineHistory,
  MdOutlineSearch,
  MdOutlineFilterList,
  MdOutlineCalendarToday,
  MdOutlineSort,
  MdOutlineAttachMoney,
  MdOutlineTrendingUp,
  MdOutlineTrendingDown,
  MdOutlineInsights,
  MdOutlineReceipt,
  MdOutlineCheckCircle,
  MdOutlineAccessTime,
  MdOutlineCancel,
  MdOutlineMessage,
  MdOutlineDescription,
  MdOutlineInventory,
  MdOutlineArrowForward,
  MdOutlineFileDownload,
  MdOutlineInfo
} from 'react-icons/md';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar
} from 'recharts';
import { format, parseISO } from 'date-fns';
import ChatPopup from '../components/ChatPopup';

interface Negotiation {
  id: string;
  title: string;
  vendor: string;
  vendorId: string;
  status: 'completed' | 'rejected' | 'expired';
  category: string;
  startDate: string;
  endDate: string;
  initialPrice: number;
  finalPrice: number;
  savings: number;
  savingsPercent: number;
  items: number;
  messages: number;
  documents: number;
  notes: string;
}

const NegotiationHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date_desc');
  const [selectedNegotiation, setSelectedNegotiation] = useState<string | null>(null);
  
  // Mock negotiation history data based on Aldi tenders
  const negotiations: Negotiation[] = [
    {
      id: 'T2025-201',
      title: 'Coffee Supply Agreement',
      vendor: 'Angola Coffee Imports',
      vendorId: 'vendor-201',
      status: 'completed',
      category: 'Drinks',
      startDate: '2025-04-10T10:00:00Z',
      endDate: '2025-04-20T16:30:00Z',
      initialPrice: 148500,
      finalPrice: 132000,
      savings: 16500,
      savingsPercent: 11.1,
      items: 1,
      messages: 38,
      documents: 6,
      notes: 'Successfully negotiated bulk discount and expedited shipping for 14kg, 3-pack coffee products. Vendor committed to maintaining Imported quality standards.'
    },
    {
      id: 'T2025-202',
      title: 'Health & Beauty Products - Conditioner',
      vendor: 'Greece Beauty Products',
      vendorId: 'vendor-202',
      status: 'completed',
      category: 'Health & Beauty',
      startDate: '2025-04-13T09:15:00Z',
      endDate: '2025-04-23T14:45:00Z',
      initialPrice: 78500,
      finalPrice: 72000,
      savings: 6500,
      savingsPercent: 8.3,
      items: 1,
      messages: 27,
      documents: 4,
      notes: 'Value line conditioner supply agreement with favorable payment terms. Price negotiated down for 10kg, 2-pack products with chilled storage requirements.'
    },
    {
      id: 'T2025-203',
      title: 'Fresh Produce - Oranges',
      vendor: 'Burkina Faso Fruits',
      vendorId: 'vendor-203',
      status: 'rejected',
      category: 'Fruits & Vegetables',
      startDate: '2025-03-25T08:00:00Z',
      endDate: '2025-04-04T11:30:00Z',
      initialPrice: 92000,
      finalPrice: 92000,
      savings: 0,
      savingsPercent: 0,
      items: 1,
      messages: 32,
      documents: 5,
      notes: 'Could not reach agreement on delivery schedule or price. Vendor unwilling to meet our standards for value-line oranges. 13kg, 2-pack products with chilled storage requirements.'
    },
    {
      id: 'T2025-204',
      title: 'Organic Deodorant Supply',
      vendor: 'Estonia Natural Products',
      vendorId: 'vendor-204',
      status: 'completed',
      category: 'Health & Beauty',
      startDate: '2025-03-28T13:20:00Z',
      endDate: '2025-04-07T17:15:00Z',
      initialPrice: 68000,
      finalPrice: 59800,
      savings: 8200,
      savingsPercent: 12.1,
      items: 1,
      messages: 24,
      documents: 3,
      notes: 'Secured organic deodorant products with sustainability certification. 6kg, 2-pack ambient storage products with excellent pricing and delivery terms.'
    },
    {
      id: 'T2025-205',
      title: 'Premium Moisturizer Contract',
      vendor: 'Costa Rica Cosmetics',
      vendorId: 'vendor-205',
      status: 'expired',
      category: 'Health & Beauty',
      startDate: '2025-04-04T10:30:00Z',
      endDate: '2025-04-14T10:30:00Z',
      initialPrice: 124000,
      finalPrice: 124000,
      savings: 0,
      savingsPercent: 0,
      items: 1,
      messages: 18,
      documents: 4,
      notes: 'Negotiation time limit expired before reaching agreement on premium moisturizer line. 16kg, 3-pack chilled storage requirements were a complicating factor.'
    },
    {
      id: 'T2025-206',
      title: 'Deli Meats - Pepperoni',
      vendor: 'Bosnia Herzegovina Meats',
      vendorId: 'vendor-206',
      status: 'completed',
      category: 'Deli & Chilled Meats',
      startDate: '2025-04-14T09:00:00Z',
      endDate: '2025-04-24T15:45:00Z',
      initialPrice: 95000,
      finalPrice: 85500,
      savings: 9500,
      savingsPercent: 10.0,
      items: 1,
      messages: 29,
      documents: 5,
      notes: 'Value line pepperoni with favorable quality control metrics. 18kg, 3-pack products in box packaging with chilled storage requirements met our standards.'
    },
    {
      id: 'T2025-207',
      title: 'Imported Shampoo Products',
      vendor: 'Cambodia Beauty Essentials',
      vendorId: 'vendor-207',
      status: 'rejected',
      category: 'Health & Beauty',
      startDate: '2025-03-19T11:15:00Z',
      endDate: '2025-03-29T16:20:00Z',
      initialPrice: 108000,
      finalPrice: 102500,
      savings: 5500,
      savingsPercent: 5.1,
      items: 1,
      messages: 21,
      documents: 3,
      notes: 'Quality standards for shampoo products (6kg, 4-pack) could not be guaranteed by vendor. Alternate supplier being sourced for imported line.'
    },
    {
      id: 'T2025-208',
      title: 'Fresh Produce - Tomatoes',
      vendor: 'Somalia Fresh Produce',
      vendorId: 'vendor-208',
      status: 'completed',
      category: 'Fruits & Vegetables',
      startDate: '2025-03-27T13:00:00Z',
      endDate: '2025-04-06T17:30:00Z',
      initialPrice: 74000,
      finalPrice: 65000,
      savings: 9000,
      savingsPercent: 12.2,
      items: 1,
      messages: 26,
      documents: 4,
      notes: 'Excellent value tomato products with favorable pricing. 20kg, 1-pack pallet products requiring frozen storage with quick delivery timeline.'
    },
  ];

  // Filter negotiations
  const filteredNegotiations = negotiations.filter(negotiation => {
    // Filter by search term
    const matchesSearch = 
      searchTerm === '' || 
      negotiation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      negotiation.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      negotiation.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status
    const matchesStatus = filterStatus === 'all' || negotiation.status === filterStatus;
    
    // Filter by category
    const matchesCategory = filterCategory === 'all' || negotiation.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
  
  // Sort negotiations
  const sortedNegotiations = [...filteredNegotiations].sort((a, b) => {
    switch (sortBy) {
      case 'date_desc':
        return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
      case 'date_asc':
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      case 'savings_desc':
        return b.savings - a.savings;
      case 'savings_percent':
        return b.savingsPercent - a.savingsPercent;
      case 'initial_price':
        return b.initialPrice - a.initialPrice;
      default:
        return 0;
    }
  });

  // Get unique categories for filter
  const categories = ['all', ...new Set(negotiations.map(n => n.category))];
  
  // Get selected negotiation details
  const selectedNegotiationData = selectedNegotiation ? 
    negotiations.find(n => n.id === selectedNegotiation) : null;
  
  // Statistics data
  const totalNegotiations = negotiations.length;
  const completedNegotiations = negotiations.filter(n => n.status === 'completed').length;
  const totalSavings = negotiations.reduce((sum, n) => sum + n.savings, 0);
  const averageSavingsPercent = negotiations
    .filter(n => n.status === 'completed')
    .reduce((sum, n) => sum + n.savingsPercent, 0) / completedNegotiations;
  
  // Monthly savings data for chart
  const monthlySavingsData = [
    { month: 'Jan', savings: 21500 },
    { month: 'Feb', savings: 18000 },
    { month: 'Mar', savings: 17200 },
    { month: 'Apr', savings: 43200 },
    { month: 'May', savings: 0 },
    { month: 'Jun', savings: 0 },
    { month: 'Jul', savings: 0 },
    { month: 'Aug', savings: 0 },
    { month: 'Sep', savings: 0 },
    { month: 'Oct', savings: 0 },
    { month: 'Nov', savings: 0 },
    { month: 'Dec', savings: 0 },
  ];
  
  // Categories performance data
  const categorySavingsData = [
    { name: 'Health & Beauty', savings: 20200 },
    { name: 'Deli & Chilled Meats', savings: 9500 },
    { name: 'Fruits & Vegetables', savings: 9000 },
    { name: 'Drinks', savings: 16500 },
    { name: 'Pantry', savings: 0 },
    { name: 'Freezer', savings: 0 },
  ];
  
  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Format date
  const formatDate = (dateString: string): string => {
    return format(parseISO(dateString), 'MMM d, yyyy');
  };
  
  // Get status badge style
  const getStatusBadgeClass = (status: string): string => {
    switch (status) {
      case 'completed':
        return 'badge-success';
      case 'rejected':
        return 'badge-error';
      case 'expired':
        return 'badge-warning';
      default:
        return 'badge-ghost';
    }
  };
  
  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary">Aldi Tender History</h1>
          <p className="text-text-secondary mt-1">View and analyze past negotiations and tender outcomes</p>
        </div>
        <div className="flex gap-2">
          <Link to="/active-negotiations" className="btn btn-outline btn-sm flex items-center gap-2">
            <MdOutlineAccessTime className="text-lg" /> Active Tenders
          </Link>
          <Link to="/negotiation-calendar" className="btn btn-primary btn-sm flex items-center gap-2">
            <MdOutlineCalendarToday className="text-lg" /> Calendar
          </Link>
        </div>
      </div>
      
      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="glass-panel p-4 rounded-xl flex items-center">
          <div className="w-12 h-12 rounded-full bg-background-accent flex items-center justify-center text-accent-primary text-xl mr-4">
            <MdOutlineHistory />
          </div>
          <div>
            <p className="text-text-muted text-sm">Total Negotiations</p>
            <p className="text-2xl font-semibold text-text-primary">{totalNegotiations}</p>
          </div>
        </div>
        
        <div className="glass-panel p-4 rounded-xl flex items-center">
          <div className="w-12 h-12 rounded-full bg-background-accent flex items-center justify-center text-accent-secondary text-xl mr-4">
            <MdOutlineCheckCircle />
          </div>
          <div>
            <p className="text-text-muted text-sm">Completed</p>
            <p className="text-2xl font-semibold text-text-primary">{completedNegotiations}</p>
            <p className="text-text-secondary text-xs">
              {Math.round((completedNegotiations / totalNegotiations) * 100)}% success rate
            </p>
          </div>
        </div>
        
        <div className="glass-panel p-4 rounded-xl flex items-center">
          <div className="w-12 h-12 rounded-full bg-background-accent flex items-center justify-center text-accent-warning text-xl mr-4">
            <MdOutlineAttachMoney />
          </div>
          <div>
            <p className="text-text-muted text-sm">Total Savings</p>
            <p className="text-2xl font-semibold text-text-primary">{formatCurrency(totalSavings)}</p>
          </div>
        </div>
        
        <div className="glass-panel p-4 rounded-xl flex items-center">
          <div className="w-12 h-12 rounded-full bg-background-accent flex items-center justify-center text-accent-warning text-xl mr-4">
            <MdOutlineTrendingDown />
          </div>
          <div>
            <p className="text-text-muted text-sm">Avg. Savings</p>
            <p className="text-2xl font-semibold text-text-primary">{averageSavingsPercent.toFixed(1)}%</p>
          </div>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="glass-panel p-4 rounded-xl mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MdOutlineSearch className="text-text-muted text-lg" />
            </div>
            <input
              type="text"
              className="input input-bordered w-full pl-10"
              placeholder="Search negotiations..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-outline btn-sm flex items-center gap-2">
              <MdOutlineFilterList className="text-lg" /> Status: {filterStatus === 'all' ? 'All' : filterStatus}
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow glass-panel rounded-box w-52">
              <li><button onClick={() => setFilterStatus('all')}>All</button></li>
              <li><button onClick={() => setFilterStatus('completed')}>Completed</button></li>
              <li><button onClick={() => setFilterStatus('rejected')}>Rejected</button></li>
              <li><button onClick={() => setFilterStatus('expired')}>Expired</button></li>
            </ul>
          </div>
          
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-outline btn-sm flex items-center gap-2">
              <MdOutlineFilterList className="text-lg" /> Category: {filterCategory === 'all' ? 'All' : filterCategory}
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow glass-panel rounded-box w-52">
              {categories.map((category, index) => (
                <li key={index}>
                  <button onClick={() => setFilterCategory(category)}>
                    {category === 'all' ? 'All' : category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-outline btn-sm flex items-center gap-2">
              <MdOutlineSort className="text-lg" /> Sort by
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow glass-panel rounded-box w-52">
              <li><button onClick={() => setSortBy('date_desc')}>Date (newest)</button></li>
              <li><button onClick={() => setSortBy('date_asc')}>Date (oldest)</button></li>
              <li><button onClick={() => setSortBy('savings_desc')}>Savings (highest)</button></li>
              <li><button onClick={() => setSortBy('savings_percent')}>Savings % (highest)</button></li>
              <li><button onClick={() => setSortBy('initial_price')}>Initial Price (highest)</button></li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="glass-panel p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Monthly Savings</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlySavingsData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" tick={{ fill: '#B3B3B3' }} />
                <YAxis tick={{ fill: '#B3B3B3' }} />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value as number), 'Savings']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(26, 26, 26, 0.8)', 
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '8px' 
                  }}
                />
                <Legend wrapperStyle={{ color: '#B3B3B3' }} />
                <Line 
                  type="monotone" 
                  dataKey="savings" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
                  name="Savings"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="glass-panel p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Category Savings</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categorySavingsData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" tick={{ fill: '#B3B3B3' }} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{ fill: '#B3B3B3' }} 
                  width={100}
                />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value as number), 'Savings']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(26, 26, 26, 0.8)', 
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '8px' 
                  }}
                />
                <Bar 
                  dataKey="savings" 
                  fill="#3B82F6" 
                  radius={[0, 4, 4, 0]}
                  name="Savings"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Negotiations List */}
      <div className="glass-panel rounded-xl mb-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-background-accent">
              <tr>
                <th className="text-text-primary">Negotiation</th>
                <th className="text-text-primary">Vendor</th>
                <th className="text-text-primary">Date</th>
                <th className="text-text-primary">Status</th>
                <th className="text-text-primary">Initial Price</th>
                <th className="text-text-primary">Final Price</th>
                <th className="text-text-primary">Savings</th>
                <th className="text-text-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedNegotiations.map(negotiation => (
                <tr 
                  key={negotiation.id}
                  className={`hover:bg-background-accent/30 transition-colors cursor-pointer ${
                    selectedNegotiation === negotiation.id ? 'bg-background-accent/40' : ''
                  }`}
                  onClick={() => setSelectedNegotiation(negotiation.id)}
                >
                  <td>
                    <div className="font-medium text-text-primary">{negotiation.title}</div>
                    <div className="text-text-muted text-xs">{negotiation.category}</div>
                  </td>
                  <td>
                    <Link 
                      to={`/vendor-directory/${negotiation.vendorId}`} 
                      className="font-medium text-accent-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {negotiation.vendor}
                    </Link>
                  </td>
                  <td>
                    <div className="text-text-secondary">{formatDate(negotiation.endDate)}</div>
                    <div className="text-text-muted text-xs">{format(parseISO(negotiation.endDate), 'h:mm a')}</div>
                  </td>
                  <td>
                    <div className={`badge ${getStatusBadgeClass(negotiation.status)}`}>
                      {negotiation.status}
                    </div>
                  </td>
                  <td className="text-text-secondary">{formatCurrency(negotiation.initialPrice)}</td>
                  <td className="text-text-secondary">{formatCurrency(negotiation.finalPrice)}</td>
                  <td>
                    <div className={`font-semibold ${
                      negotiation.savings > 0 ? 'text-accent-secondary' : 'text-text-secondary'
                    }`}>
                      {negotiation.savings > 0 ? formatCurrency(negotiation.savings) : '-'}
                    </div>
                    {negotiation.savings > 0 && (
                      <div className="text-accent-secondary text-xs">
                        {negotiation.savingsPercent.toFixed(1)}%
                      </div>
                    )}
                  </td>
                  <td>
                    <div className="flex gap-1">
                      <button 
                        className="btn btn-ghost btn-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedNegotiation(negotiation.id);
                        }}
                      >
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Selected Negotiation Details */}
      {selectedNegotiationData && (
        <div className="glass-panel p-6 rounded-xl mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold text-text-primary">{selectedNegotiationData.title}</h2>
                <div className={`badge ${getStatusBadgeClass(selectedNegotiationData.status)}`}>
                  {selectedNegotiationData.status}
                </div>
              </div>
              <p className="text-text-secondary">
                <Link to={`/vendor-directory/${selectedNegotiationData.vendorId}`} className="text-accent-primary hover:underline">
                  {selectedNegotiationData.vendor}
                </Link> · {selectedNegotiationData.category}
              </p>
            </div>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setSelectedNegotiation(null)}
            >
              Close
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="glass-panel p-4 rounded-lg">
              <h3 className="text-sm font-medium text-text-muted mb-2">Timeframe</h3>
              <div className="flex justify-between items-center mb-1">
                <span className="text-text-muted">Started:</span>
                <span className="text-text-primary">{formatDate(selectedNegotiationData.startDate)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-muted">Completed:</span>
                <span className="text-text-primary">{formatDate(selectedNegotiationData.endDate)}</span>
              </div>
              <div className="text-text-muted text-xs mt-2">
                Duration: {Math.ceil((new Date(selectedNegotiationData.endDate).getTime() - new Date(selectedNegotiationData.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
              </div>
            </div>
            
            <div className="glass-panel p-4 rounded-lg">
              <h3 className="text-sm font-medium text-text-muted mb-2">Financial Details</h3>
              <div className="flex justify-between items-center mb-1">
                <span className="text-text-muted">Initial Price:</span>
                <span className="text-text-primary">{formatCurrency(selectedNegotiationData.initialPrice)}</span>
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-text-muted">Final Price:</span>
                <span className="text-text-primary">{formatCurrency(selectedNegotiationData.finalPrice)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-muted">Savings:</span>
                <span className="text-accent-secondary font-semibold">
                  {formatCurrency(selectedNegotiationData.savings)} ({selectedNegotiationData.savingsPercent.toFixed(1)}%)
                </span>
              </div>
            </div>
            
            <div className="glass-panel p-4 rounded-lg">
              <h3 className="text-sm font-medium text-text-muted mb-2">Activity Summary</h3>
              <div className="flex justify-between items-center mb-1">
                <span className="flex items-center gap-1 text-text-muted">
                  <MdOutlineInventory className="text-sm" /> Items:
                </span>
                <span className="text-text-primary">{selectedNegotiationData.items}</span>
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="flex items-center gap-1 text-text-muted">
                  <MdOutlineMessage className="text-sm" /> Messages:
                </span>
                <span className="text-text-primary">{selectedNegotiationData.messages}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1 text-text-muted">
                  <MdOutlineDescription className="text-sm" /> Documents:
                </span>
                <span className="text-text-primary">{selectedNegotiationData.documents}</span>
              </div>
            </div>
            
            <div className="glass-panel p-4 rounded-lg">
              <h3 className="text-sm font-medium text-text-muted mb-2">Actions</h3>
              <div className="flex flex-col gap-2">
                <Link to={`/vendor-directory/${selectedNegotiationData.vendorId}`} className="btn btn-outline btn-xs flex items-center justify-start">
                  <MdOutlineInfo className="mr-1" /> View Vendor Profile
                </Link>
                <Link to={`/communication-hub?negotiation=${selectedNegotiationData.id}`} className="btn btn-outline btn-xs flex items-center justify-start">
                  <MdOutlineMessage className="mr-1" /> View Messages
                </Link>
                <Link to={`/document-repository?negotiation=${selectedNegotiationData.id}`} className="btn btn-outline btn-xs flex items-center justify-start">
                  <MdOutlineFileDownload className="mr-1" /> Download Documents
                </Link>
                {selectedNegotiationData.status === 'completed' && (
                  <Link to={`/active-negotiations/new?template=${selectedNegotiationData.id}`} className="btn btn-primary btn-xs flex items-center justify-start">
                    <MdOutlineReceipt className="mr-1" /> Use as Template
                  </Link>
                )}
              </div>
            </div>
          </div>
          
          <div className="glass-panel p-4 rounded-lg mb-4">
            <h3 className="text-lg font-medium text-text-primary mb-2">Notes</h3>
            <p className="text-text-secondary">{selectedNegotiationData.notes}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-4 rounded-lg">
              <h3 className="text-lg font-medium text-text-primary mb-4">Price History</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { date: 'Initial', price: selectedNegotiationData.initialPrice },
                      { date: 'Offer 1', price: Math.round(selectedNegotiationData.initialPrice * 0.95) },
                      { date: 'Counter 1', price: Math.round(selectedNegotiationData.initialPrice * 0.97) },
                      { date: 'Offer 2', price: Math.round(selectedNegotiationData.initialPrice * 0.92) },
                      { date: 'Counter 2', price: Math.round(selectedNegotiationData.initialPrice * 0.94) },
                      { date: 'Final', price: selectedNegotiationData.finalPrice },
                    ]}
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="date" tick={{ fill: '#B3B3B3' }} />
                    <YAxis 
                      domain={[
                        Math.floor(selectedNegotiationData.finalPrice * 0.9), 
                        Math.ceil(selectedNegotiationData.initialPrice * 1.05)
                      ]} 
                      tick={{ fill: '#B3B3B3' }}
                    />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(value as number), 'Price']}
                      contentStyle={{ 
                        backgroundColor: 'rgba(26, 26, 26, 0.8)', 
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)', 
                        borderRadius: '8px' 
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="glass-panel p-4 rounded-lg">
              <h3 className="text-lg font-medium text-text-primary mb-2">Key Timeline</h3>
              <div className="relative pl-8 space-y-6 mt-4">
                {[
                  { date: format(parseISO(selectedNegotiationData.startDate), 'MMM d'), event: 'Negotiation Started', desc: 'Initial quote received' },
                  { date: format(parseISO(selectedNegotiationData.startDate), 'MMM d'), event: 'First Counteroffer', desc: 'Requested 10% volume discount' },
                  { date: format(parseISO(selectedNegotiationData.startDate), 'MMM d'), event: 'Second Counteroffer', desc: 'Requested expedited shipping and 7% discount' },
                  { date: format(parseISO(selectedNegotiationData.startDate), 'MMM d'), event: 'Final Offer', desc: 'Vendor agreed to expedited shipping and 5.5% discount' },
                  { date: format(parseISO(selectedNegotiationData.endDate), 'MMM d'), event: 'Agreement Reached', desc: `Final price: ${formatCurrency(selectedNegotiationData.finalPrice)}` },
                ].map((item, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-8 mt-1.5 w-4 h-4 rounded-full bg-accent-primary"></div>
                    {index < 4 && <div className="absolute -left-6 mt-5 h-14 w-0.5 bg-accent-primary/30"></div>}
                    <div>
                      <span className="text-text-muted text-xs">{item.date}</span>
                      <h4 className="text-text-primary font-medium">{item.event}</h4>
                      <p className="text-text-secondary text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <ChatPopup />
    </div>
  );
};

// Helper function for the timeline
function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export default NegotiationHistory; 